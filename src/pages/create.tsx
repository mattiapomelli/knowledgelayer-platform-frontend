import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import slugify from "slugify";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { TextArea } from "@components/basic/textarea/textarea";
import { FileDropzone } from "@components/file-dropzone";
import { useCreateCourse } from "@hooks/use-create-course";
import { useUploadVideo } from "@hooks/use-upload-video";

import type { Asset } from "@livepeer/react";
import type { NextPage } from "next";

interface CreateCourseFields {
  title: string;
  price: string;
  description: string;
}

const CreateCoursePage: NextPage = () => {
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
      const slug = receipt.events?.find((e) => e.event === "CourseCreated")
        ?.args?.slug;

      router.push(`/${slug}`);
    },
  });

  const onSubmit = handleSubmit(async (data) => {
    if (!asset) {
      await uploadVideo();
    } else {
      if (!asset.playbackId || !image) return;
      const { title, description, price } = data;

      createCourse({
        title,
        slug: slugify(title).toLowerCase(),
        description,
        price: ethers.utils.parseEther(price),
        image,
        videoPlaybackId: asset.playbackId,
      });
    }
  });

  return (
    <>
      <h1 className="mb-4 text-4xl font-bold">Create new course</h1>
      <form className="flex flex-col gap-2" onSubmit={onSubmit}>
        <Input
          label="Title"
          block
          {...register("title", { required: "Title is required" })}
          error={errors.title?.message}
        />
        <Input
          label="Price (in Euro)"
          type="number"
          step="0.0000001"
          block
          {...register("price", { required: "Price is required" })}
          error={errors.price?.message}
        />
        <TextArea
          label="Description"
          rows={3}
          {...register("description", {
            required: "Description is required",
          })}
          error={errors.description?.message}
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
            label="Video"
          />
        )}

        <Button
          className="mt-2 tracking-wider"
          size="lg"
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

export default CreateCoursePage;
