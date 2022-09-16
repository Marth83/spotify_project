const express = require('express');

const app = express()

app.get('/', (req, res)=>{
 res.send("Hello World, I have a demon with me.");
})

const port = 8888;
app.listen(port, ()=>{
    console.log(`express app listening at http://localhost:${port}`);
})