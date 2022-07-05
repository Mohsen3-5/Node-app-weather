const request = require("request");


const geocode=(adress,callback)=>{
    const url = "https://api.mapbox.com/geocoding/v5/mapbox.places/"+ encodeURIComponent(adress)+".json?access_token=pk.eyJ1IjoibTdzZW4xOSIsImEiOiJjbDM2OGxoaHkxbGQwM2NwOWhqdnJiM3l6In0.VvOHK7U2lch5v9_NnkBeBQ"
    request({url:url,json:true}, function (error, response) {
        if(error){
            callback("erorr",undefined)
        }else if(response.body.features.length===0){
           callback("erorr",undefined)
        }else{
       callback(undefined,{
           lati:response.body.features[0].center[0],
           loni:response.body.features[0].center[1],
           location:response.body.features[0].place_name
       })
    }
    })
    }

module.exports=geocode