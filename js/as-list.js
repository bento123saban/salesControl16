                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                


const asList         = document.querySelector('#as-list-data'),
   asSearchStart     = document.querySelector('#as-search-date-start'),
   asSearchEnd       = document.querySelector('#as-search-date-end'),
   asSearchSelect    = document.querySelector("#as-search-select"),
   asSearchInput     = document.querySelector('#as-search-input'),
   asStatusButton    = document.querySelectorAll('#as-list-button button.bttn')

window.addEventListener('DOMContentLoaded', function(e){ 
   
   asSearchEnd.valueAsDate    = new Date()
   asSearchStart.valueAsDate  = new Date()
   
   // const asHtml   = AS.setHTML()
   asList.innerHTML = AS.setHTML()
   
   asStatusButton.forEach(btn => {
      btn.onclick = function () {
         const content  = this.textContent.toUpperCase()
        // console.log(content)
         document.querySelectorAll('.as-grup').forEach(grup => {
            if (content == 'ALL') return grup.classList.remove('dis-none')
            if (content == grup.dataset.progress.toUpperCase()) return grup.classList.remove('dis-none')
            return grup.classList.add('dis-none')
         })
      }
   })
   
   asSearchInput.onkeyup = function () {
      const value       = this.value.toUpperCase()
      document.querySelectorAll('.as-grup').forEach(grup => {
         const search   = grup.dataset.search.toUpperCase()
         if (search.indexOf(value) >= 0) return grup.classList.remove('dis-none')
         return grup.classList.add('dis-none')
      })
   }
})