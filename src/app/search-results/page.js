


// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Container,
//   Typography,
//   Box,
//   Chip,
//   Grid,
//   Button,
//   Divider,
//   CircularProgress,
//   FormControl,
//   InputLabel,
//   Select,
//   MenuItem,
//   Dialog,
//   DialogContent,
//   DialogTitle,
//   IconButton,
//   ToggleButtonGroup,
//   ToggleButton,
//   Alert,
// } from '@mui/material';
// import { 
//   LocationOn, 
//   People, 
//   Category, 
//   ArrowBack,
//   Warning,
//   Sort,
//   Map as MapIcon,
//   Close
// } from '@mui/icons-material';
// import { useRouter } from 'next/navigation';
// import { useLanguage } from '@/app/LanguageContext';
// import ApartmentCard from '@/app/components/ApartmentCard';
// import dynamic from 'next/dynamic';

// // Динамически загружаем карту
// const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
//   ssr: false,
//   loading: () => <div>Загрузка карты...</div>
// });

// const SearchResults = () => {
//   const [searchResults, setSearchResults] = useState([]);
//   const [sortedResults, setSortedResults] = useState([]);
//   const [searchParams, setSearchParams] = useState(null);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [sortBy, setSortBy] = useState('default');
//   const [mapOpen, setMapOpen] = useState(false);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [viewMode, setViewMode] = useState('grid');
//   const [userLocation, setUserLocation] = useState(null);
//   const [missingCategories, setMissingCategories] = useState([]);

//   const router = useRouter();
//   const { currentLanguage } = useLanguage();

//   const translations = {
//     ua: {
//       title: 'Результати пошуку',
//       found: 'Знайдено варіантів',
//       noResults: 'За вашим запитом нічого не знайдено',
//       changeSearch: 'Змінити параметри пошуку',
//       back: 'Назад',
//       location: 'Місце',
//       guestsLabel: 'Гості',
//       types: 'Типи',
//       loading: 'Завантаження...',
//       error: 'Помилка при завантаженні результатів',
//       sortBy: 'Сортувати за',
//       sortDefault: 'За замовчуванням',
//       sortPrice: 'Ціною',
//       sortPriceAsc: 'Від дешевших',
//       sortPriceDesc: 'Від дорожчих',
//       sortDistrict: 'Районом',
//       sortMetro: 'Метро',
//       viewMap: 'Дивитись на карті',
//       viewGrid: 'Список',
//       map: 'Карта',
//       close: 'Закрити',
//       showOnMap: 'Показати на карті',
//       missingCategories: 'Не знайдено оголошень у категоріях',
//       noResultsInCategory: 'У категорії "{category}" не знайдено результатів',
//       categories: {
//         'apart': 'Квартира',
//         'hostel': 'Хостел', 
//         'glamping': 'Глемпінг',
//         'hotel': 'Готель',
//         'pet-hotel': 'Готель для тварин',
//         'house': 'Будинок',
//         'sauna': 'Сауна/Баня',
//         'pansionat': 'Пансіонат',
//         'cottage': 'Котедж',
//         'coworking': 'Коворкінг',
//         'autocamping': 'Автокемпінг',
//         'rest-base': 'База відпочинку'
//       }
//     },
//     ru: {
//       title: 'Результаты поиска',
//       found: 'Найдено вариантов',
//       noResults: 'По вашему запросу ничего не найдено',
//       changeSearch: 'Изменить параметры поиска',
//       back: 'Назад',
//       location: 'Место',
//       guestsLabel: 'Гости',
//       types: 'Типы',
//       loading: 'Загрузка...',
//       error: 'Ошибка при загрузке результатов',
//       sortBy: 'Сортировать по',
//       sortDefault: 'По умолчанию',
//       sortPrice: 'Ценой',
//       sortPriceAsc: 'От дешевых',
//       sortPriceDesc: 'От дорогих',
//       sortDistrict: 'Району',
//       sortMetro: 'Метро',
//       viewMap: 'Смотреть на карте',
//       viewGrid: 'Список',
//       map: 'Карта',
//       close: 'Закрыть',
//       showOnMap: 'Показать на карте',
//       missingCategories: 'Не найдено объявлений в категориях',
//       noResultsInCategory: 'В категории "{category}" не найдено результатов',
//       categories: {
//         'apart': 'Квартира',
//         'hostel': 'Хостел',
//         'glamping': 'Глэмпинг', 
//         'hotel': 'Гостиница',
//         'pet-hotel': 'Отель для животных',
//         'house': 'Дом',
//         'sauna': 'Сауна/Баня',
//         'pansionat': 'Пансионат',
//         'cottage': 'Коттедж',
//         'coworking': 'Коворкинг',
//         'autocamping': 'Автокемпинг',
//         'rest-base': 'База отдыха'
//       }
//     },
//   };

