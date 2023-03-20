import React, { useEffect, useState } from 'react';
import { AiFillPrinter } from 'react-icons/ai';
import axios from 'axios';

const KotHistory = (props) => {
    var Order_history_API = process.env.REACT_APP_POST_ORDER

    const [kothistory, setKotHistory] = useState([]);

    useEffect(() => {
        const getkothistory = () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            axios.get(Order_history_API, {
                headers: headers
            }).then(val => {
                setKotHistory(val.data.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
        getkothistory();
    }, [])
    return (
        <>
            <div className="w-[80%] ml-[20%]">
                <div className="KotHistory w-[98%] m-auto mt-[4rem]">
                    <h1 className={`text-[1.5rem] font-bold mx-1 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>KOT History</h1>
                    <div className={`mt-2 rounded-md border ${props.mode === 'black' ? 'nav_bg text-white border-slate-600' : 'bg-white border-slate-300'}`}>
                        <div className={`title-heading grid grid-cols-2 font-semibold text-[1rem] p-2 ${props.mode === 'black' ? 'text-gray-300 bg-black/50' : 'text-gray-500 bg-blue-100'}`}>
                            <span>Date & Time</span>
                            <span>Table No.</span>
                        </div><hr />
                        {
                            kothistory.map((val, index) => {
                                var localDate = new Date(val.created_at).toLocaleString("en-US", {
                                    localeMatcher: "best fit",
                                })
                                return <div key={index} className={`kot_history_content grid grid-cols-2 p-2 ${index % 2 !== 0 ? 'bg-black/10' : ''}`}>
                                    <span className='text-[0.9rem]'>{localDate}</span>
                                    <div className="grid grid-cols-2">
                                        <span className='mx-4'>{val.table}</span>
                                        <button className="w-[4rem] h-[2rem] flex flex-col justify-center items-center rounded-md bg-blue-100 border border-blue-500 text-black text-[1.2rem">
                                            <span className='cursor-pointer text-blue-500'><AiFillPrinter /></span>
                                            <small className='text-[0.6rem] font-bold tracking-[0.1rem]'>Print</small>
                                        </button>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                </div>
            </div>
        </>
    )
}

export default KotHistory
