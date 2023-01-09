// initializing variables from DOM
let addTaskBtn = document.getElementById('add-list-btn');
let taskInput = document.getElementById('input-task');
let todoList = document.querySelector('ul');
let resetBtn = document.getElementById('reset-btn');
let taskLi;

let todoObjList = JSON.parse(localStorage.getItem('tasks')) || [];
console.log(todoObjList);

renderTasks();

resetBtn.addEventListener('click', resetList);

function renderTasks(){
    todoList.innerHTML = '';
    for (let i = 0; i<todoObjList.length; i++){
        let task = todoObjList[i];
         // Creating the new li for the task
        let taskLi = document.createElement('li');

        // create DIV for checkbox and task text
        let taskDiv = document.createElement('div');
        taskDiv.className = "task-div"

        // Adding checkbox 
        let checkBox = document.createElement('input');
        // checkBox=`<input type="checkbox" onchange="toggleCheckBox(${task.id})" id="task-${task.id}>`
        console.log(checkBox)
        checkBox.type='checkbox';
        checkBox.checked = task.completed;

        checkBox.onchange=()=>{toggleCheckBox(task.id)}

            // Adding checkbox toggle functoin to update completion
        // checkBox.onchange=`toggleCheckBox(${task.id})` ;
        // checkBox.addEventListener('change', function(){
        //     toggleCheckBox(task.id);
        // });
        taskDiv.appendChild(checkBox)

        // Adding the task text 
        let labelText = document.createElement('label')
        labelText.innerHTML = task.text;
        if (checkBox.checked){
            labelText.className = 'complete-text';
        } else{
            labelText.className='';
        }
        taskDiv.appendChild(labelText);
        

        // Adding the DIV to the li
        taskLi.appendChild(taskDiv);


        // Adding remove button
        removeBtnDiv = document.createElement('div');
        removeBtnDiv.className="remove-div";
        removeBtn = document.createElement('button');
        removeBtn.className='remove-btn';
        removeBtn.innerHTML = 'Remove';
        removeBtn.addEventListener('click', function(){
            removeTask(task.id);
        })
        removeBtnDiv.appendChild(removeBtn)
        taskLi.appendChild(removeBtnDiv);
        

        // Adding the new li to the big ul
        todoList.appendChild(taskLi);
    }
    updateResetBtnStyle();
}

function addTask(e){

    // preventing deafult event
    e.preventDefault();

    // creating a new object for the new task (and empty input text field)
    if (!taskInput.value==''){
        const task = {
            id: Date.now(),
            text: taskInput.value,
            completed: false,
          };
        taskInput.value='';
        console.log(task);
    
        // adding the new task to the big list of all the objects
        todoObjList.push(task);
        console.log(todoObjList);
        localStorage.setItem('tasks', JSON.stringify(todoObjList));
        //{{ console.log(localStorage.getItem('tasks'));
    } else{
        alert('Please fill in a new task.')
    }
    
    renderTasks();
}

function removeTask(id){
    const taskIndex = todoObjList.findIndex(function (task) {
        return task.id === id;
      });
    if(todoObjList[taskIndex].completed){
        todoObjList.splice(taskIndex, 1);
        renderTasks();
        localStorage.setItem('tasks',JSON.stringify(todoObjList));
    } else{
        alert('Please complete the task first.')
    }

}

function toggleCheckBox(id){
    for(let i=0; i<todoObjList.length; i++){
        if (todoObjList[i].id == id){
            todoObjList[i].completed = !todoObjList[i].completed;
        }
    }
    localStorage.setItem('tasks',JSON.stringify(todoObjList));  
    renderTasks();  
}

function updateResetBtnStyle(){
    if(todoObjList.length>0){
        resetBtn.style.border = "1px #dc0000 solid";
        resetBtn.style.backgroundColor = 'white';
        resetBtn.style.color='#dc0000'
    } else{ 
        resetBtn.style.backgroundColor = 'grey';
        resetBtn.style.color = 'white';
        resetBtn.style.border='0px';
    }
}

function resetList(){
    todoObjList = []
    localStorage.setItem('tasks',JSON.stringify(todoObjList));
    todoObjList = JSON.parse(localStorage.getItem('tasks')) || [];
    renderTasks();
}
