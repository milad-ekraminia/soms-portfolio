# 🔧 Refactoring Checklist: `src/components/pages`

This document lists all files in `src/components/pages` that need refactoring.

**Last Updated:** 2025-01-21

---

## 🔴 Priority 1: Critical Issues (Fix Immediately)

### Interface Naming Issues

1. **`src/components/pages/notification/table-header/operations/details/detail-table-log.tsx`**

   - ❌ `interface IDetailTableLog`
   - ✅ Should be: `interface DetailTableLogProps`

2. **`src/components/pages/notification/table-header/operations/details/details.tsx`**
   - ❌ `interface Details` (conflicts with component name `Details`)
   - ✅ Should be: `interface DetailsProps`

### Filename Typos (Critical - Breaks Conventions)

3. **`src/components/pages/life-cycle/sections/outage-details/ooutage-details.tsx`**

   - ❌ Typo: `ooutage` (double 'o')
   - ✅ Should be: `outage-details.tsx`
   - **Impact:** File naming error, needs rename + import updates

4. **`src/components/pages/ogss/outages/details/detailts-device.tsx`**

   - ❌ Typo: `detailts` (should be `details`)
   - ✅ Should be: `details-device.tsx`
   - **Impact:** File naming error, needs rename + import updates

5. **`src/components/pages/ogss/outages/details/details-interuptions.tsx`**

   - ❌ Typo: `interuptions` (should be `interruptions`)
   - ✅ Should be: `details-interruptions.tsx`
   - **Impact:** Spelling error, needs rename + import updates

6. **`src/components/pages/life-cycle/sections/reports-eeffects/`**

   - ❌ Directory typo: `eeffects` (double 'e')
   - ✅ Should be: `reports-effects/`
   - **Impact:** Directory naming error, needs rename

7. **`src/components/pages/settings/messages/list-massages.tsx`**

   - ❌ Typo: `massages` (should be `messages`)
   - ✅ Should be: `list-messages.tsx`
   - **Impact:** Spelling error, needs rename + import updates

8. **`src/components/pages/notification/table-header/operations/craete-unplanned-outage.tsx`**

   - ❌ Typo: `craete` (should be `create`)
   - ✅ Should be: `create-unplanned-outage.tsx`
   - **Impact:** Spelling error, needs rename + import updates

9. **`src/components/pages/settings/cards/settings-data-managment-cards.tsx`**

   - ❌ Typo: `managment` (should be `management`)
   - ✅ Should be: `settings-data-management-cards.tsx`
   - **Impact:** Spelling error, needs rename + import updates

10. **`src/components/pages/settings/cards/settings-user-managment-cards.tsx`**

    - ❌ Typo: `managment` (should be `management`)
    - ✅ Should be: `settings-user-management-cards.tsx`
    - **Impact:** Spelling error, needs rename + import updates

11. **`src/components/pages/settings/cards/settings-sms-managment-cards.tsx`**
    - ❌ Typo: `managment` (should be `management`)
    - ✅ Should be: `settings-sms-management-cards.tsx`
    - **Impact:** Spelling error, needs rename + import updates

---

## 🟠 Priority 2: Code Quality Issues

### Component/Interface Naming Conflicts

12. **`src/components/pages/notification/table-header/operations/details/details.tsx`**
    - ⚠️ Interface `Details` conflicts with component name `Details`
    - Currently: `interface Details` and `const Details = ...`
    - ✅ Fix: Rename interface to `DetailsProps`

### Export Pattern Consistency

**Note:** The following files use `export default` which is acceptable for components, but consider standardizing:

13. **Files using default exports** (10 files):

    - `src/components/pages/ogss/simulation/simulation-tree.tsx`
    - `src/components/pages/ogss/historical-network/historical-network-tree.tsx`
    - `src/components/pages/ogss/outages/outage-tree.tsx`
    - `src/components/pages/notification/table-header/operations/details/details.tsx`
    - `src/components/pages/outages/unplanned/table-header/operations/outage-operations-sections.tsx`
    - `src/components/pages/outages/unplanned/table-header/operations/outage-operation-content.tsx`
    - `src/components/pages/outages/unplanned/table-header/outage-table-header.tsx`
    - `src/components/pages/outages/unplanned/unplanned-outage-table.tsx`
    - `src/components/pages/notification/notification-table.tsx`
    - `src/components/pages/outages/planned/shared/outage-table-header.tsx`

    **Status:** ✅ These are acceptable - default exports for larger component modules are fine.
    **Recommendation:** Keep as-is, but ensure documentation clarifies this pattern.

