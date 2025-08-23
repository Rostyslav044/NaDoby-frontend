

// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   CardMedia,
//   Chip,
//   Divider,
//   Grid,
//   useTheme,
//   useMediaQuery,
//   Badge,
//   Tooltip
// } from '@mui/material';
// import {
//   Favorite,
//   FavoriteBorder,
//   Place,
//   KingBed,
//   MeetingRoom,
//   DirectionsSubway,
//   ArrowBackIos,
//   ArrowForwardIos,
//   PhotoCamera,
//   MapOutlined,
//   Pets // Иконка для категории "Готель для тварин"
// } from '@mui/icons-material';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';

// const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
//   const photos = apartment.photos || [];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [isHovered, setIsHovered] = useState(false);
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const router = useRouter();

//   // Функция для выбора иконки категории
//   const getCategoryIcon = () => {
//     switch(apartment.category) {
//       case 'Готель для тварин':
//         return <Pets fontSize="small" />;
//       case 'Котедж для компаній':
//         return <MeetingRoom fontSize="small" />;
//       default:
//         return <Place fontSize="small" />;
//     }
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
//     onSwipedLeft: () => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
//     onSwipedRight: () => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const handleCardClick = () => {
//     router.push(`/apartment/${apartment._id}`);
//   };

//   const formatPrice = (price) => {
//     if (!price) return 'Цена не указана';
//     return new Intl.NumberFormat('uk-UA', { 
//       style: 'currency', 
//       currency: 'UAH', 
//       maximumFractionDigits: 0 
//     }).format(price).replace('₴', '');
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
//         height: '500px',
//         display: 'flex',
//         flexDirection: 'column',
//         position: 'relative',
//         overflow: 'hidden',
//         '&:hover': {
//           boxShadow: theme.shadows[6],
//           transform: 'translateY(-5px)',
//           '& .MuiCardMedia-root': {
//             transform: 'scale(1.03)'
//           }
//         }
//       }}
//     >
//       {/* Favorite Button */}
//       <Tooltip title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'} arrow>
//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleFavorite();
//           }}
//           sx={{
//             position: 'absolute',
//             top: 10,
//             right: 10,
//             zIndex: 2,
//             bgcolor: 'rgba(255,255,255,0.9)',
//             '&:hover': {
//               bgcolor: 'rgba(255,255,255,1)'
//             }
//           }}
//         >
//           {isFavorite ? (
//             <Favorite color="error" />
//           ) : (
//             <FavoriteBorder color="action" />
//           )}
//         </IconButton>
//       </Tooltip>

//       {/* Photo Gallery */}
//       <Box
//         position="relative"
//         {...swipeHandlers}
//         sx={{
//           height: isMobile ? 180 : 220,
//           overflow: 'hidden',
//           borderRadius: '12px 12px 0 0',
//           userSelect: 'none',
//         }}
//       >
//         {photos.length > 0 ? (
//           <>
//             <CardMedia
//               component="img"
//               height="100%"
//               image={photos[currentIndex]}
//               alt={`Apartment photo ${currentIndex + 1}`}
//               sx={{
//                 objectFit: 'cover',
//                 transition: 'transform 0.5s ease',
//                 width: '100%'
//               }}
//             />

//             {/* Photo Counter */}
//             {photos.length > 1 && (
//               <Badge
//                 badgeContent={`${currentIndex + 1}/${photos.length}`}
//                 color="primary"
//                 sx={{
//                   position: 'absolute',
//                   bottom: 10,
//                   right: 10,
//                   '& .MuiBadge-badge': {
//                     bgcolor: 'rgba(0,0,0,0.6)',
//                     color: 'white',
//                     fontSize: '0.7rem'
//                   }
//                 }}
//               />
//             )}

//             {/* Navigation Arrows */}
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
//                     opacity: isMobile ? 1 : 0,
//                     transition: 'opacity 0.3s ease',
//                     ...(isHovered && { opacity: 1 })
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
//                     opacity: isMobile ? 1 : 0,
//                     transition: 'opacity 0.3s ease',
//                     ...(isHovered && { opacity: 1 })
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
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               bgcolor: '#f5f5f5',
//               color: '#757575',
//               gap: 1
//             }}
//           >
//             <PhotoCamera fontSize="large" />
//             <Typography variant="body2">Нет фото</Typography>
//           </Box>
//         )}
//       </Box>

//       {/* Card Content */}
//       <CardContent sx={{ 
//         p: 2, 
//         flexGrow: 1, 
//         display: 'flex', 
//         flexDirection: 'column',
//         overflow: 'hidden'
//       }}>
//         {/* Category - Выделенный блок */}
      

// <Box sx={{
//   mb: 2,
//   px: 2, // Горизонтальные отступы
//   py: 0.5, // Вертикальные отступы
//   // bgcolor: 'primary.main',
//   bgcolor: 'primary.light',
  
//   borderRadius: 1,
//   display: 'inline-flex', // Важно: inline-flex вместо flex
//   alignItems: 'center',
//   justifyContent: 'center', // Центрирование по горизонтали
//   mx: 'auto', // Автоматические отступы по бокам для центрирования
//   width: 'fit-content', // Ширина по содержимому
//   maxWidth: '100%', // Чтобы не выходил за границы
// }}>
//   <Typography 
//     variant="subtitle1" 
//     // fontWeight={600} 
//     color="white"
//     sx={{
//       whiteSpace: 'nowrap',
//       overflow: 'hidden',
//       textOverflow: 'ellipsis'
//     }}
//   >
//     {apartment.category || 'Апартаменты'}
//   </Typography>
// </Box>

//         {/* Address Section - Полный адрес */}
//         <Box sx={{ mb: 1.5 }}>
//           <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
//             {apartment.city || 'Город не указан'}, {apartment.street || 'улица не указана'}, {apartment.houseNumber || 'без номера'}
//           </Typography>

//           <Grid container spacing={1}>
//             {apartment.district && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <MapOutlined fontSize="small" color="primary" sx={{ mr: 1 }} />
//                   <Typography variant="body2">
//                     {apartment.district}
//                   </Typography>
//                 </Box>
//               </Grid>
//             )}
//             {apartment.metro && (
//               <Grid item xs={12}>
//                 <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                   <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 1 }} />
//                   <Typography variant="body2">
//                     {apartment.metro}
//                   </Typography>
//                 </Box>
//               </Grid>
//             )}
//           </Grid>
//         </Box>

//         <Divider sx={{ my: 1 }} />

//         {/* Parameters */}
//         <Grid container spacing={1} sx={{ mb: 1.5 }}>
//           <Grid item xs={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <KingBed fontSize="small" color="primary" sx={{ mr: 1 }} />
//               <Typography variant="body2">
//                 {apartment.beds || '?'} {apartment.beds === 1 ? 'гость' : 'гостей'}
//               </Typography>
//             </Box>
//           </Grid>
//           <Grid item xs={6}>
//             <Box sx={{ display: 'flex', alignItems: 'center' }}>
//               <MeetingRoom fontSize="small" color="primary" sx={{ mr: 1 }} />
//               <Typography variant="body2">
//                 {apartment.rooms || '?'} {apartment.rooms === 1 ? 'комната' : 'комнаты'}
//               </Typography>
//             </Box>
//           </Grid>
//         </Grid>

//         {/* Price */}
//         <Box
//           sx={{
//             bgcolor: 'primary.main',
//             borderRadius: 2,
//             p: 1.5,
//             textAlign: 'center',
//             mt: 'auto',
//             transition: 'all 0.3s ease',
//             '&:hover': {
//               bgcolor: 'primary.dark'
//             }
//           }}
//         >
//           <Typography variant="h6" fontWeight={700} color="white">
//             {formatPrice(apartment.price)}
//           </Typography>
//         </Box>
//       </CardContent>
//     </Card>
//   );
// };

// export default ApartmentCard;






