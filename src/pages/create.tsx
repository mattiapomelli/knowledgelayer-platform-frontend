import React from "react";
import { useAccount } from "wagmi";

import { Spinner } from "@components/basic/spinner";
import { CreateCourseForm } from "@components/course/create-course-form";
import { UserStatus } from "@components/user/user-status";

import type { NextPage } from "next";

const CreateCoursePage: NextPage = () => {
  const { address, isConnecting, isReconnecting } = useAccount();

  if (isConnecting || isReconnecting) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!address) {
    return (
      <div className="my-14 flex flex-col items-center gap-3">
        <p>Connect your KL id</p>
        <UserStatus />
      </div>
    );
  }

  return (
    <div className="mx-auto max-w-xl">
      <h1 className="mb-4 text-3xl font-bold underline decoration-primary">
        Teach what you know 💎
      </h1>
      <CreateCourseForm />
    </div>
  );
};

export default CreateCoursePage;
