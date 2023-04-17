import React, { useEffect, useState } from 'react';
import AddItem from './AddDish/AddItem';
import MenuCategory from './MenuCategory';
import axios from 'axios';
import EditDishItem from './EditDish/EditDishItem';
import DeleteDIshItem from './DeleteDish/DeleteDIshItem';
import Spinner from '../spinner/Spinner';
import Non_Veg from '../Images/Non_veg.png'
import Veg from '../Images/veg.png'
import { TbEdit } from 'react-icons/tb'


const ItemMenu = ({ mode }) => {
    var api = process.env.REACT_APP_BASE_URL

    const [Data, setData] = useState([]);
    const [filterItem, setFilterItem] = useState([]);
    const [allDishData, setAllDishData] = useState([]);
    const [AllCategory, setAllCategory] = useState([]);
    const [search, setSearch] = useState("");
    const [active, setActive] = useState('All');
    const [AdditemForm, setAdditemForm] = useState(false);
    const [EditDishForm, setEditedDishForm] = useState(false);
    const [DeleteDishForm, setDeletedDishForm] = useState(false);
    const [SingleDish, setSingleDish] = useState('');
    const [OneDishID, setOneDishID] = useState('');
    const [vegDish, setVegDish] = useState(false);
    const [nonVegDish, setNonVegDish] = useState(false);
    const [loading, setLoading] = useState(false);

    const UniqueCategory = [];

    const CategoryUnique = filterItem.filter(element => {
        const isDuplicate = UniqueCategory.includes(element.category_name);

        if (!isDuplicate) {
            UniqueCategory.push(element.category_name);

            return true;
        }

        return false;
    });



    // get all the platforms !!
    const [platform, setPlatform] = useState([]);

    // filter item according to their category !!
    const handleCategoryFilter = (category) => {
        setActive(category);
        if (category === "All") {
            setData(filterItem);
        }
        else {
            const filteredData = filterItem.filter(val => val.category_name === category)
            setData(filteredData);
        }
    }

    // handling checkbox for the dish type [veg, non-veg] !!
    const handleVegDish = (event) => {
        setVegDish(vegDish ? false : true);
        const VegVal = event.target.checked;
        if (VegVal === true) {
            setData(filterItem.filter(val => val.dish_type === 'Veg'));
            setFilterItem(filterItem.filter(val => val.dish_type === 'Veg'));
        } else {
            setData(allDishData);
            setFilterItem(allDishData);
        }
    }
    const handleNonVegDish = (event) => {
        setNonVegDish(nonVegDish ? false : true);
        const NonVegVAl = event.target.checked;
        if (NonVegVAl === true) {
            setData(filterItem.filter(val => val.dish_type === 'Non-Veg'));
            setFilterItem(filterItem.filter(val => val.dish_type === 'Non-Veg'));
        } else {
            setData(allDishData);
            setFilterItem(allDishData);
        }
    }

    // filter menu item from lists !!
    const SearchedData = (event) => {
        setVegDish(false);
        setNonVegDish(false);
        const searchInput = event.target.value;
        if (searchInput.length > 0) {
            const result = allDishData.filter((val) => {
                return val.name.toLowerCase().includes(searchInput.toLowerCase());
            });
            setData(result);
            setFilterItem(result);
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
            dish_category: ItemCategory,
            dish_name: ItemName,
        }
        setSingleDish(OneDish);
        setEditedDishForm(true);
    }
    // shoe delete dish form modal
    const DeleteDish = (OneDishId) => {
        setOneDishID(OneDishId);
        setDeletedDishForm(true);
    }

    // api for the all dish !!
    const GetAllDish = () => {
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(`${api}/kitchen/dish`, {
            headers: headers
        }).then(val => {
            setData(val.data.data);
            setFilterItem(val.data.data);
            setAllDishData(val.data.data);
            if (val.status === 200) {
                setLoading(false);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    // api for the platform
    const GetAllCategory = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(`${api}/kitchen/platform`, {
            headers: headers
        }).then(val => {
            setPlatform(val.data.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    // api to get all category !!
    const Get_AllCategory = () => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(`${api}/kitchen/category`, {
            headers: headers
        }).then(val => {
            setAllCategory(val.data.data);
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        GetAllDish();
        GetAllCategory();
        Get_AllCategory();
    }, []);

    return (
        <>
            {AdditemForm === true ? <AddItem
                setAdditemForm={setAdditemForm}
                GetAllDish={GetAllDish}
                GetAllCategory={GetAllCategory}
                AllCategory={AllCategory} /> : ''}

            {EditDishForm === true ? <EditDishItem
                EditDish={EditDish}
                GetAllDish={GetAllDish}
                GetAllCategory={GetAllCategory}
                setEditedDishForm={setEditedDishForm}
                Dish={SingleDish}
                AllCategory={AllCategory} /> : ''}
            {DeleteDishForm === true ? <DeleteDIshItem DeleteDish={DeleteDish} GetAllDish={GetAllDish} GetAllCategory={GetAllCategory} setDeletedDishForm={setDeletedDishForm} OneDishID={OneDishID} /> : ''}
            <div className="lg:w-[80%] lg:ml-[20%]">
                <div className={`Menus md:w-[99%] m-auto mt-[3rem] md:mt-[4rem] rounded-md`}>
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${mode === 'black' ? 'text-white' : 'text-black'}`}>Menu</h1>
                    <div className={`md:grid md:grid-cols-4 ${mode === 'black' ? 'border-slate-700 nav_bg' : 'bg-white border-slate-300'}`}>

                        {/* ***************** */}
                        <div className={`dish-category md:hidden w-[95%] m-auto py-2`}>
                            <span className={`${mode === 'black' ? 'text-white' : 'text-black'} py-1 px-1 text-[1.2rem]`}>Categories</span>
                            <select name="category" id="category" className={`w-full py-3 rounded-sm px-2 my-1 bg-blue-500 border-2 outline-none border-white font-bold text-[0.9rem] text-white`} onChange={(event) => handleCategoryFilter(event.target.value)}>
                                <option value="All">All</option>
                                {
                                    CategoryUnique.map(val => {
                                        return <option key={val.id} value={val.category_name}>{val.category_name}</option>
                                    })
                                }
                            </select>
                        </div>
                        {/* ****************** */}

                        <div className={`Item-category hidden md:block relative col-span-1 m-2 border ${mode === 'black' ? 'border-slate-500 text-white' : 'border-slate-300'} h-[595px] overflow-auto scrollbar-hide`}>
                            <div className='p-2 py-3 mb-1 bg-blue-500 text-center'>
                                <span className={`text-[1.2rem] tracking-[1px] ${mode === 'black' ? 'text-white' : 'font-bold text-white'}`}>Dish Categories</span>
                            </div>
                            <button className="relative category-list px-2 py-3 cursor-pointer w-full" onClick={() => setData(filterItem, setActive('All'))}>
                                <div className={`${active === 'All' ? (mode === 'black' ? '' : 'absolute right-0 w-full h-12 top-0 bg-gradient-to-l from-blue-100') : ''}`}></div>
                                <div className={`${active === 'All' ? 'absolute right-0 w-1 h-12 top-0 bg-blue-500 rounded-l-md' : ''}`}></div>
                                <span className='font-bold flex flex-start'>All</span>
                            </button><hr />
                            <MenuCategory
                                mode={mode}
                                Data={CategoryUnique}
                                handleCategoryFilter={handleCategoryFilter}
                                active={active} />
                        </div>
                        <div className={`relative md:col-span-3 border ${mode === 'black' ? 'border-slate-500' : 'border-slate-300'} m-2`}>
                            <div className='flex flex-col md:flex-row gap-2 m-2'>
                                <input type="text" value={search} placeholder='search item here' className={`border px-3 py-[0.5rem] w-full md:w-[80%] rounded-sm text-[0.9rem] ${mode === 'black' ? 'border-slate-600 bg-transparent text-white' : 'border-slate-300'} order-last md:order-first`} onChange={(e) => SearchedData(e)} />
                                <button className='w-full md:w-[20%] p-2 text-center bg-blue-500 text-[0.9rem] font-bold rounded-sm text-white' onClick={AddItemForm}>Add Dish</button>
                            </div>
                            <div className='mx-2 grid md:grid-cols-2 gap-2'>
                                <div className={`border ${mode === 'black' ? 'border-slate-600' : 'border-slate-300'} flex justify-between p-2 rounded-sm`}>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="veg" className="sr-only peer" onChange={(e) => handleVegDish(e)} checked={vegDish} />
                                        <div className={`w-7 h-4 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-slate-500 after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:border after:rounded-full after:h-3 after:w-3 peer-checked:bg-green-600 ${mode === 'black' ? 'after:bg-black after:border-black/20 bg-slate-400 after:transition-all dark:border-slate-600' : 'after:bg-white after:border-gray-300 bg-gray-200 after:transition-all dark:border-gray-600'}`}></div>
                                    </label>
                                    <span className={`mx-2 md:mx-8 flex items-center font-bold ${mode === 'black' ? 'text-white' : 'text-slate-500'}`}>Veg</span>
                                </div>
                                <div className={`border ${mode === 'black' ? 'border-slate-600' : 'border-slate-300'} flex justify-between p-2 rounded-sm`}>
                                    <label className="relative inline-flex items-center cursor-pointer">
                                        <input type="checkbox" value="Non_veg" className="sr-only peer" onChange={(e) => handleNonVegDish(e)} checked={nonVegDish} />
                                        <div className={`w-7 h-4 bg-gray-200 peer-focus:outline-none peer-focus:ring-0 peer-focus:ring-blue-300 dark:peer-focus:ring-blue-800 rounded-full peer peer-checked:after:translate-x-full peer-checked:after:border-slate-500 after:content-[''] after:absolute after:top-[6px] after:left-[2px] after:border after:rounded-full after:h-3 after:w-3 after:transition-all dark:border-gray-600 peer-checked:bg-red-600 ${mode === 'black' ? 'after:bg-black after:border-black/20 bg-slate-400' : 'after:bg-white after:border-gray-300 bg-gray-200'}`}></div>
                                    </label>
                                    <span className={`mx-2 md:mx-8 flex items-center font-bold ${mode === 'black' ? 'text-white' : 'text-slate-500'}`}>Non-Veg</span>
                                </div>
                            </div>
                            <div className={`table-wrapper mx-2 mt-[1rem] scrollbar-hide ${Data.length > 0 ? 'h-[300px] md:h-[470px]' : ''} border`}>
                                <table className=''>
                                    <thead className=''>
                                        <th className='px-[10rem] text-start'>Dish</th>
                                        {
                                            platform.map(Platform => {
                                                return <th key={Platform.id} className=''>
                                                    <span className='py-1'>{Platform.name}</span>
                                                    <small className={`text-[0.6rem] ${mode === 'black' ? 'text-black' : 'text-black'} leading-[8px] tracking-[1.5px] mx-2`}>[ F / H ]</small>
                                                </th>
                                            })
                                        }
                                        <th>Edit</th>
                                    </thead>
                                    <tbody>
                                        {
                                            Data.map((val, index) => {
                                                return <tr key={val.id} className={`${index % 2 != 0 ? 'bg-gray-300' : 'bg-slate-100'}`}>
                                                    <td className='flex'>
                                                        <span>{val.name.toUpperCase()}</span>
                                                        <span>{val.dish_type === 'Non-Veg' ? <img src={Non_Veg} className='w-4 h-4 mt-[2px] mx-1' /> : <img src={Veg} className='w-4 h-4 mt-[2px] mx-1' />}</span>
                                                    </td>
                                                    {
                                                        val.rates.map((item_rate) => {
                                                            return <td key={item_rate.id}>
                                                                <div>
                                                                    <small className='text-[0.9rem] font-bold'>₹ {item_rate.full_price} / </small>
                                                                    <small className='text-[0.9rem] font-bold'>{item_rate.half_price}</small>
                                                                </div>
                                                            </td>
                                                        })
                                                    }
                                                    <td>
                                                        <span className='text-amber-700 cursor-pointer text-[1.1rem] flex justify-center'><TbEdit onClick={() => EditDish(val.id, val.dish_type, val.name, val.category_name)} /></span>
                                                        {/* delete link */}
                                                        {/* <div className="
                            absolute right-[3rem] top-[-1.6rem] before:content-[attr(data-tip)] before:relative before:px-2 before:py-0 before:left-[1.2rem] before:top-[12px] before:w-max before:max-w-xs before:-translate-x-1/2 before:-translate-y-full
                            before:bg-red-500 before:text-white before:font-bold before:text-[0.7rem] before:rounded-sm before:opacity-0 before:transition-all
                            hover:before:opacity-100" data-tip="Delete">
                                <span className='text-[1.2rem] cursor-pointer text-red-500'><MdDeleteForever onClick={() => DeleteDish(val.id)} /></span>
                            </div> */}
                                                    </td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {Data.length <= 0 && <span className='flex justify-center items-center py-2'><Spinner mode={mode} /></span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default ItemMenu