'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  Chip,
  Divider,
  Grid,
  useTheme,
  useMediaQuery,
  Badge,
  Tooltip
} from '@mui/material';
import {
  Favorite,
  FavoriteBorder,
  Place,
  KingBed,
  MeetingRoom,
  DirectionsSubway,
  ArrowBackIos,
  ArrowForwardIos,
  PhotoCamera,
  MapOutlined,
  Pets
} from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';
import { useLanguage } from "@/app/LanguageContext";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { LanguageProvider } from "@/app/LanguageContext";

const APARTMENT_CARD_CONTENT = {
  ua: {
    noPhotos: "Немає фото",
    noCity: "Місто не вказано",
    noStreet: "вулиця не вказана",
    noHouseNumber: "без номера",
    guests: (count) => count === 1 ? 'гість' : 'гостей',
    rooms: (count) => count === 1 ? 'кімната' : 'кімнати',
    noPrice: "Ціна не вказана",
    favoriteAdd: "Додати в обране",
    favoriteRemove: "Видалити з обраного",
    apartmentDefault: "Апартаменти"
  },
  ru: {
    noPhotos: "Нет фото",
    noCity: "Город не указан",
    noStreet: "улица не указана",
    noHouseNumber: "без номера",
    guests: (count) => count === 1 ? 'гость' : 'гостей',
    rooms: (count) => count === 1 ? 'комната' : 'комнаты',
    noPrice: "Цена не указана",
    favoriteAdd: "Добавить в избранное",
    favoriteRemove: "Удалить из избранного",
    apartmentDefault: "Апартаменты"
  }
};

