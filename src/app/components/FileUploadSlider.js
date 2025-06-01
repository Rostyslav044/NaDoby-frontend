



'use client';

import React, { useState } from 'react';
import Logo from './Logo'; // ✅ Импорт логотипа

export default function FileUploadSlider() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...newImages, ...images]); // Новые фото сверху
    setCurrentIndex(0);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setMessage('Пожалуйста, выберите файл(ы)');
      return;
    }

    const formData = new FormData();
    images.forEach((imgObj) => {
      formData.append('files', imgObj.file);
    });

    try {
      const res = await fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Файлы загружены!');
      } else {
        setMessage(`❌ Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Ошибка при загрузке');
    }
  };

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(updatedImages.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2>Загрузка файлов</h2>

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} style={{ marginTop: 10 }}>
        Загрузить
      </button>

      {images.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <div style={{ position: 'relative', height: 600 }}>
            {/* Отображение изображения */}
            <img
              src={images[currentIndex].preview}
              alt={`preview-${currentIndex}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            />

            {/* Кнопка удаления */}
            <button
              onClick={() => handleDelete(currentIndex)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              ×
            </button>

            {/* Логотип как водяной знак */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                // right: 10,
                zIndex: 2,
                // opacity: 0.4,
                width: 120,
                height: 'auto',
              }}
            >
              <Logo />
            </div>
          </div>

          {/* Кнопки переключения */}
          <div style={{ marginTop: 15 }}>
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              ◀
            </button>
            <span style={{ margin: '0 12px' }}>
              {currentIndex + 1} / {images.length}
            </span>
            <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
              ▶
            </button>
          </div>
        </div>
      )}

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}




// 'use client';

// import React, { useState } from 'react';
// import Logo from './Logo';
// import {
//   Box,
//   Button,
//   Typography,
//   IconButton,
//   useTheme
// } from '@mui/material';
// import { Delete, NavigateBefore, NavigateNext } from '@mui/icons-material';

// const FileUploadSlider = ({ onFilesSelected }) => {
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const theme = useTheme();

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     if (files.length === 0) return;

//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));

//     const updatedImages = [...newImages, ...images].slice(0, 9);
//     setImages(updatedImages);
//     setCurrentIndex(0);
    
//     // Передаем выбранные файлы родительскому компоненту
//     if (onFilesSelected) {
//       onFilesSelected(updatedImages.map(img => img.file));
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedImages = images.filter((_, i) => i !== index);
//     setImages(updatedImages);
    
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(Math.max(0, updatedImages.length - 1));
//     }
    
//     // Обновляем список файлов у родителя
//     if (onFilesSelected) {
//       onFilesSelected(updatedImages.map(img => img.file));
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
//     <Box sx={{ 
//       maxWidth: 800, 
//       margin: 'auto', 
//       padding: 2, 
//       textAlign: 'center',
//       border: `1px dashed ${theme.palette.divider}`,
//       borderRadius: 2,
//       mt: 2
//     }}>
//       <Typography variant="h6" gutterBottom>Загрузка фотографий</Typography>
//       <Typography variant="body2" color="textSecondary" gutterBottom>
//         Максимум 9 фотографий
//       </Typography>

//       <Button
//         variant="contained"
//         component="label"
//         sx={{ mt: 1, mb: 2 }}
//       >
//         Выбрать файлы
//         <input
//           type="file"
//           hidden
//           multiple
//           accept="image/*"
//           onChange={handleFileChange}
//         />
//       </Button>

//       {images.length > 0 && (
//         <Box sx={{ mt: 2 }}>
//           <Box sx={{ 
//             position: 'relative', 
//             height: 300,
//             display: 'flex',
//             alignItems: 'center',
//             justifyContent: 'center',
//             backgroundColor: theme.palette.grey[100],
//             borderRadius: 1,
//             overflow: 'hidden'
//           }}>
//             {/* Текущее изображение */}
//             <img
//               src={images[currentIndex]?.preview}
//               alt={`preview-${currentIndex}`}
//               style={{
//                 maxWidth: '100%',
//                 maxHeight: '100%',
//                 objectFit: 'contain'
//               }}
//             />

//             {/* Кнопка удаления */}
//             <IconButton
//               onClick={() => handleDelete(currentIndex)}
//               sx={{
//                 position: 'absolute',
//                 top: 8,
//                 right: 8,
//                 backgroundColor: theme.palette.error.main,
//                 color: theme.palette.common.white,
//                 '&:hover': {
//                   backgroundColor: theme.palette.error.dark,
//                 }
//               }}
//             >
//               <Delete />
//             </IconButton>

//             {/* Логотип как водяной знак */}
//             <Box
//               sx={{
//                 position: 'absolute',
//                 bottom: 8,
//                 right: 8,
//                 opacity: 0.7,
//                 width: 80,
//                 height: 'auto',
//               }}
//             >
//               <Logo />
//             </Box>
//           </Box>

//           {/* Навигация */}
//           <Box sx={{ 
//             display: 'flex', 
//             alignItems: 'center', 
//             justifyContent: 'center',
//             mt: 2,
//             gap: 2
//           }}>
//             <IconButton 
//               onClick={handlePrev} 
//               disabled={currentIndex === 0}
//             >
//               <NavigateBefore />
//             </IconButton>
            
//             <Typography>
//               {currentIndex + 1} / {images.length}
//             </Typography>
            
//             <IconButton 
//               onClick={handleNext} 
//               disabled={currentIndex === images.length - 1}
//             >
//               <NavigateNext />
//             </IconButton>
//           </Box>
//         </Box>
//       )}

//       {message && (
//         <Typography 
//           sx={{ 
//             mt: 2,
//             color: message.startsWith('✅') ? 'success.main' : 'error.main'
//           }}
//         >
//           {message}
//         </Typography>
//       )}
//     </Box>
//   );
// };

// export default FileUploadSlider;