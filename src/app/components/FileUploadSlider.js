
//  етот компонент слайт фото и контактная информация







// 'use client';

// import React, { useState, useRef, useEffect, useCallback } from 'react';
// import { 
//   Box, 
//   IconButton, 
//   Typography, 
//   Button, 
//   Input,
//   CircularProgress,
//   useMediaQuery,
//   useTheme,
//   Dialog,
//   DialogContent,
//   Snackbar,
//   Alert
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
// import { useLanguage } from '@/app/LanguageContext';
// import { useSelector } from 'react-redux';
// import CreateUser from '@/app/components/CreateUser';

// const MAX_PHOTOS = 15;
// const MAX_FILE_SIZE_MB = 50;
// const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
// const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

// const translations = {
//   ua: {
//     addPhotos: 'Додати фото',
//     loading: 'Завантаження...',
//     addPhotosCount: (count, max) => `Додати фото (${count}/${max})`,
//     noPhotos: 'Фото відсутні',
//     addPhotosPrompt: 'Додайте фотографії, натиснувши кнопку вище',
//     priceTitle: 'Ціна оренди',
//     pricePerHour: 'грн./година',
//     pricePerDay: 'грн./доба',
//     contactOwner: 'Зателефонуйте власнику, щоб уточнити всі деталі оренди',
//     reportButton: 'Повідомити про неактуальну інформацію',
//     feedbackButton: 'Залишити відгук про житло',
//     helpButton: 'У мене виникли складнощі при проживанні',
//     errorFileType: 'Недопустимий формат файлів:',
//     errorFileSize: 'Деякі файли перевищують',
//     errorMaxPhotos: 'Можна завантажити максимум',
//     errorPartialUpload: 'Можна додати тільки',
//     photos: 'фото',
//     successUpload: '✅ Файли завантажено!',
//     errorUpload: '❌ Помилка:',
//     unknownError: 'Невідома помилка сервера',
//     uploadError: '❌ Помилка при завантаженні файлів',
//     authRequired: 'Для цієї дії необхідно авторизуватися',
//     authRequiredTitle: 'Потрібна авторизація',
//     close: 'Закрити',
//     login: 'Увійти',
//     loginRequired: 'Будь ласка, увійдіть щоб виконати цю дію',
//     actionSuccess: 'Дякуємо за ваше повідомлення!'
//   },
//   ru: {
//     addPhotos: 'Добавить фото',
//     loading: 'Загрузка...',
//     addPhotosCount: (count, max) => `Добавить фото (${count}/${max})`,
//     noPhotos: 'Фото отсутствуют',
//     addPhotosPrompt: 'Добавьте фотографии, нажав кнопку выше',
//     priceTitle: 'Цена аренды',
//     pricePerHour: 'грн./час',
//     pricePerDay: 'грн./сутки',
//     contactOwner: 'Позвоните владельцу, чтобы уточнить все детали аренды',
//     reportButton: 'Сообщить о неактуальной информации',
//     feedbackButton: 'Оставить отзыв о жилье',
//     helpButton: 'У меня возникли сложности при проживании',
//     errorFileType: 'Недопустимый формат файлов:',
//     errorFileSize: 'Некоторые файлы превышают',
//     errorMaxPhotos: 'Можно загрузить максимум',
//     errorPartialUpload: 'Можно добавить только',
//     photos: 'фото',
//     successUpload: '✅ Файлы загружены!',
//     errorUpload: '❌ Ошибка:',
//     unknownError: 'Неизвестная ошибка сервера',
//     uploadError: '❌ Ошибка при загрузке файлов',
//     authRequired: 'Для этого действия необходимо авторизоваться',
//     authRequiredTitle: 'Требуется авторизация',
//     close: 'Закрыть',
//     login: 'Войти',
//     loginRequired: 'Пожалуйста, войдите чтобы выполнить это действие',
//     actionSuccess: 'Спасибо за ваше сообщение!'
//   }
// };

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
//   onPhotosChange,
//   apartmentId = null,
//   apartmentTitle = ''
// }) => {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
//   const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
//   const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [localPhotos, setLocalPhotos] = useState([]);
//   const [isLoading, setIsLoading] = useState(false);
//   const [message, setMessage] = useState('');
//   const [authDialogOpen, setAuthDialogOpen] = useState(false);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [pendingAction, setPendingAction] = useState(null);
//   const fileInputRef = useRef(null);
//   const thumbnailsRef = useRef(null);
//   const autoCloseTimer = useRef(null);
  
//   // Получаем состояние авторизации из Redux store
//   const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
//   const user = useSelector(state => state.auth.user);

//   // Очищаем таймер при размонтировании компонента
//   useEffect(() => {
//     return () => {
//       if (autoCloseTimer.current) {
//         clearTimeout(autoCloseTimer.current);
//       }
//     };
//   }, []);

//   const startAutoCloseTimer = () => {
//     // Очищаем предыдущий таймер, если он есть
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
    
//     // Устанавливаем новый таймер на 5 секунд
//     autoCloseTimer.current = setTimeout(() => {
//       setAuthDialogOpen(false);
//       setSnackbar(prev => ({ ...prev, open: false }));
//     }, 5000);
//   };

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//     // Останавливаем таймер при ручном закрытии
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
//   };

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
//       setMessage(t.uploadError);
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => formData.append('files', file));

//     try {
//       setIsLoading(true);
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(t.successUpload);
//         const uploadedUrls = Array.isArray(data.urls) ? data.urls : [data.url];
        
//         const newPhotos = uploadedUrls.map(url => ({
//           url,
//           file: null,
//           id: `uploaded-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
//         }));

//         const updatedPhotos = [...localPhotos, ...newPhotos];
//         setLocalPhotos(updatedPhotos);
//         setCurrentIndex(updatedPhotos.length - 1);

//         if (setUploadImages) {
//           setUploadImages(updatedPhotos.map(photo => photo.url));
//         }

//         if (onPhotosChange) {
//           onPhotosChange(updatedPhotos.length);
//         }
//       } else {
//         setMessage(`${t.errorUpload} ${data.error || t.unknownError}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(t.uploadError);
//     } finally {
//       setIsLoading(false);
//       if (fileInputRef.current) fileInputRef.current.value = '';
//     }
//   };

