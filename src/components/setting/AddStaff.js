import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { ToastContainer, toast } from 'react-toastify';
import axios from 'axios';

const AddStaff = ({ setStaffSection }) => {
    var api = process.env.REACT_APP_BASE_URL
    const [StaffName, setStaffName] = useState('');
    const [StaffContact, setStaffContact] = useState('');
    const [StaffAddress, setStaffAdress] = useState('');
    const [DateOfJoining, setDateOfJoining] = useState('');

    const handleName = (event) => {
        setStaffName(event.target.value);
    }
    const handleContact = (event) => {
        setStaffContact(event.target.value);
    }
    const handleAddress = (event) => {
        setStaffAdress(event.target.value);
    }
    const handleDateOfJoining = (event) => {
        var date = event.target.value;
        var Date = '';
        var new_date = date.split("-");
        for (let i = 0; i < new_date.length; i++) {
            Date = new_date[2] + "/" + new_date[1] + "/" + new_date[0];
        }
        setDateOfJoining(Date);
    }

    const handleFormSubmit = (event) => {
        event.preventDefault();
        let data = {
            name: StaffName,
            contact: StaffContact,
            address: StaffAddress,
            date_of_joining: DateOfJoining
        }
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.post(`${api}/kitchen/staff`, data, { headers: headers })
            .then(val => {
                if (val.status === 201) {
                    toast.success("Staff Added Successfully", {
                        position: "top-right",
                        autoClose: 1000,
                        hideProgressBar: true,
                        closeOnClick: true,
                        pauseOnHover: false,
                        draggable: true,
                        progress: undefined,
                        theme: "dark",
                    });
                    setTimeout(() => {
                        setStaffSection(false);
                    }, 1500);
                }
            });
    }

    return (
        <>
            <ToastContainer position="top-right"
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
            <div className='fixed drop-shadow-sm bg-black/50 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0'>
                <form className='absolute border border-slate-300 rounded-md w-[50%] m-auto p-3 left-[28%] top-[12rem] bg-black/70' onSubmit={handleFormSubmit}>
                    {/* <div> */}
                    <h1 className='mx-2 text-white font-bold text-[1.3rem] underline'>Add Staff</h1>
                    <div className="grid grid-cols-2 gap-y-3 mt-4">
                        <input type="text" value={StaffName} name='name' placeholder='Name' className='mx-2 p-2 border border-slate-300 rounded-md' onChange={handleName} />
                        <input type="text" value={StaffContact} name='contact' placeholder='Contact' className='mx-2 p-2 border border-slate-300 rounded-md' onChange={handleContact} />
                        <input type="text" value={StaffAddress} name='address' placeholder='Address' className='mx-2 p-2 border border-slate-300 rounded-md' onChange={handleAddress} />
                        <input type="date" name='date_of_joining' className='mx-2 p-2 border border-slate-300 rounded-md' onChange={handleDateOfJoining} />
                    </div>
                    <div className="button flex justify-end items-center gap-4 mx-2 mt-6">
                        <button type='button' className='w-[8rem] h-[2.5rem] border-2 border-red-500 flex justify-center items-center rounded-md text-red-500' onClick={() => setStaffSection(false)}>Cancel</button>
                        <button type='submit' className='w-[8rem] h-[2.5rem] hover:border-2 hover:border-green-600 flex justify-center items-center rounded-md hover:text-green-500 bg-green-600 hover:bg-black/50 text-white'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStaff
