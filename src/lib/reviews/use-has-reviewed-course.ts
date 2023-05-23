import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { useKnowledgeLayerContext } from "@context/knowledgelayer-provider";
import { graphQlRequest } from "@utils/graphql-client";

import type { Review } from "./types";

const getHasReviewedCourse = gql`
  query GetHasReviewedCourse($courseId: Int!, $userId: Int!) {
    reviews(
      where: { course_: { id: $courseId }, from_: { id: $userId } }
      first: 1
    ) {
      id
    }
  }
`;

export const useHasReviewedCourse = (courseId: string) => {
  const { user } = useKnowledgeLayerContext();

  return useQuery(["has-reviewed-course", courseId, user?.id], async () =>
    graphQlRequest<{ reviews: Review[] }>(getHasReviewedCourse, {
      courseId: Number(courseId),
      userId: Number(user?.id),
    }).then((data) => data.reviews.length > 0),
  );
};
