// Task list
let tasks = [];
let deletedTasks = [];

// Add task function
function addTask() {
  const taskInput = document.getElementById('taskInput');
  const dueDateInput = document.getElementById('dueDateInput');

  const task = createTask(taskInput.value, dueDateInput.value);
  tasks.push(task);
  displayTasks();
  taskInput.value = '';
  dueDateInput.value = '';
}

// Create task function
function createTask(title, dueDate) {
  return {
    title,
    dueDate,
    deleted: false
  };
}

// Display tasks function
function displayTasks() {
  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';
  tasks.forEach((task, index) => {
    if (!task.deleted) {
      displayTask(task, index);
    }
  });
}

// Display task function
function displayTask(task, index) {
  const taskHtml = `
    <div class="task">
      <h2>${task.title}</h2>
      <p>Due Date: ${task.dueDate}</p>
      <button class="delete-btn" onclick="deleteTask(${index})">Delete</button>
    </div>
  `;
  document.getElementById('tasks').innerHTML += taskHtml;
}

// Delete task function
function deleteTask(index) {
  tasks[index].deleted = true;
  deletedTasks.push(tasks[index]);
  tasks.splice(index, 1);
  displayTasks();
}

// Show all tasks function
function showAllTasks() {
  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';
  tasks.forEach((task, index) => {
    displayTask(task, index);
  });
  deletedTasks.forEach((task, index) => {
    displayDeletedTask(task, index);
  });
}

// Display deleted task function
function displayDeletedTask(task, index) {
  const taskHtml = `
    <div class="task">
      <h2>${task.title}</h2>
      <p>Due Date: ${task.dueDate}</p>
      <p>Status: Deleted</p>
      <button class="delete-btn" onclick="deleteTaskFromDeleted(${index})">Delete Permanently</button>
    </div>
  `;
  document.getElementById('tasks').innerHTML += taskHtml;
}

// Delete task from deleted tasks function
function deleteTaskFromDeleted(index) {
  deletedTasks.splice(index, 1);
  showAllTasks();
}

// Search tasks function
function searchTasks() {
  const searchInput = document.getElementById('searchInput');
  const searchQuery = searchInput.value.toLowerCase();
  const tasksDiv = document.getElementById('tasks');
  tasksDiv.innerHTML = '';
  tasks.forEach((task, index) => {
    if (task.title.toLowerCase().includes(searchQuery) && !task.deleted) {
      displayTask(task, index);
    }
  });
}