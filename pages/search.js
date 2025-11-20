



'use client';

import React, { useState, useEffect } from 'react';
import {
  Container,
  Typography,
  Box,
  Chip,
  Grid,
  Button,
  Divider,
  CircularProgress,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  Alert,
  Snackbar,
} from '@mui/material';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
import ApartmentCard from '@/app/components/ApartmentCard';
import dynamic from 'next/dynamic';
import Providers from '@/app/providers';
import { store } from '@/app/store';
import { SessionProvider } from 'next-auth/react';
import Header from '@/app/components/Header';
import Footer from '@/app/components/Footer';
import { useFavorites } from '@/app/hooks/useFavorites';
import { FavoritesProvider } from '@/app/hooks/FavoritesContext'; 
import Head from 'next/head';

// Импортируем иконки по отдельности
import LocationOn from '@mui/icons-material/LocationOn';
import People from '@mui/icons-material/People';
import Category from '@mui/icons-material/Category';
import ArrowBack from '@mui/icons-material/ArrowBack';
import Warning from '@mui/icons-material/Warning';
import MapIcon from '@mui/icons-material/Map';
import Close from '@mui/icons-material/Close';
import { GoogleMapsProvider } from '../src/GoogleMapsProvider';

// Динамически загружаем карту
const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
  ssr: false,
  loading: () => <div>Загрузка карты...</div>
});

// Цвета категорий для отображения в основном компоненте
const CATEGORY_COLORS = {
  'apart': '#e590ad',
  'hostel': '#34A853', 
  'glamping': '#FBBC05',
  'hotel': '#4285F4',
  'pet-hotel': '#9C27B0',
  'house': '#795548',
  'sauna': '#F44336',
  'pansionat': '#607D8B',
  'cottage': '#FF9800',
  'coworking': '#E91E63',
  'autocamping': '#4CAF50',
  'rest-base': '#00BCD4',
  'default': '#EA4335'
};

// Функция для получения цвета категории
const getCategoryColor = (category) => {
  if (!category) return CATEGORY_COLORS.default;
  
  const categoryLower = category.toLowerCase();
  
  if (categoryLower.includes('apart') || categoryLower.includes('квартир')) 
    return CATEGORY_COLORS.apart;
  if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) 
    return CATEGORY_COLORS.hostel;
  if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) 
    return CATEGORY_COLORS.glamping;
  if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) 
    return CATEGORY_COLORS.hotel;
  if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) 
    return CATEGORY_COLORS['pet-hotel'];
  if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
    return CATEGORY_COLORS.house;
  if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
    return CATEGORY_COLORS.sauna;
  if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
    return CATEGORY_COLORS.pansionat;
  if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) 
    return CATEGORY_COLORS.cottage;
  if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) 
    return CATEGORY_COLORS.coworking;
  if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) 
    return CATEGORY_COLORS.autocamping;
  if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) 
    return CATEGORY_COLORS['rest-base'];
  
  return CATEGORY_COLORS.default;
};

