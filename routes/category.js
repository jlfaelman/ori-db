const express = require('express');
const router = express.Router();
const Category = require('../models/Category');

const mongoose = require('mongoose');


router.get('/',(req,res) => {
    Category.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json({Error: err})
    })
})
/* Add Category */
router.post('/insert',(req,res) => {
    let category = new Category(req.body)
    category.save()
    .then( result => {
        res.status(200).json({Result: result})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})

/* Update Category */
router.patch('/update/:id',(req,res) => {
    Category.updateOne({_id: req.params.id}, {$set:req.body})
    .then( result => {
        res.status(200).json({Result: result})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})
/* Delete Category*/
router.delete('/delete/:id',(req,res) => {
    Category.deleteOne({_id: req.params.id})
    .then( result => {
        res.status(200).json({Result: result})
    }).catch(err => {
        res.status(500).json({Error: err})
    })
})



module.exports = router;