const express = require('express')
const userQuery =require('./services/user')
const eventQuery =require('./services/event')

const router = express.Router()

let user=userQuery.userData
let event=eventQuery.eventData

//get,add,update,delete users
router.get('/user',user.user)
router.get('/user/:id',user.userWithId)
router.post('/user',user.addUser)
router.post('/user/setcookie',user.setCookie)
router.put('/user/:id',user.updateUser)
router.delete('/user/:id',user.deleteUser)





//get,add,update,delete events 
router.get('/event',event.event)
router.get('/event/:id',event.eventWithId)
router.post('/event',event.addEvent)
router.put('/event/:id',event.updateEvent)
router.delete('/event/:id',event.deleteEvent)



// async function getUser(user){
//     const users =await query.client.executeAsync(user)
//     return users
// }
// async function userWithData (user,data){
//     const newUser =await query.client.executeDataWithAsync(user,data)
//     return newUser
// }

// router.get('/',async (req,res)=>{
    
//     try {
//         let userList = await getUser('SELECT * FROM user')  
//         res.send(userList)
//     } catch (error) {
//         res.send({massage:'Invalid'})
//     }finally{
//         console.log('Hello world')
//     }
// })

// router.post('/add',async (req,res)=>{
//     let newuser={
//         name:req.body.name,
//         address:req.body.address
//     }
//     userWithData ('INSERT INTO user SET ?',newuser)
//     .then(u=>res.send({massage:'New user added.'})).catch(err=>{
//         console.log(err)
//         res.send({massage:'Invalid'})
//     })
    
// })
// router.get('/get/:id',async (req,res)=>{
//     // try {
//     //     let userData = await getUser(`SELECT * FROM user WHERE id=${req.params.id}`)  
//     //     res.send(userData)
//     // } catch (error) {
//     //     res.send({massage:'Invalid'})
//     // }
//     await getUser(`SELECT * FROM user WHERE id=${req.params.id}`)
//     .then(u=>res.send(u)).catch(err=>{
//         console.log(err)
//         res.send({massage:'Invalid'})
//     })
// })
// router.put('/update/:id',async (req,res)=>{
//     let newuser={
//         name:req.body.name,
//         address:req.body.address
//     }
//     userWithData (`UPDATE user SET ? WHERE id=${req.params.id}`,newuser)
//     .then(u=>res.send({massage:'User Updated Successfully.'})).catch(err=>{
//         console.log(err)
//         res.send({massage:'Invalid'})
//     })
    

// })
// router.delete('/delete/:id',async (req,res)=>{
    
//     getUser (`DELETE FROM user  WHERE id= ${req.params.id}`)
//     .then(u=>res.send({massage:'User Deleted Successfully.'})).catch(err=>{
//         console.log(err)
//         res.send({massage:'Invalid'})
//     })
    

// })

module.exports=router