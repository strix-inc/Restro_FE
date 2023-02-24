import React, { useEffect, useState } from 'react'
import LoginForm from './LoginForm'
import axios from 'axios'
import LoadingBar from 'react-top-loading-bar'


const Login = (props) => {
    const [contact, setContact] = useState('');
    const [password, setPassword] = useState('');
    const [matched, setMatched] = useState('');
    const [progress, setProgress] = useState(0);

    // set state for the login button disability !!
    const [isValue, setValue] = useState(true);


    const handleContact = (value) => {
        // if (value.length > 0) {
        //     setValue(false);
        // } else {
        //     setValue(true);
        // }
        setContact(value);
    }
    const handlePassword = (value) => {
        setPassword(value);
    }

    const HandleLoginForm = () => {
        setProgress(10);
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
                        setProgress(100);
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
    useEffect(() => {
        if (contact.length > 0 && password.length > 0) {
            setValue(false);
        } else {
            setValue(true);
        }
    })

    return (
        <>
            <LoadingBar
                color='#f11946'
                progress={progress}
                onLoaderFinished={() => setProgress(0)}
            />
            {!props.IsLoggedIn ? (
                <div className="signup_conatiner fixed bg-white w-[100%] h-[100vh] overflow-hidden z-30 top-0 left-0">
                    <div className="SignUpForm absolute top-[20%] w-full flex rounded-lg">
                        <LoginForm
                            contact={contact}
                            password={password}
                            matched={matched}
                            HandleLoginForm={HandleLoginForm}
                            handleContact={handleContact}
                            handlePassword={handlePassword}
                            isValue={isValue}
                        />
                    </div>
                </div>) : (setTimeout(() => {
                    window.location = "/dashboard";
                }, 500))
            }
        </>
    )
}

export default Login
