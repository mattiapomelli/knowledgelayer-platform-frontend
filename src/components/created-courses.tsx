import Link from "next/link";

import { useUserCreatedCourses } from "@lib/users/use-user-created-courses";
import { useKnowledgeLayerContext } from "context/knowledgelayer-provider";

import { Button } from "../components/basic/button";
import { Spinner } from "../components/basic/spinner";

import { CourseCard } from "./course/course-card";
import { WalletStatus } from "./wallet/wallet-status";

export const CreatedCoursesInner = ({ userId }: { userId: string }) => {
  const { data: createdCourses, isLoading } = useUserCreatedCourses(userId);

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
        <Link href="/create">
          <Button>Create course</Button>
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

export const CreatedCourses = () => {
  const { user } = useKnowledgeLayerContext();

  if (!user) {
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>Connect your wallet to see your created courses</p>
        <WalletStatus />
      </div>
    );
  }

  return <CreatedCoursesInner userId={user.id} />;
};
