import React, { useState } from 'react';
import axios from 'axios';
import { RiDeleteBin2Fill } from 'react-icons/ri';
import { ToastContainer, toast } from 'react-toastify';


const ItemList = ({ id, dish_id, name, size, quantity, cost, index, GeneratedBill, mode, setQuantity_size_ByUser, setDISH_ID, ChangeQuantity }) => {
    var api = process.env.REACT_APP_BASE_URL
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
        axios.delete(`${api}/finance/order`, {
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
            <tbody>
                <tr>
                    <td>{index + 1}</td>
                    <td>{name}</td>
                    <td>{cost}</td>
                    <td>{size}</td>
                    <td>
                        <div className={`col-span-2 flex justify-center items-center  py-1 font-medium`}>
                            <button type='button' className={`w-6 h-4 bg-green-600 flex justify-center items-center text-white rounded-sm mx-4 font-bold cursor-pointer text-[0.8rem]`} onClick={() => Increase(dish_id)}>+</button>
                            <span>{quantitySize <= 0 ? 1 : quantitySize}</span>
                            <button type='button' className={`w-6 h-4 bg-red-500 flex justify-center items-center text-white rounded-sm mx-4 font-bold cursor-pointer text-[1.2rem]`} onClick={() => Decrease(dish_id)}>-</button>
                        </div>
                    </td>
                    <td>{quantitySize <= 0 ? cost * 1 : cost * quantitySize}</td>
                    <td><RiDeleteBin2Fill className={`text-red-500 text-[1rem] cursor-pointer flex justify-center ml-4`} onClick={() => DeleteDishFromList(id)} /></td>
                </tr>
            </tbody>
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
