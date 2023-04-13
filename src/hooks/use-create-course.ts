import { useMutation } from "wagmi";

import { uploadImage } from "@utils/upload-image";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { BigNumber, ContractReceipt } from "ethers";

export interface CreateCourseData {
  title: string;
  price: BigNumber;
  image: File;
  slug: string;
  description: string;
  videoPlaybackId: string;
}

interface UseCreateCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreateCourse = (options?: UseCreateCourseOptions) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse(true);
  const mutation = useMutation(
    async ({
      title,
      slug,
      description,
      price,
      image,
      videoPlaybackId,
    }: CreateCourseData) => {
      if (!knowledgeLayerCourse) return;

      const imageUrl = await uploadImage(image);
      if (!imageUrl) return;

      const tx = await knowledgeLayerCourse.createCourse(
        title,
        slug,
        description,
        price,
        imageUrl,
        videoPlaybackId,
      );
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
