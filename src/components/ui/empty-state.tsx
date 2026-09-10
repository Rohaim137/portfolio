import type { ReactNode } from "react";

type EmptyStateProps = Readonly<{
  heading: string;
  description: string;
  action?: ReactNode;
  testId?: string;
}>;

export function EmptyState({
  heading,
  description,
  action,
  testId = "empty-state",
}: EmptyStateProps) {
  return (
    <div className="empty-state" data-testid={testId}>
      <h2>{heading}</h2>
      <p>{description}</p>
      {action}
    </div>
  );
}
