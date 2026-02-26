import { describe, it, expect, beforeEach } from 'vitest';
import { useTaskStore } from '../store/taskStore';

describe('TaskStore', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [], filter: {} });
  });

  it('should add a task', () => {
    const { addTask } = useTaskStore.getState();
    addTask({
      title: 'Test task',
      priority: 'medium',
      status: 'pending',
      tags: [],
    });

    const updatedTasks = useTaskStore.getState().tasks;
    expect(updatedTasks).toHaveLength(1);
    expect(updatedTasks[0].title).toBe('Test task');
  });

  it('should update a task', () => {
    const { addTask, updateTask } = useTaskStore.getState();
    addTask({
      title: 'Test task',
      priority: 'medium',
      status: 'pending',
      tags: [],
    });

    const taskId = useTaskStore.getState().tasks[0].id;
    updateTask(taskId, { status: 'completed' });

    const updatedTask = useTaskStore.getState().tasks[0];
    expect(updatedTask.status).toBe('completed');
    expect(updatedTask.completedAt).toBeDefined();
  });

  it('should delete a task', () => {
    const { addTask, deleteTask } = useTaskStore.getState();
    addTask({
      title: 'Test task',
      priority: 'medium',
      status: 'pending',
      tags: [],
    });

    const taskId = useTaskStore.getState().tasks[0].id;
    deleteTask(taskId);

    expect(useTaskStore.getState().tasks).toHaveLength(0);
  });

  it('should filter tasks correctly', () => {
    const { addTask, setFilter, getFilteredTasks } = useTaskStore.getState();
    
    addTask({ title: 'High priority task', priority: 'high', status: 'pending', tags: [] });
    addTask({ title: 'Low priority task', priority: 'low', status: 'completed', tags: [] });

    setFilter({ priority: 'high' });
    expect(getFilteredTasks()).toHaveLength(1);

    setFilter({ status: 'completed' });
    expect(getFilteredTasks()).toHaveLength(1);
  });

  it('should compute correct stats', () => {
    const { addTask, getStats } = useTaskStore.getState();
    
    addTask({ title: 'Task 1', priority: 'high', status: 'pending', tags: [] });
    addTask({ title: 'Task 2', priority: 'medium', status: 'completed', tags: [] });
    addTask({ title: 'Task 3', priority: 'low', status: 'in-progress', tags: [] });

    const stats = getStats();
    expect(stats.total).toBe(3);
    expect(stats.pending).toBe(1);
    expect(stats.completed).toBe(1);
    expect(stats.inProgress).toBe(1);
    expect(stats.byPriority.high).toBe(1);
  });
});
