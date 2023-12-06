                                                                                                                                                                                                                                                                              

localStorage.setItem('fuProgress', JSON.stringify({
   status   : 'add'
}))
localStorage.setItem('asProgress', JSON.stringify({
   status   : 'add'
}))
localStorage.setItem('taskProgress', JSON.stringify({
   status   : 'add'
}))
if(!localStorage.getItem("FU"))           localStorage.setItem("FU", JSON.stringify([]))
if(!localStorage.getItem("AS"))           localStorage.setItem("AS", JSON.stringify([]))
if(!localStorage.getItem("PROBLEM"))      localStorage.setItem("PROBLEM", JSON.stringify([]))
if(!localStorage.getItem("TODAY"))        localStorage.setItem("TODAY", JSON.stringify([]))
if(!localStorage.getItem("TASK"))         localStorage.setItem("TASK", JSON.stringify([]))
if(!localStorage.getItem("FETCH"))        localStorage.setItem("FETCH", JSON.stringify([]))
if(!localStorage.getItem("CONTACT"))      localStorage.setItem("CONTACT", JSON.stringify([
   {
      ID    : 223,
      name  : 'Customer Name',
      phone : ['08']
   }
]))
if(!localStorage.getItem("schedule"))     localStorage.setItem("schedule", JSON.stringify([]))
if(!localStorage.getItem("salesCard"))     localStorage.setItem("salesCard", JSON.stringify([]))
if(!localStorage.getItem("specialTask"))  localStorage.setItem("specialTask", JSON.stringify({
   furniPro : [],
   unInstal : [],
   instal   : []
}))

if (!localStorage.getItem("department"))  localStorage.setItem('department', JSON.stringify([
   {
      name : 'Living Upholstered',
      code : 'A',
      zone : 'Living',
      type : 'Furniture'
   },
   {
      name : 'Home Clasic',
      code : 'AB',
      zone : 'Living',
      type : 'Furniture'
   },
   {
      name: 'Living Non-Upholstered',
      code: 'AC',
      zone: 'Living',
      type: 'Furniture'
   },
   {
      name: 'Banquet',
      code: 'AD',
      zone: 'Commercial',
      type: 'Furniture'
   },
   {
      name: 'Offices Seating',
      code: 'AE',
      zone: 'Commercial',
      type: 'Furniture'
   },
   {
      name: 'Furniclean',
      code: 'AJ',
      zone: '',
      type: ''
   },
   {
      name: 'Textile Bedding',
      code: 'AK',
      zone: 'Sleeping',
      type: 'Accessories'
   },
   {
      name: 'Special Transaction',
      code: 'AL',
      zone: '',
      type: ''
   },
   {
      name: 'Home Organizer',
      code: 'AO',
      zone: 'Living',
      type: 'Accessories'
   },
   {
      name: 'Home Kitchen',
      code: 'AP',
      zone: 'Kitchen',
      type: 'Accessories'
   },
   {
      name: 'Office Metal',
      code: 'AR',
      zone: 'Commercial',
      type: 'Furniture'
   },
   {
      name: 'Fashion Bags',
      code: 'AS',
      zone: 'Living',
      type: 'Accessories'
   },
   {
      name: 'Bedroom',
      code: 'B',
      zone: 'Sleeping',
      type: 'Furniture'
   },
   {
      name: 'Dinning',
      code: 'C',
      zone: 'Dinning',
      type: 'Furniture'
   },
   {
      name: 'Kitchen & Washbasin',
      code: 'D',
      zone: 'Kitchen',
      type: 'Furniture'
   },
   {
      name: 'Office',
      code: 'E',
      zone: 'Commercial',
      type: 'Furniture'
   },
   {
      name: 'Kids & Baby',
      code: 'F',
      zone: 'Sleeping',
      type: 'Furniture'
   },
   {
      name: 'Commercial Chair Table',
      code: 'H',
      zone: 'Commercial',
      type: 'Furniture'
   },
   {
      name: 'Lighting',
      code: 'I',
      zone: 'Living',
      type: 'Accessories'
   },
   {
      name: 'Mattress',
      code: 'J',
      zone: 'Sleeping',
      type: 'Furniture'
   },
   {
      name: 'Kept Concept',
      code: 'K',
      zone: 'Living',
      type: 'Furniture'
   },
   {
      name: 'Beauty Commercial',
      code: 'L',
      zone: 'Living',
      type: 'Furniture'
   },
   {
      name: 'Home Textile',
      code: 'M',
      zone: 'Living',
      type: 'Accessories'
   },
   {
      name: 'Home Decore',
      code: 'N',
      zone: 'Living',
      type: 'Accessories'
   },
   {
      name: 'Home Kitchen',
      code: 'O',
      zone: 'Kitchen',
      type: 'Accessories'
   },
   {
      name: 'Id Counter',
      code: 'P',
      zone: 'Living',
      type: 'Furniture'
   },
   {
      name: 'Non Merchandise',
      code: 'X',
      zone: '',
      type: ''
   },
]))


