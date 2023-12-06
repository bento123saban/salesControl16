                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                            

const salesTarget    = document.querySelector('.sales-target'),
   mainTarget        = document.querySelector('#main-target-value'),
   furnitureTarget   = document.querySelector('#furniture-target-value'),
   accessoriesTarget = document.querySelector('#accessories-target-value'),
   furniProTarget    = document.querySelector('#fp-target-qty'),
   salesCardForm     = document.querySelector('#sales-card-form'),
   salesCardDate     = document.querySelector('#sales-card-date'),
   salesSubmit       = document.querySelector('#sales-card-submit'),
   salesReset        = document.querySelector('#sales-card-reset'),
   onDateSales       = document.querySelector('#on-date-sales'),
   salesCardHead     = document.querySelector('#sales-card .allH4'),
   removeMonth       = document.querySelector('#sales-card-remove-month'),
   fetchTrigger      = document.querySelector('#fetch-trigger'),
   displayTable      = document.querySelector('#display-table') 
   fpSmtd            = document.querySelector('#fp-smtd'),
   salesCardSearch   = document.querySelector('#display-table .add-grup input'), 
   salesDashboard    = document.querySelector('#diagram-data'),
   targetDashboard   = document.querySelector('#target-dashboard'),
   deptSales         = document.querySelector('.dept-sales')

