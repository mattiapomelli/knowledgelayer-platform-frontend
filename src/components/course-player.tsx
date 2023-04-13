import { Player } from "@livepeer/react";
import { useSession } from "next-auth/react";
import { useChainId } from "wagmi";

import type { Course } from "types/courses";

interface CoursePlayerProps {
  course: Course;
  className?: string;
}

export const CoursePlayer = ({ course, className }: CoursePlayerProps) => {
  const chainId = useChainId();
  const session = useSession();

  return (
    <div className={className}>
      <Player
        playbackId={course.videoPlaybackId}
        accessKey={JSON.stringify({
          address: session.data?.user?.name || "",
          chainId,
          courseId: course.id,
        })}
      />
    </div>
  );
};
