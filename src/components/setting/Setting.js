import React, { useEffect, useState } from 'react'
import axios from 'axios'

const Setting = ({ mode }) => {
    const data = () => {
        setTimeout(() => {
            const Restaurant_Detail = localStorage.getItem('Restaurant_detail');
            const data = {
                id: Restaurant_Detail.id,
                created_at: Restaurant_Detail.created_at,
                modified_at: Restaurant_Detail.modified_at,
                is_deleted: Restaurant_Detail.is_deleted,
                display_name: Restaurant_Detail.display_name,
                contact: Restaurant_Detail.contact,
                address_country: Restaurant_Detail.address_country,
                address_state: Restaurant_Detail.address_state,
                address_city: Restaurant_Detail.address_city,
                address_street: Restaurant_Detail.address_street,
                upi_id: Restaurant_Detail.upi_id,
                gstin: Restaurant_Detail.upi_id,
                fssai_number: Restaurant_Detail.fssai_number,
            }
            return data;
        }, 1000);
    }

    const [state, setState] = useState([]);
    const [datas, setDatas] = useState(data);

    const handle = (event) => {
        const { name, value } = event.target;
        setDatas({ ...datas, [name]: value })
    }
    const submit = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.put('https://restrofin.pythonanywhere.com/auth/restaurant', datas, { headers: headers });
        setTimeout(() => {
            window.location.reload();
        }, 500);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get('https://restrofin.pythonanywhere.com/auth/restaurant', {
            headers: headers
        }).then(val => {
            localStorage.setItem('Restaurant_detail', JSON.stringify(val.data.data));
            localStorage.setItem('Restaurant_name', val.data.data.display_name);
            setState([val.data.data]);
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
                            {state.map((item, index) => {
                                return <form key={index} className={`account-setting grid grid-cols-2 pt-4 px-6 gap-4 rounded-b-md ${mode === 'black' ? 'text-white' : ''}`} onSubmit={submit}>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Restaurant name</label>
                                        <input type='text' name='display_name' defaultValue={item.display_name === null ? '' : item.display_name} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter restaurant name' onChange={(e) => handle(e)} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Contact</label>
                                        <input type='text' name='contact' defaultValue={item.contact === null ? '' : item.contact} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter contact' onChange={(e) => handle(e)} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Country</label>
                                        <input type='text' name='address_country' defaultValue={item.address_country === null ? '' : item.address_country} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter country' onChange={(e) => handle(e)} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>State</label>
                                        <input type='text' name='address_state' defaultValue={item.address_state === null ? '' : item.address_state} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter state' onChange={(e) => handle(e)} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>City</label>
                                        <input type='text' name='address_city' defaultValue={item.address_city === null ? '' : item.address_city} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter city' onChange={(e) => handle(e)} />
                                    </div>
                                    <div className='flex flex-col'>
                                        <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>Street</label>
                                        <input type='text' name='address_street' defaultValue={item.address_street === null ? '' : item.address_street} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='enter street' onChange={(e) => handle(e)} />
                                    </div>
                                    <div></div>
                                </form>
                            })}
                        </div>

                        {/* *********************************** */}
                        <div className={`details rounded-md ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'}`}>
                            {
                                state.map(item => {
                                    return <form key={item.id} className={`mt-3 grid grid-cols-2 pt-4 px-6 gap-4 rounded-b-md ${mode === 'black' ? 'text-white' : ''}`} onSubmit={submit}>
                                        <div className='flex flex-col'>
                                            <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>UPI ID</label>
                                            <input type='text' name='upi_id' defaultValue={item.upi_id === null ? '' : item.upi_id} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='123@ybl' onChange={(e) => handle(e)} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>GSTIN</label>
                                            <input type='text' name='gstin' defaultValue={item.gstin === null ? '' : item.gstin} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='21CAAXXXXXXXXX' onChange={(e) => handle(e)} />
                                        </div>
                                        <div className='flex flex-col'>
                                            <label className={`text-[0.9rem] mx-1 ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'}`}>FSSAI</label>
                                            <input type='text' name='fssai_number' defaultValue={item.fssai_number === null ? '' : item.fssai_number} className={`border ${mode === 'black' ? 'bg-transparent border-slate-500' : 'border-slate-300'} p-2 text-[0.9rem] rounded-md`} placeholder='1251xxxxxxx' onChange={(e) => handle(e)} />
                                        </div>
                                    </form>
                                })}
                        </div>
                        <div className="button mt-[8rem] mx-6">
                            <button className='w-[6rem] h-[2.5rem] text-white bg-blue-500 hover:bg-blue-600 font-bold border-none rounded-md transition-all ease-in duration-300' onClick={submit}>Submit</button>
                            <button className={`w-[6rem] h-[2.5rem] font-bold border border-slate-400 ${mode === 'black' ? 'bg-transparent text-white hover:bg-gray-200 hover:text-black' : 'bg-gray-100 hover:bg-gray-200'} rounded-md mx-4 transition-all ease-in duration-300`}>Cancel</button>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Setting
