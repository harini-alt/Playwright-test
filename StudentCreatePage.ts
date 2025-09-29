import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StudentCreatePage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private phoneInput: Locator;
  private parentEmailInput: Locator;
  private childCheckbox: Locator;
  private saveButton: Locator;
  private statusDropdown: Locator;
  private planDropdown: Locator;
  private familyDropdown: Locator;
  private createFamilyBtn: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.parentEmailInput = page.locator("#parentEmail");
    this.childCheckbox = page.locator("#isChild");
    this.saveButton = page.locator("button#save");
    this.statusDropdown = page.locator("#status");
    this.planDropdown = page.locator("#plan");
    this.familyDropdown = page.locator("#family");
    this.createFamilyBtn = page.locator("button#createFamily");
  }

  async goto(url: string = "/students/new") {
    await this.page.goto(url);
  }

  // Form fields
  async enterFirstName(firstName: string) {
    await this.firstNameInput.fill(firstName);
  }

  async enterLastName(lastName: string) {
    await this.lastNameInput.fill(lastName);
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async markAsChild(mark: boolean) {
    const checked = await this.childCheckbox.isChecked();
    if (mark !== checked) {
      await this.childCheckbox.click();
    }
  }

  async enterParentEmail(email: string) {
    await this.parentEmailInput.fill(email);
  }

  async save() {
    await this.saveButton.click();
  }

  // Business logic methods
  async selectStatus(status: string) {
    await this.statusDropdown.selectOption({ label: status });
  }

  async selectPlan(plan: string) {
    await this.planDropdown.selectOption({ label: plan });
  }

  async selectFamilyByName(familyName: string) {
    await this.familyDropdown.selectOption({ label: familyName });
  }

  async createNewFamily() {
    await this.createFamilyBtn.click();
  }

  // Utility / Data verification
  async verifyFieldValue(selector: string, expectedValue: string) {
    await this.page.locator(selector).waitFor();
    const value = await this.page.locator(selector).inputValue();
    if (value !== expectedValue) {
      throw new Error(`Expected ${expectedValue} but got ${value}`);
    }
  }
}


