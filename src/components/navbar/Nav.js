import React, { useEffect, useState } from 'react'
// import { HiSun } from 'react-icons/hi'
// import { HiMoon } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import axios from 'axios'


const Nav = (props) => {
    const [RestaurantName, setRestaurantName] = useState('');
    const funtion = () => {
        setTimeout(() => {
            const Restaurant = localStorage.getItem('Restaurant_name');
            setRestaurantName(Restaurant);
        }, 1000);
    }
    funtion();

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get('https://restrofin.pythonanywhere.com/auth/restaurant', {
            headers: headers
        }).then(val => {
            localStorage.setItem('Restaurant_name', val.data.data.display_name);
        }).catch(function (error) {
            console.log(error);
        });
    }, []);
    return (
        <>
            <nav className={`w-full fixed z-10`}>
                <div className="Navbar">
                    <div className={`title ${props.mode === 'black' ? 'nav_bg text-white' : 'bg-white text-black shadow-sm shadow-slate-400'} flex justify-between px-4 py-1`}>
                        <h1 className='Rname text-[2rem] text-black px-2 font-bold flex justify-center items-center'>{RestaurantName}</h1>
                        <div className='flex justify-between gap-12'>
                            {/* <span className='flex justify-center items-center text-[1.4rem] cursor-pointer text-blue-500'>{props.mode === 'black' ? <HiSun onClick={props.OnClickSun} /> : <HiMoon onClick={props.OnClickMoon} />}</span> */}
                            <div className={`logout flex flex-col justify-center items-center cursor-pointer ${props.mode === 'black' ? 'nav_bg text-red-600' : 'bg-white text-blue-500'} mt-4 font-bold`}>
                                <span className='text-[1.3rem]'><MdLogout onClick={props.loggedOut} /></span>
                                <small className='text-[0.8rem]'>Logout</small>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
