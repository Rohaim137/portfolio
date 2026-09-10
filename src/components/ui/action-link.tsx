import Link from "next/link";
import type { ReactNode } from "react";

import { ArrowUpRightIcon } from "./icons";

type ActionLinkProps = Readonly<{
  children: ReactNode;
  href: string;
  testId: string;
  className?: string;
}>;

export function ActionLink({ children, href, testId, className = "action-link" }: ActionLinkProps) {
  const external = !href.startsWith("/");
  const content = (
    <>
      <span>{children}</span>
      {external ? <ArrowUpRightIcon /> : null}
    </>
  );

  return external ? (
    <a className={className} data-testid={testId} href={href} rel="noreferrer" target="_blank">
      {content}
    </a>
  ) : (
    <Link className={className} data-testid={testId} href={href}>
      {content}
    </Link>
  );
}
