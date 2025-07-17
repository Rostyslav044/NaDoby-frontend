





// 'use client';

// import React, { useState, useEffect } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   IconButton,
//   Grid,
//   Paper,
//   CircularProgress,
//   Chip,
//   Divider,
//   Avatar,
//   List,
//   ListItem,
//   ListItemText,
//   ListItemAvatar,
//   Stack,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useSwipeable } from 'react-swipeable';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
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
// } from '@mui/icons-material';




// const PreviewDialog = ({
//   open,
//   onClose,
//   formData,
//   uploudImages = [],
//   apartmentInfo = {},
//   photoError,
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [userLocation, setUserLocation] = useState(null);
//   useEffect(() => {
//     if (open) {
//       // Сбрасываем все внутренние состояния при каждом открытии
//       setCurrentIndex(0);
//       // Можно добавить сброс других состояний при необходимости
//     }
//   }, [open]);
//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   // Сбрасываем состояния при каждом открытии диалога
//   useEffect(() => {
//     if (open) {
//       setCurrentIndex(0);
//     }
//   }, [open]);

//   const allImages = uploudImages.map((img) => 
//     typeof img === 'string' ? img : URL.createObjectURL(img)
//   );

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   useEffect(() => {
//     if (navigator.geolocation && open) {
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
//   }, [open]);

//   const getCategoryIcon = () => {
//     switch(formData.category) {
//       case 'Квартира': return <HomeIcon />;
//       case 'Гостиница': return <HotelIcon />;
//       case 'Хостел': return <KingBedIcon />;
//       case 'Дом': return <HomeIcon />;
//       case 'База отдыха': return <HomeIcon />;
//       case 'Сауна/Баня': return <BathtubIcon />;
//       default: return <ApartmentIcon />;
//     }
//   };

//   const formatTime = (time) => {
//     if (!time) return '';
//     const [hours, minutes] = time.split(':');
//     return `${hours}:${minutes}`;
//   };

//   const getBooleanValue = (value) => {
//     return value === 'yes' ? 'Да' : value === 'no' ? 'Нет' : 'Не указано';
//   };

//   const handlePhoneClick = (phone) => {
//     window.open(`tel:${phone.replace(/\D/g, '')}`);
//   };

//   if (!open) return null;

//   return (
//     <Dialog
//       open={open}
//       onClose={() => onClose(false)}
//       maxWidth="md"
//       fullWidth
//       scroll="paper"
//       sx={{ '& .MuiDialog-paper': { maxHeight: '90vh' } }}
//       key={JSON.stringify(formData)}
//     >
//       <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
//         {getCategoryIcon()}
//         Предпросмотр объявления
//       </DialogTitle>
      
//       <DialogContent dividers>
//         {/* Фото с цифрами и свайпом */}
//         {allImages.length > 0 ? (
//           <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
//             <Box
//               {...swipeHandlers}
//               component="div"
//               sx={{
//                 position: 'relative',
//                 width: '100%',
//                 height: 450,
//                 borderRadius: 2,
//                 overflow: 'hidden',
//               }}
//             >
//               <Box
//                 component="img"
//                 src={allImages[currentIndex]}
//                 alt={`Фото ${currentIndex + 1}`}
//                 sx={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   display: 'block',
//                 }}
//                 draggable={false}
//               />
              
//               {/* Индикатор фото (X из Y) */}
//               <Box
//                 sx={{
//                   position: 'absolute',
//                   bottom: 16,
//                   right: 16,
//                   backgroundColor: 'rgba(0, 0, 0, 0.6)',
//                   color: 'white',
//                   px: 1.5,
//                   py: 0.5,
//                   borderRadius: 4,
//                   fontSize: '0.875rem',
//                 }}
//               >
//                 {currentIndex + 1} / {allImages.length}
//               </Box>
//             </Box>
            
//             {allImages.length > 1 && (
//               <>
//                 <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
//                   <ArrowBackIosNewIcon />
//                 </IconButton>
//                 <IconButton onClick={handleNext} sx={arrowStyle('right')}>
//                   <ArrowForwardIosIcon />
//                 </IconButton>
//               </>
//             )}
//           </Box>
//         ) : (
//           <Box sx={{ 
//             height: 200, 
//             display: 'flex', 
//             justifyContent: 'center', 
//             alignItems: 'center',
//             backgroundColor: '#f5f5f5',
//             borderRadius: 2,
//             mb: 3
//           }}>
//             <Typography variant="body1" color="textSecondary">
//               {photoError ? 'Загрузите минимум 3 фото' : 'Фото отсутствуют'}
//             </Typography>
//           </Box>
//         )}

//         {/* Основная информация */}
//         <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
//           <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
//             <Typography variant="h4">
//               {formData.objectName || 'Без названия'}
//             </Typography>
//             <Typography variant="h5" color="primary">
//               {formData.price || '0'} грн
//             </Typography>
//           </Stack>
          
//           <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
//             <Chip 
//               label={formData.category} 
//               color="primary" 
//               size="small" 
//               icon={getCategoryIcon()}
//             />
//             <Typography variant="body1" color="text.secondary">
//               {formData.city}, {formData.street} {formData.houseNumber}
//               {formData.district && (
//                 <>
//                   , <Box component="span" sx={{ fontWeight: 'bold' }}>район</Box>: {formData.district}
//                 </>
//               )}
//               {formData.metro && `, метро: ${formData.metro}`}
//             </Typography>
//           </Box>

//           <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
//             Описание
//           </Typography>
//           <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
//             {formData.description || 'Описание отсутствует'}
//           </Typography>
          
//           <Divider sx={{ my: 3 }} />

//           {/* Детали объекта */}
//           <Grid container spacing={3}>
//             {/* Основные характеристики */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>
//                 Основные характеристики
//               </Typography>
              
//               <List dense>
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <HomeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Комнат" 
//                     secondary={apartmentInfo.rooms || 'Не указано'} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <PersonIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Макс. гостей" 
//                     secondary={apartmentInfo.beds || 'Не указано'} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <HomeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Площадь" 
//                     secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : 'Не указано'} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <HomeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Этаж" 
//                     secondary={
//                       apartmentInfo.floor 
//                         ? `${apartmentInfo.floor} из ${apartmentInfo.totalFloors}` 
//                         : 'Не указано'
//                     } 
//                   />
//                 </ListItem>

//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <ChildCareIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Возраст детей от" 
//                     secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} лет` : 'Не ограничено'} 
//                   />
//                 </ListItem>

//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <PersonIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Возрастное ограничение" 
//                     secondary={apartmentInfo.ageLimit ? `от ${apartmentInfo.ageLimit} лет` : 'Не ограничено'} 
//                   />
//                 </ListItem>
//               </List>
//             </Grid>

//             {/* Условия аренды */}
//             <Grid item xs={12} md={6}>
//               <Typography variant="h6" gutterBottom>
//                 Условия аренды
//               </Typography>
              
//               <List dense>
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <TimeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Время заезда/выезда" 
//                     secondary={
//                       apartmentInfo.checkIn || apartmentInfo.checkOut 
//                         ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
//                         : 'Не указано'
//                     } 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <TimeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Круглосуточное заселение" 
//                     secondary={getBooleanValue(apartmentInfo.fullDayCheckIn)} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <SmokingIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Курение" 
//                     secondary={getBooleanValue(apartmentInfo.smoking)} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <PetsIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Животные" 
//                     secondary={getBooleanValue(apartmentInfo.pets)} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <DocsIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Отчетные документы" 
//                     secondary={getBooleanValue(apartmentInfo.reportDocs)} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <HomeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Минимальный срок аренды" 
//                     secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} дней` : 'Не указано'} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <HomeIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Залог" 
//                     secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : 'Не требуется'} 
//                   />
//                 </ListItem>
//               </List>
//             </Grid>

//             {/* Удобства */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Удобства
//               </Typography>
              
//               <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
//                 {apartmentInfo.conveniences?.length > 0 ? (
//                   apartmentInfo.conveniences.map((item, index) => (
//                     <Chip 
//                       key={index} 
//                       label={item} 
//                       variant="outlined"
//                       avatar={
//                         <Avatar>
//                           {getFacilityIcon(item)}
//                         </Avatar>
//                       }
//                     />
//                   ))
//                 ) : (
//                   <Typography variant="body2" color="text.secondary">
//                     Удобства не указаны
//                   </Typography>
//                 )}
//               </Box>
//             </Grid>

//             {/* Контактная информация */}
//             <Grid item xs={12}>
//               <Typography variant="h6" gutterBottom>
//                 Контактная информация
//               </Typography>
              
//               <List dense>
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <PersonIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Имя" 
//                     secondary={apartmentInfo.name || 'Не указано'} 
//                   />
//                 </ListItem>
                
//                 <ListItem>
//                   <ListItemAvatar>
//                     <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
//                       <PhoneIcon fontSize="small" />
//                     </Avatar>
//                   </ListItemAvatar>
//                   <ListItemText 
//                     primary="Телефоны" 
//                     secondary={
//                       apartmentInfo.phones?.length > 0 ? (
//                         <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
//                           {apartmentInfo.phones.map((phone, index) => (
//                             <Box 
//                               key={index}
//                               component="a"
//                               href={`tel:${phone.replace(/\D/g, '')}`}
//                               onClick={(e) => {
//                                 e.preventDefault();
//                                 handlePhoneClick(phone);
//                               }}
//                               sx={{
//                                 color: 'primary.main',
//                                 textDecoration: 'none',
//                                 '&:hover': { textDecoration: 'underline' },
//                                 cursor: 'pointer',
//                               }}
//                             >
//                               {phone}
//                             </Box>
//                           ))}
//                         </Box>
//                       ) : 'Не указаны'
//                     } 
//                   />
//                 </ListItem>
//               </List>
//             </Grid>
//           </Grid>
//         </Paper>

//         {/* Карта */}
//         {formData.latitude && formData.longitude && (
//           <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
//             <Typography variant="h6" gutterBottom>
//               Местоположение
//             </Typography>
            
//             <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
//               {isLoaded ? (
//                 <GoogleMap
//                   mapContainerStyle={{ width: '100%', height: '100%' }}
//                   center={{
//                     lat: parseFloat(formData.latitude),
//                     lng: parseFloat(formData.longitude),
//                   }}
//                   zoom={15}
//                 >
//                   <Marker
//                     position={{
//                       lat: parseFloat(formData.latitude),
//                       lng: parseFloat(formData.longitude),
//                     }}
//                   />
//                 </GoogleMap>
//               ) : (
//                 <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                   <CircularProgress />
//                 </Box>
//               )}
//             </Box>

//             {userLocation && (
//               <Box textAlign="center">
//                 <Button 
//                   variant="contained" 
//                   color="primary"
//                   component="a"
//                   href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   Проложить маршрут
//                 </Button>
//               </Box>
//             )}
//           </Paper>
//         )}
//       </DialogContent>
      
//       <DialogActions sx={{ p: 2 }}>
//         <Button 
//           onClick={() => onClose(true)} 
//           variant="outlined"
//           color="secondary"
//           sx={{ mr: 2 }}
//         >
//           Редактировать
//         </Button>
//         <Button 
//           onClick={() => onClose(false)} 
//           variant="contained"
//           color="primary"
//         >
//           Опубликовать
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// // Иконки для удобств
// const getFacilityIcon = (facility) => {
//   switch(facility) {
//     case 'WiFi': return <WifiIcon />;
//     case 'Парковка': return <DirectionsCarIcon />;
//     case 'Кондиціонер': return <AcUnitIcon />;
//     case 'Телевізор': return <TvIcon />;
//     case 'Пральна машина': return <LaundryIcon />;
//     default: return <HomeIcon />;
//   }
// };

// // Стили для стрелок
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

// export default PreviewDialog;



'use client';

import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
  Grid,
  Paper,
  CircularProgress,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
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
} from '@mui/icons-material';

const PreviewDialog = ({
  open,
  onClose,
  formData,
  uploudImages = [],
  apartmentInfo = {},
  photoError,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open]);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const allImages = uploudImages.map((img) => 
    typeof img === 'string' ? img : URL.createObjectURL(img)
  );

  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (navigator.geolocation && open) {
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
  }, [open]);

  const getCategoryIcon = () => {
    switch(formData.category) {
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
    return formData.category === 'Сауна/Баня' ? 'година' : 'доба';
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const getBooleanValue = (value) => {
    return value === 'yes' ? 'Да' : value === 'no' ? 'Нет' : 'Не указано';
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
  };

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="md"
      fullWidth
      scroll="paper"
      sx={{ '& .MuiDialog-paper': { maxHeight: '90vh' } }}
      key={JSON.stringify(formData)}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getCategoryIcon()}
        Предпросмотр объявления
      </DialogTitle>
      
      <DialogContent dividers>
        {allImages.length > 0 ? (
          <Box sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
            <Box
              {...swipeHandlers}
              component="div"
              sx={{
                position: 'relative',
                width: '100%',
                height: 450,
                borderRadius: 2,
                overflow: 'hidden',
              }}
            >
              <Box
                component="img"
                src={allImages[currentIndex]}
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
                {currentIndex + 1} / {allImages.length}
              </Box>
            </Box>
            
            {allImages.length > 1 && (
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
              {photoError ? 'Загрузите минимум 3 фото' : 'Фото отсутствуют'}
            </Typography>
          </Box>
        )}

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          {/* Категория и адрес теперь сверху */}
          <Box sx={{ display: 'flex', alignItems: 'center', gap: 1, mb: 2 }}>
            <Chip 
              label={formData.category} 
              color="primary" 
              size="small" 
              icon={getCategoryIcon()}
            />
            <Typography variant="body1" color="text.secondary">
              {formData.city}, {formData.street} {formData.houseNumber}
              {formData.district && (
                <>
                  , <Box component="span" sx={{ fontWeight: 'bold' }}>район</Box>: {formData.district}
                </>
              )}
              {formData.metro && `, метро: ${formData.metro}`}
            </Typography>
          </Box>

          {/* Название объекта и цена теперь ниже */}
          <Stack direction="row" justifyContent="space-between" alignItems="center" mb={2}>
            <Typography variant="h4">
              {formData.objectName || 'Без названия'}
            </Typography>
            <Typography variant="h5" color="primary">
              {formData.price || '0'} грн. / {getPriceSuffix()}
            </Typography>
          </Stack>

          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            Описание
          </Typography>
          <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
            {formData.description || 'Описание отсутствует'}
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
                    secondary={apartmentInfo.rooms || 'Не указано'} 
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
                    secondary={apartmentInfo.beds || 'Не указано'} 
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
                    secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : 'Не указано'} 
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
                      apartmentInfo.floor 
                        ? `${apartmentInfo.floor} из ${apartmentInfo.totalFloors}` 
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
                    secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} лет` : 'Не ограничено'} 
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
                    secondary={apartmentInfo.ageLimit ? `от ${apartmentInfo.ageLimit} лет` : 'Не ограничено'} 
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
                      apartmentInfo.checkIn || apartmentInfo.checkOut 
                        ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
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
                    secondary={getBooleanValue(apartmentInfo.fullDayCheckIn)} 
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
                    secondary={getBooleanValue(apartmentInfo.smoking)} 
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
                    secondary={getBooleanValue(apartmentInfo.pets)} 
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
                    secondary={getBooleanValue(apartmentInfo.reportDocs)} 
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
                    secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} дней` : 'Не указано'} 
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
                    secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : 'Не требуется'} 
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                Удобства
              </Typography>
              
              <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                {apartmentInfo.conveniences?.length > 0 ? (
                  apartmentInfo.conveniences.map((item, index) => (
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
                    secondary={apartmentInfo.name || 'Не указано'} 
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
                      apartmentInfo.phones?.length > 0 ? (
                        <Box sx={{ display: 'flex', flexDirection: 'column', gap: 0.5 }}>
                          {apartmentInfo.phones.map((phone, index) => (
                            <Box 
                              key={index}
                              component="a"
                              href={`tel:${phone.replace(/\D/g, '')}`}
                              onClick={(e) => {
                                e.preventDefault();
                                handlePhoneClick(phone);
                              }}
                              sx={{
                                color: 'primary.main',
                                textDecoration: 'none',
                                '&:hover': { textDecoration: 'underline' },
                                cursor: 'pointer',
                              }}
                            >
                              {phone}
                            </Box>
                          ))}
                        </Box>
                      ) : 'Не указаны'
                    } 
                  />
                </ListItem>
              </List>
            </Grid>
          </Grid>
        </Paper>

        {formData.latitude && formData.longitude && (
          <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
            <Typography variant="h6" gutterBottom>
              Местоположение
            </Typography>
            
            <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
              {isLoaded ? (
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={{
                    lat: parseFloat(formData.latitude),
                    lng: parseFloat(formData.longitude),
                  }}
                  zoom={15}
                >
                  <Marker
                    position={{
                      lat: parseFloat(formData.latitude),
                      lng: parseFloat(formData.longitude),
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
                  component="a"
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  Проложить маршрут
                </Button>
              </Box>
            )}
          </Paper>
        )}
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={() => onClose(true)} 
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
        >
          Редактировать
        </Button>
        <Button 
          onClick={() => onClose(false)} 
          variant="contained"
          color="primary"
        >
          Опубликовать
        </Button>
      </DialogActions>
    </Dialog>
  );
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

export default PreviewDialog;