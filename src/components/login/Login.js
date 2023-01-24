import React, { useState } from 'react'
import CompanyDetail from './CompanyDetail'
import LoginForm from './LoginForm'
import axios from 'axios'


const Login = (props) => {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [matched, setMatched] = useState('');

    const handleContact = (value) => {
        setContact(value);
    }
    const handlePassword = (value) => {
        setPassword(value);
    }

    const HandleLoginForm = () => {
        let Logindata = {
            username: contact,
            password: password
        }
        if (Logindata.username === '' && Logindata.password === '') {
            setMatched('Enter Username & Password');
        } else {
            axios.post('https://restrofin.pythonanywhere.com/auth/login/token', Logindata)
                .then((val) => {
                    console.log(val);
                    localStorage.setItem('access', val.data.access);
                    if (val.request.status === 200) {
                        props.setLoggedIn(true);
                    }
                })
                .catch((err) => {
                    console.log(err);
                    setMatched("Please Enter Correct Phone Number or Password");
                });
        }
        setContact('');
        setPassword('');
    }

    return (
        <>
            {!props.IsLoggedIn ? (
                <div className="signup_conatiner fixed bg-white w-[100%] h-[100vh] overflow-hidden z-10 top-0 left-0">
                    <div className="SignUpForm absolute top-[20%] w-full flex rounded-lg">
                        <LoginForm
                            contact={contact}
                            password={password}
                            matched={matched}
                            HandleLoginForm={HandleLoginForm}
                            handleContact={handleContact}
                            handlePassword={handlePassword}
                        />
                    </div>
                </div>) : (window.location = "/dashboard")
            }
        </>
    )
}

export default Login
