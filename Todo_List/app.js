

const clearbtn = document.querySelector('#clearbtn');
const taskForm = document.querySelector("#taskform");
const deleteTask = document.querySelector(".deletedItem");


let totaltask = document.getElementById('totaltask');
let completedtaskpop = document.getElementById('completedtaskpop');


// let taskDatas=[];
let deletedData = []
let reverted = [];
let completeddata = [];
let comtask = {};

let deletedata = {};



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


// add task variables 
let tasktab = document.querySelector('#DefaultTab');
const taskContent  = document.querySelector('#addtask');


//  completed task variables
const completednav = document.getElementById('completednav');
const completedtaskid = document.getElementById('completedtaskcontent');

// trash task variables 
const trashcontent = document.querySelector('#trashcontent');
let trashnav = document.querySelector('#trashnav');

taskDatas = JSON.parse(localStorage.getItem("tasklist")) || [];
    if(localStorage.getItem("tasklist")){
        taskDatas.map((data)=>{
            addTask(data); 
            countTask();
    
        });
    }
    
    completeddata = JSON.parse(localStorage.getItem("completedtask")) || [];

    if(localStorage.getItem("completedtask")){
        completeddata.map((comtask) => {
            addcompletedTask(comtask);
            countTask();
            
           
        })
    }

    deletedData = JSON.parse(localStorage.getItem("deletedlist")) || [];

    if(localStorage.getItem("deletedlist")){
        deletedData.map((deletedata) => {
            trashTask(deletedata)
            countTask();
           
        })
    }

  


document.addEventListener('DOMContentLoaded', function() {

    const clearbtn = document.querySelector('#clearbtn');
    clearbtn.addEventListener('click',e=>{
        localStorage. clear()
        window.location.reload();

    })
        

    

    checkcounfig()

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

        e.preventDefault();
        if (e.target.contains(SkipBtn)){
            let dateposted = new Date();
            data.DescripInput = '';
            data.SubTimeandDate = dateposted;

            taskDatas.push(data)
            localStorage.setItem("tasklist", JSON.stringify(taskDatas));

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





    tasktab.addEventListener('click', NavActived);

    completednav.addEventListener('click',NavActived);

    trashnav.addEventListener('click',NavActived);
    defaultnav()
    

    
    
   

});

 function NavActived(event){

    

    if (event.target === trashnav){
        addcontent(trashnav,completednav,tasktab,trashcontent,taskContent,completedtaskid);
        localStorage.setItem('storednav','trashnav');
    }else if(event.target === completednav){
        addcontent(completednav,trashnav,tasktab,completedtaskid,trashcontent,taskContent);
        localStorage.setItem('storednav','completednav');
    }else if(event.target === tasktab){
        addcontent(tasktab,completednav,trashnav,taskContent,completedtaskid,trashcontent);
        localStorage.setItem('storednav','tasktab');
    }

    openAndClose(event)
   
 }


 function defaultnav(){
    if ( localStorage.getItem('storednav') === null){
        tasktab.classList.add('active__tab');
        taskContent.classList.add('active-content');
        
    }else if ( localStorage.getItem('storednav') === 'trashnav') {
        addcontent(trashnav,completednav,tasktab,trashcontent,taskContent,completedtaskid);
       

    }else if (localStorage.getItem('storednav') === 'completednav'){
        addcontent(completednav,trashnav,tasktab,completedtaskid,trashcontent,taskContent);
       
    }else if (localStorage.getItem('storednav') === 'tasktab'){
        addcontent(tasktab,completednav,trashnav,taskContent,completedtaskid,trashcontent);
       
    }
    
   
    
}
   
    function addcontent(tagcontent,otheercontent,secotheercontent,tagnewele,existingeleone,existingeletwo){
        tagcontent.classList.add('active__tab');
        otheercontent.classList.remove('active__tab');
        secotheercontent.classList.remove('active__tab');
        tagnewele.classList.add('active-content')
        existingeleone.classList.remove('active-content')
        existingeletwo.classList.remove('active-content')
       
    }




function addTask(data) {

    console.log(data.taskInput)
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
                }else if(hours > 1 && hours <= 24 ){
                    whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(hours).toFixed(0) + ' ' + 'hours ago'
                }else if(hours > 24 && days == 1 ){
                    whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(days).toFixed(0) + ' ' + 'day ago'
                }else if(days > 1){
                    whenposted.innerHTML  = '<i class="fas fa-clock"></i>' + ' ' + parseFloat(days).toFixed(0) + ' ' + 'days ago'
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

    uniTaskId = comTarget.closest("li").id;

    let comParent = comTarget.parentElement

    let task = comParent.previousElementSibling;

    data.isCompleted = !data.isCompleted;


    if(data.isCompleted){

        task.removeAttribute("contentditable");
        comTarget.setAttribute("checked","")

        // let comtask = taskDatas.find((data) => data.id == parseInt(uniTaskId));
      

        let completedTime = new Date();
        comtask.SubTimeandDate=completedTime,
        sendDatas(completeddata,"completedtask",comTarget,taskDatas,"tasklist",comtask);

        addcompletedTask(comtask);
        
       

        task.classList.add('completedtaskcss');

        comTarget.className = 'lni lni-checkmark-circle';

        countTask()

        window.location.reload();
        
    }

}



function addcompletedTask(comdata){

    let completedList = document.querySelector('#completedlistwrapper');
    let completedcard = document.createElement("li");
    
    if(comdata){

            completedcard.setAttribute("id",comdata.id);

        
            const completeMarkup = `
                <div class="hero__appwrapper__tasklistwrapper__card">
                <a   class="hero__appwrapper__tasklistwrapper__taskcard" id="comtaskcard" href="#">${comdata.taskInput}</a>

                <div class="hero__appwrapper__tasklistwrapper__icons">
                    <i class="fas fa-exchange-alt" onclick="reverttask(event)" completed-id="${comdata.id}"></i>
                    <i class="lni lni-trash deletedItem" id"deletecomptask" onclick="removecompTask(event)"></i>
                </div>

                </div>`;

            completedcard.innerHTML = completeMarkup;
            completedList.appendChild(completedcard);
       
    }
      

}


function trashTask(deleted){

    let trashList = document.querySelector('#trashlistwrapper');
    let trashcard = document.createElement("li");
    
    if(deleted){

        trashcard.setAttribute("id",deleted.id);

            const trashMarkup = `
                <div class="hero__appwrapper__tasklistwrapper__card">
                <a   class="hero__appwrapper__tasklistwrapper__taskcard" id="trashcard" href="#">${deleted.taskInput}</a>

                <div class="hero__appwrapper__tasklistwrapper__icons">
                    <i class="fas fa-exchange-alt" onclick="reverttrash(event)" completed-id="${deleted.id}"></i>
                </div>

                </div>`;

                trashcard.innerHTML = trashMarkup;
                trashList.appendChild(trashcard);
       
    }
      

}


function reverttrash(event){

    let trashtarget = event.currentTarget;
    sendDatas(taskDatas,"tasklist",trashtarget,deletedData,"deletedlist",data);
    addTask(data);
    countTask()
    window.location.reload(); 

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
        if (event.currentTarget.id === "closemenu" ||  event.currentTarget === trashnav  || event.currentTarget === tasktab || event.currentTarget === completednav) {
            navLinks.classList.remove('navbar_active');
        }
        
    }

}


