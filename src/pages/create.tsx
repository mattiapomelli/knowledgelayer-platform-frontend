import React, { useState } from "react";
import { useAccount } from "wagmi";

import { Spinner } from "@components/basic/spinner";
import { UploadVideo } from "@components/upload-video";

import type { NextPage } from "next";

const CreateCoursePage: NextPage = () => {
  const { address, isConnecting, isReconnecting } = useAccount();
  const [assetId, setAssetId] = useState<string>();

  if (isConnecting || isReconnecting) {
    return (
      <div className="my-14 flex justify-center">
        <Spinner />
      </div>
    );
  }

  if (!address) {
    return (
      <div className="mt-8">Please connect your wallet to create a course</div>
    );
  }

  if (!assetId) {
    return (
      <UploadVideo
        onSuccess={(assetId) => {
          setAssetId(assetId);
        }}
      />
    );
  }

  return <div></div>;
};

export default CreateCoursePage;
