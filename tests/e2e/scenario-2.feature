Feature: Transfer to sanctioned recipient

Scenario: User attempts to transfer to sanctioned recipient 
Given I have logged in
When I navigate to the transfer money page
And I select sanctioned recipient 
And I enter a valid transfer amount 
Then the transaction will not be processed with an error message displayed