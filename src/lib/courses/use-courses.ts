import { gql } from "graphql-request";
import { useQuery } from "wagmi";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "./types";

const getAllCourses = gql`
  {
    courses(where: { description_not: null }) {
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
        keywords
      }
    }
  }
`;

export const useCourses = () => {
  return useQuery(["courses"], async () =>
    graphQlRequest<{ courses: Course[] }>(getAllCourses).then(
      (data) => data.courses,
    ),
  );
};
