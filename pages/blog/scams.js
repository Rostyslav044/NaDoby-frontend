



'use client'

import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { store } from "@/app/store"
import { Provider } from "react-redux"
import { Box, Typography, Container, Button, Chip, Alert, List, ListItem, ListItemIcon, Paper, useTheme, useMediaQuery } from '@mui/material'
import Link from 'next/link'
import { Warning, Security, VerifiedUser, Google, ContactMail, Public, Map, ArrowBack } from '@mui/icons-material'
import Footer from "@/app/components/Footer"
import Head from 'next/head'
import RelatedPosts from './components/RelatedPosts'

const BLOG_CONTENT = {
  ua: {
    title: "Як уникнути шахрайства при оренді",
    metaTitle: "Як уникнути шахрайства при оренді житла | Безпечна оренда квартир | NaDoby",
    metaDescription: "7 золотих правил безпечної оренди житла. Як перевірити власника та уникнути шахраїв при оренді квартир. Поради від NaDoby.com.ua",
    subtitle: "Експертні поради від NaDoby.com.ua",
    warningTitle: "Поширені схеми шахраїв",
    scams: [
      "Занижена ціна (нижче ринкової на 20-50%)",
      "Терміновість (\"я їду\", \"багато бажаючих\")",
      "Великий залог (більше 100% вартості за добу)"
    ],
    rulesTitle: "7 золотих правил безпечної угоди",
    rules: [
      "Перевіряйте власника: Google, GetContact (теги \"оренда\", \"обман\"), соцмережі",
      "Залог: 30-100% від добової вартості - це нормально",
      "Повну суму за оренду платіть тільки на місці, після огляду об'єкта та отримання ключів",
      "Перевіряйте фото квартири через Google Lens",
      "Просіть документи власника (паспорт або водійське посвідчення)",
      "Договір обов'язковий з усіма умовами",
      "Якщо сумніваєтесь — відмовляйтесь!"
    ],
    verificationTitle: "Інструменти для перевірки",
    reportText: "Знайшли підозріле оголошення? Повідомте нам на support@nadoby.com.ua",
    backButton: "Повернутись до блогу"
  },
  ru: {
    title: "Как избежать мошенничества при аренде",
    metaTitle: "Как избежать мошенничества при аренде жилья | Безопасная аренда квартир | NaDoby",
    metaDescription: "7 золотых правил безопасной аренды жилья. Как проверить владельца и избежать мошенников при аренде квартир. Советы от NaDoby.com.ua",
    subtitle: "Экспертные советы от NaDoby.com.ua",
    warningTitle: "Распространенные схемы мошенников",
    scams: [
      "Заниженная цена (ниже рыночной на 20-50%)",
      "Срочность (\"я уезжаю\", \"много желающих\")",
      "Большой залог (более 100% стоимости за сутки)"
    ],
    rulesTitle: "7 золотых правил безопасной сделки",
    rules: [
      "Проверяйте владельца: Google, GetContact (теги \"аренда\", \"обман\"), соцсети",
      "Залог: 30-100% от суточной стоимости - это нормально",
      "Полную сумму за аренду платите только на месте, после осмотра объекта и получения ключей",
      "Проверяйте фото квартиры через Google Lens",
      "Просите документы хозяина (паспорт или водительское удостоверение)",
      "Договор обязателен со всеми условиями",
      "Если сомневаетесь — отказывайтесь!"
    ],
    verificationTitle: "Инструменты для проверки",
    reportText: "Нашли подозрительное объявление? Сообщите нам на support@nadoby.com.ua",
    backButton: "Вернуться в блог"
  }
}

function ScamGuide() {
  const { currentLanguage } = useLanguage()
  const t = BLOG_CONTENT[currentLanguage]
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
      </Head>

      <Box sx={{ backgroundColor: '#f9f9f9', minHeight: '100vh' }}>
        <Header />
        
        <Container maxWidth="md" sx={{ py: isMobile ? 3 : 6, px: isMobile ? 2 : 4 }}>
          <Paper elevation={3} sx={{ 
            p: isMobile ? 3 : 4, 
            borderRadius: 2, 
            mb: 4
          }}>
            <Typography variant="h1" component="h1" sx={{ 
              fontWeight: 700,
              textAlign: 'center',
              color: 'primary.main',
              fontSize: isMobile ? '1.6rem' : '2rem',
              mb: 2
            }}>
              {t.title}
            </Typography>

            <Box sx={{ 
              width: '100%',
              
              height: isMobile ? 200 : 500,
              position: 'relative',
              mb: 8,
              borderRadius: 2,
              overflow: 'hidden',
              boxShadow: theme.shadows[2],
              
            }}>
              <img
                src="/scams.png" // Путь к вашему изображению
                alt={t.title}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  objectPosition: 'center'
                }}
              />
            </Box>

            <Typography variant="subtitle1" component="p" sx={{
              textAlign: 'center',
              color: 'text.secondary',
              mb: 4,
              fontSize: isMobile ? '0.95rem' : '1.1rem'
            }}>
              {t.subtitle}
            </Typography>

            <Box sx={{ mb: 4 }}>
              <Alert severity="warning" sx={{ 
                mb: 3, 
                fontSize: isMobile ? '0.95rem' : '1rem',
                '& .MuiAlert-icon': { 
                  color: '#ff9800',
                  alignItems: 'center'
                }
              }}>
                <Typography variant="h2" component="div" sx={{ 
                  fontWeight: 600,
                  mb: 1,
                  fontSize: isMobile ? '1.1rem' : '1.2rem',
                  color: '#e65100'
                }}>
                  ⚠️ {t.warningTitle}
                </Typography>
                
                <List dense>
                  {t.scams.map((scam, index) => (
                    <ListItem key={index} sx={{ px: 0, py: 0.5, alignItems: 'flex-start' }}>
                      <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                        <Warning color="warning" fontSize={isMobile ? 'small' : 'medium'} />
                      </ListItemIcon>
                      <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                        {scam}
                      </Typography>
                    </ListItem>
                  ))}
                </List>
              </Alert>
            </Box>

            <Box sx={{ mb: 4 }}>
              <Typography variant="h2" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Security fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.rulesTitle}
              </Typography>
              
              <List dense={isMobile}>
                {t.rules.map((rule, index) => (
                  <ListItem key={index} sx={{ py: 0.5, alignItems: 'flex-start' }}>
                    <ListItemIcon sx={{ minWidth: 32, mt: '2px' }}>
                      <VerifiedUser color="success" fontSize={isMobile ? 'small' : 'medium'} />
                    </ListItemIcon>
                    <Typography sx={{ fontSize: isMobile ? '0.95rem' : '1rem' }}>
                      {rule}
                    </Typography>
                  </ListItem>
                ))}
              </List>
            </Box>

            <Box sx={{ mb: 3 }}>
              <Typography variant="h2" component="h2" sx={{
                display: 'flex',
                alignItems: 'center',
                gap: 1,
                fontSize: isMobile ? '1.3rem' : '1.5rem',
                mb: 2,
                color: 'primary.dark'
              }}>
                <Public fontSize={isMobile ? 'small' : 'medium'} color="primary" /> 
                {t.verificationTitle}
              </Typography>
              
              <Box sx={{ 
                display: 'flex', 
                flexWrap: 'wrap', 
                gap: 1, 
                justifyContent: 'center',
                '& .MuiChip-root': {
                  fontSize: isMobile ? '0.85rem' : '0.9rem',
                  px: 1.5,
                  py: 1
                }
              }}>
                <Chip 
                  icon={<Google fontSize="small" />} 
                  label="Google" 
                  sx={{ backgroundColor: '#f1f3f4' }} 
                />
                <Chip 
                  icon={<ContactMail fontSize="small" />} 
                  label="GetContact" 
                  sx={{ backgroundColor: '#e3f2fd' }} 
                />
                <Chip 
                  icon={<Public fontSize="small" />} 
                  label={currentLanguage === 'ua' ? "Соцмережі" : "Соцсети"} 
                  sx={{ backgroundColor: '#e8f5e9' }} 
                />
                <Chip 
                  icon={<Map fontSize="small" />} 
                  label="Google Maps" 
                  sx={{ backgroundColor: '#e3f2fd' }} 
                />
              </Box>
            </Box>

            <Typography variant="body1" sx={{ 
              textAlign: 'center',
              fontSize: isMobile ? '0.95rem' : '1rem',
              mt: 3,
              color: 'text.secondary'
            }}>
              {t.reportText}
            </Typography>
          </Paper>
          <RelatedPosts currentSlug="scams" />
          <Box sx={{ textAlign: 'center', mt: 2 }}>
            <Link href="/blog" passHref legacyBehavior>
              <Button 
                variant="contained" 
                size={isMobile ? 'medium' : 'large'}
                startIcon={<ArrowBack fontSize={isMobile ? 'small' : 'medium'} />}
                sx={{ 
                  px: isMobile ? 3 : 4,
                  py: 1,
                  fontWeight: 600,
                  fontSize: isMobile ? '0.95rem' : '1rem',
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

export default function ScamsPage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ScamGuide />
      </LanguageProvider>
    </Provider>
  )
}