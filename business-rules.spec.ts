import { test, expect } from "@playwright/test";
import { StudentCreatePage } from "../page-objects/StudentCreatePage";
import { TestDataFactory } from "../utils/TestDataFactory";

test.describe("Business Rules - Music Staff App", () => {

  test("Status implications (Active vs Trial vs Waiting)", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    const email = TestDataFactory.uniqueEmail();
    await create.enterFirstName("Status");
    await create.enterLastName("Test");
    await create.enterEmail(email);
    await create.selectStatus("Trial"); // assume dropdown exists
    await create.save();

    await page.goto("/students");
    await expect(page.locator(`text=${email}`)).toBeVisible();
    await expect(page.locator(`tr:has-text("${email}") >> td.status`)).toHaveText("Trial");
  });

  test("Family account creation and linking", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    const emailChild = TestDataFactory.uniqueEmail();
    const emailParent = TestDataFactory.uniqueEmail();

    await create.enterFirstName("Child");
    await create.enterLastName("FamilyLink");
    await create.enterEmail(emailChild);
    await create.markAsChild(true);
    await create.enterParentEmail(emailParent);
    await create.createNewFamily();
    await create.save();

    await page.goto("/families");
    await expect(page.locator(`text=${emailParent}`)).toBeVisible();
    await expect(page.locator(`text=${emailChild}`)).toBeVisible();
  });

  test("Default settings application", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    const email = TestDataFactory.uniqueEmail();
    await create.enterFirstName("Default");
    await create.enterLastName("Settings");
    await create.enterEmail(email);
    await create.save();

    // Check default status applied automatically
    await page.goto("/students");
    await expect(page.locator(`tr:has-text("${email}") >> td.status`)).toHaveText("Active");
  });

  test("Billing setup flow", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    const email = TestDataFactory.uniqueEmail();
    await create.enterFirstName("Billing");
    await create.enterLastName("Test");
    await create.enterEmail(email);
    await create.selectPlan("Paid"); // assume dropdown exists
    await create.save();

    await page.goto("/billing");
    await expect(page.locator(`tr:has-text("${email}") >> td.plan`)).toHaveText("Paid");
  });

});