//   const t = translations[currentLanguage];

//   const translateCategory = (category) => {
//     if (!category) return category;
//     return t.categories[category] || category;
//   };

//   useEffect(() => {
//     // Исправленная функция геолокации
//     const getUserLocation = () => {
//       if (navigator.geolocation) {
//         navigator.geolocation.getCurrentPosition(
//           (position) => {
//             setUserLocation({
//               lat: position.coords.latitude,
//               lng: position.coords.longitude,
//             });
//           },
//           (error) => {
//             // Тихая обработка ошибки геолокации
//             console.log('Geolocation not available or denied');
//           },
//           {
//             timeout: 10000,
//             enableHighAccuracy: false
//           }
//         );
//       }
//     };

//     getUserLocation();

//     const loadSearchResults = () => {
//       try {
//         const results = localStorage.getItem('searchResults');
//         const params = localStorage.getItem('searchParams');
        
//         if (results && params) {
//           const parsedResults = JSON.parse(results);
//           const parsedParams = JSON.parse(params);
          
//           if (parsedResults.success) {
//             const foundResults = parsedResults.data || [];
//             setSearchResults(foundResults);
//             setSortedResults(foundResults);
//             setSearchParams(parsedParams);

//             if (parsedParams.types && Array.isArray(parsedParams.types)) {
//               const foundCategories = [...new Set(foundResults.map(item => item.category))];
//               const missing = parsedParams.types.filter(type => 
//                 !foundCategories.some(found => 
//                   found.toLowerCase().includes(type.toLowerCase()) || 
//                   type.toLowerCase().includes(found.toLowerCase())
//                 )
//               );
//               setMissingCategories(missing);
//             }
//           } else {
//             setError(parsedResults.message || t.error);
//           }
//         } else {
//           setSearchResults([]);
//           setSortedResults([]);
//         }
//       } catch (err) {
//         console.error('Error loading search results:', err);
//         setError(t.error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     loadSearchResults();
//   }, [t.error]);

//   // Сортировка результатов
//   useEffect(() => {
//     let sorted = [...searchResults];
    
//     switch (sortBy) {
//       case 'price_asc':
//         sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
//         break;
//       case 'price_desc':
//         sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
//         break;
//       case 'district':
//         sorted.sort((a, b) => (a.district || '').localeCompare(b.district || ''));
//         break;
//       case 'metro':
//         sorted.sort((a, b) => (a.metro || '').localeCompare(b.metro || ''));
//         break;
//       default:
//         break;
//     }
    
//     setSortedResults(sorted);
//   }, [sortBy, searchResults]);

//   const handleBackToSearch = () => {
//     router.push('/');
//   };

//   const handleNewSearch = () => {
//     router.push('/');
//   };

//   const handleShowOnMap = (apartment) => {
//     setSelectedApartment(apartment);
//     setMapOpen(true);
//   };

//   // Функция для перехода к детальной странице объявления - ИСПРАВЛЕННЫЙ ПУТЬ
//   const handleApartmentSelect = (apartment) => {
//     // Используем правильный путь к детальной странице
//     router.push(`/apartment/${apartment._id}`);
//   };

//   const handleViewModeChange = (event, newViewMode) => {
//     if (newViewMode !== null) {
//       setViewMode(newViewMode);
//     }
//   };

