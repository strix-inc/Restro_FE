import React, { useState } from 'react'
import { HiSun } from 'react-icons/hi'
import { HiMoon } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'


const Nav = (props) => {
    const [RestaurantName, setRestaurantName] = useState('');
    const funtion = () => {
        setTimeout(() => {
            const Restaurant = localStorage.getItem('Restaurant_name');
            setRestaurantName(Restaurant);
        }, 500);
    }
    funtion();
    return (
        <>
            <nav className={`w-full fixed z-20`}>
                <div className="Navbar">
                    <div className={`title ${props.mode === 'black' ? 'nav_bg text-white' : 'bg-white text-black shadow-sm shadow-slate-400'} flex justify-between px-4 py-1`}>
                        <h1 className={`Rname text-[1.8rem]  ${props.mode === 'black' ? ' text-white' : 'text-black'}  px-2 font-bold flex justify-center items-center`}>{RestaurantName}</h1>
                        <div className='flex justify-between gap-12'>
                            <span className='flex flex-col justify-center items-center cursor-pointer text-blue-500 mt-4'>
                                <small className='text-[1.4rem]'>
                                    {props.mode === 'black' ? <HiSun onClick={props.OnClickSun} /> : <HiMoon onClick={props.OnClickMoon} />}
                                </small>
                                <small className='text-[0.8rem] font-bold tracking-[1px]'>{props.mode === 'black' ? 'Dark' : 'Light'}</small>
                            </span>
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
