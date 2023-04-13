import { ethers } from "ethers";
import { hardhat } from "wagmi/chains";

import { KnowledgeLayerCourseAbi } from "@abis/knowledgelayer-course";
import { KNOWLEDGELAYER_COURSE_ADDRESS } from "constants/addresses";

import type { KnowledgeLayerCourse } from "@abis/types/knowledgelayer-course";
import type { NextApiRequest, NextApiResponse } from "next";

export default async function handler(
  req: NextApiRequest,
  res: NextApiResponse,
) {
  if (req.method === "POST") {
    console.log("Body: ", req.body);

    const { accessKey: userAddress } = req.body;

    const provider = new ethers.providers.JsonRpcProvider(
      "http://localhost:8545",
    );
    const knowledgeLayerCourse = new ethers.Contract(
      KNOWLEDGELAYER_COURSE_ADDRESS[hardhat.id],
      KnowledgeLayerCourseAbi,
      provider,
    ) as KnowledgeLayerCourse;

    const balance = await knowledgeLayerCourse.balanceOf(userAddress, 1);
    if (balance.gt(0)) {
      return res.status(200).send({ message: "OK" });
    }

    return res.status(401).send({ message: "Unauthorized" });
  } else {
    return res.status(405).send({ message: "Method not allowed" });
  }
}
