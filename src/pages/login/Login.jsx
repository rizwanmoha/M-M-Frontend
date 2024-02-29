import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import './login.css';
import { login } from '../../store/auth';
import { Link } from 'react-router-dom';
import signup from '../../images/signup1.jpg';
import { useDispatch } from 'react-redux';
import OAuth from './GoogleAuth';
import { toast } from 'react-toastify';

const LoginForm = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const [loading, setLoading] = useState(false)

  const [loginData, setLoginData] = useState({
    email: '',
    
    password: '',
  });

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setLoginData((prevData) => ({
      ...prevData,
      [name]: value,
    }));
  };

  const handleLogin = async () => {
    try {
      
      if(loginData.email==='' || loginData.password===''){
        toast.info('Please fill all the details');
        return ;
      }
      setLoading(true)
      const response = await axios.post('http://localhost:8000/api/v1/user/login', loginData);
      setLoading(false)
      console.log(response.data);
      if (response.data.success===true) {
        
       
        console.log(response.data);
        const user = response.data.user
        const token = response.data.token;
        console.log(user)
        dispatch(login({firstName : user.firstName , 
                        lastName : user.lastName , 
                        role : user.role , 
                        token : token, 
                        email : user.email, 
                        id : user._id,
                        wishlist : user.wishlist,
                        courses : user.courses}));
       
          navigate('/');
        
        toast.success("Login Successfully")
      } else if(response.data.success===false) {
  
        toast.info("Your details didn't match");
        console.error('Login failed:', response.data.message);
      }
    } catch (error) {
      // navigate('/')
      // console.error('Error during login:', error);
      // Handle error
      toast.info('Internal Server error');
    }
  };

  return (
    <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2 py-10 px-10">
            <img
              src={signup}
              alt="Side Image"
              className="object-cover object-center w-full h-full rounded-full"
            />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl">LOGIN</h1>
              <p>Enter your login information</p>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor="email" className="text-xs font-semibold px-1">
                  Email
                </label>
                <div className="flex">
        
                  <input
                    type="email"
                    id="email"
                    name="email"
                    value={loginData.email}
                    onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com"
                  />
                </div>
              </div>
            </div>
            {/* <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <label htmlFor="role" className="text-xs font-semibold px-1">
                  Role
                </label>
                <div className="flex">
                  <select
                    id="role"
                    name="role"
                    value={loginData.role}
                   onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus-border-indigo-500"
                  >
                    <option value="User">User</option>
                    <option value="teacher">Teacher</option>
                    <option value="admin">Admin</option>
                  </select>
                </div>
              </div>
            </div> */}
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label htmlFor="password" className="text-xs font-semibold px-1">
                  Password
                </label>
                <div className="flex">
             
                  <input
                    type="password"
                    id="password"
                    name="password"
                    value={loginData.password}
                onChange={handleInputChange}
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="****"
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3 ">
              <div className="w-full px-3 mb-5 ">
                <button
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-1 mb-10 font-semibold "
                  type="submit"
                  onClick={handleLogin}
                >
                {!loading && "LOGIN"}
                {loading && "Loading..."}
                </button>
                  <OAuth />
              </div>
            </div>
            <div className="font-bold text-blue-400 mt-3">
                Don't have account <Link to='/register'>Sign up</Link>
            </div>
            <div className="font-bold text-blue-400 mt-3">
                 <Link to='/forgot'>forgot Password</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default LoginForm;