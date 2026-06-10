# Component Architecture Guide

# Introduction

This document explains the component architecture used in the Placement War-Room frontend application.

React applications are built using reusable UI components.

The project follows a modular component-based architecture to:

* improve maintainability
* support scalability
* reduce code duplication
* simplify UI management

---

# What Are Components?

Components are reusable building blocks of a React application.

Instead of writing one massive HTML page, the UI is divided into smaller independent modules.

Each module handles a specific responsibility.

Examples:

* navigation bar
* statistics card
* goal display
* leaderboard member

---

# Why Components Are Important

Components solve several major frontend problems.

## 1. Reusability

A component can be reused multiple times with different data.

Example:

```jsx id="b2v9e8"
<StatsCard title="DSA Questions" value="143" />
```

The same component can display:

* study hours
* streaks
* scores
* metrics

without rewriting UI code.

---

## 2. Maintainability

Smaller files are easier to:

* debug
* understand
* modify

Instead of managing a huge monolithic file, responsibilities are separated into independent modules.

---

## 3. Scalability

Large applications may contain hundreds of components.

A component-based architecture allows projects to scale without becoming unmanageable.

---

## 4. Separation of Concerns

Each component handles a specific responsibility.

Example:

* Navbar handles navigation
* GoalCard handles goal rendering
* TeamMember handles leaderboard display

This reduces architectural confusion.

---

# Current Component Structure

```txt id="jlwm15"
src/components/
│
├── Navbar.jsx
├── StatsCard.jsx
├── GoalCard.jsx
└── TeamMember.jsx
```

---

# Component Explanations

# 1. Navbar.jsx

## Purpose

Handles application navigation.

## Responsibilities

* displays navigation links
* supports routing
* provides application-wide navigation

## Technologies Used

* React Router DOM
* Link component
* Tailwind CSS

## Key Concepts

### Navigation Links

Example:

```jsx id="jlwm16"
<Link to="/team">
  Team
</Link>
```

This enables client-side navigation without page reloads.

---

# 2. StatsCard.jsx

## Purpose

Displays dashboard statistics.

Examples:

* DSA solved
* study hours
* streak count

## Reusability

The same component is reused multiple times with different props.

Example:

```jsx id="jlwm17"
<StatsCard
  title="Study Hours"
  value="87"
/>
```

## Props Used

| Prop  | Purpose      |
| ----- | ------------ |
| title | metric label |
| value | metric value |

---

# 3. GoalCard.jsx

## Purpose

Displays individual goal items.

## Responsibilities

* display goal text
* show completion status
* handle completion toggling
* handle goal deletion

## Features

### Goal Completion

Completed goals:

* change appearance
* receive strike-through styling

### Goal Deletion

Users can remove goals dynamically.

---

# Props Used in GoalCard

| Prop       | Purpose           |
| ---------- | ----------------- |
| task       | goal description  |
| completed  | completion status |
| toggleGoal | toggle handler    |
| deleteGoal | delete handler    |
| index      | identifies goal   |

---

# 4. TeamMember.jsx

## Purpose

Displays leaderboard user information.

## Responsibilities

* display user name
* display streak count
* display leaderboard score

## Props Used

| Prop   | Purpose           |
| ------ | ----------------- |
| name   | member name       |
| score  | leaderboard score |
| streak | streak count      |

---

# Parent-Child Component Architecture

The application follows a parent-child component hierarchy.

Example:

```txt id="jlwm18"
App.jsx
│
├── Navbar
├── Dashboard
│   ├── StatsCard
│   └── GoalCard
├── Team
│   └── TeamMember
└── Profile
```

---

# Parent Components

Parent components:

* manage state
* handle logic
* pass data downward

Example:

* App.jsx
* Dashboard.jsx

---

# Child Components

Child components:

* receive data through props
* display UI
* trigger actions through functions

Example:

* GoalCard
* StatsCard

---

# Understanding Props

Props are used for communication between components.

Example:

```jsx id="jlwm19"
<GoalCard
  task={goal.task}
  completed={goal.completed}
/>
```

Props allow components to remain:

* reusable
* dynamic
* configurable

---

# Component Reusability

One major advantage of React is reusable UI architecture.

Example:

* one StatsCard component
* multiple metric displays

This prevents:

* duplicate code
* inconsistent UI
* maintenance difficulty

---

# Component Styling Strategy

The project currently uses Tailwind CSS for styling.

Benefits:

* utility-first design
* faster UI development
* responsive layouts
* reduced CSS complexity

---

# Current Architectural Strengths

The component architecture currently supports:

* modular design
* reusable UI systems
* scalable structure
* readable code organization

---

# Current Architectural Limitations

The current frontend architecture still has limitations:

* no global state management
* limited shared state flow
* no backend synchronization
* static leaderboard data

These limitations are expected during the frontend foundation phase.

---

# Future Component Expansion

Future versions may include additional components such as:

* ProgressChart
* DailyCheckIn
* ContestTracker
* StreakCalendar
* AnalyticsPanel
* NotificationSystem

---

# Engineering Lessons Learned

The component system helped reinforce understanding of:

* component-based architecture
* parent-child communication
* reusable UI systems
* props
* state-driven rendering
* modular frontend design

---

# Conclusion

The Placement War-Room frontend currently follows a modular component-based architecture using React.

This structure improves:

* scalability
* maintainability
* code reuse
* frontend organization

The component architecture also provides a strong foundation for future backend integration and application growth.
