                                                                                                                                                                                                                                                                        
const nav   = document.querySelectorAll('.navx'),
      pages = document.querySelectorAll('section.main-content')
      
window.addEventListener("DOMContentLoaded", function () {
   nav.forEach(link => {
      link.onclick = async function () {
         if(await findSchedule() == false) return alert('input your schedule')
         document.querySelector("#nav-add").classList.remove('active')
         nav.forEach(list => {list.classList.remove('active')})
         link.classList.add('active')
         if (this.id == 'add-icon') {
            this.classList.add('active')
            return document.querySelector("#nav-add").classList.add('active')
         }
         pages.forEach(pg => {
            pg.classList.add('dis-none')
            if (link.dataset.nav == pg.id) return pg.classList.remove('dis-none')
            // console.log(this.dataset.nav)
         })
      }
   })
   window.addEventListener('click', function (e) {
      if (!e.target.matches('#add-icon-i')){
         document.querySelector("#nav-add").classList.remove('active')
         document.querySelector('#add-icon').classList.remove('active')
         document.querySelector('#add-icon i').classList.remove('active')
      }
   })
   
   /* setInterval(function(){
      
      let second  = new Date().getSeconds()
      let minute  = new Date().getMinutes()
      let hour    = new Date().getHours()
      
      if (hour    < 10) '0' + hour
      if (minute  < 10) '0' + minute
      if (second  < 10) '0' + second
      
      const dateText    = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})
      const timeText    = hour + ' : ' + minute + ' : ' + second
      
      document.querySelector('#dashboard-date').innerHTML = dateText
      document.querySelector('#dashboard-time').innerHTML = timeText
      
   }, 100) */
})
