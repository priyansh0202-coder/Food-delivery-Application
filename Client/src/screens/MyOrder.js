import React, { useEffect, useState } from 'react';
import axios from 'axios';
import Navbar from '../components/Navbar';
import Footer from '../components/Footer';

export default function MyOrder() {
    const [orderData, setOrderData] = useState(null);
    // console.log("order", orderData)

    const fetchMyOrder = async () => {
        try {
            const userEmail = localStorage.getItem('userEmail');
            if (!userEmail) {
                console.error("User email not found in localStorage");
                return;
            }

            const response = await axios.post("http://localhost:5000/api/myOrderData", {
                email: userEmail
            }, {
                headers: {
                    'Content-Type': 'application/json'
                }
            });

            setOrderData(response.data.orderData);
        } catch (error) {
            console.error("Error fetching order data:", error.response ? error.response.data : error.message);
        }
    };

    useEffect(() => {
        fetchMyOrder();
    }, []);

    return (
        <div>
            <div>
                <Navbar />
            </div>

            <div className='container'>
                <div className='row'>
                    {orderData && orderData.order_data ? orderData.order_data.slice(0).reverse().map((order, index) => (
                        <div key={index}>

                            <div className='m-auto mt-5'>
                                <hr />
                                <h4>Order Date: {order[0]?.Order_date}</h4>
                            </div>
                            <div className='row'>
                                {order.map((item, idx) => item.Order_date ? null : (
                                    <div key={idx} className='col-12 col-md-6 col-lg-3'>
                                        <div className="card mt-3" style={{ width: "16rem", maxHeight: "360px" }}>
                                            <img src={item.img} className="card-img-top" alt={item.name} style={{ height: "120px", objectFit: "fill" }} />
                                            <div className="card-body">
                                                <h5 className="card-title">{item.name}</h5>
                                                <div className='container w-100 p-0' style={{ height: "38px" }}>
                                                    <span className='m-1'>{item.qty}</span>
                                                    <span className='m-1'>{item.size}</span>
                                                    <div className='d-inline ms-2 h-100 w-20 fs-5'>
                                                        ₹{item.price}/-
                                                    </div>
                                                </div>
                                            </div>
                                        </div>
                                    </div>
                                ))}
                            </div>
                        </div>
                    )) : <div>No orders found</div>}
                </div>
            </div>

            <Footer />
        </div>
    );
}