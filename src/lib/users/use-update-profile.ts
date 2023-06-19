import { useMutation } from "wagmi";

import { useKnowledgeLayerID } from "@hooks/use-knowledgelayer-id";
import { useActiveUser } from "@lib/users/use-active-user";
import { uploadToIPFS } from "@utils/ipfs";

import type { ContractReceipt } from "ethers";

export interface UpdateProfileData {
  title: string;
  name: string;
  about: string;
}

interface UseUpdateProfileOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useUpdateProfile = (options?: UseUpdateProfileOptions) => {
  const { user } = useActiveUser();

  const knowledgeLayerID = useKnowledgeLayerID(true);
  const mutation = useMutation(
    async ({ title, name, about }: UpdateProfileData) => {
      if (!user || !knowledgeLayerID) return;

      const dataUri = await uploadToIPFS({
        title,
        name,
        about,
      });
      if (!dataUri) return;

      const tx = await knowledgeLayerID.updateProfileData(user.id, dataUri);
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
