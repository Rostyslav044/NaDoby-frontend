


// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Logo from "./Logo";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Paper,
//   Box,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Badge,
//   TextField,
//   InputAdornment,
//   CircularProgress,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { ArrowDropDown, Favorite, Calculate } from "@mui/icons-material";
// import { useLanguage } from "@/app/LanguageContext";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Зареєструвати помешкання",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     rentalTerms: "Умови оренди",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//     loadingRates: "Завантаження курсів...",
//     currencyError: "Не вдалося завантажити курси валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введіть суму",
//     uah: "грн",
//     currentRates: "Поточний курс НБУ",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Зарегистрировать жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     rentalTerms: "Условия аренды",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//     loadingRates: "Загрузка курсов...",
//     currencyError: "Не удалось загрузить курсы валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введите сумму",
//     uah: "грн",
//     currentRates: "Текущий курс НБУ",
//   },
// };

// const UserMenu = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0);
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loadingRates, setLoadingRates] = useState(false);
//   const [currencyError, setCurrencyError] = useState(null);
//   const [converterAmount, setConverterAmount] = useState("");
//   const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
//   const t = translations[currentLanguage];
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);

//   // Функция для получения курсов валют
//   const fetchExchangeRates = async () => {
//     setLoadingRates(true);
//     setCurrencyError(null);
    
//     try {
//       // Используем API НБУ для получения курсов валют
//       const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      
//       // Находим курсы USD и EUR
//       const usdRate = response.data.find(currency => currency.cc === 'USD');
//       const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
//       setExchangeRates({
//         USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
//         EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
//       });
//     } catch (error) {
//       console.error('Ошибка при получении курсов валют:', error);
//       setCurrencyError(t.currencyError);
//     } finally {
//       setLoadingRates(false);
//     }
//   };

//   // Функция для конвертации валют
//   const convertCurrency = (amount) => {
//     if (!exchangeRates || isNaN(amount) || amount <= 0) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     const numericAmount = parseFloat(amount);
//     const usdRate = parseFloat(exchangeRates.USD);
//     const eurRate = parseFloat(exchangeRates.EUR);
    
