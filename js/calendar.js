                                                                                                                                                                                                                                                                                                                                                                                                                                             


const clx         = document.querySelector(".calendar-box"),
   calendarMonth  = document.querySelector("#calendar-month"),
   todayList      = document.querySelector('.fax-list')
   
   
window.addEventListener("DOMContentLoaded", function () {
   
   const myCalendar  = new calendar(new Date())
   let now           = new Date (),
      month          = myCalendar.moon,
      year           = myCalendar.year,
      time           = new Date(new Date().setDate(1)),
      start          = 0,
      end            = 0,
      changes        = 0,
      contentWidth   = clx.getBoundingClientRect().width
   
   calendarMonth.innerHTML = month.toUpperCase() + ' ' + year
   clx.innerHTML           = myCalendar.setAllHTML()
   
   // console.log(clx)
   
   window.addEventListener('click', function(e) {
      if (e.target.matches('i.next')) {
         nextTime                = new Date(time.setMonth(time.getMonth() + 1))
         nextCalendar            = new calendar(nextTime)
         month                   = nextCalendar.moon
         year                    = nextCalendar.year
         calendarMonth.innerHTML = month.toUpperCase() + ' ' +  year
         clx.innerHTML           = nextCalendar.setAllHTML()
      } else if (e.target.matches('i.prev')) {
         prevTime                = new Date(time.setMonth(time.getMonth() - 1))
         prevCalendar            = new calendar(prevTime)
         month                   = prevCalendar.moon
         year                    = prevCalendar.year
         calendarMonth.innerHTML = month.toUpperCase() + ' ' +  year
         clx.innerHTML           = prevCalendar.setAllHTML()
      } else if (e.target.matches("#calendar-month")) {
         clx.classList.remove('dis-none')
         contentWidth            = clx.getBoundingClientRect().width
         time                    = new Date(new Date().setDate(1))
         returnCalendar          = new calendar(time)
         month                   = returnCalendar.moon
         year                    = returnCalendar.year
         calendarMonth.innerHTML = month.toUpperCase() + ' ' + year
         clx.innerHTML           = returnCalendar.setAllHTML()
      }
   })
   
      
   clx.addEventListener("touchstart", function (e) {
      start    = e.touches[0].clientX
   })
   clx.addEventListener("touchend", function (e) {
      end      = e.changedTouches[0].clientX
      changes  = end - start
      
      if (changes < (contentWidth * 0.35 * -1)) {
         nextTime                = new Date(time.setMonth(time.getMonth() + 1))
         nextCalendar            = new calendar(nextTime)
         month                   = nextCalendar.moon
         year                    = nextCalendar.year
         calendarMonth.innerHTML = month.toUpperCase() + ' ' +  year
         clx.innerHTML           = nextCalendar.setAllHTML()
      } else if (changes > (contentWidth * 0.35)) {
         prevTime                = new Date(time.setMonth(time.getMonth() - 1))
         prevCalendar            = new calendar(prevTime)
         month                   = prevCalendar.moon
         year                    = prevCalendar.year
         calendarMonth.innerHTML = month.toUpperCase() + ' ' +  year
         clx.innerHTML           = prevCalendar.setAllHTML()
      }
   })
   
   todayList.onclick = function () {
      // console.log('List')
      document.querySelector('#calendar-month').click()
      document.querySelector('.calendar-box .today').click()
   }
   
   // console.log('Finish Loaded')
})

function seeList (param, e) {
   // console.log('see', e)
   const dateList    = param.querySelector('.date-data-list')
   if (e.matches('.date-list-head')) {
      e.parentElement.classList.add('dis-none')
   } else if (dateList.classList.contains('dis-none')) return dateList.classList.remove('dis-none')
}   

function hideDateList (param) {
   // console.log('hid3')
   param.dataset.control = 'ben'
   document.querySelectorAll('.date-data-list .date-list-head').forEach(h => {
      if (h.dataset.control == 'ben') {
         h.parentElement.classList.add('dis-none')
         //console.log(h.parentElement)
      }
   })
   param.dataset.control = ''
}