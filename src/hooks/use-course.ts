import { useQuery } from "wagmi";

import { fetchFromIpfs } from "@utils/ipfs";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { Course, CourseMetadata } from "../types/courses";

export const useCourse = (courseId: number) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course | undefined>(["course", courseId], async () => {
    if (!knowledgeLayerCourse) return;

    const course = await knowledgeLayerCourse.courses(courseId);
    const { seller, price, dataUri } = course;

    const metadata = await fetchFromIpfs<CourseMetadata>(dataUri);

    return {
      id: courseId,
      seller: seller as `0x${string}`,
      price,
      dataUri,
      metadata,
    };
  });
};
