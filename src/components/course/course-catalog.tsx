import cx from "classnames";

import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";
import { useCourses } from "@lib/courses/use-courses";

const CourseCatalogInner = () => {
  const { data: courses, isLoading } = useCourses();
  const filteredCourses = courses?.filter((course) => course.description);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (courses?.length === 0)
    return (
      <div className="my-14 flex justify-center">
        <p>No courses yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-autofill">
      {filteredCourses?.map((course) => (
        <CourseCard key={course.id} course={course} linkToPage />
      ))}
    </div>
  );
};

export const CourseCatalog = ({ className }: { className?: string }) => {
  return (
    <div className={className}>
      <h4 className={cx("mb-4 mt-2 text-xl font-bold", className)}>Courses</h4>
      <CourseCatalogInner />
    </div>
  );
};
