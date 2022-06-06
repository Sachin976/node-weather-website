const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

let message1 = document.querySelector("#message-1")
let message2 = document.querySelector("#message-2")
let message3 = document.querySelector("#message-3")
let message4 = document.querySelector("#message-4")
let message5 = document.querySelector("#message-5")
let message6 = document.querySelector("#message-6")
let message7 = document.querySelector("#message-7")
let testbutton = document.getElementById('test')

// function detectMob() {
//     const toMatch = [
//         /Android/i,
//         /webOS/i,
//         /iPhone/i,
//         /iPad/i,
//         /iPod/i,
//         /BlackBerry/i,
//         /Windows Phone/i
//     ];
    
//     return toMatch.some((toMatchItem) => {
//         return navigator.userAgent.match(toMatchItem);
//     });
// }

const isMobile = {
    Android: function () {
      return navigator.userAgent.match(/Android/i);
    },
    BlackBerry: function () {
      return navigator.userAgent.match(/BlackBerry/i);
    },
    iOS: function () {
      return navigator.userAgent.match(/iPhone|iPad|iPod/i);
    },
    Opera: function () {
      return navigator.userAgent.match(/Opera Mini/i);
    },
    Windows: function () {
      return (
        navigator.userAgent.match(/IEMobile/i) ||
        navigator.userAgent.match(/WPDesktop/i)
      );
    },
    any: function () {
      return (
        isMobile.Android() ||
        isMobile.BlackBerry() ||
        isMobile.iOS() ||
        isMobile.Opera() ||
        isMobile.Windows()
      );
    },
  };

testbutton.onclick = ()=>{
    if(isMobile.Android || isMobile.BlackBerry || isMobile.Opera || isMobile.iOS){
        return alert('hi')
    }
    alert("hey")
   
    // setTimeout(()=>{
    //     windowRef.location = 'https://www.amazon.in/'
    //     navigator
    // },2000)
    
}

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const address = "/weather?address="+ search.value
    message1.textContent = "Please Wait! Loading..."
    message2.textContent = ""
    message3.textContent = ""
    message4.textContent = ""
    message5.textContent = ""
    message6.textContent = ""
    message7.textContent = ""
    fetch(address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                message1.textContent= data.error
                message2.textContent = ""
            }else{
                console.log(data.location)
                message1.textContent="Location: " + data.location
                message2.textContent="Current forecast: " + data.forecast
                message3.textContent="Temprature: " + data.temp + " Degree Centigrade"
                message4.textContent="Wind speed: " + data.w_s + " Km/hr"
                message5.textContent="Wind direction: " + data.w_d
                message6.textContent="Is day: " + data.day
                message7.textContent="Precipitaion: " + data.precip + " mm"
            }
        })
    })
})