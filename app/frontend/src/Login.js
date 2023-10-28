import React from 'react'
import './css/reset.css'
import './css/login.css'

function Login() {

    return (
        <div class="h-screen grid place-items-center">
            <div className='grid place-items-center'>
                <div className="grid place-items-center rounded-lg w-500 h-500 px-[100px] py-[30px]" id="main-signin-box">
                    <img className="py-[10px]" src={require("./img/symbol-user.png")} height={100} width={70} />
                    <h2 className="font-bold text-2xl pb-[10px]">Sign In</h2>

                    {/* Form (email, password, remember me, and forgot password) */}
                    <form method="post">
                        {/* Email */}
                        
                        <div className="py-[5px]">
                            <input className="bg-white text-center rounded-lg"
                                type="email"
                                id="email"
                                name="email"
                                placeholder="Email"
                                maxlength="100"
                                required
                            />
                        </div >
                        <a className="text-red-500 text-sm">Email is incorrect</a>
                        {/* Password */}
                        <div className="py-[5px]">
                            <input className="bg-white text-center rounded-lg"
                                type="password"
                                id="password"
                                name="password"
                                placeholder="Password"
                                maxlength="100"
                                required
                                />
                        </div>
                        <a className="text-red-500 text-sm">Password is incorrect</a>
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
                    Don't have an account? &#160;
                    <a className="text-[#44566B] underline" href="#">Create an account</a>
                </p>
            </div>
        </div>
    )
}

export default Login