import { useMutation } from "wagmi";

import { useKnowledgeLayerContext } from "@context/knowledgelayer-provider";
import { uploadToIPFS } from "@utils/ipfs";

import { useKnowledgeLayerReview } from "../../hooks/use-knowledgelayer-review";

import type { ContractReceipt } from "ethers";

export interface CreateReviewData {
  courseId: string;
  rating: number;
  content: string;
}

interface UseCreateReviewOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreateReview = (options?: UseCreateReviewOptions) => {
  const { user } = useKnowledgeLayerContext();

  const knowledgeLayerReview = useKnowledgeLayerReview(true);
  const mutation = useMutation(
    async ({ courseId, rating, content }: CreateReviewData) => {
      if (!knowledgeLayerReview || !user) return;

      const dataUri = await uploadToIPFS({
        rating,
        content,
      });
      if (!dataUri) return;

      const tx = await knowledgeLayerReview.mint(
        user.id,
        courseId,
        dataUri,
        rating,
      );
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
