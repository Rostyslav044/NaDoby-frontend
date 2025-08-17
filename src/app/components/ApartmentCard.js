// 'use client';

// import React, { useState } from 'react';
// import {
//   Box,
//   Typography,
//   IconButton,
//   Card,
//   CardContent,
//   CardMedia,
//   useTheme,
//   useMediaQuery,
// } from '@mui/material';
// import FavoriteIcon from '@mui/icons-material/Favorite';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useSwipeable } from 'react-swipeable';
// import { useRouter } from 'next/navigation';
// import '../globals.css';

// const formatCity = (city, region) => {
//   if (!region || city.includes(region)) return city;
//   return `${city}, ${region}`;
// };
// const parseCityAndRegion = (fullCity, fullRegion) => {
//   if (fullCity && fullCity.includes(',')) {
//     const parts = fullCity.split(',');
//     const cityOnly = parts[0].trim();

//     let regionOnly = fullRegion ? fullRegion.trim() : (parts[1] || '').trim();

//     regionOnly = regionOnly.replace(/ область$/i, '');

//     return { cityOnly, regionOnly };
//   } else {
//     const regionOnly = fullRegion ? fullRegion.trim().replace(/ область$/i, '') : '';
//     return { cityOnly: fullCity || '', regionOnly };
//   }
// };
// const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
//   const photos = apartment.photos || [];
//   const [currentIndex, setCurrentIndex] = useState(0);
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
//     onSwipedLeft: () => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
//     onSwipedRight: () => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   const handleCardClick = () => {
//     router.push(`/apartment/${apartment._id}`);
//   };

  
//   const { cityOnly, regionOnly } = parseCityAndRegion(apartment.city, apartment.region);
// const infoFields = [
//   { label: 'Категорія', value: apartment.category },
//   { label: 'Місто', value: cityOnly },
//   regionOnly && { label: 'Область', value: regionOnly, isRegion: true },
//   { label: 'Вулиця', value: apartment.street },
//   { label: 'Номер будинку', value: apartment.houseNumber },
//   { label: 'Район', value: apartment.district },
//   apartment.metro && { label: 'Метро', value: apartment.metro },
//   { label: 'Кімнат', value: apartment.rooms },
//   { label: 'Кількість гостей', value: apartment.beds },
// ].filter(Boolean);


  
 


//   // const infoFields = [
//   //   { label: 'Категорія', value: apartment.category },
//   //   { label: 'Місто', value: apartment.city },
//   //   apartment.region && { label: 'Область', value: apartment.region, isRegion: true },
//   //   { label: 'Вулиця', value: apartment.street },
//   //   { label: 'Номер будинку', value: apartment.houseNumber },
//   //   { label: 'Район', value: apartment.district },
//   //   apartment.metro && { label: 'Метро', value: apartment.metro },
//   //   { label: 'Кімнат', value: apartment.rooms },
//   //   { label: 'Кількість гостей', value: apartment.beds },
//   // ].filter(Boolean);
  

//   return (
//     <Card
//       onClick={handleCardClick}
//       sx={{
//         cursor: 'pointer',
//         bgcolor: 'background.paper',
//         borderRadius: 2,
//         boxShadow: 3,
//         transition: 'box-shadow 0.3s, transform 0.3s',
//         '&:hover': {
//           boxShadow: 6,
//           transform: 'translateY(-2px)',
//         },
//         height: '100%',
//         display: 'flex',
//         flexDirection: 'column',
//         justifyContent: 'space-between',
//       }}
//     >
//       <Box
//         position="relative"
//         {...swipeHandlers}
//         sx={{
//           height: 200,
//           overflow: 'hidden',
//           borderRadius: 1,
//           userSelect: 'none',
//           touchAction: 'pan-y',
//           p: 1,
//         }}
//       >
//         {photos.length > 0 ? (
//           <>
//             <CardMedia
//               component="img"
//               height="200"
//               image={photos[currentIndex]}
//               alt={`Фото апартаменту ${currentIndex + 1}`}
//               draggable={false}
//               sx={{ objectFit: 'cover', borderRadius: 1 }}
//             />

//             <IconButton
//               onClick={handlePrevPhoto}
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: 13,
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: 'white',
//                 '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
//                 zIndex: 10,
//                 p: isMobile ? '2px' : '4px',
//               }}
//             >
//               <ArrowBackIosNewIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
//             </IconButton>

//             <IconButton
//               onClick={handleNextPhoto}
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 right: 13,
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: 'white',
//                 '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
//                 zIndex: 10,
//                 p: isMobile ? '2px' : '4px',
//               }}
//             >
//               <ArrowForwardIosIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
//             </IconButton>

//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 display: 'flex',
//                 gap: isMobile ? 0.5 : 0.8,
//                 zIndex: 10,
//               }}
//             >
//               {photos.map((_, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     width: isMobile ? 5 : 6,
//                     height: isMobile ? 5 : 6,
//                     borderRadius: '50%',
//                     backgroundColor:
//                       index === currentIndex ? '#1976d2' : '#90caf9',
//                     border: '1px solid white',
//                   }}
//                 />
//               ))}
//             </Box>
//           </>
//         ) : (
//           <Box
//             sx={{
//               height: '100%',
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               bgcolor: '#eee',
//               color: '#777',
//             }}
//           >
//             Нет фото
//           </Box>
//         )}

