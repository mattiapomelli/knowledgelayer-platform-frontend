import { Player } from "@livepeer/react";
import { useSession } from "next-auth/react";

import { CHAIN } from "@constants/chains";

import type { Course } from "types/courses";

interface CoursePlayerProps {
  course: Course;
  className?: string;
}

export const CoursePlayer = ({ course, className }: CoursePlayerProps) => {
  const session = useSession();

  return (
    <div className={className}>
      <Player
        playbackId={course.videoPlaybackId}
        accessKey={JSON.stringify({
          address: session.data?.user?.name || "",
          chainId: CHAIN.id,
          courseId: course.id,
        })}
      />
    </div>
  );
};
