import React, { useContext, useEffect, useState } from 'react'
import { ShopContext } from '../context/ShopContext'
import { assets } from '../assets/assets';
import ProductItem from '../components/ProductItem';
import Title from '../components/Title';

const Collection = () => {

    const { products,search,showSearch } = useContext(ShopContext)

    const [showFilter, SetShowFilter] = useState(false);
    const [filterProducts, setFilterProducts] = useState([])
    const [category, setCategory] = useState([])
    const [subCategory, setSubCategory] = useState([])
    const [sortType, setSortType] = useState("relavent") // ✅ ADDED

    const toggleCategory = (e) => {
        if (category.includes(e.target.value)) {
            setCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setCategory(prev => [...prev, e.target.value])
        }
    }

    const toggleSubCategory = (e) => {
        if (subCategory.includes(e.target.value)) {
            setSubCategory(prev => prev.filter(item => item !== e.target.value))
        } else {
            setSubCategory(prev => [...prev, e.target.value])
        }
    }

    // ✅ FIXED (handles refresh + filtering + sorting together)
    const applyFilterAndSort = () => {

        let productCopy = [...products];

        if(showSearch&&search)
        {
            productCopy=productCopy.filter(item=>item.name.toLowerCase().includes(search.toLowerCase()))
        }

        // If no filters selected → show all products
        if (category.length > 0) {
            productCopy = productCopy.filter(item =>
                category.includes(item.category)
            );
        }

        if (subCategory.length > 0) {
            productCopy = productCopy.filter(item =>
                subCategory.includes(item.subCategory)
            );
        }

        // Sorting
        if (sortType === "low-high") {
            productCopy.sort((a, b) => a.price - b.price);
        }

        if (sortType === "high-low") {
            productCopy.sort((a, b) => b.price - a.price);
        }

        setFilterProducts(productCopy);
    };

    // ✅ FIXED (single clean useEffect)
    useEffect(() => {
        if (products.length > 0) {
            applyFilterAndSort();
        }
    }, [category, subCategory, sortType, products,search,showSearch])

    return (
        <div className='flex flex-col sm:flex-row gap-1 sm:gap-10 pt-10 border-t'>

            {/* Filter Section */}
            <div className='min-w-60'>
                <p className='my-2 text-xl flex items-center cursor-pointer gap-2'>
                    FILTERS
                    <img
                        onClick={() => SetShowFilter(!showFilter)}
                        src={assets.dropdown_icon}
                        alt=""
                        className={`w-3 h-4 sm:hidden flex transition-transform duration-300 ${showFilter ? 'rotate-90' : ''}`}
                    />
                </p>

                {/* Categories */}
                <div className={`border border-gray-300 pl-5 py-3 mt-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>CATEGORIES</p>

                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" value={'Men'} onChange={toggleCategory} />MEN
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" value={'Women'} onChange={toggleCategory} />WOMEN
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" value={'Kids'} onChange={toggleCategory} />KIDS
                        </p>
                    </div>
                </div>

                {/* SubCategories */}
                <div className={`border border-gray-300 pl-5 py-3 my-6 ${showFilter ? '' : 'hidden'} sm:block`}>
                    <p className='mb-3 text-sm font-medium'>TYPE</p>

                    <div className='flex flex-col gap-2 text-sm font-light text-gray-700'>
                        <p className='flex gap-2'>
                            <input type="checkbox" value={'Topwear'} onChange={toggleSubCategory} />TOPWEAR
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" value={'Bottomwear'} onChange={toggleSubCategory} />BOTTOMWEAR
                        </p>
                        <p className='flex gap-2'>
                            <input type="checkbox" value={'Winterwear'} onChange={toggleSubCategory} />WINTERWEAR
                        </p>
                    </div>
                </div>
            </div>

            {/* Right Side */}
            <div className='flex-1'>
                <div className='flex justify-between text-base sm:text-2xl mb-4'>
                    <Title text1={'ALL'} text2={'COLLECTIONS'} />

                    {/* ✅ FIXED (connected select properly) */}
                    <select
                        onChange={(e) => setSortType(e.target.value)}
                        className='border border-gray-300 text-sm px-2'
                    >
                        <option value='relavent'>Sort By: Relevant</option>
                        <option value="low-high">Sort By: Low to High</option>
                        <option value='high-low'>Sort By: High to Low</option>
                    </select>
                </div>

                {/* Products */}
                <div className='grid grid-cols-2 md:grid-cols-3 lg:grid-cols-4 gap-4 gap-y-6'>
                    {
                        filterProducts.map((item, index) => (
                            <ProductItem
                                key={index}
                                id={item._id}
                                name={item.name}
                                image={item.image}
                                price={item.price}
                            />
                        ))
                    }
                </div>
            </div>
        </div>
    )
}

export default Collection