function countTask(){
        totaltask.innerHTML = taskDatas.length ;
        completedtaskpop.innerHTML = completeddata.length;
        checkcounfig()
}

 

function checkcounfig(){

    if(totaltask.innerHTML == 0 ){
        totaltask.classList.add('deactivate');
    }
     if(completedtaskpop.innerHTML == 0 ){
        completedtaskpop.classList.add('deactivate');
    }
    
     if (totaltask.innerHTML >= 1 && completedtaskpop.innerHTML >= 1 ){
        totaltask.classList.remove('deactivate');
        completedtaskpop.classList.remove('deactivate');
    }
   
}



function reverttask(event){

    let completedtarget = event.currentTarget;
    revertedid = completedtarget.getAttribute("completed-id")
   
    // const revertdata = completeddata.find((comdata) => comdata.id === parseInt(revertedid) );
    sendDatas(taskDatas,"tasklist",completedtarget,completeddata,"completedtask",data);
    countTask()
    window.location.reload(); 
}



function removecompTask(event){
    let deletingicon =  event.target
    sendDatas(deletedData,"deletedlist",deletingicon,completeddata,"completedtask",deletedata);
    trashTask(deletedata)
    document.getElementById(uniTaskId).remove();
    countTask()
}




function removeTask(event){
    
    let targetEle = event.currentTarget
    let ParentEle = targetEle.parentElement.parentElement
    uniTaskId = targetEle.closest("li").id;

    if(targetEle.classList.contains("deletedItem") || ParentEle.classList.contains("deletedItem")){

        sendDatas(deletedData,"deletedlist",targetEle,taskDatas,"tasklist",deletedata);
        document.getElementById(uniTaskId).remove();
        trashTask(deletedata)
        countTask()

    }
}




function sendDatas(filestore,filestring,tarrgetel,dataorigin,dataoriginstring,newdata){

    uniTaskId = tarrgetel.closest("li").id;

     newdata = dataorigin.find((data) => data.id == parseInt(uniTaskId));

    filestore.push(newdata);
    localStorage.setItem(filestring,JSON.stringify(filestore));

    dataorigin = dataorigin.filter((data) => data.id !== parseInt(uniTaskId));
    localStorage.setItem(dataoriginstring,JSON.stringify(dataorigin));

}





