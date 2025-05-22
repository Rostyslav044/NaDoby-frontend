
'use client'
import axios from "axios";
import { signIn, signOut, useSession } from "next-auth/react"
import { object } from "prop-types";

export default function AuthButton() {
  const { data: session } = useSession()

  if (session) {
    console.log(session); 
    // session.user.email;
   const dataRegister = {email:session.user.email, password: 'testtest', name:session.user.name}
   
   const endpoint = "/api/v1/auth/register";
    const response =  axios.post(`http://localhost:3000${endpoint}`, dataRegister, {
      headers: {
        "Content-Type": "application/json",
        
      },
    });
    return (
      <>
        <p>Привет, {session.user?.name}</p>

        <button onClick={() => signOut()}>Выйти</button>
      </>
    )
  }

  return <button onClick={() => signIn('google')}>Войти через Google</button>
}
