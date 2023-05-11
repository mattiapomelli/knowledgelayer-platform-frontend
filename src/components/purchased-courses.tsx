import Link from "next/link";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course-card";
import { usePurchasedCourses } from "@lib/courses/use-purchased-courses";

export const PurchasedCourses = ({ user }: { user: `0x${string}` }) => {
  const { data: boughtCourses, isLoading } = usePurchasedCourses({
    buyer: user,
  });

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (boughtCourses?.length === 0)
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>No courses purchased yet</p>
        <Link href="/">
          <a>
            <Button>Explore courses</Button>
          </a>
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-autofill">
      {boughtCourses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};
