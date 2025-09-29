import { test, expect } from "@playwright/test";
import { StudentCreatePage } from "../page-objects/StudentCreatePage";
import { TestDataFactory } from "../utils/TestDataFactory";

test.describe("Successful Creation Flows - Music Staff App", () => {

  test("Adult student with minimal data", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Minimal");
    await create.enterLastName("Adult");
    await create.enterEmail(TestDataFactory.uniqueEmail());
    await create.save();

    await expect(page.locator(".toast-success")).toHaveText("Student created successfully");
  });

  test("Adult student with complete profile", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Complete");
    await create.enterLastName("Adult");
    await create.enterEmail(TestDataFactory.uniqueEmail());
    await create.enterPhone(TestDataFactory.randomPhone());
    await create.save();

    await expect(page.locator(".toast-success")).toHaveText("Student created successfully");
  });

  test("Child student with new family", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Child");
    await create.enterLastName("NewFamily");
    await create.enterEmail(TestDataFactory.uniqueEmail());
    await create.markAsChild(true);
    await create.enterParentEmail(TestDataFactory.uniqueEmail());
    await create.createNewFamily();
    await create.save();

    await expect(page.locator(".toast-success")).toHaveText("Student created successfully");
  });

  test("Child student linking to existing family", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Child");
    await create.enterLastName("ExistingFamily");
    await create.enterEmail(TestDataFactory.uniqueEmail());
    await create.markAsChild(true);
    await create.selectFamilyByName("Smith Family"); // existing family
    await create.save();

    await expect(page.locator(".toast-success")).toHaveText("Student created successfully");
  });

});
