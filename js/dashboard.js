

const carousel    = document.querySelector('#content-box')

function carouselEvent() {
    const scrollLeft    = carousel.scrollLeft,
        scrollWidth     = carousel.scrollWidth,
        clientWidth     = carousel.clientWidth,
        width           = scrollWidth - clientWidth,
        percent         = (scrollLeft / (scrollWidth - clientWidth)) * 100
    
    return {percent : percent, width : width}
}
function carouselScroll(percent, width) {
    let scroll = 0
        
    if (percent < 15) scroll = 0 * width 
    else if (percent >= 15 &&  percent < 40) scroll = 0.25 * width
    else if (percent >= 40 &&  percent < 65) scroll = 0.5 * width
    else if (percent >= 65 &&  percent < 80) scroll = .75 * width
    else scroll = width
    
    return scroll
}

    
window.addEventListener('DOMContentLoaded', async function (param) {
    
    const calendar  = new calendarSet(),
        SCH         = new schedule(),
        SC          = new salesCard(),
        DEPT        = new department(),
        STG         = new setting(),
        AS          = new afterSales(),
        date        = new Date().getDate(), 
        lastDate    = new main ().dateCode(new Date()).last, 
        schData     = SCH.readData(new Date()),
        MAIN        = new main()
    
    //AS.fetchRcp()
    calendar.play()
    SCH.generate()
    if (! await SCH.play()) return
    DEPT.play()
    if (! await SC.play()) return //alert('SalesCard')
    AS.play()
    //MAIN.myDB()
    
    document.querySelector('.dash-top p').textContent = new main().dateCode(new Date).longText
    document.querySelector('.dash-top h3').textContent = SCH.readData(new Date())[date - 1]
    
    /*/ nav & content scroll & click
    //carousel.onscrollend = function () {
        const data  = carouselEvent(),
            scroll  = carouselScroll(data.percent, data.width),
            prc     = data.percent
        document.querySelectorAll('.nav-link').forEach(link => {
            if (parseInt(link.dataset.percent) == prc) return link.classList.add('active');
            return link.classList.remove('active')
        })
        this.scrollTo({left : scroll, behavior : "smooth"})
    }*/ 
    document.querySelectorAll('.nav-link').forEach((link, i)=> {
        link.onclick = function () {
            document.querySelectorAll('.nav-link').forEach(i => i.classList.remove('active'))
            link.classList.add('active')
            document.querySelector('header i').classList.remove('active')
            document.querySelector('#setting').classList.add('dis-none')
            //carousel.scrollTo({left : carouselScroll(parseInt(this.dataset.percent), carouselEvent().width), behavior: "smooth"})
            document.querySelectorAll('.content').forEach(content => (content.dataset.target == link.dataset.target) ? content.classList.remove('dis-none') : content.classList.add('dis-none'))
        }
    })
    
    //if ('serviceWorker' in navigator) navigator.serviceWorker.register('js/service-worker.js')
    
   
   
   
})



