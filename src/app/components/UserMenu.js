

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
  Typography,
} from "@mui/material";
import CloseIcon from "@mui/icons-material/Close";
import { ArrowDropDown } from "@mui/icons-material";
import { useLanguage } from "@/app/LanguageContext";
import { logout } from "../store/authSlice";
import { useDispatch } from "react-redux";

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
            // borderBottom: "1px solid #f0f0f0",
            // pb: 2,
          }}
        >
          <Logo />
          <IconButton onClick={() => setIsOpen(false)}>
            <CloseIcon sx={{ color: "#718096" }} />
          </IconButton>
        </Box>

        <Box sx={{ mt: 1,pb: 2, }}>
  <Typography sx={{
    color: '#1a365d', // Темно-синий
    fontSize: '0.98rem',
    fontWeight: 600,
    paddingLeft:'20px',
    // lineHeight: 1.2
    paddingTop: '15px',
  }}>
    {t.sloganLine1}
  </Typography>
  <Typography sx={{
    color: '#e53e3e', // Ярко-красный
    fontSize: '0.90rem',
    fontWeight: 600,
    lineHeight: 1.3,
    mt: 0.5,
    fontStyle: 'italic',
    paddingLeft:'20px',
  }}>
    {t.sloganLine2}
  </Typography>
</Box>
  
<Divider sx={{ my: 1 }} />

        <List disablePadding sx={{ flex: 1 }}>
      
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





