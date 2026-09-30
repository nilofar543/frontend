const form = document.getElementById('todo-form');
const input = document.getElementById('todo-input');
const list = document.getElementById('todo-list');
const emptyMessage = document.getElementById('empty-message');

// Fetch and render all todos
async function fetchTodos() {
  try {
    const res = await fetch(API_URL);
    const todos = await res.json();
    renderTodos(todos);
  } catch (err) {
    console.error('Error fetching todos:', err);
    list.innerHTML = '<li>Could not load tasks. Is the backend running?</li>';
  }
}

// Render todos to the DOM
function renderTodos(todos) {
  list.innerHTML = '';
  emptyMessage.hidden = todos.length !== 0;

  todos.forEach((todo) => {
    const li = document.createElement('li');
    li.className = 'todo-item' + (todo.completed ? ' completed' : '');

    const left = document.createElement('div');
    left.className = 'todo-left';

    const checkbox = document.createElement('input');
    checkbox.type = 'checkbox';
    checkbox.checked = todo.completed;
    checkbox.addEventListener('change', () => toggleComplete(todo._id, checkbox.checked));

    const span = document.createElement('span');
    span.textContent = todo.text;

    left.appendChild(checkbox);
    left.appendChild(span);

    const deleteBtn = document.createElement('button');
    deleteBtn.className = 'delete-btn';
    deleteBtn.textContent = 'Delete';
    deleteBtn.addEventListener('click', () => deleteTodo(todo._id));

    li.appendChild(left);
    li.appendChild(deleteBtn);
    list.appendChild(li);
  });
}

// Add a new todo
form.addEventListener('submit', async (e) => {
  e.preventDefault();
  const title = input.value.trim();
  if (!title) return;

  try {
    await fetch(API_URL, {
      method: 'POST',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ text: title })
    });
    input.value = '';
    fetchTodos();
  } catch (err) {
    console.error('Error adding todo:', err);
  }
});

// Toggle completed state
async function toggleComplete(id, completed) {
  try {
    await fetch(`${API_URL}/${id}`, {
      method: 'PUT',
      headers: { 'Content-Type': 'application/json' },
      body: JSON.stringify({ completed })
    });
    fetchTodos();
  } catch (err) {
    console.error('Error updating todo:', err);
  }
}

// Delete a todo
async function deleteTodo(id) {
  try {
    await fetch(`${API_URL}/${id}`, { method: 'DELETE' });
    fetchTodos();
  } catch (err) {
    console.error('Error deleting todo:', err);
  }
}

// Initial load
fetchTodos();
