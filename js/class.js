                                                                                                                                                                                                                                
                                                                                                                                                                        

class main {
    
    SETTINGS     = JSON.parse(localStorage.getItem('SETTINGS'))
    
    async fetchData (data) {
        const urlx  = new URL(data.url),
            params  = new URLSearchParams(urlx.search),
            alrt    = data.alert,
            loader  = data.loader
        
        params.set('sheet', data.sheet)
        params.set('header', data.header)
        params.set('range', data.range)
        params.set('url', data.spredsheet)
        params.set('value', data.value)
        
        urlx.search = params.toString()
        try {
            const fetching  = await fetch(urlx),
                data        = await fetching.json()
                
            //console.log(data.data, 'data 25')
            if (fetching.ok) return data.data
            if (fetching.status === 404) throw new Error('404', 'Halaman tidak ditemukan')
            if (fetching.status === 500) throw new Error('500', 'Error pada server')
            
            throw new Error(fetching.status)
        }
        catch (error){
            this.alertHandle('error', error + '. <br>Cek koneksi Jaringan kamu atau periksa kembali link dan data yang kamu masukkan.')
            return undefined
        }
    }
    dateCode    = function(param = new Date()) {
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
            allLong     : new Date(param).toLocaleString('default', {weekday: 'long', date: 'numeric', month: 'long', year: 'numeric'}),
            dateLong    : new Date(param).toLocaleString('default', {date: 'numeric', month: 'long', year: 'numeric'}),
            dayName     : new Date(param).toLocaleString('default', {weekday: 'short'}),
            dayLong     : new Date(param).toLocaleString('default', {weekday: 'long'}),
            monthNum    : month,
            month       : monthx,
            monthName   : new Date(param).toLocaleString('default', {month: 'short'}),
            monthLong   : new Date(param).toLocaleString('default', {month: 'long'}),
            monthYear   : new Date(param).toLocaleString('default', {month: 'long', year: 'numeric'}),
            year        : year,
            firstDayTime: new Date (FTime).getTime(),
            lastDayTime : new Date (LTime).getTime(),
            nextMonth   : new Date(new Date (param).setMonth(new Date(param).getMonth() + 1)),
            prevMonth   : new Date(new Date (param).setMonth(new Date(param).getMonth() - 1))
        }
    }
    dateRange   = function (dateOne, dateTwo) {
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
    setLoad     = function (elmID) {
        const elm    = document.querySelector(elmID)
        if (elm.parentElement.style.position == 'static') elm.parentElement.style.position = 'absolute'
        return {
            play : () => {
                elm.classList.remove('dis-none')
                elm.innerHTML = `<div class="loader"></div>`
                elm.classList.add('the-loader')
            },
            stop : () => {
                elm.classList.add('dis-none')
                elm.innerHTML = ``
                elm.classList.remove('the-loader')
            }
            
        }
    }
    alertHandle = function (type, text, header = '', callback = () => console.log('callBack')) {
        //console.log('alert')
        const arrType   = [
            {
                type: 'error',
                color: 'red',
                icon: 'fa-circle-exclamation',
                header : 'Error',
                cancel : false
            },
            {
                type: 'success',
                color: 'green',
                icon: 'fa-circle-check',
                header: 'Success',
                cancel : false
            },
            {
                type: 'info',
                color: 'default',
                icon: 'fa-circle-info',
                header: 'Information',
                cancel: false
            },
            {
                type: 'confirm',
                color: 'blue',
                icon: 'fa-circle-question',
                header: 'Confirm',
                cancel: true
            }
        ],
            head        = document.querySelector('.alert-head'),
            headr       = document.querySelector('#alert-header'),
            icon        = document.querySelector('#alert-icon'),
            desc        = document.querySelector('#alert-text'),
            data        = arrType.filter(ty => ty.type.toUpperCase() == type.toUpperCase())[0],
            ok          = document.querySelector('#alert-ok'),
            cancel      = document.querySelector('#alert-cancel'),
            theAlert    = document.querySelector('.alert')
         
        if (!data) return console.log('Alert type ' + type + ' not found')
        theAlert.classList.remove('dis-none')
        
        head.classList.remove('clr-red', 'clr-green', 'clr-default', 'clr-blue')
        head.classList.add('clr-' + data.color)
        
        icon.classList.remove('fa-circle-exclamation', 'fa-circle-check', 'fa-circle-info', 'fa-circle-question')
        icon.classList.add(data.icon)
        
        ok.classList.remove('red', 'green', 'blue', 'default')
        ok.classList.add(data.color)
        
        if (data.cancel) cancel.classList.remove('dis-none')
        else cancel.classList.add('dis-none')
        
        let headerText = '';
        
        (header == '') ? headerText = data.header : headerText = header;
        headr.textContent = headerText
        desc.innerHTML = text
        
        document.querySelector('#alert-ok').onclick = function () {
            document.querySelector('.alert').classList.add('dis-none')
            callback()
            if (type == 'info') return undefined
            if (type == 'confirm') return true
            if (type == 'error') return true
            if (type == 'success') return true
        }
        document.querySelector('#alert-cancel').onclick = function () {
            document.querySelector('.alert').classList.add('dis-none')
            return false
        }
        
    }
    play = function () {}
    
    /*myDB    = function () {
        let openDB  = indexedDB.open('mySMT', 1),
            DB      = null
        
        openDB.onerror = (error) => alert(error)
        openDB.onsuccess = async (event) => {
            
        }
        
        
    }*/
}

class dataBase {
    DB      = null
    dbName  = null 
    version = null
    
    constructor (db, version = 1) {
        this.dbName     = db
        this.version    = version
    }
    defaultDB   = function () {
        if (!DB.objectStoreNames.contains('AFTERSALES')) DB.createObjectStore('AFTERSALES', {
            keyPath : 'reciept'
        })
        if (!DB.objectStoreNames.contains('SALESCARD')) DB.createObjectStore('SALESCARD', {
            keyPath : 'monthCode'
        })
       
    }
    open        = function () {
        let openDB = indexedDB.open(this.dbName, this.version),
            param  = false
        openDB.onerror = (error) => alert(error)
        openDB.onsuccess = () => {
            console.log(dbData.db + ' opened success')
            console.log(openDB.result)
            this.DB = openDB.result
        }
    }
    put         = function (objectStore, data) {
        let param = false
        if (!DB.objectStoreNames.contains(objectStore)) {
            alert('ObjectStore ' + objectStore + ' not registed')
            return undefined
        }
        const trx = DB.transaction(objectStore, 'readwrite')
        
        trx.oncomplete = (event) => {
            param = true
            alert('success')
        }
        trx.onerror = (error) => alert(error)
    }
}

class calendarSet {
    
    mainDate    = new Date ()
    box         = document.querySelector('#dc-date')
    name        = document.querySelector('#calendar-month')
    next        = document.querySelector('#calendar-next')
    previous    = document.querySelector('#calendar-previous')
    
