import React from 'react'

function Login() {

    return (
        <div>
            <div id="main-signin-box">
                <h2>Sign In</h2>

                {/* Form (email, password, remember me, and forgot password) */}
                <form method="post">
                    {/* Email */}
                    <div>
                        <input
                            type="email"
                            id="email"
                            name="email"
                            placeholder="Type Your Email"
                            maxlength="100"
                            required
                        />
                    </div>
                    {/* Password */}
                    <div>
                        <input
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
                    <div>
                        <input
                            type="checkbox"
                            id="rememberme"
                            name="rememberme"
                        />
                        Remember Me
                    </div>
                    {/* Forgot password */}
                    <p>
                        <a href="">Forgot Your Password?</a>
                    </p>
                </form>
            </div>

            {/* Create account */}
            <p>
                Don't have an account?
                <a href="">Create an account</a>
            </p>
        </div>
    )
}

export default Login