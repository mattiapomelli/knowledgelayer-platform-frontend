import type { User } from "@lib/users/types";

export interface Review {
  id: string;
  createdAt: string;
  to: User;
  from: User;
  rating: number;
  description: ReviewDescription;
}

export interface ReviewDescription {
  content: string;
}
