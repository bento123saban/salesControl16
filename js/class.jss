                                                                                                                                                                                                                                                                                                                                

'use strict'
class main {
    constructor () {
        this.dateCode   = function(param = new Date()) {
            const datex = new Date(param).getDate(),
                date    = (datex > 9) ? datex : '0' + datex,
                monthx  = new Date(param).getMonth() + 1,
                month   = (monthx > 9) ? monthx : '0' + monthx,
                year    = new Date(param).getFullYear(),
                last    = new Date(year, monthx, 0).getDate(),
                LTime   = new Date (param).setHours(23,59,59,999), 
                FTime   = new Date (param).setHours(0,0,0,0)
            return {
                longText    : new Date(param).toLocaleString('default', {weekday: 'long', day: 'numeric', month: 'long', year: 'numeric'}),
                dateText    : new Date(param).toLocaleString('default', {weekday:  'short', day: 'numeric', month: 'short', year: 'numeric'}),
                monthCode   : `${month}${year}`,
                dateCode    : `${date}${month}${year}`,
                rcpDate     : `${year}${month}${date}`,
                rcpMonth    : `${year}${month}`,
                length      : datex,
                first       : 1,
                firstDay    : new Date(`${year}/${month}/1`).getDay(),
                firstName   : new Date(`${year}/${month}/1`).toLocaleString('default', {weekday: 'short'}),
                firstLong   : new Date(`${year}/${month}/1`).toLocaleString('default', {weekday: 'long'}),
                last        : last,
                lastDay     : new Date(`${year}/${month}/${last}`).getDay(),
                lastName    : new Date(`${year}/${month}/${last}`).toLocaleString('default', {weekday: 'short'}),
                lastLong    : new Date(`${year}/${month}/${last}`).toLocaleString('default', {weekday: 'long'}),
                date        : datex,
                dateNum     : date,
                dateLong    : new Date(param).toLocaleString('default', {date: 'numeric', month: 'long', year: 'numeric'}),
                dayName     : new Date(param).toLocaleString('default', {weekday: 'short'}),
                dayLong     : new Date(param).toLocaleString('default', {weekday: 'long'}),
                monthNum    : month,
                month       : monthx,
                monthName   : new Date(param).toLocaleString('default', {month: 'short'}),
                monthLong   : new Date(param).toLocaleString('default', {month: 'long'}),
                year        : year,
                firstDayTime: new Date (FTime).getTime(),
                lastDayTime : new Date (LTime).getTime()
            }
        }
        this.dateRange  = function (dateOne, dateTwo) {
            const timeOne   = new Date (dateOne).getTime(),
                timeTwo     = new Date (dateTwo).getTime()
                
            return {
                milSecRange : ((timeTwo - timeTwo) < 0) ? parseInt((timeTwo - timeOne)) * 1 : parseInt(timeTwo - timeOne),
                secRange    : milSecRange / 1000,
                minRange    : secRange / 60,
                hourRange   : minRange / 60,
                dayRange    : hourRange / 24
            }
        }
        this.statusData = [{
            status      : "prepare",
            color       : "prepare", 
            clr         : "limegreen",
            hiden       : false,
            icon        : '/assets/icon/dolly (1).png'
        }, {
            status      : "onprepare",
            color       : "prepare", 
            clr         : "limegreen",
            hiden       : true,
            icon        : '/assets/icon/dolly (1).png'
        }, {
            status      : "start-shipping",
            color       : "shipping", 
            clr         : "purple",
            hiden       : false,
            icon        : '/assets/icon/cargo-ship (2).png'
        }, {
            status      : "onshipping",
            color       : "shipping", 
            clr         : "purple",
            hiden       : true,
            icon        : '/assets/icon/cargo-ship (2).png'
        }, {
            status      : "ready",
            color       : "ready", 
            clr         : "deepskyblue",
            hiden       : false,
            icon        : '/assets/icon/box (3).png'
        }, {
            status      : "delivery",
            color       : "delivery", 
            clr         : "red",
            hiden       : false,
            icon        : '/assets/icon/truck.png'
        }, {
            status      : "pickup",
            color       : "delivery", 
            clr         : "red",
            hiden       : true,
            icon        : '/assets/icon/delivery-boy.png'
        }, {
            status      : "instal",
            color       : "instal", 
            clr         : "gold",
            hiden       : true,
            icon        : '/assets/icon/drill (1).png'
        }, {
            status      : "past-del",
            color       : "past", 
            clr         : "black",
            hiden       : false,
            icon        : '/assets/icon/deadline (7).png'
        }, {
            status      : "past-ins",
            color       : "past", 
            clr         : "black",
            hiden       : false,
            icon        : '/assets/icon/deadline (7).png'
        }, {
            status      : "problem",
            color       : "past", 
            clr         : "black",
            hiden       : false,
            icon        : '/assets/icon/warning.png'
        }]
    }
}

class salesCard {
    
