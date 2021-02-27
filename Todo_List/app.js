// global scope

const clearbtn = document.querySelector('#clearbtn');
const taskForm = document.querySelector("#taskform");
const editTask = document.querySelector("#edittask");
const deleteTask = document.querySelector("#deletetask");
const completeTask = document.querySelector("#checktask");

let taskDatas = [];

// description variables
descripWrapper = document.querySelector('#description');
descripForm = document.querySelector('#description__form');
SkipBtn = document.querySelector('#skipbtn');



document.addEventListener('DOMContentLoaded', function() {

    // opening and closing navbar
    const openMenu = document.querySelector("#openmenu");
    const closeMenu = document.querySelector("#closemenu");

    openMenu.addEventListener("click", openAndClose, false);
    closeMenu.addEventListener("click", openAndClose, false);



    // taskfrom eventlistener
    taskForm.addEventListener('submit', e => {

        // preventing default process
        e.preventDefault();

        // taskform input
        let taskInput = taskForm['taskinput'].value;

        // validating if input has data.
        if (taskInput !== "") {

            // input task inputdata
            let data = {
                id: new Date().getTime(),
                taskInput,
                isCompleted: false
            };
            // push data to the empty array taskData
            taskDatas.push(data);
            localStorage.setItem("taskData", JSON.stringify(data));
            e.target.reset();

            taskForm['taskinput'].focus();

            if (typeof e !== "undefined" && e.currentTarget !== "undefined") {
                if (taskForm) {
                    descripWrapper.classList.add('navbar_active');
                }
            }
        } else {
            alert('Input A task');
        }
    });




    descripForm.addEventListener('submit', e => {

        e.preventDefault();
        if (descripForm !== "") {

            let DescripInput = descripForm['description'].value;

            let descripdata = {
                DescripInput
            }

            taskDatas.push(descripdata)
            console.log(taskDatas);

            if (descripForm) {
                descripWrapper.classList.remove('navbar_active');
            }
            addTask();
            e.target.reset();

        }

    });





});


// addTask(data)



function addTask() {

    const bigData = JSON.parse(localStorage.getItem("taskData"));
    const taskList = document.querySelector('#tasklistwrapper');

    taskList.innerHTML += ` <div class="hero__appwrapper__tasklistwrapper__card">

            <a class="hero__appwrapper__tasklistwrapper__taskcard" href="#">${bigData.taskInput}</a>

            <div class="hero__appwrapper__tasklistwrapper__icons">
                <i class="lni lni-checkbox"></i>
                <i class="lni lni-pencil-alt"></i>
                <i class="lni lni-trash"></i>
            </div>

        </div>`;
}

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