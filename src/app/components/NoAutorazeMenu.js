

// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Logo from "./Logo";
// import Image from "next/image";
// import Link from "next/link";
// import { useLanguage } from "@/app/LanguageContext";
// import { Drawer, List, ListItem, ListItemText, IconButton, Collapse, MenuItem, Typography, Box, Modal } from "@mui/material";
// import { Close, ArrowDropDown } from "@mui/icons-material";
// import CreateUser from "./CreateUser"; 
// import styles from "@/app/styles/Menu.styles.module.scss";
// import { Roboto } from "next/font/google";

// const translations = {
//   ua: {
//     slogan: "Оренда житла по всій Україні без посередників.",
//     language: "Мова",
//     currency: "Валюта",
//     login: "Увійти/Зареєструватися",
//     housingSearch: "Пошук житла",
//     rentalConditions: "Умови оренди",
//     faq: "Часті питання",
//     blog: "Блог",
//     contact: "Зв'язатися з підтримкою",
//     listYourProperty: "Здати своє помешкання.",
//   },
//   ru: {
//     slogan: "Аренда жилья по всей Украине без посредников.",
//     language: "Язык",
//     currency: "Валюта",
//     login: "Войти/Зарегистрироваться",
//     housingSearch: "Поиск жилья",
//     rentalConditions: "Условия аренды",
//     faq: "Часто задаваемые вопросы",
//     blog: "Блог",
//     contact: "Связаться с потдержкой",
//     listYourProperty: "Сдать свое жилье.",
//   },
// };

// const NoAutorazeMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false); // Состояние для компонента CreateUser
//   const menuRef = useRef(null);
//   const { currentLanguage, onLanguageToggle } = useLanguage();

//   const handleCloseMenu = () => setIsMenuOpen(false);
//   const handleCreateUserOpen = () => {
//     setIsCreateUserOpen(true); // Открываем компонент CreateUser
//     handleCloseMenu(); // Закрываем меню при открытии CreateUser
//   };
//   const handleCreateUserClose = () => setIsCreateUserOpen(false); // Закрываем компонент CreateUser

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setIsMenuOpen(false);
//       setIsLanguageMenuOpen(false);
//       setIsCurrencyMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   const translation = translations[currentLanguage];

//   return (
//     <>
//       {/* Меню */}
//       <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
//         <Box sx={{ width: 300 }} role="presentation" ref={menuRef}>
//           <Box className={styles.menuHeader} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
//             <Typography variant="h6" className={styles.name}>
//             {/* <h1
//             style={{
//               fontSize: "26px",
//               fontWeight: "bold",
//               color: "#1976d2",
//               fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//               letterSpacing: "1.2px",
//               paddingLeft:"10px",
//               // paddingTop:"10px",
//               margin: 0,
//               textShadow: `
//                 0 0 5px #fff176,
//                 1px 1px 2px rgba(0, 0, 0, 0.4)
//               `,
//             }}
//           >
//             NaDoby
//             <span style={{ color: "#FFD700", textShadow: "0 0 8px #FFD700" }}>
//               .com
//             </span>
//           </h1> */}

// <Logo/>



//             </Typography>
//             <IconButton onClick={handleCloseMenu}>
//               <Close />
//             </IconButton>
//           </Box>

//           <Typography variant="body1" sx={{ p: 2, color: "blue" }}>{translation.slogan}</Typography>

//           <List>
//             {/* Кнопка для открытия CreateUser */}
//             <ListItem button onClick={handleCreateUserOpen}>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.login}</span>} />
//             </ListItem>

//             {/* Выбор языка */}
//             <ListItem button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.language}</span>} />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isLanguageMenuOpen}>
//               <List>
//                 <MenuItem onClick={() => onLanguageToggle("ua")}>UA</MenuItem>
//                 <MenuItem onClick={() => onLanguageToggle("ru")}>RU</MenuItem>
//               </List>
//             </Collapse>

