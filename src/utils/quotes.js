const unirest = require('unirest')
const URL = 'https://quotes15.p.rapidapi.com/quotes/random/'


const getQuotes = (callback)=>{
    const api_key = "a260a13f4dmsh0f9ffa74a9c223cp1cd648jsne0ecfb307317"
    const api_host = "quotes15.p.rapidapi.com"
    unirest
        .get(URL)
        .headers({
            "x-rapidapi-key": api_key,
            "x-rapidapi-host": api_host,
            "useQueryString": true
            })
        .then((res) => {
            console.log(typeof(res))
            if(res.error){
		        callback(res.error,undefined)
	        }else{
		        callback(undefined,res.body)
	        }
        })
}

module.exports = getQuotes