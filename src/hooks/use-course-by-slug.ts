import { useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { Course } from "../types/courses";

export const useCourseBySlug = (courseSlug: string) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course | undefined>(
    ["course-by-slug", courseSlug],
    async () => {
      if (!knowledgeLayerCourse) return;

      const courseId = await knowledgeLayerCourse.slugToId(courseSlug);
      if (courseId.eq(0)) return;

      const course = await knowledgeLayerCourse.courses(courseId);
      const {
        title,
        slug,
        description,
        price,
        seller,
        image,
        videoPlaybackId,
      } = course;

      return {
        id: courseId.toNumber(),
        seller: seller as `0x${string}`,
        title,
        slug,
        description,
        price,
        image,
        videoPlaybackId,
      };
    },
  );
};
