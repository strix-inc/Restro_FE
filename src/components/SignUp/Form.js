import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import { MdOutlineRemoveRedEye } from 'react-icons/md';
import { FaRegEyeSlash } from 'react-icons/fa';

const Form = (props) => {

    const [RevealPs, setRevealPs] = useState(false);
    const showPassword = () => {
        setRevealPs(true);
    }
    const Hidepassword = () => {
        setRevealPs(false);
    }

    return (
        <>
            <div className='bg-white/70 absolute m-auto left-[12%] w-[450px]'>
                <h1 className='Title text-[1.4rem] text-center mb-2 text-blue-500 mt-2 font-bold'>SignUp Your Detail</h1><hr className='w-[250px] border border-blue-500 m-auto' />
                <span className='flex justify-center text-red-500 text-[0.8rem]'>{props.error}</span>
                <form className='col-span-1 px-10' onSubmit={props.SubmitForm}>
                    <div className="RestaurantName flex flex-col mt-16 relative">
                        <label htmlFor="Restaurant" className=' text-black font-semibold mx-2'>Restaurant Name <span className='text-red-500'>*</span></label>
                        <input type="text" name='restaurant_name' value={props.FormValue.restaurant_name} className={`rounded-md py-2 px-3 bg-transparent 
                    ${props.FormError.restaurant_name === "border-2 border-red-500" ? props.FormError.restaurant_name : 'border border-slate-400'}`} onChange={props.handleValidation} />
                    </div>
                    <div className="PhoneNumber flex flex-col my-3 relative">
                        <label htmlFor="Phone" className=' text-black font-semibold mx-2'>Phone Number <span className='text-red-500'>*</span></label>
                        <input type="phone" name='contact' value={props.FormValue.contact} className={`rounded-md py-2 px-3 bg-transparent ${props.FormError.contact === "border-2 border-red-500" ? props.FormError.contact : 'border border-slate-400'}`} onChange={props.handleValidation} />
                    </div>
                    <div className="Password flex flex-col relative my-3">
                        <label htmlFor="password" className=' text-black font-semibold mx-2'>Password <span className='text-red-500'>*</span></label>
                        <input type={RevealPs ? 'text' : 'password'} name='password' value={props.FormValue.password} className={`rounded-md py-2 px-3 bg-transparent ${props.FormError.password === "border-2 border-red-500" ? props.FormError.password : 'border border-slate-400'}`} onChange={props.handleValidation} />
                        <span className='absolute top-[55%] right-0 mx-2 cursor-pointer'>{RevealPs === false ? <MdOutlineRemoveRedEye onClick={showPassword} /> : <FaRegEyeSlash onClick={Hidepassword} />}</span>
                    </div>
                    <div className="Confirm-Password flex flex-col relative my-3">
                        <label htmlFor="Confirm-Password" className=' text-black font-semibold mx-2'>Confirm Password <span className='text-red-500'>*</span></label>
                        <input type={RevealPs ? 'text' : 'password'} name='confirm_password' value={props.FormValue.confirm_password} className={`rounded-md py-2 px-3 bg-transparent ${props.FormError.confirm_password === "border-2 border-red-500" ? props.FormError.confirm_password : 'border border-slate-400'}`} onChange={props.handleValidation} />
                        <span className='absolute top-[55%] right-0 mx-2 cursor-pointer'>{RevealPs === false ? <MdOutlineRemoveRedEye onClick={showPassword} /> : <FaRegEyeSlash onClick={Hidepassword} />}</span>
                    </div>
                    <div className="formButton ">
                        <button type='submit' className='w-full h-[2.5rem] bg-blue-500 text-white rounded-md text-[1.2rem] mt-8 font-bold flex justify-center items-center hover:bg-blue-600 transition-all ease-in duration-300' onClick={props.SubmitForm}><Link to={''}>Sign Up</Link></button>
                    </div>
                </form>
                <div className="NotUser flex justify-center items-center mt-4">
                    <p className='text-[1rem] mx-1'>Already have account ?</p>
                    <Link to={'/login'}><p className='text-[1.1rem] text-blue-500 mx-1 font-bold hover:text-red-600'>Login</p></Link>
                </div>
            </div>
        </>
    )
}

export default Form
