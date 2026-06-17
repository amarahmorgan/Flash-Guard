import { expect, type Page } from '@playwright/test';

export class LoginPage {
  constructor(private readonly page: Page) { }

  // Landing page locators
  private getStartedButton = () =>
    this.page.getByRole('link', { name: 'Get Started' }).first();

  private signInLink = () =>
    this.page.getByRole('link', { name: 'Sign In' });

  // Login page locators
  private emailInput = () =>
    this.page.getByLabel('Email address');

  private passwordInput = () =>
    this.page.getByLabel('Password');

  private signInButton = () =>
    this.page.getByRole('button', { name: 'Sign In' });

  private createAccountButton = () =>
    this.page.getByRole('button', { name: 'Create account' });

  private forgotPasswordLink = () =>
    this.page.getByRole('link', { name: 'Forgot password?' });

  // Navigation actions
  async gotoLandingPage(): Promise<void> {
    await this.page.goto('http://localhost:3000/');
  }

  async goToLoginFromGetStarted(): Promise<void> {
    await this.getStartedButton().click();
  }

  async goToLoginFromSignIn(): Promise<void> {
    await this.signInLink().click();
  }

  // Login actions
  async enterEmail(email: string): Promise<void> {
    await this.emailInput().fill(email);
  }

  async enterPassword(password: string): Promise<void> {
    await this.passwordInput().fill(password);
  }

 async clickSignIn(): Promise<void> {
  await this.signInButton().click();
  await this.page.waitForURL('**/dashboard');

 
}

async signInWithDefaultUser(): Promise<void> {
  await this.signInButton().click();
  await this.page.waitForURL('**/dashboard');
}

  // Custom login
  async login(email: string, password: string): Promise<void> {
    await this.emailInput().fill(email);
    await this.passwordInput().fill(password);
    await this.signInButton().click();

    await this.page.waitForURL('**/dashboard');
  }

  async loginUnsuccessfully(email: string, password: string): Promise<void> {
  await this.emailInput().fill(email);
  await this.passwordInput().fill(password);
  await this.signInButton().click();
}

  // Assertions
  async expectLandingPageVisible(): Promise<void> {
    // await expect(this.page.getByText('PrimeFin SA')).toBeVisible();
    // await expect(this.page.getByText('Money, Airtime & Data Management')).toBeVisible();
    // async expectLandingPageVisible(): Promise<void> {
    await expect(
      this.page.getByRole('link', { name: 'PrimeFin SA' })
    ).toBeVisible();

    await expect(
      this.page.getByRole('link', { name: 'Get Started' }).first()
    ).toBeVisible();
  }


  async expectLoginPageVisible(): Promise<void> {
    await expect(
      this.page.getByRole('heading', {
        name: 'Access your account'
      })
    ).toBeVisible();
    await expect(this.emailInput()).toBeVisible();
    await expect(this.passwordInput()).toBeVisible();
    await expect(this.signInButton()).toBeVisible();
  }

  async expectCreateAccountVisible(): Promise<void> {
    await expect(this.createAccountButton()).toBeVisible();
  }

  async expectForgotPasswordVisible(): Promise<void> {
    await expect(this.forgotPasswordLink()).toBeVisible();
  }
}