//     if (isNaN(usdRate) || isNaN(eurRate)) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     setConverterResult({
//       USD: (numericAmount / usdRate).toFixed(2),
//       EUR: (numericAmount / eurRate).toFixed(2)
//     });
//   };

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (isCurrencyMenuOpen) {
//       fetchExchangeRates();
//     }
//   }, [isCurrencyMenuOpen]);

//   // Обновляем результаты конвертации при изменении суммы
//   useEffect(() => {
//     convertCurrency(converterAmount);
//   }, [converterAmount, exchangeRates]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (profile?._id) {
//           const listingsResponse = await axios.get(
//             `http://localhost:3000/api/v1/apartments/user-apartment-count/${profile._id}`
//           );
//           setMyListingsCount(listingsResponse.data.count);
//         }

//         const userProfile = localStorage.getItem('user_profile');
//         if (userProfile) {
//           const profileData = JSON.parse(userProfile);
          
//           const favoritesResponse = await axios.get(
//             'http://localhost:3000/api/v1/apartments/favorites/count',
//             { headers: { 'user-id': profileData._id } }
//           );
          
//           if (favoritesResponse.data.success) {
//             setFavoritesCount(favoritesResponse.data.count);
//           }
//         }
//       } catch (error) {
//         console.error('Помилка при завантаженні даних:', error);
//       }
//     };

//     fetchData();
//   }, [profile]);

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsOpen(false);
//   };

//   const handleLanguageToggle = (language) => {
//     onLanguageToggle(language);
//     setIsLanguageMenuOpen(false);
//   };

//   const handleCurrencyToggle = (currency) => {
//     console.log("Выбрана валюта:", currency);
//     setIsCurrencyMenuOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <Box
//       onClick={() => setIsOpen(false)}
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         bgcolor: "rgba(0, 0, 0, 0.5)",
//         zIndex: 1300,
//         display: "flex",
//         justifyContent: "flex-end",
//       }}
//     >
//       <Paper
//         onClick={(e) => e.stopPropagation()}
//         elevation={3}
//         sx={{
//           width: 300,
//           height: "100%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             px: 2,
//             pt: 2,
//           }}
//         >
//           <Logo />
//           <IconButton onClick={() => setIsOpen(false)}>
//             <CloseIcon sx={{ color: "#718096" }} />
//           </IconButton>
//         </Box>

//         <Box sx={{ mt: 1, pb: 2 }}>
//           <Typography sx={{
//             color: '#1a365d',
//             fontSize: '0.98rem',
//             fontWeight: 600,
//             paddingLeft: '20px',
//             paddingTop: '15px',
//           }}>
//             {t.sloganLine1}
//           </Typography>
//           <Typography sx={{
//             color: '#e53e3e',
//             fontSize: '0.90rem',
//             fontWeight: 600,
//             lineHeight: 1.3,
//             mt: 0.5,
//             fontStyle: 'italic',
//             paddingLeft: '20px',
//           }}>
//             {t.sloganLine2}
//           </Typography>
//         </Box>
  
//         <Divider sx={{ my: 1 }} />

//         <List disablePadding sx={{ flex: 1 }}>
//           {[
//             { text: t.profile, href: "/my-profile" },
//             { text: `${t.myListings} (${myListingsCount})`, href: "/my-listings" },
//             { text: t.rentOut, href: "/add-apartment" },
//             { text: t.searchHome, href: "/" },
//           ].map((item) => (
//             <Link href={item.href} passHref legacyBehavior key={item.text}>
//               <ListItem component="a" sx={{ px: 3 }}>
//                 <ListItemText 
//                   primary={item.text} 
//                   primaryTypographyProps={{ 
//                     color: "#0000FF",
//                     fontWeight: 500 
//                   }} 
//                 />
//               </ListItem>
//             </Link>
//           ))}

//           <Link href="/favorites" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//                 <Favorite sx={{ color: '#0000FF', mr: 1, fontSize: 20 }} />
//                 <ListItemText 
//                   primary={`${t.favorites} (${favoritesCount})`}
//                   primaryTypographyProps={{ 
//                     color: "#0000FF",
//                     fontWeight: 500 
//                   }} 
//                 />
//               </Box>
//             </ListItem>
//           </Link>

//           <Divider sx={{ my: 1 }} />

//           <ListItem
//             onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//             component="div"
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               cursor: "pointer",
//               color: "#0000FF",
//             }}
//           >
//             <ListItemText 
//               primary={t.language} 
//               primaryTypographyProps={{ fontWeight: 500 }} 
//             />
//             <ArrowDropDown sx={{ color: "#0000FF" }} />
//           </ListItem>

//           <Collapse in={isLanguageMenuOpen}>
//             <Box sx={{ bgcolor: "#f8f9fa" }}>
//               <MenuItem 
//                 onClick={() => handleLanguageToggle("ua")}
//                 sx={{ px: 4, color: "#0000FF" }}
//               >
//                 UA
//               </MenuItem>
//               <MenuItem 
//                 onClick={() => handleLanguageToggle("ru")}
//                 sx={{ px: 4, color: "#0000FF" }}
//               >
//                 RU
//               </MenuItem>
//             </Box>
//           </Collapse>

//           <ListItem
//             onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//             component="div"
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               cursor: "pointer",
//               color: "#0000FF",
//             }}
//           >
//             <ListItemText 
//               primary={t.currency} 
//               primaryTypographyProps={{ fontWeight: 500 }} 
//             />
//             <ArrowDropDown sx={{ color: "#0000FF" }} />
//           </ListItem>

//           <Collapse in={isCurrencyMenuOpen}>
//             <Box sx={{ bgcolor: "#f8f9fa" }}>
//               {loadingRates ? (
//                 <MenuItem sx={{ px: 4, color: "#0000FF", display: 'flex', justifyContent: 'center' }}>
//                   <CircularProgress size={20} sx={{ mr: 1 }} />
//                   {t.loadingRates}
//                 </MenuItem>
//               ) : currencyError ? (
//                 <MenuItem sx={{ px: 4, color: "#0000FF" }}>
//                   {currencyError}
//                 </MenuItem>
//               ) : exchangeRates ? (
//                 <>
//                   <MenuItem sx={{ px: 4, color: "#0000FF", fontWeight: 'bold' }}>
//                     {t.currentRates}
//                   </MenuItem>
//                   <MenuItem sx={{ px: 4, color: "#0000FF" }}>
//                     USD: {exchangeRates.USD} UAH
//                   </MenuItem>
//                   <MenuItem sx={{ px: 4, color: "#0000FF" }}>
//                     EUR: {exchangeRates.EUR} UAH
//                   </MenuItem>
                  
//                   <Divider sx={{ my: 1 }} />
                  
//                   <MenuItem sx={{ px: 4, color: "#0000FF", fontWeight: 'bold' }}>
//                     <Calculate sx={{ mr: 1 }} />
//                     {t.converter}
//                   </MenuItem>
                  
//                   <Box sx={{ px: 4, py: 1 }}>
//                     <TextField
//                       type="number"
//                       value={converterAmount}
//                       onChange={(e) => setConverterAmount(e.target.value)}
//                       label={t.enterAmount}
//                       variant="outlined"
//                       size="small"
//                       fullWidth
//                       InputProps={{
//                         endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
//                       }}
//                     />
                    
//                     {converterAmount && parseFloat(converterAmount) > 0 && (
//                       <Box sx={{ mt: 2 }}>
//                         <Typography variant="body2" sx={{ color: "#0000FF" }}>
//                           USD: {converterResult.USD}
//                         </Typography>
//                         <Typography variant="body2" sx={{ color: "#0000FF" }}>
//                           EUR: {converterResult.EUR}
//                         </Typography>
//                       </Box>
//                     )}
//                   </Box>
//                 </>
//               ) : null}
//             </Box>
//           </Collapse>

//           <Divider sx={{ my: 1 }} />

//           {[
//             { text: t.rentalTerms, href: "/rental-terms" },
//             { text: t.blog, href: "/blog" },
//             { text: t.contactSupport, href: "/contact" },
//           ].map((item) => (
//             <Link href={item.href} passHref legacyBehavior key={item.text}>
//               <ListItem component="a" sx={{ px: 3 }}>
//                 <ListItemText 
//                   primary={item.text} 
//                   primaryTypographyProps={{ 
//                     color: "#0000FF",
//                     fontWeight: 500 
//                   }} 
//                 />
//               </ListItem>
//             </Link>
//           ))}

//           <ListItem
//             onClick={handleLogout}
//             component="div"
//             sx={{
//               px: 3,
//               color: "error.main",
//               cursor: "pointer",
//               "&:hover": {
//                 bgcolor: "error.light",
//                 color: "error.contrastText",
//               },
//             }}
//           >
//             <ListItemText 
//               primary={t.logout} 
//               primaryTypographyProps={{ fontWeight: 500 }} 
//             />
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default UserMenu;





// "use client";

// import React, { useState, useEffect } from "react";
// import Link from "next/link";
// import Logo from "./Logo";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Paper,
//   Box,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Badge,
//   TextField,
//   InputAdornment,
//   CircularProgress,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { ArrowDropDown, Favorite, Calculate, ContentCopy } from "@mui/icons-material";
// import { useLanguage } from "@/app/LanguageContext";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Зареєструвати помешкання",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     rentalTerms: "Умови оренди",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//     loadingRates: "Завантаження курсів...",
//     currencyError: "Не вдалося завантажити курси валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введіть суму",
//     uah: "грн",
//     currentRates: "Поточний курс НБУ",
//     copyEmail: "Скопіювати email підтримки",
//     emailCopied: "Email скопійовано в буфер обміну",
//     contactInstructions: "Напишіть нам на email або скопіюйте його",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Зарегистрировать жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     rentalTerms: "Условия аренды",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//     loadingRates: "Загрузка курсов...",
//     currencyError: "Не удалось загрузить курсы валют",
//     converter: "Конвертер валют",
//     enterAmount: "Введите сумму",
//     uah: "грн",
//     currentRates: "Текущий курс НБУ",
//     copyEmail: "Скопировать email поддержки",
//     emailCopied: "Email скопирован в буфер обмена",
//     contactInstructions: "Напишите нам на email или скопируйте его",
//   },
// };

// const UserMenu = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const [showEmailDialog, setShowEmailDialog] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0);
//   const [exchangeRates, setExchangeRates] = useState(null);
//   const [loadingRates, setLoadingRates] = useState(false);
//   const [currencyError, setCurrencyError] = useState(null);
//   const [converterAmount, setConverterAmount] = useState("");
//   const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
//   const t = translations[currentLanguage];
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);

