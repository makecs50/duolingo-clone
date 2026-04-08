import React, { useEffect } from "react";
import Animated, {
  Extrapolation,
  interpolate,
  ReduceMotion,
  useAnimatedProps,
  useSharedValue,
  withRepeat,
  withSequence,
  withSpring,
  withTiming,
} from "react-native-reanimated";
import { G } from "react-native-svg";

type CurrentLessonIconProps = {
  IconComponent: React.ComponentType<any>;
  color: string;
  width: number;
  height: number;
};

const CYCLE_DURATION_MS = 900;
const MOVE_DOWN_Y = 5;
const MOVE_UP_Y = -8;
const AnimatedGroup = Animated.createAnimatedComponent(G);

export const CurrentLessonIcon = ({
  IconComponent,
  color,
  width,
  height,
}: CurrentLessonIconProps) => {
  const translateY = useSharedValue(0);
  const rotate = useSharedValue(0);

  useEffect(() => {
    translateY.value = withRepeat(
      withSequence(
        withTiming(MOVE_DOWN_Y, {
          duration: 200,
        }),
        withTiming(
          MOVE_UP_Y,
          {
            duration: 500,
          },
          (finished) => {
            if (finished) {
              rotate.value = withSpring(rotate.value + 72, {
                duration: 550,
                dampingRatio: 1,
                mass: 4,
                overshootClamping: false,
                energyThreshold: 6e-9,
                velocity: 0,
                reduceMotion: ReduceMotion.System,
              });
            }
          },
        ),
        withSpring(0, {
          duration: 550,
          dampingRatio: 0.7,
          mass: 4,
          overshootClamping: false,
          energyThreshold: 6e-9,
          velocity: 0,
          reduceMotion: ReduceMotion.System,
        }),
      ),
      -1,
      false,
    );
  }, [translateY]);

  const cx = width / 2;
  const cy = height / 2;

  // 1. Main Icon Animation (moves UP)
  const animatedProps = useAnimatedProps(() => ({
    transform: [
      { translateX: cx },
      { translateY: cy + translateY.value },
      { rotate: `${rotate.value}deg` },
      { translateX: -cx },
      { translateY: -cy },
    ],
  }));

  // 2. Realistic Shadow Animation (Stays on ground, shrinks/fades when icon goes up)
  const shadowAnimatedProps = useAnimatedProps(() => {
    // 1. Inputs MUST go from lowest (-8) to highest (5)
    // 2. Match your desired extra spaces to those positions
    // 3. CLAMP prevents the spring bounce from causing math glitches
    const extraSpace = interpolate(
      translateY.value,
      [MOVE_UP_Y, 0, -MOVE_DOWN_Y],
      [4, 0, 4],
      Extrapolation.CLAMP,
    );

    return {
      transform: [
        { translateX: cx },
        // Add your extraSpace offset right here!
        { translateY: cy + translateY.value + extraSpace },
        { rotate: `${rotate.value}deg` },
        { translateX: -cx },
        { translateY: -cy },
      ],
    };
  });

  return (
    // Wrap them in a standard G tag, so they are siblings instead of parent/child
    <G>
      {/* Shadow goes FIRST so it renders BEHIND the main icon */}
      <AnimatedGroup animatedProps={shadowAnimatedProps}>
        <IconComponent
          fill={"rgba(0, 0, 0, 0.3)"}
          stroke={"rgba(0, 0, 0, 0.1)"} // Soften the stroke on the shadow
          strokeWidth={1}
          width={width}
          height={height}
        />
      </AnimatedGroup>

      {/* Main Icon goes SECOND so it renders ON TOP */}
      <AnimatedGroup animatedProps={animatedProps}>
        <IconComponent
          fill={color}
          stroke={color}
          strokeWidth={1}
          width={width}
          height={height}
        />
      </AnimatedGroup>
    </G>
  );
};
