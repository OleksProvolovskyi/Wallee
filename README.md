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
    |-- /fixtures                   # Custom fixtures
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