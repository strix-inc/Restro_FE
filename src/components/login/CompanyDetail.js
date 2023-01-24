import React from 'react';
import IMG from '../Images/img1.png'

const CompanyDetail = () => {
    return (
        <>
            <div className="Company-Info col-span-1 rounded-md mt-8 bg-black/10 shadow-md shadow-slate-600">
                <div className="image">
                    <img src={IMG} alt="Loading.." className='rounded-r-lg h-[340px] w-full opacity-90 object-cover' />
                </div>
            </div>
        </>
    )
}

export default CompanyDetail
