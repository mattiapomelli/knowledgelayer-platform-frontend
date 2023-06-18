import Image from "next/legacy/image";
import { useRouter } from "next/router";

import { Spinner } from "@components/basic/spinner";
import { Tabs } from "@components/basic/tabs";
import { StarRating } from "@components/star-rating";
import { UserCreatedCourses } from "@components/user/user-created-courses";
import { UserEnrolledCourses } from "@components/user/user-enrolled-courses";
import { useUser } from "@lib/users/use-user";

import type { User } from "@lib/users/types";

const UserInfo = ({ user }: { user: User }) => {
  const items = [
    {
      label: "Enrolled Courses",
      content: <UserEnrolledCourses user={user} />,
    },
    {
      label: "Created Courses",
      content: <UserCreatedCourses user={user} />,
    },
  ];

  return (
    <div>
      <div className="flex items-center gap-2">
        <div className="relative mt-2 h-16 w-16 shrink-0 overflow-hidden rounded-full">
          <Image
            src={user.description?.image_url || "/placeholder.png"}
            layout="fill"
            objectFit="cover"
            alt="Profile"
            priority
          />
        </div>
        <div className="flex flex-col gap-1">
          <h1 className="text-xl font-semibold md:text-2xl">{user.handle}</h1>
          <StarRating rating={Number(user.rating)} />
        </div>
      </div>
      <p className="mt-4">{user.description?.about}</p>

      <Tabs items={items} className="mt-14" />
    </div>
  );
};

const UserPageInner = ({ userId }: { userId: string }) => {
  const { data: user, isLoading } = useUser(userId);

  if (isLoading || !user) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return <UserInfo user={user} />;
};

const UserPage = () => {
  const router = useRouter();
  const userId = router.query.id?.toString();

  if (!userId) return null;

  return <UserPageInner userId={userId} />;
};

export default UserPage;
