import { Player } from "@livepeer/react";
// import { useSession } from "next-auth/react";
import { useAccount } from "wagmi";

import { CHAIN } from "@constants/chains";

import type { Course } from "@lib/courses/types";

interface CoursePlayerProps {
  course: Course;
  className?: string;
}

export const CoursePlayer = ({ course, className }: CoursePlayerProps) => {
  // const session = useSession();
  const { address } = useAccount();

  return (
    <div className={className}>
      <Player
        playbackId={course.videoPlaybackId}
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
