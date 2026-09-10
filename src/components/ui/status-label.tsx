type StatusLabelProps = Readonly<{
  children: string;
}>;

export function StatusLabel({ children }: StatusLabelProps) {
  return <span className="status-label">{children}</span>;
}
