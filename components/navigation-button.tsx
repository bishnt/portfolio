import Link from "next/link";
import React from "react";

type NavigationButtonProps = {
  href: string;
  label: string;
  className?: string;
};

export default function NavigationButton({
  href,
  label,
  className = "",
}: NavigationButtonProps) {
  const baseClasses =
    "inline-flex items-center justify-center px-3 py-1.5 rounded-md border border-white/20 bg-white/10 hover:bg-white/20 text-white transition-colors duration-200 backdrop-blur-sm";

  return (
    <Link href={href} className={`${baseClasses} ${className}`.trim()}>
      {label}
    </Link>
  );
}

