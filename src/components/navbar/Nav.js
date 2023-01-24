import React from 'react'
import { HiSun } from 'react-icons/hi'
import { HiMoon } from 'react-icons/hi'
import { MdLogout } from 'react-icons/md'

const Nav = (props) => {
    const logout = () => {
        localStorage.removeItem('access');
    }

    return (
        <>
            <nav className={`w-full fixed z-10`}>
                <div className="Navbar">
                    <div className={`title ${props.mode === 'black' ? 'nav_bg text-white' : 'bg-white text-black shadow-sm shadow-slate-400'} flex justify-between px-4 py-1`}>
                        <h1 className='text-[1.2rem] px-2 py-3 font-bold flex justify-center items-center'>Restaurant Name</h1>
                        <div className='flex justify-between gap-12'>
                            <span className='flex justify-center items-center text-[1.4rem] cursor-pointer text-blue-500'>{props.mode === 'black' ? <HiSun onClick={props.OnClickSun} /> : <HiMoon onClick={props.OnClickMoon} />}</span>
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