    generate        = function (date) {
        const dateCode  = new main().dateCode(date),
            last        = dateCode.last,
            first       = 1,
            firstDay    = dateCode.firstDay,
            month       = dateCode.month,
            monthLong   = dateCode.monthLong,
            year        = dateCode.year,
            sch         = new schedule().readData(new Date(date)),
            arrayDate   = Array.from({length: last}, (n, i) => i + 1),
            arrayBegin  = Array.from({length: firstDay}, (n, i) => i + 1),
            today       = new main().dateCode(new Date()).dateCode
        let emptyDay    = '',
            dataDay     = ''
            
        arrayBegin.forEach(begin => {
            emptyDay += '<div class="dc-date-box no-shadow"></div>'
        })
        arrayDate.forEach ((data, i) => {
            let color = 'default', code = '...'
            if (sch) {
                if (sch[i].toUpperCase() == 'O' || sch[i].toUpperCase() == 'OFF') color = 'red'
                if (sch[i].toUpperCase() == 'ALL') color = 'black'
                code = sch[i]
            }
            const dx = (i < 9) ? '0' + (i+1) : i + 1,
                cdx  = dx + '' + dateCode.monthNum + '' + year
            dataDay += `
            <div class="dc-date-box ${(cdx == today) ? 'today default' : ''}">
                <div class="date-head">
                    <span class="date-num">${dx}</span>
                    <span class="date-sch clr-${color}">${code}</span>
                </div>
                <div class="date-data">
                    <div class="data-progress red"></div>
                    <div class="data-progress green"></div>
                    <div class="data-progress blue"></div>
                    <div class="data-progress yellow"></div>
                    <div class="data-progress grey"></div>
                    <div class="data-progress purple"></div>
                    <div class="data-progress orange"></div>
                    <div class="data-progress black"></div>
                </div>
            </div>`
        })  
        this.box.innerHTML = emptyDay + dataDay
        this.name.textContent = new main ().dateCode(this.mainDate).monthYear
    }
    now             = function () {
        this.mainDate = new Date ()
        this.generate (this.mainDate)
    }
    nextMonth       = function () {
        this.mainDate = new main ().dateCode(new Date(this.mainDate)).nextMonth
        this.generate (this.mainDate)
    }
    previousMonth   = function () {
        this.mainDate = new main ().dateCode(new Date(this.mainDate)).prevMonth
        this.generate (this.mainDate)
    }
    play            = function () {
        this.now()
        this.name.onclick = () =>  this.now()
        this.previous.onclick = () => this.previousMonth()
        this.next.onclick = () => this.nextMonth()
    }
}

class salesCard {
    allData     = JSON.parse(localStorage.getItem('SALESCARD'))
    urlData     = JSON.parse(localStorage.getItem('SETTINGS')).url
    
    scDate      = document.querySelector("#sc-date-input")
    scText      = document.querySelector("#sc-text-input")
    
