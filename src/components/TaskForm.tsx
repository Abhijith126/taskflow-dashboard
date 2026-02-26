import { useState } from 'react';
import { useTaskStore } from '../store/taskStore';
import { Priority, TaskStatus } from '../types/task';

interface TaskFormProps {
  onSuccess?: () => void;
  initialData?: {
    title: string;
    description?: string;
    priority: Priority;
    status: TaskStatus;
    tags: string[];
    dueDate?: Date;
  };
}

export default function TaskForm({ onSuccess, initialData }: TaskFormProps) {
  const addTask = useTaskStore((state) => state.addTask);
  
  const [title, setTitle] = useState(initialData?.title || '');
  const [description, setDescription] = useState(initialData?.description || '');
  const [priority, setPriority] = useState<Priority>(initialData?.priority || 'medium');
  const [status, setStatus] = useState<TaskStatus>(initialData?.status || 'pending');
  const [tags, setTags] = useState(initialData?.tags.join(', ') || '');
  const [dueDate, setDueDate] = useState(
    initialData?.dueDate ? new Date(initialData.dueDate).toISOString().split('T')[0] : ''
  );

  const handleSubmit = (e: React.FormEvent) => {
    e.preventDefault();
    
    if (!title.trim()) return;

    addTask({
      title: title.trim(),
      description: description.trim() || undefined,
      priority,
      status,
      tags: tags.split(',').map((t) => t.trim()).filter(Boolean),
      dueDate: dueDate ? new Date(dueDate) : undefined,
    });

    setTitle('');
    setDescription('');
    setPriority('medium');
    setStatus('pending');
    setTags('');
    setDueDate('');
    
    onSuccess?.();
  };

  return (
    <form onSubmit={handleSubmit} className="space-y-4">
      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Title *
        </label>
        <input
          type="text"
          value={title}
          onChange={(e) => setTitle(e.target.value)}
          className="input"
          placeholder="Enter task title..."
          required
        />
      </div>

      <div>
        <label className="block text-sm font-medium text-ink mb-1.5">
          Description
        </label>
        <textarea
          value={description}
          onChange={(e) => setDescription(e.target.value)}
          className="input min-h-[88px] resize-y"
          placeholder="Add details..."
        />
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Priority
          </label>
          <select
            value={priority}
            onChange={(e) => setPriority(e.target.value as Priority)}
            className="input"
          >
            <option value="low">Low</option>
            <option value="medium">Medium</option>
            <option value="high">High</option>
            <option value="urgent">Urgent</option>
          </select>
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Status
          </label>
          <select
            value={status}
            onChange={(e) => setStatus(e.target.value as TaskStatus)}
            className="input"
          >
            <option value="pending">Pending</option>
            <option value="in-progress">In Progress</option>
            <option value="completed">Completed</option>
            <option value="cancelled">Cancelled</option>
          </select>
        </div>
      </div>

      <div className="grid grid-cols-1 sm:grid-cols-2 gap-4">
        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Due Date
          </label>
          <input
            type="date"
            value={dueDate}
            onChange={(e) => setDueDate(e.target.value)}
            className="input"
          />
        </div>

        <div>
          <label className="block text-sm font-medium text-ink mb-1.5">
            Tags (comma-separated)
          </label>
          <input
            type="text"
            value={tags}
            onChange={(e) => setTags(e.target.value)}
            className="input"
            placeholder="work, urgent, bug..."
          />
        </div>
      </div>

      <div className="flex justify-end gap-3 pt-2">
        <button type="submit" className="btn-primary">
          Create Task
        </button>
      </div>
    </form>
  );
}
