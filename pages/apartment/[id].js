

// в етом компоненте показывается отдельная  страница где показывается
// карта одиночного обявления

// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
//   Chip,
//   Divider,
//   Avatar,
//   Tabs,
//   Tab,
//   useMediaQuery,
//   ThemeProvider,
//   createTheme
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import BathtubIcon from '@mui/icons-material/Bathtub';
// import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import Header from '@/app/components/Header';
// import { useSwipeable } from 'react-swipeable';
// import { LanguageProvider } from '@/app/LanguageContext';
// import { Provider } from 'react-redux';
// import { store } from '@/app/store';
// const theme = createTheme({
//   palette: {
//     primary: { main: '#3f51b5' },
//     secondary: { main: '#f50057' },
//   },
// });

// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [activeTab, setActiveTab] = useState(0);

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//   const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     trackMouse: true,
//     preventDefaultTouchmoveEvent: true
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           const data = await response.json();
//           setApartment(data);
//         } catch (error) {
//           console.error('Помилка завантаження квартири:', error);
//         }
//       };
//       fetchApartment();
//     }
//   }, [id]);

//   const handlePrev = () => {
//     setCurrentIndex(prev => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex(prev => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
//   };

//   const handleGetDirections = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const url = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${apartment.latitude},${apartment.longitude}`;
//           window.open(url, '_blank');
//         },
//         () => alert('Не вдалося отримати ваше місцезнаходження')
//       );
//     } else {
//       alert('Геолокація не підтримується в цьому браузері');
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: apartment.name || 'Оренда квартири',
//         text: `Перегляньте це оголошення: ${apartment.name}`,
//         url: window.location.href,
//       }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Посилання скопійовано');
//     }
//   };

//   const toggleFavorite = () => setIsFavorite(!isFavorite);

