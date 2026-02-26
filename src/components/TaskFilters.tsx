import { useTaskStore } from '../store/taskStore';
import { Priority, TaskStatus } from '../types/task';
import { Search, X } from 'lucide-react';

export default function TaskFilters() {
  const filter = useTaskStore((state) => state.filter);
  const setFilter = useTaskStore((state) => state.setFilter);

  const updateFilter = (updates: Partial<typeof filter>) => {
    setFilter({ ...filter, ...updates });
  };

  const clearFilters = () => {
    setFilter({});
  };

  const hasActiveFilters = filter.status || filter.priority || filter.search;

  return (
    <div className="card">
      <div className="flex flex-wrap items-center gap-3">
        <div className="relative flex-1 min-w-[200px]">
          <Search className="absolute left-3.5 top-1/2 -translate-y-1/2 w-4 h-4 text-ink-subtle" strokeWidth={2} />
          <input
            type="text"
            value={filter.search || ''}
            onChange={(e) => updateFilter({ search: e.target.value || undefined })}
            placeholder="Search tasks..."
            className="input pl-10"
          />
        </div>

        <select
          value={filter.status || ''}
          onChange={(e) => updateFilter({ status: (e.target.value as TaskStatus) || undefined })}
          className="input w-auto min-w-[140px]"
        >
          <option value="">All Status</option>
          <option value="pending">Pending</option>
          <option value="in-progress">In Progress</option>
          <option value="completed">Completed</option>
          <option value="cancelled">Cancelled</option>
        </select>

        <select
          value={filter.priority || ''}
          onChange={(e) => updateFilter({ priority: (e.target.value as Priority) || undefined })}
          className="input w-auto min-w-[140px]"
        >
          <option value="">All Priority</option>
          <option value="low">Low</option>
          <option value="medium">Medium</option>
          <option value="high">High</option>
          <option value="urgent">Urgent</option>
        </select>

        {hasActiveFilters && (
          <button
            onClick={clearFilters}
            className="flex items-center gap-1.5 text-sm text-ink-muted hover:text-ink transition-colors"
          >
            <X className="w-4 h-4" strokeWidth={2} />
            Clear
          </button>
        )}
      </div>
    </div>
  );
}
