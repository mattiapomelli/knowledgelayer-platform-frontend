import { Tab } from "@headlessui/react";
import cx from "classnames";
import { Fragment } from "react";

import { LessonPlayer } from "@components/course/lesson-player";

import type { CourseWithLessons } from "@lib/courses/types";

interface CourseLessonsProps {
  course: CourseWithLessons;
  showVideos?: boolean;
}

export const CourseLessons = ({ course, showVideos }: CourseLessonsProps) => {
  return (
    <Tab.Group>
      <Tab.List className="flex flex-1 flex-col gap-4">
        <h2 className="mb-2 text-2xl font-bold">Lessons</h2>
        {course.description.lessons.map((lesson, index) => (
          <Tab key={index} as={Fragment}>
            {({ selected }) => (
              <div
                className={cx(
                  "rounded-box flex flex-col gap-2 bg-base-200 p-4 outline-none",
                  { "cursor-pointer hover:bg-base-300": showVideos },
                )}
              >
                <h3 className="text-xl font-bold group-hover:underline">
                  {lesson.title}
                </h3>
                <p>{lesson.about}</p>
                {selected && showVideos && (
                  <LessonPlayer
                    courseId={course.id}
                    videoPlaybackId={lesson.videoPlaybackId}
                  />
                )}
              </div>
            )}
          </Tab>
        ))}
      </Tab.List>
    </Tab.Group>
  );
};
