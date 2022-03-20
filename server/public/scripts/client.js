console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  // click-listener for the ADD TASK button, will call that function
$('#addTaskBtn').on('click', addTask);

// click listener for the MARK COMPLETED buttons, will call markCompleted function
$('body').on('click', '.markCompleteBtn', changeStatus);

// click-listener for the DELETE buttons, will call deleteTask function
$('body').on('click', '.deleteBtn', deleteTask);

// get the tasks from the DB upon load and render them to the DOM 
getTasks();

}); // end doc ready

// function to get the tasks from the DB and render them to the DOM
function getTasks(){
    console.log('in getTasks');
// AJAX GET request to get tasks    
    $.ajax({
    method: 'GET',
    url: '/tasks'
    }).then(function(tasks) {
    // call the function to render the tasks to the DOM  
    renderTasks(tasks);
    }).catch(function (err) {
    console.log(err);
    })

} // end getTasks function

// function to render the tasks to the DOM
function renderTasks(tasks){
    console.log('in renderTasks');
    // empties out the old data
    $('#viewTasks').empty();

    // for loop to render the list of tasks
    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        
        // conditional to determine how each task will be rendered
        // if task is 'true' (completed), it's row will be the '.complete' class and have a green background
        // in the status column, the task will be designated 'COMPLETE'
        // it will have a button to delete it from the DB and the DOM
        if (task.status === true) {
          $('#viewTasks').append(`
          <tr class="complete" data-id=${task.id}>
            <td class="tabData">${task.task}</td>
            <td class="tabData">${task.description}</td>
            <td class="tabData">COMPLETE</td>
            <td class="tabData">
              <button class="deleteBtn btn btn-dark">Delete Task</button>
            </td>
            <td class="tabData">
            </td>
          </tr>
        `);
        } 
        // if the task is 'false' (incomplete), it's row will be the '.incomplete' class and have a red background
        // in the status column, the task will be designated 'INCOMPLETE'
        // it will have a button to delete it from the DB and the DOM, as well as a button to change it's status to 'complete'
        else {
        $('#viewTasks').append(`
          <tr class="incomplete" data-id=${task.id}>
            <td class="tabData">${task.task}</td>
            <td class="tabData">${task.description}</td>
            <td class="tabData">INCOMPLETE</td>
            <td class="tabData">
              <button class="deleteBtn btn btn-dark">Delete Task</button>
            </td>  
            <td class="tabData">
              <button class="markCompleteBtn btn btn-success">Mark Complete</button>
            </td>
          </tr>
        `);
        }
      }
    }
    
// functionto add a task to the DB
function addTask(){
    console.log('in addTask');
// using jQuery to create variables with string values that are the text in the inputs    
let task = $('#taskIn').val();
let description = $('#descriptionIn').val();
// each task added will have a default status of 'incomplete'
let status = 'Incomplete'


// create the object to send in the AJAX request, with the values of variables
let taskToSend = {
    task: task,
    description: description,
    status: status
}
    console.log(taskToSend);
    // empty the inputs on the DOM
    $('#taskIn').val('');
    $('#descriptionIn').val('');
    $.ajax({
    url: '/tasks',
    method: 'POST',
    data: taskToSend
    }).then(function(response) {
    console.log(response);
    // call the getTasks function again so that the DOM will instantly show the newly created task
    getTasks(response);
    }).catch(function(error) {
    console.log('error in POST:', error);
    alert('ERROR ADDING TASK!')    
    })
  
  
}

// function to change the status of a task from incomplete to complete in the DB and on the DOM
function changeStatus() {
    console.log('Complete button clicked');
    // creates a taskId variable, which is the id data tag on the same row as the button
    let taskId = $(this).closest('tr').data('id')
    
    console.log('clicked Complete',taskId);
    // AJAX PUT request
    $.ajax({
      url: `/tasks/${taskId}`,
      method: 'PUT',
    
    }).then(function (response) {
      console.log('is complete!');
      // call the getTasks function to refresh the DOM to reflect the PUT
      getTasks();
    }).catch(function (err) {
      console.log(err)
    })
  }

  // function to remove a task from the DB and DOM
  function deleteTask( removedTask ){
    console.log('in deleteTask', removedTask);
    // target the ID of the task on the table row of the delete button
    let id = $(this).closest('tr').data('id');
    console.log(id);
      // AJAX DELETE request
      $.ajax({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }).then(function (response) {
        console.log('task deleted');
        // call the getTasks function to refresh the DOM to reflect the DELETE
        getTasks();
      }).catch(function(err) {
        console.log(err);
      }) 
    }
  