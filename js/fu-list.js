                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                


const fuList         = document.querySelector('#fu-list-data'),
   fuSearchStart     = document.querySelector('#fu-search-date-start'),
   fuSearchEnd       = document.querySelector('#fu-search-date-end'),
   fuSearchSelect    = document.querySelector("#fu-search-select"),
   fuSearchInput     = document.querySelector('#fu-search-input'),
   fuStatusButton    = document.querySelectorAll('#fu-list-button button.bttn')

window.addEventListener('DOMContentLoaded', function(e){
   fuSearchStart.valueAsDate  = new Date()
   fuSearchEnd.valueAsDate    = new Date()
   let fuHTML = FU.setHTML()
   if (fuHTML) fuList.innerHTML = fuHTML
   // console.log(fuHTML)
   document.querySelectorAll('#fu-search-date-start, #fu-search-date-end, #fu-search-select').forEach(input => {
      input.onchange = function () {
         
         if (fuSearchStart.value == '' || fuSearchEnd.value == '') return // console.log('Choose date')
         let timeStart  = new Date(new Date(fuSearchStart.value).setHours(0,0,0,0)).getTime()
         let timeEnd    = new Date(new Date(fuSearchEnd.value).setHours(23,59,59,999)).getTime()
         let status     = fuSearchSelect.value
         
         document.querySelectorAll('.fu-grup').forEach(grup => {
            grup.classList.add('dis-none')
            if (status == 'In') {
               if (parseInt(grup.dataset.in) >= timeStart && parseInt(grup.dataset.in) <= timeEnd) return grup.classList.remove('dis-none')
            } else if (status == 'Out') {
               if (parseInt(grup.dataset.out) >= timeStart && parseInt(grup.dataset.out) <= timeEnd) return grup.classList.remove('dis-none')
            }
         })
      }
   })
   fuSearchInput.onkeyup = function () {
      document.querySelectorAll('.fu-grup').forEach(grup => {
         const text  = grup.dataset.search.toUpperCase()
         if (text.indexOf(this.value.toUpperCase()) >= 0) return grup.classList.remove('dis-none')
         return grup.classList.add('dis-none')
      })
   }
   fuStatusButton.forEach(btn => {
      btn.onclick = function () {
         //console.log('click')
         document.querySelectorAll('.fu-grup').forEach(grup => {
            if(this.textContent.toUpperCase() == 'ALL') return grup.classList.remove('dis-none')
            if(this.textContent.toUpperCase() ==  grup.dataset.status.toUpperCase()) return grup.classList.remove('dis-none')
            grup.classList.add('dis-none')
         })
      }
   })
})