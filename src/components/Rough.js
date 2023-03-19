import React, { useEffect, useState } from 'react';
import axios from 'axios';


const Rough = () => {

    const [data, setData] = useState([]);

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        const AllDish = () => {
            axios.get('https://restrofin.pythonanywhere.com/kitchen/dish', {
                headers: headers
            }).then(val => {
                setData(val.data.data);
            }).catch(function (error) {
                console.log(error);
            });
        }
        AllDish();
    }, [])

    return (
        <>
            <div className={`flex flex-col w-[80%] ml-[20%]`}>
                <div className='mt-[4rem] m-2'>
                    Rough
                </div>
            </div>
        </>
    )
}

export default Rough
