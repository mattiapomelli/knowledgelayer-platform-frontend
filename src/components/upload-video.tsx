import { useCreateAsset } from "@livepeer/react";
import React, { useCallback, useEffect, useMemo, useState } from "react";
import { useDropzone } from "react-dropzone";

import { Button } from "@components/basic/button";
import { useHasMounted } from "@hooks/use-has-mounted";

export const UploadVideo = ({
  onSuccess,
}: {
  onSuccess?: (assetId: string) => void;
}) => {
  const [video, setVideo] = useState<File | undefined>();
  const hasMounted = useHasMounted();

  const {
    mutate: createAsset,
    data: asset,
    status,
    progress,
    error,
  } = useCreateAsset(
    video
      ? {
          sources: [
            {
              name: video.name,
              file: video,
              playbackPolicy: {
                type: "webhook",
                // This is the id of the webhook you created in step 2
                webhookId: process.env.NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID || "",
                webhookContext: {
                  // This is the context you want to pass to your webhook
                  // It can be anything you want, and it will be passed back to your webhook
                },
              },
            },
          ] as const,
        }
      : null,
  );

  const onDrop = useCallback(async (acceptedFiles: File[]) => {
    if (acceptedFiles.length > 0 && acceptedFiles[0]) {
      setVideo(acceptedFiles[0]);
    }
  }, []);

  const { getRootProps, getInputProps } = useDropzone({
    accept: {
      "video/*": ["*.mp4"],
    },
    maxFiles: 1,
    onDrop,
  });

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (asset?.[0] && asset[0].status?.phase !== "ready"),
    [status, asset],
  );

  const progressFormatted = useMemo(
    () =>
      progress?.[0].phase === "failed"
        ? "Failed to process video."
        : progress?.[0].phase === "waiting"
        ? "Waiting..."
        : progress?.[0].phase === "uploading"
        ? `Uploading: ${Math.round(progress[0].progress * 100)}%`
        : progress?.[0].phase === "processing"
        ? `Processing: ${Math.round(progress[0].progress * 100)}%`
        : null,
    [progress],
  );

  useEffect(() => {
    if (asset?.[0]?.status?.phase === "ready") {
      onSuccess?.(asset[0].id);
    }
  }, [asset, onSuccess]);

  return (
    <>
      {hasMounted && (
        <div
          {...getRootProps()}
          className="rounded-box mt-6 cursor-pointer border border-dashed border-base-content/20 bg-base-200 p-5"
        >
          <input {...getInputProps()} />
          <p>Drag and drop or browse files</p>
        </div>
      )}

      {video && (
        <p className="mt-2">
          <span className="font-medium">Selected video:</span> {video.name}
        </p>
      )}

      <div className="mt-2">
        {error?.message && <p className="text-error">{error.message}</p>}
        {progressFormatted && <span>{progressFormatted}</span>}
      </div>

      <div className="mt-8">
        <Button
          onClick={() => {
            createAsset?.();
          }}
          disabled={isLoading || !createAsset}
          loading={isLoading}
        >
          Upload video
        </Button>
      </div>
    </>
  );
};
