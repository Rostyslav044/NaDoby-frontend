

// "use client";
// import { useState, useEffect } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Alert,
//   Link,
//   InputAdornment,
//   IconButton,
//   useMediaQuery
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice";

// const CreateUser = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const [message, setMessage] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);

//   const isMobile = useMediaQuery("(max-width:600px)");
//   const isTablet = useMediaQuery("(max-width:960px)");

//   const token = "eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY3ZDEzZTdkNzkxOWNhZGYxOGFiMjQyNyIsImlhdCI6MTc0MTc2NzQxNCwiZXhwIjoxNzQ0MzU5NDE0fQ.WUTnDGT_Ow74dXeMpwm1i73oRZI_5Xhte3EMUlvlzEI";

//   const handleClickShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const onSubmit = async (data) => {
//     try {
//       const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
//       const response = await axios.post(`http://localhost:3000${endpoint}`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         setMessage(isLogin ? "Вход выполнен успешно!" : "Регистрация прошла успешно!");
        
//     console.log(response);
//         const dataResponse = response.data;
//         if (dataResponse.success && dataResponse.token) {
//           dispatch(login(dataResponse.token));
//         } 


//         setTimeout(() => {
//           onClose();
//           reset();
//         }, 3000);
//       } else {
//         setMessage("Произошла ошибка");
//       }

//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.message || "Произошла ошибка");
//       } else if (error.request) {
//         setMessage("Сервер не отвечает. Проверьте подключение к сети.");
//       } else {
//         setMessage("Произошла ошибка при отправке запроса.");
//       }
//     }
//   };

//   const handleForgotPassword = () => {
//     setMessage("Функция восстановления пароля пока не реализована.");
//   };

//   return (
//     <Box
//       sx={{
//         width: isMobile ? "90%" : isTablet ? "70%" : 400,
//         mx: "auto",
//         px: isMobile ? 2 : 0,
//         py: isMobile ? 3 : 4,
//         mt: isMobile ? 4 : 8,
//         boxShadow: 3,
//         borderRadius: 2,
//         backgroundColor: "white",
//         outline: "none",
//         border: "none",
//       }}
//     >
//       <Typography variant="h5" textAlign="center" gutterBottom>
//         Nadoby.com
//       </Typography>

//       <Typography variant="h6" textAlign="center" gutterBottom>
//         {isLogin ? "Войдите в свою учетную запись" : "Зарегистрируйтесь"}
//       </Typography>

//       {message && (
//         <Alert severity="info" sx={{ mb: 2 }}>
//           {message}
//         </Alert>
//       )}

//       <form onSubmit={handleSubmit(onSubmit)} noValidate>
//         {!isLogin && (
//           <TextField
//             label="Имя"
//             fullWidth
//             margin="normal"
//             {...register("name", { required: "Введите имя" })}
//             error={!!errors.name}
//             helperText={errors.name?.message}
//           />
//         )}

//         <TextField
//           label="Email"
//           type="email"
//           fullWidth
//           margin="normal"
//           {...register("email", { required: "Введите email" })}
//           error={!!errors.email}
//           helperText={errors.email?.message}
//         />

//         <TextField
//           label="Пароль"
//           type={showPassword ? "text" : "password"}
//           fullWidth
//           margin="normal"
//           {...register("password", { required: "Введите пароль", minLength: 6 })}
//           error={!!errors.password}
//           helperText={errors.password?.message}
//           InputProps={{
//             endAdornment: (
//               <InputAdornment position="end">
//                 <IconButton onClick={handleClickShowPassword} edge="end">
//                   {showPassword ? <VisibilityOff /> : <Visibility />}
//                 </IconButton>
//               </InputAdornment>
//             ),
//           }}
//         />

//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           sx={{ mt: 2 }}
//         >
//           {isLogin ? "Войти" : "Зарегистрироваться"}
//         </Button>
//       </form>

//       {isLogin && (
//         <Typography textAlign="center" sx={{ mt: 2 }}>
//           <Link component="button" variant="body2" onClick={handleForgotPassword}>
//             Забыли пароль?
//           </Link>
//         </Typography>
//       )}

