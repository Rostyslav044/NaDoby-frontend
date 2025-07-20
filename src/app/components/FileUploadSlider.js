



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

// import React, { useState } from 'react';
// import { Box, IconButton, Typography } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useSwipeable } from 'react-swipeable';

// const FileUploadSlider = ({ photos = [], onDelete }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showThumbnails, setShowThumbnails] = useState(true);

//   // Настройки размеров
//   const sizes = {
//     main: {
//       height: '500px', // Высота основного фото
//       width: '900px',  // Ширина основного фото
//     },
//     thumbnails: {
//       width: '290px',  // Ширина миниатюр
//       height: '300px',  // Высота миниатюр
//       gap: '10px',     // Расстояние между миниатюрами
//     },
//     container: {
//       maxWidth: '900px' // Максимальная ширина контейнера
//     }
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev + 1) % photos.length);
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);
//   };

//   const handleThumbnailClick = (index) => {
//     setCurrentIndex(index);
//   };

//   // Свайп для основного фото
//   const mainSwipeHandlers = useSwipeable({
//     onSwipedLeft: () => handleNext(),
//     onSwipedRight: () => handlePrev(),
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true,
//   });

//   if (photos.length === 0) {
//     return (
//       <Box sx={{ 
//         height: 300, 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         borderRadius: 2,
//         mb: 3,
//         maxWidth: sizes.container.maxWidth,
//       }}>
//         <Typography variant="body1" color="textSecondary">
//           Фото отсутствуют
//         </Typography>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ 
//       display: 'flex',
//       flexDirection: 'column',
//       position: 'relative',
//       mb: 3,
//       borderRadius: 2,
//       overflow: 'hidden',
//       boxShadow: 3,
//       backgroundColor: 'white',
//       width: '100%',
//       maxWidth: sizes.container.maxWidth,
//       mx: 'auto'
//     }}>
//       {/* Основной контейнер с фото и местом для правого блока */}
//       <Box sx={{
//         display: 'flex',
//         width: '100%'
//       }}>
//         {/* Блок с фото (левая часть) */}
//         <Box sx={{
//           width: sizes.main.width,
//           display: 'flex',
//           flexDirection: 'column'
//         }}>
//           {/* Основное фото с свайпом */}
//           <Box
//             {...mainSwipeHandlers}
//             sx={{
//               width: '100%',
//               height: sizes.main.height,
//               position: 'relative',
//               cursor: 'pointer',
//               backgroundColor: '#fafafa'
//             }}
//             onClick={() => setShowThumbnails(!showThumbnails)}
//           >
//             <Box
//               component="img"
//               src={photos[currentIndex]}
//               alt={`Фото ${currentIndex + 1}`}
//               sx={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 display: 'block',
//                 filter: 'brightness(1.05) contrast(1.05)',
//                 transition: 'filter 0.3s ease'
//               }}
//             />
            
//             {/* Навигационные стрелки */}
//             {photos.length > 1 && (
//               <>
//                 <IconButton 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handlePrev();
//                   }}
//                   sx={{
//                     position: 'absolute',
//                     left: 16,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                     boxShadow: 2,
//                     width: 50,
//                     height: 50
//                   }}
//                 >
//                   <ArrowBackIosNewIcon fontSize="large" />
//                 </IconButton>
//                 <IconButton 
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleNext();
//                   }}
//                   sx={{
//                     position: 'absolute',
//                     right: 16,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
//                     boxShadow: 2,
//                     width: 50,
//                     height: 50
//                   }}
//                 >
//                   <ArrowForwardIosIcon fontSize="large" />
//                 </IconButton>
//               </>
//             )}

//             {/* Индикатор текущего фото */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 20,
//                 right: 20,
//                 backgroundColor: 'rgba(0, 0, 0, 0.7)',
//                 color: 'white',
//                 px: 2,
//                 py: 1,
//                 borderRadius: 4,
//                 fontSize: '1rem',
//                 backdropFilter: 'blur(4px)',
//                 fontWeight: 'bold'
//               }}
//             >
//               {currentIndex + 1} / {photos.length}
//             </Box>

//             {/* Кнопка удаления */}
//             {onDelete && (
//               <IconButton
//                 onClick={(e) => {
//                   e.stopPropagation();
//                   onDelete(currentIndex);
//                 }}
//                 sx={{
//                   position: 'absolute',
//                   top: 10,
//                   right: 10,
//                   bgcolor: 'error.main',
//                   color: 'common.white',
//                   '&:hover': { bgcolor: 'error.dark' },
//                   boxShadow: 2,
//                   width: 40,
//                   height: 40
//                 }}
//               >
//                 <DeleteIcon />
//               </IconButton>
//             )}
//           </Box>