    constructor () {
        this.allData            = JSON.parse(localStorage.getItem('salesCard'))
        this.deptData           = JSON.parse(localStorage.getItem('department'))
        this.fetchData          = JSON.parse(localStorage.getItem('FETCH'))
        this.fetchByDate        = function (theDate = new Date()) {
            if (this.allData.length <= 0) return undefined
            if (theDate instanceof Date == false) return 
            const dateCode  = new main().dateCode(new Date(theDate)).rcpDate
            let array       = '165925'
            this.allData.forEach((fetch, x) => {
                array = fetch.sales.filter(({reciept}) => reciept.indexOf(dateCode) >= 0)
            })
            if (array.length >= 1) return array
            return undefined 
        }
        this.fetchByReciept     = function (rcpNum){
            const newArray = this.fetchData.filter(({recieptNum}) => recieptNum == rcpNum)
            return newArray
        }
        this.checkDeptByCode    = function (codex) {
            const index = this.deptData.findIndex(({code}) => code.toUpperCase() == codex.toUpperCase())
            if (index < 0) return undefined
            return this.deptData[index]
        }
        this.getData            = function (param = new Date()) {
            const code  = new main().dateCode(param).monthCode,
                i       = this.allData.findIndex(data => data.code == code)
            if (i < 0) return undefined
            return {
                sales   : this.allData[i].sales,
                target  : this.allData[i].target,
                index   : i
            }
        }
        this.getSales           = function (param = new Date()) {
            const code  = new main().dateCode(param).monthCode,
                i       = this.allData.findIndex(data => data.code == code)
            if (i < 0) return undefined
            return {
                sales    : this.allData[i].sales,
                index   : i
            }
        }
        this.findFetch          = function (param = new Date()) {
            const monthCode = new main().dateCode(param).monthCode,
                i           = this.fetchData.findIndex(data => data.code == monthCode)
            if (i < 0) return undefined
            return this.fetchData[i].sales
        }
        this.weekCount          = function (datex = new Date()) {
            const code  = new main().dateCode(datex),
                last    = code.last,
                weeky   = Math.ceil(last/7),
                random  = Array(last).fill(1).map((x,y) => x + y),
                month   = code.month - 1,
                year    = code.year
            let weeks   = [],
                week    = []
                
            random.forEach((i) => {
                const dt    = new Date(year,month,i),
                    day     = dt.getDay()
                week.push(i)
                if (day == 0) {
                    weeks.push(week)
                    week = new Array(0)
                }
            })
            if (weeks.length >= weeky) return weeks
            let v = weeks.length - 1,
                w = weeks[v],
                x = w.length - 1,
                y = weeks[v][x] + 1,
                z = Array(last - y + 1).fill(y).map ((a,b) => a + b)
            weeks.push(z)
            return weeks
        }
        this.dataByMonth        = function (param) {
            
        }
        this.gapCurrent         = class {
            constructor (target, smtdDecimal, type, color, up = false) {
                this.smtdDecimal = smtdDecimal
                this.smtdPercent = smtdDecimal * 100
                this.smtd       = Math.ceil(smtdDecimal * target)
                this.type       = type
                this.color      = color
                this.target     = parseInt(target)
                this.mtd        = 0
                this.SMTD       = function () {
                    return {
                        value   : this.smtd.toLocaleString(),
                        percent : this.smtdPercent + '%'
                    }
                }
                this.TARGET     = function () {
                    return {
                        value   : this.target.toLocaleString()
                    }
                }
                this.MTD        = function () {
                    const mtdPercent = (this.mtd > 0) ? (this.mtd / this.target) * 100 : 0
                    return {
                        value   : this.mtd.toLocaleString(),
                        percent : (mtdPercent == 0) ? 0 : mtdPercent.toFixed(2) + '%',
                        prc     : mtdPercent
                    }
                }
                this.PROGRESS   = function () {
                    const progress  = this.mtd - this.target,
                        achiev      = (this.mtd > this.target) ? true : false
                    return {
                        achiev      : achiev,
                        value       : progress.toLocaleString(),
                        string      : (achiev) ? '☆ ACHIEV ☆' : `${(progress > 0) ? '+' : '' + progress.toLocaleString()}`,
                        percent     : ((progress / this.target) * 100).toFixed(2) + '%',
                        transform   : (this.mtd == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
                    }
                }
                this.GAP        = function () {
                    const gap   = this.mtd - this.smtd,
                        percent = (gap/ this.target) * 100
                    return {
                        value   : ((gap > 0) ? '+' : '') + gap.toLocaleString(),
                        percent : ((gap > 0) ? '+' : '') + percent.toFixed(2) + '%',
                        height  : (gap < 0) ? (percent * -1).toFixed(2) + '%' : `${(this.PROGRESS().achiev) ? 0 : percent.toFixed(2)}%`,
                        color   : (gap > 0) ? 'green' : 'grey',
                        current : (this.PROGRESS().achiev) ? '100%' : `${(gap > 0) ? this.smtdPercent + '%' : this.MTD().percent}`,
                    }
                }
            }
            /*
                
                const smtdValue     = target * parseFloat(smtdDecimal),
                    mtdDecimal      = (mtdValue / target) * 100,
                    gapValue        = mtdValue - smtdValue,
                    gapDecimal      = (gapValue / target) * 100,
                    progress        = mtdValue - target,
                    achiev          = (mtdValue >= target) ? true : false
                
                return {
                    target          : parseInt(target),
                    targetString    : parseInt(target).toLocaleString(),
                    
                    SMTD            : (smtdDecimal * target).toLocaleString(),
                    SMTDPercent     : (smtdDecimal*100) + '%',
                    
                    MTD             : mtdValue.toLocaleString(),
                    MTDPercent      : mtdDecimal.toFixed(2) + '%',
                    
                    achiev          : achiev,
                    
                    gap             : ((gapValue > 0) ? '+' : '') + gapValue.toLocaleString(),
                    gapPercent      : ((gapValue > 0) ? '+' : '') + gapDecimal.toFixed(2) + '%',
                    gapColor        : (gapValue < 0) ? 'grey' : 'green',
                    
                    progress        : ((progress > 0) ? '+' : '') + progress.toLocaleString(),
                    progressPercent : ((progress > 0) ? '+' : '') + ((progress / target) * 100).toFixed(2) + '%',
                    
                    gapHeight       : (gapDecimal <= 0) ? (smtdDecimal - mtdDecimal) + '%' : `${(mtdValue >= target) ? 0 : mtdDecimal - smtdDecimal}%`,
                    currentHeight   : (achiev) ? '100%' : `${(gapDecimal >= 0) ? smtdDecimal : smtdDecimal - mtdDecimal} %`
                } */
        }
    }
    async fetchingData(url) {   
        const sheet = await fetch(url)
        if (!sheet.ok) return console.log(new Error('Status : ' + sheet.Status))
    
        const text = await sheet.text()
        const first = '<table class="waffle" cellspacing="0" cellpadding="0">'
        const last = '</table>'
    
        const getText = new RegExp(`${first}(.*?)${last}`);
        const inHtml = text.match(getText)[1].trim()
    
        if (inHtml == '') return {
            status: false,
            error: 'Table not found !',
            next: false
        }
        else {
            const table = document.createElement('table')
            table.innerHTML = inHtml
            document.querySelector('#the-data').appendChild(table)
            const rowx = table.querySelector('tbody tr td')
            const rows = table.querySelectorAll('tbody tr')
            const key = ['recieptNum', 'stokCode', 'itemName', 'dept', 'qty', 'unitPrice', 'discounts', 'disc', 'total']
    
            if (rowx.length < key.length) return {
                status: false,
                error: 'Less Column !',
                next: false
            }
            else {
                /*table.querySelectorAll('thead tr th').forEach((th, i) => {
                    // th.textContent = key[i-1]
                })*/
    
                let resultData = [],
                    errorRow = false,
                    emptyInside = false,
                    lessColumn = false
    
                rows.forEach((row, i) => {
                    const tr = row.querySelectorAll('td'),
                        theObject = {}
                    let startIndex = 1000,
                        endIndex = 500,
                        param = false,
                        countEmpty = 0,
                        keys = 0
                    tr.forEach((td, n) => {
                        let text = td.textContent
                        text = text.replace(/,/g, '')
                        if (text == '' &&
                            n < startIndex) return countEmpty++
                        if (text.indexOf('G8.') >= 0) {
                            startIndex = n
                            endIndex = n + key.length - 1
                        }
                        if (n >= startIndex &&
                            n <= endIndex &&
                            text == '') { emptyInside = true;
                            td.style.backgroundColor = 'red !important;' }
                        param = true
                        theObject[key[keys]] = text
                        keys++
                    })
                    if (countEmpty >= key.length || countEmpty >= tr.length) return rows[i].remove()
                    if (startIndex == 1000) {
                        errorRow = true
                        return tr.forEach(td => td.classList.add('bg-redx'))
                    }
                    if (endIndex - startIndex > tr.length - startIndex) return lessColumn = true
                    if (param) resultData.push(theObject)
                })
    
                if (errorRow) return {
                    status: false,
                    error: 'Error Row',
                    next: true,
                    data: resultData,
                    html: table
                }
                if (lessColumn) return {
                    status: false,
                    error: 'Less Column',
                    next: false
                }
                if (emptyInside) return {
                    status: false,
                    error: 'Empty Data',
                    next: false
                }
                return {
                    status: true,
                    data: resultData
                }
            }
        }
    }
    async sheetyFetch(url) {
        const sheet = await fetch(url)
        if (!sheet.ok) return console.log(new Error('Status : ' + sheet.Status))
        const data  = await sheet.json()
        return data
    }
    saveAS (data, date) {
        if (data =='' || date == '') return alert('false parameter')
        const dataTarget = this.getData(date)
        if (!dataTarget) {
            this.allData.push({
                code    : new main().dateCode(new Date(date)).monthCode,
                target  : data.target, 
                sales   : data.sales
            })
        } else {
            this.allData[dataTarget.index].target   = data.target
            this.allData[dataTarget.index].sales    = data.sales
        }
        localStorage.setItem('salesCard', JSON.stringify(this.allData))
        return true 
    }
    /*HTML(param = new Date()) {
        const code      = new main().dateCode(new Date(param)),
            dates       = code.date,
            weeksy      = this.weekCount(param),
            month       = code.month,
            year        = code.year,
            last        = code.last,
            todayx      = new main().dateCode(new Date()).dateCode,
            target      = this.getData(new Date()).target,
            smtdPercent = Math.ceil(dates/last*100),
            mainData    = new this.gapCurrent(target.main, smtdPercent/100),
            ftrData     = new this.gapCurrent(target.main, smtdPercent/100),
            accData     = new this.gapCurrent(target.main, smtdPercent/100),
            fpValData   = new this.gapCurrent(target.main, smtdPercent/100),
            fpQtyData   = new this.gapCurrent(target.main, smtdPercent/100, true),
            
            mainTarget  = target.main,
            mainSMTD    = mainTarget * (smtdPercent/100),
            ftrTarget   = target.furniture,
            ftrSMTD     = ftrTarget * (smtdPercent/100),
            accTarget   = target.accessories,
            accSMTD     = accTarget * (smtdPercent/100),
            fpTarget    = target.furnipro,
            fpSMTDX     = fpTarget * (smtdPercent/100),
            fpSMTD      = Math.ceil(fpSMTDX),
            fpValTarget = target.fpValue,
            fpValSMTD   = fpValTarget * (smtdPercent/100),
            deptTarget  = target.dept,
            daysTarget  = mainTarget/last
            
        const departements = []
        target.dept.forEach(dpt => departements.push({
            code            : dpt[0],
            target          : (dpt[1] == '') ? 1000000 : parseInt(dpt[1]) ,
            MTD             : 0,
            QTY             : 0,
            SKU             : []
        }))
        let mainMTD = 0,
            ftrMTD  = 0,
            accMTD  = 0,
            fpMTD   = 0,
            fpValMTD= 0,
            wParam  = 1,
            XTML    = ``,
            DEPHTL  = ``,
            wlHTML  = ``,
            daySalesHTML    = ``,
            ix      = 0,
            mainAcv = false,
            ftrAcv  = false,
            accAcv  = false,
            fpAcv   = false,
            fpVAcv  = false
            
        weeksy.forEach((week, n) => {
            let wTarget = daysTarget * week.length,
                WTD     = 0,
                wCode   = 'W' + (n+1),
                wMain   = 0,
                wFtr    = 0,
                wAcc    = 0,
                wFP     = 0,
                wFPVal  = 0,
                wLength = week.length,
                wWidth  = 131 * wLength + ((wLength - 1) * 15),
                HTML    = `<div class="week-box">
                            <div class="days">`
                
            week.forEach((datex, i) => {
                let dales = dates + 1
                if (datex >=  dales || dales > last + 1) return //console.log( dates, last)
                let tommorow = (dales == datex) ? 'tommorow' : '';
                
                wParam = n + 1
                const DATE      = new Date(year, month - 1, datex),
                    DATEcode    = new main().dateCode(DATE).dateCode,
                    remainWork  = new schedule().remainWork(DATE).work,
                    dayTarget   = {
                        main    : (mainAcv) ? 5000000 : parseInt((mainTarget - mainMTD) / remainWork),
                        ftr     : (ftrAcv)  ? 4000000 : parseInt((ftrTarget - ftrMTD) / remainWork),
                        acc     : (accAcv)  ? 1000000 : parseInt((accTarget - accMTD) / remainWork),
                        fp      : (fpAcv)   ?       2 : Math.ceil((fpTarget - fpMTD) / remainWork),
                        fpVal   : (fpVAcv)  ?  300000 : Math.ceil((fpValTarget - fpValSMTD) / remainWork)
                    }
                let dayMain = 0, dayFtr = 0, dayAcc = 0, dayFP = 0, dayFpVal = 0, daySKU = [], dayQty = 0, dayRcp = [], dayDept = []
                
                const dateData = new salesCard().fetchByDate(DATE)
                if (dateData) {
                    dateData.forEach(item => {
                        
                        let total   = parseInt(item.total.replace(/,/g, '')),
                            dept    = item.dept.toUpperCase(),
                            type    = new salesCard().checkDeptByCode(dept).type.toUpperCase()
                        
                        if (dept == 'AJ' && item.productName.toUpperCase().indexOf('FURNIPRO') >= 0) {
                            dayFP += parseInt(item.qty)
                            dayFpVal += total
                        }
                        const i = departements.findIndex(dpt => dpt.code.toUpperCase() == dept.toUpperCase())
                        departements[i].MTD += total
                        let x = departements.findIndex(depts => depts.code.toUpperCase() == dept)
                        if(departements[i].SKU.findIndex(code => code == item.article) < 0) departements[x].SKU.push(item.article)
                        if(daySKU.findIndex(code => code == item.article) < 0) daySKU.push(item.article)
                        if(dayRcp.findIndex(rcp => rcp == item.reciept) < 0) dayRcp.push(item.reciept)
                        departements[i].dayQty += parseInt(item.total)
                        dayMain += total
                        dayQty += parseInt(item.qty)
                        if (type == 'FURNITURE') dayFtr += total
                        if (type == 'ACCESSORIES') dayAcc += total
                        let o = dayDept.findIndex(deptx => deptx.code.toUpperCase() == dept.toUpperCase())
                        if (o >= 0) dayDept[o].total += total
                        else dayDept.push({
                            code : dept,
                            total: total
                        })
                    })
                }
                
                let dayMainPercent  = (dayMain >= dayTarget.main) ? '100' : ((dayMain/dayTarget.main) * 100).toFixed(2),
                    dayMainGap      = (dayMain >= dayTarget.main) ? '☆☆☆' : dayMain - dayTarget.main,
                    dayMainFloat    = (dayMain <= 0) ? '' : (dayMain / 10**6).toFixed(2),
                    dayMainTgtFloat = (dayTarget.main / 10**6).toFixed(2),
                    dayMainColor    = (dayMain <= 0) ? 'gray' : 'darkcyan',
                    
                    dayFtrPercent   = (dayFtr >= dayTarget.ftr) ? '100' : ((dayFtr/dayTarget.ftr) * 100).toFixed(2),
                    dayFtrGap       = (dayFtr >= dayTarget.ftr) ? '☆☆☆' : dayFtr - dayTarget.ftr,
                    dayFtrFloat     = (dayFtr <= 0) ? '' : (dayFtr / 10**6).toFixed(2),
                    dayFtrTgtFloat  = (dayTarget.ftr / 10**6).toFixed(2),
                    dayFtrColor     = (dayFtr <= 0) ? 'gray' : 'darkcyan',
                    
                    dayAccPercent   = (dayAcc >= dayTarget.acc) ? '100' : ((dayAcc / dayTarget.acc) * 100).toFixed(2),
                    dayAccGap       = (dayAcc >= dayTarget.acc) ? '☆☆☆' : dayAcc - dayTarget.acc,
                    dayAccFloat     = (dayAcc <= 0) ? '' : (dayAcc / 10**6).toFixed(2),
                    dayAccTgtFloat  = (dayTarget.acc / 10**6).toFixed(2),
                    dayAccColor     = (dayAcc <= 0) ? 'gray' : 'darkcyan',
                    
                    dayFpPercent    = (dayFP >= dayTarget.fp) ? '100' : ((dayFP / dayTarget.fp) * 100).toFixed(2),
                    dayFpGap        = (dayFP >= dayTarget.fp) ? '☆☆☆' : dayFP - dayTarget.fp,
                    dayFpColor      = (dayFP <= 0) ? 'gray' : 'darkcyan',
                    
                    dayFpValPercent = (dayFpVal >= dayTarget.fpVal) ? '100' : ((dayFpVal / dayTarget.fpVal) * 100).toFixed(2),
                    dayFpValGap     = (dayFpVal >= dayTarget.fpVal) ? '☆☆☆' : dayFpVal - dayTarget.fpVal,
                    dayFpValColor   = (dayFpVal <= 0) ? 'gray' : 'darkcyan',
                    
                    schCode         = new schedule().findSchByDate(DATE),
                    schData         = new schedule().codeData(schCode),
                    schColor        = (schData.work) ? 'darkcyan' : schData.color
                
                let dayDeptHTML     = ``,
                    todayDepts      = ``
                dayDept.forEach(dept => {
                    dayDeptHTML += `
                        <div class="d-dept-group">
                            <span data-code="">${dept.code.toUpperCase()}</span>
                            <p>${dept.total.toLocaleString()}</p>
                        </div>
                    `
                    todayDepts += `
                        <div class="today-dept-code" data-code="${dept.code.toUpperCase()}"></div>
                    `
                })
                
                if (todayx == DATEcode ) {
                    daySalesHTML = `
                        <div class="db-today-main" style="--color: #008B8B;">
                            <label>today sales</label>
                            <p>${dayMain.toLocaleString()}<span>${dayMainPercent}%</span></p>
                            <div class="db-today-diagram">
                                <div class="db-today-bars" style="width: ${dayMainPercent}%"></div>
                            </div>
                        </div>
                        <div class="db-today-sales">
                            <div class="db-today-sales-group" style="--color: goldenrod;">
                                <div class="db-today-sales-top">
                                    <label>FTR</label>
                                     <span>${dayFtrPercent}%</span>
                                </div>
                                <p>${dayFtr.toLocaleString()}</p>
                                <div class="db-today-diagram">
                                    <div class="db-today-bars" style="width: ${dayFtrPercent}%"></div>
                                </div>
                            </div>
                            <div class="db-today-sales-group" style="--color: deepskyblue;">
                                <div class="db-today-sales-top">
                                    <label>Acc</label>
                                     <span>${dayAccPercent}%</span>
                                </div>
                                <p>${dayAcc.toLocaleString()}</p>
                                <div class="db-today-diagram">
                                    <div class="db-today-bars" style="width: ${dayAccPercent}%"></div>
                                </div>
                            </div>
                            <div class="db-today-sales-group" style="--color: #FF6969;">
                                <div class="db-today-sales-top">
                                    <label>FP</label>
                                     <span>${dayFpValPercent}%</span>
                                </div>
                                <p>${dayFpVal.toLocaleString()}</p>
                                <div class="db-today-diagram">
                                    <div class="db-today-bars" style="width: ${dayFpValPercent}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="today-dept ${(todayDepts == '') ? 'dis-none' : ''}" data-text="today dept">
                            ${todayDepts}
                        </div>
                    `
                }
                
                let works = ''
                if (tommorow == '') works = ''
                //console.log(dayFP)
                HTML += `
                    
                            <div class="day-group ${tommorow}">
                                <div class="day-top">
                                    <span class="${schColor}" data-date="${(datex < 10) ? '0' + datex : datex}"></span>
                                    <div class="day-sch">
                                        <p>${wCode} D${i + 1} - ${new main().dateCode(DATE).dayLong}</p>
                                        <label style="--color: ${schColor};">${schCode}</label>
                                    </div>
                                </div>
                                <div class="day-diagram">
                                    <div class="zonk">${(tommorow == '') ? '' : 'ESOK'}</div>
                                    <div class="d-diagram-box">
                                        <div class="d-box" data-type="main">
                                            <div class="d-bar"
                                                style="--color: darkcyan !important; --height: ${dayMainPercent}% !important;"
                                                data-target="${dayMainTgtFloat}" 
                                                data-mtd="${dayMainFloat}">
                                            </div>
                                        </div>
                                        <div class="d-box" data-type="ftr">
                                            <div class="d-bar"
                                                style="--color: #EEC600 !important; --height: ${dayFtrPercent}% !important;"
                                                data-target="${dayFtrTgtFloat}" 
                                                data-mtd="${dayFtrFloat}">
                                            </div>
                                        </div>
                                        <div class="d-box" data-type="acc">
                                            <div class="d-bar"
                                                style="--color: deepskyblue !important; --height: ${dayAccPercent}% !important;"
                                                data-target="${dayAccTgtFloat}" 
                                                data-mtd="${dayAccFloat}">
                                            </div>
                                        </div>
                                        <div class="d-box" data-type="fp">
                                            <div class="d-bar"
                                                style="--color: #FF6969 !important; --height: ${dayFpValPercent}% !important;"
                                                data-target="${dayTarget.fpVal.toLocaleString()}"
                                                data-mtd="${(dayFpVal == 0) ? '' : dayFpVal.toLocaleString()}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="day-detail">
                                    <div class="day-no-sales ${(dayMain > 0) ? 'dis-none' : ''}">
                                        <h6>No Sales</h6>
                                    </div>
                                    <h6>${new main().dateCode(DATE).dateText}</h6>
                                    <div class="detail-group" style="--color: darkcyan;" data-type="main">
                                        <label>Main</label>
                                        <span data-text="Target">${dayTarget.main.toLocaleString()}</span>
                                        <span data-text="Actual">${dayMain.toLocaleString()}</span>
                                        <span data-text="Actual%">${(dayMain/dayTarget.main*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayMainGap == '☆☆☆') ? dayMainGap : dayMainGap.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-group" style="--color: #EEC600;" data-type="ftr">
                                        <label>Furniture</label>
                                        <span data-text="Target">${dayTarget.ftr.toLocaleString()}</span>
                                        <span data-text="Actual">${dayFtr.toLocaleString()}</span>
                                        <span data-text="Actual%">${(dayFtr/dayTarget.ftr*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayFtrGap == '☆☆☆') ? dayFtrGap : dayFtrGap.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-group" style="--color: deepskyblue;" data-type="acc">
                                        <label>Accessories</label>
                                        <span data-text="Target">${dayTarget.acc.toLocaleString()}</span>
                                        <span data-text="Actual">${dayAcc.toLocaleString()}</span>
                                        <span data-text="Actual%">${(dayAcc/dayTarget.acc*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayAccGap == '☆☆☆') ? dayAccGap : dayAccGap.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-group" style="--color: #FF6969;" data-type="fp">
                                        <label>FurniPro</label>
                                        <span data-text="Target">${dayTarget.fpVal.toLocaleString() + ' - (' + dayTarget.fp.toLocaleString()})</span>
                                        <span data-text="Actual">${dayFpVal.toLocaleString() + ' - (' + dayFP.toLocaleString()})</span>
                                        <span data-text="Actual%">${(dayFpVal/dayTarget.fpVal*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayFpValGap == '☆☆☆') ? dayFpValGap : dayFpValGap.toLocaleString()}</span>
                                    </div>
                                    <div class="day-trx ${(dayMain <= 0) ? 'dis-none' : ''}">
                                        <p>${dayQty} QTY <br> ${daySKU.length} SKU <br> ${dayRcp.length} RECIEPT<p>
                                        <i class="fas fa-arrow-right" data-reciept="${new main().dateCode(DATE).rcpDate}"></i>
                                    </div>
                                    <div class="days-dept">
                                        <h6>Sales by Dept</h6>
                                        ${dayDeptHTML}
                                    </div>
                                </div>
                            </div>
                `
                    
                WTD += dayMain
                wMain += dayMain
                wFtr += dayFtr
                wAcc += dayAcc
                wFP += dayFP
                wFPVal += dayFpVal
                
                mainMTD += dayMain
                ftrMTD += dayFtr
                accMTD += dayAcc
                fpMTD += dayFP
                fpValMTD += dayFpVal
                
                if (mainMTD >= mainTarget)  mainAcv = true
                if (ftrMTD >= ftrTarget)    ftrAcv  = true
                if (accMTD >= accTarget)    accAcv  = true
                if (fpMTD >= fpTarget)      fpAcv   = true
                if (fpValMTD >= fpValTarget)fpVAcv  = true
                
            })
            
            if ((n + 1) > wParam) return
            const wPercent  = (WTD >= wTarget) ? '100' : ((WTD / wTarget) * 100).toFixed(2),
                WTDFloat    = (WTD/10**6).toFixed(2),
                wTgtFloat   = (wTarget/10**6).toFixed(2)
            HTML += '</div>'
            HTML += `
                
                        <div class="weeky-box">
                            <div class="week-group">
                                <p>Week ${n+1}</p>
                                <div class="week-number">
                                    <span>${WTDFloat}</span>
                                    <label>${wPercent}%</label>
                                    <span>${wTgtFloat}</span>
                                </div>
                                <div class="w-diagram">
                                    <div class="w-bar" style="width: ${wPercent}% !important;"></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            `
            XTML += HTML
        })
        departements.forEach(dpx => {
            let color = 'gray'
            if (dpx.MTD > 0) color = 'default'
            if (dpx.MTD >= dpx.target) color = 'green'
            
            let MTDPercent  = (dpx.MTD / dpx.target * 100).toFixed(2),
            SMTDPercent     = smtdPercent,
            SMTD            = Math.ceil(dpx.target * smtdPercent / 100),
            GAP             = parseInt(dpx.MTD - SMTD),
            GAPPercent      = (GAP / dpx.target * 100).toFixed(2),
            ToAchiev        = dpx.MTD - dpx.target,
            ToAchievPercent = (ToAchiev / dpx.target * 100).toFixed(2)
            
            DEPHTL += `
                <div class="sc-dept-group">
                    <div class="dept-code ${color}"
                        data-targets="${dpx.target.toLocaleString()}"
                        data-smtd="${SMTDPercent}% ${SMTD.toLocaleString()}"
                        data-toacv="${ToAchievPercent}% ${ToAchiev.toLocaleString()}"
                        data-mtd="${dpx.MTD.toLocaleString()}"
                        data-gap="${(GAP > 0) ? '+' + GAP.toLocaleString() : GAP.toLocaleString()}% ${(GAP > 0) ? '+'+ GAP.toLocaleString() : GAP.toLocaleString()}"
                        data-name="${new department().findDeptByCode(dpx.code).name.toUpperCase()}"
                        data-sku="${dpx.SKU.length} SKU - ${dpx.QTY} QTY"
                        data-class='${color}'
                    >${dpx.code}</div>
                </div>
            `
        })
        
        console.log(mainData)
        
        
        const colorMin          = 'grey',
            colorPlus           = 'green',
            mainMTDPercent      = (mainMTD/mainTarget)*100,
            mainCurrent         = (mainMTD >= mainSMTD) ? smtdPercent : mainMTDPercent,
            mainGapValue        = mainMTD - mainSMTD,
            mainGapPrc          = (mainGapValue/mainTarget)*100,
            mainGapPercent      = (mainGapValue < 0) ? (mainGapPrc * -1) : mainGapPrc,
            mainGapColor        = (mainGapValue < 0) ? colorMin : colorPlus,
            mainToAcvValue      = mainMTD - mainTarget,
            mainToAcvPercent    = (mainToAcvValue/mainTarget*100),
            mainTransform       = (mainMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
            
        const ftrMTDPercent     = (ftrMTD/ftrTarget)*100,
            ftrCurrent          = (ftrMTD >= ftrSMTD) ? smtdPercent : ftrMTDPercent,
            ftrGapValue         = ftrMTD - ftrSMTD,
            ftrGapPrc           = (ftrGapValue/ftrTarget)*100,
            ftrGapPercent       = (ftrGapValue < 0) ? (ftrGapPrc * -1) : ftrGapPrc,
            ftrGapColor         = (ftrGapValue < 0) ? colorMin : colorPlus,
            ftrToAcvValue       = ftrMTD - ftrTarget,
            ftrToAcvPercent     = (ftrToAcvValue/ftrTarget*100),
            ftrTransform        = (ftrMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
            
        const accMTDPercent     = (accMTD/accTarget)*100,
            accCurrent          = (accMTD >= accSMTD) ? smtdPercent : accMTDPercent,
            accGapValue         = accMTD - accSMTD,
            accGapPrc           = (accGapValue/accTarget)*100,
            accGapPercent       = (accGapValue < 0) ? (accGapPrc * -1) : accGapPrc,
            accGapColor         = (accGapValue < 0) ? colorMin : colorPlus,
            accToAcvValue       = accMTD - accTarget,
            accToAcvPercent     = (accToAcvValue/accTarget*100),
            accTransform        = (accMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
            
        const fpValMTDPercent      = (fpValMTD/fpValTarget)*100,
            fpValCurrent           = (fpValMTD >= fpValSMTD) ? smtdPercent : fpValMTDPercent,
            fpValGapVal            = fpValMTD - fpValSMTD,
            fpValGapValue          = (fpValGapVal < 0) ? Math.floor(fpValGapVal): '+' + Math.floor(fpValGapVal),
            fpValGapPrc            = (fpValGapVal/fpValTarget)*100,
            fpValGapPercent        = (fpValGapVal < 0) ? (fpValGapPrc * -1) : fpValGapPrc,
            fpValGapColor          = (fpValGapVal < 0) ? colorMin : colorPlus,
            fpValToAcvValue        = Math.floor(fpValMTD - fpValTarget),
            fpValToAcvPercent      = (fpValToAcvValue/fpValTarget*100),
            fpValTransform         = (fpValMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
        //console.log(fpValMTD, 'curr')
        const fpMTDPercent      = (fpMTD/fpTarget)*100,
            fpCurrent           = (fpMTD >= fpSMTDX) ? smtdPercent : fpMTDPercent,
            fpGapVal            = fpMTD - fpSMTDX,
            fpGapValue          = (fpGapVal < 0) ? Math.floor(fpGapVal): '+' + Math.floor(fpGapVal),
            fpGapPrc            = (fpGapVal/fpTarget)*100,
            fpGapPercent        = (fpGapVal < 0) ? (fpGapPrc * -1) : fpGapPrc,
            fpGapColor          = (fpGapVal < 0) ? colorMin : colorPlus,
            fpToAcvValue        = Math.floor(fpMTD - fpTarget),
            fpToAcvPercent      = (fpToAcvValue/fpTarget*100),
            fpTransform         = (fpMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
        
        //console.log(fpSMTD, fpMTD, 'ben')
        const sHTML = `
            <div class="dash-sales-mtd" data-text="Month-to-date">
                <p data-percent="(${mainData.mtdPercent})">${mainData.mtdValue}</p>
                <span> ${(mainGapValue > 0) ? '+' + mainGapValue.toLocaleString() : mainGapValue.toLocaleString()} (${mainGapPercent.toFixed(2)}%)</span>
            </div>
            <br>
            <div class="dash-sales-detail">
                <div class="sales-detail-box" style="--color: goldenrod;">
                    <h5>Furniture</h5>
                    <div class="sales-detail-mtd">
                        <p>${ftrMTD.toLocaleString()}</p>
                        <span>${ftrMTDPercent.toFixed(2)}%</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${(ftrGapValue < 0) ? ftrGapValue.toLocaleString() : '+' + ftrGapValue.toLocaleString()}</p>
                        <span>${(ftrGapValue >= 0) ? '+' : ''}${ftrGapPrc.toFixed(2)}%</span>
                    </div>
                </div>|
                <div class="sales-detail-box"  style="--color: deepskyblue;">
                    <h5>Accessories</h5>
                    <div class="sales-detail-mtd">
                        <p>${accMTD.toLocaleString()}</p>
                        <span>${accMTDPercent.toFixed(2)}%</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${(accGapValue < 0) ? '' : '+'}${accGapValue.toLocaleString()}</p>
                        <span>${(ftrGapValue >= 0) ? '+' : ''}${accGapPrc.toFixed(2)}%</span>
                    </div>
                </div>|
                <div class="sales-detail-box" style="--color: #FF6969;">
                    <h5>FurniPro</h5>
                    <div class="sales-detail-mtd">
                        <p>${fpValMTD.toLocaleString()}</p>
                        <span>${fpValMTDPercent.toFixed(2)}%</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${(fpValGapVal < 0) ? fpValGapVal.toLocaleString() : '+' + fpValGapVal.toLocaleString()}</p>
                        <span>${(fpValGapPrc > 0) ? '+' + fpValGapPrc.toFixed(2) : fpValGapPrc.toFixed(2)}%</span>
                    </div>
                </div>
            </div>
        `
        const mHTML = `
            <div class="diagram-box" style="--color: #008B8B;" data-type="Main" onclick="diagramControl(this)" data-order="1"
                    data-target="${parseInt(mainTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtd-value="${mainSMTD.toLocaleString()}"
                    data-mtd-percent="${mainMTDPercent.toFixed(2)}%"
                    data-mtd-value="${mainMTD.toLocaleString()}"
                    data-gap-percent="${mainGapPrc.toFixed(2)}%"
                    data-gap-value="${(mainGapValue >= 0) ? '+' : ''}${mainGapValue.toLocaleString()}"
                    data-to-achiev-value="${(mainToAcvValue >= 0) ? '☆ ACHIEV ☆' :mainToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${mainToAcvPercent.toFixed(2)}%"
                    data-color='${mainGapColor}'>
                <div class="acv-box"
                        data-mtd="${mainMTD.toLocaleString()}">
                    <div class="gap" 
                            data-bg='${mainGapColor}'
                            data-color='${mainGapColor}'
                            data-gap="${(mainToAcvValue >= 0) ? '☆ ACHIEV ☆' : mainGapValue.toLocaleString()}"
                            style="height: ${mainGapPercent.toFixed(2)}% !important;
                            transform: ${mainTransform} !important;"></div>
                    <div class="current" style="height: ${mainCurrent}% !important;"></div>
                </div>
            </div>
            
            <div class="diagram-box" style="--color: #EEC600;" data-type="Furniture" onclick="diagramControl(this)" data-order="2"
                    data-target="${parseInt(ftrTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtd-value="${ftrSMTD.toLocaleString()}"
                    data-mtd-percent="${ftrMTDPercent.toFixed(2)}%"
                    data-mtd-value="${ftrMTD.toLocaleString()}"
                    data-gap-percent="${ftrGapPrc.toFixed(2)}%"
                    data-gap-value="${(ftrGapValue >= 0) ? '+' : ''}${ftrGapValue.toLocaleString()}"
                    data-to-achiev-value="${(ftrToAcvValue >= 0) ? '☆ ACHIEV ☆' : ftrToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${ftrToAcvPercent.toFixed(2)}%"
                    data-color='${ftrGapColor}'>
                <div class="acv-box"
                        data-mtd="${ftrMTD.toLocaleString()}">
                    <div class="gap" 
                            data-bg='${ftrGapColor}'
                            data-color='${ftrGapColor}'
                            data-gap="${(ftrToAcvValue >= 0) ? '☆ ACHIEV ☆' : ftrGapValue.toLocaleString()}"
                            style="height: ${ftrGapPercent.toFixed()}% !important;
                            transform: ${ftrTransform} !important;"></div>
                    <div class="current" style="height: ${ftrCurrent}% !important;"></div>
                </div>
            </div>
            
            <div class="diagram-box" style="--color: deepskyblue;" data-type="Accessories" onclick="diagramControl(this)" data-order="3"
                    data-target="${parseInt(accTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtd-value="${accSMTD.toLocaleString()}"
                    data-mtd-percent="${accMTDPercent.toFixed(2)}%"
                    data-mtd-value="${accMTD.toLocaleString()}"
                    data-gap-percent="${accGapPrc.toFixed(2)}%"
                    data-gap-value="${(accGapValue >= 0) ? '+' : ''}${accGapValue.toLocaleString()}"
                    data-to-achiev-value="${(accToAcvValue >= 0) ? '☆ ACHIEV ☆' : accToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${accToAcvPercent.toFixed(2)}%"
                    data-color='${accGapColor}'>
                <div class="acv-box"
                        data-mtd="${accMTD.toLocaleString()}">
                    <div class="gap"
                            data-bg='${accGapColor}'
                            data-color='${accGapColor}'
                            data-gap="${(accToAcvValue >= 0) ? '☆ ACHIEV ☆' : accGapValue.toLocaleString()}"
                            style="height: ${accGapPercent.toFixed(2)}% !important;
                            transform: ${accTransform} !important;"></div>
                    <div class="current" style="height: ${accCurrent}% !important;"></div>
                </div>
            </div>
            
            <div class="diagram-box" style="--color: #FF6969;" data-type="FurniPro" onclick="diagramControl(this)" data-order="4"
                    data-target="${parseInt(fpValTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtd-value="${Math.ceil(fpValSMTD).toLocaleString()}"
                    data-mtd-percent="${fpValMTDPercent.toFixed(2)}%"
                    data-mtd-value="${fpValMTD.toLocaleString()}"
                    data-gap-percent="${fpValGapPrc.toFixed(2)}%"
                    data-gap-value="${fpValGapValue.toLocaleString()}"
                    data-to-achiev-value="${fpValToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${fpValToAcvPercent.toFixed(2)}%"
                    data-color='${fpValGapColor}'>
                <div class="acv-box"
                        data-mtd="${fpValMTD.toLocaleString()}">
                    <div class="gap" 
                            data-bg='${fpValGapColor}'
                            data-color='${fpValGapColor}'
                            data-gap="${(fpValToAcvValue >= 0) ? '☆ ACHIEV ☆' : fpGapValue.toLocaleString()}"
                            style="height: ${fpValGapPercent.toFixed(2)}% !important;
                            transform: ${fpValTransform} !important;"></div>
                    <div class="current" style="height: ${fpCurrent}% !important;"></div>
                </div>
            </div>
            
            <div class="sc-detail-box"></div>
        `
        return {
            weeks   : XTML,
            month   : mHTML,
            dept    : DEPHTL,
            home    : sHTML,
            today   : daySalesHTML
        }
    } */
    HTML(param) {
        const code      = new main().dateCode(new Date(param)),
            dates       = new Date(param).getDate(),
            weeksy      = this.weekCount(param),
            month       = code.month,
            year        = code.year,
            last        = code.last,
            todayx      = new main().dateCode(new Date()).dateCode,
            target      = this.getData(new Date()).target,
            smtdDex     = parseFloat(dates/last),
            smtdPercent = parseInt(Math.ceil(smtdDex * 100)),
            smtdDecimal = smtdPercent / 100,
            
            MAIN        = new this.gapCurrent(target.main, smtdDecimal, 'Main', '#008B8B'),
            FTR         = new this.gapCurrent(target.furniture, smtdDecimal, 'Furniture', '#EEC600'),
            ACC         = new this.gapCurrent(target.accessories, smtdDecimal, 'Accessories', 'deepskyblue'),
            FPVAL       = new this.gapCurrent(target.fpValue, smtdDecimal, 'FurniPro', '#FF6969'),
            FPQTY       = new this.gapCurrent(target.furnipro, smtdDecimal, 'FurniPro','#FF6969', true),
            
            deptTarget  = target.dept,
            daysTarget  = target.main/last
            //console.log(mainTarget,  '1')
        const departements = []
        target.dept.forEach(dpt => departements.push({
            code            : dpt[0],
            target          : (dpt[1] == '') ? 1000000 : parseInt(dpt[1]) ,
            MTD             : 0,
            QTY             : 0,
            SKU             : []
        }))
        let wParam  = 1,
            XTML    = ``,
            DEPHTL  = ``,
            wlHTML  = ``,
            daySalesHTML    = ``,
            ix      = 0
            
        weeksy.forEach((week, n) => {
            let wTarget = daysTarget * week.length,
                WTD     = 0,
                wCode   = 'W' + (n+1),
                wMain   = 0,
                wFtr    = 0,
                wAcc    = 0,
                wFP     = 0,
                wFPVal  = 0,
                wLength = week.length,
                wWidth  = 131 * wLength + ((wLength - 1) * 15),
                HTML    = `<div class="week-box">
                            <div class="days">`
            console.log(daysTarget, 'dtarget')
            week.forEach((datex, i) => {
                let dales = dates + 1
                if (datex >=  dales || dales > last + 1) return //console.log( dates, last)
                let tommorow = (dales == datex) ? 'tommorow' : '';
                
                wParam = n + 1
                const DATE      = new Date(year, month - 1, datex),
                    DATEcode    = new main().dateCode(DATE).dateCode,
                    remainWork  = new schedule().remainWork(DATE).work,
                    dayTarget   = {
                        main    : (MAIN.ACHIEV)  ? 5000000 : parseInt((MAIN.target - MAIN.mtd) / remainWork),
                        ftr     : (FTR.ACHIEV)   ? 4000000 : parseInt((FTR.target - FTR.mtd) / remainWork),
                        acc     : (ACC.ACHIEV)   ? 1000000 : parseInt((ACC.target - ACC.mtd) / remainWork),
                        fp      : (FPQTY.ACHIEV) ?       2 : Math.ceil((FPQTY.target - FPQTY.mtd) / remainWork),
                        fpVal   : (FPVAL.ACHIEV) ?  300000 : Math.ceil((FPVAL.target - FPVAL.mtd) / remainWork)
                    }
                let dayMain = 0, dayFtr = 0, dayAcc = 0, dayFP = 0, dayFpVal = 0, daySKU = [], dayQty = 0, dayRcp = [], dayDept = []
                
                const dateData = new salesCard().fetchByDate(DATE)
                if (dateData) {
                    dateData.forEach(item => {
                        
                        let total   = parseInt(item.total.replace(/,/g, '')),
                            dept    = item.dept.toUpperCase(),
                            type    = new salesCard().checkDeptByCode(dept).type.toUpperCase()
                        
                        if (dept == 'AJ' && item.productName.toUpperCase().indexOf('FURNIPRO') >= 0) {
                            dayFP += parseInt(item.qty)
                            dayFpVal += total
                        }
                        const i = departements.findIndex(dpt => dpt.code.toUpperCase() == dept.toUpperCase())
                        departements[i].MTD += total
                        let x = departements.findIndex(depts => depts.code.toUpperCase() == dept)
                        if(departements[i].SKU.findIndex(code => code == item.article) < 0) departements[x].SKU.push(item.article)
                        if(daySKU.findIndex(code => code == item.article) < 0) daySKU.push(item.article)
                        if(dayRcp.findIndex(rcp => rcp == item.reciept) < 0) dayRcp.push(item.reciept)
                        departements[i].dayQty += parseInt(item.total)
                        dayMain += total
                        dayQty += parseInt(item.qty)
                        if (type == 'FURNITURE') dayFtr += total
                        if (type == 'ACCESSORIES') dayAcc += total
                        let o = dayDept.findIndex(deptx => deptx.code.toUpperCase() == dept.toUpperCase())
                        if (o >= 0) dayDept[o].total += total
                        else dayDept.push({
                            code : dept,
                            total: total
                        })
                    })
                }
                
                let dayMainPercent  = (dayMain >= dayTarget.main) ? '100' : ((dayMain/dayTarget.main) * 100).toFixed(2),
                    dayMainGap      = (dayMain >= dayTarget.main) ? '☆☆☆' : dayMain - dayTarget.main,
                    dayMainFloat    = (dayMain <= 0) ? '' : (dayMain / 10**6).toFixed(2),
                    dayMainTgtFloat = (dayTarget.main / 10**6).toFixed(2),
                    dayMainColor    = (dayMain <= 0) ? 'gray' : 'darkcyan',
                    
                    dayFtrPercent   = (dayFtr >= dayTarget.ftr) ? '100' : ((dayFtr/dayTarget.ftr) * 100).toFixed(2),
                    dayFtrGap       = (dayFtr >= dayTarget.ftr) ? '☆☆☆' : dayFtr - dayTarget.ftr,
                    dayFtrFloat     = (dayFtr <= 0) ? '' : (dayFtr / 10**6).toFixed(2),
                    dayFtrTgtFloat  = (dayTarget.ftr / 10**6).toFixed(2),
                    dayFtrColor     = (dayFtr <= 0) ? 'gray' : 'darkcyan',
                    
                    dayAccPercent   = (dayAcc >= dayTarget.acc) ? '100' : ((dayAcc / dayTarget.acc) * 100).toFixed(2),
                    dayAccGap       = (dayAcc >= dayTarget.acc) ? '☆☆☆' : dayAcc - dayTarget.acc,
                    dayAccFloat     = (dayAcc <= 0) ? '' : (dayAcc / 10**6).toFixed(2),
                    dayAccTgtFloat  = (dayTarget.acc / 10**6).toFixed(2),
                    dayAccColor     = (dayAcc <= 0) ? 'gray' : 'darkcyan',
                    
                    dayFpPercent    = (dayFP >= dayTarget.fp) ? '100' : ((dayFP / dayTarget.fp) * 100).toFixed(2),
                    dayFpGap        = (dayFP >= dayTarget.fp) ? '☆☆☆' : dayFP - dayTarget.fp,
                    dayFpColor      = (dayFP <= 0) ? 'gray' : 'darkcyan',
                    
                    dayFpValPercent = (dayFpVal >= dayTarget.fpVal) ? '100' : ((dayFpVal / dayTarget.fpVal) * 100).toFixed(2),
                    dayFpValGap     = (dayFpVal >= dayTarget.fpVal) ? '☆☆☆' : dayFpVal - dayTarget.fpVal,
                    dayFpValColor   = (dayFpVal <= 0) ? 'gray' : 'darkcyan',
                    
                    schCode         = new schedule().findSchByDate(DATE),
                    schData         = new schedule().codeData(schCode),
                    schColor        = (schData.work) ? 'darkcyan' : schData.color
                
                let dayDeptHTML     = ``,
                    todayDepts      = ``
                dayDept.forEach(dept => {
                    dayDeptHTML += `
                        <div class="d-dept-group">
                            <span data-code="">${dept.code.toUpperCase()}</span>
                            <p>${dept.total.toLocaleString()}</p>
                        </div>
                    `
                    todayDepts += `
                        <div class="today-dept-code" data-code="${dept.code.toUpperCase()}"></div>
                    `
                })
                
                if (todayx == DATEcode ) {
                    daySalesHTML = `
                        <div class="db-today-main" style="--color: #008B8B;">
                            <label>today sales</label>
                            <p>${dayMain.toLocaleString()}<span>${dayMainPercent}%</span></p>
                            <div class="db-today-diagram">
                                <div class="db-today-bars" style="width: ${dayMainPercent}%"></div>
                            </div>
                        </div>
                        <div class="db-today-sales">
                            <div class="db-today-sales-group" style="--color: goldenrod;">
                                <div class="db-today-sales-top">
                                    <label>FTR</label>
                                     <span>${dayFtrPercent}%</span>
                                </div>
                                <p>${dayFtr.toLocaleString()}</p>
                                <div class="db-today-diagram">
                                    <div class="db-today-bars" style="width: ${dayFtrPercent}%"></div>
                                </div>
                            </div>
                            <div class="db-today-sales-group" style="--color: deepskyblue;">
                                <div class="db-today-sales-top">
                                    <label>Acc</label>
                                     <span>${dayAccPercent}%</span>
                                </div>
                                <p>${dayAcc.toLocaleString()}</p>
                                <div class="db-today-diagram">
                                    <div class="db-today-bars" style="width: ${dayAccPercent}%"></div>
                                </div>
                            </div>
                            <div class="db-today-sales-group" style="--color: #FF6969;">
                                <div class="db-today-sales-top">
                                    <label>FP</label>
                                     <span>${dayFpValPercent}%</span>
                                </div>
                                <p>${dayFpVal.toLocaleString()}</p>
                                <div class="db-today-diagram">
                                    <div class="db-today-bars" style="width: ${dayFpValPercent}%"></div>
                                </div>
                            </div>
                        </div>
                        <div class="today-dept ${(todayDepts == '') ? 'dis-none' : ''}" data-text="today dept">
                            ${todayDepts}
                        </div>
                    `
                }
                
                let works = ''
                if (tommorow == '') works = ''
                //console.log(dayFP)
                HTML += `
                    
                            <div class="day-group ${tommorow}">
                                <div class="day-top">
                                    <span class="${schColor}" data-date="${(datex < 10) ? '0' + datex : datex}"></span>
                                    <div class="day-sch">
                                        <p>${wCode} D${i + 1} - ${new main().dateCode(DATE).dayLong}</p>
                                        <label style="--color: ${schColor};">${schCode}</label>
                                    </div>
                                </div>
                                <div class="day-diagram">
                                    <div class="zonk">${(tommorow == '') ? '' : 'ESOK'}</div>
                                    <div class="d-diagram-box">
                                        <div class="d-box" data-type="main">
                                            <div class="d-bar"
                                                style="--color: darkcyan !important; --height: ${dayMainPercent}% !important;"
                                                data-target="${dayMainTgtFloat}" 
                                                data-mtd="${dayMainFloat}">
                                            </div>
                                        </div>
                                        <div class="d-box" data-type="ftr">
                                            <div class="d-bar"
                                                style="--color: #EEC600 !important; --height: ${dayFtrPercent}% !important;"
                                                data-target="${dayFtrTgtFloat}" 
                                                data-mtd="${dayFtrFloat}">
                                            </div>
                                        </div>
                                        <div class="d-box" data-type="acc">
                                            <div class="d-bar"
                                                style="--color: deepskyblue !important; --height: ${dayAccPercent}% !important;"
                                                data-target="${dayAccTgtFloat}" 
                                                data-mtd="${dayAccFloat}">
                                            </div>
                                        </div>
                                        <div class="d-box" data-type="fp">
                                            <div class="d-bar"
                                                style="--color: #FF6969 !important; --height: ${dayFpValPercent}% !important;"
                                                data-target="${dayTarget.fpVal.toLocaleString()}"
                                                data-mtd="${(dayFpVal == 0) ? '' : dayFpVal.toLocaleString()}">
                                            </div>
                                        </div>
                                    </div>
                                </div>
                                <div class="day-detail">
                                    <div class="day-no-sales ${(dayMain > 0) ? 'dis-none' : ''}">
                                        <h6>No Sales</h6>
                                    </div>
                                    <h6>${new main().dateCode(DATE).dateText}</h6>
                                    <div class="detail-group" style="--color: darkcyan;" data-type="main">
                                        <label>Main</label>
                                        <span data-text="Target">${dayTarget.main.toLocaleString()}</span>
                                        <span data-text="Actual">${dayMain.toLocaleString()}</span>
                                        <span data-text="Actual%">${(dayMain/dayTarget.main*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayMainGap == '☆☆☆') ? dayMainGap : dayMainGap.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-group" style="--color: #EEC600;" data-type="ftr">
                                        <label>Furniture</label>
                                        <span data-text="Target">${dayTarget.ftr.toLocaleString()}</span>
                                        <span data-text="Actual">${dayFtr.toLocaleString()}</span>
                                        <span data-text="Actual%">${(dayFtr/dayTarget.ftr*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayFtrGap == '☆☆☆') ? dayFtrGap : dayFtrGap.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-group" style="--color: deepskyblue;" data-type="acc">
                                        <label>Accessories</label>
                                        <span data-text="Target">${dayTarget.acc.toLocaleString()}</span>
                                        <span data-text="Actual">${dayAcc.toLocaleString()}</span>
                                        <span data-text="Actual%">${(dayAcc/dayTarget.acc*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayAccGap == '☆☆☆') ? dayAccGap : dayAccGap.toLocaleString()}</span>
                                    </div>
                                    <div class="detail-group" style="--color: #FF6969;" data-type="fp">
                                        <label>FurniPro</label>
                                        <span data-text="Target">${dayTarget.fpVal.toLocaleString() + ' - (' + dayTarget.fp.toLocaleString()})</span>
                                        <span data-text="Actual">${dayFpVal.toLocaleString() + ' - (' + dayFP.toLocaleString()})</span>
                                        <span data-text="Actual%">${(dayFpVal/dayTarget.fpVal*100).toFixed(2)}%</span>
                                        <span data-text="Gap">${(dayFpValGap == '☆☆☆') ? dayFpValGap : dayFpValGap.toLocaleString()}</span>
                                    </div>
                                    <div class="day-trx ${(dayMain <= 0) ? 'dis-none' : ''}">
                                        <p>${dayQty} QTY <br> ${daySKU.length} SKU <br> ${dayRcp.length} RECIEPT<p>
                                        <i class="fas fa-arrow-right" data-reciept="${new main().dateCode(DATE).rcpDate}"></i>
                                    </div>
                                    <div class="days-dept">
                                        <h6>Sales by Dept</h6>
                                        ${dayDeptHTML}
                                    </div>
                                </div>
                            </div>
                `
                    
                WTD += dayMain
                wMain += dayMain
                wFtr += dayFtr
                wAcc += dayAcc
                wFP += dayFP
                wFPVal += dayFpVal
                
                MAIN.mtd += dayMain
                FTR.mtd += dayFtr
                ACC.mtd += dayAcc
                FPQTY.mtd += dayFP
                FPVAL.mtd += dayFpVal
            })
            //console.log(wTarget, 'wMain')
            if ((n + 1) > wParam) return
            const wPercent  = (WTD >= wTarget) ? '100' : parseFloat((WTD / wTarget) * 100).toFixed(2),
                WTDFloat    = (WTD/10**6).toFixed(2),
                wTgtFloat   = (wTarget/10**6).toFixed(2)
            HTML += '</div>'
            HTML += `
                
                        <div class="weeky-box">
                            <div class="week-group">
                                <p>Week ${n+1}</p>
                                <div class="week-number">
                                    <span>${WTDFloat}</span>
                                    <label>${wPercent}%</label>
                                    <span>${wTgtFloat}</span>
                                </div>
                                <div class="w-diagram">
                                    <div class="w-bar" style="width: ${wPercent}% !important;"></div>
                                </div>
                            </div>
                            
                        </div>
                    </div>
            `
            XTML += HTML
        })
        departements.forEach(dpx => {
            let color = 'gray'
            if (dpx.MTD > 0) color = 'default'
            if (dpx.MTD >= dpx.target) color = 'green'
            
            let MTDPercent  = (dpx.MTD / dpx.target * 100).toFixed(2),
            SMTDPercent     = smtdPercent,
            SMTD            = Math.ceil(dpx.target * smtdPercent / 100),
            GAP             = parseInt(dpx.MTD - SMTD),
            GAPPercent      = (GAP / dpx.target * 100).toFixed(2),
            ToAchiev        = dpx.MTD - dpx.target,
            ToAchievPercent = (ToAchiev / dpx.target * 100).toFixed(2)
            
            DEPHTL += `
                <div class="sc-dept-group">
                    <div class="dept-code ${color}"
                        data-targets="${dpx.target.toLocaleString()}"
                        data-smtd="${SMTDPercent}% ${SMTD.toLocaleString()}"
                        data-toacv="${ToAchievPercent} ${ToAchiev.toLocaleString()}"
                        data-mtd="${dpx.MTD.toLocaleString()}"
                        data-gap="${(GAP > 0) ? '+' + GAP.toLocaleString() : GAP.toLocaleString()} ${(GAP > 0) ? '+'+ GAP.toLocaleString() : GAP.toLocaleString()}"
                        data-name="${new department().findDeptByCode(dpx.code).name.toUpperCase()}"
                        data-sku="${dpx.SKU.length} SKU - ${dpx.QTY} QTY"
                        data-class='${color}'
                    >${dpx.code}</div>
                </div>
            `
        })
        
        /*
        
        const colorMin          = 'grey',
            colorPlus           = 'green',
            mainMTDPercent      = (mainMTD/mainTarget)*100,
            mainCurrent         = (mainMTD >= mainSMTD) ? smtdPercent : mainMTDPercent,
            mainGapValue        = mainMTD - mainSMTD,
            mainGapPrc          = (mainGapValue/mainTarget)*100,
            mainGapPercent      = (mainGapValue < 0) ? (mainGapPrc * -1) : mainGapPrc,
            mainGapColor        = (mainGapValue < 0) ? colorMin : colorPlus,
            mainToAcvValue      = mainMTD - mainTarget,
            mainToAcvPercent    = (mainToAcvValue/mainTarget*100),
            mainTransform       = (mainMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
            
        const ftrMTDPercent     = (ftrMTD/ftrTarget)*100,
            ftrCurrent          = (ftrMTD >= ftrSMTD) ? smtdPercent : ftrMTDPercent,
            ftrGapValue         = ftrMTD - ftrSMTD,
            ftrGapPrc           = (ftrGapValue/ftrTarget)*100,
            ftrGapPercent       = (ftrGapValue < 0) ? (ftrGapPrc * -1) : ftrGapPrc,
            ftrGapColor         = (ftrGapValue < 0) ? colorMin : colorPlus,
            ftrToAcvValue       = ftrMTD - ftrTarget,
            ftrToAcvPercent     = (ftrToAcvValue/ftrTarget*100),
            ftrTransform        = (ftrMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
            
        const accMTDPercent     = (accMTD/accTarget)*100,
            accCurrent          = (accMTD >= accSMTD) ? smtdPercent : accMTDPercent,
            accGapValue         = accMTD - accSMTD,
            accGapPrc           = (accGapValue/accTarget)*100,
            accGapPercent       = (accGapValue < 0) ? (accGapPrc * -1) : accGapPrc,
            accGapColor         = (accGapValue < 0) ? colorMin : colorPlus,
            accToAcvValue       = accMTD - accTarget,
            accToAcvPercent     = (accToAcvValue/accTarget*100),
            accTransform        = (accMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
            
        const fpValMTDPercent      = (fpValMTD/fpValTarget)*100,
            fpValCurrent           = (fpValMTD >= fpValSMTD) ? smtdPercent : fpValMTDPercent,
            fpValGapVal            = fpValMTD - fpValSMTD,
            fpValGapValue          = (fpValGapVal < 0) ? Math.floor(fpValGapVal): '+' + Math.floor(fpValGapVal),
            fpValGapPrc            = (fpValGapVal/fpValTarget)*100,
            fpValGapPercent        = (fpValGapVal < 0) ? (fpValGapPrc * -1) : fpValGapPrc,
            fpValGapColor          = (fpValGapVal < 0) ? colorMin : colorPlus,
            fpValToAcvValue        = Math.floor(fpValMTD - fpValTarget),
            fpValToAcvPercent      = (fpValToAcvValue/fpValTarget*100),
            fpValTransform         = (fpValMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
        //console.log(fpValMTD, 'curr')
        const fpMTDPercent      = (fpMTD/fpTarget)*100,
            fpCurrent           = (fpMTD >= fpSMTDX) ? smtdPercent : fpMTDPercent,
            fpGapVal            = fpMTD - fpSMTDX,
            fpGapValue          = (fpGapVal < 0) ? Math.floor(fpGapVal): '+' + Math.floor(fpGapVal),
            fpGapPrc            = (fpGapVal/fpTarget)*100,
            fpGapPercent        = (fpGapVal < 0) ? (fpGapPrc * -1) : fpGapPrc,
            fpGapColor          = (fpGapVal < 0) ? colorMin : colorPlus,
            fpToAcvValue        = Math.floor(fpMTD - fpTarget),
            fpToAcvPercent      = (fpToAcvValue/fpTarget*100),
            fpTransform         = (fpMTD == 0) ? 'translateY(-2px)' : 'translateY(-2px)'
        
        //console.log(fpSMTD, fpMTD, 'ben')
        *
        const sHTML = `
            <div class="dash-sales-mtd" data-text="Month-to-date">
                <p data-percent="(${MAIN.MTD().percent})">${MAIN.MTD().value}</p>
                <span> ${MAIN.GAP().value} (${MAIN.GAP().percent})</span>
            </div>
            <br>
            <div class="dash-sales-detail">
                <div class="sales-detail-box" style="--color: goldenrod;">
                    <h5>Furniture</h5>
                    <div class="sales-detail-mtd">
                        <p>${FTR.MTD().value}</p>
                        <span>${FTR.MTD().percent}</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${FTR.GAP().value}</p>
                        <span>${FTR.GAP().Percent}</span>
                    </div>
                </div>|
                <div class="sales-detail-box"  style="--color: deepskyblue;">
                    <h5>Accessories</h5>
                    <div class="sales-detail-mtd">
                        <p>${ACC.MTD().value}</p>
                        <span>${ACC.MTD().percent}</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${ACC.GAP().value}</p>
                        <span>${ACC.GAP().percent}</span>
                    </div>
                </div>|
                <div class="sales-detail-box" style="--color: #FF6969;">
                    <h5>FurniPro</h5>
                    <div class="sales-detail-mtd">
                        <p>${FPVAL.MTD().value}</p>
                        <span>${FPVAL.MTD().percent}</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${FPVAL.GAP().value}</p>
                        <span>${FPVAL.GAP().percent}</span>
                    </div>
                </div>
            </div>
        `
        */
        let FP          = (localStorage.getItem('FPChosse') == 'value') ? FPVAL : FPQTY,
            salesArray  = [MAIN, FTR, ACC, FP],
            mHTML       = ``,
            sHTML       = `
                <div class="dash-sales-mtd" data-text="Month-to-date">
                    <p data-percent="(${MAIN.MTD().percent})">${MAIN.MTD().value}</p>
                    <span> ${MAIN.GAP().value} (${MAIN.GAP().percent})</span>
                </div>
                <br>
                <div class="dash-sales-detail">
            `
        
        salesArray.forEach((sales, i) => {
            //console.log(sales.GAP().current)
            mHTML += `
                <div class="diagram-box" style="--color: ${sales.color};" data-type="${sales.type}" onclick="diagramControl(this)" data-order="${i+1}"
                        data-target="${sales.TARGET().value}"
                        data-smtd-percent="${smtdPercent}%"
                        data-smtd-value="${sales.SMTD().value}"
                        data-mtd-percent="${sales.MTD().percent}"
                        data-mtd-value="${sales.MTD().value}"
                        data-gap-percent="${sales.GAP().percent}"
                        data-gap-value="${sales.GAP().value}"
                        data-to-achiev-value="${sales.PROGRESS().value}"
                        data-to-achiev-percent="${sales.PROGRESS().percent}"
                        data-color='${sales.GAP().color}'>
                    <div class="acv-box"
                            data-mtd="${sales.MTD().value}">
                        <div class="gap" 
                                data-bg='${sales.GAP().color}'
                                data-color='${sales.GAP().color}'
                                data-gap="${sales.GAP().value}"
                                style="height: ${sales.GAP().height} !important;
                                transform: ${sales.transform} !important;"></div>
                        <div class="current" style="height: ${sales.GAP().current} !important;"></div>
                    </div>
                </div>
            `
            if (sales.type == 'Main') return 
            sHTML += `
                <div class="sales-detail-box" style="--color: goldenrod;">
                    <h5>${sales.type}</h5>
                    <div class="sales-detail-mtd">
                        <p>${sales.MTD().value}</p>
                        <span>${sales.MTD().percent}</span>
                    </div>
                    <div class="sales-detail-gap">
                        <p>${sales.GAP().value}</p>
                        <span>${sales.GAP().percent}</span>
                    </div>
                </div>
            `
        })
        mHTML += `<div class="sc-detail-box"></div>`
        sHTML += `</div>`
        /*
        const mHTMLx = `
            <div class="diagram-box" style="--color: #008B8B;" data-type="Main" onclick="diagramControl(this)" data-order="1"
                    data-target="${MAIN.TARGET}"
                    data-smtd-percent="${smtdPercent}"
                    data-smtd-value="${MAIN.SMTD}"
                    data-mtd-percent="${MAIN.MTDPercent}"
                    data-mtd-value="${MAIN.MTD}"
                    data-gap-percent="${MAIN.GAPPercent}"
                    data-gap-value="${MAIN.GAP}"
                    data-to-achiev-value="${MAIN.PROGRESS}"
                    data-to-achiev-percent="${MAIN.PROGGRESSPercent}"
                    data-color='${MAIN.GAPColor}'>
                <div class="acv-box"
                        data-mtd="${MAIN.MTD}">
                    <div class="gap" 
                            data-bg='${MAIN.GAPColor}'
                            data-color='${MAIN.GAPColor}'
                            data-gap="${(mainToAcvValue >= 0) ? '☆ ACHIEV ☆' : mainGapValue.toLocaleString()}"
                            style="height: ${mainGapPercent.toFixed(2)} !important;
                            transform: ${mainTransform} !important;"></div>
                    <div class="current" style="height: ${mainCurrent} !important;"></div>
                </div>
            </div>
            
            <div class="diagram-box" style="--color: #EEC600;" data-type="Furniture" onclick="diagramControl(this)" data-order="2"
                    data-target="${parseInt(ftrTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}"
                    data-smtd-value="${ftrSMTD.toLocaleString()}"
                    data-mtd-percent="${ftrMTDPercent.toFixed(2)}"
                    data-mtd-value="${ftrMTD.toLocaleString()}"
                    data-gap-percent="${ftrGapPrc.toFixed(2)}"
                    data-gap-value="${(ftrGapValue >= 0) ? '+' : ''}${ftrGapValue.toLocaleString()}"
                    data-to-achiev-value="${(ftrToAcvValue >= 0) ? '☆ ACHIEV ☆' : ftrToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${ftrToAcvPercent.toFixed(2)}"
                    data-color='${ftrGapColor}'>
                <div class="acv-box"
                        data-mtd="${ftrMTD.toLocaleString()}">
                    <div class="gap" 
                            data-bg='${ftrGapColor}'
                            data-color='${ftrGapColor}'
                            data-gap="${(ftrToAcvValue >= 0) ? '☆ ACHIEV ☆' : ftrGapValue.toLocaleString()}"
                            style="height: ${ftrGapPercent.toFixed()} !important;
                            transform: ${ftrTransform} !important;"></div>
                    <div class="current" style="height: ${ftrCurrent} !important;"></div>
                </div>
            </div>
            
            <div class="diagram-box" style="--color: deepskyblue;" data-type="Accessories" onclick="diagramControl(this)" data-order="3"
                    data-target="${parseInt(accTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}"
                    data-smtd-value="${accSMTD.toLocaleString()}"
                    data-mtd-percent="${accMTDPercent.toFixed(2)}"
                    data-mtd-value="${accMTD.toLocaleString()}"
                    data-gap-percent="${accGapPrc.toFixed(2)}"
                    data-gap-value="${(accGapValue >= 0) ? '+' : ''}${accGapValue.toLocaleString()}"
                    data-to-achiev-value="${(accToAcvValue >= 0) ? '☆ ACHIEV ☆' : accToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${accToAcvPercent.toFixed(2)}"
                    data-color='${accGapColor}'>
                <div class="acv-box"
                        data-mtd="${accMTD.toLocaleString()}">
                    <div class="gap"
                            data-bg='${accGapColor}'
                            data-color='${accGapColor}'
                            data-gap="${(accToAcvValue >= 0) ? '☆ ACHIEV ☆' : accGapValue.toLocaleString()}"
                            style="height: ${accGapPercent.toFixed(2)} !important;
                            transform: ${accTransform} !important;"></div>
                    <div class="current" style="height: ${accCurrent} !important;"></div>
                </div>
            </div>
            
            <div class="diagram-box" style="--color: #FF6969;" data-type="FurniPro" onclick="diagramControl(this)" data-order="4"
                    data-target="${parseInt(fpValTarget).toLocaleString()}"
                    data-smtd-percent="${smtdPercent}"
                    data-smtd-value="${Math.ceil(fpValSMTD).toLocaleString()}"
                    data-mtd-percent="${fpValMTDPercent.toFixed(2)}"
                    data-mtd-value="${fpValMTD.toLocaleString()}"
                    data-gap-percent="${fpValGapPrc.toFixed(2)}"
                    data-gap-value="${fpValGapValue.toLocaleString()}"
                    data-to-achiev-value="${fpValToAcvValue.toLocaleString()}"
                    data-to-achiev-percent="${fpValToAcvPercent.toFixed(2)}"
                    data-color='${fpValGapColor}'>
                <div class="acv-box"
                        data-mtd="${fpValMTD.toLocaleString()}">
                    <div class="gap" 
                            data-bg='${fpValGapColor}'
                            data-color='${fpValGapColor}'
                            data-gap="${(fpValToAcvValue >= 0) ? '☆ ACHIEV ☆' : fpGapValue.toLocaleString()}"
                            style="height: ${fpValGapPercent.toFixed(2)} !important;
                            transform: ${fpValTransform} !important;"></div>
                    <div class="current" style="height: ${fpCurrent} !important;"></div>
                </div>
            </div>
            
            
        `*/
        return {
            weeks   : XTML,
            month   : mHTML,
            dept    : DEPHTL,
            home    : sHTML,
            today   : daySalesHTML
        }
    }
    vTable (param = new Date()) { 
        const dx    = this.getData(param)
        if (!dx) return undefined
        let html    = `<thead><tr>`,
            data    = dx.sales,
            bottom  = '<tr>',
            qty     = 0,
            sku     = new Array(),
            rcp     = new Array()
        Object.keys(data[0]).forEach((key,i) => {
            if (key == 'id' || key == 'x') return
            html += `<th>${key}</th>`
            bottom += `<td data-th='${key}'>~</td>`
        })
        html += `</tr></thead><tbody>`
        bottom += '</tr>'
        data.forEach(line => {
            qty += parseInt(line.qty)
            if (!sku.includes(line.article)) sku.push(line.article)
            if (!rcp.includes(line.reciept)) rcp.push(line.reciept)
            html += '<tr>'
            Object.entries(line).forEach((obj, i)=> {
                if (obj[0] == 'id' || obj[0] == 'x') return
                html += `<td>${(i == 3) ? '<div>'+ obj[1] +'</div>' : obj[1]}</td>`
            })
            html += `</tr>`
        })
        //html += bottom
        html += `</tbody>`
        return {
            html : html,
            data : rcp.length + ' Reciept (' + sku.length + ' SKU ' + qty + ' qty)' 
        }
    }
}

class department {
    constructor () {
        this.allData = JSON.parse(localStorage.getItem('department'))
    }
    findDeptByCode (code) {
        return this.allData.find(data => data.code.toUpperCase() == code.toUpperCase())
    }
    TargetDept() {
        let HTML = ''
        this.allData.forEach(dept => {
            HTML += `
                <div class="dept-target">
                    <div class="target-code" data-code="${dept.code}"></div>
                    <input type="number">
                </div>
            `
        })
        return HTML
    }
}

class schedule {
    constructor() {
        this.allData = JSON.parse(localStorage.getItem('schedule'))
        this.allTime = JSON.parse(localStorage.getItem('scheduleTime'))
        this.getSCH  = function (param = new Date()) {
            const code  = new main().dateCode(new Date(param)).monthCode,
                i       = this.allData.findIndex(data => data.code == code)
            if (i < 0) return undefined
            return {
                data    : this.allData[i],
                index   : i
            }
        }
        this.isWork  = function (codex) {
            return this.allTime.filter(({code}) => code.toUpperCase() == codex)[0].work
        }
    }
    async fetchData (url) {
        const sheet = await fetch(url)
        if (!sheet.ok) return console.log(new Error('Status : ' + sheet.Status))
    
        const text = await sheet.text()
        const first = '<table class="waffle" cellspacing="0" cellpadding="0">'
        const last = '</table>'
    
        const getText = new RegExp(`${first}(.*?)${last}`);
        const inHtml = text.match(getText)[1].trim()
        
        const NIK   = '165925'
        if (inHtml == '') return {
            status: false,
            error: 'Table not found !',
            next: false
        }
        else {
            const table = document.createElement('table')
            table.innerHTML = inHtml
            document.querySelector('#the-data').appendChild(table)
            const rowx  = table.querySelectorAll('tbody tr')
            let row     = ''
            rowx.forEach(tr => {
                if (tr.textContent.indexOf(NIK) >= 0) return row = tr
            })
            let ix  = 1000,
                scx = []
            row.querySelectorAll('td').forEach((td, i) => {
                if (td.classList.contains('freezebar-cell')) return
                //if (td.classList.contains('s193')) return
                //if (td.classList.contains('s18')) return
                if (td.textContent == NIK) return ix = i
                if (i > ix && td.textContent != '') return scx.push(td.textContent)
            })
            //document.querySelector('#for-data-display').classList.remove('dis-none')
            document.querySelector('#the-data').innerHTML = ''
            //document.querySelector('#the-data').innerHTML = row
            //console.log(inHtml)
            return {
                status: true,
                data: scx
            }
        }
        
    }
    saveSCH(data, date = new Date()) {
        if (typeof data != 'object') return undefined
        const code  = new main().dateCode(new Date(date)).monthCode,
            i       = this.allData.findIndex(data => data.code == code)
        if (i >= 0) this.allData[i].data = data
        else this.allData.push({
            code : code,
            data : data
        })
        localStorage.setItem('schedule', JSON.stringify(this.allData))
        return true
    }
    codeData(code) {
        return this.allTime.find(time => time.code.toUpperCase() == code.toUpperCase())
    }
    remainWork(param) {
        const date      = new Date(param).getDate(),
            monthCode   = new main().dateCode(new Date()).monthCode,
            schx        = this.getSCH(new Date(param)).data.data,
            arr         = schx.slice(date - 1)
        let work = 0, notWork = 0
        arr.forEach(sch => {
            if(this.isWork(sch)) return work++
            notWork++
        })
        //console.log(arr, 'work :' + work)
        return {
            work : work,
            not : notWork
        }
    }
    findSchByDate(param) {
        const dateCode  = new main().dateCode(new Date(param)),
            date        = dateCode.date,
            sch         = this.getSCH(new Date(param))
        if (!sch) return undefined
        return sch.data.data[date-1]
    }
}

class afterSales {
    constructor () {
        this.allData        = JSON.parse(localStorage.getItem('AS'))
        this.checkReciept   = function (reciept) {
            if (reciept == '') return alert('reciept undefined')
            let i = this.allData.findIndex(data => data.recieptNum == reciept)
            return {
                index   : i,
                data    : this.allData[i],
                status  : (i >= 0) ? true : false
            }
        }
        this.recieptUse     = function (rcp) {
            const use = this.allData.some(param => param.recieptNumber == rcp)
            //if (use) alert ('Reciept ' + rcp + ' telah digunakan')
            return use
        }
        this.getData        = function (rcp) {
           return this.allData.filter(data => data.recieptNumber == rcp)[0]
        }
        this.getProgress    = function (data, date = new Date()) {
            const status    = data.status,
                contStatus  = data.contStatus,
                rcpTime     = new Date (data.rcpDateCtrl).getTime(),
                contTime    = (data.container == '') ? 0 : new Date (data.container).getTime(),
                rdTime      = (data.ready == '') ? 0 : new Date (data.ready).getTime(),
                reqTime     = new Date (data.request).getTime(),
                instalTime  = (data.instal == '') ? 0 : new Date (data.instal).getTime(),
                pickUp      = data.pickUp,
                startTime   = new main().dateCode(new Date(date)).firstDayTime,
                endTime     = new main().dateCode(new Date(date)).lastDayTime,
                startNow    = new main().dateCode(new Date()).firstDayTime,
                endNow      = new main().dateCode(new Date()).lastDayTime
                
            if (data.status == 'all_complete')                                              return "COMPLETE"
            
            
            
            // Prepare Logic
            if (startTime >= rcpTime && endTime <= contTime && contTime > 0)                return "ONPREPARE"
            if (startTime >= rcpTime && endTime <= rdTime && contTime == 0)                 return "ONPREPARE"
            if (startTime >= rcpTime && endTime <= reqTime && contTime == 0 && rdTime == 0) return "ONPREPARE"
            if (startTime <= rcpTime && endTime >= rcpTime )                                return "START-PREPARE"
            
            
            // Shipping Logic
            if (startNow >= contTime && contTime > 0 &&
                contStatus != 'OTW'  && contStatus != 'UNLOAD' )                            return "PAST-SHIPPING"
            if (startTime <= contTime && endTime >= contTime && contStatus == 'OTW')        return "START-SHIPPING"
            if (startTime >= contTime && endTime < rdTime &&
                contTime > 0 && contStatus == 'OTW')                                        return "ON-SHIPPING"
            
            
            // Ready Logic
            if (startNow >= rdTime && rdTime > 0 && contStatus != 'UNLOAD')                 return "PAST-READY"
            if (startTime >= rdTime && endTime < reqTime &&
                rdTime > 0 && contStatus == 'ONLOAD')                                       return "READY"
            
            
            // PickUp Logic
            if (startNow >= reqTime && pickup && !delivDone)                                return "PAST-PICKUP"
            if (startTime <= reqTime && endTime >= reqTime && pickup)                       return "PICKUP"
            
            
            // Delivery Logic
            if (startNow >= reqTime && !delivDone)                                          return "PAST-DELIVERY"
            if (startTime <= reqTime && endTime >= reqTime)                                 return "DELIVERY"
            
            
            // Instal Logic
            if (startNow >= instalTime && !instalDone)                                      return "PAST-INSTAL"
            if (startTime <= instalTime && endTime >= reqTime)                              return "INSTAL"
            
            if (startNow >= reqTime && startNow >= instalTime &&
                instalTime > 0 && !delivDone)                                               return "PAST-ALL"
            return 'Bendhard16'
        }
    }
    dataList () {
        let HTML = '',
            datax = {
                prepare     : 0,
                shipping    :  0,
                ready       : 0,
                delivery    : 0,
                pickup      : 0,
                instal      : 0,
                past        : 0,
                problem     : 0
            }
        this.allData.forEach(data => {
            let status      = this.getProgress(data),
                progress    = data.status
            if (progress.toUpperCase() == 'PROBLEM') datax.problem += 1
            let statusData  = new main().statusData.filter(statux => statux.status.toUpperCase() == status.toUpperCase())[0],
                extra       = ``
                status      = (!status) ? 'Bendhard16' : status
            if (status == 'PREPARE' ||  status == "ONPREPARE"){
                extra = `
                    ${(data.container == '') ? '' : '<div class="bellow-xtra"><img src="/assets/icon/cargo-ship (2).png" alt=""><span>' + new main().dateCode(new Date(data.container)).dayLong + '<br>' + data.container+'</span></div> '}
                    ${(data.ready == '' || data.ready == data.request) ? '' : '<div class="bellow-xtra"><img src="/assets/icon/box (3).png" alt=""><span> ' + new main().dateCode(new Date(data.ready)).dayLong + '<br>' + data.ready+'</span></div> '}
                    <div class="bellow-xtra">
                        <img src="${(data.pickUp) ? "/assets/icon/delivery-boy.png" : "/assets/icon/truck.png"}" alt="">
                        <span> ${new main().dateCode(new Date(data.request)).dayLong + '<br>' + data.request}</span>
                    </div>`
                datax.prepare += 1
            }
            if (status == 'SHIPPING' ||  status == "ONSHIPPING") {
                extra = `
                    ${(data.ready == '') ? '' : '<div class="bellow-xtra"><img src="/assets/icon/box (3).png" alt=""><span> ' + new main().dateCode(new Date(data.ready)).dayLong + '<br>' + data.ready+'</span></div> '}
                    <div class="bellow-xtra">
                        <img src="${(data.pickUp) ? "/assets/icon/delivery-boy.png" : "/assets/icon/truck.png" }" alt="">
                        <span> ${new main().dateCode(new Date(data.request)).dayLong + '<br>' + data.request}</span>
                    </div>
                    <div class="bellow-xtra">
                         <img src="/assets/icon/drill (1).png" alt="">
                        <span> ${new main().dateCode(new Date(data.instal)).dayLong + '<br>' + data.instal}</span>
                    </div>`
                datax.shipping += 1
            } 
            if (status == 'READY') {
                extra = `
                    <div class="bellow-xtra">
                        <img src="${(data.pickUp == true) ? "/assets/icon/delivery-boy.png" : "/assets/icon/box (3).png" }" alt="">
                        <span> ${new main().dateCode(new Date(data.request)).dayLong + '<br>' + new Date (data.request).toLocaleDateString()}'</span>
                    </div>
                    <p>${data.address}</p>`
                datax.ready += 1
            }
            if (status == 'DELIVERY' || status == "PICKUP") {
                extra = `
                    <div class="bellow-xtra">
                        <img src="/assets/icon/drill (1).png" alt="img">
                        <span> ${new main().dateCode(new Date(data.instal)).dayLong}<br>${new Date(data.instal).toLocaleDateString()}'</span>
                    </div>
                    <p>${data.address}</p>`
                if (status == 'DELIVERY') datax.delivery += 1
                else datax.pickup += 1
            }
            if (status == 'INSTAL') {
                extra = ` 
                    <p>${data.address}</p>`
                datax.instal += 1
            }
            if (status == 'PROBLEM') { extra = `
                    <p>Problem Note</p>
                `
            }
            if (status == 'PAST-DEL') {
                extra = `
                    <div class="bellow-xtra">
                        <img src="/assets/icon/truck.png" alt="">
                        <span>${new main().dateCode(new Date(data.request)).dayLong} ${new Date(data.request).toLocaleDateString()} <br> ${new main().dateRange(new Date (data.request), new Date ()).dayRange}&nbsp;Hari</span>
                    </div>
                    <p>${data.address}</p>`
                datax.past += 1
            }
            if (status == 'PAST-INS') {
                extra = `
                    <div class="bellow-xtra">
                        <img src="/assets/icon/drill (2).png" alt="">
                        <span>${new main().dateCode(new Date(data.instal)).dayLong} ${new Date(data.request).toLocaleDateString()} <br> ${new main().dateRange(new Date (data.request), new Date ()).dayRange}&nbsp;Hari</span>
                    </div>
                    <p>${data.address}</p>`
                datax.past += 1
            }
            if (status == 'PAST-ALL') {
                extra = `
                    <div class="bellow-xtra">
                        <img src="/assets/icon/truck.png" alt="">
                        <span>${new main().dateCode(new Date(data.request)).dayLong} ${new Date(data.request).toLocaleDateString()} <br> ${new main().dateRange(new Date (data.request), new Date ()).dayRange}&nbsp;Hari</span>
                    </div>
                    <div class="bellow-xtra">
                        <img src="/assets/icon/drill (2).png" alt="">
                        <span>${new main().dateCode(new Date(data.instal)).dayLong} ${new Date(data.request).toLocaleDateString()} <br> ${new main().dateRange(new Date (data.request), new Date ()).dayRange}&nbsp;Hari</span>
                    </div>`
                datax.past += 1
            }
            HTML += `
                <div class="as-group" data-status='${progress}'>
                    <div class="as-status-img br-${statusData.color}"  data-type="${status.toUpperCase()}" onclick="seeAS('${data.recieptNumber}');">
                        <img src="${statusData.icon}" alt="">
                    </div>
                    <div class="as-gap" style="--bg: ${statusData.clr};"></div>
                    <div class="as-group-data">
                        <div class="data-top br-${statusData.color}">
                            <p>${data.recieptNumber.toUpperCase()}</p>
                            <p class="as-cust" data-instansi="${data.instansi}">${data.name}</p>
                        </div>
                        <div class="data-bellow">
                            ${extra}
                        </div>
                    </div>
                </div>
            `
        })
        return {
            html : HTML,
            data : datax
        }
    }
    save (data) {
        this.allData.push(data)
        localStorage.setItem('AS', JSON.stringify(this.allData))
        window.location.reload()
    }
    edit (as) {
        const data  = as.data
        let i       = 99999999
        if (as.change == true && this.recieptUse(data.recieptNumber) == false) i = this.allData.findIndex(afsel => afsel.recieptNumber == as.old)
        if (as.change == false && this.recieptUse(data.recieptNumber) == true) i = this.allData.findIndex(afsel => afsel.recieptNumber == data.recieptNumber)
        this.allData[i] = data
        localStorage.setItem('AS', JSON.stringify(this.allData))
        window.location.reload()
    }
    remove (reciept) {
        if (!this.recieptUse(reciept)) return alert('Reciept tidak ditemukan')
        this.allData.splice(this.checkReciept(reciept).i, 1)
        localStorage.setItem('AS', JSON.stringify(this.allData))
        window.location.reload()
    }
}

class item {
    constructor () {
        this.allData = JSON.parse(localStorage.getItem('ITEMS'))
    }
    itemCheck(id) {
        let param = true
        document.querySelectorAll('#' + id + ' input, #' + id + ' select').forEach(input => {
            if (input.value != '') return input.style.borderColor = '#00BCBC'
            param = false
            input.style.borderColor = 'red'
        })
        return param
    }
}

class site {
    constructor () {
        this.allData = JSON.parse(localStorage.getItem('site'))
    }
    selectHTMl(choosen = 'Ben') {
        let HTML = `
        <select class="site" required>
        <option value="">-- Site --</option>`
        this.allData.forEach(site => {
            HTML += `
                <option value="${site.code}" ${(choosen == site.code) ? 'selected' : ''}>${site.code} - ${site.site}</option>
            `
        })
        return HTML + '</select>'
    }
    siteDataByCode(code) {
        return this.allData.filter(data => data.code == code)[0]
    }
    containerCount(objectx) {
        const datex = new Date (objectx.date), //reciept date
            array   = new Array(9).fill(1) // random array untuk iterasi 9 kali mencari container date
        datex.setDate(datex.getDate() + objectx.toCont) // minimal hari ke kontainer 
        if (objectx.day >= 0) array.forEach(index => {
            const dx = parseInt(datex.getDay()),
                dy   = parseInt(objectx.day)
            if (dx == dy) return
            datex.setDate(new Date(datex).getDate() + 1)
        }) 
        const cDate = new Date(datex)
        return {
            contDate : cDate,
            rdDate   : new Date(new Date(cDate).setDate(cDate.getDate() + objectx.range))
        }
    }
}


class benTable {
    constructor(table, index, order) {
        let rows, switching, i, x, y, shouldSwitch;
        switching = true;
  
        while (switching) {
            switching = false;
            rows = table.rows;
        
            for (i = 1; i < (rows.length - 1); i++) {
                shouldSwitch = false;
                x = rows[i].getElementsByTagName("td")[colIndex];
                y = rows[i + 1].getElementsByTagName("td")[colIndex];
                  
                if (order === "asc") {
                    if (x.innerHTML.toLowerCase() > y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                } else if (order === "desc") {
                    if (x.innerHTML.toLowerCase() < y.innerHTML.toLowerCase()) {
                        shouldSwitch= true;
                        break;
                    }
                }
            }
            if (shouldSwitch) {
                rows[i].parentNode.insertBefore(rows[i + 1], rows[i]);
                switching = true;
            }
        }
    }
}

/*


            <div class="diagram-box" data-type="Ftr" onclick="diagramControl(this)"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtdValue="${parseInt(ftrSMTD)}"
                    data-toAchievValue="${ftrToAcvValue}"
                    data-toAchievPercent="${ftrToAcvPercent}">
                <div class="acv-box"
                        data-mtd="${ftrMTDFloat}"
                        data-mtdValue="${ftrMTD}"
                        data-mtdPercent="${ftrMTDPercent}">
                    <div class="gap"
                            data-gap="${ftrGapFloat}"
                            data-gapValue="${ftrGapValue}" 
                            data-gapPercent="${ftrGapPercent}"></div>
                    <div class="current"></div>
                </div>
            </div>
            
            <div class="diagram-box" data-type="Acc" onclick="diagramControl(this)"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtdValue="${parseInt(accSMTD)}"
                    data-toAchievValue="${accToAcvValue}"
                    data-toAchievPercent="${accToAcvPercent}">
                <div class="acv-box"
                        data-mtd="${accMTDFloat}"
                        data-mtdValue="${accMTD}"
                        data-mtdPercent="${accMTDPercent}">
                    <div class="gap"
                            data-gap="${accGapFloat}"
                            data-gapValue="${accGapValue}" 
                            data-gapPercent="${accGapPercent}"></div>
                    <div class="current"></div>
                </div>
            </div>
            
            <div class="diagram-box" data-type="FP" onclick="diagramControl(this)"
                    data-smtd-percent="${smtdPercent}%"
                    data-smtdValue="${parseInt(fpSMTD)}"
                    data-toAchievValue="${fpToAcvValue}"
                    data-toAchievPercent="${fpToAcvPercent}">
                <div class="acv-box"
                        data-mtd="${fpMTDFloat}"
                        data-mtdValue="${fpMTD}"
                        data-mtdPercent="${fpMTDPercent}">
                    <div class="gap"
                            data-gap="${fpGapFloat}"
                            data-gapValue="${fpGapValue}" 
                            data-gapPercent="${fpGapPercent}"></div>
                    <div class="current"></div>
                </div>
            </div>
            
            <div class="sc-detail-box">
                <div class="sc-detail-sales" data-text="target">
                    <p>...</p>
                    <span>...<br>...</span>
                </div>
                <div class="sc-detail-sales" data-text="MTD">
                    <p></p>
                    <span><br>...</span>
                </div>
                <div class="sc-detail-sales" data-text="SMTD GAP">
                    <p>...</p>
                    <span><br>...</span>
                </div>
                <div class="sc-detail-sales" data-text="TO ACV">
                    <p>...</p>
                    <span><br>...</span>
                </div>
                <div class="sc-detail-sales dis-none" id="sc-tday" data-text="TODAY">
                    <p>...</p>
                    <div class="today-span">
                        <div class="span" data-text="...">...</div>
                        <div class="span" data-text="...">...</div>
                    </div>
                </div>
                <div class="sc-close past" onclick="scClose(this)">
                    <i class="fas fa-x"></i> &nbsp; CLOSE
                </div>
            </div>
*/

/*


            
            
            ftrToAcvValue       = (achiev(ftrMTD, ftrTarget)) ? 'ACHIEV' : '-' + parseInt((ftrTarget - ftrMTD)),
            ftrToAcvPercent     = (ftrToAcvValue == 'ACHIEV') ? '☆☆☆☆☆' : '-' + parseInt((ftrToAcvValue / ftrTarget) * 100) + '%',
            ftrMTDFloat         = (ftrToAcvValue == 'ACHIEV') ? '☆ ACHIEV ☆' : (ftrMTD / 10 ** 6).toFixed(2),
            ftrMTDPercent       = (ftrMTD / ftrTarget * 100).toFixed(2) + '%',
            ftrGapValue         = ftrMTD - ftrSMTD,
            ftrGapFloat         = (ftrGapValue > 0) ? '+' : '' + (ftrGapValue / 10**6).toFixed(2),
            ftrGapPercent       = ((ftrGapValue / ftrTarget) * 100).toFixed(2) + '%',
                
                
                
            accToAcvValue       = (achiev(accMTD, accTarget)) ? 'ACHIEV' : '-' + parseInt((accTarget - accMTD)),
            accToAcvPercent     = (accToAcvValue == 'ACHIEV') ? '☆☆☆☆☆' : '-' + parseInt((accToAcvValue / accTarget) * 100) + '%',
            accMTDFloat         = (accToAcvValue == 'ACHIEV') ? '☆ ACHIEV ☆' : (accMTD / 10 ** 6).toFixed(2),
            accMTDPercent       = (accMTD / accTarget * 100).toFixed(2) + '%',
            accGapValue         = accMTD - accSMTD,
            accGapFloat         = (accGapValue > 0) ? '+' : '' + (accGapValue / 10**6).toFixed(2),
            accGapPercent       = ((accGapValue / accTarget) * 100).toFixed(2) + '%',
                    
            fpToAcvValue        = (achiev(fpMTD, fpTarget)) ? 'ACHIEV' : '-' + parseInt((fpTarget - fpMTD)),
            fpToAcvPercent      = (fpToAcvValue == 'ACHIEV') ? '☆☆☆☆☆' : '-' + parseInt((fpToAcvValue / fpTarget) * 100) + '%',
            fpMTDFloat          = (fpToAcvValue == 'ACHIEV') ? '☆ ACHIEV ☆' : (fpMTD / 10 ** 6).toFixed(2),
            fpMTDPercent        = (fpMTD / fpTarget * 100).toFixed(2) + '%',
            fpGapValue          = fpMTD - fpSMTD,
            fpGapFloat          = (fpGapValue > 0) ? '+' : '' + (fpGapValue / 10**6).toFixed(2),
            fpGapPercent        = ((fpGapValue / fpTarget) * 100).toFixed(2) + '%'

*/