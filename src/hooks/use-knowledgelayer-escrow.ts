import { useContract, useProvider, useSigner } from "wagmi";

import { KnowledgeLayerEscrowAbi } from "@abis/knowledgelayer-escrow";
import { CHAIN } from "@constants/chains";

import { KNOWLEDGELAYER_ESCROW_ADDRESS } from "../constants/addresses";

import type { KnowledgeLayerEscrow } from "@abis/types/knowledgelayer-escrow";

export const useKnowledgeLayerEscrow = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  return useContract({
    address: KNOWLEDGELAYER_ESCROW_ADDRESS[CHAIN.id],
    abi: KnowledgeLayerEscrowAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerEscrow | null;
};
