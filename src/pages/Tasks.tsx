import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import TaskList from '../components/TaskList';
import TaskForm from '../components/TaskForm';
import TaskFilters from '../components/TaskFilters';
import { Plus, X } from 'lucide-react';

export default function Tasks() {
  const [showForm, setShowForm] = useState(false);
  const filteredTasks = useTaskStore((state) => state.getFilteredTasks());

  return (
    <div className="space-y-6">
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Tasks</h1>
          <p className="text-ink-muted mt-1">
            {filteredTasks.length} tasks found
          </p>
        </div>
        
        <button
          onClick={() => setShowForm(!showForm)}
          className="btn-primary flex items-center gap-2"
        >
          {showForm ? (
            <>
              <X className="w-5 h-5" strokeWidth={2} />
              Cancel
            </>
          ) : (
            <>
              <Plus className="w-5 h-5" strokeWidth={2} />
              Add Task
            </>
          )}
        </button>
      </div>

      {showForm && (
        <div className="card animate-fade-in">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Create New Task</h3>
          <TaskForm onSuccess={() => setShowForm(false)} />
        </div>
      )}

      <TaskFilters />

      <TaskList tasks={filteredTasks} />
    </div>
  );
}
