Feature: Mobile App Authentication

  @mobile @auth @p0 @T-MOB-AUTH-001
  Scenario: T-MOB-AUTH-001 Login with valid email and password
    Given the FlashGuard mobile app is running
    When I log into the mobile app with valid credentials
    Then the mobile dashboard should be displayed

  @mobile @auth @p0 @negative @T-MOB-AUTH-002
  Scenario: T-MOB-AUTH-002 Login with invalid email and password
    Given the FlashGuard mobile app is on the login screen
    When I log into the mobile app with invalid credentials
    Then a mobile authentication error should be displayed

  @mobile @auth @p0 @T-MOB-AUTH-003
  Scenario: T-MOB-AUTH-003 Camera face check login opens biometric flow
    Given the FlashGuard mobile app is on the login screen
    When I start the camera face check login
    Then the face check modal should be displayed

  @mobile @auth @p0 @T-MOB-AUTH-004
  Scenario: T-MOB-AUTH-004 Session remains stable after background and reopen
    Given I am logged into the mobile app
    When I background and reopen the mobile app
    Then the mobile session should still be usable
