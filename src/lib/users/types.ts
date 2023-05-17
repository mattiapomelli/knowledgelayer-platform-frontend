export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  handle: string;
  address: `0x${string}`;
  rating: string;
  reviews: string;
  description?: UserDescription;
}

export interface UserDescription {
  title?: string;
  about?: string;
  name?: string;
  role?: string;
  image_url?: string;
}
