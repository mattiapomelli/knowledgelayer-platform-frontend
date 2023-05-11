import { useMutation } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";

import type { ContractReceipt } from "ethers";

export interface BuyCourseData {
  courseId: number;
}

interface UseBuyCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useBuyCourse = (options?: UseBuyCourseOptions) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse(true);

  const mutation = useMutation(
    async ({ courseId }: BuyCourseData) => {
      if (!knowledgeLayerCourse) return;

      const price = (await knowledgeLayerCourse.courses(courseId)).price;
      const tx = await knowledgeLayerCourse.buyCourse(courseId, {
        value: price,
      });

      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
