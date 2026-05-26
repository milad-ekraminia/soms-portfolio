# 🔧 Refactoring Checklist

This document lists all files that need refactoring based on the established conventions.

**Last Updated:** 2025-01-21

---

## 🔴 Priority 1: Interface Naming (Remove `I` Prefix)

### Files to Refactor:

1. **`src/components/ui/Table/table-head/table-head.tsx`**

   - ❌ `interface IHeaderProps`
   - ✅ Should be: `interface HeaderProps`

2. **`src/components/pages/notification/table-header/operations/details/detail-table-log.tsx`**

   - ❌ `interface IDetailTableLog`
   - ✅ Should be: `interface DetailTableLogProps`

3. **`src/components/pages/dashboard/map-graph/map-svg/province-map.tsx`**

   - ❌ `interface IProvinceMapProps`
   - ✅ Should be: `interface ProvinceMapProps`

4. **`src/components/pages/notification/table-header/operations/details/details.tsx`**
   - ❌ `interface IDetails`
   - ✅ Should be: `interface DetailsProps`

**Impact:** Low - Only interface names, easy to fix with find/replace

---

## 🟠 Priority 2: Service File Naming (Convert to kebab-case)

### Files to Rename:

#### Root Services Directory:

1. **`src/services/file-upload.ts`** → `src/services/post-file-upload.ts`

   - Function: `PostFileUpload` ✅ (already correct naming)

2. **`src/services/file-download.ts`** → `src/services/post-file-download.ts`

   - Function: `PostFileDownload` ✅ (already correct naming)

3. **`src/services/file-delete.ts`** → `src/services/delete-file.ts`
   - Function: `PostFileDelete` → Should be `deleteFile` ❌

#### Notifications Services:

4. **`src/services/notifications/notificationGrid.ts`** → `src/services/notifications/notification-grid.ts`

   - Function: `fetchNotificationGrid` ✅

5. **`src/services/notifications/stationIdFromCbsId.ts`** → `src/services/notifications/fetch-station-id-from-cbs-id.ts`

   - Function: `fetchStationIdFromCbsId` ✅

6. **`src/services/notifications/createUnplannedOutage.ts`** → `src/services/notifications/post-create-unplanned-outage.ts`

   - Function: `PostUnplannedOutageFromExistingNotifications` → Should be `createUnplannedOutage` ❌

7. **`src/services/notifications/notificationCancellation.ts`** → `src/services/notifications/post-notification-cancellation.ts`

   - Function: Check naming

8. **`src/services/notifications/assignToInterruption.ts`** → `src/services/notifications/post-assign-to-interruption.ts`

   - Function: Check naming

9. **`src/services/notifications/seperateInterruption.ts`** → `src/services/notifications/post-separate-interruption.ts`

   - Function: Check naming (also note: typo "seperate" → "separate")

10. **`src/services/notifications/get-address.ts`** ✅ Already correct

11. **`src/services/notifications/stationWithAddres.ts`** → `src/services/notifications/fetch-station-with-address.ts`

    - Function: Check naming (also note: typo "Addres" → "Address")

12. **`src/services/notifications/cards.ts`** ✅ Already correct (generic name)

#### Outages Services:

13. **`src/services/outages/outageGrid.ts`** → `src/services/outages/outage-grid.ts`

    - Function: `fetchOutageGrid` ✅

14. **`src/services/outages/outageDetail.ts`** → `src/services/outages/fetch-outage-detail.ts`

    - Function: Check naming

15. **`src/services/outages/outagesCancellation.ts`** → `src/services/outages/post-outage-cancellation.ts`

    - Function: Check naming

16. **`src/services/outages/archiveOutage.ts`** → `src/services/outages/post-archive-outage.ts`

    - Function: Check naming

17. **`src/services/outages/energizeInterruption.ts`** → `src/services/outages/post-energize-interruption.ts`

    - Function: Check naming

