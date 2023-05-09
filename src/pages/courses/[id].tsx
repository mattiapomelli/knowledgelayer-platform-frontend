import { ethers } from "ethers";
import Image from "next/image";
import { useRouter } from "next/router";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { useBuyCourse } from "@lib/courses/use-buy-course";
import { useCourse } from "@lib/courses/use-course";
import { useHasBoughtCourse } from "@lib/courses/use-has-bought-course";

import type { CourseWithLessons } from "@lib/courses/types";

const CourseInfo = ({ course }: { course: CourseWithLessons }) => {
  const router = useRouter();
  const { data: hasBoughtCourse } = useHasBoughtCourse(course.id);
  const { mutate: buyCourse, isLoading } = useBuyCourse({
    onSuccess() {
      router.push(`/dashboard`);
    },
  });

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
            layout="fill"
            objectFit="cover"
            className="rounded-box"
          />
        </div>
        <h1 className="text-3xl font-bold">{course.description.title}</h1>
        <p className="text-lg">{course.description.about}</p>
        <div className="flex items-center gap-2">
          <b>Price: </b>
          <span>
            {ethers.utils.formatUnits(course.price, course.token.decimals)}{" "}
            {course.token.symbol}
          </span>
        </div>
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
      </div>

      <div className="flex flex-1 flex-col gap-4">
        <h2 className="mb-2 text-2xl font-bold">Lessons</h2>
        {course.description.lessons.map((lesson) => (
          <div
            key={lesson.title}
            className="rounded-box flex cursor-pointer flex-col gap-2 bg-base-200 p-4"
          >
            <h3 className="text-xl font-bold group-hover:underline">
              {lesson.title}
            </h3>
            <p>{lesson.about}</p>
          </div>
        ))}
      </div>
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
