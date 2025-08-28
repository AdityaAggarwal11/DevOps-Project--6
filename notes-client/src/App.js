return (
  <div className="container">
    <h1>📝 Notes App</h1>
    <form onSubmit={handleSubmit}>
      <input
        type="text"
        placeholder="Title"
        value={form.title}
        onChange={e => setForm({ ...form, title: e.target.value })}
      />
      <textarea
        placeholder="Content"
        value={form.content}
        onChange={e => setForm({ ...form, content: e.target.value })}
      />
      <button type="submit">Add Note</button>
    </form>

    <ul>
      {notes.map(n => (
        <li key={n._id}>
          <strong>{n.title}</strong>
          <p>{n.content}</p>
        </li>
      ))}
    </ul>
  </div>
);
