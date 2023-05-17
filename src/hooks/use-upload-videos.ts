import { useCreateAsset } from "@livepeer/react";
import { useEffect, useMemo } from "react";

// import { env } from "env.mjs";

import type { Asset } from "@livepeer/react";

interface UseUploadVideoOptions {
  onSuccess?: (assets: Asset[]) => void;
}

export const useUploadVideos = (
  videos: File[],
  options?: UseUploadVideoOptions,
) => {
  const {
    data: assets,
    status,
    progress,
    ...mutation
  } = useCreateAsset({
    sources: videos.map((video) => ({
      name: video.name || "",
      file: video,
      // playbackPolicy: {
      //   type: "webhook",
      //   // This is the id of the webhook you created in step 2
      //   webhookId: env.NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID || "",
      //   webhookContext: {
      //     // This is the context you want to pass to your webhook
      //     // It can be anything you want, and it will be passed back to your webhook
      //   },
      // },
    })),
    // sources: [
    //   {
    //     name: video.name,
    //     file: video,
    //     playbackPolicy: {
    //       type: "webhook",
    //       // This is the id of the webhook you created in step 2
    //       webhookId: env.NEXT_PUBLIC_LIVEPEER_WEBHOOK_ID || "",
    //       webhookContext: {
    //         // This is the context you want to pass to your webhook
    //         // It can be anything you want, and it will be passed back to your webhook
    //       },
    //     },
    //   },
    // ] as const,
  });

  useEffect(() => {
    // if (assets?.[0]?.status?.phase === "ready") {
    //   options?.onSuccess?.(assets);
    // }

    if (!assets) return;

    // Check all assets are ready
    for (const asset of assets) {
      if (asset.status?.phase !== "ready") {
        return;
      }
    }

    options?.onSuccess?.(assets);
  }, [assets, options]);

  const isLoading = useMemo(
    () =>
      status === "loading" ||
      (assets?.[0] && assets[0].status?.phase !== "ready"),
    [status, assets],
  );

  const progressFormatted = useMemo(() => {
    return progress?.map((p) =>
      p.phase === "failed"
        ? "Failed to process video."
        : p.phase === "waiting"
        ? "Waiting..."
        : p.phase === "uploading"
        ? `Uploading: ${Math.round(p.progress * 100)}%`
        : p.phase === "processing"
        ? `Processing: ${Math.round(p.progress * 100)}%`
        : "Uploaded ✅",
    );
  }, [progress]);

  return {
    ...mutation,
    isLoading,
    data: assets,
    status,
    progress,
    progressFormatted,
  };
};
