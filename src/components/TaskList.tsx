import { useNavigate } from 'react-router-dom';
import { Task, PRIORITY_COLORS, STATUS_COLORS } from '../types/task';
import { format } from 'date-fns';
import { Calendar, Tag, ChevronRight } from 'lucide-react';

interface TaskListProps {
  tasks: Task[];
}

export default function TaskList({ tasks }: TaskListProps) {
  const navigate = useNavigate();

  if (tasks.length === 0) {
    return (
      <div className="card text-center py-14">
        <div className="text-ink-subtle mb-3">
          <Tag className="w-12 h-12 mx-auto" strokeWidth={1.5} />
        </div>
        <h3 className="font-display text-lg font-semibold text-ink">No tasks found</h3>
        <p className="text-ink-muted mt-1 text-sm">
          Create a new task or adjust your filters
        </p>
      </div>
    );
  }

  return (
    <div className="space-y-3">
      {tasks.map((task) => (
        <div
          key={task.id}
          onClick={() => navigate(`/tasks/${task.id}`)}
          className="card cursor-pointer hover:shadow-card-hover transition-all duration-200 group"
        >
          <div className="flex items-start justify-between gap-4">
            <div className="flex-1 min-w-0">
              <h3 className={`font-medium ${
                task.status === 'completed' ? 'text-ink-subtle line-through' : 'text-ink'
              }`}>
                {task.title}
              </h3>
              
              {task.description && (
                <p className="text-sm text-ink-muted mt-1 line-clamp-2">
                  {task.description}
                </p>
              )}
              
              <div className="flex flex-wrap items-center gap-3 mt-3">
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${PRIORITY_COLORS[task.priority]}`}>
                  {task.priority}
                </span>
                <span className={`px-2.5 py-1 rounded-lg text-xs font-medium ${STATUS_COLORS[task.status]}`}>
                  {task.status.replace('-', ' ')}
                </span>
                
                {task.dueDate && (
                  <span className="flex items-center gap-1.5 text-xs text-ink-muted">
                    <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
                    {format(new Date(task.dueDate), 'MMM d')}
                  </span>
                )}
                
                {task.tags.length > 0 && (
                  <div className="flex items-center gap-1.5">
                    <Tag className="w-3.5 h-3.5 text-ink-subtle" strokeWidth={2} />
                    <span className="text-xs text-ink-muted">
                      {task.tags.slice(0, 2).join(', ')}
                      {task.tags.length > 2 && ` +${task.tags.length - 2}`}
                    </span>
                  </div>
                )}
              </div>
            </div>
            
            <ChevronRight className="w-5 h-5 text-ink-subtle group-hover:text-accent shrink-0 transition-colors" strokeWidth={2} />
          </div>
        </div>
      ))}
    </div>
  );
}
