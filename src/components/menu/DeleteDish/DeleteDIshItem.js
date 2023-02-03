import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios';


const DeleteDIshItem = ({ setDeletedDishForm, SubmitForm, OneDishID }) => {

    const [OneDish, setOneDish] = useState([]);

    // Delete the dish !!
    const DeleteDish = () => {
        const DishId = {
            id: OneDishID,
        }
        // console.log(DishId);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        // console.log(headers);

        axios.delete('https://restrofin.pythonanywhere.com/kitchen/dish', { headers: headers, data: DishId });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`https://restrofin.pythonanywhere.com/kitchen/dish?id=${OneDishID}`, {
            headers: headers
        }).then(val => {
            setOneDish([val.data.data]);
        }).catch(function (error) {
            console.log(error);
        });

    }, [])

    return (
        <>
            <div className='fixed drop-shadow-sm bg-black/50 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0'>
                {
                    OneDish.map(val => {
                        return <form key={val.id} className='absolute border border-slate-300 rounded-md w-[60%] m-auto p-3 left-[20%] top-[5rem] bg-black/70' onSubmit={SubmitForm}>
                            {/* <div> */}
                            <h1 className='text-[1.2rem] mb-2 mx-2 font-bold text-slate-300'>Delete Dish</h1>
                            <span className='absolute top-2 right-3 text-[1.5rem] cursor-pointer text-white' onClick={() => setDeletedDishForm(false)}><RxCross2 /></span>
                            {/* </div> */}
                            <div className='flex flex-col'>
                                <input type="text" name='category_name' placeholder={val.category_name} className='border text-[0.9rem] p-2 rounded-md border-slate-400' />
                                <input type="text" name='name' placeholder={val.name} className='border text-[0.9rem] p-2 mt-1 rounded-md border-slate-400' />
                                <input type="text" name='name' placeholder={val.dish_type} className='border text-[0.9rem] p-2 mt-1 rounded-md border-slate-400' />
                            </div>
                            <h1 className='mx-2 text-[0.9rem] text-blue-100 mt-2 font-bold mb-2'>Delete Platorm and Price</h1>
                            {
                                val.rates.map((rate, index) => {
                                    return <div key={index} className='grid mt-2'>
                                        <input type="text" placeholder={rate.platform_name} className='p-3 boredr border-slate-400 text-[0.9rem] rounded-md font-semibold text-slate-500' />
                                        <div className='grid grid-cols-6 gap-1 mt-1'>
                                            <input type="text" name='full_price' placeholder={rate.full_price} className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                                            <input type="text" name='half_price' placeholder={rate.half_price} className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' />
                                        </div>
                                    </div>
                                })
                            }
                            <div className="button mt-4">
                                <button type='button' className='w-full bg-red-600 p-2 text-white font-bold rounded-md transition-all ease-in duration-300 border-none' onClick={DeleteDish}>Delete</button>
                            </div>
                        </form>
                    })
                }

            </div >
        </>
    )
}

export default DeleteDIshItem
