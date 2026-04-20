# 🛠️ HR Workflow Designer

[![React](https://img.shields.io/badge/React-18-61DAFB?logo=react&logoColor=white)](https://reactjs.org/)
[![TypeScript](https://img.shields.io/badge/TypeScript-5-3178C6?logo=typescript&logoColor=white)](https://www.typescriptlang.org/)
[![Vite](https://img.shields.io/badge/Vite-5-646CFF?logo=vite&logoColor=white)](https://vitejs.dev/)
[![Tailwind CSS](https://img.shields.io/badge/Tailwind-3-38B2AC?logo=tailwind-css&logoColor=white)](https://tailwindcss.com/)
[![License: MIT](https://img.shields.io/badge/License-MIT-yellow.svg)](https://opensource.org/licenses/MIT)

A **production-grade visual workflow builder** designed for HR teams to architect, validate, and simulate complex internal processes. From onboarding pipelines to leave approval trees, this tool provides a robust, drag-and-drop interface powered by a high-performance graph engine.

> [!IMPORTANT]
> **Production-Ready Logic**: Unlike simple canvas tools, this designer implements strict DAG (Directed Acyclic Graph) validation and topological execution ordering to ensure workflows are logically sound before deployment.

---

## 🚀 Live Demo
https://Tanikasri.github.io/HR-Workflow-Designer/

---

## ✨ Features

### 🎨 Visual Orchestration
*   **Drag-and-Drop Canvas**: Powered by `@xyflow/react` for smooth, high-performance graph interaction.
*   **5 Specialized Node Types**:
    *   🏁 **Start**: Entry point for all processes.
    *   📋 **Task**: Manual steps for HR representatives.
    *   ⚖️ **Approval**: Branching logic for manager/finance sign-offs.
    *   🤖 **Automated**: System-triggered hooks for API integrations.
    *   🛑 **End**: Final terminal states.
*   **Auto-Layout**: Instantly organize complex messy graphs using the Integrated **Dagre** layout engine.

### 🛡️ Built-in Intelligence
*   **Strict Graph Validation**: Real-time detection of computational cycles, isolated nodes, and missing terminal states.
*   **Simulation Engine**: Step-by-step execution module that mimics real-world latency and status outcomes.
*   **Live Status Badges**: Visual indicators on nodes to highlight validation errors or simulation progress.

### 🛠️ Developer & Power-User Tools
*   **State Persistence**: Full Undo/Redo history and LocalStorage auto-save integration.
*   **Serialization**: One-click JSON Import/Export for workflow portability.
*   **Smart Search**: Instantly find and highlight nodes in large-scale enterprise workflows.
*   **Templates**: Prebuilt industry-standard templates (Onboarding, Leave Approval, Document Verification).

---

## 💻 Tech Stack

| Category | Technology |
| :--- | :--- |
| **Frontend Core** | React 18, Vite, TypeScript |
| **Graph Engine** | React Flow (@xyflow/react) |
| **State Management** | Zustand |
| **Styling** | Tailwind CSS |
| **Form Logic** | React Hook Form + Zod |
| **API Mocking** | MSW (Mock Service Worker) |
| **Testing** | Vitest (Unit), Cypress (E2E) |
| **Utilities** | Dagre (Layout), Lucide React (Icons) |

---

## 📸 Screenshots

| Workflow Canvas | Node Configuration |
| :---: | :---: |
| ![Workflow Canvas](./public/screenshots/workflow_canvas.png) | ![Node Configuration](./public/screenshots/node_configuration.png) |

| Simulation Engine | Validation Logic |
| :---: | :---: |
| ![Simulation Engine](./public/screenshots/simulation_engine.png) | ![Validation Logic](./public/screenshots/validation_logic.png) |

---

## 🏁 Getting Started

### Prerequisites
*   Node.js (v18.0 or higher)
*   npm or yarn

### Installation
```bash
# Clone the repository
git clone https://github.com/your-username/hr-workflow-designer.git

# Navigate to project directory
cd hr-workflow-designer

# Install dependencies
npm install
```

### Running Locally
```bash
# Start development server
npm run dev

# Run unit tests
npm run test

# Run E2E tests
npm run test:e2e
```

---

## 📂 Project Structure

```text
hr-workflow-designer/
├── src/
│   ├── components/       # UI Components
│   │   ├── canvas/       # React Flow canvas logic
│   │   ├── forms/        # Node configuration forms
│   │   ├── nodes/        # Custom node definitions
│   │   ├── sandbox/      # Simulation execution panel
│   │   └── sidebar/      # Draggable node palette
│   ├── store/            # Zustand global state (Workflow, Simulation)
│   ├── utils/            # Graph algorithms (Dagre, Cycles, BFS)
│   ├── types/            # TypeScript interfaces & types
│   ├── constants/        # Default workflows & configuration
│   └── mocks/            # MSW handlers & data
├── public/               # Static assets
└── tailwind.config.js    # Design system configuration
```

---

## 🏛️ Architecture Highlights

*   **Topological Sorting**: The simulation engine uses Kahn's algorithm or DFS to ensure nodes are executed in the correct linear order.
*   **Declarative Graph State**: Workflow nodes and edges are treated as a single source of truth in Zustand, enabling seamless undo/redo.
*   **Decoupled Mocking**: MSW v2 intercepts network requests for simulation data, allowing the frontend to remain agnostic of the backend implementation.
*   **Zod-Powered Forms**: Every node configuration is strictly validated before being committed to the graph state.

---

## 🎯 Use Cases

*   **Employee Onboarding**: Complex multi-step process including equipment provisioning, paper-work, and team intros.
*   **Leave Management**: Handling approvals across multiple management layers and finance checks.
*   **Internal Automations**: Triggering Slack pings, Jira tickets, or Workday updates via automated system hooks.

---

## 🚀 Future Improvements

*   [ ] Multi-user collaboration via Yjs/WebSockets.
*   [ ] Version control & diffing for workflow changes.
*   [ ] Advanced conditional branching (expression parser).
*   [ ] Export to common BPMN formats.

---

## 📄 License

Distributed under the **MIT License**. See `LICENSE` for more information.

---

## 👤 Author

**Tanikasri**
*   GitHub: [@Tanikasri](https://github.com/Tanikasri)
*   Project Repository: [HR Workflow Designer](https://github.com/Tanikasri/HR-Workflow-Designer)

---
*Created with ❤️ for HR teams everywhere.*
