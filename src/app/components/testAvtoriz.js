
// 'use client'
// import axios from "axios";
// import { signIn, signOut, useSession } from "next-auth/react"
// import { object } from "prop-types";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice";
// import { Button } from "@mui/material";
// import Image from "next/image";
// import { useLanguage } from "@/app/LanguageContext"; // путь может отличаться



// export default function AuthButton() {
//   const { data: session } = useSession()
// const dispatch = useDispatch();
//   if (session) {
//     console.log(session); 
//     // session.user.email;
//     async function GoogleLogin() {
//       const dataRegister = {email:session.user.email, type: "google", name:session.user.name}
   
//       const endpoint_register = "/api/v1/auth/register";
//       const endpoint_login = "/api/v1/auth/login";
//       try {
//         const response = await axios.post(`http://localhost:3000${endpoint_register}`, dataRegister, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
      
//         console.log("Server response:", response.data);
//       } catch (error) {
//         console.error("Registration failed:", error.response?.data || error.message);
//         const response = await axios.post(`http://localhost:3000${endpoint_login}`, dataRegister, {
//           headers: {
//             "Content-Type": "application/json",
//           },
//         });
//         if (response.status === 200 || response.status === 201) {
        
  
//           const dataResponse = response.data;
//           if (dataResponse.success && dataResponse.token) {
//             dispatch(login(dataResponse.token));
//           }}
//       }
//        console.log(response);
//     }
//     GoogleLogin()
//     return (
//       <>
//         <p>Привет, {session.user?.name}</p>

//         <button onClick={() => signOut()}>Выйти</button>
//       </>
//     )
//   }

//   // return <button onClick={() => signIn('google')}>Войти через Google</button>

//   return (
//     <Button
//       onClick={() => signIn("google")}
//       variant="contained"
//       sx={{
//         backgroundColor: "#fff",
//         color: "#000",
//         boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
//         border: "1px solid rgb(25, 118, 210)",
//         padding: 0,
//         width: "100%",
//         height: "36.5px",
//         maxWidth: "100%",
//         boxSizing: "border-box",
//         '&:hover': {
//           backgroundColor: "#f5f5f5",
//         },
//         display: 'flex',
//         alignItems: 'center',
//         gap: 1,
//         justifyContent: 'center',
//       }}
//     >
//       <span
//         style={{
//           fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
//           fontWeight: 400,
//           // fontSize: "0.875rem",
//           fontSize:"12px",
//           // lineHeight: 1.75,
//           letterSpacing: "0.02857em",
//           textTransform: "uppercase",
//           padding:"10px",
//         }}
//       >
//         Войти через
//       </span>
//       <Image
//         src="/google-Freepik.png"
//         alt="Google logo"
//         width={74}
//         height={64}
//         style={{ borderRadius: "50%" }}
//       />
//     </Button>
//   );
//       }  








"use client";
import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Snackbar, Alert, Box } from "@mui/material";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";
import { useEffect, useState } from "react";

const translations = {
  ru: {
    loginWithGoogle: "Войти через",
    registrationSuccess: "Регистрация прошла успешно",
  },
  ua: {
    loginWithGoogle: "Увійти через",
    registrationSuccess: "Реєстрація пройшла успішно",
  },
};

export default function AuthButton() {
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [showAlert, setShowAlert] = useState(false);

  useEffect(() => {
    if (session) {
      const GoogleLogin = async () => {
        const dataRegister = {
          email: session.user.email,
          type: "google",
          name: session.user.name,
        };

        const endpoint_register = "/api/v1/auth/register";
        const endpoint_login = "/api/v1/auth/login";

        try {
          await axios.post(`http://localhost:3000${endpoint_register}`, dataRegister, {
            headers: { "Content-Type": "application/json" },
          });
          setShowAlert(true);
        } catch (error) {
          console.error("Registration failed:", error.response?.data || error.message);
          try {
            const response = await axios.post(
              `http://localhost:3000${endpoint_login}`,
              dataRegister,
              { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200 || response.status === 201) {
              const dataResponse = response.data;
              if (dataResponse.success && dataResponse.token) {
                dispatch(login(dataResponse.token));
                setShowAlert(true);
              }
            }
          } catch (err) {
            console.error("Login failed:", err.response?.data || err.message);
          }
        }
      };

      GoogleLogin();
    }
  }, [session, dispatch]);

  return (
    <>
      {/* Центрированный Snackbar */}
      <Snackbar
  open={showAlert}
  autoHideDuration={7000}
  onClose={() => setShowAlert(false)}
  anchorOrigin={{ vertical: "top", horizontal: "center" }}
  sx={{
    top: "50%",
    transform: "translateY(-50%)",
    left: 0,
    right: 0,
    margin: "0 auto",
    width: "100%",
    maxWidth: "90vw", // адаптивная ширина
    display: "flex",
    justifyContent: "center",
    zIndex: 1400, // выше остальных элементов
  }}
>
  <Alert
    onClose={() => setShowAlert(false)}
    severity="success"
    sx={{
      width: "100%",
      fontSize: "16px",
      padding: "16px",
      textAlign: "left", // выравнивание текста
    }}
  >
    {t.registrationSuccess}
  </Alert>
</Snackbar>


      {!session && (
        <Button
          onClick={() => signIn("google")}
          variant="contained"
          sx={{
            backgroundColor: "#fff",
            color: "#000",
            boxShadow: "0 2px 4px rgba(0,0,0,0.1)",
            border: "1px solid rgb(25, 118, 210)",
            padding: 0,
            width: "100%",
            height: "36.5px",
            maxWidth: "100%",
            boxSizing: "border-box",
            '&:hover': { backgroundColor: "#f5f5f5" },
            display: 'flex',
            alignItems: 'center',
            gap: 1,
            justifyContent: 'center',
          }}
        >
          <span
            style={{
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
              fontWeight: 400,
              fontSize: "13px",
              letterSpacing: "0.02857em",
              textTransform: "uppercase",
              padding: "10px",
            }}
          >
            {t.loginWithGoogle}
          </span>
          <Image
            src="/google-Freepik.png"
            alt="Google logo"
            width={74}
            height={64}
            style={{ borderRadius: "50%" }}
          />
        </Button>
      )}
    </>
  );
}
