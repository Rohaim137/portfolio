import type {
  ReadingGroups as ReadingGroupsModel,
  ReadingStatus,
} from "@/lib/content-application-foundation/domain";

import { ReadingItem } from "./reading-item";

const groupOrder: readonly ReadingStatus[] = ["queued", "reading", "completed"];

export function ReadingGroups({ groups }: Readonly<{ groups: ReadingGroupsModel }>) {
  return groupOrder.map((status) =>
    groups[status].length > 0 ? (
      <section className="content-section content-section--compact" key={status}>
        <h2>{status === "queued" ? "Queued" : status === "reading" ? "Reading" : "Completed"}</h2>
        <ul className="reading-list">
          {groups[status].map((item) => (
            <li className="reading-item" key={item.slug}>
              <ReadingItem item={item} />
            </li>
          ))}
        </ul>
      </section>
    ) : null,
  );
}
