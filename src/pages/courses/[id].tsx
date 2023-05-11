import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CopyButton } from "@components/copy-button";
import { CoursePlayer } from "@components/course-player";
import { useCourse } from "@lib/courses/use-course";
import { useHasPurchasedCourse } from "@lib/courses/use-has-purchased-course";
import { useBuyCourse } from "lib/courses/use-buy-course";

import type { Course } from "../../lib/courses/types";

const CourseInfo = ({ course }: { course: Course }) => {
  const { address } = useAccount();
  const router = useRouter();
  const { mutate: buyCourse, isLoading } = useBuyCourse({
    onSuccess() {
      router.push(`/dashboard`);
    },
  });

  const { data: hasPurchasedCourse } = useHasPurchasedCourse(course.id);

  const onBuyCourse = async () => {
    buyCourse({
      courseId: course.id,
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box relative h-56 overflow-hidden">
        <Image
          src={course.metadata.imageUrl}
          layout="fill"
          objectFit="cover"
          alt="course"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold">{course.metadata.title}</h1>
      <p>{course.metadata.description}</p>
      {address === course.seller ? (
        <>
          <CoursePlayer course={course} />
          <CopyButton
            text={window.location.href}
            className="mt-2 tracking-wider"
            block
            label="Copy link"
          />
        </>
      ) : (
        <>
          {hasPurchasedCourse ? (
            <CoursePlayer course={course} />
          ) : (
            <div className="mt-2">
              <div className="rounded-box flex items-center justify-between bg-base-200 px-4 py-3">
                <b>Price: </b>
                <span>{ethers.utils.formatEther(course.price)} MATIC</span>
              </div>
              <Button
                className="mt-4 tracking-wider"
                block
                onClick={onBuyCourse}
                disabled={isLoading}
                loading={isLoading}
              >
                Buy course
              </Button>
            </div>
          )}
        </>
      )}
    </div>
  );
};

const CoursePageInner = ({ courseId }: { courseId: number }) => {
  const { data: course } = useCourse(courseId);

  if (!course) {
    return (
      <div className="flex justify-center">
        <Spinner />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-lg">
      <CourseInfo course={course} />
    </div>
  );
};

const CoursePage = () => {
  const router = useRouter();
  const courseId = router.query.id?.toString();

  if (!courseId) return null;

  return <CoursePageInner courseId={Number(courseId)} />;
};

export default CoursePage;