//             {/* Выбор валюты */}
//             <ListItem button onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.currency}</span>} />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isCurrencyMenuOpen}>
//               <List>
//                 <MenuItem>USD</MenuItem>
//                 <MenuItem>EUR</MenuItem>
//                 <MenuItem>UAH</MenuItem>
//               </List>
//             </Collapse>


//             {/* <Box sx={{ p: 2 }}>
//   <Link href="/add-apartment" style={{ textDecoration: "none" }}>
//     <Typography
//       variant="body2"
//       sx={{
//         fontSize: "16px",
//         color: "blue",
//         fontFamily: "Roboto, sans-serif"
//       }}
//     >
//       {translation.listYourProperty}
//     </Typography>
//   </Link>
// </Box> */}


// <Box sx={{ p: 2 }}>
//   <Link href="./createUser" style={{ textDecoration: "none" }}>
//     <Typography
//       variant="body1"
//       sx={{
//         fontSize: "18px",
//         fontWeight: 600,
//         color: "#1e88e5",
//         fontFamily: "Roboto, sans-serif",
//         textAlign: "center",
//         boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//         borderRadius: "8px",
//         padding: "10px 16px",
//         backgroundColor: "#ffffff",
//         transition: "all 0.3s ease",
//         "&:hover": {
//           boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
//           backgroundColor: "#f5f5f5",
//         },
//       }}
//     >
//       {translation.listYourProperty}
//     </Typography>
//   </Link>
// </Box>



//             {/* Остальные пункты меню */}
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.housingSearch}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.rentalConditions}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.faq}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.blog}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.contact}</span>} />
//             </ListItem>
//           </List>

//           {/* Ссылка для добавления жилья без подчеркивания */}
//           {/* <Box sx={{ p: 2 }}>
//             <Link href="/add-apartment" style={{ textDecoration: "none" }}>
//               <Typography variant="body2" color="primary" style={{ color: "blue" }}>
//                 {translation.listYourProperty}
//               </Typography>
//             </Link>
//           </Box> */}
//         </Box>
//       </Drawer>

//       {/* Модальное окно для CreateUser с затемнённым фоном */}
//       <Modal
//         open={isCreateUserOpen}
//         onClose={handleCreateUserClose}
//         aria-labelledby="create-user-modal"
//         aria-describedby="create-user-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <CreateUser onClose={handleCreateUserClose} />
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default NoAutorazeMenu;






// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Logo from "./Logo";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Modal,
// } from "@mui/material";
// import { Close, ArrowDropDown } from "@mui/icons-material";
// import CreateUser from "./CreateUser";
// import styles from "@/app/styles/Menu.styles.module.scss";

// const translations = {
//   ua: {
//     slogan: "Оренда житла по всій Україні без посередників.",
//     language: "Мова",
//     currency: "Валюта",
//     login: "Увійти/Зареєструватися",
//     housingSearch: "Пошук житла",
//     rentalConditions: "Умови оренди",
//     faq: "Часті питання",
//     blog: "Блог",
//     contact: "Зв'язатися з підтримкою",
//     listYourProperty: "Здати своє помешкання",
//   },
//   ru: {
//     slogan: "Аренда жилья по всей Украине без посредников.",
//     language: "Язык",
//     currency: "Валюта",
//     login: "Войти/Зарегистрироваться",
//     housingSearch: "Поиск жилья",
//     rentalConditions: "Условия аренды",
//     faq: "Часто задаваемые вопросы",
//     blog: "Блог",
//     contact: "Связаться с потдержкой",
//     listYourProperty: "Сдать свое жилье",
//   },
// };

// const NoAutorazeMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   const menuRef = useRef(null);
//   const { currentLanguage, onLanguageToggle } = useLanguage();

//   const handleCloseMenu = () => setIsMenuOpen(false);
//   const handleCreateUserOpen = () => {
//     setIsCreateUserOpen(true);
//     handleCloseMenu();
//   };
//   const handleCreateUserClose = () => setIsCreateUserOpen(false);

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setIsMenuOpen(false);
//       setIsLanguageMenuOpen(false);
//       setIsCurrencyMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     } else {
//       document.removeEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   const translation = translations[currentLanguage];

