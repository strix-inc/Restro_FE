import React, { useEffect, useState, useRef } from 'react';
import { Link } from 'react-router-dom';
import ItemList from './ItemList';
import axios from 'axios';


const GenerateBill = ({ mode, OrderID, All_Orders, dish, GeneratedBill }) => {
    var api = process.env.REACT_APP_BASE_URL

    let [discount, setDiscount] = useState(0);
    const [Payment_mode, setPayment_mode] = useState('Cash');
    const [platform, setPlatform] = useState('restaurant');
    const [Platform_Id, setPlatform_Id] = useState("");
    const [Quantity_size_ByUser, setQuantity_size_ByUser] = useState('');
    const [DISH_ID, setDISH_ID] = useState('');
    const [GetStaff, setGetStaff] = useState([]);
    const [SetStaff, setSetStaff] = useState('');
    var total = 0;

    const [ALL_ORDER, setALL_ORDER] = useState([]);
    const [ALL_DISH, setALL_DISH] = useState([]);

    const SubTotal_ref = useRef(null);
    const SGST_ref = useRef(null);
    const CGST_ref = useRef(null);
    const GRAND_TOTAL_ref = useRef(null);
    const Discount_amount_ref = useRef(null);

    const ChangeQuantity = () => {
        for (let i = 0; i < ALL_ORDER.length; i++) {
            let order = ALL_ORDER[i];
            if (order.dish === DISH_ID) {
                if (Quantity_size_ByUser <= 0) {
                    order.quantity = 1
                } else {
                    order.quantity = Quantity_size_ByUser
                }
            }
        }
    }
    ChangeQuantity();

    const get = () => {
        var dishes = [];
        var dish_map = [];
        for (let i = 0; i < All_Orders.length; i++) {
            let order = All_Orders[i];
            dishes.push({
                "id": order.id,
                "created_at": order.created_at,
                "modified_at": order.modified_at,
                "is_deleted": false,
                "restaurant": order.restaurant,
                "kot": order.kot,
                "invoice": order.invoice,
                "dish": order.dish,
                "name": order.dish_name,
                "cost": 1,
                "size": order.size,
                "quantity": order.quantity,
            })
        }
        for (let i = 0; i < dish.length; i++) {
            var dishs = dish[i];
            const dish_data = {
                id: dishs.id,
                rates: dishs.rates
            }
            dish_map.push(dish_data);
        }
        setALL_ORDER(dishes);
        setALL_DISH(dish_map);
    }


    const RateBasedOnplatform = () => {
        for (let i = 0; i < ALL_ORDER.length; i++) {
            let order = ALL_ORDER[i];
            let Dish_id = order.dish;
            for (let x = 0; x < ALL_DISH.length; x++) {
                let menu_dish = ALL_DISH[x];
                if (menu_dish.id === Dish_id) {
                    for (let j = 0; j < menu_dish.rates.length; j++) {
                        let rate = menu_dish.rates[j];
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
        }
    }
    RateBasedOnplatform();

    const Get_AllPlatform = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(`${api}/kitchen/platform`, {
            headers: headers
        }).then(val => {
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
    }


    const handleDiscount = (event) => {
        setDiscount(event.target.value);
    }

    const handlePaymentMode = (event) => {
        setPayment_mode(event.target.value);
    }

    const handleStaff = (event) => {
        setSetStaff(event.target.value);
    }

    const handleGenerateInvoice = () => {

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        const Invoice_Data = {
            id: OrderID,
            orders: ALL_ORDER,
            subtotal: parseInt(SubTotal_ref.current.value),
            discount: parseInt(Discount_amount_ref.current.value),
            delivery_charge: 0,
            platform: Platform_Id,
            payment_type: Payment_mode,
            staff: SetStaff
        }

        axios.put(`${api}/finance/invoice`, Invoice_Data, { headers: headers })
            .then(val => {
                if (val.status === 201) {
                    window.location = '/dashboard';
                }
            })


    }

    // api to get all the staff members !!
    const GetAllStaff = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`${api}/kitchen/staff`, { headers: headers })
            .then(val => {
                setGetStaff(val.data.data);
            }).catch(err => {
                console.log(err);
            })
    }


    useEffect(() => {
        Get_AllPlatform();
        get();
        GetAllStaff();
    }, [platform, All_Orders, dish])

    return (
        <>
            <div className='lg:w-[80%] lg:ml-[20%]'>
                <div className="setting relative w-full m-auto mt-[3rem] lg:mt-[4rem] ">
                    <h1 className={`text-[1.5rem] tracking-wide font-bold mx-3 lg:mx-6 lg:py-2 py-1 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Billing</h1><hr />
                    <form className="Billing-details w-[96%] lg:w-[94%] m-auto mt-6 mb-4 md:mb-0">
                        <div className="grid md:grid-cols-2 lg:grid-cols-4 gap-2 my-3">
                            <input type="text" placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} defaultValue={'Cash'} readOnly />
                            <input type="text" defaultValue={'0'} placeholder='Contact' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            <select name="category" id="category" className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} onChange={handlePlatform}>
                                <option value="restaurant">Restaurant</option>
                                <option value="zomato">Zomato</option>
                                <option value="swiggy">Swiggy</option>
                            </select>
                            <select name="category" id="category" className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} onChange={handleStaff}>
                                <option value="restaurant">Staff</option>
                                {
                                    GetStaff.map((val, ind) => {
                                        return <option key={ind} value={val.id}>{val.name}</option>
                                    })
                                }
                            </select>
                        </div>
                        <div className="item-list mt-4">
                            <h1 className={`font-bold text-[1.2rem] underline ${mode === 'black' ? 'text-white ' : 'text-black'}`}>List</h1>
                            <div className={`table-wrapper scrollbar-hide ${mode === 'black' ? 'text-white' : 'text-black'}`}>
                                <table>
                                    <thead>
                                        <th>Sl No.</th>
                                        <th className='px-[8rem]'>Name</th>
                                        <th>Rate</th>
                                        <th>Size</th>
                                        <th className='px-[5.8rem]'>Quantity</th>
                                        <th>Amount</th>
                                        <th>Delete</th>
                                    </thead>
                                    {
                                        ALL_ORDER.map((val, idx) => {
                                            total += val.cost * val.quantity
                                            return <ItemList
                                                mode={mode}
                                                id={val.id}
                                                dish_id={val.dish}
                                                key={idx}
                                                index={idx}
                                                name={val.name}
                                                size={val.size}
                                                quantity={val.quantity}
                                                cost={val.cost}
                                                GeneratedBill={GeneratedBill}
                                                setQuantity_size_ByUser={setQuantity_size_ByUser}
                                                setDISH_ID={setDISH_ID}
                                                ChangeQuantity={ChangeQuantity}
                                            />
                                        })
                                    }
                                </table>
                            </div>
                        </div>

                        <div className="grid  md:grid-cols-2 lg:grid-cols-4 gap-4 mt-7">
                            <div className='flex flex-col'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Sub Total</label>
                                <input type="text" ref={SubTotal_ref} value={total} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Discount %</label>
                                <input type="text" value={discount} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} onChange={handleDiscount} />
                            </div>
                            <div className='flex flex-col'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Discount Amount</label>
                                <input type="text" ref={Discount_amount_ref} value={Math.round(total * (discount / 100) * 100) / 100} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Net Amount</label>
                                <input type="text" value={total - (total * (discount / 100))} className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                        </div>

                        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                            <div className='flex flex-col'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>S.G.S.T @2.5%</label>
                                <input type="text" ref={SGST_ref} value={Math.round((total - (total * (discount / 100))) * (2.5 / 100) * 100) / 100} placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col my-2 md:my-0'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>C.G.S.T @2.5%</label>
                                <input type="text" ref={CGST_ref} value={Math.round((total - (total * (discount / 100))) * (2.5 / 100) * 100) / 100} placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>
                            <div className='flex flex-col col-span-2'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Grand Total</label>
                                <input type="text" ref={GRAND_TOTAL_ref} value={Math.round((total - (total * (discount / 100))) + (total - (total * (discount / 100))) * (2.5 / 100) + (total - (total * (discount / 100))) * (2.5 / 100))} placeholder='Party name' className={`p-2 border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`} readOnly />
                            </div>

                        </div>
                        <div className="md:grid md:grid-cols-2 lg:grid-cols-4 gap-4 mt-5">
                            <div className='flex flex-col col-span-2'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Comments</label>
                                <textarea name="textarea" id="textarea" cols="10" rows="2" placeholder='Leave a comment here ...' className={`p-2 text-[0.9rem] border rounded-md ${mode === 'black' ? 'text-white bg-transparent border-slate-600' : 'text-black'} outline-none`}></textarea>
                            </div>
                            <div className='flex flex-col my-3 md:my-0'>
                                <label className={`mx-1 text-[0.9rem] ${mode === 'black' ? 'text-slate-300' : 'text-slate-500'} font-semibold`}>Payment Type</label>
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
