// import React from "react";
// import Link from "next/link";
// import styles from "@/app/styles/Menu.styles.module.scss";

// const translations = {
//   ua: {
//     profile: "Профіль",
//     myListings: "Мої оголошення",
//     messages: "Повідомлення",
//     favorites: "Обране",
//     logout: "Вийти",
//   },
//   ru: {
//     profile: "Профиль",
//     myListings: "Мои объявления",
//     messages: "Сообщения",
//     favorites: "Избранное",
//     logout: "Выйти",
//   },
// };

// const UserMenu = ({ currentLanguage="ua", onLogout }) => {
//   const translation = translations[currentLanguage];

//   return (
//     <ul className={styles.userMenu}>
//       <li>
//         <Link href="/profile">{translation.profile}</Link>
//       </li>
//       <li>
//         <Link href="/my-listings">{translation.myListings}</Link>
//       </li>
//       <li>
//         <Link href="/messages">{translation.messages}</Link>
//       </li>
//       <li>
//         <Link href="/favorites">{translation.favorites}</Link>
//       </li>
//       <li onClick={onLogout} className={styles.logout}>
//         {translation.logout}
//       </li>
//     </ul>
//   );
// };

// export default UserMenu;

// "use client";
// import React from "react";
// import Link from "next/link";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Paper,
//   Box
// } from "@mui/material";

// const translations = {
//   ua: {
//     profile: "Профіль",
//     myListings: "Мої оголошення",
//     messages: "Повідомлення",
//     favorites: "Обране",
//     logout: "Вийти"
//   },
//   ru: {
//     profile: "Профиль",
//     myListings: "Мои объявления",
//     messages: "Сообщения",
//     favorites: "Избранное",
//     logout: "Выйти"
//   }
// };

// const UserMenu = ({ currentLanguage = "ua", onLogout }) => {
//   const t = translations[currentLanguage];

//   return (
//     <Paper
//       elevation={3}
//       sx={{
//         minWidth: 250,
//         bgcolor: 'background.paper',
//         borderRadius: 2,
//         overflow: 'hidden'
//       }}
//     >
//       <List disablePadding>
//         <ListItem
//           button
//           component={Link}
//           href="/profile"
//           sx={{
//             px: 3,
//             '&:hover': {
//               bgcolor: 'action.hover'
//             }
//           }}
//         >
//           <ListItemText primary={t.profile} />
//         </ListItem>

//         <ListItem
//           button
//           component={Link}
//           href="/my-listings"
//           sx={{
//             px: 3,
//             '&:hover': {
//               bgcolor: 'action.hover'
//             }
//           }}
//         >
//           <ListItemText primary={t.myListings} />
//         </ListItem>

//         <ListItem
//           button
//           component={Link}
//           href="/messages"
//           sx={{
//             px: 3,
//             '&:hover': {
//               bgcolor: 'action.hover'
//             }
//           }}
//         >
//           <ListItemText primary={t.messages} />
//         </ListItem>

//         <ListItem
//           button
//           component={Link}
//           href="/favorites"
//           sx={{
//             px: 3,
//             '&:hover': {
//               bgcolor: 'action.hover'
//             }
//           }}
//         >
//           <ListItemText primary={t.favorites} />
//         </ListItem>

//         <Divider />

//         <ListItem
//           button
//           onClick={onLogout}
//           sx={{
//             px: 3,
//             color: 'error.main',
//             '&:hover': {
//               bgcolor: 'error.light',
//               color: 'error.contrastText'
//             }
//           }}
//         >
//           <ListItemText primary={t.logout} />
//         </ListItem>
//       </List>
//     </Paper>
//   );
// };