//   return (
//     <>
//       <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
//         <Box sx={{ width: 300 }} role="presentation" ref={menuRef}>
//           <Box
//             className={styles.menuHeader}
//             sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}
//           >
//             <Typography variant="h6" className={styles.name}>
//               <Logo />
//             </Typography>
//             <IconButton onClick={handleCloseMenu}>
//               <Close />
//             </IconButton>
//           </Box>

//           <Typography variant="body1" sx={{ p: 2, color: "blue" }}>
//             {translation.slogan}
//           </Typography>

//           <List>
//             {/* Кнопка "Увійти/Зареєструватися" */}
//             <ListItem button onClick={handleCreateUserOpen}>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.login}</span>} />
//             </ListItem>

//             {/* Язык */}
//             <ListItem button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.language}</span>} />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isLanguageMenuOpen}>
//               <List>
//                 <MenuItem onClick={() => onLanguageToggle("ua")}>UA</MenuItem>
//                 <MenuItem onClick={() => onLanguageToggle("ru")}>RU</MenuItem>
//               </List>
//             </Collapse>

//             {/* Валюта */}
//             <ListItem button onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.currency}</span>} />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isCurrencyMenuOpen}>
//               <List>
//                 <MenuItem>USD</MenuItem>
//                 <MenuItem>EUR</MenuItem>
//                 <MenuItem>UAH</MenuItem>
//               </List>
//             </Collapse>

//             {/* Кнопка "Здати своє помешкання" без Link */}
//             <ListItem button onClick={handleCreateUserOpen}>
//               <Box
//                 sx={{
//                   width: "100%",
//                   textAlign: "center",
//                   fontSize: "18px",
//                   fontWeight: 600,
//                   color: "#1e88e5",
//                   fontFamily: "Roboto, sans-serif",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                   padding: "10px 16px",
//                   backgroundColor: "#ffffff",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
//                     backgroundColor: "#f5f5f5",
//                   },
//                 }}
//               >
//                 {translation.listYourProperty}
//               </Box>
//             </ListItem>

//             {/* Остальные пункты */}
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.housingSearch}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.rentalConditions}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.faq}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.blog}</span>} />
//             </ListItem>
//             <ListItem button>
//               <ListItemText primary={<span style={{ color: "blue" }}>{translation.contact}</span>} />
//             </ListItem>
//           </List>
//         </Box>
//       </Drawer>

//       {/* Модальное окно CreateUser */}
//       <Modal
//         open={isCreateUserOpen}
//         onClose={handleCreateUserClose}
//         aria-labelledby="create-user-modal"
//         aria-describedby="create-user-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <CreateUser onClose={handleCreateUserClose} />
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default NoAutorazeMenu;






// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import Logo from "./Logo";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Drawer,
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Modal,
//   Snackbar,
//   Alert,
// } from "@mui/material";
// import { Close, ArrowDropDown } from "@mui/icons-material";
// import CreateUser from "./CreateUser";
// import styles from "@/app/styles/Menu.styles.module.scss";

// const translations = {
//   ua: {
//     slogan: "Оренда житла по всій Україні без посередників.",
//     language: "Мова",
//     currency: "Валюта",
//     login: "Увійти/Зареєструватися",
//     housingSearch: "Пошук житла",
//     rentalConditions: "Умови оренди",
//     faq: "Часті питання",
//     blog: "Блог",
//     contact: "Зв'язатися з підтримкою",
//     listYourProperty: "Здати своє помешкання",
//     registerMessage: "Щоб розмістити свій об’єкт, потрібно зареєструватися",
//   },
//   ru: {
//     slogan: "Аренда жилья по всей Украине без посредников.",
//     language: "Язык",
//     currency: "Валюта",
//     login: "Войти/Зарегистрироваться",
//     housingSearch: "Поиск жилья",
//     rentalConditions: "Условия аренды",
//     faq: "Часто задаваемые вопросы",
//     blog: "Блог",
//     contact: "Связаться с поддержкой",
//     listYourProperty: "Сдать свое жилье",
//     registerMessage: "Чтобы разместить свой объект, нужно зарегистрироваться",
//   },
// };

