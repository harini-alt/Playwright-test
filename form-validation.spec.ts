import { test, expect } from "@playwright/test";
import { StudentCreatePage } from "../page-objects/StudentCreatePage";
import { TestDataFactory } from "../utils/TestDataFactory";

test.describe("Form Validation - Music Staff App", () => {

  test("Required field validation", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");
    await create.save(); // save without filling anything

    await expect(page.locator("#firstName-error")).toHaveText("First Name is required");
    await expect(page.locator("#email-error")).toHaveText("Email is required");
  });

  test("Email format validation", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Test");
    await create.enterLastName("User");
    await create.enterEmail("invalid-email");
    await create.save();

    await expect(page.locator("#email-error")).toHaveText("Enter a valid email address");
  });

  test("Phone number validation", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Phone");
    await create.enterLastName("Test");
    await create.enterEmail(TestDataFactory.uniqueEmail());
    await create.enterPhone("123ABC"); // invalid
    await create.save();

    await expect(page.locator("#phone-error")).toHaveText("Enter a valid phone number");
  });

  test("Child requires parent validation", async ({ page }) => {
    const create = new StudentCreatePage(page);
    await create.goto("/students/new");

    await create.enterFirstName("Child");
    await create.enterLastName("NoParent");
    await create.enterEmail(TestDataFactory.uniqueEmail());
    await create.markAsChild(true); // mark as child
    await create.save();

    await expect(page.locator("#parentEmail-error")).toHaveText("Parent email is required");
  });

});

