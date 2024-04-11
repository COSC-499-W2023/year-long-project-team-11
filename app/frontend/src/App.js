import './App.css';
import Logout from './Logout';
import Login from './Login';
import Landing from './Landing';
import { Routes, Route } from "react-router-dom";
import CreateAccount from './CreateAccount';
import Prompt from './Prompt';
import Tutorial from './Tutorial';
import UserProfile from './UserProfile';
import Regenerate from './Regenerate';
import SavedContent from './SavedContent';
import Output from './Output';
import ForgetPassword from './ForgetPassword'; 
import ResetPassword from './ResetPassword'; 

function App() {
  return (
    <div className='App'>
      <Routes>
        <Route path="/" element={<Landing />} />
        <Route path="/Landing" element={<Landing />} />
        <Route path="/Login" element={<Login />} />
        <Route path='/Logout' element={<Logout />} />
        <Route path='/SignUp' element={<CreateAccount />} />
        <Route path='/Prompt' element={<Prompt />} />
        <Route path='/Tutorial' element={<Tutorial />} />
        <Route path='/UserProfile' element={<UserProfile />} />
        <Route path='/Regenerate' element={<Regenerate />} />
        <Route path='/SavedContent' element={<SavedContent />} />
        <Route path='/post/:postId' element={<Output />} />
        <Route path='/ForgetPassword' element={<ForgetPassword/>}/>
        <Route path='/ResetPassword/:userid/:tokenid' element={<ResetPassword/>}/>
      </Routes>
    </div>
  );
}

export default App;
