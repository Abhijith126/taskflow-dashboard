import { useTaskStore } from '../store/taskStore';

export default function Header() {
  const stats = useTaskStore((state) => state.getStats());
  
  return (
    <header
      className="backdrop-blur-sm border-b border-[var(--border)] px-6 md:px-8 py-4 sticky top-0 z-10"
      style={{ backgroundColor: 'var(--paper-elevated)' }}
    >
      <div className="flex flex-wrap items-center justify-between gap-4">
        <div>
          <h2 className="font-display text-xl font-semibold tracking-tight" style={{ color: 'var(--ink)' }}>Welcome back</h2>
          <p className="text-sm mt-0.5" style={{ color: 'var(--ink-muted)' }}>
            You have {stats.pending} pending tasks
            {stats.overdue > 0 && (
              <span className="text-red-600 ml-2 font-medium">
                · {stats.overdue} overdue
              </span>
            )}
          </p>
        </div>
        
        <div className="flex items-center gap-5 text-sm">
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-emerald-500" />
            <span style={{ color: 'var(--ink-muted)' }}>{stats.completed} done</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-amber-500" />
            <span style={{ color: 'var(--ink-muted)' }}>{stats.inProgress} in progress</span>
          </div>
          <div className="flex items-center gap-2">
            <div className="w-2.5 h-2.5 rounded-full bg-stone-400 dark:bg-stone-500" />
            <span style={{ color: 'var(--ink-muted)' }}>{stats.pending} pending</span>
          </div>
        </div>
      </div>
    </header>
  );
}
