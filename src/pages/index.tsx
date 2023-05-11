import { Spinner } from "@components/basic/spinner";
import { useCourses } from "@hooks/use-courses";

import { CourseCard } from "../components/course-card";

const Catalog = () => {
  const { data: courses, isLoading } = useCourses();

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
      {courses?.map((course) => (
        <CourseCard key={course.id} course={course} linkToPage />
      ))}
    </div>
  );
};

const Home = () => {
  return (
    <>
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Learn something new 🚀
      </h1>
      <h4 className="mb-4 mt-2 text-xl font-bold">Courses</h4>
      <Catalog />
    </>
  );
};

export default Home;
