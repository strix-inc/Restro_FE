import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';



const TableOrederedItem = ({ mode, ActiveKot, getkotTable }) => {
    var Orders_API = process.env.REACT_APP_ACTIVE_ORDERS

    const generateBill = (ActiveTableID) => {
        localStorage.setItem("ActiveKotID", ActiveTableID);
    }

    const DeleteDishFromActive = (Dish_ID) => {
        axios.delete(Orders_API, {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            data: {
                id: Dish_ID
            }
        }).then(val => {
            if (val.status === 200) {
                toast.success("Order Deleleted Successfully", {
                    position: "bottom-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                getkotTable();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            {
                ActiveKot.map(val => {
                    return <div key={val.id} className={`relative border rounded-md overflow-hidden ${mode === 'black' ? 'border-green-600 bg-transparent text-white' : 'border-slate-300 bg-blue-100'}`}>
                        <input type="checkbox" className='absolute top-0 inset-x-0 w-full h-10 opacity-0 peer' />
                        <div className='font-bold mx-3'>
                            <span className='flex items-center h-[40px]'>Table : {val.table}</span>
                        </div>
                        <div className='absolute top-3 right-3 transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                            <IoIosArrowDown />
                        </div>
                        <div className={`rounded-b-md ${mode === 'black' ? 'bg-gray-600 text-white' : 'bg-slate-100'} max-h-0 overflow-auto peer-checked:max-h-[200px] transition-all ease-in-out duration-500 scrollbar-hide`}>
                            <div className='grid grid-cols-5 p-2 text-[0.9rem] font-bold'>
                                <span className='col-span-2'>Item</span>
                                <span className='flex justify-center'>Quantity</span>
                                <span className='flex justify-center'>Plate</span>
                                <span className='flex justify-center'>Delete</span>
                            </div>
                            {
                                val.orders.map(item => {
                                    return <div key={item.id} className='grid grid-cols-5 text-[0.8rem] px-2 font-mono pb-2'>
                                        <span className='col-span-2'>{item.dish_name}</span>
                                        <span className='flex justify-center'>{item.quantity}</span>
                                        <span className='flex justify-center'>{item.size}</span>
                                        <div className="btn text-center cursor-pointer">
                                            <button className='text-white font-bold w-[2rem] h-[1.3rem] pb-2 bg-red-600 rounded-sm' onClick={() => DeleteDishFromActive(item.id)}>x</button>
                                        </div>
                                    </div>
                                })
                            }

                            <div className="generateBill">
                                <Link to="/bill">
                                    <button className='w-full h-[2rem] bg-green-600 text-white font-semibold' onClick={() => generateBill(val.id)}>Generate Bill</button>
                                </Link>
                            </div>
                        </div>
                        <ToastContainer
                            position="bottom-right"
                            autoClose={1000}
                            hideProgressBar
                            newestOnTop
                            closeOnClick
                            rtl={false}
                            pauseOnFocusLoss
                            draggable
                            pauseOnHover={false}
                            theme="dark"
                        />
                    </div>
                })
            }
        </>
    )
}

export default TableOrederedItem
