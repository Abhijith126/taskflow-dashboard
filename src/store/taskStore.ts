import { create } from 'zustand';
import { persist } from 'zustand/middleware';
import { Task, TaskFilter, TaskStats } from '../types/task';

interface TaskStore {
  tasks: Task[];
  filter: TaskFilter;
  
  // Actions
  addTask: (task: Omit<Task, 'id' | 'createdAt' | 'updatedAt'>) => void;
  updateTask: (id: string, updates: Partial<Task>) => void;
  deleteTask: (id: string) => void;
  setFilter: (filter: TaskFilter) => void;
  clearCompleted: () => void;
  
  // Computed
  getFilteredTasks: () => Task[];
  getStats: () => TaskStats;
}

const generateId = () => Math.random().toString(36).substring(2, 15);

export const matchesFilter = (task: Task, filter: TaskFilter): boolean => {
  if (filter.status && task.status !== filter.status) return false;
  if (filter.priority && task.priority !== filter.priority) return false;

  if (filter.tags && filter.tags.length > 0) {
    const taskTags = task.tags ?? [];
    if (!filter.tags.some((tag) => taskTags.includes(tag))) return false;
  }

  if (filter.search && filter.search.trim() !== '') {
    const search = filter.search.toLowerCase();
    const title = task.title.toLowerCase();
    const description = task.description?.toLowerCase() ?? '';

    if (!title.includes(search) && !description.includes(search)) {
      return false;
    }
  }

  if ((filter.dueBefore || filter.dueAfter) && !task.dueDate) {
    return false;
  }

  if (task.dueDate) {
    const due = new Date(task.dueDate);

    if (filter.dueBefore && due > filter.dueBefore) return false;
    if (filter.dueAfter && due < filter.dueAfter) return false;
  }

  return true;
};

export const useTaskStore = create<TaskStore>()(
  persist(
    (set, get) => ({
      tasks: [],
      filter: {},

      addTask: (taskData) => {
        const now = new Date();
        const task: Task = {
          ...taskData,
          id: generateId(),
          createdAt: now,
          updatedAt: now,
        };
        set((state) => ({ tasks: [...state.tasks, task] }));
      },

      updateTask: (id, updates) => {
        set((state) => ({
          tasks: state.tasks.map((task) =>
            task.id === id
              ? {
                  ...task,
                  ...updates,
                  updatedAt: new Date(),
                  completedAt: updates.status === 'completed' ? new Date() : task.completedAt,
                }
              : task
          ),
        }));
      },

      deleteTask: (id) => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.id !== id),
        }));
      },

      setFilter: (filter) => {
        set({ filter });
      },

      clearCompleted: () => {
        set((state) => ({
          tasks: state.tasks.filter((task) => task.status !== 'completed'),
        }));
      },

      getFilteredTasks: () => {
        const { tasks, filter } = get();
        return tasks.filter((task) => matchesFilter(task, filter));
      },

      getStats: () => {
        const { tasks } = get();
        const now = new Date();
        const today = new Date(now.getFullYear(), now.getMonth(), now.getDate());
        const weekFromNow = new Date(today.getTime() + 7 * 24 * 60 * 60 * 1000);

        const stats: TaskStats = {
          total: tasks.length,
          completed: tasks.filter((t) => t.status === 'completed').length,
          pending: tasks.filter((t) => t.status === 'pending').length,
          inProgress: tasks.filter((t) => t.status === 'in-progress').length,
          cancelled: tasks.filter((t) => t.status === 'cancelled').length,
          byPriority: {
            low: tasks.filter((t) => t.priority === 'low').length,
            medium: tasks.filter((t) => t.priority === 'medium').length,
            high: tasks.filter((t) => t.priority === 'high').length,
            urgent: tasks.filter((t) => t.priority === 'urgent').length,
          },
          overdue: tasks.filter((t) => 
            t.dueDate && new Date(t.dueDate) < today && t.status !== 'completed'
          ).length,
          dueToday: tasks.filter((t) => {
            if (!t.dueDate) return false;
            const due = new Date(t.dueDate);
            return due >= today && due < new Date(today.getTime() + 24 * 60 * 60 * 1000);
          }).length,
          dueThisWeek: tasks.filter((t) => {
            if (!t.dueDate) return false;
            const due = new Date(t.dueDate);
            return due >= today && due < weekFromNow;
          }).length,
        };

        return stats;
      },
    }),
    {
      name: 'taskflow-storage',
    }
  )
);
