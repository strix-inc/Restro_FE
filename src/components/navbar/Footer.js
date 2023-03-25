import React from 'react'
import IMG from '../Images/NAV.png'


const Footer = () => {
    return (
        <>
            <div className="nav_footer fixed bottom-0 left-0 z-20 h-[70px] w-[20%] text-white bg-blue-500">
                <div className="info m-1">
                    {/* <h1 className='font-bold text-[1.5rem] mx-4 tracking-wider'>RestroFin</h1>
                    <span className='text-[0.8rem] font-semibold italic mx-4 tracking-wider'>By Strix</span> */}
                    <img src={IMG} alt="Loading..." className='home w-[12rem] h-[4rem] ml-2 bg-blue-500' />
                </div>
            </div>
        </>
    )
}

export default Footer
