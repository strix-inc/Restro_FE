import React from 'react'
import IMG from '../Images/NAV.png'


const Footer = ({ navitem }) => {
    return (
        <>
            <div className={`nav_footer fixed bottom-0 left-0 z-20 md:h-[60px] w-[70%] md:w-[20%] text-white bg-blue-500 ${navitem === true ? 'block' : 'hidden lg:block'}`}>
                <div className="info m-1">
                    <img src={IMG} alt="Loading..." className='home md:w-[11rem] h-[2rem] md:h-[4rem] ml-2 bg-blue-500 lg:pb-3' />
                </div>
            </div>
        </>
    )
}

export default Footer
