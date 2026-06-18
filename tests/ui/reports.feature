Feature: Reports and Export

  Scenario: T-UI-REP-001 Generate transaction report exports
    Given I am logged in
    When I navigate to transaction history
    Then I should see the reports page
    And I should be able to export CSV
    And I should be able to export PDF

  Scenario: T-UI-REP-002 Filter and date range selection
    Given I am logged in
    When I navigate to transaction history
    And I enter a date range
    And I select a transaction status
    And I apply the report filters
    Then I should see the transaction table
