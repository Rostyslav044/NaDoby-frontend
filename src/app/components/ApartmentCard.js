'use client';

import React, { useState } from 'react';
import {
  Box,
  Typography,
  IconButton,
  Card,
  CardContent,
  CardMedia,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';
import { useRouter } from 'next/navigation';


const formatCity = (city, region) => {
  return region ? `${city}, ${region}` : city;
};
const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
  const photos = apartment.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));
  const router = useRouter();

  const handlePrevPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = (e) => {
    e.stopPropagation();
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1)),
    onSwipedRight: () => setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1)),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  const handleCardClick = () => {
    router.push(`/apartment/${apartment._id}`);
  };

  // const infoFields = [
  //   { label: 'Категорія', value: apartment.category },
  //   { label: 'Місто', value: apartment.city },
  //   { label: 'Вулиця', value: apartment.street },
  //   { label: 'Номер будинку', value: apartment.houseNumber },
  //   { label: 'Район', value: apartment.district },
  //   apartment.metro && { label: 'Метро', value: apartment.metro },
  //   { label: 'Кімнат', value: apartment.rooms },
  //   { label: 'Кількість гостей', value: apartment.beds },
  // ].filter(Boolean);

  
  const infoFields = [
    { label: 'Категорія', value: apartment.category },
    { 
      label: 'Місто', 
      value: formatCity(apartment.city, apartment.region) 
    },
    { label: 'Вулиця', value: apartment.street },
    { label: 'Номер будинку', value: apartment.houseNumber },
    { label: 'Район', value: apartment.district },
    apartment.metro && { label: 'Метро', value: apartment.metro },
    { label: 'Кімнат', value: apartment.rooms },
    { label: 'Кількість гостей', value: apartment.beds },
  ].filter(Boolean);

  return (
    <Card
      onClick={handleCardClick}
      sx={{
        cursor: 'pointer',
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
        height: '100%',
        display: 'flex',
        flexDirection: 'column',
        justifyContent: 'space-between',
      }}
    >
      <Box
        position="relative"
        {...swipeHandlers}
        sx={{
          height: 200,
          overflow: 'hidden',
          borderRadius: 1,
          userSelect: 'none',
          touchAction: 'pan-y',
          p: 1,
        }}
      >
        {photos.length > 0 ? (
          <>
            <CardMedia
              component="img"
              height="200"
              image={photos[currentIndex]}
              alt={`Фото апартаменту ${currentIndex + 1}`}
              draggable={false}
              sx={{ objectFit: 'cover', borderRadius: 1 }}
            />

            <IconButton
              onClick={handlePrevPhoto}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 13,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                zIndex: 10,
                p: isMobile ? '2px' : '4px',
              }}
            >
              <ArrowBackIosNewIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>

            <IconButton
              onClick={handleNextPhoto}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 13,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                zIndex: 10,
                p: isMobile ? '2px' : '4px',
              }}
            >
              <ArrowForwardIosIcon sx={{ fontSize: isMobile ? 16 : 20 }} />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                display: 'flex',
                gap: isMobile ? 0.5 : 0.8,
                zIndex: 10,
              }}
            >
              {photos.map((_, index) => (
                <Box
                  key={index}
                  sx={{
                    width: isMobile ? 5 : 6,
                    height: isMobile ? 5 : 6,
                    borderRadius: '50%',
                    backgroundColor:
                      index === currentIndex ? '#1976d2' : '#90caf9',
                    border: '1px solid white',
                  }}
                />
              ))}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#eee',
              color: '#777',
            }}
          >
            Нет фото
          </Box>
        )}

        <IconButton
          onClick={(e) => {
            e.stopPropagation();
            toggleFavorite(apartment._id);
          }}
          sx={{
            position: 'absolute',
            top: 12,
            right: 12,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
            zIndex: 20,
            p: isMobile ? '3px' : '6px',
          }}
        >
          <FavoriteIcon
            sx={{
              color: isFavorite ? 'red' : 'grey',
              fontSize: isMobile ? 20 : 28,
            }}
          />
        </IconButton>
      </Box>

      <CardContent sx={{ px: isMobile ? 1.5 : 2, pt: 2, minHeight: 220 }}>
        {infoFields.map(({ label, value }, index) => (
          <Box key={index} display="flex" gap={1} mb={0.5}>
            <Typography
              variant={isMobile ? 'caption' : 'body2'}
              sx={{ color: 'text.secondary', minWidth: '110px' }}
            >
              {label}:
            </Typography>
            <Typography variant={isMobile ? 'caption' : 'body2'} fontWeight={500}>
              {value || 'Не вказано'}
            </Typography>
          </Box>
        ))}

       
<Box display="flex" gap={1} mb={1}>
  <Typography
    variant={isMobile ? 'caption' : 'body2'}
    sx={{ color: 'text.secondary', minWidth: '110px' }}
  >
    Ціна:
  </Typography>
  <Typography
    variant={isMobile ? 'caption' : 'body2'}
    fontWeight="bold"
    color="primary"
  >
    {apartment.price ? `${apartment.price} грн./${apartment.category === 'Сауна/Баня' ? 'година' : 'доба'}` : 'Не вказано'}
  </Typography>
</Box>

      
      </CardContent>
    </Card>
  );
};

export default ApartmentCard;