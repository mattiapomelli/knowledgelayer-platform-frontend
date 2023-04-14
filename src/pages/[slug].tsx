import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CopyButton } from "@components/copy-button";
import { CoursePlayer } from "@components/course-player";
import { useBuyCourse } from "@hooks/use-buy-course";
import { useCourseBySlug } from "@hooks/use-course-by-slug";
import { useHasBoughtCourse } from "@hooks/use-has-bought-course";

import type { Course } from "../types/courses";

const CourseInfo = ({ course }: { course: Course }) => {
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
      id: course.id,
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
      <p>{course.description}</p>
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

const CoursePageInner = ({ slug }: { slug: string }) => {
  const { data: course } = useCourseBySlug(slug);

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
  const slug = router.query.slug?.toString();

  if (!slug) return null;

  return <CoursePageInner slug={slug} />;
};

export default CoursePage;
