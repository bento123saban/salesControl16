                                                                                                                                                                                                                                                                              

localStorage.setItem('fuProgress', JSON.stringify({
   status   : 'add'
}))
localStorage.setItem('asProgress', JSON.stringify({
   status   : 'add'
}))
if(!localStorage.getItem("FU"))           localStorage.setItem("FU", JSON.stringify([]))
if(!localStorage.getItem("AS"))           localStorage.setItem("AS", JSON.stringify([]))
if(!localStorage.getItem("PROBLEM"))      localStorage.setItem("PROBLEM", JSON.stringify([]))
if(!localStorage.getItem("TODAY"))        localStorage.setItem("TODAY", JSON.stringify([]))
if(!localStorage.getItem("TASK"))         localStorage.setItem("TASK", JSON.stringify([]))
if(!localStorage.getItem("schedule"))     localStorage.setItem("schedule", JSON.stringify([]))
if(!localStorage.getItem("specialTask"))  localStorage.setItem("specialTask", JSON.stringify({
   furniPro : [],
   unInstal : [],
   instal   : []
}))
if (!localStorage.getItem("depertment"))  localStorage.setItem('depertment', JSON.stringify([
   {
      name        : 'Living Upholstered',
      code        : 'A',
      zone        : 'Living',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : "Ashley",
      code        : 'AB',
      zone        : 'Living',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Living Non-Upholstered',
      code        : 'AC',
      zone        : 'Living',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
         {
            name  : undefined,
            code  : undefined
                  }
               ]
   },
   {
      name        : 'Banquet',
      code        : 'AD',
      zone        : 'Commercial',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
         {
            name  : undefined,
            code  : undefined
         }
      ]
   },
   {
      name        : 'Office Seating',
      code        : 'AE',
      zone        : 'Commercial',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name: undefined,
               code: undefined
               }
         ]
   },
   {
      name        : 'Office Metal',
      code        : 'AR',
      zone        : 'Commercial',
      type        : 'Service',
      square      : undefined,
      commodity   : [
            {
               name: undefined,
               code: undefined
            }
         ]
   },
   {
      name        : 'Bedroom',
      code        : 'B',
      zone        : 'Sleeping',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Dining',
      code        : 'C',
      zone        : 'Dining',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name: undefined,
               code: undefined
            }
         ]
   },
   {
      name        : 'Kitchen',
      code        : 'D',
      zone        : 'Dining',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Office',
      code        : 'E',
      zone        : 'Commercial',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Junior Series',
      code        : 'F',
      zone        : 'Sleeping',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'CTC',
      code        : 'H',  
      zone        : 'Commercial',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Lighting',
      code        : 'I',
      zone        : 'Accessories',
      type        : 'Accessories',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Mattress',
      code        : 'J',
      zone        : 'Sleeping',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : 'Storage',
      code        : 'K',
      zone        : 'Living',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : '',
      code        : 'Bathroom',
      zone        : 'Living',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : '',
      code        : 'Hospital',
      zone        : 'Commercial',
      type        : 'Furniture',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : '',
      code        : 'Home Decore',
      zone        : 'Accessories',
      type        : 'Accessories',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : '',
      code        : 'Home Organizer',
      zone        : 'Accessories',
      type        : 'Accessories',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : '',
      code        : 'Homeware',
      zone        : 'Accessories',
      type        : 'Accessories',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   },
   {
      name        : '',
      code        : 'Home Kitchen',
      zone        : 'Accessories',
      type        : 'Accessories',
      square      : undefined,
      commodity   : [
            {
               name  : undefined,
               code  : undefined
            }
         ]
   }
]))

const scheduleArray = [{
      code     : 'H44',
      color    : 'blue',
      time     : '10.00 - 20.00',
      use      : false,
      origin   : true
   },
   {
      code     : 'M0029',
      color    : 'blue',
      time     : '08.00 - 18.00',
      use      : false,
      origin   : true
   },
   {
      code     : 'M0058',
      color    : 'blue',
      time     : '09.00 - 19.00',
      use      : false,
      origin   : true
   },
   {
      code     : 'A0003',
      color    : 'green',
      time     : '12.00 - 22.00',
      use      : false,
      origin   : true
   },
   {
      code     : 'OFF',
      color    : 'red',
      time     : '',
      use      : true,
      origin   : true
   },
   {
      code     : 'AL',
      color    : 'black',
      time     : '',
      use      : true,
      origin   : true
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
