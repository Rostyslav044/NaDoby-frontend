
// // // етот компонент слайт фото и контактная информация








// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { Box, IconButton, Typography, Button, Avatar, Divider } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import { useSwipeable } from 'react-swipeable';
// import ReportIcon from '@mui/icons-material/Report';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import HelpIcon from '@mui/icons-material/Help';
// import PhoneIcon from '@mui/icons-material/Phone';

// const FileUploadSlider = ({ 
//   photos = [], 
//   onDelete, 
//   price = '0', 
//   name = 'Имя не указано', 
//   phones = ['Не указан'],
//   address = '',
//   category = ''
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showThumbnails, setShowThumbnails] = useState(true);
//   const thumbsRef = useRef(null);

//   const sizes = {
//     main: {
//       height: '500px',
//       width: '850px',
//     },
//     thumbnails: {
//       width: '273px',
//       height: '200px',
//       gap: '10px',
//     }
//   };

//   const handleNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
//   const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

//   const scrollThumbs = (index) => {
//     if (thumbsRef.current) {
//       const thumbWidth = parseInt(sizes.thumbnails.width);
//       const gap = parseInt(sizes.thumbnails.gap);
//       thumbsRef.current.scrollTo({
//         left: index * (thumbWidth + gap),
//         behavior: 'smooth'
//       });
//     }
//   };

//   const mainSwipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   useEffect(() => {
//     scrollThumbs(currentIndex);
//   }, [currentIndex]);

//   const handlePhoneClick = (phone) => {
//     if (phone && phone !== 'Не указан') {
//       window.open(`tel:${phone.replace(/\D/g, '')}`);
//     }
//   };

//   const isHourly = category && (category.toLowerCase().includes('сауна') || category.toLowerCase().includes('баня'));

//   if (photos.length === 0) {
//     return (
//       <Box sx={{ 
//         height: 300, 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         mb: 3,
//       }}>
//         <Typography>Фото отсутствуют</Typography>
//       </Box>
//     );
//   }

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
//       {/* Блок с фото */}
//       <Box sx={{ 
//         width: sizes.main.width,
//         flexShrink: 0,
//       }}>
//         {/* Основное фото */}
//         <Box
//           {...mainSwipeHandlers}
//           sx={{
//             width: '100%',
//             height: sizes.main.height,
//             position: 'relative',
//             overflow: 'hidden',
//           }}
//         >
//           <img
//             src={photos[currentIndex]}
//             alt={`Фото ${currentIndex + 1}`}
//             style={{
//               width: '100%',
//               height: '100%',
//               objectFit: 'cover',
//               display: 'block',
//             }}
//           />
          
//           {photos.length > 1 && (
//             <>
//               <IconButton 
//                 onClick={handlePrev}
//                 sx={{
//                   position: 'absolute',
//                   left: 16,
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   bgcolor: 'rgba(255,255,255,0.9)',
//                 }}
//               >
//                 <ArrowBackIosNewIcon />
//               </IconButton>
//               <IconButton 
//                 onClick={handleNext}
//                 sx={{
//                   position: 'absolute',
//                   right: 16,
//                   top: '50%',
//                   transform: 'translateY(-50%)',
//                   bgcolor: 'rgba(255,255,255,0.9)',
//                 }}
//               >
//                 <ArrowForwardIosIcon />
//               </IconButton>
//             </>
//           )}

//           <Box sx={{
//             position: 'absolute',
//             bottom: 20,
//             right: 20,
//             bgcolor: 'rgba(0,0,0,0.7)',
//             color: 'white',
//             px: 2,
//             py: 1,
//             borderRadius: 4,
//           }}>
//             {currentIndex + 1}/{photos.length}
//           </Box>

//           {onDelete && (
//             <IconButton
//               onClick={() => onDelete(currentIndex)}
//               sx={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 bgcolor: 'error.main',
//                 color: 'white',
//               }}
//             >
//               <DeleteIcon />
//             </IconButton>
//           )}
//         </Box>

