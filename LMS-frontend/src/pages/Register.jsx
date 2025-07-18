import React, { useState } from "react";
import { Link, useNavigate, Navigate } from "react-router";
import { User } from "lucide-react";

const Register = () => {
  const [name, setName] = useState("");
  const navigate = useNavigate();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");
  const [address, setaddress] = useState("");
  const [phoneNumber, setphoneNumber] = useState("")

  const handleRegister = async event => {
    event.preventDefault();
    console.log("name", name, email, address, password);
    
    
    try {
      const response = await fetch("http://localhost:5000/api/auth/register", {
        method: "POST",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          name: name,
          email: email,
          password,
          address,
          phoneNumber
        })
      });
      const responseData =await response.json();
      console.log("API", responseData);
      
      if (responseData.success) {
        navigate("/login")
      }

    } catch (error) {
      console.log(error);
    }
  };

  return <div className="bg-gradient-to-t bg-gray-500 to-white items-center w-screen flex justify-center pt-5">
      <div>
        <div className="mb-8">
          <div className="rounded-full bg-black w-15 h-15 p-3 mx-auto mb-5" />
          <h3 className="text-4xl font-bold text-center mb-2">LMS</h3>
          <p className="text-center font-light">A Digital Library System</p>
        </div>

        <form className="bg-white p-4 shadow w-[400px] rounded-xl space-y-4">
          <div>
            <h3 className="text-4xl font-bold text-center mb-2">
              Create Account
            </h3>
            <p className="text-center font-light">
              Join an awesome Library Management System
            </p>
          </div>

          <div className="flex flex-col">
            <label htmlFor="name" className="mb-2">
              Name
            </label>
            <input id="name" value={name} placeholder={"Enter your name"} className="border w-full p-2 rounded-lg" onChange={event => {
                setName(event.target.value);
              }} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="email" className="mb-2">
              E-mail
            </label>
            <input id="email" value={email} placeholder="Enter your email" className="border w-full p-2 rounded-lg" onChange={event => {
                setEmail(event.target.value);
              }} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="phone" className="mb-2">
              Phone Number
            </label>
            <input id="phone" value={phoneNumber} placeholder="Enter your email" className="border w-full p-2 rounded-lg" onChange={event => {
                setphoneNumber(event.target.value);
              }} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="address" className="mb-2">
              Address
            </label>
            <input id="address" value={address} placeholder="Enter your address" className="border w-full p-2 rounded-lg" onChange={event => {
                setaddress(event.target.value);
              }} />
          </div>

          <div className="flex flex-col">
            <label htmlFor="password" className="mb-2">
              Password
            </label>
            <input id="password" value={password} placeholder="Enter your password" className="border w-full p-2 rounded-lg" onChange={event => {
                setPassword(event.target.value);
              }} />
          </div>
          <button className="w-full bg-black text-white p-2 hover:bg-gray-800 rounded" onClick={handleRegister}>
            Sign Up
          </button>
          <p>
            Already Have an Account
              {" "}<Link to={"/login"} className="underline text-blue-900 font-bold  ">
                Log in
              </Link>{" "}
          </p>
        </form>
      </div>
    </div>;
};

export default Register;
