



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
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent,
//   useMediaQuery,
//   useTheme,
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

//   const theme = useTheme();
//   const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

//   const handleCloseMenu = () => setIsMenuOpen(false);

//   // const handleCreateUserOpen = () => {
//   //   setIsAlertOpen(true);
//   //   setIsCreateUserOpen(true);
//   //   handleCloseMenu();
//   // };

// // ✅ Только открывает модалку (для "Увійти / Зареєструватися")
// const handleLoginClick = () => {
//   setIsCreateUserOpen(true);
//   handleCloseMenu();
// };

// // ✅ Показывает и алерт, и модалку (для "Здати своє помешкання")
// const handleListYourPropertyClick = () => {
//   setIsAlertOpen(true);
//   setIsCreateUserOpen(true);
//   handleCloseMenu();
// };



//   const handleCreateUserClose = () => setIsCreateUserOpen(false);

//   const handleAlertClose = (e, reason) => {
//     if (reason === 'clickaway') return;
//     setIsAlertOpen(false);
//   };

//   const handleClickOutside = e => {
//     if (menuRef.current && !menuRef.current.contains(e.target)) {
//       setIsMenuOpen(false);
//       setIsLanguageMenuOpen(false);
//       setIsCurrencyMenuOpen(false);
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isMenuOpen]);

//   return (
//     <>
//       <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
//         <Box sx={{ width: 300 }} ref={menuRef}>
//           <Box className={styles.menuHeader} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
//             <Logo />
//             <IconButton onClick={handleCloseMenu}><Close /></IconButton>
//           </Box>

//           <Typography sx={{ p: 2, color: 'blue' }}>{t.slogan}</Typography>

//           <List>
//             {/* <ListItem  onClick={handleCreateUserOpen}>
//               <ListItemText primary={<Typography color="primary">{t.login}</Typography>} />
//             </ListItem> */}

// {/* Увійти / Зареєструватися — без алерта */}
// <ListItem onClick={handleLoginClick}>
//   <ListItemText primary={<Typography color="primary">{t.login}</Typography>} />
// </ListItem>

//             <ListItem  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
//               <ListItemText primary={<Typography color="primary">{t.language}</Typography>} />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isLanguageMenuOpen}>
//               <List>
//                 <MenuItem onClick={() => onLanguageToggle('ua')}>UA</MenuItem>
//                 <MenuItem onClick={() => onLanguageToggle('ru')}>RU</MenuItem>
//               </List>
//             </Collapse>

//             <ListItem  onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}>
//               <ListItemText primary={<Typography color="primary">{t.currency}</Typography>} />
//               <ArrowDropDown />
//             </ListItem>
//             <Collapse in={isCurrencyMenuOpen}>
//               <List>
//                 <MenuItem>USD</MenuItem>
//                 <MenuItem>EUR</MenuItem>
//                 <MenuItem>UAH</MenuItem>
//               </List>
//             </Collapse>

//             {/* <ListItem  onClick={handleCreateUserOpen}>
//               <Box sx={{ width: '100%', textAlign: 'center', typography: 'h6', color: 'primary.main', p: 1, boxShadow: 1, borderRadius: 1, '&:hover': { boxShadow: 3 } }}>
//                 {t.listYourProperty}
//               </Box>
//             </ListItem> */}

// {/* Здати своє помешкання — с алертом */}
// <ListItem onClick={handleListYourPropertyClick}>
//   <ListItemText primary={<Typography color="primary">{t.listYourProperty}</Typography>} />
// </ListItem>


//             {[
//               t.housingSearch,
//               t.rentalConditions,
//               t.faq,
//               t.blog,
//               t.contact,
//             ].map(text => (
//               <ListItem  key={text}>
//                 <ListItemText primary={<Typography color="primary">{text}</Typography>} />
//               </ListItem>
//             ))}
//           </List>
//         </Box>
//       </Drawer>

//       <Snackbar
//         open={isAlertOpen}
//         autoHideDuration={7000}
//         onClose={handleAlertClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//         sx={{ mt: '10vh', zIndex: 1400 }}
//         action={<IconButton size="small" aria-label="close" color="inherit" onClick={handleAlertClose}><Close fontSize="small"/></IconButton>}
//       >
//         <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
//           {t.registerMessage}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={isCreateUserOpen}
//         onClose={handleCreateUserClose}
//         fullWidth
//         maxWidth="xs"
//         PaperProps={{
//           sx: {
//             position: 'absolute',
//             top: '50%',
//             left: '50%',
//             transform: 'translate(-50%, -50%)',
//             m: 0,
//             p: 0,
//             bgcolor: 'background.paper',
//           }
//         }}
//       >
//         <DialogContent sx={{ p: isSmall ? 1 : 2 }}>
//           <CreateUser onClose={handleCreateUserClose} />
//         </DialogContent>
//       </Dialog>
//     </>
//   );
// };

