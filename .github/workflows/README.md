# GitHub Actions Workflows

This folder stores GitHub Actions pipeline files for Flash-Guard.

## Planned workflow

A single CI validation workflow can be used to run the main project checks:

- Install Node dependencies
- Run TypeScript build/type-checking
- Run ESLint
- Generate Playwright-BDD specs
- Run UI Playwright tests
- Validate that API collections exist
- Validate that SQL scripts exist
- Validate mobile & E2E tests
- Upload test reports as artefacts

## Note

The original BRD refers to Azure DevOps YAML pipelines, but this project uses GitHub Actions for CI/CD.