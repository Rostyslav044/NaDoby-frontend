


// 'use client';

// import React from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import { Box, Typography, Grid, Link, IconButton } from '@mui/material';
// import { Facebook, Instagram, Telegram, Email } from '@mui/icons-material';

// const translations = {
//   ua: {
//     title: "Оренда житла по всій Україні",
//     categories: [
//       { name: 'Квартири', slug: 'apartments', url: '/blog/apartmentGuide' },
//       { name: 'Готелі', slug: 'hotels', url: '/blog/hotelGuide' },
//       { name: 'Готелі для тварин', slug: 'pet-hotels', url: '/blog/petHotelGuide'  },
//       { name: 'Хостели', slug: 'hostels', url: '/blog/hostelGuide' },
//       { name: 'Будинки', slug: 'houses', url: '/blog/houseGuide'},
//       { name: 'Сауни/Бані', slug: 'saunas', url: '/blog/saunaGuide' },
//       { name: 'Глемпінг', slug: 'glamping', url: '/blog/glampingGuide' },
//       { name: 'Санаторії/Пансіонати', slug: 'boarding-houses', url: '/blog/sanatoriumGuide'  },
//       { name: 'Котеджі для компаній', slug: 'cottages', url: '/blog/cottageComplexGuide' },
//       { name: 'Коворкінги', slug: 'coworking', url:  '/blog/coworkingGuide' },
//       { name: 'Автокемпінги', slug: 'autocamping', url: '/blog/autocampingGuide' },
//       { name: 'Бази відпочинку', slug: 'resorts', url: '/blog/campGuide' }
//     ],
//     aboutTitle: "Про нас",
//     aboutText1: "NaDoby - це платформа для оренди житла без посередників. Ми об'єднуємо власників нерухомості та орендарів по всій Україні.",
//     aboutText2: "Наші переваги: чесні ціни, прозорі умови.",
//     // , безпечні платежі та підтримка на кожному етапі оренди.",
//     contactsTitle: "Контакти",
//     copyright: "© {year} NaDoby.com.ua - Оренда житла без посередників. Всі права захищені.",
//     links: {
//       privacy: "Політика конфіденційності",
//       terms: "Умови використання",
//       help: "Допомога"
//     },
//     workingHours: "Працюємо цілодобово"
//   },
//   ru: {
//     title: "Аренда жилья по всей Украине",
//     categories: [
//       { name: 'Квартиры', slug: 'apartments', url: '/blog/apartmentGuide' },
//       { name: 'Гостиницы', slug: 'hotels', url: '/blog/hotelGuide' },
//       { name: 'Гостиницы для животных', slug: 'pet-hotels', url: '/blog/petHotelGuide' },
//       { name: 'Хостелы', slug: 'hostels', url: '/blog/hostelGuide' },
//       { name: 'Дома', slug: 'houses', url: '/blog/houseGuide' },
//       { name: 'Сауны/Бани', slug: 'saunas', url: '/blog/saunaGuide' },
//       { name: 'Глэмпинг', slug: 'glamping', url: '/blog/glampingGuide' },
//       { name: 'Санатории/Пансионаты', slug: 'boarding-houses', url: '/blog/sanatoriumGuide' },
//       { name: 'Коттеджи для компаний', slug: 'cottages', url: '/blog/cottageComplexGuide' },
//       { name: 'Коворкинги', slug: 'coworking', url: '/blog/coworkingGuide' },
//       { name: 'Автокемпинги', slug: 'autocamping', url: '/blog/autocampingGuide' },
//       { name: 'Базы отдыха', slug: 'resorts', url: '/blog/campGuide' }
//     ],
//     aboutTitle: "О нас",
//     aboutText1: "NaDoby - это платформа для аренды жилья без посредников. Мы объединяем владельцев недвижимости и арендаторов по всей Украине.",
//     aboutText2: "Наши преимущества: честные цены, прозрачные условия.",
//     //  безопасные платежи и поддержка на каждом этапе аренды.",
//     contactsTitle: "Контакты",
//     copyright: "© {year} NaDoby.com.ua - Аренда жилья без посредников. Все права защищены.",
//     links: {
//       privacy: "Политика конфиденциальности",
//       terms: "Условия использования",
//       help: "Помощь"
//     },
//     workingHours: "Работаем круглосуточно"
//   }
// };

