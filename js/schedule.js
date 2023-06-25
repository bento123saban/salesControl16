                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                           


const scheduleList   = document.querySelector('#schedule-list'),
   scheduleHead      = document.querySelector('#schedule-head'),
   scheduleMonth     = new Date().toLocaleDateString(undefined, {year: 'numeric', month: 'long'}),
   scheduleSubmit    = document.querySelector('#schedule-submit'),
   scheduleTime      = document.querySelector('#schedule-time'),
   timeHead          = document.querySelector('#time-head'),
   timeSubmit        = document.querySelector('#time-submit')

// if(!confirm('exit')) window.location.reload()

window.addEventListener('DOMContentLoaded', async function () {
   scheduleList.innerHTML     = await SCHEDULE.setHtml()
   scheduleHead.dataset.text  = scheduleMonth
   
   scheduleTime.innerHTML     = await SCHEDULE.setTimeHtml()
   
   window.addEventListener('change', function (e) {
      if (e.target.matches('.schedule-select')) {
         // console.log('changes')
         const select      = e.target,
            selectedColor  = select.options[select.selectedIndex].dataset.color
            selectLabel    = select.parentElement.children[0]
         
         // console.log(selectedColor)
         selectLabel.className = 'bg-' + selectedColor.toLowerCase()
      }
   })
   
   scheduleSubmit.onclick = function () {
      if (!scheduleCheck) return
      const Data = scheduleCollect()
      if (!Data) return
      // return console.log(Data)
      SCHEDULE.save(Data)
      window.location.reload()
   }
   
   
   timeSubmit.onclick = async function () {
      let param = true, length = false
      document.querySelectorAll('.time-grup .time-code').forEach(code => {
         length = true
         code.borderColor = 'darkcyan'
         if (code.value != '') return
         param = false
         code.borderColor = 'red'
      })
      if (!param || !length) return alert('Input schedule code')
      if (!confirm('Update ?')) return
      await SCHEDULE.saveTime(timeCollect())
      window.location.reload()
   }
   
   timeHead.onclick = function () {
      let param = true
      document.querySelectorAll('.time-grup .time-code').forEach(code => {
         if (code.value != '') return
         param = false
         code.borderColor = 'red'
      })
      if (!param) return alert('Input schedule code')
      const element = document.createElement('div')
      element.classList.add('time-grup')
      element.innerHTML = `
         <input type="text" class='time-code bg-darkcyan' value=''>
         <input type="text" class='time-value' value=''>
         <select onchange='timeColor(this)'>
            <option value='darkcyan'>Darkcyan</option>
            <option value='red'>Red</option>
            <option value='blue'>Blue</option>
            <option value='green'>Green</option>
            <option value='yellow'>Yellow</option>
            <option value='black'>Black</option>
            <option value='purple'>Purple</option>
         </select>
         <input type='checkbox' class='check-form' data-text='Use ?'>
         <i class="fas fa-trash" onclick="timeRemove(this)"></i>
      `
      scheduleTime.appendChild(element)
   }
   
})

function scheduleCheck () {
   let param = true
   document.querySelectorAll('select.schedule-select').forEach(select => {
      console.log(select.value)
      if(select.value == '') param = false
   })
   if (!param) alert('Choose your schedule')
   return param
}
function findSchedule (date = new Date()) {
   const month = new Date(date).getMonth(),
      year     = new Date(date).getFullYear(),
      index    = SCHEDULE.allData.findIndex(({code}) => code.toUpperCase() == `${month}${year}`)
      if (index >= 0) return true
      return false
}

function scheduleCollect () {
   if (!scheduleCheck()) return undefined
   let Data       = [],
      param       = true
   const month    = new Date().getMonth(),
      year        = new Date().getFullYear(),
      lastDate    = new Date(year, month + 1, 0).getDate()
   
   for (let i = 1; i <= lastDate; i++){
      const elem  = document.querySelector(`#sch${i}`)
      if (!elem) param = false
      else Data.push(elem.value)
   }
   if (param) return Data
   return undefined
}


function timeCollect () {
   let data = []
   document.querySelectorAll('.time-grup').forEach(time => {
      data.push({
         code  : time.firstElementChild.value,
         color : time.querySelector('select').value,
         time  : time.querySelector('.time-value').value,
         use   : time.querySelector('.check-form').checked
      })
   })
   return data
}
async function timeRemove(elm) {
   if (!confirm('This action will remove this schedule code in every month schedule list!')) return
   const parent   = elm.parentElement
   const code     = parent.dataset.code
   await SCHEDULE.timeRemoves(code)
   parent.remove()
}