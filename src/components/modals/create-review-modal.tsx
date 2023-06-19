import { useState } from "react";
import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Label } from "@components/basic/label";
import { Modal } from "@components/basic/modal";
import { TextArea } from "@components/basic/textarea/textarea";
import { StarRating } from "@components/star-rating";
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
        <StarRating
          rating={rating}
          onRatingChange={setRating}
          containerClassName="mt-2"
        />
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