const scheduleArray = [{
      code     : 'H44',
      color    : 'blue',
      time     : '10.00 - 20.00',
      use      : false,
      work     : true,
      origin   : true
   },
   {
      code     : 'M0029',
      color    : 'blue',
      time     : '08.00 - 18.00',
      use      : false,
      origin   : true,
      work     : true,
   },
   {
      code     : 'M0058',
      color    : 'blue',
      time     : '09.00 - 19.00',
      use      : false,
      origin   : true,
      work     : true,
   },
   {
      code     : 'A0003',
      color    : 'green',
      time     : '12.00 - 22.00',
      use      : false,
      origin   : true,
      work     : true,
   },
   {
      code     : 'OFF',
      color    : 'red',
      time     : '',
      use      : true,
      origin   : true, 
      work     : false,
   },
   {
      code     : 'AL',
      color    : 'black',
      time     : '',
      use      : true,
      origin   : true,
      work     : false,
   },
   {
      code     : 'H59',
      color    : 'blue',
      time     : '07.00 - 17.00',
      use      : true,
      origin   : true,
      work     : false,
   }
   
]
if(!localStorage.getItem("scheduleTime")) localStorage.setItem("scheduleTime", JSON.stringify(scheduleArray))
if(JSON.parse(localStorage.getItem("scheduleTime")) == []) localStorage.setItem("scheduleTime", JSON.stringify(scheduleArray))

localStorage.setItem("FUSTATUS", JSON.stringify(
   [
      {
         status   : 'progress',
         br       : 'deepskyblue',
         bg       : 'blue'
      },
      {
         status   : 'success',
         br       : 'limegreen',
         bg       : 'green'
      },
      {
         status   : 'pending',
         br       : 'gold',
         bg       : 'yellow'
      },
      {
         status   : 'fail',
         br       : 'red',
         bg       : 'red'
      }
   ]
   ))


const FP = [
   {
      ID          : "10175082",
      year        : 1,
      begin       : 300000,
      end         : 1000000,
      Member      : 89000,
      nonMember   : 119000
   },
   {
      ID          : "X148803",
      year        : 1,
      begin       : 1000000,
      end         : 9999999,
      Member      : 149000,
      nonMember   : 109000
   },
   {
      ID          : "X148804",
      year        : 1,
      begin       : 10000000,
      end         : 49999999,
      Member      : 159000,
      nonMember   : 179000
   },
   {
      ID          : "10113112",
      year        : 1,
      begin       : 50000000,
      end         : 99999999,
      Member      : 269000,
      nonMember   : 299000
   },
   {
      ID          : "10113113",
      year        : 1,
      begin       : 100000000,
      end         : 150000000,
      Member      : 369000,
      nonMember   : 399000
   },
   {
      ID          : "10311650",
      year        : 2,
      begin       : 1000001,
      end         : 10000000,
      Member      : 159000,
      nonMember   : 199000
   },
   {
      ID          : "10311651",
      year        : 2,
      begin       : 10000001,
      end         : 50000000,
      Member      : 199000,
      nonMember   : 249000
   },
   {
      ID          : "10113114",
      year        : 2,
      begin       : 50000001,
      end         : 100000000,
      Member      : 359000,
      nonMember   : 399000
   },
   {
      ID          : "10113115",
      year        : 2,
      begin       : 100000001,
      end         : 150000000,
      Member      : 499000,
      nonMember   : 459000
   }]
   
localStorage.setItem("FP", JSON.stringify(FP))

const DC = [
   {
      id       : 1,
      type     : "dc",
      site     : "DC Cikupa",
      range    : 45,
      day      : 0,
      toCont   : 2,
      cpu      : 999,
      code     : "23",
      RT       : true
   },
   {
      id       : 2,
      type     : "dc",
      site     : "DC Jababeka",
      range    : 45,
      day      : 0,
      toCont   : 2,
      cpu      : 999,
      code     : "72",
      RT       : true
   },
   {
      id       : 3,
      type     : "dc",
      site     : "DC Sidoarjo",
      range    : 21,
      day      : 3,
      toCont   : 2,
      cpu      : 999,
      code     : "H6",
      RT       : true
   },
   {
      id       : 4,
      type     : "dc",
      site     : "DC WH Maluku",
      range    : 2,
      day      : 999,
      toCont   : 999,
      cpu      : 2,
      code     : "DN",
      RT       : false
   },
   {
      id       : 5,
      type     : "store",
      site     : "Store (Orpack)",
      range    : 2,
      day      : 999,
      toCont   : 999,
      cpu      : 0,
      code     : "G8",
      RT       : true
   },
   {
      id       : 6,
      type     : "store",
      site     : "Store (Display)",
      range    : 2,
      day      : 999,
      toCont   : 999,
      cpu      : 0,
      code     : "G8",
      RT       : true
   }
]

localStorage.setItem("DC", JSON.stringify(DC))

STATUS = [
   {
      status : "Prepared"
   },
   {
      status : "Shipped"
   },
   {
      status : "Arrived"
   },
   {
      status : "Delivery"
   },
   {
      status : "Installation"
   },
   {
      status : "Done"
   },
   {
      status : "Problem"
   }
]

localStorage.setItem("STATUS", JSON.stringify(STATUS))