//   const handleFileUpload = useCallback((e) => {
//     const files = Array.from(e.target.files || []);
//     if (files.length === 0) return;

//     const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
//     if (invalidFiles.length > 0) {
//       setMessage(`${t.errorFileType} ${invalidFiles.map(f => f.name).join(', ')}`);
//       return;
//     }

//     const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE_BYTES);
//     if (oversizedFiles.length > 0) {
//       setMessage(`${t.errorFileSize} ${MAX_FILE_SIZE_MB}MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
//       return;
//     }

//     if (localPhotos.length + files.length > MAX_PHOTOS) {
//       setMessage(`${t.errorMaxPhotos} ${MAX_PHOTOS} ${t.photos}`);
//       return;
//     }

//     const allowedCount = MAX_PHOTOS - localPhotos.length;
//     const filesToAdd = files.slice(0, allowedCount);

//     if (files.length > allowedCount) {
//       setMessage(`⚠️ ${t.errorPartialUpload} ${allowedCount} ${t.photos}`);
//     } else {
//       setMessage('');
//     }

//     uploadFiles(filesToAdd);
//   }, [localPhotos, t]);

//   const handleDeletePhoto = useCallback((index) => {
//     const newPhotos = [...localPhotos];
//     newPhotos.splice(index, 1);
//     setLocalPhotos(newPhotos);
    
//     if (setUploadImages) {
//       setUploadImages(newPhotos.map(photo => photo.url));
//     }
   
//     if (onPhotosChange) {
//       onPhotosChange(newPhotos.length);
//     }

//     setCurrentIndex(prev => {
//       if (prev >= newPhotos.length) return Math.max(0, newPhotos.length - 1);
//       if (prev === index && index > 0) return index - 1;
//       return prev;
//     });
//   }, [localPhotos, setUploadImages, onPhotosChange]);

//   const handleNext = useCallback(() => {
//     setCurrentIndex(prev => (prev + 1) % localPhotos.length);
//   }, [localPhotos.length]);
  
//   const handlePrev = useCallback(() => {
//     setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
//   }, [localPhotos.length]);

//   const swipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   const getPhones = useCallback(() => {
//     try {
//       if (!Array.isArray(phones)) return ['+380XXXXXXXXX'];
//       return phones.filter(phone => 
//         typeof phone === 'string' && 
//         phone.length >= 12 &&
//         phone.startsWith('+380')
//       );
//     } catch {
//       return ['+380XXXXXXXXX'];
//     }
//   }, [phones]);

//   const isHourly = category?.toLowerCase().includes('сауна') || 
//                   category?.toLowerCase().includes('баня');

//   // Функция для обработки нажатия на кнопки действия
//   const handleActionButtonClick = (actionType) => {
//     if (!isAuthenticated) {
//       // Сохраняем тип действия для выполнения после авторизации
//       setPendingAction(actionType);
      
//       // Показываем модальное окно и алерт
//       setAuthDialogOpen(true);
//       setSnackbar({ 
//         open: true, 
//         message: t.loginRequired, 
//         severity: 'info' 
//       });
      
//       // Запускаем таймер автоматического закрытия
//       startAutoCloseTimer();
//       return;
//     }

//     // Если пользователь авторизован, выполняем действие
//     performAction(actionType);
//   };

//   const performAction = (actionType) => {
//     const actionSubjects = {
//       report: 'Неактуальная информация',
//       feedback: 'Отзыв о жилье',
//       help: 'Проблемы при проживании'
//     };

//     const emailSubject = `${actionSubjects[actionType]} - Объявление #${apartmentId}`;
//     const emailBody = `
// Пользователь: ${user?.name || 'Не указано'} (${user?.email || 'Не указано'})
// ID объявления: ${apartmentId}
// Название объявления: ${apartmentTitle}
// Тип обращения: ${actionSubjects[actionType]}

// Сообщение:
// `;

//     // Кодируем тему и тело письма для URL
//     const encodedSubject = encodeURIComponent(emailSubject);
//     const encodedBody = encodeURIComponent(emailBody);

//     // Открываем почтовый клиент
//     window.location.href = `mailto:support@nadoby.com.ua?subject=${encodedSubject}&body=${encodedBody}`;

//     // Показываем сообщение об успехе
//     showSnackbar(t.actionSuccess, 'success');
//   };

//   const handleCloseAuthDialog = () => {
//     setAuthDialogOpen(false);
//     // Останавливаем таймер при ручном закрытии
//     if (autoCloseTimer.current) {
//       clearTimeout(autoCloseTimer.current);
//     }
//   };

//   return (
//     <Box sx={{ 
//       display: 'flex',
//       flexDirection: isDesktop ? 'row' : 'column',
//       width: '100%',
//       maxWidth: isDesktop ? '1200px' : '100%',
//       mx: 'auto',
//       mb: 3,
//       borderRadius: 2,
//       overflow: 'hidden',
//       boxShadow: 3,
//     }}>
//       {/* Основная область с фото */}
//       <Box sx={{ 
//         width: isDesktop && !editable ? '850px' : '100%',
//         flexShrink: 0,
//         position: 'relative',
//       }}>
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
  
//         {editable && (
//           <Box sx={{ 
//             display: 'flex',
//             justifyContent: 'center',
//             p: isMobile ? 1 : 2,
//             bgcolor: '#f0f0f0'
//           }}>
//             <Button
//               variant="contained"
//               startIcon={<AddPhotoAlternateIcon />}
//               onClick={() => fileInputRef.current?.click()}
//               disabled={isLoading || localPhotos.length >= MAX_PHOTOS}
//               sx={{ 
//                 minWidth: isMobile ? '200px' : '300px',
//                 fontSize: isMobile ? '0.8rem' : '1rem'
//               }}
//             >
//               {isLoading ? (
//                 <>
//                   <CircularProgress size={isMobile ? 20 : 24} sx={{ mr: 1 }} />
//                   {t.loading}
//                 </>
//               ) : t.addPhotosCount(localPhotos.length, MAX_PHOTOS)}
//             </Button>
//           </Box>
//         )}
  
//         {localPhotos.length > 0 ? (
//           <Box {...swipeHandlers} sx={{
//             width: '100%',
//             height: isMobile ? '300px' : '500px',
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
//                     left: isMobile ? 8 : 16, 
//                     top: '50%', 
//                     transform: 'translateY(-50%)', 
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     width: isMobile ? 32 : 48,
//                     height: isMobile ? 32 : 48,
//                     '& .MuiSvgIcon-root': {
//                       fontSize: isMobile ? '1rem' : '1.5rem'
//                     }
//                   }}
//                 >
//                   <ArrowBackIosNewIcon />
//                 </IconButton>
//                 <IconButton 
//                   onClick={handleNext} 
//                   sx={{ 
//                     position: 'absolute', 
//                     right: isMobile ? 8 : 16, 
//                     top: '50%', 
//                     transform: 'translateY(-50%)', 
//                     bgcolor: 'rgba(255,255,255,0.9)',
//                     width: isMobile ? 32 : 48,
//                     height: isMobile ? 32 : 48,
//                     '& .MuiSvgIcon-root': {
//                       fontSize: isMobile ? '1rem' : '1.5rem'
//                     }
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
//               fontSize: isMobile ? '0.8rem' : '1rem'
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
//                   '&:hover': { bgcolor: 'error.dark' },
//                   width: isMobile ? 32 : 48,
//                   height: isMobile ? 32 : 48
//                 }}
//               >
//                 <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
//               </IconButton>
//             )}
//           </Box>
//         ) : (
//           <Box
//             sx={{
//               width: '100%',
//               height: isMobile ? '300px' : '500px',
//               display: 'flex',
//               flexDirection: 'column',
//               justifyContent: 'center',
//               alignItems: 'center',
//               backgroundColor: '#f5f5f5',
//               border: editable ? '2px dashed #ccc' : 'none',
//             }}
//           >
//             {isLoading ? (
//               <CircularProgress size={isMobile ? 40 : 60} />
//             ) : (
//               <Typography 
//                 variant="h6" 
//                 color="text.secondary" 
//                 align="center"
//                 sx={{ fontSize: isMobile ? '1rem' : '1.25rem', px: 2 }}
//               >
//                 {editable ? t.addPhotosPrompt : t.noPhotos}
//               </Typography>
//             )}
//           </Box>
//         )}
  
//         {localPhotos.length > 0 && (
//           <Box 
//             ref={thumbnailsRef}
//             sx={{
//               display: 'flex',
//               gap: isMobile ? '3px' : '7px',
//               pt: isMobile ? '3px' : 0.5,
//               pb: isMobile ? 0 : 2,
//               px: isMobile ? 0 : 0.4,
//               overflowX: 'auto',
//               scrollBehavior: 'smooth',
//               '&::-webkit-scrollbar': {
//                 height: '6px',
//               },
//               '&::-webkit-scrollbar-thumb': {
//                 backgroundColor: 'rgba(0,0,0,0.2)',
//                 borderRadius: '3px',
//               },
//             }}
//           >
//             {localPhotos.map((photo, index) => (
//               <Box
//                 key={photo.id}
//                 onClick={() => setCurrentIndex(index)}
//                 sx={{
//                   width: isMobile ? 'calc(50% - 2.5px)' : '273.4px',
//                   height: isMobile ? '180px' : '250px',
//                   flexShrink: 0,
//                   cursor: 'pointer',
//                   border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
//                   borderRadius: 1,
//                   overflow: 'hidden',
//                   position: 'relative',
//                   transition: 'border 0.2s ease'
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
//                       '&:hover': { bgcolor: 'error.dark' },
//                       width: 24,
//                       height: 24
//                     }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 )}
//               </Box>
//             ))}
//           </Box>
//         )}
  
//         {message && (
//           <Typography 
//             variant="body2" 
//             color={message.includes('❌') ? 'error' : 'text.secondary'} 
//             sx={{ 
//               mt: 1, 
//               mb: 1, 
//               textAlign: 'center',
//               fontSize: isMobile ? '0.75rem' : '0.875rem',
//               px: 2
//             }}
//           >
//             {message}
//           </Typography>
//         )}
//       </Box>
  
//       {/* Боковая панель с информацией для десктопной версии */}
//       {isDesktop && !editable && (
//         <Box sx={{
//           width: '300px',
//           flexShrink: 0,
//           p: 3,
//           bgcolor: '#f9f9f9',
//           display: 'flex',
//           flexDirection: 'column',
//         }}>
//           <Box sx={{ 
//             mb: 3,
//             backgroundColor: '#f0f8ff',
//             p: 2,
//             borderRadius: 1,
//             border: '1px solid #e0e0e0'
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 'bold',
//               color: 'text.secondary',
//               mb: 1,
//               fontSize: '1rem',
//               textTransform: 'uppercase'
//             }}>
//               {t.priceTitle}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
//               <Typography variant="h4" sx={{ 
//                 fontWeight: 'bold',
//                 color: 'primary.main',
//                 fontSize: '2.7rem',
//                 mr: 1
//               }}>
//                 {price}
//               </Typography>
//               <Typography variant="body1" sx={{ 
//                 color: 'text.secondary',
//                 fontSize: '1.3rem'
//               }}>
//                 {isHourly ? t.pricePerHour : t.pricePerDay}
//               </Typography>
//             </Box>
//           </Box>
  
//           <Box sx={{ 
//             mb: 3,
//             backgroundColor: '#f5eee0',
//             p: 2,
//             borderRadius: 1,
//             border: '1px solid #e0e0e0'
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 'bold',
//               mb: 1.5,
//               fontSize: '1.1rem'
//             }}>
//               {name}
//             </Typography>
            
