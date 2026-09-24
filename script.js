// Change this if your backend runs on a different URL/port
const API_URL = 'http://localhost:5000/api/todos';

const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

// Load all todos when the page opens
document.addEventListener('DOMContentLoaded', loadTodos);

form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const text = input.value.trim();
  if (!text) return;
  await addTodo(text);
  input.value = '';
});

async function loadTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error('Failed to load todos:', err);
    alert('Could not connect to the server. Is the backend running?');
  }
}

async function addTodo(text) {
  try {
    const res = await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text })
    });
    if (!res.ok) throw new Error('Failed to add todo');
    await loadTodos();
  } catch (err) {
    console.error(err);
    alert('Could not add task.');
  }
}

async function toggleTodo(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed: !completed })
    });
    await loadTodos();
  } catch (err) {
    console.error(err);
    alert('Could not update task.');
  }
}

async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    await loadTodos();
  } catch (err) {
    console.error(err);
    alert('Could not delete task.');
  }
}

function renderTodos(todos) {
  list.innerHTML = '';

  if (todos.length === 0) {
    emptyMessage.classList.remove('hidden');
    return;
  }
  emptyMessage.classList.add('hidden');

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const wrap = document.createElement('div');
    wrap.className = 'todo-text-wrap';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleTodo(todo._id, todo.completed));

    const span = document.createElement('span');
    span.className = 'todo-text';
    span.textContent = todo.text;

    wrap.appendChild(checkbox);
    wrap.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTodo(todo._id));

    li.appendChild(wrap);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}
