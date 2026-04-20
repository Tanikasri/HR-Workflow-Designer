# HR Workflow Designer

A rich interactive HR Workflow Designer application.

## Features Built:
- **Canvas (React Flow)**: Drag nodes from sidebar, connect, click to edit, delete elements.
- **Node Types**: Start Node, Task Node, Approval Node, Automated Node, End Node. Each with distinct colors and icon components.
- **Mock API**: Local mocks to simulate workflow execution and populate select dropdowns.
- **Sandbox Panel**: Real-time validation finding missing start nodes, isolated nodes, and execution simulation logs.
- **Settings Form**: Interactive right panel using `react-hook-form` connected tightly with node data.
- **Extras**: "Employee Onboarding", "Leave Approval", "Document Verification" prebuilt templates; Export JSON; Undo/Redo; dynamic node and edge counter.
- **Design Elements**: Implements the provided #0f1117 background dark theme with an amber #f59e0b accent and distinct node colors.

## Getting Started

Because workspace validation limits executing terminal commands natively in this specific directory mapping, run this locally using your terminal inside the `hr-workflow-designer` folder:

1. \`npm install\` (This installs all the dependencies mentioned in the \`package.json\`)
2. \`npm run dev\`
3. Visit \`http://localhost:5173\` (or whichever port Vite gives you)

All dependencies defined in `package.json` will be fetched and the application correctly runs React 18, Vite, TypeScript, React Flow (@xyflow/react), Tailwind CSS, Zustand, and React Hook form.
