                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                

class fuControl {
   constructor () {
      this.allData   = JSON.parse(localStorage.getItem("FU"))
   }
   findByDate(datex) {
      let date    = new Date(datex).getDate(),
         month       = new Date(datex).getMonth(),
         year        = new Date(datex).getFullYear(),
         startTime   = new Date(year, month, date, 0, 0, 0, 0).getTime(),
         endTime     = new Date(year, month, date, 23, 59, 59, 999).getTime(),
         now         = new Date().getTime(),
         Data        = {
            In       : [],          Out      : [],       past     : [],
            startTime: startTime,   endTime  : endTime,  dateData : [],
            year     : year,        month    : month,    date     : date
         }
      if (this.allData.length > 0)  {
         this.allData.forEach(data => {
            if (data.status == 'success') return
            let estEnd     = new Date(new Date(data.estimate).setHours(23,59,59,999)).getTime(),
                estimate   = new Date(data.estimate).getTime(),
                inTime     = new Date(parseInt(data.ID)).getTime()
            if (estimate >= startTime && estimate <= endTime) {
               Data.Out.push(data)
               return Data.dateData.push(data)
            } else if (inTime >= startTime && inTime <= endTime) {
                  Data.In.push(data)
                  return Data.dateData.push(data)
            } else if (estEnd <= endTime && startTime <= new Date().getTime() + 864000)
               Data.past.push(data)
         })
         return Data
      } else return undefined
   }
   findByStatus(param) {
      let array = []
      allData.forEach(data => {
         if (data.status.toUpperCase() == param.toUpperCase()) return array.push(data)
      })
      return array
   }
   findById(IDX) {
      if (this.allData.length > 0) return this.allData.find(({ ID }) => ID == IDX)
      return undefined
   }
   create(data, IDX) {
      const datax = data
      datax.ID = IDX
      const i = this.allData.findIndex(({ ID }) => ID == IDX)
      if (i >= 0) this.allData[i] = datax
      else this.allData.push(datax)
      return true
   }
   setHTML () {
      if (this.allData.length > 0) {
         let html = ``
         this.allData.forEach(data => {
            let status = ''
            FUSTATUS.forEach(st => { if (st.status.toUpperCase() == data.status.toUpperCase()) return status = st })
            html += `
               <div class="fu-grup br-${status.br}" data-status='${data.status}' data-in='${data.ID}' data-out='${new Date(data.estimate).getT}' data-search='${data.name} ${data.phone} ${data.address} ${data.note} ${data.status.toUpperCase()}'>
                  <div class="grup-top bg-${status.bg}">
                     <span>${data.name}</span>
                     <i class="fas fa-chevron-right" onclick="fuSeeDetail(${data.ID})"></i>
                  </div>
                  <div class="grup-middle">
                     <span>${data.phone}</span>
                     <a href="tel:${data.phone}"><i class="fas fa-phone"></i></a>
                     <a href=""><i class="fab fa-whatsapp"></i></a>
                  </div>
                  <p class="bg-white">
                     <span>in. ${new Date(parseInt(data.ID)).toDateString()}</span>
                     <span>est. ${new Date(data.estimate).toDateString()}</span>
                  </p>
               </div>
            `
         })
         return html
      } return undefined
   }
   remove (IDX) {
      if (this.allData.length >= 1) {
         let i = this.allData.find(({ID}) => ID == IDX)
         if (!i) return alert('Data nof Found !')
         if (!confirm('Remove followUp ?')) return true
         this.allData.splice(i,1)
         return true
      } return false
   }
}

