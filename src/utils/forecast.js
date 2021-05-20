const request = require('request')

const forecast = (latitude,longitude,callback) =>{
    const url = "http://api.weatherstack.com/current?access_key=9afe19bf942db069009a8e27a1ef209a&query="+ latitude +","+ longitude
    request({url, json: true},(error,{body}) =>{
        if(error){
            callback("Unable to connect to weather services!",undefined)
        }else if(body.error){
            callback("Sorry! Cant find the location",undefined)
        }else{
            //callback(undefined,`${body.current.weather_descriptions[0]}. The temprature out is ${body.current.temperature} degrees and it feels like ${body.current.feelslike} degrees`)
            callback(undefined,{
                forecast: body.current.weather_descriptions[0],
                temprature: body.current.temperature,
                wind_speed: body.current.wind_speed,
                wind_dir: body.current.wind_dir,
                is_day: body.current.is_day,
                precip: body.current.precip
            })
        }
    })
}
module.exports=forecast 