// 'use client'

// import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery } from '@mui/material'
// import Link from 'next/link'
// import { Forest, Hiking, Spa, CheckCircle, ArrowBack, Terrain, Cottage, OutdoorGrill, Pets, DirectionsBike } from '@mui/icons-material'
// import Footer from "@/app/components/Footer"
// import Head from 'next/head'
// import RelatedPosts from './components/RelatedPosts'

// const RESORT_CONTENT = {
//   ua: {
//     title: "Бази відпочинку серед природи",
//     metaDescription: "🔝 Кращі бази відпочинку в лісах, горах та на берегах озер. Активний відпочинок, риболовля, прогулянки та повне занурення в природу.",
//     subtitle: "Як провести час на базі відпочинку з максимальною користю?",
//     benefitsTitle: "Переваги відпочинку на природі",
//     benefits: [
//       "Повне занурення в природне середовище",
//       "Можливість активного відпочинку (риболовля, велопрогулянки)",
//       "Чисте повітря та натуральні звуки природи",
//       "Відсутність міського шуму та стресу",
//       "Ідеально для сімейного відпочинку з дітьми",
//       "Можливість орендувати весь котедж або будиночок",
//       "Доступ до унікальних природних пам'яток"
//     ],
//     activitiesTitle: "Активності на базі відпочинку",
//     activities: [
//       { name: "Риболовля", icon: <Hiking />, desc: "Прогулянки різними маршрутами різної складності" },
//       { name: "Прогулянки лісом", icon: <Forest />, desc: "Насолоджуйтесь чистим повітрям і краєвидами" },
//       { name: "Велопрогулянки", icon: <DirectionsBike />, desc: "Оренда велосипедів та спеціальні треки" },
//       { name: "Барбекю", icon: <OutdoorGrill />, desc: "Місця для приготування їжі на відкритому повітрі" }
//     ],
//     tipsTitle: "Як вибрати ідеальну базу відпочинку?",
//     tips: [
//       "Визначтесь з типом локації (ліс, озеро, гори)",
//       "Перевірте наявність зручностей (душ, туалет, електрика)",
//       "Уточніть можливість проживання з тваринами",
//       "Оцініть відстань до цивілізації (аптека, магазин)",
//       "Перегляньте відгуки про чистоту території",
//       "З'ясуйте наявність дитячих майданчиків",
//       "Обговоріть можливість раннього заїзду"
//     ],
//     backButton: "Повернутись до блогу"
//   },
//   ru: {
//     title: "Базы отдыха на природе",
//     metaDescription: "🔝 Лучшие базы отдыха в лесах, горах и на берегах озер. Активный отдых, рыбалка, прогулки и полное погружение в природу.",
//     subtitle: "Как провести время на базе отдыха с максимальной пользой?",
//     benefitsTitle: "Преимущества отдыха на природе",
//     benefits: [
//       "Полное погружение в природную среду",
//       "Возможность активного отдыха (рыбалка, велопрогулки)",
//       "Чистый воздух и натуральные звуки природы",
//       "Отсутствие городского шума и стресса",
//       "Идеально для семейного отдыха с детьми",
//       "Возможность арендовать весь коттедж или домик",
//       "Доступ к уникальным природным достопримечательностям"
//     ],
//     activitiesTitle: "Активности на базе отдыха",
//     activities: [
//       { name: "Рыбалка", icon: <Hiking />, desc: "Прогулки разными маршрутами различной сложности" },
//       { name: "Прогулки по лесу", icon: <Forest />, desc: "Наслаждайтесь чистым воздухом и пейзажами" },
//       { name: "Велопрогулки", icon: <DirectionsBike />, desc: "Аренда велосипедов и специальные треки" },
//       { name: "Барбекю", icon: <OutdoorGrill />, desc: "Места для приготовления пищи на открытом воздухе" }
//     ],
//     tipsTitle: "Как выбрать идеальную базу отдыха?",
//     tips: [
//       "Определитесь с типом локации (лес, озеро, горы)",
//       "Проверьте наличие удобств (душ, туалет, электричество)",
//       "Уточните возможность проживания с животными",
//       "Оцените расстояние до цивилизации (аптека, магазин)",
//       "Просмотрите отзывы о чистоте территории",
//       "Выясните наличие детских площадок",
//       "Обсудите возможность раннего заезда"
//     ],
//     backButton: "Вернуться в блог"
//   }
// }

