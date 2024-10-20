// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn'); // Button to add tasks
    const taskInput = document.getElementById('task-input');   // Input field for tasks
    const taskList = document.getElementById('task-list');     // List to display tasks

    // Initialize an array to hold tasks
    let tasks = [];

    // Function to load tasks from Local Storage
    function loadTasks() {
        const storedTasks = localStorage.getItem('tasks'); // Retrieve tasks from Local Storage
        if (storedTasks) {
            tasks = JSON.parse(storedTasks); // Parse tasks from JSON
            tasks.forEach(task => {
                createTaskElement(task); // Create and display each task
            });
        }
    }

    // Function to create and append a task element to the DOM
    function createTaskElement(taskText) {
        const listItem = document.createElement('li');
        listItem.textContent = taskText; // Set its textContent to taskText
        listItem.classList.add('task-item'); // Adding a class to the li element

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set its textContent to "Remove"
        removeButton.className = 'remove-btn'; // Give it a class name of 'remove-btn'

        // Assign onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the li element from taskList
            removeTaskFromStorage(taskText); // Remove from Local Storage
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        // Append the li to taskList
        taskList.appendChild(listItem);
    }

    // Function to add a task
    function addTask() {
        const taskText = taskInput.value.trim(); // Retrieve and trim the value from the task input field

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert if the input is empty
            return; // Exit the function if the input is empty
        }

        // Add task to the tasks array and Local Storage
        tasks.push(taskText); // Add the new task to the tasks array
        createTaskElement(taskText); // Create and append the new task element
        updateLocalStorage(); // Update Local Storage
        taskInput.value = ''; // Clear the task input field
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
