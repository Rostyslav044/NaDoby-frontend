// // Этот компонент (ApartmentDetailPage) 
// // отображает детальную 1 страницу объявления об аренде

// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import CelebrationIcon from '@mui/icons-material/Celebration'; 
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
//   Chip,
//   Divider,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Stack,
//   useMediaQuery,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import {
//   Home as HomeIcon,
//   Hotel as HotelIcon,
//   Bathtub as BathtubIcon,
//   KingBed as KingBedIcon,
//   Apartment as ApartmentIcon,
//   DirectionsCar as DirectionsCarIcon,
//   Wifi as WifiIcon,
//   Tv as TvIcon,
//   AcUnit as AcUnitIcon,
//   LocalLaundryService as LaundryIcon,
//   Person as PersonIcon,
//   ChildCare as ChildCareIcon,
//   SmokingRooms as SmokingIcon,
//   Pets as PetsIcon,
//   Description as DocsIcon,
//   AccessTime as TimeIcon,
//   Train as MetroIcon,
//   LocationOn as DistrictIcon,
//   Phone as PhoneIcon,
//   Directions as DirectionsIcon,
//   LocationOn as LocationIcon,
// } from '@mui/icons-material';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import { useSwipeable } from 'react-swipeable';
// import Header from '@/app/components/Header';
// import { LanguageProvider } from '@/app/LanguageContext';
// import { Provider } from 'react-redux';
// import { store } from '@/app/store';
// import FileUploadSlider from '@/app/components/FileUploadSlider';
// const ApartmentDetailPage = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const isMobile = useMediaQuery('(max-width:600px)');

//   const handleOpenRoute = () => {
//     if (apartment.latitude && apartment.longitude) {
//       if (userLocation) {
//         window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`);
//       } else {
//         window.open(`https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`);
//       }
//     }
//   };
//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          
//           const data = await response.json();
//           setApartment(data);
//         } catch (error) {
//           console.error('Ошибка загрузки квартиры:', error);
//         }
//       };
//       fetchApartment();
//     }
//   }, [id]);

//   useEffect(() => {
//     if (navigator.geolocation && apartment?.latitude) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Ошибка геолокации:', error);
//         }
//       );
//     }
//   }, [apartment]);

//   const handlePrev = () => {
//     setCurrentIndex(prev => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex(prev => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
//   };

//   const toggleFavorite = () => setIsFavorite(!isFavorite);

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: apartment.name || 'Аренда квартиры',
//         text: `Посмотрите это объявление: ${apartment.name}`,
//         url: window.location.href,
//       }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Ссылка скопирована');
//     }
//   };

//   const handlePhoneClick = (phone) => {
//     window.open(`tel:${phone.replace(/\D/g, '')}`);
//   };

//   const getCategoryIcon = () => {
//     switch(apartment?.category) {
//       case 'Квартира': return <HomeIcon />;
//       case 'Гостиница': return <HotelIcon />;
//       case 'Хостел': return <KingBedIcon />;
//       case 'Дом': return <HomeIcon />;
//       case 'База отдыха': return <HomeIcon />;
//       case 'Сауна/Баня': return <BathtubIcon />;
//       default: return <ApartmentIcon />;
//     }
//   };

//   const getPriceSuffix = () => {
//     return apartment?.category === 'Сауна/Баня' ? 'година' : 'доба';
//   };

//   const formatTime = (time) => {
//     if (!time) return '';
//     const [hours, minutes] = time.split(':');
//     return `${hours}:${minutes}`;
//   };

//   const getBooleanValue = (value) => {
//     return value === 'yes' ? 'Да' : value === 'no' ? 'Нет' : 'Не указано';
//   };

//   const getFacilityIcon = (facility) => {
//     switch(facility) {
//       case 'WiFi': return <WifiIcon />;
//       case 'Парковка': return <DirectionsCarIcon />;
//       case 'Кондиціонер': return <AcUnitIcon />;
//       case 'Телевізор': return <TvIcon />;
//       case 'Пральна машина': return <LaundryIcon />;
//       default: return <HomeIcon />;
//     }
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box maxWidth="1200px" mx="auto" marginTop={5}
//     // mt={isMobile ? 2 : 4} p={isMobile ? 1 : 3}
//     >

// <Provider store={store}>
//         <LanguageProvider>
//            <Header />
       
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Button variant="outlined" onClick={() => router.back()} size="small">
//           Назад
//         </Button>
//         {/* <Chip 
//           label={apartment.category} 
//           color="primary" 
//           size="medium" 
//           icon={getCategoryIcon()}
//         /> */}

// <Chip 
//   label={apartment.category} 
//   color="primary" 
//   icon={getCategoryIcon()}
//   sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
// />

//         <Box>
//           <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
//             <FavoriteBorderIcon />
//           </IconButton>
//           <IconButton onClick={handleShare}>
//             <ShareIcon />
//           </IconButton>
//         </Box>
//       </Box>


//    {/* Блок с названием и ценой */}
//    <Box mb={2}>
//   <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//     {apartment.objectName || apartment.name || 'Без названия'}
//   </Typography>
// </Box>


//       {/* Блок с адресом */}
//       <Box 
//         sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 1,
//           mb: 3,
//           cursor: 'pointer',
//           '&:hover': {
//             textDecoration: 'underline',
//             color: 'primary.main'
//           }
//         }}
//         onClick={handleOpenRoute}
//       >
//         <LocationIcon color="primary" />
//         <Typography variant="body1">
//           {[
//             apartment.city,
//             apartment.street && `${apartment.street} ${apartment.houseNumber}`,
//             apartment.district && `район ${apartment.district}`,
//             apartment.metro && `метро ${apartment.metro}`
//           ].filter(Boolean).join(', ')}
//         </Typography>
//       </Box>

