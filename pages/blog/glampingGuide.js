



// 'use client'

// import React from 'react'
// import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid } from '@mui/material'
// import Link from 'next/link'
// import { Home, Nature, FamilyRestroom, Pets, CheckCircle, ArrowBack, LocalFireDepartment, OutdoorGrill, AcUnit } from '@mui/icons-material'
// import Footer from "@/app/components/Footer"
// import Head from 'next/head'

// const GLAMPING_CONTENT = {
//   ua: {
//     title: "Глемпінг: розкіш серед природи",
//     metaDescription: "🔝 Найкращі глемпінг локації України. Комфортні намети з усіма зручностями серед дикої природи.",
//     subtitle: "Топ-5 преміальних глемпінг локацій в Україні",
//     conceptTitle: "Що таке глемпінг?",
//     concept: "Глемпінг (glamorous + camping) - це кемпінг з елементами розкоші, де ви насолоджуєтесь природою, не відмовляючись від комфорту.",
//     benefitsTitle: "Переваги глемпінгу",
//     benefits: [
//       "Ексклюзивні локації серед нетріпної природи",
//       "Повноцінні ліжка та зручні меблі",
//       "Особливий романтичний антураж",
//       "Екологічний відпочинок",
//       "Персонал та додаткові послуги"
//     ],
//     locationsTitle: "Топ-5 глемпінг локацій України",
//     locations: [
//       {
//         name: "Карпатське небо",
//         desc: "Намети на висоті 1200м з панорамним видом на гори",
//         features: ["Джакузі під відкритим небом", "Кав'ярня на терасі"],
//         icon: <Nature />
//       },
//       {
//         name: "Лісовий глампінг",
//         desc: "Розкішні намети серед столітніх дерев",
//         features: ["Камін у наметі", "Екскурсії з лісником"],
//         icon: <Nature />
//       },
//       {
//         name: "Озерний глампінг",
//         desc: "Намети на палях над водою",
//         features: ["Можливість риболовлі", "Сніданок на плоту"],
//         icon: <AcUnit />
//       },
//       {
//         name: "Степові вітрила",
//         desc: "Намети у формі вітрил серед степів",
//         features: ["Споглядання зір", "Дегустація вин"],
//         icon: <Nature />
//       },
//       {
//         name: "Каньйон Розкоші",
//         desc: "Намети на краю каньйону",
//         features: ["Сходи до річки", "Йога на схилах"],
//         icon: <Nature />
//       }
//     ],
//     tipsTitle: "Як підготуватись до глемпінгу?",
//     tips: [
//       "Візьміть теплий одяг - вночі може бути прохолодно",
//       "Не забудьте фотоапарат для неймовірних кадрів",
//       "Уточніть наявність розеток у наметі",
//       "Оберіть оптимальний сезон (травень-вересень)",
//       "Замовте додаткові послуги заздалегідь"
//     ],
//     backButton: "Повернутись до блогу",
//     features: [
//       { icon: <Home />, label: "Розкішні намети" },
//       { icon: <Nature />, label: "Природа" },
//       { icon: <FamilyRestroom />, label: "Для сімей" },
//       { icon: <Pets />, label: "Pet-friendly" },
//       { icon: <LocalFireDepartment />, label: "Мангал" }
//     ]
//   },
//   ru: {
//     title: "Глэмпинг: роскошь среди природы",
//     metaDescription: "🔝 Лучшие глэмпинг локации Украины. Комфортные палатки со всеми удобствами среди дикой природы.",
//     subtitle: "Топ-5 премиальных глэмпинг локаций в Украине",
//     conceptTitle: "Что такое глэмпинг?",
//     concept: "Глэмпинг (glamorous + camping) - это кемпинг с элементами роскоши, где вы наслаждаетесь природой, не отказываясь от комфорта.",
//     benefitsTitle: "Преимущества глэмпинга",
//     benefits: [
//       "Эксклюзивные локации среди нетронутой природы",
//       "Полноценные кровати и удобная мебель",
//       "Особый романтический антураж",
//       "Экологичный отдых",
//       "Персонал и дополнительные услуги"
//     ],
//     locationsTitle: "Топ-5 глэмпинг локаций Украины",
//     locations: [
//       {
//         name: "Карпатское небо",
//         desc: "Палатки на высоте 1200м с панорамным видом на горы",
//         features: ["Джакузи под открытым небом", "Кофейня на террасе"],
//         icon: <Nature />
//       },
//       {
//         name: "Лесной глампинг",
//         desc: "Роскошные палатки среди вековых деревьев",
//         features: ["Камин в палатке", "Экскурсии с лесником"],
//         icon: <Nature />
//       },
//       {
//         name: "Озерный глампинг",
//         desc: "Палатки на сваях над водой",
//         features: ["Возможность рыбалки", "Завтрак на плоту"],
//         icon: <AcUnit />
//       },
//       {
//         name: "Степные паруса",
//         desc: "Палатки в форме парусов среди степей",
//         features: ["Наблюдение за звездами", "Дегустация вин"],
//         icon: <Nature />
//       },
//       {
//         name: "Каньон Роскоши",
//         desc: "Палатки на краю каньона",
//         features: ["Спуск к реке", "Йога на склонах"],
//         icon: <Nature />
//       }
//     ],
//     tipsTitle: "Как подготовиться к глэмпингу?",
//     tips: [
//       "Возьмите теплую одежду - ночью может быть прохладно",
//       "Не забудьте фотоаппарат для невероятных кадров",
//       "Уточните наличие розеток в палатке",
//       "Выберите оптимальный сезон (май-сентябрь)",
//       "Закажите дополнительные услуги заранее"
//     ],
//     backButton: "Вернуться в блог",
//     features: [
//       { icon: <Home />, label: "Роскошные палатки" },
//       { icon: <Nature />, label: "Природа" },
//       { icon: <FamilyRestroom />, label: "Для семей" },
//       { icon: <Pets />, label: "С животными" },
//       { icon: <LocalFireDepartment />, label: "Мангал" }
//     ]
//   }
// }

