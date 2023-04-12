import jazzicon from "@metamask/jazzicon";
import { useLayoutEffect, useMemo, useRef } from "react";

interface AddressAvatarProps {
  address: `0x${string}`;
  size?: number;
}

export const AddressAvatar = ({ address, size = 16 }: AddressAvatarProps) => {
  const iconRef = useRef<HTMLSpanElement>(null);
  const icon = useMemo(
    () => jazzicon(size, parseInt(address.slice(2, 10), 16)),
    [address, size],
  );

  useLayoutEffect(() => {
    const current = iconRef.current;
    current?.appendChild(icon);

    return () => {
      current?.removeChild(icon);
    };
  }, [icon, iconRef]);

  return <span ref={iconRef} className="inline-flex" />;
};
