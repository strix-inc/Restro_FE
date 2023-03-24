import React, { useEffect, useState } from 'react'
import AddedItem from './AddedItem';
import Item from './Item';
import OrederedKT from './ItemTicket/OrederedKT';
import axios from 'axios';

const Kot = (props) => {
    var Post_order_API = process.env.REACT_APP_POST_ORDER
    var Invoice_API = process.env.REACT_APP_INVOICE

    // const data = { quantity: 0, size: 'Full' };
    let [itemsInput, setItemInput] = useState([{ quantity: 0, size: 'Full' }]);
    let [DefinedPlate_size, setDefintedPlate_size] = useState([
        { id: 1, val: "Full", plate_size: "Full" },
        { id: 2, val: "Half", plate_size: "Half" },
    ])

    const [tableNo, setTableNo] = useState('');
    const [formdata, setFormdata] = useState([]);
    const [ActiveKot, setActiveKot] = useState([]);
    const [OrderPage, setOrderPage] = useState(false);
    const [DishID, setDishID] = useState('');
    const [rough, setRough] = useState(true);
    const [plate, setPlate] = useState('Full');

    const [Ordered_DishName, setOrdered_DishName] = useState('');
    const [OrderTicket, setOrderTicket] = useState([]);

    const getkotTable = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`${Invoice_API}?finalized=False`, {
            headers: headers
        }).then(val => {
            const CurrentOrders = val.data.data;
            for (let i = 0; i < CurrentOrders.length; i++) {
                let current_order = CurrentOrders[i];
                if (current_order.orders.length === 0) {
                    axios.delete(Invoice_API, {
                        headers: {
                            Authorization: `Bearer ${localStorage.getItem('access')}`
                        },
                        data: {
                            id: current_order.id
                        }
                    }).then(val => {
                        if (val.status === 200) {
                            getkotTable();
                            setActiveKot(CurrentOrders);
                        }
                    }).catch(function (error) {
                        console.log(error);
                    });
                }
            }
            setActiveKot(CurrentOrders);
        }).catch(function (error) {
            console.log(error);
        });
    }


    // get ordered dish id from kot page !!
    const getDishID = (id, name) => {
        setDishID(id);
        setOrdered_DishName(name);
    }

    // get the value from the kot page !!
    const handleInputChange = (event, index) => {

        const val = [...itemsInput];
        val[index]["id"] = DishID;
        val[index]["Dish_name"] = Ordered_DishName;
        val[index][event.target.name] = event.target.value;
        setItemInput(val);
    }

    // Get the value of the input fields !!
    const handleTableInput = (event) => {
        setTableNo(event.target.value);
        setDefintedPlate_size([
            { id: 1, val: "Full", plate_size: "Full" },
            { id: 2, val: "Half", plate_size: "Half" }
        ])
    }

    // submit the form input 
    const handleFormSubmit = async (event) => {
        event.preventDefault();

        const InputData = {
            table: tableNo,
            items: itemsInput,
        }
        setFormdata([...formdata, tableNo]);

        // -------------------------------------------------------------------- Printing kitchen order ticket ------------------------------

        var date = new Date();
        var current_date = date.getDate() + "/" + ((date.getMonth() + 1) < 10 ? '0' + (date.getMonth() + 1) : date.getMonth() + 1) + "/" + date.getFullYear();
        var hr = date.getHours();
        hr = hr % 12
        hr = hr ? hr : '12'
        hr = hr < 10 ? '0' + hr : hr;
        var mnt = date.getMinutes();
        mnt = mnt < 10 ? '0' + mnt : mnt;
        var scnds = date.getSeconds();
        scnds = scnds < 10 ? '0' + scnds : scnds;
        var am_pm = hr >= 12 ? 'AM' : 'PM';
        var current_time = hr + ":" + mnt + ":" + scnds + " " + am_pm

        const OrderedData = {
            table: tableNo,
            time: current_time,
            date: current_date,
            items: itemsInput,
        }
        setOrderTicket([OrderedData]);

        // ------------------------------------------------------------------------------- end !! -----------------------------------------------


        // sending the post request to the backend !!
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        await axios.post(Post_order_API, InputData, {
            headers: headers
        }).then(val => {
            localStorage.setItem('kotID', val.data.data.id);
            if (val.status === 200) {
                getkotTable();
                // clear all the input fields in kot page after adding the item !!
                Array.from(document.querySelectorAll("input")).forEach(input => (input.value = ""));
                setItemInput([{ quantity: 0, size: 'Full' }]);
                setTableNo('');
                setDefintedPlate_size([{}])
                setRough(false);
                setPlate('Full');
                setOrderPage(true);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // Add Item Input table as extra !!
    const AddItemInput = () => {
        setItemInput([...itemsInput, { quantity: 0, size: 'Full' }])
    }
    // Remove Input item table if not required !!
    const RemoveItemInput = (index) => {
        // setItemInput(itemsInput.filter((s, idx) => index !== idx));

        const listItem = [...itemsInput];
        listItem.splice(index, 1);
        setItemInput(listItem)
    }

    useEffect(() => {
        getkotTable();
    }, [])

    return (
        <>
            {OrderPage && <OrederedKT OrderTicket={OrderTicket} setOrderPage={setOrderPage} ActiveKot={ActiveKot} />}
            {/* <Arrow /> */}
            <div className={`flex flex-col w-[80%] ml-[20%]`}>
                <form onSubmit={handleFormSubmit} className='relative w-[98%] m-auto top-[4rem]'>
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>KOT</h1>
                    <div className={`kot flex flex-col justify-center rounded-md p-[2rem] z-1 border border-t-slate-200 shadow-slate-400 shadow-sm ${props.mode === 'black' ? 'nav_bg text-white border-slate-700 border-t-slate-700' : 'bg-white'}`}>
                        <div className='grid grid-cols-2 mb-2'>
                            <div className="table-number flex flex-col col-span-1">
                                <label htmlFor="table-no" className='font-medium text-[0.85rem] m-1'>Table NO.</label>
                                <input type="text" name='TableNo' value={tableNo} placeholder='Enter Item Table No.' className={`rounded-md py-2 px-3 bg-transparent border w-[80%] text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={handleTableInput} required />

                            </div>
                            {/* <div className="plate-type flex flex-col col-span-1">
                                <label htmlFor="plate" className='font-medium text-[0.85rem] m-1'>Staff</label>
                                <select name="Staff" className={`rounded-md py-[0.63rem] px-3 bg-transparent border cursor-pointer mr-[3rem] text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`}>
                                    <option value=""></option>
                                    <option value="x">x</option>
                                    <option value="y">y</option>
                                    <option value="z">z</option>
                                    <option value="a">a</option>
                                </select>
                            </div> */}
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
                                    DefinedPlate_size={DefinedPlate_size}
                                    getDishID={getDishID}
                                    plate={plate}
                                    rough={rough}
                                    setRough={setRough}
                                />)
                            })
                        }
                        <div className="add-Item-detail-table mt-8 flex justify-between">
                            {itemsInput.length - 1 >= 0 && <button type='button' className={`w-[12rem] h-[2.5rem] bg-amber-400 text-black rounded-md text-[1rem] font-medium transition-all ease-in-out duration-500 hover:scale-110`} onClick={AddItemInput} >Add More</button>}

                            <button type='submit' className='w-[12rem] h-[2.5rem] rounded-md text-[1rem] font-medium  bg-green-600 text-white transition-all ease-in-out duration-500 hover:scale-110 mr-[3rem]'>Save</button>
                        </div>
                    </div>
                </form>
                <div className="addedItem">
                    <AddedItem
                        mode={props.mode}
                        formdata={formdata}
                        ActiveKot={ActiveKot}
                        getkotTable={getkotTable}
                    />
                </div>
            </div>
        </>
    )
}

export default Kot
