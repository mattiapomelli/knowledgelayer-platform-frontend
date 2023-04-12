import { useQuery } from "wagmi";
import { Course } from "../types/courses";
import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

export const useCourseBySlug = (courseSlug: string) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course | undefined>(
    ["course-by-slug", courseSlug],
    async () => {
      if (!knowledgeLayerCourse) return;

      const courseId = await knowledgeLayerCourse.slugToId(courseSlug);
      if (courseId.eq(0)) return;

      const course = await knowledgeLayerCourse.courses(courseId);
      const { title, slug, description, price, seller, image } = course;

      return {
        id: courseId.toNumber(),
        seller: seller as `0x${string}`,
        title,
        slug,
        description,
        price,
        image,
      };
    },
  );
};
