import { useContract, useProvider, useSigner } from "wagmi";

import { KnowledgeLayerReviewAbi } from "@abis/knowledgelayer-review";
import { CHAIN } from "@constants/chains";

import { KNOWLEDGELAYER_REVIEW_ADDRESS } from "../constants/addresses";

import type { KnowledgeLayerReview } from "@abis/types/knowledgelayer-review";

export const useKnowledgeLayerReview = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: KNOWLEDGELAYER_REVIEW_ADDRESS[CHAIN.id],
    abi: KnowledgeLayerReviewAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerReview | null;
};
