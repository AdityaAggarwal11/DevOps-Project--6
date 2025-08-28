import React, { useEffect, useState } from 'react';
import axios from 'axios';

function App() {
  const [notes, setNotes] = useState([]);
  const [form, setForm] = useState({ title: '', content: '' });

  useEffect(() => {
    axios.get('http://localhost:5000/notes')
      .then(res => setNotes(res.data))
      .catch(console.error);
  }, []);

  const handleSubmit = e => {
    e.preventDefault();
    if (!form.title || !form.content) return;

    axios.post('http://localhost:5000/notes', form)
      .then(res => {
        setNotes(prev => [...prev, res.data]);
        setForm({ title: '', content: '' });
      })
      .catch(console.error);
  };

  return (
    <div style={{ padding: '2rem' }}>
      <h1>📝 Notes App</h1>
      <form onSubmit={handleSubmit} style={{ marginBottom: '2rem' }}>
        <input
          type="text"
          placeholder="Title"
          value={form.title}
          onChange={e => setForm({ ...form, title: e.target.value })}
          style={{ marginRight: '1rem' }}
        />
        <textarea
          placeholder="Content"
          value={form.content}
          onChange={e => setForm({ ...form, content: e.target.value })}
          style={{ marginRight: '1rem' }}
        />
        <button type="submit">Add Note</button>
      </form>

      <ul>
        {notes.map(n => (
          <li key={n._id}>
            <strong>{n.title}</strong>: {n.content}
          </li>
        ))}
      </ul>
    </div>
  );
}

export default App;
