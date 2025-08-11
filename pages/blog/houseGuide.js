'use client'

import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { Home, Nature, Groups, FamilyRestroom, Pets, CheckCircle, ArrowBack, LocalFireDepartment, OutdoorGrill, Wifi, AcUnit } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'

const HOUSE_CONTENT = {
  ua: {
    title: "Будинки для відпочинку: затишок та свобода",
    metaDescription: "🔝 Оренда приватних будинків по всій Україні. Ідеально для сімей, компаній друзів та романтичних подорожей. Без комісій та посередників.",
    subtitle: "Чому оренда будинку краща за готель?",
    advantagesTitle: "Основні переваги приватних будинків",
    advantages: [
      "Повна приватність – ніхто не турбує",
      "В 2-3 рази вигідніше для компаній від 4 осіб",
      "Власний простір: сад, тераса, мангал, парковка",
      "Можливість відпочинку з тваринами",
      "Повноцінна кухня для сімейних обідів",
      "Гнучкий графік заїзду/виїзду",
      "Унікальні локації: біля лісу, озера, в горах",
      "Додаткові послуги: сауна, прокат спорядження"
    ],
    tipsTitle: "Як вибрати ідеальний будинок?",
    tips: [
      "Визначтесь з локацією (гірська, лісова, приозерна)",
      "Перевірте наявність всіх зручностей (опалення, гаряча вода)",
      "Уточніть правила розміщення з тваринами",
      "Оцініть відстань до найближчих магазинів",
      "Перегляньте фото всіх приміщень",
      "З'ясуйте наявність дитячих зручностей",
      "Обговоріть можливість раннього заїзду"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <Home />, label: "Повний комфорт" },
      { icon: <Nature />, label: "Природа" },
      { icon: <FamilyRestroom />, label: "Для сімей" },
      { icon: <Pets />, label: "Pet-friendly" },
      { icon: <LocalFireDepartment />, label: "Мангал" },
      { icon: <OutdoorGrill />, label: "Барбекю" }
    ]
  },
  ru: {
    title: "Дома для отдыха: уют и свобода",
    metaDescription: "🔝 Аренда частных домов по всей Украине. Идеально для семей, компаний друзей и романтических путешествий. Без комиссий и посредников.",
    subtitle: "Почему аренда дома лучше отеля?",
    advantagesTitle: "Основные преимущества частных домов",
    advantages: [
      "Полная приватность – никто не беспокоит",
      "В 2-3 раза выгоднее для компаний от 4 человек",
      "Собственное пространство: сад, терраса, мангал, парковка",
      "Возможность отдыха с животными",
      "Полноценная кухня для семейных обедов",
      "Гибкий график заезда/выезда",
      "Уникальные локации: у леса, озера, в горах",
      "Дополнительные услуги: сауна, прокат снаряжения"
    ],
    tipsTitle: "Как выбрать идеальный дом?",
    tips: [
      "Определитесь с локацией (горная, лесная, приозерная)",
      "Проверьте наличие всех удобств (отопление, горячая вода)",
      "Уточните правила размещения с животными",
      "Оцените расстояние до ближайших магазинов",
      "Просмотрите фото всех помещений",
      "Выясните наличие детских удобств",
      "Обсудите возможность раннего заезда"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <Home />, label: "Полный комфорт" },
      { icon: <Nature />, label: "Природа" },
      { icon: <FamilyRestroom />, label: "Для семей" },
      { icon: <Pets />, label: "С животными" },
      { icon: <LocalFireDepartment />, label: "Мангал" },
      { icon: <OutdoorGrill />, label: "Барбекю" }
    ]
  }
}

function HouseGuide() {
  const { currentLanguage } = useLanguage()
  const t = HOUSE_CONTENT[currentLanguage]
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
                src="/house.png"
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

export default function HousePage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <HouseGuide />
      </LanguageProvider>
    </Provider>
  )
}