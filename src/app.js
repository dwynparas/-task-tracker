const express = require('express');

const app = express();
const PORT = process.env.PORT || 4000;

app.use(express.json());

const tasks = [];

function addTask(title) {
    if (!title || title.trim() === '') {
        throw new Error('Task title is required');
    }

    const task = {
        id: tasks.length + 1,
        title: title.trim(),
        completed: false
    };

    tasks.push(task);
    return task;
}

function completeTask(id) {
    const task = tasks.find(task => task.id === id);

    if (!task) {
        throw new Error('Task not found');
    }

    task.completed = true;
    return task;
}

function getTasks() {
    return tasks;
}

app.get('/', (req, res) => {
    res.send(`
        <!DOCTYPE html>
        <html>
        <head>
            <title>Task Tracker</title>
        </head>
        <body>
            <h1>Task Tracker</h1>
            <p>Welcome to the Task Tracker application.</p>
            <button id="add-task">Add Task</button>
        </body>
        </html>
    `);
});

app.get('/api/tasks', (req, res) => {
    res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
    try {
        const task = addTask(req.body.title);
        res.status(201).json(task);
    } catch (error) {
        res.status(400).json({ error: error.message });
    }
});

if (require.main === module) {
    app.listen(PORT, '0.0.0.0', () => {
        console.log(`Task Tracker running on port ${PORT}`);
    });
}

module.exports = {
    app,
    addTask,
    completeTask,
    getTasks
};