//       {/* Галерея изображений */}
      
// {/* <FileUploadSlider
//  photos={apartment.photos || []} 
//  onDelete={apartment.isOwner ? handleDeletePhoto : null} 
// /> */}


// <FileUploadSlider 
//   photos={apartment.photos} 

//   price={apartment.price}
//   name={apartment.name}
//   phones={apartment.phones}
//   category={apartment.category} 
// />
//   </LanguageProvider>
//          </Provider>

//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
    


      

//         <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//           Описание
//         </Typography>
//         <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
//           {apartment.description || 'Описание отсутствует'}
//         </Typography>
        
//         <Divider sx={{ my: 3 }} />

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Основные характеристики
//             </Typography>
            
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Комнат" 
//                   secondary={apartment.rooms || 'Не указано'} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <PersonIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Кількість гостей" 
//                   secondary={apartment.beds || 'Не указано'} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Площадь" 
//                   secondary={apartment.size ? `${apartment.size} м²` : 'Не указано'} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Этаж" 
//                   secondary={
//                     apartment.floor 
//                       ? `${apartment.floor} из ${apartment.totalFloors}` 
//                       : 'Не указано'
//                   } 
//                 />
//               </ListItem>

//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <ChildCareIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Возраст детей от" 
//                   secondary={apartment.kidsAge ? `${apartment.kidsAge} лет` : 'Не ограничено'} 
//                 />
//               </ListItem>

//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <PersonIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Возрастное ограничение" 
//                   secondary={apartment.ageLimit ? `от ${apartment.ageLimit} лет` : 'Не ограничено'} 
//                 />
//               </ListItem>

