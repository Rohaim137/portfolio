export type MdxSafetyCode =
  | "MDX_ESM_FORBIDDEN"
  | "MDX_SCRIPT_FORBIDDEN"
  | "MDX_RAW_HTML_FORBIDDEN"
  | "MDX_EXECUTABLE_URL_FORBIDDEN"
  | "MDX_COMPONENT_UNDECLARED"
  | "MDX_EXPRESSION_FORBIDDEN"
  | "MDX_EVENT_HANDLER_FORBIDDEN";

export type MdxSafetyIssue = Readonly<{
  code: MdxSafetyCode;
  message: string;
  line: number;
}>;

export function inspectMdxSafety(
  source: string,
  componentNames: readonly string[],
): readonly MdxSafetyIssue[] {
  const issues: MdxSafetyIssue[] = [];
  const approved = new Set(componentNames);
  const inspectable = maskCode(source);
  const lines = inspectable.split(/\r?\n/);

  lines.forEach((line, index) => {
    const lineNumber = index + 1;

    if (/^\s*(?:import|export)\s/.test(line)) {
      issues.push(
        issue("MDX_ESM_FORBIDDEN", "ES module statements are not allowed in content.", lineNumber),
      );
    }
    if (/<\/?script\b/i.test(line)) {
      issues.push(
        issue("MDX_SCRIPT_FORBIDDEN", "Script elements are not allowed in content.", lineNumber),
      );
    }
    if (/\b(?:javascript|vbscript|data\s*:\s*text\/html)\s*:/i.test(line)) {
      issues.push(
        issue(
          "MDX_EXECUTABLE_URL_FORBIDDEN",
          "Executable URL protocols are not allowed in content.",
          lineNumber,
        ),
      );
    }
    if (/\bon[A-Z][A-Za-z]*\s*=/.test(line)) {
      issues.push(
        issue(
          "MDX_EVENT_HANDLER_FORBIDDEN",
          "Inline event handlers are not allowed in content.",
          lineNumber,
        ),
      );
    }
    if (/[{}]/.test(line)) {
      issues.push(
        issue(
          "MDX_EXPRESSION_FORBIDDEN",
          "JavaScript expressions are not allowed in curated content.",
          lineNumber,
        ),
      );
    }

    for (const match of line.matchAll(/<\/?([A-Za-z][\w.-]*)\b/g)) {
      const tagName = match[1];
      if (tagName[0] === tagName[0]?.toLowerCase()) {
        issues.push(
          issue(
            "MDX_RAW_HTML_FORBIDDEN",
            `Raw HTML element <${tagName}> is not allowed.`,
            lineNumber,
          ),
        );
      } else if (!approved.has(tagName)) {
        issues.push(
          issue(
            "MDX_COMPONENT_UNDECLARED",
            `Component <${tagName}> is not in the curated component map.`,
            lineNumber,
          ),
        );
      }
    }
  });

  return deduplicateIssues(issues);
}

function maskCode(source: string): string {
  return source
    .replace(/```[\s\S]*?```/g, (value) => value.replace(/[^\r\n]/g, " "))
    .replace(/`[^`\r\n]*`/g, (value) => " ".repeat(value.length));
}

function issue(code: MdxSafetyCode, message: string, line: number): MdxSafetyIssue {
  return { code, message, line };
}

function deduplicateIssues(issues: readonly MdxSafetyIssue[]): readonly MdxSafetyIssue[] {
  const keys = new Set<string>();
  return issues.filter((item) => {
    const key = `${item.code}:${item.line}:${item.message}`;
    if (keys.has(key)) {
      return false;
    }
    keys.add(key);
    return true;
  });
}
