Workflow Builder UI

A visual workflow builder built with React that allows users to create and manage workflows using Action, Branch (Condition), and End nodes in a tree structure.

Developed as part of a Frontend Intern Take-Home Assignment to demonstrate state modeling, component architecture, and interactive UI design without using workflow or UI libraries.

🚀 Live Demo

Live URL: <Vercel / Netlify link>

GitHub Repo: <GitHub repository link>

✨ Features

Tree-based visual workflow builder

Action, Branch (True/False), and End nodes

Context-aware node creation

Edit and delete nodes with automatic reconnection

Undo / Redo support

Save workflow structure to console

🧠 Architecture

Tree-based data model

Custom React Hooks for state management

Immutable updates for predictable behavior

No external workflow or UI libraries

🗂️ Folder Structure
src/
├── components/
│   ├── Canvas/
│   │   ├── WorkflowCanvas.jsx
│   │   └── WorkflowCanvas.css
│   ├── Controls/
│   │   ├── Toolbar.jsx
│   │   ├── NodeMenu.jsx
│   │   └── EditModal.jsx
│   └── Node/
│       ├── BaseNode.jsx
│       └── Node.css
├── hooks/
│   └── useWorkflowState.jsx
├── utils/
│   └── workflowHelpers.js
├── models/
│   └── workflowModel.js
├── App.jsx
├── main.jsx

🛠️ Tech Stack

React (Hooks)

JavaScript

CSS

Vite

▶️ Run Locally
git clone <repo-url>
cd workflow-builder
npm install
npm run dev

📤 Save Workflow

Click Save to log the full workflow structure to the browser console.