import { useState } from "react";

import { lit } from "lib/lit";

import type { ExtendedPage } from "@types";

const EncryptPage: ExtendedPage = () => {
  const [encryptedCid, setEncryptedCid] = useState("");

  const encrypt = async () => {
    const cid = await lit.encryptToIpfs(
      JSON.stringify({
        hello: "world",
      }),
    );
    if (!cid) return;

    setEncryptedCid(cid);

    console.log("Encrypted Cid: ", cid);
  };

  const decrypt = async () => {
    if (!encryptedCid) return;
    const decryptedData = await lit.decryptFromIpfs(encryptedCid);
    if (!decryptedData) return;

    const obj = JSON.parse(decryptedData.toString());

    console.log("Decrypted data: ", obj);
  };

  return (
    <div className="flex gap-10">
      <button onClick={encrypt}>Encrypt</button>
      <button onClick={decrypt}>Decrypt</button>
    </div>
  );
};

export default EncryptPage;
