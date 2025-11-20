// "use client";

// import React, { useState, useEffect, useCallback, memo, lazy, Suspense } from "react";
// import dynamic from 'next/dynamic';
// import Link from "next/link";
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
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Card,
//   CardContent,
//   useMediaQuery,
//   useTheme,
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
// import { useLanguage } from "@/app/LanguageContext";
// import { logout } from "../store/authSlice";
// import { useDispatch, useSelector } from "react-redux";
// import axios from "axios";

// // Динамические импорты для тяжелых компонентов
// const Logo = dynamic(() => import("./Logo"), {
//   loading: () => <div>Загрузка лого...</div>
// });

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Розмістити оголошення",
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
//     copyEmail: "Скопіювати email",
//     emailCopied: "Email скопійовано в буфер обміну",
//     contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
//     supportEmail: "support@nadoby.com.ua",
//     writeGmail: "Написати через Gmail",
//     writeEmailClient: "Написати через поштовий клієнт",
//     cancel: "Скасувати",
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Разместить объявление",
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
//     copyEmail: "Скопировать email",
//     emailCopied: "Email скопирован в буфер обмена",
//     contactInstructions: "Выберите способ связи с поддержкой",
//     supportEmail: "support@nadoby.com.ua",
//     writeGmail: "Написать через Gmail",
//     writeEmailClient: "Написать через почтовый клиент",
//     cancel: "Отмена",
//   },
// };

// // Мемоизированные компоненты для оптимизации
// const MemoizedListItem = memo(ListItem);
// const MemoizedTypography = memo(Typography);
// const MemoizedButton = memo(Button);

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
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   // Функция для получения курсов валют
//   const fetchExchangeRates = useCallback(async () => {
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
//   }, [t.currencyError]);

//   // Функция для конвертации валют
//   const convertCurrency = useCallback((amount) => {
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
//   }, [exchangeRates]);

//   // Функция для связи с поддержкой
//   const handleContactSupport = useCallback(() => {
//     setShowEmailDialog(true);
//   }, []);

//   // Функция для открытия Gmail с предзаполненным письмом
//   const openGmail = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
//     setShowEmailDialog(false);
//     setIsOpen(false);
//   }, [profile, t.supportEmail]);

//   // Функция для открытия почтового клиента по умолчанию
//   const openDefaultEmailClient = useCallback(() => {
//     let userInfo = "Неавторизованный пользователь";
    
//     if (profile) {
//       userInfo = `Пользователь: ${profile.name || 'Имя не указано'}\n` +
//                  `Email: ${profile.email || 'Email не указан'}\n` +
//                  `ID: ${profile._id || 'ID не указан'}\n` +
//                  `Телефон: ${profile.phone || 'Телефон не указан'}`;
//     }

//     const subject = `Поддержка NaDoby.com.ua - ${profile ? profile.name || 'Пользователь' : 'Гость'}`;
//     const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

//     const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
//     window.location.href = mailtoUrl;
    
//     setShowEmailDialog(false);
//     setIsOpen(false);
//   }, [profile, t.supportEmail]);

//   // Функция для копирования email в буфер обмена
//   const copyEmailToClipboard = useCallback(() => {
//     navigator.clipboard.writeText(t.supportEmail)
//       .then(() => {
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsOpen(false);
//       })
//       .catch(err => {
//         console.error('Ошибка при копировании:', err);
//         const textArea = document.createElement('textarea');
//         textArea.value = t.supportEmail;
//         document.body.appendChild(textArea);
//         textArea.select();
//         document.execCommand('copy');
//         document.body.removeChild(textArea);
//         setSnackbarOpen(true);
//         setShowEmailDialog(false);
//         setIsOpen(false);
//       });
//   }, [t.supportEmail]);

//   // Загружаем курсы валют при открытии меню валют
//   useEffect(() => {
//     if (isCurrencyMenuOpen) {
//       fetchExchangeRates();
//     }
//   }, [isCurrencyMenuOpen, fetchExchangeRates]);

