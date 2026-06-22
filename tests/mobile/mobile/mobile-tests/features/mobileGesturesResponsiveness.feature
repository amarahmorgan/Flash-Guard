Feature: Mobile Responsiveness And Gestures

  Background:
    Given I am logged into the mobile app

  @mobile @gestures @p1 @T-MOB-GEST-001
  Scenario: T-MOB-GEST-001 Swipe gesture works on transaction history
    When I open the mobile history tab
    And I perform a mobile swipe gesture
    Then mobile transaction records should still be displayed

  @mobile @gestures @p1 @T-MOB-GEST-002
  Scenario: T-MOB-GEST-002 Long press gesture does not crash the app
    When I open the mobile history tab
    And I perform a mobile long press gesture
    Then the mobile app should remain usable

  @mobile @gestures @p1 @T-MOB-GEST-003
  Scenario: T-MOB-GEST-003 Rotation keeps the app usable
    When I rotate the mobile device landscape and portrait
    Then the mobile device should return to portrait mode

  @mobile @gestures @p1 @T-MOB-GEST-004
  Scenario: T-MOB-GEST-004 Device size can be detected for responsiveness
    When I check the mobile device size
    Then the mobile device dimensions should be available
