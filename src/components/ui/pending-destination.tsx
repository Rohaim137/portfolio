type PendingDestinationProps = Readonly<{
  label: string;
}>;

export function PendingDestination({ label }: PendingDestinationProps) {
  return (
    <span className="pending-destination" data-testid={`social-${label.toLowerCase()}-pending`}>
      {label} — link pending
    </span>
  );
}
