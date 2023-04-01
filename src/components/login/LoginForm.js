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
            <div className='bg-white/70 w-[370px] absolute left-[15%] z-10'>
                <div className='col-span-1 px-4 py-2'>
                    <h1 className='Title text-[1.6rem] text-center font-bold mb-2 text-blue-500 '>Login</h1><hr className='w-[100px] border border-blue-500 m-auto' />
                    <span className='flex justify-center text-red-600 text-[0.9rem] text-center mt-3'>{props.matched}</span>
                    <div className="PhoneNumber flex flex-col my-2 relative mt-12">
                        <label htmlFor="Phone" className=' text-black font-semibold mx-2'>Phone Number <span className='text-red-500'>*</span></label>
                        <input type="number" name='username' value={props.contact} placeholder='Phone number' className={`rounded-md py-2 px-3 bg-transparent border ${props.matched === '' ? 'border-slate-400' : 'border-red-600'}`} onChange={handleContactInput} />
                    </div>
                    <div className="Password flex flex-col relative mt-4">
                        <label htmlFor="password" className=' text-black font-semibold mx-2'>Password <span className='text-red-500'>*</span></label>
                        <input type={RevealPs ? 'text' : 'password'} name='password' value={props.password} placeholder='Password' className={`rounded-md py-2 px-3 bg-transparent border ${props.matched === '' ? 'border-slate-400' : 'border-red-600'}`} onChange={handlePasswordInput} />
                        <span className='absolute top-[55%] right-0 mx-2 cursor-pointer'>{RevealPs === false ? <MdOutlineRemoveRedEye onClick={showPassword} /> : <FaRegEyeSlash onClick={Hidepassword} />}</span>
                    </div>
                    {/* </div> */}
                    <div className="formButton flex justify-center items-center mt-4">
                        <button type='submit' className={`w-full h-[2.5rem] text-white rounded-md text-[1.2rem] mt-4 font-bold transition-all ease-in duration-300 ${props.isValue === true ? 'bg-gray-400' : 'bg-blue-500 hover:bg-blue-600'}`} onClick={props.HandleLoginForm} disabled={props.isValue}>Submit</button>
                    </div>
                </div>
                <div className="NotUser flex justify-center items-center mt-2">
                    <p className='text-[1rem] mx-1'>New Member ?</p>
                    <Link to={'/signUp'}><p className='text-[1.1rem] text-blue-500 mx-1 font-bold hover:text-red-600'>Sign up Now</p></Link>
                </div>
            </div>
        </>
    )
}

export default LoginForm
