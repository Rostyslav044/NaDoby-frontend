


// 'use client'

// import { LanguageProvider, useLanguage } from "@/app/LanguageContext"
// import Header from "@/app/components/Header"
// import { store } from "@/app/store"
// import { Provider } from "react-redux"
// import { Warning } from '@mui/icons-material';  
// import { Box,Typography, Container, Card, CardContent, Button, Chip } from '@mui/material'
// import Image from 'next/image'
// import Link from 'next/link'
// import Head from 'next/head'

// const BLOG_CONTENT = {
//   ua: {
//     title: "Корисні поради та ідеї для вашої подорожі",
//     metaTitle: "Корисні поради для подорожей та оренди житла | NaDoby",
//     metaDescription: "🔝 Експертні поради з вибору житла: квартири, готелі, будинки, хостели. Як уникнути шахрайства та знайти ідеальний варіант для відпочинку.",
//     posts: [
//       // Основні категорії
//       {
//         title: "Як уникнути шахрайства при оренді",
//         content: "7 золотих правил безпечної угоди від експертів NaDoby",
//         image: "/scams.png",
//         category: "Безпека",
//         link: "/blog/scams" 
//       },
//       {
//         title: "Квартири подобово для комфортного відпочинку",
//         content: "Як вибрати ідеальну квартиру для короткострокової оренди",
//         image: "/apartment.png",
//         category: "Квартири",
//         link: "/blog/apartmentGuide" 
//       },
//       {
//         title: "Готелі з особливою атмосферою",
//         content: "На що звертати увагу при виборі готельного номеру",
//         image: "/hotel.png",
//         category: "Готелі",
//         link: "/blog/hotelGuide"
        
//       },
//       {
//         title: "Готелі для тварин з турботою",
//         content: "Як обрати найкращий готель для вашого улюбленця",
//         image: "/animal.png",
//         category: "Готелі для тварин",
//         link: "/blog/petHotelGuide"
//       },
//       {
//         title: " Хостели – бюджетно та весело!",
//         content: "Чому хостели - це не просто дешевий варіант",
//         image: "/hostel.png",
//         category: "Хостели",
//         link: "/blog/hostelGuide"
//       },
//       {
//         title: "Будинки для відпочинку",
//         content: "Переваги оренди приватного будинку перед готелем",
//         image: "/house.png",
//         category: "Будинки",
//         link: "/blog/houseGuide"
//       },
//       {
//         title: "Сауни/Бані  для здоров'я",
//         content: "Як правильно відпочивати у сауні для максимальної користі",
//         image: "/sauna.png",
//         category: "Сауни/Бані",
//         link: "/blog/saunaGuide"
//       },
//       {
//         title: "Бази відпочинку серед природи",
//         content: "Як провести час на базі відпочинку з максимальною користю",
//         image: "/camp.png",
//         category: "Бази відпочинку",
//         link: "/blog/campGuide"
//       },
//       {
//         title: "Глемпінг - комфорт серед природи",
//         content: "Топ незвичайних глемпінг локацій в Україні",
//         image: "/glamping.png",
//         category: "Глемпінг",
//         link: "/blog/glampingGuide"
//       },
//       // Нові категорії
//       {
//         title: "Пансіонати/Санаторії з лікувальними програмами",
//         content: "Як вибрати пансіонат з максимальною користю для здоров'я",
//         image: "/pansionat.png",
//         category: "Пансіонати/Санаторії",
//         link: "/blog/sanatoriumGuide"
//       },
//       {
//         title: "Котеджні містечка для великих компаній",
//         content: "Переваги оренди цілого комплексу для сімейних свят",
//         image: "/kotedzi.png",
//         category: "Котеджі",
//         link: "/blog/cottageComplexGuide"
//       },
//       {
//         title: "Коворкінг - робочі простори ",
//         content: "Ідеальні умови для digital-кочівників та фрілансерів",
//         image: "/kavorking.png",
//         category: "Коворкінг",
//         link: "/blog/coworkingGuide"
        