// const Footer = () => {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   return (
//     <Box 
//       component="footer" 
//       sx={{ 
//         backgroundColor: '#f5f5f5',
//         color: '#333',
//         py: 4,
//         px: 2,
//         borderTop: '1px solid #e0e0e0',
//         mt: 'auto'
//       }}
//     >
//       <Box maxWidth="1200px" mx="auto">
//         <Grid container spacing={4}>
//           {/* Категории */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               {t.title}
//             </Typography>
//             <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
//               {t.categories.map((category) => (
//                 <Typography 
//                   key={category.slug} 
//                   component="li" 
//                   sx={{ mb: 1 }}
//                 >
//                   <Link 
//                     href={category.url} 
//                     color="inherit" 
//                     underline="hover"
//                     sx={{ display: 'inline-block' }}
//                   >
//                     {category.name}
//                   </Link>
//                 </Typography>
//               ))}
//             </Box>
//           </Grid>

//           {/* О нас */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               {t.aboutTitle}
//             </Typography>
//             <Typography paragraph sx={{ mt: 2 }}>
//               {t.aboutText1}
//             </Typography>
//             <Typography paragraph>
//               {t.aboutText2}
//             </Typography>
//           </Grid>

//           {/* Контакты */}
//           <Grid item xs={12} md={4}>
//             <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
//               {t.contactsTitle}
//             </Typography>
//             <Box sx={{ mt: 2 }}>
//               <Typography paragraph>
//                 <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
//                 info.nadoby@com.ua
//               </Typography>
//               <Typography paragraph>
//                 {t.workingHours}
//               </Typography>
//               <Box sx={{ display: 'flex', gap: 2, mt: 2 }}>
//                 <IconButton href="#" color="inherit" size="small">
//                   <Facebook />
//                 </IconButton>
//                 <IconButton href="#" color="inherit" size="small">
//                   <Instagram />
//                 </IconButton>
//                 <IconButton href="#" color="inherit" size="small">
//                   <Telegram />
//                 </IconButton>
//               </Box>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Копирайт */}
//         <Box sx={{ 
//           mt: 4, 
//           pt: 2, 
//           borderTop: '1px solid #e0e0e0', 
//           textAlign: 'center'
//         }}>
//           <Typography variant="body2">
//             {t.copyright.replace('{year}', new Date().getFullYear())}
//           </Typography>
//           <Box sx={{ mt: 1 }}>
//             <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
//               {t.links.privacy}
//             </Link>
//             <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
//               {t.links.terms}
//             </Link>
//             <Link href="#" color="inherit" variant="body2" sx={{ mx: 1 }}>
//               {t.links.help}
//             </Link>
//           </Box>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default Footer;


'use client';

import React from "react";
import { useLanguage } from "@/app/LanguageContext";
import { Box, Typography, Grid, Link, IconButton, Button } from '@mui/material';
import { Facebook, Instagram, Telegram, Email, ArrowUpward } from '@mui/icons-material';
import Logo from '@/app/components/Logo'; // Импортируем ваш компонент логотипа

