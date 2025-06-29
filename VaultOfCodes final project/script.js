let tasks = [];

// Load tasks from localStorage on page load
window.onload = function() {
  if (localStorage.getItem("tasks")) {
    tasks = JSON.parse(localStorage.getItem("tasks"));
    renderTasks();
  }
};

function addTask() {
  const taskInput = document.getElementById("taskInput");
  const taskDate = document.getElementById("taskDate");

  const taskText = taskInput.value.trim();
  const dateValue = taskDate.value;

  if (taskText === "" || dateValue === "") {
    alert("Please enter both task and date.");
    return;
  }

  const task = {
    text: taskText,
    date: dateValue,
    completed: false
  };

  tasks.push(task);
  saveTasks();
  renderTasks();

  taskInput.value = "";
  taskDate.value = "";
}

function renderTasks() {
  const taskList = document.getElementById("taskList");
  taskList.innerHTML = "";

  // Sort tasks by date
  tasks.sort((a, b) => new Date(a.date) - new Date(b.date));

  tasks.forEach((task, index) => {
    const li = document.createElement("li");

    const tickBtn = document.createElement("button");
    tickBtn.textContent = "✓";
    tickBtn.className = "tick-btn";
    tickBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      tasks[index].completed = !tasks[index].completed;
      saveTasks();
      renderTasks();
    });

    const taskText = document.createElement("span");
    taskText.textContent = `${task.text} ( ${task.date} )`;
    if (task.completed) {
      taskText.style.textDecoration = "line-through";
      taskText.style.color = "grey";
    }

    const deleteBtn = document.createElement("button");
    deleteBtn.textContent = "Delete";
    deleteBtn.className = "delete-btn";
    deleteBtn.addEventListener("click", function(e) {
      e.stopPropagation();
      tasks.splice(index, 1);
      saveTasks();
      renderTasks();
    });

    li.appendChild(tickBtn);
    li.appendChild(taskText);
    li.appendChild(deleteBtn);

    taskList.appendChild(li);
  });
}

function saveTasks() {
  localStorage.setItem("tasks", JSON.stringify(tasks));
}
