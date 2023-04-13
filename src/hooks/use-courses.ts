import { useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { Course } from "../types/courses";

export const useCourses = () => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course[]>(["courses"], async () => {
    if (!knowledgeLayerCourse) return [];

    /* Get requests */
    const courses: Course[] = [];
    const eventFilter = knowledgeLayerCourse.filters.CourseCreated();
    const events = await knowledgeLayerCourse.queryFilter(eventFilter);

    for (const event of events) {
      const id = event.args.courseId;
      const course = await knowledgeLayerCourse.courses(id);
      const {
        title,
        slug,
        description,
        price,
        seller,
        image,
        videoPlaybackId,
      } = course;

      courses.push({
        id: id.toNumber(),
        title,
        slug,
        description,
        price,
        seller: seller as `0x${string}`,
        image,
        videoPlaybackId,
      });
    }

    return courses;
  });
};
