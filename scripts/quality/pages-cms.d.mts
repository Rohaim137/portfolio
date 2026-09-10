export type QualityFinding = Readonly<{
  code: string;
  location: string;
  message: string;
}>;

export function validatePagesCmsConfig(config: unknown): QualityFinding[];
export function parsePagesCmsSource(source: string): Readonly<{
  config: unknown;
  findings: QualityFinding[];
}>;
export function auditPagesCmsConfig(workspaceRoot?: string): Promise<QualityFinding[]>;
export function formatPagesCmsFindings(findings: readonly QualityFinding[]): string;