//             <Typography variant="body1" sx={{ 
//               mb: 2,
//               fontSize: '1.1rem',
//               color: 'text.secondary'
//             }}>
//               {t.contactOwner}
//             </Typography>
  
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: 'column',
//               gap: 1,
//               p: 1.5,
//               bgcolor: '#f5f5f5',
//               borderRadius: 1,
//             }}>
//               {getPhones().map((phone, index) => (
//                 <Box 
//                   key={index} 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1,
//                     '&:hover': {
//                       backgroundColor: 'rgba(0, 0, 0, 0.04)',
//                       borderRadius: '4px'
//                     }
//                   }}
//                 >
//                   <IconButton 
//                     sx={{ 
//                       p: 0.5,
//                       color: 'primary.main',
//                       '&:hover': {
//                         backgroundColor: 'rgba(25, 118, 210, 0.08)'
//                       }
//                     }}
//                     onClick={() => window.open(`tel:${phone.replace(/\D/g, '')}`)}
//                   >
//                     <PhoneIcon fontSize="small" />
//                   </IconButton>
//                   <Typography
//                     component="a"
//                     href={`tel:${phone.replace(/\D/g, '')}`}
//                     sx={{
//                       color: 'primary.main',
//                       textDecoration: 'none',
//                       '&:hover': { textDecoration: 'underline' },
//                       cursor: 'pointer',
//                       fontSize: '1rem',
//                       fontWeight: 'bold',
//                       flexGrow: 1
//                     }}
//                   >
//                     {phone}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
  
//           <Box sx={{ mt: 'auto' }}>
//             <Button 
//               variant="outlined" 
//               startIcon={<ReportIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('report')}
//               sx={{ 
//                 mb: 1.5, 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: '0.8rem',
//                 borderRadius: 1,
//               }}
//             >
//               {t.reportButton}
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<FeedbackIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('feedback')}
//               sx={{ 
//                 mb: 1.5, 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: '0.8rem',
//                 borderRadius: 1,
//               }}
//             >
//               {t.feedbackButton}
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<HelpIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('help')}
//               sx={{ 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: '0.8rem',
//                 borderRadius: 1,
//               }}
//             >
//               {t.helpButton}
//             </Button>
//           </Box>
//         </Box>
//       )}
  
//       {/* Боковая панель с информацией для мобильной и планшетной версии */}
//       {(isMobile || isTablet) && !editable && (
//         <Box sx={{
//           p: 2,
//           bgcolor: '#f9f9f9',
//           display: 'flex',
//           flexDirection: 'column',
//         }}>
//           <Box sx={{ 
//             mb: 3,
//             backgroundColor: '#f0f8ff',
//             p: 2,
//             borderRadius: 1,
//             border: '1px solid #e0e0e0',
//             mx: 2,
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 'bold',
//               color: 'text.secondary',
//               mb: 1,
//               fontSize: isMobile ? '0.9rem' : '1rem',
//               textTransform: 'uppercase'
//             }}>
//               {t.priceTitle}
//             </Typography>
//             <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
//               <Typography variant="h4" sx={{ 
//                 fontWeight: 'bold',
//                 color: 'primary.main',
//                 fontSize: isMobile ? '2rem' : '2.7rem',
//                 mr: 1
//               }}>
//                 {price}
//               </Typography>
//               <Typography variant="body1" sx={{ 
//                 color: 'text.secondary',
//                 fontSize: isMobile ? '1rem' : '1.3rem'
//               }}>
//                 {isHourly ? t.pricePerHour : t.pricePerDay}
//               </Typography>
//             </Box>
//           </Box>
  
//           <Box sx={{ 
//             mb: 3,
//             backgroundColor: '#f5eee0',
//             p: 2,
//             borderRadius: 1,
//             border: '1px solid #e0e0e0',
//             mx: 2,
//           }}>
//             <Typography variant="h6" sx={{ 
//               fontWeight: 'bold',
//               mb: 1.5,
//               fontSize: isMobile ? '1rem' : '1.1rem'
//             }}>
//               {name}
//             </Typography>
            
//             <Typography variant="body1" sx={{ 
//               mb: 2,
//               fontSize: isMobile ? '0.9rem' : '1.1rem',
//               color: 'text.secondary'
//             }}>
//               {t.contactOwner}
//             </Typography>
  
//             <Box sx={{ 
//               display: 'flex', 
//               flexDirection: 'column',
//               gap: 1,
//               p: 1.5,
//               bgcolor: '#f5f5f5',
//               borderRadius: 1,
//             }}>
//               {getPhones().map((phone, index) => (
//                 <Box 
//                   key={index} 
//                   sx={{ 
//                     display: 'flex', 
//                     alignItems: 'center', 
//                     gap: 1,
//                     '&:hover': {
//                       backgroundColor: 'rgba(0, 0, 0, 0.04)',
//                       borderRadius: '4px'
//                     }
//                   }}
//                 >
//                   <IconButton 
//                     sx={{ 
//                       p: 0.5,
//                       color: 'primary.main',
//                       '&:hover': {
//                         backgroundColor: 'rgba(25, 118, 210, 0.08)'
//                       }
//                     }}
//                     onClick={() => window.open(`tel:${phone.replace(/\D/g, '')}`)}
//                   >
//                     <PhoneIcon fontSize="small" />
//                   </IconButton>
//                   <Typography
//                     component="a"
//                     href={`tel:${phone.replace(/\D/g, '')}`}
//                     sx={{
//                       color: 'primary.main',
//                       textDecoration: 'none',
//                       '&:hover': { textDecoration: 'underline' },
//                       cursor: 'pointer',
//                       fontSize: isMobile ? '0.9rem' : '1rem',
//                       fontWeight: 'bold',
//                       flexGrow: 1
//                     }}
//                   >
//                     {phone}
//                   </Typography>
//                 </Box>
//               ))}
//             </Box>
//           </Box>
  
