import { useParams, useNavigate } from 'react-router-dom';
import { useTaskStore } from '../store/taskStore';
import { format } from 'date-fns';
import { ArrowLeft, Edit2, Trash2 } from 'lucide-react';
import { PRIORITY_COLORS, STATUS_COLORS } from '../types/task';

export default function TaskDetail() {
  const { id } = useParams<{ id: string }>();
  const navigate = useNavigate();
  const task = useTaskStore((state) => 
    state.tasks.find((t) => t.id === id)
  );
  const deleteTask = useTaskStore((state) => state.deleteTask);

  if (!task) {
    return (
      <div className="text-center py-14">
        <h2 className="font-display text-xl font-semibold text-ink">Task not found</h2>
        <button
          onClick={() => navigate('/tasks')}
          className="btn-primary mt-4"
        >
          Back to Tasks
        </button>
      </div>
    );
  }

  const handleDelete = () => {
    if (confirm('Are you sure you want to delete this task?')) {
      deleteTask(task.id);
      navigate('/tasks');
    }
  };

  return (
    <div className="space-y-6">
      <button
        onClick={() => navigate('/tasks')}
        className="flex items-center gap-2 text-ink-muted hover:text-ink transition-colors"
      >
        <ArrowLeft className="w-5 h-5" strokeWidth={2} />
        Back to Tasks
      </button>

      <div className="card">
        <div className="flex flex-wrap items-start justify-between gap-4">
          <div className="flex-1 min-w-0">
            <h1 className="font-display text-2xl font-semibold text-ink tracking-tight">{task.title}</h1>
            
            <div className="flex flex-wrap items-center gap-2 mt-3">
              <span className={`px-3 py-1.5 rounded-xl text-sm font-medium ${PRIORITY_COLORS[task.priority]}`}>
                {task.priority}
              </span>
              <span className={`px-3 py-1.5 rounded-xl text-sm font-medium ${STATUS_COLORS[task.status]}`}>
                {task.status.replace('-', ' ')}
              </span>
            </div>
          </div>
          
          <div className="flex items-center gap-2">
            <button className="btn-secondary flex items-center gap-2">
              <Edit2 className="w-4 h-4" strokeWidth={2} />
              Edit
            </button>
            <button
              onClick={handleDelete}
              className="px-4 py-2.5 text-red-600 hover:bg-red-50 rounded-xl transition-colors flex items-center gap-2"
            >
              <Trash2 className="w-4 h-4" strokeWidth={2} />
            </button>
          </div>
        </div>

        {task.description && (
          <div className="mt-6 pt-6 border-t border-[var(--border-soft)]">
            <h3 className="text-sm font-medium text-ink-muted mb-2">Description</h3>
            <p className="text-ink leading-relaxed">{task.description}</p>
          </div>
        )}

        <div className="grid grid-cols-1 sm:grid-cols-2 gap-6 mt-6 pt-6 border-t border-[var(--border-soft)]">
          <div>
            <h3 className="text-sm font-medium text-ink-muted">Created</h3>
            <p className="text-ink mt-1">
              {format(new Date(task.createdAt), 'PPP')}
            </p>
          </div>
          
          {task.dueDate && (
            <div>
              <h3 className="text-sm font-medium text-ink-muted">Due Date</h3>
              <p className="text-ink mt-1">
                {format(new Date(task.dueDate), 'PPP')}
              </p>
            </div>
          )}
          
          {task.tags.length > 0 && (
            <div className="col-span-2">
              <h3 className="text-sm font-medium text-ink-muted mb-2">Tags</h3>
              <div className="flex flex-wrap gap-2">
                {task.tags.map((tag) => (
                  <span
                    key={tag}
                    className="px-3 py-1.5 bg-[var(--border-soft)] text-ink rounded-xl text-sm"
                  >
                    {tag}
                  </span>
                ))}
              </div>
            </div>
          )}
        </div>
      </div>
    </div>
  );
}
