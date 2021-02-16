// Form 
// variables
// const form = document.getElementById('task-form');
// const todoList = document.querySelector('.collection');
// const taskInput = document.querySelector('#task');
// const filter = document.querySelector('#filter');
// const clearBtn = document.querySelector('.clearbtn');



// loadEventListeners();

// function loadEventListeners() {

document.addEventListener('DOMContentLoaded', function() {

    console.log("content loaded");

    // opening and closing navbar
    const openMenu = document.querySelector("#openmenu");
    const closeMenu = document.querySelector("#closemenu");

    openMenu.addEventListener("click", openAndClose, false);
    closeMenu.addEventListener("click", openAndClose, false);

    openAndClose()
});


function openAndClose(event) {

    const navLinks = document.getElementById('navlinks');
    if (typeof event !== "undefined" && typeof event.currentTarget !== "undefined") {
        if (event.currentTarget.id === "openmenu") {
            navLinks.classList.add('navbar_active');
        }
        if (event.currentTarget.id === "closemenu") {
            navLinks.classList.remove('navbar_active');
        }
    }

}





// function getTasks(e) {

//     let tasks;
//     if (localStorage.getItem('tasks') === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }

//     tasks.forEach(function(task) {
//         const li = document.createElement('li');

//         li.className = 'collection-item';

//         li.appendChild(document.createTextNode(task));

//         const removeBtn = document.createElement('a');
//         removeBtn.className = 'remove-todo secondary-content';
//         removeBtn.innerHTML = '<i class="fas fa-trash"></i>';

//         li.appendChild(removeBtn);

//         todoList.appendChild(li);
//     });

// }

// function addTask(e) {

//     if (taskInput.value === '') {
//         alert('Please input a task');
//     } else {

//         const li = document.createElement('li');

//         li.className = 'collection-item';

//         li.appendChild(document.createTextNode(taskInput.value));

//         const removeBtn = document.createElement('a');
//         removeBtn.className = 'remove-todo secondary-content';
//         removeBtn.innerHTML = '<i class="fas fa-trash"></i>';

//         li.appendChild(removeBtn);

//         todoList.appendChild(li);

//         storeTasks(taskInput.value);

//         taskInput.value = ' ';

//         e.preventDefault();

//     }

// }

// function storeTasks(task) {

//     let tasks;
//     if (localStorage.getItem('tasks') === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }

//     tasks.push(task);

//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }


// function removeTask(e) {
//     if (e.target.parentElement.classList.contains('remove-todo')) {
//         if (confirm('Are you Sure?')) {
//             e.target.parentElement.parentElement.remove();
//             // remove from Storage
//             removeFromStorage(e.target.parentElement.parentElement);
//         }
//     }
// }

// // remove from local storage
// function removeFromStorage(taskItem) {
//     let tasks;
//     if (localStorage.getItem('tasks') === null) {
//         tasks = [];
//     } else {
//         tasks = JSON.parse(localStorage.getItem('tasks'));
//     }

//     tasks.forEach(function(task, index) {
//         if (taskItem.textContent === task) {
//             tasks.splice(index, 1);
//         }
//     });

//     localStorage.setItem('tasks', JSON.stringify(tasks));
// }

// function ClearTask(e) {
//     if (confirm('Are you Sure?')) {
//         while (todoList.firstChild) todoList.removeChild(todoList.firstChild);
//         alert('List cleared')

//         // clear tasks from storage 

//         ClearTasksFromStorage();


//     } else {
//         alert('Nothing to Delete')
//     }

// }

// // function to clear from local storage 

// function ClearTaskfromStorage() {
//     localStorage.clear();
// }

// function filterTask(e) {
//     const SearchTask = e.target.value.toLowerCase();

//     document.querySelectorAll('.collection-item').forEach(function(task) {

//         const item = task.firstChild.textContent;
//         if (item.toLowerCase().indexOf(SearchTask) != -1) {
//             task.style.display = 'block';
//         } else {
//             task.style.display = 'none';

//         }
//     });