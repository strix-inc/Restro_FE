import React from 'react'
import { TbEdit } from 'react-icons/tb'
import { MdDeleteForever } from 'react-icons/md'
import Non_Veg from '../Images/Non_veg.png'
import Veg from '../Images/veg.png'

const Items = ({ Data, mode, EditDish, DeleteDish }) => {
    return (
        <>
            {Data.length > 0 ?
                Data.map((val, index) => {
                    return <div key={val.id} className={`Item-list grid grid-cols-5 scrollbar-hide p-2 ${mode === 'black' ? 'text-black' : 'text-black'} ${index % 2 === 0 ? 'bg-gray-300' : 'bg-slate-100'}`}>
                        <div className='relative col-span-2'>
                            <span className='font-bold'>{val.name.toUpperCase()}</span>
                            <span className='absolute w-4 mt-1 mx-1'>{val.dish_type === 'Non-Veg' ? <img src={Non_Veg} /> : <img src={Veg} />}</span>
                            <div
                                className="
                            absolute right-[6rem] top-[-1.35rem] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[-2.2rem] before:top-[10px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                            before:bg-amber-500 before:text-black before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all
                            hover:before:opacity-100" data-tip="Edit">
                                <span className='text-amber-700 cursor-pointer text-[1.1rem]'><TbEdit onClick={() => EditDish(val.id, val.dish_type, val.name, val.category_name)} /></span>
                            </div>
                            {/* <div className="
                            absolute right-[3rem] top-[-1.6rem] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[1.2rem] before:top-[12px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                            before:bg-red-500 before:text-white before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all
                            hover:before:opacity-100" data-tip="Delete">
                                <span className='text-[1.2rem] cursor-pointer text-red-500'><MdDeleteForever onClick={() => DeleteDish(val.id)} /></span>
                            </div> */}
                        </div>
                        <div className='col-span-3 flex justify-between mx-[12px]'>
                            {
                                val.rates.map(item => {
                                    return <span key={item.id}>
                                        <div className='mx-2'>
                                            <small className='text-[0.9rem] font-bold'>₹ {item.full_price} / </small>
                                            <small className='text-[0.9rem] font-bold'>{item.half_price}</small>
                                        </div>
                                    </span>
                                })
                            }
                        </div>
                    </div>
                })
                : <span className='flex justify-center items-center py-2 text-slate-500 text-[0.9rem]'> --- No Dish Present , Add Some Dish --- </span>}
        </>
    )
}

export default Items
