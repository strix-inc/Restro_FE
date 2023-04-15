import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { GoAlert } from 'react-icons/go'

const Item = (props) => {
    var api = process.env.REACT_APP_BASE_URL

    const [AllDishData, setAllDishData] = useState([]);
    const [dishData, setDishData] = useState([]);
    const [wordEntered, setWordEntered] = useState("");
    const [suggestion, setSuggestion] = useState(false);

    const handleFilter = (event) => {
        props.setRough(true);
        setSuggestion(true);
        const searchWord = event.target.value;
        setWordEntered(searchWord);
        const newFilter = dishData.filter((value) => {
            return value.name.toLowerCase().includes(searchWord.toLowerCase());
        });

        if (searchWord === "") {
            setAllDishData([]);
        } else {
            setAllDishData(newFilter);
        }
    };

    const TakeDish = (id, dish) => {
        setWordEntered(dish);
        props.getDishID(id, dish);
        setSuggestion(false);
    }

    // get all the values from the input fields !!
    const handleInputChange = (event, index) => {
        props.handleInputChange(event, index);
    }


    // Remove extra added form of Item
    const RemoveItemInput = () => {
        props.removeInput(props.Index);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        const AllDish = () => {
            axios.get(`${api}/kitchen/dish`, {
                headers: headers
            }).then(val => {
                setAllDishData(val.data.data);
                setDishData(val.data.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
        AllDish();
    }, [])

    return (
        <>
            <div className="Item-detail md:grid md:grid-cols-10 md:gap-x-4 my-2">
                <div className="itemName flex flex-col md:col-span-4 w-full">
                    <label htmlFor="itemName" className='text-[0.85rem] font-medium md:m-1'>Dish</label>
                    <input type="text" name='name' autoComplete="off" value={props.rough === true ? wordEntered : ''} className={`rounded-sm py-2 px-3 bg-transparent border text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={handleFilter} required />

                    {suggestion && wordEntered && (
                        <div className={`dataResult md:absolute md:mt-[4.5rem] md:ml-2 rounded-sm w-full h-[200px] md:w-[350px] md:h-[400px] bg-white text-blue-800 border shadow-md shadow-black/50 overflow-auto scrollbar-hide z-10`}>
                            {AllDishData.length > 0 ?
                                AllDishData.slice(0, 15).map((val) => {
                                    return (
                                        <div key={val.id}>
                                            <span className='dataItem font-bold px-6 py-6 text-[0.9rem] cursor-pointer hover:bg-gray-300 hover:text-black hover:rounded-sm' onClick={() => TakeDish(val.id, val.name)}>
                                                {val.name.toUpperCase()}
                                            </span>
                                            <hr className='border border-slate-300' />
                                        </div>
                                    );
                                }) : <span className='flex ml-6 pt-4 text-[0.8rem] text-black'><GoAlert className='text-[1rem] mx-2 text-red-500' /> No Dish Present , Add New Dish In Menu</span>}
                        </div>
                    )}


                </div>
                <div className="item-quantity flex flex-col col-span-3 my-2 z-5 md:my-0">
                    <label htmlFor="quantity" className='text-[0.85rem] font-medium md:m-1'>Quantity</label>
                    <input type="text" name='quantity' className={`rounded-sm py-2 px-3 bg-transparent border text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)} required />
                </div>
                <div className="plate-type flex flex-col col-span-2 z-5">
                    <label htmlFor="plate" className='text-[0.85rem] font-medium md:m-1'>Plate</label>
                    <select name="size" defaultValue={props.plate} className={`rounded-sm py-2 px-3 bg-transparent border cursor-pointer text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)}>
                        {
                            props.DefinedPlate_size.map(plate => {
                                return <option key={plate.id} value={plate.val}>{plate.plate_size}</option>
                            })
                        }
                    </select>
                </div>
                <div className="button flex justify-center flex-col col-span-1 z-5 mt-2 md:mt-0">
                    {props.itemsInput.length > 1 && <label htmlFor="button" className='text-[0.85rem] font-medium'>Delete</label>}
                    {props.itemsInput.length > 1 && <button type='button' className={`w-[4rem] h-[2rem] bg-red-600 text-white rounded-sm text-[1rem] transition-all ease-in-out duration-500 hover:scale-110 font-bold`} onClick={RemoveItemInput}>x</button>}
                </div>
            </div>
        </>
    )
}

export default Item
