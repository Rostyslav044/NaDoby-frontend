
 // карточка для отображения объявления об аренде.

// 'use client';

// import React, { useState } from 'react';
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
// } from '@mui/icons-material';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';
// import { useLanguage } from '@/app/LanguageContext';
// import { useSelector } from 'react-redux';

// const APARTMENT_CARD_CONTENT = {
//   ua: {
//     noPhotos: 'Немає фото',
//     noCity: 'Місто не вказано',
//     noStreet: 'вулиця не вказана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гість' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'кімната' : 'кімнати'),
//     noPrice: 'Ціна не вказана',
//     favoriteAdd: 'Додати в обране',
//     favoriteRemove: 'Видалити з обраного',
//     apartmentDefault: 'Апартаменти',
//     loginRequired: 'Увійдіть, щоб додати в обране',
//     favoriteError: 'Помилка при оновленні обраного',
//   },
//   ru: {
//     noPhotos: 'Нет фото',
//     noCity: 'Город не указан',
//     noStreet: 'улица не указана',
//     noHouseNumber: 'без номера',
//     guests: (count) => (count === 1 ? 'гость' : 'гостей'),
//     rooms: (count) => (count === 1 ? 'комната' : 'комнаты'),
//     noPrice: 'Цена не указана',
//     favoriteAdd: 'Добавить в избранное',
//     favoriteRemove: 'Удалить из избранного',
//     apartmentDefault: 'Апартаменты',
//     loginRequired: 'Войдите, чтобы добавить в избранное',
//     favoriteError: 'Ошибка при обновлении избранного',
//   },
// };

// const ApartmentCardComponent = ({
//   apartment,
//   isFavorite,
//   toggleFavorite,
//   showCreateUserDialog,
// }) => {
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENT_CARD_CONTENT[currentLanguage];
//   const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

//   const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const [snackbar, setSnackbar] = useState({
//     open: false,
//     message: '',
//     severity: 'info',
//   });
//   const [isLoading, setIsLoading] = useState(false);

//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();

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
//     router.push(`/apartment/${apartment._id}`);
//   };

//   const handleFavoriteClick = async (e) => {
//     e.stopPropagation();
//     if (isLoading) return;

//     if (!isAuthenticated) {
//       if (typeof showCreateUserDialog === 'function') {
//         showCreateUserDialog();
//       } else {
//         setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
//       }
//       return;
//     }

//     setIsLoading(true);
//     try {
//       if (typeof toggleFavorite === 'function') {
//         await toggleFavorite(apartment._id);
//       } else {
//         setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//       }
//     } catch {
//       setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
//     } finally {
//       setIsLoading(false);
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
//       .replace('₴', '');
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
//         // мобилка — авто по высоте; планшет/десктоп — как было (500px)
//         height: { xs: 'auto', sm: 500 },
//         mb: { xs: 2, sm: 0 },
//         '&:hover': {
//           boxShadow: theme.shadows[6],
//           transform: { sm: 'translateY(-5px)' },
//         },
//       }}
//     >
//       {/* Favorite */}
//       <Tooltip title={isFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
//         <IconButton
//           onClick={handleFavoriteClick}
//           disabled={isLoading}
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
//           {isLoading ? (
//             <Box
//               sx={{
//                 width: 24,
//                 height: 24,
//                 border: '2px solid',
//                 borderColor: 'primary.main',
//                 borderTopColor: 'transparent',
//                 borderRadius: '50%',
//                 animation: 'spin 1s linear infinite',
//                 '@keyframes spin': {
//                   '0%': { transform: 'rotate(0deg)' },
//                   '100%': { transform: 'rotate(360deg)' },
//                 },
//               }}
//             />
//           ) : isFavorite ? (
//             <Favorite color="error" />
//           ) : (
//             <FavoriteBorder color="action" />
//           )}
//         </IconButton>
//       </Tooltip>

//       {/* Кнопка действий (если передана сверху) */}
//       {apartment?.actions && (
//         <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
//           {apartment.actions}
//         </Box>
//       )}

//       {/* Photos */}
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

//             {/* Счётчик фото */}
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

//             {/* Навигация по фото */}
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

//       {/* Content */}
//       <CardContent
//         sx={{
//           p: { xs: 1.5, sm: 2 },
//           flexGrow: 1,
//           display: 'flex',
//           flexDirection: 'column',
//           overflow: 'hidden',
//         }}
//       >
//         {/* Категория */}
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
//             {apartment?.category || t.apartmentDefault}
//           </Typography>
//         </Box>

//         {/* Адрес */}
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
//                   <Typography variant="caption">{apartment.district}</Typography>
//                 </Box>
//               </Grid>
//             )}
//             {!!apartment?.metro && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 0.5 }} />
//                   <Typography variant="caption">{apartment.metro}</Typography>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 1 }} />

//         {/* Параметры */}
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

//         {/* Цена */}
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

