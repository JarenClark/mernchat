import React, { useState, useEffect } from "react";
import { Link } from "react-router-dom";
//import { useForm } from "react-hook-form";

const Register = () => {
  //const { register, handleSubmit, errors } = useForm();

  const [formDataState, setformDataState] = useState({
    username: "",
    email: "",
    password: "",
    passwordconfirm: "",
    avatar: "",
  });

  const [loadImage, setLoadImage] = useState("");

  // text and email fields
  const inputHandle = (e) => {
    console.log('input handle event')
    setformDataState({
      ...formDataState,
      [e.target.name]: e.target.value,
    });
  };
  // avatar image
  const fileHandle = (e) => {
    console.log('file handle event')
    if (e.target.files.length !== 0) {
      setformDataState({
        ...formDataState,
        [e.target.name]: e.target.files[0],
      });


    const reader = new FileReader();
    reader.onload = () => {
      setLoadImage(reader.result);
    };
    reader.readAsDataURL(e.target.files[0]);

    } else {
      console.log(`no file chosen`)
      setformDataState({
        ...formDataState,
        [e.target.name]: '',
      });
      setLoadImage('');
    }

  };

  // function to register user
  const registerNewUser = async (e) => {
    e.preventDefault()
    alert(JSON.stringify(formDataState));
    alert(JSON.stringify(loadImage));
  };

  // fields
  const formFields = [
    {
      label: "Username",
      name: "username",
      type: "text",
    },
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
    {
      label: "Confirm Password",
      name: "passwordconfirm",
      type: "password",
    },
    {
      label: "Avatar",
      name: "avatar",
      type: "file",
    },
  ];


  // loadImage != '' &&

//   <div className="flex rounded-full w-16 h-16 mr-4 overflow-hidden">
//   <img src={loadImage} />
// </div>

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full  rounded-2xl p-8 lg:py-16 bg-zinc-900">
        <h1 className="mb-8 text-center">Register your Account</h1>
        <div className="my-8">
          <form onSubmit={registerNewUser}>
            <fieldset>
              {formFields.map((field, i) => (
                <div key={i} className="mb-4">

                  <label className="text-sm" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {field.type == 'file' ? (
                  <div className="flex items-center">
                    {loadImage != '' &&
                    <div style={{backgroundImage: `url(${loadImage})`}} className="w-20 h-20 rounded-full bg-cover bg-center mr-4">
                      </div>
                    }
                    <input
                      onChange={fileHandle}
                      name={field.name}
                      accept="image/png, image/jpeg"
                      placeholder={`Upload`}
                      className={`block my-1 rounded-lg w-full p-2 pl-0`}
                      type={field.type}
                    />
                  </div>
                  ) : (
                  <input
                    onChange={inputHandle}
                    name={field.name}
                    className="block my-1 rounded-lg w-full p-2"
                    type={field.type}
                  />
                  )}
                  
                </div>
              ))}
            </fieldset>
            <button
              type="submit"
              className="mt-4 rounded-lg bg-indigo-600 flex w-full text-center justify-center text-white py-2 px-4"
            >
              Register
            </button>
          </form>
        </div>

        <p className="mt-8 text-center">
          Have an account already?{" "}
          <Link to="/login">
            <span className="text-indigo-500">Login</span>
          </Link>
        </p>
      </div>
    </div>
  );
};

export default Register;
