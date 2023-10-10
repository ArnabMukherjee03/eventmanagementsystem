import React, { useEffect, useState } from "react";
import { useDispatch, useSelector } from "react-redux";
import {
  signupAsync,
  redirectToLogin,
  selectisSuccess,
  selectError,
  clearError,
  Status,
} from "../authSlice";
import { useNavigate } from "react-router-dom";
import toast from "react-hot-toast";
import { NavLink } from "react-router-dom";

const Signup = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const isSuccess = useSelector(selectisSuccess);
  const error = useSelector(selectError);
  const status = useSelector(Status);

  const [signupData, setSignupData] = useState({
    name: "",
    email: "",
    password: "",
    role: "user",
    confirmPassword: "",
    category:"",
  });



  const handleInputChange = (event) => {
    const { name, value } = event.target;
    console.log(name,value)
    setSignupData({ ...signupData, [name]: value });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    dispatch(signupAsync(signupData));
  };

  
  useEffect(() => {
    if (isSuccess) {
      dispatch(redirectToLogin());
      dispatch(clearError());
      navigate("/login");
    }
  }, [isSuccess, dispatch, navigate]);

  useEffect(() => {
    if (error && typeof error === "object") {
      error.map((err) => {
        toast.error(err);
        return <></>;
      });
      dispatch(clearError());
    }
  }, [error, dispatch]);

  return (
    <div className="">
      <div className=" h-screen flex flex-col items-center justify-center">
       

        {/* Form Section: Start */}
        <div className="w-1/2 flex flex-col gap-[30px] items-center py-[80px]">
          <div className="w-full">
            <h3 className="text-sm text-center  font-primary">
              Sign up for free!
            </h3>
          </div>
          <form
            className="flex flex-col w-full items-center justify-center gap-4"
            onSubmit={handleSubmit}
          >
           
            <select
            className="font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary  text-black text-xs outline-none border-black border-b-[1px]"
              onChange={handleInputChange}
              name="role"
              value={signupData.role}
            >
              <option className="font-primary" value="user">
                User
              </option>
              <option className="font-primary" value="admit">
                Admin
              </option>
              <option className="font-primary" value="vendor">
                Vendor
              </option>
            </select>
          
            <input
              placeholder="Enter Your name"
              className="font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary  text-black text-xs outline-none border-black border-b-[1px]"
              type="text"
              name="name"
              id="name"
              onChange={handleInputChange}
            />
            <input
              placeholder="Enter Your email"
              className="font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]"
              type="email"
              name="email"
              id="email"
              onChange={handleInputChange}
            />
            <input
              placeholder="Enter Your password"
              className="font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]"
              type="password"
              name="password"
              id="password"
              onChange={handleInputChange}
            />
            <input
              placeholder="Please rewrite your password"
              className="font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary text-black text-xs outline-none border-black border-b-[1px]"
              type="password"
              name="confirmPassword"
              id="confirmpassword"
              onChange={handleInputChange}
            />
            {
            signupData.role === "vendor"?
            <select
            placeholder="Choose Category"
            className="font-thin placeholder:tracking-[0.5px] w-1/2 pb-2 font-secondary  text-black text-xs outline-none border-black border-b-[1px]"
              onChange={handleInputChange}
              name="category"
              value={signupData.category}
            >
              <option value="">Select your option</option>
              <option className="font-primary" value="Catering">
              Catering
              </option>
              <option className="font-primary" value="Florist">
              Florist
              </option>
              <option className="font-primary" value="Decoration">
              Decoration
              </option>
            </select>
            :""
}
            <button
              type="submit"
              className={`w-1/2 py-3 mt-4 bg-black text-white font-secondary ${
                status === "loading" ? "bg-gray-500 cursor-not-allowed" : ""
              }`}
            >
              Sign UP
            </button>
            <p className="text-center  font-secondary tracking-wide text-sm">
              <NavLink to="/login">Already have an account?</NavLink>
            </p>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Signup;
