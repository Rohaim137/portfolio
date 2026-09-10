import type { ReactNode } from "react";

type SectionHeaderProps = Readonly<{
  eyebrow?: string;
  heading: string;
  description?: string;
  action?: ReactNode;
}>;

export function SectionHeader({ eyebrow, heading, description, action }: SectionHeaderProps) {
  return (
    <header className="section-header">
      <div>
        {eyebrow ? <p className="eyebrow">{eyebrow}</p> : null}
        <h2>{heading}</h2>
      </div>
      <div>
        {description ? <p className="section-copy">{description}</p> : null}
        {action}
      </div>
    </header>
  );
}
