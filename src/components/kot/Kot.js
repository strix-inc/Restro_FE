import React, { useState } from 'react'
import AddedItem from './AddedItem';
import Item from './Item';
import axios from 'axios';

const Kot = (props) => {

    const data = { id: Math.random(), name: '', quantity: 1, size: 'Full' };
    let [itemsInput, setItemInput] = useState([data]);

    const [tableNo, setTableNo] = useState('');
    const [formdata, setFormdata] = useState([]);

    const handleInputChange = (event, index) => {
        const val = [...itemsInput];
        val[index][event.target.name] = event.target.value;
        setItemInput(val);
    }

    // Get the value of the input fields !!
    const handleTableInput = (event) => {
        setTableNo(event.target.value);
    }

    // submit the form input 
    const handleFormSubmit = (event) => {
        event.preventDefault();
        const InputData = {
            table: tableNo,
            items: itemsInput,
        }
        setFormdata([...formdata, tableNo]);

        // sending the post request to the backend !!
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.post('https://restrofin.pythonanywhere.com/finance/kot', InputData, {
            headers: headers
        }).then(val => {
            console.log(val.data.data.id);
            localStorage.setItem('kotID', val.data.data.id);
        }).catch(function (error) {
            console.log(error);
        });


        // clear all the input fields in kot page after adding the item !!
        Array.from(document.querySelectorAll('input')).forEach(input => (input.value = ''))
        setItemInput([{}]);
        setTableNo('');
    }

    // Add Item Input table as extra !!
    const AddItemInput = () => {
        setItemInput([...itemsInput, data])
    }
    // Remove Input item table if not required !!
    const RemoveItemInput = (index) => {
        const listItem = [...itemsInput];
        listItem.splice(index, 1);
        setItemInput(listItem);
    }

    return (
        <>
            {/* <Arrow /> */}
            <div className={`flex flex-col w-[80%] ml-[20%]`}>
                <form onSubmit={handleFormSubmit} className='relative w-[98%] m-auto top-[4rem]'>
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>KOT</h1>
                    <div className={`kot flex flex-col justify-center rounded-md p-[2rem] z-1 border border-t-slate-200 shadow-slate-400 shadow-sm ${props.mode === 'black' ? 'nav_bg text-white border-slate-700 border-t-slate-700' : 'bg-white'}`}>
                        <div className='grid grid-cols-2 mb-2'>
                            <div className="table-number flex flex-col col-span-1">
                                <label htmlFor="table-no" className='font-medium text-[0.85rem] m-1'>Table NO.</label>
                                <input type="text" name='TableNo' value={tableNo} placeholder='Enter Item Table No.' className={`rounded-md py-2 px-3 bg-transparent border mr-4 text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={handleTableInput} required />
                            </div>
                            <div className="plate-type flex flex-col col-span-1">
                                <label htmlFor="plate" className='font-medium text-[0.85rem] m-1'>Staff</label>
                                <select name="Staff" className={`rounded-md py-[0.63rem] px-3 bg-transparent border cursor-pointer mr-[3rem] text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`}>
                                    <option value=""></option>
                                    <option value="x">x</option>
                                    <option value="y">y</option>
                                    <option value="z">z</option>
                                    <option value="a">a</option>
                                </select>
                            </div>
                        </div>
                        {
                            itemsInput.map((datas, index) => {
                                return (<Item
                                    key={index}
                                    removeInput={RemoveItemInput}
                                    Index={index}
                                    itemsInput={itemsInput}
                                    handleInputChange={handleInputChange}
                                    Data={datas}
                                    mode={props.mode}
                                />)
                            })
                        }
                        <div className="add-Item-detail-table mt-8 flex justify-between">
                            {/* button to be added */}
                            {itemsInput.length - 1 >= 0 && <button type='button' className={`w-[12rem] h-[2.5rem] bg-amber-400 text-black rounded-md text-[1rem] font-medium transition-all ease-in-out duration-500 hover:scale-110`} onClick={AddItemInput}>Add More</button>}

                            <button type='submit' className='w-[12rem] h-[2.5rem] rounded-md text-[1rem] font-medium  bg-green-600 text-white transition-all ease-in-out duration-500 hover:scale-110 mr-[3rem]'>Save</button>
                        </div>
                    </div>
                </form>
                <div className="addedItem">
                    <AddedItem mode={props.mode} formdata={formdata} />
                </div>
            </div>
        </>
    )
}

export default Kot