//         {/* Миниатюры */}
//         {showThumbnails && photos.length > 1 && (
//           <Box
//             ref={thumbsRef}
//             sx={{
//               display: 'flex',
//               gap: sizes.thumbnails.gap,
//               p: 0,
//               marginTop: '10px',
//               bgcolor: '#f0f0f0',
//               overflowX: 'auto',
//             }}
//           >
//             {photos.map((photo, index) => (
//               <Box
//                 key={index}
//                 onClick={() => setCurrentIndex(index)}
//                 sx={{
//                   width: sizes.thumbnails.width,
//                   height: sizes.thumbnails.height,
//                   flexShrink: 0,
//                   cursor: 'pointer',
//                   border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
//                   borderRadius: 1,
//                   overflow: 'hidden',
//                 }}
//               >
//                 <img
//                   src={photo}
//                   alt={`Миниатюра ${index + 1}`}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                 />
//               </Box>
//             ))}
//           </Box>
//         )}
//       </Box>

//       {/* Информационный блок */}
//       <Box sx={{
//         width: '300px',
//         flexShrink: 0,
//         p: 3,
//         bgcolor: '#f9f9f9',
//         borderLeft: '1px solid #e0e0e0',
//         display: 'flex',
//         flexDirection: 'column',
//       }}>
//         {/* Цена */}
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

       
     




// {/* Контактная информация */}
// <Box sx={{ 
//   mb: 3,
//   backgroundColor: '#f5eee0',
//   p: 2,
//   borderRadius: 1,
//   border: '1px solid #e0e0e0'
// }}>
//   <Typography variant="h6" sx={{ 
//     fontWeight: 'bold',
//     mb: 1.5,
//     fontSize: '1.1rem'
//   }}>
//     {name}
//   </Typography>
  
//   <Typography variant="body1" sx={{ 
//     mb: 2,
//     fontSize: '1.1rem',
//     color: 'text.secondary'
//   }}>
//     Зателефонуйте власнику, щоб уточнити всі деталі оренди.
//   </Typography>

//   <Box sx={{ 
//     display: 'flex', 
//     alignItems: 'center',
//     gap: 2,
//     p: 1.5,
//     bgcolor: '#f5f5f5',
//     borderRadius: 1,
//   }}>
//     <Avatar 
//       sx={{ 
//         bgcolor: 'primary.main', 
//         width: 36, 
//         height: 36,
//         cursor: 'pointer'
//       }}
//       onClick={(e) => {
//         e.preventDefault();
//         handlePhoneClick(phones[0]);
//       }}
//     >
//       <PhoneIcon fontSize="small" />
//     </Avatar>
//     <Box>
//       <Typography 
//         component="a"
//         href={`tel:${phones[0].replace(/\D/g, '')}`}
//         onClick={(e) => {
//           e.preventDefault();
//           handlePhoneClick(phones[0]);
//         }}
//         sx={{
//           color: 'primary.main',
//           textDecoration: 'none',
//           '&:hover': { textDecoration: 'underline' },
//           cursor: 'pointer',
//           fontSize: '1rem',
//           fontWeight: 'bold',
//           display: 'block',
//         }}
//       >
//         {phones[0]}
//       </Typography>
//     </Box>
//   </Box>
// </Box>



//         <Divider sx={{ my: 2 }} />

//         {/* Кнопки действий */}
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



// 'use client';

// import React, { useState, useRef, useEffect } from 'react';
// import { 
//   Box, 
//   IconButton, 
//   Typography, 
//   Button, 
//   Avatar, 
//   Divider,
//   Input 
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import AddPhotoAlternateIcon from '@mui/icons-material/AddPhotoAlternate';
// import { useSwipeable } from 'react-swipeable';
// import ReportIcon from '@mui/icons-material/Report';
// import FeedbackIcon from '@mui/icons-material/Feedback';
// import HelpIcon from '@mui/icons-material/Help';
// import PhoneIcon from '@mui/icons-material/Phone';

// const FileUploadSlider = ({ 
//   photos = [], 
//   onDelete, 
//   price = '0', 
//   name = 'Имя не указано', 
//   phones = ['Не указан'],
//   address = '',
//   category = '',
//   editable = false,
//   onUpload = () => {}
// }) => {
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [showThumbnails, setShowThumbnails] = useState(true);
//   const thumbsRef = useRef(null);
//   const fileInputRef = useRef(null);

