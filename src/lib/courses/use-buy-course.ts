import { useMutation } from "wagmi";

import { FEE_DIVIDER, PLATFORM_ID } from "@constants/common";
import { useKnowledgeLayerContext } from "@context/knowledgelayer-provider";
import { useKnowledgeLayerEscrow } from "@hooks/use-knowledgelayer-escrow";
import { useKnowledgeLayerPlatformID } from "@hooks/use-knowledgelayer-platform-id";

import { useKnowledgeLayerCourse } from "../../hooks/use-knowledgelayer-course";

import type { ContractReceipt } from "ethers";

export interface BuyCourseData {
  id: string;
}

interface UseBuyCourseOptions {
  onSuccess?: (data: ContractReceipt | undefined) => void;
}

export const useBuyCourse = (options?: UseBuyCourseOptions) => {
  const { user } = useKnowledgeLayerContext();

  const knowledgeLayerPlatformID = useKnowledgeLayerPlatformID();
  const knowledgeLayerCourse = useKnowledgeLayerCourse();
  const knowledgeLayerEscrow = useKnowledgeLayerEscrow(true);

  const mutation = useMutation(
    async ({ id }: BuyCourseData) => {
      if (
        !user ||
        !knowledgeLayerPlatformID ||
        !knowledgeLayerCourse ||
        !knowledgeLayerEscrow
      )
        return;

      const course = await knowledgeLayerCourse.courses(id);
      const originFee = await knowledgeLayerPlatformID.getOriginFee(
        course.platformId,
      );
      const buyFee = await knowledgeLayerPlatformID.getBuyFee(PLATFORM_ID);
      const protocolFee = await knowledgeLayerEscrow.protocolFee();
      const totalPrice = course.price.add(
        course.price.mul(originFee + buyFee + protocolFee).div(FEE_DIVIDER),
      );

      const tx = await knowledgeLayerEscrow.createTransaction(
        user.id,
        id,
        PLATFORM_ID,
        {
          value: totalPrice,
        },
      );

      return await tx.wait();
    },
    {
      onSuccess: options?.onSuccess,
    },
  );

  return mutation;
};