class asControl {
   constructor() {
      this.allData            = JSON.parse(localStorage.getItem('AS'))
      this.progressControl    = function ({start, end, ins, req, rd, cont, rcp, sts}) {
         let progress = 'Bendhard16'
         if (sts.toUpperCase() == 'DELIVERY'
            && req < start
            && new Date().getTime() >= start)            return 'past'
         else if (sts.toUpperCase() == 'DELIVERY DONE'
            && ins < start
            && new Date().getTime() >= start)            return 'past'
         if (ins > 0 && ins >= start && ins <= end)      progress = 'instal'
         // if (rd > 0 && rd >= end && req <= start)     progress = 'waiting'
         if (rd > 0 && rd <= end && req >= start)        progress = 'ready'
         if (req >= start && req <= end)                 progress = 'delivery'
         if (cont > 0 && cont <= start && rd >= end)     progress = 'onshipping'
         if (cont > 0 && cont >= start && cont <= end)   progress = 'shipping'
         if (cont > 0 && rcp <= start && cont >= end)    progress = 'onprepare'
         if (cont == 0 && rcp <= start && req >= end)    progress = 'onprepare'
         if (rcp >= start && rcp <= end)                 progress = 'prepare'
         //console.log(progress)
         return progress
      }
      this.getTodayProgress   = function (id) {
         const data     = this.allData.find(({ID}) => ID == id)
         let reqTime    = new Date(new Date(data.requestTime).setHours(10,0,0,0)).getTime(),
            insTime     = (data.instalTime      > 0) ? new Date(new Date(data.instalTime).setHours(10,0,0,0)).getTime()    : 0,
            rdTime      = (data.readyTime       > 0) ? new Date(new Date(data.readyTime).setHours(10,0,0,0)).getTime()     : 0,
            contTime    = (data.containerTime   > 0) ? new Date(new Date(data.containerTime).setHours(10,0,0,0)).getTime() : 0,
            rcpTime     = new Date(new Date(data.recieptData.recieptTime).setHours(10,0,0,0)).getTime(),
            startTime   = new Date(new Date().setHours(0,0,0,0)).getTime(),
            endTime     = new Date(new Date().setHours(23, 59, 59, 999)).getTime(),
            nowTime     = new Date().getTime()
               
         if (rdTime == 0 && contTime > 0) rdTime   = reqTime
         const progress = this.progressControl({
            start : startTime,
            end   : endTime,
            ins   : insTime,
            req   : reqTime,
            rd    : rdTime,
            cont  : contTime,
            rcp   : rcpTime,
            sts   : data.status
         })
         return (progress == 'onprepare') ? 'prepare' : (progress == 'onshipping') ? 'shipping' : progress
      }
   }
   findByDate (datex) {
      let date    = new Date(datex).getDate(),
      month       = new Date(datex).getMonth(),
      year        = new Date(datex).getFullYear(),
      startTime   = new Date(year, month, date, 0, 0, 0, 0).getTime(),
      endTime     = new Date(year, month, date, 23, 59, 59, 999).getTime(),
      dlv         = {
         prepare     : [], onprepare   : [], shipping : [],
         onshipping  : [], ready       : [], delivery : [],
         instal      : [], past        : []
      }
      if (this.allData.length > 0) {
         this.allData.forEach(data => {
            if (data.status == 'Remove') return
            if (data.status == 'Complete') return
            let reqTime    = new Date(new Date(data.requestTime).setHours(10,0,0,0)).getTime(),
               insTime     = (data.instalTime      > 0) ? new Date(new Date(data.instalTime).setHours(10,0,0,0)).getTime()    : 0,
               rdTime      = (data.readyTime       > 0) ? new Date(new Date(data.readyTime).setHours(10,0,0,0)).getTime()     : 0,
               contTime    = (data.containerTime   > 0) ? new Date(new Date(data.containerTime).setHours(10,0,0,0)).getTime() : 0,
               rcpTime     = new Date(new Date(data.recieptData.recieptTime)).getTime(),
               nowTime     = new Date().getTime(),
               nowDate     = new Date().getDate(),
               nowMonth    = new Date().getMonth(),
               nowYear     = new Date().getFullYear()
               
            if (rdTime == 0 && contTime > 0) rdTime = reqTime
            //console.log(data.recieptData.recieptTime, 'rcp')
            const progress = this.progressControl({
               start : startTime,
               end   : endTime,
               ins   : insTime,
               req   : reqTime,
               rd    : rdTime,
               cont  : contTime,
               rcp   : rcpTime,
               sts   : data.status
            })
            // console.log(progress, data.ID)
            const arrayDlv = Object.keys(dlv)
            arrayDlv.forEach(keys => {
               if (keys.toUpperCase() == progress.toUpperCase()) dlv[keys].push(data)
            })
         })
         return {
            date        : date,
            month       : month,
            year        : year,
            startTime   : startTime,
            endTime     : endTime,
            dlv         : dlv
         }
      } else return undefined
   }
   findByStatus (param) {
      let array = []
      this.allData.forEach(data => {
         if (data.status.toUpperCase() == param.toUpperCase()) array.push(data)
      })
      if (array.length > 0) return array
      return undefined
   }
   findById (IDX) {
      if (this.allData.length > 0) {
         return this.allData.find(({ID}) => ID == IDX)
      } return undefined
   }
   setHTML () {
      if (this.allData.length > 0) {
         let html    = ' '
         this.allData.forEach(data => {
            let prog  = this.getTodayProgress(data.ID)
            html += `
            <div class="as-grup br-${prog}" data-progress='${prog}' data-id='${data.ID}' data-search='${data.name} ${data.phone} ${data.address} ${data.note} '>
               <div class="as-top bg-${prog}">
                  <p>${data.name}</p>
                  <span onclick="detail('${data.ID}', 'as')">${data.recieptData.rcpNum}</span>
               </div>
               <p class="as-address">${data.address}</p>
               <div class="as-middle">
                  <span>${data.phone}</span>
                  <div class="middle-icon">
                     <i onclick='href(${data.phone})' class="fas fa-phone"></i>
                     <i onclick='wa(${data.phone})'class="fab fa-whatsapp"></i>
                  </div>
               </div>
               <div class="as-bottom">
                  <span>Dlv. ${new Date(data.requestTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
                  <span>Instal. ${new Date(data.instalTime).toLocaleDateString(undefined, { weekday: 'long', year: 'numeric', month: 'long', day: 'numeric'})}</span>
               </div>
            </div>
            `
         })
         return html
      }
      return ''
   }
   save (data, RcpNum) {
      if (this.allData.findIndex(({rcpNum}) => RcpNum.toUpperCase() == rcpNum.toUpperCase()) >= 0) {
         alert('Reciept number has been used')
         return undefined
      }
      this.allData.push(data)
      return true
   }
   edit (data, newRcpNum, IDX) {
      const asProgress = JSON.parse(localStorage.getItem('asProgress'))
      if (asProgress.status != 'edit' || asProgress.ID != IDX) return undefined
      const i = this.allData.findIndex(({ID}) => ID == IDX)
      if (i < 0) return new Error('ID not Found')
      if (asProgress.rcpNum == newRcpNum) this.allData[i] = data
      else {
         const forRcpNum   = this.allData.findIndex(({rcpNum}) => newRcpNum == rcpNum)
         // console.log(forRcpNum, 'forRcpNum')
         if (forRcpNum < 0) this.allData[i] = data
         else {
            alert('This reciept number has been used')
            return false
         }
      }
      return true
   }
   remove (IDX) {
      if (this.allData.length >= 1) {
         let i = this.allData.find(({ID}) => ID == IDX)
         if (!i) return alert('Data nof Found !')
         if (!confirm('Remove afterSales ?')) return true
         this.allData.splice(i,1)
         return true
      }
      return false
   }
}

