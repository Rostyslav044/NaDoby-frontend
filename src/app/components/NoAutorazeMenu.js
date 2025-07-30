



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
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  useMediaQuery,
  useTheme,
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

  const theme = useTheme();
  const isSmall = useMediaQuery(theme.breakpoints.down('sm'));

  const handleCloseMenu = () => setIsMenuOpen(false);

  // const handleCreateUserOpen = () => {
  //   setIsAlertOpen(true);
  //   setIsCreateUserOpen(true);
  //   handleCloseMenu();
  // };

// ✅ Только открывает модалку (для "Увійти / Зареєструватися")
const handleLoginClick = () => {
  setIsCreateUserOpen(true);
  handleCloseMenu();
};

// ✅ Показывает и алерт, и модалку (для "Здати своє помешкання")
const handleListYourPropertyClick = () => {
  setIsAlertOpen(true);
  setIsCreateUserOpen(true);
  handleCloseMenu();
};



  const handleCreateUserClose = () => setIsCreateUserOpen(false);

  const handleAlertClose = (e, reason) => {
    if (reason === 'clickaway') return;
    setIsAlertOpen(false);
  };

  const handleClickOutside = e => {
    if (menuRef.current && !menuRef.current.contains(e.target)) {
      setIsMenuOpen(false);
      setIsLanguageMenuOpen(false);
      setIsCurrencyMenuOpen(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen) document.addEventListener('mousedown', handleClickOutside);
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen]);

  return (
    <>
      <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
        <Box sx={{ width: 300 }} ref={menuRef}>
          <Box className={styles.menuHeader} sx={{ display: 'flex', alignItems: 'center', justifyContent: 'space-between', p: 2 }}>
            <Logo />
            <IconButton onClick={handleCloseMenu}><Close /></IconButton>
          </Box>

          <Typography sx={{ p: 2, color: 'blue' }}>{t.slogan}</Typography>

          <List>
            {/* <ListItem  onClick={handleCreateUserOpen}>
              <ListItemText primary={<Typography color="primary">{t.login}</Typography>} />
            </ListItem> */}

{/* Увійти / Зареєструватися — без алерта */}
<ListItem onClick={handleLoginClick}>
  <ListItemText primary={<Typography color="primary">{t.login}</Typography>} />
</ListItem>

            <ListItem  onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
              <ListItemText primary={<Typography color="primary">{t.language}</Typography>} />
              <ArrowDropDown />
            </ListItem>
            <Collapse in={isLanguageMenuOpen}>
              <List>
                <MenuItem onClick={() => onLanguageToggle('ua')}>UA</MenuItem>
                <MenuItem onClick={() => onLanguageToggle('ru')}>RU</MenuItem>
              </List>
            </Collapse>

            <ListItem  onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}>
              <ListItemText primary={<Typography color="primary">{t.currency}</Typography>} />
              <ArrowDropDown />
            </ListItem>
            <Collapse in={isCurrencyMenuOpen}>
              <List>
                <MenuItem>USD</MenuItem>
                <MenuItem>EUR</MenuItem>
                <MenuItem>UAH</MenuItem>
              </List>
            </Collapse>

            {/* <ListItem  onClick={handleCreateUserOpen}>
              <Box sx={{ width: '100%', textAlign: 'center', typography: 'h6', color: 'primary.main', p: 1, boxShadow: 1, borderRadius: 1, '&:hover': { boxShadow: 3 } }}>
                {t.listYourProperty}
              </Box>
            </ListItem> */}

{/* Здати своє помешкання — с алертом */}
<ListItem onClick={handleListYourPropertyClick}>
  <ListItemText primary={<Typography color="primary">{t.listYourProperty}</Typography>} />
</ListItem>


            {[
              t.housingSearch,
              t.rentalConditions,
              t.faq,
              t.blog,
              t.contact,
            ].map(text => (
              <ListItem  key={text}>
                <ListItemText primary={<Typography color="primary">{text}</Typography>} />
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
        sx={{ mt: '10vh', zIndex: 1400 }}
        action={<IconButton size="small" aria-label="close" color="inherit" onClick={handleAlertClose}><Close fontSize="small"/></IconButton>}
      >
        <Alert onClose={handleAlertClose} severity="info" sx={{ width: '100%' }}>
          {t.registerMessage}
        </Alert>
      </Snackbar>

      <Dialog
        open={isCreateUserOpen}
        onClose={handleCreateUserClose}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            m: 0,
            p: 0,
            bgcolor: 'background.paper',
          }
        }}
      >
        <DialogContent sx={{ p: isSmall ? 1 : 2 }}>
          <CreateUser onClose={handleCreateUserClose} />
        </DialogContent>
      </Dialog>
    </>
  );
};

export default NoAutorazeMenu;
