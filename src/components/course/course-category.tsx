import cx from "classnames";

import { stringToColor } from "@utils/string-to-color";

interface CourseCategoryProps {
  category: string;
  onClick?: () => void;
  showHashtag?: boolean;
  selected?: boolean;
  className?: string;
}

export const CourseCategory = ({
  category,
  showHashtag,
  selected,
  className,
  onClick,
}: CourseCategoryProps) => {
  return (
    <button
      onClick={onClick}
      className={cx(
        "text-primary-content",
        onClick !== undefined ? "cursor-pointer" : "cursor-default",
        "rounded-btn px-3 py-1 text-sm ",
        selected ? "bg-opacity-80" : "bg-opacity-30",
        className,
      )}
      style={{ backgroundColor: stringToColor(category) }}
    >
      {showHashtag && "#"}
      {category}
    </button>
  );
};
