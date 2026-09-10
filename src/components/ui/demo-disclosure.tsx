import { portfolioCopy } from "@/lib/portfolio-experience";

export function DemoDisclosure() {
  return (
    <aside className="demo-disclosure" data-testid="demo-disclosure">
      <p className="eyebrow">Demonstration content</p>
      <p>{portfolioCopy.demoDisclosure}</p>
    </aside>
  );
}
