import { ethers } from "ethers";
import { useRouter } from "next/router";
import React, { useState } from "react";
import { useFieldArray, useForm } from "react-hook-form";

import { Button } from "@components/basic/button";
import { Input } from "@components/basic/input";
import { TextArea } from "@components/basic/textarea/textarea";
import { FileDropzone } from "@components/file-dropzone";
import { useUploadVideos } from "@hooks/use-upload-videos";
import { useCreateCourse } from "@lib/courses/use-create-course";

import type { Asset } from "@livepeer/react";

interface CreateCourseFields {
  title: string;
  price: string;
  about: string;
  lessons: {
    title: string;
    about: string;
    // video: File;
  }[];
}

export const CreateCourseForm = () => {
  // const [asset, setAsset] = useState<Asset | undefined>();
  const [assets, setAssets] = useState<Asset[] | undefined>();

  const router = useRouter();

  const [image, setImage] = useState<File | undefined>();
  // const [video, setVideo] = useState<File | undefined>();
  const [videos, setVideos] = useState<File[]>([]);

  console.log("Videos: ", videos);

  const {
    register,
    control,
    handleSubmit,
    formState: { errors },
    reset,
    getValues,
  } = useForm<CreateCourseFields>({
    defaultValues: {
      lessons: [
        {
          title: "",
          about: "",
        },
      ],
    },
  });

  const {
    mutateAsync: uploadVideos,
    error,
    progressFormatted,
    isLoading: uploadIsLoading,
  } = useUploadVideos(videos, {
    onSuccess: setAssets,
  });

  const { fields, append } = useFieldArray({
    control,
    name: "lessons",
  });

  const { mutate: createCourse, isLoading } = useCreateCourse({
    onSuccess(receipt) {
      reset();

      if (!receipt) return;
      const courseId = receipt.events?.find((e) => e.event === "CourseCreated")
        ?.args?.courseId;

      router.push(`/courses/${courseId}`);
    },
  });

  const onVideoChange = (video: File | undefined, index: number) => {
    if (!video) return;
    const lessons = getValues("lessons");

    setVideos((videos) =>
      Array(lessons.length)
        .fill(new File([], ""))
        .map((_, i) => (i === index ? video : videos[i] || new File([], ""))),
    );
  };

  const onSubmit = handleSubmit(async (data) => {
    if (!assets?.length) {
      await uploadVideos();
    } else {
      if (!image) return;
      const { title, about, price, lessons } = data;

      createCourse({
        price: ethers.utils.parseEther(price),
        title,
        about,
        image,
        lessons: lessons.map((lesson, index) => ({
          title: lesson.title,
          about: lesson.about,
          videoPlaybackId: assets[index]?.playbackId || "",
        })),
      });
    }
  });

  return (
    <>
      <form onSubmit={onSubmit}>
        <div className="flex flex-col gap-10 md:flex-row">
          <div className="flex flex-1 flex-col gap-2">
            <h4 className="my-2 text-xl font-bold">Course details</h4>
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
          </div>

          <div className="flex flex-1 flex-col gap-2">
            <h4 className="my-2 text-xl font-bold">Lessons</h4>

            {fields.map((field, index) => (
              <div key={field.id} className="mb-4 flex flex-col gap-2">
                <Input
                  label={`Lesson ${index + 1} Title`}
                  block
                  {...register(`lessons.${index}.title`, {
                    required: "Title is required",
                  })}
                  error={errors.lessons?.[index]?.title?.message}
                />
                <Input
                  label={`Lesson ${index + 1} Description`}
                  block
                  {...register(`lessons.${index}.about`, {
                    required: "Description is required",
                  })}
                  error={errors.lessons?.[index]?.about?.message}
                />
                <FileDropzone
                  value={videos[index]}
                  onValueChange={(video) => {
                    onVideoChange(video, index);
                  }}
                  accept={{
                    "video/*": ["*.mp4"],
                  }}
                  label={`Lesson ${index + 1} Video Lecture`}
                />
                <p>{progressFormatted?.[index]}</p>
              </div>
            ))}
            <Button
              type="button"
              className="mt-2"
              color="neutral"
              onClick={() =>
                append({
                  title: "",
                  about: "",
                })
              }
            >
              Add lesson
            </Button>
          </div>
        </div>

        <Button
          className="mt-6"
          block
          type="submit"
          loading={isLoading || uploadIsLoading}
          disabled={isLoading || uploadIsLoading}
        >
          {assets?.length ? "Publish course" : "Upload videos"}
        </Button>
        {!assets?.length && (
          <div className="mt-2">
            {error?.message && <p className="text-error">{error.message}</p>}
          </div>
        )}
      </form>
    </>
  );
};
