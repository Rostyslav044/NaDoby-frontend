



// 'use client';

// import React, { useState } from 'react';
// import Logo from './Logo'; // ✅ Импорт логотипа

// export default function FileUploadSlider({setUploudImages}) {
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages([...newImages, ...images]); // Новые фото сверху
    
//     setCurrentIndex(0);
//   };

//   const handleUpload = async () => {
//     if (images.length === 0) {
//       setMessage('Пожалуйста, выберите файл(ы)');
//       return;
//     }

//     const formData = new FormData();
//     images.forEach((imgObj) => {
//       formData.append('file', imgObj.file);
//     });

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Файлы загружены!');
//         setUploudImages([data.url]);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Ошибка при загрузке');
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(updatedImages.length - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto', padding: 20, textAlign: 'center' }}>
//       <h2>Загрузка файлов</h2>

//       <input type="file" multiple accept="image/*" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload} style={{ marginTop: 10 }}>
//         Загрузить
//       </button>

//       {images.length > 0 && (
//         <div style={{ marginTop: 30 }}>
//           <div style={{ position: 'relative', height: 600 }}>
//             {/* Отображение изображения */}
//             <img
//               src={images[currentIndex].preview}
//               alt={`preview-${currentIndex}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 borderRadius: '12px',
//                 boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
//               }}
//             />

//             {/* Кнопка удаления */}
//             <button
//               onClick={() => handleDelete(currentIndex)}
//               style={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 backgroundColor: '#d32f2f',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '50%',
//                 width: 32,
//                 height: 32,
//                 fontWeight: 'bold',
//                 fontSize: 16,
//                 cursor: 'pointer',
//                 zIndex: 2,
//               }}
//             >
//               ×
//             </button>

//             {/* Логотип как водяной знак */}
//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: 10,
//                 // right: 10,
//                 zIndex: 2,
//                 // opacity: 0.4,
//                 width: 120,
//                 height: 'auto',
//               }}
//             >
//               <Logo />
//             </div>
//           </div>

//           {/* Кнопки переключения */}
//           <div style={{ marginTop: 15 }}>
//             <button onClick={handlePrev} disabled={currentIndex === 0}>
//               ◀
//             </button>
//             <span style={{ margin: '0 12px' }}>
//               {currentIndex + 1} / {images.length}
//             </span>
//             <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
//               ▶
//             </button>
//           </div>
//         </div>
//       )}

//       {message && <p style={{ marginTop: 20 }}>{message}</p>}
//     </div>
//   );
// }






// import React, { useState } from 'react';
// import Logo from './Logo';

// export default function FileUploadSlider({ setUploudImages }) {
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const uploadFiles = async (files) => {
//     if (files.length === 0) {
//       setMessage('Пожалуйста, выберите файл(ы)');
//       return;
//     }

//     const formData = new FormData();
//     files.forEach((file) => {
//       formData.append('file', file);
//     });

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Файлы загружены!');
//         setUploudImages([data.url]);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Ошибка при загрузке');
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     // Новые фото сверху
//     setImages((prev) => [...newImages, ...prev]);
//     setCurrentIndex(0);

//     // Автоматически загружаем файлы при выборе
//     uploadFiles(files);
//   };

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(updatedImages.length - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 800, margin: 'auto', padding: 20, textAlign: 'center' }}>
//       <h2>Загрузка файлов</h2>

//       <input type="file" multiple accept="image/*" onChange={handleFileChange} />

//       {images.length > 0 && (
//         <div style={{ marginTop: 30 }}>
//           <div style={{ position: 'relative', height: 600 }}>
//             <img
//               src={images[currentIndex].preview}
//               alt={`preview-${currentIndex}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 borderRadius: '12px',
//                 boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
//               }}
//             />

//             <button
//               onClick={() => handleDelete(currentIndex)}
//               style={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 backgroundColor: '#d32f2f',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '50%',
//                 width: 32,
//                 height: 32,
//                 fontWeight: 'bold',
//                 fontSize: 16,
//                 cursor: 'pointer',
//                 zIndex: 2,
//               }}
//             >
//               ×
//             </button>

//             <div
//               style={{
//                 position: 'absolute',
//                 bottom: 10,
//                 zIndex: 2,
//                 width: 120,
//                 height: 'auto',
//               }}
//             >
//               <Logo />
//             </div>
//           </div>

//           <div style={{ marginTop: 15 }}>
//             <button onClick={handlePrev} disabled={currentIndex === 0}>
//               ◀
//             </button>
//             <span style={{ margin: '0 12px' }}>
//               {currentIndex + 1} / {images.length}
//             </span>
//             <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
//               ▶
//             </button>
//           </div>
//         </div>
//       )}

//       {message && <p style={{ marginTop: 20 }}>{message}</p>}
//     </div>
//   );
// }




// 'use client';

// import React, { useState } from 'react';
// import { useLanguage } from '@/app/LanguageContext'; // Подключаем контекст языка
// import { Button, Typography, Box, IconButton } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Logo from './Logo';
// import { LanguageProvider } from '@/app/LanguageContext';

// const translations = {
//   ru: {
//     addPhotos: 'Добавить фото',
//     uploadFiles: 'Загрузить фото объекта',
//     filesUploaded: '✅ Файлы загружены!',
//     selectFiles: 'Пожалуйста, выберите файл(ы)',
//     uploadError: '❌ Ошибка при загрузке',
//     photos: 'Фото',
//     back: 'Назад',
//     next: 'Вперёд',
//   },
//   ua: {
//     addPhotos: 'Додати фото',
//     uploadFiles: "Завантажити фото об'єкта",

//     filesUploaded: '✅ Файли завантажено!',
//     selectFiles: 'Будь ласка, оберіть файл(и)',
//     uploadError: '❌ Помилка при завантаженні',
//     photos: 'Фото',
//     back: 'Назад',
//     next: 'Вперед',
//   },
// };

// export default function FileUploadSlider({ setUploudImages }) {
//   const { currentLanguage } = useLanguage(); // Получаем текущий язык из контекста
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
//     files.forEach((file) => {
//       formData.append('file', file);
//     });

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(t.filesUploaded);
//         setUploudImages([data.url]);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(t.uploadError);
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     setImages((prev) => [...newImages, ...prev]);
//     setCurrentIndex(0);
//     uploadFiles(files);
//   };

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(updatedImages.length - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (

//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, textAlign: 'center' }}>
//       <Typography variant="h4" component="h2" gutterBottom>
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
//       <label htmlFor="file-upload">
//         <Button variant="contained" color="primary" component="span">
//           {t.addPhotos}
//         </Button>
//       </label>

//       {images.length > 0 && (
//         <Box mt={4}>
//           <Box
//             sx={{
//               position: 'relative',
//               height: 600,
//               borderRadius: 2,
//               boxShadow: 3,
//               overflow: 'hidden',
//             }}
//           >
//             <img
//               src={images[currentIndex].preview}
//               alt={`${t.photos} ${currentIndex + 1}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 borderRadius: '12px',
//               }}
//             />

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

//           <Box mt={2} display="flex" justifyContent="center" alignItems="center" gap={2}>
//             <Button
//               variant="outlined"
//               startIcon={<ArrowBackIosNewIcon />}
//               onClick={handlePrev}
//               disabled={currentIndex === 0}
//             >
//               {t.back}
//             </Button>

//             <Typography variant="body1">
//               {currentIndex + 1} / {images.length}
//             </Typography>

//             <Button
//               variant="outlined"
//               endIcon={<ArrowForwardIosIcon />}
//               onClick={handleNext}
//               disabled={currentIndex === images.length - 1}
//             >
//               {t.next}
//             </Button>
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
// import { useLanguage } from '@/app/LanguageContext';
// import { Button, Typography, Box, IconButton } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import DeleteIcon from '@mui/icons-material/Delete';
// import Logo from './Logo';

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

// export default function FileUploadSlider({ setUploudImages }) {
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
//     files.forEach((file) => {
//       formData.append('file', file);
//     });

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(t.filesUploaded);
//         setUploudImages([data.url]);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage(t.uploadError);
//     }
//   };

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     setImages((prev) => [...newImages, ...prev]);
//     setCurrentIndex(0);
//     uploadFiles(files);
//   };

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(updatedImages.length - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, textAlign: 'center' }}>
//       <Typography variant="h4" component="h2" gutterBottom>
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
//       <label htmlFor="file-upload">
//         <Button variant="contained" color="primary" component="span">
//           {t.addPhotos}
//         </Button>
//       </label>

//       {images.length > 0 && (
//         <Box mt={4}>
//           <Box
//             sx={{
//               position: 'relative',
//               height: 600,
//               borderRadius: 2,
//               boxShadow: 3,
//               overflow: 'hidden',
//               '&:hover .nav-arrow': {
//                 opacity: 1,
//               }
//             }}
//           >
//             <img
//               src={images[currentIndex].preview}
//               alt={`${t.photos} ${currentIndex + 1}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'cover',
//                 borderRadius: '12px',
//               }}
//             />

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

//             {/* Левая стрелка навигации */}
//             <IconButton
//               className="nav-arrow"
//               onClick={handlePrev}
//               disabled={currentIndex === 0}
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
//                 '&.Mui-disabled': {
//                   opacity: 0,
//                 }
//               }}
//             >
//               <ArrowBackIosNewIcon fontSize="large" />
//             </IconButton>

//             {/* Правая стрелка навигации */}
//             <IconButton
//               className="nav-arrow"
//               onClick={handleNext}
//               disabled={currentIndex === images.length - 1}
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
//                 '&.Mui-disabled': {
//                   opacity: 0,
//                 }
//               }}
//             >
//               <ArrowForwardIosIcon fontSize="large" />
//             </IconButton>

//             {/* Индикатор текущего фото */}
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





'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/LanguageContext';
import { Button, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import Logo from './Logo';

const translations = {
  ru: {
    addPhotos: 'Добавить фото',
    uploadFiles: 'Загрузить фото объекта',
    filesUploaded: '✅ Файлы загружены!',
    selectFiles: 'Пожалуйста, выберите файл(ы)',
    uploadError: '❌ Ошибка при загрузке',
    photos: 'Фото',
  },
  ua: {
    addPhotos: 'Додати фото',
    uploadFiles: "Завантажити фото об'єкта",
    filesUploaded: '✅ Файли завантажено!',
    selectFiles: 'Будь ласка, оберіть файл(и)',
    uploadError: '❌ Помилка при завантаженні',
    photos: 'Фото',
  },
};

export default function FileUploadSlider({ setUploudImages }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.ru;

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [direction, setDirection] = useState(null); // 'left' или 'right'

  const uploadFiles = async (files) => {
    if (files.length === 0) {
      setMessage(t.selectFiles);
      return;
    }

    const formData = new FormData();
    files.forEach((file) => formData.append('file', file));

    try {
      const res = await fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage(t.filesUploaded);
        setUploudImages([data.url]);
      } else {
        setMessage(`❌ Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(t.uploadError);
    }
  };

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));

    setImages((prev) => [...newImages, ...prev]);
    setCurrentIndex(0);
    uploadFiles(files);
  };

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(updatedImages.length - 1);
    }
  };

  // const handleNext = () => {
  //   if (currentIndex < images.length - 1) {
  //     setDirection('right');
  //     setTimeout(() => {
  //       setCurrentIndex(currentIndex + 1);
  //       setDirection(null);
  //     }, 300);
  //   }
  // };

  // const handlePrev = () => {
  //   if (currentIndex > 0) {
  //     setDirection('left');
  //     setTimeout(() => {
  //       setCurrentIndex(currentIndex - 1);
  //       setDirection(null);
  //     }, 300);
  //   }
  // };



  const handleNext = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) => (prevIndex + 1) % images.length);
  };

  const handlePrev = () => {
    if (images.length === 0) return;
    setCurrentIndex((prevIndex) =>
      (prevIndex - 1 + images.length) % images.length
    );
  };




  return (
    <Box sx={{ maxWidth: 800, mx: 'auto', p: 3, textAlign: 'center' }}>
      <Typography variant="h4" gutterBottom>
        {t.uploadFiles}
      </Typography>

      <input
        accept="image/*"
        id="file-upload"
        multiple
        type="file"
        onChange={handleFileChange}
        style={{ display: 'none' }}
      />
      <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          {t.addPhotos}
        </Button>
      </label>

      {images.length > 0 && (
        <Box mt={4}>
          <Box
            sx={{
              position: 'relative',
              height: 600,
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              '&:hover .nav-arrow': { opacity: 1 },
            }}
          >
            <Box
              key={currentIndex}
              sx={{
                width: '100%',
                height: '100%',
                position: 'absolute',
                top: 0,
                left: 0,
                transition: 'transform 0.3s ease',
                transform:
                  direction === 'left'
                    ? 'translateX(-100%)'
                    : direction === 'right'
                    ? 'translateX(100%)'
                    : 'translateX(0)',
              }}
            >
              <img
                src={images[currentIndex].preview}
                alt={`${t.photos} ${currentIndex + 1}`}
                style={{
                  width: '100%',
                  height: '100%',
                  objectFit: 'cover',
                  borderRadius: '12px',
                }}
              />
            </Box>

            <IconButton
              onClick={() => handleDelete(currentIndex)}
              sx={{
                position: 'absolute',
                top: 8,
                right: 8,
                bgcolor: 'error.main',
                color: 'common.white',
                '&:hover': { bgcolor: 'error.dark' },
              }}
            >
              <DeleteIcon />
            </IconButton>

            <IconButton
              className="nav-arrow"
              onClick={handlePrev}
              disabled={currentIndex === 0}
              sx={{
                position: 'absolute',
                left: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                color: 'primary.main',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  opacity: 1,
                },
                '&.Mui-disabled': { opacity: 0 },
              }}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>

            <IconButton
              className="nav-arrow"
              onClick={handleNext}
              // disabled={currentIndex === images.length - 1}
              sx={{
                position: 'absolute',
                right: 16,
                top: '50%',
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(255, 255, 255, 0.8)',
                color: 'primary.main',
                opacity: 0.7,
                transition: 'opacity 0.3s',
                '&:hover': {
                  bgcolor: 'rgba(255, 255, 255, 0.9)',
                  opacity: 1,
                },
                '&.Mui-disabled': { opacity: 0 },
              }}
            >
              <ArrowForwardIosIcon fontSize="large" />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 16,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0, 0, 0, 0.5)',
                color: 'white',
                px: 2,
                py: 1,
                borderRadius: 4,
                fontSize: '0.9rem',
              }}
            >
              {currentIndex + 1} / {images.length}
            </Box>

            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: 8,
                width: 120,
                opacity: 0.7,
              }}
            >
              <Logo />
            </Box>
          </Box>
        </Box>
      )}

      {message && (
        <Typography variant="body2" color="text.secondary" mt={3}>
          {message}
        </Typography>
      )}
    </Box>
  );
}
