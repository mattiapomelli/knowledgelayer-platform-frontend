export interface User {
  id: string;
  createdAt: string;
  updatedAt: string;
  handle: string;
  address: `0x${string}`;
  rating: string;
  reviews: string;
  // description: string;
}

export interface Course {
  id: string;
  createdAt: string;
  updatedAt: string;
  seller: User;
  title: string;
  description: CourseDescription;
  price: string;
  token: Token;
  image: string;
}

export interface CourseDescription {
  title: string;
  about: string;
  keywords: string[];
  keywords_raw: string;
  image_url: string;
}

export interface Lesson {
  title: string;
  about: string;
  videoPlaybackId: string;
}

export interface CourseWithLessons extends Course {
  description: CourseDescription & {
    lessons: Lesson[];
  };
}

export interface Token {
  address: string;
  symbol: string;
  name: string;
  decimals: string;
  allowed: boolean;
}
