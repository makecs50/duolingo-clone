import {
  Chest,
  LessonBook,
  LessonDumbbell,
  LessonGame,
  LessonHeadphone,
  LessonMicrophone,
  LessonStar,
  LessonVideo,
  NavBarChest,
} from "@/constants/icons";
import { LessonListItem } from "@/data/list-items";
import useRiveCharacters from "@/hooks/useRiveCharacters";
import { RiveFile, RiveView } from "@rive-app/react-native";
import React, { useMemo, useRef } from "react";
import { Pressable, useWindowDimensions, View } from "react-native";
import { FirstItemSparkles } from "./first-item-sparkles";
import { LessonProgressRing } from "./lesson-progress-ring";
import { SVG_BUTTON_COLOR_SETS, SvgButton } from "./list-button";

const LESSON_BUTTON_SIZE = 80;
const CHEST_VISUAL_SIZE = 65;
const CHARACTER_SIZE = 180;
const PROGRESS_RING_SIZE = 94;
const PROGRESS_RING_OFFSET_X = (LESSON_BUTTON_SIZE - PROGRESS_RING_SIZE) / 2;
const PROGRESS_RING_OFFSET_Y =
  (LESSON_BUTTON_SIZE - PROGRESS_RING_SIZE) / 2 - 5;

const ITEM_SLOT_HEIGHT = 78;
const CURVE_AMPLITUDE_RATIO = 0.18;

const ARC_FREQUENCY = Math.PI / 4;
const CURVE_TENSION = 1.25;

const getDynamicOffset = (globalIndex: number, amplitude: number) => {
  const baseSine = Math.sin(globalIndex * ARC_FREQUENCY);
  //This is where arc shape is determined
  const adjustedSine =
    Math.sign(baseSine) * Math.pow(Math.abs(baseSine), CURVE_TENSION);
  return adjustedSine * amplitude * -1;
};

const LESSON_ICON_MAP = {
  practice: LessonStar,
  video: LessonVideo,
  reading: LessonBook,
  listening: LessonHeadphone,
  game: LessonGame,
  speaking: LessonMicrophone,
  conversation: LessonDumbbell,
  cup: LessonStar,
} as const;

export type ListItemPressMeasurement = {
  id: string;
  type: LessonListItem["type"];
  globalIndex: number;
  popupFaceColor: string;
  popupRimColor: string;
  x: number;
  y: number;
  width: number;
  height: number;
  riveFile?: RiveFile;
};

type ListItemProps = {
  item: LessonListItem;
  onPressMeasure?: (measurement: ListItemPressMeasurement) => void;
};

export const ListItem = ({ item, onPressMeasure }: ListItemProps) => {
  const { width } = useWindowDimensions();
  const buttonAnchorRef = useRef<View>(null);
  const amplitude = width * CURVE_AMPLITUDE_RATIO;

  const { globalIndex, type, sectionTheme, isCurrent, progressSegments } = item;

  const xOffset = getDynamicOffset(globalIndex, amplitude);
  const isPeak = globalIndex % 4 === 2;
  const characterAnchorX = xOffset * -1.8;
  const isGrayInProgress = isCurrent && sectionTheme === "gray";
  const buttonColor =
    type === "cup" ? "yellow" : isGrayInProgress ? "mint" : sectionTheme;
  const popupFaceColor = SVG_BUTTON_COLOR_SETS[buttonColor].face;
  const popupRimColor = SVG_BUTTON_COLOR_SETS[buttonColor].rim;
  const iconColorOverride =
    globalIndex === 0 ? "#B26A00" : isGrayInProgress ? "white" : undefined;

  /** * PERFORMANCE WARNING:
   loading all rive files within individual list items is not a good idea 
   so normally you will have these hosted somewhere and you will fetch them on demand
   */
  const { duoRiveFile, girlRiveFile, manRiveFile } = useRiveCharacters();

  const selectedRiveFile = useMemo(() => {
    if (!isPeak) return undefined;

    if (globalIndex === 2) {
      return girlRiveFile;
    }

    const characters = [duoRiveFile, girlRiveFile, manRiveFile];

    const pseudoRandomIndex = (globalIndex * 17) % characters.length;

    return characters[pseudoRandomIndex];
  }, [isPeak, globalIndex, duoRiveFile, girlRiveFile, manRiveFile]);

  const handlePress = () => {
    buttonAnchorRef.current?.measureInWindow((x, y, itemWidth, itemHeight) => {
      onPressMeasure?.({
        id: item.id,
        type,
        globalIndex,
        popupFaceColor,
        popupRimColor,
        x,
        y,
        width: itemWidth,
        height: itemHeight,
      });
    });
  };

  return (
    <View className={`justify-center items-center h-[${ITEM_SLOT_HEIGHT}]`}>
      {/* THE CHARACTER/PROP */}
      {isPeak && (
        <View
          pointerEvents="none"
          style={{
            position: "absolute",
            width: CHARACTER_SIZE,
            height: CHARACTER_SIZE,
            justifyContent: "center",
            alignItems: "center",
            transform: [{ translateX: characterAnchorX }, { translateY: 15 }],
            zIndex: 1,
          }}
        >
          {selectedRiveFile && (
            <RiveView
              file={selectedRiveFile}
              style={{ width: "100%", height: "100%" }}
            />
          )}
        </View>
      )}

      <View
        ref={buttonAnchorRef}
        style={{ zIndex: 2, transform: [{ translateX: xOffset }] }}
      >
        {globalIndex === 0 ? (
          <FirstItemSparkles size={LESSON_BUTTON_SIZE} />
        ) : null}
        {isCurrent ? (
          <View
            pointerEvents="none"
            style={{
              position: "absolute",
              left: PROGRESS_RING_OFFSET_X,
              top: PROGRESS_RING_OFFSET_Y,
              zIndex: 0,
            }}
          >
            <LessonProgressRing
              size={PROGRESS_RING_SIZE}
              progressSegments={progressSegments}
            />
          </View>
        ) : null}

        {type === "gift" ? (
          <Pressable
            onPress={handlePress}
            style={{
              width: LESSON_BUTTON_SIZE,
              height: LESSON_BUTTON_SIZE,
              alignItems: "center",
              justifyContent: "center",
              marginTop: -4,
            }}
          >
            {sectionTheme === "gray" ? (
              <Chest width={CHEST_VISUAL_SIZE} height={CHEST_VISUAL_SIZE} />
            ) : (
              <NavBarChest
                width={CHEST_VISUAL_SIZE}
                height={CHEST_VISUAL_SIZE}
              />
            )}
          </Pressable>
        ) : (
          // TODO:: this has to be optimized it causes frame drops during scrolling
          <SvgButton
            isCurrentLesson={isCurrent}
            size={LESSON_BUTTON_SIZE}
            onPress={handlePress}
            variant={buttonColor}
            IconComponent={LESSON_ICON_MAP[type]}
            iconColor={iconColorOverride}
          />
        )}
      </View>
    </View>
  );
};