//       {/* Snackbar */}
//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2000}
//         onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert
//           severity={snackbar.severity}
//           onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Card>
//   );
// };

// export default function ApartmentCard(props) {
//   return <ApartmentCardComponent {...props} />;
// }


'use client';

import React, { useState } from 'react';
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
} from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useLanguage } from '@/app/LanguageContext';
import { useSelector } from 'react-redux';

const APARTMENT_CARD_CONTENT = {
  ua: {
    noPhotos: 'Немає фото',
    noCity: 'Місто не вказано',
    noStreet: 'вулиця не вказана',
    noHouseNumber: 'без номера',
    guests: (count) => (count === 1 ? 'гість' : 'гостей'),
    rooms: (count) => (count === 1 ? 'кімната' : 'кімнати'),
    noPrice: 'Ціна не вказана',
    favoriteAdd: 'Додати в обране',
    favoriteRemove: 'Видалити з обраного',
    apartmentDefault: 'Апартаменти',
    loginRequired: 'Увійдіть, щоб додати в обране',
    favoriteError: 'Помилка при оновленні обраного',
  },
  ru: {
    noPhotos: 'Нет фото',
    noCity: 'Город не указан',
    noStreet: 'улица не указана',
    noHouseNumber: 'без номера',
    guests: (count) => (count === 1 ? 'гость' : 'гостей'),
    rooms: (count) => (count === 1 ? 'комната' : 'комнаты'),
    noPrice: 'Цена не указана',
    favoriteAdd: 'Добавить в избранное',
    favoriteRemove: 'Удалить из избранного',
    apartmentDefault: 'Апартаменты',
    loginRequired: 'Войдите, чтобы добавить в избранное',
    favoriteError: 'Ошибка при обновлении избранного',
  },
};

const ApartmentCardComponent = ({
  apartment,
  isFavorite,
  toggleFavorite,
  showCreateUserDialog,
}) => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENT_CARD_CONTENT[currentLanguage];
  const isAuthenticated = useSelector((state) => state.auth.isAuthenticated);

  const photos = Array.isArray(apartment?.photos) ? apartment.photos : [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: '',
    severity: 'info',
  });
  const [isLoading, setIsLoading] = useState(false);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

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
      setCurrentIndex((prev) (prev === 0 ? photos.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCardClick = () => {
    router.push(`/apartment/${apartment._id}`);
  };

  const handleFavoriteClick = async (e) => {
    e.stopPropagation();
    if (isLoading) return;

    if (!isAuthenticated) {
      if (typeof showCreateUserDialog === 'function') {
        showCreateUserDialog();
      } else {
        setSnackbar({ open: true, message: t.loginRequired, severity: 'info' });
      }
      return;
    }

    setIsLoading(true);
    try {
      if (typeof toggleFavorite === 'function') {
        await toggleFavorite(apartment._id);
      } else {
        setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
      }
    } catch {
      setSnackbar({ open: true, message: t.favoriteError, severity: 'error' });
    } finally {
      setIsLoading(false);
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
      .replace('₴', '');
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
      {/* Favorite */}
      <Tooltip title={isFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
        <IconButton
          onClick={handleFavoriteClick}
          disabled={isLoading}
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
          {isLoading ? (
            <Box
              sx={{
                width: 24,
                height: 24,
                border: '2px solid',
                borderColor: 'primary.main',
                borderTopColor: 'transparent',
                borderRadius: '50%',
                animation: 'spin 1s linear infinite',
                '@keyframes spin': {
                  '0%': { transform: 'rotate(0deg)' },
                  '100%': { transform: 'rotate(360deg)' },
                },
              }}
            />
          ) : isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder color="action" />
          )}
        </IconButton>
      </Tooltip>

      {/* Кнопка действий (если передана сверху) */}
      {apartment?.actions && (
        <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
          {apartment.actions}
        </Box>
      )}

      {/* Photos */}
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

            {/* Счётчик фото */}
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

            {/* Навигация по фото */}
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

      {/* Content */}
      <CardContent
        sx={{
          p: { xs: 1.5, sm: 2 },
          flexGrow: 1,
          display: 'flex',
          flexDirection: 'column',
          overflow: 'hidden',
        }}
      >
        {/* Категория */}
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
            {apartment?.category || t.apartmentDefault}
          </Typography>
        </Box>

        {/* Адрес */}
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
                  <Typography variant="caption">{apartment.district}</Typography>
                </Box>
              </Grid>
            )}
            {!!apartment?.metro && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 0.5 }} />
                  <Typography variant="caption">{apartment.metro}</Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Параметры */}
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

        {/* Цена */}
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

      {/* Snackbar */}
      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert
          severity={snackbar.severity}
          onClose={() => setSnackbar((s) => ({ ...s, open: false }))}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>
    </Card>
  );
};

export default function ApartmentCard(props) {
  return <ApartmentCardComponent {...props} />;
}