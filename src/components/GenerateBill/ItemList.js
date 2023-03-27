import React, { useState } from 'react';
import axios from 'axios';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';


const ItemList = ({ id, dish_id, name, size, quantity, cost, index, GeneratedBill, mode, setQuantity_size_ByUser, setDISH_ID, ChangeQuantity }) => {
    let [quantitySize, setQuantitySize] = useState(quantity);

    const Increase = (dshID) => {
        let Qty_size = ++quantitySize;
        setQuantitySize(Qty_size);
        setQuantity_size_ByUser(Qty_size);
        setDISH_ID(dshID)
        ChangeQuantity();
    }
    const Decrease = (dshID) => {
        let Qty_size = (quantitySize <= 0 ? 1 : --quantitySize);
        setQuantitySize(Qty_size);
        setQuantity_size_ByUser(Qty_size)
        setDISH_ID(dshID)
        ChangeQuantity();
    }

    const DeleteDishFromList = (Dish_id) => {
        axios.delete('https://restrofin.pythonanywhere.com/finance/order', {
            headers: {
                Authorization: `Bearer ${localStorage.getItem('access')}`
            },
            data: {
                id: Dish_id
            }
        }).then(val => {
            if (val.status === 200) {
                toast.success("Item Deleleted Successfully", {
                    position: "top-right",
                    autoClose: 1000,
                    hideProgressBar: true,
                    closeOnClick: true,
                    pauseOnHover: false,
                    draggable: true,
                    progress: undefined,
                    theme: "dark",
                });
                GeneratedBill();
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    return (
        <>
            <div className="heading grid grid-cols-10">
                <span className={`border ${mode === 'black' ? 'border-slate-500 text-white' : 'border-slate-300'} flex justify-center items-center  py-1 font-semibold`}>{index + 1}</span>
                <span className={`col-span-3 border ${mode === 'black' ? 'border-slate-500 text-white' : 'border-slate-300'} flex justify-center items-center  py-1 font-semibold`}>{name}</span>
                <span className={`inWhite border ${mode === 'black' ? 'border-slate-500 text-white inBlack' : 'inWhite border-slate-300'} flex justify-center items-center  py-1 font-medium`}>{cost}</span>

                {/* add dropdown if required here  */}
                <span name="size" id="size" className={`inWhite flex justify-center items-center py-1 border ${mode === 'black' ? 'border-slate-500 text-white inBlack' : 'inWhite border-slate-300 text-black'} outline-none`}>{size}</span>
                <div className={`col-span-2 border ${mode === 'black' ? 'border-slate-500 text-white' : 'border-slate-300'} flex justify-center items-center  py-1 font-medium`}>
                    <button type='button' className={`w-6 h-4 bg-green-600 flex justify-center items-center text-white rounded-sm mx-4 font-bold cursor-pointer text-[0.8rem]`} onClick={() => Increase(dish_id)}>+</button>
                    <span>{quantitySize <= 0 ? 1 : quantitySize}</span>
                    <button type='button' className={`w-6 h-4 bg-red-500 flex justify-center items-center text-white rounded-sm mx-4 font-bold cursor-pointer text-[1.2rem]`} onClick={() => Decrease(dish_id)}>-</button>
                </div>
                <span className={`border ${mode === 'black' ? 'border-slate-500 text-white inBlack' : 'inWhite border-slate-300'} flex justify-center items-center py-1 font-medium`}>{quantitySize <= 0 ? cost * 1 : cost * quantitySize}</span>
                <span className={`border ${mode === 'black' ? 'border-slate-500 text-white inBlack' : 'inWhite border-slate-300'} flex justify-center items-center`}><RiDeleteBin2Fill className={`text-red-500 text-[1rem] cursor-pointer`} onClick={() => DeleteDishFromList(id)} /></span>
            </div>
            <ToastContainer position="top-right"
                autoClose={1000}
                hideProgressBar
                newestOnTop
                closeOnClick
                rtl={false}
                pauseOnFocusLoss
                draggable
                pauseOnHover={false}
                theme="dark"
            />
        </>
    )
}


export default ItemList
