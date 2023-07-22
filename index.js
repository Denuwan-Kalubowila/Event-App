const express = require('express')
const app = express()
const route=require('./router')
const cors=require('cors')
const cookieParser=require('cookie-parser')

const PORT =5000

app.use(express.json())
app.use(cookieParser())
app.use(cors())
app.use('/',route)
// app.use((req,res,next)=>{
//     console.log("Hello")
//     //next()
//     res.send({massage:'from Middleware'})
// })
app.get('/cookie/:id',(req,res)=>{
    try {

        let user=getUser(`SELECT name FROM user WHERE user_id=${req.params.id}`)
        res.cookie('user',{user})
        res.send({massage:"Cookie Set...."})
        console.log(req.cookies)
    } catch (error) {
        res.send({massage:"Invalid"})
    }})

app.listen(PORT,()=>{
    console.log(`Server Running on port http://localhost:${PORT}`)
})
