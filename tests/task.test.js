const {
    addTask,
    completeTask,
    getTasks
} = require('../src/app');

beforeEach(() => {
    getTasks().length = 0;
});

test('adds a task correctly', () => {
    const task = addTask('Study Jenkins');

    expect(task.title).toBe('Study Jenkins');
    expect(task.completed).toBe(false);
});

test('completes an existing task', () => {
    const task = addTask('Build Docker image');

    const completed = completeTask(task.id);

    expect(completed.completed).toBe(true);
});

test('rejects an empty task title', () => {
    expect(() => addTask('')).toThrow('Task title is required');
});