                                                                                                                                                                                                                                                            

const bookingCode    = document.querySelector("#store-code"),
   cashier           = document.querySelector("#cashier-num"),
   recieptDate       = document.querySelector("#reciept-date"),
   rcpDateControl    = document.querySelector("#reciept-date-control"),
   recieptOrder      = document.querySelector("#reciept-order"),
   asName            = document.querySelector("#as-cust-name"),
   asPhone           = document.querySelector("#as-phone"),
   asMember          = document.querySelector("#as-member"),
   asNote            = document.querySelector("#as-note"),
   asAddress         = document.querySelector("#as-address"),
   requestDate       = document.querySelector("#request-date"),
   pickUp            = document.querySelector("#pick-up"),
   instalCheck       = document.querySelector("#instal-check"),
   instalDate        = document.querySelector("#instal-date"),
   containerDate     = document.querySelector("#container-date"),
   readyDate         = document.querySelector("#ready-date"),
   containerNum      = document.querySelector("#container-num"),
   // range             = document.querySelector("#range"),
   asStatus          = document.querySelector("#as-status"),
   asGrup            = document.querySelector('.as-items-grup'),
   asTotal           = document.querySelector('#as-count-price'),
   asItemList        = document.querySelector('#as-items-list'),
   asSubmit          = document.querySelector('#as-submit'),
   asReset           = document.querySelector('#as-reset'),
   asRemove          = document.querySelector('#as-remove'),
   asTask            = document.querySelector("#as-task"),
   unInstalCheck     = document.querySelector('#UnInstal'),
   furniProCheck     = document.querySelector('#FurniPro')

