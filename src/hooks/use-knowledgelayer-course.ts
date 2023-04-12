import { useContract, useNetwork, useProvider, useSigner } from "wagmi";
import { KnowledgeLayerCourseAbi } from "@abis/knowledgeLayerCourse";

import { KnowledgeLayerCourse } from "@abis/types/knowledgeLayerCourse";
import { KNOWLEDGELAYER_COURSE_ADDRESS } from "../constants/addresses";
import { hardhat } from "wagmi/dist/chains";

export const useKnowledgeLayerCourse = (withSigner: boolean = false) => {
  const provider = useProvider();
  const { data: signer } = useSigner();

  const { chain } = useNetwork();

  return useContract({
    address: KNOWLEDGELAYER_COURSE_ADDRESS[chain?.id ?? hardhat.id],
    abi: KnowledgeLayerCourseAbi,
    signerOrProvider: withSigner ? signer : provider,
  }) as KnowledgeLayerCourse | null;
};
