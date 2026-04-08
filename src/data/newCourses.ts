import { Chess, Coding, Maths } from "@/constants/icons";
import { SvgProps } from "react-native-svg";

type NewCourse = {
  id: number;
  title: string;
  description: string;
  image: React.FC<SvgProps>;
  color: string;
  isNew: boolean;
};
const newCourses: NewCourse[] = [
  {
    id: 1,
    title: "Coding",
    description: "New Course Description",
    image: Coding,
    color: "#CE82FF",
    isNew: false,
  },
  {
    id: 2,
    title: "Maths",
    description: "New Course 2 Description",
    image: Maths,
    color: "#1CB0F6",
    isNew: false,
  },
  {
    id: 3,
    title: "Chess",
    description: "New Course 3 Description",
    image: Chess,
    color: "#e6e6bc",
    isNew: true,
  },
];

export default newCourses;
