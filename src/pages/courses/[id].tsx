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
        about: "What are your students going to learn in this lesson?",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 2",
        about: "Tools to teach like a pro",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 3",
        about: "How to make a course from scratch",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 4",
        about: "How to make your students happy",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 5",
        about: "Some random stuff about teaching",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 6",
        about: "Master the art of teaching",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 7",
        about: "Get a PhD in teaching",
        videoPlaybackId: "1234567890",
      },
      {
        title: "Lesson 8",
        about: "Burn your PhD in teaching",
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
      <div className="container pt-4">
        <div className="flex flex-col gap-4">
          {course.description.lessons.map((lesson) => (
            <div
              key={lesson.title}
              className="group flex cursor-pointer flex-col gap-2"
            >
              <h2 className="text-2xl font-bold group-hover:underline">
                {lesson.title}
              </h2>
              <p>{lesson.about}</p>
            </div>
          ))}
        </div>
      </div>
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