//   const sizes = {
//     main: {
//       height: '500px',
//       width: '850px',
//     },
//     thumbnails: {
//       width: '273px',
//       height: '200px',
//       gap: '10px',
//     }
//   };

//   const handleNext = () => setCurrentIndex((prev) => (prev + 1) % photos.length);
//   const handlePrev = () => setCurrentIndex((prev) => (prev - 1 + photos.length) % photos.length);

//   const scrollThumbs = (index) => {
//     if (thumbsRef.current) {
//       const thumbWidth = parseInt(sizes.thumbnails.width);
//       const gap = parseInt(sizes.thumbnails.gap);
//       thumbsRef.current.scrollTo({
//         left: index * (thumbWidth + gap),
//         behavior: 'smooth'
//       });
//     }
//   };

//   const mainSwipeHandlers = useSwipeable({
//     onSwipedLeft: handleNext,
//     onSwipedRight: handlePrev,
//     preventDefaultTouchmoveEvent: true,
//     trackMouse: true
//   });

//   useEffect(() => {
//     scrollThumbs(currentIndex);
//   }, [currentIndex]);

//   const handlePhoneClick = (phone) => {
//     if (phone && phone !== 'Не указан') {
//       window.open(`tel:${phone.replace(/\D/g, '')}`);
//     }
//   };

//   const isHourly = category && (category.toLowerCase().includes('сауна') || category.toLowerCase().includes('баня'));

//   const handleFileUpload = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length > 0) {
//       onUpload(files);
//     }
//   };

//   const triggerFileInput = () => {
//     fileInputRef.current.click();
//   };

//   if (photos.length === 0 && !editable) {
//     return (
//       <Box sx={{ 
//         height: 300, 
//         display: 'flex', 
//         justifyContent: 'center', 
//         alignItems: 'center',
//         backgroundColor: '#f5f5f5',
//         mb: 3,
//       }}>
//         <Typography>Фото отсутствуют</Typography>
//       </Box>
//     );
//   }

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
//       {/* Блок с фото */}
//       <Box sx={{ 
//         width: sizes.main.width,
//         flexShrink: 0,
//         position: 'relative'
//       }}>
//         {/* Поле для загрузки файлов (скрытое) */}
//         <Input
//           inputRef={fileInputRef}
//           type="file"
//           onChange={handleFileUpload}
//           inputProps={{ 
//             accept: 'image/*',
//             multiple: true 
//           }}
//           sx={{ display: 'none' }}
//         />

//         {/* Основное фото */}
//         {photos.length > 0 ? (
//           <Box
//             {...mainSwipeHandlers}
//             sx={{
//               width: '100%',
//               height: sizes.main.height,
//               position: 'relative',
//               overflow: 'hidden',
//             }}
//           >
//             <img
//               src={photos[currentIndex]}
//               alt={`Фото ${currentIndex + 1}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 display: 'block',
//               }}
//             />
            
//             {photos.length > 1 && (
//               <>
//                 <IconButton 
//                   onClick={handlePrev}
//                   sx={{
//                     position: 'absolute',
//                     left: 16,
//                     top: '50%',
//                     transform: 'translateY(-50%)',
//                     bgcolor: 'rgba(255,255,255,0.9)',
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
//                     bgcolor: 'rgba(255,255,255,0.9)',
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
//               {currentIndex + 1}/{photos.length}
//             </Box>

//             {editable && onDelete && (
//               <IconButton
//                 onClick={() => onDelete(currentIndex)}
//                 sx={{
//                   position: 'absolute',
//                   top: 10,
//                   right: 10,
//                   bgcolor: 'error.main',
//                   color: 'white',
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
//               border: '2px dashed #ccc',
//               cursor: 'pointer'
//             }}
//             onClick={triggerFileInput}
//           >
//             <AddPhotoAlternateIcon sx={{ fontSize: 48, color: 'text.secondary', mb: 2 }} />
//             <Typography variant="h6" color="text.secondary">
//               Добавьте фотографии
//             </Typography>
//             <Typography variant="body2" color="text.secondary" sx={{ mt: 1 }}>
//               Нажмите для загрузки или перетащите сюда
//             </Typography>
//           </Box>
//         )}

