import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa';

const LoginForm = (props) => {

    // Getting the values of the inputs sextion from the login form !!
    const handleContactInput = (event) => {
        props.handleContact(event.target.value);
    }
    const handlePasswordInput = (event) => {
        props.handlePassword(event.target.value);
    }

    // Show or Hide Password
    const [RevealPs, setRevealPs] = useState(false);
    const showPassword = () => {
        setRevealPs(true);
    }
    const Hidepassword = () => {
        setRevealPs(false);
    }

    return (
        <>
            <div className='bg-white/70 rounded-md shadow-lg shadow-slate-400 absolute left-[38%] w-[350px] h-[390px] z-10 border border-slate-200'>
                <div className='col-span-1 px-4 py-2'>
                    <h1 className='Title text-[1.3rem] text-center font-bold mb-2 text-blue-500 '>Login</h1>
                    <span className='flex justify-center text-red-600 text-[0.9rem] text-center'>{props.matched}</span>
                    <div className="PhoneNumber flex flex-col my-2 relative mt-4">
                        <label htmlFor="Phone" className=' text-black font-semibold mx-2'>Phone Number <span className='text-red-500'>*</span></label>
                        <input type="phone" name='username' value={props.contact} className={`rounded-md py-2 px-3 bg-transparent border ${props.matched === '' ? 'border-slate-400' : 'border-red-600'}`} onChange={handleContactInput} />
                    </div>
                    {/* <div className='grid grid-cols-2 gap-x-2 my-2'> */}
                    <div className="Password flex flex-col relative">
                        <label htmlFor="password" className=' text-black font-semibold mx-2'>Password <span className='text-red-500'>*</span></label>
                        <input type={RevealPs ? 'text' : 'password'} name='password' value={props.password} className={`rounded-md py-2 px-3 bg-transparent border ${props.matched === '' ? 'border-slate-400' : 'border-red-600'}`} onChange={handlePasswordInput} />
                        <span className='absolute top-[55%] right-0 mx-2 cursor-pointer'>{RevealPs === false ? <MdOutlineRemoveRedEye onClick={showPassword} /> : <FaRegEyeSlash onClick={Hidepassword} />}</span>
                    </div>
                    {/* </div> */}
                    <div className="formButton flex justify-center items-center mt-8">
                        <button type='submit' className='w-full h-[2.5rem] bg-blue-500 text-white rounded-md text-[1.2rem] mt-4 font-bold hover:bg-blue-600 transition-all ease-in duration-300' onClick={props.HandleLoginForm}>Submit</button>
                    </div>
                </div>
                <div className="NotUser flex justify-center items-center">
                    <p className='text-[0.9rem] mx-1'>If not a Member ?</p>
                    <Link to={'/signUp'}><p className='text-[1rem] text-red-500 mx-1 hover:font-semibold'>Sign Up</p></Link>
                </div>
            </div>
        </>
    )
}

export default LoginForm
