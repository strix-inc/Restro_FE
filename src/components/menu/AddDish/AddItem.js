import React, { useEffect, useState } from 'react'
import { RxCross2 } from 'react-icons/rx'
import axios from 'axios'


const AddItem = ({ setAdditemForm }) => {

    const [rates, setRates] = useState([
        { half_price: '', full_price: '' },
    ]);

    const [DishCategory, setDishCategory] = useState('');
    const [DishName, setDishName] = useState('');
    const [DishType, setDishType] = useState('');

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
        // console.log(CreatedDish);

        // sending the post request to the backend !!
        // 500 error internal server .. yet to fixed !!

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.post('https://restrofin.pythonanywhere.com/kitchen/dish', CreatedDish, {
            headers: headers
        }).then(val => {
            console.log(val);
        }).catch(function (error) {
            console.log(error);
        });
        setTimeout(() => {
            window.location.reload();
        }, 1000);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get('https://restrofin.pythonanywhere.com/kitchen/platform', {
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
                        <input type="text" name='name' value={DishType} placeholder='Enter Dish Type' className='border text-[0.9rem] p-2 mt-1 rounded-md border-slate-400' onChange={(event) => setDishType(event.target.value)} />
                    </div>
                    <h1 className='mx-2 text-[0.9rem] text-blue-100 mt-2 font-bold mb-2'>Add Platorm and Price</h1>
                    <div className={`grid overflow-auto ${rates.length > 3 ? 'h-[320px] scrollbar-hide' : ''}`}>
                        {
                            rates.map((Platform, index) => {
                                return <div key={index} className='grid mt-2'>
                                    <input type="text" placeholder={Platform.name} className='p-3 boredr border-slate-400 text-[0.9rem] rounded-md font-semibold text-slate-500' />
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
