export type LessonType =
  | "practice"
  | "video"
  | "reading"
  | "listening"
  | "gift"
  | "game"
  | "speaking"
  | "conversation"
  | "cup";

export type SectionTheme = "purple" | "green" | "blue" | "yellow" | "gray";

export type LessonListItem = {
  id: string;
  globalIndex: number;
  sectionItemIndex: number;
  type: LessonType;
  sectionTheme: SectionTheme;
  status: LessonStatus;
  isCurrent: boolean;
  progressSegments: number;
};

export type LessonStatus = "completed" | "current" | "locked";

export type SectionDataItem = {
  title: string;
  theme: SectionTheme;
  displayTheme: SectionTheme;
  data: LessonListItem[];
};

const BASE_PATTERN: LessonType[] = [
  "practice",
  "video",
  "practice",
  "reading",
  "gift",
  "practice",
  "practice",
  "listening",
  "practice",
  "game",
  "practice",
  "speaking",
  "practice",
  "gift",
  "practice",
  "game",
  "practice",
  "conversation",
  "practice",
  "practice",
  "practice",
  "practice",
  "practice",
  "cup",
];

const sectionConfigs: Array<{
  title: string;
  theme: SectionTheme;
  displayTheme: SectionTheme;
}> = [
  {
    title: "Unit 1: Describe the weather",
    theme: "green",
    displayTheme: "green",
  },
  { title: "Unit 2: Shop at market", theme: "purple", displayTheme: "purple" },
  { title: "Unit 3: Talk about family", theme: "blue", displayTheme: "blue" },
  {
    title: "Unit 4: Order at restaurant",
    theme: "yellow",
    displayTheme: "yellow",
  },
  { title: "Unit 5: Navigate the city", theme: "gray", displayTheme: "green" },
  { title: "Unit 6: Discuss hobbies", theme: "gray", displayTheme: "purple" },
  { title: "Unit 7: Plan a vacation", theme: "gray", displayTheme: "blue" },
];

const CURRENT_USER_LEVEL = 45;

// --- THE PURE FUNCTIONAL FIX ---
// 1. Find which section is the first "gray" section
const firstGraySectionIndex = sectionConfigs.findIndex(
  (s) => s.theme === "gray",
);

let targetCurrentGlobalIndex = -1; // Default fallback

// 2. If a gray section exists, calculate the exact global index of its first valid item
if (firstGraySectionIndex !== -1) {
  // Find where this section starts mathematically
  const sectionStartGlobalIndex =
    firstGraySectionIndex === 0 ? 0 : 25 + (firstGraySectionIndex - 1) * 24;

  const pattern =
    firstGraySectionIndex === 0
      ? (["practice", ...BASE_PATTERN] as LessonType[])
      : BASE_PATTERN;

  // Find the offset of the first item in this section that is NOT a gift
  const firstEligibleItemOffset = pattern.findIndex((type) => type !== "gift");

  // Lock in the exact mathematical coordinate
  targetCurrentGlobalIndex = sectionStartGlobalIndex + firstEligibleItemOffset;
}
// -------------------------------

export const sectionData = sectionConfigs.map(
  ({ title, theme, displayTheme }, sectionIndex): SectionDataItem => {
    const pattern =
      sectionIndex === 0
        ? ["practice" as LessonType, ...BASE_PATTERN]
        : BASE_PATTERN;

    const startGlobalIndex =
      sectionIndex === 0 ? 0 : 25 + (sectionIndex - 1) * 24;

    const data: LessonListItem[] = pattern.map((lessonType, itemIndex) => {
      const currentGlobalIndex = startGlobalIndex + itemIndex;

      // Base status logic
      let itemStatus: LessonStatus =
        currentGlobalIndex <= CURRENT_USER_LEVEL ? "completed" : "locked";

      // 3. PURE CHECK: If this item is exactly the coordinate we calculated, mark it!
      if (currentGlobalIndex === targetCurrentGlobalIndex) {
        itemStatus = "current";
      }

      return {
        id: `level-${currentGlobalIndex}`,
        globalIndex: currentGlobalIndex,
        sectionItemIndex: itemIndex,
        type: lessonType,
        sectionTheme: theme,
        status: itemStatus,
        isCurrent: itemStatus === "current",
        progressSegments: itemStatus === "current" ? 2 : 0,
      };
    });

    return { title, theme, displayTheme, data };
  },
);
