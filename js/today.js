                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

const fuChartBox  = document.querySelector('#fu-chart-box'), 
   fuChartNote    = document.querySelector('.chart-note-box'),
   asChartBox     = document.querySelector('.as-chart-box'),
   todaySch       = document.querySelector('#today-sch'),
   todayDate      = document.querySelector('#today-date'),
   todayBox       = document.querySelector('#today'),
   dashboardHead  = document.querySelector('.dashboard-head'),
   dashboardDate  = document.querySelector('#dashboard-date'),
   clrDate        = document.querySelectorAll('.calendar-control i, .calendar-control span'),
   navBar         = document.querySelector('nav'),
   allH4          = document.querySelectorAll('.allH4'),
   addIconI       = document.querySelector('#add-icon-i'),
   formTotal      = document.querySelectorAll('.form-total')

window.addEventListener('DOMContentLoaded', function () {
   
   if (fuStatistik()) {
      fuChartBox.innerHTML    = fuStatistik()[0]
      fuChartNote.innerHTML   = fuStatistik()[1]
   } else fuChartBox.parentElement.classList.add('dis-none');
   (!asStatistik()) ? asChartBox.parentElement.classList.add('dis-none') : asChartBox.innerHTML = asStatistik()
   
   const todaySchedule  = SCHEDULE.getData(new Date(), true)
   if (!todaySchedule) return
   const schTime        = schxTime.find(({code}) => code.toUpperCase() == todaySchedule.toUpperCase()).time
   const schColor       = schxTime.find(({code}) => code.toUpperCase() == todaySchedule.toUpperCase()).color
   
   dashboardHead.classList.add('bg-' + schColor)
   navBar.classList.add('bg-' + schColor)
   addIconI.classList.add('bg-' + schColor)
   formTotal.forEach(form => form.classList.add('bg-' + schColor))
   clrDate.forEach(control => control.classList.add('bg-' + schColor))
   allH4.forEach(h4 => h4.classList.add('bg-' + schColor))
   dashboardDate.innerHTML = new Date().toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'}) + ' <br> ' + todaySchedule + ' ' + schTime
})

function fuStatistik () {
   let statistik = {
      fail     : 0,
      pending  : 0,
      progress : 0,
      success  : 0,
      all      : 0
   }
   
   FU.allData.forEach(data => {
      const status = FU.findById(data.ID).status
      if (!status) return
      statistik.all ++
      if (status == 'Pending')   statistik.pending ++
      if (status == 'Progress')  statistik.progress ++
      if (status == 'Fail')      statistik.fail ++
      if (status == 'Success')   statistik.success ++
   })
   let htmlChart = ``, htmlNote = ``
   if (statistik.progress > 0) {
      const percent = (statistik.progress / statistik.all) * 100
      htmlChart += ` 
         <div class="fu-chart bg-blue" style='width: ${percent}% !important' data-fu="progress"></div>
      `
      htmlNote += `
         <div class="chart-note">
            <div class="bg-blue"></div>
            <span>Progress ${parseInt(percent)}% ${statistik.progress}/${statistik.all}</span>
         </div>
      `
   }
   if (statistik.success > 0) {
      const percent = (statistik.success / statistik.all) * 100
      htmlChart += ` 
         <div class="fu-chart bg-green" style='width: ${percent}% !important' data-fu="progress"></div>
      `
      htmlNote += `
         <div class="chart-note">
            <div class="bg-green"></div>
            <span>Success ${parseInt(percent)}% ${statistik.success}/${statistik.all}</span>
         </div>
      `
   }
   if (statistik.pending > 0) {
      const percent = (statistik.pending / statistik.all) * 100
      htmlChart += ` 
         <div class="fu-chart bg-yellow" style='width: ${percent}% !important' data-fu="progress"></div>
      `
      htmlNote += `
         <div class="chart-note">
            <div class="bg-yellow"></div>
            <span>Pending ${parseInt(percent)}% ${statistik.pending}/${statistik.all}</span>
         </div>
      `
   }
   if (statistik.fail > 0) {
      const percent = (statistik.fail / statistik.all) * 100
      htmlChart += ` 
         <div class="fu-chart bg-red" style='width: ${percent}% !important' data-fu="progress"></div>
      `
      htmlNote += `
         <div class="chart-note">
            <div class="bg-red"></div>
            <span>Fail ${parseInt(percent)}% ${statistik.fail}/${statistik.all}</span>
         </div>
      `
   }
   
   return (htmlNote == '' || htmlNote == '') ? undefined : [htmlChart, htmlNote]
}

function asStatistik () {
   if (AS.allData.length > 0) {
      const Data  = AS.findByDate(new Date()).dlv
      // console.log(Data)
      let html = ``, param = 30
      if (Data.prepare.length > 0) {
         html += `
            <div class="as-chart">
               <span>Start-Prepare</span>
               <div class="chart-bg bg-green" data-text='${Data.prepare.length}' style='width: ${Data.prepare.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.onprepare.length > 0) {
         html += `
            <div class="as-chart">
               <span>On-Prepare</span>
               <div class="chart-bg bg-green" data-text='${Data.onprepare.length}' style='width: ${Data.onprepare.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.shipping.length > 0) {
         html += `
            <div class="as-chart">
               <span>Start-Shipping</span>
               <div class="chart-bg bg-purple" data-text='${Data.shipping.length}' style='width: ${Data.shipping.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.onshipping.length > 0) {
         html += `
            <div class="as-chart">
               <span>On-Shipping</span>
               <div class="chart-bg bg-purple" data-text='${Data.onshipping.length}' style='width: ${Data.onshipping.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.ready.length > 0) {
         html += `
            <div class="as-chart">
               <span>Ready</span>
               <div class="chart-bg bg-blue" data-text='${Data.ready.length}' style='width: ${Data.ready.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.pickUp.length > 0) {
         html += `
            <div class="as-chart">
               <span>PickUp</span>
               <div class="chart-bg bg-red" data-text='${Data.pickUp.length}' style='width: ${Data.pickUp.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.delivery.length > 0) {
         html += `
            <div class="as-chart">
               <span>Delivery</span>
               <div class="chart-bg bg-red" data-text='${Data.delivery.length}' style='width: ${Data.delivery.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.instal.length > 0) {
         html += `
            <div class="as-chart">
               <span>Instal</span>
               <div class="chart-bg bg-yellow" data-text='${Data.instal.length}' style='width: ${Data.instal.length * param}px !important; '></div>
            </div>
         `
      }
      if (Data.past.length > 0) {
         html += `
            <div class="as-chart">
               <span>Past</span>
               <div class="chart-bg bg-black" data-text='${Data.past.length}' style='width: ${Data.past.length * param}px !important; '></div>
            </div>
         `
      }
      return html
   } return ''
}