//       },
//       {
//         title: "Автокемпінги для мандрівників",
//         content: "Найкращі місця для автотуристів по всій Україні",
//         image: "/avtokemping.png",
//         category: "Автокемпінг",
//         link: "/blog/autocampingGuide",
//       }
//     ]
//   },
//   ru: {
//     title: "Полезные советы и идеи для вашего путешествия",
//     metaTitle: "Полезные советы для путешествий и аренды жилья | NaDoby",
//     metaDescription: "🔝 Экспертные советы по выбору жилья: квартиры, отели, дома, хостелы. Как избежать мошенничества и найти идеальный вариант для отдыха.",
//     posts: [
//       // Основные категории
//       {
//         title: "Как избежать мошенничества при аренде",
//         content: "7 золотых правил безопасной сделки от экспертов NaDoby",
//         image: "/scams.png",
//         category: "Безопасность",
//         link: "/blog/scams",
//       },
//       {
//         title: "Квартиры посуточно для комфортного отдыха",
//         content: "Как выбрать идеальную квартиру для краткосрочной аренды",
//         image: "/apartment.png",
//         category: "Квартиры",
//         link: "/blog/apartmentGuide" 
//       },
//       {
//         title: "Отели с особой атмосферой",
//         content: "На что обращать внимание при выборе гостиничного номера",
//         image: "/hotel.png",
//         category: "Отели",
//         link: "/blog/hotelGuide"
//       },
//        {
//         title: "Отели для животных с заботой",
//         content: "Как выбрать лучший отель для вашего любимца",
//         image: "/animal.png",
//         category: "Отель для животных",
//         link: "/blog/petHotelGuide"
//       },
//       {
//         title: " Хостелы – бюджетно и весело! ",
//         content: "Почему хостелы - это не просто дешевый вариант",
//         image: "/hostel.png",
//         category: "Хостелы",
//         link: "/blog/hostelGuide"
//       },
//       {
//         title: " Дома для отдыха",
//         content: "Преимущества аренды частного дома перед отелем",
//         image: "/house.png",
//         category: "Дома",
//         link: "/blog/houseGuide"
//       },
//       {
//         title: "Сауны/Бани  для здоровья",
//         content: "Как правильно отдыхать в сауне для максимальной пользы",
//         image: "/sauna.png",
//         category: "Сауны/Бани",
//         link: "/blog/saunaGuide"
//       },
//       {
//         title: "Базы отдыха на природе",
//         content: "Как провести время на базе отдыха с максимальной пользой",
//         image: "/camp.png",
//         category: "Туризм",
//         link: "/blog/campGuide"
//       },
//       {
//         title: "Глэмпинг - комфорт среди природы",
//         content: "Топ необычных глэмпинг локаций в Украине",
//         image: "/glamping.png",
//         category: "Глэмпинг",
//         link: "/blog/glampingGuide"
//       },
//       // Новые категории
//       {
//         title: "Пансионаты/Санатории с лечебными программами",
//         content: "Как выбрать пансионат с максимальной пользой для здоровья",
//         image: "/pansionat.png",
//         category: "Пансионаты/Санатории",
//         link: "/blog/sanatoriumGuide"
//       },
//       {
//         title: "Коттеджные городки для больших компаний",
//         content: "Преимущества аренды целого комплекса для семейных праздников",
//         image: "/kotedzi.png",
//         category: "Коттеджи",
//         link: "/blog/cottageComplexGuide"
        
//       },
//       {
//         title: " Коворкинг - рабочие пространства с проживанием",
//         content: "Идеальные условия для digital-кочевников и фрилансеров",
//         image: "/kavorking.png",
//         category: "Коворкинги",
//         link: "/blog/coworkingGuide",

        
//       },
//       {
//         title: "Автокемпинги для путешественников",
//         content: "Лучшие места для автотуристов по всей Украине",
//         image: "/avtokemping.png",
//         category: "Автокемпинг",
//         link: "/blog/autocampingGuide",
//       }
//     ]
//   }
// }

// function BlogPosts() {
//   const { currentLanguage } = useLanguage()
//   const content = BLOG_CONTENT[currentLanguage]

//   return (
//     <>
//       <Head>
//         <title>{content.metaTitle}</title>
//         <meta name="description" content={content.metaDescription} />
//         <meta name="viewport" content="width=device-width, initial-scale=1" />
//       </Head>

//       <Container maxWidth="lg" 
//       sx={ { py: 6 } }
//       >
//         <Typography variant="h3" component="h1" sx={{ 
//           mb: 6, 
//           fontWeight: 700,
//           textAlign: 'center',
//           color: 'text.primary',
//           fontSize: { xs: '2rem', md: '2.5rem' }
//         }}>
//           {content.title}
//         </Typography>

//         <Box sx={{ 
//           display: 'grid', 
//           gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
//           gap: 4,
//           mb: 8
//         }}>
//           {content.posts.map((post, index) => (
//             <Link 
//               key={index} 
//               href={post.link || '#'} 
//               passHref 
//               legacyBehavior
//               style={{ textDecoration: 'none' }}
//             >
//               <Card elevation={2} sx={{ 
//                 display: 'flex', 
//                 flexDirection: 'column',
//                 height: '100%',
//                 transition: 'all 0.3s ease',
//                 borderRadius: 2,
//                 cursor: 'pointer',
//                 '&:hover': {
//                   transform: 'translateY(-8px)',
//                   boxShadow: 6,
//                 }
//               }}>
//                 <Box sx={{ 
//                   position: 'relative', 
//                   height: 220,
//                   overflow: 'hidden',
//                   borderTopLeftRadius: 8,
//                   borderTopRightRadius: 8
//                 }}>
//                   <Image
//                     src={post.image}
//                     alt={post.title}
//                     fill
//                     style={{ 
//                       objectFit: 'cover',
//                       objectPosition: 'center'
//                     }}
//                     sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
//                     loading={index < 6 ? "eager" : "lazy"}
//                     priority={index < 3}
//                   />
//                 </Box>
//                 <CardContent sx={{ 
//                   flexGrow: 1,
//                   p: 3,
//                   display: 'flex',
//                   flexDirection: 'column'
//                 }}>
//                   <Chip 
//                     label={post.category} 
//                     size="small" 
//                     sx={{ 
//                       mb: 2,
//                       alignSelf: 'flex-start',
//                       bgcolor: 'primary.light',
//                       color: 'primary.contrastText',
//                       fontWeight: 600
//                     }}
//                   />
//                   <Typography variant="h5" component="h2" sx={{ 
//                     mb: 2,
//                     fontWeight: 600,
//                     lineHeight: 1.3,
//                     minHeight: '3.5em'
//                   }}>
//                     {post.title}
//                   </Typography>
//                   <Typography variant="body1" sx={{ 
//                     mb: 3,
//                     color: 'text.secondary',
//                     flexGrow: 1
//                   }}>
//                     {post.content}
//                   </Typography>
//                 </CardContent>
//               </Card>
//             </Link>
//           ))}
//         </Box>
//       </Container>
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

// export default function Blog() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header />
//         <BlogPosts />
//       </LanguageProvider>
//     </Provider>
//   )
// }


'use client'

import { useLanguage } from "@/app/LanguageContext"
import Header from "@/app/components/Header"
import { Box, Typography, Container, Card, CardContent, Button, Chip } from '@mui/material'
import Image from 'next/image'
import Link from 'next/link'
import Head from 'next/head'
import Footer from "@/app/components/Footer"