// function GlampingGuide() {
//   const { currentLanguage } = useLanguage()
//   const t = GLAMPING_CONTENT[currentLanguage]
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
//                 src="/glamping.png"
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

//             <Box sx={{ mb: 4, p: 3, backgroundColor: '#f0f7f4', borderRadius: 2 }}>
//               <Typography variant="h5" component="h3" sx={{
//                 display: 'flex',
//                 alignItems: 'center',
//                 gap: 1,
//                 fontSize: isMobile ? '1.2rem' : '1.5rem',
//                 mb: 2,
//                 color: 'primary.dark'
//               }}>
//                 <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.conceptTitle}
//               </Typography>
//               <Typography>
//                 {t.concept}
//               </Typography>
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
//                 <Nature fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

//               <Box sx={{ 
//                 display: 'flex', 
//                 flexWrap: 'wrap', 
//                 gap: 1, 
//                 mt: 3,
//                 justifyContent: 'center'
//               }}>
//                 {t.features.map((feature, index) => (
//                   <Chip 
//                     key={`feature-${index}`}
//                     icon={feature.icon} 
//                     label={feature.label} 
//                     size={isMobile ? 'small' : 'medium'}
//                     sx={{ 
//                       '& .MuiChip-icon': { color: 'primary.main' },
//                       backgroundColor: 'background.paper'
//                     }}
//                   />
//                 ))}
//               </Box>
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
//                 <LocalFireDepartment fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
//                 {t.locationsTitle}
//               </Typography>
              
//               <Grid container spacing={3}>
//                 {t.locations.map((location, index) => (
//                   <Grid item xs={12} sm={6} key={`location-${index}`}>
//                     <Paper elevation={2} sx={{ p: 2, height: '100%', borderRadius: 2 }}>
//                       <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
//                         {React.cloneElement(location.icon, { 
//                           color: 'primary',
//                           fontSize: isMobile ? 'medium' : 'large'
//                         })}
//                         <Typography variant="h6" sx={{ color: 'primary.main' }}>
//                           {location.name}
//                         </Typography>
//                       </Box>
//                       <Typography variant="body2" sx={{ mb: 2 }}>
//                         {location.desc}
//                       </Typography>
//                       <List dense>
//                         {location.features.map((feature, idx) => (
//                           <ListItem key={`feature-${index}-${idx}`} sx={{ py: 0 }}>
//                             <ListItemIcon sx={{ minWidth: 32 }}>
//                               <CheckCircle fontSize="small" color="secondary" />
//                             </ListItemIcon>
//                             <Typography variant="body2">
//                               {feature}
//                             </Typography>
//                           </ListItem>
//                         ))}
//                       </List>
//                     </Paper>
//                   </Grid>
//                 ))}
//               </Grid>
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
//                 <FamilyRestroom fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