class taskControl {
   constructor() { this.allData   = JSON.parse(localStorage.getItem('TASK'))}
   create(arrayOfData, IDX, dataSearch, types = 'Bendhard16'){
      if (types == 'AS' && arrayOfData[0].length == 0 && arrayOfData[1].length == 0) return true
      let data = {
         ID       : IDX,
         type     : types,
         data     : arrayOfData,
         header   : dataSearch
      }
      const i = this.allData.findIndex(({ID}) => ID == IDX)
      if (i >= 0) this.allData[i] = data
      else if (i < 0) this.allData.push(data)
      else return undefined
      return true
   }
   findById (IDX) {
      if (this.allData.length >= 1) { return this.allData.find(({ID}) => ID == IDX)}
      return undefined
   }
   remove(IDX) {
      if (this.allData.length >= 1) {
         let i = this.allData.find(({ ID }) => ID == IDX)
         if (!i) return
         if (!confirm('Remove task ?')) return true
         this.allData.splice(i, 1)
         return true
      } 
      return false
   }
   setHtml () {
      if (this.allData.length > 0) {
         let html = ''
         this.allData.forEach(data => {
            let taskData = ''
            data.data.forEach(task => {
               taskData += `
                  <p> <i class="fa ${(task.progress == true) ? 'fa-check' : 'fa-spinner fa-spin'}"></i> ${task.note}</p>
               `
            })
            // console.log(data.type)
            let onclick = ''
            if (data.type.toUpperCase() == 'AS') onclick = `asSeeDetail(${data.ID})`
            if (data.type.toUpperCase() == 'FU') onclick = `fuSeeDetail(${data.ID})`
            html += `
               <div class="task-list-grup ${(data.type == 'as') ? 'as-task' : (data.type == 'fu') ? 'fu-task' : 'Bendhard16'}">
                  <span>${data.header} </span>
                  <i class="fas fa-circle-info" onclick="${onclick}"></i>
                  ${taskData}
               </div>
            `
         })
         return html
      }
      return ''
   }     
}

