const todoList = document.getElementById("todo-list");
const addTaskButton = document.getElementById("add-task");
const searchInput = document.getElementById("search");

// Function to create a new task element
function createTaskElement(task) {
  const { name, dueDate, completed } = task;
  const li = document.createElement("li");
  li.innerHTML = `<span>${name}</span><span class="due-date">Due Date: ${dueDate}</span><button class="complete">Complete</button><button class="delete">Delete</button>`;
  if (completed) {
    li.classList.add("completed");
  }
  return li;
}

// Function to load and display tasks from the database
function loadTasks() {
  const tasks = getTasksFromLocalStorage();
  todoList.innerHTML = "";
  tasks.forEach(task => {
    const li = createTaskElement(task);
    todoList.appendChild(li);
  });
}

// Function to get tasks from local storage
function getTasksFromLocalStorage() {
  return JSON.parse(localStorage.getItem("tasks")) || [];
}

// Function to add a new task to the database
function addTask() {
  const taskName = document.getElementById("task").value.trim();
  const dueDate = document.getElementById("due-date").value;
  if (!taskName) {
    alert("Please enter a task name.");
    return;
  }

  const task = { name: taskName, dueDate: dueDate, completed: false };
  const tasks = getTasksFromLocalStorage();
  tasks.push(task);
  localStorage.setItem("tasks", JSON.stringify(tasks));

  const li = createTaskElement(task);
  todoList.appendChild(li);

  document.getElementById("task").value = "";
  document.getElementById("due-date").value = "";
}

addTaskButton.addEventListener("click", addTask);

// Function to filter tasks based on the search input
function filterTasks() {
  const searchText = searchInput.value.toLowerCase();
  const tasks = todoList.getElementsByTagName("li");
  for (const task of tasks) {
    const taskText = task.textContent.toLowerCase();
    task.style.display = taskText.includes(searchText) ? "block" : "none";
  }
}

searchInput.addEventListener("input", filterTasks);

// Function to handle task completion and deletion
todoList.addEventListener("click", function (event) {
  if (event.target && event.target.nodeName === "BUTTON") {
    const button = event.target;
    const listItem = button.parentNode;
    const tasks = getTasksFromLocalStorage();
    const index = Array.from(todoList.children).indexOf(listItem);
    if (button.classList.contains("complete")) {
      tasks[index].completed = !tasks[index].completed;
      listItem.classList.toggle("completed");
    } else if (button.classList.contains("delete")) {
      tasks.splice(index, 1);
      listItem.remove();
    }
    localStorage.setItem("tasks", JSON.stringify(tasks));
  }
});

// Load and display tasks from the database on page load
loadTasks();
