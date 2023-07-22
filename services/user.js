const req = require('express/lib/request')
const res = require('express/lib/response')
const query=require('../mysql')

const eve=require('./event')



async function getUser(user){
    const users =await query.client.executeAsync(user)
    return users
}
async function userWithData (user,data){
    const newUser =await query.client.executeDataWithAsync(user,data)
    return newUser
}

exports.userData={
    // Get all user with details
    async  user(req,res){
    
        try {
            let userList = await getUser('SELECT * FROM user')  
            res.send(userList)
        } catch (error) {
            res.send({massage:'Invalid'})
        }finally{
            console.log('Hello world')
        }
    },
     //Create user Account    
    async  addUser(req,res,next){
        let newuser={
        name:req.body.name,
        email:req.body.email,
        password:req.body.password
        }
        userWithData ('INSERT INTO user SET ?',newuser)
        .then(u=>res.send({massage:'New user added.'})).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
            next()
        })
    },
    // Get user with id
    async  userWithId(req,res){
            // try {
            //     let userData = await getUser(`SELECT * FROM user WHERE id=${req.params.id}`)  
            //     res.send(userData)
            // } catch (error) {
            //     res.send({massage:'Invalid'})
            // }
         getUser(`SELECT * FROM user WHERE user_id=${req.params.id}`)
        .then(u=>res.send(u)).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
        })
    },
    //Update user with user id
    async  updateUser(req,res){
        let newuser={
            name:req.body.name,
            email:req.body.email,
            password:req.body.password
        }
        userWithData (`UPDATE user SET ? WHERE user_id=${req.params.id}`,newuser)
        .then(u=>res.send({massage:'User Updated Successfully.'})).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
        })
            
        
    },
    // Delete user
    async  deleteUser(req,res){
            
        getUser (`DELETE FROM user  WHERE user_id= ${req.params.id}`)
        .then(u=>res.send({massage:'User Deleted Successfully.'})).catch(err=>{
            console.log(err)
            res.send({massage:'Invalid'})
        })
            
        
    },

    // Set cookie for login 
    async setCookie(req,res){
        let user=req.body
        
        try {
            let uName=await getUser(`SELECT name,password FROM user WHERE name='${user.name}'`)
            res.cookie('user',uName[0].name,{ maxAge: 900000, httpOnly: true })
            res.send({massage:"Cookie Set...."})
            console.log(req.cookies)
        } catch (error) {
            res.send({massage:"Invalid"})
        }
    
    },
    async getCookie(req,res){
        console.log(req.cookies['user'])
        res.send({massage:"set................"})
    }
}