import React, { useEffect, useRef, useState } from 'react'
import ReactToPrint from 'react-to-print'
import { BiPrinter } from 'react-icons/bi'
import IMG from '../Images/paapi.png'
import { useLocation } from 'react-router'


const GeneratedInvoice = (props) => {

    const [Invoices, setInvoices] = useState([]);
    // console.log(Invoices);

    // printing the ticket of Item ordered by the customer
    const printTicket = () => {
        window.print();
    }
    // Creating reference for the printout
    const ComponentRef = useRef();

    useEffect(() => {
        const get = () => {
            const value = JSON.parse(localStorage.getItem('invoice_data'));
            setInvoices(value);
        }
        get();
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
                        Invoices.map((val, index) => {
                            return <div key={index} className="">
                                <div className="logo flex justify-center items-center mb-4">
                                    <img src={IMG} alt="Loading.." />
                                </div>
                                <>
                                    <h1 className='text-center text-[1rem] font-mono font-bold'>{localStorage.getItem('Restaurant_name')}</h1>
                                    <div className='flex flex-col'>
                                        <span className='text-center text-[0.85rem] font-mono font-bold'>GSTIN: {localStorage.getItem("GSTIN")}</span>
                                        <span className='text-center text-[0.85rem] font-mono font-bold'>Mob: {localStorage.getItem('phone')}</span>
                                    </div><hr />
                                </>
                                <small></small>
                                {
                                    val.Info.map((info, index) => {
                                        return <div key={index}>
                                            <div className="first-box text-center my-2 grid grid-cols-2 font-mono font-bold text-[0.8rem] leading-4">
                                                <span>Bill No : 2304</span>
                                                <span>Date : {info.date}</span>
                                                <span>Table no: {info.table}</span>
                                                <span>Time : {info.time}</span>
                                                <span>Customer : {info.customer}</span>
                                                <span>Mode : {info.mode}</span>
                                                <span>State : {localStorage.getItem("state")}</span>
                                            </div><hr />
                                        </div>
                                    })
                                }
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
                                        val.rates.map((rate, idx) => {
                                            return <div key={idx} className=''>
                                                <ul>
                                                    <li className='grid grid-cols-6 text-center text-[0.8rem] font-mono font-bold'>
                                                        <span className='col-span-1'>{idx + 1}</span>
                                                        <span className='col-span-2'>{rate.name}</span>
                                                        <span className='col-span-1'>{rate.cost}</span>
                                                        <span className='col-span-1'>{rate.quantity}</span>
                                                        <span className='col-span-1'>{rate.cost * rate.quantity}</span>
                                                    </li>
                                                </ul>
                                            </div>
                                        })
                                    }
                                </div><hr />
                                {
                                    val.total_price.map((price, indx) => {
                                        return <div key={indx} className='grid grid-cols-3 font-mono font-bold text-[0.75rem] mt-2'>
                                            <div className='col-span-1'></div>
                                            <div className='col-span-2 Total_amount mx-8 flex flex-col items-end'>
                                                <span className='my-2'>SubTotal : Rs. {price.subTotal}</span>
                                                <span>SGST @2.5% : Rs. {price.sgst}</span>
                                                <span>CGST @2.5% : Rs. {price.cgst}</span>
                                                <span>---------------------</span>
                                                <span>Net Amount : Rs. {price.grand_total}</span>
                                            </div>
                                        </div>
                                    })
                                }
                                <div className="fun_fact flex flex-col text-[0.8rem] font-mono font-bold items-center mt-8">
                                    <span>Thank You for Visiting </span>
                                    <span>Have a Nice Day </span>
                                    <span className='my-3'>Designed & Developed by : strix.co.in</span>
                                </div>
                            </div>
                        })
                    }
                </div>
            </div>
        </>
    )
}

export default GeneratedInvoice
