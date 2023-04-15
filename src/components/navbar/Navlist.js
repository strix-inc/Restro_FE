import React, { useEffect, useState } from 'react'
import { HiOutlineHome } from 'react-icons/hi'
import { IoTicketOutline } from 'react-icons/io5'
import { MdOutlineSettings } from 'react-icons/md'
import { GiBlackBook } from 'react-icons/gi'
import { CgMenuBoxed } from 'react-icons/cg'
import { Link } from 'react-router-dom'


const Navlist = (props) => {
    const [active, setActive] = useState('/dashboard');

    const ListItem = [
        { id: 1, name: 'Dashboard', link: '/dashboard', icons: <HiOutlineHome /> },
        { id: 2, name: 'Kot', link: '/kot', icons: <IoTicketOutline /> },
        { id: 3, name: 'Kot History', link: '/kotHistory', icons: <GiBlackBook /> },
        { id: 5, name: 'Menu', link: '/menu', icons: <CgMenuBoxed /> },
        { id: 6, name: 'Settings', link: '/setting', icons: <MdOutlineSettings /> },
    ];

    useEffect(() => {
        setActive(localStorage.getItem('active'));
    }, []);

    useEffect(() => {
        localStorage.setItem('active', (active === null ? '/dashboard' : active));
    }, [active]);

    return (
        <>
            <div className={`${props.navitem === true ? 'bg-black' : 'bg-slate-300 lg:bg-white'} w-full height-[100vh] overflow-hidden `}>
                <div className={`listItems w-[70%] lg:w-[20%] h-[100%] overflow-auto lg:mt-[3.6rem] fixed ${props.mode === 'black' ? 'nav_bg text-gray-300' : 'bg-gray-100 lg:bg-white text-gray-500'} mt-[6rem] ${props.navitem === true ? 'translate-x-0' : 'translate-x-[-50rem] lg:translate-x-0'} transition-all duration-500 ease-in-out z-10`}>
                    <ul className='pt-3'>
                        {
                            ListItem.map(item => {
                                return <li key={item.id}>
                                    <Link to={`${item.link}`} className={`flex items-center gap-x-4 py-2 px-4 mx-2 cursor-pointer font-bold ${props.mode === 'black' ? 'hover:text-white' : 'hover:text-black'} ${active === item.link ? (props.mode === 'black' ? 'text-white bg-black/30 rounded-r-md' : 'text-black lg:bg-gray-100 bg-blue-100 rounded-r-md') : ''}`} onClick={() => setActive(item.link, props.setNavitem(false))}>
                                        {active === item.link && <div className='w-[6px] h-[3rem] bg-blue-500 absolute left-0 rounded-r-md'></div>}
                                        <span className="text-[1.2rem]">{item.icons}</span>
                                        <span className={`origin-left mt-1`}>{item.name}</span>
                                    </Link>
                                </li>
                            })
                        }
                    </ul>
                </div>
            </div>
        </>
    )
}

export default Navlist
