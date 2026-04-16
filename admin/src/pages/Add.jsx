import React, { useState } from 'react'
import { assets } from '../assets/assets'
import axios from 'axios'
import { backendUrl } from '../App.jsx'
import { toast } from 'react-toastify'

const Add = ({ token }) => {

  const [image1, setImage1] = useState(false);
  const [image2, setImage2] = useState(false);
  const [image3, setImage3] = useState(false);
  const [image4, setImage4] = useState(false);

  const [name, setName] = useState('');
  const [description, setDescription] = useState('');
  const [price, setPrice] = useState('');
  const [category, setCategory] = useState('Men')
  const [subCategory, setSubCategory] = useState('Topwear');
  const [bestSeller, setBestSeller] = useState(false)
  const [sizes, setSizes] = useState([]);

  const onSubmitHandler = async (e) => {
    e.preventDefault();

    try {
      const formData = new FormData()
      formData.append('name', name);
      formData.append('description', description);
      formData.append('price', price);
      formData.append('category', category);
      formData.append('subCategory', subCategory);
      formData.append('bestSeller', bestSeller);
      formData.append('sizes', JSON.stringify(sizes));

      image1 && formData.append('image1', image1);
      image2 && formData.append('image2', image2);
      image3 && formData.append('image3', image3);
      image4 && formData.append('image4', image4);

      const response = await axios.post(backendUrl + '/api/product/add', formData, { headers: { token } })
      
      if (response.data.success) {
        toast.success(response.data.message);
        setName('')
        setDescription('')
        setImage1(false)
        setImage2(false)
        setImage3(false)
        setImage4(false)
        setPrice('')
        setSizes([])
        setBestSeller(false)
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

  return (
    <form onSubmit={onSubmitHandler} className="flex flex-col w-full items-start gap-4 p-4 md:p-6">
      {/* Upload Images Section */}
      <div className="w-full">
        <p className="mb-3 text-lg font-medium">Upload Images</p>
        <div className="flex flex-wrap gap-3">
          {[1, 2, 3, 4].map((num) => {
            const imageState = eval(`image${num}`);
            const setImage = eval(`setImage${num}`);
            return (
              <label key={num} htmlFor={`image${num}`} className="cursor-pointer">
                <img 
                  className="w-24 h-24 object-cover border rounded-lg hover:opacity-80 transition-opacity" 
                  src={!imageState ? assets.upload_area : URL.createObjectURL(imageState)} 
                  alt={`Upload ${num}`} 
                />
                <input 
                  onChange={(e) => setImage(e.target.files[0])} 
                  type="file" 
                  id={`image${num}`} 
                  hidden 
                  accept="image/*"
                />
              </label>
            );
          })}
        </div>
      </div>

      {/* Product Name */}
      <div className="w-full max-w-2xl">
        <p className="mb-2 text-lg font-medium">Product Name</p>
        <input 
          onChange={(e) => setName(e.target.value)} 
          value={name} 
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
          type="text" 
          placeholder="Enter product name" 
          required
        />
      </div>

      {/* Product Description */}
      <div className="w-full max-w-2xl">
        <p className="mb-2 text-lg font-medium">Product Description</p>
        <textarea 
          onChange={(e) => setDescription(e.target.value)} 
          value={description} 
          className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500 min-h-25" 
          placeholder="Enter product description" 
          required
        />
      </div>

      {/* Category, SubCategory & Price */}
      <div className="w-full max-w-2xl">
        <div className="grid grid-cols-1 md:grid-cols-3 gap-4">
          <div>
            <p className="mb-2 text-lg font-medium">Category</p>
            <select 
              onChange={(e) => setCategory(e.target.value)} 
              value={category}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Men">Men</option>
              <option value="Women">Women</option>
              <option value="Kids">Kids</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-lg font-medium">Sub Category</p>
            <select 
              onChange={(e) => setSubCategory(e.target.value)} 
              value={subCategory}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500"
            >
              <option value="Topwear">Topwear</option>
              <option value="Bottomwear">Bottomwear</option>
              <option value="Winterwear">Winterwear</option>
            </select>
          </div>

          <div>
            <p className="mb-2 text-lg font-medium">Price ($)</p>
            <input 
              onChange={(e) => setPrice(e.target.value)} 
              value={price}
              className="w-full px-4 py-3 border rounded-lg focus:outline-none focus:ring-2 focus:ring-blue-500" 
              type="number" 
              placeholder="0.00"
              min="0"
              step="0.01"
              required
            />
          </div>
        </div>
      </div>

      {/* Product Sizes */}
      <div className="w-full max-w-2xl">
        <p className="mb-2 text-lg font-medium">Available Sizes</p>
        <div className="flex flex-wrap gap-3">
          {['S', 'M', 'L', 'XL', 'XXL'].map((size) => (
            <div 
              key={size}
              onClick={() => setSizes(prev => 
                prev.includes(size) 
                  ? prev.filter(item => item !== size) 
                  : [...prev, size]
              )}
              className="cursor-pointer"
            >
              <p className={`w-12 h-12 flex items-center justify-center rounded-lg font-medium transition-colors
                ${sizes.includes(size) 
                  ? 'bg-pink-300 text-white' 
                  : 'bg-gray-200 hover:bg-gray-300'
                }`}
              >
                {size}
              </p>
            </div>
          ))}
        </div>
      </div>

      {/* Best Seller Checkbox */}
      <div className="w-full max-w-2xl mt-2">
        <label className="flex items-center gap-3 cursor-pointer">
          <input 
            onChange={() => setBestSeller(prev => !prev)} 
            checked={bestSeller}
            type="checkbox" 
            className="w-5 h-5 cursor-pointer accent-blue-500"
          />
          <span className="text-lg font-medium">Add to Bestseller</span>
        </label>
      </div>

      {/* Submit Button */}
      <div className="w-full max-w-2xl mt-4">
        <button 
          type="submit" 
          className="w-full md:w-auto px-6 py-3 bg-black hover:bg-black-700 text-white font-medium  transition-colors cursor-pointer"
        >
          ADD PRODUCT
        </button>
      </div>
    </form>
  )
}

export default Add