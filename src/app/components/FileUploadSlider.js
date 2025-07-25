
// // // етот компонент слайт фото и контактная информация

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
const ALLOWED_FILE_TYPES = ['image/jpeg', 'image/png', 'image/webp'];
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
  const thumbnailsRef = useRef(null);

  useEffect(() => {
    if (thumbnailsRef.current && localPhotos.length > 0) {
      const thumbWidth = parseInt(sizes.thumbnails.width);
      const gap = parseInt(sizes.thumbnails.gap);
      const scrollPos = currentIndex * (thumbWidth + gap) - (thumbnailsRef.current.offsetWidth / 2) + (thumbWidth / 2);
      
      thumbnailsRef.current.scrollTo({
        left: scrollPos,
        behavior: 'smooth'
      });
    }
  }, [currentIndex, localPhotos.length]);
  // Инициализация и очистка фото
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
      } else if (photo instanceof File) {
        return { 
          url: URL.createObjectURL(photo), 
          file: photo, 
          id: `file-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
        };
      }
      return null;
    }).filter(Boolean);

    setLocalPhotos(processedPhotos);

    return () => {
      processedPhotos.forEach(photo => {
        if (photo.file && photo.url.startsWith('blob:')) {
          URL.revokeObjectURL(photo.url);
        }
      });
    };
  }, [photos]);

  // Обработчик загрузки файлов
  const handleFileUpload = useCallback(async (e) => {
    const files = Array.from(e.target.files || []);
    if (files.length === 0) return;

    // Проверка лимита фото
    if (localPhotos.length + files.length > MAX_PHOTOS) {
      alert(`Можно загрузить максимум ${MAX_PHOTOS} фотографий`);
      return;
    }

    setIsLoading(true);
    try {
      const newPhotos = await Promise.all(
        files.map(file => {
          if (!file.type.startsWith('image/') || !ALLOWED_FILE_TYPES.includes(file.type)) {
            return null;
          }
          
          return new Promise((resolve) => {
            const reader = new FileReader();
            reader.onload = (e) => resolve({
              file,
              url: e.target.result,
              id: `new-${Date.now()}-${Math.random().toString(36).substring(2, 5)}`
            });
            reader.readAsDataURL(file);
          });
        })
      );

      const validPhotos = newPhotos.filter(Boolean);
      if (validPhotos.length === 0) {
        alert('Пожалуйста, загружайте только изображения (JPEG, PNG, WebP)');
        return;
      }

      const updatedPhotos = [...localPhotos, ...validPhotos];
      setLocalPhotos(updatedPhotos);
      setCurrentIndex(updatedPhotos.length - 1);
      
console.log(updatedPhotos);

      if (setUploadImages) {
        // setUploadImages(updatedPhotos.map(photo => photo.file || photo.url));
        setUploadImages(updatedPhotos.map(photo =>  photo.url));
      }

      if (onPhotosChange) {
        onPhotosChange(updatedPhotos.length);
      }
    } catch (error) {
      console.error('Ошибка загрузки файлов:', error);
      alert('Произошла ошибка при загрузке файлов');
    } finally {
      setIsLoading(false);
      if (fileInputRef.current) fileInputRef.current.value = '';
    }
  }, [localPhotos, setUploadImages, onPhotosChange]);

  // Обработчик удаления фото
  const handleDeletePhoto = useCallback((index) => {
    const photoToDelete = localPhotos[index];
    if (photoToDelete?.url && photoToDelete?.file) {
      URL.revokeObjectURL(photoToDelete.url);
    }

    const newPhotos = localPhotos.filter((_, i) => i !== index);
    setLocalPhotos(newPhotos);
    
    if (setUploadImages) {
      // setUploadImages(newPhotos.map(photo => photo.file || photo.url));
      setUploadImages(newPhotos.map(photo => 
        {console.log(photo); 
        return photo.url; 
         } ));
      
    }
   
    if (onPhotosChange) {
      onPhotosChange(newPhotos.length);
    }

    // Корректировка индекса
    setCurrentIndex(prev => {
      if (prev >= newPhotos.length) return Math.max(0, newPhotos.length - 1);
      if (prev === index && index > 0) return index - 1;
      return prev;
    });
  }, [localPhotos, setUploadImages, onPhotosChange]);

  // const handleNext = useCallback(() => {
  //   if (localPhotos.length <= 1) return;
  //   setCurrentIndex(prev => (prev + 1) % localPhotos.length);
  // }, [localPhotos.length]);

  // const handlePrev = useCallback(() => {
  //   if (localPhotos.length <= 1) return;
  //   setCurrentIndex(prev => (prev - 1 + localPhotos.length) % localPhotos.length);
  // }, [localPhotos.length]);


  const handleNext = useCallback(() => {
    if (localPhotos.length <= 1) return;
    setCurrentIndex(prev => (prev + 1) % localPhotos.length);
  }, [localPhotos.length]);
  
  const handlePrev = useCallback(() => {
    if (localPhotos.length <= 1) return;
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

  const sizes = {
    main: { height: '500px', width: '850px' },
    thumbnails: { width: '273.4px', height: '250px', gap: '10px' }
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
        position: 'relative',
        // p:2,
      }}>
        {/* Скрытый input для загрузки */}
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
              disabled={isLoading || localPhotos.length >= MAX_PHOTOS}
            >
              {isLoading ? (
                <>
                  <CircularProgress size={24} sx={{ mr: 1 }} />
                  Загрузка...
                </>
              ) : `Завантажити фото (${localPhotos.length}/${MAX_PHOTOS})`}
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
            // padding:'10px',
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

       
{localPhotos.length > 0 && (
  <Box 
    ref={thumbnailsRef}
    sx={{
      display: 'flex',
      gap: sizes.thumbnails.gap,
      pt: 1.25,
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
        // borderLeft: '1px solid #e0e0e0',
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