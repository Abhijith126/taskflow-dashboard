import { NavLink } from 'react-router-dom';
import { 
  LayoutDashboard, 
  CheckSquare, 
  Settings,
  CheckCircle2
} from 'lucide-react';
import ThemeToggle from './ThemeToggle';

const navItems = [
  { to: '/', icon: LayoutDashboard, label: 'Dashboard' },
  { to: '/tasks', icon: CheckSquare, label: 'Tasks' },
  { to: '/settings', icon: Settings, label: 'Settings' },
];

export default function Sidebar() {
  return (
    <aside className="sticky top-0 left-0 w-64 h-screen shrink-0 flex flex-col font-body bg-[var(--paper-elevated)] border-r border-[var(--border)] overflow-y-auto">
      <div className="p-6 border-b border-[var(--border-soft)] shrink-0">
        <div className="flex items-center gap-3">
          <div
            className="w-10 h-10 rounded-xl flex items-center justify-center shadow-soft"
            style={{ backgroundColor: 'var(--accent)' }}
          >
            <CheckCircle2 className="w-5 h-5 text-white" strokeWidth={2.5} />
          </div>
          <div>
            <h1 className="font-display font-semibold text-lg tracking-tight" style={{ color: 'var(--ink)' }}>
              TaskFlow
            </h1>
            <p className="text-xs" style={{ color: 'var(--ink-muted)' }}>
              Task Manager
            </p>
          </div>
        </div>
      </div>
      
      <nav className="flex-1 p-4 min-h-0">
        <ul className="space-y-0.5">
          {navItems.map((item) => (
            <li key={item.to}>
              <NavLink
                to={item.to}
                end={item.to === '/'}
                className={({ isActive }) =>
                  `flex items-center gap-3 px-4 py-3 rounded-xl transition-all duration-200 ${
                    isActive
                      ? 'bg-[var(--accent-muted)] text-[var(--accent)] font-medium'
                      : 'text-[var(--ink-muted)] hover:bg-[var(--border-soft)] hover:text-[var(--ink)]'
                  }`
                }
              >
                <item.icon className="w-5 h-5 shrink-0" />
                {item.label}
              </NavLink>
            </li>
          ))}
        </ul>
      </nav>
      
      <div className="p-4 border-t border-[var(--border-soft)] shrink-0 flex flex-col items-center gap-3">
        <ThemeToggle />
        <div className="text-xs text-center" style={{ color: 'var(--ink-subtle)' }}>
          TaskFlow v1.0.0
        </div>
      </div>
    </aside>
  );
}
