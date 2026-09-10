import type { CompiledMdx } from "../domain";
import { CuratedMdxCompiler, type MdxCompileOptions } from "../compilation";
import { BuildMemo, contentFingerprint } from "./build-memo";

export class MemoizedMdxCompiler {
  readonly #compiler: CuratedMdxCompiler;
  readonly #memo: BuildMemo;

  constructor(memo: BuildMemo, compiler = new CuratedMdxCompiler()) {
    this.#memo = memo;
    this.#compiler = compiler;
  }

  compile(source: string, options: MdxCompileOptions): Promise<CompiledMdx> {
    const key = contentFingerprint(source, {
      contentKind: options.contentKind,
      componentNames: [...options.componentNames].sort(),
      componentMapVersion: 1,
    });

    return this.#memo.getOrCreate(`mdx:${key}`, async () => {
      this.#memo.recordCompilerCall();
      return this.#compiler.compile(source, options);
    });
  }
}
