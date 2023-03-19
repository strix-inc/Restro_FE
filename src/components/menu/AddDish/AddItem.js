import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'


const AddItem = ({ setAdditemForm, GetAllDish, GetAllCategory }) => {
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
                <form className='absolute border border-slate-300 rounded-md w-[60%] m-auto p-3 left-[20%] top-[5rem] bg-black/70' onSubmit={SubmitForm}>
                    {/* <div> */}
                    <h1 className='text-[1.2rem] mb-2 mx-2 font-bold text-slate-300'>Add Dish</h1>
                    <span className='absolute top-2 right-3 text-[1.5rem] cursor-pointer text-white' onClick={() => setAdditemForm(false)}><RxCross2 /></span>
                    {/* </div> */}
                    <div className='flex flex-col'>
                        <input type="text" name='category_name' value={DishCategory} placeholder='Enter Category' className='border text-[0.9rem] p-2 rounded-md border-slate-400' onChange={(event) => setDishCategory(event.target.value)} />
                        <input type="text" name='name' value={DishName} placeholder='Enter Item name' className='border text-[0.9rem] p-2 mt-1 rounded-md border-slate-400' onChange={(event) => setDishName(event.target.value)} />
                        <select type="text" name='name' value={DishType} placeholder='Enter Dish Type' className='border text-[0.9rem] p-2 mt-1 rounded-md border-slate-400' onChange={(event) => setDishType(event.target.value)}>
                            <option value="veg">Veg</option>
                            <option value="Non-veg">Non-Veg</option>
                        </select>
                    </div>
                    <h1 className='mx-2 text-[0.9rem] text-blue-100 mt-2 font-bold mb-2'>Add Platorm and Price</h1>
                    <div className={`grid overflow-auto ${rates.length > 3 ? 'h-[320px] scrollbar-hide' : ''}`}>
                        {
                            rates.map((Platform, index) => {
                                return <div key={index} className='grid mt-2'>
                                    <span className='text-white font-bold mx-1'>{Platform.name}</span>
                                    <div className='grid grid-cols-6 gap-1 mt-1'>
                                        <input type="text" name='full_price' placeholder='Full plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' onChange={(event) => handlePlatformInput(event, index)} />
                                        <input type="text" name='half_price' placeholder='Half plate Price' className='border border-slate-400 p-2 text-[0.9rem] rounded-md col-span-3' onChange={(event) => handlePlatformInput(event, index)} />
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="button mt-4">
                        <button type='button' className='w-full bg-blue-400 p-2 text-white font-bold rounded-md hover:bg-blue-500 transition-all ease-in duration-300 border-none' onClick={SubmitForm}>Save</button>
                    </div>
                </form>
            </div>
        </>
    )
}

export default AddItem
