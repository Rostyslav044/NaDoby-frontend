
//  етот компонент слайт фото и контактная информация


// етот код отправки фото на сервер  работает, но не так как мне надо выглядет фото и инфа!

// 'use client';

// import React, { useState } from 'react';
// import { useLanguage } from '@/app/LanguageContext';
// import { Button, Typography, Box, IconButton } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Logo from './Logo';
// import { useSwipeable } from 'react-swipeable';
// import { useEffect } from 'react';

// const translations = {
//   ru: {
//     addPhotos: 'Добавить фото',
//     uploadFiles: 'Загрузить фото объекта',
//     filesUploaded: '✅ Файлы загружены!',
//     selectFiles: 'Пожалуйста, выберите файл(ы)',
//     uploadError: '❌ Ошибка при загрузке',
//     photos: 'Фото',
//   },
//   ua: {
//     addPhotos: 'Додати фото',
//     uploadFiles: "Завантажити фото об'єкта",
//     filesUploaded: '✅ Файли завантажено!',
//     selectFiles: 'Будь ласка, оберіть файл(и)',
//     uploadError: '❌ Помилка при завантаженні',
//     photos: 'Фото',
//   },
// };
// // setUploudImages-поменял на setUploadImages 
// export default function FileUploadSlider({ setUploadImages , onValidationChange }) {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage] || translations.ru;

//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const uploadFiles = async (files) => {
//     if (files.length === 0) {
//       setMessage(t.selectFiles);
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append('file', file));

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(t.filesUploaded);
//         const uploadedUrls = Array.isArray(data.url) ? data.url : [data.url];
//         setUploadImages((prev) => [...prev, ...uploadedUrls]);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(t.uploadError);
//     }
//   };

//   // const handleFileChange = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   const newImages = files.map((file) => ({
//   //     file,
//   //     preview: URL.createObjectURL(file),
//   //   }));

//   //   setImages((prev) => [...prev, ...newImages]);
//   //   setCurrentIndex(0);
//   //   uploadFiles(files);
//   // };


//   useEffect(() => {
//     const isValid = images.length >= 3;
//     if (onValidationChange) {
//       onValidationChange(isValid);
//     }
//   }, [images]);

//   const handleFileChange = (e) => {
//     console.log(e.target.files);

//     const files = Array.from(e.target.files);
  
//     if (images.length >= 15) {
//       setMessage("❌ Можно загрузить максимум 15 фото");
//       return;
//     }
  
//     const allowedCount = 15 - images.length;
//     const filesToAdd = files.slice(0, allowedCount);
  
//     if (files.length > allowedCount) {
//       setMessage(`⚠️ Можно добавить только ${allowedCount} фото`);
//     } else {
//       setMessage('');
//     }
  
//     const newImages = filesToAdd.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
  
//     setImages((prev) => [...prev, ...newImages]);
//     // setCurrentIndex(0);
//     setCurrentIndex((prev) => images.length + newImages.length - 1);
//     console.log(filesToAdd);
//     uploadFiles(filesToAdd);
//   };
  

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(Math.max(0, updatedImages.length - 1));
//     }
//   };

//   const handleNext = () => {
//     if (images.length === 0) return;
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     if (images.length === 0) return;
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   // Добавляем обработчики свайпа
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true, // чтобы можно было тестировать на ПК мышью
//   });

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, textAlign: 'center' }}>
//       <Typography variant="h4" gutterBottom>
//         {t.uploadFiles}
//       </Typography>

//       <input
//         accept="image/*"
//         id="file-upload"
//         multiple
//         type="file"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />
//       {/* <label htmlFor="file-upload">
//         <Button variant="contained" color="primary" component="span">
//           {t.addPhotos}
//         </Button>
//       </label> */}


// <Box>
//   <label htmlFor="file-upload">
//     <Button
//       variant="contained"
//       color="primary"
//       component="span"
//       disabled={images.length >= 15}
//     >
//       {t.addPhotos}
//     </Button>
//   </label>

//   {images.length >= 15 && (
//     <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
//       Ви досягли ліміту в 15 фото ✅
//     </Typography>
//   )}
// </Box>


//       {images.length > 0 && (
//         <Box mt={4}>
//           <Box
//             {...swipeHandlers} // Вешаем обработчики свайпа сюда
//             sx={{
//               position: 'relative',
//               height: 600,
//               borderRadius: 2,
//               boxShadow: 3,
//               overflow: 'hidden',
//               '&:hover .nav-arrow': { opacity: 1 },
//               touchAction: 'pan-y', // Чтобы вертикальная прокрутка работала нормально
//             }}
//           >
//             <Box
//               key={currentIndex}
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//               }}
//             >
//               <img
//                 src={images[currentIndex].preview}
//                 alt={`${t.photos} ${currentIndex + 1}`}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   borderRadius: '12px',
//                   userSelect: 'none',
//                   pointerEvents: 'none', // чтобы свайпы точно не конфликтовали с кликами
//                 }}
//                 draggable={false} // отключаем перетаскивание браузером
//               />
//             </Box>

//             <IconButton
//               onClick={() => handleDelete(currentIndex)}
//               sx={{
//                 position: 'absolute',
//                 top: 8,
//                 right: 8,
//                 bgcolor: 'error.main',
//                 color: 'common.white',
//                 '&:hover': { bgcolor: 'error.dark' },
//               }}
//             >
//               <DeleteIcon />
//             </IconButton>

