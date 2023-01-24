import React from 'react'
import IMG from '../../components/Images/arrow.png'

const Arrow = () => {
    return (
        <>
            <div className="arrow">
                <img src={IMG} alt="" className=' w-[4rem] absolute top-[4rem] rotate-90 right-[31rem] z-0' />
            </div>
        </>
    )
}

export default Arrow
