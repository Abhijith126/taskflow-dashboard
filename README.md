# TaskFlow Dashboard

A modern, responsive task management dashboard built with React, TypeScript, and Tailwind CSS.

![TaskFlow Dashboard](./screenshot.png)

## Features

- 📊 **Dashboard Overview** — Visual stats and charts for task progress
- ✅ **Task Management** — Full CRUD operations with priorities, tags, and due dates
- 🔍 **Smart Filtering** — Filter by status, priority, and search
- 💾 **Local Persistence** — Tasks saved to localStorage automatically
- 📱 **Responsive Design** — Works great on desktop and mobile
- 🎨 **Modern UI** — Clean interface with smooth animations

## Tech Stack

- **React 18** — UI library
- **TypeScript** — Type safety
- **Vite** — Fast build tool
- **Tailwind CSS** — Utility-first styling
- **Zustand** — Lightweight state management
- **React Router** — Client-side routing
- **Recharts** — Charts and visualizations
- **Lucide React** — Beautiful icons
- **date-fns** — Date utilities

## Getting Started

```bash
# Install dependencies
npm install

# Start development server
npm run dev

# Build for production
npm run build

# Run tests
npm test
```

## Project Structure

```
src/
├── components/     # Reusable UI components
│   ├── Header.tsx
│   ├── Layout.tsx
│   ├── RecentTasks.tsx
│   ├── Sidebar.tsx
│   ├── StatsCard.tsx
│   ├── TaskChart.tsx
│   ├── TaskFilters.tsx
│   ├── TaskForm.tsx
│   └── TaskList.tsx
├── pages/          # Route pages
│   ├── Dashboard.tsx
│   ├── Settings.tsx
│   ├── TaskDetail.tsx
│   └── Tasks.tsx
├── store/          # Zustand stores
│   └── taskStore.ts
├── types/          # TypeScript types
│   └── task.ts
└── test/           # Test setup
    └── setup.ts
```

## Screenshots

### Dashboard
View your task statistics and upcoming deadlines at a glance.

### Tasks Page
Manage all your tasks with powerful filtering and search.

### Task Details
View and edit individual task details.

## License

MIT