//   // Функция для получения курсов валют
//   const fetchExchangeRates = async () => {
//     setLoadingRates(true);
//     setCurrencyError(null);
    
//     try {
//       const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
//       const usdRate = response.data.find(currency => currency.cc === 'USD');
//       const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
//       setExchangeRates({
//         USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
//         EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
//       });
//     } catch (error) {
//       console.error('Ошибка при получении курсов валют:', error);
//       setCurrencyError(t.currencyError);
//     } finally {
//       setLoadingRates(false);
//     }
//   };

//   // Функция для конвертации валют
//   const convertCurrency = (amount) => {
//     if (!exchangeRates || isNaN(amount) || amount <= 0) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     const numericAmount = parseFloat(amount);
//     const usdRate = parseFloat(exchangeRates.USD);
//     const eurRate = parseFloat(exchangeRates.EUR);
    
//     if (isNaN(usdRate) || isNaN(eurRate)) {
//       setConverterResult({ USD: 0, EUR: 0 });
//       return;
//     }
    
//     setConverterResult({
//       USD: (numericAmount / usdRate).toFixed(2),
//       EUR: (numericAmount / eurRate).toFixed(2)
//     });
//   };

//   // Функция для связи с поддержкой
//   const handleContactSupport = () => {
//     console.log('=== Contact Support Debug ===');
//     console.log('Profile data:', profile);
    
//     // Получаем информацию о пользователе
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     // Создаем тему письма с информацией о пользователе
//     const subject = `Поддержка сайта аренды жилья - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
    
//     // Создаем тело письма с информацией о пользователе
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено из приложения аренды жилья.`;

//     const supportEmail = "support@example.com"; // ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ EMAIL
    
//     const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     console.log('Generated mailto URL:', mailtoUrl);
//     console.log('Subject:', subject);
//     console.log('User info:', userInfo);
//     console.log('=== End Debug ===');

//     // Показываем диалог вместо автоматического открытия
//     setShowEmailDialog(true);
//   };

//   // Функция для открытия почтового клиента
//   const openEmailClient = () => {
//     const supportEmail = "support@example.com"; // ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ EMAIL
    
//     // Получаем информацию о пользователе
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка сайта аренды жилья - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено из приложения аренды жилья.`;

//     const mailtoUrl = `mailto:${supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     // Открываем в новом окне
//     window.open(mailtoUrl, '_blank');
//     setShowEmailDialog(false);
//     setIsOpen(false);
//   };

