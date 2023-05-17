import { useContract, useProvider, useSigner } from "wagmi";

import { KnowledgeLayerIDAbi } from "@abis/knowledgelayer-id";
import { CHAIN } from "@constants/chains";

import { KNOWLEDGELAYER_ID_ADDRESS } from "../constants/addresses";

import type { KnowledgeLayerID } from "@abis/types/knowledgelayer-id";

export const useKnowledgeLayerID = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: KNOWLEDGELAYER_ID_ADDRESS[CHAIN.id],
    abi: KnowledgeLayerIDAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerID | null;
};