class scheduleControl {
   constructor () {
      this.allData   = JSON.parse(localStorage.getItem('schedule'))
      this.timeData  = JSON.parse(localStorage.getItem('scheduleTime'))
      this.getData   = function (date, param = false) {
         const datex    = new Date(date).getDate(),
            month       = new Date(date).getMonth(),
            year        = new Date(date).getFullYear()
         if (this.allData.length > 0) {   
            const Data  = this.allData.find(({code}) => code == `${month}${year}`)
            if (!Data) return undefined
            if (param == false ) return Data
            else return Data.list[datex - 1]
         }
         else return undefined
      }
      this.writeData = function (value, id, date) {
         let scheduleHtml  = '',
            color          = 'cyan',
            timeHtml       = '<option value="" data-color="cyan">Choose schedule</option>'
         this.timeData.forEach(time => {
            let selected = ''
            if (time.code.toUpperCase() == value.toUpperCase()) {
               selected = 'selected'
               color    = time.color }
            timeHtml += `
               <option value='${time.code}' data-color='${time.color}' ${selected}>${time.code}${(time.time == '') ? '' : ' - (' + time.time +')'}</option>
            `
         })
         scheduleHtml += `
            <div class="schedule-grup">
               <label for="${id}" class="bg-${color}">${date}</label>
               <select class='schedule-select' id="${id}">
                  ${timeHtml}
               </select>
            </div>
         `
         return scheduleHtml
      }
   }
   setHtml () {
      let html    = ''
      const data  = this.getData(new Date())
      if (!data) {
         let month   = new Date().getMonth(),
            year     = new Date().getFullYear(),
            lastDate = new Date(year, month + 1, 0).getDate()
         for (let i = 1; i <= lastDate; i++) { html += this.writeData('.', `sch${i}`, (i < 10) ? '0' + i : i)}
      } else data.list.forEach((sch, i) => {
         i ++
         html += this.writeData(sch, `sch${i}`, (i < 10) ? '0' + i : i)
      })
      return html
   }
   setTimeHtml () {
      let timeHtml =''
      schxTime.forEach(time => {
         timeHtml += `
            <div class="time-grup" data-code='${time.code.toUpperCase()}'>
               <input type="text" readonly class='time-code bg-${time.color}' value='${time.code.toUpperCase()}'>
               <input type="text" readonly class='time-value' value='${(time.time == '') ? '' : time.time}'>
               <select onchange='timeColor(this)'>
                  <option value='${time.color}'>${time.color.charAt(0).toUpperCase() + time.color.slice(1)}</option>
                  <option value='red'>Red</option>
                  <option value='blue'>Blue</option>
                  <option value='green'>Green</option>
                  <option value='yellow'>Yellow</option>
                  <option value='black'>Black</option>
                  <option value='purple'>Purple</option>
                  <option value='cyan'>Cyan</option>
               </select>
               <input type='checkbox' class='check-form' data-text='Use ?' ${(!time.use) ? '' : 'checked'}>
               <!-- <i class="fas fa-trash" onclick="timeRemove(this)"></i> -->
            </div>
         `
      })
      return timeHtml
   }
   save (data) {
      const month    = new Date().getMonth(),
         year = new Date().getFullYear()
      const index    = this.allData.findIndex(({code}) => code == `${month}${year}`)
      if (index >= 0) this.allData[index].list = data
      else this.allData.push({
         code  : `${month}${year}`,
         list  : data
      })
      localStorage.setItem('schedule', JSON.stringify(this.allData))
   }
   saveTime (data) {
      localStorage.setItem('scheduleTime', JSON.stringify(data))
   }
   timeRemoves(time) {
      this.allData.forEach(data => {
         data.list.forEach(code => {
            if (code.toUpperCase() == time.toUpperCase()) return code = ''
         })
      })
      localStorage.setItem('SCHEDULE', JSON.stringify(this.allData))
   }
}

