import React, { useState } from 'react'
import { Link } from 'react-router-dom'
import Bill from '../Images/Bill.png'
import zomato from '../Images/zomato.png'
import swiggy from '../Images/swiggy.png'
import LG1 from '../Images/lg1.png'
import LG2 from '../Images/lg2.jpg'
import LG3 from '../Images/lg3.jpg'
import B1 from '../Images/b2.png'
import B2 from '../Images/b3.png'
import { TiTick } from 'react-icons/ti'
import { HiPhoneMissedCall } from 'react-icons/hi'
import { MdConnectWithoutContact } from 'react-icons/md'
import { FaChrome } from 'react-icons/fa'
import { RiWhatsappFill } from 'react-icons/ri'
import IMG from '../Images/R.png'


const HomePage = () => {

    const [contactCenter, setcontactCenter] = useState(false);

    const handleContactCenter = () => {
        setcontactCenter(contactCenter === true ? false : true);
    }
    return (
        <>
            <div className="homepage fixed w-[100%] h-[100vh] bg-white top-0 left-0 overflow-auto z-30 scrollbar-hide">
                <div className="home_container relative">
                    <div className='fixed w-full shadow-md shadow-blue-100 z-10 bg-white'>
                        <div className="HomeNav md:w-[60%] m-auto flex justify-between items-center py-3">
                            <div className="logo flex items-center">
                                <img src={IMG} alt="Loading..." className='home w-[4rem] h-[1.6rem] md:w-[8rem] md:h-[3.2rem]' />
                            </div>
                            <div className="listItems mx-2 flex gap-8 font-bold text-[0.6rem] md:text-[1.2rem]">
                                <Link to="/login" className=' mt-1 md:mt-3'><span className='text-[0.8rem] md:text-[1.2rem] cursor-pointer font-bold hover:text-blue-600'>Login</span></Link>
                                <Link to="/signUp"><span className='bg-blue-500 w-[6rem] md:w-[10rem] flex justify-center items-center h-[2rem] md:h-[3rem] rounded-md py-1 px-4 shadow-sm shadow-blue-500 text-white transition-all ease-in duration-300
                                hover:bg-white hover:text-blue-500 border-2 border-blue-500 hover:border-blue-500 hover:shadow-none cursor-pointer'>Get Started</span></Link>
                            </div>
                        </div>
                    </div>
                    <div className='fixed right-0 bottom-0 z-30'>
                        {contactCenter && <div className='w-[10rem] h-[10rem] bg-blue-200 rounded-full'>
                            <div className='w-[10rem] h-[10rem] bg-blue-400/10 backdrop-blur-md rounded-full'>
                                <span className='absolute right-7 text-[1.7rem] bottom-[7.5rem] text-green-700 leading-[1px]'>
                                    <a href="https://wa.me/+918093552723" target="_blank" rel="noreferrer"><RiWhatsappFill /></a>
                                    <small className='text-[0.5rem] text-black'>Whatsapp</small>
                                </span>
                                <span className='absolute right-[6.3rem] bottom-[5.8rem] text-[1.7rem] text-blue-600 leading-[1px]'>
                                    <a href="tel:80935-52723" target="_blank" rel="noreferrer"><HiPhoneMissedCall /></a>
                                    <small className='text-[0.5rem] text-black'>Call Me</small>
                                </span>
                                <span className='absolute right-[6.5rem] bottom-[1.7rem] text-[1.7rem] text-red-500 leading-[1px]'>
                                    <a href="https://strix.co.in/" target="_blank" rel="noreferrer"><FaChrome /></a>
                                    <small className='text-[0.5rem] text-black'>Website</small>
                                </span>
                            </div>
                        </div>}
                        <div className='absolute bottom-0 right-0 w-[3rem] h-[3rem] md:w-[4rem] md:h-[4rem] rounded-full bg-black m-4 flex justify-center items-center text-[1.5rem] md:text-[2rem] text-white cursor-pointer' onClick={handleContactCenter}><MdConnectWithoutContact /></div>
                    </div>
                    <section>
                        <div className='home_body h-[150px] md:h-[500px] mb-4 md:mb-0 flex flex-col justify-center items-center'>
                            <div className='wrapper'>
                                <div className='static-txt'>
                                    <span className='dynamic-txts'>
                                        <h1 className='text-[1.2rem] md:text-[2.5rem] lg:text-[3.8rem] mt-[1.5rem] md:mt-[4.7rem] font-bold leading-[30px] md:leading-[70px]'>Restaurants, Cafés and Hotels</h1>
                                    </span>
                                </div>
                            </div>
                            <h1 className='text-[0.5rem] md:text-[1.5rem] text-center'>Get vibrant Orders from customers, Add and Edit new Items digitally & boost your sales.</h1>
                        </div>
                    </section>
                    <section>
                        <div className='bg-gray-50 h-[350px] md:h-[520px]'>
                            <div className="content home_body w-[80%] m-auto grid grid-cols-2 gap-4 md:gap-[4rem]">
                                <div className="title mt-[3rem] md:mt-[6rem] flex flex-col">
                                    <span className='text-[1.2rem] md:text-[2.7rem] font-bold'>#1 Digital Billing Software</span>
                                    <span className='text-[0.7rem] md:text-[1.2rem] my-2'>Use the power of software to delight your customers and cross-sell & upsell your items.</span>
                                    <Link to="/signUp" className='mt-4'><span className='w-[6rem] md:w-[11rem] h-[1.6rem] flex items-center justify-center md:h-[3.3rem] bg-blue-500 rounded-md py-1 px-4 shadow-sm shadow-blue-500 text-white text-[0.6rem] md:text-[1.2rem] transition-all ease-in duration-300
                                hover:bg-slate-100 hover:text-blue-500 border-2 border-blue-500 hover:border-blue-500 hover:shadow-none cursor-pointer'>Get Started</span></Link>
                                    <div className="platform-images flex gap-10 mt-8 md:mt-[4rem]">
                                        <img src={zomato} alt="" className='w-12 h-3 md:w-18 md:h-6' />
                                        <img src={swiggy} alt="" className='w-14 md:w-18 h-4 md:h-6' />
                                    </div>
                                </div>
                                <div className="image mt-[4rem] md:mt-[6rem]">
                                    <img src={Bill} alt="" />
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='h-[1100px] md:h-[750px]'>
                            <div className='w-[80%] m-auto home_body'>
                                <span className='md:text-[2.3rem] font-bold flex justify-center pt-8 md:pt-[4rem]'>Key Use Cases</span>
                                <div className='grid md:grid-cols-3 gap-12 md:mt-16 mt-6'>
                                    <div className='flex flex-col'>
                                        <img src={LG1} alt="" className='w-12 h-10 mb-1' />
                                        <span className="title font-bold text-[0.9rem] md:text-[1.3rem]">Dynamic, fully-editable menu boards</span>
                                        <span className="description text-slate-500 md:mt-4 mt-2 text-[0.7rem] md:[1rem]">Create engaging digital food menu boards that showcase your menu items with our easy-to-use media features. Drag & drop your own photos into our platform. Or choose from thousands of free stock images. Also, you can edit, update & display your menu boards remotely, across all locations, in seconds.</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <img src={LG2} alt="" className='w-12 h-12 mb-1' />
                                        <span className="title font-bold text-[0.9rem] md:text-[1.3rem]">Entertain your clients</span>
                                        <span className="description text-slate-500 md:mt-4 mt-2 text-[0.7rem] md:[1rem]">Display product stories, brand videos and live kitchen cams, with seamless streaming. Showcase what makes your menu stand out from the crowd. Additionally, highlight local ingredients or specialties on electronic menu boards.Display playlists of popular menu items or promotions to cross-sell & upsell your specials. Also, advertise services such as catering and party-hosting.</span>
                                    </div>
                                    <div className='flex flex-col'>
                                        <img src={LG3} alt="" className='w-12 h-10 mb-1' />
                                        <span className="title font-bold text-[0.9rem] md:text-[1.3rem]">Gain brand loyalty</span>
                                        <span className="description text-slate-500 md:mt-4 mt-2 text-[0.7rem] md:[1rem]">Display your social media feeds to gain more followers and generate social proof. Also, showcase images and videos posted by happy customers. Additionally, use your signage TVs to show customer testimonials.Offer your customers useful information that gets them focused on your restaurant screens.Remind employees of health-code regulations outside business hours. Additionally, use staff-facing screens to promote training opportunities.</span>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <section>
                        <div className='h-[900px] md:h-[700px] bg-gray-100 home_body'>
                            <div className='md:w-[75%] md:absolute bg-blue-500 mt-[-8rem] left-[12%] h-[150px] md:h-[220px] rounded-lg mx-3 md:mx-0'>
                                <div className='w-[95%] md:w-[80%] m-auto flex justify-between items-center md:h-[200px] h-[150px]'>
                                    <div className='flex flex-col text-[white]'>
                                        <span className='flex items-center font-bold text-[1rem] md:text-[1.8rem]'>Run one screen for free</span>
                                        <span className='text-[0.8rem] md:text-[1.2rem] font-medium'>See the benefits of Strix in action & amaze your customers!</span>
                                    </div>
                                    <div className=''>
                                        <Link to="/signUp"><span className='bg-white w-[6rem] h-[2rem] md:w-[9rem] flex justify-center items-center md:h-[3rem] rounded-md py-1 px-4 shadow-sm shadow-blue-500 text-blue-500 font-bold transition-all ease-in duration-300
                                        hover:bg-blue-500 hover:text-white border-2 border-white hover:border-white hover:shadow-none cursor-pointer text-[0.6rem] md:text-[1rem]'>Sign Up Now</span></Link>
                                    </div>
                                </div>
                            </div>
                            <span className='text-[1,3rem] md:text-[2.3rem] font-bold flex justify-center pt-12 md:pt-[10rem]'>Use Cases</span>
                            <div className='md:w-[80%] m-auto grid md:grid-cols-2 gap-8'>
                                <div>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Stimulate customer purchases with restaurant digital menu boards: 59% of people who see digital food signage content want to learn more about the topic shown.</p>
                                    </span>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Promote special offers or up-sell products by focusing on high-margin items. You could achieve 100% ROI within 7-12 months of deployment.</p>
                                    </span>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Remotely manage local, franchise-specific advertising, even if you have multiple locations.</p>
                                    </span>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Inspire customers to share their experiences on social media and attract more patrons.</p>
                                    </span>
                                </div>
                                <div>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Drive brand awareness and interactivity by displaying social media widgets using easy digital menus for restaurants.</p>
                                    </span>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Save money and the environment by no longer using traditional marketing materials, like flyers and paper menus.</p>
                                    </span>
                                    <span className='flex'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Get an extra revenue stream by hosting third-party ad campaigns and using Proof of Play reporting.</p>
                                    </span>
                                    <span className='flex my-4 md:my-10'>
                                        <small className='mt-1 mx-4'><TiTick className='text-blue-500 text-[1.5rem]' /></small>
                                        <p className='text-slate-500 text-[0.7rem] md:text-[1rem]'>Minimize perceived wait times at checkout with content that tells a story about your brand. Use that time to spur more sales.</p>
                                    </span>
                                </div>
                            </div>

                        </div>
                    </section>
                    <section>
                        <div className="h-[1500px] lg::h-[1400px] home_body">
                            <div className='md:w-[80%] m-auto'>
                                <div className="Images grid md:grid-cols-2 gap-8 pt-16 mx-4 md:mx-10">
                                    <img src={B1} alt="" className='w-[500px] h-[180px] md:h-[300px] rounded-lg' />
                                    <img src={B2} alt="" className='w-[500px] h-[180px] md:h-[300px] rounded-lg' />
                                </div>
                                <span className='md:text-[2.3rem] font-bold flex justify-center pt-10 md:pt-[5rem]'>Key Use Cases</span>
                                <div className='grid md:grid-cols-2 gap-2 md:gap-10 mt-8 md:mt-[5rem] mx-2 md:mx-0'>
                                    <div className='flex flex-col bg-slate-100 px-6 py-4 md:py-8 rounded-lg hover:tranisition-all hover:-translate-y-1 duration-500'>
                                        <span className='font-bold  md:text-[1.4rem]'>Easy to Use</span>
                                        <p className='md:mt-4 text-slate-600 font-medium text-[0.7rem] md:text-[1rem]'>Our user-friendly drag & drop feature means you upload your photos and videos in seconds. Additionally, create great menu board content that boosts sales in seconds with free stock images and videos from our Galleries. Upload, edit and display content on all TVs remotely, from your PC, using our online platform, no matter where you are.</p>
                                    </div>
                                    <div className='flex flex-col bg-slate-100 px-6 py-4 md:py-8 rounded-lg hover:tranisition-all hover:-translate-y-1 duration-500'>
                                        <span className='font-bold  md:text-[1.4rem]'>Affordable Price</span>
                                        <p className='md:mt-4 text-slate-600 font-medium text-[0.7rem] md:text-[1rem]'>Our extremely affordable pricing model offers great value for money, with feature-rich plans, for all businesses that use electronic menu boards. Also, get free, complete Raspberry Pi Strix Player kits with annual plans.</p>
                                    </div>
                                    <div className='flex flex-col bg-slate-100 px-6 py-4 md:py-8 rounded-lg hover:tranisition-all hover:-translate-y-1 duration-500'>
                                        <span className='font-bold  md:text-[1.4rem]'>Upload Any Type of Content</span>
                                        <p className='md:mt-4 text-slate-600 font-medium text-[0.7rem] md:text-[1rem]'>Easily upload any image, audio or video format. It also supports Word, PowerPoint and PDF files. Use your files to customize our free, professionally-designed screen layout templates with your branding.</p>
                                    </div>
                                    <div className='flex flex-col bg-slate-100 px-6 py-4 md:py-8 rounded-lg hover:tranisition-all hover:-translate-y-1 duration-500'>
                                        <span className='font-bold  md:text-[1.4rem]'>Plug-and-Play</span>
                                        <p className='md:mt-4 text-slate-600 font-medium text-[0.7rem] md:text-[1rem]'>Get free pre-configured hardware if you choose an annual plan. And setup is a breeze, with no tech expertise required for successful digital signage deployment.</p>
                                    </div>
                                    <div className='flex flex-col bg-slate-100 px-6 py-4 md:py-8 rounded-lg hover:tranisition-all hover:-translate-y-1 duration-500'>
                                        <span className='font-bold  md:text-[1.4rem]'>Extreme Security</span>
                                        <p className='md:mt-4 text-slate-600 font-medium text-[0.7rem] md:text-[1rem]'>Enjoy enterprise-grade security, including SSL, firewall and password policies as well as Player lockdown and encryption features.</p>
                                    </div>
                                    <div className='flex flex-col bg-slate-100 px-6 py-4 md:py-8 rounded-lg hover:tranisition-all hover:-translate-y-1 duration-500'>
                                        <span className='font-bold  md:text-[1.4rem]'>Remote Support</span>
                                        <p className='md:mt-4 text-slate-600 font-medium text-[0.7rem] md:text-[1rem]'>Get hassle-free troubleshooting with Strix free remote-access tech support, for all plans.</p>
                                    </div>
                                </div>
                            </div>
                        </div>
                    </section>
                    <footer>
                        <div className='h-[50px] bg-slate-50 home_body'>
                            <div className="absolute bottom-0 w-full flex justify-between items-center h-[70px] bg-blue-500">
                                <span className='text-white text-[0.7rem] md:text-[1rem] font-bold mx-6'>Copyright © 2020-2023 STRIX | All rights reserved.</span>
                            </div>
                        </div>
                    </footer>
                </div>
            </div>
        </>
    )
}

export default HomePage
