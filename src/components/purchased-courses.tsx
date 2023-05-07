import Link from "next/link";

import { Spinner } from "@components/basic/spinner";
import { CourseCard } from "@components/course-card";
import { useUserPurchasedCourses } from "@lib/users/use-user-purchased-courses";
import { useKnowledgeLayerContext } from "context/knowledgelayer-provider";

import { Button } from "./basic/button";
import { WalletStatus } from "./wallet/wallet-status";

export const PurchasedCoursesInner = ({ userId }: { userId: string }) => {
  const { data: purchasedCourses, isLoading } = useUserPurchasedCourses(userId);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (purchasedCourses?.length === 0)
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
      {purchasedCourses?.map((course) => (
        <CourseCard key={course.id} course={course} />
      ))}
    </div>
  );
};

export const PurchasedCourses = () => {
  const { user } = useKnowledgeLayerContext();

  if (!user) {
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>Connect your wallet to see your purchased courses</p>
        <WalletStatus />
      </div>
    );
  }

  return <PurchasedCoursesInner userId={user.id} />;
};
