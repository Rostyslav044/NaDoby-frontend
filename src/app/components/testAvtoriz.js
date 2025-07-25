








"use client";

import axios from "axios";
import { signIn, useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { Button, Alert, Box } from "@mui/material";
import Image from "next/image";
import { useLanguage } from "@/app/LanguageContext";
import { useEffect, useState, useRef } from "react";
import UserMenu from "./UserMenu";

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
  const hasRun = useRef(false); // предотвращает повторную регистрацию

  useEffect(() => {
    if (session ) {
      // hasRun.current = true;

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
// регистрация успешна
          setShowAlert(true); 
        } catch (error) {
          // пользователь уже зарегистрирован, пробуем логин
          try {
            const response = await axios.post(
              `http://localhost:3000${endpoint_login}`,
              dataRegister,
              { headers: { "Content-Type": "application/json" } }
            );

            if (response.status === 200 || response.status === 201) {
              const dataResponse = response.data;
              setShowAlert(true);
              if (dataResponse.success && dataResponse.token) {
                dispatch(login(dataResponse.token));
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

  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => setShowAlert(false), 7000);
      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {showAlert && (
        <Box
          sx={{
            position: "fixed",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            zIndex: 1400,
            width: "90vw",
            maxWidth: 400,
          }}
        >
          <Alert
            onClose={() => setShowAlert(false)}
            severity="success"
            sx={{
              width: "100%",
              fontSize: "16px",
              padding: "16px",
              textAlign: "left",
            }}
          >
            {t.registrationSuccess}
          </Alert>
        </Box>
      )}

      {/* Показываем меню если пользователь авторизован */}
      {session && <UserMenu />}

      {/* Кнопка входа если не авторизован */}
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
