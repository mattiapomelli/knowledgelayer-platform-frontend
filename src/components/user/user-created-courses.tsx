import Link from "next/link";

import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course/course-card";
import { useUserCreatedCourses } from "@lib/users/use-user-created-courses";

import { Button } from "../basic/button";

import type { User } from "@lib/users/types";

export const UserCreatedCoursesInner = ({ user }: { user: User }) => {
  const { data: createdCourses, isLoading } = useUserCreatedCourses(user.id);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (createdCourses?.length === 0)
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>No courses created yet</p>
        <Link href="/">
          <Button>Explore courses</Button>
        </Link>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10 md:grid-cols-autofill">
      {createdCourses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

interface UserCreatedCoursesProps {
  className?: string;
  user: User;
}

export const UserCreatedCourses = ({
  className,
  user,
}: UserCreatedCoursesProps) => {
  return (
    <div className={className}>
      <h4 className="mb-4 mt-8 text-xl font-bold">
        What {user.handle} is teaching
      </h4>
      <UserCreatedCoursesInner user={user} />
    </div>
  );
};
