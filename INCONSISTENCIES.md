# Project Inconsistencies Report

This document lists inconsistencies found in the project that differ from the documented format in the README.

**Last Updated:** 2025-01-21

## ✅ Fixed Issues

### ✅ Page Export Patterns - FIXED

**Status:** Fixed on 2025-01-21

- Changed `Unauthorized.tsx`, `NotFound.tsx`, `ServerError.tsx` from named exports to default exports
- Updated imports in `src/routes/routes.tsx`

### ✅ Interface Naming - FIXED

**Status:** Fixed on 2025-01-21

- Renamed `ITableProps` to `TableProps` (removed `I` prefix)
- Renamed `ITableRowProps` to `TableRowProps`
- Updated all references in `table.tsx`, `table-row.tsx`, and `types/components/ui/table/index.ts`

### ✅ README Documentation - UPDATED

**Status:** Updated on 2025-01-21

- Updated file naming conventions section to reflect actual patterns
- Added service file naming conventions
- Added export pattern guidelines
- Updated service example to match actual implementation

## 📋 File Naming Conventions

### ❌ UI Components - Inconsistent Naming

**Documented:** PascalCase (`DashboardCards.tsx`)

**Actual Implementation:**

- ✅ PascalCase: `Input.tsx`, `Toggle.tsx`, `Pagination.tsx`
- ❌ lowercase: `button.tsx`, `table.tsx`, `card.tsx`, `accordion.tsx`, `drawer.tsx`, `loader.tsx`, `tooltip.tsx`, `stepper.tsx`

**Inconsistency:** Most UI components use lowercase naming, but README documents PascalCase.

**Recommendation:**

- Update README to reflect actual convention: **lowercase for UI component files** (`button.tsx`)
- OR rename files to PascalCase to match documentation
- Document that **directory names** can be PascalCase (`Table/`, `Input/`) but **file names** are lowercase

### ❌ Directory vs File Naming Mismatch

**Examples:**

- `Table/` directory → `table.tsx` file (PascalCase dir, lowercase file) ✓ Good
- `input/` directory → `Input.tsx` file (lowercase dir, PascalCase file) ❌ Inconsistent
- `button/` directory → `button.tsx` file ✓ Consistent
- `toggle-button/` directory → `Toggle.tsx` file ❌ Inconsistent

## 📤 Export Patterns

### ✅ Pages - Mixed Export Patterns - FIXED

**Status:** ✅ Fixed - All pages now use default exports

**Previous Issue:**

- ❌ Named export: `Unauthorized.tsx`, `NotFound.tsx`, `ServerError.tsx`

**Fixed:**

- ✅ All pages now use default exports consistently

### ❌ Components - Mixed Export Patterns

**Mixed Usage:**

- Some use `export const ComponentName`
- Some use `export default function ComponentName`
- Some use `const Component = ...` then `export default Component`

**Recommendation:** Standardize on one pattern:

- **Named exports** for reusable UI components: `export const Button`
- **Default exports** for page components: `export default Dashboard`

## 🔧 Service Layer Naming

### ❌ Service File Naming - Inconsistent Patterns

**Actual Implementation Shows Mixed Patterns:**

1. **No prefix (camelCase):**

   - `notificationGrid.ts`
   - `outageGrid.ts`
   - `cards.ts`

2. **kebab-case with prefix:**

   - `fetch-notification-detail.ts`
   - `post-create-rank.ts`
   - `post-merge-outage.ts`

3. **camelCase with prefix:**

   - `PostFileUpload` (function name)
   - `PostFileDownload` (function name)
   - `PostFileDelete` (function name)

4. **Mixed:**
   - `archive-planned-outage.ts` (kebab-case filename)
   - `planned-outage-details.ts` (kebab-case filename)
   - `planned-energize-interruption.ts` (kebab-case filename)

**Documented Pattern:** Not clearly specified in README

**Recommendation:**

- Standardize service files to **kebab-case** with descriptive prefixes:
  - `fetch-*.ts` for GET requests
  - `post-*.ts` for POST requests
  - `put-*.ts` for PUT requests
  - `delete-*.ts` for DELETE requests
- Update README with service naming conventions

## 🪝 Hook Naming

### ✅ Consistent Pattern Found

**Actual Implementation:**

- All hooks use kebab-case: `use-notification-detail.ts`, `use-create-rank-logic.ts`, `use-post-create-rank.ts`

**Status:** ✅ Matches documentation (kebab-case)

## 📁 Component Structure

### ❌ Import Statement Inconsistencies

**Some components use:**

