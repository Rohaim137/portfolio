import { expect, test } from "@playwright/test";

test("project filters expose selected and no-match states with reset", async ({ page }) => {
  await page.goto("/projects/");
  await expect(page.getByTestId("project-filter-status")).toHaveText("Showing 6 of 6 projects");

  const objectBox = page.getByTestId("project-filter-technology-objectbox");
  await objectBox.click();
  await expect(objectBox).toHaveAttribute("aria-pressed", "true");
  await expect(page.getByTestId("project-filter-status")).toHaveText("Showing 1 of 6 projects");
  await expect(page.getByRole("link", { name: "StudySync" })).toBeVisible();

  await page.getByTestId("project-filter-projecttype-full-stack-web-application").click();
  await expect(page.getByTestId("project-filter-no-match")).toBeVisible();
  await page.getByTestId("project-filter-empty-reset").click();
  await expect(page.getByTestId("project-filter-status")).toHaveText("Showing 6 of 6 projects");
});

test("project gallery supports arrows, Escape, and focus restoration", async ({ page }) => {
  await page.goto("/projects/content-system-demo/");
  await expect(page.getByTestId("demo-disclosure")).toBeVisible();
  const triggers = page.getByTestId("project-gallery-image-button");
  await expect(triggers).toHaveCount(2);
  await triggers.first().click();
  const dialog = page.getByTestId("media-lightbox");
  await expect(dialog).toBeVisible();
  await expect(dialog.getByText("Image 1 of 2")).toBeVisible();
  await dialog.press("ArrowRight");
  await expect(dialog.getByText("Image 2 of 2")).toBeVisible();
  await dialog.press("ArrowLeft");
  await expect(dialog.getByText("Image 1 of 2")).toBeVisible();
  await dialog.press("Escape");
  await expect(dialog).toBeHidden();
  await expect(triggers.first()).toBeFocused();
});

test("verified project links preserve the CV-supported disclosure boundary", async ({ page }) => {
  await page.goto("/projects/doodle-predictor/");
  await expect(page.getByTestId("demo-disclosure")).toHaveCount(0);
  await expect(page.getByTestId("project-detail-live-link")).toHaveAttribute(
    "href",
    "https://doodle-predictor.vercel.app",
  );
  await expect(page.getByTestId("project-detail-repository-link")).toHaveCount(0);
});