const BLOG_CONTENT = {
  ua: {
    title: "Корисні поради та ідеї для вашої подорожі",
    metaTitle: "Корисні поради для подорожей та оренди житла | NaDoby",
    metaDescription: "🔝 Експертні поради з вибору житла: квартири, готелі, будинки, хостели. Як уникнути шахрайства та знайти ідеальний варіант для відпочинку.",
    posts: [
      // Основні категорії
      {
        title: "Як уникнути шахрайства при оренді",
        content: "7 золотих правил безпечної угоди від експертів NaDoby",
        image: "/scams.png",
        category: "Безпека",
        link: "/blog/scams" 
      },
      {
        title: "Квартири подобово для комфортного відпочинку",
        content: "Як вибрати ідеальну квартиру для короткострокової оренди",
        image: "/apartment.png",
        category: "Квартири",
        link: "/blog/apartmentGuide" 
      },
      {
        title: "Готелі з особливою атмосферою",
        content: "На що звертати увагу при виборі готельного номеру",
        image: "/hotel.png",
        category: "Готелі",
        link: "/blog/hotelGuide"
        
      },
      {
        title: "Готелі для тварин з турботою",
        content: "Як обрати найкращий готель для вашого улюбленця",
        image: "/animal.png",
        category: "Готелі для тварин",
        link: "/blog/petHotelGuide"
      },
      {
        title: " Хостели – бюджетно та весело!",
        content: "Чому хостели - це не просто дешевий варіант",
        image: "/hostel.png",
        category: "Хостели",
        link: "/blog/hostelGuide"
      },
      {
        title: "Будинки для відпочинку",
        content: "Переваги оренди приватного будинку перед готелем",
        image: "/house.png",
        category: "Будинки",
        link: "/blog/houseGuide"
      },
      {
        title: "Сауни/Бані  для здоров'я",
        content: "Як правильно відпочивати у сауні для максимальної користі",
        image: "/sauna.png",
        category: "Сауни/Бані",
        link: "/blog/saunaGuide"
      },
      {
        title: "Бази відпочинку серед природи",
        content: "Як провести час на базі відпочинку з максимальною користю",
        image: "/camp.png",
        category: "Бази відпочинку",
        link: "/blog/campGuide"
      },
      {
        title: "Глемпінг - комфорт серед природи",
        content: "Топ незвичайних глемпінг локацій в Україні",
        image: "/glamping.png",
        category: "Глемпінг",
        link: "/blog/glampingGuide"
      },
      // Нові категорії
      {
        title: "Пансіонати/Санаторії з лікувальними програмами",
        content: "Як вибрати пансіонат з максимальною користю для здоров'я",
        image: "/pansionat.png",
        category: "Пансіонати/Санаторії",
        link: "/blog/sanatoriumGuide"
      },
      {
        title: "Котеджні містечка для великих компаній",
        content: "Переваги оренди цілого комплексу для сімейних свят",
        image: "/kotedzi.png",
        category: "Котеджі",
        link: "/blog/cottageComplexGuide"
      },
      {
        title: "Коворкінг - робочі простори ",
        content: "Ідеальні умови для digital-кочівників та фрілансерів",
        image: "/kavorking.png",
        category: "Коворкінг",
        link: "/blog/coworkingGuide"
        
      },
      {
        title: "Автокемпінги для мандрівників",
        content: "Найкращі місця для автотуристів по всій Україні",
        image: "/avtokemping.png",
        category: "Автокемпінг",
        link: "/blog/autocampingGuide",
      }
    ]
  },
  ru: {
    title: "Полезные советы и идеи для вашего путешествия",
    metaTitle: "Полезные советы для путешествий и аренды жилья | NaDoby",
    metaDescription: "🔝 Экспертные советы по выбору жилья: квартиры, отели, дома, хостелы. Как избежать мошенничества и найти идеальный вариант для отдыха.",
    posts: [
      // Основные категории
      {
        title: "Как избежать мошенничества при аренде",
        content: "7 золотых правил безопасной сделки от экспертов NaDoby",
        image: "/scams.png",
        category: "Безопасность",
        link: "/blog/scams",
      },
      {
        title: "Квартиры посуточно для комфортного отдыха",
        content: "Как выбрать идеальную квартиру для краткосрочной аренды",
        image: "/apartment.png",
        category: "Квартиры",
        link: "/blog/apartmentGuide" 
      },
      {
        title: "Отели с особой атмосферой",
        content: "На что обращать внимание при выборе гостиничного номера",
        image: "/hotel.png",
        category: "Отели",
        link: "/blog/hotelGuide"
      },
       {
        title: "Отели для животных с заботой",
        content: "Как выбрать лучший отель для вашего любимца",
        image: "/animal.png",
        category: "Отель для животных",
        link: "/blog/petHotelGuide"
      },
      {
        title: " Хостелы – бюджетно и весело! ",
        content: "Почему хостелы - это не просто дешевый вариант",
        image: "/hostel.png",
        category: "Хостелы",
        link: "/blog/hostelGuide"
      },
      {
        title: " Дома для отдыха",
        content: "Преимущества аренды частного дома перед отелем",
        image: "/house.png",
        category: "Дома",
        link: "/blog/houseGuide"
      },
      {
        title: "Сауны/Бани  для здоровья",
        content: "Как правильно отдыхать в сауне для максимальной пользы",
        image: "/sauna.png",
        category: "Сауны/Бани",
        link: "/blog/saunaGuide"
      },
      {
        title: "Базы отдыха на природе",
        content: "Как провести время на базе отдыха с максимальной пользой",
        image: "/camp.png",
        category: "Туризм",
        link: "/blog/campGuide"
      },
      {
        title: "Глэмпинг - комфорт среди природы",
        content: "Топ необычных глэмпинг локаций в Украине",
        image: "/glamping.png",
        category: "Глэмпинг",
        link: "/blog/glampingGuide"
      },
      // Новые категории
      {
        title: "Пансионаты/Санатории с лечебными программами",
        content: "Как выбрать пансионат с максимальной пользой для здоровья",
        image: "/pansionat.png",
        category: "Пансионаты/Санатории",
        link: "/blog/sanatoriumGuide"
      },
      {
        title: "Коттеджные городки для больших компаний",
        content: "Преимущества аренды целого комплекса для семейных праздников",
        image: "/kotedzi.png",
        category: "Коттеджи",
        link: "/blog/cottageComplexGuide"
        
      },
      {
        title: " Коворкинг - рабочие пространства с проживанием",
        content: "Идеальные условия для digital-кочевников и фрилансеров",
        image: "/kavorking.png",
        category: "Коворкинги",
        link: "/blog/coworkingGuide",

        
      },
      {
        title: "Автокемпинги для путешественников",
        content: "Лучшие места для автотуристов по всей Украине",
        image: "/avtokemping.png",
        category: "Автокемпинг",
        link: "/blog/autocampingGuide",
      }
    ]
  }
}

function BlogPosts({ generatedAt }) {
  const { currentLanguage } = useLanguage()
  const content = BLOG_CONTENT[currentLanguage]

  return (
    <>
      <Head>
        <title>{content.metaTitle}</title>
        <meta name="description" content={content.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container maxWidth="lg" 
      sx={ { py: 6 } }
      >
        <Typography variant="h3" component="h1" sx={{ 
          mb: 6, 
          fontWeight: 700,
          textAlign: 'center',
          color: 'text.primary',
          fontSize: { xs: '2rem', md: '2.5rem' }
        }}>
          {content.title}
        </Typography>

        <Box sx={{ 
          display: 'grid', 
          gridTemplateColumns: { xs: '1fr', sm: 'repeat(2, 1fr)', md: 'repeat(3, 1fr)' },
          gap: 4,
          mb: 8
        }}>
          {content.posts.map((post, index) => (
            <Link 
              key={index} 
              href={post.link || '#'} 
              passHref 
              legacyBehavior
              style={{ textDecoration: 'none' }}
            >
              <Card elevation={2} sx={{ 
                display: 'flex', 
                flexDirection: 'column',
                height: '100%',
                transition: 'all 0.3s ease',
                borderRadius: 2,
                cursor: 'pointer',
                '&:hover': {
                  transform: 'translateY(-8px)',
                  boxShadow: 6,
                }
              }}>
                <Box sx={{ 
                  position: 'relative', 
                  height: 220,
                  overflow: 'hidden',
                  borderTopLeftRadius: 8,
                  borderTopRightRadius: 8
                }}>
                  <Image
                    src={post.image}
                    alt={post.title}
                    fill
                    style={{ 
                      objectFit: 'cover',
                      objectPosition: 'center'
                    }}
                    sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                    loading={index < 6 ? "eager" : "lazy"}
                    priority={index < 3}
                  />
                </Box>
                <CardContent sx={{ 
                  flexGrow: 1,
                  p: 3,
                  display: 'flex',
                  flexDirection: 'column'
                }}>
                  <Chip 
                    label={post.category} 
                    size="small" 
                    sx={{ 
                      mb: 2,
                      alignSelf: 'flex-start',
                      bgcolor: 'primary.light',
                      color: 'primary.contrastText',
                      fontWeight: 600
                    }}
                  />
                  <Typography variant="h5" component="h2" sx={{ 
                    mb: 2,
                    fontWeight: 600,
                    lineHeight: 1.3,
                    minHeight: '3.5em'
                  }}>
                    {post.title}
                  </Typography>
                  <Typography variant="body1" sx={{ 
                    mb: 3,
                    color: 'text.secondary',
                    flexGrow: 1
                  }}>
                    {post.content}
                  </Typography>
                </CardContent>
              </Card>
            </Link>
          ))}
        </Box>
      </Container>
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

function Blog({ generatedAt }) {
  return (
    <>
      <Header />
      <BlogPosts generatedAt={generatedAt} />
      {/* <Footer /> */}
    </>
  )
}

export default Blog