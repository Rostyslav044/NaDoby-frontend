
 // карточка для отображения объявления об аренде.



// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   CardMedia,
//   Divider,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Badge,
//   Tooltip,
//   Snackbar,
//   Alert,
//   Avatar,
//   Dialog,
//   DialogContent,
//   CircularProgress,
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   KingBed,
//   MeetingRoom,
//   DirectionsSubway,
//   ArrowBackIos,
//   ArrowForwardIos,
//   PhotoCamera,
//   MapOutlined,
//   LocationOn,
// } from '@mui/icons-material';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';
// import { useLanguage } from '@/app/LanguageContext';
// import CreateUser from './CreateUser';
// import { useFavorites } from '@/app/hooks/useFavorites';

// const APARTMENT_CARD_TRANSLATIONS = {
//   ua: {
//     noPhotos: 'Немає фото',
//     noCity: 'Місто не вказано',
//     noStreet: 'Вулиця не вказана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'кімната' : count < 5 ? 'кімнати' : 'кімнат'),
//     noPrice: 'Ціна не вказана',
//     favoriteAdd: 'Додати в обране',
//     favoriteRemove: 'Видалити з обраного',
//     apartmentDefault: 'Апартаменти',
//     loginRequired: 'Увійдіть, щоб додати в обране',
//     favoriteError: 'Помилка при оновленні обраного',
//     district: 'район',
//     metro: 'метро',
//   },
//   ru: {
//     noPhotos: 'Нет фото',
//     noCity: 'Город не указан',
//     noStreet: 'Улица не указана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гость' : count < 5 ? 'гостя' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'комната' : count < 5 ? 'комнаты' : 'комнат'),
//     noPrice: 'Цена не указана',
//     favoriteAdd: 'Добавить в избранное',
//     favoriteRemove: 'Удалить из избранного',
//     apartmentDefault: 'Апартаменты',
//     loginRequired: 'Войдите, чтобы добавить в избранное',
//     favoriteError: 'Ошибка при обновлении избранного',
//     district: 'район',
//     metro: 'метро',
//   },
// };

// const CATEGORY_TRANSLATIONS = {
//   ua: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Готель',
//     'Хостел': 'Хостел',
//     'Дом': 'Будинок',
//     'База отдыха': 'База відпочинку',
//     'Сауна/Баня': 'Сауна/Лазня',
//     'Готель для тварин': 'Готель для тварин',
//     'Глемпінг': 'Глемпінг',
//     'Пансіонат': 'Пансіонат',
//     'Котедж для компній': 'Котедж для компаній',
//     'Коворкінг': 'Коворкінг',
//     'Автокемпінг': 'Автокемпінг'
//   },
//   ru: {
//     'Квартира': 'Квартира',
//     'Гостиница': 'Гостиница',
//     'Хостел': 'Хостел',
//     'Дом': 'Дом',
//     'База отдыха': 'База отдыха',
//     'Сауна/Баня': 'Сауна/Баня',
//     'Готель для тварин': 'Отель для животных',
//     'Глемпінг': 'Глэмпинг',
//     'Пансіонат': 'Пансионат',
//     'Котедж для компній': 'Коттедж для компаний',
//     'Коворкінг': 'Коворкинг',
//     'Автокемпінг': 'Автокемпинг'
//   }
// };

// const ApartmentCardComponent = ({
//   apartment,
//   isFavorite: propIsFavorite,
//   toggleFavorite: propToggleFavorite,
//   showCreateUserDialog,
// }) => {
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENT_CARD_TRANSLATIONS[currentLanguage] || APARTMENT_CARD_TRANSLATIONS.ua;
//   const categoryTranslations = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;
  
//   const translateCategory = (category) => {
//     if (!category) return t.apartmentDefault;
//     return categoryTranslations[category] || category;
//   };

//   const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'info',
//   });
//   const [loginModalOpen, setLoginModalOpen] = useState(false);
//   const autoCloseTimer = useRef(null);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();

//   // Используем хук избранного
//   const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

//   // Определяем, использовать ли переданные пропсы или хук
//   const actualIsFavorite = propIsFavorite !== undefined ? propIsFavorite : isFavorite(apartment?._id);
//   const actualToggleFavorite = propToggleFavorite || toggleFavorite;

