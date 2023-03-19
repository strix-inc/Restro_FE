import React from 'react'
import ActiveTable from './ItemTicket/ActiveTable';

const AddedItem = (props) => {

    return (
        <>
            <div className={`AddedItem-Modal w-[98%] relative border border-t-slate-200 shadow-slate-400 shadow-sm m-auto mt-[5rem] rounded-md ${props.mode === 'black' ? 'nav_bg text-white border-t-slate-700 border-slate-700' : 'bg-white'} z-0`}>
                <div className="Item-added px-4 py-2">
                    <h1 className='text-[1rem]'>Active :</h1>
                </div>
                <div className="showAddedItem grid grid-cols-3 gap-x-4 gap-y-4 p-4">
                    <ActiveTable mode={props.mode} ActiveKot={props.ActiveKot} getkotTable={props.getkotTable} />
                </div>
            </div>
        </>
    )
}

export default AddedItem
