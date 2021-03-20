// global scope

const clearbtn = document.querySelector('#clearbtn');
const taskForm = document.querySelector("#taskform");
// const editTask = document.querySelector("#edittask");
const deleteTask = document.querySelector(".deletedItem");
const completeTask = document.querySelector("#checktask");


const updateform = document.querySelector("#updateform");

let data = {};


   


// description variables
descripWrapper = document.querySelector('#description');

descripForm = document.querySelector('#description__form');

descriptionbtn = document.querySelector('#submit_description');

SkipBtn = document.querySelector('#skipbtn');



document.addEventListener('DOMContentLoaded', function() {

    


    let taskDatas = JSON.parse(localStorage.getItem("tasklist")) || [];

    if(localStorage.getItem("tasklist")){
        taskDatas.map((data)=>{
            addTask(data); 
        });
    }


 

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

            
                    localStorage.setItem("tasklist", JSON.stringify(taskDatas));

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
        
        
        e.preventDefault();

        if ( DescripInput !== "" && e.target.contains(descriptionbtn)) {

            data.DescripInput = DescripInput.value;
        

            if (descripForm) {
                descripWrapper.classList.remove('navbar_active');
            } 
            addTask(data);
            descripForm.reset();
        }
        
    });


    SkipBtn.addEventListener('click', e=>{
        if (e.target.contains(SkipBtn)){
            e.preventDefault();
                addTask(data);
                descripForm.reset();
            descripWrapper.classList.remove('navbar_active');    
        }
                

    })


});


function addTask(data) {

    const taskList = document.querySelector('#tasklistwrapper')

    const taskcard = document.createElement("li");
    taskcard.setAttribute("id",data.id);

    const TaskMarkup = `<div class="hero__appwrapper__tasklistwrapper__card">
                                <a onclick="editTask(event)" ${!data.isCompleted?"contentditable":""} class="hero__appwrapper__tasklistwrapper__taskcard" href="#">${data.taskInput}</a>

                                <div class="hero__appwrapper__tasklistwrapper__icons">
                                    <i class="lni lni-checkbox" id="${data.taskInput}-${data.id}"></i>
                                    <i  onclick="editTask(event)" class="lni lni-pencil-alt"></i>
                                    <i class="lni lni-trash deletedItem" id"deletetask" onclick="removeTask(event)"></i>
                                </div>

                            </div>`;

     taskcard.innerHTML = TaskMarkup;
     taskList.appendChild(taskcard);
}


function editTask(event,data) {

    const uniTaskId = event.currentTarget.closest("li").id;
    let updatelist = document.querySelector('#updatelist');

    let inputdata = JSON.parse(localStorage.getItem("tasklist"));
    inputdata.forEach( (obj) => {

       console.log( obj.taskInput);
       updateform['updatedinput'].value = obj.taskInput
       updateform['updateddescription'].innerHTML= obj.DescripInput
    //    updateform['']

    });
    console.log(data);
    

    
    // updateform['updateddescription'].innerHTML = 


    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.add('navbar_active');
        
    }
}



function updateTask(event,el,){

    event.preventDefault();

    let updatedTitle = document.querySelector('#updatedinput');
    let updateDescrip = document.querySelector('#updateddescription');

    data.taskInput = updatedTitle.value;
    data.DescripInput = updateDescrip.value; 

    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.remove('navbar_active'); 
    }

  
}



function removeTask(event){
       event.target.parentElement.parentElement.remove();
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


