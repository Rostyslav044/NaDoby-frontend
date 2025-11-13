// 'use client'

// import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery } from '@mui/material'
// import Link from 'next/link'
// import { Home, Hotel, Pets, Restaurant, Groups, Savings, CheckCircle, ArrowBack } from '@mui/icons-material'
// import Footer from "@/app/components/Footer"
// import Head from 'next/head'

// const APARTMENT_CONTENT = {
//   ua: {
//     title: "Квартири  подобово для комфортного відпочинку",
//     metaDescription: "🔝 Квартири посуточно у всіх містах України. Без комісій та посередників. Великий вибір варіантів для відпочинку та проживання.",
//     subtitle: "Чому оренда квартири на добу вигідніша за готель?",
//     advantagesTitle: "Основні переваги",
//     advantages: [
//       "Економія 30-70% порівняно з готелями",
//       "Без обмежень для компанії друзів",
//       "Повна приватність - ніхто не турбує",
//       "Можливість готувати - повноцінна кухня",
//       "Домашні тварини за домовленістю",
//       "Більше простору: окремі кімнати",
//       "Гнучкий графік заїзду/виїзду"
//     ],
//     tipsTitle: "Як вибрати ідеальну квартиру?",
//     tips: [
//       "Зручне розташування - близькість до центру",
//       "Перевірте зручності: кухня, пральна машина, Wi-Fi",
//       "Уважно перегляньте фото та відгуки",
//       "Уточніть умови оплати",
//       "Обговоріть можливість з тваринами",
//       "Перевірте опалення та гарячу воду",
//       "Узгодьте час заїзду та отримання ключів"
//     ],
//     backButton: "Повернутись до блогу"
//   },
//   ru: {
//     title: "Квартиры посуточно для комфортного отдыха",
//     metaDescription: "🔝 Квартиры посуточно во всех городах Украины. Без комиссий и посредников. Большой выбор вариантов для отдыха и проживания.",
//     subtitle: "Почему аренда квартиры выгоднее отеля?",
//     advantagesTitle: "Основные преимущества",
//     advantages: [
//       "Экономия 30-70% по сравнению с отелями",
//       "Без ограничений для компании друзей",
//       "Полная приватность - никто не беспокоит",
//       "Возможность готовить - полноценная кухня",
//       "Домашние животные по договоренности",
//       "Больше пространства: отдельные комнаты",
//       "Гибкий график заезда/выезда"
//     ],
//     tipsTitle: "Как выбрать идеальную квартиру?",
//     tips: [
//       "Удобное расположение - близость к центру",
//       "Проверьте удобства: кухня, стиральная машина, Wi-Fi",
//       "Внимательно изучите фото и отзывы",
//       "Уточните условия оплаты",
//       "Обсудите возможность с животными",
//       "Проверьте отопление и горячую воду",
//       "Согласуйте время заезда и получение ключей"
//     ],
//     backButton: "Вернуться в блог"
//   }
// }

// function ApartmentGuide() {
//   const { currentLanguage } = useLanguage()
//   const t = APARTMENT_CONTENT[currentLanguage]
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

//   return (
//     <>
//       <Head>
//         <title>{t.title}</title>
//         <meta name="description" content={t.metaDescription} />
//       </Head>

//       <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
//         <Header />
        
//         <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6, px: isMobile ? 2 : 4 }}>
//           <Paper elevation={3} sx={{ 
//             p: isMobile ? 2 : 4, 
//             borderRadius: 2, 
//             mb: 4,
//             '& .MuiListItem-root': {
//               py: isMobile ? 0.5 : 1
//             }
//           }}>
//             <Typography variant="h4" component="h1" sx={{ 
//               fontWeight: 700,
//               textAlign: 'center',
//               color: 'primary.main',
//               fontSize: isMobile ? '1.5rem' : '2rem',
//               mb: 2
//             }}>
//               {t.title}
//             </Typography>

