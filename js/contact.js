                                                                                       

const formPhoneNumber   = document.querySelectorAll('.form-phone-number')


window.addEventListener('DOMContentLoaded', function () {
   formPhoneNumber.forEach(input => {
      input.onkeyup = function () {
         if (cekAwalanNomorHP(this.value) == true) return this.style.borderColor = 'darkcyan'
         this.style.borderColor = 'red'
         this.value = '08'
      }
   })
})

function cekAwalanNomorHP(nomorHP) {
  nomorHP = nomorHP.replace(/\s+/g, '').replace(/-/g, '');
  if (nomorHP.startsWith('08') ) return true
  else return false
}

function phoneCall(number) {
   if (!number) return
   return window.location.href = 'tel:' + number
}

function wa (number) {
   console.log(number)
   
   const waNumber    = '62' + number
   window.location.href = 'https://wa.me/' + waNumber
}