import { GoogleAuthProvider, getAuth, signInWithPopup } from 'firebase/auth';
import { app } from '../firebase';
// import { useDispatch } from 'react-redux';
// import { signInSuccess } from '../redux/user/userSlice';
// import { useNavigate } from 'react-router-dom';
import axios from 'axios';

export default function OAuth() {
  // const dispatch = useDispatch();
  // const navigate = useNavigate();
  const handleGoogleClick = async () => {
    try {
      const provider = new GoogleAuthProvider();
      const auth = getAuth(app);

      const result = await signInWithPopup(auth, provider);
        const email = result.user.email;

        console.log(email);
        const res =  await axios.post('http://localhost:8000/api/v1/user/google' , email)

        console.log(res.data);
        

      
    } catch (error) {
      console.log('could not sign in with google', error);
    }
  };
  return (
  //   <button
  //   className="block w-full max-w-xs mx-auto bg-indigo-500 hover:bg-indigo-700 focus:bg-indigo-700 mt-3 text-white rounded-lg px-3 py-1 font-semibold text-center"
  //   type="submit"
  //   onClick={handleGoogleClick}
  // >
  // Sign In with Google
  // </button>

  <button
  className="block w-full max-w-xs mx-auto bg-red-500 hover:bg-red-700 focus:bg-red-700 mt-3 text-white rounded-lg px-1 py-1 font-semibold text-center"
  type="submit"
  onClick={handleGoogleClick}
>
  Sign In with Google
</button>
  );
}