const unirest = require('unirest')

const getQuotes = (callback)=>{
    unirest
        .get('https://quotes15.p.rapidapi.com/quotes/random/')
        .headers({
            "x-rapidapi-key": "a260a13f4dmsh0f9ffa74a9c223cp1cd648jsne0ecfb307317",
            "x-rapidapi-host": "quotes15.p.rapidapi.com",
            "useQueryString": true
            })
        .then((res) => {
            if(res.error){
		        callback(res.error,undefined)
	        }else{
		        callback(undefined,res.body)
	        }
        })
}

module.exports = getQuotes