//   if (loading) {
//     return (
//       <Container sx={{ py: 4, textAlign: 'center' }}>
//         <CircularProgress sx={{ mb: 2 }} />
//         <Typography>{t.loading}</Typography>
//       </Container>
//     );
//   }

//   if (error) {
//     return (
//       <Container sx={{ py: 4, textAlign: 'center' }}>
//         <Warning sx={{ fontSize: 64, color: 'error.main', mb: 2 }} />
//         <Typography variant="h6" color="error" gutterBottom>
//           {error}
//         </Typography>
//         <Button 
//           variant="contained" 
//           onClick={handleNewSearch}
//           sx={{ mt: 2 }}
//         >
//           {t.changeSearch}
//         </Button>
//       </Container>
//     );
//   }

//   return (
//     <Container sx={{ py: 4 }}>
//       <Button
//         startIcon={<ArrowBack />}
//         onClick={handleBackToSearch}
//         sx={{ mb: 3 }}
//       >
//         {t.back}
//       </Button>

//       {searchParams && (
//         <Box sx={{ mb: 4 }}>
//           <Typography variant="h4" component="h1" gutterBottom>
//             {t.title}
//           </Typography>
          
//           {missingCategories.length > 0 && (
//             <Alert severity="info" sx={{ mb: 2 }}>
//               <Typography variant="body2">
//                 {t.missingCategories}: <strong>{missingCategories.map(cat => translateCategory(cat)).join(', ')}</strong>
//               </Typography>
//               {missingCategories.map(category => (
//                 <Typography key={category} variant="body2" sx={{ mt: 0.5 }}>
//                   • {t.noResultsInCategory.replace('{category}', translateCategory(category))}
//                 </Typography>
//               ))}
//             </Alert>
//           )}
          
//           <Box sx={{ display: 'flex', gap: 1, flexWrap: 'wrap', mb: 2 }}>
//             {searchParams.location && (
//               <Chip 
//                 icon={<LocationOn />} 
//                 label={`${t.location}: ${searchParams.location}`}
//                 variant="outlined"
//                 color="primary"
//               />
//             )}
//             {searchParams.guests && (
//               <Chip 
//                 icon={<People />} 
//                 label={`${t.guestsLabel}: ${searchParams.guests}`}
//                 variant="outlined"
//                 color="primary"
//               />
//             )}
//             {searchParams.types && searchParams.types.length > 0 && (
//               <Chip 
//                 icon={<Category />} 
//                 label={`${t.types}: ${searchParams.types.map(type => translateCategory(type)).join(', ')}`}
//                 variant="outlined"
//                 color="primary"
//               />
//             )}
//           </Box>
          
//           <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
//             <Typography variant="body1" color="text.secondary">
//               {t.found}: <strong>{searchResults.length}</strong>
//             </Typography>

//             <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
//               <ToggleButtonGroup
//                 value={viewMode}
//                 exclusive
//                 onChange={handleViewModeChange}
//                 aria-label="режим просмотра"
//                 size="small"
//               >
//                 <ToggleButton value="grid" aria-label="сетка">
//                   {t.viewGrid}
//                 </ToggleButton>
//                 <ToggleButton value="map" aria-label="карта">
//                   <MapIcon sx={{ mr: 1 }} />
//                   {t.viewMap}
//                 </ToggleButton>
//               </ToggleButtonGroup>

//               <FormControl size="small" sx={{ minWidth: 120 }}>
//                 <InputLabel>{t.sortBy}</InputLabel>
//                 <Select
//                   value={sortBy}
//                   label={t.sortBy}
//                   onChange={(e) => setSortBy(e.target.value)}
//                   startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
//                 >
//                   <MenuItem value="default">{t.sortDefault}</MenuItem>
//                   <MenuItem value="price_asc">{t.sortPriceAsc}</MenuItem>
//                   <MenuItem value="price_desc">{t.sortPriceDesc}</MenuItem>
//                   <MenuItem value="district">{t.sortDistrict}</MenuItem>
//                   <MenuItem value="metro">{t.sortMetro}</MenuItem>
//                 </Select>
//               </FormControl>
//             </Box>
//           </Box>
//         </Box>
//       )}

