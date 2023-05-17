import { Tab } from "@headlessui/react";
import cx from "classnames";
import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";
import { Fragment } from "react";
import { useAccount } from "wagmi";

import { Address } from "@components/address";
import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { LessonPlayer } from "@components/lesson-player";
import { useBuyCourse } from "@lib/courses/use-buy-course";
import { useCourse } from "@lib/courses/use-course";
import { useHasBoughtCourse } from "@lib/courses/use-has-bought-course";

import type { CourseWithLessons } from "@lib/courses/types";

const CourseInfo = ({ course }: { course: CourseWithLessons }) => {
  const { address } = useAccount();
  const router = useRouter();
  const { data: hasBoughtCourse } = useHasBoughtCourse(course.id);
  const { mutate: buyCourse, isLoading } = useBuyCourse({
    onSuccess() {
      router.push(`/dashboard`);
    },
  });

  const isSeller =
    address?.toLowerCase() === course.seller.address.toLowerCase();

  const onBuyCourse = async () => {
    buyCourse({
      id: course.id,
    });
  };

  return (
    <div className="flex flex-col gap-x-10 gap-y-20 md:flex-row">
      <div className="flex flex-1 flex-col gap-4">
        <div className="rounded-box relative h-64 w-full">
          <Image
            src={course.description.image_url}
            alt="Course image"
            fill
            className="rounded-box object-cover"
          />
        </div>
        <h1 className="text-3xl font-bold">{course.description.title}</h1>
        <p className="text-lg">{course.description.about}</p>

        <div className="my-2 flex flex-col gap-2">
          <span>
            By:{" "}
            <Address address={course.seller.address} className="font-bold" />
          </span>
          <span>
            Price:{" "}
            <span className="font-bold">
              {ethers.utils.formatUnits(course.price, course.token.decimals)}{" "}
              {course.token.symbol}
            </span>
          </span>
        </div>

        {!isSeller && (
          <>
            {hasBoughtCourse ? (
              <div className="rounded-box bg-success/20 p-4">
                You are enrolled in this course!
              </div>
            ) : (
              <Button
                className="tracking-wider"
                onClick={onBuyCourse}
                disabled={isLoading}
              >
                Enroll
              </Button>
            )}
          </>
        )}
      </div>

      <Tab.Group>
        <Tab.List className="flex flex-1 flex-col gap-4">
          <h2 className="mb-2 text-2xl font-bold">Lessons</h2>
          {course.description.lessons.map((lesson, index) => (
            <Tab key={index} as={Fragment}>
              {({ selected }) => (
                <div
                  className={cx(
                    "rounded-box flex flex-col gap-2 bg-base-200 p-4",
                    { "cursor-pointer hover:bg-base-300": hasBoughtCourse },
                  )}
                >
                  <h3 className="text-xl font-bold group-hover:underline">
                    {lesson.title}
                  </h3>
                  <p>{lesson.about}</p>
                  {selected && (hasBoughtCourse || isSeller) && (
                    <LessonPlayer
                      courseId={course.id}
                      videoPlaybackId={lesson.videoPlaybackId}
                    />
                  )}
                </div>
              )}
            </Tab>
          ))}
        </Tab.List>
      </Tab.Group>
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

  return <CourseInfo course={course} />;
};

const CoursePage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  if (!id) return null;

  return (
    <div className="container">
      <CoursePageInner id={id} />
    </div>
  );
};

export default CoursePage;
