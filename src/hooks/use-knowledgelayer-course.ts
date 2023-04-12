import { useContract, useNetwork, useProvider, useSigner } from "wagmi";
import { hardhat } from "wagmi/chains";

import { KnowledgeLayerCourseAbi } from "@abis/knowledgelayer-course";

import { KNOWLEDGELAYER_COURSE_ADDRESS } from "../constants/addresses";

import type { KnowledgeLayerCourse } from "@abis/types/knowledgelayer-course";

export const useKnowledgeLayerCourse = (withSigner = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const { chain } = useNetwork();

  return useContract({
    address: KNOWLEDGELAYER_COURSE_ADDRESS[chain?.id ?? hardhat.id],
    abi: KnowledgeLayerCourseAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerCourse | null;
};
