import { useAccount, useQuery } from "wagmi";

import { useKnowledgeLayerCourse } from "@hooks/use-knowledgelayer-course";

export const useHasBoughtCourse = (courseId: string) => {
  const { address } = useAccount();

  const knowledgeLayerCourse = useKnowledgeLayerCourse();

  return useQuery(["has-bought-course", address, courseId], async () => {
    if (!knowledgeLayerCourse || !address) return false;

    const balance = await knowledgeLayerCourse.balanceOf(address, courseId);
    return balance.gt(0);
  });
};