// export default NoAutorazeMenu;





// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent
// } from "@mui/material";
// import { Close, ArrowDropDown } from "@mui/icons-material";
// import CreateUser from "./CreateUser";
// import Logo from "./Logo";

// const translations = {
//   ua: {
//     slogan: "Оренда житла по всій Україні без посередників.",
//     login: "Увійти/Зареєструватися",
//     language: "Мова",
//     currency: "Валюта",
//     listProperty: "Здати своє помешкання",
//     search: "Пошук житла",
//     conditions: "Умови оренди",
//     faq: "Часті питання",
//     blog: "Блог",
//     contact: "Зв'язатися з підтримкою",
//     registerMessage: "Для розміщення оголошення необхідно авторизуватися"
//   },
//   ru: {
//     slogan: "Аренда жилья по всей Украине без посредников.",
//     login: "Войти/Зарегистрироваться",
//     language: "Язык",
//     currency: "Валюта",
//     listProperty: "Сдать свое жилье",
//     search: "Поиск жилья",
//     conditions: "Условия аренды",
//     faq: "Частые вопросы",
//     blog: "Блог",
//     contact: "Связаться с поддержкой",
//     registerMessage: "Для размещения объявления необходимо авторизоваться"
//   }
// };

// const NoAutorazeMenu = () => {
//   // 1. Сначала определяем все refs
//   const menuRef = useRef(null);

//   // 2. Затем состояния
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   // 3. Получаем язык и функцию переключения
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];

//   // 4. Обработчики событий
//   const handleAuthClick = () => {
//     setOpenAuthModal(true);
//   };

//   const handleListPropertyClick = () => {
//     setShowAlert(true);
//     setOpenAuthModal(true);
//   };

//   const closeMenu = () => {
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   };

//   const handleClickOutside = (e) => {
//     if (menuRef.current && !menuRef.current.contains(e.target)) {
//       closeMenu();
//     }
//   };

//   // 5. Эффекты
//   useEffect(() => {
//     document.addEventListener('mousedown', handleClickOutside);
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, []);

//   return (
//     <>
//       <Box
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           bgcolor: 'rgba(0,0,0,0.5)',
//           zIndex: 1300,
//           display: 'flex',
//           justifyContent: 'flex-end'
//         }}
//       >
//         <Paper
//           ref={menuRef}
//           sx={{
//             width: 300,
//             height: '100%',
//             bgcolor: '#ffffff',
//             borderRadius: 0,
//             boxShadow: 'none'
//           }}
//         >
//           {/* Шапка меню */}
//           <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               {/* <Typography variant="h6" sx={{ fontWeight: 700, color: '#0000FF' }}>
//                 NaDoby.com.ua
//               </Typography> */}
//               <Logo/>
//               <IconButton onClick={closeMenu}>
//                 <Close sx={{ color: '#718096' }} />
//               </IconButton>
//             </Box>
//             <Typography sx={{
//              mt: 1,
//              color: '#1a365d',
//              fontSize: '1rem',
//              fontStyle: 'italic',
            
//              textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
//               }}>
//               {t.slogan}
//             </Typography>
//           </Box>

//           {/* Основное меню */}
//           <List sx={{ py: 0 }}>
//             <ListItem 
//               component="div"
//               onClick={handleAuthClick}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.login} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//             </ListItem>

//             <ListItem 
//     component="div"
//     onClick={() => {}} // Добавьте обработчик клика при необходимости
//     sx={{ 
//       px: 3, 
//       py: 1.5,
//       color: '#0000FF',
//       '&:hover': {
//         backgroundColor: '#f5f5f5'
//       }
//     }}
//   >
//     <ListItemText 
//       primary={t.search} 
//       primaryTypographyProps={{ fontWeight: 500 }}
//     />
//   </ListItem>

//   <ListItem 
//     component="div"
//     onClick={handleListPropertyClick}
//     sx={{ 
//       px: 3, 
//       py: 1.5,
//       color: '#0000FF',
//       '&:hover': {
//         backgroundColor: '#f5f5f5'
//       }
//     }}
//   >
//     <ListItemText 
//       primary={t.listProperty} 
//       primaryTypographyProps={{ fontWeight: 500 }}
//     />
//   </ListItem>