window.addEventListener('DOMContentLoaded', function () {
   inputKeyUpAs()
   document.querySelector("i#as-add-item").onclick = function (e) {addGoodGrupAs()}
   rcpDateControl.min   = new Date(new Date().getFullYear() - 1, new Date().getMonth(), new Date().getDate() + 1).toISOString().split("T")[0]
   rcpDateControl.max   = new Date().toISOString().split("T")[0]
   recieptDate.onclick  = function () {
      rcpDateControl.classList.add('active')
      rcpDateControl.click()
   }
   recieptDate.onblur   = function () {
      rcpDateControl.classList.remove('active')
   }
   rcpDateControl.onchange = function () {
      
      if(this.value == '') return recieptDate.value = ''
      
      let date    = new Date(this.value).getDate()
      let month   = new Date(this.value).getMonth() + 1
      let year    = new Date(this.value).getFullYear()
      if (date < 10)    date  = '0' + date
      if (month < 10)   month = '0' + month
      if (year < 10)    year  = '0' + year
      
      requestDate.min   = new Date(this.value).toISOString().split("T")[0]
      instalDate.min    = new Date(this.value).toISOString().split("T")[0]
      readyDate.min     = new Date(this.value).toISOString().split("T")[0]
      containerDate.min = new Date(this.value).toISOString().split("T")[0]
      
      return recieptDate.value = year + '' + month + '' + date
   }
   asSubmit.onclick = async function () {
      if (!checkAs()) return alert('Fill all necessary input column')
      const RcpNum   = await getRecieptNumber(),
         Datax       = await asCollect(),
         Taskx       = await taskCollect(asTask),
         asProgress  = JSON.parse(localStorage.getItem('asProgress'))
         ID          = asProgress.ID
      if (!Datax) return alert("Couldn't collect data")
      
      if (asProgress.status == 'add' && confirm('Add new ?') == true) {
         
         const IDX      = new Date().getTime()
         Datax.ID       = IDX
         const asSave   = await AS.save(Datax, RcpNum)
         const taskSave = await TASK.create(Taskx, IDX, RcpNum + ' - ' + Datax.name, 'AS')
         
         if (!asSave || !taskSave) return alert('Saved fail !')
         
         localStorage.setItem('AS', JSON.stringify(AS.allData))
         localStorage.setItem('TASK', JSON.stringify(TASK.allData))
         
      } else if (asProgress.status == 'edit' && confirm('Update ?')) {
         Datax.ID       = ID
         const asEdit   = await AS.edit(Datax, RcpNum, ID)
         const taskSave = await TASK.create(Taskx, ID, RcpNum + ' - ' + Datax.name, 'AS')
         
         if (!asEdit || !taskSave) return alert('Update fail !')
         
         localStorage.setItem('AS', JSON.stringify(AS.allData))
         localStorage.setItem('TASK', JSON.stringify(TASK.allData))
      } else Error('undefined status of AS Submit')
      window.location.reload()
   }
   requestDate.onchange = function () {
      const getDate           = new Date(this.value).getDate()
      instalDate.min          = new Date(new Date().setDate(new Date(this.value).getDate() - 2)).toISOString().split("T")[0]
   }
   instalCheck.onchange = function () {
      if (!this.checked) {
         instalDate.value     = ''
         return instalDate.disabled  = true
      }
      const dateValue         = requestDate.value
      if (dateValue == '') return
      
      instalDate.disabled     = false
      const dates             = new Date(new Date(dateValue).getFullYear(), new Date(dateValue).getMonth(), new Date(dateValue).getDate() + 2)
      instalDate.valueAsDate  = new Date(dates)
   }
   asReset.onclick = () => {
      if (confirm('Reset ?')) return resetAs()
   }
   asRemove.onclick = function () {
      if (!confirm('Remove ?')) return
      const asProgress  = JSON.parse(localStorage.getItem('asProgress'))
      const IDX         = asProgress.ID
      console.log(asProgress, 'asx')
      let asDelete      = AS.remove(IDX),
         taskDelete     = TASK.remove(IDX)
      if (!asDelete) return alert('Error')
      
      localStorage.setItem('AS', JSON.stringify(AS.allData))
      localStorage.setItem('TASK', JSON.stringify(TASK.allData))
      window.location.reload()
   }
   asPhone.onkeyUp = function () {
      let param   = cekAwalanNomorHP(this.value)
      if (!param && this.value.length >= 8 && this.value.length <= 13) {
         return this.style.borderColor = 'red'
      }
      this.style.borderColor
   }
})
function getRecieptNumber () {
   let param = true
   document.querySelectorAll('.reciept-num input').forEach(input => {
      if(input.value != '') return input.style.borderColor = 'Darkcyan'
      param = false 
      input.style.borderColor = 'Red'
   })
   let rcpNum  = bookingCode.value + '.' + cashier.value + '.' + recieptDate.value + '.' + recieptOrder.value
   if (param) return rcpNum
   alert('Fill all Reciept Number input column !')
   return param
}
function addGoodGrupAs () {
   const boolean = checkGoodsAs()
   if (!boolean) return
   toClone = asGrup.cloneNode(true)
   toClone.querySelectorAll("input").forEach(input => {
      input.value = ""
   })
   document.querySelector("#as-items-list").appendChild(toClone)
   removeGrupAs()
   totalPriceAs()
   inputKeyUpAs()
}
function totalPriceAs () {
   const qtys      = document.getElementsByName("as-qty"),
         prices    = document.getElementsByName("as-price"),
         totals    = document.getElementsByName("as-totals")
   
   countAll = 0
   totals.forEach((total, i) => {
      value = parseInt(qtys[i].value) * parseInt(prices[i].value)
      if (value > 1) {
         totals[i].value = "Rp. " + value.toLocaleString()
         total.dataset.total = value
         countAll += value
      } else {
         totals[i].value = 0
         total.dataset.total = 0
         countAll += 0
      }
   })
   document.querySelector("p#as-count-price").innerHTML = "Rp. " + countAll.toLocaleString()
}
function checkGoodsAs() {
   let boolean = true
   document.querySelectorAll(".as-items-grup input").forEach(input => {
      input.style.borderColor = "darkcyan"
      if (input.classList.contains("dis-none")) return
      if (input.value == "") {
         input.style.borderColor = "red"
         return boolean = false
      }
   })
   return boolean;
}
function inputKeyUpAs () {
   document.querySelectorAll(".as-items-grup input.price, .as-items-grup input.qty").forEach(ip => {
      ip.addEventListener("keyup", function (e) {
         totalPriceAs()
      })
   })
}
function removeGrupAs () {
   document.querySelectorAll(".as-items-grup i.fa-trash").forEach((del, i) => {
      del.addEventListener("click", function (e) {
         const grup = document.querySelectorAll(".as-items-grup")
         if (grup.length <= 1) return 
         if(!confirm("Hapus ?")) return
         grup[i].remove()
         totalPriceAs()
         inputKeyUpAs()
         removeGrupAs()
      })
   })
}
function bookedItemsAs () {
   const articles = document.getElementsByName("as-article"),
      products    = document.getElementsByName("as-product"),
      qtys        = document.getElementsByName("as-qty"),
      prices      = document.getElementsByName("as-price"),
      totals      = document.getElementsByName("as-totals"),
      sites       = document.getElementsByName("as-sitex")
   //console.log(sites.value)
   let goods = []
   articles.forEach((x, i) => {
      const good = {
         article  : articles[i].value,
         product  : products[i].value,
         qty      : parseFloat(qtys[i].value),
         price    : parseFloat(prices[i].value),
         total    : parseFloat(qtys[i].value) * parseFloat(prices[i].value),
         site     : sites[i].value
      }
      goods.push(good)
   })
   return goods
}
function checkAs () {
   let status  = true
   document.querySelectorAll('#add-as input, #add-as textarea, #add-as select').forEach(inp => {
      inp.style.borderColor = 'rgba(0,0,0,.3)'
      if (inp.classList.contains('optional') || inp.classList.contains('check-form') || inp.value != '') return 
      status = false
      inp.style.borderColor = 'red'
      console.log(inp)
   })
   if (asPhone.value.length < 10 || asPhone.value.length > 13 || !asPhone.value.startsWith('08')) status = false
   return status
}
function asCollect () {
   let items   = bookedItemsAs(),
      rcpNum   = getRecieptNumber()
      
   return {
      ID             : 0,
      next           : true,
      rcpNum         : rcpNum,
      recieptData    : {
         rcpNum         : rcpNum,
         bookingCode    : bookingCode.value,
         cashier        : cashier.value,
         recieptDate    : recieptDate.value,
         recieptOrder   : recieptOrder.value,
         recieptTime    : new Date(rcpDateControl.value).getTime()
      },
      name           : asName.value,
      phone          : asPhone.value,
      note           : asNote.value,
      member         : asMember.checked,
      address        : asAddress.value,
      status         : asStatus.value,
      items          : items,
      status         : asStatus.value,
      pickUp         : pickUp.checked,
      instalCheck    : instalCheck.checked,
      requestTime    : (requestDate.value == '')   ? 0 : new Date(requestDate.value).getTime(),
      instalTime     : (instalDate.value == '')    ? 0 : new Date(instalDate.value).getTime(),
      containerTime  : (containerDate.value == '') ? 0 : new Date(containerDate.value).getTime(),
      readyTime      : (readyDate.value == '')     ? 0 : new Date(readyDate.value).getTime(),
      // range          : (range.value == '')         ? 0 : range.value,
      containerNum   : (containerNum.value == '')  ? 0 : containerNum.value
   }
}
function resetAs () {
   // if (!confirm('Reset form ?')) return
   document.querySelectorAll('#add-as input, #add-as textarea, #add-as select').forEach(inp => {
      if(inp.type == 'checklist') inp.checked = false
      inp.style.borderColor = 'rgba(0,0,0,.3)'
      inp.value = ''
   })
   asTask.innerHTML = ''
   asRemove.classList.add('dis-none')
   localStorage.setItem('asProgress', JSON.stringify({
      status   : 'add'
   }))
   
}
async function asSeeDetail (IDX, status = true) {
   let data = '', task = ''
   // console.log(status, 'Status')
   resetAs()
   if (status == true) {
      data  = AS.findById(IDX)
      task  = TASK.findById(IDX)
      await localStorage.setItem('asProgress', JSON.stringify({
         status   : 'edit',
         ID       : IDX,
         data     : data, 
         rcpNum   : data.rcpNum
      }))
      if (!data) return alert('Undefined!')
   } else {
      data = IDX
   }
   // console.log(data)
   asRemove.classList.remove('dis-none')
   
   rcp                        = data.recieptData
   bookingCode.value          = rcp.bookingCode
   cashier.value              = rcp.cashier
   recieptDate.value          = rcp.recieptDate
   recieptOrder.value         = rcp.recieptOrder
   rcpDateControl.value       = toLocaleDateString(rcp.recieptTime)
   asName.value               = data.name
   asPhone.value              = data.phone
   asMember.checked           = data.member
   asNote.value               = data.note
   asAddress.value            = data.address
   asStatus.value             = data.status
   instalCheck.checked        = data.instalCheck
   pickUp.checked             = data.pickUp
   if (data.instalCheck) instalDate.disabled = false
   console.log(data.instalCheck)
   if (parseInt(data.requestTime)   > 0) requestDate.valueAsDate    = new Date(data.requestTime)
   if (parseInt(data.instalTime)    > 0) instalDate.valueAsDate     = new Date(data.instalTime)
   if (parseInt(data.containerTime) > 0) containerDate.valueAsDate  = new Date(data.containerTime)
   if (parseInt(data.readyTime)     > 0) readyDate.valueAsDate      = new Date(data.readyTime)
   
   
   let total = '', html =''
   data.items.forEach(item => {
      // console.log(data.items)
      total += parseFloat(item.total)
      html += `
         <div class="items-grup as-items-grup">
            <input type="text"   name="as-article" data-lab="article"      class="article"   value="${item.article}" style="width: 80px;" placeholder="Article">
            <input type="text"   name="as-product" data-lab="product name" class="item"      value="${item.product}" style="width: calc(100% - 85px);" placeholder="Product Name">
            <input type="number" name="as-qty"     data-lab="quantity"     class="qty"       value="${item.qty}"     style="width: 80px;" placeholder="Quantity">
            <input type="number" name="as-price"   data-lab="price"        class="price"     value="${item.price}"   style="width: calc((100% - 93px) * 0.45);" placeholder="Price">
            <input type="text"   name="as-totals"  data-lab="total"        class="total"     value="${item.total}"   style="width: calc((100% - 93px) * 0.45);" readonly placeholder="Totals">
            <i class="fas fa-trash" style="width: calc((100% - 83px) * 0.1);"></i>
            <input value="${item.site}" type="text" name="as-sitex" class="price" list="sites" style="width: 100%;" placeholder="Site">
         </div>
      `
   })
   let taskHTML
   if (task){
      task.data.forEach(datax => {
         createTask(asTask, datax.note, datax.progress) 
      })
   }
   
   asTotal.innerHTML = "Rp. " + total.toLocaleString()
   asItemList.innerHTML = html
   nav.forEach(nav => {nav.classList.remove("active")})
   checkGoodsAs()
   inputKeyUpAs()
   removeGrupAs()
   totalPriceAs()
   document.querySelectorAll('.date-data-list').forEach(list => list.classList.add('dis-none'))
   nav.forEach(nv => nv.classList.remove('active'))
   pages.forEach(pg => pg.classList.add('dis-none'))
   document.querySelector('#add-as').classList.remove('dis-none')
   // console.log(JSON.parse(localStorage.getItem('asProgress')))
}
function toLocaleDateString (timestamp) {
    const date = new Date((timestamp + _getTimeZoneOffsetInMs()));
    // slice(0, 19) includes seconds
    return date.toISOString().slice(0, 19);
  }
function _getTimeZoneOffsetInMs () {
   return new Date().getTimezoneOffset() * -60 * 1000;
}
