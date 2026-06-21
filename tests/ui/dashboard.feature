Feature: Dashboard

  Scenario: T-UI-DASH-001 Load dashboard
    Given I am logged in
    Then the dashboard should load successfully

  Scenario: T-UI-DASH-002 Verify balance display
    Given I am logged in
    Then I should see the financial cards

  Scenario: T-UI-DASH-003 Verify recent transactions
    Given I am logged in
    Then I should see recent transactions

  Scenario: T-UI-DASH-004 Verify account information display
    Given I am logged in
    Then I should see account information

  Scenario: T-UI-DASH-003 Verify recent transactions list
    Given I am logged in
    Then I should see the recent transactions list

  Scenario: T-UI-DASH-002 Verify balance display accuracy
    Given I am logged in
    Then I should see the dashboard balance amounts
