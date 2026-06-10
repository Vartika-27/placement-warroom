# State Management Documentation

# Introduction

This document explains how state management is implemented in the Placement War-Room frontend application.

State management is one of the most important concepts in React because it controls:

* dynamic data
* user interaction
* UI updates
* application behavior

Without state, React applications would behave like static HTML pages.

---

# What Is State?

State is data that can change while the application is running.

Examples of state in real applications:

* user login status
* notifications
* tasks
* messages
* form inputs
* dashboards
* analytics data

In Placement War-Room, state is used for:

* storing goals
* tracking input values
* managing UI updates

---

# Current State Architecture

The project currently uses:

* local component state
* React Hooks
* centralized state inside App.jsx

The application currently does not use advanced state libraries such as:

* Redux
* Zustand
* Context API

This decision was intentional because the project is still in the frontend foundation phase.

---

# React Hooks Used

The project currently uses two major React Hooks:

## 1. useState

## 2. useEffect

---

# 1. useState

# Purpose

useState is used for creating dynamic reactive data inside React components.

It allows the application to:

* store changing values
* update UI automatically
* react to user actions

---

# Syntax

Example:

```jsx id="jlwm1b"
const [goals, setGoals] = useState([])
```

---

# Understanding the Syntax

| Part     | Purpose                       |
| -------- | ----------------------------- |
| goals    | current state value           |
| setGoals | function to update state      |
| useState | React Hook for state creation |

---

# Current useState Implementations

# Goals State

```jsx id="jlwm1c"
const [goals, setGoals] = useState(...)
```

## Purpose

Stores all user goals.

Each goal contains:

* task text
* completion status

Example goal object:

```jsx id="jlwm1d"
{
  task: "Solve 5 Problems",
  completed: false
}
```

---

# Input State

```jsx id="jlwm1e"
const [newGoal, setNewGoal] = useState("")
```

## Purpose

Stores the current input value typed by the user.

This creates a controlled input system.

---

# Controlled Inputs

The application uses controlled form inputs.

Example:

```jsx id="jlwm1f"
<input
  value={newGoal}
  onChange={(e) => setNewGoal(e.target.value)}
/>
```

---

# Why Controlled Inputs Matter

Controlled inputs allow React to:

* manage form state
* track user input
* validate data
* synchronize UI

This is standard React form architecture.

---

# Dynamic Rendering

The application dynamically renders goals using:

```jsx id="jlwm1g"
goals.map(...)
```

---

# Why map() Is Important

map() allows React to:

* loop through arrays
* generate components dynamically
* update UI automatically when state changes

Without dynamic rendering, every goal would need to be manually coded.

---

# State Updates

# Adding Goals

Example:

```jsx id="jlwm1h"
setGoals([
  ...goals,
  {
    task: newGoal,
    completed: false,
  },
])
```

---

# Understanding the Spread Operator

```jsx id="jlwm1i"
...goals
```

means:

* copy all previous goals
* preserve old state
* add new goal safely

---

# Why Direct Mutation Is Avoided

Incorrect approach:

```jsx id="jlwm1j"
goals.push(newGoal)
```

This mutates state directly.

React state should remain immutable.

Immutable updates:

* improve predictability
* prevent rendering issues
* align with React architecture

---

# Toggling Goal Completion

The application updates completion state using:

```jsx id="jlwm1k"
goals.map(...)
```

This creates a new updated array instead of modifying existing state directly.

---

# Goal Deletion

Goal deletion uses:

```jsx id="jlwm1l"
goals.filter(...)
```

This removes specific items while preserving immutable update patterns.

---

# 2. useEffect

# Purpose

useEffect is used for handling side effects in React.

Side effects include:

* API calls
* localStorage synchronization
* timers
* subscriptions
* DOM updates

---

# Current useEffect Implementation

```jsx id="jlwm1m"
useEffect(() => {
  localStorage.setItem("goals", JSON.stringify(goals))
}, [goals])
```

---

# What This Does

Whenever goals change:

* React runs the effect
* goals are saved into localStorage

This creates frontend persistence.

---

# Dependency Arrays

Example:

```jsx id="jlwm1n"
[goals]
```

This means:

* run effect whenever goals change

---

# Why Dependency Arrays Matter

Dependency arrays prevent unnecessary effect execution.

Without dependencies:

* effects may run excessively
* performance issues may occur

---

# localStorage Persistence System

The application currently uses browser localStorage.

Example:

```jsx id="jlwm1o"
localStorage.getItem("goals")
```

and

```jsx id="jlwm1p"
localStorage.setItem(...)
```

---

# Why Persistence Matters

Without persistence:

* refreshing browser removes all data

Persistence creates:

* continuity
* usability
* better user experience

---

# State Flow Architecture

Current application state flow:

```txt id="jlwm1q"
App.jsx
│
├── goals state
├── newGoal state
│
└── props passed downward
    │
    ├── Dashboard
    │   └── GoalCard
```

---

# Parent-Controlled State

App.jsx currently acts as the central state controller.

Responsibilities:

* storing state
* updating state
* passing data to child components

---

# Props-Based Communication

Child components receive:

* data
* functions
* handlers

through props.

Example:

```jsx id="jlwm1r"
<GoalCard
  toggleGoal={toggleGoal}
/>
```

This allows child components to trigger parent-controlled logic.

---

# Re-Rendering in React

Whenever state changes:

* React re-renders affected components
* UI updates automatically

This is one of React’s core mechanisms.

---

# Current State Management Strengths

The current architecture supports:

* reactive UI updates
* modular logic
* controlled state flow
* predictable rendering behavior

---

# Current Limitations

The current system still has limitations:

* no backend synchronization
* no global shared state
* no user authentication
* no server-side persistence

These limitations are expected during the frontend foundation stage.

---

# Future State Management Plans

As the application grows, future improvements may include:

* Context API
* Zustand
* Redux Toolkit
* server state synchronization
* websocket updates

---

# Engineering Lessons Learned

The current implementation helped reinforce understanding of:

* state-driven rendering
* immutable updates
* controlled inputs
* side effects
* parent-child communication
* frontend data flow

---

# Conclusion

State management is the foundation of dynamic frontend applications.

The Placement War-Room project currently uses React Hooks and local component state to manage:

* user goals
* UI updates
* persistence
* application interaction

This architecture provides a strong educational foundation for understanding frontend application behavior and future scalable state systems.