    countTarget = function (target, progress, value) {
        let smtd        = Math.ceil(target * progress),
            smtdPrc     = (progress*100).toFixed(0),
            current     = (value < smtd) ? value : smtd,
            currentPrc  = parseFloat(((current/target)*100).toFixed(2)),
            gap         = value - smtd,
            gapPrc      = (value >= target) ? 100 - currentPrc : parseFloat(((gap/target)*100).toFixed(2)),
            toAcv       = value - target,
            toAcvPrc    = parseFloat(((toAcv/target)*100).toFixed(2)),
            sales       = parseInt(value) ,
            salesPrc    = ((sales/target)*100).toFixed(2) + '%'
        return {
            smtd        : smtd.toLocaleString(),
            smtdPrc     : smtdPrc + '%',
            current     : parseInt(current) .toLocaleString(),
            currentPrc  : currentPrc + '%',
            gap         : (value >= target) ? '☆☆☆' : ((gap > 0) ? '+' : '') + parseInt(gap) .toLocaleString(),
            gapPrc      : ((gap > 0) ? '+' : '') + gapPrc + '%',
            gapPrcx     : (gapPrc < 0) ? -1 * gapPrc + '%' : '+' + gapPrc + '%',
            toAcv       : ((toAcv > 0) ? '+' : '') + toAcv.toLocaleString(),
            toAcvPrc    : toAcvPrc + '%',
            sales       : sales.toLocaleString(),
            salesDec    : (value/1000000).toFixed(2),
            salesPrc    : salesPrc,
            target      : Math.ceil(target).toLocaleString(),
            targetDec   : (target/1000000).toFixed(2),
            color       : (gap >= 0) ? 'limegreen' : 'gray',
            bg          : (gap >= 0) ? 'limegreen' : 'lightgray'
        }
    }
    getByDate   = function (date) {
        const code      = new main().dateCode(new Date(date)),
            monthCode   = code.monthCode,
            rcpDate     = code.rcpDate,
            month       = this.allData.find(x => x.code == monthCode)
        if (this.allData.length == 0 || !this.allData || !month) return undefined
        return month.data.filter(data => data.reciept.indexOf(rcpDate) >= 0)
    }
    calculate   = function () {
        if (!this.getData()) return undefined
        
        const theDate   = new Date(this.scDate.value),
            schx        = new schedule().readData(theDate)
            
        if (!schx) return 'x-schedule'
        const dateCode  = new main().dateCode(new Date(this.scDate.value)),
            last        = parseInt(dateCode.last),
            firstDay    = parseInt(dateCode.firstDay),
            date        = parseInt(dateCode.date),
            monthNum    = dateCode.monthNum,
            month       = dateCode.month - 1,
            year        = parseInt(dateCode.year),
            weeksy      = [[]]
        
        let counter = 0
        for (let i = 1; i <= last; i++) {
            const day = new Date(year, month, i).getDay()
            if (day == 1 &&  weeksy[counter].length > 0) {
                counter++
                weeksy[counter] = []
            }
            let x = (i < 10) ? '0' + i : i
            weeksy[counter].push(x)
        }
        
        const smtd  = Math.ceil((date/last)*100),
            SMTD    = (smtd/100),
            data    = this.getData(),
            target  = data.target,
            sales   = data.data,
            dailyTargetRegular  = target.main/last,
            dailayTargeyWeek    = target.main/new schedule().remain(new Date(year,month, last)).work
        //return console.log(data)
        let mainMTD     = 0,
            ftrMTD      = 0,
            accMTD      = 0,
            fpMTD       = 0,
            comserMTD   = 0,
            weekHTML    = ``,
            dayHTML     = ``,
            deptMTD     = []
        
        weeksy.forEach((week, W) => {
            let wTD         = 0,
                mainWTD     = 0,
                ftrWTD      = 0,
                accWTD      = 0,
                fpWTD       = 0,
                comserWTD   = 0,
                qtyWTD      = 0,
                skuWTD      = 0,
                wTarget     = week.length * dailyTargetRegular
                
            week.forEach((day, D) => {
                if (parseInt(day) > date || parseInt(day) > last) return
                const dayDate       = new Date (year, month, parseInt(day)),
                    dateCode        = new main().dateCode(dayDate),
                    dayData         = sales.filter(sale => sale.reciept.indexOf(dateCode.rcpDate) >= 0),
                    remainWork      = new schedule().remain(dayDate).work,
                    remainMain      = target.main - mainMTD,
                    remainFtr       = target.ftr - ftrMTD,
                    remainAcc       = target.acc - accMTD,
                    remainFp        = target.fp - fpMTD,
                    remainComser    = target.comser - comserMTD,
                    daySch          = new schedule().byDate(dayDate),
                    color           = (daySch.use) ? daySch.color : 'default',
                    dayTarget       = {
                        main    : remainMain / remainWork,
                        ftr     : remainFtr / remainWork,
                        acc     : remainAcc / remainWork,
                        fp      : remainFp / remainWork,
                        comser  : remainComser / remainWork
                    }
                
                let dayMain = 0, dayFtr = 0, dayAcc = 0, dayFp = 0, dayComser = 0,
                    qty = 0, total = 0, sku = [], dept = [], rcp = []
                    
                dayData.forEach(data => {
                    //console.log(typeof data.qty)
                    const dxQty     = (typeof data.qty == 'number') ? data.qty : parseInt(data.qty.replace(/,/g, ""))
                    const dxTotal   = (typeof data.total == 'string') ? parseInt(data.total.replace(/,/g, "")) : data.total;
                    
                    qty += parseFloat(dxQty)
                    total += parseFloat(dxTotal)
                    
                    const deptType  = new department().deptType(data.dept.toUpperCase()).toUpperCase(),
                        deptIndex   = dept.findIndex(x => x.code == data.dept),
                        rcpIndex    = rcp.findIndex(x => x == data.reciept),
                        skuIndex    = sku.findIndex(x => x == data.sku);
                        
                    (deptIndex >= 0) ? dept[deptIndex].sales += parseFloat(dxTotal) : dept.push({
                        code : data.dept.toUpperCase(),
                        sales : parseFloat(dxTotal)
                    });
                    
                    if (rcpIndex < 0) rcp.push(data.reciept.toUpperCase())
                    if (skuIndex < 0) sku.push((data.sku + "") .toUpperCase())
                    
                    //dayMain += parseFloat(dxTotal)
                    
                    if (deptType == 'FURNITURE') dayFtr += parseFloat(dxTotal)
                    if (deptType == 'ACCESSORIES') dayAcc += parseFloat(dxTotal)
                    if (deptType == 'FURNITURE' || deptType == 'ACCESSORIES') dayMain += parseFloat(dxTotal)
                    if (data.item.toUpperCase().indexOf('FURNIPRO') >= 0) return dayFp += parseFloat(dxQty)
                    if (data.item.toUpperCase().indexOf('CUCI AC') >= 0) return dayComser += parseFloat(dxTotal)
                })
                
                const DMain = this.countTarget((dayTarget.main <= 0) ? 1000000 : dayTarget.main, 1, dayMain),
                    DFtr    = this.countTarget((dayTarget.ftr <= 0) ? 1000000 : dayTarget.ftr, 1, dayFtr),
                    DAcc    = this.countTarget((dayTarget.acc <= 0) ? 1000000 : dayTarget.acc, 1, dayAcc),
                    DFp     = this.countTarget((dayTarget.fp <= 0) ? 2 : dayTarget.fp, 1, dayFp),
                    DComser = this.countTarget((dayTarget.comser <= 0) ? 75000 : dayTarget.comser, 1, dayComser)
                
                let dayDept =``
                dept.forEach(x => {
                    const i = deptMTD.findIndex(d => d.code.toUpperCase() == x.code.toUpperCase())
                    if (i >= 0) deptMTD[i].sales += parseInt(x.sales)
                    else deptMTD.push({
                        code    : x.code.toUpperCase(),
                        sales   : x.sales
                    })
                    dayDept += `
                        <div class="day-dept-group">
                            <span>${x.code.toUpperCase()}</span>
                            <span>${x.sales.toLocaleString()}</span>
                        </div>
                    `
                })
                
                dayHTML += `
                                <div class="daily-data">
                                    <div class="day-top">
                                        <div class="top-date ${color}" data-date="${day}"></div>
                                        <div class="top-day">W${W + 1} D${D + 1} - ${dateCode.dayLong}</div>
                                        <div class="top-schedule">${daySch.code}</div>
                                    </div>
                                    <div class="day-diagram">
                                        <div class="day-bar day-main" data-actual="${DMain.salesDec}" data-target="${DMain.targetDec}" style="height:${DMain.salesPrc};"></div>
                                        <div class="day-bar day-ftr" data-actual="${DFtr.salesDec}" data-target="${DFtr.targetDec}" style="height:${DFtr.salesPrc};"></div>
                                        <div class="day-bar day-acc" data-actual="${DAcc.salesDec}" data-target="${DAcc.targetDec}" style="height:${DAcc.salesPrc};"></div>
                                        <div class="day-bar day-fp" data-actual="${DFp.sales}" data-target="${DFp.target}" style="height:${DFp.salesPrc};"></div>
                                        <div class="day-bar day-comser" data-actual="${DComser.sales}" data-target="${DComser.target}" style="height:${DComser.salesPrc};"></div>
                                    </div>
                                    
                                    <div class="no-sales ${(dayData.length == 0) ? 'clr-' + daySch.color : 'dis-none'}"><span>${(daySch.code == 'OFF' ||  daySch.code == 'AL') ? daySch.code : 'NO SALES'}</span></div>
                                    <div class="day-detail ${(dayData.length == 0) ? 'dis-none' : ''}">
                                        <h6>${dateCode.date} ${dateCode.dateLong}</h6>
                                        <div class="day-detail-type bg-main">
                                            <span class="type-head">All</span>
                                            <div class="detail-group">
                                                <span>Target</span>
                                                <span>${DMain.target}</span>
                                                <span></span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Actual</span>
                                                <span>${DMain.sales}</span>
                                                <span>${DMain.salesPrc}</span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Gap</span>
                                                <span>${DMain.gap}</span>
                                                <span>${DMain.gapPrc}</span>
                                            </div>
                                        </div>
                                        <div class="day-detail-type bg-ftr">
                                            <span class="type-head">Ftr</span>
                                            <div class="detail-group">
                                                <span>Target</span>
                                                <span>${DFtr.target}</span>
                                                <span></span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Actual</span>
                                                <span>${DFtr.sales}</span>
                                                <span>${DFtr.salesPrc}</span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Gap</span>
                                                <span>${DFtr.gap}</span>
                                                <span>${DFtr.gapPrc}</span>
                                            </div>
                                        </div>
                                        <div class="day-detail-type bg-acc">
                                            <span class="type-head">Acc</span>
                                            <div class="detail-group">
                                                <span>Target</span>
                                                <span>${DAcc.target}</span>
                                                <span></span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Actual</span>
                                                <span>${DAcc.sales}</span>
                                                <span>${DAcc.salesPrc}</span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Gap</span>
                                                <span>${DAcc.gap}</span>
                                                <span>${DAcc.gapPrc}</span>
                                            </div>
                                        </div>
                                        <div class="day-detail-type bg-fp clr-black">
                                            <span class="type-head br-past">Fp</span>
                                            <div class="detail-group">
                                                <span>Target</span>
                                                <span>${DFp.target}</span>
                                                <span></span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Actual</span>
                                                <span>${DFp.sales}</span>
                                                <span>${DFp.salesPrc}</span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Gap</span>
                                                <span>${DFp.gap}</span>
                                                <span>${DFp.gapPrc}</span>
                                            </div>
                                        </div>
                                        <div class="day-detail-type bg-comser">
                                            <span class="type-head">Comser</span>
                                            <div class="detail-group">
                                                <span>Target</span>
                                                <span>${DComser.target}</span>
                                                <span></span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Actual</span>
                                                <span>${DComser.sales}</span>
                                                <span>${DComser.salesPrc}</span>
                                            </div>
                                            <div class="detail-group">
                                                <span>Gap</span>
                                                <span>${DComser.gap}</span>
                                                <span>${DComser.gapPrc}</span>
                                            </div>
                                        </div>
                                        <div class="day-dept">${dayDept}</div>
                                        <div class="day-note">
                                            <p>${rcp.length} Rcp - ${sku.length} SKU - ${qty} Qty</p>
                                            <i class="fas fa-arrow-right"></i>
                                        </div>
                                    </div>
                                </div>
                `
                mainWTD += dayMain
                ftrWTD += dayFtr 
                accWTD += dayAcc
                fpWTD += dayFp
                comserWTD += dayComser
                qtyWTD += qty
                skuWTD += sku
                
                mainMTD += dayMain
                ftrMTD += dayFtr
                accMTD += dayAcc
                fpMTD += dayFp
                comserMTD += dayComser
            })
        })
        
        document.querySelector('.days-list').innerHTML = dayHTML

        const MMain = this.countTarget(target.main, smtd/100, mainMTD),
            MFtr    = this.countTarget(target.ftr, smtd/100, ftrMTD),
            MAcc    = this.countTarget(target.acc, smtd/100, accMTD),
            MFp     = this.countTarget(target.fp, smtd/100, fpMTD),
            MComser = this.countTarget(target.comser, smtd/100, comserMTD),
            slx     = ['.main', '.ftr', '.acc', '.fp', '.comser']
        
        document.querySelector('.ds-top').innerHTML = `
                <label>Month to date</label>
                <h1 data-percent="${MMain.salesPrc}">${MMain.sales}</h1>
                <p data-text="GAP ${MMain.gapPrc}">${MMain.gap}</p>
                <span>SMTD ${smtd}% - ${MMain.smtd}</span>
        `
        document.querySelector('.ds-devide').innerHTML = `
            
                                <div class="sales-devide default">
                                    <div class="devide-head">
                                        <span>Furniture</span>
                                        <div class="devide-progress"></div>
                                    </div>
                                    <div class="devide-current">
                                        <h5>${MFtr.sales}</h5>
                                        <h5>${MFtr.salesPrc}</h5>
                                    </div>
                                    <div class="devide-gap">
                                        <label>${MFtr.gap}</label>
                                        <label>${MFtr.gapPrc}</label>
                                    </div>
                                </div>
                                <span class="clr-default">|</span>
                                <div class="sales-devide default">
                                    <div class="devide-head">
                                        <span>Accessories</span>
                                        <div class="devide-progress"></div>
                                    </div>
                                    <div class="devide-current">
                                        <h5>${MAcc.sales}</h5>
                                        <h5>${MAcc.salesPrc}</h5>
                                    </div>
                                    <div class="devide-gap">
                                        <label>${MAcc.gap}</label>
                                        <label>${MAcc.gapPrc}</label>
                                    </div>
                                </div>
                                <div class="sales-devide default">
                                    <div class="devide-head">
                                        <span>FurniPro</span>
                                        <div class="devide-progress"></div>
                                    </div>
                                    <div class="devide-current">
                                        <h5>${MFp.sales}</h5>
                                        <h5>${MFp.salesPrc}</h5>
                                    </div>
                                    <div class="devide-gap">
                                        <label>${MFp.gap}</label>
                                        <label>${MFp.gapPrc}</label>
                                    </div>
                                </div>
                                <span class="clr-default">|</span>
                                <div class="sales-devide default">
                                    <div class="devide-head">
                                        <span>Comser</span>
                                        <div class="devide-progress"></div>
                                    </div>
                                    <div class="devide-current">
                                        <h5>${MComser.sales}</h5>
                                        <h5>${MComser.salesPrc}</h5>
                                    </div>
                                    <div class="devide-gap">
                                        <label>${MComser.gap}</label>
                                        <label>${MComser.gapPrc}</label>
                                    </div>
                                </div>
        `
        
        slx.forEach (elm => {
            let clas    = document.querySelector(elm),
                data    = '',
                gap     = clas.querySelector('.gap'),
                current = clas.querySelector('.current')
                
            if (elm == '.main')     data = MMain
            if (elm == '.ftr')      data = MFtr
            if (elm == '.acc')      data = MAcc
            if (elm == '.fp')       data = MFp
            if (elm == '.comser')   data = MComser
            
            gap.style.height            = data.gapPrcx
            gap.style.backgroundColor   = data.bg
            gap.style.color             = data.color
            gap.dataset.gap             = data.gap
            
            current.style.height        = data.currentPrc
            current.style.color         = data.color
            current.dataset.target      = data.target
            current.dataset.current     = data.current
            
            clas.dataset.jsonx           = JSON.stringify({
                data : data
            })
        })
        
        const theDept = target.dept
        if (theDept.length == 0) return true
        theDept.forEach((x,n) => {
            let target  = (x.target == '') ? 5000000 : parseInt(x.target),
                dept    = deptMTD.find( i => i.code == x.code),
                value   = (!dept) ? 0 : dept.sales,
                data    = this.countTarget(target, SMTD, value),
                smtdx   = target * SMTD,
                bgx     = 'black' 
            if (value > 0) bgx = 'grey'
            if (value >= smtdx) bgx = 'default'
            if (value >= target) bgx = 'green'
             
            theDept[n].data = data
            theDept[n].data.bgx = bgx
            if (x.target == '') theDept[n].target = target
        })
        new department().generateTarget(theDept)
        return true
    }
    getData     = function () {
        const monthCode = new main().dateCode(new Date(this.scDate.value)).monthCode,
            theData     = JSON.parse(localStorage.getItem('SALESCARD')),
            i           = theData.findIndex(x => x.code == monthCode)
        if (i >= 0) return theData[i]
        document.querySelector('#sc-link').click()
        document.querySelector('#sc-open').click()
        return undefined 
    }
    setTable    = function (data, elm) {
        if (!data || !elm) return
        let HTML    = ''
        data.forEach((x,i) => {
            HTML += `
                <tr class='${(x.alert == false) ? 'red' : '' }'>
                    <td>${(i < 9) ? '0' + (i +1) : i + 1 }</td>
                    <td class="td-reciept">${x.reciept}</td>
                    <td>${x.sku}</td>
                    <td>${x.item}</td>
                    <td>${x.dept}</td>
                    <td>${x.qty}</td>
                    <td>${x.price}</td>
                    <td>${x.sp}</td>
                    <td>${x.disc}</td>
                    <td>${x.total}</td>
                </tr>
            `
        })
        document.querySelector( elm + ' tbody').innerHTML = HTML
    }
    search      = function (text) {
        document.querySelectorAll('#sc-reciept-table tbody tr').forEach (tr => {
            const textContent   = tr.textContent.toUpperCase(),
                value           = text.toUpperCase()
            if (textContent.indexOf(value) >= 0)  return tr.style.display = ''
            tr.style.display = 'none'
        })
    }
    fetchData   = async function (value = '') {
        
        const loader    = new main().setLoad('#sc-loader'),
            urlDT       = JSON.parse(localStorage.getItem('SETTINGS')).url
        loader.play()
        const respon    = await new main().fetchData({
                    url         : urlDT.main,
                    spredsheet  : urlDT.salesCard.url,
                    sheet       : urlDT.salesCard.sheet,
                    header      : urlDT.salesCard.header,
                    range       : urlDT.salesCard.range,
                    value       : value
                }),
            dateCode    = new main().dateCode(new Date(document.querySelector("#sc-date-input").value)),
            rcpMonth    = dateCode.rcpMonth,
            monthCd     = dateCode.monthCode
        if (!respon) {
            loader.stop()
            document.querySelector('#fetch-table-close').click()
        }
        let data    = await respon,
            array   = [],
            HTML    = ``
        data.forEach((x, i) => {
            if (x.reciept == "" || x.dept == '' || x.reciept.indexOf(rcpMonth) < 0) return
            array.push(x)
        })
        
        await new salesCard().setTable(array, '#fetch-table')
        loader.stop()
        
        document.querySelector('#fetch-update').onclick = () => {
            //if (!confirm('Update ?')) return
            new main().alertHandle('confirm', '', 'Update ?', function () {
                const allDT = JSON.parse(localStorage.getItem('SALESCARD'))
                const i = allDT.findIndex(x => x.code == monthCd)
                if (i >= 0) allDT[i].data = array
                else allData.push({
                    code    : monthCd,
                    data    : array,
                    target  : {
                        main    : 170000000,
                        ftr     : 170000000 * 0.8,
                        acc     : 170000000 * 0.2,
                        fp      : 25,
                        comser  : 500000
                    }
                })
                localStorage.setItem('SALESCARD', JSON.stringify(allDT))
                new salesCard().calculate()
                document.querySelector('#fetch-table-close').click()
            })
            //document.querySelector().classList.add('dis-none')
        }
        document.querySelector('.sc-fetch-table').classList.remove('dis-none')
    }
    play        = async function () {
        const open          = document.querySelector('#sc-open'),
            close           = document.querySelector('#sc-close'),
            scForm          = document.querySelector('#sc-form'),
            save            = document.querySelector('#sc-save'),
            reset           = document.querySelector('#sc-reset'),
            fetch           = document.querySelector('#sc-fetch'),
            tableClose      = document.querySelector('#fetch-table-close'),
            mainInput       = document.querySelector('#main-input'),
            ftrInput        = document.querySelector('#ftr-input'),
            accInput        = document.querySelector('#acc-input'),
            fpInput         = document.querySelector('#fp-input'),
            comserInput     = document.querySelector('#ac-input'), 
            textSearch      = document.querySelector('#sc-text-search'),
            dateSearch      = document.querySelector('#sc-date-search'),
            diagramDetail   = document.querySelector('.diagram-detail'),
            detailBarBox    = document.querySelector('.detail-bar-box'),
            detailText      = document.querySelector('.dg-detail-text'),
            detailClose     = document.querySelector('.dg-detail-close'),
            detailGap       = document.querySelector('.detail-gap'),
            detailCurrent   = document.querySelector('.detail-current')
        
        mainInput.onkeyup       = () => {
            const value = mainInput.value
            ftrInput.value = parseInt(value) * 0.8,
            accInput.value = parseInt(value) * 0.2
        }
        tableClose.onclick      = function () {this.parentElement.parentElement.parentElement.classList.add('dis-none')}
        open.onclick            = () => {
            document.querySelectorAll('.content').forEach(link => link.classList.add('dis-none'))
            document.querySelector('#sales-card').classList.remove('dis-none')
            document.querySelector('#sc-form').classList.remove('dis-none')
            const data = new salesCard().getData()
            console.log(data)
            if (!data) return 
            if(!data.target) return
            mainInput.value     = data.target.main
            ftrInput.value      = data.target.ftr
            accInput.value      = data.target.acc
            fpInput.value       = data.target.fp
            comserInput.value   = data.target.comser
            new department().generateInput()
        }
        close.onclick           = () => {
            if (!this.getData()) return
            scForm.classList.add('dis-none')
        }
        reset.onclick           = () => scForm.querySelectorAll('input').forEach (input => input.value = '')
        fetch.onclick           = async () => { 
            if (this.scDate.value == '') return new main().alertHandle('alert', 'Pilih tanggal pada halaman awal salesCard')
            //if (!confirm('Fetch ?')) return
            //return new salesCard().fetchData
            const ft = new salesCard().fetchData
            new main().alertHandle('confirm', 'Fetch ?', '', async () => ft())
        }
        save.onclick            = () => {
            
            if (this.scDate.value == '') return new main().alertHandle('error', 'Tanggal tidak ditemukan', '', function () {
                    close.click()
                    document.querySelector('#sc-date-input').click()
                })
            const allDT = this.allData
            return new main().alertHandle('confirm', 'Save ?', '', function () {
                
                let param   = true
                scForm.querySelectorAll('.target-input').forEach(input => {
                    if (input.value != '') return input.style.borderColor = '#00BCBC'
                    param = false
                    return input.style.borderColor = 'red'
                })
                if (!param) return
                
                let deptTarget = []
                document.querySelectorAll('.dept-target .dept-input').forEach(dept => deptTarget.push({
                        code    : dept.dataset.code.toUpperCase(),
                        target  : (dept.value == '') ? 5000000 : parseInt(dept.value)
                    }))
                
                const monthCode = new main().dateCode(new Date(document.querySelector('#sc-date-input').value)).monthCode,
                    i           = allDT.findIndex(x => x.code == monthCode)
                    
                if (i < 0) allDT.push({
                    code    : monthCode,
                    data    : [ ],
                    target  : {
                        main    : Math.ceil(mainInput.value),
                        ftr     : Math.ceil(ftrInput.value),
                        acc     : Math.ceil(accInput.value),
                        fp      : Math.ceil(fpInput.value),
                        comser  : Math.ceil(comserInput.value),
                        dept    : deptTarget
                    }
                })
                else allDT[i].target = {
                    main    : Math.ceil(mainInput.value),
                    ftr     : Math.ceil(ftrInput.value),
                    acc     : Math.ceil(accInput.value),
                    fp      : Math.ceil(fpInput.value),
                    comser  : Math.ceil(comserInput.value),
                    dept    : deptTarget
                }
                //return console.log(deptTarget)
                localStorage.setItem('SALESCARD', JSON.stringify(allDT))
                scForm.classList.add('dis-none')
                new salesCard().calculate()
            })
        }
        this.scText.value       = new main().dateCode(new Date()).longText
        this.scDate.valueAsDate = new Date ()
        this.scDate.onchange    = () => {
            const value     = new Date(this.scDate.value),
                longDate    = new main().dateCode(value).longText
            if (this.scDate.value == '') return this.scText.value = 'Bendhard16'
            this.scText.value = longDate
            this.calculate(new Date(this.scDate.value))
        }
        textSearch.onkeyup      = () => this.search(textSearch.value)
        dateSearch.onchange     = () => {
            const dateRcp   = (dateSearch.value == '') ? '' : new main().dateCode(new Date(dateSearch.value)).rcpDate
            this.search(dateRcp)
            textSearch.value = ''
        }
        detailClose.onclick     = () => diagramDetail.classList.add('hide')
        document.querySelectorAll('.diagram-box').forEach(box => {
            box.onclick = function () {
                const text  = this.dataset.text,
                    json    = JSON.parse(this.dataset.jsonx).data
                    
                diagramDetail.classList.remove('hide')
                detailBarBox.classList.remove('main','ftr','acc','fp','comser')
                detailBarBox.classList.add(text)
                detailText.classList.remove('main','ftr','acc','fp','comser')
                detailText.classList.add(text)
                
                detailGap.style.backgroundColor = json.bg
                detailGap.style.height          = json.gapPrcx
                detailCurrent.style.height      = json.currentPrc
                
                document.querySelector('.dg-detail-group .tgtx').dataset.text       = json.target
                document.querySelector('.dg-detail-group .smtd').dataset.value      = json.smtd
                document.querySelector('.dg-detail-group .smtd').dataset.prc        = json.smtdPrc
                document.querySelector('.dg-detail-group .actual').dataset.text     = json.sales
                document.querySelector('.dg-detail-group .actualPrc').dataset.text  = json.salesPrc
                document.querySelector('.dg-detail-group .gapx').dataset.text       = json.gap
                document.querySelector('.dg-detail-group .gapPrc').dataset.text     = json.gapPrc
                document.querySelector('.dg-detail-group .toAcv').dataset.text      = json.toAcv
                document.querySelector('.dg-detail-group .toAcvPrc').dataset.text   = json.toAcvPrc
            }
        })
        if (this.scDate.value == '') this.scDate.valueAsDate = new Date ()
        if (! await this.calculate()) return undefined 
        await this.setTable(this.getData().data, '#sc-reciept-table')
        
        window.addEventListener('click', (e) => {
            const target = e.target
            if (target.matches('span.dept-group')) {
                const data = JSON.parse(target.dataset.json),
                    left    = document.querySelector('.dept-detail-left')
                
                left.classList.remove('grey','black', 'yellow', 'blue', 'green', 'default')
                left.classList.add(data.bgx)
                left.innerHTML = `
                    <div class="left-code">${target.dataset.code}</div>
                    <div class="left-name">${target.dataset.name}</div>
                `
                document.querySelector('.dept-detail-data').innerHTML = `
                    
                                <div class="dept-detail-group ${data.bgx}">
                                    <label class='clr-${data.bgx}'>Target</label>
                                    <span>${data.target}</span>
                                    <span>SMTD ${data.smtdPrc} <br>${data.smtd}</span>
                                </div>
                                <div class="dept-detail-group ${data.bgx}">
                                    <label class='clr-${data.bgx}'>Actual</label>
                                    <span>${data.sales}</span>
                                    <span>${data.salesPrc}</span>
                                </div>
                                <div class="dept-detail-group ${data.bgx}"> 
                                    <label class='clr-${data.bgx}'>Gap</label>
                                    <span>${data.gap}</span>
                                    <span>${data.gapPrc}</span>
                                </div>
                                <div class="dept-detail-group ${data.bgx}">
                                    <label class='clr-${data.bgx}'>To Achiev</label>
                                    <span>${data.toAcv}</span>
                                    <span>${data.toAcvPrc}</span>
                                </div>
                `
                return document.querySelector('.sc-dept-detail').classList.add('on')
            }
            if (target.matches('.dept-detail-left .left-code')) return document.querySelector('.sc-dept-detail').classList.remove('on')
            if (target.matches('.sc-reciept-top i')) dateSearch.click()
        })
        return true
    }
}

