import { Page, Locator } from "@playwright/test";
import { BasePage } from "./BasePage";

export class StudentCreatePage extends BasePage {
  private firstNameInput: Locator;
  private lastNameInput: Locator;
  private emailInput: Locator;
  private phoneInput: Locator;
  private saveButton: Locator;

  constructor(page: Page) {
    super(page);
    this.firstNameInput = page.locator("#firstName");
    this.lastNameInput = page.locator("#lastName");
    this.emailInput = page.locator("#email");
    this.phoneInput = page.locator("#phone");
    this.saveButton = page.locator("button#save");
  }

  async goto() {
    await this.page.goto("/students/new");
  }

  async enterFirstName(name: string) {
    await this.firstNameInput.fill(name);
  }

  async enterLastName(name: string) {
    await this.lastNameInput.fill(name);
  }

  async enterEmail(email: string) {
    await this.emailInput.fill(email);
  }

  async enterPhone(phone: string) {
    await this.phoneInput.fill(phone);
  }

  async save() {
    await this.saveButton.click();
  }
}


