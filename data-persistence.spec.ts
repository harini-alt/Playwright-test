import { test, expect } from "@playwright/test";
import { StudentCreatePage } from "../page-objects/StudentCreatePage";
import { TestDataFactory } from "../utils/TestDataFactory";

test.describe("Data Persistence - Music Staff App", () => {

  test("Student appears in listing immediately", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    const email = TestDataFactory.uniqueEmail();
    await create.enterFirstName("Persist");
    await create.enterLastName("Listing");
    await create.enterEmail(email);
    await create.save();

    await page.goto("/students"); // student list page
    await expect(page.locator(`text=${email}`)).toBeVisible();
  });

  test("All data saved correctly & details page shows accurate data", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    const email = TestDataFactory.uniqueEmail();
    await create.enterFirstName("Full");
    await create.enterLastName("Data");
    await create.enterEmail(email);
    await create.enterPhone(TestDataFactory.randomPhone());
    await create.save();

    await page.goto("/students");
    await page.click(`text=${email}`); // go to details page

    await expect(page.locator("#firstName")).toHaveValue("Full");
    await expect(page.locator("#lastName")).toHaveValue("Data");
    await expect(page.locator("#email")).toHaveValue(email);
  });

  test("Data persists across sessions", async ({ browser }) => {
    const context1 = await browser.newContext();
    const page1 = await context1.newPage();
    const create = new StudentCreatePage(page1);
    await create.goto("/students/new");

    const email = TestDataFactory.uniqueEmail();
    await create.enterFirstName("Persist");
    await create.enterLastName("Session");
    await create.enterEmail(email);
    await create.save();
    await context1.close(); // close session

    const context2 = await browser.newContext();
    const page2 = await context2.newPage();
    await page2.goto("/students");

    await expect(page2.locator(`text=${email}`)).toBeVisible();
    await context2.close();
  });

});