//   useEffect(() => {
//     return () => {
//       if (autoCloseTimer.current) {
//         clearTimeout(autoCloseTimer.current);
//       }
//     };
//   }, []);

//   const startAutoCloseTimer = () => {
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
    
//     autoCloseTimer.current = setTimeout(() => {
//       setLoginModalOpen(false);
//       setSnackbar(prev => ({ ...prev, open: false }));
//     }, 5000);
//   };

//   const handlePrevPhoto = (e) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
//   };

//   const handleNextPhoto = (e) => {
//     e.stopPropagation();
//     setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
//   };

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () =>
//       setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
//     onSwipedRight: () =>
//       setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const handleCardClick = () => {
//     if (!loginModalOpen) {
//       router.push(`/apartment/${apartment._id}`);
//     }
//   };

//   const handleFavoriteClick = async (e) => {
//     e.stopPropagation();
//     if (favoriteLoading) return;

//     const userProfile = localStorage.getItem('user_profile');
//     if (!userProfile) {
//       setLoginModalOpen(true);
//       setSnackbar({ 
//         open: true, 
//         message: t.loginRequired, 
//         severity: 'info' 
//       });
      
//       startAutoCloseTimer();
//       return;
//     }

//     try {
//       await actualToggleFavorite(apartment._id);
//     } catch (error) {
//       if (error.message === 'USER_NOT_LOGGED_IN') {
//         setLoginModalOpen(true);
//         setSnackbar({ 
//           open: true, 
//           message: t.loginRequired, 
//           severity: 'info' 
//         });
//         startAutoCloseTimer();
//       } else {
//         setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//       }
//     }
//   };

//   const handleCloseModal = () => {
//     setLoginModalOpen(false);
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar(prev => ({ ...prev, open: false }));
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
//   };

//   const formatPrice = (price) => {
//     if (!price) return t.noPrice;
//     return new Intl.NumberFormat('uk-UA', {
//       style: 'currency',
//       currency: 'UAH',
//       maximumFractionDigits: 0,
//     })
//       .format(price)
//       .replace('₴', ' грн');
//   };

//   return (
//     <Card
//       onClick={handleCardClick}
//       onMouseEnter={() => setIsHovered(true)}
//       onMouseLeave={() => setIsHovered(false)}
//       sx={{
//         cursor: 'pointer',
//         bgcolor: 'background.paper',
//         borderRadius: 3,
//         boxShadow: theme.shadows[3],
//         transition: 'all 0.3s ease',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         overflow: 'hidden',
//         height: { xs: 'auto', sm: 500 },
//         mb: { xs: 2, sm: 0 },
//         '&:hover': {
//           boxShadow: theme.shadows[6],
//           transform: { sm: 'translateY(-5px)' },
//         },
//       }}
//     >
//       <Tooltip title={actualIsFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
//         <IconButton
//           onClick={handleFavoriteClick}
//           disabled={favoriteLoading}
//           sx={{
//             position: 'absolute',
//             top: 10,
//             right: 10,
//             zIndex: 2,
//             bgcolor: 'rgba(255,255,255,0.9)',
//             '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//             '&:disabled': { opacity: 0.7 },
//           }}
//         >
//           {favoriteLoading ? (
//             <CircularProgress size={24} />
//           ) : actualIsFavorite ? (
//             <Favorite color="error" />
//           ) : (
//             <FavoriteBorder color="action" />
//           )}
//         </IconButton>
//       </Tooltip>

//       {apartment?.actions && (
//         <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
//           {apartment.actions}
//         </Box>
//       )}

//       <Box
//         position="relative"
//         {...swipeHandlers}
//         sx={{
//           height: { xs: 210, sm: 220, md: 240 },
//           overflow: 'hidden',
//           borderRadius: '12px 12px 0 0',
//           userSelect: 'none',
//         }}
//       >
//         {photos.length > 0 ? (
//           <>
//             <CardMedia
//               component="img"
//               image={photos[currentIndex]}
//               alt={`apartment-${currentIndex + 1}`}
//               loading="lazy"
//               sx={{
//                 objectFit: 'cover',
//                 width: '100%',
//                 height: '100%',
//                 transition: 'transform 0.5s ease',
//               }}
//             />

