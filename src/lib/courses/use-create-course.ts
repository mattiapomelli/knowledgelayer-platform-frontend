import { useMutation } from "wagmi";

import { ETH_ADDRESS, PLATFORM_ID } from "@constants/common";
import { useKnowledgeLayerActiveUser } from "@lib/users/use-active-knowledge-layer-user";
import { uploadToIPFS } from "@utils/ipfs";
import { uploadImage } from "@utils/upload-image";

import { useKnowledgeLayerCourse } from "../../hooks/use-knowledgelayer-course";

import type { BigNumber, ContractReceipt } from "ethers";

export interface CreateCourseData {
  price: BigNumber;
  title: string;
  about: string;
  image: File;
  keywords: string[];
  lessons: {
    title: string;
    about: string;
    videoPlaybackId: string;
  }[];
}

interface UseCreateCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreateCourse = (options?: UseCreateCourseOptions) => {
  const { user } = useKnowledgeLayerActiveUser();

  const knowledgeLayerCourse = useKnowledgeLayerCourse(true);
  const mutation = useMutation(
    async ({
      title,
      about,
      image,
      price,
      keywords,
      lessons,
    }: CreateCourseData) => {
      if (!knowledgeLayerCourse || !user) return;

      const imageUrl = await uploadImage(image);
      if (!imageUrl) return;

      const dataUri = await uploadToIPFS({
        title,
        about,
        image_url: imageUrl,
        keywords,
        lessons,
      });
      if (!dataUri) return;

      const tx = await knowledgeLayerCourse.createCourse(
        user.id,
        PLATFORM_ID,
        price,
        ETH_ADDRESS,
        dataUri,
      );
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