// function ResortGuide() {
//   const { currentLanguage } = useLanguage()
//   const t = RESORT_CONTENT[currentLanguage]
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
//                 src="/camp.png"
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

//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Cottage fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.benefitsTitle}
//               </Typography>
              
//               <List dense={isMobile}>
//                 {t.benefits.map((item, index) => (
//                   <ListItem key={`benefit-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
//                     </ListItemIcon>
//                     <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                       {item}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>

//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Terrain fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.activitiesTitle}
//               </Typography>
              
//               <Box sx={{ 
//                 display: 'grid', 
//                 gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
//                 gap: 3 
//               }}>
//                 {t.activities.map((activity, index) => (
//                   <Paper key={`activity-${index}`} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                       {activity.icon}
//                       <Typography variant="h6" sx={{ ml: 1, color: 'primary.main' }}>
//                         {activity.name}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2">
//                       {activity.desc}
//                     </Typography>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Spa fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
//           <RelatedPosts currentSlug="campGuide" />
//           <Box sx={{ textAlign: 'center', mt: 2 }}>
//             <Link href="/blog" passHref legacyBehavior>
//               <Button 
//                 variant="contained" 
//                 color="primary"
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

// export default function ResortPage() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <ResortGuide />
//       </LanguageProvider>
//     </Provider>
//   )
// }




// 'use client'

// import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
// import Link from 'next/link'
// import { Forest, Hiking, Spa, CheckCircle, ArrowBack, Terrain, Cottage, OutdoorGrill, Pets, DirectionsBike } from '@mui/icons-material'
// import Footer from "@/app/components/Footer"
// import Head from 'next/head'
// import RelatedPosts from './components/RelatedPosts'

// const RESORT_CONTENT = {
//   ua: {
//     title: "Бази відпочинку серед природи",
//     metaDescription: "🔝 Кращі бази відпочинку в лісах, горах та на берегах озер. Активний відпочинок, риболовля, прогулянки та повне занурення в природу.",
//     subtitle: "Як провести час на базі відпочинку з максимальною користю?",
//     benefitsTitle: "Переваги відпочинку на природі",
//     benefits: [
//       "Повне занурення в природне середовище",
//       "Можливість активного відпочинку (риболовля, велопрогулянки)",
//       "Чисте повітря та натуральні звуки природи",
//       "Відсутність міського шуму та стресу",
//       "Ідеально для сімейного відпочинку з дітьми",
//       "Можливість орендувати весь котедж або будиночок",
//       "Доступ до унікальних природних пам'яток"
//     ],
//     activitiesTitle: "Активності на базі відпочинку",
//     activities: [
//       { name: "Риболовля", icon: <Hiking />, desc: "Прогулянки різними маршрутами різної складності" },
//       { name: "Прогулянки лісом", icon: <Forest />, desc: "Насолоджуйтесь чистим повітрям і краєвидами" },
//       { name: "Велопрогулянки", icon: <DirectionsBike />, desc: "Оренда велосипедів та спеціальні треки" },
//       { name: "Барбекю", icon: <OutdoorGrill />, desc: "Місця для приготування їжі на відкритому повітрі" }
//     ],
//     tipsTitle: "Як вибрати ідеальну базу відпочинку?",
//     tips: [
//       "Визначтесь з типом локації (ліс, озеро, гори)",
//       "Перевірте наявність зручностей (душ, туалет, електрика)",
//       "Уточніть можливість проживання з тваринами",
//       "Оцініть відстань до цивілізації (аптека, магазин)",
//       "Перегляньте відгуки про чистоту території",
//       "З'ясуйте наявність дитячих майданчиків",
//       "Обговоріть можливість раннього заїзду"
//     ],
//     backButton: "Повернутись до блогу"
//   },
//   ru: {
//     title: "Базы отдыха на природе",
//     metaDescription: "🔝 Лучшие базы отдыха в лесах, горах и на берегах озер. Активный отдых, рыбалка, прогулки и полное погружение в природу.",
//     subtitle: "Как провести время на базе отдыха с максимальной пользой?",
//     benefitsTitle: "Преимущества отдыха на природе",
//     benefits: [
//       "Полное погружение в природную среду",
//       "Возможность активного отдыха (рыбалка, велопрогулки)",
//       "Чистый воздух и натуральные звуки природы",
//       "Отсутствие городского шума и стресса",
//       "Идеально для семейного отдыха с детьми",
//       "Возможность арендовать весь коттедж или домик",
//       "Доступ к уникальным природным достопримечательностям"
//     ],
//     activitiesTitle: "Активности на базе отдыха",
//     activities: [
//       { name: "Рыбалка", icon: <Hiking />, desc: "Прогулки разными маршрутами различной сложности" },
//       { name: "Прогулки по лесу", icon: <Forest />, desc: "Наслаждайтесь чистым воздухом и пейзажами" },
//       { name: "Велопрогулки", icon: <DirectionsBike />, desc: "Аренда велосипедов и специальные треки" },
//       { name: "Барбекю", icon: <OutdoorGrill />, desc: "Места для приготовления пищи на открытом воздухе" }
//     ],
//     tipsTitle: "Как выбрать идеальную базу отдыха?",
//     tips: [
//       "Определитесь с типом локации (лес, озеро, горы)",
//       "Проверьте наличие удобств (душ, туалет, электричество)",
//       "Уточните возможность проживания с животными",
//       "Оцените расстояние до цивилизации (аптека, магазин)",
//       "Просмотрите отзывы о чистоте территории",
//       "Выясните наличие детских площадок",
//       "Обсудите возможность раннего заезда"
//     ],
//     backButton: "Вернуться в блог"
//   }
// }

