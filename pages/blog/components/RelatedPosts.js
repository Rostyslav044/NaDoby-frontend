



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
import { useState, useEffect, useCallback } from 'react'
import { ChevronLeft, ChevronRight } from '@mui/icons-material'

export default function RelatedPosts({ currentSlug }) {
  const { currentLanguage } = useLanguage()
  const [isClient, setIsClient] = useState(false)
  const [currentSlide, setCurrentSlide] = useState(0)
  const theme = useTheme()
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'))
  const isTablet = useMediaQuery(theme.breakpoints.down('md'))

  useEffect(() => {
    setIsClient(true)
  }, [])

  const content = BLOG_CONTENT[currentLanguage]
  
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

  const nextSlide = useCallback(() => {
    setCurrentSlide(prev => prev >= maxSlides ? 0 : prev + 1)
  }, [maxSlides])

  const prevSlide = () => {
    setCurrentSlide(prev => prev <= 0 ? maxSlides : prev - 1)
  }

  // Автопереключение слайдов
  useEffect(() => {
    if (relatedPosts.length <= slidesToShow) return
    
    const interval = setInterval(() => {
      nextSlide()
    }, 5000) // Переключаем каждые 5 секунд

    return () => clearInterval(interval)
  }, [currentSlide, relatedPosts.length, slidesToShow, nextSlide])

  // Получаем посты для текущего слайда
  const getCurrentSlidePosts = () => {
    const startIndex = currentSlide * slidesToShow
    return relatedPosts.slice(startIndex, startIndex + slidesToShow)
  }

  if (!isClient || relatedPosts.length === 0) {
    return null
  }

  return (
    <Box sx={{ mt: 6 }}>
      <Typography variant="h4" sx={{ 
        mb: 4,
        textAlign: 'center',
        fontWeight: 600,
        color: 'primary.main'
      }}>
        {currentLanguage === 'ua' ? 'Рекомендуємо до читання' : 'Рекомендуем к чтению'}
      </Typography>

      {/* Контейнер слайдера */}
      <Box sx={{ 
        position: 'relative', 
        maxWidth: 'lg',
        mx: 'auto'
      }}>
        
        {/* Кнопка назад */}
        {relatedPosts.length > slidesToShow && (
          <IconButton
            onClick={prevSlide}
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
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 }
            }}
          >
            <ChevronLeft fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        )}

        {/* Область отображения слайдов */}
        <Box sx={{ 
          overflow: 'hidden',
          mx: { xs: 0, sm: 2 }
        }}>
          <Grid container spacing={2}>
            {getCurrentSlidePosts().map((post, index) => (
              <Grid 
                item 
                xs={12}
                sm={6}
                md={4}
                key={index}
              >
                <Link href={post.link} style={{ textDecoration: 'none' }}>
                  <Card sx={{ 
                    height: '100%',
                    transition: 'all 0.3s ease',
                    borderRadius: 2,
                    boxShadow: 2,
                    '&:hover': {
                      transform: 'translateY(-4px)',
                      boxShadow: 4,
                    }
                  }}>
                    {/* Изображение - компактное */}
                    <Box sx={{ 
                      position: 'relative', 
                      height: 160,
                      overflow: 'hidden'
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
                      />
                    </Box>
                    
                    {/* Контент карточки - компактный */}
                    <CardContent sx={{ 
                      p: 2,
                      '&:last-child': { pb: 2 }
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
                          height: 24
                        }}
                      />
                      <Typography 
                        variant="h6" 
                        sx={{ 
                          mb: 1,
                          fontWeight: 600,
                          lineHeight: 1.3,
                          fontSize: '1rem',
                          minHeight: '2.5em',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden'
                        }}
                      >
                        {post.title}
                      </Typography>
                      <Typography 
                        variant="body2" 
                        color="text.secondary"
                        sx={{
                          fontSize: '0.875rem',
                          display: '-webkit-box',
                          WebkitLineClamp: 2,
                          WebkitBoxOrient: 'vertical',
                          overflow: 'hidden',
                          minHeight: '2.5em',
                          lineHeight: 1.4
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
              width: { xs: 32, sm: 40 },
              height: { xs: 32, sm: 40 }
            }}
          >
            <ChevronRight fontSize={isMobile ? "small" : "medium"} />
          </IconButton>
        )}
      </Box>

      {/* Индикаторы слайдов */}
      {relatedPosts.length > slidesToShow && (
        <Box sx={{ 
          display: 'flex', 
          justifyContent: 'center', 
          mt: 3,
          gap: 1 
        }}>
          {Array.from({ length: maxSlides + 1 }).map((_, index) => (
            <Box
              key={index}
              onClick={() => setCurrentSlide(index)}
              sx={{
                width: 8,
                height: 8,
                borderRadius: '50%',
                bgcolor: currentSlide === index ? 'primary.main' : 'grey.300',
                cursor: 'pointer',
                transition: 'all 0.3s ease',
                '&:hover': {
                  bgcolor: currentSlide === index ? 'primary.dark' : 'grey.400'
                }
              }}
            />
          ))}
        </Box>
      )}

      {/* Кнопка "Все статьи блога" */}
      {/* <Box sx={{ textAlign: 'center', mt: 4 }}>
        <Link href="/blog" style={{ textDecoration: 'none' }}>
          <Typography 
            variant="button" 
            sx={{ 
              color: 'primary.main',
              fontWeight: 600,
              fontSize: '0.875rem',
              '&:hover': {
                color: 'primary.dark',
                textDecoration: 'underline'
              }
            }}
          >
            {currentLanguage === 'ua' ? 'Всі статті блогу' : 'Все статьи блога'}
          </Typography>
        </Link>
        </Box> */}
    </Box>
  )
}




