import { describe, it, expect, beforeEach } from 'vitest';
import { matchesFilter, useTaskStore } from '../store/taskStore';
import { Task, TaskFilter } from '../types/task';

const createTask = (overrides: Partial<Task> = {}): Task => ({
  id: Math.random().toString(36).substring(2, 15),
  title: 'Test Task',
  description: 'A test description',
  priority: 'medium',
  status: 'pending',
  tags: ['test', 'work'],
  createdAt: new Date(),
  updatedAt: new Date(),
  ...overrides,
});

describe('matchesFilter', () => {
  describe('status filter', () => {
    it('matches when task status equals filter status', () => {
      const task = createTask({ status: 'completed' });
      const filter: TaskFilter = { status: 'completed' };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when task status differs from filter status', () => {
      const task = createTask({ status: 'pending' });
      const filter: TaskFilter = { status: 'completed' };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('matches all when no status filter provided', () => {
      const task = createTask({ status: 'in-progress' });
      const filter: TaskFilter = {};
      expect(matchesFilter(task, filter)).toBe(true);
    });
  });

  describe('priority filter', () => {
    it('matches when task priority equals filter priority', () => {
      const task = createTask({ priority: 'high' });
      const filter: TaskFilter = { priority: 'high' };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when task priority differs', () => {
      const task = createTask({ priority: 'low' });
      const filter: TaskFilter = { priority: 'urgent' };
      expect(matchesFilter(task, filter)).toBe(false);
    });
  });

  describe('tags filter', () => {
    it('matches when task has at least one filter tag', () => {
      const task = createTask({ tags: ['important', 'urgent', 'work'] });
      const filter: TaskFilter = { tags: ['urgent'] };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('matches when task has multiple filter tags (any match)', () => {
      const task = createTask({ tags: ['work', 'personal'] });
      const filter: TaskFilter = { tags: ['urgent', 'work'] };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when task has none of the filter tags', () => {
      const task = createTask({ tags: ['personal'] });
      const filter: TaskFilter = { tags: ['work', 'urgent'] };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('matches when no tags filter provided', () => {
      const task = createTask({ tags: ['any'] });
      const filter: TaskFilter = {};
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('matches when task has no tags but filter is empty array', () => {
      const task = createTask({ tags: [] });
      const filter: TaskFilter = { tags: [] };
      expect(matchesFilter(task, filter)).toBe(true);
    });
  });

  describe('search filter', () => {
    it('matches when title contains search term (case insensitive)', () => {
      const task = createTask({ title: 'Complete the project report' });
      const filter: TaskFilter = { search: 'project' };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('matches when description contains search term', () => {
      const task = createTask({ description: 'Important meeting with team' });
      const filter: TaskFilter = { search: 'meeting' };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('matches case insensitive', () => {
      const task = createTask({ title: 'IMPORTANT TASK' });
      const filter: TaskFilter = { search: 'important' };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when neither title nor description contain search term', () => {
      const task = createTask({ title: 'Write code', description: 'Review PRs' });
      const filter: TaskFilter = { search: 'test' };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('matches partial words', () => {
      const task = createTask({ title: 'Testing the application' });
      const filter: TaskFilter = { search: 'test' };
      expect(matchesFilter(task, filter)).toBe(true);
    });
  });

  describe('due date filters', () => {
    const now = new Date();
    const yesterday = new Date(now.getTime() - 24 * 60 * 60 * 1000);
    const tomorrow = new Date(now.getTime() + 24 * 60 * 60 * 1000);
    const nextWeek = new Date(now.getTime() + 7 * 24 * 60 * 60 * 1000);
    const lastWeek = new Date(now.getTime() - 7 * 24 * 60 * 60 * 1000);

    it('matches when due date is before dueBefore (equal passes)', () => {
      const task = createTask({ dueDate: yesterday });
      const filter: TaskFilter = { dueBefore: now };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when due date is after dueBefore', () => {
      const task = createTask({ dueDate: tomorrow });
      const filter: TaskFilter = { dueBefore: now };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('matches when due date is after dueAfter (equal passes)', () => {
      const task = createTask({ dueDate: tomorrow });
      const filter: TaskFilter = { dueAfter: now };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when due date is before dueAfter', () => {
      const task = createTask({ dueDate: yesterday });
      const filter: TaskFilter = { dueAfter: now };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('does not match when task has no dueDate and filter has dueBefore', () => {
      const task = createTask({ dueDate: undefined });
      const filter: TaskFilter = { dueBefore: now };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('does not match when task has no dueDate and filter has dueAfter', () => {
      const task = createTask({ dueDate: undefined });
      const filter: TaskFilter = { dueAfter: now };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('matches with both dueBefore and dueAfter when within range', () => {
      const task = createTask({ dueDate: now });
      const filter: TaskFilter = { dueBefore: nextWeek, dueAfter: yesterday };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match with both dueBefore and dueAfter when outside range', () => {
      const task = createTask({ dueDate: lastWeek });
      const filter: TaskFilter = { dueBefore: nextWeek, dueAfter: yesterday };
      expect(matchesFilter(task, filter)).toBe(false);
    });
  });

  describe('combined filters', () => {
    it('matches when all filters match (status + priority + tags)', () => {
      const task = createTask({ 
        status: 'completed', 
        priority: 'high', 
        tags: ['work', 'important'] 
      });
      const filter: TaskFilter = { 
        status: 'completed', 
        priority: 'high', 
        tags: ['important'] 
      };
      expect(matchesFilter(task, filter)).toBe(true);
    });

    it('does not match when any filter fails', () => {
      const task = createTask({ 
        status: 'pending', 
        priority: 'high', 
        tags: ['work'] 
      });
      const filter: TaskFilter = { 
        status: 'completed', 
        priority: 'high' 
      };
      expect(matchesFilter(task, filter)).toBe(false);
    });

    it('matches with search + status filter', () => {
      const task = createTask({ title: 'Deploy application', status: 'in-progress' });
      const filter: TaskFilter = { search: 'deploy', status: 'in-progress' };
      expect(matchesFilter(task, filter)).toBe(true);
    });
  });
});

describe('TaskStore integration', () => {
  beforeEach(() => {
    useTaskStore.setState({ tasks: [], filter: {} });
  });

  it('uses filter state when returning filtered tasks', () => {
    useTaskStore.setState({
      tasks: [
        createTask({ id: '1', status: 'completed' }),
        createTask({ id: '2', status: 'pending' }),
      ],
      filter: { status: 'completed' },
    });

    const { getFilteredTasks } = useTaskStore.getState();
    const filtered = getFilteredTasks();

    expect(filtered).toHaveLength(1);
    expect(filtered[0].status).toBe('completed');
  });
});
