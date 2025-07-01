// 'use client';

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
// } from '@mui/material';

// const PreviewDialog = ({ 
//   open, 
//   onClose, 
//   formData, 
//   photos,
//   uploudImages,
//   apartmentInfo
// }) => {
//   return (
//     <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
//       <DialogTitle>Предпросмотр объявления</DialogTitle>
//       <DialogContent>
//         <Typography variant="h5" gutterBottom>{formData.objectName}</Typography>
//         <Typography color="textSecondary" gutterBottom>{formData.category}</Typography>
//         <Typography paragraph>{formData.description}</Typography>
        
//         <Typography gutterBottom>
//           <strong>Местоположение:</strong> {formData.city}, {formData.street}
//           {formData.metro && `, метро ${formData.metro}`}
//         </Typography>
        
//         {formData.district && (
//           <Typography gutterBottom><strong>Район:</strong> {formData.district}</Typography>
//         )}
        
//         <Typography gutterBottom><strong>Цена:</strong> {formData.price} грн</Typography>
        
//         {/* Дополнительная информация из apartmentInfo */}
//         {apartmentInfo.rooms && (
//           <Typography gutterBottom><strong>Комнат:</strong> {apartmentInfo.rooms}</Typography>
//         )}
//         {apartmentInfo.beds && (
//           <Typography gutterBottom><strong>Кроватей:</strong> {apartmentInfo.beds}</Typography>
//         )}

//         {(photos.length > 0 || uploudImages.length > 0) && (
//           <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
//             {photos.map((photo, index) => (
//               <img
//                 key={`photo-${index}`}
//                 src={URL.createObjectURL(photo)}
//                 alt={`Фото ${index + 1}`}
//                 style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
//               />
//             ))}
            
//             {uploudImages.map((image, index) => (
//               <img
//                 key={`upload-${index}`}
//                 src={image}
//                 alt={`Загруженное фото ${index + 1}`}
//                 style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
//               />
//             ))}
//           </Box>
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

// export default PreviewDialog;



// 'use client';

// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   IconButton
// } from '@mui/material';
// import CloseIcon from '@mui/icons-material/Close';
// import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useState } from 'react';

// const PreviewDialog = ({
//   open,
//   onClose,
//   formData,
//   photos,
//   uploudImages,
//   apartmentInfo,
// }) => {
//   const allImages = [
//     ...photos.map((photo) => URL.createObjectURL(photo)),
//     ...uploudImages,
//   ];

//   const [currentImageIndex, setCurrentImageIndex] = useState(0);

//   const handlePrev = () => {
//     setCurrentImageIndex((prev) =>
//       prev === 0 ? allImages.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentImageIndex((prev) =>
//       prev === allImages.length - 1 ? 0 : prev + 1
//     );
//   };

//   return (
//     <Dialog
//       open={open}
//       onClose={() => onClose(false)}
//       maxWidth="xl"
//       fullWidth
//       fullScreen
//     >
//       <DialogTitle>
//         Предпросмотр объявления
//         <IconButton
//           aria-label="close"
//           onClick={() => onClose(false)}
//           sx={{
//             position: 'absolute',
//             right: 16,
//             top: 16,
//             color: (theme) => theme.palette.grey[500],
//           }}
//         >
//           <CloseIcon />
//         </IconButton>
//       </DialogTitle>

//       <DialogContent>
//         {allImages.length > 0 && (
//           <Box
//             sx={{
//               position: 'relative',
//               width: '100%',
//               height: '60vh',
//               mb: 4,
//               display: 'flex',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#f5f5f5',
//             }}
//           >
//             <img
//               src={allImages[currentImageIndex]}
//               alt={`Фото ${currentImageIndex + 1}`}
//               style={{
//                 maxHeight: '100%',
//                 maxWidth: '100%',
//                 objectFit: 'contain',
//               }}
//             />
//             <IconButton
//               onClick={handlePrev}
//               sx={{
//                 position: 'absolute',
//                 left: 10,
//                 backgroundColor: 'white',
//                 '&:hover': { backgroundColor: '#eee' },
//               }}
//             >
//               <ArrowBackIosIcon />
//             </IconButton>
//             <IconButton
//               onClick={handleNext}
//               sx={{
//                 position: 'absolute',
//                 right: 10,
//                 backgroundColor: 'white',
//                 '&:hover': { backgroundColor: '#eee' },
//               }}
//             >
//               <ArrowForwardIosIcon />
//             </IconButton>
//           </Box>
//         )}

//         <Typography variant="h4" gutterBottom>
//           {formData.objectName}
//         </Typography>
//         <Typography variant="h6" color="textSecondary" gutterBottom>
//           {formData.category}
//         </Typography>

//         <Typography variant="body1" paragraph>
//           {formData.description}
//         </Typography>

