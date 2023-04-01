import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'
import ToolTip from '../../Images/tooltip.png'


const AddItem = ({ setAdditemForm, GetAllDish, GetAllCategory, AllCategory }) => {
    var Add_new_dish_API = process.env.REACT_APP_ADD_NEWDISH
    var Post_new_dish_API = process.env.REACT_APP_GET_ALL_DISH

    const [rates, setRates] = useState([
        { half_price: '', full_price: '' },
    ]);

    const [DishCategory, setDishCategory] = useState('');
    const [DishName, setDishName] = useState('');
    const [DishType, setDishType] = useState('veg');

    // Take the platform input values from the user !!
    const handlePlatformInput = (event, index) => {
        const val = [...rates];
        val[index][event.target.name] = event.target.value;
        setRates(val);
    }
    // form Submition 
    const SubmitForm = (event) => {
        event.preventDefault();

        // changing the key name of platform_id to platform !!
        function renameKey(obj, oldKey, newKey, created, modified, deleted, name, restaurant) {
            obj[newKey] = obj[oldKey];
            delete obj[oldKey];
            delete obj[created];
            delete obj[modified];
            delete obj[deleted];
            delete obj[name];
            delete obj[restaurant];
        }
        rates.forEach(obj => renameKey(obj, 'id', 'platform', 'created_at', 'modified_at', 'is_deleted', 'name', 'restaurant'));

        // **********************************
        const CreatedDish = {
            rates,
            name: DishName,
            category: DishCategory,
            dish_type: DishType,
        }

        const createNewDish = () => {
            const headers = {
                'Content-Type': 'application/json',
                'Authorization': `Bearer ${localStorage.getItem('access')}`
            }
            axios.post(Post_new_dish_API, CreatedDish, {
                headers: headers
            }).then(val => {
                if (val.status === 201) {
                    GetAllDish();
                    GetAllCategory();
                    setAdditemForm(false);
                }
            }).catch(function (error) {
                console.log(error);
            });
        }
        createNewDish();
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(Add_new_dish_API, {
            headers: headers
        }).then(val => {
            setRates(val.data.data);
        }).catch(function (error) {
            console.log(error);
        });

    }, []);


    return (
        <>
            <div className='fixed drop-shadow-sm bg-black/50 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0'>
                <form className='absolute border border-slate-300 rounded-md w-[50%] m-auto p-3 left-[25%] top-[5rem] bg-white' onSubmit={SubmitForm}>
                    {/* <div> */}
                    <div className='relative flex'>
                        <h1 className='text-[1.2rem] mb-6 mx-2 font-bold text-blue-500'>Add Dish</h1>
                        <div
                            className=" 
                        absolute left-[6rem] top-[-23px] before:content-[attr(data-tip)] before:relative before:px-3 before:py-2 before:left-[-2.2rem] before:top-[3.5rem] before:-translate-x-1/2 before:-translate-y-full
                        before:bg-gray-500 before:text-white before:font-bold before:text-[0.8rem] before:rounded-sm before:opacity-0 before:transition-all
                        hover:before:opacity-100" data-tip={`All the { * } marks field are mandatory`}
                        >
                            <img src={ToolTip} alt="" className='w-[1rem] h-[1rem] mt-[0.30rem] mx-1 cursor-pointer' />
                        </div>
                    </div>
                    <div className='absolute top-10 left-2 w-[98%] h-[2px] bg-blue-500'></div>
                    <span className='absolute top-2 right-6 text-[1.5rem] cursor-pointer text-black
                    ' onClick={() => setAdditemForm(false)}><RxCross2 /></span>
                    {/* </div> */}
                    <div className='mt-2'>

                        <div className='flex flex-col'>
                            <label htmlFor="category" className='text-[0.8rem] text-black font-bold mx-1'>CATEGORY NAME <b className='text-red-500'>*</b></label>
                            <input list='category' name='category_name' value={DishCategory} placeholder='Enter Category' className='border text-[0.9rem] p-2 rounded-sm border-slate-400 w-full bg-gray-100/40' onChange={(event) => setDishCategory(event.target.value)} required />

                            <datalist id="category">
                                {
                                    AllCategory.map((val, index) => {
                                        return <option key={index} value={val.name} />
                                    })
                                }
                            </datalist>
                        </div>

                        <div className='flex flex-col mt-2'>
                            <label htmlFor="category" className='text-[0.8rem] text-black
                             font-bold mx-1'>DISH NAME <b className='text-red-500'>*</b></label>
                            <input type="text" name='name' value={DishName} placeholder='Enter Item name' className='border text-[0.9rem] p-2 rounded-sm border-slate-400 w-full bg-gray-100/40' onChange={(event) => setDishName(event.target.value)} required />
                        </div>
                        <div className='flex flex-col mt-2'>
                            <label htmlFor="category" className='text-[0.8rem] text-black
                             font-bold mx-1'>DISH TYPE <b className='text-red-500'>*</b></label>
                            <select type="text" name='name' value={DishType} placeholder='Enter Dish Type' className='border text-[0.9rem] p-2 rounded-sm border-slate-400 w-full bg-gray-100/40' onChange={(event) => setDishType(event.target.value)}>
                                <option value="veg">Veg</option>
                                <option value="Non-veg">Non-Veg</option>
                            </select>
                        </div>
                    </div>
                    <div className={`grid mt-5 overflow-auto ${rates.length > 3 ? 'h-[320px] scrollbar-hide' : ''}`}>
                        {
                            rates.map((Platform, index) => {
                                return <div key={index} className='grid mt-1'>
                                    <span className='text-black
                                     font-bold mx-1 text-[0.9rem]'>{Platform.name} <b className='text-red-500'>*</b></span>
                                    <div className='grid grid-cols-6 gap-1'>
                                        <input type="text" name='full_price' placeholder='Full plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-sm col-span-3 bg-gray-100/40' onChange={(event) => handlePlatformInput(event, index)} required />
                                        <input type="text" name='half_price' placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-sm col-span-3 bg-gray-100/40' onChange={(event) => handlePlatformInput(event, index)} required />
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="button mt-4">
                        <button type='button' className='w-full bg-blue-500 p-2 text-white
                         font-bold rounded-md hover:bg-green-600 transition-all ease-in duration-300 border-none' onClick={SubmitForm}>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddItem
