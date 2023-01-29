import React from 'react'

const Items = ({ Data, mode }) => {
    return (
        <>
            {
                Data.map(val => {
                    return val.items.map((item, index) => {
                        return <div key={index} className={`Item-list grid grid-cols-5 py-1 ${mode === 'black' ? 'text-green-500' : 'text-black'} border border-l-0 border-r-0 border-t-0`}>
                            <span className='col-span-2 ml-2'>{item.name}</span>
                            <span className='col-span-1'>
                                <div>
                                    <small className='text-[0.7rem] font-bold ml-2'>₹150 / </small>
                                    <small className='text-[0.7rem] font-bold'>80</small>
                                </div>
                            </span>
                            <span className='col-span-1'>
                                <div>
                                    <small className='text-[0.7rem] font-bold ml-2'>₹150 / </small>
                                    <small className='text-[0.7rem] font-bold'>80</small>
                                </div>
                            </span>
                            <span className='col-span-1'>
                                <div>
                                    <small className='text-[0.7rem] font-bold ml-2'>₹150 / </small>
                                    <small className='text-[0.7rem] font-bold'>80</small>
                                </div>
                            </span>
                        </div>
                    })
                })
            }
        </>
    )
}

export default Items
