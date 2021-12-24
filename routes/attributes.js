const express = require('express');
const router = express.Router();
const Attribute = require('../models/Attribute')

const mongoose = require('mongoose');


router.get('/',(req,res) => {
    Attribute.find({})
    .then(result=>{
        res.status(200).json(result)
    })
    .catch(err=>{
        console.log(err)
    })
})
/* Get Specific Attribute Array Values*/
router.get('/view/:attribute/:id',(req,res) => {
    Attribute.findOne({_id:req.params.id,attribute:req.params.attribute})
    .then(result=>{
        console.log(result)
        res.status(200).json(result.selection)
    })
    .catch(err=>{
        res.status(500).json(err)
    })
})  
/* Update Specific Value inside the Array */
router.patch('/update/:attribute/:id', (req,res) => {
    Attribute.findOneAndUpdate({_id: req.params.id,attribute:req.params.attribute}, {$push:{selection:{_id:req.body.id,option:req.body.option}}})
    .then(result => {
        res.status(200).json({Result: result})
    })
    .catch(err => {
        res.status(500).json({Error: err})
    })
})


/* Delete Whole Array of Attributes */
router.delete('/drop/:id',(req,res) => {
    let id = req.params.id;
    Attribute.findByIdAndDelete({_id: id})
    .then(result => {
        res.status(200).json({Result: "Attribute Succesfuly Deleted."})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})

/* Add a new Attribute Array */
router.post('/insert',(req,res) => {
    let attribute = req.body.attribute
    let newAttribute = new Attribute(req.body)
    Attribute.findOne({attribute:attribute}).then(result => {
        if(result){
            res.status(409).json({message: "Attribute Already Exists."})
        }else{
            newAttribute.save().then(result => {
                res.status(200).json({Result:"Success",_id:result._id})
            })
            .catch(err => {
                res.status(500).json(err)
            })
        }
    })
    
})
/* Delete Specific Data into Array */
router.patch('/delete/:attribute/:id',(req,res) => {
    Attribute.updateOne({_id:req.params.id,attribute:req.params.attribute},{$pull:{selection:{_id:req.body.id,option:req.body.option}}})
    .then( result => {
            if(result){
                res.status(200).json(result)
            }
    }).catch( err => {
            res.status(500).json({Error: err})
    })

})



/* Insert a Specific Attribute into Array*/
router.patch('/add/:attribute/:id',(req,res) => {
    Attribute.updateOne({_id:req.params.id,attribute:req.params.attribute},{$push:{selection:req.body}})
    .then(result=>{
        res.status(200).json({Result:result})

    }).catch(error=> {
         res.status(500).json(error)
    })
})




module.exports = router