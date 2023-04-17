import React, { useState } from 'react'
import Nav from './Nav'
import Navlist from './Navlist'
import Footer from './Footer'


const Navbar = (props) => {
    const [navitem, setNavitem] = useState(false);

    return (
        <>
            <div>
                <Nav mode={props.mode} OnClickMoon={props.OnClickMoon} OnClickSun={props.OnClickSun} loggedOut={props.loggedOut} navitem={navitem} setNavitem={setNavitem} />
                <div className='flex flex-row'>
                    <Navlist mode={props.mode} navitem={navitem} setNavitem={setNavitem} />
                    <div className='contents'>{props.children}</div>
                </div>
                <Footer navitem={navitem} />
            </div>
        </>
    )
}

export default Navbar
