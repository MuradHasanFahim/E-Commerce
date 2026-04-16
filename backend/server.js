import express from 'express'

import cors from 'cors';
import 'dotenv/config'
import connectDB from './config/db.js';
import connectCloudinary from './config/cloudinary.js';
import userRouter from './routes/userRouter.js';
import productRouter from './routes/productRoute.js';
import cartRouter from './routes/cartRoute.js';
import orderRouter from './routes/orderRoute.js';

const app=express();
const port=process.env.PORT||4000;

app.use(express.json());
app.use(cors());

app.get('/',(req,res)=>{
    res.send('API is working')
})

connectDB();
connectCloudinary();


app.use('/api/user',userRouter)
app.use('/api/product',productRouter)
app.use('/api/cart',cartRouter);
app.use('/api/order',orderRouter);


app.listen(port,()=>console.log('server is running on '+port));