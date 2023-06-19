import { useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Modal } from "@components/basic/modal";
import { useActiveUser } from "@lib/users/use-active-user";
import { useCreateProfile } from "@lib/users/use-create-profile";

import type { BaseModalProps } from "@components/basic/modal";

export const CreateProfileModal = ({ open, onClose }: BaseModalProps) => {
  const { refetch: refetchActiveUser } = useActiveUser();

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<{ handle: string }>();

  const { mutate: createProfile, isLoading } = useCreateProfile({
    onSuccess() {
      refetchActiveUser();
      reset();
      onClose();
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    createProfile({
      handle: data.handle,
    });
  });

  return (
    <Modal title="Create Profile" open={open} onClose={onClose}>
      <p className="mb-6">
        Mint your KnowledgeLayer ID and start teaching and learning on uKnow.
      </p>
      <form onSubmit={onSubmit} className="flex flex-col gap-3">
        <Input
          label="Handle"
          block
          {...register("handle", { required: "Handle is required" })}
          error={errors.handle?.message}
        />
        <Button block type="submit" disabled={isLoading} loading={isLoading}>
          Create Profile
        </Button>
      </form>
    </Modal>
  );
};
