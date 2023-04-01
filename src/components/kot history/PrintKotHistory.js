import React, { useState, useEffect, useRef } from 'react';
import ReactToPrint from 'react-to-print'
import { BiPrinter } from 'react-icons/bi'
import axios from 'axios';

const PrintKotHistory = ({ OrderTicket }) => {
    var Order_history_API = process.env.REACT_APP_POST_ORDER

    const [kot_History, setKot_History] = useState([]);
    console.log(kot_History);

    // printing the ticket of Item ordered by the customer
    const printTicket = () => {
        window.print();
    }
    // Creating reference for the printout
    const ComponentRef = useRef();

    useEffect(() => {
        const kot_invoice_Id = localStorage.getItem("Kot_History_ID")
        const getkothistory = () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            axios.get(Order_history_API, {
                headers: headers
            }).then(val => {
                var kot = val.data.data;
                for (let i = 0; i < kot.length; i++) {
                    let kot_orders = kot[i];
                    if (kot_orders.invoice === kot_invoice_Id) {
                        setKot_History([kot[i]]);
                    }
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        getkothistory();
    }, [])

    return (
        <>
            <div className="login_conatiner mt-[4rem] fixed bg-white w-[100%] h-[100vh] overflow-hidden z-20 top-0 left-0 border-2 border-t-slate-500">
                <ReactToPrint
                    trigger={() => <button type='button' className='flex justify-center items-center text-[1.2rem] gap-2 w-[8rem] h-[2.5rem] bg-blue-500 absolute rounded-md right-0 m-4 text-white font-semibold'><BiPrinter /> Print</button>}
                    content={() => ComponentRef.current}
                />
                <div className="Invoice w-[377.95px] m-auto mt-4" ref={ComponentRef} target="-blank">
                    {
                        kot_History.map((val, index) => {
                            var localDate = new Date(val.created_at).toLocaleDateString("en-GB", {
                                localeMatcher: "best fit",
                            });
                            var localTime = new Date(val.created_at).toLocaleTimeString("en-US", {
                                localeMatcher: "best fit",
                            })
                            return <div key={index} className="Ticket-KOT">
                                <h1 className='text-center text-[1rem] text-mono font-bold'>Table Order</h1><hr />
                                <>
                                    <div className="first-box text-center my-2 grid grid-cols-2 font-mono font-bold text-[0.8rem]">
                                        <span>Table no: {val.table}</span>
                                        <span>Date : {localDate}</span>
                                        <span>Time : {localTime}</span>
                                        {/* <span>Staff : chikki-Bow</span> */}
                                    </div><hr className='border border-black' />
                                </>
                                <div className="Table my-1">
                                    <>
                                        <ul className='grid grid-cols-6 text-center font-mono font-bold text-[0.9rem]'>
                                            <li className='col-span-1'>Sl No.</li>
                                            <li className='col-span-3'>Item</li>
                                            <li className='col-span-1'>Plate</li>
                                            <li className='col-span-1'>Qty.</li>
                                        </ul><hr className='border border-black' />
                                    </>
                                    <ul className='my-2'>
                                        {
                                            val.orders.map((item, idx) => {
                                                return <li key={idx} className='grid grid-cols-6 text-center text-[0.8rem] font-mono font-bold'>
                                                    <span className='col-span-1'>{idx + 1}</span>
                                                    <span className='col-span-3'>{item.dish_name}</span>
                                                    <span className='col-span-1'>{item.size}</span>
                                                    <span className='col-span-1'>{item.quantity}</span>
                                                </li>
                                            })
                                        }
                                    </ul>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default PrintKotHistory