const translations = {
  ua: {
    title: "Оренда житла по всій Україні",
    categories: [
      { name: 'Квартири', slug: 'apartments', url: '/blog/apartmentGuide' },
      { name: 'Готелі', slug: 'hotels', url: '/blog/hotelGuide' },
      { name: 'Готелі для тварин', slug: 'pet-hotels', url: '/blog/petHotelGuide'  },
      { name: 'Хостели', slug: 'hostels', url: '/blog/hostelGuide' },
      { name: 'Будинки', slug: 'houses', url: '/blog/houseGuide'},
      { name: 'Сауни/Бані', slug: 'saunas', url: '/blog/saunaGuide' },
      { name: 'Глемпінг', slug: 'glamping', url: '/blog/glampingGuide' },
      { name: 'Санаторії/Пансіонати', slug: 'boarding-houses', url: '/blog/sanatoriumGuide'  },
      { name: 'Котеджі для компаній', slug: 'cottages', url: '/blog/cottageComplexGuide' },
      { name: 'Коворкінги', slug: 'coworking', url:  '/blog/coworkingGuide' },
      { name: 'Автокемпінги', slug: 'autocamping', url: '/blog/autocampingGuide' },
      { name: 'Бази відпочинку', slug: 'resorts', url: '/blog/campGuide' }
    ],
    aboutTitle: "Про нас",
    aboutText1: "NaDoby - це платформа для оренди житла без посередників. Ми об'єднуємо власників нерухомості та орендарів по всій Україні.",
    aboutText2: "Наші переваги: чесні ціни, прозорі умови.",
    contactsTitle: "Контакти",
    copyright: "© {year} NaDoby.com.ua - Оренда житла без посередників. Всі права захищені.",
    links: {
      privacy: "Політика конфіденційності",
      terms: "Умови використання",
      help: "Допомога"
    },
    workingHours: "Працюємо цілодобово",
    backToTop: "Наверх"
  },
  ru: {
    title: "Аренда жилья по всей Украине",
    categories: [
      { name: 'Квартиры', slug: 'apartments', url: '/blog/apartmentGuide' },
      { name: 'Гостиницы', slug: 'hotels', url: '/blog/hotelGuide' },
      { name: 'Гостиницы для животных', slug: 'pet-hotels', url: '/blog/petHotelGuide' },
      { name: 'Хостелы', slug: 'hostels', url: '/blog/hostelGuide' },
      { name: 'Дома', slug: 'houses', url: '/blog/houseGuide' },
      { name: 'Сауны/Бани', slug: 'saunas', url: '/blog/saunaGuide' },
      { name: 'Глэмпинг', slug: 'glamping', url: '/blog/glampingGuide' },
      { name: 'Санатории/Пансионаты', slug: 'boarding-houses', url: '/blog/sanatoriumGuide' },
      { name: 'Коттеджи для компаний', slug: 'cottages', url: '/blog/cottageComplexGuide' },
      { name: 'Коворкинги', slug: 'coworking', url: '/blog/coworkingGuide' },
      { name: 'Автокемпинги', slug: 'autocamping', url: '/blog/autocampingGuide' },
      { name: 'Базы отдыха', slug: 'resorts', url: '/blog/campGuide' }
    ],
    aboutTitle: "О нас",
    aboutText1: "NaDoby - это платформа для аренды жилья без посредников. Мы объединяем владельцев недвижимости и арендаторов по всей Украине.",
    aboutText2: "Наши преимущества: честные цены, прозрачные условия.",
    contactsTitle: "Контакты",
    copyright: "© {year} NaDoby.com.ua - Аренда жилья без посредников. Все права защищены.",
    links: {
      privacy: "Политика конфиденциальности",
      terms: "Условия использования",
      help: "Помощь"
    },
    workingHours: "Работаем круглосуточно",
    backToTop: "Наверх"
  }
};

const Footer = () => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  // Функция для открытия почтового клиента
  const handleEmailClick = () => {
    window.location.href = 'mailto:info.nadoby@com.ua';
  };

  // Функция для плавного скролла наверх
  const scrollToTop = () => {
    window.scrollTo({
      top: 0,
      behavior: 'smooth'
    });
  };

  return (
    <Box 
      component="footer" 
      sx={{ 
        backgroundColor: '#f5f5f5',
        color: '#333',
        py: 4,
        px: 2,
        borderTop: '1px solid #e0e0e0',
        mt: 'auto',
        position: 'relative'
      }}
    >
      {/* Кнопка "Наверх" */}
      <Button
        variant="contained"
        onClick={scrollToTop}
        startIcon={<ArrowUpward />}
        sx={{
          position: 'absolute',
          top: -20,
          right: 20,
          backgroundColor: '#1976d2',
          '&:hover': {
            backgroundColor: '#1565c0'
          },
          minWidth: 'auto',
          px: 2,
          py: 1
        }}
      >
        {t.backToTop}
      </Button>

      <Box maxWidth="1200px" mx="auto">
        {/* Логотип */}
        <Box sx={{ textAlign: 'center', mb: 3 }}>
          <Logo />
        </Box>

        <Grid container spacing={4}>
          {/* Категории */}
          <Grid item xs={12} md={4}>
            <Typography variant="h6" gutterBottom sx={{ fontWeight: 'bold' }}>
              {t.title}
            </Typography>
            <Box component="ul" sx={{ listStyle: 'none', pl: 0, mt: 2 }}>
              {t.categories.map((category) => (
                <Typography 
                  key={category.slug} 
                  component="li" 
                  sx={{ mb: 1 }}
                >
                  <Link 
                    href={category.url} 
                    color="inherit" 
                    underline="hover"
                    sx={{ display: 'inline-block' }}
                  >
                    {category.name}
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
              <Typography paragraph sx={{ cursor: 'pointer' }} onClick={handleEmailClick}>
                <Email sx={{ verticalAlign: 'middle', mr: 1 }} />
                info.nadoby@com.ua
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
          
        
        </Box>
      </Box>
    </Box>
  );
};

export default Footer;