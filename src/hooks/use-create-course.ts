import { useMutation } from "wagmi";
// import { uploadImage, uploadPdf } from "../utils/upload-file";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { BigNumber, ContractReceipt } from "ethers";

export interface CreateCourseData {
  name: string;
  price: BigNumber;
  image: File;
  pdf: File;
  slug: string;
  description: string;
}

interface UseCreateCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreateCourse = (options?: UseCreateCourseOptions) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse(true);
  const mutation = useMutation(
    async ({ name, slug, description, price }: CreateCourseData) => {
      if (!knowledgeLayerCourse) return;

      // const imageUrl = await uploadImage(image);
      // if (!imageUrl) return;

      // await uploadPdf(pdf, slug);

      const tx = await knowledgeLayerCourse.createCourse(
        name,
        slug,
        description,
        price,
        "",
      );
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
