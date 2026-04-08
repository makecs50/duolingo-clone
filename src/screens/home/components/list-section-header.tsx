import { sectionData } from "@/data/list-items";
import { Text, View } from "react-native";

const FIRST_SECTION_TITLE = sectionData[0]?.title;

export const ListSectionHeader = ({ section }: { section: any }) => {
  return section?.title === FIRST_SECTION_TITLE ? null : (
    <View className="bg-white h-24 items-center justify-center flex-row gap-2 pb-2 mb-2">
      <View className="bg-gray-4 h-[1] w-14" />
      <Text className=" text-lg font-rd-medium text-gray-2">
        {section.title}
      </Text>
      <View className="h-[1] w-14 bg-gray-4" />
    </View>
  );
};
