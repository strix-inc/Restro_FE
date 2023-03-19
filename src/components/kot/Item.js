import React, { useEffect, useState } from 'react';
import axios from 'axios';

const Item = (props) => {
    var API = process.env.REACT_APP_GET_ALL_DISH

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
            axios.get(API, {
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
            <div className="Item-detail grid grid-cols-10 gap-x-4 my-2">
                <div className="itemName flex flex-col col-span-4">
                    <label htmlFor="itemName" className='text-[0.85rem] font-medium m-1'>Item Name</label>
                    <input type="text" name='name' value={props.rough === true ? wordEntered : ''} placeholder='Item Name' className={`rounded-md py-2 px-3 bg-transparent border text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={handleFilter} required />

                    {suggestion && wordEntered && (
                        <div className="dataResult absolute mt-[5rem] p-1 rounded-md w-[350px] h-[400px] bg-black/80 text-white overflow-auto scrollbar-hide z-10">
                            {AllDishData.slice(0, 15).map((val) => {
                                return (
                                    <div key={val.id} className='dataItem font-bold p-1 text-[0.9rem] cursor-pointer hover:bg-gray-200 hover:text-black hover:rounded-md' onClick={() => TakeDish(val.id, val.name)}>{val.name.toUpperCase()} </div>
                                );
                            })}
                        </div>
                    )}


                </div>
                <div className="item-quantity flex flex-col col-span-3 z-5">
                    <label htmlFor="quantity" className='text-[0.85rem] font-medium m-1'>Quantity</label>
                    <input type="text" name='quantity' placeholder='quantity' className={`rounded-md py-2 px-3 bg-transparent border text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)} required />
                </div>
                <div className="plate-type flex flex-col col-span-2 z-5">
                    <label htmlFor="plate" className='text-[0.85rem] font-medium m-1'>Plate</label>
                    <select name="size" defaultValue={props.plate} className={`rounded-md py-2 px-3 bg-transparent border cursor-pointer text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)}>
                        {
                            props.DefinedPlate_size.map(plate => {
                                return <option key={plate.id} value={plate.val}>{plate.plate_size}</option>
                            })
                        }
                    </select>
                </div>
                <div className="button flex justify-center flex-col col-span-1 z-5">
                    {props.itemsInput.length > 1 && <label htmlFor="button" className='text-[0.85rem] font-medium'>Delete</label>}
                    {props.itemsInput.length > 1 && <button type='button' className={`w-[4rem] h-[2rem] bg-red-600 text-white rounded-md text-[1rem] transition-all ease-in-out duration-500 hover:scale-110 font-bold`} onClick={RemoveItemInput}>x</button>}
                </div>
            </div>
        </>
    )
}

export default Item