// export default UserMenu;

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import styles from "@/app/styles/Header.styles.module.scss";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Paper,
//   Box,
//   IconButton
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const translations = {
//   ua: {
//     profile: " Мій Профіль",
//     myListings: "Мої оголошення",
//     messages: "Повідомлення",
//     favorites: "Обране",
//     logout: "Вийти"
//   },
//   ru: {
//     profile: " Мой Профиль",
//     myListings: "Мои объявления",
//     messages: "Сообщения",
//     favorites: "Избранное",
//     logout: "Выйти"
//   }
// };

// const UserMenu = ({ currentLanguage = "ua" }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const t = translations[currentLanguage];

//   const handleLogout = () => {
//     console.log("Выйти из аккаунта");
//     setIsOpen(false);
//   };

//   if (!isOpen) return null;

//   return (

//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         bgcolor: "rgba(0, 0, 0, 0.5)",
//         zIndex: 1300,
//         display: "flex",
//         justifyContent: "flex-end"
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: 300,
//           height: "100%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           position: "relative",
//           display: "flex",
//           flexDirection: "column"
//         }}
//       >
//  {/* Заголовок NaDoby.com */}
//  <h1 className={styles.homLogo}>NaDoby.com</h1>

//         <IconButton
//           onClick={() => setIsOpen(false)}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <List disablePadding sx={{ mt: 6 }}>
//           <ListItem
//             button
//             component={Link}
//             href="/profile"
//             sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}
//           >
//             <ListItemText primary={t.profile} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/my-listings"
//             sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}
//           >
//             <ListItemText primary={t.myListings} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/messages"
//             sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}
//           >
//             <ListItemText primary={t.messages} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/favorites"
//             sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}
//           >
//             <ListItemText primary={t.favorites} />
//           </ListItem>

//           <Divider />

//           <ListItem
//             button
//             onClick={handleLogout}
//             sx={{
//               px: 3,
//               color: 'error.main',
//               '&:hover': {
//                 bgcolor: 'error.light',
//                 color: 'error.contrastText'
//               }
//             }}
//           >
//             <ListItemText primary={t.logout} />
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default UserMenu;

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import styles from "@/app/styles/Header.styles.module.scss";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   Divider,
//   Paper,
//   Box,
//   IconButton
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";

// const translations = {
//   ua: {
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Здати житло",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти"
//   },
//   ru: {
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Сдать жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти"
//   }
// };

// const UserMenu = ({ currentLanguage = "ua" }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const t = translations[currentLanguage];

//   const handleLogout = () => {
//     console.log("Выйти из аккаунта");
//     setIsOpen(false);
//   };

//   if (!isOpen) return null;

//   return (
//     <Box
//       sx={{
//         position: "fixed",
//         top: 0,
//         left: 0,
//         width: "100vw",
//         height: "100vh",
//         bgcolor: "rgba(0, 0, 0, 0.5)",
//         zIndex: 1300,
//         display: "flex",
//         justifyContent: "flex-end"
//       }}
//     >
//       <Paper
//         elevation={3}
//         sx={{
//           width: 300,
//           height: "100%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           position: "relative",
//           display: "flex",
//           flexDirection: "column"
//         }}
//       >
//         {/* Заголовок NaDoby.com */}
//         <h1 className={styles.homLogo}>NaDoby.com</h1>

//         <IconButton
//           onClick={() => setIsOpen(false)}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <List disablePadding sx={{ mt: 6 }}>
//           <ListItem button component={Link} href="/profile" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.profile} />
//           </ListItem>

//           <ListItem button component={Link} href="/my-listings" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.myListings} />
//           </ListItem>

//           <ListItem button component={Link} href="/rent-out" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.rentOut} />
//           </ListItem>

//           <ListItem button component={Link} href="/search" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.searchHome} />
//           </ListItem>

//           <ListItem button component={Link} href="/language" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.language} />
//           </ListItem>

//           <ListItem button component={Link} href="/currency" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.currency} />
//           </ListItem>

//           <ListItem button component={Link} href="/favorites" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.favorites} />
//           </ListItem>

//           <Divider />

//           <ListItem
//             button
//             onClick={handleLogout}
//             sx={{
//               px: 3,
//               color: 'error.main',
//               '&:hover': {
//                 bgcolor: 'error.light',
//                 color: 'error.contrastText'
//               }
//             }}
//           >
//             <ListItemText primary={t.logout} />
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default UserMenu;

// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// import styles from "@/app/styles/Header.styles.module.scss";
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
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { useLanguage } from "@/app/LanguageContext"; // Для переключения языка

// const translations = {
//   ua: {
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Здати житло",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     aboutPlatform: "Про платформу NaDoby.com",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//   },
//   ru: {
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Сдать жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     aboutPlatform: "О платформе NaDoby.com",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//   },
// };

// const UserMenu = ({ currentLanguage = "ua" }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const { currentLanguage: lang, onLanguageToggle } = useLanguage(); // Используем контекст для языка

//   const t = translations[lang];

//   const handleLogout = () => {
//     console.log("Выйти из аккаунта");
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
//         elevation={3}
//         sx={{
//           width: 300,
//           height: "100%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         {/* Заголовок NaDoby.com */}
//         <h1 className={styles.homLogo}>NaDoby.com</h1>

//         <IconButton
//           onClick={() => setIsOpen(false)}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <List disablePadding sx={{ mt: 6 }}>
//           <ListItem button component={Link} href="/profile" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.profile} />
//           </ListItem>

//           <ListItem button component={Link} href="/my-listings" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.myListings} />
//           </ListItem>

//           <ListItem button component={Link} href="/rent-out" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.rentOut} />
//           </ListItem>

//           <ListItem button component={Link} href="/search" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.searchHome} />
//           </ListItem>

//           {/* Меню языка */}
//           <ListItem button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)} sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.language} sx={{ color: "blue" }} />
//           </ListItem>
//           {isLanguageMenuOpen && (
//             <Collapse in={isLanguageMenuOpen}>
//               <List>
//                 <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
//                 <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
//               </List>
//             </Collapse>
//           )}

//           {/* Меню валюты */}
//           <ListItem button onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)} sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.currency} sx={{ color: "blue" }} />
//           </ListItem>
//           {isCurrencyMenuOpen && (
//             <Collapse in={isCurrencyMenuOpen}>
//               <List>
//                 <MenuItem onClick={() => handleCurrencyToggle("USD")}>USD</MenuItem>
//                 <MenuItem onClick={() => handleCurrencyToggle("EUR")}>EUR</MenuItem>
//                 <MenuItem onClick={() => handleCurrencyToggle("UAH")}>UAH</MenuItem>
//               </List>
//             </Collapse>
//           )}

//           <ListItem button component={Link} href="/favorites" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.favorites} />
//           </ListItem>

//           <Divider />

//           {/* О платформе NaDoby.com */}
//           <ListItem button component={Link} href="/about" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.aboutPlatform} />
//           </ListItem>

//           {/* Связаться с поддержкой */}
//           <ListItem button component={Link} href="/contact" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.contactSupport} />
//           </ListItem>

//           {/* Блог */}
//           <ListItem button component={Link} href="/blog" sx={{ px: 3, '&:hover': { bgcolor: 'action.hover' } }}>
//             <ListItemText primary={t.blog} />
//           </ListItem>

//           <ListItem
//             button
//             onClick={handleLogout}
//             sx={{
//               px: 3,
//               color: "error.main",
//               "&:hover": {
//                 bgcolor: "error.light",
//                 color: "error.contrastText",
//               },
//             }}
//           >
//             <ListItemText primary={t.logout} />
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default UserMenu;




// "use client";
// import React, { useState } from "react";
// import Link from "next/link";
// // import styles from "@/app/styles/Header.styles.module.scss";
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
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// // import ExpandLess from "@mui/icons-material/ExpandLess";
// // import ExpandMore from "@mui/icons-material/ExpandMore";
// import { ArrowDropDown } from "@mui/icons-material";

// import { useLanguage } from "@/app/LanguageContext";
// import {  logout } from '../store/authSlice';
// import { useDispatch } from "react-redux";
// const translations = {
//   ua: {
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Здати житло",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     aboutPlatform: "Про платформу NaDoby.com",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//   },
//   ru: {
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Сдать жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     aboutPlatform: "О платформе NaDoby.com",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//   },
// };

// const UserMenu = ({ currentLanguage = "ua" }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const { currentLanguage: lang, onLanguageToggle } = useLanguage();

//   const t = translations[lang];
//   const dispatch = useDispatch();
//   const handleLogout = () => {
//     console.log("Выйти из аккаунта");
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
//         elevation={3}
//         sx={{
//           width: 300,
//           height: "100%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
//         <h1
//         // className={styles.homLogo}
//         >
//           NaDoby.com
//         </h1>

//         <IconButton
//           onClick={() => setIsOpen(false)}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <List disablePadding sx={{ mt: 6 }}>
//           <ListItem
//             button
//             component={Link}
//             href="/profile"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.profile} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/my-listings"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.myListings} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/rent-out"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.rentOut} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/search"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.searchHome} />
//           </ListItem>

//           {/* Language menu */}
//           <ListItem
//             button
//             onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//             sx={{
//               px: 3,
//               "&:hover": { bgcolor: "action.hover" },
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <ListItemText primary={t.language} sx={{ color: "blue" }} />
//             {/* {isLanguageMenuOpen ? <ExpandLess /> : <ExpandMore />} */}
//             {isLanguageMenuOpen ? <ArrowDropDown /> : <ArrowDropDown />}
//           </ListItem>
//           <Collapse in={isLanguageMenuOpen}>
//             <List>
//               <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
//               <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
//             </List>
//           </Collapse>

//           {/* Currency menu */}
//           <ListItem
//             button
//             onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//             sx={{
//               px: 3,
//               "&:hover": { bgcolor: "action.hover" },
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <ListItemText primary={t.currency} sx={{ color: "blue" }} />
//             {/* {isCurrencyMenuOpen ? <ExpandLess /> : <ExpandMore />} */}
//             {isLanguageMenuOpen ? <ArrowDropDown /> : <ArrowDropDown />}
//           </ListItem>
//           <Collapse in={isCurrencyMenuOpen}>
//             <List>
//               <MenuItem onClick={() => handleCurrencyToggle("USD")}>
//                 USD
//               </MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("EUR")}>
//                 EUR
//               </MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("UAH")}>
//                 UAH
//               </MenuItem>
//             </List>
//           </Collapse>

//           <ListItem
//             button
//             component={Link}
//             href="/favorites"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.favorites} />
//           </ListItem>

//           <Divider />

//           <ListItem
//             button
//             component={Link}
//             href="/about"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.aboutPlatform} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/contact"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.contactSupport} />
//           </ListItem>

//           <ListItem
//             button
//             component={Link}
//             href="/blog"
//             sx={{ px: 3, "&:hover": { bgcolor: "action.hover" } }}
//           >
//             <ListItemText primary={t.blog} />
//           </ListItem>

//           <ListItem
//             button
//             onClick={handleLogout}
//             sx={{
//               px: 3,
//               color: "error.main",
//               "&:hover": {
//                 bgcolor: "error.light",
//                 color: "error.contrastText",
//               },
//             }}
//           >
//             <ListItemText primary={t.logout} />
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default UserMenu;




// "use client";
// import React, { useState } from "react";
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
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { ArrowDropDown } from "@mui/icons-material";

// import { useLanguage } from "@/app/LanguageContext";
// import { logout } from "../store/authSlice";
// import { useDispatch } from "react-redux";

// const translations = {
//   ua: {
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Здати житло",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     aboutPlatform: "Про платформу NaDoby.com",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//   },
//   ru: {
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Сдать жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     aboutPlatform: "О платформе NaDoby.com",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//   },
// };

// const UserMenu = ({ currentLanguage = "ua" }) => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const { currentLanguage: lang, onLanguageToggle } = useLanguage();
//   const t = translations[lang];
//   const dispatch = useDispatch();

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
//       onClick={() => setIsOpen(false)} // Закрытие при клике на фон
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
//         onClick={(e) => e.stopPropagation()} // Предотвращает закрытие при клике внутри меню
//         elevation={3}
//         sx={{
//           width: 300,
//           height: "100%",
//           bgcolor: "background.paper",
//           borderRadius: 0,
//           position: "relative",
//           display: "flex",
//           flexDirection: "column",
//         }}
//       >
// <h1
//   style={{
//     padding: "16px",
//     fontSize: "28px",
//     fontWeight: "bold",
//     color: "#1976d2", // насыщенный синий
//     textShadow: `
//       0 0 5px #ffeb3b,     /* жёлтая легкая подсветка */
//       1px 1px 2px rgba(0, 0, 0, 0.4) /* мягкая тень */
//     `,
//     fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//     letterSpacing: "1.2px",
//     textAlign: "center",
//   }}
// >
//   NaDoby.com
// </h1>


//         <IconButton
//           onClick={() => setIsOpen(false)}
//           sx={{ position: "absolute", top: 10, right: 10 }}
//         >
//           <CloseIcon />
//         </IconButton>

//         <List disablePadding sx={{ mt: 6 }}>
//           <ListItem button component={Link} href="/profile" sx={{ px: 3 }}>
//             <ListItemText primary={t.profile} />
//           </ListItem>

//           <ListItem button component={Link} href="/my-listings" sx={{ px: 3 }}>
//             <ListItemText primary={t.myListings} />
//           </ListItem>

//           <ListItem button component={Link} href="/rent-out" sx={{ px: 3 }}>
//             <ListItemText primary={t.rentOut} />
//           </ListItem>

//           <ListItem button component={Link} href="/search" sx={{ px: 3 }}>
//             <ListItemText primary={t.searchHome} />
//           </ListItem>

//           {/* Language menu */}
//           <ListItem
//             button
//             onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <ListItemText primary={t.language} sx={{ color: "blue" }} />
//             <ArrowDropDown />
//           </ListItem>
//           <Collapse in={isLanguageMenuOpen}>
//             <List>
//               <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
//               <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
//             </List>
//           </Collapse>

//           {/* Currency menu */}
//           <ListItem
//             button
//             onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//           >
//             <ListItemText primary={t.currency} sx={{ color: "blue" }} />
//             <ArrowDropDown />
//           </ListItem>
//           <Collapse in={isCurrencyMenuOpen}>
//             <List>
//               <MenuItem onClick={() => handleCurrencyToggle("USD")}>USD</MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("EUR")}>EUR</MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("UAH")}>UAH</MenuItem>
//             </List>
//           </Collapse>

//           <ListItem button component={Link} href="/favorites" sx={{ px: 3 }}>
//             <ListItemText primary={t.favorites} />
//           </ListItem>

//           <Divider />

//           <ListItem button component={Link} href="/about" sx={{ px: 3 }}>
//             <ListItemText primary={t.aboutPlatform} />
//           </ListItem>

//           <ListItem button component={Link} href="/contact" sx={{ px: 3 }}>
//             <ListItemText primary={t.contactSupport} />
//           </ListItem>

//           <ListItem button component={Link} href="/blog" sx={{ px: 3 }}>
//             <ListItemText primary={t.blog} />
//           </ListItem>

//           <ListItem
//             button
//             onClick={handleLogout}
//             sx={{
//               px: 3,
//               color: "error.main",
//               "&:hover": {
//                 bgcolor: "error.light",
//                 color: "error.contrastText",
//               },
//             }}
//           >
//             <ListItemText primary={t.logout} />
//           </ListItem>
//         </List>
//       </Paper>
//     </Box>
//   );
// };

// export default UserMenu;



"use client";
import React, { useState } from "react";
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
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowDropDown } from "@mui/icons-material";