// Переименовываем основной компонент
const SearchResultsContent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [userLocation, setUserLocation] = useState(null);
  const [foundCategories, setFoundCategories] = useState([]);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'success',
  });

  const router = useRouter();
  const { currentLanguage } = useLanguage();
  
  // ДОБАВЛЯЕМ ХУК ИЗБРАННОГО - ВАЖНО: получаем и isFavorite и toggleFavorite
  const { isFavorite, toggleFavorite, loading: favoritesLoading } = useFavorites();

  const translations = {
    ua: {
      title: 'Результати пошуку',
      metaTitle: 'Результати пошуку житла для відпочинку | NaDoby',
      metaDescription: 'Знайдіть ідеальний варіант для відпочинку. Порівнюйте ціни, переглядайте фото та обирайте найкраще житло для вашої подорожі.',
      found: 'Знайдено варіантів',
      foundCategories: 'Знайдені категорії',
      noResults: 'За вашим запитом нічого не знайдено',
      changeSearch: 'Змінити параметри пошуку',
      back: 'Назад',
      location: 'Місце',
      guestsLabel: 'Гості',
      types: 'Типи',
      loading: 'Завантаження...',
      error: 'Помилка при завантаженні результатів',
      viewMap: 'Дивитись на карті',
      close: 'Закрити',
      showOnMap: 'Показати на карті',
      categoriesOnMap: 'Категорії на карті',
      favoriteAdd: 'Додано в обране',
      favoriteRemove: 'Видалено з обраного',
      favoriteError: 'Помилка при оновленні обраного',
      loginRequired: 'Увійдіть, щоб додати в обране',
      categories: {
        'apart': 'Квартира',
        'hostel': 'Хостел', 
        'glamping': 'Глемпінг',
        'hotel': 'Готель',
        'pet-hotel': 'Готель для тварин',
        'house': 'Будинок',
        'sauna': 'Сауна/Баня',
        'pansionat': 'Пансіонат',
        'cottage': 'Котедж',
        'coworking': 'Коворкінг',
        'autocamping': 'Автокемпінг',
        'rest-base': 'База відпочинку',
        'petHotel': 'Готель для тварин',
        'recreationCenter': 'База відпочинку',
        'kotedzi': 'Котедж',
        'kavorking': 'Коворкінг',
        'avtokemping': 'Автокемпінг'
      }
    },
    ru: {
      title: 'Результаты поиска',
      metaTitle: 'Результаты поиска жилья для отдыха | NaDoby',
      metaDescription: 'Найдите идеальный вариант для отдыха. Сравнивайте цены, просматривайте фото и выбирайте лучшее жилье для вашего путешествия.',
      found: 'Найдено вариантов',
      foundCategories: 'Найденные категории',
      noResults: 'По вашему запросу ничего не найдено',
      changeSearch: 'Изменить параметры поиска',
      back: 'Назад',
      location: 'Место',
      guestsLabel: 'Гости',
      types: 'Типы',
      loading: 'Загрузка...',
      error: 'Ошибка при загрузке результатов',
      viewMap: 'Смотреть на карте',
      close: 'Закрыть',
      showOnMap: 'Показать на карте',
      categoriesOnMap: 'Категории на карте',
      favoriteAdd: 'Добавлено в избранное',
      favoriteRemove: 'Удалено из избранного',
      favoriteError: 'Ошибка при обновлении избранного',
      loginRequired: 'Войдите, чтобы добавить в избранное',
      categories: {
        'apart': 'Квартира',
        'hostel': 'Хостел',
        'glamping': 'Глэмпинг', 
        'hotel': 'Гостиница',
        'pet-hotel': 'Отель для животных',
        'house': 'Дом',
        'sauna': 'Сауна/Баня',
        'pansionat': 'Пансионат',
        'cottage': 'Коттедж',
        'coworking': 'Коворкинг',
        'autocamping': 'Автокемпинг',
        'rest-base': 'База отдыха',
        'petHotel': 'Отель для животных',
        'recreationCenter': 'База отдыха',
        'kotedzi': 'Коттедж',
        'kavorking': 'Коворкинг',
        'avtokemping': 'Автокемпинг'
      }
    },
  };

  const t = translations[currentLanguage];

  const translateCategory = (category) => {
    if (!category) return category;
    const normalizedCategory = category.toLowerCase().trim();
    return t.categories[category] || t.categories[normalizedCategory] || category;
  };

  // Функция для обработки добавления/удаления из избранного
  const handleToggleFavorite = async (apartmentId) => {
    try {
      const userProfile = localStorage.getItem('user_profile');
      if (!userProfile) {
        setSnackbar({
          open: true,
          message: t.loginRequired,
          severity: 'warning',
        });
        return;
      }

      const wasFavorite = isFavorite(apartmentId);
      await toggleFavorite(apartmentId);
      
      // Показываем сообщение в зависимости от действия
      setSnackbar({
        open: true,
        message: wasFavorite ? t.favoriteRemove : t.favoriteAdd,
        severity: 'success',
      });
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      setSnackbar({
        open: true,
        message: t.favoriteError,
        severity: 'error',
      });
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
  };

  useEffect(() => {
    const getUserLocation = () => {
      if (navigator.geolocation) {
        navigator.geolocation.getCurrentPosition(
          (position) => {
            setUserLocation({
              lat: position.coords.latitude,
              lng: position.coords.longitude,
            });
          },
          (error) => {
            console.log('Geolocation not available or denied');
          },
          {
            timeout: 10000,
            enableHighAccuracy: false
          }
        );
      }
    };

    getUserLocation();

    const loadSearchResults = () => {
      try {
        const results = localStorage.getItem('searchResults');
        const params = localStorage.getItem('searchParams');
        
        if (results && params) {
          const parsedResults = JSON.parse(results);
          const parsedParams = JSON.parse(params);
          
          if (parsedResults.success) {
            const foundResults = parsedResults.data || [];
            setSearchResults(foundResults);
            setSearchParams(parsedParams);

            // Находим уникальные категории из результатов
            const uniqueCategories = [...new Set(foundResults.map(item => item.category))];
            setFoundCategories(uniqueCategories);
          } else {
            setError(parsedResults.message || t.error);
          }
        } else {
          setSearchResults([]);
        }
      } catch (err) {
        console.error('Error loading search results:', err);
        setError(t.error);
      } finally {
        setLoading(false);
      }
    };

    loadSearchResults();
  }, [t.error]);

  const handleBackToSearch = () => {
    router.push('/');
  };

  const handleNewSearch = () => {
    router.push('/');
  };

  const handleApartmentSelect = (apartment) => {
    router.push(`/apartment/${apartment._id}`);
  };

  if (loading) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Container sx={{ py: 4, textAlign: 'center' }}>
          <CircularProgress sx={{ mb: 2 }} />
          <Typography>{t.loading}</Typography>
        </Container>
      </>
    );
  }

  if (error) {
    return (
      <>
        <Head>
          <title>{t.metaTitle}</title>
          <meta name="description" content={t.metaDescription} />
          <meta name="viewport" content="width=device-width, initial-scale=1" />
        </Head>
        <Container sx={{ py: 4, textAlign: 'center' }}>
          <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
          <Typography variant="h6" color="error" gutterBottom>
            {error}
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleNewSearch}
            sx={{ mt: 2 }}
          >
            {t.changeSearch}
          </Button>
        </Container>
      </>
    );
  }

  return (
    <>
      <Head>
        <title>{t.metaTitle}</title>
        <meta name="description" content={t.metaDescription} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>

      <Container sx={{ py: 4 }}>
        <Button
          startIcon={<ArrowBack />}
          onClick={handleBackToSearch}
          sx={{ mb: 3 }}
        >
          {t.back}
        </Button>

        {searchParams && (
          <Box sx={{ mb: 4 }}>
            <Typography variant="h4" component="h1" gutterBottom>
              {t.title}
            </Typography>
            
            <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
              {searchParams.location && (
                <Chip 
                  icon={<LocationOn />} 
                  label={`${t.location}: ${searchParams.location}`}
                  variant="outlined"
                  color="primary"
                />
              )}
              {searchParams.guests && (
                <Chip 
                  icon={<People />} 
                  label={`${t.guestsLabel}: ${searchParams.guests}`}
                  variant="outlined"
                  color="primary"
                />
              )}
              {searchParams.types && searchParams.types.length > 0 && (
                <Chip 
                  icon={<Category />} 
                  label={`${t.types}: ${searchParams.types.map(type => translateCategory(type)).join(', ')}`}
                  variant="outlined"
                  color="primary"
                />
              )}
            </Box>
            
            <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'flex-start', flexWrap: 'wrap', gap: 2 }}>
              <Box>
                <Typography variant="body1" color="text.secondary">
                  {t.found}: <strong>{searchResults.length}</strong>
                </Typography>
                
                {/* Отображение найденных категорий с РАЗНЫМИ ЦВЕТАМИ */}
                {foundCategories.length > 0 && (
                  <Box sx={{ mt: 1 }}>
                    <Typography variant="body2" color="text.secondary" sx={{ mb: 0.5 }}>
                      {t.foundCategories}:
                    </Typography>
                    <Box sx={{ display: 'flex', gap: 0.5, flexWrap: 'wrap' }}>
                      {foundCategories.map(category => {
                        const categoryColor = getCategoryColor(category);
                        return (
                          <Chip
                            key={category}
                            label={translateCategory(category)}
                            size="small"
                            sx={{
                              backgroundColor: categoryColor,
                              color: 'white',
                              fontSize: '0.7rem',
                              height: '24px',
                              border: `1px solid ${categoryColor}`,
                              '& .MuiChip-label': {
                                px: 1,
                                py: 0.25
                              }
                            }}
                          />
                        );
                      })}
                    </Box>
                  </Box>
                )}
              </Box>
            </Box>
          </Box>
        )}

        <Divider sx={{ mb: 4 }} />

        {/* Компактная карта объектов */}
        {searchResults.length > 0 && (
          <Box sx={{ mb: 4 }}>
            <Box sx={{ 
              height: '200px', 
              borderRadius: 2, 
              overflow: 'hidden',
              border: '1px solid #e0e0e0',
              mb: 2
            }}>
              <MapComponent 
                apartments={searchResults}
                onApartmentSelect={handleApartmentSelect}
                userLocation={userLocation}
                compactMode={true}
              />
            </Box>

            {/* Кнопка по центру для открытия большой карты */}
            <Box sx={{ display: 'flex', justifyContent: 'center' }}>
              <Button
                variant="contained"
                startIcon={<MapIcon />}
                onClick={() => setMapOpen(true)}
                size="medium"
                sx={{
                  px: 2,
                  py: 1,
                  fontSize: '0.8rem',
                  borderRadius: 2,
                  boxShadow: 3,
                  '&:hover': {
                    boxShadow: 6,
                    transform: 'translateY(-2px)'
                  },
                  transition: 'all 0.3s ease'
                }}
              >
                {t.viewMap}
              </Button>
            </Box>
          </Box>
        )}

        {/* Список всех карточек */}
        {searchResults.length > 0 ? (
          <Grid container spacing={3}>
            {searchResults.map((apartment) => (
              <Grid item xs={12} sm={6} md={4} key={apartment._id}>
                <ApartmentCard
                  apartment={apartment}
                  isFavorite={isFavorite(apartment._id)} // Передаем статус избранного
                  toggleFavorite={() => handleToggleFavorite(apartment._id)} // Передаем функцию с обработкой алертов
                  showCreateUserDialog={() => {}}
                  onShowOnMap={() => setSelectedApartment(apartment)}
                  onClick={() => handleApartmentSelect(apartment)}
                />
              </Grid>
            ))}
          </Grid>
        ) : (
          <Box sx={{ textAlign: 'center', py: 8 }}>
            <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
            <Typography variant="h6" color="text.secondary" gutterBottom>
              {t.noResults}
            </Typography>
            <Button 
              variant="contained" 
              onClick={handleNewSearch}
              sx={{ mt: 2 }}
            >
              {t.changeSearch}
            </Button>
          </Box>
        )}

        {/* Диалог с большой картой */}
        <Dialog
          open={mapOpen}
          onClose={() => setMapOpen(false)}
          maxWidth="xl"
          fullWidth
          sx={{
            '& .MuiDialog-paper': {
              height: { xs: '90vh', sm: '80vh' },
              maxHeight: '90vh',
              margin: { xs: 1, sm: 2 },
              width: '100%'
            }
          }}
        >
          <DialogTitle sx={{ 
            display: 'flex', 
            justifyContent: 'space-between', 
            alignItems: 'center',
            py: 2,
            px: 3
          }}>
            <Box sx={{ display: 'flex', alignItems: 'center', gap: 2 }}>
              <Typography variant="h6">
                {t.found}: <strong>{searchResults.length}</strong>
              </Typography>
              {selectedApartment && (
                <Chip
                  label={translateCategory(selectedApartment.category)}
                  size="small"
                  sx={{
                    backgroundColor: getCategoryColor(selectedApartment.category),
                    color: 'white',
                    fontSize: '0.75rem',
                  }}
                />
              )}
            </Box>
            <IconButton 
              onClick={() => setMapOpen(false)}
              size="small"
            >
              <Close />
            </IconButton>
          </DialogTitle>
          
          {/* Категории на карте в диалоге с РАЗНЫМИ ЦВЕТАМИ */}
          {foundCategories.length > 0 && (
            <Box sx={{ px: 3, pb: 1 }}>
              <Typography variant="body2" color="text.secondary" gutterBottom>
                {t.categoriesOnMap}:
              </Typography>
              <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap' }}>
                {foundCategories.map(category => {
                  const categoryColor = getCategoryColor(category);
                  return (
                    <Chip
                      key={category}
                      label={translateCategory(category)}
                      size="small"
                      sx={{
                        backgroundColor: categoryColor,
                        color: 'white',
                        fontSize: '0.75rem',
                        border: `2px solid ${categoryColor}`,
                        '& .MuiChip-label': {
                          px: 1,
                          py: 0.5
                        }
                      }}
                    />
                  );
                })}
              </Box>
            </Box>
          )}
          
          <DialogContent sx={{ 
            height: 'calc(100% - 120px)', 
            p: 0, 
            display: 'flex',
            flexDirection: 'column'
          }}>
            <Box sx={{ flexGrow: 1 }}>
              <MapComponent 
                apartments={selectedApartment ? [selectedApartment] : searchResults}
                centerMode={!!selectedApartment}
                userLocation={userLocation}
                onApartmentSelect={handleApartmentSelect}
                compactMode={false}
              />
            </Box>
          </DialogContent>
        </Dialog>

        {/* Snackbar для уведомлений об избранном */}
        <Snackbar
          open={snackbar.open}
          autoHideDuration={3000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
        >
          <Alert 
            onClose={handleCloseSnackbar} 
            severity={snackbar.severity}
            sx={{ width: '100%' }}
          >
            {snackbar.message}
          </Alert>
        </Snackbar>
      </Container>
    </>
  );
};

// Главный компонент страницы с провайдерами
// export default function Search() {
//   return (
//     <Providers store={store}>
//       <LanguageProvider>
//         <SessionProvider>
//           <FavoritesProvider>   {/* Добавляем здесь */}
//           <GoogleMapsProvider> 
//             <Header />
//             <SearchResultsContent />
//             <Footer />
            
//           </FavoritesProvider>
//         </SessionProvider>
//       </LanguageProvider>
//     </Providers>
//   );
// }

// Главный компонент страницы с провайдерами
export default function Search() {
  return (
    <Providers store={store}>
      <LanguageProvider>
        <SessionProvider>
          <FavoritesProvider>
            <GoogleMapsProvider> 
              <Header />
              <SearchResultsContent />
              <Footer />
            </GoogleMapsProvider>
          </FavoritesProvider>
        </SessionProvider>
      </LanguageProvider>
    </Providers>
  );
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}