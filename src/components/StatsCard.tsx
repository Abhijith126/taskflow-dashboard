import { LucideIcon } from 'lucide-react';

interface StatsCardProps {
  title: string;
  value: number;
  icon: LucideIcon;
  color: 'slate' | 'green' | 'amber' | 'red';
}

const colorClasses = {
  slate: 'bg-stone-100 text-stone-600',
  green: 'bg-emerald-50 text-emerald-600',
  amber: 'bg-amber-50 text-amber-600',
  red: 'bg-red-50 text-red-600',
};

export default function StatsCard({ title, value, icon: Icon, color }: StatsCardProps) {
  return (
    <div className="card group hover:shadow-card-hover transition-shadow duration-200">
      <div className="flex items-center justify-between">
        <div>
          <p className="text-sm font-medium text-ink-muted">{title}</p>
          <p className="font-display text-2xl font-semibold text-ink mt-1 tracking-tight">{value}</p>
        </div>
        <div className={`p-3 rounded-xl ${colorClasses[color]} transition-transform duration-200 group-hover:scale-105`}>
          <Icon className="w-6 h-6" strokeWidth={2} />
        </div>
      </div>
    </div>
  );
}
