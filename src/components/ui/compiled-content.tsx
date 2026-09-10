import { run } from "@mdx-js/mdx";
import type { ComponentPropsWithoutRef } from "react";
import * as runtime from "react/jsx-runtime";
import type { MDXComponents } from "mdx/types";

import type { CompiledMdx, HeadingEntry } from "@/lib/content-application-foundation/domain";

export async function CompiledContent({ content }: Readonly<{ content: CompiledMdx }>) {
  const { default: Content } = await run(content.compiledSource, {
    ...runtime,
    baseUrl: import.meta.url,
  });

  return <Content components={createComponents(content.headings)} />;
}

function createComponents(headings: readonly HeadingEntry[]): MDXComponents {
  const byDepth = new Map<number, HeadingEntry[]>();
  const positions = new Map<number, number>();
  for (const heading of headings) {
    byDepth.set(heading.depth, [...(byDepth.get(heading.depth) ?? []), heading]);
  }

  function anchorFor(depth: number) {
    const position = positions.get(depth) ?? 0;
    positions.set(depth, position + 1);
    return byDepth.get(depth)?.[position]?.anchor;
  }

  return {
    h2: (props: ComponentPropsWithoutRef<"h2">) => <h2 {...props} id={anchorFor(2)} />,
    h3: (props: ComponentPropsWithoutRef<"h3">) => <h3 {...props} id={anchorFor(3)} />,
    h4: (props: ComponentPropsWithoutRef<"h4">) => <h4 {...props} id={anchorFor(4)} />,
    a: ({ href = "", ...props }: ComponentPropsWithoutRef<"a">) => {
      const external = href.startsWith("https://");
      return <a {...props} href={href} rel={external ? "noreferrer" : undefined} />;
    },
    Note: ({ children }: ComponentPropsWithoutRef<"aside">) => (
      <aside className="content-note">{children}</aside>
    ),
  };
}
