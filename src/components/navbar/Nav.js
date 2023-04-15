import React, { useEffect, useState } from 'react'
import { HiSun } from 'react-icons/hi'
import { HiMoon } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'
import { GiHamburgerMenu } from 'react-icons/gi'
import { RxCross2 } from 'react-icons/rx'


const Nav = (props) => {
    const [RestaurantName, setRestaurantName] = useState('');
    const [ImageFile, setImageFile] = useState('');
    const funtion = () => {
        setTimeout(() => {
            const Restaurant = localStorage.getItem('Restaurant_name');
            setRestaurantName(Restaurant);
        }, 500);
    }
    funtion();

    const handleHAM = () => {
        props.setNavitem(true);
    }
    const handleCROSS = () => {
        props.setNavitem(false);
    }

    useEffect(() => {
        const file = localStorage.getItem('image-file');
        setImageFile(file);
    }, [])
    return (
        <>
            <nav>
                <div className={`Navbar w-full fixed ${props.mode === 'black' ? 'nav_bg z-20' : 'bg-slate-300 lg:bg-white shadow-sm shadow-slate-400 z-20'} h-12 lg:h-16 flex items-center`}>
                    <div className={`hamburger mx-2 lg:hidden ${props.mode === 'black' ? 'text-white' : 'text-black'} cursor-pointer`}>
                        {props.navitem === true ? <RxCross2 className='text-[1.5rem]' onClick={handleCROSS} /> : <GiHamburgerMenu className='text-[1.5rem]' onClick={handleHAM} />}
                        <div className={`logout lg:hidden flex flex-col justify-center items-center absolute top-4 right-[-2px] cursor-pointer ${props.mode === 'black' ? 'nav_bg text-red-600' : 'text-blue-500'} lg:mt-2 mx-2 lg:mx-0 font-bold`}>
                            <span className='text-[1.1rem]'><MdLogout onClick={props.loggedOut} /></span>
                            <small className='text-[0.8rem] hidden lg:block'>Logout</small>
                        </div>
                    </div>
                    <div className={`title ${props.mode === 'black' ? 'text-white nav_bg' : 'text-black bg-gray-100 lg:bg-transparent'} flex justify-between lg:px-4 py-1 absolute lg:static top-[3.05rem] w-[70%] lg:w-full ${props.navitem === true ? 'translate-x-[0%]' : 'translate-x-[-60rem] lg:translate-x-0'} transition-all duration-500 ease-in-out`}>
                        <div className="restaurant-logo-name flex items-center mx-2 lg:mx-0">
                            <img src={ImageFile} className='w-[30px] h-[30px] bg-blue-500 lg:w-[50px] lg:h-[50px] rounded-full object-cover border-2 border-slate-700'></img>
                            <h1 className={`Rname lg:text-[1.8rem] text-[1.3rem] ${props.mode === 'black' ? ' text-white' : 'text-black'}  p-2 font-bold`}>{RestaurantName}</h1>
                        </div>
                        <div className='flex justify-between lg:gap-12'>
                            <span className='flex flex-col justify-center items-center cursor-pointer text-blue-500 lg:mt-2'>
                                <small className='text-[1.2rem] lg:text-[1.4rem]'>
                                    {props.mode === 'black' ? <HiSun onClick={props.OnClickSun} /> : <HiMoon onClick={props.OnClickMoon} />}
                                </small>
                                <small className='text-[0.8rem] hidden lg:block font-bold tracking-[1px]'>{props.mode === 'black' ? 'Light' : 'Dark'}</small>
                            </span>
                            <div className={`logout flex flex-col justify-center items-center cursor-pointer ${props.mode === 'black' ? 'nav_bg text-red-600' : 'text-blue-500'} lg:mt-2 mx-2 lg:mx-0 font-bold`}>
                                <span className='text-[1.3rem] hidden lg:block'><MdLogout onClick={props.loggedOut} /></span>
                                <small className='text-[0.8rem] hidden lg:block'>Logout</small>
                            </div>
                        </div>

                    </div>
                </div>
            </nav>
        </>
    )
}

export default Nav
