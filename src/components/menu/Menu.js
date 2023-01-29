import React, { useState } from 'react'
import Accordion from './Accordion'
import AddItem from './AddItemform/AddItem';

const Menu = ({ mode }) => {
    const data = [
        {
            id: 1,
            Iname: 'starter',
            items: [{ name: 'Chicken-Biryani' }, { name: 'Chicken-punjabi' }, { name: 'Chicken-muglai' }, { name: 'Chicken-tandoor' },
            { name: 'Chawmin' }, { name: 'Chicken-Chilli' }, { name: 'Samosa' }, { name: 'Kachawri' }]
        },
        {
            id: 2,
            Iname: 'main course',
            items: [{ name: 'p' }, { name: 'q' }, { name: 'r' }, { name: 's' }]
        },
        {
            id: 3,
            Iname: 'after main',
            items: [{ name: 'l' }, { name: 'm' }, { name: 'n' }, { name: '0' }]
        },
        {
            id: 4,
            Iname: 'Dinner',
            items: [{ name: 'Chawal' }, { name: 'roti' }, { name: 'dal-fry' }, { name: 'mixed-veg' }]
        },
        {
            id: 5,
            Iname: 'Fast food',
            items: [{ name: 'Chawmin' }, { name: 'Chicken-Chilli' }, { name: 'Samosa' }, { name: 'Kachawri' }]
        },
        {
            id: 6,
            Iname: 'Breakfast',
            items: [{ name: 'Idli' }, { name: 'Dosa' }, { name: 'Aalu-Paratha' }, { name: 'Puri-Sabji' }]
        }
    ]

    const [Data, setData] = useState(data);
    const [filterItem, setFilterItem] = useState(data);
    const [search, setSearch] = useState('');
    const [AdditemForm, setAdditemForm] = useState(false);

    // filter menu item from lists !!
    const SearchedData = (event) => {
        const searchInput = event.target.value;

        if (searchInput.length > 0) {
            const searchInput = event.target.value;
            const test2 = Data.map((company) => {
                let details = company.items.filter((detail) =>
                    detail.name.toLowerCase().includes(searchInput.toLowerCase())
                );
                if (!details.length) {
                    return null;
                }
                return { ...company, details };
            }).filter(Boolean);
            setData(test2);
        } else {
            setData(filterItem);
        }
        setSearch(searchInput);
    }

    // show add item form modal !!
    const AddItemForm = () => {
        setAdditemForm(true);
    }
    return (
        <>
            {AdditemForm === true ? <AddItem setAdditemForm={setAdditemForm} /> : ''}
            <div className="w-[80%] ml-[20%]">
                <div className={`Menus w-[96%] m-auto mt-[4.5rem] border ${mode === 'black' ? 'border-slate-700 nav_bg' : 'bg-white border-slate-300'} rounded-md`}>
                    <div className="Add_menu button flex gap-2 mx-2 mt-2">
                        <input type="text" value={search} placeholder='search item here' className={`border px-3 py-[0.5rem] w-[80%] rounded-md text-[0.9rem] ${mode === 'black' ? 'border-slate-700 bg-transparent text-white' : 'border-slate-300'}`} onChange={(e) => SearchedData(e)} />
                        <button className='w-[20%] p-2 text-center bg-blue-500 text-[0.9rem] font-bold rounded-md text-white' onClick={AddItemForm}>Add Dish</button>
                    </div>
                    <div className="accordion mx-2 mt-4">
                        <div className='grid grid-cols-3 gap-2 mb-2'>
                            <Accordion
                                Data={Data}
                                mode={mode}
                            />
                        </div>
                    </div>
                </div>
            </div>

        </>
    )
}

export default Menu
