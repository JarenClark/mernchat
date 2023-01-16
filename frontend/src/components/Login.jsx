import React, { useState, useEffect} from 'react'
import { Link } from 'react-router-dom'

const Login = () => {

    // state
  const [formDataState, setformDataState] = useState({
    email: "",
    password:""
  });

  // input change handler
    const inputHandle = (e) => {
      console.log('input handle event')
      setformDataState({
        ...formDataState,
        [e.target.name]: e.target.value,
      });
    };

  // login function
  const loginUser = async (e) => {
    e.preventDefault()
    console.log(formDataState);
  };

  const formFields = [
    {
      label: "Email",
      name: "email",
      type: "email",
    },
    {
      label: "Password",
      name: "password",
      type: "password",
    },

  ];

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
    <div className="max-w-xl w-full  rounded-2xl p-8 lg:py-16 bg-zinc-900">
      <h1 className='mb-8 text-center'>Login to Your Account</h1>
              <div className="my-8">
          <form onSubmit={loginUser}>
            <fieldset>
              {formFields.map((field, i) => (
                <div key={i} className="mb-6">
                  
                  <label className='text-sm' htmlFor={field.name}>{field.label}</label>
                  <input
                  name={field.name}
                    onChange={inputHandle}
                    required={true}
                    className="block my-1 rounded-lg w-full p-2"
                    type={field.type}
                  />
                </div>
              ))}
            </fieldset>
            <button type="submit" className="mt-4 flex w-full justify-center text-center rounded-lg bg-indigo-600 text-white py-2 px-4">
              Login
            </button>
          </form>
        </div>
      
      <p className='mt-8 text-center'>Don't have an account yet?{' '} <Link to="/register"><span className="text-indigo-500">Register</span> </Link></p>
      
    </div>
  </div>
  )
}

export default Login