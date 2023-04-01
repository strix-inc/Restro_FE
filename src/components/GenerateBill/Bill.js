import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenerateBill from './GenerateBill';

const Bill = ({ mode }) => {

    const [Orders, setOrders] = useState([]);
    const [Alldish, setAllDish] = useState([]);
    const [OrderID, setOrderID] = useState('');

    const GeneratedBill = () => {
        const id = localStorage.getItem('ActiveKotID');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`https://restrofin.pythonanywhere.com/finance/invoice?id=${id}`, {
            headers: headers
        }).then(val => {
            setOrders(val.data.data.orders);
            setOrderID(val.data.data.id);
            var orders = val.data.data.orders;
            if (orders.length === 0) {
                window.location = '/kot';
            }
        }).catch((error) => {
            console.log(error);
        });
    }

    useEffect(() => {
        GeneratedBill();
    }, []);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get('https://restrofin.pythonanywhere.com/kitchen/dish', {
            headers: headers
        }).then(val => {
            setAllDish(val.data.data);
        }).catch(function (error) {
            console.log(error);
        });
    }, [])


    return (
        <div>
            <GenerateBill
                mode={mode}
                OrderID={OrderID}
                All_Orders={Orders}
                dish={Alldish}
                GeneratedBill={GeneratedBill}
                setOrders={setOrders}
            />
        </div>
    )
}

export default Bill
