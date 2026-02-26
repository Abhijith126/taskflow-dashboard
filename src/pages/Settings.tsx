import { useTaskStore } from '../store/taskStore';
import { Trash2, Database } from 'lucide-react';

export default function Settings() {
  const tasks = useTaskStore((state) => state.tasks);
  const clearCompleted = useTaskStore((state) => state.clearCompleted);
  const stats = useTaskStore((state) => state.getStats());

  const handleClearCompleted = () => {
    if (confirm(`Delete ${stats.completed} completed tasks?`)) {
      clearCompleted();
    }
  };

  const handleExportData = () => {
    const data = JSON.stringify(tasks, null, 2);
    const blob = new Blob([data], { type: 'application/json' });
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a');
    a.href = url;
    a.download = `taskflow-export-${new Date().toISOString().split('T')[0]}.json`;
    a.click();
    URL.revokeObjectURL(url);
  };

  return (
    <div className="space-y-8">
      <div>
        <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Settings</h1>
        <p className="text-ink-muted mt-1">Manage your TaskFlow preferences</p>
      </div>

      <div className="card">
        <h3 className="font-display text-lg font-semibold text-ink mb-5">Data Management</h3>
        
        <div className="space-y-0 divide-y divide-[var(--border-soft)]">
          <div className="flex items-center justify-between py-4 first:pt-0">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-[var(--border-soft)] flex items-center justify-center">
                <Database className="w-5 h-5 text-ink-muted" strokeWidth={2} />
              </div>
              <div>
                <div className="font-medium text-ink">Total Tasks</div>
                <div className="text-sm text-ink-muted">{tasks.length} tasks stored locally</div>
              </div>
            </div>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
                <Database className="w-5 h-5 text-accent" strokeWidth={2} />
              </div>
              <div>
                <div className="font-medium text-ink">Export Data</div>
                <div className="text-sm text-ink-muted">Download all tasks as JSON</div>
              </div>
            </div>
            <button onClick={handleExportData} className="btn-secondary">
              Export
            </button>
          </div>
          
          <div className="flex items-center justify-between py-4">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-red-50 flex items-center justify-center">
                <Trash2 className="w-5 h-5 text-red-600" strokeWidth={2} />
              </div>
              <div>
                <div className="font-medium text-ink">Clear Completed</div>
                <div className="text-sm text-ink-muted">
                  Remove {stats.completed} completed tasks
                </div>
              </div>
            </div>
            <button
              onClick={handleClearCompleted}
              disabled={stats.completed === 0}
              className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors disabled:opacity-50 disabled:cursor-not-allowed font-medium"
            >
              Clear
            </button>
          </div>
        </div>
      </div>

      <div className="card">
        <h3 className="font-display text-lg font-semibold text-ink mb-4">About</h3>
        <p className="text-ink-muted leading-relaxed">
          TaskFlow is a modern task management dashboard built with React, TypeScript, 
          and Tailwind CSS. It uses Zustand for state management with localStorage persistence.
        </p>
        <div className="mt-4 text-sm text-ink-subtle">
          Version 1.0.0
        </div>
      </div>
    </div>
  );
}
