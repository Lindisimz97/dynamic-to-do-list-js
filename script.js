document.addEventListener('DOMContentLoaded', () => {
    const addButton = document.getElementById('add-task-btn');
    const taskInput = document.getElementById('task-input');
    const taskList = document.getElementById('task-list');

    let tasks = [];

    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks');
        if (storedTasks) {
            tasks = JSON.parse(storedTasks);
            tasks.forEach(task => {
                createTaskElement(task);
            });
        }
    }

    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText;
        listItem.classList.add('task-item');

        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; 
        removeButton.className = 'remove-btn';
        removeButton.onclick = function() {
            taskList.removeChild(listItem); 
            removeTaskFromStorage(taskText);
        };

        listItem.appendChild(removeButton);
        taskList.appendChild(listItem);
    }

    function addTask() {
        const taskText = taskInput.value.trim(); 

        if (taskText === "") {
            alert("Please enter a task.");
            return;
        }

       
        tasks.push(taskText);
        createTaskElement(taskText);
        updateLocalStorage();
        taskInput.value = '';
    }

    // Function to remove a task from Local Storage
    function removeTaskFromStorage(taskText) {
        tasks = tasks.filter(task => task !== taskText); // Filter out the removed task
        updateLocalStorage(); // Update Local Storage
    }

    // Function to update Local Storage
    function updateLocalStorage() {
        localStorage.setItem('tasks', JSON.stringify(tasks)); // Save tasks array to Local Storage
    }

    // Load tasks when the page loads
    loadTasks();

    // Step 5: Attach Event Listeners
    addButton.addEventListener('click', addTask); // Call addTask when the button is clicked

    // Add an event listener for the 'keypress' event on taskInput
    taskInput.addEventListener('keypress', function(event) {
        // Check if the pressed key is 'Enter'
        if (event.key === 'Enter') {
            addTask(); // Call addTask if the Enter key is pressed
        }
    });
});
