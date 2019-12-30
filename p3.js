const init = () => {
//run the all tasks Function
allTasks();
//create a button to add new task; attach function
let taskBtn = document.querySelector("#newTask");
taskBtn.addEventListener("click", addTask);
}

const allTasks = () => {
  let xhr = new XMLHttpRequest();
  let url = "ToDo/allTasks.php?tasks=";
  xhr.open("GET", url, true);
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
  let returnData = xhr.responseXML;
  let task = returnData.getElementsByTagName("task");
  for(let i = 0; i < task.length; i++){
    let ourTask = task[i].childNodes[1].innerHTML;
    let taskBadge = task[i].childNodes[0].innerHTML;
    console.log(taskBadge);
    let trash = document.createElement("img");
    trash.src = "images/trash.jpg";
    trash.height = 18;
    let li = document.createElement("li");
    li.innerHTML = ourTask;
    li.appendChild(trash);
    document.querySelector("ul").appendChild(li);
    trash.addEventListener("click", function() {del(taskBadge, li);});

  }
    }
  }
  xhr.send();
}




const addTask = () => {
//store user input as a variable
let userVal = document.querySelector("#userData").value;
//alert if user enters nothing
if(userVal.length == 0){
  alert("You cannot do nothing!!!");
  document.querySelector("#upcoming").innerHTML = " ";
}
//clear input field on submit
document.querySelector("#userData").value = " ";


/*
let ul = document.querySelector("ul");
let li = document.createElement("li");
li.setAttribute("id", "item");
let trash = document.createElement("img");
trash.src = "images/trash.jpg";
trash.height = 35;
trash.setAttribute("id", "trash")
ul.appendChild(trash);
ul.appendChild(li);
*/
//ajax request
let xhr = new XMLHttpRequest();
let url = "ToDo/addTask.php?description=";
//http://localhost:8080/ToDo/allTasks.php
xhr.open("GET", url + userVal, true);
xhr.onreadystatechange = () => {
  if(xhr.readyState == 4 && xhr.status == 200){
let returnData = JSON.parse(xhr.responseText);
let trash = document.createElement("img");
trash.src = "images/trash.jpg";
trash.height = 18;
let li = document.createElement("li");
li.innerHTML = returnData.description;
li.appendChild(trash);
document.querySelector("ul").appendChild(li);
//li.innerHTML = returnData.description;


let myNum = returnData.id;
let myId = JSON.stringify(myNum);
console.log(myId);
trash.addEventListener("click", function() {del(myId, li);});
console.log(typeof(myNum));

  }
}
xhr.send();
}//end Task Function



const del = (userWaste, list) => {
  let xhr = new XMLHttpRequest();
  let url = "ToDo/deleteTask.php";
 let params = "id=" + userWaste;
  xhr.open("POST", url, true);
  xhr.setRequestHeader("Content-Type", "application/x-www-form-urlencoded");
  xhr.onreadystatechange = () => {
    if(xhr.readyState == 4 && xhr.status == 200){
  let deletedTask = JSON.parse(xhr.response);
  list.remove();
  console.log(deletedTask);
    }
  }
  xhr.send(params);
/*
 let elmnt = document.getElementById("trash");
 elmnt.remove();
 let items = document.querySelector("li");
items.remove();*/
}

window.onload = init;


//GET: get data from server. Parameters are passed in url
//POST: modify data on server. Paramerters are included in msg body

/*Allow users to add new tasks. The user should enter a task description and click the add button. The add button should then callback to the server to insert a new task. Once the new task is added to the database, the server side code will output the new task as json. Upon receiving the response, the task should be added to the list of all tasks

Allow users the ability to delete tasks. Each tasks in the list of all tasks should include a button that will remove the task from the database using server side code and remove the task from the user interface using client side code.

All of the taks on the page should be output when the page initially loads (using client side code). The server side code has a method to retrieve all tasks as xml. You should use ajax to retrieve the xml string of all tasks and output all of the tasks, using client side dhtml.*/