//             {photos.length > 1 && (
//               <Badge
//                 badgeContent={`${currentIndex + 1}/${photos.length}`}
//                 color="primary"
//                 sx={{
//                   position: 'absolute',
//                   bottom: 10,
//                   right: 12,
//                   '& .MuiBadge-badge': {
//                     bgcolor: 'rgba(0,0,0,0.6)',
//                     color: '#fff',
//                     fontSize: '0.75rem',
//                     px: 1,
//                   },
//                 }}
//               />
//             )}

//             {photos.length > 1 && (
//               <>
//                 <IconButton
//                   onClick={handlePrevPhoto}
//                   sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     left: 8,
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(0,0,0,0.4)',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                     opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                     transition: 'opacity 0.25s ease',
//                   }}
//                 >
//                   <ArrowBackIos fontSize="small" />
//                 </IconButton>

//                 <IconButton
//                   onClick={handleNextPhoto}
//                   sx={{
//                     position: 'absolute',
//                     top: '50%',
//                     right: 8,
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(0,0,0,0.4)',
//                     color: 'white',
//                     '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
//                     opacity: { xs: 1, sm: isHovered ? 1 : 0 },
//                     transition: 'opacity 0.25s ease',
//                   }}
//                 >
//                   <ArrowForwardIos fontSize="small" />
//                 </IconButton>
//               </>
//             )}
//           </>
//         ) : (
//           <Box
//             sx={{
//               height: '100%',
//               display: 'flex',
//               alignItems: 'center',
//               justifyContent: 'center',
//               bgcolor: '#f5f5f5',
//               color: 'text.secondary',
//               gap: 1,
//             }}
//           >
//             <PhotoCamera fontSize="large" />
//             <Typography variant="body2">{t.noPhotos}</Typography>
//           </Box>
//         )}
//       </Box>

//       <CardContent
//         sx={{
//           p: { xs: 1.5, sm: 2 },
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//         }}
//       >
//         <Box
//           sx={{
//             mb: { xs: 1.25, sm: 2 },
//             px: 2,
//             py: 0.5,
//             bgcolor: 'primary.light',
//             borderRadius: 1,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             mx: 'auto',
//             width: 'fit-content',
//             maxWidth: '100%',
//           }}
//         >
//           <Typography
//             variant="subtitle2"
//             color="white"
//             sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
//           >
//             {translateCategory(apartment?.category) || t.apartmentDefault}
//           </Typography>
//         </Box>

//         <Box sx={{ mb: 1.25 }}>
//           <Typography
//             variant="body2"
//             fontWeight={500}
//             sx={{ mb: 0.5, lineHeight: 1.35 }}
//           >
//             {apartment?.city || t.noCity}, {apartment?.street || t.noStreet}
//             {apartment?.houseNumber ? `, ${apartment.houseNumber}` : `, ${t.noHouseNumber}`}
//           </Typography>

//           <Grid container spacing={0.5}>
//             {!!apartment?.district && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <MapOutlined fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//                   <Typography variant="caption">{t.district} {apartment.district}</Typography>
//                 </Box>
//               </Grid>
//             )}
//             {!!apartment?.metro && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//                   <Typography variant="caption">{t.metro} {apartment.metro}</Typography>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 1 }} />

