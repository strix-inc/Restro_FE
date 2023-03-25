import React, { useEffect, useState } from 'react'
import { ImUserCheck } from 'react-icons/im'
import { HiUserGroup } from 'react-icons/hi'
import { IoFastFood } from 'react-icons/io5'
import { IoMdSearch } from 'react-icons/io'
import { VscFilePdf } from 'react-icons/vsc'
import { MdEdit } from 'react-icons/md'
import { AiFillPrinter } from 'react-icons/ai'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'


const Dashboard = (props) => {
    var api = process.env.REACT_APP_GET_RESTAURANT

    const [AllSaleHistory, setAllSaleHistory] = useState([]);
    const [loading, setLoading] = useState(false);
    const DsItem = [
        { id: 1, name: 'Best Customer', records: 2310, icons: <ImUserCheck />, bg: 'bg-green-300' },
        { id: 2, name: 'Top sale item', records: 2310, icons: <IoFastFood />, bg: 'bg-red-300' },
        { id: 3, name: 'Lowest sale item', records: 2310, icons: <IoFastFood />, bg: 'bg-blue-300' },
        { id: 4, name: 'Total Customer', records: 2310, icons: <HiUserGroup />, bg: 'bg-amber-300' },
    ]

    const handleEditSaleHistory = (id) => {
        localStorage.setItem('ActiveKotID', id);
    }

    const handleSaleHistory = (id) => {
        localStorage.setItem("Sale_History_ID", id);
    }

    const SaleHistory = () => {
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get('https://restrofin.pythonanywhere.com/finance/invoice?finalized=True', {
            headers: headers
        }).then(val => {
            setAllSaleHistory(val.data.data);
            if (val.status === 200) {
                setLoading(false);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(api, {
            headers: headers
        }).then(val => {
            localStorage.setItem('Restaurant_name', val.data.data.display_name);
            localStorage.setItem('street', val.data.data.address_street);
            localStorage.setItem('phone', val.data.data.contact);
            localStorage.setItem('gstin', val.data.data.gstin);
            localStorage.setItem('city', val.data.data.address_city);
            localStorage.setItem('state', val.data.data.address_state);
        }).catch(function (error) {
            console.log(error);
        });
        SaleHistory();
    }, []);


    return (
        <>
            <div className='w-[80%] ml-[20%]'>
                <div className="dashboard w-[98%] m-auto mt-[4rem]">
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>Dashboard</h1>
                    <div className="records grid grid-cols-4 gap-x-4">
                        {
                            DsItem.map(item => {
                                return <div key={item.id} className={`flex gap-3 my-2 rounded-lg px-4 ${props.mode === 'black' ? 'nav_bg border border-slate-500 shadow-lg shadow-slate-700 text-white' : 'bg-white shadow-md shadow-slate-300'} py-3`}>
                                    <div className={`flex justify-center items-center border rounded-full ${item.bg} h-[2.5rem] w-[2.5rem] my-auto`}>
                                        <span className='text-[1.3rem] text-black m-2'>{item.icons}</span>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <span className={`text-[0.9rem] font-semibold ${props.mode === 'black' ? 'text-gray-300' : 'text-gray-500'}`}>{item.name}</span>
                                        <span className="text-[1rem] font-bold">{item.records}</span>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="sale-history mt-4">
                        <h1 className={`text-[1.3rem] font-bold mx-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>Sale History</h1>
                        <div className={`sale_history_table ${props.mode === 'black' ? 'nav_bg border border-slate-700' : 'bg-white'} p-2 rounded-lg mt-1`}>
                            <div className={`past_sale_search grid grid-cols-5 gap-10 mx-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>
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

                            <div className={`past_sale_search grid grid-cols-5 gap-10 mx-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>
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

                            <div className={`grid grid-cols-10 gap-2 p-2 mt-4 font-semibold text-[0.8rem] ${props.mode === 'black' ? 'text-white bg-blue-500 border-slate-600' : 'text-black bg-blue-200 border border-slate-200 border-b-0'} z-5`}>
                                <span className='col-span-2'>INVOICE NO.</span>
                                <span className='flex justify-center items-center col-span-2'>DATE</span>
                                <span className='flex justify-center items-center'>SUB TOTAL</span>
                                <span className='flex justify-center items-center'>DISCOUNT</span>
                                <span className='flex justify-center items-center'>C.G.S.T @2.5%</span>
                                <span className='flex justify-center items-center'>S.G.S.T @2.5%</span>
                                <span className='flex justify-center items-center'>NET AMOUNT</span>
                                <span className='flex justify-center items-center'>TOTAL</span>
                            </div>
                            <div className={`sale_history_detail rounded-sm border border-t-0 ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-200'} overflow-auto scrollbar-hide h-[290px]`}>
                                {loading && <span className='flex justify-center item-center my-2'><Spinner mode={props.mode} /></span>}
                                {
                                    AllSaleHistory.map((val, index) => {
                                        var localDate = new Date(val.created_at).toLocaleString("en-US", {
                                            localeMatcher: "best fit",
                                        })
                                        return <ul key={index} className={`grid grid-cols-10 relative ${props.mode === 'black' ? 'text-black' : 'text-black'} ${index % 2 != 0 ? 'bg-gray-300' : 'bg-slate-100'} gap-2 p-2 text-[0.9rem]`}>
                                            <li className='flex gap-4 items-center col-span-2'>
                                                <span className='font-bold'>{index + 1}</span>
                                                <div className="absolute mx-4
                            top-[-18px] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[-2.2rem] before:top-[14px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                            before:bg-amber-500 before:text-black before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all right-[92%] before:z-20
                            hover:before:opacity-100" data-tip="Edit">
                                                    <Link to='/bill' target='_blank' rel='nonrefer' className='cursor-pointer text-amber-600 text-[1.1rem]'><MdEdit onClick={() => handleEditSaleHistory(val.id)} /></Link>
                                                </div>
                                                <div className="absolute 
                                        right-[89%] top-[-10px] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[1rem] before:top-[8px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                                        before:bg-blue-500 before:text-white before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all
                                        hover:before:opacity-100" data-tip="Print">
                                                    <Link to='/salehistory' target="_blank" rel="noreferrer" className='cursor-pointer text-blue-500'><AiFillPrinter onClick={() => handleSaleHistory(val.id)} /></Link>
                                                </div>
                                            </li>
                                            <li className='col-span-2 font-semibold'>{localDate}</li>
                                            <li className='flex justify-center items-center'>{val.subtotal}</li>
                                            <li className='flex justify-center items-center'>{val.discount} %</li>
                                            <li className='flex justify-center items-center'>{val.cgst}</li>
                                            <li className='flex justify-center items-center'>{val.sgst}</li>
                                            <li className='flex justify-center items-center'>{((val.subtotal) - (val.subtotal) * (val.discount / 100))}</li>
                                            <li className='flex justify-center items-center'>{val.total}</li>
                                        </ul>
                                    })
                                }
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
