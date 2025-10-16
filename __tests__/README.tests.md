# Test Suite Summary

## Overview

Comprehensive test coverage for the Next.js blog application, including unit tests, integration tests, snapshot tests, and mock tests. The test suite has been streamlined to focus on the most critical scenarios while maintaining excellent coverage.

## Test Statistics

- **Total Test Suites**: 12 passed
- **Total Tests**: 34 passed
  - **Functional Tests**: 24
  - **Snapshot Tests**: 10
- **Test Duration**: ~3 seconds
- **Coverage**: Generated (see `coverage/` directory)

## Test Files Created/Enhanced

### Component Unit Tests

#### 1. `__tests__/components/avatar.test.tsx`

- **Tests**: 3 functional tests
- **Coverage**:
  - Renders author name and image correctly
  - Handles different picture URLs (re-rendering)
  - Validates alt text for accessibility

#### 2. `__tests__/components/date.test.tsx`

- **Tests**: 2 functional tests
- **Coverage**:
  - Formats dates correctly using date-fns (LLLL d, yyyy format)
  - Uses semantic HTML (`<time>` element with `datetime` attribute)

#### 3. `__tests__/components/cover-image.test.tsx`

- **Tests**: 3 functional tests
- **Coverage**:
  - Renders image with correct alt text
  - Conditionally renders as link when slug provided
  - Renders without link when slug is absent

#### 4. `__tests__/components/more-stories.test.tsx`

- **Tests**: 4 functional tests
- **Coverage**:
  - Renders "More Stories" heading
  - Displays all posts with correct content
  - Creates proper navigation links
  - Handles empty posts array gracefully

#### 5. `__tests__/components/layout.test.tsx`

- **Tests**: 3 functional tests
- **Coverage**:
  - Renders children content
  - Displays footer with branding and links
  - Validates HTML structure (html lang attribute, main element)

### Page Tests

#### 6. `__tests__/pages/home-page.test.tsx`

- **Tests**: 4 functional tests
- **Coverage**:
  - Handles empty posts (shows "No posts found" message)
  - Renders hero post with all content (title, excerpt, author, link)
  - Renders additional posts in MoreStories section
  - Tests draft mode integration (calls getAllPosts with correct flag)

**Mocking Strategy**:

- Mocks `next/headers` `draftMode` function
- Mocks `../../lib/api` `getAllPosts` function
- Properly handles async server components with dynamic imports
- Uses realistic mock data with complete Post objects

#### 7. `__tests__/pages/app-page.test.tsx`

- **Tests**: 3 functional tests
- **Coverage**:
  - Renders post page with all content (title, date, cover image, author)
  - Displays "More Stories" section when additional posts exist
  - Calls `notFound()` when post doesn't exist (error handling)

**Mocking Strategy**:

- Mocks `../../lib/api` `getPostAndMorePosts` function
- Mocks `next/headers` `draftMode` function
- Mocks `next/navigation` `notFound` (throws error pattern)
- Provides complete mock post data with Contentful rich text structure

### Integration Tests

#### 8. `__tests__/integration/component-integration.test.tsx`

- **Tests**: 2 functional tests
- **Coverage**:
  - Tests MoreStories integration with all nested components (CoverImage, Date, Avatar)
  - Validates proper link creation across components

#### 9. `__tests__/integration/page-flow.test.tsx`

- **Tests**: 4 functional tests
- **Coverage**:
  - Full page rendering with all sections (Intro, Hero, More Stories)
  - Navigation links for all posts (hero and additional posts)
  - Draft mode integration and API calls
  - Error handling (API failures, empty posts)

### Snapshot Tests

#### 10. `__tests__/snapshots/component-snapshots.test.tsx`

- **Tests**: 3 snapshot tests (streamlined)
- **Components Covered**:
  - Avatar (with author data)
  - CoverImage (with link)
  - MoreStories (with multiple posts)

#### 11. `__tests__/snapshots/page-snapshots.test.tsx`

- **Tests**: 8 snapshot tests (user-maintained)
- **Pages Covered**:
  - Home page (with posts and empty state)
  - Post detail page (complete post with more stories)

#### 12. `__tests__/snapshots/layout-snapshots.test.tsx`

- **Tests**: 3 snapshot tests
- **Coverage**:
  - Layout with simple children
  - Layout with complex nested structure
  - Layout with multiple child elements

## Test Patterns Used

### 1. **Async Server Component Testing**

```typescript
const Page = (await import("@/app/page")).default;
const jsx = await Page();
render(jsx);
```

### 2. **Module Mocking (Before Import)**

```typescript
jest.mock("next/headers", () => ({
  draftMode: jest.fn(),
}));

import { draftMode } from "next/headers";
```

### 3. **Handling Multiple Elements**

```typescript
const links = screen.getAllByRole("link", { name: "Title" });
expect(links[0]).toHaveAttribute("href", "/posts/slug");
```

### 4. **Rich Text Content Mocking**

```typescript
content: {
  json: {
    nodeType: 'document',
    content: [
      { nodeType: 'paragraph', content: [...] }
    ]
  },
  links: { assets: { block: [] } }
}
```

