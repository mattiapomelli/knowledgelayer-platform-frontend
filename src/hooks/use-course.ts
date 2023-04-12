import { useQuery } from "wagmi";
import { Course } from "../types/courses";
import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

export const useCourse = (courseId: number) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course | undefined>(["course", courseId], async () => {
    if (!knowledgeLayerCourse) return;

    const course = await knowledgeLayerCourse.courses(courseId);
    const { seller, title, slug, description, price, image } = course;

    return {
      id: courseId,
      seller: seller as `0x${string}`,
      title,
      slug,
      description,
      price,
      image,
    };
  });
};
