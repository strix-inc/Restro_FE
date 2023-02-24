import React, { useState } from 'react';
import { RiDeleteBin2Fill } from 'react-icons/ri'

const GenerateBill = ({ mode }) => {
    const [quantitySize, setQuantitySize] = useState(0);
    const [amount, setAmount] = useState(130);
    return (
        <>
            <div className='w-[80%] ml-[20%]'>
                <div className="setting relative w-full m-auto mt-[4rem] ">
                    <h1 className={`text-[1.5rem] tracking-wide font-bold mx-6 py-2 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Billing</h1><hr />
                    <div className="Billing-details w-[94%] m-auto mt-6">
                        <div className="grid grid-cols-3 gap-4 my-3">
                            <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'Party Name'} />
                            <input type="text" placeholder='Contact' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'Contact'} />
                            <select name="category" id="category" className='p-2 border rounded-md border-slate-300 text-black outline-none'>
                                <option value="restaurant">Restaurant</option>
                                <option value="zomato">Zomato</option>
                                <option value="swiggy">Swiggy</option>
                            </select>
                        </div>
                        <div className="item-list mt-4">
                            <h1 className='font-bold text-[1.2rem] underline'>List</h1>
                            <div className="heading grid grid-cols-10">
                                <span className='border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Sl No.</span>
                                <span className='col-span-3 border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Name</span>
                                <span className='border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Rate</span>
                                <span className='border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Size</span>
                                <span className='col-span-2 border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Quantity</span>
                                <span className='border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Amount</span>
                                <span className='border border-slate-300 flex justify-center items-center underline py-1 font-semibold'>Delete</span>
                            </div>
                            <div className="heading grid grid-cols-10">
                                <span className='border border-slate-300 flex justify-center items-center  py-1 font-medium'>1</span>
                                <span className='col-span-3 border border-slate-300 flex justify-center items-center  py-1 font-medium'>Chicken</span>
                                <span className='border border-slate-300 flex justify-center items-center  py-1 font-medium'>130</span>
                                <span className='border border-slate-300 flex justify-center items-center  py-1 font-medium'>Full</span>
                                <div className='col-span-2 border border-slate-300 flex justify-center items-center  py-1 font-medium'>
                                    <button className='w-6 h-4 bg-green-600 flex justify-center items-center text-white rounded-sm mx-4 font-bold cursor-pointer text-[0.8rem]' onClick={() => setQuantitySize(quantitySize + 1)}>+</button>
                                    <span>{quantitySize < 0 ? 0 : quantitySize}</span>
                                    <button className='w-6 h-4 bg-red-500 flex justify-center items-center text-white rounded-sm mx-4 font-bold cursor-pointer text-[1.2rem]' onClick={() => setQuantitySize(quantitySize - 1)}>-</button>
                                </div>
                                <span className='border border-slate-300 flex justify-center items-center  py-1 font-medium'>{amount * quantitySize}</span>
                                <span className='border border-slate-300 flex justify-center items-center'><RiDeleteBin2Fill className='text-red-500 text-[1rem] cursor-pointer' /></span>
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-7">
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Sub Total</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'260'} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Discount %</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'10'} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Discount Amount</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'26'} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Net Amount</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'234'} />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">S.G.S.T @2.5%</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'11.7'} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">C.G.S.T @2.5%</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'11.7'} />
                            </div>
                            <div className='flex flex-col col-span-2'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Grand Total</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'257'} />
                            </div>
                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Amount Paid</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'260'} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Due</label>
                                <input type="text" placeholder='Party name' className='p-2 border rounded-md border-slate-300 text-black outline-none' value={'10'} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Payment Type</label>
                                <select name="category" id="category" className='p-2 border rounded-md border-slate-300 text-black outline-none'>
                                    <option value="restaurant">Restaurant</option>
                                    <option value="zomato">Zomato</option>
                                    <option value="swiggy">Swiggy</option>
                                </select>
                            </div>
                            {/* button to be added */}
                            <div className="button flex justify-end items-center mt-4 border-none">
                                <button className="w-[80%] h-[2.5rem] bg-green-600 flex justify-center items-center text-white font-semibold hover:scale-105 transition-all ease-in-out duration-300 border-none rounded-md">Save</button>
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default GenerateBill
