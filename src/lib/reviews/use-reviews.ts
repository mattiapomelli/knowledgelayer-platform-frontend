import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { graphQlRequest } from "@utils/graphql-client";

import type { Review } from "./types";

const getCourseReviews = gql`
  query GetCourseReviews($courseId: Int!) {
    reviews(where: { course_: { id: $courseId } }) {
      id
      createdAt
      course {
        id
      }
      to {
        id
        handle
      }
      from {
        id
        handle
      }
      rating
      cid
      description {
        content
      }
    }
  }
`;

export const useCourseReviews = (courseId: string) => {
  return useQuery({
    queryKey: ["course-reviews", courseId],
    queryFn: async () =>
      graphQlRequest<{ reviews: Review[] }>(getCourseReviews, {
        courseId: Number(courseId),
      }).then((data) => data.reviews),
  });
};
