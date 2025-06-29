# Playwright + TypeScript Automation Framework

This repository contains an automation framework built using Playwright and TypeScript. It is designed to support end-to-end and api testing of web applications. The framework utilizes various advanced features such as contexts, fixtures, page objects, services, utility functions, and components to create robust, maintainable, and scalable test suites.

# Features
- Contexts: Manage browser contexts to simulate different testing environments, devices, or user scenarios.
- Fixtures: Reusable test setups and teardowns to ensure consistent test environments.
- Page Objects: Encapsulate UI elements and interactions to reduce code duplication and increase test maintainability.
- Services: Abstract complex actions or business logic away from test scripts, making them cleaner and easier to read.
- Utils: Utility functions to handle common tasks such as date manipulations, data generation, etc.
- Components: Reusable components for common UI elements across different pages to reduce redundancy and improve test management.

# Project Structure
/playwright-project
|-- /src
    |-- /pages.objects/components   # Reusable components
    |-- /pages.objects/containers   # Reusable containers
    |-- /pages.objects              # Page objects
    |-- /contexts                   # Business logic
    |-- /utils                      # Utility functions
|-- playwright.config.ts            # Playwright configuration file
|-- tsconfig.json                   # TypeScript configuration
|-- README.md                       # Project documentation

# Installation
1. Download and install Visual Studio Code: https://code.visualstudio.com/download;
2. Download and install Node.js https://nodejs.org/en/download/prebuilt-installer/current;
3. Open Terminal: Terminal tab => New Terminal;
4. Clone the repository: git clone https://github.com/OleksProvolovskyi/Wallee.git ;
5. Install Typescript: set 'npm install -D typescript' command into the terminal and push Enter;
6. Install Playwright: set 'npx playwright install' command into the terminal and push Enter;
7. Install dependencies: npm install (in the Terminal)

# Configuring Playwright
Edit the playwright.config.ts file to adjust Playwright settings such as launch options, test matchers, and timeout settings.

# Additional Resources
Playwright Documentation - https://playwright.dev/docs/intro

# Tests
Now the test framework includes such tests:

1.Feature: Ordering products from Hot Sellers

  Scenario: Make order from Hot Sellers section
    Given I am on the landing page
    When I select a random product from the "Hot Sellers" section
    And I select a size and a color for the product
    And I add the product to the cart
    And I proceed to checkout
    Then I should see the same product details on the shipping page

    When I fill in the shipping information
    Then I should be able to proceed to the payment page

    When I select a payment method
    And I place the order
    Then the product details on the payment page should match the original selection
    And Payment should be successful 

2.Feature: Order validation without shipping data

  Scenario: Check if order cannot be completed without shipping data
    Given I am on the landing page
    When I select a random product from the "Hot Sellers" section
    And I select a size and a color for the product
    And I add the product to the cart
    And I proceed to checkout
    Then I should be on the shipping page

    When I try to proceed without filling in shipping data
    Then I should see an error message: "The shipping method is missing. Select the shipping method and try again."