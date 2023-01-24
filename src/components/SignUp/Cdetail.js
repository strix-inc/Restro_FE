import React from 'react'
import IMG from '../Images/img1.png'

const Cdetail = () => {
    return (
        <>
            <div className="Company-Info col-span-1 rounded-l-lg bg-black/60 h-[380px] w-[500px] mt-[1.5rem]">
                <div className="image">
                    <img src={IMG} alt="Loading.." className='rounded-l-lg h-[350px] w-[600px] opacity-90 object-fill' />
                </div>
            </div>
        </>
    )
}

export default Cdetail
