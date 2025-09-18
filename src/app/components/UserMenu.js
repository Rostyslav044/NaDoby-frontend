





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
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { ArrowDropDown, Favorite } from "@mui/icons-material";
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
//     rentalTerms: "Условия арены",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//   },
// };

// const UserMenu = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const [myListingsCount, setMyListingsCount] = useState(0);
//   const [favoritesCount, setFavoritesCount] = useState(0); // Добавляем состояние для избранного
  
//   const t = translations[currentLanguage];
//   const dispatch = useDispatch();
//   const profile = useSelector(state => state.auth.profile);

//   useEffect(() => {
//     const fetchData = async () => {
//       try {
//         // Загружаем количество объявлений пользователя
//         if (profile?._id) {
//           const listingsResponse = await axios.get(
//             `http://localhost:3000/api/v1/apartments/user-apartment-count/${profile._id}`
//           );
//           setMyListingsCount(listingsResponse.data.count);
//         }

//         // Загружаем количество избранных
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

//           {/* Избранное с количеством */}
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
//               <MenuItem sx={{ px: 4, color: "#0000FF" }}>USD</MenuItem>
//               <MenuItem sx={{ px: 4, color: "#0000FF" }}>EUR</MenuItem>
//               <MenuItem sx={{ px: 4, color: "#0000FF" }}>UAH</MenuItem>
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowDropDown, Favorite, Calculate } from "@mui/icons-material";
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
  },
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
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

  // Функция для получения курсов валют
  const fetchExchangeRates = async () => {
    setLoadingRates(true);
    setCurrencyError(null);
    
    try {
      // Используем API НБУ для получения курсов валют
      const response = await axios.get('https://bank.gov.ua/NBUStatService/v1/statdirectory/exchange?json');
      
      // Находим курсы USD и EUR
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
          width: 300,
          height: "100%",
          bgcolor: "background.paper",
          borderRadius: 0,
          display: "flex",
          flexDirection: "column",
        }}
      >
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            pt: 2,
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

        <List disablePadding sx={{ flex: 1 }}>
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
            { text: t.contactSupport, href: "/contact" },
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
  );
};

export default UserMenu;