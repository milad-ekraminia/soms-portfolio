# 🌟 SOMS - System Operations Management System

A comprehensive React-based web application for managing electricity distribution operations, including outage notifications, planned/unplanned interruptions, network visualization, reporting, and system settings.

---

## 📋 Table of Contents

1. [Tech Stack](#-tech-stack)
2. [Project Structure](#-project-structure)
3. [Getting Started](#-getting-started)
4. [Architecture](#-architecture)
5. [Features Overview](#-features-overview)
6. [Component Library](#-component-library)
7. [State Management](#-state-management)
8. [API Integration](#-api-integration)
9. [Routing & Navigation](#-routing--navigation)
10. [Internationalization (i18n)](#-internationalization-i18n)
11. [Forms & Validation](#-forms--validation)
12. [Testing](#-testing)
13. [Styling](#-styling)
14. [Best Practices](#-best-practices)
15. [Common Tasks](#-common-tasks)

---

## 🛠 Tech Stack

### Core

- **React 19** - UI library
- **TypeScript** - Type safety
- **Vite** - Build tool & dev server
- **SCSS/Sass** - Styling

### State Management

- **Redux Toolkit** - Global state management
- **Redux Persist** - State persistence
- **TanStack Query (React Query)** - Server state management & caching

### Routing

- **React Router DOM v7** - Client-side routing

### Forms & Validation

- **React Hook Form** - Form state management
- **Yup** - Schema validation

### Data Visualization

- **ApexCharts** - Charts and graphs
- **React D3 Tree** - Tree structure visualization
- **React Leaflet** - Interactive maps

### UI Libraries

- **@tanstack/react-table** - Data tables
- **@tanstack/react-virtual** - Virtualization
- **@dnd-kit** - Drag and drop
- **React Multi Date Picker** - Date/time selection

### Testing

- **Vitest** - Unit test runner
- **React Testing Library** - Component testing
- **jsdom** - DOM environment

### Backend/File Handling

- **Axios** - HTTP client
- **XLSX** - Excel file handling
- **SignalR** - Real-time communication

---

## 📁 Project Structure

```
Soms-Front/
├── public/                          # Static assets
│   ├── images/                      # Public images
│   └── maps/                        # Map data files
│
├── src/
│   ├── assets/                      # Static assets
│   │   ├── fonts/                   # Font files (InterVariable)
│   │   ├── icons/                   # SVG icon components (132 icons)
│   │   ├── images/                  # Images
│   │   └── styles/                  # Global SCSS files
│   │
│   ├── components/                  # React components
│   │   ├── layouts/                 # Layout components (Sidebar, Header, Footer)
│   │   ├── pages/                   # Page-specific components (172 files)
│   │   └── ui/                      # UI components library (104 files)
│   │
│   ├── pages/                       # Route pages (18 pages)
│   │   ├── login/                   # Authentication
│   │   ├── dashboard/               # Main dashboard
│   │   ├── bildirim/                # Notifications
│   │   ├── unplanned-outages/      # Unplanned outages
│   │   ├── planned-outages/         # Planned outages
│   │   ├── harita/                  # Map view
│   │   ├── raporlar/                # Reports
│   │   ├── yasam-dongusu/           # Life cycle
│   │   ├── ayarlar/                 # Settings
│   │   ├── ogss/                    # OGSS module (outages, simulation, historical)
│   │   └── ...                      # Error pages
│   │
│   ├── routes/                      # Route definitions
│   │   └── routes.tsx               # Main router configuration
│   │
│   ├── services/                    # API service layer (48 files)
│   │   ├── dashboard/              # Dashboard APIs
│   │   ├── notifications/           # Notification APIs
│   │   ├── outages/                 # Outage APIs
│   │   ├── ogss/                    # OGSS APIs
│   │   ├── settings/                 # Settings APIs
│   │   ├── map/                     # Map APIs
│   │   └── tree/                    # Tree APIs
│   │
│   ├── store/                       # Redux store
│   │   └── app/                     # Redux slices
│   │       ├── store.ts             # Store configuration
│   │       ├── drawer-slice.ts      # Drawer state
│   │       ├── filter-slice.ts     # Filter state
│   │       ├── columns-slice.ts     # Column visibility state
│   │       ├── outage-tabs-slice.ts # Outage tabs state
│   │       ├── highlighted-nodes-slice.ts # Tree node highlighting
│   │       ├── refresh-slice.ts     # Auto-refresh state
│   │       └── ogss-layout-slice.ts # OGSS layout state
│   │
│   ├── types/                       # TypeScript type definitions (18 files)
│   │   ├── api/                     # API response types
│   │   ├── components/              # Component prop types
│   │   └── ...                      # Other types
│   │
│   ├── hooks/                       # Custom React hooks (46 files)
│   │   ├── dashboard/              # Dashboard hooks
│   │   ├── notifications/          # Notification hooks
│   │   ├── outage/                  # Outage hooks
│   │   ├── ogss/                    # OGSS hooks
│   │   └── ...                      # Other hooks
│   │
│   ├── helpers/                     # Utility functions (42 files)
│   │   ├── data/                    # Data helpers
│   │   └── ...                      # Other helpers
│   │
│   ├── validations/                 # Yup validation schemas (4 files)
│   │
│   ├── definitions/                # Enums and constants
│   │   └── enum.ts                  # Enum definitions
│   │
│   ├── providers/                   # Context providers
│   │   ├── redux-store-provider.tsx # Redux provider
│   │   └── ...                      # Other providers
│   │
│   ├── lib/                         # Library configurations
│   │   └── react-query.ts           # React Query setup
│   │
│   ├── i18n.ts                      # i18n configuration
│   ├── language/                    # Translation files
│   │   ├── tr.json                  # Turkish translations
│   │   └── en.json                  # English translations
│   ├── main.tsx                     # Application entry point
│   └── protected-routes.tsx        # Route protection logic
│
├── package.json                     # Dependencies
├── vite.config.ts                   # Vite configuration
├── vitest.config.ts                 # Vitest configuration
├── tsconfig.json                    # TypeScript configuration
├── eslint.config.js                 # ESLint configuration
└── CHANGELOG.md                     # Version history
```

---

## 🚀 Getting Started

### Prerequisites

- **Node.js** >= 18.x
- **pnpm** >= 10.8.0 (recommended) or npm/yarn

### Installation

```bash
# Clone the repository
git clone <repository-url>
cd Soms-Front

# Install dependencies
pnpm install

# Set up environment variables
# Create .env file with required variables:
# VITE_API_BASE_URL=<your-api-url>
# VITE_SIGNALR_URL=<your-signalr-url>
```

### Running the Application

```bash
# Development mode
pnpm dev

# Build for production
pnpm build

# Build with WTS specific config
pnpm build-wts

# Preview production build
pnpm preview

# Run tests
pnpm test

# Run tests with UI
pnpm test:ui

# Run tests with coverage
pnpm coverage

# Lint code
pnpm lint
```

### Environment Variables

Create a `.env` file in the root directory:

```env
# API Configuration
VITE_API_BASE_URL=http://your-api-url.com

# SignalR Configuration
VITE_SIGNALR_URL=http://your-signalr-url.com
```

---

## 🏗 Architecture

### Application Flow

```
User
  ↓
main.tsx (Entry Point)
  ↓
Providers Setup
  ├── QueryClientProvider (React Query)
  ├── ReduxStoreProvider (Redux)
  ├── PersistGate (Redux Persist)
  └── I18nextProvider (i18n)
      ↓
RouterProvider (React Router)
  ↓
Routes (src/routes/routes.tsx)
  ├── Check Authentication
  └── Render Page Component
      ↓
Page Component (src/pages/)
  ↓
├── Fetch Data (React Query)
├── Manage State (Redux/Local State)
├── Render UI Components (src/components/ui/)
└── Handle User Interactions
```

### Key Design Patterns

1. **Feature-Based Organization**: Code organized by features (Dashboard, Notifications, Outages, etc.)
2. **Container/Presentation Pattern**: Separation of logic and UI
3. **Custom Hooks**: Reusable logic extracted into hooks
4. **Service Layer**: All API calls abstracted into service files
5. **Type Safety**: Comprehensive TypeScript types
6. **Component Composition**: Small, reusable components
7. **State Normalization**: Redux for global state, React Query for server state

---

## 🎯 Features Overview

### 1. **Dashboard**

- Real-time outage statistics
- Notification metrics
- Interactive geographic maps
- Source system breakdown charts
- Hourly outage trend analysis
- Multiple time period views (day, week, month)
- Auto-refresh capabilities

**Key Files:**

- Pages: `src/pages/dashboard/Dashboard.tsx`
- Components: `src/components/pages/dashboard/`
- Services: `src/services/dashboard/`

### 2. **Notifications (Bildirimler)**

- Notification list with filtering and sorting
- Statistics cards
- Assign notifications to outages
- Create unplanned outages from notifications
- Separate interruptions
- Notification cancellation
- Detailed notification view with logs

**Key Files:**

- Pages: `src/pages/bildirim/Bildirim.tsx`
- Components: `src/components/pages/notification/`
- Services: `src/services/notifications/`

### 3. **Unplanned Outages (Plansız Kesintiler)**

- Outage list with advanced filtering
- Statistics cards
- Create outage operations
- Merge multiple outages
- Archive outages
- Energize interruption
- Show outage in tree view
- Detailed outage view with all tabs

**Key Files:**

- Pages: `src/pages/unplanned-outages/UnPlannedOutages.tsx`
- Components: `src/components/pages/outages/unplanned/`
- Services: `src/services/outages/unplanned-outage/`

### 4. **Planned Outages (Planlı Kesintiler)**

- Awaiting approval table
- Approved outages table
- Statistics cards
- Approval workflow
- Create planned outage
- Cancel planned outage
- Archive planned outages

**Key Files:**

- Pages: `src/pages/planned-outages/PlannedOutages.tsx`
- Components: `src/components/pages/outages/planned/`
- Services: `src/services/outages/planned-outage/`

### 5. **Map (Harita)**

- Interactive map with outage visualization
- Layer tree control
- Feature info popups
- Search functionality
- Vector tile layers
- Custom styling

**Key Files:**

- Pages: `src/pages/harita/Harita.tsx`
- Components: `src/components/ui/map/`
- Services: `src/services/map/`

### 6. **Reports (Raporlar)**

- Report category cards
- Report data table
- Export functionality (Excel)

**Key Files:**

- Pages: `src/pages/raporlar/Raporlar.tsx`
- Components: `src/components/pages/reports/`

### 7. **Life Cycle (Yaşam Döngüsü)**

- Outage/notification life cycle tracking
- Detailed information display
- Filtering and search

**Key Files:**

- Pages: `src/pages/yasam-dongusu/YasamDongusu.tsx`
- Components: `src/components/pages/life-cycle/`

### 8. **Settings (Ayarlar)**

- User management table
- Role management table
- SMS message management
- General SMS settings
- KVKK settings
- Data management

**Key Files:**

- Pages: `src/pages/ayarlar/Ayarlar.tsx`
- Components: `src/components/pages/settings/`
- Services: `src/services/settings/`

### 9. **OGSS Module**

#### OGSS Outages (OGSS Kesintiler)

- Tree-based outage visualization
- Node filtering
- Outage details in drawer
- Action rows for operations

#### OGSS Simulation (OGSS Simulasyon)

- Network simulation
- Tree visualization
- Simulation controls

#### OGSS Historical Network (OGSS Tarihsel Şebeke)

- Historical network data
- Tree visualization
- Date range filtering

**Key Files:**

- Pages: `src/pages/ogss/`
- Components: `src/components/pages/ogss/`
- Services: `src/services/ogss/`

---

## 🧩 Component Library

### UI Components (`src/components/ui/`)

#### 1. **Inputs**

##### Text Input

```tsx
import { Input } from "@/components/ui/input/Input";

<Input
  label="Username"
  placeholder="Enter username"
  value={value}
  onChange={(e) => setValue(e.target.value)}
  error="Error message"
  required
/>;
```

##### Select Input

```tsx
import { SelectInput } from "@/components/ui/input/select-input/select-input";

<SelectInput
  label="Status"
  options={[
    { value: "1", label: "Active" },
    { value: "2", label: "Inactive" },
  ]}
  value={selectedValue}
  onChange={setSelectedValue}
/>;
```

##### Multi-Select Input

```tsx
import { MultiSelectInput } from "@/components/ui/input/multi-select-input/multi-select-input";

<MultiSelectInput
  label="Tags"
  options={tagOptions}
  value={selectedTags}
  onChange={setSelectedTags}
/>;
```

##### Date Input

```tsx
import { DateInput } from "@/components/ui/input/date-input/date-input";

<DateInput
  label="Start Date"
  value={startDate}
  onChange={setStartDate}
  format="YYYY/MM/DD"
  hasTime={true}
/>;
```

##### Textarea

```tsx
import { Textarea } from "@/components/ui/input/textarea/textarea";

<Textarea
  label="Description"
  value={description}
  onChange={(e) => setDescription(e.target.value)}
  rows={5}
/>;
```

##### Checkbox

```tsx
import { CheckBox } from "@/components/ui/input/check-box/check-box";

<CheckBox label="Remember me" checked={isChecked} onChange={setIsChecked} />;
```

##### Toggle Button

```tsx
import { Toggle } from "@/components/ui/input/toggle-button/Toggle";

<Toggle
  checked={isEnabled}
  onChange={setIsEnabled}
  label="Enable notifications"
/>;
```

##### File Upload

```tsx
import { FileUploader } from "@/components/ui/input/file-uploader/file-uploader";

<FileUploader
  label="Upload Image"
  accept="image/*"
  maxSize={5} // MB
  onUpload={(file) => console.log(file)}
/>;
```

#### 2. **Buttons**

```tsx
import { Button } from '@/components/ui/button/button';

// Primary Button
<Button variant="primary" onClick={handleClick}>
  Save
</Button>

// Secondary Button
<Button variant="secondary" onClick={handleClick}>
  Cancel
</Button>

// Danger Button
<Button variant="danger" onClick={handleDelete}>
  Delete
</Button>

// Icon Button
<Button variant="primary" leftIcon={<Icon />}>
  Save
</Button>

// Disabled State
<Button variant="primary" disabled>
  Saving...
</Button>
```

#### 3. **Tables**

```tsx
import { Table } from "@/components/ui/Table/table";

<Table
  data={tableData}
  columns={columns}
  isLoading={isLoading}
  hasPagination={true}
  hasCheckbox={true}
  selectedRows={selectedRows}
  selectRowsHandler={handleRowSelect}
  onSortChange={handleSort}
  appliedFilters={filters}
  onFilterChange={handleFilterChange}
  pageSize={pageSize}
  setPageSize={setPageSize}
  totalPagesProp={totalPages}
  pageChangeHanlder={handlePageChange}
  currentPage={currentPage}
/>;
```

**Column Configuration Example:**

```tsx
const columns = [
  {
    header: "Name",
    accessorKey: "name",
    filterType: "text",
    enableSorting: true,
  },
  {
    header: "Status",
    accessorKey: "status",
    filterType: "select",
    filterOptions: ["Active", "Inactive"],
    cell: ({ row }) => <StatusIcon status={row.original.active} />,
  },
  {
    header: "Created Date",
    accessorKey: "createdDate",
    filterType: "date",
  },
];
```

#### 4. **Cards**

```tsx
import { Card } from '@/components/ui/cards/card';
import { CardWithLoader } from '@/components/ui/cards/card-with-loader';

// Basic Card with Metrics
<Card
  title="Active Outages"
  count={25}
  periodicCount={20}
  percent={25}
  chartStatus={true}
  theme="red"
  hasInfo={true}
  detailComponent={<OutageBreakdown />}
/>

// Card with Loading State
<CardWithLoader loading={isLoading} />;
```

#### 5. **Modals**

```tsx
import { ModalWrapper } from "@/components/ui/modal-wrapper/modal-wrapper";

<ModalWrapper
  isOpen={isOpen}
  onClose={handleClose}
  title="Edit User"
  modalSize="lg" // sm, md, lg, full
>
  <div>Modal content</div>
</ModalWrapper>;
```

#### 6. **Drawer**

```tsx
import { Drawer } from "@/components/ui/drawer/drawer";

<Drawer
  isOpen={isOpen}
  onClose={handleClose}
  title="Outage Details"
  size="lg" // sm, md, lg, full
  hasFooter={true}
  submitBtnText="Save"
  closeBtnText="Cancel"
  onSubmit={handleSubmit}
>
  <div>Drawer content</div>
</Drawer>;
```

#### 7. **Charts**

##### Donut Chart

```tsx
import { DonutChart } from "@/components/ui/charts/donut-chart";

<DonutChart series={[44, 55, 13, 33]} title="Notification Sources" />;
```

##### Area Chart

```tsx
import { AreaChart } from "@/components/ui/charts/area-chart";

<AreaChart
  data={[30, 40, 35, 50, 49, 60, 70]}
  categories={["Mon", "Tue", "Wed", "Thu", "Fri", "Sat", "Sun"]}
  curveType="smooth"
/>;
```

##### Column Chart

```tsx
import { ColumnChart } from "@/components/ui/charts/column-chart";

<ColumnChart
  series={[{ name: "Energy", data: [44, 55, 41, 67, 22, 43] }]}
  categories={["Jan", "Feb", "Mar", "Apr", "May", "Jun"]}
/>;
```

##### Pie Chart

```tsx
import { PieChart } from "@/components/ui/charts/pie-chart";

<PieChart
  series={[44, 55, 13, 33]}
  labels={["Solar", "Wind", "Hydro", "Other"]}
  height={350}
/>;
```

##### Tree Map

```tsx
import { TreeMap } from "@/components/ui/charts/tree-map";

<TreeMap data={treeMapData} height={350} />;
```

#### 8. **Maps**

```tsx
import { Map } from "@/components/ui/map/map";

<Map
  layers={vectorLayers}
  onFeatureClick={handleFeatureClick}
  showLayerTree={true}
  showSearch={true}
/>;
```

#### 9. **Tree Chart**

```tsx
import { TreeChart } from "@/components/ui/tree-chart/tree-chart";

<TreeChart
  data={treeData}
  onNodeClick={handleNodeClick}
  highlightedNodes={highlightedNodes}
/>;
```

#### 10. **Loaders**

```tsx
import { Loader } from '@/components/ui/loader/loader';
import { SkeletonLoader } from '@/components/ui/skeleton/skeleton-loader';

// Full Page Loader
<Loader />

// Skeleton Loader
<SkeletonLoader
  count={5}
  height={50}
  variant="rectangular" // rectangular, circular, text
/>;
```

#### 11. **Tabs**

```tsx
import { Tabs } from "@/components/ui/tabs/tabs";

<Tabs
  tabs={[
    { id: "tab1", label: "Overview", content: <Overview /> },
    { id: "tab2", label: "Details", content: <Details /> },
  ]}
  activeTab={activeTab}
  onChange={setActiveTab}
/>;
```

#### 12. **Accordion**

```tsx
import { Accordion } from "@/components/ui/accordion/accordion";

<Accordion
  items={[
    { id: "1", title: "Section 1", content: <Content1 /> },
    { id: "2", title: "Section 2", content: <Content2 /> },
  ]}
  defaultOpen={["1"]}
/>;
```

#### 13. **Toast Notifications**

```tsx
import { toast } from "@/components/ui/toast/toast";

// Success
toast.success("Operation successful!");

// Error
toast.error("Something went wrong!");

// Warning
toast.warning("Please check your input");

// Info
toast.info("New update available");
```

#### 14. **Tooltip**

```tsx
import { Tooltip } from "@/components/ui/tooltip/tooltip";

<Tooltip content="This is a tooltip">
  <button>Hover me</button>
</Tooltip>;
```

#### 15. **Stepper**

```tsx
import { Stepper } from "@/components/ui/stepper/stepper";

<Stepper
  steps={[
    { label: "Step 1", completed: true },
    { label: "Step 2", completed: false },
    { label: "Step 3", completed: false },
  ]}
  currentStep={1}
/>;
```

#### 16. **User Avatar**

```tsx
import { UserAvatar } from "@/components/ui/user-avatar/user-avatar";

<UserAvatar
  name="John Doe"
  imageUrl="/avatar.jpg"
  size="medium" // small, medium, large
/>;
```

---

## 🗄 State Management

### Redux Store

**Location:** `src/store/app/store.ts`

#### Store Configuration

```typescript
// src/store/app/store.ts
import { persistor, store } from "@/store/app/store";

// Store slices:
// - drawer: Drawer open/close state
// - tableFilters: Table filter states (persisted)
// - columns: Column visibility and order (persisted)
// - outageTabs: Active tab in outage pages (persisted)
// - highlightedNodes: Highlighted nodes in trees
// - refresh: Auto-refresh intervals (persisted)
// - ogssLayout: OGSS fullscreen mode
```

#### Using Redux State

```tsx
import { closeDrawer } from "@/store/app/drawer-slice";
import { RootState } from "@/store/app/store";
import { useDispatch, useSelector } from "react-redux";

function MyComponent() {
  const dispatch = useDispatch();
  const { isOpen, type, id } = useSelector((state: RootState) => state.drawer);

  const handleClose = () => {
    dispatch(closeDrawer());
  };

  return <div>{isOpen && <DrawerContent type={type} id={id} />}</div>;
}
```

#### Redux Slices

1. **Drawer Slice** (`drawer-slice.ts`)

   - Manages drawer open/close state
   - Stores drawer type, title, and ID
   - Used for notification details, outage details

2. **Filter Slice** (`filter-slice.ts`)

   - Persists table filter states per page
   - Stores applied filters
   - Whitelisted for persistence

3. **Columns Slice** (`columns-slice.ts`)

   - Manages table column visibility and order
   - Persists column preferences
   - Whitelisted for persistence

4. **Outage Tabs Slice** (`outage-tabs-slice.ts`)

   - Tracks active tab in outage pages
   - Whitelisted for persistence

5. **Highlighted Nodes Slice** (`highlighted-nodes-slice.ts`)

   - Stores highlighted nodes in tree visualizations

6. **Refresh Slice** (`refresh-slice.ts`)

   - Manages auto-refresh intervals
   - Whitelisted for persistence

7. **OGSS Layout Slice** (`ogss-layout-slice.ts`)
   - Controls OGSS fullscreen mode

### React Query (TanStack Query)

**Location:** `src/lib/react-query.ts`

#### Configuration

```typescript
// Default options:
// - retry: 1
// - refetchOnWindowFocus: false
```

#### Using React Query

```tsx
import { useMutation, useQuery, useQueryClient } from "@tanstack/react-query";
import {
  fetchNotifications,
  createNotification,
} from "@/services/notifications/notificationGrid";

function NotificationsPage() {
  const queryClient = useQueryClient();

  // Fetch data
  const { data, isLoading, error } = useQuery({
    queryKey: ["notifications", { page: 1 }],
    queryFn: () => fetchNotifications({ page: 1 }),
  });

  // Mutate data
  const createMutation = useMutation({
    mutationFn: createNotification,
    onSuccess: () => {
      // Invalidate and refetch
      queryClient.invalidateQueries({ queryKey: ["notifications"] });
      toast.success("Notification created successfully");
    },
    onError: (error) => {
      toast.error("Failed to create notification");
    },
  });

  return (
    <div>
      {isLoading && <Loader />}
      {error && <ErrorContent error={error} />}
      {data && <NotificationTable data={data.items} />}
    </div>
  );
}
```

#### Query Key Patterns

```typescript
// List queries
["notifications"][("notifications", { page: 1, pageSize: 20 })][ // All notifications // Paginated notifications
  ("outages", { status: "active" })
][ // Filtered outages
  // Detail queries
  ("notification", notificationId)
][("outage", outageId)][ // Single notification // Single outage
  // Nested queries
  ("dashboard", "cards")
][("dashboard", "map-data")]; // Dashboard cards // Map data
```

---

## 🌐 API Integration

### Service Layer Structure

All API calls are organized in `src/services/` by feature:

### Service File Naming Convention

- **GET operations**: `fetch-*.ts` (e.g., `fetch-notification-detail.ts`)
- **POST operations**: `post-*.ts` (e.g., `post-create-rank.ts`)
- **PUT operations**: `put-*.ts` (e.g., `put-update-notification.ts`)
- **DELETE operations**: `delete-*.ts` (e.g., `delete-notification.ts`)
- **Generic operations**: kebab-case with descriptive names (e.g., `notification-grid.ts`, `cards.ts`)

### Service Function Naming Convention

- Use verb + noun pattern: `fetchNotificationGrid`, `createNotification`, `updateOutage`
- Use `fetch*` for GET operations
- Use `create*` for POST operations
- Use `update*` for PUT operations
- Use `delete*` for DELETE operations

```typescript
// Example: src/services/notifications/notification-grid.ts

import { getFormDataPost } from "@/lib/api-method/api-method-functions";

export interface NotificationListParams {
  page?: number;
  pageSize?: number;
  search?: string;
  status?: string;
  startDate?: string;
  endDate?: string;
}

export interface Notification {
  id: number;
  notificationNumber: string;
  notificationSource: string;
  status: string;
  createdDate: string;
}

// GET list
export async function fetchNotificationGrid(params: NotificationListParams) {
  return await getFormDataPost<{ items: Notification[]; totalCount: number }>({
    endPoint: "check-notification-grid",
    type: "post",
    formData: { filtersAndSorting: { ...params } },
  });
}

// GET by ID
export const fetchNotificationById = async (id: number) => {
  const response = await axios.get<Notification>(`/api/notifications/${id}`);
  return response.data;
};

// POST create
export const createNotification = async (data: Partial<Notification>) => {
  const response = await axios.post<Notification>("/api/notifications", data);
  return response.data;
};

// PUT update
export const updateNotification = async (
  id: number,
  data: Partial<Notification>
) => {
  const response = await axios.put<Notification>(
    `/api/notifications/${id}`,
    data
  );
  return response.data;
};

// DELETE
export const deleteNotification = async (id: number) => {
  await axios.delete(`/api/notifications/${id}`);
};
```

### Real-time Communication

```typescript
import * as signalR from "@microsoft/signalr";

const connection = new signalR.HubConnectionBuilder()
  .withUrl("/notificationHub")
  .build();

connection.on("NotificationReceived", (notification) => {
  // Handle real-time notification
  queryClient.invalidateQueries({ queryKey: ["notifications"] });
});

await connection.start();
```

---

## 🛣 Routing & Navigation

### Route Configuration

**Location:** `src/routes/routes.tsx`

Routes are defined with lazy loading:

```typescript
import { lazy, Suspense } from "react";
import { RouteObject } from "react-router-dom";
import { Loader } from "@/components/ui/loader/loader";

const Dashboard = lazy(() => import("@/pages/dashboard/Dashboard"));
const Bildirim = lazy(() => import("@/pages/bildirim/Bildirim"));

const routes: RouteObject[] = [
  { path: "/login", element: <Login /> },
  { path: "/", element: <Dashboard /> },
  { path: "/bildirimler", element: <Bildirim /> },
  // ... more routes
];
```

### Export Patterns

**Page Components**: All page components use **default exports** for consistency:

```tsx
// ✅ Correct
const Dashboard = () => { ... };
export default Dashboard;

// ❌ Avoid named exports for pages
export const Dashboard = () => { ... };
```

**UI Components**: Use **named exports** for reusable components:

```tsx
// ✅ Correct
export const Button: React.FC<ButtonProps> = ({ ... }) => { ... };

// ✅ Also acceptable
const Button: React.FC<ButtonProps> = ({ ... }) => { ... };
export default Button;
```

### Protected Routes

Routes are automatically protected via `protected-routes.tsx`:

- Authentication check
- Permission validation (if needed)

### Navigation Items

**Location:** `src/helpers/data/nav-items.ts`

Navigation is configured with menu items:

```typescript
export const NAV_ITEMS = [
  {
    title: "Ana Sayfa",
    Icon: InterfaceSvg,
    route: "/",
    id: 1,
  },
  {
    title: "Bildirim",
    Icon: BellSvg,
    route: "/bildirimler",
    id: 2,
  },
  {
    title: "Kesinti",
    Icon: NetworkSvg,
    id: 3,
    children: [
      {
        title: "Plansız Kesintiler",
        route: "/plansiz-kesintiler",
        id: 31,
      },
      {
        title: "Planlı Kesintiler",
        route: "/planli-kesintiler",
        id: 32,
      },
    ],
  },
];
```

### Programmatic Navigation

```tsx
import { useNavigate } from "react-router-dom";

function MyComponent() {
  const navigate = useNavigate();

  const handleClick = () => {
    navigate("/notifications");
    // or with state
    navigate("/notifications/123", { state: { from: "dashboard" } });
  };

  return <button onClick={handleClick}>Go to Notifications</button>;
}
```

---

## 🌍 Internationalization (i18n)

### Supported Languages

- Turkish (tr) - Default
- English (en) - Fallback

### Configuration

**Location:** `src/i18n.ts`

```typescript
import i18n from "i18next";
import { initReactI18next } from "react-i18next";
import en from "@/language/en.json";
import tr from "@/language/tr.json";

i18n.use(initReactI18next).init({
  resources: {
    en: { translation: en?.translation },
    tr: { translation: tr?.translation },
  },
  lng: "tr",
  fallbackLng: "en",
  interpolation: {
    escapeValue: false,
  },
});
```

### Using Translations

```tsx
import { useTranslation } from "react-i18next";

function MyComponent() {
  const { t } = useTranslation();

  return <h1>{t("Dashboard")}</h1>;
}
```

---

## 📝 Forms & Validation

### React Hook Form

The application uses React Hook Form for form management.

#### Basic Form Example

```tsx
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import * as yup from "yup";
import { Button } from "@/components/ui/button/button";
import { Input } from "@/components/ui/input/Input";

// Define validation schema
const schema = yup.object({
  name: yup.string().required("Name is required"),
  email: yup.string().email("Invalid email").required("Email is required"),
  age: yup.number().positive().integer().required("Age is required"),
});

function UserForm() {
  const {
    register,
    handleSubmit,
    formState: { errors, isSubmitting },
    reset,
  } = useForm({
    resolver: yupResolver(schema),
    defaultValues: {
      name: "",
      email: "",
      age: 0,
    },
  });

  const onSubmit = async (data: any) => {
    try {
      await createUser(data);
      toast.success("User created");
      reset();
    } catch (error) {
      toast.error("Failed to create user");
    }
  };

  return (
    <form onSubmit={handleSubmit(onSubmit)}>
      <Input label="Name" {...register("name")} error={errors.name?.message} />

      <Input
        label="Email"
        type="email"
        {...register("email")}
        error={errors.email?.message}
      />

      <Button type="submit" disabled={isSubmitting}>
        {isSubmitting ? "Saving..." : "Save"}
      </Button>
    </form>
  );
}
```

### Validation Schemas

**Location:** `src/validations/`

Example validation schema:

```typescript
// src/validations/user-schema.ts
import * as yup from "yup";

export const userCreateSchema = yup.object({
  userName: yup.string().required("Username is required").min(3).max(50),
  email: yup.string().email("Invalid email").required("Email is required"),
  password: yup.string().required("Password is required").min(6),
  phoneNumber: yup.string().nullable(),
  isActive: yup.boolean().default(true),
});

export type UserCreateInput = yup.InferType<typeof userCreateSchema>;
```

---

## 🧪 Testing

### Running Tests

```bash
# Watch mode
pnpm test

# With UI
pnpm test:ui

# With coverage
pnpm coverage
```

### Test Structure

Tests are located in `__tests__` directories next to the components:

```
src/
  components/
    ui/
      button/
        button.tsx
        __tests__/
          button.test.tsx
```

### Writing Tests

```typescript
import { render, screen, fireEvent } from "@testing-library/react";
import { vi, describe, it, expect } from "vitest";
import { Button } from "../button";

describe("Button", () => {
  it("should render correctly", () => {
    render(<Button>Click me</Button>);
    expect(screen.getByText("Click me")).toBeInTheDocument();
  });

  it("should call onClick handler", () => {
    const handleClick = vi.fn();
    render(<Button onClick={handleClick}>Click me</Button>);

    fireEvent.click(screen.getByText("Click me"));
    expect(handleClick).toHaveBeenCalledTimes(1);
  });

  it("should be disabled when disabled prop is true", () => {
    render(<Button disabled>Click me</Button>);
    expect(screen.getByRole("button")).toBeDisabled();
  });
});
```

---

## 🎨 Styling

### SCSS Modules

The application uses SCSS modules for component-specific styles:

```scss
// button.scss
.button {
  padding: 0.5rem 1rem;
  border-radius: 0.375rem;
  font-weight: 500;

  &.primary {
    background-color: #3b82f6;
    color: white;

    &:hover {
      background-color: #2563eb;
    }
  }

  &.secondary {
    background-color: #6b7280;
    color: white;
  }

  &.disabled {
    opacity: 0.5;
    cursor: not-allowed;
  }
}
```

```tsx
// button.tsx
import styles from "./button.scss";

export const Button = ({ variant = "primary", disabled, children }) => {
  return (
    <button
      className={`${styles.button} ${styles[variant]} ${
        disabled ? styles.disabled : ""
      }`}
      disabled={disabled}
    >
      {children}
    </button>
  );
};
```

### Global Styles

**Location:** `src/assets/styles/`

- `app.scss` - Application-wide styles
- `pages.scss` - Page-specific styles

---

## 💡 Best Practices

### 1. **File Naming Conventions**

- **Page Components**: PascalCase (`Dashboard.tsx`, `UnPlannedOutages.tsx`) - use default exports
- **UI Components**: lowercase (`button.tsx`, `table.tsx`, `card.tsx`) - some exceptions use PascalCase (`Input.tsx`, `Toggle.tsx`)
- **Page-Specific Components**: PascalCase (`DashboardCards.tsx`, `NotificationTable.tsx`)
- **Utilities/Helpers**: kebab-case (`format-date.ts`, `get-class-names.ts`)
- **Services**: kebab-case (`notification-grid.ts`, `fetch-notification-detail.ts`, `post-create-rank.ts`)
- **Hooks**: kebab-case (`use-notification-detail.ts`, `use-create-rank-logic.ts`)
- **Styles**: kebab-case (`button.scss`, `dashboard-cards.scss`)
- **Types**: kebab-case (`notification-types.ts`) - interface names use PascalCase without `I` prefix (`TableProps`, `ButtonProps`)

### 2. **Component Structure**

```tsx
// 1. Imports (grouped)
import React from "react";
import { useQuery } from "@tanstack/react-query";
import { useNavigate } from "react-router-dom";
// Internal imports
import { Button } from "@/components/ui/button/button";
// Styles
import styles from "./my-component.scss";

// 2. Types/Interfaces
interface MyComponentProps {
  id?: string;
  onSelect?: (item: any) => void;
}

// 3. Component
export const MyComponent: React.FC<MyComponentProps> = ({ id, onSelect }) => {
  // Hooks
  const navigate = useNavigate();
  const { data, isLoading } = useQuery({
    queryKey: ["data", id],
    queryFn: () => fetchData(id),
  });

  // Event handlers
  const handleClick = () => {
    onSelect?.(data);
  };

  // Render
  if (isLoading) return <Loader />;

  return (
    <div className={styles.container}>
      {data && <div onClick={handleClick}>{data.name}</div>}
    </div>
  );
};
```

### 3. **Custom Hooks**

Extract reusable logic into custom hooks:

```typescript
// useNotificationList.ts
export const useNotificationList = (params: NotificationListParams) => {
  const { data, isLoading, error, refetch } = useQuery({
    queryKey: ["notifications", params],
    queryFn: () => fetchNotifications(params),
  });

  const notifications = data?.items ?? [];

  return { notifications, isLoading, error, refetch };
};

// Usage
const { notifications, isLoading, refetch } = useNotificationList({ page: 1 });
```

### 4. **Error Handling**

Always handle errors gracefully:

```typescript
try {
  const result = await apiCall();
  toast.success("Operation successful");
  return result;
} catch (error) {
  toast.error("Operation failed");
  console.error(error);
}
```

---

## 🔧 Common Tasks

### 1. **Adding a New Page**

1. Create page component in `src/pages/[module]/`
2. Create page-specific components in `src/components/pages/[module]/`
3. Add route in `src/routes/routes.tsx`
4. Add navigation item in `src/helpers/data/nav-items.ts` (if needed)

Example:

```tsx
// 1. src/pages/reports/new-report.tsx
import MainLayout from '@/components/layouts/page-layout/main-layout';
import { NewReportTable } from '@/components/pages/reports/new-report-table';

export default function NewReport() {
  return (
    <MainLayout title="New Report" hasNotification={false}>
      <NewReportTable />
    </MainLayout>
  );
}

// 2. src/routes/routes.tsx
const NewReport = lazy(() => import('@/pages/reports/new-report'));

const routes: RouteObject[] = [
  // ... other routes
  { path: '/reports/new', element: withLoader(<NewReport />) },
];

// 3. src/helpers/data/nav-items.ts
{
  title: 'New Report',
  Icon: ReportSvg,
  route: '/reports/new',
  id: 99,
}
```

### 2. **Creating a New API Service**

1. Create service file in `src/services/[module]/`
2. Define types
3. Implement API methods
4. Export functions

Example:

```typescript
// src/services/reports/new-report.ts
import axios from "axios";

export interface NewReportParams {
  page?: number;
  pageSize?: number;
  startDate?: string;
  endDate?: string;
}

export interface NewReport {
  id: number;
  name: string;
  createdDate: string;
}

export const fetchNewReports = async (params: NewReportParams) => {
  const response = await axios.get<{ items: NewReport[]; totalCount: number }>(
    "/api/reports/new",
    { params }
  );
  return response.data;
};

export const createNewReport = async (data: Partial<NewReport>) => {
  const response = await axios.post<NewReport>("/api/reports/new", data);
  return response.data;
};
```

### 3. **Adding a New UI Component**

1. Create component directory in `src/components/ui/`
2. Create component file and style file
3. Export component

Example:

```tsx
// src/components/ui/rating/rating.tsx
import React from "react";
import styles from "./rating.scss";

interface RatingProps {
  value: number;
  max?: number;
  onChange?: (value: number) => void;
  readonly?: boolean;
}

export const Rating: React.FC<RatingProps> = ({
  value,
  max = 5,
  onChange,
  readonly = false,
}) => {
  const handleClick = (rating: number) => {
    if (!readonly && onChange) {
      onChange(rating);
    }
  };

  return (
    <div className={styles.rating}>
      {Array.from({ length: max }, (_, i) => i + 1).map((rating) => (
        <button
          key={rating}
          className={`${styles.star} ${rating <= value ? styles.active : ""}`}
          onClick={() => handleClick(rating)}
          disabled={readonly}
        >
          ★
        </button>
      ))}
    </div>
  );
};
```

### 4. **Adding a New Redux Slice**

1. Create slice file in `src/store/app/`
2. Add to store configuration
3. Use in components

Example:

```typescript
// src/store/app/theme-slice.ts
import { createSlice, PayloadAction } from "@reduxjs/toolkit";

interface ThemeState {
  mode: "light" | "dark";
}

const initialState: ThemeState = {
  mode: "light",
};

const themeSlice = createSlice({
  name: "theme",
  initialState,
  reducers: {
    setThemeMode: (state, action: PayloadAction<"light" | "dark">) => {
      state.mode = action.payload;
    },
  },
});

export const { setThemeMode } = themeSlice.actions;
export default themeSlice.reducer;

// Add to store.ts
import themeReducer from "./theme-slice";

const rootReducer = combineReducers({
  // ... other reducers
  theme: themeReducer,
});
```

### 5. **Adding Form Validation**

1. Create validation schema in `src/validations/`
2. Use with React Hook Form

Example:

```typescript
// src/validations/report-schema.ts
import * as yup from "yup";

export const reportSchema = yup.object({
  name: yup.string().required("Name is required").max(100),
  description: yup.string().nullable(),
  startDate: yup.string().required("Start date is required"),
  endDate: yup.string().required("End date is required"),
});

export type ReportInput = yup.InferType<typeof reportSchema>;

// Usage
import { yupResolver } from "@hookform/resolvers/yup";
import { useForm } from "react-hook-form";
import { reportSchema, ReportInput } from "@/validations/report-schema";

const {
  register,
  handleSubmit,
  formState: { errors },
} = useForm<ReportInput>({
  resolver: yupResolver(reportSchema),
});
```

### 6. **Adding a Custom Hook**

1. Create hook file in `src/hooks/`
2. Export hook
3. Use in components

Example:

```typescript
// src/hooks/useLocalStorage.ts
import { useEffect, useState } from "react";

export function useLocalStorage<T>(key: string, initialValue: T) {
  const [storedValue, setStoredValue] = useState<T>(() => {
    try {
      const item = window.localStorage.getItem(key);
      return item ? JSON.parse(item) : initialValue;
    } catch (error) {
      console.error(error);
      return initialValue;
    }
  });

  const setValue = (value: T | ((val: T) => T)) => {
    try {
      const valueToStore =
        value instanceof Function ? value(storedValue) : value;
      setStoredValue(valueToStore);
      window.localStorage.setItem(key, JSON.stringify(valueToStore));
    } catch (error) {
      console.error(error);
    }
  };

  return [storedValue, setValue] as const;
}

// Usage
const [theme, setTheme] = useLocalStorage("theme", "light");
```

---

## 📚 Additional Resources

### Version History

See `CHANGELOG.md` for detailed version history and release notes.

**Current Version**: 1.0.37

### External Libraries Documentation

- [React](https://react.dev/)
- [TypeScript](https://www.typescriptlang.org/)
- [Vite](https://vitejs.dev/)
- [React Router](https://reactrouter.com/)
- [TanStack Query](https://tanstack.com/query/)
- [Redux Toolkit](https://redux-toolkit.js.org/)
- [React Hook Form](https://react-hook-form.com/)
- [Yup](https://github.com/jquense/yup)
- [ApexCharts](https://apexcharts.com/)
- [React Leaflet](https://react-leaflet.js.org/)
- [Vitest](https://vitest.dev/)

---

## 🤝 Contributing

### Code Style

- Follow the existing code style
- Use ESLint and Prettier
- Write meaningful commit messages
- Add tests for new features
- Update documentation

### Git Workflow

```bash
# Create feature branch
git checkout -b feature/new-feature

# Make changes and commit
git add .
git commit -m "feat: add new feature"

# Push to remote
git push origin feature/new-feature

# Create pull request
```

### Commit Message Convention

```
feat: add new feature
fix: bug fix
docs: documentation changes
style: code style changes (formatting)
refactor: code refactoring
test: add or update tests
chore: maintenance tasks
```

---

## 📞 Support

For questions or issues:

1. Check existing documentation
2. Search through codebase for similar implementations
3. Contact the development team

---

## Quick Start Checklist for New Developers

- [ ] Clone repository
- [ ] Install dependencies (`pnpm install`)
- [ ] Set up environment variables (`.env`)
- [ ] Run development server (`pnpm dev`)
- [ ] Read this README thoroughly
- [ ] Review project structure
- [ ] Explore UI component library in `src/components/ui/`
- [ ] Review example pages in `src/pages/`
- [ ] Understand routing in `src/routes/routes.tsx`
- [ ] Review API services in `src/services/`
- [ ] Check Redux store structure in `src/store/app/`
- [ ] Review custom hooks in `src/hooks/`
- [ ] Run tests (`pnpm test`)
- [ ] Start coding! 🚀

---

**Last Updated**: 2025-01-21
