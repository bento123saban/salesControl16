                                                                                                                                                                                                                                                                              

if(!localStorage.getItem("FPCHOOSE"))       localStorage.setItem("FPCHOOSE", 'QTY')
if(!localStorage.getItem("FU"))             localStorage.setItem("FU", JSON.stringify([]))
if(!localStorage.getItem("AS"))             localStorage.setItem("AS", JSON.stringify([]))
if(!localStorage.getItem("ITEMS"))          localStorage.setItem("ITEMS", JSON.stringify([]))
if(!localStorage.getItem("PROBLEM"))        localStorage.setItem("PROBLEM", JSON.stringify([]))
if(!localStorage.getItem("TODAY"))          localStorage.setItem("TODAY", JSON.stringify([]))
if(!localStorage.getItem("TASK"))           localStorage.setItem("TASK", JSON.stringify([]))
if(!localStorage.getItem("FETCH"))          localStorage.setItem("FETCH", JSON.stringify([]))
if(!localStorage.getItem("SCHEDULE"))       localStorage.setItem("SCHEDULE", JSON.stringify(
    [
        {
            code : '122019',
            data : []
        }
    ]))
if(!localStorage.getItem("SALESCARD"))      localStorage.setItem("SALESCARD", JSON.stringify([]))
if(!localStorage.getItem("DELIVERY"))       localStorage.setItem("DELIVERY", JSON.stringify({
        partial     : 2,
        container  :  3
    }))
if(!localStorage.getItem("SITE"))           localStorage.setItem("SITE", JSON.stringify([
        {
            id: 1,
            site: "DC Cikupa",
            range: 45,
            day: 0,
            toCont: 2,
            cpu: 45,
            code: "23"
       },
        {
            id: 2,
            site: "DC Jababeka",
            range: 45,
            day: 0,
            toCont: 2,
            cpu: 45,
            code: "72"
       },
        {
            id: 3,
            site: "DC Sidoarjo",
            range: 21,
            day: 3,
            toCont: 2,
            cpu: 21,
            code: "H6"
       },
        {
            id: 4,
            site: "DC WH Maluku",
            range: 2,
            toCont: 0,
            day: '',
            cpu: 2,
            code: "DN",
       },
        {
            id: 5,
            site: "Informa Maluku City",
            range: 2,
            toCont: 0,
            day: '',
            cpu: 0,
            code: "G8"
       }
    ]))
if(!localStorage.getItem("DEPT"))           localStorage.setItem('DEPT', 
JSON.stringify([
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
      name: 'Home Ware',
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

let scheduleArrayx = [{
        code    : 'H44',
        color   : 'blue',
        time    : '10.00 - 20.00',
        start   : '10.00',
        end     : '20.00',
        use     : false,
        work    : true,
        origin  : true
   },
   {
        code    : 'M0029',
        color   : 'blue',
        time    : '08.00 - 18.00',
        start   : '08.00',
        end     : '18.00',
        use     : false,
        origin  : true,
        work    : true,
   },
   {
        code    : 'M0058',
        color   : 'blue',
        time    : '09.00 - 19.00',
        start   : '07.00',
        end     : '17.00',
        use     : false,
        origin  : true,
        work    : true,
   },
   {
        code    : 'H59',
        color   : 'blue',
        time    : '07.00 - 17.00',
        start   : '07.00',
        end     : '17.00',
        use     : true,
        origin  : true,
        work    : false,
   },
   {
        code    : 'A0003',
        color   : 'green',
        time    : '12.00 - 22.00',
        start   : '12.00',
        end     : '22.00',
        use     : false,
        origin  : true,
        work    : true,
   },
   {
        code    : 'OFF',
        color   : 'red',
        time    : 'NO SHIFT',
        start   : '',
        end     : '',
        use     : true,
        origin  : true, 
        work    : false,
   },
   {
        code     : 'AL',
        color    : 'black',
        time     : 'ANNUAL LEAVE',
        start    : '',
        end      : '',
        use      : true,
        origin   : true,
        work     : false,
   }
   
]
if(!localStorage.getItem("scheduleTime")) localStorage.setItem("scheduleTime", JSON.stringify(scheduleArrayx))
if(JSON.parse(localStorage.getItem("scheduleTime")) == []) localStorage.setItem("scheduleTime", JSON.stringify(scheduleArrayx))
if(!localStorage.getItem('SETTINGS'))       localStorage.setItem('SETTINGS', JSON.stringify({
    user : {
        id          : 165925,
        name        : 'Bendhard16',
        email       : 'Bendhard16@gmail.com',
        noHp        : '81364741823',
        password    : '211221'
    },
    url : {
        main: 'https://script.google.com/macros/s/AKfycbwttBUFtlACdB89QA6sd_x6pwLaYgqFK3jWfaYXF7pOsX0MvtYCmPMNiFUq8CULgvX4ZQ/exec',
        salesCard : {
            url     : 'https://docs.google.com/spreadsheets/d/19xNn3anMA7JMRitJRG_miH5VisuVpxU3Yi8nA193GwQ/edit?usp=drivesdk',
            header  : 'B7:J7',
            range   : 'B8:J',
            sheet   : 'Bend',
            value   : ''
        },
        afterSales: {
            url     : 'https://docs.google.com/spreadsheets/d/19xNn3anMA7JMRitJRG_miH5VisuVpxU3Yi8nA193GwQ/edit?usp=drivesdk',
            header  : 'L7:AF7',
            range   : 'L8:AF',
            sheet   : 'Bend',
            value   : ''
        },
        container : {
            url     : 'https://docs.google.com/spreadsheets/d/1BPkzech5es-yKOylOS-5HrYa4Ik0Ppv4zdgu1bqxcZ8/edit?usp=drivesdk',
            header  : 'A4:W4', 
            range   : 'A5:W',
            sheet   : 'SDC MALUKU',
            value   : ''
        },
        schedule : {
            url     : undefined,
            header  : undefined, 
            range   : undefined,
            sheet   : undefined,
            value   : undefined
        }
    },
    schedule : {
        time : scheduleArrayx
    },   
    delivery : {
        container : 4,
        delivery : 3
    },
    afterSales: {saveMonth : 3},
    salesCard:  {saveMonth: 3}
}))
