import { ethers } from "ethers";
import Image from "next/image";

import { Address } from "@components/address";
import { Button } from "@components/basic/button";
import { StarRating } from "@components/course/star-rating";

import type { CourseWithLessons } from "types/tmp";

const Catalog = () => {
  return (
    <div className="grid grid-cols-12 gap-x-2">
      {/* first collumn is 2/5 of space */}
      <div className="rounded-box col-span-12">
        <h4 className="sticky top-0 z-10 -mt-4 bg-base-100 pb-6 pt-4 text-2xl font-bold">
          Courses
        </h4>

        <div className="flex flex-col gap-4">
          {mockedCourses.map((course) => (
            <div
              key={course.id}
              className="rounded-box flex cursor-pointer flex-col gap-2 p-2 hover:bg-base-300 md:flex-row"
            >
              <div className="flex items-center">
                <div className="relative h-32 w-full overflow-hidden rounded-md md:w-32">
                  <Image
                    src={course.description.image_url}
                    alt=""
                    objectFit="cover"
                    layout="fill"
                  />
                </div>
              </div>
              <div className="flex flex-1 flex-col justify-between gap-2">
                <div>
                  <h6 className="text-xl font-semibold">
                    {course.description.title}
                  </h6>
                  <p className="text-sm">{course.description.about}</p>
                </div>

                <div className="flex w-full justify-between">
                  <div className="flex flex-col">
                    <div className="flex items-center gap-1">
                      <span className="font-semibold">Seller:</span>
                      <span>{course.seller.handle}</span>
                    </div>
                    <div className="flex gap-1">
                      <StarRating rating={Number(course.seller.rating)} />

                      <div className="flex items-center text-sm">
                        {"("}
                        {course.seller.reviews}
                        {")"}
                      </div>
                    </div>

                    <Address
                      className="text-sm"
                      address={course.seller.address}
                    />
                  </div>

                  <div className="flex flex-col items-center">
                    <span className="flex items-center">
                      {ethers.utils.formatUnits(
                        course.price,
                        course.token.decimals,
                      )}{" "}
                      {course.token.symbol}
                    </span>

                    <Button className="tracking-wider">Enroll now!</Button>
                  </div>
                </div>
              </div>
            </div>
          ))}
        </div>
      </div>
      {/* second column is 3/5 of space */}
      {/* <div className="rounded-box col-span-6 bg-cyan-700 px-4 py-6"></div> */}
      {/* {mockedCourses.map((course) => (
        <CourseCard key={course.id} course={course} linkToPage />
      ))} */}
    </div>
  );
};

const Home = () => {
  return (
    <div className="container">
      <Catalog />
    </div>
  );
};

export default Home;

const mockedCourses: CourseWithLessons[] = [
  {
    id: "1",
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
      image_url: "https://source.unsplash.com/random/800x600?course,lesson",
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
    image: "https://source.unsplash.com/random/800x600?course",
  },
  {
    id: "2",
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
    title: "Become a video maker",
    description: {
      title: "Become a video maker",
      about:
        "In this course you will learn how to make videos, edit them and upload them to youtube",
      keywords: ["video", "youtube"],
      keywords_raw: "video, youtube",
      image_url: "https://source.unsplash.com/random/800x600?course,video",
      lessons: [
        {
          title: "Lesson 1",
          about: "Choose the right camera",
          videoPlaybackId: "1234567890",
        },
        {
          title: "Lesson 2",
          about: "Edit your video",
          videoPlaybackId: "1234567890",
        },
        {
          title: "Lesson 3",
          about: "Upload to youtube",
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
  },
];
