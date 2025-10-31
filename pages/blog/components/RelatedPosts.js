



// 'use client'

// import { useLanguage } from "@/app/LanguageContext"
// import { BLOG_CONTENT } from "../blogData"
// import { 
//   Box, 
//   Typography, 
//   Grid, 
//   Card, 
//   CardContent, 
//   Chip, 
//   IconButton,
//   useTheme,
//   useMediaQuery
// } from '@mui/material'
// import Link from 'next/link'
// import Image from 'next/image'
// import { useState, useEffect, useCallback } from 'react'
// import { ChevronLeft, ChevronRight } from '@mui/icons-material'

// export default function RelatedPosts({ currentSlug }) {
//   const { currentLanguage } = useLanguage()
//   const [isClient, setIsClient] = useState(false)
//   const [currentSlide, setCurrentSlide] = useState(0)
//   const theme = useTheme()
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
//   const isTablet = useMediaQuery(theme.breakpoints.down('md'))

//   useEffect(() => {
//     setIsClient(true)
//   }, [])

//   const content = BLOG_CONTENT[currentLanguage]
  
//   // Берем ВСЕ посты кроме текущего
//   const relatedPosts = content.posts.filter(post => post.link !== `/blog/${currentSlug}`)

//   // Количество отображаемых карточек
//   const getSlidesToShow = () => {
//     if (isMobile) return 1
//     if (isTablet) return 2
//     return 3
//   }

//   const slidesToShow = getSlidesToShow()
//   const maxSlides = Math.ceil(relatedPosts.length / slidesToShow) - 1

//   const nextSlide = useCallback(() => {
//     setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1)
//   }, [maxSlides])

//   const prevSlide = () => {
//     setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1)
//   }

//   // Автопереключение слайдов
//   useEffect(() => {
//     if (relatedPosts.length <= slidesToShow) return
    
//     const interval = setInterval(() => {
//       nextSlide()
//     }, 5000) // Переключаем каждые 5 секунд

//     return () => clearInterval(interval)
//   }, [currentSlide, relatedPosts.length, slidesToShow, nextSlide])

//   // Получаем посты для текущего слайда
//   const getCurrentSlidePosts = () => {
//     const startIndex = currentSlide * slidesToShow
//     return relatedPosts.slice(startIndex, startIndex + slidesToShow)
//   }

//   if (!isClient || relatedPosts.length === 0) {
//     return null
//   }

//   return (
//     <Box sx={{ mt: 6 }}>
//       <Typography variant="h4" sx={{ 
//         mb: 4,
//         textAlign: 'center',
//         fontWeight: 600,
//         color: 'primary.main'
//       }}>
//         {currentLanguage === 'ua' ? 'Рекомендуємо до читання' : 'Рекомендуем к чтению'}
//       </Typography>

//       {/* Контейнер слайдера */}
//       <Box sx={{ 
//         position: 'relative', 
//         maxWidth: 'lg',
//         mx: 'auto'
//       }}>
        
//         {/* Кнопка назад */}
//         {relatedPosts.length > slidesToShow && (
//           <IconButton
//             onClick={prevSlide}
//             sx={{
//               position: 'absolute',
//               left: { xs: -2, sm: -4 },
//               top: '50%',
//               transform: 'translateY(-50%)',
//               zIndex: 2,
//               bgcolor: 'background.paper',
//               boxShadow: 1,
//               '&:hover': {
//                 bgcolor: 'primary.main',
//                 color: 'white'
//               },
//               width: { xs: 32, sm: 40 },
//               height: { xs: 32, sm: 40 }
//             }}
//           >
//             <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//         )}