//         <Grid container spacing={1} sx={{ mb: 1.25 }}>
//           <Grid item xs={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <KingBed fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//               <Typography variant="caption">
//                 {apartment?.beds ?? '?'} {t.guests(apartment?.beds)}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <MeetingRoom fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//               <Typography variant="caption">
//                 {apartment?.rooms ?? '?'} {t.rooms(apartment?.rooms)}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         <Box
//           sx={{
//             bgcolor: 'primary.main',
//             borderRadius: 2,
//             p: { xs: 1, sm: 1.5 },
//             textAlign: 'center',
//             mt: 'auto',
//             transition: 'all 0.3s ease',
//             '&:hover': { bgcolor: 'primary.dark' },
//           }}
//         >
//           <Typography
//             variant={{ xs: 'body1', sm: 'h6' }}
//             fontWeight={700}
//             color="white"
//             sx={{ 
//               lineHeight: 1,
//               fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' 
//             }}
//           >
//             {formatPrice(apartment?.price)}
//           </Typography>
//         </Box>
//       </CardContent>

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={5000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={handleCloseSnackbar}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <Dialog
//         open={loginModalOpen}
//         onClose={handleCloseModal}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogContent>
//           <CreateUser onClose={handleCloseModal} />
//         </DialogContent>
//       </Dialog>
//     </Card>
//   );
// };

// export default function ApartmentCard(props) {
  
//   return <ApartmentCardComponent {...props} />;
// }



'use client';

import React, { useState, useEffect, useRef, createContext, useContext } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip,
  Snackbar,
  Alert,
  Avatar,
  Dialog,
  DialogContent,
  CircularProgress,
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  KingBed,
  MeetingRoom,
  DirectionsSubway,
  ArrowBackIos,
  ArrowForwardIos,
  PhotoCamera,
  MapOutlined,
  LocationOn,
} from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import CreateUser from './CreateUser';
import { useFavorites } from '@/app/hooks/useFavorites';
// import { LanguageProvider, useLanguage } from "@/app/LanguageContext";

// Создаем контекст для языка
const LanguageContext = createContext();

// Провайдер языка
export const LanguageProvider = ({ children }) => {
  const [currentLanguage, setCurrentLanguage] = useState('ua');

  useEffect(() => {
    // Пытаемся получить язык из localStorage при загрузке
    const savedLanguage = localStorage.getItem('selectedLanguage');
    if (savedLanguage) {
      setCurrentLanguage(savedLanguage);
    }
  }, []);

  const changeLanguage = (language) => {
    setCurrentLanguage(language);
    localStorage.setItem('selectedLanguage', language);
  };

  return (
    <LanguageContext.Provider value={{ currentLanguage, changeLanguage }}>
      {children}
    </LanguageContext.Provider>
  );
};

// Хук для использования языка
export const useLanguage = () => {
  const context = useContext(LanguageContext);
  if (!context) {
    throw new Error('useLanguage must be used within a LanguageProvider');
  }
  return context;
};

const APARTMENT_CARD_TRANSLATIONS = {
  ua: {
    noPhotos: 'Немає фото',
    noCity: 'Місто не вказано',
    noStreet: 'Вулиця не вказана',
    noHouseNumber: 'без номера',
    guests: (count) => (count === 1 ? 'гість' : count < 5 ? 'гості' : 'гостей'),
    rooms: (count) => (count === 1 ? 'кімната' : count < 5 ? 'кімнати' : 'кімнат'),
    noPrice: 'Ціна не вказана',
    favoriteAdd: 'Додати в обране',
    favoriteRemove: 'Видалити з обраного',
    apartmentDefault: 'Апартаменти',
    loginRequired: 'Увійдіть, щоб додати в обране',
    favoriteError: 'Помилка при оновленні обраного',
    district: 'район',
    metro: 'метро',
  },
  ru: {
    noPhotos: 'Нет фото',
    noCity: 'Город не указан',
    noStreet: 'Улица не указана',
    noHouseNumber: 'без номера',
    guests: (count) => (count === 1 ? 'гость' : count < 5 ? 'гостя' : 'гостей'),
    rooms: (count) => (count === 1 ? 'комната' : count < 5 ? 'комнаты' : 'комнат'),
    noPrice: 'Цена не указана',
    favoriteAdd: 'Добавить в избранное',
    favoriteRemove: 'Удалить из избранного',
    apartmentDefault: 'Апартаменты',
    loginRequired: 'Войдите, чтобы добавить в избранное',
    favoriteError: 'Ошибка при обновлении избранного',
    district: 'район',
    metro: 'метро',
  },
};