function timeColor (elm) {
   const firstElm       = elm.parentElement.firstElementChild
   firstElm.className   = ''
   firstElm.classList.add('bg-'+ elm.value)
}

class calendar {
   constructor (datex){
      this.date            = new Date(datex).getDate()
      this.month           = new Date(datex).getMonth()
      this.moon            = new Date(datex).toLocaleDateString('en-US', { month: 'long' });
      this.year            = new Date(datex).getFullYear()
      this.firstDay        = new Date(this.year, this.month, 1).getDay()
      this.lastDate        = new Date(this.year, this.month + 1, 0).getDate()
      this.setDateList     = function (title, data, bg, type) {
         const seeDetail   = (type == 'as') ? `asSeeDetail` : `fuSeeDetail`;
         // console.log(bg, 'data')
         //if(!data) console.log(bg, title)
         let html = `<div class='date-grup'><h4 class='${bg}'>${title}</h4>`
         data.forEach(In => {
            html +=
               `<div class='date-list ${bg}'>
                  <p onclick="${seeDetail}('${In.ID}');">${In.name} - ${In.phone}</p>
                  <i class="fab fa-whatsapp"></i>
               </div>`
         })
         html += `</div><hr>`
         if (!data) return ''
         return html
      }
      
      let beginHtml = ``
      for (let i = 0; i < this.firstDay; i++) {beginHtml += `<div class="calendars begin"></div>`}
      this.beginHtml = beginHtml
      let mainHtml = ``
      
      const schedule = SCHEDULE.getData(new Date(datex))
      
      for (let i = 1; i <= this.lastDate; i++) {
         const paramDate   = new Date(this.year, this.month, i)
         let fuListParam   = false, schText = '', colorx = '', bgx =''
         if (schedule) {
            schText = schedule.list[i-1]
            const schTimex = schxTime.find(({code}) => schText.toUpperCase() == code.toUpperCase())
            if (!schTimex) schText = ''
            else if (schTimex && schTimex.use == true) {
               colorx   = schTimex.color.toLowerCase()
            }
            else if (schTimex && schTimex.use == false) {
               colorx   = 'cyan'
            }
         }
         let today = ''
         if (i == new Date().getDate()
            && this.month == new Date().getMonth()
            && this.year == new Date().getFullYear()) {
               today = 'today'
               // console.log(colorx)
            }
         
         let fuDataHtml ='', fuInList ='', fuOutList ='', fuPastList =''
         if (FU.allData.length > 0) {
            const fux      = FU.findByDate(paramDate)
            // console.log(i, fux)
            if (fux){
               if (fux.In.length > 0)        {
                  // console.log(i, fux.In)
                  fuDataHtml  += `<div class='fu-in'></div>` 
                  fuInList    = this.setDateList('FU In', fux.In, 'bg-blue', 'fu')
                  fuListParam = true }
               if (fux.Out.length > 0)       {
                  fuDataHtml  += `<div class='fu-out'></div>`
                  fuOutList   = this.setDateList('FU Out', fux.Out, 'bg-red', 'fu')
                  fuListParam = true}
               if (fux.past.length > 0)      {
                  fuDataHtml  += `<div class='fu-past'></div>`
                  fuPastList  = this.setDateList('FU Past', fux.past, 'bg-black', 'fu')
                  fuListParam = true}
            }
         }
         //console.log(fuInList)
         
         let asDataHtml ='', onprepareList ='', prepareList='', shippingList ='', onshippingList ='', readyList ='', deliveryList ='', instalList ='', pastList =''
         if (AS.allData.length > 0) {
            const asData   = AS.findByDate(paramDate)
            if (asData) {
               const Dlv = asData.dlv
               //console.log(Dlv)
               // console.log(Dlv.onshipping)
               if (Dlv.prepare.length > 0)   {
                  asDataHtml     += `<div class='as-prepare'></div>`
                  prepareList    = this.setDateList('AS Prepare',  Dlv.prepare, 'bg-green', 'as')
                  fuListParam    = true}
               if (Dlv.onprepare.length > 0) {
                  onprepareList  = this.setDateList('AS On-Prepare', Dlv.onprepare, 'bg-green', 'as')
                  fuListParam    = true
                  }
               if (Dlv.shipping.length > 0)  {
                  asDataHtml     += `<div class='as-shipping'></div>`
                  shippingList   = this.setDateList('AS Start-Shipping',  Dlv.shipping, 'bg-purple', 'as')
                  fuListParam    = true}
               if (Dlv.onshipping.length > 0)  {
                  // console.log('onshipping')
                  onshippingList = this.setDateList('AS On-Shipping', Dlv.onshipping, 'bg-purple', 'as')
                  fuListParam = true}
               if (Dlv.ready.length > 0)     {
                  asDataHtml     += `<div class='as-ready'></div>`
                  readyList      = this.setDateList('AS Ready',  Dlv.ready, 'bg-blue', 'as')
                  fuListParam    = true}
               if (Dlv.delivery.length > 0)  {
                  asDataHtml     += `<div class='as-delivery'></div>`
                  deliveryList   = this.setDateList('AS Delivery',  Dlv.delivery, 'bg-red', 'as')
                  fuListParam    = true}
               if (Dlv.instal.length > 0)    {
                  asDataHtml     += `<div class='as-instal'></div>`
                  instalList     = this.setDateList('AS Instal',  Dlv.instal, 'bg-yellow', 'as')
                  fuListParam    = true}
               if (Dlv.past.length > 0)      {
                  asDataHtml     += `<div class='as-past'></div>`
                  pastList       = this.setDateList('AS Past',  Dlv.past, 'bg-black', 'as')
                  fuListParam    = true}
            }
         }
         
         // console.log(schText, colorx, i)
         let calendarList = '',
                  allList = pastList + fuOutList + deliveryList + fuPastList + instalList + readyList + prepareList + onprepareList + fuInList + shippingList + onshippingList
         if (fuListParam) {
            calendarList += `
               <div class='date-data-list dis-none'>
                  <h4 class='date-list-head allH4 bg-${colorx}'>${schText.toUpperCase()} - ${(i < 10) ? '0'+i : i}/${(parseFloat(this.month) < 10) ? '0' + this.month : this.month}/${this.year} </h4>
                  <hr>
                  <div class='date-list-data'> `
            calendarList +=  allList
            calendarList +=`
                  </div>
               </div>
            `
         }
         // (today == 'today') ? console.log(colorx) : ''
         mainHtml += `
            <div class="calendars main ${(today == 'today') ? 'clr-' + colorx + ' today': 'cl-' + colorx}" ${(fuListParam == true ) ? "onclick='seeList(this, event.target)'" : ''}>
               <div class='fu-calendar'>
                  ${fuDataHtml}
               </div>
               <div class='date-calendar'>
                  <span>${i < 10 ? '0' + i : i}</span>
                  <span>${schText.toUpperCase()}</span>
               </div>
               <div class='as-calendar'>
                  ${asDataHtml}
               </div>
               ${calendarList}
            </div>
         `
      }
      this.mainHtml = mainHtml
   }
   setAllHTML () {
      return this.beginHtml + this.mainHtml
   }
   setHTML () {
      
   }
}