//   // Функция для копирования email в буфер обмена
//   const copyEmailToClipboard = () => {
//     const supportEmail = "support@example.com"; // ЗАМЕНИТЕ НА ВАШ РЕАЛЬНЫЙ EMAIL
//     navigator.clipboard.writeText(supportEmail)
//       .then(() => {
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsOpen(false);
//       })
//       .catch(err => {
//         console.error('Ошибка при копировании:', err);
//         // Fallback для старых браузеров
//         const textArea = document.createElement('textarea');
//         textArea.value = supportEmail;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsOpen(false);
//       });
//   };

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (isCurrencyMenuOpen) {
//       fetchExchangeRates();
//     }
//   }, [isCurrencyMenuOpen]);

//   // Обновляем результаты конвертации при изменении суммы
//   useEffect(() => {
//     convertCurrency(converterAmount);
//   }, [converterAmount, exchangeRates]);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         if (profile?._id) {
//           const listingsResponse = await axios.get(
//             `http://localhost:3000/api/v1/apartments/user-apartment-count/${profile._id}`
//           );
//           setMyListingsCount(listingsResponse.data.count);
//         }

//         const userProfile = localStorage.getItem('user_profile');
//         if (userProfile) {
//           const profileData = JSON.parse(userProfile);
          
//           const favoritesResponse = await axios.get(
//             'http://localhost:3000/api/v1/apartments/favorites/count',
//             { headers: { 'user-id': profileData._id } }
//           );
          
//           if (favoritesResponse.data.success) {
//             setFavoritesCount(favoritesResponse.data.count);
//           }
//         }
//       } catch (error) {
//         console.error('Помилка при завантаженні даних:', error);
//       }
//     };

//     fetchData();
//   }, [profile]);

//   const handleLogout = () => {
//     dispatch(logout());
//     setIsOpen(false);
//   };

//   const handleLanguageToggle = (language) => {
//     onLanguageToggle(language);
//     setIsLanguageMenuOpen(false);
//   };

//   const handleCurrencyToggle = (currency) => {
//     console.log("Выбрана валюта:", currency);
//     setIsCurrencyMenuOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <>
//       <Box
//         onClick={() => setIsOpen(false)}
//         sx={{
//           position: "fixed",
//           top: 0,
//           left: 0,
//           width: "100vw",
//           height: "100vh",
//           bgcolor: "rgba(0, 0, 0, 0.5)",
//           zIndex: 1300,
//           display: "flex",
//           justifyContent: "flex-end",
//         }}
//       >
//         <Paper
//           onClick={(e) => e.stopPropagation()}
//           elevation={3}
//           sx={{
//             width: 300,
//             height: "100%",
//             bgcolor: "background.paper",
//             borderRadius: 0,
//             display: "flex",
//             flexDirection: "column",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               px: 2,
//               pt: 2,
//             }}
//           >
//             <Logo />
//             <IconButton onClick={() => setIsOpen(false)}>
//               <CloseIcon sx={{ color: "#718096" }} />
//             </IconButton>
//           </Box>

//           <Box sx={{ mt: 1, pb: 2 }}>
//             <Typography sx={{
//               color: '#1a365d',
//               fontSize: '0.98rem',
//               fontWeight: 600,
//               paddingLeft: '20px',
//               paddingTop: '15px',
//             }}>
//               {t.sloganLine1}
//             </Typography>
//             <Typography sx={{
//               color: '#e53e3e',
//               fontSize: '0.90rem',
//               fontWeight: 600,
//               lineHeight: 1.3,
//               mt: 0.5,
//               fontStyle: 'italic',
//               paddingLeft: '20px',
//             }}>
//               {t.sloganLine2}
//             </Typography>
//           </Box>
    
//           <Divider sx={{ my: 1 }} />

//           <List disablePadding sx={{ flex: 1 }}>
//             {[
//               { text: t.profile, href: "/my-profile" },
//               { text: `${t.myListings} (${myListingsCount})`, href: "/my-listings" },
//               { text: t.rentOut, href: "/add-apartment" },
//               { text: t.searchHome, href: "/" },
//             ].map((item) => (
//               <Link href={item.href} passHref legacyBehavior key={item.text}>
//                 <ListItem component="a" sx={{ px: 3 }}>
//                   <ListItemText 
//                     primary={item.text} 
//                     primaryTypographyProps={{ 
//                       color: "#0000FF",
//                       fontWeight: 500 
//                     }} 
//                   />
//                 </ListItem>
//               </Link>
//             ))}

//             <Link href="/favorites" passHref legacyBehavior>
//               <ListItem component="a" sx={{ px: 3 }}>
//                 <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
//                   <Favorite sx={{ color: '#0000FF', mr: 1, fontSize: 20 }} />
//                   <ListItemText 
//                     primary={`${t.favorites} (${favoritesCount})`}
//                     primaryTypographyProps={{ 
//                       color: "#0000FF",
//                       fontWeight: 500 
//                     }} 
//                   />
//                 </Box>
//               </ListItem>
//             </Link>

//             <Divider sx={{ my: 1 }} />

//             <ListItem
//               onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//               component="div"
//               sx={{
//                 px: 3,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 color: "#0000FF",
//               }}
//             >
//               <ListItemText 
//                 primary={t.language} 
//                 primaryTypographyProps={{ fontWeight: 500 }} 
//               />
//               <ArrowDropDown sx={{ color: "#0000FF" }} />
//             </ListItem>

//             <Collapse in={isLanguageMenuOpen}>
//               <Box sx={{ bgcolor: "#f8f9fa" }}>
//                 <MenuItem 
//                   onClick={() => handleLanguageToggle("ua")}
//                   sx={{ px: 4, color: "#0000FF" }}
//                 >
//                   UA
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => handleLanguageToggle("ru")}
//                   sx={{ px: 4, color: "#0000FF" }}
//                 >
//                   RU
//                 </MenuItem>
//               </Box>
//             </Collapse>

//             <ListItem
//               onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//               component="div"
//               sx={{
//                 px: 3,
//                 display: "flex",
//                 justifyContent: "space-between",
//                 alignItems: "center",
//                 cursor: "pointer",
//                 color: "#0000FF",
//               }}
//             >
//               <ListItemText 
//                 primary={t.currency} 
//                 primaryTypographyProps={{ fontWeight: 500 }} 
//               />
//               <ArrowDropDown sx={{ color: "#0000FF" }} />
//             </ListItem>

//             <Collapse in={isCurrencyMenuOpen}>
//               <Box sx={{ bgcolor: "#f8f9fa" }}>
//                 {loadingRates ? (
//                   <MenuItem sx={{ px: 4, color: "#0000FF", display: 'flex', justifyContent: 'center' }}>
//                     <CircularProgress size={20} sx={{ mr: 1 }} />
//                     {t.loadingRates}
//                   </MenuItem>
//                 ) : currencyError ? (
//                   <MenuItem sx={{ px: 4, color: "#0000FF" }}>
//                     {currencyError}
//                   </MenuItem>
//                 ) : exchangeRates ? (
//                   <>
//                     <MenuItem sx={{ px: 4, color: "#0000FF", fontWeight: 'bold' }}>
//                       {t.currentRates}
//                     </MenuItem>
//                     <MenuItem sx={{ px: 4, color: "#0000FF" }}>
//                       USD: {exchangeRates.USD} UAH
//                     </MenuItem>
//                     <MenuItem sx={{ px: 4, color: "#0000FF" }}>
//                       EUR: {exchangeRates.EUR} UAH
//                     </MenuItem>
                    
//                     <Divider sx={{ my: 1 }} />
                    
//                     <MenuItem sx={{ px: 4, color: "#0000FF", fontWeight: 'bold' }}>
//                       <Calculate sx={{ mr: 1 }} />
//                       {t.converter}
//                     </MenuItem>
                    
//                     <Box sx={{ px: 4, py: 1 }}>
//                       <TextField
//                         type="number"
//                         value={converterAmount}
//                         onChange={(e) => setConverterAmount(e.target.value)}
//                         label={t.enterAmount}
//                         variant="outlined"
//                         size="small"
//                         fullWidth
//                         InputProps={{
//                           endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
//                         }}
//                       />
                      
//                       {converterAmount && parseFloat(converterAmount) > 0 && (
//                         <Box sx={{ mt: 2 }}>
//                           <Typography variant="body2" sx={{ color: "#0000FF" }}>
//                             USD: {converterResult.USD}
//                           </Typography>
//                           <Typography variant="body2" sx={{ color: "#0000FF" }}>
//                             EUR: {converterResult.EUR}
//                           </Typography>
//                         </Box>
//                       )}
//                     </Box>
//                   </>
//                 ) : null}
//               </Box>
//             </Collapse>

