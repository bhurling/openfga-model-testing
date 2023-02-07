Feature: Entitlements

  Users should only have access to features that their organization is entitled to.

  Scenario: Access denied on Team feature
    Given I am a member of the MegaCorp organization
    And MegaCorp organization is on the Free plan
    And Draft-PRs is a feature on the Team plan
    When I want to access Draft-PRs
    Then Access should be denied

  Scenario: Access granted on Team feature
    Given I am a member of the MegaCorp organization
    And MegaCorp organization is on the Team plan
    And Draft-PRs is a feature on the Team plan
    When I want to access Draft-PRs
    Then Access should be granted

  Scenario: Access granted to direct user
    Given I am given access to the Draft-PRs feature
    When I want to access Draft-PRs
    Then Access should be granted