//             <IconButton
//               className="nav-arrow"
//               onClick={handlePrev}
//               sx={{
//                 position: 'absolute',
//                 left: 16,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(255, 255, 255, 0.8)',
//                 color: 'primary.main',
//                 opacity: 0.7,
//                 transition: 'opacity 0.3s',
//                 '&:hover': {
//                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                   opacity: 1,
//                 },
//               }}
//             >
//               <ArrowBackIosNewIcon fontSize="large" />
//             </IconButton>

//             <IconButton
//               className="nav-arrow"
//               onClick={handleNext}
//               sx={{
//                 position: 'absolute',
//                 right: 16,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(255, 255, 255, 0.8)',
//                 color: 'primary.main',
//                 opacity: 0.7,
//                 transition: 'opacity 0.3s',
//                 '&:hover': {
//                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                   opacity: 1,
//                 },
//               }}
//             >
//               <ArrowForwardIosIcon fontSize="large" />
//             </IconButton>

//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 16,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 bgcolor: 'rgba(0, 0, 0, 0.5)',
//                 color: 'white',
//                 px: 2,
//                 py: 1,
//                 borderRadius: 4,
//                 fontSize: '0.9rem',
//               }}
//             >
//               {currentIndex + 1} / {images.length}
//             </Box>

//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 left: 8,
//                 width: 120,
//                 opacity: 0.7,
//               }}
//             >
//               <Logo />
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {message && (
//         <Typography variant="body2" color="text.secondary" mt={3}>
//           {message}
//         </Typography>
//       )}
//     </Box>
//   );
// }







// работает) загрузка фото по 1

// етот код отправки фото на сервер  работает, но не так как мне надо выглядет фото и инфа!

// 'use client';

// import React, { useState } from 'react';
// import { useLanguage } from '@/app/LanguageContext';
// import { Button, Typography, Box, IconButton } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Logo from './Logo';
// import { useSwipeable } from 'react-swipeable';
// import { useEffect } from 'react';

// const translations = {
//   ru: {
//     addPhotos: 'Добавить фото',
//     uploadFiles: 'Загрузить фото объекта',
//     filesUploaded: '✅ Файлы загружены!',
//     selectFiles: 'Пожалуйста, выберите файл(ы)',
//     uploadError: '❌ Ошибка при загрузке',
//     photos: 'Фото',
//   },
//   ua: {
//     addPhotos: 'Додати фото',
//     uploadFiles: "Завантажити фото об'єкта",
//     filesUploaded: '✅ Файли завантажено!',
//     selectFiles: 'Будь ласка, оберіть файл(и)',
//     uploadError: '❌ Помилка при завантаженні',
//     photos: 'Фото',
//   },
// };
// // setUploudImages-поменял на setUploadImages 
// export default function FileUploadSlider({ setUploadImages , onValidationChange }) {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage] || translations.ru;

//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const uploadFiles = async (files) => {
//     if (files.length === 0) {
//       setMessage(t.selectFiles);
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append('file', file));

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(t.filesUploaded);
//         const uploadedUrls = Array.isArray(data.url) ? data.url : [data.url];
//         setUploadImages((prev) => [...prev, ...uploadedUrls]);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(t.uploadError);
//     }
//   };

//   // const handleFileChange = (e) => {
//   //   const files = Array.from(e.target.files);
//   //   const newImages = files.map((file) => ({
//   //     file,
//   //     preview: URL.createObjectURL(file),
//   //   }));

//   //   setImages((prev) => [...prev, ...newImages]);
//   //   setCurrentIndex(0);
//   //   uploadFiles(files);
//   // };


//   useEffect(() => {
//     const isValid = images.length >= 3;
//     if (onValidationChange) {
//       onValidationChange(isValid);
//     }
//   }, [images]);

//   const handleFileChange = (e) => {
//     console.log(e.target.files);

//     const files = Array.from(e.target.files);
  
//     if (images.length >= 15) {
//       setMessage("❌ Можно загрузить максимум 15 фото");
//       return;
//     }
  
//     const allowedCount = 15 - images.length;
//     const filesToAdd = files.slice(0, allowedCount);
  
//     if (files.length > allowedCount) {
//       setMessage(`⚠️ Можно добавить только ${allowedCount} фото`);
//     } else {
//       setMessage('');
//     }
  
//     const newImages = filesToAdd.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
  
//     setImages((prev) => [...prev, ...newImages]);
//     // setCurrentIndex(0);
//     setCurrentIndex((prev) => images.length + newImages.length - 1);
//     console.log(filesToAdd);
//     uploadFiles(filesToAdd);
//   };
  

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(Math.max(0, updatedImages.length - 1));
//     }
//   };

//   const handleNext = () => {
//     if (images.length === 0) return;
//     setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
//   };

//   const handlePrev = () => {
//     if (images.length === 0) return;
//     setCurrentIndex((prevIndex) =>
//       (prevIndex - 1 + images.length) % images.length
//     );
//   };

//   // Добавляем обработчики свайпа
//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true, // чтобы можно было тестировать на ПК мышью
//   });

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, textAlign: 'center' }}>
//       <Typography variant="h4" gutterBottom>
//         {t.uploadFiles}
//       </Typography>

