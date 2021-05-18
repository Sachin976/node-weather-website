const weatherForm = document.querySelector("form")
const search = document.querySelector("input")

const messageOne = document.querySelector("#message-1")
const messageTwo = document.querySelector("#message-2")

weatherForm.addEventListener("submit",(e)=>{
    e.preventDefault()
    const address = "http://localhost:3000/weather?address="+ search.value
    messageOne.textContent = "Please Wait! Loading..."
    messageTwo.textContent = ""
    fetch(address).then((response)=>{
        response.json().then((data)=>{
            if(data.error){
                messageOne.textContent= data.error
                messageTwo.textContent = ""
            }else{
                messageOne.textContent=data.location
                messageTwo.textContent=data.forecast
            }
        })
    })
})