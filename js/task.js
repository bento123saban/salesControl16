                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 


const taskSubmit  = document.querySelector('#task-submit'),
   taskReset      = document.querySelector('#task-reset'),
   taskHeaderNote = document.querySelector('.task-header-note'),
   addTaskForm    = document.querySelector('#add-task-form'),
   allTask        = document.querySelector('#all-task')

window.addEventListener('DOMContentLoaded', function () {
   allTask.innerHTML = TASK.setHtml()
   document.querySelectorAll('.add-task').forEach(add => {
      add.onclick = function () {
         let param = true, parent   = ''
         document.querySelectorAll('.task-form').forEach(form => {
            // return console.log(form)
            if (form.dataset.taskform.toUpperCase() == this.id.toUpperCase()) return parent = form
         })
         //console.log(parent)
         parent.querySelectorAll('.task-note').forEach(text => {
            if (text.value != '') return text.style.borderColor = 'darkcyan'
            param = false
            text.style.borderColor = 'red'
         })
         if (!param) return alert ('Fill all field')
         createTask(parent)
      }
   })
   taskSubmit.onclick = function () {
      if (taskHeaderNote.value == '') {
         taskHeaderNote.style.borderColor = 'red'
         taskHeaderNote.focus()
         return alert('Fill the header')
      }
      taskHeaderNote.style.borderColor = 'darkgray'
      if (!taskCheck()) return alert('Fill all field')
      const data  = taskCollect(addTaskForm)
      if ( data.length == 0) return alert('Empty Data !')
      else if (data.length > 0) {
         const taskStatus  = TASK.create(data, new Date().getTime(),taskHeaderNote.value)
         if (!taskStatus) return alert('Save Failed !')
         localStorage.setItem('TASK', JSON.stringify(TASK.allData))
         window.location.reload()
      }
   }
   taskReset.onclick = function () {
      if (!confirm('Reset ?')) return
      addTaskForm.innerHTML = `
         <label for="">addNew Task &nbsp;<i class="fas fa-plus add-task" id="task-add-form"></i></label>
         <div class="task-header">
            <span for="">Header :</span>
            <input type="text" class="task-header-note">
         </div>
         <div class="task-grup">
            <input type="checkbox" class="task-check optional">
            <input type="text" class="task-note">
            <i class="fas fa-trash" onclick="removeTask(this);"></i>
         </div>
      `
   }
})

function taskCheck () {
   let param   = true
   addTaskForm.querySelectorAll('.task-grup .task-note').forEach(note => {
      if (note.value != '') return note.style.borderColor = 'darkcyan'
      note.style.borderColor = 'red'
      param = false
   })
   return param
}

function createTask (parent, task = '', check = false) {
   const newElement     = document.createElement('div')
   newElement.classList.add('task-grup')
   
   const checkElement   = document.createElement('input')
   checkElement.type    = 'checkbox'
   checkElement.checked = check
   checkElement.classList.add('task-check')
   checkElement.classList.add('optional')
   newElement.appendChild(checkElement)
   
   const textElement    = document.createElement('input')
   textElement.type     = 'text'
   textElement.value    = task
   textElement.classList.add('task-note')
   newElement.appendChild(textElement)
   
   const delElement     = document.createElement('i')
   delElement.onclick   = function () {removeTask(this)}
   delElement.classList.add('fas')
   delElement.classList.add('fa-trash')
   newElement.appendChild(delElement)
   
   return parent.appendChild(newElement)
}

function removeTask (param) {
   if (confirm('Remove ?')) return param.parentElement.remove()
}

function taskCollect (form) {
   let array = []
   if (!form) return alert('Error')
   form.querySelectorAll('.task-grup').forEach(grup => {
      array.push({
         progress : grup.querySelector('.task-check').checked,
         note     : grup.querySelector('.task-note').value
      })
   })
   return array
}