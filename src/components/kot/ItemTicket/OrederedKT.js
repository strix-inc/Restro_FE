import React, { useRef } from 'react'
import ReactToPrint from 'react-to-print'

const OrederedKT = () => {

    // Dummy data receiving from Backend 
    const OrederedItem = [
        { item: 'Chicken Biryani', plate: 1, quantity: 2 },
        { item: 'Soft drink', plate: 1, quantity: 2 },
        { item: 'Ice-Cream', plate: 1, quantity: 1 }
    ]

    // printing the ticket of Item ordered by the customer
    const printTicket = () => {
        window.print();
    }
    // Creating reference for the printout
    const ComponentRef = useRef();


    return (
        <>
            <div className="login_conatiner fixed bg-white w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0">
                <ReactToPrint
                    trigger={() => <button className='text-[1.5rem] text-center w-[8rem] h-[2.5rem] bg-blue-500 absolute rounded-md right-0 m-4 text-white font-semibold'>Print</button>}
                    content={() => ComponentRef.current}
                />
                <div className="Invoice w-[377.95px] m-auto" ref={ComponentRef} target="-blank">
                    <div className="Ticket-KOT border">
                        <h1 className='text-center text-[1rem] font-semibold'>Kitchen Order Ticket</h1><hr />
                        <div className="first-box text-center mt-2 grid grid-cols-2 font-semibold text-[0.8rem]">
                            <span>Table no: 7</span>
                            <span>Date : 12/01/2023</span>
                            <span>Time : 10:41 AM</span>
                            <span>Staff : chikki-Bow</span>
                        </div>
                        <hr />
                        <div className="Table">
                            <ul className='grid grid-cols-6 border-2 text-center font-semibold text-[0.9rem]'>
                                <li className='col-span-1'>Sl No.</li>
                                <li className='col-span-3'>Item</li>
                                <li className='col-span-1'>Plate</li>
                                <li className='col-span-1'>Qty.</li>
                            </ul>
                            <ul className=''>
                                {
                                    OrederedItem.map((val, index) => {
                                        return <li className='grid grid-cols-6 border-2 text-center text-[0.8rem]' key={index}>
                                            <span className='col-span-1'>{index + 1}</span>
                                            <span className='col-span-3'>{val.item}</span>
                                            <span className='col-span-1'>{val.plate}</span>
                                            <span className='col-span-1'>{val.quantity}</span>
                                        </li>
                                    })
                                }
                            </ul>
                        </div>
                        <hr />
                    </div>
                </div>
            </div>
        </>
    )
}

export default OrederedKT
