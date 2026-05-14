# Project Routes

This document outlines the routing structure for Grow, following Expo Router's file-based routing conventions and the product's core architecture: **Plan → Routine → Task → Timer → Activity Tracking**.

## Route Structure

### Core Navigation Routes

#### 1. Home (`/`)
- **File**: `src/app/index.tsx`
- **Purpose**: Main dashboard showing today's routines and progress
- **Features**:
  - Daily routine breakdown (Morning, Noon, Evening, Night)
  - Quick access to active tasks
  - Progress overview
  - Day selector navigation

#### 2. Timer (`/timer`)
- **File**: `src/app/timer/index.tsx`
- **Purpose**: Focus timer for active tasks
- **Features**:
  - Task-linked timer with pause/resume controls
  - Progress percentage display
  - Focus tips and motivation
  - Session completion tracking

#### 3. Activity Heatmap (`/activity`)
- **File**: `src/app/activity/index.tsx`
- **Purpose**: GitHub-style consistency tracking
- **Features**:
  - Daily and weekly progress visualization
  - Goal tracking and streaks
  - Historical activity data
  - Performance insights

#### 4. Calendar (`/calendar`)
- **File**: `src/app/calendar/index.tsx`
- **Purpose**: Monthly overview and planning
- **Features**:
  - Monthly calendar view
  - Daily task breakdown
  - Task filtering (To do, Completed, Pending)
  - Quick routine scheduling

### Planning & Management Routes

#### 5. Plans (`/plans`)
- **File**: `src/app/plans/index.tsx`
- **Purpose**: Plan creation and management
- **Sub-routes**:
  - `/plans/create` - Create new plan
  - `/plans/[id]` - View/edit specific plan
  - `/plans/[id]/routines` - Manage plan routines

#### 6. Routines (`/routines`)
- **File**: `src/app/routines/index.tsx`
- **Purpose**: Routine management hub
- **Sub-routes**:
  - `/routines/create` - Create new routine
  - `/routines/[id]` - View/edit routine details
  - `/routines/[id]/tasks` - Manage routine tasks

#### 7. Notes (`/notes`)
- **File**: `src/app/notes/index.tsx`
- **Purpose**: Note-taking and quick capture
- **Sub-routes**:
  - `/notes/create` - Create new note
  - `/notes/[id]` - View/edit note details
  - `/notes/checklist` - Checklist management

### Utility Routes

#### 8. Notifications (`/notifications`)
- **File**: `src/app/notifications/index.tsx`
- **Purpose**: Notification center and settings
- **Features**:
  - Recent notifications
  - Notification preferences
  - Reminder management

#### 9. Settings (`/settings`)
- **File**: `src/app/settings/index.tsx`
- **Purpose**: App configuration and preferences
- **Sub-routes**:
  - `/settings/profile` - User profile
  - `/settings/theme` - Theme preferences
  - `/settings/notifications` - Notification settings
  - `/settings/data` - Data management

## File Structure Implementation

```
src/app/
├── index.tsx                    # Home screen
├── _layout.tsx                  # Root layout
├── +not-found.tsx              # 404 screen
├── timer/
│   └── index.tsx               # Timer screen
├── activity/
│   └── index.tsx               # Activity heatmap
├── calendar/
│   └── index.tsx               # Calendar view
├── plans/
│   ├── index.tsx               # Plans list
│   ├── create.tsx              # Create plan
│   ├── [id]/
│   │   ├── index.tsx           # Plan details
│   │   └── routines.tsx        # Plan routines
│   └── _layout.tsx             # Plans layout
├── routines/
│   ├── index.tsx               # Routines list
│   ├── create.tsx              # Create routine
│   ├── [id]/
│   │   ├── index.tsx           # Routine details
│   │   └── tasks.tsx           # Routine tasks
│   └── _layout.tsx             # Routines layout
├── notes/
│   ├── index.tsx               # Notes list
│   ├── create.tsx              # Create note
│   ├── checklist.tsx           # Checklist view
│   ├── [id].tsx                # Note details
│   └── _layout.tsx             # Notes layout
├── notifications/
│   └── index.tsx               # Notifications
└── settings/
    ├── index.tsx               # Settings home
    ├── profile.tsx             # Profile settings
    ├── theme.tsx               # Theme settings
    ├── notifications.tsx       # Notification settings
    ├── data.tsx                # Data management
    └── _layout.tsx             # Settings layout
```

## Navigation Flow

### Primary User Journey
1. **Home** → View daily routines
2. **Select Routine** → Navigate to routine details
3. **Start Task** → Launch timer
4. **Complete Session** → Return to home or continue
5. **Review Progress** → Check activity heatmap

### Secondary Flows
- **Planning**: Home → Plans → Create/Edit → Routines → Tasks
- **Review**: Home → Calendar → Historical view
- **Notes**: Quick capture from any screen → Notes management
- **Settings**: Accessible from any screen via navigation

## Route Groups & Layouts

### Tab Navigation (Bottom Tabs)
- Home (`/`)
- Activity (`/activity`)
- Timer (`/timer`)
- Calendar (`/calendar`)

### Stack Navigation (Modal/Push)
- Plans management
- Routine creation/editing
- Notes system
- Settings

## Deep Linking Support

All routes support deep linking for:
- Direct access to specific plans/routines
- Timer sessions with pre-loaded tasks
- Shared notes and checklists
- Calendar date navigation 