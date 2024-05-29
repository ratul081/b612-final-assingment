import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { useNavigate } from "react-router-dom";
import useAuth from "../../hooks/useAuth";
import useAxiosSecure from "../../hooks/useAxiosSecure";
import Swal from "sweetalert2";

const Register = () => {
  const { createUser, googleSignIn, updateUserProfile } = useAuth();
  const [signUpError, setSignUPError] = useState("");
  // const [createdUserEmail, setCreatedUserEmail] = useState("");
  const [axiosSecure] = useAxiosSecure();
  const {
    register,
    handleSubmit,
    validate,
    reset,
    getValues,
    formState: { errors },
  } = useForm();
  const navigate = useNavigate();

  const handleSignUp = (data) => {
    console.log(data);
    setSignUPError("");
    createUser(data.email, data.password)
      .then((result) => {
        const user = result.user;
        console.log(user);
        toast.success("User Created Successfully.");
        const userInfo = {
          displayName: data.name,
        };
        console.log(userInfo);
        updateUserProfile(userInfo)
          .then(() => {
            saveUser(data.name, data.email);
            reset();
            Swal.fire({
              // position: "top-end",
              icon: "success",
              title: "User created Successful",
              showConfirmButton: false,
              timer: 1500,
            });
          })
          .catch((err) => console.log(err));
        navigate("/");
      })
      .catch((error) => {
        // console.log(error);
        setSignUPError(error.message);
      });
  };
  const handelGoogleSingUp = () => {
    googleSignIn()
      .then((result) => {
        const user = result.user;
        console.log(user);
        saveUser(user.name, user.email);
        navigate("/");
      })
      .catch((error) => {});
  };

  const saveUser = (name, email) => {
    const user = { name, email };
    axiosSecure.post("/users", user).then((res) => console.log(res.data));
  };

  return (
    <section className="bg-white my-4">
      <div className="flex justify-center min-h-screen">
        <div
          className="hidden bg-cover lg:block lg:w-2/5"
          style={{
            backgroundImage:
              'url("https://images.unsplash.com/photo-1494621930069-4fd4b2e24a11?ixlib=rb-1.2.1&ixid=MnwxMjA3fDB8MHxwaG90by1wYWdlfHx8fGVufDB8fHx8&auto=format&fit=crop&w=715&q=80")',
          }}></div>
        <div className="flex items-center w-full max-w-3xl p-8 mx-auto lg:px-12 lg:w-3/5">
          <div className="w-full">
            <h1 className="text-2xl font-semibold tracking-wider text-gray-800 capitalize ">
              Get your free account now.
            </h1>
            <p className="mt-4 text-gray-500 dark:text-gray-400">
              Let’s get you all set up so you can verify your personal account
              and begin setting up your profile.
            </p>
            <form onSubmit={handleSubmit(handleSignUp)}>
              <div className="mt-6">
                <h1 className="text-gray-500">Select type of account</h1>
                <div className="mt-3 md:flex md:items-center md:-mx-2">
                  <div>
                    <input
                      className="peer sr-only"
                      {...register("AccountType")}
                      type="radio"
                      value="Buyer"
                      id="Buyer"
                      tabIndex="-1"
                      defaultChecked
                    />
                    <label
                      htmlFor="Buyer"
                      className="flex justify-center w-full px-6 py-3 border rounded-lg md:w-auto md:mx-2  focus:outline-none border-gray-200 p-3 text-gray-600  peer-checked:bg-blue-500 peer-checked: peer-checked:text-white"
                      tabIndex="0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M21 13.255A23.931 23.931 0 0112 15c-3.183 0-6.22-.62-9-1.745M16 6V4a2 2 0 00-2-2h-4a2 2 0 00-2 2v2m4 6h.01M5 20h14a2 2 0 002-2V8a2 2 0 00-2-2H5a2 2 0 00-2 2v10a2 2 0 002 2z"
                        />
                      </svg>
                      <span className="mx-2">Buyer</span>
                    </label>
                  </div>
                  <div>
                    <input
                      className="peer sr-only"
                      {...register("AccountType")}
                      type="radio"
                      value="Seller"
                      id="Seller"
                      tabIndex="-1"
                    />
                    <label
                      htmlFor="Seller"
                      className="flex justify-center w-full px-6 py-3 border rounded-lg md:w-auto md:mx-2  focus:outline-none border-gray-200 p-3 text-gray-600  peer-checked:bg-blue-500 peer-checked: peer-checked:text-white"
                      tabIndex="0">
                      <svg
                        xmlns="http://www.w3.org/2000/svg"
                        className="w-6 h-6"
                        fill="none"
                        viewBox="0 0 24 24"
                        stroke="currentColor"
                        strokeWidth={2}>
                        <path
                          strokeLinecap="round"
                          strokeLinejoin="round"
                          d="M16 7a4 4 0 11-8 0 4 4 0 018 0zM12 14a7 7 0 00-7 7h14a7 7 0 00-7-7z"
                        />
                      </svg>
                      <span className="mx-2">Seller</span>
                    </label>
                  </div>
                </div>
              </div>
              <div className="grid grid-cols-1 gap-6 mt-8 md:grid-cols-2">
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    First Name
                  </label>
                  <input
                    type="text"
                    {...register("name", {
                      required: "Name is Required",
                    })}
                    placeholder="John"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.name && (
                    <p className="text-red-500">{errors.name.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Last name
                  </label>
                  <input
                    type="text"
                    {...register("lastName", {
                      required: "Please enter your last name",
                      maxLength: 100,
                    })}
                    placeholder="Snow"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Phone number
                  </label>
                  <input
                    type="tel"
                    placeholder="Phone Number"
                    {...register("Phone Number", {})}
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Email address
                  </label>
                  <input
                    type="email"
                    {...register("email", {
                      required: true,
                    })}
                    placeholder="johnsnow@example.com"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.email && (
                    <p className="text-red-500">{errors.email.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Password
                  </label>
                  <input
                    type="password"
                    {...register("password", {
                      required: "Password is required",
                      minLength: {
                        value: 6,
                        message: "Password must be 6 characters long",
                      },
                      pattern: {
                        value: /(?=.*[A-Z])(?=.*[!@#$&*])(?=.*[0-9])/,
                        message:
                          "Password must have uppercase, number and special characters",
                      },
                    })}
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.password && (
                    <p className="text-red-500">{errors.password.message}</p>
                  )}
                </div>
                <div>
                  <label className="block mb-2 text-sm text-gray-600 ">
                    Confirm password
                  </label>
                  <input
                    type="password"
                    {...register("passwordConfirmation", {
                      validate: (value) =>
                        value === getValues("password") ||
                        "Passwords must match",
                      required: validate ? "" : "Passwords must match",
                    })}
                    placeholder="Enter your password"
                    className="block w-full px-5 py-3 mt-2 text-gray-700 placeholder-gray-400 bg-white border border-gray-200 rounded-lg  focus:border-blue-400 focus:ring-blue-400 focus:outline-none focus:ring focus:ring-opacity-40"
                  />
                  {errors.passwordConfirmation && (
                    <p className="text-red-500 text-lg">{`${errors.passwordConfirmation.message}`}</p>
                  )}
                </div>
                <button className="flex items-center justify-between w-full px-6 py-3 text-sm tracking-wide text-white capitalize transition-colors duration-300 transform bg-blue-500 rounded-lg hover:bg-blue-400 focus:outline-none focus:ring focus:ring-blue-300 focus:ring-opacity-50">
                  <input value="Sign Up" type="submit" />
                  <svg
                    xmlns="http://www.w3.org/2000/svg"
                    className="w-5 h-5 rtl:-scale-x-100"
                    viewBox="0 0 20 20"
                    fill="currentColor">
                    <path
                      fillRule="evenodd"
                      d="M7.293 14.707a1 1 0 010-1.414L10.586 10 7.293 6.707a1 1 0 011.414-1.414l4 4a1 1 0 010 1.414l-4 4a1 1 0 01-1.414 0z"
                      clipRule="evenodd"
                    />
                  </svg>
                </button>
              </div>
            </form>
            {signUpError && <p className="text-red-600">{signUpError}</p>}
          </div>
        </div>
      </div>
    </section>
  );
};

export default Register;
