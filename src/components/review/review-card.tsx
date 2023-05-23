import { StarIcon } from "@heroicons/react/24/solid";
import cx from "classnames";

import { UserAvatar } from "@components/user/user-avatar";

import type { Review } from "@lib/reviews/types";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="rounded-box flex flex-col gap-2 bg-base-200 p-4">
      <UserAvatar user={review.from} />

      <div className="my-1 flex gap-1">
        {new Array(5).fill(undefined).map((_, index) => (
          <StarIcon
            key={index}
            className={cx(
              "h-4 w-4",
              index < review.rating
                ? "text-yellow-500"
                : "text-base-content/20",
            )}
          />
        ))}
      </div>

      <p className="text-base-content/70">
        Lorem ipsum dolor, sit amet consectetur adipisicing elit. Ratione
        consequuntur deleniti eaque sit quae ipsam ipsa quas necessitatibus
        molestias sunt!
      </p>
    </div>
  );
};