//         <IconButton
//           onClick={(e) => {
//             e.stopPropagation();
//             toggleFavorite(apartment._id);
//           }}
//           sx={{
//             position: 'absolute',
//             top: 12,
//             right: 12,
//             backgroundColor: 'rgba(255,255,255,0.8)',
//             '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
//             zIndex: 20,
//             p: isMobile ? '3px' : '6px',
//           }}
//         >
//           <FavoriteIcon
//             sx={{
//               color: isFavorite ? 'red' : 'grey',
//               fontSize: isMobile ? 20 : 28,
//             }}
//           />
//         </IconButton>
//       </Box>

//       <CardContent sx={{ px: isMobile ? 1.5 : 2, pt: 2, minHeight: 220 }}>
//         {/* {infoFields.map(({ label, value }, index) => (
//           <Box key={index} display="flex" gap={1} mb={0.5}>
//             <Typography
//               variant={isMobile ? 'caption' : 'body2'}
//               sx={{ color: 'text.secondary', minWidth: '110px' }}
//             >
//               {label}:
//             </Typography>
//             <Typography variant={isMobile ? 'caption' : 'body2'} fontWeight={500}>
//               {value || 'Не вказано'}
//             </Typography>



//           </Box>
//         ))} */}

       
// {infoFields.map(({ label, value, isRegion }, index) => (
//   <Box key={index} display="flex" gap={1} mb={0.5}>
//     <Typography
//       variant={isMobile ? 'caption' : 'body2'}
//       sx={{ color: 'text.secondary', minWidth: '110px' }}
//     >
//       {label}:
//     </Typography>
//     <Typography
//       variant={isMobile ? 'caption' : 'body2'}
//       fontWeight={500}
//       className={isRegion ? 'auto-width-card' : ''}
//     >
//       {value || 'Не вказано'}
//     </Typography>
//   </Box>
// ))}


// <Box display="flex" gap={1} mb={1}>
//   <Typography
//     variant={isMobile ? 'caption' : 'body2'}
//     sx={{ color: 'text.secondary', minWidth: '110px' }}
//   >
//     Ціна:
//   </Typography>
//   <Typography
//     variant={isMobile ? 'caption' : 'body2'}
//     fontWeight="bold"
//     color="primary"
//   >
//     {apartment.price ? `${apartment.price} грн./${apartment.category === 'Сауна/Баня' ? 'година' : 'доба'}` : 'Не вказано'}
//   </Typography>
// </Box>

      
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
  Pets // Иконка для категории "Готель для тварин"
} from '@mui/icons-material';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';

const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
  const photos = apartment.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [isHovered, setIsHovered] = useState(false);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  // Функция для выбора иконки категории
  const getCategoryIcon = () => {
    switch(apartment.category) {
      case 'Готель для тварин':
        return <Pets fontSize="small" />;
      case 'Котедж для компаній':
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
    if (!price) return 'Цена не указана';
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
      <Tooltip title={isFavorite ? 'Удалить из избранного' : 'Добавить в избранное'} arrow>
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
                  bottom: 10,
                  right: 10,
                  '& .MuiBadge-badge': {
                    bgcolor: 'rgba(0,0,0,0.6)',
                    color: 'white',
                    fontSize: '0.7rem'
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
            <Typography variant="body2">Нет фото</Typography>
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
        {/* Category - Выделенный блок */}
      

<Box sx={{
  mb: 2,
  px: 2, // Горизонтальные отступы
  py: 0.5, // Вертикальные отступы
  // bgcolor: 'primary.main',
  bgcolor: 'primary.light',
  
  borderRadius: 1,
  display: 'inline-flex', // Важно: inline-flex вместо flex
  alignItems: 'center',
  justifyContent: 'center', // Центрирование по горизонтали
  mx: 'auto', // Автоматические отступы по бокам для центрирования
  width: 'fit-content', // Ширина по содержимому
  maxWidth: '100%', // Чтобы не выходил за границы
}}>
  <Typography 
    variant="subtitle1" 
    // fontWeight={600} 
    color="white"
    sx={{
      whiteSpace: 'nowrap',
      overflow: 'hidden',
      textOverflow: 'ellipsis'
    }}
  >
    {apartment.category || 'Апартаменты'}
  </Typography>
</Box>

        {/* Address Section - Полный адрес */}
        <Box sx={{ mb: 1.5 }}>
          <Typography variant="body1" fontWeight={500} sx={{ mb: 1 }}>
            {apartment.city || 'Город не указан'}, {apartment.street || 'улица не указана'}, {apartment.houseNumber || 'без номера'}
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
                {apartment.beds || '?'} {apartment.beds === 1 ? 'гость' : 'гостей'}
              </Typography>
            </Box>
          </Grid>
          <Grid item xs={6}>
            <Box sx={{ display: 'flex', alignItems: 'center' }}>
              <MeetingRoom fontSize="small" color="primary" sx={{ mr: 1 }} />
              <Typography variant="body2">
                {apartment.rooms || '?'} {apartment.rooms === 1 ? 'комната' : 'комнаты'}
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

export default ApartmentCard;