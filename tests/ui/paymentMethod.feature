Feature: Add/Remove payment method

Scenario: Adding payment method
Given I am logged in 
When I am navigate to payment method page
And I enter my new card details  
Then my new payment method should be added