//       <Typography textAlign="center" sx={{ mt: 2 }}>
//         {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
//         <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)}>
//           {isLogin ? "Зарегистрироваться" : "Войти"}
//         </Link>
//       </Typography>
//     </Box>
//   );
// };

// export default CreateUser;






// "use client";
// import { useState } from "react";
// import { useForm } from "react-hook-form";
// import axios from "axios";
// import {
//   TextField,
//   Button,
//   Box,
//   Typography,
//   Alert,
//   Link,
//   InputAdornment,
//   IconButton,
//   useMediaQuery
// } from "@mui/material";
// import { Visibility, VisibilityOff } from "@mui/icons-material";
// import { useDispatch } from "react-redux";
// import { login } from "../store/authSlice";

// const CreateUser = ({ onClose }) => {
//   const dispatch = useDispatch();
//   const { register, handleSubmit, reset, formState: { errors } } = useForm();

//   const [message, setMessage] = useState("");
//   const [isLogin, setIsLogin] = useState(true);
//   const [showPassword, setShowPassword] = useState(false);

//   const handleClickShowPassword = () => {
//     setShowPassword((prev) => !prev);
//   };

//   const token = "your_token_here";

//   const onSubmit = async (data) => {
//     try {
//       const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
//       const response = await axios.post(`http://localhost:3000${endpoint}`, data, {
//         headers: {
//           "Content-Type": "application/json",
//           "Authorization": `Bearer ${token}`
//         },
//       });

//       if (response.status === 200 || response.status === 201) {
//         setMessage(isLogin ? "Вход выполнен успешно!" : "Регистрация прошла успешно!");

//         const dataResponse = response.data;
//         if (dataResponse.success && dataResponse.token) {
//           dispatch(login(dataResponse.token));
//         }

//         setTimeout(() => {
//           onClose();
//           reset();
//         }, 3000);
//       } else {
//         setMessage("Произошла ошибка");
//       }

//     } catch (error) {
//       if (error.response) {
//         setMessage(error.response.data.message || "Произошла ошибка");
//       } else if (error.request) {
//         setMessage("Сервер не отвечает. Проверьте подключение к сети.");
//       } else {
//         setMessage("Произошла ошибка при отправке запроса.");
//       }
//     }
//   };

//   const handleForgotPassword = () => {
//     setMessage("Функция восстановления пароля пока не реализована.");
//   };

//   return (
//     <Box
//     sx={{
//       display: "flex",
//       alignItems: "center",
//       justifyContent: "center",
//       // py: 6, 
//       // вертикальные отступы
//       backgroundColor: "#f5f5f5",
//       minHeight: "auto", // убрали 100vh
//       // px: 2,
//       borderRadius: 2,
      
//       border: "none",
      
//     }}
//   >
//     <Box
//       sx={{
//         width: "90%",
//         maxWidth: 350,
//         p: 3,
        
//         boxShadow: 3,
//         borderRadius: 2,
//         backgroundColor: "white",
        
//       }}
//     >
//         <Typography variant="h5" textAlign="center" gutterBottom>
//         <span style={{ color: "blue", marginLeft:"10%", }}>NaDoby.com</span>
//         </Typography>

//         <Typography variant="h6" textAlign="center" gutterBottom>
//           {isLogin ? "Войдите в свою учетную запись" : "Зарегистрируйтесь"}
//         </Typography>

//         {message && (
//           <Alert severity="info" sx={{ mb: 2 }}>
//             {message}
//           </Alert>
//         )}

//         <form onSubmit={handleSubmit(onSubmit)} noValidate>
//           {!isLogin && (
//             <TextField
//               label="Имя"
//               fullWidth
//               margin="normal"
//               {...register("name", { required: "Введите имя" })}
//               error={!!errors.name}
//               helperText={errors.name?.message}
//             />
//           )}