// function ResortGuide() {
//   const { currentLanguage } = useLanguage()
//   const t = RESORT_CONTENT[currentLanguage]
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
//                 src="/camp.png"
//                 alt={t.title}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   objectPosition: 'center'
//                 }}
//                 loading="eager" // Предзагрузка изображения для ускорения
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

//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Cottage fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.benefitsTitle}
//               </Typography>
              
//               <List dense={isMobile}>
//                 {t.benefits.map((item, index) => (
//                   <ListItem key={`benefit-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
//                     <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
//                     </ListItemIcon>
//                     <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
//                       {item}
//                     </Typography>
//                   </ListItem>
//                 ))}
//               </List>
//             </Box>

//             <Box sx={{ mb: 4 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Terrain fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.activitiesTitle}
//               </Typography>
              
//               <Box sx={{ 
//                 display: 'grid', 
//                 gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
//                 gap: 3 
//               }}>
//                 {t.activities.map((activity, index) => (
//                   <Paper key={`activity-${index}`} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
//                       {activity.icon}
//                       <Typography variant="h6" sx={{ ml: 1, color: 'primary.main' }}>
//                         {activity.name}
//                       </Typography>
//                     </Box>
//                     <Typography variant="body2">
//                       {activity.desc}
//                     </Typography>
//                   </Paper>
//                 ))}
//               </Box>
//             </Box>

//             <Box sx={{ mb: 3 }}>
//               <Typography variant="h5" component="h2" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Spa fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
//           <RelatedPosts currentSlug="campGuide" />

//           <Box sx={{ textAlign: 'center', mt: 4 }}>
//             <Link href="/blog" passHref legacyBehavior>
//               <Button 
//                 variant="contained" 
//                 color="primary"
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

// export default function ResortPage() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <ResortGuide />
//       </LanguageProvider>
//     </Provider>
//   )
// }


'use client'

import React from 'react'
import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Divider } from '@mui/material'
import Link from 'next/link'
import { Forest, Hiking, Spa, CheckCircle, ArrowBack, Terrain, Cottage, OutdoorGrill, Pets, DirectionsBike } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'

