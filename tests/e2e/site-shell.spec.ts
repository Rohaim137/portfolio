import { expect, test } from "@playwright/test";

test("overview, navigation, skip link, and not-found recovery", async ({ page }) => {
  await page.goto("/");
  await expect(page.getByRole("heading", { level: 1, name: "Muhammad Rohaim" })).toBeVisible();
  await expect(
    page.getByText(
      "Computer Science graduate working across enterprise software, AI, full-stack systems, and game development.",
    ),
  ).toBeVisible();
  await page.keyboard.press("Tab");
  await expect(page.getByTestId("site-skip-link")).toBeFocused();

  await page.getByRole("link", { name: "About", exact: true }).click();
  await expect(page).toHaveURL(/\/about\/$/u);
  await expect(page.getByRole("link", { name: "About", exact: true })).toHaveAttribute(
    "aria-current",
    "page",
  );
  await expect(page.getByText("CGPA 3.73/4.00", { exact: false })).toBeVisible();

  const response = await page.goto("/not-a-published-route/");
  expect(response?.status()).toBe(404);
  await expect(
    page.getByRole("heading", { level: 1, name: "This page is not in the collection." }),
  ).toBeVisible();
  await page.getByTestId("not-found-home-link").click();
  await expect(page).toHaveURL(/\/$/u);
});

test("mobile navigation closes on Escape and restores trigger focus", async ({ page }) => {
  await page.setViewportSize({ width: 375, height: 720 });
  await page.goto("/");
  const trigger = page.getByTestId("primary-navigation-menu-button");
  await trigger.click();
  await expect(trigger).toHaveAttribute("aria-expanded", "true");
  const projectsLink = page.getByRole("link", { name: "Projects", exact: true });
  await projectsLink.focus();
  await page.keyboard.press("Escape");
  await expect(trigger).toHaveAttribute("aria-expanded", "false");
  await expect(trigger).toBeFocused();
});