class schedule {
    
    allData     = JSON.parse(localStorage.getItem('SCHEDULE'))
    allTime     = JSON.parse(localStorage.getItem('scheduleTime'))
    urlData     = JSON.parse(localStorage.getItem('SETTINGS')).url
    
    mainDate    = new Date ()
    box         = document.querySelector('#sch-data')
    name        = document.querySelector('#sch-calendar-now')
        
    fetchData   = async function (value = '') {
        const loader = new main().setLoad('#sch-loader'),
            urlData  = JSON.parse(localStorage.getItem('SETTINGS')).url
        loader.play()
        
        //console.log(this.urlData)
        const respon = await new main().fetchData({
            url : urlData.main,
            spredsheet : urlData.schedule.url,
            sheet: urlData.schedule.sheet,
            header: urlData.schedule.header,
            range: urlData.schedule.range,
            value : value
        })
        if (!respon) return loader.stop()
        const list = document.querySelectorAll('.sch-input')
        console.log(respon[0])
        Object.values(respon[0]).forEach((sch, i) => {
            if (i + 1 > list.length) return
            list[i].value = (sch.toUpperCase() == 'O') ? 'OFF' : sch
            new schedule().schColor(list[i])
        })
        new main().alertHandle('success', 'Data schedule kamu berhasil di download')
        loader.stop()
    }
    readData    = function (date) {
        if (this.allData == []) return undefined 
        const monthCode = new main().dateCode(new Date(date)).monthCode,
            index       = this.allData.findIndex(datax => datax.code == monthCode)
        if (index < 0) return undefined
        const data        = this.allData[index].data
        return data
    }
    byDate      = function (date) {
        const code = this.readData(new Date(date))[new Date (date).getDate() - 1]
        if (!code) return undefined
        const time = this.allTime.find(x => x.code.toUpperCase() == code)
        if (!time) return {
            code    : code,
            time    : '-',
            color   : 'default',
            use     : true
        }
        return {
            code    : code,
            time    : time.time,
            color   : time.color,
            use     : time.use
        }
    }
    generate    = function (datex = new Date ()) {
        const DateCode  = new main().dateCode(new Date(datex)),
            firstDay    = parseInt(DateCode.firstDay),
            lastDate    = parseInt(DateCode.last),
            month       = DateCode.monthLong,
            monthx      = new Date (datex).getMonth() + 1,
            monthNum    = (monthx < 10) ? '0' + monthx : monthx,
            year        = DateCode.year,
            schedule    = this.readData(new Date(datex)),
            def         = "",
            today       = new main().dateCode (new Date()).dateCode
        
        let beginHTML = '', theHTML = ''
        for (let i = 0; i < firstDay; i++) {
            beginHTML += `
                <div class="sch-date begin"></div>
            `
        }
        for (let i = 0; i < lastDate; i++) {
            let x       = (i < 9) ? '0' + (i + 1) : i + 1,
                code    = (!schedule) ? 'x' : schedule[i],
                color   = this.allTime.find(time => time.code == code && time.use == true),
                dateCd  = x + '' + monthNum + '' + year
            
            theHTML += `
                <div class="sch-date ${(dateCd == today) ? 'tdx default' : ''}" id="Sch${x}"  data-date="${x}" data-month="${month}" data-year="${year}">
                    <span>${x}</span>
                    <div class="sch-codex br-${(!color) ? 'default' : color} clr-${(!color) ? 'default' : color}">
                        <input class="sch-input" type="text" value="${(code == 'x') ? '' : schedule[i]}" placeholder="- - -">
                    </div>
                </div>
            `
        }
        this.name.dataset.month     = monthNum
        this.name.dataset.year      = year
        this.name.textContent       = new main ().dateCode(this.mainDate).monthYear
        this.box.innerHTML   = beginHTML + theHTML
        document.querySelectorAll('.sch-input').forEach(sch => {
            this.schColor(sch)
            sch.onkeyup = () => this.schColor(sch)
        })
    }
    schColor    = function (input = '') {
        const value = input.value.toUpperCase()
        let color   = '', font = '', bg = '', br = ''
        if (value == 'OFF' || value == 'O') color = 'red'
        else if (value == 'AL') color = 'black'
        else color = 'default'
        if (value == '') color = ''
        font    = 'clr-' + color
        bg      = color
        br      = 'br-' + color
        input.parentElement.classList.remove('br-red', 'br-black', 'br-white', 'br-default')
        input.parentElement.classList.add(br)
        //if (input.classList.contains('tdx')) return input.parentElement.parentElement.classList.add(bg)
    }
    clear       = () => new main().alertHandle('confirm','Clear ?', '', document.querySelectorAll('.sch-input').forEach(sch => sch.value = ''))
    now         = function () {
        this.mainDate = new Date ()
        this.generate(this.mainDate)
    }
    remain      = function (datex = new Date()) {
        const sch   = this.readData(new Date(datex)),
            date    = new Date (datex).getDate(),
            remain  = sch.slice(date - 1)
        if (!sch) return alert('remain undefined')
        let not = 0, work = 0
        remain.forEach(sch => {
            if (sch.toUpperCase() == 'O' || sch.toUpperCase() == 'OFF' || sch.toUpperCase() == 'AL') return not++;
            work++
        })
        return {
            not : not,
            work : work
        }
    }
    play        = async function () {
        
        const next      = document.querySelector('#sch-calendar-next'),
            previous    = document.querySelector('#sch-calendar-prev'),
            loader      = document.querySelector('#sch-loader'),
            save        = document.querySelector('#sch-save'),
            fetch       = document.querySelector('#sch-fetch'),
            reset       = document.querySelector('#sch-reset'),
            linkUpdate  = document.querySelector('#sch-link-update'),
            cogBtn      = document.querySelector('header i'),
            schSetOpen  = document.querySelector('#sch-setting'),
            schSetClose = document.querySelector('.sch-setting i'),
            read        = this.readData(new Date())
        
        cogBtn.onclick      = () => {
            if (cogBtn.classList.contains('active')) {
                document.querySelector('#setting').classList.add('dis-none')
                return cogBtn.classList.remove('active')
            }
            document.querySelector('#setting').classList.remove('dis-none')
            cogBtn.classList.add('active')
            document.querySelectorAll('.nav-link').forEach(link=> link.classList.remove('active'))
        }
        schSetOpen.onclick  = () => document.querySelector('.sch-setting').classList.remove('dis-none')
        schSetClose.onclick = () => document.querySelector('.sch-setting').classList.add('dis-none')
        this.name.onclick   = () =>  this.now()
        previous.onclick    = () => { 
            this.mainDate = new main ().dateCode(new Date(this.mainDate)).prevMonth
            this.generate (this.mainDate)
        }
        next.onclick        = () => {
            this.mainDate = new main ().dateCode(new Date(this.mainDate)).nextMonth
            this.generate(this.mainDate)
        }
        save.onclick        = () => {
            
            let array = new Array(),
                param = true,
                namex = this.name, 
                allDT = this.allData
            document.querySelectorAll('.sch-input').forEach(sch => {
                if (sch.value == '') return param = false
                array.push(sch.value)
            })
            if (param == false) return alert ('Not Complete !')
            new main().alertHandle('confirm', 'Save ?', '', function() {
                const monthCode = namex.dataset.month + '' + namex.dataset.year,
                    index       = allDT.findIndex(data => data.code == monthCode)
                if (index >= 0) allDT[index].data = array
                else allDT.push({
                    code : monthCode,
                    data : array
                })
                localStorage.setItem('SCHEDULE', JSON.stringify(allDT))
                //this.generate()
                
                window.location.reload()
            })
        }
        fetch.onclick       = () => {
            if (!this.urlData.schedule.url) return new main().alertHandle('error', 'Link schedule tidak ditemukan!', '', schSetOpen.click())
            new main().alertHandle('confirm','Get data ?', '', this.fetchData)
        }
        reset.onclick       = () => this.clear()
        linkUpdate.onclick  = () => {
            const url   = document.querySelector('#schedule-spreadsheet'),
                sheet   = document.querySelector('#schedule-sheet'),
                header  = document.querySelector('#schedule-header'),
                range   = document.querySelector('#schedule-range'),
                value   = document.querySelector('#schedule-value')
                
            let param = true
            document.querySelectorAll("#schedule-spreadsheet, #schedule-sheet, #schedule-header, #schedule-range, #schedule-value").forEach(input => {
                if (input.value != '') return input.style.borderColor = '#00BCBC'
                input.style.borderColor = 'red'
                param = false
            })
            if(!param) return
            const urlDT = this.urlData
            new main().alertHandle('confirm', 'Update ?', '', function () {
                urlDT.schedule = {
                    url     : url.value,
                    header  : header.value, 
                    range   : range.value,
                    sheet   : sheet.value,
                    value   : value.value
                }
                const loader = new main().setLoad('#sch-loader')
                loader.play()
                setTimeout(()=> {
                    loader.stop()
                    new main().alertHandle('success', 'Link schedule berhasil disimpan')
                }, 500)
                
                const settings = new main ().SETTINGS
                settings.url.schedule = urlDT.schedule
                schSetClose.click()
                localStorage.setItem('SETTINGS', JSON.stringify(settings))  // Tab to edit
            })
        }
        
        if (this.urlData.schedule.url) {
            document.querySelector('#schedule-spreadsheet').value = this.urlData.schedule.url
            document.querySelector('#schedule-sheet').value = this.urlData.schedule.sheet
            document.querySelector('#schedule-header').value = this.urlData.schedule.header
            document.querySelector('#schedule-range').value = this.urlData.schedule.range
            document.querySelector('#schedule-value').value = this.urlData.schedule.value
        }
        if (!read || read.length == 0) {
            cogBtn.click()
            new main().alertHandle('info', 'Hay! Bend <br> Silahkan masukan data absensi kamu sepanjang bulan ini. Pastikan terisi dengan benar yah.')
            return undefined
        }

        await this.now()
        return true
        //await loader.classList.add('dis-none')
    }
}

