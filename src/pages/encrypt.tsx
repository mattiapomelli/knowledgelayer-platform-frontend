import { useState } from "react";

import { lit } from "lib/lit";

import type { ExtendedPage } from "@types";

const blobToBase64 = (blob: Blob) => {
  const reader = new FileReader();
  reader.readAsDataURL(blob);

  return new Promise<string | undefined>((resolve) => {
    reader.onloadend = () => {
      resolve(reader.result?.toString());
    };
  });
};

const base64ToBlob = async (base64String: string) => {
  return await (await fetch(base64String)).blob();
};

const EncryptPage: ExtendedPage = () => {
  const [encryptedString, setEncryptedString] = useState("");
  const [encryptedKey, setEncryptedKey] = useState("");

  const encrypt = async () => {
    const encrypted = await lit.encrypt("Hello world");
    console.log("Encrypted String: ", encrypted);

    if (!encrypted) return;

    const encryptedStringBase64 = await blobToBase64(encrypted.encryptedString);
    if (!encryptedStringBase64) return;

    setEncryptedString(encryptedStringBase64);
    setEncryptedKey(encrypted.encryptedSymmetricKey);
  };

  const decrypt = async () => {
    if (!encryptedString || !encryptedKey) return;

    const blob = await base64ToBlob(encryptedString);

    const decrypted = await lit.decrypt(blob, encryptedKey);
    console.log("Decrypted String: ", decrypted);
  };

  return (
    <div className="flex gap-10">
      <button onClick={encrypt}>Encrypt</button>
      <button onClick={decrypt}>Decrypt</button>
    </div>
  );
};

export default EncryptPage;
