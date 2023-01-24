import React from 'react'

const Item = (props) => {

    // get all the values from the input fields !!
    const handleInputChange = (event, index) => {
        props.handleInputChange(event, index);
    }


    // Remove extra added form of Item
    const RemoveItemInput = () => {
        props.removeInput(props.Index);
    }

    return (
        <>
            <div className="Item-detail grid grid-cols-10 gap-x-4 my-2">
                <div className="itemName flex flex-col col-span-4">
                    <label htmlFor="itemName" className='text-[0.85rem] font-medium m-1'>Item Name</label>
                    <input type="text" name='name' placeholder='Item Name' className={`rounded-md py-2 px-3 bg-transparent border text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)} />
                </div>
                <div className="item-quantity flex flex-col col-span-3">
                    <label htmlFor="quantity" className='text-[0.85rem] font-medium m-1'>Quantity</label>
                    <input type="text" name='quantity' placeholder='quantity' className={`rounded-md py-2 px-3 bg-transparent border text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)} />
                </div>
                <div className="plate-type flex flex-col col-span-2">
                    <label htmlFor="plate" className='text-[0.85rem] font-medium m-1'>Plate</label>
                    <select name="size" className={`rounded-md py-2 px-3 bg-transparent border cursor-pointer text-[0.9rem] ${props.mode === 'black' ? 'border-slate-600' : 'border-slate-300'}`} onChange={event => handleInputChange(event, props.Index)}>
                        <option value="Full">Full Plate</option>
                        <option value="Half">Half Plate</option>
                    </select>
                </div>
                <div className="button flex justify-center flex-col col-span-1">
                    {props.itemsInput.length > 1 && <label htmlFor="button" className='text-[0.85rem] font-medium'>Delete</label>}
                    {/* button to added */}
                    {props.itemsInput.length > 1 && <button type='button' className={`w-[4rem] h-[2rem] bg-red-600 text-white rounded-md text-[1rem] transition-all ease-in-out duration-500 hover:scale-110 font-bold`} onClick={RemoveItemInput}>x</button>}
                </div>
            </div>
        </>
    )
}

export default Item
