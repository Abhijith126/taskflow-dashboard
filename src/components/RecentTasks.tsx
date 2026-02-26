import { useTaskStore } from '../store/taskStore';
import { format, isToday, isTomorrow, isPast } from 'date-fns';
import { Calendar, CheckCircle2 } from 'lucide-react';

export default function RecentTasks() {
  const tasks = useTaskStore((state) => state.tasks);
  
  const upcomingTasks = tasks
    .filter((t) => t.status !== 'completed' && t.dueDate)
    .sort((a, b) => new Date(a.dueDate!).getTime() - new Date(b.dueDate!).getTime())
    .slice(0, 5);

  if (upcomingTasks.length === 0) {
    return (
      <div className="text-center py-6 text-ink-muted text-sm">
        <CheckCircle2 className="w-8 h-8 mx-auto mb-2 text-[var(--border)]" strokeWidth={1.5} />
        <p>No upcoming tasks</p>
      </div>
    );
  }

  const getDueLabel = (date: Date) => {
    if (isToday(date)) return 'Today';
    if (isTomorrow(date)) return 'Tomorrow';
    if (isPast(date)) return 'Overdue';
    return format(date, 'MMM d');
  };

  const priorityDot: Record<string, string> = {
    urgent: 'bg-red-500',
    high: 'bg-orange-500',
    medium: 'bg-amber-500',
    low: 'bg-stone-400',
  };

  return (
    <div className="space-y-1.5">
      {upcomingTasks.map((task) => {
        const dueDate = new Date(task.dueDate!);
        const isOverdue = isPast(dueDate) && !isToday(dueDate);
        
        return (
          <div
            key={task.id}
            className="flex items-center justify-between py-2.5 px-3 rounded-xl bg-[var(--border-soft)] hover:bg-[var(--border)] transition-colors"
          >
            <div className="flex items-center gap-3 min-w-0">
              <span className={`w-2 h-2 rounded-full shrink-0 ${priorityDot[task.priority] ?? 'bg-stone-400'}`} />
              <span className="text-sm font-medium text-ink truncate">
                {task.title}
              </span>
            </div>
            <div className={`flex items-center gap-1.5 text-xs shrink-0 ${isOverdue ? 'text-red-600 font-medium' : 'text-ink-muted'}`}>
              <Calendar className="w-3.5 h-3.5" strokeWidth={2} />
              {getDueLabel(dueDate)}
            </div>
          </div>
        );
      })}
    </div>
  );
}
