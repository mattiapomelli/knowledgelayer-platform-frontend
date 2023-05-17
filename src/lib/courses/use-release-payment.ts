import { useMutation } from "wagmi";

import { useKnowledgeLayerEscrow } from "@hooks/use-knowledgelayer-escrow";
import { useKnowledgeLayerContext } from "context/knowledgelayer-provider";

import type { ContractReceipt } from "ethers";

export interface ReleasePaymentData {
  transactionId: number;
}

interface UseReleasePaymentOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useReleasePayment = (options?: UseReleasePaymentOptions) => {
  const { user } = useKnowledgeLayerContext();

  const knowledgeLayerEscrow = useKnowledgeLayerEscrow(true);
  const mutation = useMutation(
    async ({ transactionId }: ReleasePaymentData) => {
      if (!knowledgeLayerEscrow || !user) return;

      const tx = await knowledgeLayerEscrow.release(user.id, transactionId);
      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
