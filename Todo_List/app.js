document.addEventListener('DOMContentLoaded', function() {

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

export default class LocalStorage {

    constructor() {
        // getting task items from local storage or returns empty array if null 
        this.tasks = JSON.parse(localStorage.getItem('tasks')) || [];
    }


    create(data) {

        // getter token to generate a token for tasklist array 
        data.token = this.token;

        // creating task item  and setting to local storage
        this.task.push(data);
        localStorage.setItem('tasks', JSON.stringify(this.tasks));
    }

    // this method will search for a task index for updating or editing
    getIndexByToken(token) {
        for (let i = 0; i < this.tasks.length; i++) {
            if (this.tasks[i].token === token) {
                return i;
            }
        }
        return -1;
    }

    get token() {
        return Math.random().toString(36).substring(2, 15) + Math.random().toString(36).substring(2, 15);
    }

}