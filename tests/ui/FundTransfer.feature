Feature: Fund Transfers

Background: User is logged in

Scenario: TC01 Initiate transfer with valid recipient and amount
  When I transfer funds to a valid recipient
  Then I should see the transfer confirmation screen

Scenario: TC02 Enter a valid transfer amount
  Given I am creating a transfer
  When I enter a valid transfer amount
  Then I should be able to continue

Scenario: TC03 Enter an amount below the minimum limit
  Given I am creating a transfer
  When I enter an amount below the minimum limit
  Then I should see an amount validation error

Scenario: TC04 Enter an amount above the maximum limit
  Given I am creating a transfer
  When I enter an amount above the maximum limit
  Then I should see an amount validation error

Scenario: TC05 Transfer to a blocked recipient
  Given I am creating a transfer
  When I select a blocked recipient
  Then I should see a recipient validation error

Scenario: TC06 Transfer to my own account
  Given I am creating a transfer
  When I select my own account as the recipient
  Then I should see a self-transfer validation error

Scenario: TC07 Complete transfer with a valid OTP
  Given I am on the transfer confirmation page
  When I enter a valid OTP
  Then the transfer should be completed successfully

Scenario: TC08 Transfer request times out
  Given I am creating a transfer
  When the transfer service times out
  Then I should see a transfer timeout message