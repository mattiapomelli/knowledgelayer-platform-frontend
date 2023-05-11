import { useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";
import { fetchFromIpfs } from "@utils/ipfs";

import type { Course, CourseMetadata } from "./types";

interface UseCoursesParams {
  seller?: `0x${string}`;
}

export const useCourses = (params?: UseCoursesParams) => {
  const { seller = null } = params ?? {};

  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course[]>(["courses", seller], async () => {
    if (!knowledgeLayerCourse) return [];

    /* Get courses */
    const courses: Omit<Course, "metadata">[] = [];
    const eventFilter = knowledgeLayerCourse.filters.CourseCreated(
      null,
      seller,
    );
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
