import React, { useCallback, useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios';

const EditDishItem = ({ setEditedDishForm, Dish, SubmitForm, GetAllDish, GetAllCategory, setAdditemForm, AllCategory }) => {
    var API = process.env.REACT_APP_GET_ALL_DISH

    const [EditedCategory, setEditedCategory] = useState(Dish.dish_category);
    const [EditDishName, setEditDishName] = useState(Dish.dish_name);
    const [EditDishType, setEditDishType] = useState(Dish.dish_type)
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

    // edit Dish category 
    const EditCategory = (event) => {
        setEditedCategory(event.target.value);
    }
    // edit Dish name 
    const EditItemName = (event) => {
        setEditDishName(event.target.value);
    }
    // Edit Dish type
    const EditItemType = (event) => {
        setEditDishType(event.target.value);
    }

    const getdishSDetail = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`${API}?id=${Dish.id}`, {
            headers: headers
        }).then(val => {
            setOneDish([val.data.data]);
            setRates(val.data.data.rates);
        }).catch(function (error) {
            console.log(error);
        });
    }

    const SubmitEditedForm = useCallback(() => {
        const EditedData = {
            id: Dish.id,
            rates,
            category: EditedCategory,
            name: EditDishName,
            dish_type: EditDishType,
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.put(API, EditedData, { headers: headers })
            .then(val => {
                if (val.status === 200) {
                    GetAllDish();
                    GetAllCategory();
                    setEditedDishForm(false);
                }
            })

    }, [rates, EditedCategory, EditDishName, EditDishType])

    useEffect(() => {
        getdishSDetail();
    }, [])
    return (
        <>
            <div className='fixed drop-shadow-sm bg-black/50 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0'>
                {
                    OneDish.map(val => {
                        return <form key={val.id} className='absolute border border-slate-300 rounded-md w-[50%] m-auto p-3 left-[25%] top-[5rem] bg-white' onSubmit={SubmitForm}>
                            {/* <div> */}
                            <h1 className='text-[1.2rem] mb-6 mx-2 font-bold text-black'>Edit Dish</h1>
                            <div className='absolute top-10 left-2 w-[97%] h-[2px] bg-blue-500'></div>
                            <span className='absolute top-2 right-3 text-[1.5rem] cursor-pointer ' onClick={() => setAdditemForm(false)}>
                                <RxCross2 className='text-black bg-black' />
                            </span>
                            <span className='absolute top-2 right-3 text-[1.5rem] cursor-pointer text-white' onClick={() => setEditedDishForm(false)}><RxCross2 /></span>
                            {/* </div> */}
                            <div className='mt-2'>
                                <div className='flex flex-col '>
                                    <label htmlFor="category" className='text-[0.8rem] text-black font-bold mx-1'>CATEGORY NAME <b className='text-red-500'>*</b></label>
                                    <input list='category' name='category_name' value={EditedCategory} placeholder='Enter Category' className='border text-[0.9rem] p-2 rounded-sm border-slate-400 w-full bg-gray-100/40' onChange={EditCategory} />

                                    <datalist id="category">
                                        {
                                            AllCategory.map((val, index) => {
                                                return <option key={index} value={val.name} />
                                            })
                                        }
                                    </datalist>
                                </div>
                                <div className='flex flex-col mt-1'>
                                    <label htmlFor="category" className='text-[0.8rem] text-black font-bold mx-1'>DISH NAME <b className='text-red-500'>*</b></label>
                                    <input type="text" name='name' value={EditDishName} placeholder='Enter Item name' className='border text-[0.9rem] p-2 rounded-sm border-slate-400 w-full bg-gray-100/40' onChange={EditItemName} />
                                </div>
                                <div className='flex flex-col mt-1'>
                                    <label htmlFor="category" className='text-[0.8rem] text-black font-bold mx-1'>DISH TYPE <b className='text-red-500'>*</b></label>
                                    <select type="text" name='name' placeholder='Enter Dish Type' className='border text-[0.9rem] p-2 rounded-sm border-slate-400 w-full bg-gray-100/40' onChange={EditItemType}>
                                        <option >{EditDishType}</option>
                                        {EditDishType === "Non-Veg" && <option value="Veg">Veg</option>}
                                        {EditDishType === "Veg" && <option value="Non-veg">Non-veg</option>}
                                    </select>
                                </div>
                            </div>
                            <div className='mt-7'>
                                {
                                    val.rates.map((item, index) => {
                                        return <div key={index} className='grid mt-1'>
                                            <span className='text-black font-bold mx-1 text-[0.9rem]'>{item.platform_name} <b className='text-red-500'>*</b></span>
                                            <div className='grid grid-cols-6 gap-1'>
                                                <input type="text" name='full_price' defaultValue={item.full_price} className='border border-slate-400 p-2 text-[0.9rem] rounded-sm col-span-3 bg-gray-100/40' onChange={(event) => EditDishPrice(event, index)} />
                                                <input type="text" name='half_price' defaultValue={item.half_price} placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-sm col-span-3 bg-gray-100/40' onChange={(event) => EditDishPrice(event, index)} />
                                            </div>
                                        </div>
                                    })
                                }
                            </div>
                            <div className="button mt-4">
                                <button type='button' className='w-full bg-blue-500 p-2 text-white font-bold rounded-md hover:bg-amber-500 transition-all ease-in duration-300 border-none hover:text-black' onClick={SubmitEditedForm}>Save</button>
                            </div>
                        </form>
                    })
                }
            </div>
        </>
    )
}

export default EditDishItem
