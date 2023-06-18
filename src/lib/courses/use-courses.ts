import { useQuery } from "@tanstack/react-query";
import { gql } from "graphql-request";

import { graphQlRequest } from "@utils/graphql-client";

import type { Course } from "./types";

const getAllCourses = gql`
  {
    courses(where: { description_: { id_not: null } }) {
      id
      createdAt
      updatedAt
      seller {
        id
        address
        handle
      }
      token {
        address
      }
      price
      rating
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
  return useQuery({
    queryKey: ["courses"],
    queryFn: async () =>
      graphQlRequest<{ courses: Course[] }>(getAllCourses).then(
        (data) => data.courses,
      ),
  });
};
