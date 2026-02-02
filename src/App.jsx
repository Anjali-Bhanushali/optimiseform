import React, { useState } from "react";
import { ToastContainer, toast } from "react-toastify";
import User from "./components/user";

const App = () => {
  
  const [formdata, setformdata] = useState({
    fullName:'',
    email:'',
    password:'',
    confirmpassword:''
  })

  const [users, setusers] = useState([]);
  const [error, setError] = useState('');

  const handleChanges = (e)=>{
    // destructuring

    const {name,value} = e.target

    setformdata((prevData)=>({
      ...prevData,
      [name]:value
    }))
  }

  const submitHandler = (e) => {
    e.preventDefault();
    console.log(formdata.fullName, formdata.email, formdata.password, formdata.confirmpassword);

    if (formdata.password.length < 8) {
      setError("Password must be 8 character long");
      return;
    }
    if (formdata.password !== formdata.confirmpassword) {
      setError("Password and confirmpassword must same");
      return;
    }
    if (!/[!@#$%^&*<>,.]/.test(formdata.password)) {
      setError("password must contains any special character");
      return;
    }
    if (!/[A-Z]/.test(formdata.password)) {
      setError("password must contains any capital letter");
      return;
    }

    setusers((prevusers)=>[
      ...prevusers,{
        fullName:formdata.fullName,
        email:formdata.email,
        password:formdata.password
      }
    ])

    setError("");
    setformdata({
      fullName:'',
      email:'',
      password:'',
      confirmpassword:''
    })
    
    toast.success('✅Login Successfull', {
      position: "top-right",
      autoClose: 3000,
      hideProgressBar: false,
      closeOnClick: false,
      pauseOnHover: true,
      draggable: true,
      progress: undefined,
      theme: "dark"
    });
  };
  return (
    <div className="min-h-screen bg-gradient-to-br from-emerald-100 to-emerald-300 flex items-center justify-center">
      <div className="bg-white shadow-2xl rounded-2xl p-8 w-full max-w-md">
        <h2 className="text-3xl font-bold text-center text-emerald-700 mb-6">
          Create Account
        </h2>

        <form
          onSubmit={(e) => {
            submitHandler(e);
          }}
          className="flex flex-col gap-4"
        >
          <div>
            <label className="text-sm font-medium">Full Name</label>
            <input
              type="text"
              placeholder="Enter your name"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              name='fullName'
              value={formdata.fullName}
              onChange={handleChanges}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Email</label>
            <input
              type="email"
              placeholder="Enter your email"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              name='email'
              value={formdata.email}
              onChange={handleChanges}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Password</label>
            <input
              type="password"
              placeholder="Enter password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              name='password'
              value={formdata.password}
              onChange={handleChanges}
            />
          </div>

          <div>
            <label className="text-sm font-medium">Confirm Password</label>
            <input
              type="password"
              placeholder="Confirm password"
              className="w-full border border-gray-300 rounded-lg px-4 py-2 mt-1 focus:outline-none focus:ring-2 focus:ring-emerald-500"
              required
              name='confirmpassword'
              value={formdata.confirmpassword}
              onChange={handleChanges}
            />
          </div>

          {error && (
            <p className="text-red-600 font-medium text-base text-center">
              {error}
            </p>
          )}

          <button className="bg-emerald-600 hover:bg-emerald-700 text-white font-semibold py-3 rounded-lg mt-3 transition duration-200 shadow-md">
            Submit
          </button>
          <ToastContainer></ToastContainer>
        </form>

        <p className="text-center text-sm text-gray-600 mt-5">
          Already have an account?
          <span className="text-emerald-700 font-semibold cursor-pointer ml-1">
            Login
          </span>
        </p>
        
      </div>

      {users.map(function(elem , idx){
        return <User key={idx} elem={elem} />
      })}
    </div>
  );
};

export default App;
