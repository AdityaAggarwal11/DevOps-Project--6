const express = require('express');
const app = express();
const PORT = 3000;

let tasks = [];
let idCounter = 1;

app.use(express.json());

app.get('/api/tasks', (req, res) => {
  res.json(tasks);
});

app.post('/api/tasks', (req, res) => {
  const { task } = req.body;
  const newTask = { id: idCounter++, task };
  tasks.push(newTask);
  res.status(201).json(newTask);
});

app.delete('/api/tasks/:id', (req, res) => {
  const id = parseInt(req.params.id);
  tasks = tasks.filter(task => task.id !== id);
  res.status(204).send();
});

app.listen(PORT, () => console.log(`API running on port ${PORT}`));

