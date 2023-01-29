import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Setting = ({ mode }) => {

    const [datas, setDatas] = useState([]);
    // console.log(datas);

    const handle = () => {
        console.log('');
    }

    const data = async () => {
        // const api = 'https://restrofin.pythonanywhere.com/auth/restaurant';
        // const fetchdata = await fetch(api);
        // const fetchedData = await fetchdata.json();
        // console.log(fetchedData);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get('https://restrofin.pythonanywhere.com/auth/restaurant', {
            headers: headers
        }).then(val => {
            // console.log(val.data.data);
            setDatas([val.data.data]);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);
    return (
        <>
            <div className='w-[80%] ml-[20%]'>
                <div className="setting relative w-full m-auto mt-[4rem] ">
                    <h1 className={`text-[1.5rem] font-bold mx-6 py-2 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Settings</h1><hr />
                    <div className='flex flex-col mt-3'>
                        <div className={`details rounded-md ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'}`}>
                            {datas.map((item) => {
                                return <form key={item.id} className={`account-setting grid grid-cols-2 pt-4 px-6 gap-4 rounded-b-md ${mode === 'black' ? 'text-white' : ''}`}>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Restaurant name</label>
                                        <input type='text' value={item.display_name === null ? '' : item.display_name} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter restaurant name' onChange={handle} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Contact</label>
                                        <input type='text' value={item.contact === null ? '' : item.contact} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter contact' onChange={handle} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Country</label>
                                        <input type='text' value={item.address_country === null ? '' : item.address_country} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter country' onChange={handle} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>State</label>
                                        <input type='text' value={item.address_state === null ? '' : item.address_state} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter state' onChange={handle} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>City</label>
                                        <input type='text' value={item.address_city === null ? '' : item.address_city} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter city' onChange={handle} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Street</label>
                                        <input type='text' value={item.address_street === null ? '' : item.address_street} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter street' onChange={handle} />
                                    </div>
                                    <div></div>
                                </form>
                            })}
                        </div>

                        {/* *********************************** */}
                        <div className={`details rounded-md ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'}`}>
                            <form className={`mt-3 grid grid-cols-2 pt-4 px-6 gap-4 rounded-b-md ${mode === 'black' ? 'text-white' : ''}`}>
                                <div className='flex flex-col'>
                                    <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>UPI ID</label>
                                    <input type='text' className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='123@ybl' onChange={handle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>GSTIN</label>
                                    <input type='text' className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='21CAAXXXXXXXXX' onChange={handle} />
                                </div>
                                <div className='flex flex-col'>
                                    <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>FSSAI</label>
                                    <input type='text' className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='1251xxxxxxx' onChange={handle} />
                                </div>
                            </form>
                        </div>
                        <div className="button mt-[8rem] mx-6">
                            <button className='w-[6rem] h-[2.5rem] text-white bg-blue-500 hover:bg-blue-600 font-bold border-none rounded-md transition-all ease-in duration-300' onClick={data}>Submit</button>
                            <button className={`w-[6rem] h-[2.5rem] font-bold border border-slate-400 ${mode === 'black' ? 'bg-transparent text-white hover:bg-gray-200 hover:text-black' : 'bg-gray-100 hover:bg-gray-200'} rounded-md mx-4 transition-all ease-in duration-300`}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting
