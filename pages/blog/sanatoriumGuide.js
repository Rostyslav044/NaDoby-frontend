'use client'

import React from 'react'
import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Button, Chip, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery, Grid } from '@mui/material'
import Link from 'next/link'
import { MedicalServices, Spa, Pool, FitnessCenter, Restaurant, Nature, CheckCircle, ArrowBack } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'


const SANATORIUM_CONTENT = {
  ua: {
    title: "Пансіонати з лікувальними програмами",
    metaDescription: "🔝 Найкращі лікувальні пансіонати України. Спеціалізовані програми оздоровлення під наглядом лікарів.",
    subtitle: "Як вибрати пансіонат з максимальною користю для здоров'я",
    intro: "Лікувальні пансіонати - це ідеальне поєднання відпочинку та оздоровлення. Вони пропонують спеціалізовані програми для різних захворювань під наглядом лікарів.",
    benefitsTitle: "Переваги лікувальних пансіонатів",
    benefits: [
      "Професійний медичний супровід",
      "Індивідуальні програми лікування",
      "Природні лікувальні фактори",
      "Комплексний підхід до оздоровлення",
      "Реабілітація після захворювань"
    ],
    typesTitle: "Види лікувальних програм",
    types: [
      {
        name: "Кардіологічні програми",
        desc: "Лікування та профілактика серцево-судинних захворювань",
        features: ["Діагностика", "Фізіотерапія", "Лікувальна фізкультура"],
        icon: <MedicalServices />
      },
      {
        name: "Ортопедичні програми",
        desc: "Реабілітація захворювань опорно-рухового апарату",
        features: ["Масаж", "Грязелікування", "Лікувальні ванни"],
        icon: <FitnessCenter />
      },
      {
        name: "Дерматологічні програми",
        desc: "Лікування шкірних захворювань з використанням природних факторів",
        features: ["Бальнеотерапія", "Фототерапія", "Кліматотерапія"],
        icon: <Spa />
      }
    ],
    tipsTitle: "Як правильно вибрати пансіонат?",
    tips: [
      "Визначте основні проблеми зі здоров'ям для вибору профілю",
      "Звертайте увагу на кваліфікацію медичного персоналу",
      "Перевірте наявність необхідних лікувальних процедур",
      "Уточніть умови проживання та харчування",
      "Оберіть оптимальний термін перебування (від 14 днів)"
    ],
    backButton: "Повернутись до блогу",
    features: [
      { icon: <MedicalServices />, label: "Медичний супровід" },
      { icon: <Pool />, label: "Лікувальні басейни" },
      { icon: <Nature />, label: "Природні фактори" },
      { icon: <Restaurant />, label: "Дієтичне харчування" },
      { icon: <Spa />, label: "SPA-процедури" }
    ]
  },
  ru: {
    title: "Пансионаты с лечебными программами",
    metaDescription: "🔝 Лучшие лечебные пансионаты Украины. Специализированные программы оздоровления под наблюдением врачей.",
    subtitle: "Как выбрать пансионат с максимальной пользой для здоровья",
    intro: "Лечебные пансионаты - это идеальное сочетание отдыха и оздоровления. Они предлагают специализированные программы для различных заболеваний под наблюдением врачей.",
    benefitsTitle: "Преимущества лечебных пансионатов",
    benefits: [
      "Профессиональное медицинское сопровождение",
      "Индивидуальные программы лечения",
      "Природные лечебные факторы",
      "Комплексный подход к оздоровлению",
      "Реабилитация после заболеваний"
    ],
    typesTitle: "Виды лечебных программ",
    types: [
      {
        name: "Кардиологические программы",
        desc: "Лечение и профилактика сердечно-сосудистых заболеваний",
        features: ["Диагностика", "Физиотерапия", "Лечебная физкультура"],
        icon: <MedicalServices />
      },
      {
        name: "Ортопедические программы",
        desc: "Реабилитация заболеваний опорно-двигательного аппарата",
        features: ["Массаж", "Грязелечение", "Лечебные ванны"],
        icon: <FitnessCenter />
      },
      {
        name: "Дерматологические программы",
        desc: "Лечение кожных заболеваний с использованием природных факторов",
        features: ["Бальнеотерапия", "Фототерапия", "Климатотерапия"],
        icon: <Spa />
      }
    ],
    tipsTitle: "Как правильно выбрать пансионат?",
    tips: [
      "Определите основные проблемы со здоровьем для выбора профиля",
      "Обращайте внимание на квалификацию медицинского персонала",
      "Проверьте наличие необходимых лечебных процедур",
      "Уточните условия проживания и питания",
      "Выберите оптимальный срок пребывания (от 14 дней)"
    ],
    backButton: "Вернуться в блог",
    features: [
      { icon: <MedicalServices />, label: "Медсопровождение" },
      { icon: <Pool />, label: "Лечебные бассейны" },
      { icon: <Nature />, label: "Природные факторы" },
      { icon: <Restaurant />, label: "Диетическое питание" },
      { icon: <Spa />, label: "SPA-процедуры" }
    ]
  }
}

function SanatoriumGuide() {
  const { currentLanguage } = useLanguage()
  const t = SANATORIUM_CONTENT[currentLanguage]
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
                src="/pansionat.png"
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
                <MedicalServices fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.intro.split(':')[0]}
              </Typography>
              <Typography>
                {t.intro.split(':')[1]}
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
                <Spa fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

            <Box sx={{ mb: 3, mt: 10 }}>
              <Typography variant="h5" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.2rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <MedicalServices fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
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

export default function SanatoriumPage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <SanatoriumGuide />
      </LanguageProvider>
    </Provider>
  )
}