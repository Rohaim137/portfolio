export type AntiSlopFinding = Readonly<{
  code: string;
  file: string;
  message: string;
}>;

export function auditTextPolicies(relativeFile: string, source: string): AntiSlopFinding[];
export function auditCssPolicies(relativeFile: string, source: string): AntiSlopFinding[];
export function auditRequiredIds(files: ReadonlyMap<string, string>): AntiSlopFinding[];
export function auditAntiSlop(workspaceRoot?: string): Promise<AntiSlopFinding[]>;
export function formatAntiSlopFindings(findings: readonly AntiSlopFinding[]): string;
