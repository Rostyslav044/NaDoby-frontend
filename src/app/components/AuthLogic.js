// "use client";

// import { useSession } from "next-auth/react";
// import { useDispatch } from "react-redux";
// import { useEffect, useState } from "react";
// import axios from "axios";
// import { login } from "../store/authSlice";
// import { Alert, Box } from "@mui/material";
// import { useLanguage } from "@/app/LanguageContext";
// import UserMenu from "./UserMenu";

// const translations = {
//   ru: {
//     registrationSuccess: "Регистрация прошла успешно",
//   },
//   ua: {
//     registrationSuccess: "Реєстрація пройшла успішно",
//   },
// };

// export default function AuthLogic() {
//   const { data: session } = useSession();
//   const dispatch = useDispatch();
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   const [showAlert, setShowAlert] = useState(false);

//   useEffect(() => {
// const token = localStorage.getItem('auth_token');

//     if (!session || token) return;

//     const dataRegister = {
//       email: session.user.email,
//       type: "google",
//       name: session.user.name,
//     };

//     const registerUser = async () => {
//       try {
//         await axios.post("http://localhost:3000/api/v1/auth/register", dataRegister, {
//           headers: { "Content-Type": "application/json" },
//         });

//         setShowAlert(true);
//       } catch (error) {
//         try {
//           const response = await axios.post(
//             "http://localhost:3000/api/v1/auth/login",
//             dataRegister,
//             { headers: { "Content-Type": "application/json" } }
//           );

//           if (response.status === 200 || response.status === 201) {
//             const dataResponse = response.data;
//             setShowAlert(true);
//             if (dataResponse.success && dataResponse.token) {
//               dispatch(login(dataResponse.token));
//             }
//           }
//         } catch (err) {
//           console.error("Login failed:", err.response?.data || err.message);
//         }
//       }
//     };

//     registerUser();
//   }, [session, dispatch]);

//   useEffect(() => {
//     if (showAlert) {
//       const timer = setTimeout(() => setShowAlert(false), 7000);
//       return () => clearTimeout(timer);
//     }
//   }, [showAlert]);

//   return (
//     <>
//       {showAlert && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             zIndex: 1400,
//             width: "90vw",
//             maxWidth: 400,
//           }}
//         >
//           <Alert
//             onClose={() => setShowAlert(false)}
//             severity="success"
//             sx={{
//               width: "100%",
//               fontSize: "16px",
//               padding: "16px",
//               textAlign: "left",
//             }}
//           >
//             {t.registrationSuccess}
//           </Alert>
//         </Box>
// )}
// {session && <UserMenu />}
//     </>
//   );
// }




'use client';

import { useSession } from "next-auth/react";
import { useDispatch } from "react-redux";
import { useEffect, useState } from "react";
import axios from "axios";
import { login } from "../store/authSlice";
import { Alert, Box } from "@mui/material";
import { useLanguage } from "@/app/LanguageContext";
import UserMenu from "./UserMenu";

const translations = {
  ru: {
    registrationSuccess: "Регистрация прошла успешно",
  },
  ua: {
    registrationSuccess: "Реєстрація пройшла успішно",
  },
};

export default function AuthLogic() {
  // Получаем сессию и текущий язык
  const { data: session } = useSession();
  const dispatch = useDispatch();
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  // Локальный стейт для управления показом алерта и меню
  const [showAlert, setShowAlert] = useState(false);
  const [justRegistered, setJustRegistered] = useState(false);

  // При монтировании проверяем, есть ли флаг регистрации в localStorage
  useEffect(() => {
    const justRegFlag = localStorage.getItem('justRegistered');
    if (justRegFlag === 'true') {
      setJustRegistered(true);
    }
  }, []);

  // Основной эффект для регистрации / логина пользователя через Google-сессию
  useEffect(() => {
    // Если нет сессии или есть токен авторизации — прерываем (уже залогинены)
    const token = localStorage.getItem('auth_token');
    if (!session || token) return;

    // Данные для регистрации/логина
    const dataRegister = {
      email: session.user.email,
      type: "google",
      name: session.user.name,
    };

    const registerUser = async () => {
      try {
        // Пытаемся зарегистрировать пользователя
        await axios.post("http://localhost:3000/api/v1/auth/register", dataRegister, {
          headers: { "Content-Type": "application/json" },
        });

        // Если успешно — показываем алерт, открываем меню и сохраняем флаг в localStorage
        setShowAlert(true);
        setJustRegistered(true);
        localStorage.setItem('justRegistered', 'true');
      } catch (error) {
        // Если регистрация не удалась, пробуем залогиниться
        try {
          const response = await axios.post(
            "http://localhost:3000/api/v1/auth/login",
            dataRegister,
            { headers: { "Content-Type": "application/json" } }
          );

          if (response.status === 200 || response.status === 201) {
            const dataResponse = response.data;
            setShowAlert(true);
            setJustRegistered(true);
            localStorage.setItem('justRegistered', 'true');
            if (dataResponse.success && dataResponse.token) {
              dispatch(login(dataResponse.token));
            }
          }
        } catch (err) {
          console.error("Login failed:", err.response?.data || err.message);
        }
      }
    };

    registerUser();
  }, [session, dispatch]);

  // Таймер скрытия алерта и сброса флага регистрации
  useEffect(() => {
    if (showAlert) {
      const timer = setTimeout(() => {
        setShowAlert(false);
        setJustRegistered(false);
        localStorage.removeItem('justRegistered'); // Удаляем флаг из localStorage после показа алерта
      }, 7000);

      return () => clearTimeout(timer);
    }
  }, [showAlert]);

  return (
    <>
      {/* Алерт успешной регистрации */}
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
            onClose={() => {
              setShowAlert(false);
              setJustRegistered(false);
              localStorage.removeItem('justRegistered'); // При закрытии вручную удаляем флаг
            }}
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

      {/* Показываем меню пользователя только если есть сессия и только что зарегистрировались */}
      {session && justRegistered && <UserMenu />}
    </>
  );
}
