// Step 1: Setup Event Listener for Page Load
document.addEventListener('DOMContentLoaded', () => {
    // Step 2: Select DOM Elements
    const addButton = document.getElementById('add-task-btn'); // Button to add tasks
    const taskInput = document.getElementById('task-input');   // Input field for tasks
    const taskList = document.getElementById('task-list');     // List to display tasks

    // Step 3: Create the addTask Function
    function addTask() {
        // Retrieve and trim the value from the task input field
        const taskText = taskInput.value.trim();

        // Check if taskText is not empty
        if (taskText === "") {
            alert("Please enter a task."); // Alert if the input is empty
            return; // Exit the function if the input is empty
        }

        // Task Creation
        // Create a new li element
        const listItem = document.createElement('li');
        listItem.textContent = taskText; 
        listItem.classList.add('task-item')

        // Create a new button element for removing the task
        const removeButton = document.createElement('button');
        removeButton.textContent = "Remove"; // Set its textContent to "Remove"
        removeButton.className = 'remove-btn'; // Give it a class name of 'remove-btn'

        // Step 4: Assign onclick event to the remove button
        removeButton.onclick = function() {
            taskList.removeChild(listItem); // Remove the li element from taskList when clicked
        };

        // Append the remove button to the li element
        listItem.appendChild(removeButton);
        // Append the li to taskList
        taskList.appendChild(listItem);

        // Clear the task input field
        taskInput.value = ''; // Set taskInput value to an empty string
    }

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
