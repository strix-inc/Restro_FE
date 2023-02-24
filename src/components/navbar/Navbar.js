import React from 'react'
import Nav from './Nav'
import Navlist from './Navlist'
import Footer from './Footer'


const Navbar = (props) => {

    return (
        <>
            <Nav mode={props.mode} OnClickMoon={props.OnClickMoon} OnClickSun={props.OnClickSun} loggedOut={props.loggedOut} />
            <div className='flex flex-row'>
                <Navlist mode={props.mode} />
                <div className='contents'>{props.children}</div>
            </div>
            <Footer />
        </>
    )
}

export default Navbar