//         {/* Область отображения слайдов */}
//         <Box sx={{ 
//           overflow: 'hidden',
//           mx: { xs: 0, sm: 2 }
//         }}>
//           <Grid container spacing={2}>
//             {getCurrentSlidePosts().map((post, index) => (
//               <Grid 
//                 item 
//                 xs={12}
//                 sm={6}
//                 md={4}
//                 key={index}
//               >
//                 <Link href={post.link} style={{ textDecoration: 'none' }}>
//                   <Card sx={{ 
//                     height: '100%',
//                     transition: 'all 0.3s ease',
//                     borderRadius: 2,
//                     boxShadow: 2,
//                     '&:hover': {
//                       transform: 'translateY(-4px)',
//                       boxShadow: 4,
//                     }
//                   }}>
//                     {/* Изображение - компактное */}
//                     <Box sx={{ 
//                       position: 'relative', 
//                       height: 160,
//                       overflow: 'hidden'
//                     }}>
//                       <Image
//                         src={post.image}
//                         alt={post.title}
//                         fill
//                         style={{ 
//                           objectFit: 'cover',
//                           objectPosition: 'center'
//                         }}
//                         sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
//                       />
//                     </Box>
                    
//                     {/* Контент карточки - компактный */}
//                     <CardContent sx={{ 
//                       p: 2,
//                       '&:last-child': { pb: 2 }
//                     }}>
//                       <Chip 
//                         label={post.category} 
//                         size="small" 
//                         sx={{ 
//                           mb: 1.5,
//                           bgcolor: 'primary.light',
//                           color: 'white',
//                           fontWeight: 600,
//                           fontSize: '0.7rem',
//                           height: 24
//                         }}
//                       />
//                       <Typography 
//                         variant="h6" 
//                         sx={{ 
//                           mb: 1,
//                           fontWeight: 600,
//                           lineHeight: 1.3,
//                           fontSize: '1rem',
//                           minHeight: '2.5em',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical',
//                           overflow: 'hidden'
//                         }}
//                       >
//                         {post.title}
//                       </Typography>
//                       <Typography 
//                         variant="body2" 
//                         color="text.secondary"
//                         sx={{
//                           fontSize: '0.875rem',
//                           display: '-webkit-box',
//                           WebkitLineClamp: 2,
//                           WebkitBoxOrient: 'vertical',
//                           overflow: 'hidden',
//                           minHeight: '2.5em',
//                           lineHeight: 1.4
//                         }}
//                       >
//                         {post.content}
//                       </Typography>
//                     </CardContent>
//                   </Card>
//                 </Link>
//               </Grid>
//             ))}
//           </Grid>
//         </Box>

//         {/* Кнопка вперед */}
//         {relatedPosts.length > slidesToShow && (
//           <IconButton
//             onClick={nextSlide}
//             sx={{
//               position: 'absolute',
//               right: { xs: -2, sm: -4 },
//               top: '50%',
//               transform: 'translateY(-50%)',
//               zIndex: 2,
//               bgcolor: 'background.paper',
//               boxShadow: 1,
//               '&:hover': {
//                 bgcolor: 'primary.main',
//                 color: 'white'
//               },
//               width: { xs: 32, sm: 40 },
//               height: { xs: 32, sm: 40 }
//             }}
//           >
//             <ChevronRight fontSize={isMobile ? "small" : "medium"} />
//           </IconButton>
//         )}
//       </Box>

//       {/* Индикаторы слайдов */}
//       {relatedPosts.length > slidesToShow && (
//         <Box sx={{ 
//           display: 'flex', 
//           justifyContent: 'center', 
//           mt: 3,
//           gap: 1 
//         }}>
//           {Array.from({ length: maxSlides + 1 }).map((_, index) => (
//             <Box
//               key={index}
//               onClick={() => setCurrentSlide(index)}
//               sx={{
//                 width: 8,
//                 height: 8,
//                 borderRadius: '50%',
//                 bgcolor: currentSlide === index ? 'primary.main' : 'grey.300',
//                 cursor: 'pointer',
//                 transition: 'all 0.3s ease',
//                 '&:hover': {
//                   bgcolor: currentSlide === index ? 'primary.dark' : 'grey.400'
//                 }
//               }}
//             />
//           ))}
//         </Box>
//       )}

