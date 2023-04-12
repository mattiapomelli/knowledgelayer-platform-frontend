import { useAccount, useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { Course } from "../types/courses";

export const useCreatedCourses = () => {
  const { address } = useAccount();
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course[]>(["created-courses", address], async () => {
    if (!knowledgeLayerCourse || !address) return [];

    /* Get requests */
    const courses: Course[] = [];
    const eventFilter = knowledgeLayerCourse.filters.CourseCreated(
      null,
      address,
    );
    const events = await knowledgeLayerCourse.queryFilter(eventFilter);

    for (const event of events) {
      if (!event.args) continue;

      const id = event.args.courseId;
      const course = await knowledgeLayerCourse.courses(id);
      const { title, slug, description, price, seller, image } = course;

      courses.push({
        id: id.toNumber(),
        title,
        slug,
        description,
        price,
        seller: seller as `0x${string}`,
        image,
      });
    }

    return courses;
  });
};
