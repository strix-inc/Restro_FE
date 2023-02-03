import React, { useEffect, useState } from 'react';
import AddItem from './AddDish/AddItem';
import Items from './Items';
import MenuCategory from './MenuCategory';
import axios from 'axios';
import EditDishItem from './EditDish/EditDishItem';
import DeleteDIshItem from './DeleteDish/DeleteDIshItem';

const ItemMenu = ({ mode }) => {

    const [Data, setData] = useState([]);
    const [filterItem, setFilterItem] = useState([]);
    const [allDishData, setAllDishData] = useState([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState('All');
    const [AdditemForm, setAdditemForm] = useState(false);
    const [EditDishForm, setEditedDishForm] = useState(false);
    const [DeleteDishForm, setDeletedDishForm] = useState(false);
    const [SingleDish, setSingleDish] = useState('');
    const [OneDishID, setOneDishID] = useState('');
    // const [category, setCategory] = useState([]);
    // const [category2, setCategory2] = useState([]);


    // get all the platforms !!
    const [platform, setPlatform] = useState([]);

    // filter item according to their category !!
    const handleCategoryFilter = (category) => {
        setActive(category);
        const filteredData = filterItem.filter(val => val.category_name === category)
        setData(filteredData);
    }

    // filter menu item from lists !!
    const SearchedData = (event) => {
        const searchInput = event.target.value;

        if (searchInput.length > 0) {
            const searchInput = event.target.value;
            const test2 = Data.filter((val) => {
                return val.name.toLowerCase().includes(searchInput.toLowerCase());
            });
            setData(test2);
            setFilterItem(test2);
        } else {
            setData(allDishData);
            setFilterItem(allDishData);
        }
        setSearch(searchInput);
    }

    // show additem form modal !!
    const AddItemForm = () => {
        setAdditemForm(true);
    }
    // show edit form modal !!
    const EditDish = (ItemID, ItemType, ItemName, ItemCategory) => {
        const OneDish = {
            id: ItemID,
            dish_type: ItemType,
            name: ItemName,
            category: ItemCategory,
        }
        setSingleDish(OneDish);
        setEditedDishForm(true);
    }
    // shoe delete dish form modal
    const DeleteDish = (OneDishId) => {
        setOneDishID(OneDishId);
        setDeletedDishForm(true);
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        // api for the all dish !! 
        axios.get('https://restrofin.pythonanywhere.com/kitchen/dish', {
            headers: headers
        }).then(val => {
            setData(val.data.data);
            setFilterItem(val.data.data);
            setAllDishData(val.data.data);
        }).catch(function (error) {
            console.log(error);
        });


        // api for the platform
        axios.get('https://restrofin.pythonanywhere.com/kitchen/platform', {
            headers: headers
        }).then(val => {
            setPlatform(val.data.data);
        }).catch(function (error) {
            console.log(error);
        });

        // api for all category
        // axios.get('https://restrofin.pythonanywhere.com/kitchen/category', {
        //     headers: headers
        // }).then(val => {
        //     setCategory(val.data.data);
        //     setCategory2(val.data.data);
        // }).catch(function (error) {
        //     console.log(error);
        // });


    }, []);

    return (
        <>
            {AdditemForm === true ? <AddItem setAdditemForm={setAdditemForm} /> : ''}
            {EditDishForm === true ? <EditDishItem EditDish={EditDish} setEditedDishForm={setEditedDishForm} Dish={SingleDish} /> : ''}
            {DeleteDishForm === true ? <DeleteDIshItem DeleteDish={DeleteDish} setDeletedDishForm={setDeletedDishForm} OneDishID={OneDishID} /> : ''}
            <div className="w-[80%] ml-[20%]">
                <div className={`Menus w-[99%] m-auto mt-[4rem] rounded-md`}>
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Dish Menu</h1>
                    <div className={`grid grid-cols-4 ${mode === 'black' ? 'border-slate-700 nav_bg' : 'bg-white border-slate-300'}`}>
                        <div className={`Item-category relative col-span-1 m-2 border ${mode === 'black' ? 'border-slate-500 text-white' : 'border-slate-300'} h-[595px] overflow-auto scrollbar-hide`}>
                            <div className='p-2 mb-4'>
                                <span className={`text-[0.9rem] ${mode === 'black' ? 'text-gray-400' : 'text-gray-500'} font-mono`}>Categories</span>
                            </div><hr />
                            <button className="relative category-list px-2 py-3 cursor-pointer w-full" onClick={() => setData(filterItem, setActive('All'))}>
                                <div className={`${active === 'All' ? (mode === 'black' ? '' : 'absolute right-0 w-full h-12 top-0 bg-gradient-to-l from-blue-100') : ''}`}></div>
                                <div className={`${active === 'All' ? 'absolute right-0 w-1 h-12 top-0 bg-blue-500 rounded-l-md' : ''}`}></div>
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
                            <div className='mx-2 grid grid-cols-2 gap-2'>
                                <div className=' border flex justify-between p-2 rounded-md'>
                                    <input type="checkbox" className='mx-2 cursor-pointer' />
                                    <span className='mx-8 flex items-center font-bold text-gray-500'>Veg</span>
                                </div>
                                <div className='border flex justify-between p-2 rounded-md'>
                                    <input type="checkbox" className='mx-2 cursor-pointer' />
                                    <span className='mx-8 flex items-center font-bold text-gray-500'>Non-veg</span>
                                </div>
                            </div>
                            <div className={`Item-table border ${mode === 'black' ? 'border-slate-600' : 'border-slate-300'} m-2 rounded-md h-[490px] overflow-auto`}>
                                <div className="List-title p-2 scrollbar-hide bg-blue-100 font-bold">
                                    <span className='col-span-2'>Dish</span>
                                    {
                                        platform.map(Platform => {
                                            return <span key={Platform.id}>{Platform.name}</span>
                                        })
                                    }
                                </div>
                                <Items
                                    EditDish={EditDish}
                                    DeleteDish={DeleteDish}
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