### 5. **Error Throwing Mocks**

```typescript
(notFound as unknown as jest.Mock).mockImplementation(() => {
  throw new Error("NEXT_NOT_FOUND");
});
```

## Key Testing Technologies

- **Jest**: Test framework and test runner
- **React Testing Library**: Component testing utilities
- **@testing-library/jest-dom**: Custom matchers for DOM assertions
- **jest-environment-jsdom**: Browser-like environment for tests
- **next/jest**: Next.js-specific Jest configuration

## Mock Coverage

### Next.js Specific

- `next/headers` → `draftMode()`
- `next/navigation` → `notFound()`
- `next/image` → Automatically mocked by next/jest

### Application API

- `lib/api` → `getAllPosts()`, `getPostAndMorePosts()`

### Test Data

- Complete Post objects with all required fields
- Author objects with pictures
- Contentful-compatible rich text documents
- Proper image URLs to avoid Next.js Image component errors

## Test Execution Commands

```bash
# Run all tests
npm test

# Run tests in watch mode
npm run test:watch

# Run tests with coverage
npm run test:coverage

# Run tests with specific pattern
npm test -- avatar

# Run tests in band (sequentially)
npm test -- --runInBand
```

## Coverage Report

Coverage reports are generated in the `coverage/` directory:

- `coverage/lcov-report/index.html` - HTML coverage report
- `coverage/coverage-final.json` - JSON coverage data
- `coverage/lcov.info` - LCOV format for CI tools
- `coverage/clover.xml` - Clover XML format

## Known Warnings

1. **Layout HTML Nesting Warning**: The RootLayout component renders `<html>` which causes a warning when tested in isolation (expected behavior, not a real issue).

## Test Maintenance

### When Adding New Components

1. **Create unit test** in `__tests__/components/[component-name].test.tsx`
   - Test critical rendering scenarios (2-4 tests)
   - Test with required props
   - Test one edge case (empty/null data)
2. **Add snapshot test** in `__tests__/snapshots/component-snapshots.test.tsx`
   - Add 1-2 snapshots showing typical usage
   - Include variations only if significantly different

### When Modifying Components

1. **Run existing tests first** - `npm test [component-name]`
2. **Update snapshots if needed** - `npm test -- -u` (only if changes are intentional)
3. **Add new tests** only for new functionality
4. **Update mocks** if prop types or dependencies change
5. **Run full suite** before committing - `npm test`

### When Refactoring (No Behavior Change)

1. **Tests should pass without modification**
2. **Update only if**:
   - Component names change
   - File paths change
   - Import statements need updates
3. **Do NOT update snapshots** unless rendered output changes

### Snapshot Test Maintenance

⚠️ **Critical**: Never blindly update snapshots without reviewing changes!

**When snapshots fail**:

1. **Review the diff** - Run `npm test` to see what changed
2. **Verify the change is intentional**:
   - ✅ New feature, styling update, or bug fix → Update snapshots
   - ❌ Unexpected change → Fix the code, don't update snapshot
3. **Update snapshots**: `npm test -- -u` or `npm test -- --updateSnapshot`
4. **Commit updated snapshots** with the code changes

**Best practices**:

- Keep snapshots small and focused
- Review snapshot diffs in code review
- Regenerate snapshots after major dependency updates
- Delete obsolete snapshot files when components are removed

### Running Tests Efficiently

```bash
# Run specific test file
npm test avatar.test

# Run tests in specific folder
npm test __tests__/components

# Run in watch mode (auto-rerun on changes)
npm run test:watch

# Run with coverage
npm run test:coverage

# Update all snapshots (use carefully!)
npm test -- -u

# Run tests matching pattern
npm test -- --testNamePattern="renders hero post"
```

## Test Suite Philosophy

This test suite follows the **"Test What Matters"** principle:

- Focus on critical user-facing functionality
- Test component behavior, not implementation details
- Use snapshots to catch unintended UI changes
- Keep tests maintainable and easy to understand
- Avoid over-testing trivial scenarios

## Conclusion

The streamlined test suite provides comprehensive coverage of:

- ✅ All presentational components (unit tests)
- ✅ Server-side rendered pages with mocked data
- ✅ Component integration and data flow
- ✅ Edge cases (empty data, error states)
- ✅ Next.js 13+ App Router patterns (async server components)
- ✅ Visual regression protection (snapshot tests)

## Quick Reference Card

| Task              | Command                                             |
| ----------------- | --------------------------------------------------- |
| Run all tests     | `npm test`                                          |
| Run specific test | `npm test avatar`                                   |
| Watch mode        | `npm run test:watch`                                |
| Coverage report   | `npm run test:coverage`                             |
| Update snapshots  | `npm test -- -u`                                    |
| Run single suite  | `npm test -- __tests__/components/avatar.test.tsx`  |
| Debug test        | Add `console.log()` or use `screen.debug()` in test |

## Getting Help

- **Tests failing?** Run `npm test -- --verbose` for detailed output
- **Snapshot diff?** Review the diff carefully before updating
- **Mock not working?** Ensure mocks are defined before imports
- **Async issues?** Check if component/function needs `await`
