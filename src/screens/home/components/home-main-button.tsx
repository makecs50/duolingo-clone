import { SvgAppButton } from "@/components/shared/svg-app-button";
import { NoteBook } from "@/constants/icons";
import { Text, useWindowDimensions, View } from "react-native";

type HomeMainButtonProps = {
  unitLabel: string;
  sectionTitle: string;
  faceColor: string;
  rimColor: string;
};

export const HomeMainButton = ({
  unitLabel,
  sectionTitle,
  faceColor,
  rimColor,
}: HomeMainButtonProps) => {
  const { width } = useWindowDimensions();
  return (
    <View className="flex-row  items-center self-center">
      <SvgAppButton
        width={width * 0.8}
        height={78}
        color={faceColor}
        backgroundColor={rimColor}
        leftRadius={13}
        rightRadius={0}
        strokeRightWidth={1}
        strokeRightPressedWidth={5}
        strokeRightColor={rimColor}
        pressDepth={4}
        onPress={() => {}}
        contentContainerStyle={{
          justifyContent: "center",
          paddingHorizontal: 16,
        }}
      >
        <Text className="text-lg font-rd-medium" style={{ color: "#ecffde" }}>
          {unitLabel}
        </Text>
        <Text className="text-white text-xl font-bold">{sectionTitle}</Text>
      </SvgAppButton>
      <SvgAppButton
        width={55}
        height={78}
        color={faceColor}
        backgroundColor={rimColor}
        leftRadius={0}
        rightRadius={13}
        strokeLeftPressedWidth={5}
        strokeLeftWidth={1}
        strokeLeftColor={rimColor}
        pressDepth={4}
        onPress={() => {}}
        contentContainerStyle={{
          justifyContent: "center",
          alignItems: "center",
        }}
      >
        <NoteBook width={22} height={22} />
      </SvgAppButton>
    </View>
  );
};
