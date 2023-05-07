import { ethers } from "ethers";
import { useRouter } from "next/router";

import { Address } from "@components/address";
import { Button } from "@components/basic/button";
import { Spinner } from "@components/basic/spinner";
import { CourseBanner } from "@components/course/course-banner";
import { StarRating } from "@components/course/star-rating";

import type { CourseWithLessons } from "types/tmp";
const mockedCourse: CourseWithLessons = {
  id: "1",
  // unix timestamp
  createdAt: "1616425200",
  updatedAt: "1616425200",
  seller: {
    id: "1",
    createdAt: "1616425200",
    updatedAt: "1616425200",
    handle: "tiapomez",
    address: "0x1234567890123456789012345678901234567890",
    rating: "4.5",
    reviews: "100",
  },
  title: "How to make a course",
  description: {
    title: "How to make a course",
    about: "This is a course about how to make a course",
    keywords: ["course", "learn to teach"],
    keywords_raw: "course, learn to teach",
    image_url: "https://source.unsplash.com/random/800x600",
    lessons: [
      {
        title: "Lesson 1",
        about: "This is the first lesson",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 2",
        about: "This is the second lesson",
        videoPlaybackId: "1234567890",
      },
    ],
  },
  price: "1000000000000000000",
  token: {
    address: "0x0000000000000000000000000000000000000000",
    symbol: "MATIC",
    name: "Polygon",
    decimals: "18",
    allowed: true,
  },
  image: "https://source.unsplash.com/random/800x600",
};

const CourseInfo = ({ course }: { course: CourseWithLessons }) => {
  return (
    <div>
      <CourseBanner course={course} />
      <div className="container">ciao</div>
    </div>
  );
};

const CoursePageInner = ({ id }: { id: string }) => {
  return <CourseInfo course={mockedCourse} />;
};

const CoursePage = () => {
  const router = useRouter();
  const id = router.query.id?.toString();

  if (!id) return null;

  return <CoursePageInner id={id} />;
};

export default CoursePage;