//              {/* Изображение (добавлено здесь) */}
//              <Box sx={{ 
//               width: '100%',
//               height: isMobile ? 200 : 500,
//               position: 'relative',
//               mb: 4,
//               borderRadius: 2,
//               overflow: 'hidden',
//               boxShadow: theme.shadows[2]
//             }}>
//               <img
//                 src="/apartment.png" // Путь к вашему изображению
//                 alt={t.title}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   objectPosition: 'center'
//                 }}
//               />
//             </Box>

//             <Typography variant="h6" component="p" sx={{
//               textAlign: 'center',
//               color: 'text.secondary',
//               mb: 4,
//               fontSize: isMobile ? '1rem' : '1.1rem'
//             }}>
//               {t.subtitle}
//             </Typography>

//             {/* Преимущества */}
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.advantagesTitle}
//               </Typography>
              
//               <List dense={isMobile}>
//                 {t.advantages.map((item, index) => (
//                   <ListItem key={`adv-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
//                     </ListItemIcon>
//                     <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                       {item}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>

//               <Box sx={{ 
//                 display: 'flex', 
//                 flexWrap: 'wrap', 
//                 gap: 1, 
//                 mt: 3,
//                 justifyContent: 'center'
//               }}>
//                 <Chip 
//                   icon={<Savings fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Економія" : "Экономия"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//                 <Chip 
//                   icon={<Groups fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Для компанії" : "Для компании"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//                 <Chip 
//                   icon={<Restaurant fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Кухня" : "Кухня"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//                 <Chip 
//                   icon={<Pets fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Тварини" : "Животные"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//               </Box>
//             </Box>

//             {/* Советы */}
//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Hotel fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.tipsTitle}
//               </Typography>
              
//               <List dense={isMobile}>
//                 {t.tips.map((item, index) => (
//                   <ListItem key={`tip-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
//                       <CheckCircle color="info" fontSize={isMobile ? 'small' : 'medium'} />
//                     </ListItemIcon>
//                     <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                       {item}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           </Paper>

//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Link href="/blog" passHref legacyBehavior>
//               <Button 
//                 variant="contained" 
//                 size={isMobile ? 'medium' : 'large'}
//                 startIcon={<ArrowBack fontSize={isMobile ? 'small' : 'medium'} />}
//                 sx={{ 
//                   px: isMobile ? 3 : 4,
//                   py: 1,
//                   fontWeight: 600,
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   borderRadius: 2
//                 }}
//               >
//                 {t.backButton}
//               </Button>
//             </Link>
//           </Box>
//         </Container>
//         <Footer />
//       </Box>
//     </>
//   )
// }

// export default function ApartmentPage() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <ApartmentGuide />
//       </LanguageProvider>
//     </Provider>
//   )
// }




// import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
// import Link from 'next/link'
// import { Home, Hotel, Pets, Restaurant, Groups, Savings, CheckCircle, ArrowBack } from '@mui/icons-material'
// import Footer from "@/app/components/Footer"
// import Head from 'next/head'
// import RelatedPosts from './components/RelatedPosts'

