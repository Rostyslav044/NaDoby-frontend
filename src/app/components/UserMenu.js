


// "use client";

// import React, { useState } from "react";
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
// } from "@mui/material";
// import CloseIcon from "@mui/icons-material/Close";
// import { ArrowDropDown } from "@mui/icons-material";

// import { useLanguage } from "@/app/LanguageContext";
// import { logout } from "../store/authSlice";
// import { useDispatch } from "react-redux";

// const translations = {
//   ua: {
//     nameUser:"",
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Зареєструвати своє помешкання",
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
//     nameUser:"",
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Зарегистрировать своё жильё",
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
//         {/* Заголовок с логотипом и крестиком */}
//         <Box
//           sx={{
//             display: "flex",
//             alignItems: "center",
//             justifyContent: "space-between",
//             px: 2,
//             pt: 2,
//           }}
//         >
//           {/* <h1
//             style={{
//               fontSize: "26px",
//               fontWeight: "bold",
//               color: "#1976d2",
//               fontFamily: "'Segoe UI', Tahoma, Geneva, Verdana, sans-serif",
//               letterSpacing: "1.2px",
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
//           <IconButton onClick={() => setIsOpen(false)}>
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <List disablePadding sx={{ mt: 2 }}>
//           {/* <ListItem button component={Link} href="/profile" sx={{ px: 3 }}>
//             <ListItemText primary={t.profile} />
//           </ListItem> */}

// <Link href="/profile" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.profile} />
//   </ListItem>
// </Link>


//           {/* <ListItem button component={Link} href="/my-listings" sx={{ px: 3 }}>
//             <ListItemText primary={t.myListings} />
//           </ListItem> */}

// <Link href="/my-listings" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.mylistings} />
//   </ListItem>
// </Link>


//           {/* <ListItem button component={Link} href="/add-apartment" sx={{ px: 3 }}>
//             <ListItemText primary={t.rentOut} />
//           </ListItem> */}


// <Link href="/add-apartment" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.rentOut} />
//   </ListItem>
// </Link>

//           {/* <ListItem button component={Link} href="/search" sx={{ px: 3 }}>
//             <ListItemText primary={t.searchHome} />
//           </ListItem> */}

// <Link href="/search" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.search} />
//   </ListItem>
// </Link>  

//           {/* <ListItem
//             button
//             onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//             >
//             <ListItemText primary={t.language} sx={{ color: "blue" }} />
//             <ArrowDropDown />
//             </ListItem>
//              <Collapse in={isLanguageMenuOpen}>
//             <List>
//               <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
//               <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
//             </List>
//             </Collapse>

//             <ListItem
//             button
//             onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//             }}
//             >
//             <ListItemText primary={t.currency} sx={{ color: "blue" }} />
//             <ArrowDropDown />
//           </ListItem> */}


// <ListItem
//   onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//   component="div"
//   disablePadding
//   sx={{
//     px: 3,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     cursor: "pointer",
//   }}
// >
//   <ListItemText primary={t.language} sx={{ color: "blue" }} />
//   <ArrowDropDown />
// </ListItem>

// <Collapse in={isLanguageMenuOpen}>
//   <List disablePadding>
//     <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
//     <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
//   </List>
// </Collapse>

// <ListItem
//   onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//   component="div"
//   disablePadding
//   sx={{
//     px: 3,
//     display: "flex",
//     justifyContent: "space-between",
//     alignItems: "center",
//     cursor: "pointer",
//   }}
// >
//   <ListItemText primary={t.currency} sx={{ color: "blue" }} />
//   <ArrowDropDown />
// </ListItem>



//           <Collapse in={isCurrencyMenuOpen}>
//             <List>
//               <MenuItem onClick={() => handleCurrencyToggle("USD")}>USD</MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("EUR")}>EUR</MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("UAH")}>UAH</MenuItem>
//             </List>
//           </Collapse>

//           {/* <ListItem button component={Link} href="/favorites" sx={{ px: 3 }}>
//             <ListItemText primary={t.favorites} />
//           </ListItem> */}

// <Link href="/favorites" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.favorites} />
//   </ListItem>
// </Link>  

//           <Divider />

//           {/* <ListItem button component={Link} href="/about" sx={{ px: 3 }}>
//             <ListItemText primary={t.aboutPlatform} />
//           </ListItem> */}

