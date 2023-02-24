import React from 'react'

const KotHistory = (props) => {
    return (
        <>
            <div className="w-[80%] ml-[20%]">
                <div className="KotHistory w-[98%] m-auto mt-[4rem]">
                    <h1 className={`text-[1.5rem] font-bold mx-1 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>KOT History</h1>
                    <div className={`mt-2 rounded-md border ${props.mode === 'black' ? 'nav_bg text-white border-slate-600' : 'bg-white border-slate-300'}`}>
                        <div className={`title-heading grid grid-cols-2 font-semibold text-[1rem] p-2 ${props.mode === 'black' ? 'text-gray-300 bg-black/50' : 'text-gray-500 bg-blue-100'}`}>
                            <span>Date & Time</span>
                            <span>Table</span>
                        </div><hr />
                        <div className="kot_history_content grid grid-cols-2 p-1">
                            <span className='text-[0.9rem]'>10/01/2023 - 10:02 PM</span>
                            <div className="grid grid-cols-2">
                                <span>1</span>
                                <button className="w-[4rem] h-[1.8rem] rounded-md bg-green-200 border border-green-400 text-black text-[1.2rem">view</button>
                            </div>
                        </div><hr />
                        <div className="kot_history_content grid grid-cols-2 p-1">
                            <span className='text-[0.9rem]'>10/01/2023 - 10:02 PM</span>
                            <div className="grid grid-cols-2">
                                <span>1</span>
                                <button className="w-[4rem] h-[1.8rem] rounded-md bg-green-200 border border-green-400 text-black text-[1.2rem">view</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default KotHistory
