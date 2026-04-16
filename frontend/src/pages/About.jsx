import React from 'react'
import { assets } from '../assets/assets'
import Title from '../components/Title'
import Newsletter from '../components/Newsletter'

const About = () => {
  return (
    <div>

      {/* ABOUT TITLE */}
      <div className='text-2xl text-center pt-8 border-t'>
        <Title text1={'ABOUT'} text2={'US'} />
      </div>

      {/* ABOUT CONTENT */}
      <div className='my-12 flex flex-col md:flex-row items-center gap-12 px-6 md:px-12'>

        <img
          className='w-full md:max-w-112.5 rounded-lg'
          src={assets.about_img}
          alt="About Forever"
        />

        <div className='flex flex-col justify-center gap-6 md:w-1/2 text-gray-600 leading-relaxed'>
          <p>
            Forever was born out of a passion for innovation and a desire to
            revolutionize the way people shop online. Our journey began with a
            simple idea: to provide a platform where customers can easily
            discover, explore, and purchase a wide range of products from the
            comfort of their homes.
          </p>

          <p>
            Since our inception, we've worked tirelessly to curate a diverse
            selection of high-quality products that cater to every taste and
            preference. From fashion and beauty to electronics and home
            essentials, we offer an extensive collection sourced from trusted
            brands and suppliers.
          </p>

          <b className='text-gray-800 text-lg'>Our Mission</b>

          <p>
            Our mission at Forever is to empower customers with choice,
            convenience, and confidence. We're dedicated to providing a
            seamless shopping experience that exceeds expectations, from
            browsing and ordering to delivery and beyond.
          </p>
        </div>

      </div>

      {/* WHY CHOOSE US TITLE */}
      <div className='text-2xl text-center py-6'>
        <Title text1={'WHY'} text2={'CHOOSE US'} />
      </div>

      {/* FEATURES */}
      <div className='flex flex-col md:flex-row gap-6 px-6 md:px-12 mb-20'>

        <div className='border rounded-lg px-8 py-10 flex flex-col gap-4 hover:shadow-md transition'>
          <b className='text-gray-800'>Quality Assurance</b>
          <p className='text-gray-600 text-sm'>
            We meticulously select and vet each product to ensure it meets our
            stringent quality standards.
          </p>
        </div>

        <div className='border rounded-lg px-8 py-10 flex flex-col gap-4 hover:shadow-md transition'>
          <b className='text-gray-800'>Convenience</b>
          <p className='text-gray-600 text-sm'>
            With our user-friendly interface and hassle-free ordering process,
            shopping has never been easier.
          </p>
        </div>

        <div className='border rounded-lg px-8 py-10 flex flex-col gap-4 hover:shadow-md transition'>
          <b className='text-gray-800'>Exceptional Customer Service</b>
          <p className='text-gray-600 text-sm'>
            Our team of dedicated professionals is here to assist you every
            step of the way, ensuring your satisfaction is our top priority.
          </p>
        </div>

      </div>

      <Newsletter />

    </div>
  )
}

export default About