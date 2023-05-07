import { useContract, useProvider, useSigner } from "wagmi";

import { KnowledgeLayerPlatformIDAbi } from "@abis/knowledgelayer-platform-id";
import { CHAIN } from "@constants/chains";

import { KNOWLEDGELAYER_PLATFORM_ID_ADDRESS } from "../constants/addresses";

import type { KnowledgeLayerPlatformID } from "@abis/types/knowledgelayer-platform-id";

export const useKnowledgeLayerPlatformID = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: KNOWLEDGELAYER_PLATFORM_ID_ADDRESS[CHAIN.id],
    abi: KnowledgeLayerPlatformIDAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerPlatformID | null;
};
