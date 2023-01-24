import React, { useState } from 'react'
import TableBill from './ItemTicket/TableBill';

const AddedItem = (props) => {
    const [Bill, setBill] = useState(false);

    // Handling Bill Pop-Ups On Each Table
    const handleBill = () => {
        setBill(true);
    }
    const closeModal = () => {
        setBill(false);
    }

    return (
        <>
            {/* let get the Table No. from which the item has been Oredered */}
            {Bill === true ? <TableBill closeModal={closeModal} OrderedItem={props.formdata} /> : ''}
            <div className={`AddedItem-Modal w-[96%] relative border border-t-slate-200 shadow-slate-400 shadow-sm m-auto mt-[6rem] rounded-md ${props.mode === 'black' ? 'nav_bg text-white border-t-slate-700 border-slate-700' : 'bg-white'}`}>
                <div className="Item-added px-4 py-2">
                    <h1 className='text-[1rem]'>Active :</h1>
                </div>
                <div className="showAddedItem grid grid-cols-10 gap-x-4 gap-y-4 p-4">
                    {/* {
                        props.showActiveKOT.map((val, index) => {
                            return <div key={index} className="item border-2 border-blue-600 text-[1.2rem] p- text-green-700 rounded-md cursor-pointer hover:bg-blue-600 hover:text-white text-center" onClick={handleBill}>Table :</div>
                        })
                    } */}

                    {/* {
                        props.formdata.map((val, index) => {
                            return <div key={index} className={`item border-2 border-blue-600 text-[1rem] ${props.mode === 'black' ? 'text-green-400' : 'text-green-700'} rounded-md cursor-pointer hover:bg-blue-600 hover:text-white text-center py-1`} onClick={handleBill}>Table : {val.table ? val.table : ''}</div>
                        })
                    } */}
                </div>
            </div>
        </>
    )
}

export default AddedItem