//       {/* Кнопка "Все статьи блога" */}
//       {/* <Box sx={{ textAlign: 'center', mt: 4 }}>
//         <Link href="/blog" style={{ textDecoration: 'none' }}>
//           <Typography 
//             variant="button" 
//             sx={{ 
//               color: 'primary.main',
//               fontWeight: 600,
//               fontSize: '0.875rem',
//               '&:hover': {
//                 color: 'primary.dark',
//                 textDecoration: 'underline'
//               }
//             }}
//           >
//             {currentLanguage === 'ua' ? 'Всі статті блогу' : 'Все статьи блога'}
//           </Typography>
//         </Link>
//         </Box> */}
//     </Box>
//   )
// }



'use client'

import { useLanguage } from "@/app/LanguageContext"
import { BLOG_CONTENT } from "../blogData"
import { 
  Box, 
  Typography, 
  Grid, 
  Card, 
  CardContent, 
  Chip, 
  IconButton,
  useTheme,
  useMediaQuery
} from '@mui/material'
import Link from 'next/link'
import Image from 'next/image'
import { useState, useEffect } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

// SEO мета-данные для разных языков
const SEO_CONTENT = {
  ua: {
    metaTitle: "Рекомендовані статті | Блог NaDoby.com.ua",
    metaDescription: "Читайте рекомендовані статті про оренду житла в Україні. Корисні поради, умови оренди та рекомендації для мандрівників.",
  },
  ru: {
    metaTitle: "Рекомендуемые статьи | Блог NaDoby.com.ua", 
    metaDescription: "Читайте рекомендуемые статьи об аренде жилья в Украине. Полезные советы, условия аренды и рекомендации для путешественников.",
  }
}