// export default function GlampingPage() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <GlampingGuide />
//       </LanguageProvider>
//     </Provider>
//   )
// }




'use client'

import React from 'react'
import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid } from '@mui/material'
import Link from 'next/link'
import { Home, Nature, FamilyRestroom, Pets, CheckCircle, ArrowBack, LocalFireDepartment, OutdoorGrill, AcUnit } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'

const GLAMPING_CONTENT = {
  ua: {
    title: "Глемпінг: розкіш серед природи",
    metaDescription: "🔝 Найкращі глемпінг локації України. Комфортні намети з усіма зручностями серед дикої природи.",
    subtitle: "Унікальний досвід відпочинку на природі з комфортом",
    conceptTitle: "Що таке глемпінг?",
    concept: "Глемпінг (glamorous + camping) - це кемпінг з елементами розкоші, де ви насолоджуєтесь природою, не відмовляючись від комфорту. Це ідеальний варіант для тих, хто хоче бути ближче до природи, але не готовий відмовлятися від зручностей.",
    benefitsTitle: "Чому варто спробувати глемпінг?",
    benefits: [
      "Ексклюзивні локації серед нетріпної природи",
      "Повноцінні ліжка та зручні меблі в наметах",
      "Особливий романтичний антураж",
      "Екологічний відпочинок без шкоди для природи",
      "Персонал, який подбає про ваш комфорт"
    ],
    typesTitle: "Різновиди глемпінгу",
    types: [
      {
        name: "Лісовий глемпінг",
        desc: "Намети серед дерев з можливістю споглядання дикої природи",
        features: ["Прогулянки лісом", "Спостереження за птахами"],
        icon: <Nature />
      },
      {
        name: "Гірський глемпінг",
        desc: "Намети з панорамним видом на гори",
        features: ["Трекінгові маршрути", "Свіжі гірські повітря"],
        icon: <Nature />
      },
      {
        name: "Біля водойм",
        desc: "Намети на березі озер чи річок",
        features: ["Купання у природних водоймах", "Риболовля"],
        icon: <AcUnit />
      }
    ],
    tipsTitle: "Поради для новачків",
    tips: [
      "Візьміть теплий одяг - вночі може бути прохолодно навіть влітку",
      "Не забудьте засоби від комарів та інших комах",
      "Уточніть, які зручності є у наметі (душ, туалет, розетки)",
      "Оберіть оптимальний сезон для вашого типу глемпінгу",
      "Замовте додаткові послуги заздалегідь (екскурсії, SPA тощо)"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <Home />, label: "Комфортні намети" },
      { icon: <Nature />, label: "Екологічно" },
      { icon: <FamilyRestroom />, label: "Для всієї родини" },
      { icon: <Pets />, label: "З домашніми улюбленцями" },
      { icon: <LocalFireDepartment />, label: "Місце для вогнища" }
    ]
  },
  ru: {
    title: "Глэмпинг: роскошь среди природы",
    metaDescription: "🔝 Лучшие глэмпинг локации Украины. Комфортные палатки со всеми удобствами среди дикой природы.",
    subtitle: "Уникальный опыт отдыха на природе с комфортом",
    conceptTitle: "Что такое глэмпинг?",
    concept: "Глэмпинг (glamorous + camping) - это кемпинг с элементами роскоши, где вы наслаждаетесь природой, не отказываясь от комфорта. Это идеальный вариант для тех, кто хочет быть ближе к природе, но не готов отказываться от удобств.",
    benefitsTitle: "Почему стоит попробовать глэмпинг?",
    benefits: [
      "Эксклюзивные локации среди нетронутой природы",
      "Полноценные кровати и удобная мебель в палатках",
      "Особый романтический антураж",
      "Экологичный отдых без вреда для природы",
      "Персонал, который позаботится о вашем комфорте"
    ],
    typesTitle: "Разновидности глэмпинга",
    types: [
      {
        name: "Лесной глэмпинг",
        desc: "Палатки среди деревьев с возможностью наблюдения за дикой природой",
        features: ["Прогулки по лесу", "Наблюдение за птицами"],
        icon: <Nature />
      },
      {
        name: "Горный глэмпинг",
        desc: "Палатки с панорамным видом на горы",
        features: ["Треккинговые маршруты", "Свежий горный воздух"],
        icon: <Nature />
      },
      {
        name: "У водоемов",
        desc: "Палатки на берегу озер или рек",
        features: ["Купание в природных водоемах", "Рыбалка"],
        icon: <AcUnit />
      }
    ],
    tipsTitle: "Советы для новичков",
    tips: [
      "Возьмите теплую одежду - ночью может быть прохладно даже летом",
      "Не забудьте средства от комаров и других насекомых",
      "Уточните, какие удобства есть в палатке (душ, туалет, розетки)",
      "Выберите оптимальный сезон для вашего типа глэмпинга",
      "Закажите дополнительные услуги заранее (экскурсии, SPA и т.д.)"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <Home />, label: "Комфортные палатки" },
      { icon: <Nature />, label: "Экологично" },
      { icon: <FamilyRestroom />, label: "Для всей семьи" },
      { icon: <Pets />, label: "С домашними питомцами" },
      { icon: <LocalFireDepartment />, label: "Место для костра" }
    ]
  }
}

