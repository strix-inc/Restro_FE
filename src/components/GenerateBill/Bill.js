import React, { useState, useEffect } from 'react';
import axios from 'axios';
import GenerateBill from './GenerateBill';

const Bill = ({ mode }) => {

    const [Orders, setOrders] = useState([]);
    const [Alldish, setAllDish] = useState([]);
    const [OrderID, setOrderID] = useState('');
    const [Table, setTable] = useState(0);




    const GeneratedBill = () => {
        const id = localStorage.getItem('ActiveKotID');
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`https://restrofin.pythonanywhere.com/finance/invoice?id=${id}`, {
            headers: headers
        }).then(val => {
            setOrderID(val.data.data.id);
            setTable(val.data.data.table);
            var orders = val.data.data.orders;
            if (orders.length === 0) {
                window.location = '/kot';
            }
            var dishes = [];
            for (let i = 0; i < orders.length; i++) {
                var order = orders[i];
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
                    // "amount": order.cost * order.quantity,
                })
            }
            setOrders(dishes)
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
            var AllDish = val.data.data;
            var dish_map = {};
            for (let i = 0; i < AllDish.length; i++) {
                var dish = AllDish[i];
                dish_map[dish.id] = dish.rates;
            }
            setAllDish(dish_map);
        }).catch(function (error) {
            console.log(error);
        });
    }, [])

    return (
        <div>
            <GenerateBill
                mode={mode}
                OrderID={OrderID}
                Table={Table}
                All_Orders={Orders}
                dish={Alldish}
                GeneratedBill={GeneratedBill}
            />
        </div>
    )
}

export default Bill