//   // Обновляем результаты конвертации при изменении суммы
//   useEffect(() => {
//     convertCurrency(converterAmount);
//   }, [converterAmount, convertCurrency]);

//   const fetchData = useCallback(async () => {
//     try {
//       if (profile?._id) {
//         const listingsResponse = await axios.get(
//           `http://localhost:3000/api/v1/apartments/user-apartment-count/${profile._id}`
//         );
//         setMyListingsCount(listingsResponse.data.count);
//       }

//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
        
//         const favoritesResponse = await axios.get(
//           'http://localhost:3000/api/v1/apartments/favorites/count',
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (favoritesResponse.data.success) {
//           setFavoritesCount(favoritesResponse.data.count);
//         }
//       }
//     } catch (error) {
//       console.error('Помилка при завантаженні даних:', error);
//     }
//   }, [profile]);

//   useEffect(() => {
//     fetchData();
//   }, [fetchData]);

//   const handleLogout = useCallback(() => {
//     dispatch(logout());
//     setIsOpen(false);
//   }, [dispatch]);

//   const handleLanguageToggle = useCallback((language) => {
//     onLanguageToggle(language);
//     setIsLanguageMenuOpen(false);
//   }, [onLanguageToggle]);

//   const handleCurrencyToggle = useCallback((currency) => {
//     console.log("Выбрана валюта:", currency);
//     setIsCurrencyMenuOpen(false);
//   }, []);

//   const handleCloseModal = useCallback(() => {
//     setShowEmailDialog(false);
//   }, []);

//   const handleCloseSnackbar = useCallback(() => {
//     setSnackbarOpen(false);
//   }, []);

//   const handleConverterAmountChange = useCallback((e) => {
//     setConverterAmount(e.target.value);
//   }, []);

//   const handleLanguageMenuToggle = useCallback(() => {
//     setIsLanguageMenuOpen(prev => !prev);
//   }, []);

//   const handleCurrencyMenuToggle = useCallback(() => {
//     setIsCurrencyMenuOpen(prev => !prev);
//   }, []);

//   const handleCloseUserMenu = useCallback(() => {
//     setIsOpen(false);
//   }, []);

//   if (!isOpen) return null;

//   // Мемоизированные списки для оптимизации рендеринга
//   const mainMenuItems = [
//     { text: t.profile, href: "/my-profile" },
//     { text: `${t.myListings} (${myListingsCount})`, href: "/my-listings" },
//     { text: t.rentOut, href: "/add-apartment" },
//     { text: t.searchHome, href: "/" },
//   ];

//   const footerMenuItems = [
//     { text: t.rentalTerms, href: "/rental-terms" },
//     { text: t.blog, href: "/blog" },
//   ];

//   return (
//     <>
//       <Box
//         onClick={handleCloseUserMenu}
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
//             width: isMobile ? "100%" : 300,
//             height: "100%",
//             bgcolor: "background.paper",
//             borderRadius: 0,
//             display: "flex",
//             flexDirection: "column",
//             overflow: "auto",
//           }}
//         >
//           <Box
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               px: 2,
//               pt: 2,
//               position: "sticky",
//               top: 0,
//               bgcolor: "background.paper",
//               zIndex: 1,
//             }}
//           >
//             <Suspense fallback={<div>Загрузка лого...</div>}>
//               <Logo />
//             </Suspense>
//             <IconButton onClick={handleCloseUserMenu}>
//               <CloseIcon sx={{ color: "#718096" }} />
//             </IconButton>
//           </Box>

//           <Box sx={{ mt: 1, pb: 2 }}>
//             <MemoizedTypography sx={{
//               color: '#1a365d',
//               fontSize: '0.98rem',
//               fontWeight: 600,
//               paddingLeft: '20px',
//               paddingTop: '15px',
//             }}>
//               {t.sloganLine1}
//             </MemoizedTypography>
//             <MemoizedTypography sx={{
//               color: '#e53e3e',
//               fontSize: '0.90rem',
//               fontWeight: 600,
//               lineHeight: 1.3,
//               mt: 0.5,
//               fontStyle: 'italic',
//               paddingLeft: '20px',
//             }}>
//               {t.sloganLine2}
//             </MemoizedTypography>
//           </Box>
    
//           <Divider sx={{ my: 1 }} />

//           <List disablePadding sx={{ flex: 1, pb: 2 }}>
//             {mainMenuItems.map((item) => (
//               <Link href={item.href} passHref legacyBehavior key={item.text}>
//                 <MemoizedListItem component="a" sx={{ px: 3 }}>
//                   <ListItemText 
//                     primary={item.text} 
//                     primaryTypographyProps={{ 
//                       color: "#0000FF",
//                       fontWeight: 500 
//                     }} 
//                   />
//                 </MemoizedListItem>
//               </Link>
//             ))}

//             <Link href="/favorites" passHref legacyBehavior>
//               <MemoizedListItem component="a" sx={{ px: 3 }}>
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
//               </MemoizedListItem>
//             </Link>

//             <Divider sx={{ my: 1 }} />

//             <MemoizedListItem
//               onClick={handleLanguageMenuToggle}
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
//             </MemoizedListItem>

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

//             <MemoizedListItem
//               onClick={handleCurrencyMenuToggle}
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
//             </MemoizedListItem>

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
//                         onChange={handleConverterAmountChange}
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
//                           <MemoizedTypography variant="body2" sx={{ color: "#0000FF" }}>
//                             USD: {converterResult.USD}
//                           </MemoizedTypography>
//                           <MemoizedTypography variant="body2" sx={{ color: "#0000FF" }}>
//                             EUR: {converterResult.EUR}
//                           </MemoizedTypography>
//                         </Box>
//                       )}
//                     </Box>
//                   </>
//                 ) : null}
//               </Box>
//             </Collapse>

//             <Divider sx={{ my: 1 }} />

//             {footerMenuItems.map((item) => (
//               <Link href={item.href} passHref legacyBehavior key={item.text}>
//                 <MemoizedListItem component="a" sx={{ px: 3 }}>
//                   <ListItemText 
//                     primary={item.text} 
//                     primaryTypographyProps={{ 
//                       color: "#0000FF",
//                       fontWeight: 500 
//                     }} 
//                   />
//                 </MemoizedListItem>
//               </Link>
//             ))}

//             {/* Contact Support */}
//             <MemoizedListItem
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
//             </MemoizedListItem>

//             <MemoizedListItem
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
//             </MemoizedListItem>
//           </List>
//         </Paper>
//       </Box>

//       {/* Адаптивное диалоговое окно для связи с поддержкой */}
//       <Dialog
//         open={showEmailDialog}
//         onClose={handleCloseModal}
//         maxWidth="sm"
//         fullWidth
//         fullScreen={isMobile}
//         PaperProps={{
//           sx: {
//             borderRadius: isMobile ? 0 : 2,
//             boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
//             m: isMobile ? 0 : 2,
//             height: isMobile ? '100%' : 'auto',
//             maxHeight: isMobile ? '100%' : '90vh',
//             display: 'flex',
//             flexDirection: 'column',
//           }
//         }}
//       >
//         <Box sx={{ 
//           display: 'flex', 
//           flexDirection: 'column',
//           height: '100%',
//           overflow: 'hidden'
//         }}>
//           <DialogTitle 
//             sx={{ 
//               color: "#1a365d", 
//               display: 'flex', 
//               alignItems: 'center',
//               fontSize: isMobile ? '1.1rem' : '1.25rem',
//               fontWeight: 600,
//               pb: 1,
//               flexShrink: 0
//             }}
//           >
//             <Mail sx={{ mr: 2, color: "#0000FF" }} />
//             {t.contactSupport}
//           </DialogTitle>
          
//           <DialogContent sx={{ 
//             pb: 2, 
//             flex: 1,
//             display: 'flex',
//             flexDirection: 'column',
//             justifyContent: 'center',
//             overflow: 'auto'
//           }}>
//             <Box sx={{
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               height: '100%',
//               gap: 3
//             }}>
//               <MemoizedTypography 
//                 variant="body1" 
//                 sx={{ 
//                   color: '#718096',
//                   textAlign: 'center',
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   px: isMobile ? 1 : 0
//                 }}
//               >
//                 {t.contactInstructions}
//               </MemoizedTypography>
              
//               <Card 
//                 variant="outlined"
//                 sx={{
//                   border: '2px solid #e2e8f0',
//                   borderRadius: 2,
//                   backgroundColor: '#f7fafc',
//                   width: '100%',
//                   maxWidth: 400
//                 }}
//               >
//                 <CardContent sx={{ p: isMobile ? 2 : 3, '&:last-child': { pb: isMobile ? 2 : 3 } }}>
//                   <Box sx={{ 
//                     display: 'flex', 
//                     justifyContent: 'space-between', 
//                     alignItems: 'center'
//                   }}>
//                     <Box sx={{ flex: 1 }}>
//                       <MemoizedTypography 
//                         variant="h6" 
//                         sx={{ 
//                           color: "#1a365d",
//                           fontWeight: 600,
//                           fontSize: isMobile ? '1rem' : '1.1rem',
//                           wordBreak: 'break-all'
//                         }}
//                       >
//                         {t.supportEmail}
//                       </MemoizedTypography>
//                     </Box>
//                     <IconButton 
//                       onClick={copyEmailToClipboard}
//                       sx={{ 
//                         color: "#0000FF",
//                         backgroundColor: 'rgba(0, 0, 255, 0.1)',
//                         ml: 1,
//                         '&:hover': {
//                           backgroundColor: 'rgba(0, 0, 255, 0.2)',
//                         }
//                       }}
//                     >
//                       <ContentCopy />
//                     </IconButton>
//                   </Box>
//                 </CardContent>
//               </Card>
//             </Box>
//           </DialogContent>
          
//           <DialogActions sx={{ 
//             p: isMobile ? 2 : 3, 
//             pt: 0, 
//             gap: isMobile ? 1.5 : 2, 
//             flexDirection: 'column',
//             flexShrink: 0
//           }}>
//             <MemoizedButton 
//               onClick={openGmail}
//               variant="contained"
//               sx={{ 
//                 bgcolor: "#0000FF",
//                 "&:hover": { 
//                   bgcolor: "#0000CC",
//                   boxShadow: '0 4px 12px rgba(0, 0, 255, 0.3)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Email />}
//             >
//               {t.writeGmail}
//             </MemoizedButton>
            
//             <MemoizedButton 
//               onClick={openDefaultEmailClient}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<Mail />}
//             >
//               {t.writeEmailClient}
//             </MemoizedButton>
            
//             <MemoizedButton 
//               onClick={copyEmailToClipboard}
//               variant="outlined"
//               sx={{ 
//                 color: "#0000FF", 
//                 borderColor: "#0000FF",
//                 "&:hover": { 
//                   borderColor: "#0000CC",
//                   backgroundColor: 'rgba(0, 0, 255, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//               startIcon={<ContentCopy />}
//             >
//               {t.copyEmail}
//             </MemoizedButton>
            
//             <MemoizedButton 
//               onClick={handleCloseModal}
//               variant="outlined"
//               sx={{ 
//                 color: "error.main", 
//                 borderColor: "error.main",
//                 "&:hover": { 
//                   borderColor: "error.dark",
//                   backgroundColor: 'rgba(211, 47, 47, 0.04)'
//                 },
//                 width: '100%',
//                 py: isMobile ? 1.25 : 1.5,
//                 fontSize: isMobile ? '0.9rem' : '1rem',
//                 fontWeight: 600,
//                 borderRadius: 2
//               }}
//             >
//               {t.cancel}
//             </MemoizedButton>
//           </DialogActions>
//         </Box>
//       </Dialog>

//       {/* Snackbar for copy confirmation */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={3000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           onClose={handleCloseSnackbar} 
//           severity="success"
//           sx={{
//             borderRadius: 2,
//             boxShadow: '0 4px 12px rgba(0,0,0,0.1)'
//           }}
//         >
//           {t.emailCopied}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default memo(UserMenu);

"use client";

import React, { useState, useEffect, useCallback, memo, lazy, Suspense } from "react";
import dynamic from 'next/dynamic';
import Link from "next/link";
import { useRouter } from "next/navigation";
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

// Динамические импорты для тяжелых компонентов с предзагрузкой
const Logo = dynamic(() => import("./Logo"), {
  loading: () => <div>Загрузка лого...</div>
});

const translations = {
  ua: {
    sloganLine1: "Оренда житла по всій Україні",
    sloganLine2: "Без посередників !",
    profile: "Мій Профіль",
    myListings: "Мої оголошення",
    rentOut: "Розмістити оголошення",
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
    supportEmail: "nadoby.rent@gmail.com",
    writeGmail: "Написати через Gmail",
    writeEmailClient: "Написати через поштовий клієнт",
    cancel: "Скасувати",
  },
  ru: {
    sloganLine1: "Аренда жилья по всей Украине",
    sloganLine2: "Без посредников !",
    profile: "Мой Профиль",
    myListings: "Мои объявления",
    rentOut: "Разместить объявление",
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
    supportEmail: "nadoby.rent@gmail.com",
    writeGmail: "Написать через Gmail",
    writeEmailClient: "Написать через почтовый клиент",
    cancel: "Отмена",
  },
};

// Предзагрузка страниц для быстрых переходов
const preloadPages = () => {
  if (typeof window !== 'undefined') {
    // Предзагружаем основные страницы
    const pages = [
      '/my-profile',
      '/my-listings', 
      '/add-apartment',
      '/',
      '/favorites',
      '/rental-terms',
      '/blog'
    ];
    
    pages.forEach(page => {
      const link = document.createElement('link');
      link.rel = 'prefetch';
      link.href = page;
      link.as = 'document';
      document.head.appendChild(link);
    });
  }
};

// Компонент для быстрых ссылок с предзагрузкой
const FastLink = memo(({ href, children, onMouseEnter, onClick, ...props }) => {
  const router = useRouter();
  
  const handleMouseEnter = useCallback(() => {
    // Предзагружаем страницу при наведении
    if (href && href.startsWith('/')) {
      router.prefetch(href);
    }
    onMouseEnter?.();
  }, [href, router, onMouseEnter]);

  const handleClick = useCallback((e) => {
    e.preventDefault();
    // Быстрый переход с оптимизацией
    if (href) {
      router.push(href);
    }
    onClick?.(e);
  }, [href, router, onClick]);

  return (
    <a 
      href={href}
      onMouseEnter={handleMouseEnter}
      onClick={handleClick}
      style={{ textDecoration: 'none', color: 'inherit', width: '100%' }}
      {...props}
    >
      {children}
    </a>
  );
});

// Мемоизированные компоненты для оптимизации
const MemoizedListItem = memo(ListItem);
const MemoizedTypography = memo(Typography);
const MemoizedButton = memo(Button);

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
  const router = useRouter();

  // Предзагрузка страниц при открытии меню
  useEffect(() => {
    if (isOpen) {
      preloadPages();
      
      // Дополнительная предзагрузка через router
      const pagesToPrefetch = [
        '/my-profile',
        '/my-listings',
        '/add-apartment',
        '/',
        '/favorites'
      ];
      
      pagesToPrefetch.forEach(page => {
        router.prefetch(page);
      });
    }
  }, [isOpen, router]);

  // Функция для получения курсов валют
  const fetchExchangeRates = useCallback(async () => {
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
  }, [t.currencyError]);

  // Функция для конвертации валют
  const convertCurrency = useCallback((amount) => {
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
  }, [exchangeRates]);

  // Функция для связи с поддержкой
  const handleContactSupport = useCallback(() => {
    setShowEmailDialog(true);
  }, []);

  // Функция для открытия Gmail с предзаполненным письмом
  const openGmail = useCallback(() => {
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
  }, [profile, t.supportEmail]);

  // Функция для открытия почтового клиента по умолчанию
  const openDefaultEmailClient = useCallback(() => {
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
  }, [profile, t.supportEmail]);

  // Функция для копирования email в буфер обмена
  const copyEmailToClipboard = useCallback(() => {
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
  }, [t.supportEmail]);

  // Загружаем курсы валют при открытии меню валют
  useEffect(() => {
    if (isCurrencyMenuOpen) {
      fetchExchangeRates();
    }
  }, [isCurrencyMenuOpen, fetchExchangeRates]);

  // Обновляем результаты конвертации при изменении суммы
  useEffect(() => {
    convertCurrency(converterAmount);
  }, [converterAmount, convertCurrency]);

  const fetchData = useCallback(async () => {
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
  }, [profile]);

  useEffect(() => {
    fetchData();
  }, [fetchData]);

  const handleLogout = useCallback(() => {
    dispatch(logout());
    setIsOpen(false);
  }, [dispatch]);

  const handleLanguageToggle = useCallback((language) => {
    onLanguageToggle(language);
    setIsLanguageMenuOpen(false);
  }, [onLanguageToggle]);

  const handleCurrencyToggle = useCallback((currency) => {
    console.log("Выбрана валюта:", currency);
    setIsCurrencyMenuOpen(false);
  }, []);

  const handleCloseModal = useCallback(() => {
    setShowEmailDialog(false);
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbarOpen(false);
  }, []);

  const handleConverterAmountChange = useCallback((e) => {
    setConverterAmount(e.target.value);
  }, []);

  const handleLanguageMenuToggle = useCallback(() => {
    setIsLanguageMenuOpen(prev => !prev);
  }, []);

  const handleCurrencyMenuToggle = useCallback(() => {
    setIsCurrencyMenuOpen(prev => !prev);
  }, []);

  const handleCloseUserMenu = useCallback(() => {
    setIsOpen(false);
  }, []);

  // Функция для быстрого перехода с предзагрузкой
  const handleFastNavigation = useCallback((path) => {
    // Предзагружаем страницу перед переходом
    router.prefetch(path);
    // Немедленный переход
    router.push(path);
    // Закрываем меню
    setIsOpen(false);
  }, [router]);

  if (!isOpen) return null;

  // Мемоизированные списки для оптимизации рендеринга
  const mainMenuItems = [
    { text: t.profile, href: "/my-profile", onClick: () => handleFastNavigation("/my-profile") },
    { text: `${t.myListings} (${myListingsCount})`, href: "/my-listings", onClick: () => handleFastNavigation("/my-listings") },
    { text: t.rentOut, href: "/add-apartment", onClick: () => handleFastNavigation("/add-apartment") },
    { text: t.searchHome, href: "/", onClick: () => handleFastNavigation("/") },
  ];

  const footerMenuItems = [
    { text: t.rentalTerms, href: "/rental-terms", onClick: () => handleFastNavigation("/rental-terms") },
    { text: t.blog, href: "/blog", onClick: () => handleFastNavigation("/blog") },
  ];

  return (
    <>
      <Box
        onClick={handleCloseUserMenu}
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
            <Suspense fallback={<div>Загрузка лого...</div>}>
              <Logo />
            </Suspense>
            <IconButton onClick={handleCloseUserMenu}>
              <CloseIcon sx={{ color: "#718096" }} />
            </IconButton>
          </Box>

          <Box sx={{ mt: 1, pb: 2 }}>
            <MemoizedTypography sx={{
              color: '#1a365d',
              fontSize: '0.98rem',
              fontWeight: 600,
              paddingLeft: '20px',
              paddingTop: '15px',
            }}>
              {t.sloganLine1}
            </MemoizedTypography>
            <MemoizedTypography sx={{
              color: '#e53e3e',
              fontSize: '0.90rem',
              fontWeight: 600,
              lineHeight: 1.3,
              mt: 0.5,
              fontStyle: 'italic',
              paddingLeft: '20px',
            }}>
              {t.sloganLine2}
            </MemoizedTypography>
          </Box>
    
          <Divider sx={{ my: 1 }} />

          <List disablePadding sx={{ flex: 1, pb: 2 }}>
            {mainMenuItems.map((item) => (
              <MemoizedListItem 
                key={item.text}
                onClick={item.onClick}
                component="div"
                sx={{ 
                  px: 3,
                  cursor: 'pointer',
                  color: "#0000FF",
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    color: "#0000FF",
                    fontWeight: 500 
                  }} 
                />
              </MemoizedListItem>
            ))}

            <MemoizedListItem 
              onClick={() => handleFastNavigation("/favorites")}
              component="div"
              sx={{ 
                px: 3,
                cursor: 'pointer',
                color: "#0000FF",
                '&:hover': {
                  bgcolor: 'action.hover',
                }
              }}
            >
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
            </MemoizedListItem>

            <Divider sx={{ my: 1 }} />

            <MemoizedListItem
              onClick={handleLanguageMenuToggle}
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
            </MemoizedListItem>

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

            <MemoizedListItem
              onClick={handleCurrencyMenuToggle}
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
            </MemoizedListItem>

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
                        onChange={handleConverterAmountChange}
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
                          <MemoizedTypography variant="body2" sx={{ color: "#0000FF" }}>
                            USD: {converterResult.USD}
                          </MemoizedTypography>
                          <MemoizedTypography variant="body2" sx={{ color: "#0000FF" }}>
                            EUR: {converterResult.EUR}
                          </MemoizedTypography>
                        </Box>
                      )}
                    </Box>
                  </>
                ) : null}
              </Box>
            </Collapse>

            <Divider sx={{ my: 1 }} />

            {footerMenuItems.map((item) => (
              <MemoizedListItem 
                key={item.text}
                onClick={item.onClick}
                component="div"
                sx={{ 
                  px: 3,
                  cursor: 'pointer',
                  color: "#0000FF",
                  '&:hover': {
                    bgcolor: 'action.hover',
                  }
                }}
              >
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    color: "#0000FF",
                    fontWeight: 500 
                  }} 
                />
              </MemoizedListItem>
            ))}

            {/* Contact Support */}
            <MemoizedListItem
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
            </MemoizedListItem>

            <MemoizedListItem
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
            </MemoizedListItem>
          </List>
        </Paper>
      </Box>

      {/* Адаптивное диалоговое окно для связи с поддержкой */}
      <Dialog
        open={showEmailDialog}
        onClose={handleCloseModal}
        maxWidth="sm"
        fullWidth
        fullScreen={isMobile}
        PaperProps={{
          sx: {
            borderRadius: isMobile ? 0 : 2,
            boxShadow: '0 8px 32px rgba(0,0,0,0.1)',
            m: isMobile ? 0 : 2,
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
              <MemoizedTypography 
                variant="body1" 
                sx={{ 
                  color: '#718096',
                  textAlign: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  px: isMobile ? 1 : 0
                }}
              >
                {t.contactInstructions}
              </MemoizedTypography>
              
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
                      <MemoizedTypography 
                        variant="h6" 
                        sx={{ 
                          color: "#1a365d",
                          fontWeight: 600,
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          wordBreak: 'break-all'
                        }}
                      >
                        {t.supportEmail}
                      </MemoizedTypography>
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
            <MemoizedButton 
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
            </MemoizedButton>
            
            <MemoizedButton 
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
            </MemoizedButton>
            
            <MemoizedButton 
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
            </MemoizedButton>
            
            <MemoizedButton 
              onClick={handleCloseModal}
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
            </MemoizedButton>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={handleCloseSnackbar} 
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

export default memo(UserMenu);