import React from 'react'

const TableBill = (props) => {
    const handleBill = () => {
        props.closeModal();
    }

    return (
        <>
            <div className="login_conatiner fixed drop-shadow-sm bg-white/40 w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0">
                {
                    props.OrderedItem.map((val, index) => {
                        return <div key={index} className="main w-[40%] m-auto absolute top-[25%] left-[30%] p-4 rounded-md bg- shadow-slate-400 shadow-inner border-b-[2px] border-slate-400 bg-gray-200">
                            <div className="modal">
                                <h1 className="title text-[1.2rem]">TABLE NO : {val.table}</h1>
                            </div>
                            <div className="Table mt-4">
                                <ul className='grid grid-x-4 grid-cols-7 font-semibold text-[0.8rem]'>
                                    <li className='col-span-3'>ITEM</li>
                                    <li className='col-span-1'>PLATE</li>
                                    <li className='col-span-1'>QUANTITY</li>
                                    <li className='col-span-2 text-center'>DELETE</li>
                                </ul>
                                <ul className=''>
                                    {
                                        val.items.map((item) => {
                                            return <li key={item.id} className='grid grid-cols-7 my-2'>
                                                <span className='col-span-3'>{item.name}</span>
                                                <span className='col-span-1'>{item.size}</span>
                                                <span className='col-span-1 text-center'>{item.quantity}</span>
                                                <button type='button' className='w-[3rem] h-[2rem] bg-red-600 col-span-2 flex justify-center items-center mx-14 rounded-md transition-all ease-in-out duration-500 hover:scale-110'>
                                                    <span className='text-white'>X</span>
                                                </button>
                                            </li>
                                        })

                                    }
                                </ul>

                            </div>
                            <div className="button flex justify-end mt-3">
                                <button type='button' className='w-[3.5rem] h-[2rem] bg-red-600 rounded-md text-white text-[0.8rem] font-bold mx-2 transition-all ease-in-out duration-500 hover:scale-110' onClick={handleBill}>Cancel</button>
                                <button type='button' className='w-[6rem] h-[2rem] bg-green-600 rounded-md text-white text-[0.8rem] font-bold transition-all ease-in-out duration-500 hover:scale-110 hover:mx-2'>Generate Bill</button>
                            </div>
                        </div>
                    })
                }
            </div>
        </>
    )
}

export default TableBill;
