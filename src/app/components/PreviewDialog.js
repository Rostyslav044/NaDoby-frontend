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




'use client';

import React, { useState } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';

const PreviewDialog = ({ open, onClose, formData, photos = [], uploudImages = [], apartmentInfo = {} }) => {
  const [currentIndex, setCurrentIndex] = useState(0);

  // Объединяем фото (создаём ссылки для File объектов)
  const allImages = [
    ...photos.map(photo => (typeof photo === 'string' ? photo : URL.createObjectURL(photo))),
    ...uploudImages,
  ];

  // Функции переключения фото
  const handlePrev = () => {
    setCurrentIndex((prev) => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex((prev) => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  // Хук свайпа - вызывается всегда, вне условий
  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  if (!open) return null;

  return (
    <Dialog open={open} onClose={() => onClose(false)} maxWidth="md" fullWidth>
      <DialogTitle>Предпросмотр объявления</DialogTitle>
      <DialogContent>
        {allImages.length > 0 ? (
          <Box
            {...swipeHandlers}
            sx={{
              position: 'relative',
              textAlign: 'center',
              mb: 3,
              touchAction: 'pan-y',
              userSelect: 'none',
            }}
          >
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
                mx: 'auto',
                pointerEvents: 'none', // чтобы свайп не конфликтовал
              }}
              draggable={false}
            />

            {/* Стрелка влево */}
            <IconButton
              onClick={handlePrev}
              aria-label="Предыдущее фото"
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                zIndex: 10,
              }}
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            {/* Стрелка вправо */}
            <IconButton
              onClick={handleNext}
              aria-label="Следующее фото"
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: '#fff',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
                zIndex: 10,
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>

            {/* Индикатор */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: '#fff',
                px: 2,
                py: 0.5,
                borderRadius: 2,
                fontSize: '0.9rem',
                userSelect: 'none',
                zIndex: 10,
              }}
            >
              {currentIndex + 1} / {allImages.length}
            </Box>
          </Box>
        ) : (
          <Typography variant="body1" sx={{ mb: 3 }}>
            Фото отсутствуют
          </Typography>
        )}

        {/* Остальная информация */}
        <Typography variant="h5" gutterBottom>
          {formData.objectName}
        </Typography>
        <Typography color="textSecondary" gutterBottom>
          {formData.category}
        </Typography>
        <Typography paragraph>{formData.description}</Typography>

        <Typography gutterBottom>
          <strong>Местоположение:</strong> {formData.city}, {formData.street}
          {formData.metro && `, метро ${formData.metro}`}
        </Typography>

        {formData.district && (
          <Typography gutterBottom>
            <strong>Район:</strong> {formData.district}
          </Typography>
        )}

        <Typography gutterBottom>
          <strong>Цена:</strong> {formData.price} грн
        </Typography>

        {apartmentInfo.rooms && (
          <Typography gutterBottom>
            <strong>Комнат:</strong> {apartmentInfo.rooms}
          </Typography>
        )}
        {apartmentInfo.beds && (
          <Typography gutterBottom>
            <strong>Кроватей:</strong> {apartmentInfo.beds}
          </Typography>
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

export default PreviewDialog;
