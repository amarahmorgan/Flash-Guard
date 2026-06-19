Feature: Fund Transfers

Background:
Given the user is on the login page

Scenario: TC01 Successfully transfer funds between accounts
When the user logs in successfully
And the user navigates to the Transfer Funds page
And the user selects "Alice Ledger" as the source account
And the user selects the recipient account
And the user enters "100" as the transfer amount
And the user enters "alice to lola, in alice account" as the transfer reference
And the user confirms the transfer
Then the transfer request should be submitted successfully