//               <ListItem>
//   <ListItemAvatar>
//     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//       <CelebrationIcon fontSize="small" />
//     </Avatar>
//   </ListItemAvatar>
//   <ListItemText 
//     primary="Святкування" 
//     secondary={getBooleanValue(apartment.parties)} 
//   />
// </ListItem>
//             </List>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               Условия аренды
//             </Typography>
            
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <TimeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Время заезда/выезда" 
//                   secondary={
//                     apartment.checkIn || apartment.checkOut 
//                       ? `${formatTime(apartment.checkIn)} / ${formatTime(apartment.checkOut)}` 
//                       : 'Не указано'
//                   } 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <TimeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Круглосуточное заселение" 
//                   secondary={getBooleanValue(apartment.fullDayCheckIn)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <SmokingIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Курение" 
//                   secondary={getBooleanValue(apartment.smoking)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <PetsIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Животные" 
//                   secondary={getBooleanValue(apartment.pets)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <DocsIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Отчетные документы" 
//                   secondary={getBooleanValue(apartment.reportDocs)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Минимальный срок аренды" 
//                   secondary={apartment.minRent ? `${apartment.minRent} дней` : 'Не указано'} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary="Залог" 
//                   secondary={apartment.deposit ? `${apartment.deposit} грн` : 'Не требуется'} 
//                 />
//               </ListItem>
//             </List>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               Удобства
//             </Typography>
            
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {apartment.conveniences?.length > 0 ? (
//                 apartment.conveniences.map((item, index) => (
//                   <Chip 
//                     key={index} 
//                     label={item} 
//                     variant="outlined"
//                     avatar={
//                       <Avatar>
//                         {getFacilityIcon(item)}
//                       </Avatar>
//                     }
//                   />
//                 ))
//               ) : (
//                 <Typography variant="body2" color="text.secondary">
//                   Удобства не указаны
//                 </Typography>
//               )}
//             </Box>
//           </Grid>

     
//         </Grid>
//       </Paper>

//       {apartment.latitude && apartment.longitude && (
//         <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             Местоположение
//           </Typography>
          
//           <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
//             {isLoaded ? (
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={{
//                   lat: parseFloat(apartment.latitude),
//                   lng: parseFloat(apartment.longitude),
//                 }}
//                 zoom={15}
//               >
//                 <Marker
//                   position={{
//                     lat: parseFloat(apartment.latitude),
//                     lng: parseFloat(apartment.longitude),
//                   }}
//                 />
//               </GoogleMap>
//             ) : (
//               <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                 <CircularProgress />
//               </Box>
//             )}
//           </Box>

//           {userLocation && (
//             <Box textAlign="center">
//               <Button 
//                 variant="contained" 
//                 color="primary"
//                 startIcon={<DirectionsIcon />}
//                 component="a"
//                 href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`}
//                 target="_blank"
//                 rel="noopener noreferrer"
//                 fullWidth
//               >
//                 Проложить маршрут
//               </Button>
//             </Box>
//           )}
//         </Paper>
//       )}
//     </Box>
//   );
// };

// const arrowStyle = (side) => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: 16,
//   transform: 'translateY(-50%)',
//   bgcolor: 'rgba(0,0,0,0.5)',
//   color: '#fff',
//   '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
//   zIndex: 10,
// });

// export default ApartmentDetailPage;




// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import CelebrationIcon from '@mui/icons-material/Celebration';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
//   Chip,
//   Divider,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   useMediaQuery,
// } from '@mui/material';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import {
//   Home as HomeIcon,
//   Hotel as HotelIcon,
//   Bathtub as BathtubIcon,
//   KingBed as KingBedIcon,
//   Apartment as ApartmentIcon,
//   DirectionsCar as DirectionsCarIcon,
//   Wifi as WifiIcon,
//   Tv as TvIcon,
//   AcUnit as AcUnitIcon,
//   LocalLaundryService as LaundryIcon,
//   Person as PersonIcon,
//   ChildCare as ChildCareIcon,
//   SmokingRooms as SmokingIcon,
//   Pets as PetsIcon,
//   Description as DocsIcon,
//   AccessTime as TimeIcon,
//   Directions as DirectionsIcon,
//   LocationOn as LocationIcon,
// } from '@mui/icons-material';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import { useSwipeable } from 'react-swipeable';
// import Header from '@/app/components/Header';
// import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
// import { Provider } from 'react-redux';
// import { store } from '@/app/store';
// import FileUploadSlider from '@/app/components/FileUploadSlider';

// const translations = {
//   ua: {
//     backButton: "Назад",
//     description: "Опис",
//     characteristics: "Основні характеристики",
//     rentalConditions: "Умови оренди",
//     amenities: "Зручності",
//     location: "Розташування",
//     buildRoute: "Побудувати маршрут",
//     rooms: "Кімнат",
//     guests: "Кількість гостей",
//     area: "Площа",
//     floor: "Поверх",
//     kidsAge: "Вік дітей від",
//     ageLimit: "Вікове обмеження",
//     parties: "Святкування",
//     checkInOut: "Час заїзду/виїзду",
//     fullDayCheckIn: "Цілодобове заселення",
//     smoking: "Куріння",
//     pets: "Тварини",
//     reportDocs: "Звітні документи",
//     minRent: "Мінімальний термін оренди",
//     deposit: "Залог",
//     notSpecified: "Не вказано",
//     noDescription: "Опис відсутній",
//     noAmenities: "Зручності не вказані",
//     required: "Потрібно",
//     notRequired: "Не потрібно",
//     yes: "Так",
//     no: "Ні",
//     hour: "година",
//     day: "доба",
//     days: "днів",
//     m2: "м²",
//     fromAge: "від",
//     years: "років",
//     noRestrictions: "Не обмежено",
//     copyLink: "Посилання скопійовано",
//     shareTitle: "Оренда квартири",
//     shareText: "Подивіться це оголошення:",
//     call: "Зателефонувати",
//     categories: {
//       'Квартира': 'Квартира',
//       'Гостиница': 'Готель',
//       'Хостел': 'Хостел',
//       'Дом': 'Будинок',
//       'База отдыха': 'База відпочинку',
//       'Сауна/Баня': 'Сауна/Лазня'
//     },
//     conveniences: {
//       'WiFi': 'Wi-Fi',
//       'Парковка': 'Парковка',
//       'Кондиционер': 'Кондиціонер',
//       'Телевизор': 'Телевізор',
//       'Прачечная': 'Пральна машина',
//       'Кухня': 'Кухня',
//       'Балкон': 'Балкон'
//     }
//   },
//   ru: {
//     backButton: "Назад",
//     description: "Описание",
//     characteristics: "Основные характеристики",
//     rentalConditions: "Условия аренды",
//     amenities: "Удобства",
//     location: "Расположение",
//     buildRoute: "Проложить маршрут",
//     rooms: "Комнат",
//     guests: "Количество гостей",
//     area: "Площадь",
//     floor: "Этаж",
//     kidsAge: "Возраст детей от",
//     ageLimit: "Возрастное ограничение",
//     parties: "Празднование",
//     checkInOut: "Время заезда/выезда",
//     fullDayCheckIn: "Круглосуточное заселение",
//     smoking: "Курение",
//     pets: "Животные",
//     reportDocs: "Отчетные документы",
//     minRent: "Минимальный срок аренды",
//     deposit: "Залог",
//     notSpecified: "Не указано",
//     noDescription: "Описание отсутствует",
//     noAmenities: "Удобства не указаны",
//     required: "Требуется",
//     notRequired: "Не требуется",
//     yes: "Да",
//     no: "Нет",
//     hour: "час",
//     day: "сутки",
//     days: "дней",
//     m2: "м²",
//     fromAge: "от",
//     years: "лет",
//     noRestrictions: "Не ограничено",
//     copyLink: "Ссылка скопирована",
//     shareTitle: "Аренда квартиры",
//     shareText: "Посмотрите это объявление:",
//     call: "Позвонить",
//     categories: {
//       'Квартира': 'Квартира',
//       'Гостиница': 'Гостиница',
//       'Хостел': 'Хостел',
//       'Дом': 'Дом',
//       'База отдыха': 'База отдыха',
//       'Сауна/Баня': 'Сауна/Баня'
//     },
//     conveniences: {
//       'WiFi': 'Wi-Fi',
//       'Парковка': 'Парковка',
//       'Кондиционер': 'Кондиционер',
//       'Телевизор': 'Телевизор',
//       'Прачечная': 'Стиральная машина',
//       'Кухня': 'Кухня',
//       'Балкон': 'Балкон'
//     }
//   }
// };

// const ApartmentDetailContent = () => {
//   const router = useRouter();
//   const { id } = router.query;
//   const [apartment, setApartment] = useState(null);
//   const [isFavorite, setIsFavorite] = useState(false);
//   const [userLocation, setUserLocation] = useState(null);
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   // Функция для перевода категории с учетом возможных вариантов написания
//   const translateCategory = (category) => {
//     if (!category) return '';
    
//     // Проверяем прямое соответствие
//     if (t.categories[category]) {
//       return t.categories[category];
//     }
    
//     // Ищем похожие варианты (для случая, если категория приходит в другом регистре или с опечаткой)
//     const lowerCategory = category.toLowerCase();
//     for (const [key, value] of Object.entries(t.categories)) {
//       if (key.toLowerCase() === lowerCategory) {
//         return value;
//       }
//     }
    
//     return category; // Возвращаем как есть, если перевод не найден
//   };

//   // Функция для перевода удобств с учетом возможных вариантов написания
//   const translateConvenience = (convenience) => {
//     if (!convenience) return '';
    
//     // Проверяем прямое соответствие
//     if (t.conveniences[convenience]) {
//       return t.conveniences[convenience];
//     }
    
//     // Ищем похожие варианты
//     const lowerConvenience = convenience.toLowerCase();
//     for (const [key, value] of Object.entries(t.conveniences)) {
//       if (key.toLowerCase() === lowerConvenience) {
//         return value;
//       }
//     }
    
//     return convenience; // Возвращаем как есть, если перевод не найден
//   };

//   const handleOpenRoute = () => {
//     if (apartment?.latitude && apartment?.longitude) {
//       if (userLocation) {
//         window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`);
//       } else {
//         window.open(`https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`);
//       }
//     }
//   };

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           const data = await response.json();
//           setApartment(data);
//         } catch (error) {
//           console.error('Error loading apartment:', error);
//         }
//       };
//       fetchApartment();
//     }
//   }, [id]);

//   useEffect(() => {
//     if (navigator.geolocation && apartment?.latitude) {
//       navigator.geolocation.getCurrentPosition(
//         (position) => {
//           setUserLocation({
//             lat: position.coords.latitude,
//             lng: position.coords.longitude,
//           });
//         },
//         (error) => {
//           console.error('Geolocation error:', error);
//         }
//       );
//     }
//   }, [apartment]);

//   const toggleFavorite = () => setIsFavorite(!isFavorite);

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: apartment.name || t.shareTitle,
//         text: `${t.shareText} ${apartment.name}`,
//         url: window.location.href,
//       }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert(t.copyLink);
//     }
//   };

//   const getCategoryIcon = () => {
//     if (!apartment?.category) return <ApartmentIcon />;
    
//     const category = apartment.category.toLowerCase();
//     if (category.includes('квартира')) return <HomeIcon />;
//     if (category.includes('гостиница') || category.includes('отель')) return <HotelIcon />;
//     if (category.includes('хостел')) return <KingBedIcon />;
//     if (category.includes('дом')) return <HomeIcon />;
//     if (category.includes('база отдыха')) return <HomeIcon />;
//     if (category.includes('сауна') || category.includes('баня')) return <BathtubIcon />;
//     return <ApartmentIcon />;
//   };

//   const getFacilityIcon = (facility) => {
//     if (!facility) return <HomeIcon />;
    
//     const lowerFacility = facility.toLowerCase();
//     if (lowerFacility.includes('wifi')) return <WifiIcon />;
//     if (lowerFacility.includes('парковк')) return <DirectionsCarIcon />;
//     if (lowerFacility.includes('кондиционер')) return <AcUnitIcon />;
//     if (lowerFacility.includes('телевизор')) return <TvIcon />;
//     if (lowerFacility.includes('прач') || lowerFacility.includes('стиральн')) return <LaundryIcon />;
//     return <HomeIcon />;
//   };

//   const getBooleanValue = (value) => {
//     return value === 'yes' ? t.yes : value === 'no' ? t.no : t.notSpecified;
//   };

//   const formatTime = (time) => {
//     if (!time) return '';
//     const [hours, minutes] = time.split(':');
//     return `${hours}:${minutes}`;
//   };

//   const formatAddress = () => {
//     if (!apartment) return '';
    
//     const parts = [];
//     if (apartment.city) parts.push(apartment.city);
//     if (apartment.street && apartment.houseNumber) {
//       parts.push(`${apartment.street} ${apartment.houseNumber}`);
//     }
//     if (apartment.district) parts.push(`${t.district} ${apartment.district}`);
//     if (apartment.metro) parts.push(`${t.metro} ${apartment.metro}`);
//     return parts.join(', ');
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box maxWidth="1200px" mx="auto" marginTop={5}>
//       <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
//         <Button variant="outlined" onClick={() => router.back()} size="small">
//           {t.backButton}
//         </Button>
        
//         <Chip 
//           label={translateCategory(apartment.category)} 
//           color="primary" 
//           icon={getCategoryIcon()}
//           sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
//         />

//         <Box>
//           <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
//             <FavoriteBorderIcon />
//           </IconButton>
//           <IconButton onClick={handleShare}>
//             <ShareIcon />
//           </IconButton>
//         </Box>
//       </Box>

//       <Box mb={2}>
//         <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
//           {apartment.objectName || apartment.name || t.noName}
//         </Typography>
//       </Box>

//       <Box 
//         sx={{ 
//           display: 'flex', 
//           alignItems: 'center', 
//           gap: 1,
//           mb: 3,
//           cursor: 'pointer',
//           '&:hover': {
//             textDecoration: 'underline',
//             color: 'primary.main'
//           }
//         }}
//         onClick={handleOpenRoute}
//       >
//         <LocationIcon color="primary" />
//         <Typography variant="body1">
//           {formatAddress()}
//         </Typography>
//       </Box>

//       <FileUploadSlider 
//         photos={apartment.photos} 
//         price={apartment.price}
//         name={apartment.name}
//         phones={apartment.phones}
//         category={translateCategory(apartment.category)} 
//       />

//       <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
//         <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//           {t.description}
//         </Typography>
//         <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
//           {apartment.description || t.noDescription}
//         </Typography>
        
//         <Divider sx={{ my: 3 }} />

//         <Grid container spacing={3}>
//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               {t.characteristics}
//             </Typography>
            
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.rooms} 
//                   secondary={apartment.rooms || t.notSpecified} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <PersonIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.guests} 
//                   secondary={apartment.beds || t.notSpecified} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.area} 
//                   secondary={apartment.size ? `${apartment.size} ${t.m2}` : t.notSpecified} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.floor} 
//                   secondary={
//                     apartment.floor 
//                       ? `${apartment.floor} ${currentLanguage === 'ua' ? 'з' : 'из'} ${apartment.totalFloors}` 
//                       : t.notSpecified
//                   } 
//                 />
//               </ListItem>

//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <ChildCareIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.kidsAge} 
//                   secondary={apartment.kidsAge ? `${apartment.kidsAge} ${t.years}` : t.noRestrictions} 
//                 />
//               </ListItem>

//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <PersonIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.ageLimit} 
//                   secondary={apartment.ageLimit ? `${t.fromAge} ${apartment.ageLimit} ${t.years}` : t.noRestrictions} 
//                 />
//               </ListItem>

//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <CelebrationIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.parties} 
//                   secondary={getBooleanValue(apartment.parties)} 
//                 />
//               </ListItem>
//             </List>
//           </Grid>

//           <Grid item xs={12} md={6}>
//             <Typography variant="h6" gutterBottom>
//               {t.rentalConditions}
//             </Typography>
            
//             <List dense>
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <TimeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.checkInOut} 
//                   secondary={
//                     apartment.checkIn || apartment.checkOut 
//                       ? `${formatTime(apartment.checkIn)} / ${formatTime(apartment.checkOut)}` 
//                       : t.notSpecified
//                   } 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <TimeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.fullDayCheckIn} 
//                   secondary={getBooleanValue(apartment.fullDayCheckIn)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <SmokingIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.smoking} 
//                   secondary={getBooleanValue(apartment.smoking)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <PetsIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.pets} 
//                   secondary={getBooleanValue(apartment.pets)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <DocsIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.reportDocs} 
//                   secondary={getBooleanValue(apartment.reportDocs)} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.minRent} 
//                   secondary={apartment.minRent ? `${apartment.minRent} ${t.days}` : t.notSpecified} 
//                 />
//               </ListItem>
              
//               <ListItem>
//                 <ListItemAvatar>
//                   <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                     <HomeIcon fontSize="small" />
//                   </Avatar>
//                 </ListItemAvatar>
//                 <ListItemText 
//                   primary={t.deposit} 
//                   secondary={apartment.deposit ? `${apartment.deposit} грн` : t.notRequired} 
//                 />
//               </ListItem>
//             </List>
//           </Grid>

//           <Grid item xs={12}>
//             <Typography variant="h6" gutterBottom>
//               {t.amenities}
//             </Typography>
            
//             <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//               {apartment.conveniences?.length > 0 ? (
//                 apartment.conveniences.map((item, index) => (
//                   <Chip 
//                     key={index} 
//                     label={translateConvenience(item)} 
//                     variant="outlined"
//                     avatar={
//                       <Avatar>
//                         {getFacilityIcon(item)}
//                       </Avatar>
//                     }
//                   />
//                 ))
//               ) : (
//                 <Typography variant="body2" color="text.secondary">
//                   {t.noAmenities}
//                 </Typography>
//               )}
//             </Box>
//           </Grid>
//         </Grid>
//       </Paper>

//       {apartment.latitude && apartment.longitude && (
//         <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
//           <Typography variant="h6" gutterBottom>
//             {t.location}
//           </Typography>
          
//           <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
//             {isLoaded ? (
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={{
//                   lat: parseFloat(apartment.latitude),
//                   lng: parseFloat(apartment.longitude),
//                 }}
//                 zoom={15}
//               >
//                 <Marker
//                   position={{
//                     lat: parseFloat(apartment.latitude),
//                     lng: parseFloat(apartment.longitude),
//                   }}
//                 />
//               </GoogleMap>
//             ) : (
//               <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                 <CircularProgress />
//               </Box>
//             )}
//           </Box>

//           {userLocation && (
//             <Box textAlign="center">
//               <Button 
//                 variant="contained" 
//                 color="primary"
//                 startIcon={<DirectionsIcon />}
//                 onClick={handleOpenRoute}
//                 fullWidth
//               >
//                 {t.buildRoute}
//               </Button>
//             </Box>
//           )}
//         </Paper>
//       )}
//     </Box>
//   );
// };

// export default function ApartmentDetailPage() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header />
//         <ApartmentDetailContent />
//       </LanguageProvider>
//     </Provider>
//   );
// }








'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CelebrationIcon from '@mui/icons-material/Celebration';
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
  useMediaQuery,
} from '@mui/material';
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
  Directions as DirectionsIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSwipeable } from 'react-swipeable';
import Header from '@/app/components/Header';
import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import FileUploadSlider from '@/app/components/FileUploadSlider';
import Footer from '@/app/components/Footer';

const translations = {
  ua: {
    district: "район",
    metro: "метро",
    backButton: "Назад",
    description: "Опис",
    characteristics: "Основні характеристики",
    rentalConditions: "Умови оренди",
    amenities: "Зручності",
    location: "Розташування",
    buildRoute: "Побудувати маршрут",
    rooms: "Кімнат",
    guests: "Кількість гостей",
    area: "Площа",
    floor: "Поверх",
    kidsAge: "Вік дітей від",
    ageLimit: "Вікове обмеження",
    parties: "Святкування",
    checkInOut: "Час заїзду/виїзду",
    fullDayCheckIn: "Цілодобове заселення",
    smoking: "Куріння",
    pets: "Тварини",
    reportDocs: "Звітні документи",
    minRent: "Мінімальний термін оренди",
    deposit: "Залог",
    notSpecified: "Не вказано",
    noDescription: "Опис відсутній",
    noAmenities: "Зручності не вказані",
    required: "Потрібно",
    notRequired: "Не потрібно",
    yes: "Так",
    no: "Ні",
    hour: "година",
    day: "доба",
    days: "днів",
    m2: "м²",
    fromAge: "від",
    years: "років",
    noRestrictions: "Не обмежено",
    copyLink: "Посилання скопійовано",
    shareTitle: "Оренда квартири",
    shareText: "Подивіться це оголошення:",
    call: "Зателефонувати",
    categories: {
      'Квартира': 'Квартира',
      'Гостиница': 'Готель',
      'Хостел': 'Хостел',
      'Дом': 'Будинок',
      'База отдыха': 'База відпочинку',
      'Сауна/Баня': 'Сауна/Лазня',
      'Готель для тварин': 'Готель для тварин',
      'Глемпінг': 'Глемпінг',
      'Пансіонат': 'Пансіонат',
      'Котедж для компній': 'Котедж для компаній',
      'Коворкінг': 'Коворкінг',
      'Автокемпінг': 'Автокемпінг'
    },
    conveniences: {
      'WiFi': 'Wi-Fi',
      'Парковка': 'Парковка',
      'Кондиционер': 'Кондиціонер',
      'Телевизор': 'Телевізор',
      'Прачечная': 'Пральна машина',
      'Кухня': 'Кухня',
      'Балкон': 'Балкон',
      'Лифт': 'Ліфт',
      'Барбекю-зона': 'Барбекю-зона',
      'Басейн': 'Басейн',
      'Ігрова кімната': 'Ігрова кімната',
      'Блендер': 'Блендер',
      'Бойлер': 'Бойлер',
      'Ванна': 'Ванна',
      'Вентилятор': 'Вентилятор',
      'Генератор': 'Генератор',
      'Громадська кухня': 'Громадська кухня',
      'Джакузі': 'Джакузі',
      'Дитяче ліжечко': 'Дитяче ліжечко',
      'Дитячий стілець для годування': 'Дитячий стілець для годування',
      'Домашній кінотеатр': 'Домашній кінотеатр',
      'Духова піч': 'Духова піч',
      'Душова кабіна': 'Душова кабіна',
      'Електрочайник': 'Електрочайник',
      'Електроплита': 'Електроплита',
      'Зарядка для електромобілів': 'Зарядка для електромобілів',
      'Змінна постільна білизна': 'Змінна постільна білизна',
      'Інтернет': 'Інтернет',
      'Кавоварка': 'Кавоварка',
      'Камін': 'Камін',
      'Кабельне телебачення': 'Кабельне телебачення',
      'Ліжко': 'Ліжко',
      'Лазня': 'Лазня',
      'Мангал': 'Мангал',
      'Мікрохвильова піч': 'Мікрохвильова піч',
      'Охорона': 'Охорона',
      'Персональний комп\'ютер': 'Персональний комп\'ютер',
      'Пляжне обладнання': 'Пляжне обладнання',
      'Посуд та приладдя': 'Посуд та приладдя',
      'Посудомийна машина': 'Посудомийна машина',
      'Пральний порошок': 'Пральний порошок',
      'Праска': 'Праска',
      'Рушники': 'Рушники',
      'Сейф': 'Сейф',
      'Спортзал / Фітнес-кімната': 'Спортзал / Фітнес-кімната',
      'Спортивний інвентар': 'Спортивний інвентар',
      'Столові прибори': 'Столові прибори',
      'Сушилка для білизни': 'Сушилка для білизни',
      'Супутникове ТБ': 'Супутникове ТБ',
      'Тапочки': 'Тапочки',
      'Тераса': 'Тераса',
      'Тостер': 'Тостер',
      'Туалетне приладдя (шампуні, мило)': 'Туалетне приладдя (шампуні, мило)',
      'Фен': 'Фен',
      'Холодильник': 'Холодильник',
      'Догляд за тваринами': 'Догляд за тваринами',
      'Кафе': 'Кафе',
      'Конференц-зал': 'Конференц-зал',
      'Кімната для переговорів': 'Кімната для переговорів',
      'Лікувальні процедури': 'Лікувальні процедури',
      'Організація подій': 'Організація подій',
      'Трансфер': 'Трансфер',
      'Харчування': 'Харчування',
      'Прокат обладнання (велосипедів, човнів, інше)': 'Прокат обладнання (велосипедів, човнів, інше)'
    }
  },
  ru: {
    district: "район",
    metro: "метро",

    backButton: "Назад",
    description: "Описание",
    characteristics: "Основные характеристики",
    rentalConditions: "Условия аренды",
    amenities: "Удобства",
    location: "Расположение",
    buildRoute: "Проложить маршрут",
    rooms: "Комнат",
    guests: "Количество гостей",
    area: "Площадь",
    floor: "Этаж",
    kidsAge: "Возраст детей от",
    ageLimit: "Возрастное ограничение",
    parties: "Празднование",
    checkInOut: "Время заезда/выезда",
    fullDayCheckIn: "Круглосуточное заселение",
    smoking: "Курение",
    pets: "Животные",
    reportDocs: "Отчетные документы",
    minRent: "Минимальный срок аренды",
    deposit: "Залог",
    notSpecified: "Не указано",
    noDescription: "Описание отсутствует",
    noAmenities: "Удобства не указаны",
    required: "Требуется",
    notRequired: "Не требуется",
    yes: "Да",
    no: "Нет",
    hour: "час",
    day: "сутки",
    days: "дней",
    m2: "м²",
    fromAge: "от",
    years: "лет",
    noRestrictions: "Не ограничено",
    copyLink: "Ссылка скопирована",
    shareTitle: "Аренда квартиры",
    shareText: "Посмотрите это объявление:",
    call: "Позвонить",
    categories: {
      'Квартира': 'Квартира',
      'Гостиница': 'Гостиница',
      'Хостел': 'Хостел',
      'Дом': 'Дом',
      'База отдыха': 'База отдыха',
      'Сауна/Баня': 'Сауна/Баня',
      'Готель для тварин': 'Отель для животных',
      'Глемпінг': 'Глэмпинг',
      'Пансіонат': 'Пансионат',
      'Котедж для компній': 'Коттедж для компаний',
      'Коворкінг': 'Коворкинг',
      'Автокемпінг': 'Автокемпинг'
    },
    conveniences: {
      'WiFi': 'Wi-Fi',
      'Парковка': 'Парковка',
      'Кондиционер': 'Кондиционер',
      'Телевизор': 'Телевизор',
      'Прачечная': 'Стиральная машина',
      'Кухня': 'Кухня',
      'Балкон': 'Балкон',
      'Лифт': 'Лифт',
      'Барбекю-зона': 'Зона барбекю',
      'Басейн': 'Бассейн',
      'Ігрова кімната': 'Игровая комната',
      'Блендер': 'Блендер',
      'Бойлер': 'Бойлер',
      'Ванна': 'Ванна',
      'Вентилятор': 'Вентилятор',
      'Генератор': 'Генератор',
      'Громадська кухня': 'Общая кухня',
      'Джакузі': 'Джакузи',
      'Дитяче ліжечко': 'Детская кроватка',
      'Дитячий стілець для годування': 'Детский стульчик для кормления',
      'Домашній кінотеатр': 'Домашний кинотеатр',
      'Духова піч': 'Духовка',
      'Душова кабіна': 'Душевая кабина',
      'Електрочайник': 'Электрочайник',
      'Електроплита': 'Электроплита',
      'Зарядка для електромобілів': 'Зарядка для электромобилей',
      'Змінна постільна білизна': 'Смена постельного белья',
      'Інтернет': 'Интернет',
      'Кавоварка': 'Кофеварка',
      'Камін': 'Камин',
      'Кабельне телебачення': 'Кабельное телевидение',
      'Ліжко': 'Кровать',
      'Лазня': 'Баня',
      'Мангал': 'Мангал',
      'Мікрохвильова піч': 'Микроволновая печь',
      'Охорона': 'Охрана',
      'Персональний комп\'ютер': 'Персональный компьютер',
      'Пляжне обладнання': 'Пляжное оборудование',
      'Посуд та приладдя': 'Посуда и приборы',
      'Посудомийна машина': 'Посудомоечная машина',
      'Пральний порошок': 'Стиральный порошок',
      'Праска': 'Утюг',
      'Рушники': 'Полотенца',
      'Сейф': 'Сейф',
      'Спортзал / Фітнес-кімната': 'Спортзал / Фитнес-комната',
      'Спортивний інвентар': 'Спортивный инвентарь',
      'Столові прибори': 'Столовые приборы',
      'Сушилка для білизни': 'Сушилка для белья',
      'Супутникове ТБ': 'Спутниковое ТВ',
      'Тапочки': 'Тапочки',
      'Тераса': 'Терасса',
      'Тостер': 'Тостер',
      'Туалетне приладдя (шампуні, мило)': 'Туалетные принадлежности (шампунь, мыло)',
      'Фен': 'Фен',
      'Холодильник': 'Холодильник',
      'Догляд за тваринами': 'Уход за животными',
      'Кафе': 'Кафе',
      'Конференц-зал': 'Конференц-зал',
      'Кімната для переговорів': 'Комната для переговоров',
      'Лікувальні процедури': 'Лечебные процедуры',
      'Організація подій': 'Организация мероприятий',
      'Трансфер': 'Трансфер',
      'Харчування': 'Питание',
      'Прокат обладнання (велосипедів, човнів, інше)': 'Прокат оборудования (велосипедов, лодок и др.)'
    }
  }
};

const ApartmentDetailContent = () => {
  const router = useRouter();
  const { id } = router.query;
  const [apartment, setApartment] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const translateCategory = (category) => {
    if (!category) return '';
    
    // Сначала проверяем прямое соответствие в текущем языке
    if (t.categories && t.categories[category]) {
      return t.categories[category];
    }
    
    // Если текущий язык русский, ищем украинский вариант в русском словаре
    if (currentLanguage === 'ru') {
      // Ищем в украинских ключах соответствующий русский перевод
      for (const [uaKey, ruValue] of Object.entries(translations.ru.categories)) {
        if (uaKey === category) {
          return ruValue;
        }
      }
    }
    
    // Если ничего не нашли, возвращаем оригинал
    return category;
  };

  const translateConvenience = (convenience) => {
    if (!convenience) return '';
    
    // Сначала проверяем прямое соответствие в текущем языке
    if (t.conveniences && t.conveniences[convenience]) {
      return t.conveniences[convenience];
    }
    
    // Если текущий язык русский, ищем украинский вариант в русском словаре
    if (currentLanguage === 'ru') {
      // Ищем в украинских ключах соответствующий русский перевод
      for (const [uaKey, ruValue] of Object.entries(translations.ru.conveniences)) {
        if (uaKey === convenience) {
          return ruValue;
        }
      }
    }
    
    // Если ничего не нашли, возвращаем оригинал
    return convenience;
  };

  const handleOpenRoute = () => {
    if (apartment?.latitude && apartment?.longitude) {
      if (userLocation) {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`);
      } else {
        window.open(`https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`);
      }
    }
  };

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          const data = await response.json();
          setApartment(data);
        } catch (error) {
          console.error('Error loading apartment:', error);
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
          console.error('Geolocation error:', error);
        }
      );
    }
  }, [apartment]);

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.name || t.shareTitle,
        text: `${t.shareText} ${apartment.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert(t.copyLink);
    }
  };

  const getCategoryIcon = () => {
    if (!apartment?.category) return <ApartmentIcon />;
    
    const category = apartment.category.toLowerCase();
    if (category.includes('квартира')) return <HomeIcon />;
    if (category.includes('гостиница') || category.includes('отель')) return <HotelIcon />;
    if (category.includes('хостел')) return <KingBedIcon />;
    if (category.includes('дом')) return <HomeIcon />;
    if (category.includes('база отдыха')) return <HomeIcon />;
    if (category.includes('сауна') || category.includes('баня')) return <BathtubIcon />;
    return <ApartmentIcon />;
  };

  const getFacilityIcon = (facility) => {
    if (!facility) return <HomeIcon />;
    
    const lowerFacility = facility.toLowerCase();
    if (lowerFacility.includes('wifi')) return <WifiIcon />;
    if (lowerFacility.includes('парковк')) return <DirectionsCarIcon />;
    if (lowerFacility.includes('кондиционер')) return <AcUnitIcon />;
    if (lowerFacility.includes('телевизор')) return <TvIcon />;
    if (lowerFacility.includes('прач') || lowerFacility.includes('стиральн')) return <LaundryIcon />;
    return <HomeIcon />;
  };

  const getBooleanValue = (value) => {
    return value === 'yes' ? t.yes : value === 'no' ? t.no : t.notSpecified;
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  // const formatAddress = () => {
  //   if (!apartment) return '';
    
  //   const parts = [];
  //   if (apartment.city) parts.push(apartment.city);
  //   if (apartment.street && apartment.houseNumber) {
  //     parts.push(`${apartment.street} ${apartment.houseNumber}`);
  //   }
  //   if (apartment.district) parts.push(`${t.district} ${apartment.district}`);
  //   if (apartment.metro) parts.push(`${t.metro} ${apartment.metro}`);
  //   return parts.join(', ');
  // };



// В ApartmentDetailContent замените formatAddress на:
const formatAddress = () => {
  if (!apartment) return '';
  
  const parts = [];
  if (apartment.city) parts.push(apartment.city);
  if (apartment.street && apartment.houseNumber) {
    parts.push(`${apartment.street} ${apartment.houseNumber}`);
  }
  if (apartment.district) parts.push(`район ${apartment.district}`);
  if (apartment.metro) parts.push(`метро ${apartment.metro}`);
  return parts.join(', ');
};

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="1200px" mx="auto" marginTop={5}>
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="outlined" onClick={() => router.back()} size="small">
          {t.backButton}
        </Button>
        
        <Chip 
          label={translateCategory(apartment.category)} 
          color="primary" 
          icon={getCategoryIcon()}
          sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
        />

        <Box>
          <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>

      <Box mb={2}>
        <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
          {apartment.objectName || apartment.name || t.noName}
        </Typography>
      </Box>

      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 3,
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
            color: 'primary.main'
          }
        }}
        onClick={handleOpenRoute}
      >
        <LocationIcon color="primary" />
        <Typography variant="body1">
          {formatAddress()}
        </Typography>
      </Box>

      <FileUploadSlider 
        photos={apartment.photos} 
        price={apartment.price}
        name={apartment.name}
        phones={apartment.phones}
        category={translateCategory(apartment.category)} 
      />

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          {t.description}
        </Typography>
        <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
          {apartment.description || t.noDescription}
        </Typography>
        
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t.characteristics}
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.rooms} 
                  secondary={apartment.rooms || t.notSpecified} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.guests} 
                  secondary={apartment.beds || t.notSpecified} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.area} 
                  secondary={apartment.size ? `${apartment.size} ${t.m2}` : t.notSpecified} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.floor} 
                  secondary={
                    apartment.floor 
                      ? `${apartment.floor} ${currentLanguage === 'ua' ? 'з' : 'из'} ${apartment.totalFloors}` 
                      : t.notSpecified
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
                  primary={t.kidsAge} 
                  secondary={apartment.kidsAge ? `${apartment.kidsAge} ${t.years}` : t.noRestrictions} 
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.ageLimit} 
                  secondary={apartment.ageLimit ? `${t.fromAge} ${apartment.ageLimit} ${t.years}` : t.noRestrictions} 
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <CelebrationIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.parties} 
                  secondary={getBooleanValue(apartment.parties)} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              {t.rentalConditions}
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <TimeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.checkInOut} 
                  secondary={
                    apartment.checkIn || apartment.checkOut 
                      ? `${formatTime(apartment.checkIn)} / ${formatTime(apartment.checkOut)}` 
                      : t.notSpecified
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
                  primary={t.fullDayCheckIn} 
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
                  primary={t.smoking} 
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
                  primary={t.pets} 
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
                  primary={t.reportDocs} 
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
                  primary={t.minRent} 
                  secondary={apartment.minRent ? `${apartment.minRent} ${t.days}` : t.notSpecified} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary={t.deposit} 
                  secondary={apartment.deposit ? `${apartment.deposit} грн` : t.notRequired} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              {t.amenities}
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {apartment.conveniences?.length > 0 ? (
                apartment.conveniences.map((item, index) => (
                  <Chip 
                    key={index} 
                    label={translateConvenience(item)} 
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
                  {t.noAmenities}
                </Typography>
              )}
            </Box>
          </Grid>
        </Grid>
      </Paper>

      {apartment.latitude && apartment.longitude && (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            {t.location}
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
                onClick={handleOpenRoute}
                fullWidth
              >
                {t.buildRoute}
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

export default function ApartmentDetailPage() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header />
        <ApartmentDetailContent />
        <Footer/>
      </LanguageProvider>
    </Provider>
  );
}