function GlampingGuide() {
  const { currentLanguage } = useLanguage()
  const t = GLAMPING_CONTENT[currentLanguage]
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Head>
        <title>{t.title}</title>
        <meta name="description" content={t.metaDescription} />
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
                src="/glamping.png"
                alt={t.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
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

            <Box sx={{ mb: 4, p: 3, backgroundColor: '#f0f7f4', borderRadius: 2 }}>
              <Typography variant="h5" component="h3" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Home fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.conceptTitle}
              </Typography>
              <Typography>
                {t.concept}
              </Typography>
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
                <Nature fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                mt: 3,
                justifyContent: 'center'
              }}>
                {t.features.map((feature, index) => (
                  <Chip 
                    key={`feature-${index}`}
                    icon={feature.icon} 
                    label={feature.label} 
                    size={isMobile ? 'small' : 'medium'}
                    sx={{ 
                      '& .MuiChip-icon': { color: 'primary.main' },
                      backgroundColor: 'background.paper'
                    }}
                  />
                ))}
              </Box>
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
                <LocalFireDepartment fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.typesTitle}
              </Typography>
              
              <Grid container spacing={3}>
                {t.types.map((type, index) => (
                  <Grid item xs={12} sm={6} key={`type-${index}`}>
                    <Paper elevation={2} sx={{ p: 2, height: '100%', borderRadius: 2 }}>
                      <Box sx={{ display: 'flex', alignItems: 'center', gap: 2, mb: 1 }}>
                        {React.cloneElement(type.icon, { 
                          color: 'primary',
                          fontSize: isMobile ? 'medium' : 'large'
                        })}
                        <Typography variant="h6" sx={{ color: 'primary.main' }}>
                          {type.name}
                        </Typography>
                      </Box>
                      <Typography variant="body2" sx={{ mb: 2 }}>
                        {type.desc}
                      </Typography>
                      <List dense>
                        {type.features.map((feature, idx) => (
                          <ListItem key={`feature-${index}-${idx}`} sx={{ py: 0 }}>
                            <ListItemIcon sx={{ minWidth: 32 }}>
                              <CheckCircle fontSize="small" color="secondary" />
                            </ListItemIcon>
                            <Typography variant="body2">
                              {feature}
                            </Typography>
                          </ListItem>
                        ))}
                      </List>
                    </Paper>
                  </Grid>
                ))}
              </Grid>
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
                <FamilyRestroom fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

          <Box sx={{ textAlign: 'center', mt: 2 }}>
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

export default function GlampingPage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <GlampingGuide />
      </LanguageProvider>
    </Provider>
  )
}