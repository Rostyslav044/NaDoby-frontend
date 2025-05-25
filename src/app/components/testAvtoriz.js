
'use client'
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react"
import { object } from "prop-types";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";


export default function AuthButton() {
  const { data: session } = useSession()
const dispatch = useDispatch();
  if (session) {
    console.log(session); 
    // session.user.email;
    async function GoogleLogin() {
      const dataRegister = {email:session.user.email, type: "google", name:session.user.name}
   
      const endpoint_register = "/api/v1/auth/register";
      const endpoint_login = "/api/v1/auth/login";
      try {
        const response = await axios.post(`http://localhost:3000${endpoint_register}`, dataRegister, {
          headers: {
            "Content-Type": "application/json",
          },
        });
      
        console.log("Server response:", response.data);
      } catch (error) {
        console.error("Registration failed:", error.response?.data || error.message);
        const response = await axios.post(`http://localhost:3000${endpoint_login}`, dataRegister, {
          headers: {
            "Content-Type": "application/json",
          },
        });
        if (response.status === 200 || response.status === 201) {
        
  
          const dataResponse = response.data;
          if (dataResponse.success && dataResponse.token) {
            dispatch(login(dataResponse.token));
          }}
      }
       console.log(response);
    }
    GoogleLogin()
    return (
      <>
        <p>Привет, {session.user?.name}</p>

        <button onClick={() => signOut()}>Выйти</button>
      </>
    )
  }

  return <button onClick={() => signIn('google')}>Войти через Google</button>
}
