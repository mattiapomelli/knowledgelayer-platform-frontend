import { Spinner } from "@components/basic/spinner";
import { ReviewCard } from "@components/review/review-card";
import { useCourseReviews } from "@lib/reviews/use-reviews";

export const CourseReviewsInner = ({ courseId }: { courseId: string }) => {
  const { data: reviews, isLoading } = useCourseReviews(courseId);

  console.log("Reviews: ", reviews);

  if (isLoading) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (reviews?.length === 0)
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>No reviews yet</p>
      </div>
    );

  return (
    <div className="grid grid-cols-1 gap-x-6 gap-y-10">
      {reviews?.map((review) => (
        <ReviewCard key={review.id} review={review} />
      ))}
    </div>
  );
};

interface UserCreatedCoursesProps {
  className?: string;
  courseId: string;
}

export const CourseReviews = ({
  className,
  courseId,
}: UserCreatedCoursesProps) => {
  return (
    <div className={className}>
      <h2 className="mb-2 text-2xl font-bold">Reviews</h2>
      <CourseReviewsInner courseId={courseId} />
    </div>
  );
};