18. **`src/services/outages/post-detail-change.ts`** ✅ Already correct

19. **`src/services/outages/address-cbsId.ts`** → `src/services/outages/fetch-address-from-cbs-id.ts`

    - Function: Check naming

20. **`src/services/outages/planned-outage.ts`** → `src/services/outages/planned-outage-grid.ts` or similar

    - Function: Check naming

21. **`src/services/outages/planned-outage/cards.ts`** ✅ Already correct

22. **`src/services/outages/planned-outage/planned-outage-details.ts`** ✅ Already correct

23. **`src/services/outages/planned-outage/planned-energize-interruption.ts`** ✅ Already correct

24. **`src/services/outages/planned-outage/planned-awaiting-grid.ts`** ✅ Already correct

25. **`src/services/outages/planned-outage/planned-approved-grid.ts`** ✅ Already correct

26. **`src/services/outages/planned-outage/archive-planned-outage.ts`** ✅ Already correct

27. **`src/services/outages/unplanned-outage/cards.ts`** ✅ Already correct

28. **`src/services/outages/unplanned-outage/post-create-rank.ts`** ✅ Already correct

29. **`src/services/outages/unplanned-outage/post-merge-outage.ts`** ✅ Already correct

#### Dashboard Services:

30. **`src/services/dashboard/cards.ts`** ✅ Already correct

31. **`src/services/dashboard/subsciberWithoutEnergyCount.ts`** → `src/services/dashboard/fetch-subscriber-without-energy-count.ts`

    - Function: `fetchSubscriberWithoutEnergyCount` ✅ (also note: typo "subsciber" → "subscriber")

32. **`src/services/dashboard/plannedAndUnplannedOutageRate.ts`** → `src/services/dashboard/fetch-planned-and-unplanned-outage-rate.ts`

    - Function: Check naming

33. **`src/services/dashboard/outages-tab.ts`** ✅ Already correct

34. **`src/services/dashboard/numberOfOutagesCityAndDistrict.ts`** → `src/services/dashboard/fetch-number-of-outages-city-and-district.ts`

    - Function: Check naming

35. **`src/services/dashboard/notifications-tab.ts`** ✅ Already correct

36. **`src/services/dashboard/notificationSourceRate.ts`** → `src/services/dashboard/fetch-notification-source-rate.ts`

    - Function: Check naming

37. **`src/services/dashboard/countByHourWithCity.ts`** → `src/services/dashboard/fetch-count-by-hour-with-city.ts`
    - Function: Check naming

#### OGSS Services:

38. **`src/services/ogss/get-detail-omp-version.ts`** ✅ Already correct

39. **`src/services/ogss/outage/post-outage-by-filter.ts`** ✅ Already correct

#### Tree Services:

40. **`src/services/tree/treeNodes.ts`** → `src/services/tree/fetch-tree-nodes.ts`

    - Function: `fetchTreeNodes` ✅

41. **`src/services/tree/notificationFromTree.ts`** → `src/services/tree/fetch-notification-from-tree.ts`
    - Function: Check naming

#### Settings Services:

42. **`src/services/settings/post-new-message.ts`** ✅ Already correct

43. **`src/services/settings/post-update-message.ts`** ✅ Already correct

44. **`src/services/settings/post-delete-sms.ts`** ✅ Already correct

45. **`src/services/settings/post-active-sms.ts`** ✅ Already correct

46. **`src/services/settings/fetch-message-list.ts`** ✅ Already correct

#### Map Services:

47. **`src/services/map/topology.ts`** ✅ Acceptable (generic service file)

**Impact:** Medium - Requires file renames and import updates throughout codebase

---

## 🟡 Priority 3: File/Directory Naming Inconsistencies

### Files with Naming Mismatches:

1. **`src/components/ui/input/Input.tsx`**

   - Directory: `input/` (lowercase)
   - File: `Input.tsx` (PascalCase)
   - ✅ **Option 1:** Rename to `input.tsx` (recommended for consistency)
   - ⚠️ **Option 2:** Keep as-is (documented as acceptable exception)