//   const handleTabChange = (event, newValue) => setActiveTab(newValue);

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const renderHighlights = () => (
//     <Grid container spacing={2} sx={{ mt: 2 }}>
//       {[{ icon: <ApartmentIcon />, label: 'Кімнат', value: apartment.rooms },
//         { icon: <BathtubIcon />, label: 'Спальних місць', value: apartment.beds },
//         { icon: <LocationOnIcon />, label: 'Площа', value: `${apartment.size} м²` },
//         { icon: <LocationOnIcon />, label: 'Поверх', value: apartment.floor && apartment.totalFloors ? `${apartment.floor} з ${apartment.totalFloors}` : null },
//       ].map((item, index) => (
//         <Grid item xs={6} sm={3} key={index}>
//           <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
//             <Box sx={{ color: '#3f51b5' }}>{item.icon}</Box>
//             <Typography variant="body2" color="text.secondary">{item.label}</Typography>
//             <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
//           </Paper>
//         </Grid>
//       ))}
//     </Grid>
//   );

//   return (
//     <ThemeProvider theme={theme}>
//       <Box maxWidth="1200px" mx="auto" mt={isMobile ? 1 : 4} p={isMobile ? 1 : 3}>
//         <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//         </LanguageProvider>
//         </Provider>

//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//           <Button variant="outlined" onClick={() => router.back()} size="small">Назад</Button>
//           <Box>
//             <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
//               <FavoriteBorderIcon />
//             </IconButton>
//             <IconButton onClick={handleShare}>
//               <ShareIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         <Box mb={2}>
//           <Chip label={apartment.category || "Категорія"} color="primary" size="small" sx={{ mb: 1 }} />
//           <Typography variant="h5" fontWeight="bold" gutterBottom>
//             {apartment.name || "Без назви"}
//           </Typography>
//           <Typography variant="subtitle1" gutterBottom>
//             <LocationOnIcon color="primary" fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
//             {[apartment.city, apartment.street, apartment.houseNumber, apartment.district].filter(Boolean).join(', ')}
//           </Typography>
//         </Box>

//         <Box position="relative" mb={2} sx={{ borderRadius: 3, overflow: 'hidden' }} {...swipeHandlers}>
//           <CardMedia
//             component="img"
//             image={apartment.photos?.[currentIndex]}
//             height={isMobile ? 250 : 450}
//             sx={{ objectFit: 'cover', userSelect: 'none', touchAction: 'pan-y' }}
//           />
//           <IconButton onClick={handlePrev} sx={arrowStyle('left')}><ArrowBackIosNewIcon /></IconButton>
//           <IconButton onClick={handleNext} sx={arrowStyle('right')}><ArrowForwardIosIcon /></IconButton>
//           <Box sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 1, borderRadius: 1 }}>
//             {`${currentIndex + 1}/${apartment.photos?.length}`}
//           </Box>
//         </Box>

//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
//           <Box>
//             <Typography variant="subtitle1" fontWeight="bold">{apartment.ownerName || "Ім'я не вказано"}</Typography>
//             <Typography variant="body1">{apartment.phone || "Телефон не вказано"}</Typography>
//           </Box>
//           {apartment.phone && (
//             <Button variant="contained" startIcon={<LocalPhoneIcon />} href={`tel:${apartment.phone}`} sx={{ px: 3, py: 1, borderRadius: 2 }}>
//               Зателефонувати
//             </Button>
//           )}
//         </Box>

//         <Box mb={3}>
//           <Typography variant="h5" fontWeight="bold" color="primary">
//             {apartment.price} грн/доба
//           </Typography>
//           <Typography variant="body2" color="text.secondary">
//             Мінімальний термін оренди: {apartment.minRent || 3} дні
//           </Typography>
//         </Box>

//         {renderHighlights()}
//         <Divider sx={{ my: 3 }} />

//         <Box mb={3}>
//           <Typography variant="h6" gutterBottom>Опис</Typography>
//           <Typography variant="body1" paragraph>{apartment.description || 'Опис відсутній.'}</Typography>
//         </Box>

//         <Box mb={3}>
//           <Typography variant="h6" gutterBottom>Розташування</Typography>
//           <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc', mb: 2 }}>
//             {isLoaded ? (
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={{ lat: apartment.latitude, lng: apartment.longitude }}
//                 zoom={15}
//               >
//                 <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//               </GoogleMap>
//             ) : (
//               <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                 <CircularProgress />
//               </Box>
//             )}
//           </Box>
//           <Button variant="outlined" startIcon={<DirectionsIcon />} onClick={handleGetDirections} fullWidth>
//             Прокласти маршрут
//           </Button>
//         </Box>
//       </Box>
//     </ThemeProvider>
//   );
// }

// const arrowStyle = (side) => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: 16,
//   transform: 'translateY(-50%)',
//   bgcolor: 'rgba(0,0,0,0.4)',
//   color: 'white',
//   '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
// });




'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Bathtub as BathtubIcon,
  KingBed as KingBedIcon,
  Apartment as ApartmentIcon,
  DirectionsCar as DirectionsCarIcon,
  Wifi as WifiIcon,
  Tv as TvIcon,
  AcUnit as AcUnitIcon,
  LocalLaundryService as LaundryIcon,
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
  SmokingRooms as SmokingIcon,
  Pets as PetsIcon,
  Description as DocsIcon,
  AccessTime as TimeIcon,
  Train as MetroIcon,
  LocationOn as DistrictIcon,
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSwipeable } from 'react-swipeable';
import Header from '@/app/components/Header';
import { LanguageProvider } from '@/app/LanguageContext';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
const ApartmentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apartment, setApartment] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          const data = await response.json();
          setApartment(data);
        } catch (error) {
          console.error('Ошибка загрузки квартиры:', error);
        }
      };
      fetchApartment();
    }
  }, [id]);

  useEffect(() => {
    if (navigator.geolocation && apartment?.latitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Ошибка геолокации:', error);
        }
      );
    }
  }, [apartment]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.name || 'Аренда квартиры',
        text: `Посмотрите это объявление: ${apartment.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована');
    }
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
  };

  const getCategoryIcon = () => {
    switch(apartment?.category) {
      case 'Квартира': return <HomeIcon />;
      case 'Гостиница': return <HotelIcon />;
      case 'Хостел': return <KingBedIcon />;
      case 'Дом': return <HomeIcon />;
      case 'База отдыха': return <HomeIcon />;
      case 'Сауна/Баня': return <BathtubIcon />;
      default: return <ApartmentIcon />;
    }
  };

  const getPriceSuffix = () => {
    return apartment?.category === 'Сауна/Баня' ? 'година' : 'доба';
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const getBooleanValue = (value) => {
    return value === 'yes' ? 'Да' : value === 'no' ? 'Нет' : 'Не указано';
  };

  const getFacilityIcon = (facility) => {
    switch(facility) {
      case 'WiFi': return <WifiIcon />;
      case 'Парковка': return <DirectionsCarIcon />;
      case 'Кондиціонер': return <AcUnitIcon />;
      case 'Телевізор': return <TvIcon />;
      case 'Пральна машина': return <LaundryIcon />;
      default: return <HomeIcon />;
    }
  };

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="1200px" mx="auto" mt={isMobile ? 2 : 4} p={isMobile ? 1 : 3}>

<Provider store={store}>
        <LanguageProvider>
           <Header />
         </LanguageProvider>
         </Provider>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="outlined" onClick={() => router.back()} size="small">
          Назад
        </Button>
        <Box>
          <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      {/* Галерея изображений */}
      {apartment.photos?.length > 0 ? (
        <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
          <Box
            {...swipeHandlers}
            component="div"
            sx={{
              position: 'relative',
              width: '100%',
              height: isMobile ? 300 : 450,
              borderRadius: 2,
              overflow: 'hidden',
            }}
          >
            <Box
              component="img"
              src={apartment.photos[currentIndex]}
              alt={`Фото ${currentIndex + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
              }}
              draggable={false}
            />
            
            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                right: 16,
                backgroundColor: 'rgba(0, 0, 0, 0.6)',
                color: 'white',
                px: 1.5,
                py: 0.5,
                borderRadius: 4,
                fontSize: '0.875rem',
              }}
            >
              {currentIndex + 1} / {apartment.photos.length}
            </Box>
          </Box>
          
          {apartment.photos.length > 1 && (
            <>
              <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
                <ArrowBackIosNewIcon />
              </IconButton>
              <IconButton onClick={handleNext} sx={arrowStyle('right')}>
                <ArrowForwardIosIcon />
              </IconButton>
            </>
          )}
        </Box>
      ) : (
        <Box sx={{ 
          height: 200, 
          display: 'flex', 
          justifyContent: 'center', 
          alignItems: 'center',
          backgroundColor: '#f5f5f5',
          borderRadius: 2,
          mb: 3
        }}>
          <Typography variant="body1" color="textSecondary">
            Фото отсутствуют
          </Typography>
        </Box>
      )}

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        {/* Категория и адрес */}
        <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
          <Chip 
            label={apartment.category} 
            color="primary" 
            size="small" 
            icon={getCategoryIcon()}
          />
          <Typography variant="body1" color="text.secondary">
            {apartment.city}, {apartment.street} {apartment.houseNumber}
            {apartment.district && (
              <>
                , <Box component="span" sx={{ fontWeight: 'bold' }}>район</Box>: {apartment.district}
              </>
            )}
            {apartment.metro && `, метро: ${apartment.metro}`}
          </Typography>
        </Box>

        {/* Название объекта и цена */}
        <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
          <Typography variant="h4">
            {apartment.name || 'Без названия'}
          </Typography>
          <Typography variant="h5" color="primary">
            {apartment.price || '0'} грн. / {getPriceSuffix()}
          </Typography>
        </Stack>

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Описание
        </Typography>
        <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
          {apartment.description || 'Описание отсутствует'}
        </Typography>
        
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Основные характеристики
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Комнат" 
                  secondary={apartment.rooms || 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Макс. гостей" 
                  secondary={apartment.beds || 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Площадь" 
                  secondary={apartment.size ? `${apartment.size} м²` : 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Этаж" 
                  secondary={
                    apartment.floor 
                      ? `${apartment.floor} из ${apartment.totalFloors}` 
                      : 'Не указано'
                  } 
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <ChildCareIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Возраст детей от" 
                  secondary={apartment.kidsAge ? `${apartment.kidsAge} лет` : 'Не ограничено'} 
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Возрастное ограничение" 
                  secondary={apartment.ageLimit ? `от ${apartment.ageLimit} лет` : 'Не ограничено'} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Условия аренды
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <TimeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Время заезда/выезда" 
                  secondary={
                    apartment.checkIn || apartment.checkOut 
                      ? `${formatTime(apartment.checkIn)} / ${formatTime(apartment.checkOut)}` 
                      : 'Не указано'
                  } 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <TimeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Круглосуточное заселение" 
                  secondary={getBooleanValue(apartment.fullDayCheckIn)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <SmokingIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Курение" 
                  secondary={getBooleanValue(apartment.smoking)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PetsIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Животные" 
                  secondary={getBooleanValue(apartment.pets)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <DocsIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Отчетные документы" 
                  secondary={getBooleanValue(apartment.reportDocs)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Минимальный срок аренды" 
                  secondary={apartment.minRent ? `${apartment.minRent} дней` : 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Залог" 
                  secondary={apartment.deposit ? `${apartment.deposit} грн` : 'Не требуется'} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Удобства
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {apartment.conveniences?.length > 0 ? (
                apartment.conveniences.map((item, index) => (
                  <Chip 
                    key={index} 
                    label={item} 
                    variant="outlined"
                    avatar={
                      <Avatar>
                        {getFacilityIcon(item)}
                      </Avatar>
                    }
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Удобства не указаны
                </Typography>
              )}
            </Box>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Контактная информация
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Имя" 
                  secondary={apartment.ownerName || 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PhoneIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Телефоны" 
                  secondary={
                    apartment.phone ? (
                      <Box 
                        component="a"
                        href={`tel:${apartment.phone.replace(/\D/g, '')}`}
                        onClick={(e) => {
                          e.preventDefault();
                          handlePhoneClick(apartment.phone);
                        }}
                        sx={{
                          color: 'primary.main',
                          textDecoration: 'none',
                          '&:hover': { textDecoration: 'underline' },
                          cursor: 'pointer',
                        }}
                      >
                        {apartment.phone}
                      </Box>
                    ) : 'Не указаны'
                  } 
                />
              </ListItem>
            </List>
          </Grid>
        </Grid>
      </Paper>

      {apartment.latitude && apartment.longitude && (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Местоположение
          </Typography>
          
          <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{
                  lat: parseFloat(apartment.latitude),
                  lng: parseFloat(apartment.longitude),
                }}
                zoom={15}
              >
                <Marker
                  position={{
                    lat: parseFloat(apartment.latitude),
                    lng: parseFloat(apartment.longitude),
                  }}
                />
              </GoogleMap>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            )}
          </Box>

          {userLocation && (
            <Box textAlign="center">
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<DirectionsIcon />}
                component="a"
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                Проложить маршрут
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 16,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.5)',
  color: '#fff',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
  zIndex: 10,
});

export default ApartmentDetailPage;




