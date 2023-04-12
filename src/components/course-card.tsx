import Image from "next/image";
import Link from "next/link";
import { useAccount } from "wagmi";

import { Button } from "@components/basic/button";
import { CopyButton } from "@components/copy-button";

import { Course } from "../types/courses";

interface CourseCardProps {
  course: Course;
  linkToPage?: boolean;
}

export const CourseCard = ({ course, linkToPage }: CourseCardProps) => {
  const { address } = useAccount();

  return (
    <div key={course.id} className="flex flex-col justify-between">
      <div className="mb-4">
        <div className="rounded-box relative h-32 overflow-hidden">
          <Image
            src={course.image}
            layout="fill"
            objectFit="cover"
            alt="Course"
            priority
          />
        </div>
        <Link href={`/${course.slug}`}>
          <a className="mt-3 block text-xl font-semibold hover:opacity-80">
            {course.title}
          </a>
        </Link>
        <p className="mt-2 text-base-content/80">{course.description}</p>
      </div>
      {linkToPage ? (
        <Link href={`/${course.slug}`}>
          <a>
            <Button block>View</Button>
          </a>
        </Link>
      ) : (
        <>
          {address === course.seller ? (
            <CopyButton
              text={`${window.location.origin}/${course.slug}`}
              className="mt-2"
              block
              label="Copy link"
            />
          ) : (
            <Button>Watch</Button>
          )}
        </>
      )}
    </div>
  );
};
