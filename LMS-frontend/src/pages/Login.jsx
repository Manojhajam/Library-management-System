import React, { useState } from "react";
import { Link, Navigate } from "react-router";
import useAuth from "../hooks/useAuth";
import { makeApiRequest } from "../lib/api";

const Login = () => {
  const { user, setUser } = useAuth();
  const [email, setEmail] = useState("");
  const [password, setPassword] = useState("");

  const handleSignIn = async (event) => {
    event.preventDefault();
    // console.log(email, password);

    const { response, error } = await makeApiRequest({
      endpoint: "/auth/login",
      body: {
        email,
        password,
      },
      method: "POST",
    });

    if (error) {
      console.log(error);
      return;
    }

    if (response?.success) {
      setUser(response.data);
    }
  };

  if (user) {
    return <Navigate to="/" replace />;
  } else {
    return (
      <div className="bg-gradient-to-t bg-gray-500 to-white items-center h-screen w-screen flex justify-center">
        <div>
          <div className="mb-8">
            <div className="rounded-full bg-black w-12 h-12 p-4 mx-auto mb-6" />
            <h3 className="text-4xl font-bold text-center mb-2">LMS</h3>
            <p className="text-center font-light">A Digital Library System</p>
          </div>

          <form className="bg-white p-4 shadow w-[400px] rounded-xl space-y-4">
            <div>
              <h3 className="text-4xl font-bold text-center mb-2">
                Welcome, Back
              </h3>
              <p className="text-center font-light">
                Sign in to access your Library account
              </p>
            </div>

            <div className="flex flex-col">
              <label htmlFor="email" className="mb-2">
                E-mail
              </label>
              <input
                value={email}
                id="email"
                placeholder="Enter your email"
                className="border w-full p-2 rounded-lg"
                onChange={(event) => {
                  setEmail(event.target.value);
                }}
              />
            </div>

            <div className="flex flex-col">
              <label htmlFor="password" className="mb-2">
                Password
              </label>
              <input
                value={password}
                id="password"
                type="password"
                placeholder="Enter your password"
                className="border w-full p-2 rounded-lg"
                onChange={(event) => {
                  setPassword(event.target.value);
                }}
              />
            </div>
            <button
              className="w-full bg-black text-white p-2 hover:bg-gray-800 rounded"
              onClick={handleSignIn}
            >
              Sign In
            </button>
            <p>
              Don't have an Account{" "}
              <span className="underline text-blue-900 font-bold  ">
                {" "}
                <Link to={"/register"}>Sign up</Link>{" "}
              </span>
            </p>
          </form>
        </div>
      </div>
    );
  }
};

export default Login;
