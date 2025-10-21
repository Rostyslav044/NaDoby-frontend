

"use client";

import React, { useEffect } from "react";
import Header from "@/app/components/Header"; 
import Search from "./components/Search";
// import NewRealty from "./components/NewRealty";
import { useSelector } from "react-redux";





export default function Home() {
  const isAuthenticated = useSelector((state)=> state.isAuthenticated )
  useEffect(()=>{if (isAuthenticated) {
    const token = localStorage.getItem('auth_token')
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            'X-Custom-Header': 'custom-value',
          },
         
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Отримано:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    })();
  }},[isAuthenticated]
  );
  return (
    <>
      <Header /> 
      {/* <CreateUser/> */}
      <Search/>
      
      
      {/* <NewRealty/> */}
    </>

  

  );
}