// const APARTMENT_CONTENT = {
//   ua: {
//     title: "Квартири подобово для комфортного відпочинку",
//     metaDescription: "🔝 Квартири посуточно у всіх містах України. Без комісій та посередників. Великий вибір варіантів для відпочинку та проживання.",
//     subtitle: "Чому оренда квартири на добу вигідніша за готель?",
//     advantagesTitle: "Основні переваги",
//     advantages: [
//       "Економія 30-70% порівняно з готелями",
//       "Без обмежень для компанії друзів",
//       "Повна приватність - ніхто не турбує",
//       "Можливість готувати - повноцінна кухня",
//       "Домашні тварини за домовленістю",
//       "Більше простору: окремі кімнати",
//       "Гнучкий графік заїзду/виїзду"
//     ],
//     tipsTitle: "Як вибрати ідеальну квартиру?",
//     tips: [
//       "Зручне розташування - близькість до центру",
//       "Перевірте зручності: кухня, пральна машина, Wi-Fi",
//       "Уважно перегляньте фото та відгуки",
//       "Уточніть умови оплати",
//       "Обговоріть можливість з тваринами",
//       "Перевірте опалення та гарячу воду",
//       "Узгодьте час заїзду та отримання ключів"
//     ],
//     backButton: "Повернутись до блогу"
//   },
//   ru: {
//     title: "Квартиры посуточно для комфортного отдыха",
//     metaDescription: "🔝 Квартиры посуточно во всех городах Украины. Без комиссий и посредников. Большой выбор вариантов для отдыха и проживания.",
//     subtitle: "Почему аренда квартиры выгоднее отеля?",
//     advantagesTitle: "Основные преимущества",
//     advantages: [
//       "Экономия 30-70% по сравнению с отелями",
//       "Без ограничений для компании друзей",
//       "Полная приватность - никто не беспокоит",
//       "Возможность готовить - полноценная кухня",
//       "Домашние животные по договоренности",
//       "Больше пространства: отдельные комнаты",
//       "Гибкий график заезда/выезда"
//     ],
//     tipsTitle: "Как выбрать идеальную квартиру?",
//     tips: [
//       "Удобное расположение - близость к центру",
//       "Проверьте удобства: кухня, стиральная машина, Wi-Fi",
//       "Внимательно изучите фото и отзывы",
//       "Уточните условия оплаты",
//       "Обсудите возможность с животными",
//       "Проверьте отопление и горячую воду",
//       "Согласуйте время заезда и получение ключей"
//     ],
//     backButton: "Вернуться в блог"
//   }
// }

// // Клиентский компонент
// function ApartmentGuide() {
//   const { currentLanguage } = useLanguage()
//   const t = APARTMENT_CONTENT[currentLanguage]
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

//   return (
//     <>
//       <Head>
//         <title>{t.title}</title>
//         <meta name="description" content={t.metaDescription} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
//         <Header />
        
//         <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6, px: isMobile ? 2 : 4 }}>
//           <Paper elevation={3} sx={{ 
//             p: isMobile ? 2 : 4, 
//             borderRadius: 2, 
//             mb: 4,
//             '& .MuiListItem-root': {
//               py: isMobile ? 0.5 : 1
//             }
//           }}>
//             <Typography variant="h4" component="h1" sx={{ 
//               fontWeight: 700,
//               textAlign: 'center',
//               color: 'primary.main',
//               fontSize: isMobile ? '1.5rem' : '2rem',
//               mb: 2
//             }}>
//               {t.title}
//             </Typography>

//             {/* Изображение с предзагрузкой */}
//             <Box sx={{ 
//               width: '100%',
//               height: isMobile ? 200 : 500,
//               position: 'relative',
//               mb: 4,
//               borderRadius: 2,
//               overflow: 'hidden',
//               boxShadow: theme.shadows[2]
//             }}>
//               <img
//                 src="/apartment.png"
//                 alt={t.title}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   objectPosition: 'center'
//                 }}
//                 loading="eager" // Предзагрузка изображения
//               />
//             </Box>

//             <Typography variant="h6" component="p" sx={{
//               textAlign: 'center',
//               color: 'text.secondary',
//               mb: 4,
//               fontSize: isMobile ? '1rem' : '1.1rem'
//             }}>
//               {t.subtitle}
//             </Typography>

//             {/* Преимущества */}
//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.advantagesTitle}
//               </Typography>
              
//               <List dense={isMobile}>
//                 {t.advantages.map((item, index) => (
//                   <ListItem key={`adv-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
//                     </ListItemIcon>
//                     <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                       {item}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>

//               <Box sx={{ 
//                 display: 'flex', 
//                 flexWrap: 'wrap', 
//                 gap: 1, 
//                 mt: 3,
//                 justifyContent: 'center'
//               }}>
//                 <Chip 
//                   icon={<Savings fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Економія" : "Экономия"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//                 <Chip 
//                   icon={<Groups fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Для компанії" : "Для компании"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//                 <Chip 
//                   icon={<Restaurant fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Кухня" : "Кухня"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//                 <Chip 
//                   icon={<Pets fontSize="small" />} 
//                   label={currentLanguage === 'ua' ? "Тварини" : "Животные"} 
//                   size={isMobile ? 'small' : 'medium'}
//                 />
//               </Box>
//             </Box>

