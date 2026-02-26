import { useTaskStore } from '../store/taskStore';
import StatsCard from '../components/StatsCard';
import TaskChart from '../components/TaskChart';
import RecentTasks from '../components/RecentTasks';
import { CheckCircle2, Clock, AlertTriangle, Calendar } from 'lucide-react';

export default function Dashboard() {
  const stats = useTaskStore((state) => state.getStats());

  return (
    <div className="space-y-8">
      <div className="animate-fade-up animate-delay-1">
        <h1 className="font-display text-3xl font-semibold text-ink tracking-tight">Dashboard</h1>
        <p className="text-ink-muted mt-1">Overview of your tasks and progress</p>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 lg:grid-cols-4 gap-4">
        <div className="animate-fade-up animate-delay-2">
          <StatsCard title="Total Tasks" value={stats.total} icon={CheckCircle2} color="slate" />
        </div>
        <div className="animate-fade-up animate-delay-3">
          <StatsCard title="Completed" value={stats.completed} icon={CheckCircle2} color="green" />
        </div>
        <div className="animate-fade-up animate-delay-4">
          <StatsCard title="In Progress" value={stats.inProgress} icon={Clock} color="amber" />
        </div>
        <div className="animate-fade-up animate-delay-5">
          <StatsCard title="Overdue" value={stats.overdue} icon={AlertTriangle} color="red" />
        </div>
      </div>

      <div className="grid grid-cols-1 lg:grid-cols-2 gap-6">
        <div className="card animate-fade-up animate-delay-5">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Tasks by Status</h3>
          <TaskChart />
        </div>
        
        <div className="card animate-fade-up animate-delay-6">
          <h3 className="font-display text-lg font-semibold text-ink mb-4">Upcoming Tasks</h3>
          <div className="flex items-center gap-6 text-sm mb-6 pb-4 border-b border-[var(--border-soft)]">
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-amber-50 flex items-center justify-center">
                <Calendar className="w-5 h-5 text-amber-600" />
              </div>
              <div>
                <div className="font-medium text-ink">Due Today</div>
                <div className="text-ink-muted">{stats.dueToday} tasks</div>
              </div>
            </div>
            <div className="flex items-center gap-3">
              <div className="w-10 h-10 rounded-xl bg-accent-muted flex items-center justify-center">
                <Calendar className="w-5 h-5 text-accent" />
              </div>
              <div>
                <div className="font-medium text-ink">This Week</div>
                <div className="text-ink-muted">{stats.dueThisWeek} tasks</div>
              </div>
            </div>
          </div>
          <RecentTasks />
        </div>
      </div>
    </div>
  );
}
