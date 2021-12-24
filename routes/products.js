const express = require('express');
const router = express.Router();
const Product = require('../models/Product')
const multer = require('multer');
const fs = require('fs');
const path = require('path');

const storage = multer.diskStorage({
    destination:(req,file,cb) =>{
        cb(null,'./images/products');
    },
    filename:(req,file,cb) => {
        cb(null, Date.now()+'.'+file.originalname);
    }
});
const upload = multer({storage:storage});



router.get('/',(req,res) => {
    Product.find()
    .then(result => {
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })

});
 /* Insert new Product */
router.post('/insert',upload.single('image'), (req,res) => {
 
    let product = new Product({
        name:req.body.name,
        sku:req.body.sku,
        quantity:req.body.quantity,
        price:req.body.price,
        category:req.body.category,
        brand:req.body.brand,
        store:req.body.store,
        description:req.body.description,
        image:req.file.path
    });
    product.save()
    .then(result => {
        console.log(req.file.path)
        res.status(200).json(result)
    })
    .catch(err => {
        res.status(500).json(err)
    })     
});

 /* Insert new Product */
//  router.post('/insert',upload.single('image'),(req,res) => {
//     // let loc = req.file.path; 
//     // let ct = req.file.mimetype; 
//     let product = new Product({
//         name:req.body.name,
//         sku:req.body.sku,
//         quantity:req.body.quantity,
//         price:req.body.price,
//         category:req.body.category,
//         brand:req.body.brand,
//         store:req.body.store,
//         description:req.body.description,

//      });
//      console.log(req.body)
//      let productOptions = req.body.attributes;
    // product.save()
    // .then(result => {
    //     if(result){
    //         for (let i = 0; i < productOptions.length; i++) {
    //         Product.updateOne({_id:result._id},{$push:{attribute:productOptions[i]}}).then(
    //             result =>{ console.log(i+1+" Inserted attribute(s)")}
    //         )}
    //     }
    //     res.status(200).json(result)
    // })
    // .catch(err => {
    //     res.status(500).json(err)
    // })     
// });
/* Delete Product */
router.delete('/delete/:id', (req,res) => {
    Product.deleteOne({_id:req.params.id})
    .then(result => {
        res.status(200).json(result);
    })
    .catch(err => {
        res.status(500).json(err)
    })
});


module.exports = router;