//             {/* Советы */}
//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Hotel fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.tipsTitle}
//               </Typography>
              
//               <List dense={isMobile}>
//                 {t.tips.map((item, index) => (
//                   <ListItem key={`tip-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
//                       <CheckCircle color="info" fontSize={isMobile ? 'small' : 'medium'} />
//                     </ListItemIcon>
//                     <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                       {item}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>
//           </Paper>

//           {/* Добавляем разделитель и рекомендации */}
//           <Divider sx={{ my: 4 }} />
          
//           {/* Компонент с рекомендациями */}
//           <RelatedPosts currentSlug="apartmentGuide" />

//           <Box sx={{ textAlign: 'center', mt: 4 }}>
//             <Link href="/blog" passHref legacyBehavior>
//               <Button 
//                 variant="contained" 
//                 size={isMobile ? 'medium' : 'large'}
//                 startIcon={<ArrowBack fontSize={isMobile ? 'small' : 'medium'} />}
//                 sx={{ 
//                   px: isMobile ? 3 : 4,
//                   py: 1,
//                   fontWeight: 600,
//                   fontSize: isMobile ? '0.9rem' : '1rem',
//                   borderRadius: 2
//                 }}
//               >
//                 {t.backButton}
//               </Button>
//             </Link>
//           </Box>
//         </Container>
//         <Footer />
//       </Box>
//     </>
//   )
// }

// // Функция для статической генерации - выполняется на сервере во время сборки
// export async function getStaticProps() {
//   // Здесь можно добавить запросы к API для получения данных
//   // которые будут встроены в статическую страницу
  
//   return {
//     props: {
//       // Данные которые будут переданы в компонент как пропсы
//       generatedAt: new Date().toISOString(),
//     },
//     // Регенерация страницы каждые 24 часа (опционально)
//     revalidate: 86400, // 24 часа в секундах
//   }
// }

// export default function ApartmentPage() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <ApartmentGuide />
//       </LanguageProvider>
//     </Provider>
//   )
// }



import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
import Link from 'next/link'
import { Home, Hotel, Pets, Restaurant, Groups, Savings, CheckCircle, ArrowBack } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'

const APARTMENT_CONTENT = {
  ua: {
    title: "Квартири подобово для комфортного відпочинку",
    metaDescription: "🔝 Квартири посуточно у всіх містах України. Без комісій та посередників. Великий вибір варіантів для відпочинку та проживання.",
    subtitle: "Чому оренда квартири на добу вигідніша за готель?",
    advantagesTitle: "Основні переваги",
    advantages: [
      "Економія 30-70% порівняно з готелями",
      "Без обмежень для компанії друзів",
      "Повна приватність - ніхто не турбує",
      "Можливість готувати - повноцінна кухня",
      "Домашні тварини за домовленістю",
      "Більше простору: окремі кімнати",
      "Гнучкий графік заїзду/виїзду"
    ],
    tipsTitle: "Як вибрати ідеальну квартиру?",
    tips: [
      "Зручне розташування - близькість до центру",
      "Перевірте зручності: кухня, пральна машина, Wi-Fi",
      "Уважно перегляньте фото та відгуки",
      "Уточніть умови оплати",
      "Обговоріть можливість з тваринами",
      "Перевірте опалення та гарячу воду",
      "Узгодьте час заїзду та отримання ключів"
    ],
    backButton: "Повернутись до блогу"
  },
  ru: {
    title: "Квартиры посуточно для комфортного отдыха",
    metaDescription: "🔝 Квартиры посуточно во всех городах Украины. Без комиссий и посредников. Большой выбор вариантов для отдыха и проживания.",
    subtitle: "Почему аренда квартиры выгоднее отеля?",
    advantagesTitle: "Основные преимущества",
    advantages: [
      "Экономия 30-70% по сравнению с отелями",
      "Без ограничений для компании друзей",
      "Полная приватность - никто не беспокоит",
      "Возможность готовить - полноценная кухня",
      "Домашние животные по договоренности",
      "Больше пространства: отдельные комнаты",
      "Гибкий график заезда/выезда"
    ],
    tipsTitle: "Как выбрать идеальную квартиру?",
    tips: [
      "Удобное расположение - близость к центру",
      "Проверьте удобства: кухня, стиральная машина, Wi-Fi",
      "Внимательно изучите фото и отзывы",
      "Уточните условия оплаты",
      "Обсудите возможность с животными",
      "Проверьте отопление и горячую воду",
      "Согласуйте время заезда и получение ключей"
    ],
    backButton: "Вернуться в блог"
  }
}