window.addEventListener('DOMContentLoaded', async function () {
   let deptFTR    = ``,
      deptACC     = ``,
      deptElse    = ``
   const sortDept = SLCARD.deptData.sort((a, b) => a.code.localeCompare(b.code))
   // console.log(sortDept)
   sortDept.forEach(dept => {
      if (dept.type.toUpperCase() == 'FURNITURE') return deptFTR += `<div class="dept-code bg-cyan" data-value="">${dept.code}</div>`
      if (dept.type.toUpperCase() == 'ACCESSORIES') return deptACC += `<div class="dept-code bg-cyan" data-value="">${dept.code}</div>`
      return deptElse += `<div class="dept-code bg-cyan" data-value="">${dept.code}</div>`
   })
   deptSales.children[0].innerHTML = deptFTR
   deptSales.children[1].innerHTML = deptACC
   deptSales.children[2].innerHTML = deptElse
   
   
   const dateMax              =  new Date(new Date().getFullYear(), new Date().getMonth(), new Date().getDate() + 2)
   // salesCardDate.valueAsDate  = dateMax
   salesCardDate.min          = new Date(new Date().getFullYear(), new Date().getMonth(), 1).toISOString().split("T")[0]
   salesCardDate.max          = new Date(dateMax).toISOString().split("T")[0]
   mainTarget.onkeyup = function () {
      if (this.value == '' || this.value <= 0) return this.classList.add('br-red')
      this.classList.remove('br-red')
      furnitureTarget.value   = parseFloat((this.value * 0.8).toFixed(2))
      accessoriesTarget.value = parseFloat((this.value * 0.2).toFixed(2))
   }
   salesSubmit.onclick = function () {
      if (!salesCardCheckForm()) return alert('Red !')
      if (!confirm('Submit ?')) return
      const theDate = new Date(salesCardDate.value)
      if (SLCARD.controlFormData({
          mainTarget          : mainTarget.value,
          accessoriesTarget   : accessoriesTarget.value,
          furnitureTarget     : furnitureTarget.value,
          FPTarget            : furniProTarget.value
       }, new Date(salesCardDate.value)) == true) return writeData(new Date())
      return alert('Error')
   }
   salesCardDate.onchange = async function () {
      await writeData(new Date(this.value))
      const date  = new Date(this.value).getDate(),
         datex    = (date < 10) ? '0' + date : date,
         month    = new Date(this.value).getMonth() + 1,
         monthx   = (month < 10) ? '0' + month : month,
         year     = new Date(this.value).getFullYear(),
         theDate  = year + '' + monthx + '' + datex
     document.querySelectorAll('tbody tr').forEach(tr => {
        const recieptNum = tr.children[1].textContent
        if (recieptNum.indexOf(theDate) >= 0) return tr.classList.remove('dis-none')
        return tr.classList.add('dis-none')
     })
   }
   salesCardSearch.onkeyup = function () {
      const value = this.value.toUpperCase()
      document.querySelectorAll('tbody tr').forEach(tr => {
         let param = false
         tr.querySelectorAll('td').forEach(td => {
            const text = td.textContent.toUpperCase()
            if (text.indexOf(value) >= 0) return param = true
         })
         if (!param) return tr.classList.add('dis-none')
         return tr.classList.remove('dis-none')
      })
   }
   writeData(new Date())
   fetchTrigger.onclick = function () {
      if(!confirm('Fetch ?')) return
      getFetch()
   }
})
function writeData (theDate = new Date()) {
   const salesData   = SLCARD.calculateData(new Date(theDate))
   if (!salesData.status) {
      salesCardSearch.classList.add('dis-none')
      return alert(salesData.error)
   }
   salesCardSearch.classList.remove('dis-none')
   salesCardHead.innerHTML    = 'salesCard - ' + salesData.dateText
   onDateSales.innerHTML      = salesData.onDateHTML
   salesTarget.innerHTML      = salesData.smtdHTML
   mainTarget.value           = salesData.target.mainTarget
   furnitureTarget.value      = salesData.target.furnitureTarget
   accessoriesTarget.value    = salesData.target.accessoriesTarget
   furniProTarget.value       = salesData.target.FPTarget
   fpSmtd.innerHTML           = salesData.smtdFP
   salesDashboard.innerHTML   = salesData.diagramHTML
   targetDashboard.innerHTML  = salesData.targetHTML
   fpSmtd.classList.remove('dis-none')
   
   const tables            = document.createElement('table')
   const key               = ['no.', 'recieptNum', 'stokCode', 'itemName', 'dept', 'qty', 'unitPrice', 'discounts', 'disc', 'total']
   let tableHTML           = `
      <table>
         <thead>
            <tr>`
   key.forEach(th => {
      tableHTML += `<th>${th}</th>`
   })
   tableHTML  += 
            `</tr>
         </thead>
         <tbody>
   `
   salesData.data.forEach((tr, i) => {
      tableHTML += `<tr>
         <th>${i + 1}</th>
         <td onclick="checkReciept('${tr.recieptNum}')">${tr.recieptNum}</td>
         <td>${tr.stokCode}</td>
         <td>${tr.itemName}</td>
         <td>${tr.dept}</td>
         <td>${tr.qty}</td>
         <td>${tr.unitPrice}</td>
         <td>${tr.discounts}</td>
         <td>${tr.disc}</td>
         <td>${tr.total}</td>
      </tr>`
   })
   tableHTML += `
      </tbody>
   </table>
   `
   tables.innerHTML        = tableHTML
   if(displayTable.querySelector('table')) displayTable.querySelector('table').remove()
   displayTable.appendChild(tables)
   
   document.querySelectorAll('.box-days, .different, .current').forEach(elm => {
      let height = parseFloat(elm.dataset.height)
      if (height < 0) {
         height = height * -1
      } 
      elm.style.height = height + '%'
   })
}
/*
function addSalesCardGroup (code = '', valuex = '') {

   let deptName   = 'Dept. Name ?'
   const deptData = SLCARD.checkDeptByCode(code)
   if (deptData) deptName = deptData.name
   // console.log(deptName, deptData.name)
   
   const group = document.createElement('div')
   group.classList.add('sales-card-group')
   
   const codeElement       = document.createElement('input')
   codeElement.type        = 'text'
   codeElement.value       = code
   codeElement.maxLength   = 4
   codeElement.onkeyup     = function () {
         this.value        = this.value.toUpperCase()
         const label       = this.parentElement.querySelector('label')
         const deptData    = SLCARD.checkDeptByCode(this.value)
         if (this.value == '' || hasUsedCode(this) || !deptData) {
            this.classList.add('br-red')
            this.classList.add('color-red')
            label.classList.add('br-red')
            label.classList.add('color-red')
            label.textContent = (hasUsedCode(this)) ? 'used' : 'undefined'
            return false
         }
         this.classList.remove('br-red')
         this.classList.remove('color-red')
         label.classList.remove('br-red')
         label.classList.remove('color-red')
         label.textContent = deptData.name
      } 
   codeElement.classList.add('sales-dept-code')
   group.appendChild(codeElement)
   
   const deptElement       = document.createElement('label')
   deptElement.textContent = deptName
   group.appendChild(deptElement)
   
   const valueElement      = document.createElement('input')
   valueElement.type       = 'number'
   valueElement.value      = valuex
   valueElement.onkeyup    = function () { checkValue(this)}
   valueElement.classList.add('dept-sales-value')
   group.appendChild(valueElement)
   
   const deleteGroup       = document.createElement('i')
   deleteGroup.onclick     = function () {
         if (!confirm('Remove ?')) return
         this.parentElement.remove()
      }
   deleteGroup.classList.add('fas')
   deleteGroup.classList.add('fa-trash')
   group.appendChild(deleteGroup)
   salesCardForm.appendChild(group)
}
*/
function salesCardCheckForm () {
   let param = true
   mainTarget.classList.remove('br-red')
   furnitureTarget.classList.remove('br-red')
   accessoriesTarget.classList.remove('br-red')
   salesCardDate.classList.remove('br-red')
   salesCardDate.classList.remove('br-red')
   if (mainTarget.value == '') {
      mainTarget.classList.add('br-red')
      param = false
   }
   if (salesCardDate.value == '') {
      salesCardDate.classList.add('br-red')
      param = false
   }
   if (furnitureTarget.value == '') {
      furnitureTarget.classList.add('br-red')
      param = false
   }
   if (accessoriesTarget.value == '') {
      accessoriesTarget.classList.add('br-red')
      param = false
   }
   if (furniProTarget.value == '') {
      furniProTarget.classList.add('br-red')
      param = false
   }
   return param
}  
async function getFetch (url = '') {
   const base        = 'https://docs.google.com/spreadsheets/d/19xNn3anMA7JMRitJRG_miH5VisuVpxU3Yi8nA193GwQ/edit?usp=drivesdk'
   const fetchResult = await SLCARD.fetchingData(base).then(result => result)
   const status      = fetchResult.status
   const next        = fetchResult.next
   const error       = fetchResult.error
   const continueBtn = document.querySelector('#continue-fetch')
   if (!status && next) {
      alert(fetchResult.error + '\nIf countinue all error row will be ignored !')
      continueBtn.onclick = async function (){
         if (!confirm('Update ?')) return
         await localStorage.setItem('FETCH', JSON.stringify(fetchResult.data))
         await document.querySelector('#for-data-display').classList.add('dis-none')
         await writeData(new Date())}}
   if (!status && !next) {
      alert(fetchResult.error + '\nCan not countinue. Fix the error')
      continueBtn.onclick = function () {
         return alert('Can not continue. Fix the error')}}
   else {
      continueBtn.onclick = async function () {
         if (!confirm('Update ?')) return
         await localStorage.setItem('FETCH', JSON.stringify(fetchResult.data))
         await document.querySelector('#for-data-display').classList.add('dis-none')
         await writeData(new Date())}}
}
function checkReciept(recieptNum) {
   const getRcp   = AS.findByRecieptNum(recieptNum)
   if (getRcp && confirm('See detail ?')) return asSeeDetail(getRcp.ID)
   if (getRcp) return
   if (!confirm('Create After Sales ?')) return
   
   const array = SLCARD.fetchByReciept(recieptNum),
      items    = []
      
   // return console.log(array, 'array')
   array.forEach(data => {
      items.push({
         article  : data.stokCode,
         product  : data.itemName,
         qty      : data.qty,
         price    : parseInt(data.total) / parseInt(data.qty),
         total    : data.total,
         site     : ''
      })
   })
   
   const recieptData = AS.extractReciept(recieptNum)
   
   const data = {
      ID             : 0,
      next           : true,
      rcpNum         : recieptNum,
      recieptData    : recieptData,
      name           : '',
      phone          : '',
      note           : '',
      member         : '',
      address        : '',
      status         : '',
      items          : items,
      pickUp         : '',
      requestTime    : '',
      instalTime     : '',
      containerTime  : '',
      readyTime      : '',
      containerNum   : ''
   }
   return asSeeDetail(data, false)
}
function setDO () {
   const array = SLCARD.DOChecking()
   if (!array ) return
   
} 


function notifyMe() {
  if (!("Notification" in window)) {
    // Check if the browser supports notifications
    alert("This browser does not support desktop notification");
  } else if (Notification.permission === "granted") {
    // Check whether notification permissions have already been granted;
    // if so, create a notification
    const notification = new Notification("Hi there!");
    // …
  } else if (Notification.permission !== "denied") {
    // We need to ask the user for permission
    Notification.requestPermission().then((permission) => {
      // If the user accepts, let's create a notification
      if (permission === "granted") {
        const notification = new Notification("Hi there!");
        // …
      }
    });
  }

  // At last, if the user has denied notifications, and you
  // want to be respectful there is no need to bother them anymore.
}
//notifyMe()