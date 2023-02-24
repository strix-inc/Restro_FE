import React from 'react'
import { IoIosArrowDown } from 'react-icons/io'

const TableOrederedItem = ({ mode }) => {

    return (
        <>
            <div className={`relative border rounded-md overflow-hidden ${mode === 'black' ? 'border-green-600 bg-transparent text-white' : 'border-slate-300 bg-blue-100'}`}>
                <input type="checkbox" className='absolute top-0 inset-x-0 w-full h-10 opacity-0 peer' />
                <div className='font-bold mx-3'>
                    <span className='flex items-center h-[40px]'>Table : 6</span>
                </div>
                <div className='absolute top-3 right-3 transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                    <IoIosArrowDown />
                </div>
                <div className={`rounded-b-md ${mode === 'black' ? 'bg-gray-600 text-white' : 'bg-slate-100'} max-h-0 overflow-auto peer-checked:max-h-[200px] transition-all ease-in-out duration-500 scrollbar-hide`}>
                    <div className='grid grid-cols-5 p-2 text-[0.9rem] font-bold'>
                        <span className='col-span-2'>Item</span>
                        <span className='flex justify-center'>Quantity</span>
                        <span className='flex justify-center'>Plate</span>
                        <span className='flex justify-center'>Delete</span>
                    </div>
                    <div className='grid grid-cols-5 text-[0.8rem] px-2 font-mono pb-2'>
                        <span className='col-span-2'>Chicken</span>
                        <span className='flex justify-center'>1</span>
                        <span className='flex justify-center'>F</span>
                        <div className="btn text-center cursor-pointer">
                            <button className='text-white font-bold w-[2rem] h-[1.3rem] pb-2 bg-red-600 rounded-sm'>x</button>
                        </div>
                    </div>
                    <div className="generateBill">
                        <button className='w-full h-[2rem] bg-green-600 text-white font-semibold'>Generate Bill</button>
                    </div>
                </div>
            </div>
            <div className={`relative border rounded-md overflow-hidden ${mode === 'black' ? 'border-green-600 bg-transparent text-white' : 'border-slate-300 bg-blue-100'}`}>
                <input type="checkbox" className='absolute top-0 inset-x-0 w-full h-10 opacity-0 peer' />
                <div className='font-bold mx-3'>
                    <span className='flex items-center h-[40px]'>Table : 9</span>
                </div>
                <div className='absolute top-3 right-3 transition-transform duration-500 rotate-0 peer-checked:rotate-180'>
                    <IoIosArrowDown />
                </div>
                <div className={`rounded-b-md ${mode === 'black' ? 'bg-gray-600 text-white' : 'bg-slate-100'} max-h-0 overflow-auto peer-checked:max-h-[200px] transition-all ease-in-out duration-500 scrollbar-hide`}>
                    <div className='grid grid-cols-5 p-2 text-[0.9rem] font-bold'>
                        <span className='col-span-2'>Item</span>
                        <span className='flex justify-center'>Quantity</span>
                        <span className='flex justify-center'>Plate</span>
                        <span className='flex justify-center'>Delete</span>
                    </div>
                    <div className='grid grid-cols-5 text-[0.8rem] px-2 font-mono pb-2'>
                        <span className='col-span-2'>Chicken</span>
                        <span className='flex justify-center'>1</span>
                        <span className='flex justify-center'>F</span>
                        <div className="btn text-center cursor-pointer">
                            <button className='text-white font-bold w-[2rem] h-[1.3rem] pb-2 bg-red-600 rounded-sm'>x</button>
                        </div>
                    </div>
                    <div className="generateBill">
                        <button className='w-full h-[2rem] bg-green-600 text-white font-semibold'>Generate Bill</button>
                    </div>
                </div>
            </div>
        </>
    )
}

export default TableOrederedItem