//         <Typography gutterBottom>
//           <strong>Местоположение:</strong> {formData.city}, {formData.street}
//           {formData.metro && `, метро ${formData.metro}`}
//         </Typography>

//         {formData.district && (
//           <Typography gutterBottom>
//             <strong>Район:</strong> {formData.district}
//           </Typography>
//         )}

//         <Typography gutterBottom>
//           <strong>Цена:</strong> {formData.price} грн
//         </Typography>

//         {apartmentInfo.rooms && (
//           <Typography gutterBottom>
//             <strong>Комнат:</strong> {apartmentInfo.rooms}
//           </Typography>
//         )}
//         {apartmentInfo.beds && (
//           <Typography gutterBottom>
//             <strong>Кроватей:</strong> {apartmentInfo.beds}
//           </Typography>
//         )}
//         {apartmentInfo.floor && (
//           <Typography gutterBottom>
//             <strong>Этаж:</strong> {apartmentInfo.floor}
//           </Typography>
//         )}
//         {apartmentInfo.guests && (
//           <Typography gutterBottom>
//             <strong>Гостей:</strong> {apartmentInfo.guests}
//           </Typography>
//         )}
//       </DialogContent>

//       <DialogActions sx={{ p: 3 }}>
//         <Button onClick={() => onClose(true)} size="large">
//           Редактировать
//         </Button>
//         <Button
//           onClick={() => onClose(false)}
//           variant="contained"
//           size="large"
//         >
//           Опубликовать
//         </Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PreviewDialog;






// 'use client';

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   IconButton,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useSwipeable } from 'react-swipeable';

// const PreviewDialog = ({ open, onClose, formData, photos, uploudImages, apartmentInfo }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Объединяем все фото
//   const allImages = [
//     ...photos.map(photo => URL.createObjectURL(photo)),
//     ...uploudImages,
//   ];

//   // Функции переключения
//   const handlePrev = () => {
//     setCurrentIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
//   };

//   // Вызов хука useSwipeable всегда — без условий
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   // Если диалог не открыт, ничего не рендерим
//   if (!open) return null;

//   return (
//     <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
//       <DialogTitle>Предпросмотр объявления</DialogTitle>
//       <DialogContent>
//         {allImages.length > 0 ? (
//           <Box 
//             {...swipeHandlers} 
//             sx={{ position: 'relative', textAlign: 'center', mb: 3, touchAction: 'pan-y' }}
//           >
//             <img
//               src={allImages[currentIndex]}
//               alt={`Фото ${currentIndex + 1}`}
//               style={{
//                 maxHeight: '400px',
//                 maxWidth: '100%',
//                 borderRadius: 8,
//                 objectFit: 'contain',
//                 display: 'block',
//                 margin: '0 auto',
//               }}
//             />

//             {/* Стрелка влево */}
//             <IconButton
//               onClick={handlePrev}
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: 0,
//                 transform: 'translate(-50%, -50%)',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: '#fff',
//                 '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
//                 zIndex: 10,
//               }}
//               aria-label="Previous"
//             >
//               <ArrowBackIosNewIcon />
//             </IconButton>

//             {/* Стрелка вправо */}
//             <IconButton
//               onClick={handleNext}
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 right: 0,
//                 transform: 'translate(50%, -50%)',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: '#fff',
//                 '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
//                 zIndex: 10,
//               }}
//               aria-label="Next"
//             >
//               <ArrowForwardIosIcon />
//             </IconButton>

//             {/* Индикатор */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 bgcolor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 px: 2,
//                 py: 0.5,
//                 borderRadius: 2,
//                 fontSize: '0.9rem',
//                 userSelect: 'none',
//               }}
//             >
//               {currentIndex + 1} / {allImages.length}
//             </Box>
//           </Box>
//         ) : (
//           <Typography variant="body1" sx={{ mb: 3 }}>
//             Фото отсутствуют
//           </Typography>
//         )}

//         {/* Остальная информация */}
//         <Typography variant="h5" gutterBottom>{formData.objectName}</Typography>
//         <Typography color="textSecondary" gutterBottom>{formData.category}</Typography>
//         <Typography paragraph>{formData.description}</Typography>

//         <Typography gutterBottom>
//           <strong>Местоположение:</strong> {formData.city}, {formData.street}
//           {formData.metro && `, метро ${formData.metro}`}
//         </Typography>

//         {formData.district && (
//           <Typography gutterBottom><strong>Район:</strong> {formData.district}</Typography>
//         )}

//         <Typography gutterBottom><strong>Цена:</strong> {formData.price} грн</Typography>

