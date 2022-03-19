console.log( 'js' );

$( document ).ready( function(){
  console.log( 'JQ' );

  // click-listener for the ADD TASK button, will call that function
$('#addTaskBtn').on('click', addTask);

// click listener for the MARK COMPLETED buttons, will call markCompleted function
$('body').on('click', '.markCompletedBtn', markCompleted);

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