```tsx
import styles from "./button.scss";
```

**Others use:**

```tsx
import styles from "./input.scss";
```

**Some use relative imports:**

```tsx
import TableHeader from "./table-head/table-head";
```

**Others use path aliases:**

```tsx
import { Button } from "@/components/ui/button/button";
```

**Recommendation:** Standardize on using `@/` path alias for all imports (except relative sibling imports).

## 🎨 SCSS File Naming

### ✅ Consistent Pattern Found

**Actual Implementation:**

- All SCSS files use kebab-case: `button.scss`, `input.scss`, `table.scss`, `dashboard-cards.scss`

**Status:** ✅ Matches documentation (kebab-case)

## 🔍 API Service Function Naming

### ❌ Inconsistent Function Export Names

**Patterns Found:**

1. **Verb + Noun:**

   - `fetchNotificationGrid`
   - `fetchNotificationDetail`

2. **Post + Description:**

   - `PostFileUpload`
   - `PostFileDownload`

3. **Action + Description:**
   - `assignToInterruption`
   - `createUnplannedOutage`

**Recommendation:** Standardize to consistent pattern:

- Use `fetch*` for GET operations
- Use `create*` for POST operations
- Use `update*` for PUT operations
- Use `delete*` for DELETE operations
- Use verb + noun pattern consistently

## 📝 Type Definitions

### ✅ Interface Naming - FIXED

**Status:** ✅ Fixed - Removed `I` prefix from interfaces

**Previous Issue:**

- `ITableProps` (I prefix) ❌ Inconsistent

**Fixed:**

- `TableProps` ✅ Consistent
- `TableRowProps` ✅ Consistent
- Pattern now standardized: `ComponentNameProps` without `I` prefix

## 📂 Folder Structure Anomalies

### ⚠️ Mixed Directory Structures

**In `src/components/ui/input/`:**

- `Input.tsx` (PascalCase)
- `check-box/` (kebab-case directory)
- `date-input/` (kebab-case directory)
- `toggle-button/` (kebab-case directory)
- `select-input/` (kebab-case directory)

**Issue:** Most input subdirectories are kebab-case, but main file is PascalCase.

**Recommendation:** Either:

- Make all files lowercase: `input.tsx` (recommended)
- Or document that main component files can be PascalCase while subdirectories are kebab-case

## 🔄 Summary of Recommended Changes

### Priority 1 (High Impact) - COMPLETED ✅

1. ✅ **Update README** to reflect actual file naming convention - COMPLETED:

   - ✅ Documented that UI component **files** are lowercase (`button.tsx`)
   - ✅ Documented that **directories** can be PascalCase or kebab-case
   - ✅ Added service file naming conventions
   - ✅ Added export pattern guidelines

2. ⚠️ **Standardize service file naming** - PARTIALLY ADDRESSED:

   - ✅ Documented conventions in README
   - ⚠️ Actual files still need renaming (low priority - can be done gradually)
   - Pattern: `fetch-*.ts`, `post-*.ts`, `put-*.ts`, `delete-*.ts`

3. ✅ **Standardize page exports** to default exports - COMPLETED:
   - ✅ Converted `Unauthorized`, `NotFound`, `ServerError` to default exports
   - ✅ Updated imports in routes

### Priority 2 (Medium Impact) - DOCUMENTED ✅

4. ✅ **Standardize component exports** - DOCUMENTED:

   - ✅ Added guidelines in README
   - ⚠️ Actual code follows patterns (mixed but acceptable)
   - Pattern: Use named exports for UI components, default exports for page components

5. ⚠️ **Fix directory/file naming mismatches** - LOW PRIORITY:

   - Documented that this is acceptable (PascalCase directories with lowercase files)
   - Can be fixed gradually as files are touched
   - Examples: `input/` + `Input.tsx`, `toggle-button/` + `Toggle.tsx`

6. ⚠️ **Standardize import statements** - LOW PRIORITY:
   - Most imports already use `@/` path alias
   - Can be standardized gradually

### Priority 3 (Low Impact) - COMPLETED ✅

7. ✅ **Remove `I` prefix** from interfaces - FIXED:

   - ✅ Removed from `ITableProps` → `TableProps`
   - ✅ Removed from `ITableRowProps` → `TableRowProps`

8. ✅ **Document API service function naming patterns** - COMPLETED:
   - ✅ Added service naming conventions section in README
   - ✅ Added example matching actual implementation

---

**Note:** These inconsistencies don't break functionality but can confuse developers and make the codebase harder to maintain. Consider creating a style guide document and gradually standardizing as files are touched during feature work.