// <Link href="/about" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.about} />
//   </ListItem>
// </Link>  

//           {/* <ListItem button component={Link} href="/contact" sx={{ px: 3 }}>
//             <ListItemText primary={t.contactSupport} />
//           </ListItem> */}

// <Link href="/contact" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.contact} />
//   </ListItem>
// </Link>  


//           {/* <ListItem button component={Link} href="/blog" sx={{ px: 3 }}>
//             <ListItemText primary={t.blog} />
//           </ListItem> */}

// <Link href="/blog" passHref legacyBehavior>
//   <ListItem button component="a" sx={{ px: 3 }}>
//     <ListItemText primary={t.blog} />
//   </ListItem>
// </Link>  

//           {/* <ListItem
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
//             >
//             <ListItemText primary={t.logout} />
//           </ListItem> */}

// <ListItem
//   onClick={handleLogout}
//   component="div"
//   disablePadding
//   sx={{
//     px: 3,
//     color: "error.main",
//     cursor: "pointer",
//     "&:hover": {
//       bgcolor: "error.light",
//       color: "error.contrastText",
//     },
//   }}
// >
//   <ListItemText primary={t.logout} />
// </ListItem>


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
    rentOut: "Зареєструвати своє помешкання",
    searchHome: "Пошук житла",
    language: "Мова",
    currency: "Валюта",
    // favorites: "Обране",
    logout: "Вийти",
    aboutPlatform: "Про платформу NaDoby.com",
    contactSupport: "Зв'язатися з підтримкою",
    blog: "Блог",
  },
  ru: {
    profile: "Мой Профиль",
    myListings: "Мои объявления",
    rentOut: "Зарегистрировать своё жильё",
    searchHome: "Поиск жилья",
    language: "Язык",
    currency: "Валюта",
    // favorites: "Избранное",
    logout: "Выйти",
    aboutPlatform: "О платформе NaDoby.com",
    contactSupport: "Связаться с поддержкой",
    blog: "Блог",
  },
};

const UserMenu = () => {
  const [isOpen, setIsOpen] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const { currentLanguage, onLanguageToggle } = useLanguage();
  const t = translations[currentLanguage];
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
            <CloseIcon />
          </IconButton>
        </Box>

        <List disablePadding sx={{ mt: 2 }}>
          <Link href="/profile" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.profile} />
            </ListItem>
          </Link>

          <Link href="/my-listings" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.myListings} />
            </ListItem>
          </Link>

          <Link href="/add-apartment" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.rentOut} />
            </ListItem>
          </Link>

          <Link href="/search" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.searchHome} />
            </ListItem>
          </Link>

          <ListItem
            onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
            component="div"
            disablePadding
            sx={{
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <ListItemText primary={t.language} sx={{ color: "blue" }} />
            <ArrowDropDown />
          </ListItem>

          <Collapse in={isLanguageMenuOpen}>
            <List disablePadding>
              <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
              <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
            </List>
          </Collapse>

          <ListItem
            onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
            component="div"
            disablePadding
            sx={{
              px: 3,
              display: "flex",
              justifyContent: "space-between",
              alignItems: "center",
              cursor: "pointer",
            }}
          >
            <ListItemText primary={t.currency} sx={{ color: "blue" }} />
            <ArrowDropDown />
          </ListItem>

          <Collapse in={isCurrencyMenuOpen}>
            <List disablePadding>
              <MenuItem onClick={() => handleCurrencyToggle("USD")}>USD</MenuItem>
              <MenuItem onClick={() => handleCurrencyToggle("EUR")}>EUR</MenuItem>
              <MenuItem onClick={() => handleCurrencyToggle("UAH")}>UAH</MenuItem>
            </List>
          </Collapse>

          <Link href="/favorites" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.favorites} />
            </ListItem>
          </Link>

          <Divider />

          <Link href="/about" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.aboutPlatform} />
            </ListItem>
          </Link>

          <Link href="/contact" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.contactSupport} />
            </ListItem>
          </Link>

          <Link href="/blog" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText primary={t.blog} />
            </ListItem>
          </Link>

          <ListItem
            onClick={handleLogout}
            component="div"
            disablePadding
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
            <ListItemText primary={t.logout} />
          </ListItem>
        </List>
      </Paper>
    </Box>
  );
};

export default UserMenu;
