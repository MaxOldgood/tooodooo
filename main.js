const DIV_WITH_HIGH_PRIORITY_FORM = document.getElementById("first-form");
const DIV_WITH_LOW_PRIORITY_FORM = document.getElementById("second-form");


const HIGH_PRIORITY_FORM = document.getElementById("add-high-task-form");
const LOW_PRIORITY_FORM = document.getElementById("add-low-task-form");

const INPUT_OF_HIGH_PRIORITY_FORM = document.getElementById("add-high-task-input");
const INPUT_OF_LOW_PRIORITY_FORM = document.getElementById("add-low-task-input");


const NEW_TASK_TEMPLATE = document.getElementById("new-task-template"); 
const REMOVE_TASK_BUTTON = document.getElementsByClassName("delete-task-button");

const TASK_LIST = (parseTask() === null)? [] : parseTask();
window.addEventListener('load',render);

console.log(TASK_LIST);
const STATUS = {
    TODO: "To do",
    IN_PROGRESS: "in progress",
    DONE: "Done",
};
const PRIORITY = {
    HIGH: "High priority",
    LOW: "Low priority",
};
HIGH_PRIORITY_FORM.addEventListener("submit", addTask);
LOW_PRIORITY_FORM.addEventListener("submit", addTask);


function addTask() {
    let priorityBlock;

    if (event.currentTarget.id ==="add-high-task-form") {
        priorityBlock = "high";
    } else {
        priorityBlock = "low";
    }

    const TASK_TO_ADD = {};
    if (priorityBlock==="high") {
    TASK_TO_ADD.NAME = INPUT_OF_HIGH_PRIORITY_FORM.value;
    TASK_TO_ADD.PRIORITY = PRIORITY.HIGH;
    } else {
        TASK_TO_ADD.NAME = INPUT_OF_LOW_PRIORITY_FORM.value;
        TASK_TO_ADD.PRIORITY = PRIORITY.LOW;
    }
    TASK_TO_ADD.STATUS = STATUS.TODO;
    TASK_LIST.push(TASK_TO_ADD);
    INPUT_OF_HIGH_PRIORITY_FORM.value = "";
    INPUT_OF_LOW_PRIORITY_FORM.value = "";
    render();
    event.preventDefault();
};

function removeTask() {
    let thisButton = event.currentTarget;
    let divWithTaskToRemove = thisButton.parentNode;
    let taskToRemoveName = divWithTaskToRemove.firstElementChild.value;
    let taskToRemoveIndex = TASK_LIST.findIndex(item => item.NAME===taskToRemoveName);
    TASK_LIST.splice(taskToRemoveIndex, 1);
    render();
    event.preventDefault();
};

function statusChange() {
    let thisCheckbox = event.currentTarget;
    let TasToChangeStatuskName = thisCheckbox.previousElementSibling.value;
    let taskToChangeStatus = TASK_LIST.find(item => item.NAME===TasToChangeStatuskName);
    taskToChangeStatus.STATUS = (thisCheckbox.checked)? STATUS.DONE : STATUS.TODO;
    render();
};

function parseTask(){
    let taskFromStorage = localStorage.getItem('tasks');
    return JSON.parse(taskFromStorage);
    };

function render () {
    let dives = document.querySelectorAll(".added-task");
        for (let div of dives) {
            div.remove();
        };
    for (let tasks of TASK_LIST){
        let newTask = NEW_TASK_TEMPLATE.content.cloneNode(true);
        const OUTPUT_FOR_NEW_TASK_NAME = newTask.querySelector(".task-name");
        OUTPUT_FOR_NEW_TASK_NAME.value = tasks.NAME;

        if (tasks.PRIORITY === PRIORITY.HIGH) {
            DIV_WITH_HIGH_PRIORITY_FORM.after(newTask);
        } else {
            DIV_WITH_LOW_PRIORITY_FORM.after(newTask);
        };
        const TASK_CHECKBOX = OUTPUT_FOR_NEW_TASK_NAME.nextElementSibling;
        if (tasks.STATUS == STATUS.DONE) {
            TASK_CHECKBOX.setAttribute("checked","");
        }
    }
    let localStorageTasks = JSON.stringify(TASK_LIST);
    localStorage.setItem("tasks",localStorageTasks); 
};