const CATEGORY_TRANSLATIONS = {
  ua: {
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
  ru: {
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
  }
};

const ApartmentCardComponent = ({
  apartment,
  isFavorite: propIsFavorite,
  toggleFavorite: propToggleFavorite,
  showCreateUserDialog,
}) => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENT_CARD_TRANSLATIONS[currentLanguage] || APARTMENT_CARD_TRANSLATIONS.ua;
  const categoryTranslations = CATEGORY_TRANSLATIONS[currentLanguage] || CATEGORY_TRANSLATIONS.ua;
  
  const translateCategory = (category) => {
    if (!category) return t.apartmentDefault;
    return categoryTranslations[category] || category;
  };

  const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const autoCloseTimer = useRef(null);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  // Используем хук избранного
  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

  // Определяем, использовать ли переданные пропсы или хук
  const actualIsFavorite = propIsFavorite !== undefined ? propIsFavorite : isFavorite(apartment?._id);
  const actualToggleFavorite = propToggleFavorite || toggleFavorite;

  useEffect(() => {
    return () => {
      if (autoCloseTimer.current) {
        clearTimeout(autoCloseTimer.current);
      }
    };
  }, []);

  const startAutoCloseTimer = () => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
    
    autoCloseTimer.current = setTimeout(() => {
      setLoginModalOpen(false);
      setSnackbar(prev => ({ ...prev, open: false }));
    }, 5000);
  };

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () =>
      setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
    onSwipedRight: () =>
      setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCardClick = () => {
    if (!loginModalOpen) {
      router.push(`/apartment/${apartment._id}`);
    }
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (favoriteLoading) return;

    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setLoginModalOpen(true);
      setSnackbar({ 
        open: true, 
        message: t.loginRequired, 
        severity: 'info' 
      });
      
      startAutoCloseTimer();
      return;
    }

    try {
      await actualToggleFavorite(apartment._id);
    } catch (error) {
      if (error.message === 'USER_NOT_LOGGED_IN') {
        setLoginModalOpen(true);
        setSnackbar({ 
          open: true, 
          message: t.loginRequired, 
          severity: 'info' 
        });
        startAutoCloseTimer();
      } else {
        setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
      }
    }
  };

  const handleCloseModal = () => {
    setLoginModalOpen(false);
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  };

  const handleCloseSnackbar = () => {
    setSnackbar(prev => ({ ...prev, open: false }));
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  };

  const formatPrice = (price) => {
    if (!price) return t.noPrice;
    return new Intl.NumberFormat('uk-UA', {
      style: 'currency',
      currency: 'UAH',
      maximumFractionDigits: 0,
    })
      .format(price)
      .replace('₴', ' грн');
  };

  return (
    <Card
      onClick={handleCardClick}
      onMouseEnter={() => setIsHovered(true)}
      onMouseLeave={() => setIsHovered(false)}
      sx={{
        cursor: 'pointer',
        bgcolor: 'background.paper',
        borderRadius: 3,
        boxShadow: theme.shadows[3],
        transition: 'all 0.3s ease',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        height: { xs: 'auto', sm: 500 },
        mb: { xs: 2, sm: 0 },
        '&:hover': {
          boxShadow: theme.shadows[6],
          transform: { sm: 'translateY(-5px)' },
        },
      }}
    >
      <Tooltip title={actualIsFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
        <IconButton
          onClick={handleFavoriteClick}
          disabled={favoriteLoading}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
            '&:disabled': { opacity: 0.7 },
          }}
        >
          {favoriteLoading ? (
            <CircularProgress size={24} />
          ) : actualIsFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder color="action" />
          )}
        </IconButton>
      </Tooltip>

      {apartment?.actions && (
        <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
          {apartment.actions}
        </Box>
      )}

      <Box
        position="relative"
        {...swipeHandlers}
        sx={{
          height: { xs: 210, sm: 220, md: 240 },
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          userSelect: 'none',
        }}
      >
        {photos.length > 0 ? (
          <>
            <CardMedia
              component="img"
              image={photos[currentIndex]}
              alt={`apartment-${currentIndex + 1}`}
              loading="lazy"
              sx={{
                objectFit: 'cover',
                width: '100%',
                height: '100%',
                transition: 'transform 0.5s ease',
              }}
            />

            {photos.length > 1 && (
              <Badge
                badgeContent={`${currentIndex + 1}/${photos.length}`}
                color="primary"
                sx={{
                  position: 'absolute',
                  bottom: 10,
                  right: 12,
                  '& .MuiBadge-badge': {
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: '#fff',
                    fontSize: '0.75rem',
                    px: 1,
                  },
                }}
              />
            )}

            {photos.length > 1 && (
              <>
                <IconButton
                  onClick={handlePrevPhoto}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    left: 8,
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    opacity: { xs: 1, sm: isHovered ? 1 : 0 },
                    transition: 'opacity 0.25s ease',
                  }}
                >
                  <ArrowBackIos fontSize="small" />
                </IconButton>

                <IconButton
                  onClick={handleNextPhoto}
                  sx={{
                    position: 'absolute',
                    top: '50%',
                    right: 8,
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(0,0,0,0.4)',
                    color: 'white',
                    '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
                    opacity: { xs: 1, sm: isHovered ? 1 : 0 },
                    transition: 'opacity 0.25s ease',
                  }}
                >
                  <ArrowForwardIos fontSize="small" />
                </IconButton>
              </>
            )}
          </>
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              alignItems: 'center',
              justifyContent: 'center',
              bgcolor: '#f5f5f5',
              color: 'text.secondary',
              gap: 1,
            }}
          >
            <PhotoCamera fontSize="large" />
            <Typography variant="body2">{t.noPhotos}</Typography>
          </Box>
        )}
      </Box>

      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        <Box
          sx={{
            mb: { xs: 1.25, sm: 2 },
            px: 2,
            py: 0.5,
            bgcolor: 'primary.light',
            borderRadius: 1,
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
            mx: 'auto',
            width: 'fit-content',
            maxWidth: '100%',
          }}
        >
          <Typography
            variant="subtitle2"
            color="white"
            sx={{ whiteSpace: 'nowrap', overflow: 'hidden', textOverflow: 'ellipsis' }}
          >
            {translateCategory(apartment?.category) || t.apartmentDefault}
          </Typography>
        </Box>

        <Box sx={{ mb: 1.25 }}>
          <Typography
            variant="body2"
            fontWeight={500}
            sx={{ mb: 0.5, lineHeight: 1.35 }}
          >
            {apartment?.city || t.noCity}, {apartment?.street || t.noStreet}
            {apartment?.houseNumber ? `, ${apartment.houseNumber}` : `, ${t.noHouseNumber}`}
          </Typography>

          <Grid container spacing={0.5}>
            {!!apartment?.district && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MapOutlined fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="caption">{t.district} {apartment.district}</Typography>
                </Box>
              </Grid>
            )}
            {!!apartment?.metro && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="caption">{t.metro} {apartment.metro}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 1 }} />

        <Grid container spacing={1} sx={{ mb: 1.25 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KingBed fontSize="small" color="primary" sx={{ mr: 0.5 }} />
              <Typography variant="caption">
                {apartment?.beds ?? '?'} {t.guests(apartment?.beds)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MeetingRoom fontSize="small" color="primary" sx={{ mr: 0.5 }} />
              <Typography variant="caption">
                {apartment?.rooms ?? '?'} {t.rooms(apartment?.rooms)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        <Box
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 2,
            p: { xs: 1, sm: 1.5 },
            textAlign: 'center',
            mt: 'auto',
            transition: 'all 0.3s ease',
            '&:hover': { bgcolor: 'primary.dark' },
          }}
        >
          <Typography
            variant={{ xs: 'body1', sm: 'h6' }}
            fontWeight={700}
            color="white"
            sx={{ 
              lineHeight: 1,
              fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif' 
            }}
          >
            {formatPrice(apartment?.price)}
          </Typography>
        </Box>
      </CardContent>

      <Snackbar
        open={snackbar.open}
        autoHideDuration={5000}
        onClose={handleCloseSnackbar}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={handleCloseSnackbar}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <Dialog
        open={loginModalOpen}
        onClose={handleCloseModal}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <CreateUser onClose={handleCloseModal} />
        </DialogContent>
      </Dialog>
    </Card>
  );
};

export default function ApartmentCard(props) {
  return (
    <LanguageProvider>
      <ApartmentCardComponent {...props} />
    </LanguageProvider>
  );
}