//       <input
//         accept="image/*"
//         id="file-upload"
//         multiple
//         type="file"
//         onChange={handleFileChange}
//         style={{ display: 'none' }}
//       />
//       {/* <label htmlFor="file-upload">
//         <Button variant="contained" color="primary" component="span">
//           {t.addPhotos}
//         </Button>
//       </label> */}


// <Box>
//   <label htmlFor="file-upload">
//     <Button
//       variant="contained"
//       color="primary"
//       component="span"
//       disabled={images.length >= 15}
//     >
//       {t.addPhotos}
//     </Button>
//   </label>

//   {images.length >= 15 && (
//     <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
//       Ви досягли ліміту в 15 фото ✅
//     </Typography>
//   )}
// </Box>


//       {images.length > 0 && (
//         <Box mt={4}>
//           <Box
//             {...swipeHandlers} // Вешаем обработчики свайпа сюда
//             sx={{
//               position: 'relative',
//               height: 600,
//               borderRadius: 2,
//               boxShadow: 3,
//               overflow: 'hidden',
//               '&:hover .nav-arrow': { opacity: 1 },
//               touchAction: 'pan-y', // Чтобы вертикальная прокрутка работала нормально
//             }}
//           >
//             <Box
//               key={currentIndex}
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 position: 'absolute',
//                 top: 0,
//                 left: 0,
//               }}
//             >
//               <img
//                 src={images[currentIndex].preview}
//                 alt={`${t.photos} ${currentIndex + 1}`}
//                 style={{
//                   width: '100%',
//                   height: '100%',
//                   objectFit: 'cover',
//                   borderRadius: '12px',
//                   userSelect: 'none',
//                   pointerEvents: 'none', // чтобы свайпы точно не конфликтовали с кликами
//                 }}
//                 draggable={false} // отключаем перетаскивание браузером
//               />
//             </Box>

//             <IconButton
//               onClick={() => handleDelete(currentIndex)}
//               sx={{
//                 position: 'absolute',
//                 top: 8,
//                 right: 8,
//                 bgcolor: 'error.main',
//                 color: 'common.white',
//                 '&:hover': { bgcolor: 'error.dark' },
//               }}
//             >
//               <DeleteIcon />
//             </IconButton>

//             <IconButton
//               className="nav-arrow"
//               onClick={handlePrev}
//               sx={{
//                 position: 'absolute',
//                 left: 16,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(255, 255, 255, 0.8)',
//                 color: 'primary.main',
//                 opacity: 0.7,
//                 transition: 'opacity 0.3s',
//                 '&:hover': {
//                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                   opacity: 1,
//                 },
//               }}
//             >
//               <ArrowBackIosNewIcon fontSize="large" />
//             </IconButton>

//             <IconButton
//               className="nav-arrow"
//               onClick={handleNext}
//               sx={{
//                 position: 'absolute',
//                 right: 16,
//                 top: '50%',
//                 transform: 'translateY(-50%)',
//                 bgcolor: 'rgba(255, 255, 255, 0.8)',
//                 color: 'primary.main',
//                 opacity: 0.7,
//                 transition: 'opacity 0.3s',
//                 '&:hover': {
//                   bgcolor: 'rgba(255, 255, 255, 0.9)',
//                   opacity: 1,
//                 },
//               }}
//             >
//               <ArrowForwardIosIcon fontSize="large" />
//             </IconButton>

//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 16,
//                 left: '50%',
//                 transform: 'translateX(-50%)',
//                 bgcolor: 'rgba(0, 0, 0, 0.5)',
//                 color: 'white',
//                 px: 2,
//                 py: 1,
//                 borderRadius: 4,
//                 fontSize: '0.9rem',
//               }}
//             >
//               {currentIndex + 1} / {images.length}
//             </Box>

//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 left: 8,
//                 width: 120,
//                 opacity: 0.7,
//               }}
//             >
//               <Logo />
//             </Box>
//           </Box>
//         </Box>
//       )}

//       {message && (
//         <Typography variant="body2" color="text.secondary" mt={3}>
//           {message}
//         </Typography>
//       )}
//     </Box>
//   );
// }









// 'use client';

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { 
//   Box, 
//   IconButton, 
//   Typography, 
//   Button, 
//   Avatar, 
//   Divider,
//   Input,
//   CircularProgress
// } from '@mui/material';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import DeleteIcon from '@mui/icons-material/Delete';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import PhoneIcon from '@mui/icons-material/Phone';
// import { useSwipeable } from 'react-swipeable';
// import ReportIcon from '@mui/icons-material/Report';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import HelpIcon from '@mui/icons-material/Help';

// const MAX_PHOTOS = 15;
// const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];

// const FileUploadSlider = ({ 
//   photos = [], 
//   onDelete, 
//   setUploadImages,
//   price = '0', 
//   name = 'Имя не указано', 
//   phones = [], 
//   address = '',
//   category = '',
//   editable = false,
//   onPhotosChange
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [localPhotos, setLocalPhotos] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const fileInputRef = useRef(null);
//   const thumbnailsRef = useRef(null);

//   // Handle thumbnail scrolling
//   useEffect(() => {
//     if (thumbnailsRef.current && localPhotos.length > 0) {
//       const thumbWidth = parseInt(sizes.thumbnails.width);
//       const gap = parseInt(sizes.thumbnails.gap);
//       const scrollPos = currentIndex * (thumbWidth + gap) - (thumbnailsRef.current.offsetWidth / 2) + (thumbWidth / 2);
      
//       thumbnailsRef.current.scrollTo({
//         left: scrollPos,
//         behavior: 'smooth'
//       });
//     }
//   }, [currentIndex, localPhotos.length]);

//   // Initialize photos
//   useEffect(() => {
//     if (!Array.isArray(photos)) {
//       setLocalPhotos([]);
//       return;
//     }

//     const processedPhotos = photos.map(photo => {
//       if (typeof photo === 'string') {
//         return { 
//           url: photo, 
//           file: null, 
//           id: `ext-${Math.random().toString(36).substring(2, 9)}` 
//         };
//       }
//       return null;
//     }).filter(Boolean);

//     setLocalPhotos(processedPhotos);
//   }, [photos]);

//   const uploadFiles = async (files) => {
//     if (files.length === 0) {
//       setMessage('Пожалуйста, выберите файл(ы)');
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append('file', file));

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Файлы загружены!');
//         const uploadedUrls = Array.isArray(data.url) ? data.url : [data.url];
        