//           <TextField
//             label="Email"
//             type="email"
//             fullWidth
//             margin="normal"
//             {...register("email", { required: "Введите email" })}
//             error={!!errors.email}
//             helperText={errors.email?.message}
//           />

//           <TextField
//             label="Пароль"
//             type={showPassword ? "text" : "password"}
//             fullWidth
//             margin="normal"
//             {...register("password", { required: "Введите пароль", minLength: 6 })}
//             error={!!errors.password}
//             helperText={errors.password?.message}
//             InputProps={{
//               endAdornment: (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleClickShowPassword} edge="end">
//                     {showPassword ? <VisibilityOff /> : <Visibility />}
//                   </IconButton>
//                 </InputAdornment>
//               ),
//             }}
//           />

//           <Button
//             type="submit"
//             variant="contained"
//             color="primary"
//             fullWidth
//             sx={{ mt: 2 }}
//           >
//             {isLogin ? "Войти" : "Зарегистрироваться"}
//           </Button>
//         </form>

//         {isLogin && (
//           <Typography textAlign="center" sx={{ mt: 2 }}>
//             <Link component="button" variant="body2" onClick={handleForgotPassword}>
//               Забыли пароль?
//             </Link>
//           </Typography>
//         )}

//         <Typography textAlign="center" sx={{ mt: 2 }}>
//           {isLogin ? "Нет аккаунта? " : "Уже есть аккаунт? "}
//           <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)}>
//             {isLogin ? "Зарегистрироваться" : "Войти"}
//           </Link>
//         </Typography>
//       </Box>
//     </Box>
//   );
// };

// export default CreateUser;






"use client";
import { useState } from "react";
import { useForm } from "react-hook-form";
import axios from "axios";
import Logo from "./Logo";
import AuthButton from "./testAvtoriz";


import {
  TextField,
  Button,
  Box,
  Typography,
  Alert,
  Link,
  InputAdornment,
  IconButton
} from "@mui/material";
import { Visibility, VisibilityOff, Close } from "@mui/icons-material";
import { useDispatch } from "react-redux";
import { login } from "../store/authSlice";
import { useLanguage } from "@/app/LanguageContext"; // импорт контекста языка

const translations = {
  ua: {
    loginTitle: "Увійдіть у свій обліковий запис",
    registerTitle: "Зареєструйтесь",
    name: "Ім’я",
    email: "Email",
    password: "Пароль",
    loginButton: "Увійти",
    registerButton: "Зареєструватися",
    forgotPassword: "Забули пароль?",
    noAccount: "Немає облікового запису?",
    haveAccount: "Вже є обліковий запис?",
    switchToRegister: "Зареєструватися",
    switchToLogin: "Увійти",
    loginSuccess: "Успішний вхід!",
    registerSuccess: "Успішна реєстрація!",
    error: "Сталася помилка",
    recoverNotImplemented: "Функція відновлення поки не реалізована.",
  },
  ru: {
    loginTitle: "Войдите в свою учетную запись",
    registerTitle: "Зарегистрируйтесь",
    name: "Имя",
    email: "Email",
    password: "Пароль",
    loginButton: "Войти",
    registerButton: "Зарегистрироваться",
    forgotPassword: "Забыли пароль?",
    noAccount: "Нет аккаунта?",
    haveAccount: "Уже есть аккаунт?",
    switchToRegister: "Зарегистрироваться",
    switchToLogin: "Войти",
    loginSuccess: "Вход выполнен успешно!",
    registerSuccess: "Регистрация прошла успешно!",
    error: "Произошла ошибка",
    recoverNotImplemented: "Функция восстановления пароля пока не реализована.",
  }
};

