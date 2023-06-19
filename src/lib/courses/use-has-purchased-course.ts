import { useQuery } from "@tanstack/react-query";
import { useAccount } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";

export const useHasPurchasedCourse = (courseId: string) => {
  const { address } = useAccount();

  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery({
    // eslint-disable-next-line @tanstack/query/exhaustive-deps
    queryKey: ["has-purchased-course", address, courseId],
    queryFn: async () => {
      if (!knowledgeLayerCourse || !address) return false;

      const balance = await knowledgeLayerCourse.balanceOf(address, courseId);
      return balance.gt(0);
    },
  });
};
