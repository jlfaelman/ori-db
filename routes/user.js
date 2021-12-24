const express = require('express');

const router = express.Router();
const jwt = require('jsonwebtoken');


const User = require('../models/User');

router.get('/',(req,res)=>{
    User.find().then(result=>{
        res.status(200).json(result)
    }).catch(err=>{
        res.status(401).json({Message:"Unauthorized Access"})
    })

})

router.post('/login', (req,res)=>{

    User.findOne({email: req.body.email, password:req.body.password})
    .then(result=>{
        if(!result){
            console.log({ "Error!":"User not Found!" })
            res.status(401).json({ Message:"Authentication Failed."})
        }else{
            const token =  jwt.sign({id: result._id}, process.env.PRIVATE_KEY)
            res.status(200).json({message:"Success",token:token})
        }
})
    .catch(err=>{
        if(err){
            console.log("Error !: Internal Server Error")
            res.status(500).json({ err:"Error!"})
        }
    })
})
router.post('/register', (req,res)=>{
    let email = req.body.email
    let password = req.body.password
    let lastname = req.body.lastname
    let firstname = req.body.firstname
    
    User.findOne({email: email, password:password, lastname:lastname, firstname:firstname})
    .then(result=>{
        if(result){
            console.log("User already exists!" )
            res.status(409).json("User already exists!")
        }
        if(!result){
            let user = new User(req.body)
            user.save()
                .then(userRes =>{
                    if(userRes){
                        console.log("User Registration is Successful!")
                        res.status(200).json("User Registration is Successful!")
                    }
                }).catch(err=>{
                    if(err){
                        res.status(500).json(err)
                    }
                })
           
        }
    })
    
})
router.delete('/delete/:id',(req,res)=>{
    User.deleteOne({_id:req.params.id})
    .then(msg=>{
        console.log('User Successfully Deleted!')
        res.status(200).json("User Successfully Deleted!")
    })
    .catch(err=>{
        res.status(500).json("Error! : Internal Server Error!")
    })
})


router.patch('/update/:id',(req,res)=>{
    User.updateOne({_id:req.params.id}, {$set: {email: req.body.email, firstname: req.body.firstname, lastname: req.body.lastname, password: req.body.password }}).then(result=>{
        if(result){
            res.status(200).json({Result:result})
        }
    }).catch(error=>{
        if(error){
            res.status(500).json({Error: error})
        }
    })
})




module.exports = router;