//           {/* Полоса миниатюр */}
//           {showThumbnails && photos.length > 1 && (
//             <Box
//               sx={{
//                 display: 'flex',
//                 gap: sizes.thumbnails.gap,
//                 p: '15px',
//                 bgcolor: '#f0f0f0',
//                 overflowX: 'auto',
//                 '&::-webkit-scrollbar': {
//                   height: '6px',
//                   backgroundColor: '#e0e0e0'
//                 },
//                 '&::-webkit-scrollbar-thumb': {
//                   backgroundColor: '#999',
//                   borderRadius: '4px'
//                 }
//               }}
//             >
//               {photos.map((photo, index) => (
//                 <Box
//                   key={index}
//                   sx={{
//                     minWidth: sizes.thumbnails.width,
//                     height: sizes.thumbnails.height,
//                     borderRadius: '6px',
//                     overflow: 'hidden',
//                     cursor: 'pointer',
//                     border: currentIndex === index ? '3px solid #1976d2' : '2px solid #d0d0d0',
//                     opacity: currentIndex === index ? 1 : 0.9,
//                     transition: 'all 0.3s ease',
//                     flexShrink: 0,
//                     boxShadow: '0 2px 4px rgba(0,0,0,0.1)',
//                     '&:hover': {
//                       opacity: 1,
//                       borderColor: '#1976d2',
//                       transform: 'scale(1.03)'
//                     }
//                   }}
//                   onClick={(e) => {
//                     e.stopPropagation();
//                     handleThumbnailClick(index);
//                   }}
//                 >
//                   <Box
//                     component="img"
//                     src={photo}
//                     alt={`Миниатюра ${index + 1}`}
//                     sx={{
//                       width: '100%',
//                       height: '100%',
//                       objectFit: 'cover',
//                       filter: 'brightness(1.05) contrast(1.05)',
//                       transition: 'filter 0.3s ease'
//                     }}
//                   />
//                 </Box>
//               ))}
//             </Box>
//           )}
//         </Box>

//         {/* Пустое место для правого блока (можно заменить на ваш контент) */}
//         <Box sx={{
//           flex: 1,
//           backgroundColor: '#f9f9f9',
//           minHeight: sizes.main.height,
//           borderLeft: '1px solid #e0e0e0'
//         }}>
//           {/* Здесь будет ваш правый блок */}
//         </Box>
//       </Box>
//     </Box>
//   );
// };

// export default FileUploadSlider;


'use client';

import React, { useState, useRef, useEffect } from 'react';
import { Box, IconButton, Typography } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import { useSwipeable } from 'react-swipeable';

