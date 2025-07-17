



'use client';

import React, { useState } from 'react';
import { useLanguage } from '@/app/LanguageContext';
import { Button, Typography, Box, IconButton } from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import DeleteIcon from '@mui/icons-material/Delete';
import Logo from './Logo';
import { useSwipeable } from 'react-swipeable';
import { useEffect } from 'react';

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

export default function FileUploadSlider({ setUploudImages, onValidationChange }) {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage] || translations.ru;

  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

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
        const uploadedUrls = Array.isArray(data.url) ? data.url : [data.url];
        setUploudImages((prev) => [...prev, ...uploadedUrls]);
      } else {
        setMessage(`❌ Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage(t.uploadError);
    }
  };

  // const handleFileChange = (e) => {
  //   const files = Array.from(e.target.files);
  //   const newImages = files.map((file) => ({
  //     file,
  //     preview: URL.createObjectURL(file),
  //   }));

  //   setImages((prev) => [...prev, ...newImages]);
  //   setCurrentIndex(0);
  //   uploadFiles(files);
  // };


  useEffect(() => {
    const isValid = images.length >= 3;
    if (onValidationChange) {
      onValidationChange(isValid);
    }
  }, [images]);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
  
    if (images.length >= 15) {
      setMessage("❌ Можно загрузить максимум 15 фото");
      return;
    }
  
    const allowedCount = 15 - images.length;
    const filesToAdd = files.slice(0, allowedCount);
  
    if (files.length > allowedCount) {
      setMessage(`⚠️ Можно добавить только ${allowedCount} фото`);
    } else {
      setMessage('');
    }
  
    const newImages = filesToAdd.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
  
    setImages((prev) => [...prev, ...newImages]);
    // setCurrentIndex(0);
    setCurrentIndex((prev) => images.length + newImages.length - 1);
    uploadFiles(filesToAdd);
  };
  

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(Math.max(0, updatedImages.length - 1));
    }
  };

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

  // Добавляем обработчики свайпа
  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true, // чтобы можно было тестировать на ПК мышью
  });

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
      {/* <label htmlFor="file-upload">
        <Button variant="contained" color="primary" component="span">
          {t.addPhotos}
        </Button>
      </label> */}


<Box>
  <label htmlFor="file-upload">
    <Button
      variant="contained"
      color="primary"
      component="span"
      disabled={images.length >= 15}
    >
      {t.addPhotos}
    </Button>
  </label>

  {images.length >= 15 && (
    <Typography variant="caption" color="error" sx={{ mt: 1, display: 'block' }}>
      Ви досягли ліміту в 15 фото ✅
    </Typography>
  )}
</Box>


      {images.length > 0 && (
        <Box mt={4}>
          <Box
            {...swipeHandlers} // Вешаем обработчики свайпа сюда
            sx={{
              position: 'relative',
              height: 600,
              borderRadius: 2,
              boxShadow: 3,
              overflow: 'hidden',
              '&:hover .nav-arrow': { opacity: 1 },
              touchAction: 'pan-y', // Чтобы вертикальная прокрутка работала нормально
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
                  userSelect: 'none',
                  pointerEvents: 'none', // чтобы свайпы точно не конфликтовали с кликами
                }}
                draggable={false} // отключаем перетаскивание браузером
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
              }}
            >
              <ArrowBackIosNewIcon fontSize="large" />
            </IconButton>

            <IconButton
              className="nav-arrow"
              onClick={handleNext}
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


