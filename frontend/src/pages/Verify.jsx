import React, { useContext, useEffect } from 'react'
import { ShopContext } from '../context/ShopContext'
import { useSearchParams } from 'react-router'
import axios from 'axios'
import { toast } from 'react-toastify'

const Verify = () => {

  const { navigate, token, setCartItems, backendUrl } = useContext(ShopContext)

  const [searchParams] = useSearchParams()

  const success = searchParams.get('success')
  const orderId = searchParams.get('orderId')

  const verifyToken = async () => {
    try {
      if (!token) return;

      const response = await axios.post(
        backendUrl + '/api/order/verifyStripe',
        { success, orderId },
        { headers: { token } }
      )

      if (response.data.success) {
        toast.success(" Payment Successful")
        setCartItems({})
        navigate('/orders')
      } else {
        toast.error("Payment Failed")
        navigate('/cart')
      }

    } catch (error) {
      console.log(error)
      toast.error(error.message)
    }
  }

  useEffect(() => {
    verifyToken()
  }, [token]) // ✅ re-runs when token becomes available

  return (
    <div className="text-center mt-20 text-lg">
      Verifying Payment...
    </div>
  )
}

export default Verify