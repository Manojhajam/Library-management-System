import React from "react";

const Login = () => {
  return <div className="bg-gradient-to-t bg-gray-500 to-white items-center h-screen w-screen flex justify-center">
      <div>
        <div className="mb-8">
          <div className="rounded-full bg-black w-12 h-12 p-4 mx-auto mb-6" />
          <h3 className="text-4xl font-bold text-center mb-2">LMS</h3>
          <p className="text-center font-light">A Digital Library System</p>
        </div>

        <form className="bg-white p-4 shadow w-[400px] rounded-xl space-y-4">
          <div>
            <h3 className="text-4xl font-bold text-center mb-2">Welcome, Back</h3>
            <p className="text-center font-light" >Sign in to access your Library account</p>
          </div>
         

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              E-mail
            </label>
            <input id="name" placeholder="Enter your email" className="border w-full p-2 rounded-lg" />
          </div>


          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2">
              Password
            </label>
            <input id="password" placeholder="Enter your password" className="border w-full p-2 rounded-lg" />
          </div>
          <button className="w-full bg-black text-white p-2 hover:bg-gray-800 rounded">
            Sign In
          </button>
        </form>
      </div>
    </div>;
};

export default Login;
