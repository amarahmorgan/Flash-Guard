Feature: Notifications and Alerts

Background: Given the user is logged in

Scenario: TC09 Display notification for successful transfer
  Given I have completed a successful transfer
  When the transfer is processed
  Then I should see a success notification

Scenario: TC10 Display alert notification for important events
  Given an alert condition exists
  When the alert is triggered
  Then I should see an alert notification

Scenario: TC11 Display error message for failed actions
  Given I perform an invalid action
  When a validation or system error occurs
  Then I should see an error message