import { StarIcon } from "@heroicons/react/24/solid";
import cx from "classnames";
import { twMerge } from "tailwind-merge";

interface StarRatingProps {
  rating: number;
  onRatingChange?: (rating: number) => void;
  containerClassName?: string;
  starClassName?: string;
}

export const StarRating = ({
  rating,
  onRatingChange,
  containerClassName,
  starClassName,
}: StarRatingProps) => {
  return (
    <div className={twMerge("flex gap-1", containerClassName)}>
      {new Array(5).fill(undefined).map((_, index) =>
        onRatingChange ? (
          <button key={index} onClick={() => onRatingChange(index + 1)}>
            <StarIcon
              className={twMerge(
                cx(
                  "h-4 w-4",
                  index < rating ? "text-yellow-500" : "text-base-content/20",
                ),
                starClassName,
              )}
            />
          </button>
        ) : (
          <StarIcon
            key={index}
            className={twMerge(
              cx(
                "h-4 w-4",
                index < rating ? "text-yellow-500" : "text-base-content/20",
              ),
              starClassName,
            )}
          />
        ),
      )}
    </div>
  );
};
