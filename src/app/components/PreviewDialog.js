







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
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useSwipeable } from 'react-swipeable';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// const PreviewDialog = ({
//   open,
//   onClose,
//   formData,
//   photos = [],
//   uploudImages = [],
//   apartmentInfo = {},
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [userLocation, setUserLocation] = useState(null);

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   const allImages = [
//     ...photos.map((photo) =>
//       typeof photo === 'string' ? photo : URL.createObjectURL(photo)
//     ),
//     ...uploudImages,
//   ];

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   useEffect(() => {
//     if (navigator.geolocation) {
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
//   }, []);

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   if (!open) return null;

//   return (
//     <Dialog
//       open={open}
//       onClose={() => onClose(false)}
//       maxWidth="md"
//       fullWidth
//       scroll="paper"
//       sx={{ '& .MuiDialog-paper': { maxHeight: '90vh' } }}
//     >
//       <DialogTitle>Предпросмотр объявления</DialogTitle>
//       <DialogContent dividers>
//         {/* Фото */}
//         {allImages.length > 0 ? (
//           <Box {...swipeHandlers} sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
//             <Box
//               component="img"
//               src={allImages[currentIndex]}
//               alt={`Фото ${currentIndex + 1}`}
//               sx={{
//                 width: '100%',
//                 height: 450,
//                 borderRadius: 2,
//                 objectFit: 'cover',
//                 display: 'block',
//               }}
//               draggable={false}
//             />
//             <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
//               <ArrowBackIosNewIcon />
//             </IconButton>
//             <IconButton onClick={handleNext} sx={arrowStyle('right')}>
//               <ArrowForwardIosIcon />
//             </IconButton>
//           </Box>
//         ) : (
//           <Typography variant="body1" sx={{ mb: 3 }}>
//             Фото отсутствуют
//           </Typography>
//         )}

//         {/* Информация */}
//         <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
//           <Typography variant="h5" gutterBottom>
//             {formData.objectName || 'Без названия'}
//           </Typography>
//           <Typography color="textSecondary" gutterBottom>
//             {formData.category}
//           </Typography>
//           <Typography paragraph>{formData.description}</Typography>

//           <Grid container spacing={2}>
//             {[
//               { label: 'Местоположение', value: `${formData.city}, ${formData.street}` },
//               { label: 'Район', value: formData.district },
//               { label: 'Метро', value: formData.metro },
//               { label: 'Цена', value: `${formData.price} грн` },
//               { label: 'Комнат', value: apartmentInfo.rooms },
//               { label: 'Кроватей', value: apartmentInfo.beds },
//               { label: 'Площадь', value: apartmentInfo.size ? `${apartmentInfo.size} м²` : '' },
//               {
//                 label: 'Этаж',
//                 value: apartmentInfo.floor
//                   ? `${apartmentInfo.floor} из ${apartmentInfo.totalFloors}`
//                   : '',
//               },
//               { label: 'Время заезда', value: apartmentInfo.checkIn },
//               { label: 'Время выезда', value: apartmentInfo.checkOut },
//               { label: 'Круглосуточный заезд', value: apartmentInfo.fullDayCheckIn ? 'Да' : 'Нет' },
//               { label: 'Курение', value: apartmentInfo.smoking ? 'Разрешено' : 'Запрещено' },
//               { label: 'Вечеринки', value: apartmentInfo.parties ? 'Разрешены' : 'Запрещены' },
//               { label: 'Животные', value: apartmentInfo.pets ? 'Разрешены' : 'Запрещены' },
//               { label: 'Минимальная аренда', value: apartmentInfo.minRent },
//               { label: 'Документы', value: apartmentInfo.reportDocs },
//               { label: 'Залог', value: apartmentInfo.deposit },
//               { label: 'Возрастное ограничение', value: apartmentInfo.ageLimit },
//               { label: 'Дети от', value: apartmentInfo.childrenFrom },
//               { label: 'Телефоны', value: apartmentInfo.phones?.join(', ') },
//               { label: 'Удобства', value: apartmentInfo.conveniences?.join(', ') },
//             ].map(
//               (item, index) =>
//                 item.value && (
//                   <Grid item xs={12} sm={6} key={index}>
//                     <Typography variant="body1">
//                       <strong>{item.label}:</strong> {item.value}
//                     </Typography>
//                   </Grid>
//                 )
//             )}
//           </Grid>
//         </Paper>

//         {/* Карта */}
//         {formData.latitude && formData.longitude && (
//           <>
//             <Typography variant="h6" gutterBottom>
//               Местоположение объекта
//             </Typography>
//             <Box
//               sx={{
//                 height: 300,
//                 mb: 2,
//                 borderRadius: 2,
//                 overflow: 'hidden',
//                 border: '1px solid #ccc',
//               }}
//             >
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
//               <Box textAlign="center" mb={3}>
//                 <a
//                   href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
//                   target="_blank"
//                   rel="noopener noreferrer"
//                 >
//                   <Button variant="outlined" color="primary">
//                     Проложить маршрут
//                   </Button>
//                 </a>
//               </Box>
//             )}
//           </>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => onClose(true)}>Редактировать</Button>
//         <Button onClick={() => onClose(false)} variant="contained">
//           Опубликовать
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// const arrowStyle = (side) => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: 8,
//   transform: 'translateY(-50%)',
//   bgcolor: 'rgba(0,0,0,0.3)',
//   color: '#fff',
//   '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
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
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

const PreviewDialog = ({
  open,
  onClose,
  formData,
  photos = [],
  uploudImages = [],
  apartmentInfo = {},
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const allImages = [
    ...photos.map((photo) =>
      typeof photo === 'string' ? photo : URL.createObjectURL(photo)
    ),
    ...uploudImages,
  ];

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  useEffect(() => {
    if (navigator.geolocation) {
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
  }, []);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="md"
      fullWidth
      scroll="paper"
      sx={{ '& .MuiDialog-paper': { maxHeight: '90vh' } }}
    >
      <DialogTitle>Предпросмотр объявления</DialogTitle>
      <DialogContent dividers>
        {/* Фото */}
        {allImages.length > 0 ? (
          <Box {...swipeHandlers} sx={{ position: 'relative', textAlign: 'center', mb: 3 }}>
            <Box
              component="img"
              src={allImages[currentIndex]}
              alt={`Фото ${currentIndex + 1}`}
              sx={{
                width: '100%',
                height: 450,
                borderRadius: 2,
                objectFit: 'cover',
                display: 'block',
              }}
              draggable={false}
            />
            <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
              <ArrowBackIosNewIcon />
            </IconButton>
            <IconButton onClick={handleNext} sx={arrowStyle('right')}>
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mb: 3 }}>
            Фото отсутствуют
          </Typography>
        )}

        {/* Информация */}
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h5" gutterBottom>
            {formData.objectName || 'Без названия'}
          </Typography>
          <Typography color="textSecondary" gutterBottom>
            {formData.category}
          </Typography>
          <Typography paragraph>{formData.description}</Typography>

          <Grid container spacing={2}>
            {[
              { label: 'Местоположение', value: `${formData.city}, ${formData.street}` },
              { label: 'Район', value: formData.district },
              { label: 'Метро', value: formData.metro },
              { label: 'Цена', value: `${formData.price} грн` },
              { label: 'Комнат', value: apartmentInfo.rooms },
              { label: 'Кроватей', value: apartmentInfo.beds },
              { label: 'Площадь', value: apartmentInfo.size ? `${apartmentInfo.size} м²` : '' },
              {
                label: 'Этаж',
                value: apartmentInfo.floor
                  ? `${apartmentInfo.floor} из ${apartmentInfo.totalFloors}`
                  : '',
              },
              { label: 'Время заезда', value: apartmentInfo.checkIn },
              { label: 'Время выезда', value: apartmentInfo.checkOut },
              { label: 'Круглосуточный заезд', value: apartmentInfo.fullDayCheckIn ? 'Да' : 'Нет' },
              { label: 'Курение', value: apartmentInfo.smoking ? 'Разрешено' : 'Запрещено' },
              { label: 'Вечеринки', value: apartmentInfo.parties ? 'Разрешены' : 'Запрещены' },
              { label: 'Животные', value: apartmentInfo.pets ? 'Разрешены' : 'Запрещены' },
              { label: 'Минимальная аренда', value: apartmentInfo.minRent },
              { label: 'Документы', value: apartmentInfo.reportDocs },
              { label: 'Залог', value: apartmentInfo.deposit },
              { label: 'Возрастное ограничение', value: apartmentInfo.ageLimit },
              { label: 'Дети от', value: apartmentInfo.childrenFrom },
              { label: 'Телефоны', value: apartmentInfo.phones?.join(', ') },
              { label: 'Удобства', value: apartmentInfo.conveniences?.join(', ') },
            ].map(
              (item, index) =>
                item.value && (
                  <Grid item xs={12} sm={6} key={index}>
                    <Typography variant="body1">
                      <strong>{item.label}:</strong> {item.value}
                    </Typography>
                  </Grid>
                )
            )}
          </Grid>
        </Paper>

        {/* Карта */}
        {formData.latitude && formData.longitude && (
          <>
            <Typography variant="h6" gutterBottom>
              Местоположение объекта
            </Typography>
            <Box
              sx={{
                height: 300,
                mb: 2,
                borderRadius: 2,
                overflow: 'hidden',
                border: '1px solid #ccc',
              }}
            >
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
              <Box textAlign="center" mb={3}>
                <a
                  href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
                  target="_blank"
                  rel="noopener noreferrer"
                >
                  <Button variant="outlined" color="primary">
                    Проложить маршрут
                  </Button>
                </a>
              </Box>
            )}
          </>
        )}
      </DialogContent>
      <DialogActions>
        <Button onClick={() => onClose(true)}>Редактировать</Button>
        <Button onClick={() => onClose(false)} variant="contained">
          Опубликовать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 8,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.3)',
  color: '#fff',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
  zIndex: 10,
});

export default PreviewDialog;