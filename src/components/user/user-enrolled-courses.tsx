import { useEnrolledCourses } from "@lib/courses/use-enrolled-courses";
import Link from "next/link";

import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";

import { Button } from "../basic/button";

import type { User } from "@lib/users/types";

export const UserEnrolledCoursesInner = ({ user }: { user: User }) => {
  const { data: enrolledCourses, isLoading } = useEnrolledCourses(user.id);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (enrolledCourses?.length === 0)
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>Not enrolled in any courses yet</p>
        <Link href="/">
          <Button>Explore courses</Button>
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-autofill">
      {enrolledCourses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

interface UserEnrolledCoursesProps {
  className?: string;
  user: User;
}

export const UserEnrolledCourses = ({
  className,
  user,
}: UserEnrolledCoursesProps) => {
  return (
    <div className={className}>
      <h4 className="mb-4 mt-8 text-xl font-bold">
        What {user.handle} is learning
      </h4>
      <UserEnrolledCoursesInner user={user} />
    </div>
  );
};
