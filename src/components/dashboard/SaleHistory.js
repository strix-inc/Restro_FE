import React, { useState, useRef, useEffect } from 'react';
import ReactToPrint from 'react-to-print'
import { BiPrinter } from 'react-icons/bi'
import axios from 'axios'


const SaleHistory = () => {

    const [Get_oneSaleHistory, setGet_oneSaleHistory] = useState([]);


    // printing the ticket of Item ordered by the customer
    const printTicket = () => {
        window.print();
    }
    // Creating reference for the printout
    const ComponentRef = useRef();

    const GetSaleHistory = () => {
        const id = localStorage.getItem('Sale_History_ID');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`https://restrofin.pythonanywhere.com/finance/invoice?id=${id}`, {
            headers: headers
        }).then(val => {
            setGet_oneSaleHistory([val.data.data]);
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        GetSaleHistory();
    }, []);

    return (
        <>
            <div className="login_conatiner mt-[4rem] fixed bg-white w-[100%] h-[100vh] overflow-hidden z-20 top-0 left-0 border-2 border-t-slate-500">
                <ReactToPrint
                    trigger={() => <button type='button' className='flex justify-center items-center text-[1.2rem] gap-2 w-[8rem] h-[2.5rem] bg-blue-500 absolute rounded-md right-0 m-4 text-white font-semibold'><BiPrinter /> Print</button>}
                    content={() => ComponentRef.current}
                />
                <div className="Invoice w-[377.95px] border m-auto mt-4" ref={ComponentRef} target="-blank">
                    {
                        Get_oneSaleHistory.map((val, index) => {
                            var localDate = new Date(val.created_at).toLocaleDateString("en-GB", {
                                localeMatcher: "best fit",
                            });
                            var localTime = new Date(val.created_at).toLocaleTimeString("en-US", {
                                localeMatcher: "best fit",
                            });
                            return <div key={index} className="">
                                <>
                                    <h1 className='text-center text-[2rem] tracking-[-1px] font-mono font-bold'>{localStorage.getItem('Restaurant_name')}</h1>
                                    <div className='flex text-[0.7rem] justify-center leading-3'>
                                        <span className='font-mono font-bold'>{localStorage.getItem('street') === 'null' ? '' : localStorage.getItem('street')}</span>
                                        <span className='font-mono font-bold mx-1'>{localStorage.getItem('city') === 'null' ? '' : localStorage.getItem('city')}</span>
                                        <span className='font-mono font-bold'>{localStorage.getItem('state') === 'null' ? '' : localStorage.getItem('state')}</span>
                                    </div>
                                    <div className='grid text-[0.8rem] text-center'>
                                        <span className='font-mono font-bold'>Mob: {localStorage.getItem('phone') ? localStorage.getItem('phone') : ''}</span>
                                        <span className='font-mono font-bold'>GSTIN: {localStorage.getItem('gstin') === 'null' ? '' : localStorage.getItem('gstin')}</span>
                                        <span className='font-mono font-bold'>HSN / SAC: 996331</span>
                                    </div><hr />
                                </>
                                <div>
                                    <div className="first-box ml-8 my-2 grid grid-cols-2 font-mono font-bold text-[0.7rem] leading-4">
                                        <span>Invoice No : {val.invoice_number_full}</span>
                                        <span className='ml-2'>Table no: {val.table}</span>
                                        <span>Date : {localDate}</span>
                                        <span className='ml-2'>Time : {localTime}</span>
                                        <span>Customer : {val.customer}</span>
                                        <span className='ml-2'>Mode : {val.payment_type}</span>
                                    </div><hr />
                                </div>
                                <div className="Table my-1">
                                    <>
                                        <ul className='grid grid-cols-6 text-center font-mono font-bold text-[0.8rem] my-1'>
                                            <li className='col-span-1'>Sl No.</li>
                                            <li className='col-span-2'>Item</li>
                                            <li className='col-span-1'>Rate</li>
                                            <li className='col-span-1'>Qty</li>
                                            <li className='col-span-1'>Amount</li>
                                        </ul><hr />
                                    </>
                                    {
                                        val.orders.map((rate, idx) => {
                                            return <div key={idx} className=''>
                                                <ul>
                                                    <li className='grid grid-cols-6 text-center text-[0.8rem] font-mono font-bold'>
                                                        <span className='col-span-1'>{idx + 1}</span>
                                                        <span className='col-span-2'>{rate.dish_description}</span>
                                                        <span className='col-span-1'>{rate.cost}</span>
                                                        <span className='col-span-1'>{rate.quantity}</span>
                                                        <span className='col-span-1'>{rate.cost * rate.quantity}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        })
                                    }
                                </div><hr />
                                <div className='grid grid-cols-3 font-mono font-bold text-[0.75rem] mt-2'>
                                    <div className='col-span-1'></div>
                                    <div className='col-span-2 Total_amount mx-8 flex flex-col items-end'>
                                        <span className='my-2'>SubTotal : Rs. {val.subtotal}</span>
                                        <span>Discount (%) : {val.discount} %</span>
                                        <span>SGST @2.5% : Rs. {val.sgst}</span>
                                        <span>CGST @2.5% : Rs. {val.cgst}</span>
                                        <span>---------------------</span>
                                        <span>Grand Total : Rs. {val.total}</span>
                                    </div>
                                </div>
                                <div className="fun_fact flex flex-col text-[0.8rem] font-mono font-bold items-center mt-8">
                                    <span>Thank You for Visiting </span>
                                    <span>Have a Nice Day </span>
                                    <span className='my-3'>Restrofin by : strix.co.in</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default SaleHistory
