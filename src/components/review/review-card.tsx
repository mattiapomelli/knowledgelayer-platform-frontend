import { StarRating } from "@components/star-rating";
import { UserAvatar } from "@components/user/user-avatar";

import type { Review } from "@lib/reviews/types";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="rounded-box flex flex-col gap-2 bg-base-200 p-4">
      <UserAvatar user={review.from} />

      <StarRating rating={review.rating} containerClassName="my-1" />

      <p className="text-base-content/70">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
        consequuntur deleniti eaque sit quae ipsam ipsa quas necessitatibus
        molestias sunt!
      </p>
    </div>
  );
};
