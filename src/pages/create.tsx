import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { Spinner } from "@components/basic/spinner";
import { TextArea } from "@components/basic/textarea/textarea";
import { FileDropzone } from "@components/file-dropzone";
import { WalletStatus } from "@components/wallet/wallet-status";
import { useUploadVideo } from "@hooks/use-upload-video";
import { useCreateCourse } from "@lib/courses/use-create-course";

import type { Asset } from "@livepeer/react";
import type { NextPage } from "next";

interface CreateCourseFields {
  title: string;
  price: string;
  about: string;
}

const CreateCourseForm = () => {
  const [asset, setAsset] = useState<Asset | undefined>();

  const router = useRouter();

  const [image, setImage] = useState<File | undefined>();
  const [video, setVideo] = useState<File | undefined>();

  const {
    mutateAsync: uploadVideo,
    error,
    progressFormatted,
    isLoading: uploadIsLoading,
  } = useUploadVideo(video, {
    onSuccess: setAsset,
  });

  const {
    register,
    handleSubmit,
    formState: { errors },
    reset,
  } = useForm<CreateCourseFields>();

  const { mutate: createCourse, isLoading } = useCreateCourse({
    onSuccess(receipt) {
      reset();

      if (!receipt) return;
      const courseId = receipt.events?.find((e) => e.event === "CourseCreated")
        ?.args?.courseId;

      router.push(`/courses/${courseId}`);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!asset) {
      await uploadVideo();
    } else {
      if (!asset.playbackId || !image) return;
      const { title, about, price } = data;

      createCourse({
        price: ethers.utils.parseEther(price),
        title,
        about,
        image,
        lessons: [
          {
            title: "Lesson 1",
            about: "Lesson 1 description",
            videoPlaybackId: asset.playbackId,
          },
        ],
      });
    }
  });

  return (
    <>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          label="Title"
          block
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />
        <Input
          label="Price (MATIC)"
          type="number"
          step="0.0000001"
          block
          {...register("price", { required: "Price is required" })}
          error={errors.price?.message}
        />
        <TextArea
          label="Description"
          rows={3}
          {...register("about", {
            required: "Description is required",
          })}
          error={errors.about?.message}
        />
        <FileDropzone
          value={image}
          onValueChange={setImage}
          accept={{
            "image/*": [".jpeg", ".png"],
          }}
          label="Cover Image"
        />

        {asset ? (
          <div className="rounded-box border-success bg-success/50 py-3 px-4">
            Video uploaded ✅
          </div>
        ) : (
          <FileDropzone
            value={video}
            onValueChange={setVideo}
            accept={{
              "video/*": ["*.mp4"],
            }}
            label="Video lecture"
          />
        )}

        <Button
          className="mt-2"
          block
          type="submit"
          loading={isLoading || uploadIsLoading}
          disabled={isLoading || uploadIsLoading}
        >
          {asset ? "Publish course" : "Upload video"}
        </Button>
        {!asset && (
          <div className="mt-2">
            {error?.message && <p className="text-error">{error.message}</p>}
            {progressFormatted && <span>{progressFormatted}</span>}
          </div>
        )}
      </form>
    </>
  );
};

const CreateCoursePage: NextPage = () => {
  const { address, isConnecting, isReconnecting } = useAccount();

  return (
    <div className="container">
      <div className="mx-auto max-w-lg">
        <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
          Share your knowledge
          <br /> with the world 💎
        </h1>
        <h4 className="mt-2 mb-4 text-xl font-bold">New course</h4>
        {isConnecting || isReconnecting ? (
          <div className="my-14 flex justify-center">
            <Spinner />
          </div>
        ) : (
          <>
            {address ? (
              <CreateCourseForm />
            ) : (
              <div className="my-14 flex flex-col items-center gap-3">
                <p>Connect your wallet to create a course</p>
                <WalletStatus />
              </div>
            )}
          </>
        )}
      </div>
    </div>
  );
};

export default CreateCoursePage;
