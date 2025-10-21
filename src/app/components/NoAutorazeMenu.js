


"use client";

import Link from 'next/link';
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
  DialogContent,
  CircularProgress,
  TextField,
  InputAdornment,
  Badge,
  DialogTitle,
  DialogActions,
  Button,
  Card,
  CardContent,
  useMediaQuery,
  useTheme
} from "@mui/material";
import { Close, ArrowDropDown, Favorite, Calculate, ContentCopy, Email, Mail } from "@mui/icons-material";
import CreateUser from "./CreateUser";
import Logo from "./Logo";
import axios from "axios";

const translations = {
  ua: {
    sloganLine1: "Оренда житла по всій Україні",
    sloganLine2: "Без посередників !",
    login: "Увійти/Зареєструватися",
    language: "Мова",
    currency: "Валюта",
    listProperty: "Розмістити оголошення",
    search: "Пошук житла",
    conditions: "Умови оренди",
    blog: "Блог",
    contact: "Зв'язатися з підтримкою",
    registerMessage: "Для розміщення оголошення необхідно авторизуватися",
    loadingRates: "Завантаження курсів...",
    currencyError: "Не вдалося завантажити курси валют",
    converter: "Конвертер валют",
    enterAmount: "Введіть суму",
    uah: "грн",
    currentRates: "Поточний курс НБУ",
    copyEmail: "Скопіювати email",
    emailCopied: "Email скопійовано в буфер обміну",
    contactInstructions: "Оберіть спосіб зв'язку з підтримкою",
    supportEmail: "support@nadoby.com.ua",
    writeGmail: "Написати через Gmail",
    writeEmailClient: "Написати через поштовий клієнт",
    cancel: "Скасувати",
  },
  ru: {
    sloganLine1: "Аренда жилья по всей Украине",
    sloganLine2: "Без посредников !",
    login: "Войти/Зарегистрироваться",
    language: "Язык",
    currency: "Валюта",
    listProperty: "Разместить объявление",
    search: "Поиск жилья",
    conditions: "Условия аренды",
    blog: "Блог",
    contact: "Связаться с поддержкой",
    registerMessage: "Для размещения объявления необходимо авторизоваться",
    loadingRates: "Загрузка курсов...",
    currencyError: "Не удалось загрузить курсы валют",
    converter: "Конвертер валют",
    enterAmount: "Введите сумму",
    uah: "грн",
    currentRates: "Текущий курс НБУ",
    copyEmail: "Скопировать email",
    emailCopied: "Email скопирован в буфер обмена",
    contactInstructions: "Выберите способ связи с поддержкой",
    supportEmail: "support@nadoby.com.ua",
    writeGmail: "Написать через Gmail",
    writeEmailClient: "Написать через почтовый клиент",
    cancel: "Отмена",
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
  const [showEmailDialog, setShowEmailDialog] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  
  // Состояния для функционала валют
  const [exchangeRates, setExchangeRates] = useState(null);
  const [loadingRates, setLoadingRates] = useState(false);
  const [currencyError, setCurrencyError] = useState(null);
  const [converterAmount, setConverterAmount] = useState("");
  const [converterResult, setConverterResult] = useState({ USD: 0, EUR: 0 });

  const { currentLanguage, onLanguageToggle } = useLanguage();
  const t = translations[currentLanguage];
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

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

  // Функция для связи с поддержкой
  const handleContactSupport = () => {
    setShowEmailDialog(true);
  };

  // Функция для открытия Gmail с предзаполненным письмом
  const openGmail = () => {
    const userInfo = "Неавторизованный пользователь";

    const subject = `Поддержка NaDoby.com.ua - Гость`;
    const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

    const gmailUrl = `https://mail.google.com/mail/?view=cm&fs=1&to=${t.supportEmail}&su=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.open(gmailUrl, '_blank', 'noopener,noreferrer');
    
    setShowEmailDialog(false);
    setIsMenuOpen(false);
  };

  // Функция для открытия почтового клиента по умолчанию
  const openDefaultEmailClient = () => {
    const userInfo = "Неавторизованный пользователь";

    const subject = `Поддержка NaDoby.com.ua - Гость`;
    const body = `Здравствуйте!\n\nМне нужна помощь по поводу:\n\n\n---\nИнформация о пользователе:\n${userInfo}\n---\n\nСообщение отправлено с сайта NaDoby.com.ua.`;

    const mailtoUrl = `mailto:${t.supportEmail}?subject=${encodeURIComponent(subject)}&body=${encodeURIComponent(body)}`;
    
    window.location.href = mailtoUrl;
    
    setShowEmailDialog(false);
    setIsMenuOpen(false);
  };

  // Функция для копирования email в буфер обмена
  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText(t.supportEmail)
      .then(() => {
        setSnackbarOpen(true);
        setShowEmailDialog(false);
        setIsMenuOpen(false);
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
        setIsMenuOpen(false);
      });
  };

  // Загружаем курсы валют при открытии меню валют
  useEffect(() => {
    if (openCurrency) {
      fetchExchangeRates();
    }
  }, [openCurrency]);

  // Обновляем результаты конвертации при изменении суммы
  useEffect(() => {
    convertCurrency(converterAmount);
  }, [converterAmount, exchangeRates]);

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
                width: isMobile ? "100%" : 300,
                height: '100%',
                bgcolor: '#ffffff',
                borderRadius: 0,
                boxShadow: 'none',
                overflow: 'auto',
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ 
                p: 3, 
                borderBottom: '1px solid #f0f0f0',
                position: 'sticky',
                top: 0,
                bgcolor: '#ffffff',
                zIndex: 1,
              }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Logo /> 
                  <IconButton onClick={closeMenu}>
                    <Close sx={{ 
                      color: '#718096',
                      }} />
                  </IconButton>
                </Box>

                <Box sx={{ mt: 1 }}>
                  <Typography sx={{
                    color: '#1a365d',
                    fontSize: '0.98rem',
                    fontWeight: 600,
                  }}>
                    {t.sloganLine1}
                  </Typography>
                  <Typography sx={{
                    color: '#e53e3e',
                    fontSize: '0.90rem',
                    fontWeight: 600,
                    lineHeight: 1.3,
                    mt: 0.5,
                    fontStyle: 'italic'
                  }}>
                    {t.sloganLine2}
                  </Typography>
                </Box>
              </Box>

              <List sx={{ py: 0, pb: 2 }}>
                <ListItem 
                  component="div"
                  onClick={handleAuthClick}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
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
                  component={Link}
                  href="/"
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    textDecoration: 'none',
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
                    cursor: 'pointer',
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
                    cursor: 'pointer',
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
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        color: '#0000FF',
                        cursor: 'pointer'
                      }}
                    >
                      UA
                    </MenuItem>
                    <MenuItem 
                      onClick={() => onLanguageToggle('ru')}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        color: '#0000FF',
                        cursor: 'pointer'
                      }}
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
                    cursor: 'pointer',
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
                  { text: t.conditions, path: "/rental-terms" },
                  { text: t.blog, path: "/blog" },
                ].map((item) => (
                  <ListItem
                    component={Link}
                    href={item.path}
                    key={item.text}
                    sx={{ 
                      px: 3, 
                      py: 1.5,
                      color: '#0000FF',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}

                {/* Contact Support with dialog */}
                <ListItem
                  onClick={handleContactSupport}
                  component="div"
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.contact} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>
              </List>
            </Paper>
          )}
        </Box>
      )}

      {/* Auth Modal */}
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

      {/* Email Support Dialog */}
      <Dialog
        open={showEmailDialog}
        onClose={() => setShowEmailDialog(false)}
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
            {t.contact}
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
              <Typography 
                variant="body1" 
                sx={{ 
                  color: '#718096',
                  textAlign: 'center',
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  px: isMobile ? 1 : 0
                }}
              >
                {t.contactInstructions}
              </Typography>
              
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
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          color: "#1a365d",
                          fontWeight: 600,
                          fontSize: isMobile ? '1rem' : '1.1rem',
                          wordBreak: 'break-all'
                        }}
                      >
                        {t.supportEmail}
                      </Typography>
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
            <Button 
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
            </Button>
            
            <Button 
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
            </Button>
            
            <Button 
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
            </Button>
            
            <Button 
              onClick={() => setShowEmailDialog(false)}
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
            </Button>
          </DialogActions>
        </Box>
      </Dialog>

      {/* Snackbar for register message */}
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

      {/* Snackbar for copy confirmation */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={3000}
        onClose={() => setSnackbarOpen(false)}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert 
          onClose={() => setSnackbarOpen(false)} 
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

export default NoAutorazeMenu;