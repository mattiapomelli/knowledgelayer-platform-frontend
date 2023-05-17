import cx from "classnames";
import Image from "next/image";
import Link from "next/link";

export interface LogoProps {
  href?: string;
  className?: string;
}

export const Logo = ({ href = "/", className }: LogoProps) => {
  return (
    <Link href={href} className="flex items-center gap-3">
      <Image src="/logo.png" width={30} height={30} alt="Logo" />
      <span className={cx("text-xl font-extrabold", className)}>uKnow</span>
    </Link>
  );
};
