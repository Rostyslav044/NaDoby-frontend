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




'use client';

import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton
} from '@mui/material';
import CloseIcon from '@mui/icons-material/Close';
import ArrowBackIosIcon from '@mui/icons-material/ArrowBackIos';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useState, useMemo } from 'react';

const PreviewDialog = ({
  open,
  onClose,
  formData,
  photos, // [{ file: File, preview: string }]
  uploudImages, // [string]
  apartmentInfo,
}) => {
  // объединяем все превьюшки
  const allImages = useMemo(() => {
    const localPreviews = photos.map((p) => p.preview); // берём только preview
    return [...localPreviews, ...uploudImages];
  }, [photos, uploudImages]);

  const [currentImageIndex, setCurrentImageIndex] = useState(0);

  const handlePrev = () => {
    setCurrentImageIndex((prev) =>
      prev === 0 ? allImages.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentImageIndex((prev) =>
      prev === allImages.length - 1 ? 0 : prev + 1
    );
  };

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="xl"
      fullWidth
      fullScreen
    >
      <DialogTitle>
        Предпросмотр объявления
        <IconButton
          aria-label="close"
          onClick={() => onClose(false)}
          sx={{
            position: 'absolute',
            right: 16,
            top: 16,
            color: (theme) => theme.palette.grey[500],
          }}
        >
          <CloseIcon />
        </IconButton>
      </DialogTitle>

      <DialogContent>
        {allImages.length > 0 && (
          <Box
            sx={{
              position: 'relative',
              width: '100%',
              height: '60vh',
              mb: 4,
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
            }}
          >
            <img
              src={allImages[currentImageIndex]}
              alt={`Фото ${currentImageIndex + 1}`}
              style={{
                maxHeight: '100%',
                maxWidth: '100%',
                objectFit: 'contain',
                borderRadius: '12px',
              }}
            />
            <IconButton
              onClick={handlePrev}
              sx={{
                position: 'absolute',
                left: 10,
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#eee' },
              }}
            >
              <ArrowBackIosIcon />
            </IconButton>
            <IconButton
              onClick={handleNext}
              sx={{
                position: 'absolute',
                right: 10,
                backgroundColor: 'white',
                '&:hover': { backgroundColor: '#eee' },
              }}
            >
              <ArrowForwardIosIcon />
            </IconButton>
          </Box>
        )}

        <Typography variant="h4" gutterBottom>
          {formData.objectName}
        </Typography>
        <Typography variant="h6" color="textSecondary" gutterBottom>
          {formData.category}
        </Typography>

        <Typography variant="body1" paragraph>
          {formData.description}
        </Typography>

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
        {apartmentInfo.floor && (
          <Typography gutterBottom>
            <strong>Этаж:</strong> {apartmentInfo.floor}
          </Typography>
        )}
        {apartmentInfo.guests && (
          <Typography gutterBottom>
            <strong>Гостей:</strong> {apartmentInfo.guests}
          </Typography>
        )}
      </DialogContent>

      <DialogActions sx={{ p: 3 }}>
        <Button onClick={() => onClose(true)} size="large">
          Редактировать
        </Button>
        <Button
          onClick={() => onClose(false)}
          variant="contained"
          size="large"
        >
          Опубликовать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;
