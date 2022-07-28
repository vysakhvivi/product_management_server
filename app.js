const expresss= require('express')

const app = expresss();

app.get('/',(req,res) =>{
res.send('testing from backend')
});

app.listen(3000,()=>{
    console.log('server is running at port 3000');
})