//       <Divider sx={{ mb: 4 }} />

//       {viewMode === 'grid' ? (
//         sortedResults.length > 0 ? (
//           <Grid container spacing={3}>
//             {sortedResults.map((apartment) => (
//               <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//                 <ApartmentCard
//                   apartment={apartment}
//                   showCreateUserDialog={() => {}}
//                   onShowOnMap={() => handleShowOnMap(apartment)}
//                   // Добавляем обработчик клика на всю карточку
//                   onClick={() => handleApartmentSelect(apartment)}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//         ) : (
//           <Box sx={{ textAlign: 'center', py: 8 }}>
//             <Warning sx={{ fontSize: 64, color: 'text.secondary', mb: 2 }} />
//             <Typography variant="h6" color="text.secondary" gutterBottom>
//               {t.noResults}
//             </Typography>
//             <Button 
//               variant="contained" 
//               onClick={handleNewSearch}
//               sx={{ mt: 2 }}
//             >
//               {t.changeSearch}
//             </Button>
//           </Box>
//         )
//       ) : (
//         <Box sx={{ height: '600px', borderRadius: 2, overflow: 'hidden' }}>
//           <MapComponent 
//             apartments={sortedResults}
//             onApartmentSelect={handleApartmentSelect}
//             userLocation={userLocation}
//           />
//         </Box>
//       )}

//       <Dialog
//         open={mapOpen}
//         onClose={() => setMapOpen(false)}
//         maxWidth="lg"
//         fullWidth
//       >
//         <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//           {t.map}
//           <IconButton onClick={() => setMapOpen(false)}>
//             <Close />
//           </IconButton>
//         </DialogTitle>
//         <DialogContent sx={{ height: '500px', p: 0 }}>
//           {selectedApartment && (
//             <MapComponent 
//               apartments={[selectedApartment]}
//               centerMode={true}
//               userLocation={userLocation}
//               onApartmentSelect={handleApartmentSelect}
//             />
//           )}
//         </DialogContent>
//       </Dialog>
//     </Container>
//   );
// };

// export default SearchResults;



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
  FormControl,
  InputLabel,
  Select,
  MenuItem,
  Dialog,
  DialogContent,
  DialogTitle,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
  Alert,
} from '@mui/material';
import { 
  LocationOn, 
  People, 
  Category, 
  ArrowBack,
  Warning,
  Sort,
  Map as MapIcon,
  Close
} from '@mui/icons-material';
import { useRouter } from 'next/navigation';
import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
import ApartmentCard from '@/app/components/ApartmentCard';
import dynamic from 'next/dynamic';
import Providers from '../providers';
import { store } from '../store';
import { SessionProvider } from 'next-auth/react';
import Header from '../components/Header';
import Footer from '../components/Footer';

// Динамически загружаем карту
const MapComponent = dynamic(() => import('@/app/components/MapComponent'), {
  ssr: false,
  loading: () => <div>Загрузка карты...</div>
});

// Переименовываем основной компонент
const SearchResultsContent = () => {
  const [searchResults, setSearchResults] = useState([]);
  const [sortedResults, setSortedResults] = useState([]);
  const [searchParams, setSearchParams] = useState(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [sortBy, setSortBy] = useState('default');
  const [mapOpen, setMapOpen] = useState(false);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [viewMode, setViewMode] = useState('grid');
  const [userLocation, setUserLocation] = useState(null);
  const [missingCategories, setMissingCategories] = useState([]);

  const router = useRouter();
  const { currentLanguage } = useLanguage();

  const translations = {
    ua: {
      title: 'Результати пошуку',
      found: 'Знайдено варіантів',
      noResults: 'За вашим запитом нічого не знайдено',
      changeSearch: 'Змінити параметри пошуку',
      back: 'Назад',
      location: 'Місце',
      guestsLabel: 'Гості',
      types: 'Типи',
      loading: 'Завантаження...',
      error: 'Помилка при завантаженні результатів',
      sortBy: 'Сортувати за',
      sortDefault: 'За замовчуванням',
      sortPrice: 'Ціною',
      sortPriceAsc: 'Від дешевших',
      sortPriceDesc: 'Від дорожчих',
      sortDistrict: 'Районом',
      sortMetro: 'Метро',
      viewMap: 'Дивитись на карті',
      viewGrid: 'Список',
      map: 'Карта',
      close: 'Закрити',
      showOnMap: 'Показати на карті',
      missingCategories: 'Не знайдено оголошень у категоріях',
      noResultsInCategory: 'У категорії "{category}" не знайдено результатів',
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
        'rest-base': 'База відпочинку'
      }
    },
    ru: {
      title: 'Результаты поиска',
      found: 'Найдено вариантов',
      noResults: 'По вашему запросу ничего не найдено',
      changeSearch: 'Изменить параметры поиска',
      back: 'Назад',
      location: 'Место',
      guestsLabel: 'Гости',
      types: 'Типы',
      loading: 'Загрузка...',
      error: 'Ошибка при загрузке результатов',
      sortBy: 'Сортировать по',
      sortDefault: 'По умолчанию',
      sortPrice: 'Ценой',
      sortPriceAsc: 'От дешевых',
      sortPriceDesc: 'От дорогих',
      sortDistrict: 'Району',
      sortMetro: 'Метро',
      viewMap: 'Смотреть на карте',
      viewGrid: 'Список',
      map: 'Карта',
      close: 'Закрыть',
      showOnMap: 'Показать на карте',
      missingCategories: 'Не найдено объявлений в категориях',
      noResultsInCategory: 'В категории "{category}" не найдено результатов',
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
        'rest-base': 'База отдыха'
      }
    },
  };

  const t = translations[currentLanguage];

  const translateCategory = (category) => {
    if (!category) return category;
    return t.categories[category] || category;
  };

  useEffect(() => {
    // Исправленная функция геолокации
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
            // Тихая обработка ошибки геолокации
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
            setSortedResults(foundResults);
            setSearchParams(parsedParams);

            if (parsedParams.types && Array.isArray(parsedParams.types)) {
              const foundCategories = [...new Set(foundResults.map(item => item.category))];
              const missing = parsedParams.types.filter(type => 
                !foundCategories.some(found => 
                  found.toLowerCase().includes(type.toLowerCase()) || 
                  type.toLowerCase().includes(found.toLowerCase())
                )
              );
              setMissingCategories(missing);
            }
          } else {
            setError(parsedResults.message || t.error);
          }
        } else {
          setSearchResults([]);
          setSortedResults([]);
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

  // Сортировка результатов
  useEffect(() => {
    let sorted = [...searchResults];
    
    switch (sortBy) {
      case 'price_asc':
        sorted.sort((a, b) => (a.price || 0) - (b.price || 0));
        break;
      case 'price_desc':
        sorted.sort((a, b) => (b.price || 0) - (a.price || 0));
        break;
      case 'district':
        sorted.sort((a, b) => (a.district || '').localeCompare(b.district || ''));
        break;
      case 'metro':
        sorted.sort((a, b) => (a.metro || '').localeCompare(b.metro || ''));
        break;
      default:
        break;
    }
    
    setSortedResults(sorted);
  }, [sortBy, searchResults]);

  const handleBackToSearch = () => {
    router.push('/');
  };

  const handleNewSearch = () => {
    router.push('/');
  };

  const handleShowOnMap = (apartment) => {
    setSelectedApartment(apartment);
    setMapOpen(true);
  };

  // Функция для перехода к детальной странице объявления
  const handleApartmentSelect = (apartment) => {
    router.push(`/apartment/${apartment._id}`);
  };

  const handleViewModeChange = (event, newViewMode) => {
    if (newViewMode !== null) {
      setViewMode(newViewMode);
    }
  };

  if (loading) {
    return (
      <Container sx={{ py: 4, textAlign: 'center' }}>
        <CircularProgress sx={{ mb: 2 }} />
        <Typography>{t.loading}</Typography>
      </Container>
    );
  }

  if (error) {
    return (
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
    );
  }

  return (
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
          
          {missingCategories.length > 0 && (
            <Alert severity="info" sx={{ mb: 2 }}>
              <Typography variant="body2">
                {t.missingCategories}: <strong>{missingCategories.map(cat => translateCategory(cat)).join(', ')}</strong>
              </Typography>
              {missingCategories.map(category => (
                <Typography key={category} variant="body2" sx={{ mt: 0.5 }}>
                  • {t.noResultsInCategory.replace('{category}', translateCategory(category))}
                </Typography>
              ))}
            </Alert>
          )}
          
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
          
          <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center', flexWrap: 'wrap', gap: 2 }}>
            <Typography variant="body1" color="text.secondary">
              {t.found}: <strong>{searchResults.length}</strong>
            </Typography>

            <Box sx={{ display: 'flex', gap: 2, alignItems: 'center' }}>
              <ToggleButtonGroup
                value={viewMode}
                exclusive
                onChange={handleViewModeChange}
                aria-label="режим просмотра"
                size="small"
              >
                <ToggleButton value="grid" aria-label="сетка">
                  {t.viewGrid}
                </ToggleButton>
                <ToggleButton value="map" aria-label="карта">
                  <MapIcon sx={{ mr: 1 }} />
                  {t.viewMap}
                </ToggleButton>
              </ToggleButtonGroup>

              <FormControl size="small" sx={{ minWidth: 120 }}>
                <InputLabel>{t.sortBy}</InputLabel>
                <Select
                  value={sortBy}
                  label={t.sortBy}
                  onChange={(e) => setSortBy(e.target.value)}
                  startAdornment={<Sort sx={{ mr: 1, color: 'text.secondary' }} />}
                >
                  <MenuItem value="default">{t.sortDefault}</MenuItem>
                  <MenuItem value="price_asc">{t.sortPriceAsc}</MenuItem>
                  <MenuItem value="price_desc">{t.sortPriceDesc}</MenuItem>
                  <MenuItem value="district">{t.sortDistrict}</MenuItem>
                  <MenuItem value="metro">{t.sortMetro}</MenuItem>
                </Select>
              </FormControl>
            </Box>
          </Box>
        </Box>
      )}

      <Divider sx={{ mb: 4 }} />

      {viewMode === 'grid' ? (
        sortedResults.length > 0 ? (
          <Grid container spacing={3}>
            {sortedResults.map((apartment) => (
              <Grid item xs={12} sm={6} md={4} key={apartment._id}>
                <ApartmentCard
                  apartment={apartment}
                  showCreateUserDialog={() => {}}
                  onShowOnMap={() => handleShowOnMap(apartment)}
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
        )
      ) : (
        <Box sx={{ height: '600px', borderRadius: 2, overflow: 'hidden' }}>
          <MapComponent 
            apartments={sortedResults}
            onApartmentSelect={handleApartmentSelect}
            userLocation={userLocation}
          />
        </Box>
      )}

      <Dialog
        open={mapOpen}
        onClose={() => setMapOpen(false)}
        maxWidth="lg"
        fullWidth
      >
        <DialogTitle sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
          {t.map}
          <IconButton onClick={() => setMapOpen(false)}>
            <Close />
          </IconButton>
        </DialogTitle>
        <DialogContent sx={{ height: '500px', p: 0 }}>
          {selectedApartment && (
            <MapComponent 
              apartments={[selectedApartment]}
              centerMode={true}
              userLocation={userLocation}
              onApartmentSelect={handleApartmentSelect}
            />
          )}
        </DialogContent>
      </Dialog>
    </Container>
  );
};

// Главный компонент страницы с провайдерами
export default function SearchResults() {
  return (
    <Providers store={store}>
      <LanguageProvider>
        <SessionProvider>
          <Header />
          <SearchResultsContent />
          <Footer />
        </SessionProvider>
      </LanguageProvider>
    </Providers>
  );
}