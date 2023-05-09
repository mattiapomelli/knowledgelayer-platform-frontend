import React from "react";
import { useAccount } from "wagmi";

import { Spinner } from "@components/basic/spinner";
import { CreateCourseForm } from "@components/course/create-course-form";
import { WalletStatus } from "@components/wallet/wallet-status";

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
        <p>Connect your wallet to create a course</p>
        <WalletStatus />
      </div>
    );
  }

  return (
    <div className="container">
      <h1 className="mb-6 text-3xl font-bold underline decoration-primary">
        Share your knowledge with the world 💎
      </h1>
      <CreateCourseForm />
    </div>
  );
};

export default CreateCoursePage;
