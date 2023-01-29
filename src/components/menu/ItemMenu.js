import React, { useState } from 'react';
import AddItem from './AddItemform/AddItem';
import Items from './Items';
import MenuCategory from './MenuCategory';

const ItemMenu = ({ mode }) => {
    const data = [
        {
            id: 1,
            category: 'Starter',
            items: [{ name: 'Chicken-Biryani' }, { name: 'Chicken-punjabi' }, { name: 'Chicken-muglai' }, { name: 'Chicken-tandoor' },
            { name: 'Chawmin' }, { name: 'Chicken-Chilli' }, { name: 'Samosa' }, { name: 'Kachawri' }]
        },
        {
            id: 2,
            category: 'Main course',
            items: [{ name: 'p' }, { name: 'q' }, { name: 'r' }, { name: 's' }]
        },
        {
            id: 3,
            category: 'After main',
            items: [{ name: 'l' }, { name: 'm' }, { name: 'n' }, { name: '0' }]
        },
        {
            id: 4,
            category: 'Dinner',
            items: [{ name: 'Chawal' }, { name: 'roti' }, { name: 'dal-fry' }, { name: 'mixed-veg' }]
        },
        {
            id: 5,
            category: 'Fast food',
            items: [{ name: 'Chawmin' }, { name: 'Chicken-Chilli' }, { name: 'Samosa' }, { name: 'Kachawri' }]
        },
        {
            id: 6,
            category: 'Breakfast',
            items: [{ name: 'Idli' }, { name: 'Dosa' }, { name: 'Aalu-Paratha' }, { name: 'Puri-Sabji' }]
        }
    ]

    const [Data, setData] = useState(data);
    const [filterItem, setFilterItem] = useState(data);
    const [NoSearchCategory, setNoSearchCategory] = useState(data);
    const [search, setSearch] = useState("");
    const [AdditemForm, setAdditemForm] = useState(false);
    const [active, setActive] = useState('All');

    // filter item according to their category !!
    const handleCategoryFilter = (category) => {
        setActive(category);

        const filteredData = filterItem.filter(val => val.category === category)
            .map(({ items }) => { return { items } });
        setData(filteredData);
    }

    // filter menu item from lists !!
    const SearchedData = (event) => {
        const searchInput = event.target.value;

        if (searchInput.length > 0) {
            const searchInput = event.target.value;
            const test2 = Data.map((val) => {
                let items = val.items.filter((item) => (item.name.toLowerCase().includes(searchInput.toLowerCase())));
                if (!items.length) {
                    return null;
                }

                return { ...val, items };
            }).filter(Boolean);

            setData(test2);
            setFilterItem(test2);
        } else {
            setData(NoSearchCategory);
            setFilterItem(NoSearchCategory);
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
                <div className={`Menus w-[99%] m-auto mt-[4rem] rounded-md`}>
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Dish Menu</h1>
                    <div className={`grid grid-cols-4 ${mode === 'black' ? 'border-slate-700 nav_bg' : 'bg-white border-slate-300'}`}>
                        <div className={`Item-category relative col-span-1 m-2 border ${mode === 'black' ? 'border-slate-500 text-white' : 'border-slate-300'} h-[595px] overflow-auto scrollbar-hide`}>
                            <div className='p-2 mb-4'>
                                <span className={`text-[0.9rem] ${mode === 'black' ? 'text-gray-400' : 'text-gray-500'} font-mono`}>Categories</span>
                            </div><hr />
                            <button className="relative category-list px-2 py-3 cursor-pointer w-full" onClick={() => setData(data, setActive('All'))}>
                                <div className={`${active === 'All' ? (mode === 'black' ? '' : 'absolute right-0 w-full h-12 top-0 bg-gradient-to-l from-purple-100') : ''}`}></div>
                                <div className={`${active === 'All' ? 'absolute right-0 w-1 h-12 top-0 bg-purple-500 rounded-l-md' : ''}`}></div>
                                <span className='font-bold flex flex-start'>All</span>
                            </button><hr />
                            <MenuCategory
                                mode={mode}
                                Data={filterItem}
                                handleCategoryFilter={handleCategoryFilter}
                                active={active} />
                        </div>
                        <div className={`relative col-span-3 border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} m-2`}>
                            <div className='flex gap-2 m-2'>
                                <input type="text" value={search} placeholder='search item here' className={`border px-3 py-[0.5rem] w-[80%] rounded-md text-[0.9rem] ${mode === 'black' ? 'border-slate-600 bg-transparent text-white' : 'border-slate-300'}`} onChange={(e) => SearchedData(e)} />
                                <button className='w-[20%] p-2 text-center bg-blue-500 text-[0.9rem] font-bold rounded-md text-white' onClick={AddItemForm}>Add Dish</button>
                            </div>
                            <div className={`Item-table relative border ${mode === 'black' ? 'border-slate-600' : 'border-slate-300'} m-2 rounded-md h-[520px] overflow-auto scrollbar-hide`}>
                                <div className={`headings rounded-t-md grid grid-cols-5 ${mode === 'black' ? 'bg-black/60 text-white' : 'bg-blue-100'} py-2`}>
                                    <span className='col-span-2 ml-2'>Item</span>
                                    <span className='col-span-1'>Restaurant</span>
                                    <span className='col-span-1'>Swiggy</span>
                                    <span className='col-span-1'>Zomato</span>
                                </div>
                                <Items
                                    mode={mode}
                                    Data={Data}
                                />
                            </div>
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemMenu
