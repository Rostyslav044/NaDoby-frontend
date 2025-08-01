




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
//     profile: "Мій Профіль",
//     myListings: "Мої оголошення",
//     rentOut: "Зареєструвати  помешкання",
//     searchHome: "Пошук житла",
//     language: "Мова",
//     currency: "Валюта",
//     favorites: "Обране",
//     logout: "Вийти",
//     aboutPlatform: "Про платформу NaDoby.com.ua",
//     contactSupport: "Зв'язатися з підтримкою",
//     blog: "Блог",
//   },
//   ru: {
//     profile: "Мой Профиль",
//     myListings: "Мои объявления",
//     rentOut: "Зарегистрировать  жильё",
//     searchHome: "Поиск жилья",
//     language: "Язык",
//     currency: "Валюта",
//     favorites: "Избранное",
//     logout: "Выйти",
//     aboutPlatform: "О платформе NaDoby.com.ua",
//     contactSupport: "Связаться с поддержкой",
//     blog: "Блог",
//   },
// };

// const UserMenu = () => {
//   const [isOpen, setIsOpen] = useState(true);
//   const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
//   const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];
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
//             <CloseIcon />
//           </IconButton>
//         </Box>

//         <List disablePadding sx={{ mt: 2 }}>
//           <Link href="/my-profile" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.profile} />
//             </ListItem>
//           </Link>

//           <Link href="/my-listings" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.myListings} />
//             </ListItem>
//           </Link>

//           <Link href="/add-apartment" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.rentOut} />
//             </ListItem>
//           </Link>

//           <Link href="/search-apartment" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.searchHome} />
//             </ListItem>
//           </Link>

//           <ListItem
//             onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}
//             component="div"
//             disablePadding
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             <ListItemText primary={t.language} sx={{ color: "blue" }} />
//             <ArrowDropDown />
//           </ListItem>

//           <Collapse in={isLanguageMenuOpen}>
//             <List disablePadding>
//               <MenuItem onClick={() => handleLanguageToggle("ua")}>UA</MenuItem>
//               <MenuItem onClick={() => handleLanguageToggle("ru")}>RU</MenuItem>
//             </List>
//           </Collapse>

//           <ListItem
//             onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}
//             component="div"
//             disablePadding
//             sx={{
//               px: 3,
//               display: "flex",
//               justifyContent: "space-between",
//               alignItems: "center",
//               cursor: "pointer",
//             }}
//           >
//             <ListItemText primary={t.currency} sx={{ color: "blue" }} />
//             <ArrowDropDown />
//           </ListItem>

//           <Collapse in={isCurrencyMenuOpen}>
//             <List disablePadding>
//               <MenuItem onClick={() => handleCurrencyToggle("USD")}>USD</MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("EUR")}>EUR</MenuItem>
//               <MenuItem onClick={() => handleCurrencyToggle("UAH")}>UAH</MenuItem>
//             </List>
//           </Collapse>

//           <Link href="/favorites" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.favorites} />
//             </ListItem>
//           </Link>

//           <Divider />

//           <Link href="/about-platform" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.aboutPlatform} />
//             </ListItem>
//           </Link>

//           <Link href="/contact" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.contactSupport} />
//             </ListItem>
//           </Link>

//           <Link href="/blog" passHref legacyBehavior>
//             <ListItem component="a" sx={{ px: 3 }}>
//               <ListItemText primary={t.blog} />
//             </ListItem>
//           </Link>

//           <ListItem
//             onClick={handleLogout}
//             component="div"
//             disablePadding
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
    rentOut: "Зареєструвати помешкання",
    searchHome: "Пошук житла",
    language: "Мова",
    currency: "Валюта",
    favorites: "Обране",
    logout: "Вийти",
    rentalTerms: "Умови оренди",
    contactSupport: "Зв'язатися з підтримкою",
    blog: "Блог",
  },
  ru: {
    profile: "Мой Профиль",
    myListings: "Мои объявления",
    rentOut: "Зарегистрировать жильё",
    searchHome: "Поиск жилья",
    language: "Язык",
    currency: "Валюта",
    favorites: "Избранное",
    logout: "Выйти",
    rentalTerms: "Условия арены",
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
            borderBottom: "1px solid #f0f0f0",
            pb: 2,
          }}
        >
          <Logo />
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon sx={{ color: "#718096" }} />
          </IconButton>
        </Box>

        <List disablePadding sx={{ flex: 1 }}>
          {/* {[
            { text: t.profile, href: "/my-profile" },
            { text: t.myListings, href: "/my-listings" },
            { text: t.rentOut, href: "/add-apartment" },
            { text: t.searchHome, href: "/search-apartment" },
          ].map((item) => (
            <Link href={item.href} passHref legacyBehavior key={item.text}>
              <ListItem component="a" sx={{ px: 3 }}>
                <ListItemText 
                  primary={item.text} 
                  primaryTypographyProps={{ 
                    color: "#0000FF",
                    fontWeight: 500 
                  }} 
                /> */}
              {/* </ListItem>
            </Link>
          ))} */}


{[
  { text: t.profile, href: "/my-profile" },
  { text: t.myListings, href: "/my-listings" },
  { text: t.rentOut, href: "/add-apartment" },
  { text: t.searchHome, href: "/search-apartment" },
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

{/* Добавляем "Обране" сразу после "Пошук житла" */}
<Link href="/favorites" passHref legacyBehavior>
  <ListItem component="a" sx={{ px: 3 }}>
    <ListItemText 
      primary={t.favorites} 
      primaryTypographyProps={{ 
        color: "#0000FF",
        fontWeight: 500 
      }} 
    />
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
              <MenuItem sx={{ px: 4, color: "#0000FF" }}>USD</MenuItem>
              <MenuItem sx={{ px: 4, color: "#0000FF" }}>EUR</MenuItem>
              <MenuItem sx={{ px: 4, color: "#0000FF" }}>UAH</MenuItem>
            </Box>
          </Collapse>

          {/* <Link href="/favorites" passHref legacyBehavior>
            <ListItem component="a" sx={{ px: 3 }}>
              <ListItemText 
                primary={t.favorites} 
                primaryTypographyProps={{ 
                  color: "#0000FF",
                  fontWeight: 500 
                }} 
              />
            </ListItem>
          </Link> */}

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





