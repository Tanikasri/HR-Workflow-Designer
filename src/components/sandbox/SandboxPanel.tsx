import { useState } from 'react';
import { PlayCircle, CheckCircle2, AlertCircle, Loader2 } from 'lucide-react';
import { useWorkflowStore } from '../../store/workflowStore';
import { validateGraph } from '../../utils/graphUtils';
import { mockSimulateWorkflow } from '../../mocks/api';
import { SimulationResult } from '../../types/workflow.types';

export default function SandboxPanel() {
  const { nodes, edges } = useWorkflowStore();
  const [errors, setErrors] = useState<string[]>([]);
  const [isRunning, setIsRunning] = useState(false);
  const [result, setResult] = useState<SimulationResult | null>(null);

  const handleTest = async () => {
    // 1. Validate
    const validationErrors = validateGraph(nodes, edges);
    if (validationErrors.length > 0) {
      setErrors(validationErrors);
      setResult(null);
      return;
    }

    // 2. Clear errors and start
    setErrors([]);
    setIsRunning(true);
    setResult(null);

    // 3. Simulate API call
    try {
      const res = await mockSimulateWorkflow(nodes, edges);
      setResult(res);
    } catch (e) {
      setErrors(['Simulation failed due to an unexpected error.']);
    } finally {
      setIsRunning(false);
    }
  };

  return (
    <div className="h-64 flex flex-col bg-dark-surface p-4">
      <h2 className="text-xs font-bold uppercase tracking-wider text-gray-500 mb-3">Simulation Sandbox</h2>
      
      <button 
        onClick={handleTest}
        disabled={isRunning || nodes.length === 0}
        className="w-full flex items-center justify-center gap-2 bg-accent hover:bg-orange-600 disabled:opacity-50 disabled:hover:bg-accent text-white py-2 rounded-lg font-medium shadow-lg transition-colors mb-4"
      >
        {isRunning ? <Loader2 size={18} className="animate-spin" /> : <PlayCircle size={18} />}
        {isRunning ? 'Running...' : 'Test Workflow'}
      </button>

      <div className="flex-1 overflow-y-auto w-full text-sm">
        {errors.length > 0 && (
          <div className="mb-4">
            <div className="text-red-400 font-medium mb-1 flex items-center gap-1">
              <AlertCircle size={14} /> Validation Failed
            </div>
            <ul className="list-disc pl-5 text-gray-400 text-xs space-y-1">
              {errors.map((err, i) => <li key={i}>{err}</li>)}
            </ul>
          </div>
        )}

        {result && (
          <div>
            <div className="text-green-400 font-medium mb-2 flex items-center gap-1">
              <CheckCircle2 size={14} /> Execution Log
            </div>
            <div className="space-y-3 relative before:absolute before:inset-0 before:ml-2.5 before:-translate-x-px md:before:mx-auto md:before:translate-x-0 before:h-full before:w-0.5 before:bg-gradient-to-b before:from-transparent before:via-dark-border before:to-transparent">
              {result.steps.map((step, i) => (
                <div key={i} className="relative flex items-center justify-between md:justify-normal md:odd:flex-row-reverse group is-active">
                  <div className="flex items-center justify-center w-5 h-5 rounded-full border border-dark-border bg-dark-surface text-gray-300 group-[.is-active]:text-green-400 group-[.is-active]:border-green-400 shrink-0 md:order-1 md:group-odd:-translate-x-1/2 md:group-even:translate-x-1/2 shadow">
                    <CheckCircle2 size={12} />
                  </div>
                  <div className="w-[calc(100%-2.5rem)] md:w-[calc(50%-1.5rem)] p-2 rounded-md border border-dark-border bg-dark-bg/50">
                    <div className="font-semibold text-gray-200 text-xs">{step.action}</div>
                    <div className="text-gray-500 text-[10px] mt-0.5 leading-tight">{step.details}</div>
                  </div>
                </div>
              ))}
            </div>
          </div>
        )}
        
        {!isRunning && errors.length === 0 && !result && (
          <div className="text-gray-500 text-center text-xs mt-6">
            Click 'Test Workflow' to validate <br/>and simulate execution.
          </div>
        )}
      </div>
    </div>
  );
}
