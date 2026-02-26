import { PieChart, Pie, Cell, ResponsiveContainer, Legend, Tooltip } from 'recharts';
import { useTaskStore } from '../store/taskStore';

const COLORS = {
  pending: '#a8a29e',
  'in-progress': '#d97706',
  completed: '#059669',
  cancelled: '#dc2626',
};

export default function TaskChart() {
  const stats = useTaskStore((state) => state.getStats());

  const data = [
    { name: 'Pending', value: stats.pending, color: COLORS.pending },
    { name: 'In Progress', value: stats.inProgress, color: COLORS['in-progress'] },
    { name: 'Completed', value: stats.completed, color: COLORS.completed },
  ].filter((item) => item.value > 0);

  if (data.length === 0) {
    return (
      <div className="text-center py-10 text-ink-muted text-sm">
        No tasks yet. Add some tasks to see the chart.
      </div>
    );
  }

  return (
    <div className="h-64">
      <ResponsiveContainer width="100%" height="100%">
        <PieChart>
          <Pie
            data={data}
            cx="50%"
            cy="50%"
            innerRadius={58}
            outerRadius={78}
            paddingAngle={3}
            dataKey="value"
            stroke="none"
          >
            {data.map((entry, index) => (
              <Cell key={`cell-${index}`} fill={entry.color} />
            ))}
          </Pie>
          <Tooltip
            contentStyle={{
              borderRadius: 'var(--radius)',
              border: '1px solid var(--border)',
              fontFamily: 'var(--font-body)',
            }}
          />
          <Legend wrapperStyle={{ fontFamily: 'var(--font-body)' }} />
        </PieChart>
      </ResponsiveContainer>
    </div>
  );
}