//             <Divider sx={{ my: 1 }} />

//             {[
//               { text: t.rentalTerms, href: "/rental-terms" },
//               { text: t.blog, href: "/blog" },
//             ].map((item) => (
//               <Link href={item.href} passHref legacyBehavior key={item.text}>
//                 <ListItem component="a" sx={{ px: 3 }}>
//                   <ListItemText 
//                     primary={item.text} 
//                     primaryTypographyProps={{ 
//                       color: "#0000FF",
//                       fontWeight: 500 
//                     }} 
//                   />
//                 </ListItem>
//               </Link>
//             ))}

//             {/* Contact Support with improved dialog */}
//             <ListItem
//               onClick={handleContactSupport}
//               component="div"
//               sx={{
//                 px: 3,
//                 color: "#0000FF",
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: "action.hover",
//                 },
//               }}
//             >
//               <ListItemText 
//                 primary={t.contactSupport} 
//                 primaryTypographyProps={{ fontWeight: 500 }} 
//               />
//             </ListItem>

//             <ListItem
//               onClick={handleLogout}
//               component="div"
//               sx={{
//                 px: 3,
//                 color: "error.main",
//                 cursor: "pointer",
//                 "&:hover": {
//                   bgcolor: "error.light",
//                   color: "error.contrastText",
//                 },
//               }}
//             >
//               <ListItemText 
//                 primary={t.logout} 
//                 primaryTypographyProps={{ fontWeight: 500 }} 
//               />
//             </ListItem>
//           </List>
//         </Paper>
//       </Box>

//       {/* Email Dialog */}
//       {showEmailDialog && (
//         <Box
//           sx={{
//             position: "fixed",
//             top: 0,
//             left: 0,
//             width: "100vw",
//             height: "100vh",
//             bgcolor: "rgba(0, 0, 0, 0.5)",
//             zIndex: 1400,
//             display: "flex",
//             justifyContent: "center",
//             alignItems: "center",
//           }}
//         >
//           <Paper
//             elevation={3}
//             sx={{
//               width: 400,
//               p: 3,
//               bgcolor: "background.paper",
//               borderRadius: 2,
//             }}
//           >
//             <Typography variant="h6" sx={{ mb: 2, color: "#0000FF" }}>
//               {t.contactSupport}
//             </Typography>
//             <Typography variant="body1" sx={{ mb: 3 }}>
//               {t.contactInstructions}
//             </Typography>
            
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2 }}>
//               <MenuItem 
//                 onClick={openEmailClient}
//                 sx={{ 
//                   color: "#0000FF",
//                   border: "1px solid #0000FF",
//                   borderRadius: 1,
//                   justifyContent: "center",
//                   "&:hover": {
//                     bgcolor: "#0000FF",
//                     color: "white",
//                   }
//                 }}
//               >
//                 Открыть почтовый клиент
//               </MenuItem>
              
//               <MenuItem 
//                 onClick={copyEmailToClipboard}
//                 sx={{ 
//                   color: "#0000FF",
//                   border: "1px solid #0000FF",
//                   borderRadius: 1,
//                   justifyContent: "center",
//                   "&:hover": {
//                     bgcolor: "#0000FF",
//                     color: "white",
//                   }
//                 }}
//               >
//                 <ContentCopy sx={{ mr: 1 }} />
//                 {t.copyEmail}
//               </MenuItem>
              
//               <MenuItem 
//                 onClick={() => setShowEmailDialog(false)}
//                 sx={{ 
//                   color: "error.main",
//                   border: "1px solid error.main",
//                   borderRadius: 1,
//                   justifyContent: "center",
//                   "&:hover": {
//                     bgcolor: "error.main",
//                     color: "white",
//                   }
//                 }}
//               >
//                 Отмена
//               </MenuItem>
//             </Box>
//           </Paper>
//         </Box>
//       )}

//       {/* Snackbar for copy confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={() => setSnackbarOpen(false)}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//           {t.emailCopied}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default UserMenu;




"use client";