const RESORT_CONTENT = {
  ua: {
    title: "Бази відпочинку серед природи",
    metaDescription: "🔝 Кращі бази відпочинку в лісах, горах та на берегах озер. Активний відпочинок, риболовля, прогулянки та повне занурення в природу.",
    subtitle: "Як провести час на базі відпочинку з максимальною користю?",
    benefitsTitle: "Переваги відпочинку на природі",
    benefits: [
      "Повне занурення в природне середовище",
      "Можливість активного відпочинку (риболовля, велопрогулянки)",
      "Чисте повітря та натуральні звуки природи",
      "Відсутність міського шуму та стресу",
      "Ідеально для сімейного відпочинку з дітьми",
      "Можливість орендувати весь котедж або будиночок",
      "Доступ до унікальних природних пам'яток"
    ],
    activitiesTitle: "Активності на базі відпочинку",
    activities: [
      { name: "Риболовля", icon: <Hiking />, desc: "Прогулянки різними маршрутами різної складності" },
      { name: "Прогулянки лісом", icon: <Forest />, desc: "Насолоджуйтесь чистим повітрям і краєвидами" },
      { name: "Велопрогулянки", icon: <DirectionsBike />, desc: "Оренда велосипедів та спеціальні треки" },
      { name: "Барбекю", icon: <OutdoorGrill />, desc: "Місця для приготування їжі на відкритому повітрі" }
    ],
    tipsTitle: "Як вибрати ідеальну базу відпочинку?",
    tips: [
      "Визначтесь з типом локації (ліс, озеро, гори)",
      "Перевірте наявність зручностей (душ, туалет, електрика)",
      "Уточніть можливість проживання з тваринами",
      "Оцініть відстань до цивілізації (аптека, магазин)",
      "Перегляньте відгуки про чистоту території",
      "З'ясуйте наявність дитячих майданчиків",
      "Обговоріть можливість раннього заїзду"
    ],
    backButton: "Повернутись до блогу"
  },
  ru: {
    title: "Базы отдыха на природе",
    metaDescription: "🔝 Лучшие базы отдыха в лесах, горах и на берегах озер. Активный отдых, рыбалка, прогулки и полное погружение в природу.",
    subtitle: "Как провести время на базе отдыха с максимальной пользой?",
    benefitsTitle: "Преимущества отдыха на природе",
    benefits: [
      "Полное погружение в природную среду",
      "Возможность активного отдыха (рыбалка, велопрогулки)",
      "Чистый воздух и натуральные звуки природы",
      "Отсутствие городского шума и стресса",
      "Идеально для семейного отдыха с детьми",
      "Возможность арендовать весь коттедж или домик",
      "Доступ к уникальным природным достопримечательностям"
    ],
    activitiesTitle: "Активности на базе отдыха",
    activities: [
      { name: "Рыбалка", icon: <Hiking />, desc: "Прогулки разными маршрутами различной сложности" },
      { name: "Прогулки по лесу", icon: <Forest />, desc: "Наслаждайтесь чистым воздухом и пейзажами" },
      { name: "Велопрогулки", icon: <DirectionsBike />, desc: "Аренда велосипедов и специальные треки" },
      { name: "Барбекю", icon: <OutdoorGrill />, desc: "Места для приготовления пищи на открытом воздухе" }
    ],
    tipsTitle: "Как выбрать идеальную базу отдыха?",
    tips: [
      "Определитесь с типом локации (лес, озеро, горы)",
      "Проверьте наличие удобств (душ, туалет, электричество)",
      "Уточните возможность проживания с животными",
      "Оцените расстояние до цивилизации (аптека, магазин)",
      "Просмотрите отзывы о чистоте территории",
      "Выясните наличие детских площадок",
      "Обсудите возможность раннего заезда"
    ],
    backButton: "Вернуться в блог"
  }
}

function ResortGuide({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const t = RESORT_CONTENT[currentLanguage]
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
                src="/camp.png"
                alt={t.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
                loading="eager" // Предзагрузка изображения для ускорения
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

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Cottage fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.benefitsTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.benefits.map((item, index) => (
                  <ListItem key={`benefit-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.9rem' : '1rem' }}>
                      {item}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Terrain fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.activitiesTitle}
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: 3 
              }}>
                {t.activities.map((activity, index) => (
                  <Paper key={`activity-${index}`} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                    <Box sx={{ display: 'flex', alignItems: 'center', mb: 1 }}>
                      {activity.icon}
                      <Typography variant="h6" sx={{ ml: 1, color: 'primary.main' }}>
                        {activity.name}
                      </Typography>
                    </Box>
                    <Typography variant="body2">
                      {activity.desc}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Spa fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
          <RelatedPosts currentSlug="campGuide" />

          <Box sx={{ textAlign: 'center', mt: 4 }}>
            <Link href="/blog" passHref legacyBehavior>
              <Button 
                variant="contained" 
                color="primary"
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
        <Footer />
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

export default ResortGuide