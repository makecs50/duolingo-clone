import { SvgAppButton } from "@/components/shared/svg-app-button";
import { LessonType } from "@/data/list-items";
import React from "react";
import { StyleSheet, Text, View } from "react-native";
import Animated, {
  interpolate,
  SharedValue,
  useAnimatedStyle,
} from "react-native-reanimated";

type LessonPressPopupProps = {
  top: SharedValue<number>;
  pointerCenterX: SharedValue<number>;
  progress: SharedValue<number>;
  faceColor: string;
  rimColor: string;
  lessonType: LessonType;
  height?: number;
};

const LESSON_POPUP_CONTENT: Record<
  LessonType,
  { title: string; buttonLabel: string }
> = {
  practice: { title: "Practice: Core Skills", buttonLabel: "Practice +10 XP" },
  video: { title: "Video: Watch and Learn", buttonLabel: "Watch +12 XP" },
  reading: { title: "Reading: Quick Story", buttonLabel: "Read +12 XP" },
  listening: { title: "Listening: Focus Audio", buttonLabel: "Listen +12 XP" },
  gift: { title: "Reward: Chest Ready", buttonLabel: "Open Chest" },
  game: { title: "Game: Challenge Mode", buttonLabel: "Play +15 XP" },
  speaking: { title: "Speaking: Say It Out Loud", buttonLabel: "Speak +15 XP" },
  conversation: {
    title: "Conversation: Real Dialogue",
    buttonLabel: "Talk +15 XP",
  },
  cup: { title: "Unit Complete: Final Test", buttonLabel: "Start Unit Test" },
};

export const LessonPressPopup = ({
  top,
  pointerCenterX,
  progress,
  faceColor,
  rimColor,
  lessonType,
  height = 116,
}: LessonPressPopupProps) => {
  const popupContent = LESSON_POPUP_CONTENT[lessonType];
  const animatedStyle = useAnimatedStyle(() => {
    return {
      top: top.value,
      height,
      // Keep popup hidden through most of shrink; reveal quickly near full size.
      opacity: interpolate(
        progress.value,
        [0, 0.35, 0.72, 1],
        [0, 0.2, 0.88, 1],
      ),
      transform: [
        { scale: progress.value },
        { translateY: (1 - progress.value) * 8 },
      ],
    };
  });
  const pointerAnimatedStyle = useAnimatedStyle(() => ({
    left: pointerCenterX.value - 8,
  }));

  return (
    <Animated.View
      pointerEvents="none"
      style={[styles.container, animatedStyle]}
    >
      <Animated.View
        style={[
          styles.pointer,
          pointerAnimatedStyle,
          { backgroundColor: faceColor, borderColor: faceColor },
        ]}
      />
      <View
        className=" px-4 justify-between py-3"
        style={[
          styles.card,
          { backgroundColor: faceColor, borderColor: faceColor },
        ]}
      >
        <Text className="text-white  text-xl font-rd-bold" numberOfLines={1}>
          {popupContent.title}
        </Text>
        <SvgAppButton
          width="100%"
          height={30}
          color="#FFFFFF"
          backgroundColor="#E5E5E5"
          leftRadius={10}
          rightRadius={10}
          pressDepth={3}
          onPress={() => {}}
          contentContainerStyle={{
            alignItems: "center",
            justifyContent: "center",
          }}
        >
          <Text
            className="text-base font-rd-medium"
            style={{ color: rimColor }}
          >
            {popupContent.buttonLabel}
          </Text>
        </SvgAppButton>
      </View>
    </Animated.View>
  );
};

const styles = StyleSheet.create({
  container: {
    position: "absolute",
    left: "10%",
    width: "80%",
    zIndex: 40,
  },
  card: {
    flex: 1,
    borderRadius: 20,
    borderWidth: 1,
  },
  pointer: {
    position: "absolute",
    top: -8,
    width: 16,
    height: 16,
    borderTopWidth: 1,
    borderLeftWidth: 1,
    transform: [{ rotate: "45deg" }],
    zIndex: 41,
  },
});
