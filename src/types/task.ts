export type Priority = 'low' | 'medium' | 'high' | 'urgent';
export type TaskStatus = 'pending' | 'in-progress' | 'completed' | 'cancelled';

export interface Task {
  id: string;
  title: string;
  description?: string;
  priority: Priority;
  status: TaskStatus;
  tags: string[];
  dueDate?: Date;
  createdAt: Date;
  updatedAt: Date;
  completedAt?: Date;
}

export interface TaskFilter {
  status?: TaskStatus;
  priority?: Priority;
  tags?: string[];
  search?: string;
  dueBefore?: Date;
  dueAfter?: Date;
}

export interface TaskStats {
  total: number;
  completed: number;
  pending: number;
  inProgress: number;
  cancelled: number;
  byPriority: Record<Priority, number>;
  overdue: number;
  dueToday: number;
  dueThisWeek: number;
}

export const PRIORITY_COLORS: Record<Priority, string> = {
  low: 'bg-stone-100 text-stone-700',
  medium: 'bg-amber-50 text-amber-800',
  high: 'bg-orange-100 text-orange-800',
  urgent: 'bg-red-100 text-red-800',
};

export const STATUS_COLORS: Record<TaskStatus, string> = {
  pending: 'bg-stone-100 text-stone-700',
  'in-progress': 'bg-amber-50 text-amber-800',
  completed: 'bg-emerald-50 text-emerald-800',
  cancelled: 'bg-red-50 text-red-700',
};
