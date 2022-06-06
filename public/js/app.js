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

testbutton.onclick = ()=>{
    setTimeout(()=>{
        window.open('https://www.amazon.in/','_blank')
    },2000)
    
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