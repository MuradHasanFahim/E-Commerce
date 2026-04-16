import React, { useEffect, useState } from 'react'
import axios from 'axios'
import { toast } from 'react-toastify'
import { backendUrl } from '../App'

const List = ({ token }) => {

  const [list, setList] = useState([]);

  const fetchList = async () => {
    try {
      const response = await axios.get(backendUrl + '/api/product/list')
      console.log(response);
      if (response.data.success) {
        setList(response.data.product);
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  // Fixed: Added id parameter to the function
  const removeProduct = async (id) => {
    try {
      const response = await axios.post(backendUrl + '/api/product/remove', { id }, { headers: { token } }) // Fixed: headers should be an object with token property
      if (response.data.success) {
        toast.success(response.data.message);
        await fetchList();
      }
      else {
        toast.error(response.data.message);
      }
    }
    catch (error) {
      console.log(error);
      toast.error(error.message);
    }
  }

  useEffect(() => {
    fetchList()
  }, [])

  return (
    <div className='p-4'>
      <p className='mb-4 text-lg font-medium'>All Products List</p>
      <div className='flex flex-col gap-2'>
        {/* List table title */}
        <div className='hidden md:grid grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center py-2 px-4 border bg-gray-100 text-sm font-medium'>
          <b>Image</b>
          <b>Name</b>
          <b>Category</b>
          <b>Price</b>
          <b className='text-center'>Action</b>
        </div>

        {/* Product list */}
        {
          list.map((item, index) => (
            <div key={index} className='grid grid-cols-[1fr_3fr_1fr] md:grid-cols-[1fr_3fr_1fr_1fr_1fr] items-center gap-2 py-2 px-4 border text-sm hover:bg-gray-50'>
              <img className='w-12 h-12 object-cover rounded' src={item.image[0]} alt={item.name} />
              <p className='truncate'>{item.name}</p>
              <p>{item.category}</p>
              <p>$ {item.price}</p>
              {/* Fixed: Pass item._id to removeProduct function */}
              <p 
                onClick={() => removeProduct(item._id)} 
                className='text-center cursor-pointer text-red-500 hover:text-red-700 font-bold text-lg'
              >
                X
              </p>
            </div>
          ))
        }
      </div>
    </div>
  )
}

export default List