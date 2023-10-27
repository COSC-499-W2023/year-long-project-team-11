import React from 'react'
import './css/reset.css'
import './css/login.css'

function Login() {

    return (
        <div class="h-screen flex items-center justify-center">
            <div>
            <div className="rounded-lg w-500 h-500" id="main-signin-box">
                <img className="w-[50%] h-[50%]" src="../img/symbol-user.png"/>
                <h2 className="font-bold">Sign In</h2>

                {/* Form (email, password, remember me, and forgot password) */}
                <form method="post">
                    {/* Email */}
                    <div className="py-[5px]">
                        <input className="bg-white text-center rounded-lg"
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Type Your Email"
                            maxlength="100"
                            required
                        />
                    </div >
                    {/* Password */}
                    <div className="py-[5px]">
                        <input className="bg-white text-center rounded-lg"
                            type="password"
                            id="password"
                            name="password"
                            placeholder="Type Your Password"
                            maxlength="100"
                            required
                        />
                    </div>
                    {/* Submission of form */}
                    <button type="submit">
                        Sign In
                    </button>
                    {/* Remember me */}
                    <div className="flex flex-col md:flex-row items-center">
                        <div className="flex items-center">
                            <input
                                type="checkbox"
                                id="rememberme"
                                name="rememberme"
                                className="mr-1"
                            />
                                <label htmlFor="rememberme" className="text-black">Remember Me</label>
                        </div>
                        {/* Forgot password */}
                        <div className="mt-2 md:mt-0 md:ml-4">
                            <p>
                                <a className="text-[#19747E]"href="#">Forgot Your Password?</a>
                            </p>
                        </div>
                    </div>
                </form>
            </div>

            {/* Create account */}
            <p >
                Don't have an account? 
                <a className="text-[#44566B] underline" href="#"> Create an account</a>
            </p>
            </div>
        </div>
    )
}

export default Login