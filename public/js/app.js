
var form=document.querySelector('form')
var address=document.querySelector('input')
var msg1=document.querySelector('#msg1')
var errorMsg=document.querySelector('#errorMsg')
form.addEventListener('submit',(e)=>{
    e.preventDefault()
//fetch clint side API
msg1.textContent='loading....'
errorMsg.textContent=' '
fetch('/weather?search='+address.value).then((respone)=>{
    respone.json().then((data)=>{
        if(data.error){
            errorMsg.textContent=data.error
        }else{
            msg1.textContent=data
        }

    })
})
  console.log(address.value)
})