import { Player } from "@livepeer/react";
// import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

import { CHAIN } from "@constants/chains";

import type { CourseWithLessons } from "@lib/courses/types";

interface CoursePlayerProps {
  course: CourseWithLessons;
  className?: string;
}

export const CoursePlayer = ({ course, className }: CoursePlayerProps) => {
  // const session = useSession();
  const { address } = useAccount();

  return (
    <div className={className}>
      <Player
        playbackId={course.description.lessons[0].videoPlaybackId}
        accessKey={JSON.stringify({
          // address: session.data?.user?.name || "",
          address,
          chainId: CHAIN.id,
          courseId: course.id,
        })}
      />
    </div>
  );
};
