const express = require('express');
const router = express.Router();
const Brand = require('../models/Brand');

const mongoose = require('mongoose');


router.get('/',(req,res) => {
    Brand.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({Error: err})
    })
})
/* Add Brand */
router.post('/insert',(req,res) => {
    let brand = new Brand(req.body)
    brand.save()
    .then( result => {
        res.status(200).json({Result: result})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})

/* Update Brand */
router.patch('/update/:id',(req,res) => {
    Brand.updateOne({_id: req.params.id}, {$set:req.body})
    .then( result => {
        res.status(200).json({Result: result})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})
/* Delete Brand*/
router.delete('/delete/:id',(req,res) => {
    Brand.deleteOne({_id: req.params.id})
    .then( result => {
        res.status(200).json({Result: result})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})



module.exports = router;