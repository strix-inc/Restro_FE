import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'
import { BiPrinter } from 'react-icons/bi'

const OrederedKT = ({ OrderTicket, setOrderPage }) => {

    // printing the ticket of Item ordered by the customer
    const printTicket = () => {
        window.print();
    }
    // Creating reference for the printout
    const ComponentRef = useRef();

    const MoveBack = () => {
        setOrderPage(false);
    }

    return (
        <>
            <div className="login_conatiner mt-[4rem] fixed bg-white w-[100%] h-[100vh] overflow-hidden z-20 top-0 left-0 border-2 border-t-slate-500">
                <ReactToPrint
                    trigger={() => <button type='button' className='flex justify-center items-center text-[1.2rem] gap-2 w-[8rem] h-[2.5rem] bg-blue-500 absolute rounded-md right-0 m-4 text-white font-semibold'><BiPrinter /> Print</button>}
                    content={() => ComponentRef.current}
                />
                <div className="back_button flex flex-col">
                    <button className="absolute text-[0.9rem] text-center w-[6rem] h-[2rem] bg-blue-500 rounded-md left-4 top-4 text-white font-semibold" onClick={MoveBack}>Back</button>
                    {/* {
                        ActiveKot.map(val => {
                            return <Link to='/bill' key={val.id} className="absolute text-[0.9rem] flex justify-center items-center w-[8rem] h-[2rem] bg-amber-500 rounded-md left-4 top-14 text-black font-semibold" onClick={() => GenerateBill(val.id)}>Generate Bill</Link>
                        })
                    } */}
                </div>
                <div className="Invoice w-[377.95px] m-auto mt-4" ref={ComponentRef} target="-blank">
                    {
                        OrderTicket.map((val, index) => {
                            return <div key={index} className="Ticket-KOT">
                                <h1 className='text-center text-[1rem] text-mono font-bold'>Kitchen Order Ticket</h1><hr />
                                <>
                                    <div className="first-box text-center my-2 grid grid-cols-2 font-mono font-bold text-[0.8rem]">
                                        <span>Table no: {val.table}</span>
                                        <span>Date : {val.date}</span>
                                        <span>Time : {val.time}</span>
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
                                            val.items.map((item, idx) => {
                                                return <li key={idx} className='grid grid-cols-6 text-center text-[0.8rem] font-mono font-bold'>
                                                    <span className='col-span-1'>{idx + 1}</span>
                                                    <span className='col-span-3'>{item.Dish_name}</span>
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

export default OrederedKT
