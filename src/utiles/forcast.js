const request = require("request");

const forcast= (lati,longi,callback)=>{
     const url="http://api.weatherstack.com/current?access_key=39cafa219fdfa7bdc4af22194c80f6b4&query="+lati+","+longi+"&unist=f"
     request({url:url,json:true}, function (error, response) {
         if(error){
             callback("erorr",undefined)
         }else if(response.body.error){
            callback("erorr",undefined)
         }else{
            callback(undefined,response.body)
         }
     })
    
    }

module.exports=forcast