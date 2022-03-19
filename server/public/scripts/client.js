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

function renderTasks(tasks){
    console.log('in renderTasks');
    $('#viewTasks').empty();

    for(let i = 0; i < tasks.length; i++) {
        let task = tasks[i];
        
        
        // if (koala.ready_to_transfer === true) {
        //   $('#viewKoalas').append(`
        //   <tr data-id=${koala.id}>
        //     <td>${koala.name}</td>
        //     <td>${koala.gender}</td>
        //     <td>${koala.age}</td>
        //     <td class="green">${koala.ready_to_transfer}</td>
        //     <td>${koala.notes}</td>
        //     <td>
        //       <button class="deleteBtn">DELETE Koala</button>
        //     </td>
        //   </tr>
        // `);
        // } 
        // else {
        $('#viewTasks').append(`
          <tr data-id=${task.id}>
            <td>${task.task}</td>
            <td>${task.description}</td>
            <td class="incomplete">${task.status}</td>
            <td>
              <button class="deleteBtn">DELETE TASK</button>
              <button class="markCompletedBtn">COMPLETED</button>
            </td>
          </tr>
        `);
        }
      }
//     }
    
// }