//             <Divider sx={{ my: 1 }} />

//             <ListItem 
//               component="div"
//               onClick={() => setOpenLanguage(!openLanguage)}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.language} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//               <ArrowDropDown sx={{ color: '#0000FF' }} />
//             </ListItem>

//             <Collapse in={openLanguage}>
//               <Box sx={{ bgcolor: '#f8f9fa' }}>
//                 <MenuItem 
//                   onClick={() => onLanguageToggle('ua')}
//                   sx={{ px: 4, py: 1.5, color: '#0000FF' }}
//                 >
//                   UA
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => onLanguageToggle('ru')}
//                   sx={{ px: 4, py: 1.5, color: '#0000FF' }}
//                 >
//                   RU
//                 </MenuItem>
//               </Box>
//             </Collapse>

//             <ListItem 
//               component="div"
//               onClick={() => setOpenCurrency(!openCurrency)}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.currency} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//               <ArrowDropDown sx={{ color: '#0000FF' }} />
//             </ListItem>

//             <Collapse in={openCurrency}>
//               <Box sx={{ bgcolor: '#f8f9fa' }}>
//                 <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>USD</MenuItem>
//                 <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>EUR</MenuItem>
//                 <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>UAH</MenuItem>
//               </Box>
//             </Collapse>

//             <Divider sx={{ my: 1 }} />

          

//             {[t.conditions, t.faq, t.blog, t.contact].map((item) => (
//   <ListItem 
//     component="div"
//     key={item}
//     onClick={() => {}}
//     sx={{ 
//       px: 3, 
//       py: 1.5,
//       color: '#0000FF',
//       '&:hover': {
//         backgroundColor: '#f5f5f5'
//       }
//     }}
//   >
//     <ListItemText 
//       primary={item} 
//       primaryTypographyProps={{ fontWeight: 500 }}
//     />
//   </ListItem>
// ))}
//           </List>
//         </Paper>
//       </Box>

//       <Dialog
//         open={openAuthModal}
//         onClose={() => setOpenAuthModal(false)}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogContent>
//           <CreateUser onClose={() => setOpenAuthModal(false)} />
//         </DialogContent>
//       </Dialog>

//       <Snackbar
//         open={showAlert}
//         autoHideDuration={6000}
//         onClose={() => setShowAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setShowAlert(false)} severity="info">
//           {t.registerMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default NoAutorazeMenu;







// "use client";
// import React, { useState, useRef, useEffect } from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent
// } from "@mui/material";
// import { Close, ArrowDropDown } from "@mui/icons-material";
// import CreateUser from "./CreateUser";
// import Logo from "./Logo";

// const translations = {
//   ua: {
//     slogan: "Оренда житла по всій Україні без посередників.",
//     login: "Увійти/Зареєструватися",
//     language: "Мова",
//     currency: "Валюта",
//     listProperty: "Здати своє помешкання",
//     search: "Пошук житла",
//     conditions: "Умови оренди",
//     faq: "Часті питання",
//     blog: "Блог",
//     contact: "Зв'язатися з підтримкою",
//     registerMessage: "Для розміщення оголошення необхідно авторизуватися"
//   },
//   ru: {
//     slogan: "Аренда жилья по всей Украине без посредников.",
//     login: "Войти/Зарегистрироваться",
//     language: "Язык",
//     currency: "Валюта",
//     listProperty: "Сдать свое жилье",
//     search: "Поиск жилья",
//     conditions: "Условия аренды",
//     faq: "Частые вопросы",
//     blog: "Блог",
//     contact: "Связаться с поддержкой",
//     registerMessage: "Для размещения объявления необходимо авторизоваться"
//   }
// };

// const NoAutorazeMenu = () => {
//   const menuRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);

//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];

//   const handleAuthClick = () => {
//     setOpenAuthModal(true);
//     handleCloseMenu();
//   };

//   const handleListPropertyClick = () => {
//     setShowAlert(true);
//     setOpenAuthModal(true);
//     handleCloseMenu();
//   };

//   const handleCloseMenu = () => {
//     setIsMenuOpen(false);
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   };

//   const handleClickOutside = (e) => {
//     if (menuRef.current && !menuRef.current.contains(e.target)) {
//       handleCloseMenu();
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isMenuOpen]);

//   if (!isMenuOpen) return null;