// const NoAutorazeMenu = () => {
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   const [isAlertOpen, setIsAlertOpen] = useState(false);
//   const menuRef = useRef(null);
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];

//   const handleCloseMenu = () => setIsMenuOpen(false);

//   const handleCreateUserOpen = () => {
//     setIsAlertOpen(true);          // показываем алерт
//     setIsCreateUserOpen(true);     // и окно регистрации
//     handleCloseMenu();             // и сразу прячем меню
//   };

//   const handleCreateUserClose = () => setIsCreateUserOpen(false);

//   const handleAlertClose = (event, reason) => {
//     if (reason === "clickaway") return;
//     setIsAlertOpen(false);
//   };

//   const handleClickOutside = (event) => {
//     if (menuRef.current && !menuRef.current.contains(event.target)) {
//       setIsMenuOpen(false);
//       setIsLanguageMenuOpen(false);
//       setIsCurrencyMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.addEventListener("mousedown", handleClickOutside);
//     }
//     return () => {
//       document.removeEventListener("mousedown", handleClickOutside);
//     };
//   }, [isMenuOpen]);

//   return (
//     <>
//       <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
//         <Box sx={{ width: 300 }} role="presentation" ref={menuRef}>
//           <Box
//             className={styles.menuHeader}
//             sx={{
//               display: "flex",
//               alignItems: "center",
//               justifyContent: "space-between",
//               p: 2,
//             }}
//           >
//             <Typography variant="h6" className={styles.name}>
//               <Logo />
//             </Typography>
//             <IconButton onClick={handleCloseMenu}>
//               <Close />
//             </IconButton>
//           </Box>

//           <Typography variant="body1" sx={{ p: 2, color: "blue" }}>
//             {t.slogan}
//           </Typography>

//           <List>
//             {/* Увійти/Зареєструватися */}
//             <ListItem button onClick={handleCreateUserOpen}>
//               <ListItemText
//                 primary={<span style={{ color: "blue" }}>{t.login}</span>}
//               />
//             </ListItem>

//             {/* Выбор языка */}
//             <ListItem
//               button
//               onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//             >
//               <ListItemText
//                 primary={<span style={{ color: "blue" }}>{t.language}</span>}
//               />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isLanguageMenuOpen}>
//               <List>
//                 <MenuItem onClick={() => onLanguageToggle("ua")}>UA</MenuItem>
//                 <MenuItem onClick={() => onLanguageToggle("ru")}>RU</MenuItem>
//               </List>
//             </Collapse>

//             {/* Выбор валюты */}
//             <ListItem
//               button
//               onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//             >
//               <ListItemText
//                 primary={<span style={{ color: "blue" }}>{t.currency}</span>}
//               />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isCurrencyMenuOpen}>
//               <List>
//                 <MenuItem>USD</MenuItem>
//                 <MenuItem>EUR</MenuItem>
//                 <MenuItem>UAH</MenuItem>
//               </List>
//             </Collapse>

//             {/* Здати своє помешкання */}
//             <ListItem button onClick={handleCreateUserOpen}>
//               <Box
//                 sx={{
//                   width: "100%",
//                   textAlign: "center",
//                   fontSize: "18px",
//                   fontWeight: 600,
//                   color: "#1e88e5",
//                   fontFamily: "Roboto, sans-serif",
//                   boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
//                   borderRadius: "8px",
//                   padding: "10px 16px",
//                   backgroundColor: "#ffffff",
//                   transition: "all 0.3s ease",
//                   "&:hover": {
//                     boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
//                     backgroundColor: "#f5f5f5",
//                   },
//                 }}
//               >
//                 {t.listYourProperty}
//               </Box>
//             </ListItem>

