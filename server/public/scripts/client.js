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