import { useAccount, useQuery } from "wagmi";

import { Course } from "../types/courses";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

export const useBoughtCourses = () => {
  const { address } = useAccount();
  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery<Course[]>(["bought-courses", address], async () => {
    if (!knowledgeLayerCourse || !address) return [];

    const courses: Course[] = [];
    const eventFilter = knowledgeLayerCourse.filters.CourseBought(
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
