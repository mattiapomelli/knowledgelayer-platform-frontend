import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CopyButton } from "@components/copy-button";
import { CoursePlayer } from "@components/course-player";
import { useBuyCourse } from "@hooks/use-buy-course";
import { useCourse } from "@lib/courses/use-course";
import { useHasBoughtCourse } from "@lib/courses/use-has-bought-course";

import type { CourseWithLessons } from "@lib/courses/types";

const CourseInfo = ({ course }: { course: CourseWithLessons }) => {
  const { address } = useAccount();
  const router = useRouter();
  const { mutate: buyCourse, isLoading } = useBuyCourse({
    onSuccess() {
      router.push(`/dashboard`);
    },
  });

  const { data: hasBoughtCourse } = useHasBoughtCourse(course.id);

  const onBuyCourse = async () => {
    buyCourse({
      id: Number(course.id),
    });
  };

  return (
    <div className="flex flex-col gap-4">
      <div className="rounded-box relative h-56 overflow-hidden">
        <Image
          src={course.image}
          layout="fill"
          objectFit="cover"
          alt="course"
          priority
        />
      </div>
      <h1 className="text-4xl font-bold">{course.title}</h1>
      <p>{course.description.about}</p>
      {address === course.seller.address ? (
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
          {hasBoughtCourse ? (
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

const CoursePageInner = ({ id }: { id: string }) => {
  const { data: course } = useCourse(id);

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
  const id = router.query.id?.toString();

  if (!id) return null;

  return <CoursePageInner id={id} />;
};

export default CoursePage;