2. **`src/components/ui/input/toggle-button/Toggle.tsx`**

   - Directory: `toggle-button/` (kebab-case)
   - File: `Toggle.tsx` (PascalCase)
   - ✅ **Option 1:** Rename to `toggle.tsx` (recommended for consistency)
   - ⚠️ **Option 2:** Keep as-is (documented as acceptable exception)

3. **`src/components/ui/Table/pagination/Pagination.tsx`**

   - Directory: `Table/pagination/` (PascalCase dir, lowercase subdir)
   - File: `Pagination.tsx` (PascalCase)
   - ✅ Already acceptable pattern (directory structure allows this)

4. **`src/components/ui/map/VectorTileLayer.tsx`**
   - Directory: `map/` (lowercase)
   - File: `VectorTileLayer.tsx` (PascalCase)
   - ✅ Acceptable (complex component name)

**Impact:** Low - These are minor inconsistencies that don't break functionality

---

## 🟢 Priority 4: Function Naming in Services

### Functions to Rename:

1. **`src/services/file-delete.ts`**

   - ❌ `PostFileDelete`
   - ✅ Should be: `deleteFile`

2. **`src/services/notifications/createUnplannedOutage.ts`**
   - ❌ `PostUnplannedOutageFromExistingNotifications`
   - ✅ Should be: `createUnplannedOutage`

**Impact:** Low - Only affects function exports, not file structure

---

## 🔵 Priority 5: Relative vs Absolute Imports

### Files Using Relative Imports (Should use `@/` alias):

1. **`src/components/ui/Table/table.tsx`**

   - Uses: `import TableHeader from "./table-head/table-head";`
   - ✅ Actually acceptable for sibling imports

2. **`src/components/ui/Table/table-head/table-head.tsx`**
   - Uses: `import SortableHeaderCell from "../sortable-header-cell/sortable-header-cell";`
   - ✅ Actually acceptable for sibling imports

**Impact:** Low - Relative imports for sibling files are acceptable

---

## 📋 Summary

### High Priority (Fix Immediately):

- ✅ None - All critical issues already fixed

### Medium Priority (Fix in Next Sprint):

- 🟠 **Service File Renaming** (41 files)
  - Requires coordinated refactoring
  - Need to update all imports
  - Consider doing in batches by feature

### Low Priority (Fix as You Touch Files):

- 🟡 **Interface Naming** (4 files)
- 🟡 **File/Directory Naming** (2 files)
- 🟡 **Function Naming** (2 files)

---

## 🚀 Recommended Refactoring Strategy

### Phase 1: Quick Wins (1-2 hours)

1. Fix interface naming (4 files) - simple find/replace
2. Fix function naming (2 functions) - simple rename

### Phase 2: Service File Renaming (1-2 days)

1. Start with least-used services first
2. Rename files in batches by feature:
   - Dashboard services (7 files)
   - Notification services (7 files)
   - Outage services (15 files)
   - Other services (12 files)
3. Update imports as you go
4. Test thoroughly after each batch

### Phase 3: File Renaming (Optional - 1 day)

1. Only if team decides on strict consistency
2. Rename `Input.tsx` → `input.tsx`
3. Rename `Toggle.tsx` → `toggle.tsx`
4. Update all imports

---

## 📝 Notes

- **Import Updates Required:** When renaming service files, must update:

  - All files importing from the service
  - Hook files that use the services
  - Component files that use the hooks
  - Test files

- **Git Strategy:** Consider using `git mv` to preserve history when renaming files

- **Testing:** After each batch of renames, run:

  ```bash
  pnpm test
  pnpm build
  pnpm lint
  ```

- **Tools:** Use IDE refactoring tools (VS Code, WebStorm) for safer renames with automatic import updates
