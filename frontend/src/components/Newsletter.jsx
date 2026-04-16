import React from 'react'

const Newsletter = () => {
    const onSubmitHandler=(e)=>{
        e.preventDefault();

    }
  return (
    <div className='text-center'>
        <p className='text-2xl font-medium text-gray-800'>Subscribe Now & get 20% off</p>
        <p className='text-gray-400 mt-3'>
            Lorem ipsum, dolor sit amet consectetur adipisicing elit. Amet quam ad autem mollitia fugiat harum rectecto? Ex.

        </p>
        <form onSubmit={onSubmitHandler} action="" className='w-full sm:w-1/2 flex items-center gap-3 mx-auto my-6 border pl-3'>
            <input className='w-full sm:flex-1 outline-none' type="email" placeholder='Enter Your Email' required />
            <button type='submit' className='bg-black text-white text-sm px-10 py-3'>Subcribe</button>

        </form>


    </div>
  )
}

export default Newsletter