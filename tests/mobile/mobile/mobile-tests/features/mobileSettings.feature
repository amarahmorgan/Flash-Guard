Feature: Mobile Settings

  Background:
    Given I am logged into the mobile app

  @mobile @settings @p1 @T-MOB-SET-001
  Scenario: T-MOB-SET-001 Update profile area is accessible
    When I open the mobile account tab
    Then the mobile profile information should be displayed

  @mobile @settings @p1 @T-MOB-SET-002
  Scenario: T-MOB-SET-002 Change password or security area is accessible
    When I open the mobile account tab
    Then the mobile security settings should be displayed