class department {
    allData = JSON.parse(localStorage.getItem('DEPT'))
     
    generateInput   = function () {
        let html = ``,
            x    = new salesCard().getData(),
            data = (!x) ? undefined : x.target.dept
        this.allData.forEach(dept => {
            const target = (!data || data.length == 0) ? 5000000 : data.find(i => i.code.toUpperCase() == dept.code.toUpperCase()).target
            html += `
                <div class="add-group mb-1">
                    <label>${dept.name}</label>
                    <input type="number" data-code="${dept.code}" class="dept-input" value="${(!target || target < 0) ? 5000000 : target}">
                    <i class="default br-white clr-white">${dept.code}</i>
                </div>
            `
        })     
        document.querySelector('.dept-target').innerHTML = html
    }
    deptType        = function (code) {
        return this.allData.find(dept => dept.code == code).type
    }
    generateTarget  = function (datax) {
        let html = '',
            data = datax
        this.allData.forEach(dept => {
            let dtx     = data.find(x => x.code.toUpperCase() == dept.code.toUpperCase()).data,
                json    = JSON.stringify(dtx)
            html += `<span data-code="${dept.code.toUpperCase()}" data-name="${dept.name.toUpperCase()}" class="dept-group ${dtx.bgx}" data-json='${json}' data-text="${dept.code.toUpperCase()}"></span>`
        })
        document.querySelector('.sc-dept-list').innerHTML = html
    }
    play            = function () {
        //this.generateInput()
    }
 }
 