---

## 🟡 Priority 3: Code Structure Issues

### Inconsistent Variable Naming in Code

14. **`src/components/pages/ogss/outages/details/details-interuptions.tsx`**
    - ⚠️ Variable uses typo: `detailInteruptionColumn` (line 6)
    - ✅ Should be: `detailInterruptionColumn`
    - **Note:** Fix once file is renamed

### Duplicate/Orphaned Files

15. **`src/components/pages/notification/table-header/operations/craete-unplanned-outage.tsx`**
    - ❌ Typo filename AND duplicate of correct directory
    - ✅ Correct directory exists: `create-unplanned-outage.tsx/` (directory)
    - ⚠️ The typo file `craete-unplanned-outage.tsx` imports from the correct directory
    - **Action:** Delete the typo file `craete-unplanned-outage.tsx` and update any imports that reference it
    - **Impact:** File cleanup - remove orphaned typo file

---

## 🔵 Priority 4: Code Quality Improvements (Low Priority)

### TypeScript Any Types

Multiple files use `any` type that could be more specific:

- Files with `{ chosenRows: any }`
- Files with `data?: any`

**Recommendation:** Create proper types for these, but this is low priority.

---

## 📋 Summary by Category

### Critical Filename Typos (11 files):

1. `ooutage-details.tsx` → `outage-details.tsx`
2. `detailts-device.tsx` → `details-device.tsx`
3. `details-interuptions.tsx` → `details-interruptions.tsx`
4. `reports-eeffects/` → `reports-effects/`
5. `list-massages.tsx` → `list-messages.tsx`
6. `craete-unplanned-outage.tsx` → `create-unplanned-outage.tsx`
7. `settings-data-managment-cards.tsx` → `settings-data-management-cards.tsx`
8. `settings-user-managment-cards.tsx` → `settings-user-management-cards.tsx`
9. `settings-sms-managment-cards.tsx` → `settings-sms-management-cards.tsx`

### Interface Naming Fixes (2 files):

1. `IDetailTableLog` → `DetailTableLogProps`
2. `Details` (interface) → `DetailsProps` (to avoid conflict with component)

### Code Issues (2 files):

1. Variable typo: `detailInteruptionColumn` → `detailInterruptionColumn`
2. File structure issue: `craete-unplanned-outage.tsx` directory

---

## 🚀 Refactoring Strategy

### Phase 1: Critical Fixes (1-2 hours)

1. Fix interface naming (2 files)
2. Fix filename typos (9 files) - use `git mv` to preserve history
3. Update all imports for renamed files
4. Fix variable typo in renamed file

### Phase 2: File Structure (30 minutes)

1. Investigate `craete-unplanned-outage.tsx` directory structure
2. Fix if needed

### Phase 3: Testing (30 minutes)

1. Run linter: `pnpm lint`
2. Run tests: `pnpm test`
3. Build check: `pnpm build`
4. Manual testing of affected pages

---

## 📝 Files That Need Import Updates

When renaming files, these imports need to be updated:

### For `ooutage-details.tsx` → `outage-details.tsx`:

- Search for: `from.*ooutage-details|from.*outage-details.*ooutage`

### For `detailts-device.tsx` → `details-device.tsx`:

- Search for: `from.*detailts-device`

### For `details-interuptions.tsx` → `details-interruptions.tsx`:

- Search for: `from.*details-interuptions`

### For `list-massages.tsx` → `list-messages.tsx`:

- Search for: `from.*list-massages`

### For `craete-unplanned-outage.tsx` → `create-unplanned-outage.tsx`:

- Search for: `from.*craete-unplanned-outage`

### For settings cards (`managment` → `management`):

- Search for: `from.*managment-cards`

---

## ✅ Files That Are Correct

These files follow good patterns:

- Most component files with named exports
- Files using `@/` path alias for imports
- Consistent file structure in most directories

---

## 🎯 Priority Order

1. **Fix Critical Typos** (9 filename fixes) - Highest priority
2. **Fix Interface Naming** (2 fixes) - High priority
3. **Fix File Structure** (1 investigation) - Medium priority
4. **Code Quality Improvements** - Low priority (can be done gradually)

**Estimated Total Time:** 2-3 hours for critical fixes