import React, { useState, useEffect } from "react";
import Link from "next/link";
import Logo from "./Logo";
import {
  List,
  ListItem,
  ListItemText,
  Divider,
  Paper,
  Box,
  IconButton,
  Collapse,
  MenuItem,
  Typography,
  Badge,
  TextField,
  InputAdornment,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  useTheme,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
import { useLanguage } from "@/app/LanguageContext";
import { logout } from "../store/authSlice";
import { useDispatch, useSelector } from "react-redux";
import axios from "axios";

const translations = {
  ua: {
    sloganLine1: "Оренда житла по всій Україні",
    sloganLine2: "Без посередників !",
    profile: "Мій Профіль",
    myListings: "Мої оголошення",
    rentOut: "Зареєструвати помешкання",
    searchHome: "Пошук житла",
    language: "Мова",
    currency: "Валюта",
    favorites: "Обране",
    logout: "Вийти",
    rentalTerms: "Умови оренди",
    contactSupport: "Зв'язатися з підтримкою",
    blog: "Блог",
    loadingRates: "Завантаження курсів...",
    currencyError: "Не вдалося завантажити курси валют",
    converter: "Конвертер валют",
    enterAmount: "Введіть суму",
    uah: "грн",
    currentRates: "Поточний курс НБУ",
    copyEmail: "Скопіювати email",
    emailCopied: "Email скопійовано в буфер обміну",
    contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
    supportEmail: "support@nadoby.com.ua",
    writeGmail: "Написати через Gmail",
    writeEmailClient: "Написати через поштовий клієнт",
    cancel: "Скасувати",
  },
  ru: {
    sloganLine1: "Аренда жилья по всей Украине",
    sloganLine2: "Без посредников !",
    profile: "Мой Профиль",
    myListings: "Мои объявления",
    rentOut: "Зарегистрировать жильё",
    searchHome: "Поиск жилья",
    language: "Язык",
    currency: "Валюта",
    favorites: "Избранное",
    logout: "Выйти",
    rentalTerms: "Условия аренды",
    contactSupport: "Связаться с поддержкой",
    blog: "Блог",
    loadingRates: "Загрузка курсов...",
    currencyError: "Не удалось загрузить курсы валют",
    converter: "Конвертер валют",
    enterAmount: "Введите сумму",
    uah: "грн",
    currentRates: "Текущий курс НБУ",
    copyEmail: "Скопировать email",
    emailCopied: "Email скопирован в буфер обмена",
    contactInstructions: "Выберите способ связи с поддержкой",
    supportEmail: "support@nadoby.com.ua",
    writeGmail: "Написать через Gmail",
    writeEmailClient: "Написать через почтовый клиент",
    cancel: "Отмена",
  },
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const { currentLanguage, onLanguageToggle } = useLanguage();
  const [myListingsCount, setMyListingsCount] = useState(0);
  const [favoritesCount, setFavoritesCount] = useState(0);
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [currencyError, setCurrencyError] = useState(null);
  const [converterAmount, setConverterAmount] = useState("");
  const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });
  
  const t = translations[currentLanguage];
  const dispatch = useDispatch();
  const profile = useSelector(state => state.auth.profile);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  // Функция для получения курсов валют
  const fetchExchangeRates = async () => {
    setLoadingRates(true);
    setCurrencyError(null);
    
    try {
      const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      const usdRate = response.data.find(currency => currency.cc === 'USD');
      const eurRate = response.data.find(currency => currency.cc === 'EUR');
      
      setExchangeRates({
        USD: usdRate ? usdRate.rate.toFixed(2) : 'Н/Д',
        EUR: eurRate ? eurRate.rate.toFixed(2) : 'Н/Д',
      });
    } catch (error) {
      console.error('Ошибка при получении курсов валют:', error);
      setCurrencyError(t.currencyError);
    } finally {
      setLoadingRates(false);
    }
  };

  // Функция для конвертации валют
  const convertCurrency = (amount) => {
    if (!exchangeRates || isNaN(amount) || amount <= 0) {
      setConverterResult({ USD: 0, EUR: 0 });
      return;
    }
    
    const numericAmount = parseFloat(amount);
    const usdRate = parseFloat(exchangeRates.USD);
    const eurRate = parseFloat(exchangeRates.EUR);
    
    if (isNaN(usdRate) || isNaN(eurRate)) {
      setConverterResult({ USD: 0, EUR: 0 });
      return;
    }
    
    setConverterResult({
      USD: (numericAmount / usdRate).toFixed(2),
      EUR: (numericAmount / eurRate).toFixed(2)
    });
  };

  // Функция для связи с поддержкой
  const handleContactSupport = () => {
    setShowEmailDialog(true);
  };

  // Функция для открытия Gmail с предзаполненным письмом
  const openGmail = () => {
    let userInfo = "Неавторизованный пользователь";
    
    if (profile) {
      userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
                 `Email: ${profile.email || 'Email не указан'}\n` +
                 `ID: ${profile._id || 'ID не указан'}\n` +
                 `Телефон: ${profile.phone || 'Телефон не указан'}`;
    }

    const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
    const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
    setShowEmailDialog(false);
    setIsOpen(false);
  };

  // Функция для открытия почтового клиента по умолчанию
  const openDefaultEmailClient = () => {
    let userInfo = "Неавторизованный пользователь";
    
    if (profile) {
      userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
                 `Email: ${profile.email || 'Email не указан'}\n` +
                 `ID: ${profile._id || 'ID не указан'}\n` +
                 `Телефон: ${profile.phone || 'Телефон не указан'}`;
    }

    const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
    const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

    const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    setShowEmailDialog(false);
    setIsOpen(false);
  };

  // Функция для копирования email в буфер обмена
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(t.supportEmail)
      .then(() => {
        setSnackbarOpen(true);
        setShowEmailDialog(false);
        setIsOpen(false);
      })
      .catch(err => {
        console.error('Ошибка при копировании:', err);
        const textArea = document.createElement('textarea');
        textArea.value = t.supportEmail;
        document.body.appendChild(textArea);
        textArea.select();
        document.execCommand('copy');
        document.body.removeChild(textArea);
        setSnackbarOpen(true);
        setShowEmailDialog(false);
        setIsOpen(false);
      });
  };

  // Загружаем курсы валют при открытии меню валют
  useEffect(() => {
    if (isCurrencyMenuOpen) {
      fetchExchangeRates();
    }
  }, [isCurrencyMenuOpen]);

  // Обновляем результаты конвертации при изменении суммы
  useEffect(() => {
    convertCurrency(converterAmount);
  }, [converterAmount, exchangeRates]);

  useEffect(() => {
    const fetchData = async () => {
      try {
        if (profile?._id) {
          const listingsResponse = await axios.get(
            `http://localhost:3000/api/v1/apartments/user-apartment-count/${profile._id}`
          );
          setMyListingsCount(listingsResponse.data.count);
        }

        const userProfile = localStorage.getItem('user_profile');
        if (userProfile) {
          const profileData = JSON.parse(userProfile);
          
          const favoritesResponse = await axios.get(
            'http://localhost:3000/api/v1/apartments/favorites/count',
            { headers: { 'user-id': profileData._id } }
          );
          
          if (favoritesResponse.data.success) {
            setFavoritesCount(favoritesResponse.data.count);
          }
        }
      } catch (error) {
        console.error('Помилка при завантаженні даних:', error);
      }
    };

    fetchData();
  }, [profile]);

  const handleLogout = () => {
    dispatch(logout());
    setIsOpen(false);
  };

  const handleLanguageToggle = (language) => {
    onLanguageToggle(language);
    setIsLanguageMenuOpen(false);
  };

  const handleCurrencyToggle = (currency) => {
    console.log("Выбрана валюта:", currency);
    setIsCurrencyMenuOpen(false);
  };

  if (!isOpen) return null;

  return (
    <>
      <Box
        onClick={() => setIsOpen(false)}
        sx={{
          position: "fixed",
          top: 0,
          left: 0,
          width: "100vw",
          height: "100vh",
          bgcolor: "rgba(0, 0, 0, 0.5)",
          zIndex: 1300,
          display: "flex",
          justifyContent: "flex-end",
        }}
      >
        <Paper
          onClick={(e) => e.stopPropagation()}
          elevation={3}
          sx={{
            width: isMobile ? "100%" : 300,
            height: "100%",
            bgcolor: "background.paper",
            borderRadius: 0,
            display: "flex",
            flexDirection: "column",
            overflow: "auto",
          }}
        >
          <Box
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              px: 2,
              pt: 2,
              position: "sticky",
              top: 0,
              bgcolor: "background.paper",
              zIndex: 1,
            }}
          >
            <Logo />
            <IconButton onClick={() => setIsOpen(false)}>
              <CloseIcon sx={{ color: "#718096" }} />
            </IconButton>
          </Box>

          <Box sx={{ mt: 1, pb: 2 }}>
            <Typography sx={{
              color: '#1a365d',
              fontSize: '0.98rem',
              fontWeight: 600,
              paddingLeft: '20px',
              paddingTop: '15px',
            }}>
              {t.sloganLine1}
            </Typography>
            <Typography sx={{
              color: '#e53e3e',
              fontSize: '0.90rem',
              fontWeight: 600,
              lineHeight: 1.3,
              mt: 0.5,
              fontStyle: 'italic',
              paddingLeft: '20px',
            }}>
              {t.sloganLine2}
            </Typography>
          </Box>
    
          <Divider sx={{ my: 1 }} />

          <List disablePadding sx={{ flex: 1, pb: 2 }}>
            {[
              { text: t.profile, href: "/my-profile" },
              { text: `${t.myListings} (${myListingsCount})`, href: "/my-listings" },
              { text: t.rentOut, href: "/add-apartment" },
              { text: t.searchHome, href: "/" },
            ].map((item) => (
              <Link href={item.href} passHref legacyBehavior key={item.text}>
                <ListItem component="a" sx={{ px: 3 }}>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      color: "#0000FF",
                      fontWeight: 500 
                    }} 
                  />
                </ListItem>
              </Link>
            ))}

            <Link href="/favorites" passHref legacyBehavior>
              <ListItem component="a" sx={{ px: 3 }}>
                <Box sx={{ display: 'flex', alignItems: 'center', width: '100%' }}>
                  <Favorite sx={{ color: '#0000FF', mr: 1, fontSize: 20 }} />
                  <ListItemText 
                    primary={`${t.favorites} (${favoritesCount})`}
                    primaryTypographyProps={{ 
                      color: "#0000FF",
                      fontWeight: 500 
                    }} 
                  />
                </Box>
              </ListItem>
            </Link>

            <Divider sx={{ my: 1 }} />

            <ListItem
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
              component="div"
              sx={{
                px: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                color: "#0000FF",
              }}
            >
              <ListItemText 
                primary={t.language} 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
              <ArrowDropDown sx={{ color: "#0000FF" }} />
            </ListItem>

            <Collapse in={isLanguageMenuOpen}>
              <Box sx={{ bgcolor: "#f8f9fa" }}>
                <MenuItem 
                  onClick={() => handleLanguageToggle("ua")}
                  sx={{ px: 4, color: "#0000FF" }}
                >
                  UA
                </MenuItem>
                <MenuItem 
                  onClick={() => handleLanguageToggle("ru")}
                  sx={{ px: 4, color: "#0000FF" }}
                >
                  RU
                </MenuItem>
              </Box>
            </Collapse>

            <ListItem
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
              component="div"
              sx={{
                px: 3,
                display: "flex",
                justifyContent: "space-between",
                alignItems: "center",
                cursor: "pointer",
                color: "#0000FF",
              }}
            >
              <ListItemText 
                primary={t.currency} 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
              <ArrowDropDown sx={{ color: "#0000FF" }} />
            </ListItem>

            <Collapse in={isCurrencyMenuOpen}>
              <Box sx={{ bgcolor: "#f8f9fa" }}>
                {loadingRates ? (
                  <MenuItem sx={{ px: 4, color: "#0000FF", display: 'flex', justifyContent: 'center' }}>
                    <CircularProgress size={20} sx={{ mr: 1 }} />
                    {t.loadingRates}
                  </MenuItem>
                ) : currencyError ? (
                  <MenuItem sx={{ px: 4, color: "#0000FF" }}>
                    {currencyError}
                  </MenuItem>
                ) : exchangeRates ? (
                  <>
                    <MenuItem sx={{ px: 4, color: "#0000FF", fontWeight: 'bold' }}>
                      {t.currentRates}
                    </MenuItem>
                    <MenuItem sx={{ px: 4, color: "#0000FF" }}>
                      USD: {exchangeRates.USD} UAH
                    </MenuItem>
                    <MenuItem sx={{ px: 4, color: "#0000FF" }}>
                      EUR: {exchangeRates.EUR} UAH
                    </MenuItem>
                    
                    <Divider sx={{ my: 1 }} />
                    
                    <MenuItem sx={{ px: 4, color: "#0000FF", fontWeight: 'bold' }}>
                      <Calculate sx={{ mr: 1 }} />
                      {t.converter}
                    </MenuItem>
                    
                    <Box sx={{ px: 4, py: 1 }}>
                      <TextField
                        type="number"
                        value={converterAmount}
                        onChange={(e) => setConverterAmount(e.target.value)}
                        label={t.enterAmount}
                        variant="outlined"
                        size="small"
                        fullWidth
                        InputProps={{
                          endAdornment: <InputAdornment position="end">{t.uah}</InputAdornment>,
                        }}
                      />
                      
                      {converterAmount && parseFloat(converterAmount) > 0 && (
                        <Box sx={{ mt: 2 }}>
                          <Typography variant="body2" sx={{ color: "#0000FF" }}>
                            USD: {converterResult.USD}
                          </Typography>
                          <Typography variant="body2" sx={{ color: "#0000FF" }}>
                            EUR: {converterResult.EUR}
                          </Typography>
                        </Box>
                      )}
                    </Box>
                  </>
                ) : null}
              </Box>
            </Collapse>

            <Divider sx={{ my: 1 }} />

            {[
              { text: t.rentalTerms, href: "/rental-terms" },
              { text: t.blog, href: "/blog" },
            ].map((item) => (
              <Link href={item.href} passHref legacyBehavior key={item.text}>
                <ListItem component="a" sx={{ px: 3 }}>
                  <ListItemText 
                    primary={item.text} 
                    primaryTypographyProps={{ 
                      color: "#0000FF",
                      fontWeight: 500 
                    }} 
                  />
                </ListItem>
              </Link>
            ))}

            {/* Contact Support */}
            <ListItem
              onClick={handleContactSupport}
              component="div"
              sx={{
                px: 3,
                color: "#0000FF",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "action.hover",
                },
              }}
            >
              <ListItemText 
                primary={t.contactSupport} 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>

            <ListItem
              onClick={handleLogout}
              component="div"
              sx={{
                px: 3,
                color: "error.main",
                cursor: "pointer",
                "&:hover": {
                  bgcolor: "error.light",
                  color: "error.contrastText",
                },
              }}
            >
              <ListItemText 
                primary={t.logout} 
                primaryTypographyProps={{ fontWeight: 500 }} 
              />
            </ListItem>
          </List>
        </Paper>
      </Box>

      {/* Адаптивное диалоговое окно для связи с поддержкой */}
      <Dialog
        open={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            m: isMobile ? 0 : 2,
            // Добавляем высоту для мобильных устройств
            height: isMobile ? '100%' : 'auto',
            maxHeight: isMobile ? '100%' : '90vh',
            display: 'flex',
            flexDirection: 'column',
          }
        }}
      >
        <Box sx={{ 
          display: 'flex', 
          flexDirection: 'column',
          height: '100%',
          overflow: 'hidden'
        }}>
          <DialogTitle 
            sx={{ 
              color: "#1a365d", 
              display: 'flex', 
              alignItems: 'center',
              fontSize: isMobile ? '1.1rem' : '1.25rem',
              fontWeight: 600,
              pb: 1,
              flexShrink: 0
            }}
          >
            <Mail sx={{ mr: 2, color: "#0000FF" }} />
            {t.contactSupport}
          </DialogTitle>
          
          <DialogContent sx={{ 
            pb: 2, 
            flex: 1,
            display: 'flex',
            flexDirection: 'column',
            justifyContent: 'center',
            overflow: 'auto'
          }}>
            <Box sx={{
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              height: '100%',
              gap: 3
            }}>
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#718096',
                  textAlign: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  px: isMobile ? 1 : 0
                }}
              >
                {t.contactInstructions}
              </Typography>
              
              <Card 
                variant="outlined"
                sx={{
                  border: '2px solid #e2e8f0',
                  borderRadius: 2,
                  backgroundColor: '#f7fafc',
                  width: '100%',
                  maxWidth: 400
                }}
              >
                <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
                  <Box sx={{ 
                    display: 'flex', 
                    justifyContent: 'space-between', 
                    alignItems: 'center'
                  }}>
                    <Box sx={{ flex: 1 }}>
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: "#1a365d",
                          fontWeight: 600,
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          wordBreak: 'break-all'
                        }}
                      >
                        {t.supportEmail}
                      </Typography>
                    </Box>
                    <IconButton 
                      onClick={copyEmailToClipboard}
                      sx={{ 
                        color: "#0000FF",
                        backgroundColor: 'rgba(0, 0, 255, 0.1)',
                        ml: 1,
                        '&:hover': {
                          backgroundColor: 'rgba(0, 0, 255, 0.2)',
                        }
                      }}
                    >
                      <ContentCopy />
                    </IconButton>
                  </Box>
                </CardContent>
              </Card>
            </Box>
          </DialogContent>
          
          <DialogActions sx={{ 
            p: isMobile ? 2 : 3, 
            pt: 0, 
            gap: isMobile ? 1.5 : 2, 
            flexDirection: 'column',
            flexShrink: 0
          }}>
            <Button 
              onClick={openGmail}
              variant="contained"
              sx={{ 
                bgcolor: "#0000FF",
                "&:hover": { 
                  bgcolor: "#0000CC",
                  boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
              startIcon={<Email />}
            >
              {t.writeGmail}
            </Button>
            
            <Button 
              onClick={openDefaultEmailClient}
              variant="outlined"
              sx={{ 
                color: "#0000FF", 
                borderColor: "#0000FF",
                "&:hover": { 
                  borderColor: "#0000CC",
                  backgroundColor: 'rgba(0, 0, 255, 0.04)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
              startIcon={<Mail />}
            >
              {t.writeEmailClient}
            </Button>
            
            <Button 
              onClick={copyEmailToClipboard}
              variant="outlined"
              sx={{ 
                color: "#0000FF", 
                borderColor: "#0000FF",
                "&:hover": { 
                  borderColor: "#0000CC",
                  backgroundColor: 'rgba(0, 0, 255, 0.04)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
              startIcon={<ContentCopy />}
            >
              {t.copyEmail}
            </Button>
            
            <Button 
              onClick={() => setShowEmailDialog(false)}
              variant="outlined"
              sx={{ 
                color: "error.main", 
                borderColor: "error.main",
                "&:hover": { 
                  borderColor: "error.dark",
                  backgroundColor: 'rgba(211, 47, 47, 0.04)'
                },
                width: '100%',
                py: isMobile ? 1.25 : 1.5,
                fontSize: isMobile ? '0.9rem' : '1rem',
                fontWeight: 600,
                borderRadius: 2
              }}
            >
              {t.cancel}
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
          severity="success"
          sx={{
            borderRadius: 2,
            boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
          }}
        >
          {t.emailCopied}
        </Alert>
      </Snackbar>
    </>
  );
};

export default UserMenu;