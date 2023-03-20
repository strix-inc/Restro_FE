import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList';
import axios from 'axios';


const GenerateBill = ({ mode, OrderID, Table, All_Orders, dish, GeneratedBill }) => {
    var API = process.env.REACT_APP_INVOICE;
    var All_platform_API = process.env.REACT_APP_GET_ALL_PLATFORM;



    const [discount, setDiscount] = useState(0);
    const [Payment_mode, setPayment_mode] = useState('Cash');
    const [platform, setPlatform] = useState('restaurant');
    const [Platform_Id, setPlatform_Id] = useState("");
    var total = 0;

    const SubTotal_ref = useRef(null);
    const SGST_ref = useRef(null);
    const CGST_ref = useRef(null);
    const GRAND_TOTAL_ref = useRef(null);


    const RateBasedOnplatform = () => {
        for (let i = 0; i < All_Orders.length; i++) {
            let order = All_Orders[i];
            let Dish_id = order.dish;
            let rates = dish[Dish_id];

            for (let j = 0; j < rates.length; j++) {
                let rate = rates[j];
                if (rate.platform_name.toLowerCase() === platform) {
                    if (order.size === "Half") {
                        order.cost = rate.half_price;
                    }
                    else {
                        order.cost = rate.full_price;
                    }
                }
            }
        }
    }
    RateBasedOnplatform();

    const Get_AllPlatform = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(All_platform_API, {
            headers: headers
        }).then(val => {
            // console.log(val);
            let platform_data = val.data.data;
            for (let i = 0; i < platform_data.length; i++) {
                var Platform = platform_data[i];
                var platform_name = Platform.name;
                if (platform === platform_name.toLowerCase()) {
                    setPlatform_Id(Platform.id);
                }
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handlePlatform = (event) => {
        setPlatform(event.target.value);
        Get_AllPlatform();
    }


    const handleDiscount = (event) => {
        setDiscount(event.target.value);
    }

    const handlePaymentMode = (event) => {
        setPayment_mode(event.target.value);
    }

    const handleGenerateInvoice = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

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

        const data =
            [{
                Info: [
                    {
                        date: current_date,
                        time: current_time,
                        customer: "Cash",
                        mode: Payment_mode,
                        table: Table,
                    }
                ],
                rates: All_Orders,
                total_price: [
                    {
                        subTotal: parseInt(SubTotal_ref.current.value),
                        sgst: parseFloat(SGST_ref.current.value),
                        cgst: parseFloat(CGST_ref.current.value),
                        grand_total: parseInt(GRAND_TOTAL_ref.current.value),
                    }
                ]
            }]

        const Invoice_Data = {
            id: OrderID,
            orders: All_Orders,
            subtotal: parseInt(SubTotal_ref.current.value),
            discount: parseInt(discount),
            platform: Platform_Id,
        }

        axios.put(API, Invoice_Data, { headers: headers })
            .then(val => {
                if (val.status === 201) {
                    window.location = '/kot';
                }
            })


        localStorage.setItem('invoice_data', JSON.stringify(data));

    }

    useEffect(() => {
        Get_AllPlatform();
    }, [platform])

    return (
        <>
            <div className='w-[80%] ml-[20%]'>
                <div className="setting relative w-full m-auto mt-[4rem] ">
                    <h1 className={`text-[1.5rem] tracking-wide font-bold mx-6 py-2 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Billing</h1><hr />
                    <form className="Billing-details w-[94%] m-auto mt-6">
                        <div className="grid grid-cols-3 gap-4 my-3">
                            <input type="text" placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} defaultValue={'Cash'} readOnly />
                            <input type="text" defaultValue={'0'} placeholder='Contact' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            <select name="category" id="category" className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} onChange={handlePlatform}>
                                <option value="restaurant">Restaurant</option>
                                <option value="zomato">Zomato</option>
                                <option value="swiggy">Swiggy</option>
                            </select>
                        </div>
                        <div className="item-list mt-4">
                            <h1 className={`font-bold text-[1.2rem] underline ${mode === 'black' ? 'text-white ' : 'text-black'}`}>List</h1>
                            <div className={`heading grid grid-cols-10 ${mode === 'black' ? 'bg-blue-500 text-white' : 'bg-blue-200'}`}>
                                <span className={`border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Sl No.</span>
                                <span className={`col-span-3 border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Name</span>
                                <span className={`border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Rate</span>
                                <span className={`border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Size</span>
                                <span className={`col-span-2 border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Quantity</span>
                                <span className={`border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Amount</span>
                                <span className={`border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} flex justify-center items-center underline py-1 font-semibold`}>Delete</span>
                            </div>

                            {/* item mapping */}
                            {
                                All_Orders.map((val, idx) => {
                                    total += val.cost * val.quantity
                                    return <ItemList
                                        mode={mode}
                                        id={val.id}
                                        key={idx}
                                        index={idx}
                                        name={val.name}
                                        size={val.size}
                                        quantity={val.quantity}
                                        cost={val.cost}
                                        GeneratedBill={GeneratedBill}
                                    />
                                })
                            }
                            {/* ----------- */}

                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-7">
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Sub Total</label>
                                <input type="text" ref={SubTotal_ref} value={total} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Discount %</label>
                                <input type="text" className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} onChange={handleDiscount} />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Discount Amount</label>
                                <input type="text" value={total * (discount / 100)} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Net Amount</label>
                                <input type="text" value={total - (total * (discount / 100))} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                        </div>

                        <div className="grid grid-cols-4 gap-4 mt-5">
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">S.G.S.T @2.5%</label>
                                <input type="text" ref={SGST_ref} value={(total - (total * (discount / 100))) * (2.5 / 100)} placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">C.G.S.T @2.5%</label>
                                <input type="text" ref={CGST_ref} value={(total - (total * (discount / 100))) * (2.5 / 100)} placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col col-span-2'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Grand Total</label>
                                <input type="text" ref={GRAND_TOTAL_ref} value={Math.round((total - (total * (discount / 100))) + (total * (2.5 / 100)) + (total * (2.5 / 100)))} placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>

                        </div>
                        <div className="grid grid-cols-4 gap-4 mt-5">
                            <div className='flex flex-col col-span-2'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Comments</label>
                                <textarea name="textarea" id="textarea" cols="10" rows="2" placeholder='Leave a comment here ...' className={`p-2 text-[0.9rem] border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`}></textarea>
                            </div>
                            <div className='flex flex-col'>
                                <label className="mx-1 text-[0.9rem] text-slate-500 font-semibold">Payment Type</label>
                                <select name="category" id="category" className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none text-[0.8rem] h-[80%]`} onChange={handlePaymentMode}>
                                    <option value="Cash">CASH</option>
                                    <option value="Upi">UPI</option>
                                    <option value="Card">CARD</option>
                                </select>
                            </div>
                            {/* button to be added */}
                            <div className="button flex justify-end items-center mt-4 border-none">
                                <Link to={{ pathname: '/invoice' }} target="_blank" rel="noreferrer" className="w-[80%] h-[2.5rem] bg-green-600 flex justify-center items-center text-white font-semibold hover:scale-105 transition-all ease-in-out duration-300 border-none rounded-md" onClick={handleGenerateInvoice}>Save</Link>
                            </div>
                        </div>
                    </form>
                </div>
            </div>
        </>
    )
}

export default GenerateBill
