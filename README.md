# TDW 1st Mini-Project

[![CI/CD Workflow](https://github.com/Dan1m4D/tdw-mp1-daniel-madureira/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Dan1m4D/tdw-mp1-daniel-madureira/actions/workflows/pipeline.yml)
[![Netlify Status](https://api.netlify.com/api/v1/badges/e30b3b3f-f932-4267-b05e-400b8c52cdb9/deploy-status)](https://app.netlify.com/projects/tdw-mp1-daniel-madureira/deploys)

The objective of this first mini-project is to develop a CI/CD pipeline over a Next blog that consumes contents from Contentful CMS. The blog looks like the follow:

![blog](readme_assets/image.png)

The project is organized as follows:

```bash
.
├── app
│   └── [components]
├── coverage
│   └── coverage-summary.json
├── env.example
├── eslint.config.mjs
├── jest.config.ts
├── jest.setup.ts
├── lefthook.yml
├── lib
│   └── [api related files]
├── next.config.js
├── next-env.d.ts
├── package.json
├── package-lock.json
├── postcss.config.js
├── readme_assets
│   └── [readme images]
├── README.md
├── tailwind.config.ts
├── __tests__
│   ├── components
│   ├── integration
│   ├── pages
│   ├── snapshots
│   ├── README.tests.md
│   └── test-jest.test.tsx
└── tsconfig.json

```

## Branches

For this project I'm using a **modified GitFlow** organization where I have the following branches:

- `main`: Default branch, protected. Holds the released, production ready code
- `dev`: Development branch, protected. Holds the tested, most updated and completed code.
- `hotfix`: Used to make quick fixes to the main or dev branch.
- `feature\**`: Feature branches. These branches are ulibsed to develop a (set of) feature(s) that when completed and tested are merged into the `dev` branch

The geral flow can be summarized by the following image (without the release branch):
![git flow](readme_assets/workflow.png)

## Pipeline overview

[![CI/CD Workflow](https://github.com/Dan1m4D/tdw-mp1-daniel-madureira/actions/workflows/pipeline.yml/badge.svg)](https://github.com/Dan1m4D/tdw-mp1-daniel-madureira/actions/workflows/pipeline.yml)
#todo

```node
lefthook(lint + prettier) -> commit -> lefthook (package audit) -> eslint job
                                                                -> prettier job
```

## Contentful configuration

The configuration setup for the **Contentful integration** with this project can be found in the original readme on the [original repository](https://github.com/TDW-2025/MP1) and the **demo** can be found [here](https://github.com/deca-ua/mp1-template-david/)

## Testing

### Overview

This project includes a comprehensive test suite made with Jest that holds **34 tests** across **12 test suites**, covering unit tests, integration tests, and snapshot tests. The test suite ensures code quality, prevents regressions, and validates both component behavior and visual consistency.

### Test Statistics

| Metric               | Value                          |
| -------------------- | ------------------------------ |
| **Total Tests**      | 34 passed                      |
| **Functional Tests** | 24 (unit + integration)        |
| **Snapshot Tests**   | 10 (visual regression)         |
| **Test Duration**    | ~3 seconds                     |
| **Coverage**         | Available via coverage reports |

### Test Structure

```bash
__tests__/
├── components/              # Component unit tests
│   ├── avatar.test.tsx
│   ├── cover-image.test.tsx
│   ├── date.test.tsx
│   ├── layout.test.tsx
│   └── more-stories.test.tsx
├── pages/                   # Page-level testsmd
│   ├── home-page.test.tsx
│   └── app-page.test.tsx
├── integration/             # Integration tests
│   ├── component-integration.test.tsx
│   └── page-flow.test.tsx
└── snapshots/               # Snapshot tests
    ├── component-snapshots.test.tsx
    └── page-snapshots.test.tsx
```

### Test Categories

1. **Component Unit Tests (15)**: Individual component testing (Avatar, Date, CoverImage, MoreStories, Layout)
2. **Page Tests (7)**: Next.js server components and page rendering (Home, Post Detail pages)
3. **Integration Tests (6)**: Component interactions, page flows, and API integration
4. **Snapshot Tests (10)**: Visual regression testing for components and pages

### Running Tests

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage report
npm run test:coverage

# Update snapshots (after intentional UI changes)
npm test -- -u
```

For detailed test documentation, including all test cases and mocking patterns, see [the test suit docs](__tests__/README.tests.md).