//         {apartmentInfo.rooms && (
//           <Typography gutterBottom><strong>Комнат:</strong> {apartmentInfo.rooms}</Typography>
//         )}
//         {apartmentInfo.beds && (
//           <Typography gutterBottom><strong>Кроватей:</strong> {apartmentInfo.beds}</Typography>
//         )}
//       </DialogContent>
//       <DialogActions>
//         <Button onClick={() => onClose(true)}>Редактировать</Button>
//         <Button onClick={() => onClose(false)} variant="contained">Опубликовать</Button>
//       </DialogActions>
//     </Dialog>
//   );
// };

// export default PreviewDialog;




// 'use client';

// import React, { useState } from 'react';
// import {
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   Button,
//   Typography,
//   Box,
//   IconButton,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { useSwipeable } from 'react-swipeable';

// const PreviewDialog = ({ open, onClose, formData, photos = [], uploudImages = [], apartmentInfo = {} }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);

//   // Объединяем фото (создаём ссылки для File объектов)
//   const allImages = [
//     ...photos.map(photo => (typeof photo === 'string' ? photo : URL.createObjectURL(photo))),
//     ...uploudImages,
//   ];

//   // Функции переключения фото
//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
//   };

//   // Хук свайпа - вызывается всегда, вне условий
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   if (!open) return null;

//   return (
//     <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
//       <DialogTitle>Предпросмотр объявления</DialogTitle>
//       <DialogContent>
//         {allImages.length > 0 ? (
//           <Box
//             {...swipeHandlers}
//             sx={{
//               position: 'relative',
//               textAlign: 'center',
//               mb: 3,
//               touchAction: 'pan-y',
//               userSelect: 'none',
//             }}
//           >
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
//                 mx: 'auto',
//                 pointerEvents: 'none', // чтобы свайп не конфликтовал
//               }}
//               draggable={false}
//             />

//             {/* Стрелка влево */}
//             <IconButton
//               onClick={handlePrev}
//               aria-label="Предыдущее фото"
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 left: 8,
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: '#fff',
//                 '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//                 zIndex: 10,
//               }}
//             >
//               <ArrowBackIosNewIcon />
//             </IconButton>

//             {/* Стрелка вправо */}
//             <IconButton
//               onClick={handleNext}
//               aria-label="Следующее фото"
//               sx={{
//                 position: 'absolute',
//                 top: '50%',
//                 right: 8,
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(0,0,0,0.3)',
//                 color: '#fff',
//                 '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//                 zIndex: 10,
//               }}
//             >
//               <ArrowForwardIosIcon />
//             </IconButton>

//             {/* Индикатор */}
//             {/* <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 bgcolor: 'rgba(0, 0, 0, 0.5)',
//                 color: '#fff',
//                 px: 2,
//                 py: 0.5,
//                 borderRadius: 2,
//                 fontSize: '0.9rem',
//                 userSelect: 'none',
//                 zIndex: 10,
//               }}
//             >
//               {currentIndex + 1} / {allImages.length}
//             </Box> */}

// <Box
//   sx={{
//     position: 'absolute',
//     bottom: 8,
//     left: '50%',
//     transform: 'translateX(-50%)',
//     display: 'flex',
//     gap: 0.8,
//     zIndex: 10,
//   }}
// >
//   {allImages.map((_, index) => (
//     <Box
//       key={index}
//       sx={{
//         width: 6,
//         height: 6,
//         borderRadius: '50%',
//         backgroundColor: index === currentIndex ? '#1976d2' : '#90caf9',
//         border: '1px solid white',
//       }}
//     />
//   ))}
// </Box>


//           </Box>
//         ) : (
//           <Typography variant="body1" sx={{ mb: 3 }}>
//             Фото отсутствуют
//           </Typography>
//         )}

//         {/* Остальная информация */}
//         <Typography variant="h5" gutterBottom>
//           {formData.objectName}
//         </Typography>
//         <Typography color="textSecondary" gutterBottom>
//           {formData.category}
//         </Typography>
//         <Typography paragraph>{formData.description}</Typography>

//         <Typography gutterBottom>
//           <strong>Местоположение:</strong> {formData.city}, {formData.street}
//           {formData.metro && `, метро ${formData.metro}`}
//         </Typography>

//         {formData.district && (
//           <Typography gutterBottom>
//             <strong>Район:</strong> {formData.district}
//           </Typography>
//         )}

//         <Typography gutterBottom>
//           <strong>Цена:</strong> {formData.price} грн
//         </Typography>

//         {apartmentInfo.rooms && (
//           <Typography gutterBottom>
//             <strong>Комнат:</strong> {apartmentInfo.rooms}
//           </Typography>
//         )}
//         {apartmentInfo.beds && (
//           <Typography gutterBottom>
//             <strong>Кроватей:</strong> {apartmentInfo.beds}
//           </Typography>
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
