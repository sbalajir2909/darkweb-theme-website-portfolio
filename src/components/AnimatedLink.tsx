import { Link } from "react-router-dom";
import type { LinkProps } from "react-router-dom";

export default function AnimatedLink({ children, className = "", ...rest }: LinkProps & { className?: string }) {
  const text = typeof children === "string" ? children : "";
  return (
    <Link
      {...rest}
      className={`px-2 py-1 rounded nav-glitch hover:bg-white/5 focus-visible:bg-white/10 outline-none ${className}`}
      data-text={text}
    >
      {children}
    </Link>
  );
}
