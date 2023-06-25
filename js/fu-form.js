                                                                                                                                                                                                                                                                                                               

// FU Variable
const fuName   = document.querySelector("#fu-cust-name"),
   fuMember    = document.querySelector("#fu-member"),
   fuPhone     = document.querySelector("#fu-phone"),
   fuAddress   = document.querySelector("#fu-address"),
   fuStatus    = document.querySelector("select#fu-status"), 
   fuNote      = document.querySelector("#fu-note"),
   fuSubmit    = document.querySelector("#fu-submit"),
   fuReset     = document.querySelector("#fu-reset"),
   fuRemove    = document.querySelector("#fu-remove"),
   fuAddItem   = document.querySelector("#fu-add-item"),
   fuAddTask   = document.querySelector("#fu-add-task"),
   fuEstimate  = document.querySelector("#fu-estimate"),
   fuItemList  = document.querySelector("#fu-items-list"),
   fuGrup      = document.querySelector(".fu-items-grup"),
   fuTotal     = document.querySelector('#fu-count-price'),
   fuTask      = document.querySelector('#fu-task')
   
window.addEventListener('DOMContentLoaded', function (e) {
   resetFu()
   inputKeyUpFu()
   fuEstimate.min             = new Date().toISOString().split("T")[0]
   document.querySelector("i#fu-add-item").onclick = function (e) {
      addGoodGrupFu()
   }
   
   fuSubmit.onclick = async function () {
      if (!checkFU()) return alert('Fill all necessary input column')
      const IDX      = new Date().getTime(),
         Datax       = fuCollect(),
         Taskx       = fuTaskCollect(),
         fuProgress  = JSON.parse(localStorage.getItem('fuProgress')),
         ID          = fuProgress.ID
      // return console.log(control)
      if (fuProgress.status == 'add' && confirm('Add new ?')) {
         const saveFU   = await FU.create(Datax, IDX)
         const saveTask = TASK.create(Taskx, IDX, IDX + ' - ' + Datax.name, 'fu')
         if (!saveTask || !saveFU) return alert('Failed to save')
         localStorage.setItem('FU', JSON.stringify(FU.allData))
         localStorage.setItem('TASK', JSON.stringify(TASK.allData))
      } else if (fuProgress.status == 'edit' && confirm('Update ?')) {
         const fuEdit   = await FU.create(Datax, ID)
         const saveTask = await TASK.create(Taskx,ID, ID + ' - ' + Datax.name + 'fu')
         if (!fuEdit || !saveTask) return alert('Failed to save')
         localStorage.setItem('FU', JSON.stringify(FU.allData))
         localStorage.setItem('TASK', JSON.stringify(TASK.allData))
      } else Error('undefined status of FU Submit')
      window.location.reload()
   }
   fuReset.onclick = () => {
      if (!confirm('Reset ?')) return
      return resetFu()
   }
   fuRemove.onclick = function () {
      if (!confirm('Remove ?')) return
      const fuProgress  = JSON.parse(localStorage.getItem('fuProgress'))
      const IDX         = fuProgress.ID
      let fuDelete      = FU.remove(ID),
         taskDelete     = TASK.remove(ID)
      if (!fuDelete) return alert('Error')
      localStorage.setItem('FU', JSON.stringify(FU.allData))
      localStorage.setItem('TASK', JSON.stringify(TASK.allData))
      window.location.reload()
   }
})

function addGoodGrupFu() {
   const boolean = checkGoodsFu()
   if (boolean == 1) return
   toClone = fuGrup.cloneNode(true)
   toClone.querySelectorAll("input").forEach(input => {
      input.value = ""
   })
   document.querySelector("#fu-items-list").appendChild(toClone)
   removeGrupFu()
   totalPriceFu()
   inputKeyUpFu()
}

function totalPriceFu () {
   const qtys      = document.getElementsByName("fu-qty"),
         prices    = document.getElementsByName("fu-price"),
         totals    = document.getElementsByName("fu-totals")
   
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
   document.querySelector("p#fu-count-price").innerHTML = "Rp. " + countAll.toLocaleString()
}

function checkGoodsFu() {
   let boolean = 2
   document.querySelectorAll(".fu-items-grup input").forEach(input => {
      input.style.borderColor = "darkcyan"
      if (input.classList.contains("dis-none")) return
      if (input.value == "") {
         input.style.borderColor = "red"
         return boolean = 1
      }
   })
   return boolean;
}

function inputKeyUpFu () {
   document.querySelectorAll(".fu-items-grup input.price, .fu-items-grup input.qty").forEach(ip => {
      ip.addEventListener("keyup", function (e) {
         totalPriceFu()
      })
   })
}

function removeGrupFu () {
   document.querySelectorAll(".fu-items-grup i.fa-trash").forEach((del, i) => {
      del.addEventListener("click", function (e) {
         const grup = document.querySelectorAll(".fu-items-grup")
         if (grup.length <= 1) return 
         if(!confirm("Hapus ?")) return
         grup[i].remove()
         totalPriceFu()
         inputKeyUpFu()
         removeGrupFu()
      })
   })
}

