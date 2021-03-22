
const clearbtn = document.querySelector('#clearbtn');
const taskForm = document.querySelector("#taskform");
const deleteTask = document.querySelector(".deletedItem");






// let taskDatas=[];
let deletedData = []
let completeddata = [];



let uniTaskId;
let List;
   

// description variables
descripWrapper = document.querySelector('#description');
descripForm = document.querySelector('#description__form');
descriptionbtn = document.querySelector('#submit_description');
SkipBtn = document.querySelector('#skipbtn');


// application data

let data = {};
let taskDatas = []



let updateform = document.querySelector("#updateform");
let updatedInput = updateform['updatedinput'];
let updatedDesc = updateform['updateddescription'];
let updatedid = updateform['id']



 
document.addEventListener('DOMContentLoaded', function() {

    taskDatas = JSON.parse(localStorage.getItem("tasklist")) || [];
    if(localStorage.getItem("tasklist")){
        taskDatas.map((data)=>{
            addTask(data); 
            countTask();
    
        });
    }
    
    completeddata = JSON.parse(localStorage.getItem("completedtask")) || [];

    if(localStorage.getItem("completedtask")){
        completeddata.map((comtasks) => {
            countTask(comtasks);
        })
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

            let dateposted = new Date();
            data.DescripInput = DescripInput.value;
            data.SubTimeandDate = dateposted;

            taskDatas.push(data)
            localStorage.setItem("tasklist", JSON.stringify(taskDatas));

    
            if (descripForm) {
                descripWrapper.classList.remove('navbar_active');
            }

            addTask(data);
            countTask()
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


    updateform.addEventListener('submit',e => {
            e.preventDefault();
            let itemid = updatedid.value;
            let updatelist = document.querySelector('#updatelist');
            updatelist.classList.remove('navbar_active');
            updatetask(itemid); 
            window.location.reload();

    })


    let closeupdatebtn = document.querySelector('#closeupdatebtn');
    closeupdatebtn.addEventListener('click',e=>{

        updatelist.classList.remove('navbar_active');
    })



   

});


function removeTask(event){
    
    let targetEle = event.currentTarget
    let ParentEle = targetEle.parentElement.parentElement
    uniTaskId = targetEle.closest("li").id;

    if(targetEle.classList.contains("deletedItem") || ParentEle.classList.contains("deletedItem")){

        getData(deletedData,"deletedlist",targetEle);
        document.getElementById(uniTaskId).remove();
        countTask()

    }

}





function addTask(data) {

    const taskList = document.querySelector('#tasklistwrapper')

    const taskcard = document.createElement("li");
    taskcard.setAttribute("id",data.id);

    const TaskMarkup = `<div class="hero__appwrapper__tasklistwrapper__card">
                                <a onclick="editTask(event)" ${!data.isCompleted?"contentditable":""} class="hero__appwrapper__tasklistwrapper__taskcard" id="taskcards" href="#">${data.taskInput}</a>

                                <div class="hero__appwrapper__tasklistwrapper__icons">
                                    <i class="lni lni-checkbox" onclick="completetask(event)" id="${data.taskInput}-${data.id}" ${data.isCompleted ? "checked" : ""}></i>
                                    <i  onclick="editTask(event)" class="lni lni-pencil-alt"></i>
                                    <i class="lni lni-trash deletedItem" id"deletetask" onclick="removeTask(event)"></i>
                                </div>

                            </div>`;

     taskcard.innerHTML = TaskMarkup;
     taskList.appendChild(taskcard);
}



function editTask(event) {

    uniTaskId = event.currentTarget.closest("li").id;

    let whenposted = document.getElementById('time');
    let currentTime = new Date();
    currentTime = moment(currentTime);
    

    let taskDatas = JSON.parse(localStorage.getItem("tasklist"))
    taskDatas = taskDatas.filter((data) => data.id === parseInt(uniTaskId));


    if(taskDatas ){
        taskDatas.map((data)=>{

            updatedInput.value = data.taskInput;
            updatedDesc.innerHTML = data.DescripInput;
            updatedid.value= data.id;
           

            let poseTime = moment(data.SubTimeandDate);

            if(poseTime !='' && currentTime !='' ){
                let timeago = moment.duration(currentTime.diff(poseTime));
                let fewseconds = timeago.as('seconds');
                let minutes = timeago.as('minutes');
                let hours = timeago.as('hours');
                let days = timeago.as('days')

                if (fewseconds <= 60.0 ){

                    whenposted.innerHTML='<i class="fas fa-clock"></i>' + ' '  + ' Few seconds ago'
                }else if(minutes <= 60){
                       whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(minutes).toFixed(0) + ' ' + 'mins ago'
                }else if(minutes > 60 && hours == 1){
                    whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(hours).toFixed(0) + ' ' + 'hour ago'
                }else if(hours > 1 ){
                    whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(hours).toFixed(0) + ' ' + 'hours ago'
                }else if(hours > 24 && day == 1 ){
                    whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(days).toFixed(0) + ' ' + 'day ago'
                }
            }
        
        
        });
    }

    let updatelist = document.querySelector('#updatelist');
    if (typeof event !== "undefined" && event.currentTarget !== "undefined") {
        updatelist.classList.add('navbar_active');    
    }
}


function updatetask(itemid){

    let data = taskDatas.find((data) => data.id === parseInt(itemid));
    let updateddate = new Date();
    data.taskInput = updatedInput.value
    data.SubTimeandDate = updateddate;
    data.DescripInput = updatedDesc.value

    localStorage.setItem("tasklist",JSON.stringify(taskDatas));
}



function completetask(event){

    let comTarget = event.currentTarget;
    let comParent = comTarget.parentElement

    let task = comParent.previousElementSibling;

    data.isCompleted = !data.isCompleted;

    if(data.isCompleted){
        task.removeAttribute("contentditable");
        comTarget.setAttribute("checked","")
        getData(completeddata,"completedtask",comTarget);
        task.classList.add('completedtask');
        comTarget.className = 'lni lni-checkmark-circle';
        countTask()
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


function getData(filestore,filestring,tarrgetel){

    uniTaskId = tarrgetel.closest("li").id;

    filestore.push(taskDatas.filter((data) => data.id === parseInt(uniTaskId)))
        localStorage.setItem(filestring,JSON.stringify(filestore));

        taskDatas = taskDatas.filter((data) => data.id !== parseInt(uniTaskId));
        localStorage.setItem("tasklist",JSON.stringify(taskDatas));
  // document.getElementById(uniTaskId).remove();

}

function countTask(){

    let totaltask = document.getElementById('totaltask');
    let completedtask = document.getElementById('completedtask');

    totaltask.innerHTML = taskDatas.length ;
     completedtask.innerHTML = completeddata.length;

}


