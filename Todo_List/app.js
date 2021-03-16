// global scope

const clearbtn = document.querySelector('#clearbtn');
const taskForm = document.querySelector("#taskform");
// const editTask = document.querySelector("#edittask");
const deleteTask = document.querySelector(".deletedItem");
const completeTask = document.querySelector("#checktask");



let taskDatas = [];
let data = {};


// description variables
descripWrapper = document.querySelector('#description');
descripForm = document.querySelector('#description__form');
descriptionbtn = document.querySelector('#submit_description');
SkipBtn = document.querySelector('#skipbtn');



document.addEventListener('DOMContentLoaded', function() {

    // opening and closing navbar
    const openMenu = document.querySelector("#openmenu");
    const closeMenu = document.querySelector("#closemenu");

    openMenu.addEventListener("click", openAndClose, false);
    closeMenu.addEventListener("click", openAndClose, false);



    // taskfrom eventlistener
    taskForm.addEventListener('submit', e => {
        let taskInput = taskForm['taskinput'];

        if (taskInput.value !== "") {
        // preventing default process
            e.preventDefault();

        // taskform input
        



        // validating if input has data.
       

            // input task inputdata
             data = {
                id: new Date().getTime(),
                taskInput:taskInput.value,
                isCompleted: false
            };

            // console.log(data);
            // push data to the empty array taskData
            taskDatas.push(data);

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

        let DescripInput = descripForm['description'];
        console.log(DescripInput);

        //  DescripValue = DescripInput.value;
        e.preventDefault();


        if ( DescripInput !== "" && e.target.contains(descriptionbtn)) {

            data.DescripInput = DescripInput.value;

            console.log(data);

            if (descripForm) {
                descripWrapper.classList.remove('navbar_active');
            } 
            addTask();
            descripForm.reset();

        }
        

    });



    SkipBtn.addEventListener('click', e=>{
        if (e.target.contains(SkipBtn)){
            e.preventDefault();
                addTask();
                descripForm.reset();
                if (SkipBtn) {
                    descripWrapper.classList.remove('navbar_active');
                } 
        }
                

    })



    // taskList.addEventListener('click',removeTask)





});


// addTask(data)

function addTask() {

    const taskList = document.querySelector('#tasklistwrapper');
    taskList.innerHTML += ` <div class="hero__appwrapper__tasklistwrapper__card">

                                <a  onclick="editTask(event)" class="hero__appwrapper__tasklistwrapper__taskcard" href="#">${data.taskInput}</a>

                                <div class="hero__appwrapper__tasklistwrapper__icons">
                                    <i class="lni lni-checkbox"></i>
                                    <i class="lni lni-pencil-alt"></i>
                                    <i class="lni lni-trash deletedItem" id"deletetask" onclick="removeTask(event)"></i>
                                </div>

                            </div>
                            
                    <section class="description" id="updatelist">
                    <form class="description__wrapper" id="updateform">
                        <h3 class="description__title">Update Your Task </h3>

                        <div class="inputcontainer">
                            <input class="app_input" type="text" id="taskinput" name="taskinput" value="${data.taskInput}">
                        </div>

                        <div class="description_container">
                            <textarea class="description__input" name="description" id="description" cols="40" rows="12" value="${data.DescripInput}"></textarea>
                        </div>
                        <div class="description__footer">
                            <input class="app_btn" type="submit" value="CONFIRM DESCRIPTION" id="submit_description">
                            <a href="" class="description__skip" id="skipbtn">SKIP</a>
                        </div>
                    </form>
                </section>
                            
                            `;
}

function removeTask(event){
       event.target.parentElement.parentElement.remove();
}

function editTask(event) {

    let updatelist = document.querySelector('#updatelist');

    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.add('navbar_active');
        
    }
}







// navbar bar functionalites 

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