//         {/* Миниатюры */}
//         {(photos.length > 0 || editable) && showThumbnails && (
//           <Box
//             ref={thumbsRef}
//             sx={{
//               display: 'flex',
//               gap: sizes.thumbnails.gap,
//               p: 0,
//               marginTop: '10px',
//               bgcolor: '#f0f0f0',
//               overflowX: 'auto',
//               minHeight: sizes.thumbnails.height
//             }}
//           >
//             {photos.map((photo, index) => (
//               <Box
//                 key={index}
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
//                   src={photo}
//                   alt={`Миниатюра ${index + 1}`}
//                   style={{
//                     width: '100%',
//                     height: '100%',
//                     objectFit: 'cover',
//                   }}
//                 />
//                 {editable && (
//                   <IconButton
//                     onClick={(e) => {
//                       e.stopPropagation();
//                       onDelete(index);
//                     }}
//                     sx={{
//                       position: 'absolute',
//                       top: 4,
//                       right: 4,
//                       bgcolor: 'error.main',
//                       color: 'white',
//                       '&:hover': {
//                         bgcolor: 'error.dark'
//                       }
//                     }}
//                   >
//                     <DeleteIcon fontSize="small" />
//                   </IconButton>
//                 )}
//               </Box>
//             ))}
            
//             {editable && (
//               <Box
//                 onClick={triggerFileInput}
//                 sx={{
//                   width: sizes.thumbnails.width,
//                   height: sizes.thumbnails.height,
//                   flexShrink: 0,
//                   cursor: 'pointer',
//                   border: '1px dashed #ccc',
//                   borderRadius: 1,
//                   display: 'flex',
//                   flexDirection: 'column',
//                   justifyContent: 'center',
//                   alignItems: 'center',
//                   backgroundColor: '#fafafa'
//                 }}
//               >
//                 <AddPhotoAlternateIcon sx={{ color: 'text.secondary' }} />
//                 <Typography variant="caption" color="text.secondary">
//                   Добавить
//                 </Typography>
//               </Box>
//             )}
//           </Box>
//         )}
//       </Box>

//       {/* Информационный блок */}
//       <Box sx={{
//         width: '300px',
//         flexShrink: 0,
//         p: 3,
//         bgcolor: '#f9f9f9',
//         borderLeft: '1px solid #e0e0e0',
//         display: 'flex',
//         flexDirection: 'column',
//       }}>
//         {/* Цена */}
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

//         {/* Контактная информация */}
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
//               onClick={(e) => {
//                 e.preventDefault();
//                 handlePhoneClick(phones[0]);
//               }}
//             >
//               <PhoneIcon fontSize="small" />
//             </Avatar>
//             <Box>
//               <Typography 
//                 component="a"
//                 href={`tel:${phones[0].replace(/\D/g, '')}`}
//                 onClick={(e) => {
//                   e.preventDefault();
//                   handlePhoneClick(phones[0]);
//                 }}
//                 sx={{
//                   color: 'primary.main',
//                   textDecoration: 'none',
//                   '&:hover': { textDecoration: 'underline' },
//                   cursor: 'pointer',
//                   fontSize: '1rem',
//                   fontWeight: 'bold',
//                   display: 'block',
//                 }}
//               >
//                 {phones[0]}
//               </Typography>
//             </Box>
//           </Box>
//         </Box>

//         <Divider sx={{ my: 2 }} />

