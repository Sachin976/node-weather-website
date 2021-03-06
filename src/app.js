const path = require('path');
const express = require("express");
const forecast = require('./utils/forecast.js');
const geocode = require('./utils/geocode.js');
const getQuotes = require('./utils/quotes.js');
const hbs = require('hbs');

const app = express();
const port = process.env.PORT || 3000;
const publicDirectoryPath = path.join(__dirname,"../public");
const viewsPath = path.join(__dirname,"../templates/views");
const partialsPath = path.join(__dirname,"../templates/partials");

app.set("view engine","hbs");
app.set("views",viewsPath);
hbs.registerPartials(partialsPath);
app.use(express.static(publicDirectoryPath));
app.get('',(req,res)=>{
    getQuotes((error,data)=>{
        if(error){
            let quote = "Wherever you go, no matter what the weather, always bring your own shine"
            let author = "-Anthony J. D'angelo"
            res.render("index",{
                title: 'Weatherly',
                name:"Sachin Sharma",
                quote,
                author
            })
        }else{
            let quote = data.content
            let author = data.originator.name
            res.render("index",{
                title: 'Weather',
                name:"Sachin Sharma",
                quote,
                author
            })
        }
    })
    
})

app.get("/covid",(req,res)=>{
    res.render("covid",{
        title: "COVID-19",
        name: "Sachin Sharma",
        
    })
})

app.get("/about",(req,res)=>{
    res.render("about",{
        title:'About',
        name: "Sachin Sharma"
    })
})
app.get('/help',(req,res)=>{
    res.render("help",{
        title:"Help",
        des:"If you have any query contact me at sachinshoff@gmail.com",
        name:"Sachin Sharma"
    })
})

app.get('/weather',(req,res)=>{
    
    if(!req.query.address){
        return res.send({
            error:"Enter an address first!"
        })
    }
    const address = req.query.address;
    geocode(address,(error,{latitude,longitude,location}={})=>{
        if(error){
            return res.send({error})
        }
        forecast(latitude,longitude,(error,Data)=>{
            if(error){
                return res.send({error})
            }
            res.send({
                location,
                forecast:Data.forecast,
                temp: Data.temprature,
                w_s:Data.wind_speed,
                w_d:Data.wind_dir,
                day:Data.is_day,
                precip:Data.precip,
                address
            })
        })
    })
})

app.get('/help/*',(req,res)=>{
    res.render("404",{
        title:"404",
        error:"Help article not found",
        name:"sachin"
    })
})

app.get('*',(req,res)=>{
    res.render("404",{
        title:"404",
        error:"Page not found",
        name:"sachin"
    })
})


app.listen(port,()=>{
    console.log("server has been set up on" + port);
})