# Page Objects

This folder contains Page Object Model classes for the Flash-Guard web UI.

## Purpose

Page objects keep selectors and UI interaction logic out of step definitions and test files.

## Current page objects

- `LoginPage.ts`
- `DashboardPage.ts`
- `TransferPage.ts`
- `AirtimeDataPage.ts`
- `PaymentMethodsPage.ts`
- `ReportPage.ts`
- `sidebarPage.ts`

## Convention

Use one class per page or major UI component. Step definitions should call page object methods instead of directly using selectors.
