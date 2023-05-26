import { StarIcon } from "@heroicons/react/24/solid";
import cx from "classnames";
import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Label } from "@components/basic/label";
import { Modal } from "@components/basic/modal";
import { TextArea } from "@components/basic/textarea/textarea";
import { useCreateReview } from "@lib/reviews/use-create-review";

import type { BaseModalProps } from "@components/basic/modal";

interface CreateReviewModalProps extends BaseModalProps {
  courseId: string;
}

export const CreateReviewModal = ({
  open,
  onClose,
  courseId,
}: CreateReviewModalProps) => {
  const [rating, setRating] = useState(1);
  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ content: string }>();

  const { mutate: createReview, isLoading } = useCreateReview({
    onSuccess() {
      reset();
      onClose();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    createReview({
      content: data.content,
      rating,
      courseId,
    });
  });

  return (
    <Modal title="Create Review" open={open} onClose={onClose}>
      <p className="mb-6">Review the course and instructor.</p>
      <div className="mb-4">
        <Label>Rating</Label>
        <div className="mt-2 flex gap-1">
          {new Array(5).fill(undefined).map((_, index) => (
            <button key={index} onClick={() => setRating(index + 1)}>
              <StarIcon
                className={cx(
                  "h-4 w-4",
                  index < rating ? "text-yellow-500" : "text-base-content/20",
                )}
              />
            </button>
          ))}
        </div>
      </div>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <TextArea
          label="Review"
          block
          {...register("content", { required: "Handle is required" })}
          error={errors.content?.message}
        />
        <Button block type="submit" disabled={isLoading} loading={isLoading}>
          Submit Review
        </Button>
      </form>
    </Modal>
  );
};