//           <Box sx={{ 
//             mt: 'auto',
//             mx: 2,
//           }}>
//             <Button 
//               variant="outlined" 
//               startIcon={<ReportIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('report')}
//               sx={{ 
//                 mb: 1.5, 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: isMobile ? '0.7rem' : '0.8rem',
//                 borderRadius: 1,
//               }}
//             >
//               {t.reportButton}
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<FeedbackIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('feedback')}
//               sx={{ 
//                 mb: 1.5, 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: isMobile ? '0.7rem' : '0.8rem',
//                 borderRadius: 1,
//               }}
//             >
//               {t.feedbackButton}
//             </Button>
//             <Button 
//               variant="outlined" 
//               startIcon={<HelpIcon />}
//               fullWidth
//               onClick={() => handleActionButtonClick('help')}
//               sx={{ 
//                 justifyContent: 'flex-start',
//                 py: 1.2,
//                 fontSize: isMobile ? '0.7rem' : '0.8rem',
//                 borderRadius: 1,
//               }}
//             >
//               {t.helpButton}
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* Диалог авторизации с компонентом CreateUser */}
//       <Dialog
//         open={authDialogOpen}
//         onClose={handleCloseAuthDialog}
//         fullWidth
//         maxWidth="xs"
//       >
//         <DialogContent>
//           <CreateUser onClose={handleCloseAuthDialog} />
//         </DialogContent>
//       </Dialog>

//       {/* Snackbar для уведомлений */}
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
  Input,
  CircularProgress,
  useMediaQuery,
  useTheme,
  Dialog,
  DialogContent,
  Snackbar,
  Alert,
  DialogTitle,
  DialogActions
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
import ContentCopyIcon from '@mui/icons-material/ContentCopy';
import EmailIcon from '@mui/icons-material/Email';
import { useLanguage } from '@/app/LanguageContext';
import { useSelector } from 'react-redux';
import CreateUser from '@/app/components/CreateUser';

const MAX_PHOTOS = 15;
const MAX_FILE_SIZE_MB = 50;
const MAX_FILE_SIZE_BYTES = MAX_FILE_SIZE_MB * 1024 * 1024;
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp', 'image/heic', 'image/heif'];

