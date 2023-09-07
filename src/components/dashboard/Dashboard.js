import React, { useEffect, useState } from 'react'
import { VscGraphLine } from 'react-icons/vsc'
import { VscGraphLeft } from 'react-icons/vsc'
import { IoFastFood } from 'react-icons/io5'
import { IoMdSearch } from 'react-icons/io'
import { VscFilePdf } from 'react-icons/vsc'
import { MdEdit } from 'react-icons/md'
import { AiFillPrinter } from 'react-icons/ai'
import { TiWarning } from 'react-icons/ti'
import axios from 'axios'
import { Link } from 'react-router-dom'
import Spinner from '../spinner/Spinner'


const Dashboard = (props) => {
    var api = process.env.REACT_APP_BASE_URL

    const [AllSaleHistory, setAllSaleHistory] = useState([]);
    const [Dashbaord_Stats, setDashboard_Stats] = useState([]);
    const [FromDate, setFromDate] = useState('');
    const [ToDate, setToDate] = useState('');
    const [OrderType, setOrderType] = useState('All');
    const [PaymentType, setPaymentType] = useState('All')
    const [loading, setLoading] = useState(false);

    const DsItem = [
        { id: 1, name: 'Highest Selling Dish', records: Dashbaord_Stats.top_sale, icons: <IoFastFood />, bg: 'bg-green-300' },
        { id: 2, name: 'Lowest Selling Dish', records: Dashbaord_Stats.lowest_sale, icons: <IoFastFood />, bg: 'bg-red-300' },
        { id: 3, name: 'Maximum Invoice Amount', records: Dashbaord_Stats.max_sale, icons: <VscGraphLine />, bg: 'bg-green-300' },
        { id: 4, name: 'Average Invoice Amount', records: Math.round(Dashbaord_Stats.avg_sale * 10) / 10, icons: <VscGraphLeft />, bg: 'bg-amber-300' },
    ]


    // states for fetching older data !!
    const handleFromDate = (event) => {
        var date = event.target.value;
        var Date = '';
        var new_date = date.split("-");
        for (let i = 0; i < new_date.length; i++) {
            Date = new_date[2] + "/" + new_date[1] + "/" + new_date[0];
        }
        setFromDate(Date);
    }
    const handleToDate = (event) => {
        var date = event.target.value;
        var Date = '';
        var new_date = date.split("-");
        for (let i = 0; i < new_date.length; i++) {
            Date = new_date[2] + "/" + new_date[1] + "/" + new_date[0];
        }
        setToDate(Date);
    }
    const handleOrderType = (event) => {
        setOrderType(event.target.value);
    }
    const handlePaymentType = (event) => {
        setPaymentType(event.target.value);
    }

    var base_url = `${api}/finance/invoice?finalized=True`;
    const handleSearchSaleHistory = () => {
        setLoading(true);


        // some comment 
        if (FromDate) {
            base_url += "&from=" + FromDate;
        }
        if (ToDate) {
            base_url += "&to=" + ToDate;
        }
        if (OrderType !== "All") {
            base_url += "&platform=" + OrderType;
        }
        if (PaymentType !== "All") {
            base_url += "&payment=" + PaymentType;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(`${base_url}`, {
            headers: headers
        }).then(val => {
            setAllSaleHistory(val.data.data);
            if (val.status === 200) {
                setLoading(false);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    const handleDownload = (msg) => {
        if (FromDate) {
            base_url += "&from=" + FromDate;
        }
        if (ToDate) {
            base_url += "&to=" + ToDate;
        }
        if (OrderType !== "All") {
            base_url += "&platform=" + OrderType;
        }
        if (PaymentType !== "All") {
            base_url += "&payment=" + PaymentType;
        }
        if (msg === 'download') {
            base_url += "&download=" + true;
        }

        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }

        axios.get(`${base_url}`, {
            headers: headers
        }).then(val => {
            const blob = new Blob([val.data], { type: 'text/csv' });
            const url = window.URL.createObjectURL(blob);
            const link = document.createElement('a');
            link.setAttribute('href', url);
            link.setAttribute('download', 'saleHistory.csv')
            link.click();

        }).catch(function (error) {
            console.log(error);
        });
        setAllSaleHistory('');
    }

    const handleEditSaleHistory = (id) => {
        localStorage.setItem('ActiveKotID', id);
    }

    const handleSaleHistory = (id) => {
        localStorage.setItem("Sale_History_ID", id);
    }

    const SaleHistory = () => {
        setLoading(true);
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`${api}/finance/invoice?finalized=True`, {
            headers: headers
        }).then(val => {
            setAllSaleHistory(val.data.data);
            setDashboard_Stats(
                {
                    top_sale: val.data.highest_selling_item,
                    lowest_sale: val.data.lowest_selling_item,
                    avg_sale: val.data.avg_sale,
                    max_sale: val.data.max_sale
                }
            );
            if (val.status === 200) {
                setLoading(false);
            }
        }).catch(function (error) {
            console.log(error);
        });
    }

    useEffect(() => {
        const headers = {
            'Content-Type': 'application/json',
            'Authorization': `Bearer ${localStorage.getItem('access')}`
        }
        axios.get(`${api}/auth/restaurant`, {
            headers: headers
        }).then(val => {
            localStorage.setItem('Restaurant_name', val.data.data.display_name);
            localStorage.setItem('street', val.data.data.address_street);
            localStorage.setItem('phone', val.data.data.contact);
            localStorage.setItem('gstin', val.data.data.gstin);
            localStorage.setItem('city', val.data.data.address_city);
            localStorage.setItem('state', val.data.data.address_state);
            localStorage.setItem('fssai', val.data.data.fssai_number);
        }).catch(function (error) {
            console.log(error);
        });
        SaleHistory();
    }, []);



    return (
        <>
            <div className='lg:w-[80%] lg:ml-[20%]'>
                <div className="dashboard lg:w-[98%] lg:m-auto mt-[3rem] lg:mt-[4rem]">
                    <h1 className={`text-[1.5rem] font-bold mx-2 py-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>Dashboard</h1>
                    <div className="records grid md:grid-cols-2 lg:grid-cols-4 md:gap-x-4 mx-2 lg:mx-0">
                        {
                            DsItem.map(item => {
                                return <div key={item.id} className={`flex gap-3 md:my-2 my-1 rounded-lg px-4 ${props.mode === 'black' ? 'nav_bg border border-slate-500 shadow-lg shadow-slate-700 text-white' : 'bg-white shadow-md shadow-slate-300'} py-3`}>
                                    <div className={`flex justify-center items-center border rounded-full ${item.bg} h-[2.5rem] w-[2.5rem] my-auto`}>
                                        <span className='text-[1.3rem] text-black m-2'>{item.icons}</span>
                                    </div>
                                    <div className='flex flex-col justify-center'>
                                        <span className={`text-[0.8rem] font-semibold ${props.mode === 'black' ? 'text-gray-300' : 'text-gray-500'}`}>{item.name}</span>
                                        <span className="text-[1rem] tracking-[0.5px">{item.records}</span>
                                    </div>
                                </div>
                            })
                        }
                    </div>
                    <div className="sale-history mt-4 mx-2 lg:mx-0">
                        <h1 className={`text-[1.3rem] font-bold mx-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>Sale History</h1>
                        <div className={`sale_history_table ${props.mode === 'black' ? 'nav_bg border border-slate-700' : 'bg-white'} lg:px-2 pb-6 rounded-lg mt-1 `}>
                            <div className='grid lg:grid-cols-5 w-full'>
                                <div className='col-span-4'>
                                    <div className={`past_sale_search grid lg:grid-cols-2 gap-2 lg:lg:gap-0 mx-2 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>
                                        <div className='lg:flex items-center gap-2 pt-4 md:pt-0'>
                                            <label className='font-bold'>From</label>
                                            <input type="date" className={`border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-sm w-full p-1 lg:my-3`} onChange={handleFromDate} />
                                        </div>
                                        <div className='lg:flex items-center gap-2 lg:mx-4'>
                                            <label className='font-bold'>To</label>
                                            <input type="date" className={`border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-sm w-full p-1 lg:my-2`} onChange={handleToDate} />
                                        </div>
                                        <div className='lg:flex items-center gap-1'>
                                            <label className='font-bold text-[1rem] leading-4'>Platform type</label>
                                            <select type="date" className={`border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-sm w-full lg:w-[80%] p-1 lg:my-3`} onChange={handleOrderType} >
                                                <option value="All">All</option>
                                                <option value="Restaurant">Restaurant</option>
                                                <option value="Zomato">Zomato</option>
                                                <option value="Swiggy">Swiggy</option>
                                            </select>
                                        </div>
                                        <div className='lg:flex items-center gap-1 lg:mx-4'>
                                            <label className='font-bold text-[0.9rem] leading-4'>Payment type</label>
                                            <select type="date" className={`flex justify-end border border-slate-400 ${props.mode === 'black' ? 'bg-transparent focus:outline-none text-white cLogo' : 'bg-white'} rounded-sm w-full lg:w-[75%] p-1 lg:my-3`} onChange={handlePaymentType}>
                                                <option value="All">All</option>
                                                <option value="Cash">Cash</option>
                                                <option value="Upi">UPI</option>
                                                <option value="Card">Card</option>
                                            </select>
                                        </div>
                                    </div>
                                </div>
                                <div className='col-span-1'>
                                    <div className={`past_sale_search grid  lg:grid gap-4 lg:lg:gap-y-4 mx-2 mt-5 md:mt-3 ${props.mode === 'black' ? 'text-white' : 'text-black'}`}>
                                        <div className='lg:flex items-center w-full'>
                                            <button type='button' className="btn col-span-1 w-full lg:w-[12rem] h-[2.5rem] rounded-sm text-white bg-blue-500 font-semibold border-2 border-blue-600 hover:bg-blue-600 hover:text-white transition-all ease-in-out duration-500 flex items-center justify-center" onClick={handleSearchSaleHistory}><span className='mr-2'><IoMdSearch className='text-[1.3rem]' /></span>Search</button>
                                        </div>
                                        <div className='flex items-center w-full'>
                                            <button type='button' className="btn col-span-1 w-full lg:w-[12rem] h-[2.5rem] text-[1rem] rounded-sm text-blue-500 border-2 border-blue-500 font-semibold flex justify-center items-center" onClick={() => handleDownload('download')}>
                                                <span className='mr-2'><VscFilePdf /></span>
                                                <span>Download report</span>
                                            </button>
                                        </div>
                                    </div>
                                </div>
                            </div>
                            <div className={`table-wrapper scrollbar-hide mt-[1rem] ${AllSaleHistory.length > 0 ? 'h-[200px] md:h-[400px]' : ''} relative`}>
                                <table className={`${props.mode === 'black' ? ' border-slate-600' : 'border-slate-300'} border`}>
                                    <thead>
                                        <th>INVOICE</th>
                                        <th>DATE - TIME</th>
                                        <th>SUB TOTAL</th>
                                        <th>DISCOUNT</th>
                                        <th>C.G.S.T - 2.5%</th>
                                        <th>S.G.S.T - 2.5%</th>
                                        <th>NET AMOUNT</th>
                                        <th>DELIVERY CHARGE</th>
                                        <th>TOTAL</th>
                                        <th>EDIT</th>
                                        <th>PRINT</th>
                                    </thead>
                                    <tbody>
                                        {
                                            AllSaleHistory.map((val, index) => {
                                                var localDate = new Date(val.created_at).toLocaleString("hi", {
                                                    localeMatcher: "best fit",
                                                })
                                                return <tr key={index} className={`${index % 2 != 0 ? 'bg-gray-300' : 'bg-slate-100'}`}>
                                                    <td>{val.invoice_number_full}</td>
                                                    <td>{localDate}</td>
                                                    <td>{val.subtotal}</td>
                                                    <td>{val.discount}</td>
                                                    <td>{val.cgst}</td>
                                                    <td>{val.sgst}</td>
                                                    <td>{val.net_amount}</td>
                                                    <td>{val.delivery_charge}</td>
                                                    <td>{val.total}</td>
                                                    <td><Link to='/bill' className='cursor-pointer text-amber-600 text-[1.1rem] flex justify-center'><MdEdit onClick={() => handleEditSaleHistory(val.id)} /></Link></td>
                                                    <td><Link to='/salehistory' target="_blank" rel="noreferrer" className='cursor-pointer text-blue-500 text-[1rem] flex justify-center'><AiFillPrinter onClick={() => handleSaleHistory(val.id)} /></Link></td>
                                                </tr>
                                            })
                                        }
                                    </tbody>
                                </table>
                            </div>
                            {loading && <span className='flex justify-center items-center py-2'><Spinner mode={props.mode} /></span>}
                            {AllSaleHistory.length <= 0 && loading === false && <span className='flex justify-center items-center py-2 gap-1 text-amber-600'><TiWarning />No Data Found</span>}
                        </div>
                    </div>
                </div>
            </div>
        </>
    )
}

export default Dashboard;
