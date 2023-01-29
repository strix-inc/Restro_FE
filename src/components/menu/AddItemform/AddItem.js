import React from 'react'
import { RxCross2 } from 'react-icons/rx'

const AddItem = ({ setAdditemForm }) => {
    return (
        <>
            <div className='fixed drop-shadow-sm bg-black/80 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0'>
                <form className='absolute border border-slate-300 rounded-md w-[60%] m-auto p-2 left-[20%] top-[10rem] bg-black'>
                    {/* <div> */}
                    <h1 className='text-[1.2rem] mb-2 mx-2 font-bold text-slate-300'>Add Dish</h1>
                    <span className='absolute top-2 right-3 text-[1.5rem] cursor-pointer text-white' onClick={() => setAdditemForm(false)}><RxCross2 /></span>
                    {/* </div> */}
                    <div className='flex flex-col'>
                        <input type="text" placeholder='Enter Category' className='border text-[0.9rem] p-2 rounded-md border-slate-400' />
                        <input type="text" placeholder='Enter Item name' className='border text-[0.9rem] p-2 mt-2 rounded-md border-slate-400' />
                    </div>
                    <div className='grid'>
                        <div className='grid grid-cols-7 mt-2 gap-2'>
                            <span className='flex items-center italic font-bold text-gray-300 text-[0.8rem] ml-2'>Restaurant Price</span>
                            <input type="text" placeholder='Full plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                            <input type="text" placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                        </div>
                        <div className='grid grid-cols-7 mt-2 gap-2'>
                            <span className='flex items-center italic font-bold text-gray-300 text-[0.8rem] ml-2'>Zomato Price</span>
                            <input type="text" placeholder='Full plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                            <input type="text" placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                        </div>
                        <div className='grid grid-cols-7 mt-2 gap-2'>
                            <span className='flex items-center italic font-bold text-gray-300 text-[0.8rem] ml-2'>Swiggy Price</span>
                            <input type="text" placeholder='Full plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                            <input type="text" placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                        </div>
                    </div>
                    <div className="button mt-4">
                        <button className='w-full bg-blue-400 p-2 text-white font-bold rounded-md hover:bg-blue-500 transition-all ease-in duration-300 border-none'>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddItem
