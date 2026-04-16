import express from 'express'
import { addproduct,singleProduct,listProducts,removeProduct } from '../controllers/productController.js';
import upload from '../middleware/multer.js';
import adminAuth from '../middleware/adminAuth.js';

const productRouter=express.Router();



productRouter.post('/add',adminAuth,upload.fields([{name:'image1',maxCount:1},{name:'image2',maxCount:1},{name:'image3',maxCount:1},{name:'image4',maxCount:1}]),addproduct)
productRouter.post('/remove',adminAuth,removeProduct)
productRouter.post('/single',singleProduct)
productRouter.get('/list',listProducts);

export default productRouter