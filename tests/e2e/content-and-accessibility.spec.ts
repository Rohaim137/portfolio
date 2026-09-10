import AxeBuilder from "@axe-core/playwright";
import { expect, test } from "@playwright/test";

test("article, reading, documents, Demo, and pending states are truthful", async ({ page }) => {
  await page.goto("/blog/accessible-state-demo/");
  await expect(page.getByTestId("demo-disclosure")).toContainText("not presented as the owner's");
  await expect(page.getByTestId("article-table-of-contents")).toBeVisible();
  await expect(page.getByRole("article").getByRole("heading", { level: 2 })).toHaveCount(4);

  await page.goto("/reading/");
  await expect(page.getByTestId("reading-empty-state")).toContainText(
    "Reading notes are not published yet",
  );
  await page.goto("/docs/");
  await expect(page.getByTestId("documents-empty-state")).toContainText(
    "No public documents available",
  );
  await page.goto("/");
  await expect(page.getByTestId("social-x-pending").first()).toContainText("link pending");
});

test("representative routes have no serious axe findings", async ({ page }) => {
  for (const route of [
    "/",
    "/projects/",
    "/projects/content-system-demo/",
    "/blog/accessible-state-demo/",
  ]) {
    await page.goto(route);
    const result = await new AxeBuilder({ page })
      .withTags(["wcag2a", "wcag2aa", "wcag21a", "wcag21aa"])
      .analyze();
    expect(
      result.violations.filter(
        (violation) => violation.impact === "serious" || violation.impact === "critical",
      ),
    ).toEqual([]);
  }
});

test("320 pixel layout does not overflow and reduced motion is active", async ({ page }) => {
  await page.setViewportSize({ width: 320, height: 720 });
  for (const route of ["/", "/projects/", "/blog/accessible-state-demo/", "/about/"]) {
    await page.goto(route);
    expect(
      await page.evaluate(() => document.documentElement.scrollWidth <= window.innerWidth),
    ).toBe(true);
  }
  expect(await page.evaluate(() => matchMedia("(prefers-reduced-motion: reduce)").matches)).toBe(
    true,
  );
  expect(
    await page.locator("html").evaluate((element) => getComputedStyle(element).scrollBehavior),
  ).toBe("auto");
});
