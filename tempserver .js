const express = require('express')
const app = express()

app.get('/', function (req, res) {
  res.send('Hello World Welcome')
})

app.post('/items',(req,res)=>{
  res.send("Data is saved");
})
app.get('/about', function (req, res) {
  res.send('Hello World this is about page  ')
})
app.get('/detail', function (req, res) {
    const detailss={
        name:"rishabh shukla",
        class:"btech final year",
        age:"23",
        tech:"nodejs"
    }
  res.send(detailss);
})

app.listen(3000)