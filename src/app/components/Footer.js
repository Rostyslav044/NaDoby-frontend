'use client';

import React from "react";
import { useLanguage } from "@/app/LanguageContext";
import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
import { Facebook, Instagram, Telegram, Email } from '@mui/icons-material';

const translations = {
  ua: {
    title: "Оренда житла по всій Україні",
    categories: [
      'Квартири',
      'Готелі',
      'Готелі для тварин',
      'Хостели',
      'Будинки',
      'Сауни/Бані',
      'Глемпінг',
      'Пансіонати',
      'Котеджі для компаній',
      'Коворкінги',
      'Автокемпінги',
      'Бази відпочинку'
    ],
    aboutTitle: "Про нас",
    aboutText1: "NaDoby - це платформа для оренди житла без посередників. Ми об'єднуємо власників нерухомості та орендарів по всій Україні.",
    aboutText2: "Наші переваги: чесні ціни, прозорі умови, безпечні платежі та підтримка на кожному етапі оренди.",
    contactsTitle: "Контакти",
    copyright: "© {year} NaDoby.com.ua - Оренда житла без посередників. Всі права захищені.",
    links: {
      privacy: "Політика конфіденційності",
      terms: "Умови використання",
      help: "Допомога"
    },
    workingHours: "Працюємо цілодобово"
  },
  ru: {
    title: "Аренда жилья по всей Украине",
    categories: [
      'Квартиры',
      'Гостиницы',
      'Гостиницы для животных',
      'Хостелы',
      'Дома',
      'Сауны/Бани',
      'Глэмпинг',
      'Пансионаты',
      'Коттеджи для компаний',
      'Коворкинги',
      'Автокемпинги',
      'Базы отдыха'
    ],
    aboutTitle: "О нас",
    aboutText1: "NaDoby - это платформа для аренды жилья без посредников. Мы объединяем владельцев недвижимости и арендаторов по всей Украине.",
    aboutText2: "Наши преимущества: честные цены, прозрачные условия, безопасные платежи и поддержка на каждом этапе аренды.",
    contactsTitle: "Контакты",
    copyright: "© {year} NaDoby.com.ua - Аренда жилья без посредников. Все права защищены.",
    links: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      help: "Помощь"
    },
    workingHours: "Работаем круглосуточно"
  }
};

const Footer = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#f5f5f5',
        color: '#333',
        py: 4,
        px: 2,
        borderTop: '1px solid #e0e0e0',
        mt: 'auto'
      }}
    >
      <Box maxWidth="1200px" mx="auto">
        <Grid container spacing={4}>
          {/* Категории */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
              {t.categories.map((item) => (
                <Typography 
                  key={item} 
                  component="li" 
                  sx={{ mb: 1 }}
                >
                  <Link 
                    href="#" 
                    color="inherit" 
                    underline="hover"
                    sx={{ display: 'inline-block' }}
                  >
                    {item}
                  </Link>
                </Typography>
              ))}
            </Box>
          </Grid>

          {/* О нас */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t.aboutTitle}
            </Typography>
            <Typography paragraph sx={{ mt: 2 }}>
              {t.aboutText1}
            </Typography>
            <Typography paragraph>
              {t.aboutText2}
            </Typography>
          </Grid>

          {/* Контакты */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t.contactsTitle}
            </Typography>
            <Box sx={{ mt: 2 }}>
              <Typography paragraph>
                <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
                info@nadoby.com.ua
              </Typography>
              <Typography paragraph>
                {t.workingHours}
              </Typography>
              <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
                <IconButton href="#" color="inherit" size="small">
                  <Facebook />
                </IconButton>
                <IconButton href="#" color="inherit" size="small">
                  <Instagram />
                </IconButton>
                <IconButton href="#" color="inherit" size="small">
                  <Telegram />
                </IconButton>
              </Box>
            </Box>
          </Grid>
        </Grid>

        {/* Копирайт */}
        <Box sx={{ 
          mt: 4, 
          pt: 2, 
          borderTop: '1px solid #e0e0e0', 
          textAlign: 'center'
        }}>
          <Typography variant="body2">
            {t.copyright.replace('{year}', new Date().getFullYear())}
          </Typography>
          <Box sx={{ mt: 1 }}>
            <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
              {t.links.privacy}
            </Link>
            <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
              {t.links.terms}
            </Link>
            <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
              {t.links.help}
            </Link>
          </Box>
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;