import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios';

const EditDishItem = ({ setEditedDishForm, Dish, SubmitForm }) => {
    const [EditedCategory, setEditedCategory] = useState(Dish.category);
    const [EditedDishName, setEditedDishName] = useState(Dish.name);
    const [OneDish, setOneDish] = useState([]);
    const [rates, setRates] = useState([{
        half_price: '',
        full_price: ''
    }]);
    // const [state, setState] = useState([EditedPriceData]);

    const EditDishPrice = (event, index) => {
        const val = [...rates];
        val[index][event.target.name] = event.target.value;
        setRates(val);
    }

    const SubmitEditedForm = () => {
        const EditedData = {
            id: Dish.id,
            rates,
            name: EditedDishName,
            category: EditedCategory,
            dish_type: Dish.dish_type,
        }
        // console.log(EditedData);

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.put('https://restrofin.pythonanywhere.com/kitchen/dish', EditedData, { headers: headers });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`https://restrofin.pythonanywhere.com/kitchen/dish?id=${Dish.id}`, {
            headers: headers
        }).then(val => {
            setOneDish([val.data.data]);
            setRates(val.data.data.rates);
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
                            <h1 className='text-[1.2rem] mb-2 mx-2 font-bold text-slate-300'>Edit Dish</h1>
                            <span className='absolute top-2 right-3 text-[1.5rem] cursor-pointer text-white' onClick={() => setEditedDishForm(false)}><RxCross2 /></span>
                            {/* </div> */}
                            <div className='flex flex-col'>
                                <input type="text" name='category_name' defaultValue={val.category_name} placeholder='Enter Category' className='border text-[0.9rem] p-2 rounded-md border-slate-400' onChange={(event) => setEditedCategory(event.target.value)} />
                                <input type="text" name='name' defaultValue={val.name} placeholder='Enter Item name' className='border text-[0.9rem] p-2 mt-1 rounded-md border-slate-400' onChange={(event) => setEditedDishName(event.target.value)} />
                            </div>
                            <h1 className='mx-2 text-[0.9rem] text-blue-100 mt-2 font-bold mb-2'>Edit Platorm price</h1>
                            {
                                val.rates.map((item, index) => {
                                    return <div key={index} className='grid mt-2'>
                                        <input type="text" placeholder={item.platform_name} className='p-3 boredr border-slate-400 text-[0.9rem] rounded-md font-semibold text-slate-500 bg-white' disabled />
                                        <div className='grid grid-cols-6 gap-1 mt-1'>
                                            <input type="text" name='full_price' defaultValue={item.full_price} className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' onChange={(event) => EditDishPrice(event, index)} />
                                            <input type="text" name='half_price' defaultValue={item.half_price} placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' onChange={(event) => EditDishPrice(event, index)} />
                                        </div>
                                    </div>
                                })
                            }
                            <div className="button mt-4">
                                <button type='button' className='w-full bg-blue-500 p-2 text-white font-bold rounded-md hover:bg-green-500 transition-all ease-in duration-300 border-none' onClick={SubmitEditedForm}>Save</button>
                            </div>
                        </form>
                    })
                }
            </div>
        </>
    )
}

export default EditDishItem
