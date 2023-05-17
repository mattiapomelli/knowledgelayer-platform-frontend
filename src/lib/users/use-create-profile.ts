import { useMutation } from "wagmi";

import { PLATFORM_ID } from "@constants/common";
import { useKnowledgeLayerID } from "@hooks/use-knowledgelayer-id";

import type { ContractReceipt } from "ethers";

export interface CreateProfileData {
  handle: string;
}

interface UseCreateProfileOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useCreateProfile = (options?: UseCreateProfileOptions) => {
  const knowledgeLayerID = useKnowledgeLayerID(true);
  const mutation = useMutation(
    async ({ handle }: CreateProfileData) => {
      if (!knowledgeLayerID) return;

      const tx = await knowledgeLayerID.mint(PLATFORM_ID, handle);
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
