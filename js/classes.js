                                                                                                                                                                                                                                                                                                                                                                                                                                                                                                


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
            } else if (estEnd <= endTime && startTime <= new Date().getTime() + 864000 && data.status != 'Fail')
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
                     <a onclick='wa(${data.phone})'><i class="fab fa-whatsapp"></i></a>
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
      this.progressControl    = function ({start, end, ins, req, rd, cont, rcp, sts, pickUp}) {
         let progress = 'Bendhard16'
         if (sts.toUpperCase() == 'DELIVERY'
            && req < start 
            && new Date().getTime() >= start)            return 'past'
         else if (sts.toUpperCase() == 'DELIVERY DONE' 
            && ins < start 
            && new Date().getTime() >= start
            && ins != '')                                return 'past'
         if (ins > 0 && ins >= start && ins <= end)      progress = 'instal'
         if (rd > 0 && rd <= end && req >= start)        progress = 'ready'
         if (req >= start && req <= end)                 progress = 'delivery'
         if (cont > 0 && cont <= start && rd >= end)     progress = 'onshipping'
         if (cont > 0 && cont >= start && cont <= end)   progress = 'shipping'
         if (cont > 0 && rcp <= start && cont >= end)    progress = 'onprepare'
         if (cont == 0 && rcp <= start && req >= end)    progress = 'onprepare'
         if (rcp >= start && rcp <= end)                 progress = 'prepare' 
         if (progress == 'delivery' && pickUp == true)   progress = 'pickUp'
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
            sts   : data.status,
            pickUp: data.pickUp
         })
         return (progress == 'onprepare') ? 'prepare' : (progress == 'onshipping') ? 'shipping' : progress
      }
      this.extractReciept     = function (recieptNum) {
         const array       = recieptNum.split('.')
         const dateString  = array[2]
         const year        = dateString.slice(0, 4)
         const month       = dateString.slice(4, 6)
         const day         = dateString.slice(6, 8)
         const dateObject  = new Date(`${year}-${month}-${day} 09:00:00`);
         return {
            rcpNum         : recieptNum,
            bookingCode    : array[0],
            cashier        : array[1],
            recieptDate    : array[2],
            recieptOrder   : array[3],
            recieptTime    : new Date(dateObject).getTime()
         }
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
         instal      : [], past        : [], pickUp   : []
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
            const progress = this.progressControl({
               start : startTime,
               end   : endTime,
               ins   : insTime,
               req   : reqTime,
               rd    : rdTime,
               cont  : contTime,
               rcp   : rcpTime,
               sts   : data.status,
               pickUp: data.pickUp
            })
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
   findByRecieptNum(param){
      return this.allData.find(({rcpNum}) => rcpNum == param)
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
            let prog    = this.getTodayProgress(data.ID),
               display  = (prog == 'Bendhard16') ? 'dis-none' : ''
            html += `
            <div class="as-grup br-${prog} ${display}" data-progress='${prog}' data-id='${data.ID}' data-search='${data.name} ${data.phone} ${data.address} ${data.note} '>
               <div class="as-top bg-${prog}">
                  <p>${data.name}</p>
                  <span onclick="asSeeDetail('${data.ID}')">${data.recieptData.rcpNum}</span>
               </div>
               <p class="as-address">${data.address}</p>
               <div class="as-middle">
                  <span>${data.phone}</span>
                  <div class="middle-icon">
                     <i onclick='phoneCall("${data.phone}")' class="fas fa-phone"></i>
                     <i onclick='wa("${data.phone}")' class="fab fa-whatsapp"></i>
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
      let datax = { ID : IDX, type : types, data : arrayOfData, header : dataSearch}
      const i = this.allData.findIndex(({ID}) => ID == IDX)
      //console.log('xxx', i, this.allData[i])
      if (arrayOfData.length == 0) {
         this.allData.splice(i,1)
         return true
      }
      if (i >= 0) this.allData[i] = datax
      else if (i < 0) this.allData.push(datax)
      else return undefined
      return true
   }
   findById (IDX) {
      if (this.allData.length >= 1) { return this.allData.find(({ID}) => ID == IDX)}
      return undefined
   }
   remove(IDX) {
      if (this.allData.length >= 1) {
         let i = this.allData.findIndex(({ID}) => ID == IDX)
         if (i < 0) return false
         if (!confirm('Remove task?')) return false
         this.allData.splice(i, 1)
         return true
      } return false
   }
   setHtml () {
      if (this.allData.length > 0) {
         let html = ''
         this.allData.forEach(data => { // console.log(data.ID)
            let taskData = ''
            data.data.forEach(task => {
               taskData += ` <p> <i class="fa ${(task.progress == true) ? 'fa-check' : 'fa-spinner fa-spin'}"></i> ${task.note}</p><hr>`
            })
            //console.log(data.type, data.ID, 'ID')
            let onclick = '', type = ''
            if (data.type.toUpperCase() == 'AS')   onclick = `asSeeDetail(${data.ID})`
            if (data.type.toUpperCase() == 'FU')   onclick = `fuSeeDetail(${data.ID})`
            if (data.type == 'Bendhard16')         onclick = `taskSeeDetail(${data.ID})`
            html += `
               <div class="task-list-grup" data-type='${data.type.toUpperCase()}'>
                  <span>${data.header} </span>
                  <i class="fas fa-circle-info" onclick="${onclick}"></i>
                  ${taskData}
               </div>
            `
         })
         return html
      } return ''
   }
   getProgress () {
      if (this.allData.length > 0) {
         let data = { complete : [], progress : [] }
         this.allData.forEach(task => {
            let param = true
            task.data.forEach(prog => {
               if (prog.progress == true) return
               param = false
            })
            if (param) return data.complete.push(task)
            return data.progress.push(task)
         })
         return data
      } return undefined
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
               <input type='checkbox' class='check-form check-use' data-text='Use ?' ${(!time.use) ? '' : 'checked'}>
               <input type='checkbox' class='check-form check-work' data-text='Work ?' ${(!time.work) ? '' : 'checked'}>
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
   isWork(codex) {
      // console.log(codex)
      return this.timeData.find(({code}) => code.toUpperCase() == codex).work
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
                  <i onclick='wa(${In.phone})' class="fab fa-whatsapp"></i>
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
         
         let asDataHtml ='', onprepareList ='', prepareList='', shippingList ='', onshippingList ='', readyList ='', deliveryList ='', pickUpList ='', instalList ='', pastList =''
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
                  fuListParam    = true}
               if (Dlv.shipping.length > 0)  {
                  asDataHtml     += `<div class='as-shipping'></div>`
                  shippingList   = this.setDateList('AS Start-Shipping',  Dlv.shipping, 'bg-purple', 'as')
                  fuListParam    = true}
               if (Dlv.onshipping.length > 0)  {
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
               if (Dlv.pickUp.length > 0) {
                  asDataHtml += `<div class='as-pickUp'></div>`
                  pickUpList = this.setDateList('AS PickUp', Dlv.pickUp, 'bg-red', 'as')
                  fuListParam = true}
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
                  allList = pastList + fuOutList + deliveryList + pickUpList + fuPastList + instalList + readyList + prepareList + onprepareList + fuInList + shippingList + onshippingList
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

class salesCardControl {
   constructor() {
      this.allData         = JSON.parse(localStorage.getItem('salesCard'))
      this.deptData        = JSON.parse(localStorage.getItem('department'))
      this.fetchData       = JSON.parse(localStorage.getItem('FETCH'))
      this.fetchByDate     = function (theDate = new Date()) {
         if (this.fetchData.length <= 0) return 
         if (theDate instanceof Date == false) return 
         const date  = new Date(theDate).getDate(),
            datex    = (date <= 9) ? '0' + date : date,
            month    = new Date(theDate).getMonth() + 1,
            monthx   = (month <= 9) ? '0' + month : month,
            year     = new Date(theDate).getFullYear(),
            theDatex = year + '' + monthx + '' + datex,
            array    = this.fetchData.filter(({recieptNum}) => recieptNum.indexOf(theDatex) >= 0)
         if (array.length == 0) return undefined
         return array
      }
      this.fetchByReciept  = function(rcpNum){
         const newArray = this.fetchData.filter(({recieptNum}) => recieptNum == rcpNum)
         return newArray
      }
      this.checkDeptByCode = function (codex) {
         const index = this.deptData.findIndex(({code}) => code.toUpperCase() == codex.toUpperCase())
         if (index < 0) return undefined
         return this.deptData[index]
      }
      this.getMonthTarget  = function (param = new Date()) {
         const date  = new Date(param).getDate(),
            month    = new Date(param).getMonth(),
            year     = new Date(param).getFullYear(),
            theMonth = month + '' + year,
            i        = this.allData.findIndex(({code}) => code == theMonth)
         
         if (i >= 0) return this.allData[i]
         return undefined
      }
   }
   controlFormData (data, param = new Date()) {
      const date  = new Date(param).getDate(),
         month    = new Date(param).getMonth(),
         year     = new Date(param).getFullYear(),
         theMonth = month + '' + year,
         i        = this.allData.findIndex(({code}) => code == theMonth)
      
      data.code   = theMonth
      if (i >= 0) {
         this.allData[i] = data
         localStorage.setItem('salesCard', JSON.stringify(this.allData))
      } else {
         this.allData.push(data)
         localStorage.setItem('salesCard', JSON.stringify(this.allData))
      }
      return true
   }
   calculateData (paramDate) {
      if (!paramDate || paramDate == '' ) return {
         status   : false,
         error    : 'Date data Error'
      }
      const theDatex = new Date(paramDate)
      const target   = this.getMonthTarget(new Date(theDatex))
      if (target == undefined) return {
         status   : false,
         error    : 'Target not found'
      }
      // console.log(this.fetchData)
      const fetch    = this.fetchData
      if (fetch.length == 0) return {
         status : false,
         error  : 'FetchData Error'
      }
      const schedule = new scheduleControl()
      const schData  = schedule.getData(new Date(theDatex)).list
      if (!schData) return {
         status: false,
         error: 'Schedule not found'
      }
      const date  = new Date(theDatex).getDate(),
         month    = new Date(theDatex).getMonth() + 1,
         monthx   = (month < 10) ? '0' + month : month,
         year     = new Date(theDatex).getFullYear(),
         theMonth = year + '' + monthx,
         lastDate = new Date(new Date(theDatex).getFullYear(), new Date(theDatex).getMonth() + 1, 0).getDate(),
         dateText = new Date(theDatex).toLocaleDateString(undefined, {year: 'numeric', month: 'long'})
         
      let monthFtr   = 0, monthAcc = 0, monthAll = 0, monthFP = 0, dateDatax = {all : 0, ftr : 0, acc : 0, fp : 0}
      let getDept    = [], valuex = 0
      
      for (let i = 1; i <= date; i++) {
         const dateData = this.fetchByDate(new Date(year, month -1 , i))
         // console.log(dateData, i)
         if (dateData) {
            let onDateAll = 0, onDateFtr = 0, onDateAcc = 0, onDateFP = 0
            dateData.forEach(data => {
               const deptCode = data.dept,
                  deptType    = this.checkDeptByCode(deptCode).type
               onDateAll += parseInt(data.total)
               if (deptType.toUpperCase() == 'ACCESSORIES') onDateAcc += parseInt(data.total)
               if (deptType.toUpperCase() == 'FURNITURE') onDateFtr += parseInt(data.total)
               if (data.itemName.toUpperCase().indexOf('FURNIPRO') >= 0) onDateFP += parseInt(data.qty)
               if (deptCode == 'N') valuex += parseInt(data.total)
               let x = getDept.findIndex(({code}) => code.toUpperCase() == deptCode.toUpperCase())
               if (x >= 0) return getDept[x].value += parseInt(data.total)
               getDept.push({
                  code  : deptCode.toUpperCase(),
                  value : parseInt(data.total)
               })
            })
            monthFtr += onDateFtr
            monthAcc += onDateAcc
            monthAll += onDateAll
            monthFP  += onDateFP
            if (i == date) dateDatax = {
               all : onDateAll,
               ftr : onDateFtr,
               acc : onDateAcc,
               fp  : onDateFP
            } 
         }
      }
      
      const newSchedule = schData.slice(parseInt(date) - 1)
      let work = 0
      newSchedule.forEach(code => {
         if (schedule.isWork(code.toUpperCase())) return work++
      })
      
      let mainTarget          = target.mainTarget,
         furnitureTarget      = target.furnitureTarget,
         accessoriesTarget    = target.accessoriesTarget,
         furniProTarget       = target.FPTarget,
         
         xMainTarget          = mainTarget.toLocaleString(),
         xFurnitureTarget     = furnitureTarget.toLocaleString(),
         xAccessoriesTarget   = accessoriesTarget.toLocaleString(),
         xFurniProTarget      = furniProTarget.toLocaleString(),
         
         smtdPercent          = Math.ceil((date / lastDate) * 100),
         smtdDecimal          = smtdPercent / 100,
         xSmtdPercent         = smtdPercent + '%',
         
         smtdValueAll         = mainTarget * smtdDecimal,
         smtdValueFtr         = furnitureTarget * smtdDecimal,
         smtdValueAcc         = accessoriesTarget * smtdDecimal,
         smtdQtyFP            = Math.ceil(furniProTarget * smtdDecimal),
         
         xSmtdValueAll        = smtdValueAll.toLocaleString(),
         xSmtdValueFtr        = smtdValueFtr.toLocaleString(),
         xSmtdValueAcc        = smtdValueAcc.toLocaleString(),
         xSmtdQtyFP           = smtdQtyFP.toLocaleString(),
         
         mtdPercentAll        = parseFloat(((monthAll / mainTarget) * 100).toFixed(2)),
         mtdPercentFtr        = parseFloat(((monthFtr / furnitureTarget) * 100).toFixed(2)),
         mtdPercentAcc        = parseFloat(((monthAcc / accessoriesTarget) * 100).toFixed(2)),
         mtdPercentFP         = parseFloat(((monthFP / furniProTarget) * 100).toFixed(2)),
         
         xMtdPercentAll       = mtdPercentAll + '%',
         xMtdPercentFtr       = mtdPercentFtr + '%',
         xMtdPercentAcc       = mtdPercentAcc + '%',
         xMtdPercentFP        = mtdPercentFP + '%',
         
         xMtdValueAll         = monthAll.toLocaleString(),
         xMtdValueFtr         = monthFtr.toLocaleString(),
         xMtdValueAcc         = monthAcc.toLocaleString(),
         
         gapValueAll          = monthAll - smtdValueAll,
         gapValueFtr          = monthFtr - smtdValueFtr,
         gapValueAcc          = monthAcc - smtdValueAcc,
         gapQtyFP             = monthFP - smtdQtyFP,
         
         xGapValueAll         = (gapValueAll < 0) ? gapValueAll.toLocaleString() : '+' + gapValueAll.toLocaleString(),
         xGapValueFtr         = (gapValueFtr < 0) ? gapValueFtr.toLocaleString() : '+' + gapValueFtr.toLocaleString(),
         xGapValueAcc         = (gapValueAcc < 0) ? gapValueAcc.toLocaleString() : '+' + gapValueAcc.toLocaleString(),
         xGapQtyFP            = (gapQtyFP < 0) ? gapQtyFP.toLocaleString() : '+' + gapQtyFP.toLocaleString(),
         
         gapPercentAll        = mtdPercentAll - smtdPercent,
         gapPercentFtr        = mtdPercentFtr - smtdPercent,
         gapPercentAcc        = mtdPercentAcc - smtdPercent,
         gapPercentFP         = mtdPercentFP - smtdPercent,
         
         xGapPercentAll       = (gapPercentAll < 0) ? gapPercentAll.toFixed(2) + '%' : '+' + gapPercentAll.toFixed(2) + '%',
         xGapPercentFtr       = (gapPercentFtr < 0) ? gapPercentFtr.toFixed(2) + '%' : '+' + gapPercentFtr.toFixed(2) + '%',
         xGapPercentAcc       = (gapPercentAcc < 0) ? gapPercentAcc.toFixed(2) + '%' : '+' + gapPercentAcc.toFixed(2) + '%',
         xGapPercentFP        = (gapPercentFP < 0) ? gapPercentFP.toFixed(2) + '%' : '+' + gapPercentFP.toFixed(2) + '%',
         
         gapColorAll          = (gapValueAll < 0) ? 'red' : 'green',
         gapColorFtr          = (gapValueFtr < 0) ? 'red' : 'green',
         gapColorAcc          = (gapValueAcc < 0) ? 'red' : 'green',
         gapColorFP           = (gapQtyFP < 0) ? 'red' : 'green',
         
         toAchievValueAll     = monthAll - mainTarget,
         toAchievValueFtr     = monthFtr - furnitureTarget,
         toAchievValueAcc     = monthAcc - accessoriesTarget,
         toAchievQtyFP        = monthFP - furniProTarget,
         
         toAcvPercentAll      = mtdPercentAll - 100,
         toAcvPercentFtr      = mtdPercentFtr - 100,
         toAcvPercentAcc      = mtdPercentAcc - 100,
         toAcvPercentFP       = mtdPercentFP - 100,
         
         toAchievAll          = (toAchievValueAll < 0) ? toAcvPercentAll.toFixed(2) + '% ' + toAchievValueAll.toLocaleString() : '☆ ACHIEV ☆',
         toAchievFtr          = (toAchievValueFtr < 0) ? toAcvPercentFtr.toFixed(2) + '% ' + toAchievValueFtr.toLocaleString() : '☆ ACHIEV ☆',
         toAchievAcc          = (toAchievValueAcc < 0) ? toAcvPercentAcc.toFixed(2) + '% ' + toAchievValueAcc.toLocaleString() : '☆ ACHIEV ☆',
         toAchievFP           = (toAchievQtyFP < 0) ? toAcvPercentFP.toFixed(2) + '% ' + toAchievQtyFP.toLocaleString() : '☆ ACHIEV ☆',
         
         toAchievAllColor     = (toAchievValueAll < 0) ? 'color-red' : 'color-green',
         toAchievFtrColor     = (toAchievValueFtr < 0) ? 'color-red' : 'color-green',
         toAchievAccColor     = (toAchievValueAcc < 0) ? 'color-red' : 'color-green',
         toAchievFPColor      = (toAchievQtyFP < 0) ? 'color-red' : 'color-green'
      
      
      let smtdHTML = `
         <div class="target-value">
            <h5>Main Target : ${xMainTarget}</h5>
            <h5 data-note="SMTD">${xSmtdPercent} ${xSmtdValueAll}</h5> |
            <h5 data-note="MTD">${xMtdPercentAll} ${xMtdValueAll}</h5> |
            <h5 data-note="Gap" class="color-${gapColorAll}">${xGapPercentAll} ${xGapValueAll}</h5> |
            <h5 data-note="toAchiev" class="${toAchievAllColor}">${toAchievAll}</h5>
         </div>
         <div class="target-value">
            <h5>Furniture Target : ${xFurnitureTarget}</h5>
            <h5 data-note="SMTD">${xSmtdPercent}  ${xSmtdValueFtr}</h5> |
            <h5 data-note="MTD">${xMtdPercentFtr} ${xMtdValueFtr}</h5> |
            <h5 data-note="Gap" class="color-${gapColorFtr}">${xGapPercentFtr} ${xGapValueFtr}</h5> |
            <h5 data-note="toAchiev" class="${toAchievFtrColor}">${toAchievFtr}</h5>
         </div>
         <div class="target-value">
            <h5>Accessories Target : ${xAccessoriesTarget}</h5>
            <h5 data-note="SMTD">${xSmtdPercent}  ${xSmtdValueAcc}</h5> |
            <h5 data-note="MTD">${xMtdPercentAcc} ${xMtdValueAcc}</h5> |
            <h5 data-note="Gap" class="color-${gapColorAcc}">${xGapPercentAcc} ${xGapValueAcc}</h5> |
            <h5 data-note="toAchiev" class="${toAchievAccColor}">${toAchievAcc}</h5>
         </div>
      `
      
      let smtdFP  = `
         <span>FP Target : ${furniProTarget}</span>|
         <span>SMTD : ${smtdQtyFP}</span>|
         <span>MTD : ${monthFP}</span>|
         <span class="color-${gapColorFP}">GAP : ${xGapQtyFP}</span>
      `
      
      let yesterdayAll     = monthAll - dateDatax.all,
         yesterdayAcc      = monthAcc - dateDatax.acc,
         yesterdayFtr      = monthFtr - dateDatax.ftr,
         yesterdayFP       = monthFP - dateDatax.fp,
         
         daysAll           = (monthAll >= mainTarget) ? parseInt((.02 * mainTarget).toFixed(0)) : parseFloat(((mainTarget - yesterdayAll) / work).toFixed(0)),
         daysAcc           = (monthAcc >= accessoriesTarget) ? parseInt((.02 * accessoriesTarget).toFixed(0)) :parseFloat(((accessoriesTarget - yesterdayAcc) / work).toFixed(0)),
         daysFtr           = (monthFtr >= mainTarget) ? parseInt((.02 * furnitureTarget).toFixed(0)) : parseFloat(((furnitureTarget - yesterdayFtr) / work).toFixed(0)),
         daysFP            = (monthFP >= furniProTarget) ? 4 : Math.ceil((furniProTarget - yesterdayFP) / work),
         
         xDaysAll          = daysAll.toLocaleString(),
         xDaysAcc          = daysAcc.toLocaleString(),
         xDaysFtr          = daysFtr.toLocaleString(),
         xDaysFP           = daysFP.toLocaleString(),
         
         datePercentAll    = ((dateDatax.all / daysAll) * 100).toFixed(1),
         datePercentAcc    = ((dateDatax.acc / daysAcc) * 100).toFixed(1),
         datePercentFtr    = ((dateDatax.ftr / daysFtr) * 100).toFixed(1),
         datePercentFP     = ((dateDatax.fp / daysFP) * 100).toFixed(1),
         
         xDatePercentAll   = (datePercentAll > 100) ? '100' : datePercentAll,
         xDatePercentFtr   = (datePercentFtr > 100) ? '100' : datePercentFtr,
         xDatePercentAcc   = (datePercentAcc > 100) ? '100' : datePercentAcc,
         xDatePercentFP    = (datePercentFP > 100) ? '100' : datePercentFP,
         
         dateRemainAll     = dateDatax.all - daysAll,
         dateRemainAcc     = dateDatax.acc - daysAcc,
         dateRemainFtr     = dateDatax.ftr - daysFtr,
         dateRemainFP      = dateDatax.fp - daysFP,
         
         xDateColorAll     = (dateRemainAll < 0) ? 'color-red' : 'color-green',
         xDateColorFtr     = (dateRemainFtr < 0) ? 'color-red' : 'color-green',
         xDateColorAcc     = (dateRemainAcc < 0) ? 'color-red' : 'color-green',
         xDateColorFP      = (dateRemainFP < 0) ? 'color-red' : 'color-green',
         
         xDateBgAll        = (dateRemainAll < 0) ? '' : 'bg-green',
         xDateBgFtr        = (dateRemainFtr < 0) ? '' : 'bg-green',
         xDateBgAcc        = (dateRemainAcc < 0) ? '' : 'bg-green',
         xDateBgFP         = (dateRemainFP < 0) ? '' : 'bg-green',
         
         xDateRemainAll    = (dateRemainAll < 0) ? dateRemainAll.toLocaleString() : '+' + dateRemainAll.toLocaleString(),
         xDateRemainFtr    = (dateRemainFtr < 0) ? dateRemainFtr.toLocaleString() : '+' + dateRemainFtr.toLocaleString(),
         xDateRemainAcc    = (dateRemainAcc < 0) ? dateRemainAcc.toLocaleString() : '+' + dateRemainAcc.toLocaleString(),
         xDateRemainFP     = (dateRemainFP < 0) ? dateRemainFP.toLocaleString() : '+' + dateRemainFP.toLocaleString()
      
      const onDateHTML = `
         <div class="date-sales ">
            <label >onALL : ${xDaysAll}</label>
            <p class="">
               <span>${dateDatax.all.toLocaleString()}</span>
               <span>${datePercentAll}%</span>
            </p>
            <p class="${xDateColorAll}"> ${xDateRemainAll}</p>
         </div>|
         <div class="date-sales">
            <label>onFTR : ${xDaysFtr}</label>
            <p class="">
               <span>${dateDatax.ftr.toLocaleString()}</span>
               <span>${datePercentFtr}%</span>
            </p>
            <p class="${xDateColorFtr}"> ${xDateRemainFtr}</p>
         </div>|
         <div class="date-sales">
            <label>onACC : ${xDaysAcc}</label>
            <p class="">
               <span>${dateDatax.acc.toLocaleString()}</span>
               <span>${xDatePercentAcc}%</span>
            </p>
            <p class="${xDateColorAcc}"> ${xDateRemainAcc}</p>
         </div>|
         <div class="date-sales">
            <label>onFP : ${xDaysFP}</label>
            <p class="">
               <span>${dateDatax.fp.toLocaleString()}</span>
               <span>${xDatePercentFP}%</span>
            </p>
            <p class="${xDateColorFP}"> ${xDateRemainFP}</p>
         </div>
      `
   
      const targetDashboard = `
         <p>
            mainTarget <br>
            ${xMainTarget} ~ ${xDaysAll}
         </p>|
         <p>
            furnitureTarget <br>
            ${xFurnitureTarget} ~ ${xDaysFtr}
         </p>|
         <p>
            accessoriesTarget <br>
            ${xAccessoriesTarget} ~ ${xDaysAcc}
         </p>
      `
      
      let diffAll = 0, diffFtr = 0, diffAcc = 0,
         currAll  = 0, currFtr = 0, currAcc = 0
         
      if (monthAll < smtdValueAll) {
         currAll  = mtdPercentAll + '%'
         diffAll  = gapPercentAll * -1 + '%'
      } else {
         currAll  = smtdPercent + '%'
         diffAll  = gapPercentAll + '%'
      }
      if (monthFtr < smtdValueFtr) {
         currFtr  = mtdPercentFtr + '%'
         diffFtr  = gapPercentFtr * -1 + '%'
      } else {
         currFtr  = smtdPercent + '%'
         diffFtr  = gapPercentFtr + '%'
      }
      if (monthAcc < smtdValueAcc) {
         currAcc  = mtdPercentAcc + '%'
         diffAcc  = gapPercentAcc * -1 + '%'
      } else {
         currAcc  = smtdPercent + '%'
         diffAcc  = gapPercentAcc + '%'
      }
      
      const dashboardDiagram = `
         <div class="bar-box">
            <div class="box-main">
               <div class="different bg-${gapColorAll} color-${gapColorAll}" data-value="${xGapValueAll}" data-height="${diffAll}"></div>
               <div class="current color-${gapColorAll}" data-value="${xMtdValueAll}" data-height="${currAll}"></div>
            </div>
            <div class="box-days ${xDateColorAll} ${xDateBgAll}" data-value="${dateDatax.all.toLocaleString()}" data-height="${xDatePercentAll}" data-remain="${xDateRemainAll}"></div>
         </div>|
         <div class="bar-box">
            <div class="box-main">
               <div class="different color-${gapColorFtr}  bg-${gapColorFtr}" data-value="${xGapValueFtr}" data-height="${diffFtr}"></div>
               <div class="current color-${gapColorFtr}" data-value="${xMtdValueFtr}" data-height="${currFtr}"></div>
            </div>
            <div class="box-days ${xDateColorFtr} ${xDateBgFtr}" data-value="${dateDatax.ftr.toLocaleString()}" data-height="${xDatePercentFtr}" data-remain="${xDateRemainFtr}"></div>
         </div>|
         <div class="bar-box">
            <div class="box-main">
               <div class="different color-${gapColorAcc} bg-${gapColorAcc}" data-value="${xGapValueAcc}" data-height="${diffAcc}"></div>
               <div class="current color-${gapColorAcc}" data-value="${xMtdValueAcc}" data-height="${currAcc}"></div>
            </div>
            <div class="box-days ${xDateColorAcc} ${xDateBgAcc}" data-value="${dateDatax.acc.toLocaleString()}" data-height="${xDatePercentAcc}" data-remain="${xDateRemainAcc}"></div>
         </div>
      `
      
      // return {status : false}
      
      return {
         status      : true,
         smtdHTML    : smtdHTML,
         smtdFP      : smtdFP,
         onDateHTML  : onDateHTML,
         dateText    : dateText,
         target      : target,
         table       : this.fetchData.html,
         data        : fetch,
         diagramHTML : dashboardDiagram,
         targetHTML  : targetDashboard,
      }
   }
   removeMonth (theDate) {
      const date  = new Date(theDate).getDate(),
         month    = new Date(theDate).getMonth(),
         year     = new Date(theDate).getFullYear(),
         code     = month + '' + year,
         theMonth = this.findByMonth(new Date(theDate))
      
      if (theMonth) {
         const i  = theMonth.index
         this.allData[i].splice(i,1)
      }
      localStorage.setItem('salesCard', JSON.stringify(this.allData))
   }
   async fetchingData(url) {
      const sheet    = await fetch(url)
      if (!sheet.ok) return console.log(new Error('Status : ' + sheet.Status))
         
      const text     = await sheet.text()
      const first    = '<table class="waffle" cellspacing="0" cellpadding="0">'
      const last     = '</table>'
         
      const getText  = new RegExp(`${first}(.*?)${last}`);
      const inHtml   = text.match(getText)[1].trim()
      
      if (inHtml == '') return {
            status   : false,
            error    : 'Table not found !',
            next     : false
         }
      else {
         const table    = document.createElement('table')
         table.innerHTML= inHtml
         document.querySelector('#for-data-display').classList.remove('dis-none')
         document.querySelector('#the-data').appendChild(table)
         const rowx     = table.querySelector('tbody tr td')
         const rows     = table.querySelectorAll('tbody tr')
         const key      = ['recieptNum', 'stokCode', 'itemName', 'dept', 'qty', 'unitPrice', 'discounts', 'disc', 'total']
         
         if (rowx.length < key.length) return {
               status   : false,
               error    : 'Less Column !',
               next     : false
            }
         else {
            table.querySelectorAll('thead tr th').forEach((th, i) => {
               // th.textContent = key[i-1]
            })
            
            let resultData = [], 
               errorRow    = false,
               emptyInside = false,
               lessColumn  = false
               
            rows.forEach((row, i) => {
               const tr       = row.querySelectorAll('td'),
                  theObject   = {}
               let startIndex = 1000,
                  endIndex    = 500,
                  param       = false,
                  countEmpty  = 0,
                  keys        = 0
               tr.forEach((td, n) => {
                  let text = td.textContent
                     text  = text.replace(/,/g, '')
                  if (text == '' 
                     && n < startIndex) return countEmpty ++
                  if (text.indexOf('G8.') >= 0) {
                     startIndex  = n
                     endIndex    = n + key.length - 1
                  }
                  if (n >= startIndex 
                     && n <= endIndex 
                     && text == '' ) {emptyInside = true; td.style.backgroundColor = 'red !important;'}
                  param = true
                  theObject[key[keys]] = text
                  keys ++
               })
               if (countEmpty >= key.length || countEmpty >= tr.length) return rows[i].remove()
               if (startIndex == 1000) {
                  errorRow = true
                  return tr.forEach(td => td.classList.add('bg-redx'))
               }
               if (endIndex - startIndex > tr.length - startIndex) return lessColumn = true
               if (param) resultData.push(theObject)
            })
            
            // console.log(resultData)
            if (errorRow) return {
                  status   : false,
                  error    : 'Error Row',
                  next     : true,
                  data     : resultData,
                  html     : table
               }
            if (lessColumn) return {
                  status   : false,
                  error    : 'Less Column',
                  next     : false 
               }
            if (emptyInside) return {
                  status   : false,
                  error    : 'Empty Data',
                  next     : false 
               }
               
            return {
               status   : true,
               data     : resultData
            }
         }
      }
   }
   DOChecking () {
      if (this.fetchData.length > 0) {
         const as    = new asControl(),
            asData   = as.allData
         if (asData.length > 0) {
            const array = []
            this.fetchData.forEach(data => {
               const rcp = data.recieptNum
               if (rcp.indexOf('UG8.') < 0) return 
               if (!as.findByRecieptNum(rcp)) return array.push(rcp)
            })
            if (array.length <= 0) return undefined 
            return array
         }
         return undefined
      }
      return undefined
   }
}


