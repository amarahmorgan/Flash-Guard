Feature: Mobile Balance And History

  Background:
    Given I am logged into the mobile app

  @mobile @history @p0 @T-MOB-HIST-001
  Scenario: T-MOB-HIST-001 Display current balance and spending summary
    When I open the mobile history tab
    Then the mobile balance and spending summary should be displayed

  @mobile @history @p0 @T-MOB-HIST-002
  Scenario: T-MOB-HIST-002 Show transaction history with scrolling
    When I open the mobile history tab
    And I scroll through the mobile transaction history
    Then mobile transaction records should be displayed

  @mobile @history @p0 @T-MOB-HIST-003
  Scenario: T-MOB-HIST-003 Filter history by transaction status
    When I open the mobile history tab
    And I filter mobile history by pending status
    Then the pending mobile history filter should be applied

  @mobile @history @p0 @T-MOB-HIST-004
  Scenario: T-MOB-HIST-004 Export or share transaction screenshot
    When I open the mobile history tab
    And I capture the mobile transaction history screenshot
    Then the mobile history screenshot should be saved