const translations = {
  ua: {
    addPhotos: 'Додати фото',
    loading: 'Завантаження...',
    addPhotosCount: (count, max) => `Додати фото (${count}/${max})`,
    noPhotos: 'Фото відсутні',
    addPhotosPrompt: 'Додайте фотографії, натиснувши кнопку вище',
    priceTitle: 'Ціна оренди',
    pricePerHour: 'грн./година',
    pricePerDay: 'грн./доба',
    contactOwner: 'Зателефонуйте власнику, щоб уточнити всі деталі оренди',
    reportButton: 'Повідомити про неактуальну інформацію',
    feedbackButton: 'Залишити відгук про житло',
    helpButton: 'У мене виникли складнощі при проживанні',
    errorFileType: 'Недопустимий формат файлів:',
    errorFileSize: 'Деякі файли перевищують',
    errorMaxPhotos: 'Можна завантажити максимум',
    errorPartialUpload: 'Можна додати тільки',
    photos: 'фото',
    successUpload: '✅ Файли завантажено!',
    errorUpload: '❌ Помилка:',
    unknownError: 'Невідома помилка сервера',
    uploadError: '❌ Помилка при завантаженні файлів',
    authRequired: 'Для цієї дії необхідно авторизуватися',
    authRequiredTitle: 'Потрібна авторизація',
    close: 'Закрити',
    login: 'Увійти',
    loginRequired: 'Будь ласка, увійдіть щоб виконати цю дію',
    actionSuccess: 'Дякуємо за ваше повідомлення!',
    // Новые переводы для модального окна
    contactSupport: "Зв'язатися з підтримкою",
    supportEmail: 'Електронна пошта підтримки',
    copyEmail: 'Скопіювати пошту',
    emailCopied: 'Пошту скопійовано!',
    openEmail: 'Написати на пошту',
    reportTitle: 'Повідомлення про неактуальну інформацію',
    feedbackTitle: 'Залишити відгук про житло',
    helpTitle: 'Повідомити про складнощі при проживанні',
    instructions: 'Скопіюйте електронну адресу та напишіть нам, або натисніть кнопку для відкриття поштового клієнта'
  },
  ru: {
    addPhotos: 'Добавить фото',
    loading: 'Загрузка...',
    addPhotosCount: (count, max) => `Добавить фото (${count}/${max})`,
    noPhotos: 'Фото отсутствуют',
    addPhotosPrompt: 'Добавьте фотографии, нажав кнопку выше',
    priceTitle: 'Цена аренды',
    pricePerHour: 'грн./час',
    pricePerDay: 'грн./сутки',
    contactOwner: 'Позвоните владельцу, чтобы уточнить все детали аренды',
    reportButton: 'Сообщить о неактуальной информации',
    feedbackButton: 'Оставить отзыв о жилье',
    helpButton: 'У меня возникли сложности при проживании',
    errorFileType: 'Недопустимый формат файлов:',
    errorFileSize: 'Некоторые файлы превышают',
    errorMaxPhotos: 'Можно загрузить максимум',
    errorPartialUpload: 'Можно добавить только',
    photos: 'фото',
    successUpload: '✅ Файлы загружены!',
    errorUpload: '❌ Ошибка:',
    unknownError: 'Неизвестная ошибка сервера',
    uploadError: '❌ Ошибка при загрузке файлов',
    authRequired: 'Для этого действия необходимо авторизоваться',
    authRequiredTitle: 'Требуется авторизация',
    close: 'Закрыть',
    login: 'Войти',
    loginRequired: 'Пожалуйста, войдите чтобы выполнить это действие',
    actionSuccess: 'Спасибо за ваше сообщение!',
    // Новые переводы для модального окна
    contactSupport: 'Связаться с поддержкой',
    supportEmail: 'Электронная почта поддержки',
    copyEmail: 'Скопировать почту',
    emailCopied: 'Почта скопирована!',
    openEmail: 'Написать на почту',
    reportTitle: 'Сообщение о неактуальной информации',
    feedbackTitle: 'Оставить отзыв о жилье',
    helpTitle: 'Сообщить о сложностях при проживании',
    instructions: 'Скопируйте электронный адрес и напишите нам, или нажмите кнопку для открытия почтового клиента'
  }
};

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
  onPhotosChange,
  apartmentId = null,
  apartmentTitle = ''
}) => {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const isTablet = useMediaQuery(theme.breakpoints.between('sm', 'md'));
  const isDesktop = useMediaQuery(theme.breakpoints.up('md'));
  
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [currentIndex, setCurrentIndex] = useState(0);
  const [localPhotos, setLocalPhotos] = useState([]);
  const [isLoading, setIsLoading] = useState(false);
  const [message, setMessage] = useState('');
  const [authDialogOpen, setAuthDialogOpen] = useState(false);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [pendingAction, setPendingAction] = useState(null);
  
  // Новые состояния для модального окна поддержки
  const [supportDialogOpen, setSupportDialogOpen] = useState(false);
  const [currentActionType, setCurrentActionType] = useState('');
  
  const fileInputRef = useRef(null);
  const thumbnailsRef = useRef(null);
  const autoCloseTimer = useRef(null);
  
  // Получаем состояние авторизации из Redux store
  const isAuthenticated = useSelector(state => state.auth.isAuthenticated);
  const user = useSelector(state => state.auth.user);

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      if (autoCloseTimer.current) {
        clearTimeout(autoCloseTimer.current);
      }
    };
  }, []);

  const startAutoCloseTimer = () => {
    // Очищаем предыдущий таймер, если он есть
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
    
    // Устанавливаем новый таймер на 5 секунд
    autoCloseTimer.current = setTimeout(() => {
      setAuthDialogOpen(false);
      setSnackbar(prev => ({ ...prev, open: false }));
    }, 5000);
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
    // Останавливаем таймер при ручном закрытии
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  };

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
      setMessage(t.uploadError);
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
        setMessage(t.successUpload);
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
        setMessage(`${t.errorUpload} ${data.error || t.unknownError}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(t.uploadError);
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  };

  const handleFileUpload = useCallback((e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    const invalidFiles = files.filter(file => !ALLOWED_FILE_TYPES.includes(file.type));
    if (invalidFiles.length > 0) {
      setMessage(`${t.errorFileType} ${invalidFiles.map(f => f.name).join(', ')}`);
      return;
    }

    const oversizedFiles = files.filter(file => file.size > MAX_FILE_SIZE_BYTES);
    if (oversizedFiles.length > 0) {
      setMessage(`${t.errorFileSize} ${MAX_FILE_SIZE_MB}MB: ${oversizedFiles.map(f => f.name).join(', ')}`);
      return;
    }

    if (localPhotos.length + files.length > MAX_PHOTOS) {
      setMessage(`${t.errorMaxPhotos} ${MAX_PHOTOS} ${t.photos}`);
      return;
    }

    const allowedCount = MAX_PHOTOS - localPhotos.length;
    const filesToAdd = files.slice(0, allowedCount);

    if (files.length > allowedCount) {
      setMessage(`⚠️ ${t.errorPartialUpload} ${allowedCount} ${t.photos}`);
    } else {
      setMessage('');
    }

    uploadFiles(filesToAdd);
  }, [localPhotos, t]);

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

  const getPhones = useCallback(() => {
    try {
      if (!Array.isArray(phones)) return ['+380XXXXXXXXX'];
      return phones.filter(phone => 
        typeof phone === 'string' && 
        phone.length >= 12 &&
        phone.startsWith('+380')
      );
    } catch {
      return ['+380XXXXXXXXX'];
    }
  }, [phones]);

  const isHourly = category?.toLowerCase().includes('сауна') || 
                  category?.toLowerCase().includes('баня');

  // Функции для работы с модальным окном поддержки
  const handleOpenSupportDialog = (actionType) => {
    setCurrentActionType(actionType);
    setSupportDialogOpen(true);
  };

  const handleCloseSupportDialog = () => {
    setSupportDialogOpen(false);
    setCurrentActionType('');
  };

  const copyEmailToClipboard = () => {
    navigator.clipboard.writeText('support@nadoby.com.ua')
      .then(() => {
        showSnackbar(t.emailCopied, 'success');
      })
      .catch(err => {
        console.error('Failed to copy email: ', err);
        showSnackbar('Помилка копіювання', 'error');
      });
  };

  const openEmailClient = () => {
    const actionSubjects = {
      report: 'Неактуальная информация',
      feedback: 'Отзыв о жилье',
      help: 'Проблемы при проживании'
    };

    const emailSubject = `${actionSubjects[currentActionType]} - Объявление #${apartmentId}`;
    const emailBody = `
Пользователь: ${user?.name || 'Не указано'} (${user?.email || 'Не указано'})
ID объявления: ${apartmentId}
Название объявления: ${apartmentTitle}
Тип обращения: ${actionSubjects[currentActionType]}

Сообщение:
`;

    // Кодируем тему и тело письма для URL
    const encodedSubject = encodeURIComponent(emailSubject);
    const encodedBody = encodeURIComponent(emailBody);

    // Открываем почтовый клиент
    window.location.href = `mailto:support@nadoby.com.ua?subject=${encodedSubject}&body=${encodedBody}`;
    
    // Показываем сообщение об успехе
    showSnackbar(t.actionSuccess, 'success');
    handleCloseSupportDialog();
  };

  const getDialogTitle = () => {
    switch (currentActionType) {
      case 'report':
        return t.reportTitle;
      case 'feedback':
        return t.feedbackTitle;
      case 'help':
        return t.helpTitle;
      default:
        return t.contactSupport;
    }
  };

  // Функция для обработки нажатия на кнопки действия
  const handleActionButtonClick = (actionType) => {
    if (!isAuthenticated) {
      // Сохраняем тип действия для выполнения после авторизации
      setPendingAction(actionType);
      
      // Показываем модальное окно и алерт
      setAuthDialogOpen(true);
      setSnackbar({ 
        open: true, 
        message: t.loginRequired, 
        severity: 'info' 
      });
      
      // Запускаем таймер автоматического закрытия
      startAutoCloseTimer();
      return;
    }

    // Если пользователь авторизован, открываем модальное окно поддержки
    handleOpenSupportDialog(actionType);
  };

  const handleCloseAuthDialog = () => {
    setAuthDialogOpen(false);
    // Останавливаем таймер при ручном закрытии
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  };

  return (
    <Box sx={{ 
      display: 'flex',
      flexDirection: isDesktop ? 'row' : 'column',
      width: '100%',
      maxWidth: isDesktop ? '1200px' : '100%',
      mx: 'auto',
      mb: 3,
      borderRadius: 2,
      overflow: 'hidden',
      boxShadow: 3,
    }}>
      {/* Основная область с фото */}
      <Box sx={{ 
        width: isDesktop && !editable ? '850px' : '100%',
        flexShrink: 0,
        position: 'relative',
      }}>
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
  
        {editable && (
          <Box sx={{ 
            display: 'flex',
            justifyContent: 'center',
            p: isMobile ? 1 : 2,
            bgcolor: '#f0f0f0'
          }}>
            <Button
              variant="contained"
              startIcon={<AddPhotoAlternateIcon />}
              onClick={() => fileInputRef.current?.click()}
              disabled={isLoading || localPhotos.length >= MAX_PHOTOS}
              sx={{ 
                minWidth: isMobile ? '200px' : '300px',
                fontSize: isMobile ? '0.8rem' : '1rem'
              }}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={isMobile ? 20 : 24} sx={{ mr: 1 }} />
                  {t.loading}
                </>
              ) : t.addPhotosCount(localPhotos.length, MAX_PHOTOS)}
            </Button>
          </Box>
        )}
  
        {localPhotos.length > 0 ? (
          <Box {...swipeHandlers} sx={{
            width: '100%',
            height: isMobile ? '300px' : '500px',
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
                    left: isMobile ? 8 : 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    width: isMobile ? 32 : 48,
                    height: isMobile ? 32 : 48,
                    '& .MuiSvgIcon-root': {
                      fontSize: isMobile ? '1rem' : '1.5rem'
                    }
                  }}
                >
                  <ArrowBackIosNewIcon />
                </IconButton>
                <IconButton 
                  onClick={handleNext} 
                  sx={{ 
                    position: 'absolute', 
                    right: isMobile ? 8 : 16, 
                    top: '50%', 
                    transform: 'translateY(-50%)', 
                    bgcolor: 'rgba(255,255,255,0.9)',
                    width: isMobile ? 32 : 48,
                    height: isMobile ? 32 : 48,
                    '& .MuiSvgIcon-root': {
                      fontSize: isMobile ? '1rem' : '1.5rem'
                    }
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
              fontSize: isMobile ? '0.8rem' : '1rem'
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
                  '&:hover': { bgcolor: 'error.dark' },
                  width: isMobile ? 32 : 48,
                  height: isMobile ? 32 : 48
                }}
              >
                <DeleteIcon fontSize={isMobile ? "small" : "medium"} />
              </IconButton>
            )}
          </Box>
        ) : (
          <Box
            sx={{
              width: '100%',
              height: isMobile ? '300px' : '500px',
              display: 'flex',
              flexDirection: 'column',
              justifyContent: 'center',
              alignItems: 'center',
              backgroundColor: '#f5f5f5',
              border: editable ? '2px dashed #ccc' : 'none',
            }}
          >
            {isLoading ? (
              <CircularProgress size={isMobile ? 40 : 60} />
            ) : (
              <Typography 
                variant="h6" 
                color="text.secondary" 
                align="center"
                sx={{ fontSize: isMobile ? '1rem' : '1.25rem', px: 2 }}
              >
                {editable ? t.addPhotosPrompt : t.noPhotos}
              </Typography>
            )}
          </Box>
        )}
  
        {localPhotos.length > 0 && (
          <Box 
            ref={thumbnailsRef}
            sx={{
              display: 'flex',
              gap: isMobile ? '3px' : '7px',
              pt: isMobile ? '3px' : 0.5,
              pb: isMobile ? 0 : 2,
              px: isMobile ? 0 : 0.4,
              overflowX: 'auto',
              scrollBehavior: 'smooth',
              '&::-webkit-scrollbar': {
                height: '6px',
              },
              '&::-webkit-scrollbar-thumb': {
                backgroundColor: 'rgba(0,0,0,0.2)',
                borderRadius: '3px',
              },
            }}
          >
            {localPhotos.map((photo, index) => (
              <Box
                key={photo.id}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: isMobile ? 'calc(50% - 2.5px)' : '273.4px',
                  height: isMobile ? '180px' : '250px',
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
                      '&:hover': { bgcolor: 'error.dark' },
                      width: 24,
                      height: 24
                    }}
                  >
                    <DeleteIcon fontSize="small" />
                  </IconButton>
                )}
              </Box>
            ))}
          </Box>
        )}
  
        {message && (
          <Typography 
            variant="body2" 
            color={message.includes('❌') ? 'error' : 'text.secondary'} 
            sx={{ 
              mt: 1, 
              mb: 1, 
              textAlign: 'center',
              fontSize: isMobile ? '0.75rem' : '0.875rem',
              px: 2
            }}
          >
            {message}
          </Typography>
        )}
      </Box>
  
      {/* Боковая панель с информацией для десктопной версии */}
      {isDesktop && !editable && (
        <Box sx={{
          width: '300px',
          flexShrink: 0,
          p: 3,
          bgcolor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
        }}>
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
              {t.priceTitle}
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
                {isHourly ? t.pricePerHour : t.pricePerDay}
              </Typography>
            </Box>
          </Box>
  
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
              {t.contactOwner}
            </Typography>
  
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
              p: 1.5,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
            }}>
              {getPhones().map((phone, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '4px'
                    }
                  }}
                >
                  <IconButton 
                    sx={{ 
                      p: 0.5,
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                    onClick={() => window.open(`tel:${phone.replace(/\D/g, '')}`)}
                  >
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    component="a"
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      cursor: 'pointer',
                      fontSize: '1rem',
                      fontWeight: 'bold',
                      flexGrow: 1
                    }}
                  >
                    {phone}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
  
          <Box sx={{ mt: 'auto' }}>
            <Button 
              variant="outlined" 
              startIcon={<ReportIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('report')}
              sx={{ 
                mb: 1.5, 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: '0.8rem',
                borderRadius: 1,
              }}
            >
              {t.reportButton}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FeedbackIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('feedback')}
              sx={{ 
                mb: 1.5, 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: '0.8rem',
                borderRadius: 1,
              }}
            >
              {t.feedbackButton}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<HelpIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('help')}
              sx={{ 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: '0.8rem',
                borderRadius: 1,
              }}
            >
              {t.helpButton}
            </Button>
          </Box>
        </Box>
      )}
  
      {/* Боковая панель с информацией для мобильной и планшетной версии */}
      {(isMobile || isTablet) && !editable && (
        <Box sx={{
          p: 2,
          bgcolor: '#f9f9f9',
          display: 'flex',
          flexDirection: 'column',
        }}>
          <Box sx={{ 
            mb: 3,
            backgroundColor: '#f0f8ff',
            p: 2,
            borderRadius: 1,
            border: '1px solid #e0e0e0',
            mx: 2,
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              color: 'text.secondary',
              mb: 1,
              fontSize: isMobile ? '0.9rem' : '1rem',
              textTransform: 'uppercase'
            }}>
              {t.priceTitle}
            </Typography>
            <Box sx={{ display: 'flex', alignItems: 'baseline' }}>
              <Typography variant="h4" sx={{ 
                fontWeight: 'bold',
                color: 'primary.main',
                fontSize: isMobile ? '2rem' : '2.7rem',
                mr: 1
              }}>
                {price}
              </Typography>
              <Typography variant="body1" sx={{ 
                color: 'text.secondary',
                fontSize: isMobile ? '1rem' : '1.3rem'
              }}>
                {isHourly ? t.pricePerHour : t.pricePerDay}
              </Typography>
            </Box>
          </Box>
  
          <Box sx={{ 
            mb: 3,
            backgroundColor: '#f5eee0',
            p: 2,
            borderRadius: 1,
            border: '1px solid #e0e0e0',
            mx: 2,
          }}>
            <Typography variant="h6" sx={{ 
              fontWeight: 'bold',
              mb: 1.5,
              fontSize: isMobile ? '1rem' : '1.1rem'
            }}>
              {name}
            </Typography>
            
            <Typography variant="body1" sx={{ 
              mb: 2,
              fontSize: isMobile ? '0.9rem' : '1.1rem',
              color: 'text.secondary'
            }}>
              {t.contactOwner}
            </Typography>
  
            <Box sx={{ 
              display: 'flex', 
              flexDirection: 'column',
              gap: 1,
              p: 1.5,
              bgcolor: '#f5f5f5',
              borderRadius: 1,
            }}>
              {getPhones().map((phone, index) => (
                <Box 
                  key={index} 
                  sx={{ 
                    display: 'flex', 
                    alignItems: 'center', 
                    gap: 1,
                    '&:hover': {
                      backgroundColor: 'rgba(0, 0, 0, 0.04)',
                      borderRadius: '4px'
                    }
                  }}
                >
                  <IconButton 
                    sx={{ 
                      p: 0.5,
                      color: 'primary.main',
                      '&:hover': {
                        backgroundColor: 'rgba(25, 118, 210, 0.08)'
                      }
                    }}
                    onClick={() => window.open(`tel:${phone.replace(/\D/g, '')}`)}
                  >
                    <PhoneIcon fontSize="small" />
                  </IconButton>
                  <Typography
                    component="a"
                    href={`tel:${phone.replace(/\D/g, '')}`}
                    sx={{
                      color: 'primary.main',
                      textDecoration: 'none',
                      '&:hover': { textDecoration: 'underline' },
                      cursor: 'pointer',
                      fontSize: isMobile ? '0.9rem' : '1rem',
                      fontWeight: 'bold',
                      flexGrow: 1
                    }}
                  >
                    {phone}
                  </Typography>
                </Box>
              ))}
            </Box>
          </Box>
  
          <Box sx={{ 
            mt: 'auto',
            mx: 2,
          }}>
            <Button 
              variant="outlined" 
              startIcon={<ReportIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('report')}
              sx={{ 
                mb: 1.5, 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                borderRadius: 1,
              }}
            >
              {t.reportButton}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<FeedbackIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('feedback')}
              sx={{ 
                mb: 1.5, 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                borderRadius: 1,
              }}
            >
              {t.feedbackButton}
            </Button>
            <Button 
              variant="outlined" 
              startIcon={<HelpIcon />}
              fullWidth
              onClick={() => handleActionButtonClick('help')}
              sx={{ 
                justifyContent: 'flex-start',
                py: 1.2,
                fontSize: isMobile ? '0.7rem' : '0.8rem',
                borderRadius: 1,
              }}
            >
              {t.helpButton}
            </Button>
          </Box>
        </Box>
      )}

      {/* Диалог авторизации с компонентом CreateUser */}
      <Dialog
        open={authDialogOpen}
        onClose={handleCloseAuthDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <CreateUser onClose={handleCloseAuthDialog} />
        </DialogContent>
      </Dialog>

      {/* Новое модальное окно для связи с поддержкой */}
      <Dialog
        open={supportDialogOpen}
        onClose={handleCloseSupportDialog}
        fullWidth
        maxWidth="sm"
      >
        <DialogTitle>{getDialogTitle()}</DialogTitle>
        <DialogContent>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t.instructions}
          </Typography>
          
          <Box sx={{ 
            display: 'flex', 
            alignItems: 'center', 
            justifyContent: 'space-between',
            p: 2,
            backgroundColor: '#f5f5f5',
            borderRadius: 1,
            mb: 3
          }}>
            <Box>
              <Typography variant="body2" color="text.secondary">
                {t.supportEmail}
              </Typography>
              <Typography variant="h6" color="primary.main">
                support@nadoby.com.ua
              </Typography>
            </Box>
            <IconButton 
              onClick={copyEmailToClipboard}
              color="primary"
              sx={{ ml: 1 }}
            >
              <ContentCopyIcon />
            </IconButton>
          </Box>

          {apartmentTitle && (
            <Typography variant="body2" color="text.secondary" sx={{ mb: 2 }}>
              Объявление: {apartmentTitle}
            </Typography>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleCloseSupportDialog}>
            {t.close}
          </Button>
          <Button 
            onClick={openEmailClient}
            variant="contained"
            startIcon={<EmailIcon />}
          >
            {t.openEmail}
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar для уведомлений */}
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
    </Box>
  );
};

export default FileUploadSlider;