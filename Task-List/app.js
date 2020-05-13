// Get element from the DOM
const form = document.getElementById('task-form');
const taskList = document.querySelector('.collection');
const clearBtn = document.querySelector('.clear-tasks');
const filter = document.querySelector('#filter');
const taskInput = document.querySelector('#task');

// Load all eventListener
loadEventListener();

function loadEventListener(){
    // DOM load event
    document.addEventListener('DOMContentLoaded',loadTasks);
    // Add task event
    form.addEventListener('submit',addTask);
    // Remove task event
    taskList.addEventListener('click', removeTask);
    // Clear task event
    clearBtn.addEventListener('click',clearTask);
    // Filter task event
    filter.addEventListener('keyup',filterTask);
    //clear Task
}


// Get Tasks from local storage
function loadTasks(){
    let tasks = getTasks();
    tasks.forEach(function(task){
        createElement(task);
    })
}

function createElement(value){
    // Create li element
    const li = document.createElement('li');
    //Add Class
    li.className = 'collection-item';
    // Create text node and append to li
    li.appendChild(document.createTextNode(value));
    // Create new link element
    const link = document.createElement('a');
    link.className = 'delete-item secondary-content';
    // Add icon html
    link.innerHTML = '<i class="fa fa-remove"></i>';
    // Append the link to li
    li.appendChild(link);

    // Append the li to the ul
    taskList.appendChild(li);
}

// Add task function
function addTask(e){
    if(taskInput.value === ''){
        alert('Add a task');
    }
    // Call create element function
    createElement(taskInput.value);
    
    // Store task in Local Storage
    storeTask(taskInput.value);

    // Clear input
    taskInput.value = '';
    e.preventDefault();
}

function getTasks(){
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    return tasks;
}

// Store task function
function storeTask(taskValue){
    let tasks;
    if(localStorage.getItem('tasks') === null){
        tasks = [];
    }
    else{
        // Parse the task to an object that we can use
        tasks = JSON.parse(localStorage.getItem('tasks'));
    }
    // Push user input value into the tasks object
    tasks.push(taskValue);

    localStorage.setItem('tasks',JSON.stringify(tasks));
}

function removeFromLocalStorage(taskItem){
    let tasks = getTasks();
    tasks.forEach(function(task,index){
        if(taskItem === task){
            // Remove item from a specific index
            tasks.splice(index,1);
        }
        console.log(taskItem);
    });
    localStorage.setItem('tasks',JSON.stringify(tasks));
    console.log(tasks);
}

//Clear task
function clearTask(){
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
}

function clearTaskFromLocalStorage(){
    localStorage.clear();
}

// Remove Task function
function removeTask(e){
    taskClick = e.target.parentElement.classList.contains('delete-item');
    if(taskClick){
        if(confirm('Are you sure?')){
            taskItem = e.target.parentElement.parentElement.textContent
             // Remove from the UI
             e.target.parentElement.parentElement.remove();
             // Remove from local storage
             removeFromLocalStorage(taskItem);
        }
    }
}



// Clear task function
function clearTask(){
    // Clear task list with remove firstChild
    while(taskList.firstChild){
        taskList.removeChild(taskList.firstChild);
    }
    clearTaskFromLocalStorage();
}

// Filter task function
function filterTask(e){
    const input = e.target.value.toLowerCase();

    // Return a nodelist
    document.querySelectorAll('.collection-item').forEach(function(task){
        const item = task.firstChild.textContent;
        if(item.toLowerCase().indexOf(input) != -1){
            task.style.display = 'block';
        }
        else{
            task.style.display = 'none';
        }
    });
}