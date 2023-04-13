import { Player } from "@livepeer/react";
import { useSession } from "next-auth/react";
import { useChainId } from "wagmi";

import type { Course } from "types/courses";

interface CoursePlayerProps {
  course: Course;
}

export const CoursePlayer = ({ course }: CoursePlayerProps) => {
  const chainId = useChainId();
  const session = useSession();

  return (
    <Player
      playbackId={course.videoPlaybackId}
      accessKey={JSON.stringify({
        address: session.data?.user?.name || "",
        chainId,
        courseId: course.id,
      })}
    />
  );
};
