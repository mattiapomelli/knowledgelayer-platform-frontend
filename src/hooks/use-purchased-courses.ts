import { useQuery } from "wagmi";

import { fetchFromIpfs } from "@utils/ipfs";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { Course, CourseMetadata } from "../types/courses";

interface UsePurchasedCoursesParams {
  buyer: string;
}

export const usePurchasedCourses = (params: UsePurchasedCoursesParams) => {
  const { buyer } = params;

  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course[]>(["bought-courses", buyer], async () => {
    if (!knowledgeLayerCourse || !buyer) return [];

    /* Get courses */
    const courses: Omit<Course, "metadata">[] = [];
    const eventFilter = knowledgeLayerCourse.filters.CourseBought(null, buyer);
    const events = await knowledgeLayerCourse.queryFilter(eventFilter);

    for (const event of events) {
      const id = event.args.courseId;
      const course = await knowledgeLayerCourse.courses(id);
      const { seller, price, dataUri } = course;

      courses.push({
        id: id.toNumber(),
        price,
        seller: seller as `0x${string}`,
        dataUri,
      });
    }

    /* Get courses metadata */
    const coursesMetadata = await Promise.all(
      courses.map((course) => fetchFromIpfs<CourseMetadata>(course.dataUri)),
    );

    const coursesWithMetadata: Course[] = courses.map((course, index) => ({
      ...course,
      metadata: coursesMetadata[index],
    }));

    return coursesWithMetadata;
  });
};