//   return (
//     <>
//       <Box
//         sx={{
//           position: 'fixed',
//           top: 0,
//           left: 0,
//           width: '100vw',
//           height: '100vh',
//           bgcolor: 'rgba(0,0,0,0.5)',
//           zIndex: 1300,
//           display: 'flex',
//           justifyContent: 'flex-end'
//         }}
//         onClick={handleCloseMenu}
//       >
//         <Paper
//           ref={menuRef}
//           sx={{
//             width: 300,
//             height: '100%',
//             bgcolor: '#ffffff',
//             borderRadius: 0,
//             boxShadow: 'none'
//           }}
//           onClick={(e) => e.stopPropagation()}
//         >
//           <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
//             <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//               <Logo />
//               <IconButton onClick={handleCloseMenu}>
//                 <Close sx={{ color: '#718096' }} />
//               </IconButton>
//             </Box>
//             <Typography sx={{
//               mt: 1,
//               color: '#1a365d',
//               fontSize: '1rem',
//               fontStyle: 'italic',
//               textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
//             }}>
//               {t.slogan}
//             </Typography>
//           </Box>

//           <List sx={{ py: 0 }}>
//             <ListItem 
//               component="div"
//               onClick={handleAuthClick}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.login} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//             </ListItem>

//             <ListItem 
//               component="div"
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.search} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//             </ListItem>

//             <ListItem 
//               component="div"
//               onClick={handleListPropertyClick}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.listProperty} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//             </ListItem>

//             <Divider sx={{ my: 1 }} />

//             <ListItem 
//               component="div"
//               onClick={() => setOpenLanguage(!openLanguage)}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.language} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//               <ArrowDropDown sx={{ color: '#0000FF' }} />
//             </ListItem>

//             <Collapse in={openLanguage}>
//               <Box sx={{ bgcolor: '#f8f9fa' }}>
//                 <MenuItem 
//                   onClick={() => onLanguageToggle('ua')}
//                   sx={{ px: 4, py: 1.5, color: '#0000FF' }}
//                 >
//                   UA
//                 </MenuItem>
//                 <MenuItem 
//                   onClick={() => onLanguageToggle('ru')}
//                   sx={{ px: 4, py: 1.5, color: '#0000FF' }}
//                 >
//                   RU
//                 </MenuItem>
//               </Box>
//             </Collapse>

//             <ListItem 
//               component="div"
//               onClick={() => setOpenCurrency(!openCurrency)}
//               sx={{ 
//                 px: 3, 
//                 py: 1.5,
//                 color: '#0000FF',
//                 '&:hover': {
//                   backgroundColor: '#f5f5f5'
//                 }
//               }}
//             >
//               <ListItemText 
//                 primary={t.currency} 
//                 primaryTypographyProps={{ fontWeight: 500 }}
//               />
//               <ArrowDropDown sx={{ color: '#0000FF' }} />
//             </ListItem>

//             <Collapse in={openCurrency}>
//               <Box sx={{ bgcolor: '#f8f9fa' }}>
//                 <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>USD</MenuItem>
//                 <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>EUR</MenuItem>
//                 <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>UAH</MenuItem>
//               </Box>
//             </Collapse>

//             <Divider sx={{ my: 1 }} />

//             {[t.conditions, t.faq, t.blog, t.contact].map((item) => (
//               <ListItem 
//                 component="div"
//                 key={item}
//                 sx={{ 
//                   px: 3, 
//                   py: 1.5,
//                   color: '#0000FF',
//                   '&:hover': {
//                     backgroundColor: '#f5f5f5'
//                   }
//                 }}
//               >
//                 <ListItemText 
//                   primary={item} 
//                   primaryTypographyProps={{ fontWeight: 500 }}
//                 />
//               </ListItem>
//             ))}
//           </List>
//         </Paper>
//       </Box>

//       <Dialog
//         open={openAuthModal}
//         onClose={() => setOpenAuthModal(false)}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogContent>
//           <CreateUser onClose={() => setOpenAuthModal(false)} />
//         </DialogContent>
//       </Dialog>

//       <Snackbar
//         open={showAlert}
//         autoHideDuration={6000}
//         onClose={() => setShowAlert(false)}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={() => setShowAlert(false)} severity="info">
//           {t.registerMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default NoAutorazeMenu;








"use client";
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  MenuItem,
  Typography,
  Box,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogContent
} from "@mui/material";
import { Close, ArrowDropDown } from "@mui/icons-material";
import CreateUser from "./CreateUser";
import Logo from "./Logo";

