export type ArtifactFinding = Readonly<{
  code: string;
  file: string;
  message: string;
}>;

export function deriveExpectedRoutes(workspaceRoot?: string): Promise<
  Readonly<{
    expected: Set<string>;
    records: ReadonlyArray<
      Readonly<{
        collection: string;
        relativeFile: string;
        slug: string;
        title?: string;
        draft: boolean;
        hasBody: boolean;
      }>
    >;
  }>
>;

export function auditArtifactIntegrity(
  options?: Readonly<{
    workspaceRoot?: string;
    outputRoot?: string;
  }>,
): Promise<ArtifactFinding[]>;

export function formatArtifactFindings(findings: readonly ArtifactFinding[]): string;
