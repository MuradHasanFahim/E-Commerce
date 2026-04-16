import React from "react";
import { useState, useEffect } from "react";
import { toast } from "react-toastify";
import axios from "axios";
import { backendUrl } from "../App.jsx";
import { assets } from "../assets/assets";

const statusConfig = {
  "Order Placed": { color: "#6366f1", bg: "#eef2ff", dot: "#6366f1" },
  Packing: { color: "#f59e0b", bg: "#fffbeb", dot: "#f59e0b" },
  Shipped: { color: "#3b82f6", bg: "#eff6ff", dot: "#3b82f6" },
  "Out for Delivery": { color: "#8b5cf6", bg: "#f5f3ff", dot: "#8b5cf6" },
  Delivered: { color: "#10b981", bg: "#ecfdf5", dot: "#10b981" },
};

const Orders = ({ token }) => {
  const [orders, setOrders] = useState([]);

  const fetchAllOrders = async () => {
    if (!token) return;

    try {
      const response = await axios.post(
        backendUrl + "/api/order/list",
        {},
        { headers: { token } }
      );

      if (response.data.success) {
        setOrders(response.data.orders);
      } else {
        toast.error(response.data.message);
      }
    } catch (error) {
      toast.error(error.message);
    }
  };

  const statusHandler=async(e,orderId )=>{
    try{
      const response=await axios.post(backendUrl+'/api/order/status',{orderId,status:e.target.value},{headers:{token}})
      if(response.data.success){
        await fetchAllOrders();

      }

    }
    catch(error){
      console.log(error);
      toast.error(response.data.message);
      
    }
  }

  useEffect(() => {
    fetchAllOrders();
  }, [token]);

  return (
    <>
      <style>{`
        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@300;400;500;600;700&family=DM+Mono:wght@400;500&display=swap');

        .orders-root {
          font-family: 'DM Sans', sans-serif;
          background: #f8f9fb;
          min-height: 100vh;
          padding: 32px 28px;
        }

        .orders-header {
          display: flex;
          align-items: center;
          justify-content: space-between;
          margin-bottom: 28px;
        }

        .orders-title {
          font-size: 22px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.4px;
        }

        .orders-count {
          font-size: 13px;
          font-weight: 500;
          color: #64748b;
          background: #e2e8f0;
          padding: 4px 12px;
          border-radius: 20px;
        }

        .orders-empty {
          text-align: center;
          padding: 80px 20px;
          color: #94a3b8;
        }

        .orders-empty-icon {
          font-size: 48px;
          margin-bottom: 16px;
        }

        .orders-empty-text {
          font-size: 15px;
          font-weight: 500;
        }

        .order-card {
          background: #ffffff;
          border: 1px solid #e8ecf0;
          border-radius: 14px;
          padding: 20px 24px;
          margin-bottom: 14px;
          display: grid;
          grid-template-columns: 52px 1fr auto;
          gap: 20px;
          align-items: start;
          transition: box-shadow 0.2s ease, border-color 0.2s ease;
        }

        .order-card:hover {
          box-shadow: 0 4px 20px rgba(0,0,0,0.07);
          border-color: #d1d9e0;
        }

        .order-icon-wrap {
          width: 52px;
          height: 52px;
          background: #f1f5f9;
          border-radius: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          flex-shrink: 0;
        }

        .order-icon-wrap img {
          width: 26px;
          height: 26px;
          opacity: 0.7;
        }

        .order-body {
          min-width: 0;
        }

        .order-items-list {
          margin-bottom: 10px;
        }

        .order-item-line {
          font-size: 14px;
          color: #1e293b;
          line-height: 1.7;
        }

        .order-item-name {
          font-weight: 600;
        }

        .order-item-qty {
          color: #475569;
        }

        .order-item-size {
          font-family: 'DM Mono', monospace;
          font-size: 11px;
          background: #f1f5f9;
          color: #64748b;
          padding: 1px 6px;
          border-radius: 4px;
          margin-left: 4px;
        }

        .order-divider {
          height: 1px;
          background: #f1f5f9;
          margin: 12px 0;
        }

        .order-customer {
          font-size: 14px;
          font-weight: 600;
          color: #0f172a;
          margin-bottom: 4px;
        }

        .order-address-label {
          font-size: 11px;
          font-weight: 600;
          text-transform: uppercase;
          letter-spacing: 0.7px;
          color: #94a3b8;
          margin-bottom: 5px;
        }

        .order-address-text {
          font-size: 13px;
          color: #475569;
          line-height: 1.6;
        }

        .order-phone {
          font-size: 13px;
          color: #475569;
          margin-top: 4px;
        }

        .order-meta {
          display: flex;
          flex-direction: column;
          gap: 8px;
          min-width: 175px;
          align-items: flex-end;
        }

        .order-amount {
          font-size: 20px;
          font-weight: 700;
          color: #0f172a;
          letter-spacing: -0.5px;
        }

        .meta-grid {
          display: flex;
          flex-direction: column;
          gap: 5px;
          width: 100%;
        }

        .meta-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 12px;
        }

        .meta-label {
          font-size: 12px;
          color: #94a3b8;
          font-weight: 500;
          white-space: nowrap;
        }

        .meta-value {
          font-size: 12px;
          color: #334155;
          font-weight: 500;
          text-align: right;
        }

        .payment-badge {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          font-size: 11px;
          font-weight: 600;
          padding: 2px 8px;
          border-radius: 20px;
        }

        .payment-badge.done {
          background: #dcfce7;
          color: #16a34a;
        }

        .payment-badge.pending {
          background: #fef9c3;
          color: #a16207;
        }

        .status-select-wrap {
          width: 100%;
          margin-top: 6px;
        }

        .status-select {
          width: 100%;
          font-family: 'DM Sans', sans-serif;
          font-size: 12px;
          font-weight: 600;
          padding: 7px 10px;
          border-radius: 8px;
          border: 1.5px solid #e2e8f0;
          background: #f8f9fb;
          color: #0f172a;
          cursor: pointer;
          appearance: none;
          background-image: url("data:image/svg+xml,%3Csvg xmlns='http://www.w3.org/2000/svg' width='12' height='12' viewBox='0 0 24 24' fill='none' stroke='%2394a3b8' stroke-width='2.5' stroke-linecap='round' stroke-linejoin='round'%3E%3Cpolyline points='6 9 12 15 18 9'/%3E%3C/svg%3E");
          background-repeat: no-repeat;
          background-position: right 10px center;
          padding-right: 30px;
          transition: border-color 0.2s ease;
        }

        .status-select:focus {
          outline: none;
          border-color: #6366f1;
          box-shadow: 0 0 0 3px rgba(99,102,241,0.1);
        }

        .status-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          display: inline-block;
          margin-right: 5px;
          background: #94a3b8;
        }

        @media (max-width: 768px) {
          .orders-root {
            padding: 20px 16px;
          }
          .order-card {
            grid-template-columns: 1fr;
            gap: 14px;
          }
          .order-icon-wrap {
            display: none;
          }
          .order-meta {
            align-items: flex-start;
            min-width: unset;
          }
        }
      `}</style>

      <div className="orders-root">
        <div className="orders-header">
          <h2 className="orders-title">Orders</h2>
          {orders.length > 0 && (
            <span className="orders-count">{orders.length} total</span>
          )}
        </div>

        {orders.length === 0 ? (
          <div className="orders-empty">
            <div className="orders-empty-icon">📦</div>
            <p className="orders-empty-text">No orders found.</p>
          </div>
        ) : (
          <div>
            {orders.map((order, idx) => (
              <div key={idx} className="order-card">
                {/* Icon */}
                <div className="order-icon-wrap">
                  <img src={assets.parcel_icon} alt="Parcel" />
                </div>

                {/* Items & Address */}
                <div className="order-body">
                  <div className="order-items-list">
                    {order.items.map((item, index) => (
                      <p key={index} className="order-item-line">
                        <span className="order-item-name">{item.name}</span>{" "}
                        <span className="order-item-qty">× {item.quantity}</span>
                        <span className="order-item-size">{item.size}</span>
                      </p>
                    ))}
                  </div>

                  <div className="order-divider" />

                  <p className="order-customer">
                    {order.address.firstName} {order.address.lastName}
                  </p>

                  <p className="order-address-label">Shipping Address</p>
                  <div className="order-address-text">
                    <p>{order.address.street}</p>
                    <p>
                      {order.address.city}, {order.address.state}{" "}
                      {order.address.zipcode}
                    </p>
                    <p>{order.address.country}</p>
                  </div>
                  <p className="order-phone">📞 {order.address.phone}</p>
                </div>

                {/* Meta & Status */}
                <div className="order-meta">
                  <p className="order-amount">${order.amount}</p>

                  <div className="meta-grid">
                    <div className="meta-row">
                      <span className="meta-label">Items</span>
                      <span className="meta-value">{order.items.length}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Method</span>
                      <span className="meta-value">{order.paymentMethod}</span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Payment</span>
                      <span
                        className={`payment-badge ${order.payment ? "done" : "pending"}`}
                      >
                        {order.payment ? "✓ Paid" : "⏳ Pending"}
                      </span>
                    </div>
                    <div className="meta-row">
                      <span className="meta-label">Date</span>
                      <span className="meta-value">
                        {new Date(order.date).toLocaleDateString()}
                      </span>
                    </div>
                  </div>

                  <div className="status-select-wrap">
                    <select onChange={(e)=>statusHandler(e,order._id)} value={order.status}  className="status-select">
                      <option value="Order Placed">Order Placed</option>
                      <option value="Packing">Packing</option>
                      <option value="Shipped">Shipped</option>
                      <option value="Out for Delivery">Out for Delivery</option>
                      <option value="Delivered">Delivered</option>
                    </select>
                  </div>
                </div>
              </div>
            ))}
          </div>
        )}
      </div>
    </>
  );
};

export default Orders;