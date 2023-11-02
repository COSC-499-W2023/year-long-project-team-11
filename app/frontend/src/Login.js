import React, { useState } from 'react'
import './css/login.css'
import users from './tests/loginTest.json'
import { Link } from 'react-router-dom';

export default function Login() {
    const [email, setEmail] = useState('')
    const [password, setPassword] = useState('')
    const [emailError, setEmailError] = useState('')
    const [passwordError, setPasswordError] = useState('')

    const validateEmail = (email) => {
        const regex = /^[a-zA-Z0-9._-]+@[a-zA-Z0-9.-]+\.[a-zA-Z]{2,6}$/;
        return regex.test(email);
    }

    const handleLogin = (e) => {
        e.preventDefault()

        if (!validateEmail(email)) {
            setEmailError("Invalid email format")
            setPassword('')
            return;
        }

        setEmailError('')
        const user = users.find(user => user.email === email)
        if (user && user.password === password) {
            // successful login
            console.log("Logged in as " + user.email)
            setPasswordError('')
        } else {
            setPasswordError("Invalid email or password. Please try again.")
        }
        setPassword('')
    }

    return (
        <div className="h-screen grid place-items-center">
            <div className='grid place-items-center'>
                <div className="grid place-items-center rounded-lg w-500 h-500 px-[100px] py-[30px] text-center bg-[#E2E2E2] border-[3px] border-black" id="main-signin-box">
                    <img className="py-[10px]" src={require("./img/symbol-user.png")} height={100} width={70} />
                    <h2 className="font-bold text-2xl pb-[10px]">Sign In</h2>

                    {/* Form (email, password, remember me, and forgot password) */}
                    <form onSubmit={handleLogin}>
                        {/* Email */}

                        <div className="py-[5px]">
                            <input className="bg-white text-center rounded-lg"
                                type="text"
                                id="email"
                                name="email"
                                placeholder="Email"
                                maxLength="100"
                                required
                                value={email}
                                onChange={(e) => setEmail(e.target.value)}
                            />
                        </div >
                        <p className="text-sm text-red-500">&nbsp;{emailError}</p>
                        {/* Password */}
                        <div className="py-[5px]">
                            <input className="bg-white text-center rounded-lg"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                maxLength="100"
                                required
                                value={password}
                                onChange={(e) => setPassword(e.target.value)}
                            />
                        </div>
                        <p className="text-sm text-red-500">&nbsp;{passwordError}</p>
                        {/* Submission of form */}
                        <div className="py-[5px]">
                            <input
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                className="mr-1"
                            />
                            <label htmlFor="rememberme" className="text-black">Remember Me</label>
                        </div>
                        <button className='grid place-items-center bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] w-[100%]' type="submit">Sign In</button>
                        {/* Remember me */}
                        <p className='pt-[5px]'>
                            <a className="text-[#19747E]" href="#">Forgot Your Password?</a>
                        </p>
                    </form>

                </div>

                {/* Create account */}
                <p>
                    Don't have an account?&#160;
                    <Link to={"/SignUp"}>
                        <a className="text-[#44566B] underline" href="#">Create an account</a>
                    </Link>
                </p>
            </div>
        </div>
    )
}