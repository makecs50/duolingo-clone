export type LeagueEntry = {
  id: string;
  rank: number;
  name: string;
  countryFlag: string;
  level: number;
  xp: number;
  avatarSeed: string;
  isCurrentUser?: boolean;
};

export type LeagueTournamentListItem = {
  id: string;
  name: string;
  rank: number;
  xp: number;
  avatarSeed: string;
  isCurrentUser?: boolean;
  color: string;
};
const LEAGUE_NAMES = [
  "Ada",
  "Lucile Maisse",
  "Goma Wataliane Bonheur",
  "evkiss wi",
  "Алла",
  "winston",
  "Mina Park",
  "Noah Silva",
  "Lea Fischer",
  "Mateo Ruiz",
  "Ivy Morgan",
  "Sofia Ivanova",
  "Haruto Sato",
  "Camila Costa",
  "Mila Novak",
  "Ethan Reed",
  "Yara Ali",
  "Jonas Becker",
  "Sara Khan",
  "Luca Romano",
  "Aylin Kaya",
  "Ravi Patel",
  "Nora Elmas",
  "Diego Santos",
  "Zoe Laurent",
  "Hewad Mubariz",
  "Emma Ortega",
  "Aria Bennett",
  "Omar Haddad",
  "Elena Smirnova",
  "Mason Clark",
  "Olivia Stone",
  "Nikolai Petrov",
  "Ava Nguyen",
  "Lucas Almeida",
  "Maya Singh",
  "Daniel Weber",
  "Layla Musa",
  "Felix Braun",
  "Amelia Scott",
  "Leo Dupont",
  "Ines Costa",
  "Theo Martin",
  "Nina Kovac",
  "Adam Walsh",
  "Rina Takahashi",
  "Victor Mendes",
  "Yasmin Noor",
  "Hugo Almeida",
  "Sena Aydin",
] as const;

const FLAG_POOL = ["🇫🇷", "🇺🇸", "🇪🇸", "🇩🇪", "🇯🇵", "🇧🇷"] as const;
const CURRENT_USER_NAME = "Hewad Mubariz";
// A nice vibrant palette for the cups
const COLOR_PALETTE = [
  "#FFC800", // Gold
  "#58CC02", // Green
  "#1CB0F6", // Blue
  "#FF4B4B", // Red
  "#CE82FF", // Purple
  "#FF9600", // Orange
];
export const LEAGUE_ENTRIES: LeagueEntry[] = LEAGUE_NAMES.map((name, index) => {
  const rank = index + 1;
  const xp = Math.max(30, 760 - index * 13 + (index % 3) * 2);
  return {
    id: `${rank}`,
    rank,
    name,
    countryFlag: FLAG_POOL[index % FLAG_POOL.length],
    level: 5 + (index % 18),
    xp,
    avatarSeed: name.toLowerCase().replace(/\s+/g, "-"),
    isCurrentUser: name === CURRENT_USER_NAME,
  };
});

export const LEAGUE_TOURNAMENT_ENTRIES: LeagueTournamentListItem[] =
  LEAGUE_NAMES.map((name, index) => {
    return {
      id: `tournament-${index}`,
      name,
      rank: index + 1,
      xp: Math.max(30, 760 - index * 13 + (index % 3) * 2),
      avatarSeed: name.toLowerCase().replace(/\s+/g, "-"),
      isCurrentUser: name === CURRENT_USER_NAME,
      // Assign color based on index to keep it "stable" across renders
      color: COLOR_PALETTE[index % COLOR_PALETTE.length],
    };
  });
