console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  // click-listener for the ADD TASK button, will call that function
$('#addTaskBtn').on('click', addTask);

// click listener for the MARK COMPLETED buttons, will call markCompleted function
$('body').on('click', '.markCompleteBtn', changeStatus);

// click-listener for the DELETE buttons
$('body').on('click', '.deleteBtn', deleteTask);

getTasks();

}); // end doc ready

function getTasks(){
    console.log('in getTasks');
// AJAX request to get tasks    
    $.ajax({
    method: 'GET',
    url: '/tasks'
    }).then(function(tasks) {
    renderTasks(tasks);
    }).catch(function (err) {
    console.log(err);
    })

} // end getTasks function

function renderTasks(tasks){
    console.log('in renderTasks');
    $('#viewTasks').empty();

    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        
        
        if (task.status === true) {
          $('#viewTasks').append(`
          <tr class="complete" data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>COMPLETE</td>
            <td>
              <button class="deleteBtn">DELETE Koala</button>
            </td>
          </tr>
        `);
        } 
        else {
        $('#viewTasks').append(`
          <tr class="incomplete" data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td>INCOMPLETE</td>
            <td>
              <button class="deleteBtn">DELETE TASK</button>
              <button class="markCompleteBtn">COMPLETED</button>
            </td>
          </tr>
        `);
        }
      }
    }
    

function addTask(){
    console.log('in addTask');
let task = $('#taskIn').val();
let description = $('#descriptionIn').val();
let status = 'Incomplete'

let taskToSend = {
    task: task,
    description: description,
    status: status
}
    console.log(taskToSend);
    
    $.ajax({
    url: '/tasks',
    method: 'POST',
    data: taskToSend
    }).then(function(response) {
    console.log(response);
    getTasks(response);
    }).catch(function(error) {
    console.log('error in POST:', error);
    alert('ERROR ADDING TASK!')    
    })
}

function changeStatus() {
    console.log('Complete button clicked');
    let taskId = $(this).closest('tr').data('id')
    
    console.log('clicked Complete',taskId);
    $.ajax({
      url: `/tasks/${taskId}`,
      method: 'PUT',
    
    }).then(function (response) {
      console.log('is complete!');
      getTasks();
    }).catch(function (err) {
      console.log(err)
    })
  }

  function deleteTask( removedTask ){
    console.log('in deleteTask', removedTask);
    // target the ID of the task on the table row
    let id = $(this).closest('tr').data('id');
    console.log(id);
  
      $.ajax({
        url: `/tasks/${id}`,
        method: 'DELETE',
      }).then(function (response) {
        console.log('task deleted');
        getTasks();
      }).catch(function(err) {
        console.log(err);
      }) 
    }
  