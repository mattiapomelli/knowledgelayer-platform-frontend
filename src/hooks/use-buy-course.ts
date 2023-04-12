import { useMutation } from "wagmi";

import { useKnowledgeLayerCourse } from "./use-knowledgelayer-course";

import type { ContractReceipt } from "ethers";

export interface BuyCourseData {
  id: number;
  withEuro?: boolean;
}

interface UseBuyCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useBuyCourse = (options?: UseBuyCourseOptions) => {
  const knowledgeLayerCourse = useKnowledgeLayerCourse(true);

  const mutation = useMutation(
    async ({ id, withEuro }: BuyCourseData) => {
      if (!knowledgeLayerCourse) return;

      const price = (await knowledgeLayerCourse.courses(id)).price;
      const tx = await knowledgeLayerCourse.buyCourse(id, {
        value: withEuro ? 0 : price,
      });

      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