const translations = {
  ua: {
    slogan: "Оренда житла по всій Україні без посередників.",
    login: "Увійти/Зареєструватися",
    language: "Мова",
    currency: "Валюта",
    listProperty: "Здати своє помешкання",
    search: "Пошук житла",
    conditions: "Умови оренди",
    blog: "Блог",
    contact: "Зв'язатися з підтримкою",
    registerMessage: "Для розміщення оголошення необхідно авторизуватися"
  },
  ru: {
    slogan: "Аренда жилья по всей Украине без посредников.",
    login: "Войти/Зарегистрироваться",
    language: "Язык",
    currency: "Валюта",
    listProperty: "Сдать свое жилье",
    search: "Поиск жилья",
    conditions: "Условия аренды",
    blog: "Блог",
    contact: "Связаться с поддержкой",
    registerMessage: "Для размещения объявления необходимо авторизоваться"
  }
};

const NoAutorazeMenu = () => {
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { currentLanguage, onLanguageToggle } = useLanguage();
  const t = translations[currentLanguage];

  const handleAuthClick = (e) => {
    e.stopPropagation();
    setOpenAuthModal(true);
  };

  const handleListPropertyClick = (e) => {
    e.stopPropagation();
    setOpenAuthModal(true);
    setShowAlert(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenLanguage(false);
    setOpenCurrency(false);
  };

  const handleClickOutside = (e) => {
    // Если клик вне меню и вне модального окна
    if (
      menuRef.current && 
      !menuRef.current.contains(e.target) &&
      (!modalRef.current || !modalRef.current.contains(e.target))
    ) {
      closeMenu();
      setOpenAuthModal(false);
      setShowAlert(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen || openAuthModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, openAuthModal]);

  if (!isMenuOpen && !openAuthModal) return null;

  return (
    <>
      {(isMenuOpen || openAuthModal) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          {isMenuOpen && (
            <Paper
              ref={menuRef}
              sx={{
                width: 300,
                height: '100%',
                bgcolor: '#ffffff',
                borderRadius: 0,
                boxShadow: 'none'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                  <Logo />
                  <IconButton onClick={closeMenu}>
                    <Close sx={{ color: '#718096' }} />
                  </IconButton>
                </Box>
                <Typography sx={{
                  mt: 1,
                  color: '#1a365d',
                  fontSize: '1rem',
                  fontStyle: 'italic',
                  textShadow: '0px 1px 1px rgba(0,0,0,0.1)'
                }}>
                  {t.slogan}
                </Typography>
              </Box>

              <List sx={{ py: 0 }}>
                <ListItem 
                  component="div"
                  onClick={handleAuthClick}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.login} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <ListItem 
                  component="div"
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.search} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <ListItem 
                  component="div"
                  onClick={handleListPropertyClick}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.listProperty} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem 
                  component="div"
                  onClick={() => setOpenLanguage(!openLanguage)}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.language} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <ArrowDropDown sx={{ color: '#0000FF' }} />
                </ListItem>

                <Collapse in={openLanguage}>
                  <Box sx={{ bgcolor: '#f8f9fa' }}>
                    <MenuItem 
                      onClick={() => onLanguageToggle('ua')}
                      sx={{ px: 4, py: 1.5, color: '#0000FF' }}
                    >
                      UA
                    </MenuItem>
                    <MenuItem 
                      onClick={() => onLanguageToggle('ru')}
                      sx={{ px: 4, py: 1.5, color: '#0000FF' }}
                    >
                      RU
                    </MenuItem>
                  </Box>
                </Collapse>

                <ListItem 
                  component="div"
                  onClick={() => setOpenCurrency(!openCurrency)}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.currency} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <ArrowDropDown sx={{ color: '#0000FF' }} />
                </ListItem>

                <Collapse in={openCurrency}>
                  <Box sx={{ bgcolor: '#f8f9fa' }}>
                    <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>USD</MenuItem>
                    <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>EUR</MenuItem>
                    <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF' }}>UAH</MenuItem>
                  </Box>
                </Collapse>

                <Divider sx={{ my: 1 }} />

                {[t.conditions, t.blog, t.contact].map((item) => (
                  <ListItem 
                    component="div"
                    key={item}
                    sx={{ 
                      px: 3, 
                      py: 1.5,
                      color: '#0000FF',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item} 
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      )}

      <Dialog
        open={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setShowAlert(false);
        }}
        fullWidth
        maxWidth="xs"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogContent>
          <CreateUser 
            onClose={() => {
              setOpenAuthModal(false);
              setShowAlert(false);
            }} 
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="info">
          {t.registerMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NoAutorazeMenu;