import { useLanguage } from "@/app/LanguageContext";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

const translations = {
  ua: {
    profile: "Мій Профіль",
    myListings: "Мої оголошення",
    rentOut: "Здати житло",
    searchHome: "Пошук житла",
    language: "Мова",
    currency: "Валюта",
    favorites: "Обране",
    logout: "Вийти",
    aboutPlatform: "Про платформу NaDoby.com",
    contactSupport: "Зв'язатися з підтримкою",
    blog: "Блог",
  },
  ru: {
    profile: "Мой Профиль",
    myListings: "Мои объявления",
    rentOut: "Сдать жильё",
    searchHome: "Поиск жилья",
    language: "Язык",
    currency: "Валюта",
    favorites: "Избранное",
    logout: "Выйти",
    aboutPlatform: "О платформе NaDoby.com",
    contactSupport: "Связаться с поддержкой",
    blog: "Блог",
  },
};

const UserMenu = ({ currentLanguage = "ua" }) => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const { currentLanguage: lang, onLanguageToggle } = useLanguage();
  const t = translations[lang];
  const dispatch = useDispatch();

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
        {/* Заголовок с логотипом и крестиком */}
        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            justifyContent: "space-between",
            px: 2,
            pt: 2,
          }}
        >
          {/* <h1
            style={{
              fontSize: "26px",
              fontWeight: "bold",
              color: "#1976d2",
              fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
              letterSpacing: "1.2px",
              margin: 0,
              textShadow: `
                0 0 5px #fff176,
                1px 1px 2px rgba(0, 0, 0, 0.4)
              `,
            }}
          >
            NaDoby
            <span style={{ color: "#FFD700", textShadow: "0 0 8px #FFD700" }}>
              .com
            </span>
          </h1> */}
