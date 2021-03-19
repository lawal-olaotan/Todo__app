// global scope

const clearbtn = document.querySelector('#clearbtn');
const taskForm = document.querySelector("#taskform");
// const editTask = document.querySelector("#edittask");
const deleteTask = document.querySelector(".deletedItem");
const completeTask = document.querySelector("#checktask");


const updateform = document.querySelector("#updateform");


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

            

            if (typeof e !== "undefined" && e.currentTarget !== "undefined") {
                if (taskForm) {
                    descripWrapper.classList.add('navbar_active');
                }
            }
        } else {
            alert('Input A task');
        }
        taskForm['taskinput'].focus();
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

    

   
   

});



function addTask(data) {

    
    const taskcard = document.createElement("li");
    taskcard.setAttribute("id",data.id);

  const TaskMarkup = ` <div class="hero__appwrapper__tasklistwrapper__card">

                                <a onclick="editTask(event)" ${!task.isCompleted?"contentditable":""} class="hero__appwrapper__tasklistwrapper__taskcard" href="#">${data.taskInput}</a>

                                <div class="hero__appwrapper__tasklistwrapper__icons">
                                    <i class="lni lni-checkbox" id="${data.taskInput}-${data.id}"></i>
                                    <i  onclick="editTask(event)" class="lni lni-pencil-alt"></i>
                                    <i class="lni lni-trash deletedItem" id"deletetask" onclick="removeTask(event)"></i>
                                </div>

                            </div>

    <section class="description" id="updatelist">
        <form class="description__wrapper" id="updateform" onsubmit="updateTask(event)">
            <h3 class="description__title">Update Your Task </h3>

            <div class="inputcontainer updatecontainer">
                <input class="app_input" type="text" id="updatedinput" name="taskinput" value="${data.taskInput}">
            </div>
                <textarea class="description__input" name="description" id="updateddescription" cols="40" rows="12">${data.DescripInput}</textarea>
        
            <div class="description__footer">
                <input class="app_btn" type="submit" value="Update Task" id="submit_update" >
                <a  onclick="closeupdate(event)" href="" class="description__skip" id="closeupdatebtn">Cancel</a>
            </div>
        </form>
    </section>`;

     taskcard.innerHTML = TaskMarkup;
     taskList.appendChild(taskcard);


}



function updateTask(event,el,TaskID){

    event.preventDefault();

    let updatedTitle = document.querySelector('#updatedinput');
    let updateDescrip = document.querySelector('#updateddescription');

    data.taskInput = updatedTitle.value;
    data.DescripInput = updateDescrip.value; 

  console.log(event.currentTarget);
  console.log(data);
   
    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.remove('navbar_active'); 
    }
  
}

function removeTask(event){
       event.target.parentElement.parentElement.remove();
}

function editTask(event) {

    let updatelist = document.querySelector('#updatelist');
    const TaskID = event.target.closest("a").id ;
    
    updateTask(event,el,TaskID);


    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.add('navbar_active');
        
    }
}

function closeupdate(event){

    event.preventDefault()
    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.remove('navbar_active');
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


