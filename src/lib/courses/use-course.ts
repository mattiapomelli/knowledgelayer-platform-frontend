import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { CourseWithLessons } from "./types";

const getCourse = gql`
  query getCourse($id: String!) {
    course(id: $id) {
      id
      createdAt
      updatedAt
      seller {
        id
        address
      }
      token {
        address
      }
      price
      description {
        title
        about
        image_url
        lessons {
          title
          videoPlaybackId
          about
        }
      }
    }
  }
`;

export const useCourse = (id: string) => {
  return useQuery(["course", id], async () =>
    graphQlRequest<{ course: CourseWithLessons }>(getCourse, { id }).then(
      (data) => data.course,
    ),
  );
};