//         {/* Кнопки действий */}
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
  const fileInputRef = useRef(null);

  // Инициализация фото
  useEffect(() => {
    if (Array.isArray(photos) && photos.length > 0) {
      setLocalPhotos(photos);
    }
  }, [photos]);

  // Обработчик загрузки файлов
  const handleFileUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    setIsLoading(true);
    try {
      const newPhotos = [...localPhotos];
      
      // Обрабатываем каждый файл
      for (const file of files) {
        // Проверяем тип файла
        if (!file.type.startsWith('image/')) continue;
        
        // Читаем файл как Data URL
        const reader = new FileReader();
        const fileUrl = await new Promise((resolve) => {
          reader.onload = (e) => resolve(e.target.result);
          reader.readAsDataURL(file);
        });

        newPhotos.push({
          file,
          url: fileUrl,
          id: Date.now() + Math.random().toString(36).substr(2, 9)
        });
      }

      setLocalPhotos(newPhotos);
      setCurrentIndex(newPhotos.length - 1);
      if (setUploadImages) {
        setUploadImages(newPhotos.map(photo => photo.file));
      }

      if (onPhotosChange) {
        onPhotosChange(newPhotos.length);
      }
    } catch (error) {
      console.error('Ошибка загрузки файлов:', error);
    } finally {
      setIsLoading(false);
      e.target.value = ''; // Сбрасываем input
    }
  }, [localPhotos, setUploadImages, onPhotosChange]);

  // Обработчик удаления фото
  const handleDeletePhoto = useCallback((index) => {
    const newPhotos = localPhotos.filter((_, i) => i !== index);
    setLocalPhotos(newPhotos);
    
    if (setUploadImages) {
      setUploadImages(newPhotos.map(photo => photo.file));
    }
    
    if (onPhotosChange) {
      onPhotosChange(newPhotos.length);
    }

    // Корректируем текущий индекс
    if (currentIndex >= newPhotos.length) {
      setCurrentIndex(Math.max(0, newPhotos.length - 1));
    }
  }, [localPhotos, currentIndex, setUploadImages, onPhotosChange]);

  const handleNext = useCallback(() => {
    if (localPhotos.length <= 1) return;
    setCurrentIndex((prev) => (prev + 1) % localPhotos.length);
  }, [localPhotos.length]);

  const handlePrev = useCallback(() => {
    if (localPhotos.length <= 1) return;
    setCurrentIndex((prev) => (prev - 1 + localPhotos.length) % localPhotos.length);
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
  const isHourly = category?.toLowerCase().includes('сауна') || category?.toLowerCase().includes('баня');

  const sizes = {
    main: { height: '500px', width: '850px' },
    thumbnails: { width: '120px', height: '90px', gap: '10px' }
  };

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
      {/* Блок с фото */}
      <Box sx={{ 
        width: sizes.main.width,
        flexShrink: 0,
        position: 'relative'
      }}>
        {/* Скрытый input для загрузки */}
        <Input
          inputRef={fileInputRef}
          type="file"
          onChange={handleFileUpload}
          inputProps={{ accept: 'image/*', multiple: true }}
          sx={{ display: 'none' }}
        />

        {/* Кнопка добавления фото */}
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
              disabled={isLoading}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Загрузка...
                </>
              ) : 'Добавить фото'}
            </Button>
          </Box>
        )}

        {/* Основное фото */}
        {localPhotos.length > 0 ? (
          <Box {...swipeHandlers} sx={{
            width: '100%',
            height: sizes.main.height,
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
              height: sizes.main.height,
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

        {/* Миниатюры */}
        {localPhotos.length > 0 && (
          <Box sx={{
            display: 'flex',
            gap: sizes.thumbnails.gap,
            p: 2,
            bgcolor: '#f0f0f0',
            overflowX: 'auto',
          }}>
            {localPhotos.map((photo, index) => (
              <Box
                key={photo.id || index}
                onClick={() => setCurrentIndex(index)}
                sx={{
                  width: sizes.thumbnails.width,
                  height: sizes.thumbnails.height,
                  flexShrink: 0,
                  cursor: 'pointer',
                  border: currentIndex === index ? '3px solid #1976d2' : '1px solid #ddd',
                  borderRadius: 1,
                  overflow: 'hidden',
                  position: 'relative'
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
      </Box>

      {/* Информационный блок */}
      <Box sx={{
        width: '300px',
        flexShrink: 0,
        p: 3,
        bgcolor: '#f9f9f9',
        borderLeft: '1px solid #e0e0e0',
        display: 'flex',
        flexDirection: 'column',
      }}>
        {/* Цена */}
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

        {/* Контакты */}
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

        {/* Кнопки действий */}
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