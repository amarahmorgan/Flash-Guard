Feature: Mobile Fund Transfers

  Background:
    Given I am logged into the mobile app

  @mobile @transfer @p0 @T-MOB-TR-001
  Scenario: T-MOB-TR-001 Select recipient using beneficiary list
    When I open the mobile transfer tab
    And I select a mobile transfer recipient
    Then the mobile transfer recipient should be selected

  @mobile @transfer @p0 @T-MOB-TR-002
  Scenario: T-MOB-TR-002 Enter amount with decimal validation
    When I open the mobile transfer tab
    And I enter a valid mobile transfer amount
    Then the mobile transfer amount should be accepted

  @mobile @transfer @p0 @T-MOB-TR-003
  Scenario: T-MOB-TR-003 Enter OTP confirmation for a pending transfer
    Given I have a pending mobile transfer
    When I enter the mobile OTP confirmation code
    Then the mobile transfer approval should be handled

  @mobile @transfer @p0 @T-MOB-TR-004
  Scenario: T-MOB-TR-004 Confirm transfer and display success message
    When I open the mobile transfer tab
    And I complete valid mobile transfer details
    And I submit the mobile transfer
    Then a mobile transfer success message should be displayed

  @mobile @transfer @p0 @T-MOB-TR-005
  Scenario: T-MOB-TR-005 Cancel transfer using Android back button
    When I open the mobile transfer tab
    And I cancel the mobile transfer
    Then the mobile transfer should not be processed