// Клиентский компонент
function ApartmentGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = APARTMENT_CONTENT[currentLanguage]
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Header />
        
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6, px: isMobile ? 2 : 4 }}>
          <Paper elevation={3} sx={{ 
            p: isMobile ? 2 : 4, 
            borderRadius: 2, 
            mb: 4,
            '& .MuiListItem-root': {
              py: isMobile ? 0.5 : 1
            }
          }}>
            <Typography variant="h4" component="h1" sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              color: 'primary.main',
              fontSize: isMobile ? '1.5rem' : '2rem',
              mb: 2
            }}>
              {t.title}
            </Typography>

            {/* Изображение с предзагрузкой */}
            <Box sx={{ 
              width: '100%',
              height: isMobile ? 200 : 500,
              position: 'relative',
              mb: 4,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[2]
            }}>
              <img
                src="/apartment.png"
                alt={t.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                loading="eager" // Предзагрузка изображения
              />
            </Box>

            <Typography variant="h6" component="p" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
              fontSize: isMobile ? '1rem' : '1.1rem'
            }}>
              {t.subtitle}
            </Typography>

            {/* Преимущества */}
            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.advantagesTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.advantages.map((item, index) => (
                  <ListItem key={`adv-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>

              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                mt: 3,
                justifyContent: 'center'
              }}>
                <Chip 
                  icon={<Savings fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Економія" : "Экономия"} 
                  size={isMobile ? 'small' : 'medium'}
                />
                <Chip 
                  icon={<Groups fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Для компанії" : "Для компании"} 
                  size={isMobile ? 'small' : 'medium'}
                />
                <Chip 
                  icon={<Restaurant fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Кухня" : "Кухня"} 
                  size={isMobile ? 'small' : 'medium'}
                />
                <Chip 
                  icon={<Pets fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Тварини" : "Животные"} 
                  size={isMobile ? 'small' : 'medium'}
                />
              </Box>
            </Box>

            {/* Советы */}
            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Hotel fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.tipsTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.tips.map((item, index) => (
                  <ListItem key={`tip-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
                      <CheckCircle color="info" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>
          </Paper>

          {/* Добавляем разделитель и рекомендации */}
          <Divider sx={{ my: 4 }} />
          
          {/* Компонент с рекомендациями */}
          <RelatedPosts currentSlug="apartmentGuide" />

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Link href="/blog" passHref legacyBehavior>
              <Button 
                variant="contained" 
                size={isMobile ? 'medium' : 'large'}
                startIcon={<ArrowBack fontSize={isMobile ? 'small' : 'medium'} />}
                sx={{ 
                  px: isMobile ? 3 : 4,
                  py: 1,
                  fontWeight: 600,
                  fontSize: isMobile ? '0.9rem' : '1rem',
                  borderRadius: 2
                }}
              >
                {t.backButton}
              </Button>
            </Link>
          </Box>
        </Container>
        {/* <Footer /> */}
      </Box>
    </>
  )
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  // Здесь можно добавить запросы к API для получения данных
  // которые будут встроены в статическую страницу
  
  return {
    props: {
      // Данные которые будут переданы в компонент как пропсы
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}

export default ApartmentGuide