import React from 'react'
import { Link } from 'react-router-dom'

const AddStaff = () => {
    return (
        <>
            <div className='fixed drop-shadow-sm bg-black/50 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0'>
                <form className='absolute border border-slate-300 rounded-md w-[50%] m-auto p-3 left-[28%] top-[12rem] bg-black/70'>
                    {/* <div> */}
                    <h1 className='mx-2 text-white font-bold text-[1.3rem] underline'>Add Staff</h1>
                    <div className="grid grid-cols-2 gap-y-3 mt-4">
                        <input type="text" placeholder='Name' className='mx-2 p-2 border border-slate-300 rounded-md' />
                        <input type="text" placeholder='Contact' className='mx-2 p-2 border border-slate-300 rounded-md' />
                        <input type="text" placeholder='Address' className='mx-2 p-2 border border-slate-300 rounded-md' />
                        <input type="Date" className='mx-2 p-2 border border-slate-300 rounded-md' />
                    </div>
                    <div className="button flex justify-end items-center gap-4 mx-2 mt-6">
                        <Link to={"/setting"} type='button' className='w-[8rem] h-[2.5rem] border-2 border-red-500 flex justify-center items-center rounded-md text-red-500'>Cancel</Link>
                        <button type='submit' className='w-[8rem] h-[2.5rem] hover:border-2 hover:border-green-600 flex justify-center items-center rounded-md hover:text-green-500 bg-green-600 hover:bg-black/50 text-white'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddStaff
