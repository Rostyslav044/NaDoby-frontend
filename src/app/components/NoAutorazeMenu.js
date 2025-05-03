

"use client";
import React, { useState, useRef, useEffect } from "react";
import Image from "next/image";
import Link from "next/link";
import { useLanguage } from "@/app/LanguageContext";
import { Drawer, List, ListItem, ListItemText, IconButton, Collapse, MenuItem, Typography, Box, Modal } from "@mui/material";
import { Close, ArrowDropDown } from "@mui/icons-material";
import CreateUser from "./CreateUser"; // Импортируем компонент CreateUser
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
    listYourProperty: "Здати своє помешкання.",
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
    contact: "Связаться с потдержкой",
    listYourProperty: "Сдать свое жилье.",
  },
};

const NoAutorazeMenu = () => {
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [isLanguageMenuOpen, setIsLanguageMenuOpen] = useState(false);
  const [isCurrencyMenuOpen, setIsCurrencyMenuOpen] = useState(false);
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false); // Состояние для компонента CreateUser
  const menuRef = useRef(null);
  const { currentLanguage, onLanguageToggle } = useLanguage();

  const handleCloseMenu = () => setIsMenuOpen(false);
  const handleCreateUserOpen = () => {
    setIsCreateUserOpen(true); // Открываем компонент CreateUser
    handleCloseMenu(); // Закрываем меню при открытии CreateUser
  };
  const handleCreateUserClose = () => setIsCreateUserOpen(false); // Закрываем компонент CreateUser

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
    } else {
      document.removeEventListener("mousedown", handleClickOutside);
    }
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [isMenuOpen]);

  const translation = translations[currentLanguage];

  return (
    <>
      {/* Меню */}
      <Drawer anchor="right" open={isMenuOpen} onClose={handleCloseMenu}>
        <Box sx={{ width: 300 }} role="presentation" ref={menuRef}>
          <Box className={styles.menuHeader} sx={{ display: "flex", alignItems: "center", justifyContent: "space-between" }}>
            <Typography variant="h6" className={styles.name}>
            <span style={{ color: "blue", marginLeft:"10%", }}>NaDoby.com</span>
            </Typography>
            <IconButton onClick={handleCloseMenu}>
              <Close />
            </IconButton>
          </Box>

          <Typography variant="body1" sx={{ p: 2, color: "blue" }}>{translation.slogan}</Typography>

          <List>
            {/* Кнопка для открытия CreateUser */}
            <ListItem button onClick={handleCreateUserOpen}>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.login}</span>} />
            </ListItem>

            {/* Выбор языка */}
            <ListItem button onClick={() => setIsLanguageMenuOpen(!isLanguageMenuOpen)}>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.language}</span>} />
              <ArrowDropDown />
            </ListItem>
            <Collapse in={isLanguageMenuOpen}>
              <List>
                <MenuItem onClick={() => onLanguageToggle("ua")}>UA</MenuItem>
                <MenuItem onClick={() => onLanguageToggle("ru")}>RU</MenuItem>
              </List>
            </Collapse>

            {/* Выбор валюты */}
            <ListItem button onClick={() => setIsCurrencyMenuOpen(!isCurrencyMenuOpen)}>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.currency}</span>} />
              <ArrowDropDown />
            </ListItem>
            <Collapse in={isCurrencyMenuOpen}>
              <List>
                <MenuItem>USD</MenuItem>
                <MenuItem>EUR</MenuItem>
                <MenuItem>UAH</MenuItem>
              </List>
            </Collapse>

            {/* Остальные пункты меню */}
            <ListItem button>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.housingSearch}</span>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.rentalConditions}</span>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.faq}</span>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.blog}</span>} />
            </ListItem>
            <ListItem button>
              <ListItemText primary={<span style={{ color: "blue" }}>{translation.contact}</span>} />
            </ListItem>
          </List>

          {/* Ссылка для добавления жилья без подчеркивания */}
          <Box sx={{ p: 2 }}>
            <Link href="/add-apartment" style={{ textDecoration: "none" }}>
              <Typography variant="body2" color="primary" style={{ color: "blue" }}>
                {translation.listYourProperty}
              </Typography>
            </Link>
          </Box>
        </Box>
      </Drawer>

      {/* Модальное окно для CreateUser с затемнённым фоном */}
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

