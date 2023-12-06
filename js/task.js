                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                 


const taskSubmit  = document.querySelector('#task-submit'),
   taskReset      = document.querySelector('#task-reset'),
   taskHeaderNote = document.querySelector('input#task-header-note'),
   addTaskForm    = document.querySelector('#add-task-form'),
   addTaskFormLs  = document.querySelector('#add-task-form-list'),
   allTask        = document.querySelector('#all-task'),
   taskDashboard  = document.querySelector('#task-dashboard'), 
   taskRemove     = document.querySelector('#task-remove'),
   taskSearch     = document.querySelector('#task-search-input'),
   taskTabButton  = document.querySelectorAll('#task-tab-button button')

window.addEventListener('DOMContentLoaded', function () {
   allTask.innerHTML = TASK.setHtml()
   taskDashboardSet()
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
      const datax  = taskCollect(addTaskFormLs)
      if ( datax.length == 0) return alert('Empty Data !')
      else if (datax.length > 0) {
         let IDX           = new Date().getTime(),
            taskProgress   = JSON.parse(localStorage.getItem('taskProgress'))
         // return console.log(taskProgress)
         if (taskProgress.status == 'edit' && confirm('Update ?')) IDX = taskProgress.ID
         else if (taskProgress.status == 'add' && confirm('Save ?')) IDX = new Date().getTime()
         else return
         const taskStatus  = TASK.create(datax, IDX, taskHeaderNote.value)
         if (!taskStatus) return alert('Update Failed !')
         localStorage.setItem('TASK', JSON.stringify(TASK.allData))
         window.location.reload()
      }
   }
   taskReset.onclick = function () {
      if (!confirm('Reset ?')) return
      addTaskReset()
   }
   taskRemove.onclick = function () {
      const data = JSON.parse(localStorage.getItem('taskProgress'))
      if (data.status != 'edit') return alert('Error')
      let i = TASK.remove(data.ID)
      if (!i) return
      localStorage.setItem('TASK', JSON.stringify(TASK.allData))
      window.location.reload()
   }
   taskSearch.onkeyup = function () {
      const value = this.value.toUpperCase()
      document.querySelectorAll('.task-list-grup').forEach(grup => {
         let param = false
         grup.querySelectorAll('span, p').forEach(child => {
            if (child.textContent.toUpperCase().indexOf(value) >= 0) param = true
         })
         if (!param) return grup.classList.add('dis-none')
         return grup.classList.remove('dis-none')
      })
   }
   taskTabButton.forEach(button => {
      button.onclick = function () {
         const type = this.dataset.type.toUpperCase()
         document.querySelectorAll('.task-list-grup').forEach(grup => {
            if (type == 'ALL') return grup.classList.remove('dis-none')
            if (grup.dataset.type.toUpperCase() == type) return grup.classList.remove('dis-none')
            return grup.classList.add('dis-none')
         })
      }
   })
})

function addTaskReset () {
   addTaskFormLs.innerHTML = ``
   taskHeaderNote.value    = ``
   taskRemove.classList.add("dis-none")
}

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

function taskDashboardSet () {
   const data = TASK.getProgress()
   if (!data) return taskDashboard.classList.add('dis-none')
   if (data.progress.length >= 1) {
      taskDashboard.classList.add('bg-red')
      return taskDashboard.querySelector('span').textContent = data.progress.length + ' Task to Complete'
   }
   return taskDashboard.querySelector('span').textContent = 'All Task Complete'
}

function taskSeeDetail (IDX) {
   console.log(IDX)
   addTaskReset()
   const task  = TASK.allData.find(({ID}) => ID == IDX)
   if (!task) return alert('Undefined ID')
   taskHeaderNote.value = task.header
   task.data.forEach(tx => {
       createTask(addTaskFormLs, tx.note, tx.progress)
   })
   localStorage.setItem('taskProgress', JSON.stringify({
      status   : 'edit',
      ID       : IDX
   }))
   taskRemove.classList.remove("dis-none")
   document.querySelector('#to-task-form').click()
}