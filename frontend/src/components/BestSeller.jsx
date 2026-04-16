import React, { useContext, useEffect,useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import ProductItem from './ProductItem';
import Title from './Title';

export const BestSeller = () => {
    const {products}=useContext(ShopContext)
    const [bestSeller,SetBestSeller]=useState([]);

    useEffect(()=>{
        const bestProduct=products.filter((item)=>(item.bestSeller))
        SetBestSeller(bestProduct.slice(0,5));

    },[products])



  return (
    <div className='my-10'>
        <div className='text-center text-3xl py-8'>
            <Title text1={'BEST'} text2={'SELLERS'}/>
            <p className='w-3/4 m-auto text-gray-600 text-xs sm:text-sm md:text-base'>
            Discover our most popular products loved by customers.
            </p>

        </div>

        <div className='grid grid-cols-2 sm:grid-cols-3 md:grid-cols-4 lg:grid-cols-5 gap-5 gap-y-6'>
            {
                bestSeller.map((item,index)=>(
                    <ProductItem key={index} id={item._id} name={item.name} price={item.price} image={item.image}/>
                ))
            }
        </div>


    </div>
  )
}
