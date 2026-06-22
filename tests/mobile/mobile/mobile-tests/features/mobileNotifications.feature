Feature: Mobile Notifications

  Background:
    Given I am logged into the mobile app

  @mobile @notifications @p1 @T-MOB-NOTIF-001
  Scenario: T-MOB-NOTIF-001 Push notification area can be opened for transfer alert
    When I open the mobile notification area
    Then the mobile notification area should be handled

  @mobile @notifications @p1 @T-MOB-NOTIF-002
  Scenario: T-MOB-NOTIF-002 Deep link from notification to transaction detail
    When I open a mobile notification deep link if available
    Then the mobile notification destination should be displayed

  @mobile @notifications @p1 @T-MOB-NOTIF-003
  Scenario: T-MOB-NOTIF-003 Notification permission prompt can be handled
    When I handle the mobile notification permission prompt if it appears
    Then the mobile app should remain usable
