import React from 'react';
import { Link } from 'react-router-dom';

export default function Landing() {

  return (
    <div className="landing flex justify-center items-center h-screen" >

      <div className='flex flex-row gap-9'>
        <Link to={"/Login"}>
          <div className=" flex-auto py-3 px-6 border-[3px] border-black rounded-lg bg-[#E2E2E2]">
            <img className="object-center" src={require("./img/symbol-user.png")} width={260} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-center">Log In</div>
            </div>
          </div>
        </Link>

        <Link to={"/SignUp"}>
          <div className="flex-auto py-3 px-6 border-[3px] border-black rounded-lg bg-[#E2E2E2]">
            <img className="object-center" src={require("./img/symbol-user.png")} width={260} />
            <div class="px-6 py-4">
              <div class="font-bold text-xl mb-2 text-center">Sign Up</div>
            </div>
          </div>
        </Link>
      </div>

    </div >

  );
};