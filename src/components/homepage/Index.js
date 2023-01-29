import React from 'react'
import { Link } from 'react-router-dom'
import IMG1 from '../Images/laptop.png'
import IMG2 from '../Images/website.png'

const HomePage = () => {
    return (
        <>
            <div className="homepage fixed w-[100%] h-[100vh] bg-white top-0 left-0 overflow-hidden z-10">
                <div className="home_container relative w-[60rem] m-auto mt-[4rem]">
                    <div className="Laptop-image1 absolute">
                        <img src={IMG1} alt="" />
                    </div>
                    <div className="website-image2 absolute h-[600px] mt-[2.3rem] mx-[7rem]">
                        <img src={IMG2} alt="" />
                    </div>
                    <div className="login signUp absolute top-[28rem] left-[8rem]">
                        <Link to="/login" ><span className='rounded-md bg-blue-500 py-2 px-6 text-white font-bold'>Login</span></Link>
                        <Link to="/signUp"><span className='ml-[32rem] rounded-md bg-blue-500 py-2 px-6 text-white font-bold'>SignUp</span></Link>
                    </div>
                </div>
            </div>
        </>
    )
}

export default HomePage
