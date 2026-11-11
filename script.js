
let tasks = JSON.parse(localStorage.getItem("studentTasks")) || [];
let currentFilter = "all";

function saveTasks() {
    localStorage.setItem("studentTasks", JSON.stringify(tasks));
}

function addTask() {
    const taskInput = document.getElementById("taskInput");
    const taskDate = document.getElementById("taskDate");
    const taskPriority = document.getElementById("taskPriority");

    const taskName = taskInput.value.trim();

    if (taskName === "") {
        alert("Please enter a task!");
        taskInput.focus();
        return;
    }

    tasks.push({
        id: Date.now(),
        name: taskName,
        date: taskDate.value,
        priority: taskPriority.value,
        completed: false
    });

    saveTasks();

    taskInput.value = "";
    taskDate.value = "";
    taskPriority.value = "Medium";

    renderTasks();
}

function completeTask(id) {
    tasks = tasks.map(task => {
        if (task.id === id) {
            task.completed = !task.completed;
        }
        return task;
    });

    saveTasks();
    renderTasks();
}

function deleteTask(id) {
    const confirmDelete = confirm("Are you sure you want to delete this task?");

    if (!confirmDelete) return;

    tasks = tasks.filter(task => task.id !== id);

    saveTasks();
    renderTasks();
}

function filterTasks(filter, button) {
    currentFilter = filter;

    document.querySelectorAll(".filter").forEach(btn => {
        btn.classList.remove("active");
    });

    button.classList.add("active");

    renderTasks();
}

function updateStatistics() {
    const total = tasks.length;
    const completed = tasks.filter(task => task.completed).length;
    const pending = total - completed;

    const percentage = total === 0
        ? 0
        : Math.round((completed / total) * 100);

    document.getElementById("totalTasks").textContent = total;
    document.getElementById("completedTasks").textContent = completed;
    document.getElementById("pendingTasks").textContent = pending;

    document.getElementById("progressBar").style.width =
        percentage + "%";

    document.getElementById("progressText").textContent =
        percentage + "% completed";
}

function renderTasks() {
    const taskList = document.getElementById("taskList");
    taskList.innerHTML = "";

    let filteredTasks = tasks;

    if (currentFilter === "pending") {
        filteredTasks = tasks.filter(task => !task.completed);
    }

    if (currentFilter === "completed") {
        filteredTasks = tasks.filter(task => task.completed);
    }

    if (filteredTasks.length === 0) {
        taskList.innerHTML =
            '<li class="empty-message">No tasks here yet. Add a task to get started! ✨</li>';
    }

    filteredTasks.forEach(task => {
        const li = document.createElement("li");

        li.className = task.completed
            ? "task-item completed"
            : "task-item";

        const info = document.createElement("div");
        info.className = "task-info";

        const name = document.createElement("strong");
        name.textContent = task.name;

        const date = document.createElement("small");
        date.textContent = "📅 " + (task.date || "No deadline");

        const priority = document.createElement("span");
        priority.className = "priority " + task.priority;
        priority.textContent = task.priority + " Priority";

        info.appendChild(name);
        info.appendChild(date);
        info.appendChild(document.createElement("br"));
        info.appendChild(priority);

        const actions = document.createElement("div");
        actions.className = "task-actions";

        const completeButton = document.createElement("button");
        completeButton.className = "complete-btn";
        completeButton.textContent = task.completed
            ? "Undo"
            : "Complete";

        completeButton.onclick = () => completeTask(task.id);

        const deleteButton = document.createElement("button");
        deleteButton.className = "delete-btn";
        deleteButton.textContent = "Delete";

        deleteButton.onclick = () => deleteTask(task.id);

        actions.appendChild(completeButton);
        actions.appendChild(deleteButton);

        li.appendChild(info);
        li.appendChild(actions);

        taskList.appendChild(li);
    });

    updateStatistics();
}

// Display saved tasks when the website opens
renderTasks();