function bookedItemsFu() {
   const articles = document.getElementsByName("fu-article"),
      products    = document.getElementsByName("fu-product"),
      qtys        = document.getElementsByName("fu-qty"),
      prices      = document.getElementsByName("fu-price"),
      totals      = document.getElementsByName("fu-totals")

   let goods = []
   articles.forEach((x, i) => {
      const good = {
         article  : articles[i].value,
         product  : products[i].value,
         qty      : parseFloat(qtys[i].value),
         price    : parseFloat(prices[i].value),
         total    : parseFloat(qtys[i].value) * parseFloat(prices[i].value),
      }
      goods.push(good)
   })
   return goods
}

function checkFU () {
   let status  = true
   document.querySelectorAll('#add-fu input, #add-fu textarea, #add-fu select').forEach(inp => {
      inp.style.borderColor = 'rgba(0,0,0,.3)'
      if (inp.classList.contains('optional') || inp.value != '') return
      // if (inp.id == 'fu-member') return
      status = false
      inp.style.borderColor = 'red'
      // console.log(inp)
   })
   return status
}

function fuCollect () {
   let items   = bookedItemsFu()
   return {
      ID       : 0,
      name     : fuName.value,
      phone    : fuPhone.value,
      note     : fuNote.value,
      member   : fuMember.checked,
      address  : fuAddress.value,
      estimate : fuEstimate.value,
      status   : fuStatus.value,
      items    : items
   }
}

function fuTaskCollect () {
   let task    = []
   document.querySelectorAll('#fu-task .fu-task-grup').forEach(grup => {
      task.push({
         note     : grup.querySelector('.task-note').value,
         status   : grup.querySelector('.task-check').checked
      })
   })
   return task
}

function resetFu() {
   // if (!confirm('Reset form ?')) return
   fuName.value      = ''
   fuMember.checked  = false
   fuPhone.value     = ''
   fuAddress.value   = ''
   fuNote.value      = ''
   fuEstimate.value  = ''
   fuTask.innerHTML  = ''
   fuTotal.innerHTML = 'Total'
   fuTask.innerHTML  = ''
   document.querySelectorAll('.fu-item-grup input').forEach(input => {
      return input.value = ''
   })
   localStorage.setItem('fuProgress', JSON.stringify({
      status: 'add'
   }))
}

function fuSeeDetail (IDX) {
   console.log(IDX)
   const data  = FU.findById(IDX),
         task  = TASK.findById(IDX)
   
   if (!data) return alert('Undefined!')
   // console.log(data)
   
   resetFu()
   
   localStorage.setItem('fuProgress', JSON.stringify({
      status   : 'edit',
      ID       : IDX
   }))

   fuRemove.classList.remove('dis-none')
   
   fuName.value            = data.name
   fuPhone.value           = data.phone
   fuMember.checked        = data.member
   fuNote.value            = data.note
   fuAddress.value         = data.address
   fuEstimate.valueAsDate  = new Date(data.estimate)
   fuStatus.value          = data.status
   
   let total = '', html =''
   data.items.forEach(item => {
      // console.log(data.items)
      total += parseFloat(item.total)
      html += `
         <div class="items-grup fu-items-grup">
            <input type="text"   name="fu-article" data-lab="article"      class="article"   value="${item.article}" style="width: 80px;" placeholder="Article">
            <input type="text"   name="fu-product" data-lab="product name" class="item"      value="${item.product}" style="width: calc(100% - 85px);" placeholder="Product Name">
            <input type="number" name="fu-qty"     data-lab="quantity"     class="qty"       value="${item.qty}"     style="width: 80px;" placeholder="Quantity">
            <input type="number" name="fu-price"   data-lab="price"        class="price"     value="${item.price}"   style="width: calc((100% - 93px) * 0.45);" placeholder="Price">
            <input type="text"   name="fu-totals"  data-lab="total"        class="total"     value="${item.total}"   style="width: calc((100% - 93px) * 0.45);" readonly placeholder="Totals">
            <i class="fas fa-trash" style="width: calc((100% - 83px) * 0.1);"></i>
         </div>
      `
   })
   let taskHTML
   if (task){
      task.data.forEach((tsk,i) => {
         taskSet()
         document.querySelectorAll('.fu-task-grup .task-note')[i].value = tsk.note
         document.querySelectorAll('.fu-task-grup .task-check')[i].checked = tsk.status
      })
   }
   
   fuTotal.innerHTML = "Rp. " + total.toLocaleString()
   fuItemList.innerHTML = html
   nav.forEach(nav => {nav.classList.remove("active")})
   checkGoodsFu()
   inputKeyUpFu()
   removeGrupFu()
   totalPriceFu()
   document.querySelectorAll('.date-data-list').forEach(list => list.classList.add('dis-none'))
   nav.forEach(nv => nv.classList.remove('active'))
   pages.forEach(pg => pg.classList.add('dis-none'))
   document.querySelector('#add-fu').classList.remove('dis-none')
}