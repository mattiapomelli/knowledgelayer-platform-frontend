import { StarIcon } from "@heroicons/react/24/solid";
import cx from "classnames";
import Image from "next/image";

import type { Review } from "@lib/reviews/types";

interface ReviewCardProps {
  review: Review;
}

export const ReviewCard = ({ review }: ReviewCardProps) => {
  return (
    <div className="rounded-box flex flex-col gap-2 bg-base-200 p-4">
      <div className="flex items-center gap-4">
        <div className="relative h-10 w-10 shrink-0 overflow-hidden rounded-full">
          <Image
            src="/placeholder.png"
            fill
            alt="User"
            priority
            className="object-cover"
          />
        </div>
        <h4 className="mt-1 font-semibold">{review.from.handle}</h4>
      </div>

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