<Logo/>
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon />
          </IconButton>
        </Box>

        <List disablePadding sx={{ mt: 2 }}>
          <ListItem button component={Link} href="/profile" sx={{ px: 3 }}>
            <ListItemText primary={t.profile} />
          </ListItem>

          <ListItem button component={Link} href="/my-listings" sx={{ px: 3 }}>
            <ListItemText primary={t.myListings} />
          </ListItem>

          <ListItem button component={Link} href="/add-apartment" sx={{ px: 3 }}>
            <ListItemText primary={t.rentOut} />
          </ListItem>

          <ListItem button component={Link} href="/search" sx={{ px: 3 }}>
            <ListItemText primary={t.searchHome} />
          </ListItem>

          <ListItem
            button
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            sx={{
              px: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemText primary={t.language} sx={{ color: "blue" }} />
            <ArrowDropDown />
          </ListItem>
          <Collapse in={isLanguageMenuOpen}>
            <List>
              <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
              <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
            </List>
          </Collapse>

          <ListItem
            button
            onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
            sx={{
              px: 3,
              display: "flex",
              justifyContent: "space-between",
            }}
          >
            <ListItemText primary={t.currency} sx={{ color: "blue" }} />
            <ArrowDropDown />
          </ListItem>
          <Collapse in={isCurrencyMenuOpen}>
            <List>
              <MenuItem onClick={() => handleCurrencyToggle("USD")}>USD</MenuItem>
              <MenuItem onClick={() => handleCurrencyToggle("EUR")}>EUR</MenuItem>
              <MenuItem onClick={() => handleCurrencyToggle("UAH")}>UAH</MenuItem>
            </List>
          </Collapse>

          <ListItem button component={Link} href="/favorites" sx={{ px: 3 }}>
            <ListItemText primary={t.favorites} />
          </ListItem>

          <Divider />

          <ListItem button component={Link} href="/about" sx={{ px: 3 }}>
            <ListItemText primary={t.aboutPlatform} />
          </ListItem>

          <ListItem button component={Link} href="/contact" sx={{ px: 3 }}>
            <ListItemText primary={t.contactSupport} />
          </ListItem>

          <ListItem button component={Link} href="/blog" sx={{ px: 3 }}>
            <ListItemText primary={t.blog} />
          </ListItem>

          <ListItem
            button
            onClick={handleLogout}
            sx={{
              px: 3,
              color: "error.main",
              "&:hover": {
                bgcolor: "error.light",
                color: "error.contrastText",
              },
            }}
          >
            <ListItemText primary={t.logout} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default UserMenu;
