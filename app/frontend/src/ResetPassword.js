import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate} from 'react-router-dom';
import { useParams } from 'react-router-dom';
export default function ResetPassword() {
  const navigate = useNavigate();
//   const location= useLocation();
//   const email= location.state?.email;
  //const [email,setEmail]= useState('');
  const { userid } = useParams();
  const [newPassword, setNewPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [error, setError] = useState('');
  if (localStorage.getItem('loggedIn') === 'true') {
    window.location.href = "/Prompt";
  }
  const handleSubmit = async (e) => {
    e.preventDefault();
    if (newPassword !== confirmPassword) {
      setError("Passwords don't match.");
      return;
    }

    try {
      await axios.post('http://localhost:8000/resetpassword/', {
        userid: userid,
        password: newPassword 
    });
      navigate('/Login');
    } catch (err) {
      setError('Failed to reset password. Please try the link in your email again.');
    }
  };

  return (
    <div className="h-screen grid place-items-center">
        <div className="grid place-items-center">
        <div className="grid place-items-center rounded-lg w-500 h-500 px-[100px] py-[30px] text-center bg-[#E2E2E2] border-[3px] border-black">
        <h2 className="font-bold text-2xl pb-[10px]">Set New Password</h2> 
      {error && <p>{error}</p>}
      <form onSubmit={handleSubmit}>
        <input className="bg-white text-center rounded-lg" type="password" placeholder="New Password" value={newPassword} onChange={(e) => setNewPassword(e.target.value)} required />
        <br/>
        <br/>
        <input className="bg-white text-center rounded-lg" type="password" placeholder="Confirm Password" value={confirmPassword} onChange={(e) => setConfirmPassword(e.target.value)} required />
        <button className="bg-[#19747E] text-white py-1 rounded hover:bg-[#316268] w-[100%] mt-4" type="submit">Reset Password</button>
      </form>
      </div>
      </div>
      
    </div>
  ); 
}