//         // Create new photo objects with URLs
//         const newPhotos = uploadedUrls.map(url => ({
//           url,
//           file: null,
//           id: `uploaded-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
//         }));

//         // Update local photos state
//         const updatedPhotos = [...localPhotos, ...newPhotos];
//         setLocalPhotos(updatedPhotos);
//         setCurrentIndex(updatedPhotos.length - 1);

//         // Update parent component with URLs
//         if (setUploadImages) {
//           setUploadImages(updatedPhotos.map(photo => photo.url));
//         }

//         if (onPhotosChange) {
//           onPhotosChange(updatedPhotos.length);
//         }
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Ошибка при загрузке');
//     } finally {
//       setIsLoading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const handleFileUpload = useCallback((e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     // Check photo limit
//     if (localPhotos.length + files.length > MAX_PHOTOS) {
//       setMessage(`❌ Можно загрузить максимум ${MAX_PHOTOS} фото`);
//       return;
//     }

//     const allowedCount = MAX_PHOTOS - localPhotos.length;
//     const filesToAdd = files.slice(0, allowedCount);

//     if (files.length > allowedCount) {
//       setMessage(`⚠️ Можно добавить только ${allowedCount} фото`);
//     } else {
//       setMessage('');
//     }

//     setIsLoading(true);
//     uploadFiles(filesToAdd);
//   }, [localPhotos]);

//   const handleDeletePhoto = useCallback((index) => {
//     const newPhotos = localPhotos.filter((_, i) => i !== index);
//     setLocalPhotos(newPhotos);
    
//     if (setUploadImages) {
//       setUploadImages(newPhotos.map(photo => photo.url));
//     }
   
//     if (onPhotosChange) {
//       onPhotosChange(newPhotos.length);
//     }

//     // Adjust current index
//     setCurrentIndex(prev => {
//       if (prev >= newPhotos.length) return Math.max(0, newPhotos.length - 1);
//       if (prev === index && index > 0) return index - 1;
//       return prev;
//     });
//   }, [localPhotos, setUploadImages, onPhotosChange]);

//   const handleNext = useCallback(() => {
//     if (localPhotos.length <= 1) return;
//     setCurrentIndex(prev => (prev + 1) % localPhotos.length);
//   }, [localPhotos.length]);
  
