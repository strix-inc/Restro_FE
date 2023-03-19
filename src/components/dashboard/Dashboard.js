import React, { useEffect } from 'react'
import { CgMenuBoxed } from 'react-icons/cg'
import { IoMdSearch } from 'react-icons/io'
import { VscFilePdf } from 'react-icons/vsc'
import { MdEdit } from 'react-icons/md'
import { AiFillPrinter } from 'react-icons/ai'
import axios from 'axios'


const Dashboard = (props) => {
    var api = process.env.REACT_APP_GET_RESTAURANT
    const DsItem = [
        { id: 1, name: 'Total clients', records: 2310, icons: <CgMenuBoxed /> },
        { id: 2, name: 'Top sale item', records: 2310, icons: <CgMenuBoxed /> },
        { id: 3, name: 'Lowest sale item', records: 2310, icons: <CgMenuBoxed /> },
        { id: 4, name: 'No. of clients', records: 2310, icons: <CgMenuBoxed /> },
    ]

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(api, {
            headers: headers
        }).then(val => {
            localStorage.setItem('Restaurant_name', val.data.data.display_name);
            localStorage.setItem('GSTIN', val.data.data.gstin);
            localStorage.setItem('phone', val.data.data.contact);
            localStorage.setItem('state', val.data.data.address_state);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);

    return (
        <>
            <div className='w-[80%] ml-[20%]'>
                <div className="dashboard w-[98%] m-auto mt-[4rem]">
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>Dashboard</h1>
                    <div className="records grid grid-cols-4 gap-x-4">
                        {
                            DsItem.map(item => {
                                return <div key={item.id} className={`flex gap-3 my-2 rounded-lg px-4 ${props.mode === 'black' ? 'nav_bg shadow-sm shadow-slate-700 text-white' : 'bg-white shadow-md shadow-slate-300'} py-3`}>
                                    <div className='flex justify-center items-center border rounded-full bg-green-200 h-[2.5rem] w-[2.5rem] my-auto'>
                                        <span className='text-[1.5rem]'>{item.icons}</span>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <span className={`mb-1 text-[0.9rem] font-semibold ${props.mode === 'black' ? 'text-gray-300' : 'text-gray-500'}`}>{item.name}</span>
                                        <span className="text-[1rem] font-bold">{item.records}</span>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="sale-history mt-4">
                        <h1 className={`text-[1.3rem] font-bold mx-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>Sale History</h1>
                        <div className={`sale_history_table ${props.mode === 'black' ? 'nav_bg border border-slate-700' : 'bg-white'} p-2 rounded-lg mt-1`}>
                            <div className="past_sale_search grid grid-cols-5 gap-10 mx-2">
                                <div className='col-span-2 flex items-center gap-2'>
                                    <label className='font-bold'>From</label>
                                    <input type="date" className={`border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-md w-full p-1 my-3`} />
                                </div>
                                <div className='col-span-2 flex items-center gap-2'>
                                    <label className='font-bold'>To</label>
                                    <input type="date" className={`border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-md w-full p-1 my-3`} />
                                </div>
                                <div className='flex items-center'>
                                    <button className="btn col-span-1 w-[12rem] h-[2.5rem] text-[1rem] bg-blue-500 rounded-md text-white font-semibold border-none hover:bg-blue-600 flex justify-center items-center">
                                        <span className='mr-2'><VscFilePdf /></span>
                                        <span>Download report</span>
                                    </button>
                                </div>
                            </div>

                            <div className="past_sale_search grid grid-cols-5 gap-10 mx-2">
                                <div className='col-span-2 flex justify-between items-center gap-2'>
                                    <label className='font-bold text-[1rem]'>Order type</label>
                                    <select type="date" className={`border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-md w-[80%] p-1 my-3`} >
                                        <option value="restaurant">Restaurant</option>
                                        <option value="zomato">Zomato</option>
                                        <option value="swiggy">Swiggy</option>
                                    </select>
                                </div>
                                <div className='col-span-2 flex items-center gap-2'>
                                    <label className='font-bold text-[0.9rem]'>Payment type</label>
                                    <select type="date" className={`flex justify-end border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-md w-[75%] p-1 my-3`} >
                                        <option value="cash">Cash</option>
                                        <option value="upi">UPI</option>
                                        <option value="card">Card</option>
                                    </select>
                                </div>
                                <div className='flex items-center'>
                                    <button className="btn col-span-1 w-[12rem] h-[2.5rem] rounded-md text-blue-600 font-semibold border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all ease-in-out duration-500 flex items-center justify-center"><span className='mr-2'><IoMdSearch className='text-[1.3rem]' /></span>Search</button>
                                </div>
                            </div>

                            <div className={`sale_history_detail rounded-lg border mt-4 ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-200'}`}>
                                <ul className={`grid grid-cols-8 gap-2 p-2 font-semibold text-[0.8rem] ${props.mode === 'black' ? 'text-gray-300' : 'text-gray-500 bg-blue-100'}`}>
                                    <li>INVOICE NO.</li>
                                    <li>DATE</li>
                                    <li>SUB TOTAL</li>
                                    <li>DISCOUNT</li>
                                    <li>C.G.S.T @2.5%</li>
                                    <li>S.G.S.T @2.5%</li>
                                    <li>NET AMOUNT</li>
                                    <li>AMOUNT DUE</li>
                                </ul><hr />
                                <ul className={`grid grid-cols-8 relative ${props.mode === 'black' ? 'text-green-400' : 'text-black'} gap-2 p-2 text-[0.9rem]`}>
                                    <li className='flex gap-4 items-center'>
                                        <span>1</span>
                                        <div className="absolute mx-4
                            top-[-17px] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[-2.2rem] before:top-[4px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                            before:bg-amber-500 before:text-black before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all right-[92%]
                            hover:before:opacity-100" data-tip="Edit">
                                            <span className='cursor-pointer text-amber-600 text-[1.1rem]'><MdEdit /></span>
                                        </div>
                                        <div className="absolute 
                                        right-[89%] top-[-10px] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[1rem] before:top-[1px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                            before:bg-blue-500 before:text-white before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all
                            hover:before:opacity-100" data-tip="Print">
                                            <span className='cursor-pointer text-blue-500'><AiFillPrinter /></span>
                                        </div>
                                    </li>
                                    <li>16/02/2023</li>
                                    <li>$300</li>
                                    <li>5%</li>
                                    <li>$20</li>
                                    <li>$15</li>
                                    <li>$310</li>
                                    <li>$300</li>
                                </ul><hr />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
