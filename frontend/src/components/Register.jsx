import React, { useState, useEffect } from "react";
import { Link, useNavigate } from "react-router-dom";
//import { useForm } from "react-hook-form";
import { useDispatch, useSelector } from "react-redux";
import { userRegister } from "../store/actions/authAction";
import { useAlert } from "react-alert";
import { SUCCESS_MESSAGE_CLEAR } from "../store/types/authType";

const Register = () => {
  const navigate = useNavigate();
  const dispatch = useDispatch();
  const alert = useAlert();
  const { loading, authenticate, error, successMessage, myInfo } = useSelector(
    (state) => state.auth
  );

  const [formDataState, setformDataState] = useState({
    userName: "",
    email: "",
    password: "",
    passwordconfirm: "",
    avatar: null,
  });

  const [loadImage, setLoadImage] = useState("");


  // text and email fields
  const inputHandle = (e) => {
    setformDataState({
      ...formDataState,
      [e.target.name]: e.target.value,
    });
  };
  // avatar image 
  const fileHandle = (e) => {
    // put in our main state
    if (e.target.files.length !== 0) {
      setformDataState({
        ...formDataState,
        [e.target.name]: e.target.files[0],
      });

      // use image preview
      const reader = new FileReader();
      reader.onload = () => {
        setLoadImage(reader.result);
        setformDataState({
          ...formDataState,
          [e.target.name]: e.target.files[0],
        });
        console.log(`loadImage is ${JSON.stringify(loadImage)}`);
      };
      reader.readAsDataURL(e.target.files[0]);
    } else {
      console.log(`no file chosen`);
      setformDataState({
        ...formDataState,
        [e.target.name]: null,
      });
      setLoadImage("");
    }
  };

  // function to register user
  const registerNewUser = async (e) => {
    e.preventDefault();

    const { userName, email, password, passwordconfirm, avatar } =
      formDataState;

    const formData = new FormData();

    formData.append("userName", userName);
    formData.append("email", email);
    formData.append("password", password);
    formData.append("passwordconfirm", passwordconfirm);
    formData.append("avatar", avatar);

    dispatch(userRegister(formData));

    // formData.forEach(function (value, key) {
    //   console.log(key, ":", value);
    // });
  };

  // fields
  const formFields = [
    {
      label: "User Name",
      name: "userName",
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

  useEffect(() => {
    if (authenticate) {
      navigate("/");
    }
    if (successMessage) {
      alert.success(successMessage);
      dispatch({type: SUCCESS_MESSAGE_CLEAR })
    }
    if (error && error.errorMessage) {
      error.errorMessage.map((err) => alert.error(err));
    }
  }, [loading, authenticate, successMessage, error]);

  return (
    <div className="w-screen min-h-screen flex justify-center items-center">
      <div className="max-w-xl w-full  rounded-2xl p-8 lg:py-16 bg-zinc-900">
        <h1 className="mb-8 text-center">Register a New Account</h1>
        <div className="my-8">
          <form onSubmit={registerNewUser}>
            <fieldset>
              {formFields.map((field, i) => (
                <div key={i} className="mb-4">
                  <label className="text-sm" htmlFor={field.name}>
                    {field.label}
                  </label>
                  {field.type == "file" ? (
                    <div className="flex items-center">
                      {loadImage != "" && (
                        <div
                          style={{ backgroundImage: `url(${loadImage})` }}
                          className="w-20 h-20 rounded-full bg-cover bg-center mr-4"
                        ></div>
                      )}
                      <input
                        onChange={fileHandle}
                        name={field.name}
                        accept="image/png, image/jpeg"
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