//             {/* Остальные пункты меню */}
//             {[
//               t.housingSearch,
//               t.rentalConditions,
//               t.faq,
//               t.blog,
//               t.contact,
//             ].map((text) => (
//               <ListItem button key={text}>
//                 <ListItemText
//                   primary={<span style={{ color: "blue" }}>{text}</span>}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       {/* Алерт — Snackbar + Alert, 7 секунд, с крестиком */}
//       <Snackbar
//         open={isAlertOpen}
//         autoHideDuration={7000}
//         onClose={handleAlertClose}
//         anchorOrigin={{ vertical: "top", horizontal: "right" }}
//         action={
//           <IconButton
//             size="small"
//             aria-label="close"
//             color="inherit"
//             onClick={handleAlertClose}
//           >
//             <Close fontSize="small" />
//           </IconButton>
//         }
//       >
//         <Alert onClose={handleAlertClose} severity="info" sx={{ width: "100%" }}>
//           {t.registerMessage}
//         </Alert>
//       </Snackbar>

//       {/* Модальное окно CreateUser */}
//       <Modal
//         open={isCreateUserOpen}
//         onClose={handleCreateUserClose}
//         aria-labelledby="create-user-modal"
//         aria-describedby="create-user-modal-description"
//       >
//         <Box
//           sx={{
//             position: "absolute",
//             top: "50%",
//             left: "50%",
//             transform: "translate(-50%, -50%)",
//             width: 400,
//             bgcolor: "background.paper",
//             boxShadow: 24,
//             p: 4,
//             borderRadius: 2,
//           }}
//         >
//           <CreateUser onClose={handleCreateUserClose} />
//         </Box>
//       </Modal>
//     </>
//   );
// };

// export default NoAutorazeMenu;








"use client";
import React, { useState, useRef, useEffect } from "react";
import Logo from "./Logo";
import { useLanguage } from "@/app/LanguageContext";
import {
  Drawer,
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  MenuItem,
  Typography,
  Box,
  Modal,
  Snackbar,
  Alert,
} from "@mui/material";
import { Close, ArrowDropDown } from "@mui/icons-material";
import CreateUser from "./CreateUser";
import styles from "@/app/styles/Menu.styles.module.scss";

const translations = {
  ua: {
    slogan: "Оренда житла по всій Україні без посередників.",
    language: "Мова",
    currency: "Валюта",
    login: "Увійти/Зареєструватися",
    housingSearch: "Пошук житла",
    rentalConditions: "Умови оренди",
    faq: "Часті питання",
    blog: "Блог",
    contact: "Зв'язатися з підтримкою",
    listYourProperty: "Здати своє помешкання",
    registerMessage: "Щоб розмістити свій об’єкт, потрібно зареєструватися",
  },
  ru: {
    slogan: "Аренда жилья по всей Украине без посредников.",
    language: "Язык",
    currency: "Валюта",
    login: "Войти/Зарегистрироваться",
    housingSearch: "Поиск жилья",
    rentalConditions: "Условия аренды",
    faq: "Часто задаваемые вопросы",
    blog: "Блог",
    contact: "Связаться с поддержкой",
    listYourProperty: "Сдать свое жилье",
    registerMessage: "Чтобы разместить свой объект, нужно зарегистрироваться",
  },
};

const NoAutorazeMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [isAlertOpen, setIsAlertOpen] = useState(false);
  const menuRef = useRef(null);
  const { currentLanguage, onLanguageToggle } = useLanguage();
  const t = translations[currentLanguage];

  const handleCloseMenu = () => setIsMenuOpen(false);

  const handleCreateUserOpen = () => {
    setIsAlertOpen(true);
    setIsCreateUserOpen(true);
    handleCloseMenu();
  };

  const handleCreateUserClose = () => setIsCreateUserOpen(false);

  const handleAlertClose = (event, reason) => {
    if (reason === "clickaway") return;
    setIsAlertOpen(false);
  };

  const handleClickOutside = (event) => {
    if (menuRef.current && !menuRef.current.contains(event.target)) {
      setIsMenuOpen(false);
      setIsLanguageMenuOpen(false);
      setIsCurrencyMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) {
      document.addEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  return (
    <>
      <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
        <Box sx={{ width: 300 }} role="presentation" ref={menuRef}>
          <Box
            className={styles.menuHeader}
            sx={{
              display: "flex",
              alignItems: "center",
              justifyContent: "space-between",
              p: 2,
            }}
          >
            <Typography variant="h6" className={styles.name}>
              <Logo />
            </Typography>
            <IconButton onClick={handleCloseMenu}>
              <Close />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ p: 2, color: "blue" }}>
            {t.slogan}
          </Typography>

          <List>
            <ListItem button onClick={handleCreateUserOpen}>
              <ListItemText
                primary={<span style={{ color: "blue" }}>{t.login}</span>}
              />
            </ListItem>

            <ListItem
              button
              onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            >
              <ListItemText
                primary={<span style={{ color: "blue" }}>{t.language}</span>}
              />
              <ArrowDropDown />
            </ListItem>
            <Collapse in={isLanguageMenuOpen}>
              <List>
                <MenuItem onClick={() => onLanguageToggle("ua")}>UA</MenuItem>
                <MenuItem onClick={() => onLanguageToggle("ru")}>RU</MenuItem>
              </List>
            </Collapse>

            <ListItem
              button
              onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
            >
              <ListItemText
                primary={<span style={{ color: "blue" }}>{t.currency}</span>}
              />
              <ArrowDropDown />
            </ListItem>
            <Collapse in={isCurrencyMenuOpen}>
              <List>
                <MenuItem>USD</MenuItem>
                <MenuItem>EUR</MenuItem>
                <MenuItem>UAH</MenuItem>
              </List>
            </Collapse>

            <ListItem button onClick={handleCreateUserOpen}>
              <Box
                sx={{
                  width: "100%",
                  textAlign: "center",
                  fontSize: "18px",
                  fontWeight: 600,
                  color: "#1e88e5",
                  fontFamily: "Roboto, sans-serif",
                  boxShadow: "0px 2px 6px rgba(0, 0, 0, 0.1)",
                  borderRadius: "8px",
                  padding: "10px 16px",
                  backgroundColor: "#ffffff",
                  transition: "all 0.3s ease",
                  "&:hover": {
                    boxShadow: "0px 4px 12px rgba(0, 0, 0, 0.2)",
                    backgroundColor: "#f5f5f5",
                  },
                }}
              >
                {t.listYourProperty}
              </Box>
            </ListItem>

            {[
              t.housingSearch,
              t.rentalConditions,
              t.faq,
              t.blog,
              t.contact,
            ].map((text) => (
              <ListItem button key={text}>
                <ListItemText
                  primary={<span style={{ color: "blue" }}>{text}</span>}
                />
              </ListItem>
            ))}
          </List>
        </Box>
      </Drawer>

      <Snackbar
        open={isAlertOpen}
        autoHideDuration={7000}
        onClose={handleAlertClose}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
        sx={{
          mt: '15vh',
          zIndex: 1400,
        }}
        action={
          <IconButton
            size="small"
            aria-label="close"
            color="inherit"
            onClick={handleAlertClose}
          >
            <Close fontSize="small" />
          </IconButton>
        }
      >
        <Alert onClose={handleAlertClose} severity="info" sx={{ width: "100%" }}>
          {t.registerMessage}
        </Alert>
      </Snackbar>

      <Modal
        open={isCreateUserOpen}
        onClose={handleCreateUserClose}
        aria-labelledby="create-user-modal"
        aria-describedby="create-user-modal-description"
      >
        <Box
          sx={{
            position: "absolute",
            top: "50%",
            left: "50%",
            transform: "translate(-50%, -50%)",
            width: 400,
            bgcolor: "background.paper",
            boxShadow: 24,
            p: 4,
            borderRadius: 2,
          }}
        >
          <CreateUser onClose={handleCreateUserClose} />
        </Box>
      </Modal>
    </>
  );
};

export default NoAutorazeMenu;
