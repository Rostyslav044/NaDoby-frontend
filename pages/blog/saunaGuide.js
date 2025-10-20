'use client'

import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { Spa, MedicalServices, HotTub, CheckCircle, ArrowBack, Water, HealthAndSafety, Bathtub, Thermostat } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'

const SAUNA_CONTENT = {
  ua: {
    title: "Сауни та Бані: здоров'я та релакс",
    metaDescription: "🔝 Оренда саун та бань по всій Україні. Правила відпочинку, корисні поради та пільги для здоров'я. Фітнес, релакс та очищення організму.",
    subtitle: "Як правильно відпочивати у сауні для максимальної користі?",
    benefitsTitle: "Користь для здоров'я",
    benefits: [
      "Виведення токсинів через активне потовиділення",
      "Покращення кровообігу та роботи серця",
      "Зміцнення імунітету та боротьба з застудами",
      "Зняття м'язової напруги після тренувань",
      "Очищення шкіри та зменшення целюліту",
      "Зниження рівня стресу та поліпшення сну",
      "Покращення роботи дихальної системи"
    ],
    rulesTitle: "Правила відвідування",
    rules: [
      "Не їжте щонайменше 1-1.5 години перед відвідуванням",
      "Починайте з 5-7 хвилин у парній, поступово збільшуючи час",
      "Обов'язково використовуйте взуття для сауни",
      "Після кожної заходи в парну відпочивайте 10-15 хвилин",
      "Вживайте достатньо води або трав'яного чаю",
      "Уникайте алкоголю до та підля процедур",
      "Не відвідуйте сауну при підвищеній температурі"
    ],
    typesTitle: "Види саун та їх особливості",
    types: [
      { name: "Фінська сауна", temp: "80-110°C", humidity: "5-15%", effect: "Інтенсивне прогрівання" },
      { name: "Руська баня", temp: "60-70°C", humidity: "40-60%", effect: "М'яке пропарювання" },
      { name: "Хаммам", temp: "40-50°C", humidity: "80-100%", effect: "Очищення шкіри" },
      { name: "Інфрачервона", temp: "45-60°C", humidity: "40-50%", effect: "Глибоке прогрівання м'язів" }
    ],
    backButton: "Повернутись до блогу"
  },
  ru: {
    title: "Сауны и Бани: здоровье и релакс",
    metaDescription: "🔝 Аренда саун и бань по всей Украине. Правила отдыха, полезные советы и польза для здоровья. Фитнес, релакс и очищение организма.",
    subtitle: "Как правильно отдыхать в сауне для максимальной пользы?",
    benefitsTitle: "Польза для здоровья",
    benefits: [
      "Выведение токсинов через активное потоотделение",
      "Улучшение кровообращения и работы сердца",
      "Укрепление иммунитета и борьба с простудами",
      "Снятие мышечного напряжения после тренировок",
      "Очищение кожи и уменьшение целлюлита",
      "Снижение уровня стресса и улучшение сна",
      "Улучшение работы дыхательной системы"
    ],
    rulesTitle: "Правила посещения",
    rules: [
      "Не ешьте минимум 1-1.5 часа перед посещением",
      "Начинайте с 5-7 минут в парной, постепенно увеличивая время",
      "Обязательно используйте обувь для сауны",
      "После каждого захода в парную отдыхайте 10-15 минут",
      "Употребляйте достаточно воды или травяного чая",
      "Избегайте алкоголя до и во время процедур",
      "Не посещайте сауну при повышенной температуре"
    ],
    typesTitle: "Виды саун и их особенности",
    types: [
      { name: "Финская сауна", temp: "80-110°C", humidity: "5-15%", effect: "Интенсивный прогрев" },
      { name: "Русская баня", temp: "60-70°C", humidity: "40-60%", effect: "Мягкое пропаривание" },
      { name: "Хаммам", temp: "40-50°C", humidity: "80-100%", effect: "Очищение кожи" },
      { name: "Инфракрасная", temp: "45-60°C", humidity: "40-50%", effect: "Глубокий прогрев мышц" }
    ],
    backButton: "Вернуться в блог"
  }
}

function SaunaGuide() {
  const { currentLanguage } = useLanguage()
  const t = SAUNA_CONTENT[currentLanguage]
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
                src="/sauna.png"
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
                <MedicalServices fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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
                <HealthAndSafety fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.rulesTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.rules.map((item, index) => (
                  <ListItem key={`rule-${index}`} sx={{ alignItems: 'flex-start', px: 0 }}>
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

            <Box sx={{ mb: 3 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <HotTub fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.typesTitle}
              </Typography>
              
              <Box sx={{ 
                display: 'grid', 
                gridTemplateColumns: isMobile ? '1fr' : 'repeat(2, 1fr)', 
                gap: 3 
              }}>
                {t.types.map((type, index) => (
                  <Paper key={`type-${index}`} elevation={2} sx={{ p: 2, borderRadius: 2 }}>
                    <Typography variant="h6" sx={{ color: 'primary.main', mb: 1 }}>
                      {type.name}
                    </Typography>
                    <Typography variant="body2" sx={{ display: 'flex', alignItems: 'center', mb: 0.5 }}>
                      <Thermostat color="secondary" sx={{ mr: 1 }} /> 
                      {type.temp} ({type.humidity} вологості)
                    </Typography>
                    <Typography variant="body2">
                      {type.effect}
                    </Typography>
                  </Paper>
                ))}
              </Box>
            </Box>
          </Paper>
          <RelatedPosts currentSlug="saunaGuide" />
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

export default function SaunaPage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <SaunaGuide />
      </LanguageProvider>
    </Provider>
  )
}