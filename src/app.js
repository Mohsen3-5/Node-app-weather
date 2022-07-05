const path=require('path')
const express = require('express')
const hbs = require('hbs')
const app = express()
//get heroku port
const port = process.env.PORT||3000
const geocode = require('./utiles/geocode')
const forcast = require('./utiles/forcast')
const { json } = require('express')

const public_path=path.join(__dirname,"../public")
const view_path=path.join(__dirname,"../templates/views")
const partials_path=path.join(__dirname,"../templates/partials")

/*
Right here we using Hbs to load html files.
abd using express module to controle static file load.
*/ 
app.set('view engine','hbs')
app.set('views',view_path)
//in partials we keep files like footer and header
hbs.registerPartials(partials_path)
app.use(express.static(public_path))
app.get('',(req,res)=>{
    if(!req.query.search){
        return res.render('index',{
            title:'Weather app',
            name:'mohsen',
            forcast:'you must provide an addres!'
        })
    }
    geocode(req.query.search,(error,{lati,loni,location}={})=>{
        forcast(lati,loni,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
            console.log(forcastdata)
            res.render('index',{
                title:'Weather app',
                name:'mohsen',
                lati:lati,
                loni:loni,
                loca:location,
                forcast:forcastdata
            })
        })
      
    })
  
})
app.get('/about',(req,res)=>{
    res.render('about',{
        title:'About me',
        name:'mohsen'
    })
})
app.get('/help',(req,res)=>{
    res.render('help',{
        msg:'How may i help you!',
        title:'help',
        name:'mohsen'

    })
})
app.get('/weather',(req,res)=>{
    if(!req.query.search){
        return res.render('index',{
            title:'Weather app',
            name:'mohsen',
            forcast:'you must provide an addres!'
        })
    }
     geocode(req.query.search,(error,{loni,lati,location}={})=>{

        forcast(loni,lati,(error,forcastdata)=>{
            if(error){
                return res.send({error})
            }
         res.json(forcastdata)
        })

     })
   }
)
//in setioation tha url in help but does not founded.
app.get('/help/*',(req,res)=>{
    res.render('help',{
        msg:'Help article does not exicit!',
        title:'help',
        name:'mohsen'

    })
})
//'*' url is all url expecte url above
app.get('*',(req,res)=>{
   res.render('404',{name:'mohsen'})
})


app.listen(port,()=>{
    console.log('server is runing on port '+port)
})