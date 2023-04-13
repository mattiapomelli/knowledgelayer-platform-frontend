import { ethers } from "ethers";
import Image from "next/image";
import Link from "next/link";

import { Address } from "./address";

import type { Course } from "../types/courses";

interface CourseCardProps {
  course: Course;
  linkToPage?: boolean;
}

export const CourseCard = ({ course }: CourseCardProps) => {
  return (
    <Link href={`/${course.slug}`} key={course.id}>
      <a className="flex flex-col gap-2">
        <div className="rounded-box relative h-36 overflow-hidden">
          <Image
            src={course.image}
            layout="fill"
            objectFit="cover"
            alt="Course"
            priority
          />
        </div>

        <h4 className="mt-1 block text-xl font-semibold hover:opacity-80">
          {course.title}
        </h4>

        <div className="flex items-center gap-4">
          <span>
            By: <Address address={course.seller} className="font-bold" />
          </span>
          <span>
            Price:{" "}
            <span className="font-bold">
              {ethers.utils.formatEther(course.price)} MATIC
            </span>
          </span>
        </div>

        <p className="text-base-content/80">
          {course.description.substring(0, 100).concat("...")}
        </p>
      </a>
    </Link>
  );
};
