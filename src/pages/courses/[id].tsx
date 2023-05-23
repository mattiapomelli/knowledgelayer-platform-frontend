import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";
import { useRouter } from "next/router";

import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CourseCategory } from "@components/course/course-category";
import { CourseLessons } from "@components/course/course-lessons";
import { CourseReviews } from "@components/course/course-reviews";
import { useCreateProfileModal } from "@hooks/use-create-profile-modal";
import { useBuyCourse } from "@lib/courses/use-buy-course";
import { useCourse } from "@lib/courses/use-course";
import { useHasPurchasedCourse } from "@lib/courses/use-has-purchased-course";
import { useKnowledgeLayerContext } from "@context/knowledgelayer-provider";

import type { CourseWithLessons } from "@lib/courses/types";

const CourseInfo = ({ course }: { course: CourseWithLessons }) => {
  const { user } = useKnowledgeLayerContext();
  const router = useRouter();
  const openCreateProfileModal = useCreateProfileModal();

  const { data: hasPurchasedCourse } = useHasPurchasedCourse(course.id);
  const { mutate: buyCourse, isLoading } = useBuyCourse({
    onSuccess() {
      router.push(`/user/${user?.id}`);
    },
  });

  const isSeller = user?.id === course.seller.id;

  const onBuyCourse = async () => {
    buyCourse({
      id: course.id,
    });
  };

  return (
    <div className="flex flex-col gap-14 md:flex-row lg:gap-20">
      <div className="flex-1">
        <div className="rounded-box relative h-40 overflow-hidden">
          <Image
            src={course.description.image_url}
            fill
            className="object-cover"
            alt="course"
            priority
          />
        </div>
        <h1 className="mt-4 text-3xl font-bold">{course.description.title}</h1>
        <div className="flex items-center gap-2">
          <div className="relative mt-2 h-10 w-10 shrink-0 overflow-hidden rounded-full">
            <Image
              src={course.seller.description?.image_url || "/placeholder.png"}
              fill
              className="object-cover"
              alt="Profile"
              priority
            />
          </div>
          <Link href={`/user/${course.seller.id}`}>
            <h4 className="mt-1 text-lg font-semibold hover:opacity-70">
              {course.seller.handle}
            </h4>
          </Link>
        </div>
        <p className="mt-4">{course.description.about}</p>
        <div className="mt-3 flex gap-2">
          {course.description.keywords.map((category) => (
            <CourseCategory key={category} category={category} />
          ))}
        </div>
        {!isSeller && (
          <>
            {hasPurchasedCourse ? (
              <div className="rounded-box mt-6 bg-success/40 px-4 py-2 text-center">
                You are enrolled! ✅
              </div>
            ) : (
              <div className="mt-6 flex flex-col gap-2">
                {!user && (
                  <Button size="lg" block onClick={openCreateProfileModal}>
                    Create KL Id
                  </Button>
                )}
                <Button
                  size="lg"
                  block
                  onClick={onBuyCourse}
                  loading={isLoading}
                  disabled={isLoading || !user}
                >
                  Enroll
                </Button>
                <span className="text-center font-bold">
                  {ethers.utils.formatEther(course.price)} {course.token.symbol}
                </span>
              </div>
            )}
          </>
        )}
      </div>

      <div className="flex flex-1 flex-col gap-8">
        <CourseLessons course={course} showVideos={hasPurchasedCourse} />
        <CourseReviews courseId={course.id} />
      </div>
    </div>
  );
};

const CoursePageInner = ({ id }: { id: string }) => {
  const { data: course, isLoading } = useCourse(id);

  if (!course || isLoading) {
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

  return <CoursePageInner id={id} />;
};

export default CoursePage;
