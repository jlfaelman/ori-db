const express = require('express');
const Store = require('../models/Store');
const router = express.Router();
const mongoose = require('mongoose');



router.get('/',(req,res)=>{
  Store.find({}, (err, stores)=>{
      if(err) {
          return console.error(err)
      }else{
         res.status(200).json(stores)
      }
  });
})

router.post('/add',(req,res)=>{
    let storeData = req.body;
    let store = new Store(storeData);
    if(store.store === "" || store.status == ""){
        res.status(500).json({
            Error:"Empty String Fields!"
        })
    }
    else{
        store.save({store: store.store, status: store.status},(err, addedStore)=>{
            if(err){
                res.status(500).json({
                    "Error!":err
                })
            }else{
                if(!storeData){
                    res.status(404).json({
                    " Error!":err
                    })
                }
                else{
                    res.status(200).send(addedStore);
                    console.log("Store Added")
                }
            }
        })
    }
})

router.delete('/delete/:id',(req,res)=>{
    Store.findByIdAndDelete(req.params.id,(err, deletedStore)=>{
        if(err){
            console.log(err);
        }else{
            res.json(deletedStore)
            console.log("Store Deleted")
        }
    })
})

router.patch('/update/:id',(req,res)=>{
    Store.updateOne({_id: req.params.id}, {$set: {store: req.body.store, status: req.body.status }},(err,updatedStore)=>{
        if(err){
            console.log(err)
        }else{
            res.status(200).json(updatedStore)
            console.log("Store Updated")
        }
    })
})

module.exports = router;