const CreateUser = ({ onClose }) => {
  const dispatch = useDispatch();
  const { register, handleSubmit, reset, formState: { errors } } = useForm();
  const [message, setMessage] = useState("");
  const [isLogin, setIsLogin] = useState(true);
  const [showPassword, setShowPassword] = useState(false);
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const handleClickShowPassword = () => setShowPassword((prev) => !prev);
  const token = "your_token_here";

  const onSubmit = async (data) => {
    try {
      const endpoint = isLogin ? "/api/v1/auth/login" : "/api/v1/auth/register";
      const response = await axios.post(`http://localhost:3000${endpoint}`, data, {
        headers: {
          "Content-Type": "application/json",
          "Authorization": `Bearer ${token}`
        },
      });

      if (response.status === 200 || response.status === 201) {
        setMessage(isLogin ? t.loginSuccess : t.registerSuccess);

        const dataResponse = response.data;
        if (dataResponse.success && dataResponse.token) {
          dispatch(login(dataResponse.token));
        }

        setTimeout(() => {
          onClose();
          reset();
        }, 3000);
      } else {
        setMessage(t.error);
      }

    } catch (error) {
      if (error.response) {
        setMessage(error.response.data.message || t.error);
      } else if (error.request) {
        setMessage("Сервер не отвечает. Проверьте подключение к сети.");
      } else {
        setMessage(t.error);
      }
    }
  };

  const handleForgotPassword = () => {
    setMessage(t.recoverNotImplemented);
  };

  return (
    <Box
      sx={{
        display: "flex",
        alignItems: "center",
        justifyContent: "center",
        backgroundColor: "#f5f5f5",
        minHeight: "auto",
        position: "relative"
      }}
    >
      <Box
        sx={{
          width: "90%",
          maxWidth: 350,
          p: 3,
          boxShadow: 3,
          borderRadius: 2,
          backgroundColor: "white",
          position: "relative"
        }}
      >
        {/* Крестик */}
        <IconButton
          onClick={onClose}
          sx={{
            position: "absolute",
            top: 8,
            right: 8,
            color: "grey.600",
            zIndex: 1
          }}
        >
          <Close />
        </IconButton>

        <Typography variant="h5" textAlign="center" gutterBottom>
      

          <Logo/>

        </Typography>

        <Typography variant="h6" textAlign="center" gutterBottom>
          {isLogin ? t.loginTitle : t.registerTitle}
        </Typography>

        {message && (
          <Alert severity="info" sx={{ mb: 2 }}>
            {message}
          </Alert>
        )}

        <form onSubmit={handleSubmit(onSubmit)} noValidate>
          {!isLogin && (
            <TextField
              label={t.name}
              fullWidth
              margin="normal"
              {...register("name", { required: t.name })}
              error={!!errors.name}
              helperText={errors.name?.message}
            />
          )}

          <TextField
            label={t.email}
            type="email"
            fullWidth
            margin="normal"
            {...register("email", { required: t.email })}
            error={!!errors.email}
            helperText={errors.email?.message}
          />

          <TextField
            label={t.password}
            type={showPassword ? "text" : "password"}
            fullWidth
            margin="normal"
            {...register("password", { required: t.password, minLength: 6 })}
            error={!!errors.password}
            helperText={errors.password?.message}
            InputProps={{
              endAdornment: (
                <InputAdornment position="end">
                  <IconButton onClick={handleClickShowPassword} edge="end">
                    {showPassword ? <VisibilityOff /> : <Visibility />}
                  </IconButton>
                </InputAdornment>
              ),
            }}
          />

          <Button
            type="submit"
            variant="contained"
            color="primary"
            fullWidth
            sx={{ mt: 2 }}
          >
            {isLogin ? t.loginButton : t.registerButton}
          </Button>
          <Box sx={{ mt: 2 }}>
  <AuthButton />
</Box>

        </form>

        {isLogin && (
          <Typography textAlign="center" sx={{ mt: 2 }}>
            <Link component="button" variant="body2" onClick={handleForgotPassword}>
              {t.forgotPassword}
            </Link>
          </Typography>
        )}

        <Typography textAlign="center" sx={{ mt: 2 }}>
          {isLogin ? t.noAccount : t.haveAccount}{" "}
          <Link component="button" variant="body2" onClick={() => setIsLogin(!isLogin)}>
            {isLogin ? t.switchToRegister : t.switchToLogin}
          </Link>
        </Typography>
      </Box>
    </Box>
  );
};

export default CreateUser;




