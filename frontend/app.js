function addtask()

{
    const taskInput = document.getElementById('taskInput'); 
    const taskText = taskInput.value.trim(); //input after removing empyt leading/trailing zeroes

    if (!taskText) return; // Prevent empty tasks

    const tasklist =document.getElementById('tasklist'); //
    
    const taskitem =document.createElement('li');

    taskitem.textContent=taskText;
    
    taskitem.id = `task-${Date.now()}`; //unique id for task 

    taskitem.addEventListener('click',() =>toggleComplete(taskitem,id));
   
    tasklist.appendchild(taskitem)
   
    taskInput.value = '';
}

function deletetask(taskid)

{
    
}

function toggleComplete(taskitem,id)

{

}