const ApartmentCardComponent = ({ apartment, isFavorite, toggleFavorite }) => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENT_CARD_CONTENT[currentLanguage];
  const photos = apartment.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const getCategoryIcon = () => {
    switch(apartment.category) {
      case 'Готель для тварин':
      case 'Отель для животных':
        return <Pets fontSize="small" />;
      case 'Котедж для компаній':
      case 'Коттедж для компаний':
        return <MeetingRoom fontSize="small" />;
      default:
        return <Place fontSize="small" />;
    }
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
    onSwipedLeft: () => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
    onSwipedRight: () => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCardClick = () => {
    router.push(`/apartment/${apartment._id}`);
  };

  const formatPrice = (price) => {
    if (!price) return t.noPrice;
    return new Intl.NumberFormat('uk-UA', { 
      style: 'currency', 
      currency: 'UAH', 
      maximumFractionDigits: 0 
    }).format(price).replace('₴', '');
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
        height: '500px',
        display: 'flex',
        flexDirection: 'column',
        position: 'relative',
        overflow: 'hidden',
        '&:hover': {
          boxShadow: theme.shadows[6],
          transform: 'translateY(-5px)',
          '& .MuiCardMedia-root': {
            transform: 'scale(1.03)'
          }
        }
      }}
    >
      {/* Favorite Button */}
      <Tooltip title={isFavorite ? t.favoriteRemove : t.favoriteAdd} arrow>
        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite();
          }}
          sx={{
            position: 'absolute',
            top: 10,
            right: 10,
            zIndex: 2,
            bgcolor: 'rgba(255,255,255,0.9)',
            '&:hover': {
              bgcolor: 'rgba(255,255,255,1)'
            }
          }}
        >
          {isFavorite ? (
            <Favorite color="error" />
          ) : (
            <FavoriteBorder color="action" />
          )}
        </IconButton>
      </Tooltip>


      {/* КНОВКА ДЕЙСТВИЙ - ДОБАВЬТЕ ЭТОТ КОД ПОСЛЕ КНОПКИ ИЗБРАННОГО */}
      {apartment.actions && (
  <Box sx={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
    {apartment.actions}
  </Box>
)}

      {/* Photo Gallery */}
      <Box
        position="relative"
        {...swipeHandlers}
        sx={{
          height: isMobile ? 180 : 220,
          overflow: 'hidden',
          borderRadius: '12px 12px 0 0',
          userSelect: 'none',
        }}
      >
        {photos.length > 0 ? (
          <>
            <CardMedia
              component="img"
              height="100%"
              image={photos[currentIndex]}
              alt={`Apartment photo ${currentIndex + 1}`}
              sx={{
                objectFit: 'cover',
                transition: 'transform 0.5s ease',
                width: '100%'
              }}
            />

            {/* Photo Counter */}
            {photos.length > 1 && (
              <Badge
                badgeContent={`${currentIndex + 1}/${photos.length}`}
                color="primary"
                sx={{
                  position: 'absolute',
                  bottom: 15,
                  right: 20,
                  '& .MuiBadge-badge': {
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.9rem'
                  }
                }}
              />
            )}

            {/* Navigation Arrows */}
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
                    opacity: isMobile ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    ...(isHovered && { opacity: 1 })
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
                    opacity: isMobile ? 1 : 0,
                    transition: 'opacity 0.3s ease',
                    ...(isHovered && { opacity: 1 })
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
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#f5f5f5',
              color: '#757575',
              gap: 1
            }}
          >
            <PhotoCamera fontSize="large" />
            <Typography variant="body2">{t.noPhotos}</Typography>
          </Box>
        )}
      </Box>

      {/* Card Content */}
      <CardContent sx={{ 
        p: 2, 
        flexGrow: 1, 
        display: 'flex', 
        flexDirection: 'column',
        overflow: 'hidden'
      }}>
        {/* Category */}
        <Box sx={{
          mb: 2,
          px: 2,
          py: 0.5,
          bgcolor: 'primary.light',
          borderRadius: 1,
          display: 'inline-flex',
          alignItems: 'center',
          justifyContent: 'center',
          mx: 'auto',
          width: 'fit-content',
          maxWidth: '100%',
        }}>
          <Typography 
            variant="subtitle1" 
            color="white"
            sx={{
              whiteSpace: 'nowrap',
              overflow: 'hidden',
              textOverflow: 'ellipsis'
            }}
          >
            {apartment.category || t.apartmentDefault}
          </Typography>
        </Box>

        {/* Address Section */}
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
            {apartment.city || t.noCity}, {apartment.street || t.noStreet}, {apartment.houseNumber || t.noHouseNumber}
          </Typography>

          <Grid container spacing={1}>
            {apartment.district && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <MapOutlined fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {apartment.district}
                  </Typography>
                </Box>
              </Grid>
            )}
            {apartment.metro && (
              <Grid item xs={12}>
                <Box sx={{ display: 'flex', alignItems: 'center' }}>
                  <DirectionsSubway fontSize="small" color="primary" sx={{ mr: 1 }} />
                  <Typography variant="body2">
                    {apartment.metro}
                  </Typography>
                </Box>
              </Grid>
            )}
          </Grid>
        </Box>

        <Divider sx={{ my: 1 }} />

        {/* Parameters */}
        <Grid container spacing={1} sx={{ mb: 1.5 }}>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <KingBed fontSize="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                {apartment.beds || '?'} {t.guests(apartment.beds)}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MeetingRoom fontSize="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                {apartment.rooms || '?'} {t.rooms(apartment.rooms)}
              </Typography>
            </Box>
          </Grid>
        </Grid>

        {/* Price */}
        <Box
          sx={{
            bgcolor: 'primary.main',
            borderRadius: 2,
            p: 1.5,
            textAlign: 'center',
            mt: 'auto',
            transition: 'all 0.3s ease',
            '&:hover': {
              bgcolor: 'primary.dark'
            }
          }}
        >
          <Typography variant="h6" fontWeight={700} color="white">
            {formatPrice(apartment.price)}
          </Typography>
        </Box>
      </CardContent>
    </Card>
  );
};

export default function ApartmentCard({ apartment, isFavorite, toggleFavorite }) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ApartmentCardComponent 
          apartment={apartment}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
        />
      </LanguageProvider>
    </Provider>
  );
}



