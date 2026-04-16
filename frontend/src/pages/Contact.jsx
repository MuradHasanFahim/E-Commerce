import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const Contact = () => {
  return (
    <div>

      {/* Title */}
      <div className='text-center text-2xl pt-10 border-t'>
        <Title text1={'CONTACT'} text2={'US'} />
      </div>

      {/* Content */}
      <div className='my-12 flex flex-col md:flex-row items-center justify-center gap-12 px-6 md:px-12 mb-28'>

        {/* Image */}
        <img
          className='w-full md:max-w-120 rounded-lg'
          src={assets.contact_img}
          alt="Contact"
        />

        {/* Text Content */}
        <div className='flex flex-col gap-6 text-left max-w-md'>

          <div>
            <p className='font-semibold text-xl text-gray-700 mb-2'>Our Store</p>
            <p className='text-gray-500 leading-relaxed'>
              54709 Dhaka Center <br />
              Suite 350, Dhaka, BD
            </p>
          </div>

          <div className='text-gray-500 leading-relaxed'>
            <p>Tel: 012-345-789</p>
            <p>Email: example@gmail.com</p>
          </div>

          <div>
            <p className='font-semibold text-xl text-gray-700 mb-2'>
              Careers at Forever
            </p>
            <p className='text-gray-500'>
              Learn more about our team and job openings.
            </p>
          </div>

          <button className='border border-black px-8 py-3 text-sm w-fit hover:bg-black hover:text-white transition duration-300 cursor-pointer'>
            Explore Jobs
          </button>

        </div>

      </div>
      <Newsletter/>

    </div>
  )
}

export default Contact