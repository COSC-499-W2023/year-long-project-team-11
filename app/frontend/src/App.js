import './App.css';
import Logout from './Logout';
import Login from './Login'
import Landing from './Landing';
import { Routes, Route } from "react-router-dom";
import CreateAccount from './CreateAccount';
import Prompt from './Prompt';
import Tutorial from './Tutorial';

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
      </Routes>
    </div>
  );
}

export default App;