class afterSales {
    allData = JSON.parse(localStorage.getItem('AFTERSALES'))
    urlData = JSON.parse(localStorage.getItem('SETTINGS')).url
    
    rcpType         = document.querySelector('#reciept-type')
    rcpCashier      = document.querySelector('#reciept-cashier')
    rcpDate         = document.querySelector('#reciept-date')
    rcpOrder        = document.querySelector('#reciept-order')
    rcpDateControl  = document.querySelector('#reciept-date-control')
    
    rcpClose        = document.querySelector('#as-add-reciept-close')
    
    
    fetchRcp   = async function (value = '') {
        const respon = await new main().fetchData({
                    url         : this.urlData.main,
                    spredsheet  : this.urlData.afterSales.url,
                    sheet       : this.urlData.afterSales.sheet,
                    header      : this.urlData.afterSales.header,
                    range       : this.urlData.afterSales.range,
                    value       : value
                })
        //return console.log(respon)
        let Data = [], html = ''
        respon.forEach(dt => (dt.reciept == '' || dt.progress == 'done') ? '' : Data.push(dt))
        if (Data.length == 0) return undefined
        Data.forEach((rcp,i) => {
            html += `
                <tr data-index="${i}">
                    <td>${i + 1}</td>
                    <td>${rcp.PROGRESS}</td>
                    <td>${rcp.container}</td>
                    <td>${rcp.reciept}</td>
                    <td>${rcp.site}</td>
                    <td>${rcp.DO}</td>
                    <td>${rcp.cust}</td>
                    <td>${rcp.position}</td>
                    <td>${rcp.ETS}</td>
                    <td>${rcp.request}</td>
                    <td>${rcp.instal}</td>
                    <td>${rcp.address}</td>
                    <td>${rcp.phone}</td>
                    <td>${rcp.cont_date}</td>
                    <td>${rcp.ETD}</td>
                    <td>${rcp.ATD}</td>
                    <td>${rcp.ETA}</td>
                    <td>${rcp.ATA}</td>
                    <td>${rcp.unloading}</td>
                    <td>${rcp.note}</td>
                </tr>
            `
        })
        document.querySelector('#as-add-reciept-table tbody').innerHTML = html
        document.querySelectorAll('#as-add-reciept-table tbody tr').forEach(tr => {
            tr.onclick = () => {
                this.setReciept(Data[parseInt(tr.dataset.index)].reciept)
            }
        })
    }
    setItems    = function (items) {
        
    }
    setReciept  = function (rcp) {
        const type  = rcp.split('.')[0],
            cashier = rcp.split('.')[1],
            date    = rcp.split('.')[2],
            order   = rcp.split('.')[3]
        
        this.rcpType.value      = parseInt(type)
        this.rcpCashier.value   = parseInt(cashier)
        this.rcpDate.value      = parseInt(date)
        this.rcpOrder.value     = parseInt(order)
        this.rcpDateControl.valueAsDate = new Date(date.substring(0,4), parseInt(date.substring(4,6)) - 1, date.substring(6,8))
    }
    rcpControl  = function () {
        let param = true,
            hide  = document.querySelector('.as-form-hidder')
        
        document.querySelectorAll('#reciept-type, #reciept-cashier, #reciept-date, #reciept-order').forEach(input => {
            if (input.value != '') return input.style.borderColor = 'white'
            input.style.borderColor = 'red'
            param = 0
        })
        if (!param) return hide.classList.remove('dis-none')
        hide.classList.add('dis-none')
    }
    addItems    = function (elm, data = undefined) {
        //console.log(elm.dataset.target)
        const item  = document.createElement('div'),
            target  = document.querySelector(elm.dataset.target)
        
        item.classList.add('items-group')
        item.innerHTML = `
            <input type="text" class="article" maxlength="8" placeholder="article" value="${(!data) ? '' : data.sku}">
            <input type="text" class="product" placeholder="product name" value="${(!data) ? '' : data.item}">
            <input type="number" class="qty" placeholder="qty" value="${(!data) ? '' : data.qty}">
            <select class="site">
                <option value="${(!data) ? 'selected' : ''}">--choose site--</option>
                <option value="23" ${(!data) ? '' : (data.site == '23') ? 'selected' : ''} >23 - Cikupa</option>
                <option value="72"${(!data) ? '' : (data.site == '72') ? 'selected' : ''}>72 - Jababeka</option>
                <option value="DN"${(!data) ? '' : (data.site == 'DN') ? 'selected' : ''}>DN - WH Maluku</option>
                <option value="G8"${(!data) ? '' : (data.site == 'G8') ? 'selected' : ''}>G8 - Informa Maluku City</option>
                <option value="H6"${(!data) ? '' : (data.site == 'H6') ? 'selected' : ''}>H6 - Sidoarjo</option>
            </select>
            <i class="fas fa-trash red as-remove"></i>
        `
        target.appendChild(item)
    }
    calculate   = function () {
        
    }
    play        = function () {
        const asAdd     = document.querySelector('#as-add-item'),
            rcpSearch   = document.querySelector('#as-add-reciept-search'),
            asFetchRcp  = document.querySelector('#as-fetch-reciept')
            //asFetchRcp  = document.querySelector('.as-fetch-reciept')
        
        this.rcpDateControl.value = ''
        document.querySelectorAll('#reciept-type, #reciept-cashier, #reciept-date, #reciept-order').forEach(rcp => {
            rcp.onkeyup = () => this.rcpControl()
        })
        this.rcpDateControl.onchange = () => {
            this.rcpDate.value = new main().dateCode(new Date(this.rcpDateControl.value)).rcpDate
            this.rcpControl()
        }
        this.rcpDate.onclick = () => this.rcpDateControl.click()
        window.addEventListener('click', (e) => {
            const target = e.target
        })
        asAdd.onclick = () => {
            let param = true
            document.querySelectorAll('#as-items input, #as-items select').forEach(input => {
                if (input.value != '') return input.style.borderColor = '#00BCBC'
                input.style.borderColor = 'red'
                param = false 
            })
            if (!param) return alert('fill all input')
            this.addItems(asAdd)
        }
        rcpSearch.onclick = () => {
            //console.log('search')
            if (!confirm('Search ?')) return
            if (! this.fetchRcp()) return alert('Empty')
            document.querySelector('.as-fetch-reciept').classList.remove('dis-none')
        }
        this.rcpClose.onclick = () => asFetchRcp.classList.add('dis-none')
    }
}

class setting {
    allData = JSON.parse (localStorage.getItem('SETTINGS'))
    
    scheduleLink = function () {
        document.querySelector('#schedule-spreadsheet').value = this.allData.url.schedule.url
        document.querySelector('#schedule-sheet').value = this.allData.url.schedule.sheet
        document.querySelector('#schedule-header').value = this.allData.url.schedule.header
        document.querySelector('#schedule-range').value = this.allData.url.schedule.range
        document.querySelector('#schedule-value').value = this.allData.url.schedule.value
    }
    
    play    = function () {
        this.scheduleLink()
    }
}