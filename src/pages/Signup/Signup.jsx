import React, { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
// import { toast, ToastContainer } from 'react-toastify'; // Import toast from toastify-js
import './Signup.css';
// import 'react-toastify/dist/ReactToastify.css';
import signup from '../../images/signup1.jpg';
// import { Input } from '@mui/base';
import { toast } from 'react-toastify';
const RegistrationForm = () => {

const navigate = useNavigate(); // Initialize useNavigate

// toast.info('Please Login to add to wishlist');
const [formData, setFormData] = useState({
  firstName: '',
  lastName: '',
  email: '',
  confirmPassword: '',
  password: '',
  
});


// const handleResumeChange = (e) => {
//   const file = e.target.files[0];

//   // Update only the 'resume' field in the formData state
//   setFormData((prevData) => ({
//     ...prevData,
//     resume: file,
//   }));
// };
const handleChange = (e) => {
  const { name, value } = e.target;
  setFormData((prevData) => ({
    ...prevData,
    [name]: value,
  }));
};

const handleRegister = async () => {
  const emailPattern = /^[^\s@]+@[^\s@]+\.[^\s@]+$/;
  const passwordPattern = /^(?=.*[!@#$%^&*(),.?":{}|<>])(?=.*\d)(?=.*[a-zA-Z]).{6,}$/;
  if (
    formData.firstName === '' ||
    formData.lastName === '' ||
    !emailPattern.test(formData.email) ||
    formData.password === '' ||
    formData.password.length < 6 ||
    !passwordPattern.test(formData.password)
  ) {
    console.log("here comes");
    
    toast.info('Please fill in all fields, ensure the password is at least 6 characters, and contains at least one special character, one number, and one alphabet character.');
    return;
  }
  if(formData.confirmPassword!==formData.password){
    toast.info("Password not match with confirm Password");
    return ;
  }


  try {
    console.log("Here is coming");
    console.log(formData);
    const response = await axios.post('http://localhost:8000/api/v1/user/register', formData);
    console.log(response.data);
    const check = "User already exist please login"
    console.log(typeof response.data.messages);
    console.log(typeof check);
    // const check = false;
    if (response.data.message === "User Registered Successfully") {
      toast.info('User registered successfully');
      navigate('/login'); 
    }
    else if(response.data.message == "User already exist please login"){
      toast.info('User already exist please login');
      return ;
    }
     else {
      toast.info('An error occurred during registration');
    }
  } catch (error) {
    console.error('Error during registration:', error);
    toast.info('An error occurred during registration');
  }
};

  return (
    <div className="min-w-screen min-h-screen flex items-center justify-center px-5 py-5">
      <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
        <div className="md:flex w-full">
          <div className="hidden md:block w-1/2  py-10 px-10">
            <img
              src={signup}
              alt="Side Image"
              className="object-cover object-center w-full h-full rounded-full"
            />
          </div>
          <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
            <div className="text-center mb-10">
              <h1 className="font-bold text-3xl ">REGISTER</h1>
              <p>Enter your information to register</p>
            </div>
            <div className="flex -mx-3">
              <div className="w-1/2 px-3 mb-5">
                <label htmlFor="firstName" className="text-xs font-semibold px-1">
                  First name
                </label>
                <div className="flex">
                
                  <input
                    type="text"
                    id="firstName"
                    name="firstName"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="John"
                    onChange={handleChange}
                  />
                </div>
              </div>
              <div className="w-1/2 px-3 mb-5">
                <label htmlFor="lastName" className="text-xs font-semibold px-1">
                  Last name
                </label>
                <div className="flex">
                
                  <input
                    type="text"
                    id="lastName"
                    name="lastName"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="Smith"
                    onChange={handleChange}
                  />
                </div>
              </div>
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
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="johnsmith@example.com"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
           
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
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="******"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-12">
                <label htmlFor="password" className="text-xs font-semibold px-1">
                 Confirm Password
                </label>
                <div className="flex">
                  
                  <input
                    type="password"
                    id="password"
                    name="confirmPassword"
                    className="w-full pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
                    placeholder="******"
                    onChange={handleChange}
                  />
                </div>
              </div>
            </div>
            <div className="flex -mx-3">
              <div className="w-full px-3 mb-5">
                <button
                  className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
                  type="submit"
                  onClick={handleRegister}
                >
                  REGISTER NOW
                </button>
              </div>
            </div>
            <div className="font-bold text-red-400 text-xl">
                Register as a <Link to='/becomeInstructor'>Instructor</Link>
            </div>
            <div className="font-bold text-blue-400 mt-3">
                Already Register <Link to='/login'>Sign in</Link>
            </div>
          </div>
        </div>
      </div>
    </div>
  );
};

export default RegistrationForm;


// import React, { useState } from 'react';
// import axios from 'axios';
// import { useNavigate } from 'react-router-dom';

// const RegistrationForm = () => {
//   const navigate = useNavigate(); // Initialize useNavigate

//   const [formData, setFormData] = useState({
//     firstName: '',
//     lastName: '',
//     email: '',
//     role: 'user',
//     password: '',
//   });

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prevData) => ({
//       ...prevData,
//       [name]: value,
//     }));
//   };

//   const handleRegister = async () => {
//     if (
//       formData.firstName === '' ||
//       formData.lastName === '' ||
//       formData.email === '' ||
//       formData.password === '' ||
//       formData.password.length < 6
//     ) {
//       alert('Please fill in all fields and ensure password is at least 6 characters.');
//       return;
//     }

//     try {
//       const response = await axios.post('https://your-api-endpoint.com/register', formData);

//       if (response.status === 200) {
//         alert('Registration successful!');
//         navigate('/login'); // Use navigate to redirect to the login page
//       } else {
//         alert('Registration failed. Please try again.');
//       }
//     } catch (error) {
//       console.error('Error during registration:', error);
//       alert('An error occurred during registration. Please try again.');
//     }
//   };

//   return (
//     <div className="min-w-screen min-h-screen bg-gray-900 flex items-center justify-center px-5 py-5">
//       <div className="bg-gray-100 text-gray-500 rounded-3xl shadow-xl w-full overflow-hidden" style={{ maxWidth: '1000px' }}>
//         <div className="md:flex w-full">
//           <div className="hidden md:block w-1/2 bg-indigo-500 py-10 px-10">
//             {/* ... (rest of the code remains unchanged) */}
//           </div>
//           <div className="w-full md:w-1/2 py-10 px-5 md:px-10">
//             {/* ... (rest of the code remains unchanged) */}
//             <input
//               type="text"
//               id="firstName"
//               name="firstName"
//               value={formData.firstName}
//               onChange={handleChange}
//               className="w-full -ml-10 pl-10 pr-3 py-2 rounded-lg border-2 border-gray-200 outline-none focus:border-indigo-500"
//               placeholder="John"
//             />
//             {/* ... (similar modifications for other input fields) */}
//             <button
//               onClick={handleRegister}
//               className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 text-white rounded-lg px-3 py-3 font-semibold"
//               type="button"
//             >
//               REGISTER NOW
//             </button>
//             {/* ... (rest of the code remains unchanged) */}
//           </div>
//         </div>
//       </div>
//     </div>
//   );
// };

// export default RegistrationForm;


