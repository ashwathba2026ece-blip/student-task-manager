
function addTask() {

    let taskInput = document.getElementById("taskInput");
    let taskDate = document.getElementById("taskDate");

    let task = taskInput.value;
    let date = taskDate.value;

    if (task.trim() === "") {
        alert("Please enter a task!");
        return;
    }

    let li = document.createElement("li");

    let taskText = document.createElement("span");

    taskText.textContent = task + " | " +
        (date || "No deadline");

    let completeButton = document.createElement("button");

    completeButton.textContent = "Complete";

    completeButton.onclick = function() {
        taskText.style.textDecoration = "line-through";
        taskText.style.color = "green";
    };

    let deleteButton = document.createElement("button");

    deleteButton.textContent = "Delete";

    deleteButton.onclick = function() {
        li.remove();
    };

    li.appendChild(taskText);
    li.appendChild(completeButton);
    li.appendChild(deleteButton);

    document.getElementById("taskList").appendChild(li);

    taskInput.value = "";
    taskDate.value = "";
}
