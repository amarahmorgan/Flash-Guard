Feature: Authentication

  Scenario: T-UI-AUTH-001 Navigate to login page from Get Started
    Given I am on the landing page
    When I click Get Started
    Then I should see the login page

  Scenario: T-UI-AUTH-002 Login with default valid user
    Given I am on the login page
    When I sign in with the default user
    Then I should see the dashboard

  Scenario: T-UI-AUTH-003 Login with invalid password
    Given I am on the login page
    When I login with email "alice@flashguard.local" and password "wrongPassword"
    Then I should remain on the login page

  Scenario: T-UI-AUTH-004 Login with invalid email
    Given I am on the login page
    When I login with email "wrong@flashguard.local" and password "Password123"
    Then I should remain on the login page

  Scenario: Logout from application
    Given I am logged in
    When I sign out
    Then I should see the login page
