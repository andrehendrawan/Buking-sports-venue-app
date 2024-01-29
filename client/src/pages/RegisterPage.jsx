import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function RegisterPage() {
  const navigate = useNavigate();
  const [form, Setform] = useState({
    email: "",
    password: "",
    fullName: "",
    phoneNumber: "",
  });
  console.log(form);

  const handleChange = (e) => {
    const { name, value } = e.target;
    console.log(name, value);

    Setform({
      ...form,
      [name]: value,
    });
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    try {
      const { data } = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/register`,
        data: form,
        headers: {
          Authorization: "Bearer " + localStorage.getItem("access_token"),
        },
      });
      console.log(data);
      Swal.fire("Successfully Registered!");
      navigate("/");
    } catch (error) {
      Swal.fire({
        icon: "error",
        title: "Oops...",
        text: error.response.data.message,
      });
      console.log(error);
    }
  };

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img src="/loginbanner.png" alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        {/* Right: Login Form */}

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Register</h1>
          <form onSubmit={handleSubmit} method="POST">
            {/* Username Input */}
            <div className="mb-4">
              <label htmlFor="email" className="block text-gray-600">
                Email
              </label>
              <input type="text" id="email" name="email" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
            </div>
            {/* Password Input */}
            <div className="mb-4">
              <label htmlFor="password" className="block text-gray-600">
                Password
              </label>
              <input type="password" id="password" name="password" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="fullName" className="block text-gray-600">
                Full Name
              </label>
              <input type="text" id="fullName" name="fullName" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
            </div>
            <div className="mb-4">
              <label htmlFor="phoneNumber" className="block text-gray-600">
                Phone Number
              </label>
              <input type="text" id="phoneNumber" name="phoneNumber" className="w-full border border-gray-300 rounded-md py-2 px-3 focus:outline-none focus:border-blue-500" autoComplete="off" onChange={handleChange} />
            </div>
            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500"></div>
            {/* Login Button */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ">
              Register
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-center">
            <span className="text-gray-600 mx-2">Already have an account?</span>
            <Link to={"/login"} className="hover:underline text-blue-500">
              Login here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
