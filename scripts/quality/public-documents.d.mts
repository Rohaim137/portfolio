export type PublicDocumentFinding = Readonly<{
  code: string;
  file: string;
  message: string;
}>;

export function readDocumentManifest(workspaceRoot?: string): Promise<unknown[]>;
export function auditPublicDocuments(workspaceRoot?: string): Promise<PublicDocumentFinding[]>;
export function formatPublicDocumentFindings(findings: readonly PublicDocumentFinding[]): string;
