import React from 'react';
import { Link,useEffect } from 'react';
const Landing= ()=>
{
    useEffect(() => {
        document.title = "Landing";
      }, []);

    return (
        <div className="landing flex justify-center items-center h-screen " >   

            <div className='flex flex-row gap-9'>
                

            <div className=" flex-auto py-2 border-4 border-blue-700 bg-white">
            <img className="object-center" src={require("./Images/symbol-user.png")}width={260}  />
            <div class="px-6 py-4">
            <div class="font-bold text-xl mb-2 text-center">Login</div>
            </div>
           
            </div>


            <div className="flex-auto py-2 border-4 border-blue-700 bg-white">
            <img className="object-center" src={require("./Images/symbol-user.png")} width={260}  />
            <div class="px-6 py-4">
            <Link to={"/Logout"}>
            <div class="font-bold text-xl mb-2 text-center">Logout</div>
            </Link>
            </div>
            
          
            </div>


            </div>

            </div>
        
      );
};
export default Landing;