const FileUploadSlider = ({ photos = [], onDelete }) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [showThumbnails, setShowThumbnails] = useState(true);
  const thumbsRef = useRef(null);

  // Настройки размеров (сохранены как в вашем коде)
  const sizes = {
    main: {
      height: '500px', // Высота основного фото
      width: '900px',  // Ширина основного фото
    },
    thumbnails: {
      width: '290px',  // Ширина миниатюр
      height: '300px', // Высота миниатюр
      gap: '10px',    // Расстояние между миниатюрами
    },
    container: {
      maxWidth: '900px' // Максимальная ширина контейнера
    }
  };

  // Обработчики навигации
  const handleNext = () => {
    const newIndex = (currentIndex + 1) % photos.length;
    setCurrentIndex(newIndex);
    scrollThumbs(newIndex);
  };

  const handlePrev = () => {
    const newIndex = (currentIndex - 1 + photos.length) % photos.length;
    setCurrentIndex(newIndex);
    scrollThumbs(newIndex);
  };

  // Прокрутка миниатюр к активной
  const scrollThumbs = (index) => {
    if (thumbsRef.current) {
      const thumbWidth = parseInt(sizes.thumbnails.width);
      const gap = parseInt(sizes.thumbnails.gap);
      const scrollPos = index * (thumbWidth + gap) - (thumbWidth * 1.5);
      thumbsRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  };

  // Свайп для основного фото
  const mainSwipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Свайп для миниатюр
  const thumbsSwipeHandlers = useSwipeable({
    onSwipedLeft: handleNext,
    onSwipedRight: handlePrev,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true
  });

  // Автоматическая прокрутка при изменении currentIndex
  useEffect(() => {
    scrollThumbs(currentIndex);
  }, [currentIndex]);

  if (photos.length === 0) {
    return (
      <Box sx={{ 
        height: 300, 
        display: 'flex', 
        justifyContent: 'center', 
        alignItems: 'center',
        backgroundColor: '#f5f5f5',
        borderRadius: 2,
        mb: 3,
        maxWidth: sizes.container.maxWidth,
      }}>
        <Typography variant="body1" color="textSecondary">
          Фото отсутствуют
        </Typography>
      </Box>
    );
  }

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: 'column',
      position: 'relative',
      mb: 3,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
      backgroundColor: 'white',
      width: '100%',
      maxWidth: sizes.container.maxWidth,
      mx: 'auto'
    }}>
      {/* Основной контейнер с фото */}
      <Box sx={{
        display: 'flex',
        width: '100%'
      }}>
        {/* Блок с фото (прижат влево) */}
        <Box sx={{
          width: sizes.main.width,
          display: 'flex',
          flexDirection: 'column',
          marginRight: 'auto' // Прижимаем влево
        }}>
          {/* Основное фото с свайпом */}
          <Box
            {...mainSwipeHandlers}
            sx={{
              width: '100%',
              height: sizes.main.height,
              position: 'relative',
              cursor: 'pointer',
              backgroundColor: '#fafafa'
            }}
            onClick={() => setShowThumbnails(!showThumbnails)}
          >
            <Box
              component="img"
              src={photos[currentIndex]}
              alt={`Фото ${currentIndex + 1}`}
              sx={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                display: 'block',
                filter: 'brightness(1.05) contrast(1.05)',
                transition: 'filter 0.3s ease'
              }}
            />
            
            {/* Навигационные стрелки */}
            {photos.length > 1 && (
              <>
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handlePrev();
                  }}
                  sx={{
                    position: 'absolute',
                    left: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                    boxShadow: 2,
                    width: 50,
                    height: 50
                  }}
                >
                  <ArrowBackIosNewIcon fontSize="large" />
                </IconButton>
                <IconButton 
                  onClick={(e) => {
                    e.stopPropagation();
                    handleNext();
                  }}
                  sx={{
                    position: 'absolute',
                    right: 16,
                    top: '50%',
                    transform: 'translateY(-50%)',
                    bgcolor: 'rgba(255,255,255,0.9)',
                    '&:hover': { bgcolor: 'rgba(255,255,255,1)' },
                    boxShadow: 2,
                    width: 50,
                    height: 50
                  }}
                >
                  <ArrowForwardIosIcon fontSize="large" />
                </IconButton>
              </>
            )}

            {/* Индикатор текущего фото */}
            <Box
              sx={{
                position: 'absolute',
                bottom: 20,
                right: 20,
                backgroundColor: 'rgba(0, 0, 0, 0.7)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 4,
                fontSize: '1rem',
                backdropFilter: 'blur(4px)',
                fontWeight: 'bold'
              }}
            >
              {currentIndex + 1} / {photos.length}
            </Box>

            {/* Кнопка удаления */}
            {onDelete && (
              <IconButton
                onClick={(e) => {
                  e.stopPropagation();
                  onDelete(currentIndex);
                }}
                sx={{
                  position: 'absolute',
                  top: 10,
                  right: 10,
                  bgcolor: 'error.main',
                  color: 'common.white',
                  '&:hover': { bgcolor: 'error.dark' },
                  boxShadow: 2,
                  width: 40,
                  height: 40
                }}
              >
                <DeleteIcon />
              </IconButton>
            )}
          </Box>

          {/* Полоса миниатюр с автоматической прокруткой */}
          {showThumbnails && photos.length > 1 && (
            <Box
              {...thumbsSwipeHandlers}
              ref={thumbsRef}
              sx={{
                display: 'flex',
                gap: sizes.thumbnails.gap,
                p: '15px',
                bgcolor: '#f0f0f0',
                overflowX: 'hidden', // Убираем скролл
                width: '100%',
                position: 'relative'
              }}
            >
              {photos.map((photo, index) => (
                <Box
                  key={index}
                  sx={{
                    minWidth: sizes.thumbnails.width,
                    height: sizes.thumbnails.height,
                    borderRadius: '6px',
                    overflow: 'hidden',
                    cursor: 'pointer',
                    border: currentIndex === index ? '3px solid #1976d2' : '2px solid #d0d0d0',
                    opacity: currentIndex === index ? 1 : 0.8,
                    transition: 'all 0.3s ease',
                    flexShrink: 0,
                    '&:hover': {
                      opacity: 1,
                      borderColor: '#1976d2'
                    }
                  }}
                  onClick={(e) => {
                    e.stopPropagation();
                    setCurrentIndex(index);
                  }}
                >
                  <Box
                    component="img"
                    src={photo}
                    alt={`Миниатюра ${index + 1}`}
                    sx={{
                      width: '100%',
                      height: '100%',
                      objectFit: 'cover',
                      filter: 'brightness(1.05) contrast(1.05)',
                      transition: 'filter 0.3s ease'
                    }}
                  />
                </Box>
              ))}
            </Box>
          )}
        </Box>

        {/* Пустое место справа (оставлено по вашему требованию) */}
        <Box sx={{
          flex: 1,
          backgroundColor: '#f9f9f9',
          minHeight: sizes.main.height,
          borderLeft: '1px solid #e0e0e0'
        }} />
      </Box>
    </Box>
  );
};

export default FileUploadSlider;