export default function RelatedPosts({ currentSlug, generatedAt }) {
  const { currentLanguage } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const [isTransitioning, setIsTransitioning] = useState(false)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const content = BLOG_CONTENT[currentLanguage]
  const seoContent = SEO_CONTENT[currentLanguage]
  
  // Берем ВСЕ посты кроме текущего
  const relatedPosts = content.posts.filter(post => post.link !== `/blog/${currentSlug}`)

  // Количество отображаемых карточек
  const getSlidesToShow = () => {
    if (isMobile) return 1
    if (isTablet) return 2
    return 3
  }

  const slidesToShow = getSlidesToShow()
  const maxSlides = Math.ceil(relatedPosts.length / slidesToShow) - 1

  const nextSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1)
    
    // Сбрасываем состояние transitioning после завершения анимации
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500) // Должно совпадать с duration в sx стилях
  }

  const prevSlide = () => {
    if (isTransitioning) return
    
    setIsTransitioning(true)
    setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1)
    
    setTimeout(() => {
      setIsTransitioning(false)
    }, 500)
  }

  // Автопереключение слайдов - УВЕЛИЧЕН ИНТЕРВАЛ
  useEffect(() => {
    if (relatedPosts.length <= slidesToShow) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 8000) // Увеличено с 5000 до 8000 мс

    return () => clearInterval(interval)
  }, [currentSlide, relatedPosts.length, slidesToShow])

  // Получаем посты для текущего слайда
  const getCurrentSlidePosts = () => {
    const startIndex = currentSlide * slidesToShow
    return relatedPosts.slice(startIndex, startIndex + slidesToShow)
  }

  if (!isClient || relatedPosts.length === 0) {
    return null
  }

  return (
    <>
      {/* SEO оптимизация */}
      <head>
        <title>{seoContent.metaTitle}</title>
        <meta name="description" content={seoContent.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta property="og:title" content={seoContent.metaTitle} />
        <meta property="og:description" content={seoContent.metaDescription} />
        <meta property="og:type" content="website" />
        <link rel="preconnect" href="https://fonts.googleapis.com" />
        <link rel="preconnect" href="https://fonts.gstatic.com" crossOrigin="true" />
        {generatedAt && (
          <meta name="generated-at" content={generatedAt} />
        )}
      </head>

      <Box 
        component="section" 
        aria-label={currentLanguage === 'ua' ? 'Рекомендовані статті' : 'Рекомендуемые статьи'}
        sx={{ mt: 6 }}
      >
        <Typography 
          variant="h2" 
          component="h2"
          sx={{ 
            mb: 4,
            textAlign: 'center',
            fontWeight: 600,
            color: 'primary.main',
            fontSize: { xs: '1.75rem', md: '2.125rem' }
          }}
        >
          {currentLanguage === 'ua' ? 'Рекомендуємо до читання' : 'Рекомендуем к чтению'}
        </Typography>

        {/* Контейнер слайдера */}
        <Box 
          component="div"
          role="region"
          aria-label={currentLanguage === 'ua' ? 'Слайдер статей' : 'Слайдер статей'}
          sx={{ 
            position: 'relative', 
            maxWidth: 'lg',
            mx: 'auto'
          }}
        >
          
          {/* Кнопка назад */}
          {relatedPosts.length > slidesToShow && (
            <IconButton
              onClick={prevSlide}
              disabled={isTransitioning}
              aria-label={currentLanguage === 'ua' ? 'Попередній слайд' : 'Предыдущий слайд'}
              sx={{
                position: 'absolute',
                left: { xs: -2, sm: -4 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                transition: 'all 0.3s ease'
              }}
            >
              <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          )}

          {/* Область отображения слайдов с анимацией */}
          <Box 
            component="div"
            sx={{ 
              overflow: 'hidden',
              mx: { xs: 0, sm: 2 }
            }}
          >
            <Grid 
              container 
              spacing={2}
              component="div"
              sx={{
                transition: 'opacity 0.5s ease-in-out', // Плавное изменение прозрачности
                opacity: isTransitioning ? 0.7 : 1
              }}
            >
              {getCurrentSlidePosts().map((post, index) => (
                <Grid 
                  item 
                  xs={12}
                  sm={6}
                  md={4}
                  key={`${post.link}-${index}`}
                  component="article"
                  sx={{
                    transition: 'all 0.5s ease-in-out', // Плавная анимация для каждой карточки
                    transform: isTransitioning ? 'scale(0.98)' : 'scale(1)'
                  }}
                >
                  <Link 
                    href={post.link} 
                    style={{ textDecoration: 'none' }}
                    aria-label={`Читати статтю: ${post.title}`}
                  >
                    <Card 
                      component="article"
                      sx={{ 
                        height: '100%',
                        transition: 'all 0.3s ease',
                        borderRadius: 2,
                        boxShadow: 2,
                        '&:hover': {
                          transform: 'translateY(-4px)',
                          boxShadow: 4,
                        }
                      }}
                    >
                      {/* Изображение - компактное */}
                      <Box 
                        component="div"
                        sx={{ 
                          position: 'relative', 
                          height: 160,
                          overflow: 'hidden',
                          transition: 'all 0.5s ease'
                        }}
                      >
                        <Image
                          src={post.image}
                          alt={post.title}
                          fill
                          style={{ 
                            objectFit: 'cover',
                            objectPosition: 'center',
                            transition: 'transform 0.5s ease'
                          }}
                          sizes="(max-width: 600px) 100vw, (max-width: 900px) 50vw, 33vw"
                          priority={index === 0}
                        />
                      </Box>
                      
                      {/* Контент карточки - компактный */}
                      <CardContent sx={{ 
                        p: 2,
                        '&:last-child': { pb: 2 },
                        transition: 'all 0.5s ease'
                      }}>
                        <Chip 
                          label={post.category} 
                          size="small" 
                          sx={{ 
                            mb: 1.5,
                            bgcolor: 'primary.light',
                            color: 'white',
                            fontWeight: 600,
                            fontSize: '0.7rem',
                            height: 24,
                            transition: 'all 0.5s ease'
                          }}
                        />
                        <Typography 
                          variant="h3" 
                          component="h3"
                          sx={{ 
                            mb: 1,
                            fontWeight: 600,
                            lineHeight: 1.3,
                            fontSize: '1rem',
                            minHeight: '2.5em',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            transition: 'all 0.5s ease'
                          }}
                        >
                          {post.title}
                        </Typography>
                        <Typography 
                          variant="body2" 
                          color="text.secondary"
                          component="p"
                          sx={{
                            fontSize: '0.875rem',
                            display: '-webkit-box',
                            WebkitLineClamp: 2,
                            WebkitBoxOrient: 'vertical',
                            overflow: 'hidden',
                            minHeight: '2.5em',
                            lineHeight: 1.4,
                            transition: 'all 0.5s ease'
                          }}
                        >
                          {post.content}
                        </Typography>
                      </CardContent>
                    </Card>
                  </Link>
                </Grid>
              ))}
            </Grid>
          </Box>

          {/* Кнопка вперед */}
          {relatedPosts.length > slidesToShow && (
            <IconButton
              onClick={nextSlide}
              disabled={isTransitioning}
              aria-label={currentLanguage === 'ua' ? 'Наступний слайд' : 'Следующий слайд'}
              sx={{
                position: 'absolute',
                right: { xs: -2, sm: -4 },
                top: '50%',
                transform: 'translateY(-50%)',
                zIndex: 2,
                bgcolor: 'background.paper',
                boxShadow: 1,
                '&:hover': {
                  bgcolor: 'primary.main',
                  color: 'white'
                },
                '&:disabled': {
                  opacity: 0.5,
                  cursor: 'not-allowed'
                },
                width: { xs: 32, sm: 40 },
                height: { xs: 32, sm: 40 },
                transition: 'all 0.3s ease'
              }}
            >
              <ChevronRight fontSize={isMobile ? "small" : "medium"} />
            </IconButton>
          )}
        </Box>

        {/* Индикаторы слайдов с анимацией */}
        {relatedPosts.length > slidesToShow && (
          <Box 
            component="nav"
            aria-label={currentLanguage === 'ua' ? 'Навігація по слайдам' : 'Навигация по слайдам'}
            sx={{ 
              display: 'flex', 
              justifyContent: 'center', 
              mt: 3,
              gap: 1 
            }}
          >
            {Array.from({ length: maxSlides + 1 }).map((_, index) => (
              <Box
                key={index}
                onClick={() => !isTransitioning && setCurrentSlide(index)}
                role="button"
                tabIndex={0}
                aria-label={currentLanguage === 'ua' 
                  ? `Перейти до слайду ${index + 1}` 
                  : `Перейти к слайду ${index + 1}`
                }
                onKeyPress={(e) => {
                  if (!isTransitioning && (e.key === 'Enter' || e.key === ' ')) {
                    setCurrentSlide(index)
                  }
                }}
                sx={{
                  width: 12,
                  height: 12,
                  borderRadius: '50%',
                  bgcolor: currentSlide === index ? 'primary.main' : 'grey.300',
                  cursor: isTransitioning ? 'not-allowed' : 'pointer',
                  transition: 'all 0.5s ease',
                  opacity: isTransitioning ? 0.5 : 1,
                  '&:hover': {
                    bgcolor: isTransitioning 
                      ? (currentSlide === index ? 'primary.main' : 'grey.300')
                      : (currentSlide === index ? 'primary.dark' : 'grey.400'),
                    transform: isTransitioning ? 'scale(1)' : 'scale(1.2)'
                  },
                  '&:focus': {
                    outline: '2px solid',
                    outlineColor: 'primary.main',
                    outlineOffset: 2
                  }
                }}
              />
            ))}
          </Box>
        )}
      </Box>
    </>
  )
}