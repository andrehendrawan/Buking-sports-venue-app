import { useEffect, useState } from "react";
import { Link, useNavigate } from "react-router-dom";
import axios from "axios";
import Swal from "sweetalert2";

export default function LoginPage() {
  const navigate = useNavigate();
  const [form, Setform] = useState({
    email: "",
    password: "",
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
        url: `${import.meta.env.VITE_BASE_URL}/login`,
        data: form,
      });
      console.log(data);
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);

      const Toast = Swal.mixin({
        toast: true,
        position: "top-end",
        showConfirmButton: false,
        timer: 3000,
        timerProgressBar: true,
        didOpen: (toast) => {
          toast.onmouseenter = Swal.stopTimer;
          toast.onmouseleave = Swal.resumeTimer;
        },
      });
      Toast.fire({
        icon: "success",
        title: "Signed in successfully",
      });
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  const handleCredentialResponse = async ({ credential }) => {
    // console.log({ credential }, "<<<<<<<");
    try {
      const { data } = await axios({
        method: "post",
        url: `${import.meta.env.VITE_BASE_URL}/google-login`,
        headers: {
          ["google-token"]: credential,
        },
      });
      console.log(data, ">>>>>>>>>");
      localStorage.setItem("access_token", data.access_token);
      localStorage.setItem("id", data.id);
      navigate("/");
    } catch (error) {
      console.log(error);
    }
  };

  useEffect(() => {
    google.accounts.id.initialize({
      client_id: import.meta.env.VITE_CLIENT_GOOGLE_ID,
      callback: handleCredentialResponse,
    });
    google.accounts.id.renderButton(
      document.getElementById("google-login"),
      { theme: "outline", size: "large" } // customization attributes
    );
    // google.accounts.id.prompt(); // also display the One Tap dialog
  });

  return (
    <>
      <div className="bg-gray-100 flex justify-center items-center h-screen">
        {/* Left: Image */}
        <div className="w-1/2 h-screen hidden lg:block">
          <img src="/loginbanner.png" alt="Placeholder Image" className="object-cover w-full h-full" />
        </div>
        {/* Right: Login Form */}

        <div className="lg:p-36 md:p-52 sm:20 p-8 w-full lg:w-1/2">
          <div id="google-login"></div>
          {/* Separator Line */}
          <div className="w-full flex items-center justify-between py-5">
            <hr className="w-full bg-gray-400" />
            <p className="text-base font-medium leading-4 px-2.5 text-gray-400">OR</p>
            <hr className="w-full bg-gray-400" />
          </div>
          <h1 className="text-2xl font-semibold mb-4 text-gray-800">Login</h1>
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
            {/* Remember Me Checkbox */}
            <div className="mb-4 flex items-center">
              <input type="checkbox" id="remember" name="remember" className="text-blue-500" />
              <label htmlFor="remember" className="text-gray-600 ml-2">
                Remember Me
              </label>
            </div>
            {/* Forgot Password Link */}
            <div className="mb-6 text-blue-500">
              <a href="#" className="hover:underline">
                Forgot Password?
              </a>
            </div>
            {/* Login Button */}
            <button type="submit" className="bg-blue-500 hover:bg-blue-600 text-white font-semibold rounded-md py-2 px-4 w-full ">
              Login
            </button>
          </form>
          {/* Sign up Link */}
          <div className="mt-6 text-blue-500 text-center">
            <Link to={"/register"} className="hover:underline">
              Sign up Here
            </Link>
          </div>
        </div>
      </div>
    </>
  );
}