//   const handlePrev = useCallback(() => {
//     if (localPhotos.length <= 1) return;
//     setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
//   }, [localPhotos.length]);

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   const getSafePhone = useCallback(() => {
//     try {
//       if (!Array.isArray(phones)) return '+380XXXXXXXXX';
//       const firstPhone = phones[0];
//       return typeof firstPhone === 'string' ? firstPhone : '+380XXXXXXXXX';
//     } catch {
//       return '+380XXXXXXXXX';
//     }
//   }, [phones]);

//   const currentPhone = getSafePhone();
//   const isHourly = category?.toLowerCase().includes('сауна') || 
//                   category?.toLowerCase().includes('баня');

//   const sizes = {
//     main: { height: '500px', width: '850px' },
//     thumbnails: { width: '273.4px', height: '250px', gap: '10px' }
//   };

//   return (
//     <Box sx={{ 
//       display: 'flex',
//       width: '100%',
//       maxWidth: '1200px',
//       mx: 'auto',
//       mb: 3,
//       borderRadius: 2,
//       overflow: 'hidden',
//       boxShadow: 3,
//     }}>
//       {/* Photo block */}
//       <Box sx={{ 
//         width: sizes.main.width,
//         flexShrink: 0,
//         position: 'relative',
//       }}>
//         {/* Hidden file input */}
//         <Input
//           inputRef={fileInputRef}
//           type="file"
//           onChange={handleFileUpload}
//           inputProps={{ 
//             accept: ALLOWED_FILE_TYPES.join(','), 
//             multiple: true 
//           }}
//           sx={{ display: 'none' }}
//         />

//         {/* Add photo button */}
//         {editable && (
//           <Box sx={{ 
//             display: 'flex',
//             justifyContent: 'center',
//             p: 2,
//             bgcolor: '#f0f0f0'
//           }}>
//             <Button
//               variant="contained"
//               startIcon={<AddPhotoAlternateIcon />}
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isLoading || localPhotos.length >= MAX_PHOTOS}
//             >
//               {isLoading ? (
//                 <>
//                   <CircularProgress size={24} sx={{ mr: 1 }} />
//                   Загрузка...
//                 </>
//               ) : `Завантажити фото (${localPhotos.length}/${MAX_PHOTOS})`}
//             </Button>
//           </Box>
//         )}

//         {/* Main photo */}
//         {localPhotos.length > 0 ? (
//           <Box {...swipeHandlers} sx={{
//             width: '100%',
//             height: sizes.main.height,
//             position: 'relative',
//             overflow: 'hidden',
//           }}>
//             <img
//               src={localPhotos[currentIndex]?.url}
//               alt={`Фото ${currentIndex + 1}`}
//               style={{ 
//                 width: '100%', 
//                 height: '100%', 
//                 objectFit: 'cover',
//                 display: 'block'
//               }}
//             />

//             {localPhotos.length > 1 && (
//               <>
//                 <IconButton 
//                   onClick={handlePrev} 
//                   sx={{ 
//                     position: 'absolute', 
//                     left: 16, 
//                     top: '50%', 
//                     transform: 'translateY(-50%)', 
//                     bgcolor: 'rgba(255,255,255,0.9)' 
//                   }}
//                 >
//                   <ArrowBackIosNewIcon />
//                 </IconButton>
//                 <IconButton 
//                   onClick={handleNext} 
//                   sx={{ 
//                     position: 'absolute', 
//                     right: 16, 
//                     top: '50%', 
//                     transform: 'translateY(-50%)', 
//                     bgcolor: 'rgba(255,255,255,0.9)' 
//                   }}
//                 >
//                   <ArrowForwardIosIcon />
//                 </IconButton>
//               </>
//             )}

//             <Box sx={{
//               position: 'absolute',
//               bottom: 20,
//               right: 20,
//               bgcolor: 'rgba(0,0,0,0.7)',
//               color: 'white',
//               px: 2,
//               py: 1,
//               borderRadius: 4,
//             }}>
//               {currentIndex + 1}/{localPhotos.length}
//             </Box>

//             {editable && (
//               <IconButton
//                 onClick={() => handleDeletePhoto(currentIndex)}
//                 sx={{
//                   position: 'absolute',
//                   top: 10,
//                   right: 10,
//                   bgcolor: 'error.main',
//                   color: 'white',
//                   '&:hover': { bgcolor: 'error.dark' }
//                 }}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             )}
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               width: '100%',
//               height: sizes.main.height,
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#f5f5f5',
//               border: editable ? '2px dashed #ccc' : 'none',
//             }}
//           >
//             {isLoading ? (
//               <CircularProgress size={60} />
//             ) : (
//               <Typography variant="h6" color="text.secondary" align="center">
//                 {editable ? 'Добавьте фотографии, нажав кнопку выше' : 'Фото отсутствуют'}
//               </Typography>
//             )}
//           </Box>
//         )}

//         {/* Thumbnails */}
//         {localPhotos.length > 0 && (
//           <Box 
//             ref={thumbnailsRef}
//             sx={{
//               display: 'flex',
//               gap: sizes.thumbnails.gap,
//               pt: 1.25,
//               overflowX: 'auto',
//               scrollBehavior: 'smooth',
//               '&::-webkit-scrollbar': {
//                 height: '6px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: '#888',
//                 borderRadius: '3px',
//               },
//             }}
//           >
//             {localPhotos.map((photo, index) => (
//               <Box
//                 key={photo.id}
//                 onClick={() => setCurrentIndex(index)}
//                 sx={{
//                   width: sizes.thumbnails.width,
//                   height: sizes.thumbnails.height,
//                   flexShrink: 0,
//                   cursor: 'pointer',
//                   border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
//                   borderRadius: 1,
//                   overflow: 'hidden',
//                   position: 'relative'
//                 }}
//               >
//                 <img
//                   src={photo.url}
//                   alt={`Миниатюра ${index + 1}`}
//                   style={{ width: '100%', height: '100%', objectFit: 'cover' }}
//                 />
//                 {editable && (
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       handleDeletePhoto(index);
//                     }}
//                     sx={{
//                       position: 'absolute',
//                       top: 4,
//                       right: 4,
//                       bgcolor: 'error.main',
//                       color: 'white',
//                       '&:hover': { bgcolor: 'error.dark' }
//                     }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 )}
//               </Box>
//             ))}
//           </Box>
//         )}

//         {/* Status message */}
//         {message && (
//           <Typography variant="body2" color="text.secondary" mt={1} textAlign="center">
//             {message}
//           </Typography>
//         )}
//       </Box>

//       {/* Info block */}
//       <Box sx={{
//         width: '300px',
//         flexShrink: 0,
//         p: 3,
//         bgcolor: '#f9f9f9',
//         display: 'flex',
//         flexDirection: 'column',
//       }}>
//         {/* Price */}
//         <Box sx={{ 
//           mb: 3,
//           backgroundColor: '#f0f8ff',
//           p: 2,
//           borderRadius: 1,
//           border: '1px solid #e0e0e0'
//         }}>
//           <Typography variant="h6" sx={{ 
//             fontWeight: 'bold',
//             color: 'text.secondary',
//             mb: 1,
//             fontSize: '1rem',
//             textTransform: 'uppercase'
//           }}>
//             Ціна оренди
//           </Typography>
//           <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
//             <Typography variant="h4" sx={{ 
//               fontWeight: 'bold',
//               color: 'primary.main',
//               fontSize: '2.7rem',
//               mr: 1
//             }}>
//               {price}
//             </Typography>
//             <Typography variant="body1" sx={{ 
//               color: 'text.secondary',
//               fontSize: '1.3rem'
//             }}>
//               {isHourly ? 'грн./година' : 'грн./доба'}
//             </Typography>
//           </Box>
//         </Box>

//         {/* Contacts */}
//         <Box sx={{ 
//           mb: 3,
//           backgroundColor: '#f5eee0',
//           p: 2,
//           borderRadius: 1,
//           border: '1px solid #e0e0e0'
//         }}>
//           <Typography variant="h6" sx={{ 
//             fontWeight: 'bold',
//             mb: 1.5,
//             fontSize: '1.1rem'
//           }}>
//             {name}
//           </Typography>
          
//           <Typography variant="body1" sx={{ 
//             mb: 2,
//             fontSize: '1.1rem',
//             color: 'text.secondary'
//           }}>
//             Зателефонуйте власнику, щоб уточнити всі деталі оренди.
//           </Typography>

//           <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center',
//             gap: 2,
//             p: 1.5,
//             bgcolor: '#f5f5f5',
//             borderRadius: 1,
//           }}>
//             <Avatar 
//               sx={{ 
//                 bgcolor: 'primary.main', 
//                 width: 36, 
//                 height: 36,
//                 cursor: 'pointer'
//               }}
//               onClick={() => window.open(`tel:${currentPhone.replace(/\D/g, '')}`)}
//             >
//               <PhoneIcon fontSize="small" />
//             </Avatar>
//             <Typography
//               component="a"
//               href={`tel:${currentPhone.replace(/\D/g, '')}`}
//               sx={{
//                 color: 'primary.main',
//                 textDecoration: 'none',
//                 '&:hover': { textDecoration: 'underline' },
//                 cursor: 'pointer',
//                 fontSize: '1rem',
//                 fontWeight: 'bold',
//                 display: 'block',
//               }}
//             >
//               {currentPhone}
//             </Typography>
//           </Box>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {/* Action buttons */}
//         <Box sx={{ mt: 'auto' }}>
//           <Button 
//             variant="outlined" 
//             startIcon={<ReportIcon />}
//             fullWidth
//             sx={{ 
//               mb: 1.5, 
//               justifyContent: 'flex-start',
//               py: 1.2,
//               fontSize: '0.8rem',
//               borderRadius: 1,
//             }}
//           >
//             Сообщить о неактуальной информации
//           </Button>
//           <Button 
//             variant="outlined" 
//             startIcon={<FeedbackIcon />}
//             fullWidth
//             sx={{ 
//               mb: 1.5, 
//               justifyContent: 'flex-start',
//               py: 1.2,
//               fontSize: '0.8rem',
//               borderRadius: 1,
//             }}
//           >
//             Оставить отзыв о жилье
//           </Button>
//           <Button 
//             variant="outlined" 
//             startIcon={<HelpIcon />}
//             fullWidth
//             sx={{ 
//               justifyContent: 'flex-start',
//               py: 1.2,
//               fontSize: '0.8rem',
//               borderRadius: 1,
//             }}
//           >
//             У меня возникли сложности при проживании
//           </Button>
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default FileUploadSlider;



'use client';

import React, { useState, useRef, useEffect, useCallback } from 'react';
import { 
  Box, 
  IconButton, 
  Typography, 
  Button, 
  Avatar, 
  Divider,
  Input,
  CircularProgress
} from '@mui/material';
import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
import DeleteIcon from '@mui/icons-material/Delete';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import PhoneIcon from '@mui/icons-material/Phone';
import { useSwipeable } from 'react-swipeable';
import ReportIcon from '@mui/icons-material/Report';
import FeedbackIcon from '@mui/icons-material/Feedback';
import HelpIcon from '@mui/icons-material/Help';

const MAX_PHOTOS = 15;
const MAX_FILE_SIZE_MB = 100;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

const FileUploadSlider = ({ 
  photos = [], 
  onDelete, 
  setUploadImages,
  price = '0', 
  name = 'Имя не указано', 
  phones = [], 
  address = '',
  category = '',
  editable = false,
  onPhotosChange
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localPhotos, setLocalPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const fileInputRef = useRef(null);
  const thumbnailsRef = useRef(null);

  // Handle thumbnail scrolling
  useEffect(() => {
    if (thumbnailsRef.current && localPhotos.length > 0) {
      const thumbWidth = 273.4;
      const gap = 10;
      const scrollPos = currentIndex * (thumbWidth + gap) - (thumbnailsRef.current.offsetWidth / 2) + (thumbWidth / 2);
      
      thumbnailsRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, localPhotos.length]);

  // Initialize photos
  useEffect(() => {
    if (!Array.isArray(photos)) {
      setLocalPhotos([]);
      return;
    }

    const processedPhotos = photos.map(photo => {
      if (typeof photo === 'string') {
        return { 
          url: photo, 
          file: null, 
          id: `ext-${Math.random().toString(36).substring(2, 9)}` 
        };
      }
      return null;
    }).filter(Boolean);

    setLocalPhotos(processedPhotos);
  }, [photos]);

  const uploadFiles = async (files) => {
    if (files.length === 0) {
      setMessage('Пожалуйста, выберите файл(ы)');
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('files', file));

    try {
      setIsLoading(true);
      const res = await fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Файлы загружены!');
        const uploadedUrls = Array.isArray(data.urls) ? data.urls : [data.url];
        
        const newPhotos = uploadedUrls.map(url => ({
          url,
          file: null,
          id: `uploaded-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
        }));

        const updatedPhotos = [...localPhotos, ...newPhotos];
        setLocalPhotos(updatedPhotos);
        setCurrentIndex(updatedPhotos.length - 1);

        if (setUploadImages) {
          setUploadImages(updatedPhotos.map(photo => photo.url));
        }

        if (onPhotosChange) {
          onPhotosChange(updatedPhotos.length);
        }
      } else {
        setMessage(`❌ Ошибка: ${data.error || 'Неизвестная ошибка сервера'}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Ошибка при загрузке файлов');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Проверка типа файлов
    const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      setMessage(`❌ Недопустимый формат файлов: ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Проверка размера файлов
    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE_BYTES);
    if (oversizedFiles.length > 0) {
      setMessage(`❌ Некоторые файлы превышают ${MAX_FILE_SIZE_MB}MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    // Проверка лимита фото
    if (localPhotos.length + files.length > MAX_PHOTOS) {
      setMessage(`❌ Можно загрузить максимум ${MAX_PHOTOS} фото`);
      return;
    }

    const allowedCount = MAX_PHOTOS - localPhotos.length;
    const filesToAdd = files.slice(0, allowedCount);

    if (files.length > allowedCount) {
      setMessage(`⚠️ Можно добавить только ${allowedCount} фото`);
    } else {
      setMessage('');
    }

    uploadFiles(filesToAdd);
  }, [localPhotos]);

  const handleDeletePhoto = useCallback((index) => {
    const newPhotos = [...localPhotos];
    newPhotos.splice(index, 1);
    setLocalPhotos(newPhotos);
    
    if (setUploadImages) {
      setUploadImages(newPhotos.map(photo => photo.url));
    }
   
    if (onPhotosChange) {
      onPhotosChange(newPhotos.length);
    }

    setCurrentIndex(prev => {
      if (prev >= newPhotos.length) return Math.max(0, newPhotos.length - 1);
      if (prev === index && index > 0) return index - 1;
      return prev;
    });
  }, [localPhotos, setUploadImages, onPhotosChange]);

  const handleNext = useCallback(() => {
    setCurrentIndex(prev => (prev + 1) % localPhotos.length);
  }, [localPhotos.length]);
  
  const handlePrev = useCallback(() => {
    setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
  }, [localPhotos.length]);

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  const getSafePhone = useCallback(() => {
    try {
      if (!Array.isArray(phones)) return '+380XXXXXXXXX';
      const firstPhone = phones[0];
      return typeof firstPhone === 'string' ? firstPhone : '+380XXXXXXXXX';
    } catch {
      return '+380XXXXXXXXX';
    }
  }, [phones]);

  const currentPhone = getSafePhone();
  const isHourly = category?.toLowerCase().includes('сауна') || 
                  category?.toLowerCase().includes('баня');

  return (
    <Box sx={{ 
      display: 'flex',
      width: '100%',
      maxWidth: '1200px',
      mx: 'auto',
      mb: 3,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
    }}>
      {/* Photo block */}
      <Box sx={{ 
        width: '850px',
        flexShrink: 0,
        position: 'relative',
      }}>
        {/* Hidden file input */}
        <Input
          inputRef={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          inputProps={{ 
            accept: ALLOWED_FILE_TYPES.join(','), 
            multiple: true 
          }}
          sx={{ display: 'none' }}
        />

        {/* Add photo button */}
        {editable && (
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            p: 2,
            bgcolor: '#f0f0f0'
          }}>
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || localPhotos.length >= MAX_PHOTOS}
              sx={{ minWidth: '300px' }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Загрузка...
                </>
              ) : `Добавить фото (${localPhotos.length}/${MAX_PHOTOS})`}
            </Button>
          </Box>
        )}

        {/* Main photo */}
        {localPhotos.length > 0 ? (
          <Box {...swipeHandlers} sx={{
            width: '100%',
            height: '500px',
            position: 'relative',
            overflow: 'hidden',
          }}>
            <img
              src={localPhotos[currentIndex]?.url}
              alt={`Фото ${currentIndex + 1}`}
              style={{ 
                width: '100%', 
                height: '100%', 
                objectFit: 'cover',
                display: 'block'
              }}
            />

            {localPhotos.length > 1 && (
              <>
                <IconButton 
                  onClick={handlePrev} 
                  sx={{ 
                    position: 'absolute', 
                    left: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    bgcolor: 'rgba(255,255,255,0.9)' 
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton 
                  onClick={handleNext} 
                  sx={{ 
                    position: 'absolute', 
                    right: 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    bgcolor: 'rgba(255,255,255,0.9)' 
                  }}
                >
                  <ArrowForwardIosIcon />
                </IconButton>
              </>
            )}

            <Box sx={{
              position: 'absolute',
              bottom: 20,
              right: 20,
              bgcolor: 'rgba(0,0,0,0.7)',
              color: 'white',
              px: 2,
              py: 1,
              borderRadius: 4,
            }}>
              {currentIndex + 1}/{localPhotos.length}
            </Box>

            {editable && (
              <IconButton
                onClick={() => handleDeletePhoto(currentIndex)}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'error.main',
                  color: 'white',
                  '&:hover': { bgcolor: 'error.dark' }
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              border: editable ? '2px dashed #ccc' : 'none',
            }}
          >
            {isLoading ? (
              <CircularProgress size={60} />
            ) : (
              <Typography variant="h6" color="text.secondary" align="center">
                {editable ? 'Добавьте фотографии, нажав кнопку выше' : 'Фото отсутствуют'}
              </Typography>
            )}
          </Box>
        )}

        {/* Thumbnails */}
        {localPhotos.length > 0 && (
          <Box 
            ref={thumbnailsRef}
            sx={{
              display: 'flex',
              gap: '10px',
              pt: 1.25,
              pb: 1,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: '#888',
                borderRadius: '3px',
              },
            }}
          >
            {localPhotos.map((photo, index) => (
              <Box
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: '273.4px',
                  height: '250px',
                  flexShrink: 0,
                  cursor: 'pointer',
                  border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative',
                  transition: 'border 0.2s ease'
                }}
              >
                <img
                  src={photo.url}
                  alt={`Миниатюра ${index + 1}`}
                  style={{ width: '100%', height: '100%', objectFit: 'cover' }}
                />
                {editable && (
                  <IconButton
                    onClick={(e) => {
                      e.stopPropagation();
                      handleDeletePhoto(index);
                    }}
                    sx={{
                      position: 'absolute',
                      top: 4,
                      right: 4,
                      bgcolor: 'error.main',
                      color: 'white',
                      '&:hover': { bgcolor: 'error.dark' }
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}

        {/* Status message */}
        {message && (
          <Typography variant="body2" color={message.includes('❌') ? 'error' : 'text.secondary'} 
            mt={1} mb={1} textAlign="center">
            {message}
          </Typography>
        )}
      </Box>

      {/* Info block */}
      <Box sx={{
        width: '300px',
        flexShrink: 0,
        p: 3,
        bgcolor: '#f9f9f9',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Price */}
        <Box sx={{ 
          mb: 3,
          backgroundColor: '#f0f8ff',
          p: 2,
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            color: 'text.secondary',
            mb: 1,
            fontSize: '1rem',
            textTransform: 'uppercase'
          }}>
            Ціна оренди
          </Typography>
          <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
            <Typography variant="h4" sx={{ 
              fontWeight: 'bold',
              color: 'primary.main',
              fontSize: '2.7rem',
              mr: 1
            }}>
              {price}
            </Typography>
            <Typography variant="body1" sx={{ 
              color: 'text.secondary',
              fontSize: '1.3rem'
            }}>
              {isHourly ? 'грн./година' : 'грн./доба'}
            </Typography>
          </Box>
        </Box>

        {/* Contacts */}
        <Box sx={{ 
          mb: 3,
          backgroundColor: '#f5eee0',
          p: 2,
          borderRadius: 1,
          border: '1px solid #e0e0e0'
        }}>
          <Typography variant="h6" sx={{ 
            fontWeight: 'bold',
            mb: 1.5,
            fontSize: '1.1rem'
          }}>
            {name}
          </Typography>
          
          <Typography variant="body1" sx={{ 
            mb: 2,
            fontSize: '1.1rem',
            color: 'text.secondary'
          }}>
            Зателефонуйте власнику, щоб уточнити всі деталі оренди.
          </Typography>

          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center',
            gap: 2,
            p: 1.5,
            bgcolor: '#f5f5f5',
            borderRadius: 1,
          }}>
            <Avatar 
              sx={{ 
                bgcolor: 'primary.main', 
                width: 36, 
                height: 36,
                cursor: 'pointer'
              }}
              onClick={() => window.open(`tel:${currentPhone.replace(/\D/g, '')}`)}
            >
              <PhoneIcon fontSize="small" />
            </Avatar>
            <Typography
              component="a"
              href={`tel:${currentPhone.replace(/\D/g, '')}`}
              sx={{
                color: 'primary.main',
                textDecoration: 'none',
                '&:hover': { textDecoration: 'underline' },
                cursor: 'pointer',
                fontSize: '1rem',
                fontWeight: 'bold',
                display: 'block',
              }}
            >
              {currentPhone}
            </Typography>
          </Box>
        </Box>

        <Divider sx={{ my: 2 }} />

        {/* Action buttons */}
        <Box sx={{ mt: 'auto' }}>
          <Button 
            variant="outlined" 
            startIcon={<ReportIcon />}
            fullWidth
            sx={{ 
              mb: 1.5, 
              justifyContent: 'flex-start',
              py: 1.2,
              fontSize: '0.8rem',
              borderRadius: 1,
            }}
          >
            Сообщить о неактуальной информации
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<FeedbackIcon />}
            fullWidth
            sx={{ 
              mb: 1.5, 
              justifyContent: 'flex-start',
              py: 1.2,
              fontSize: '0.8rem',
              borderRadius: 1,
            }}
          >
            Оставить отзыв о жилье
          </Button>
          <Button 
            variant="outlined" 
            startIcon={<HelpIcon />}
            fullWidth
            sx={{ 
              justifyContent: 'flex-start',
              py: 1.2,
              fontSize: '0.8rem',
              borderRadius: 1,
            }}
          >
            У меня возникли сложности при проживании
          </Button>
        </Box>
      </Box>
    </Box>
  );
};

export default FileUploadSlider;