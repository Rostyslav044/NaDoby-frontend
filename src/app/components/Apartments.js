




'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  Box,
  IconButton,
  CardMedia,
  CircularProgress,
  Dialog,
  DialogContent,
  useTheme,
  useMediaQuery,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';
import { useSession } from 'next-auth/react';
import CreateUser from './CreateUser';
import Link from 'next/link';
import { Button } from '@mui/material';

const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
  const photos = apartment.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('sm'));

  const handlePrevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextPhoto,
    onSwipedRight: handlePrevPhoto,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });
useEffect(()=>{ console.log(apartment);},[])
  return (
    <Card
      sx={{
        bgcolor: 'background.paper',
        borderRadius: 2,
        boxShadow: 3,
        transition: 'box-shadow 0.3s, transform 0.3s',
        '&:hover': {
          boxShadow: 6,
          transform: 'translateY(-2px)',
        },
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
                fontSize: isMobile ? '1rem' : '1rem',
                p: isMobile ? '2px' : '4px', // ← 🔽 уменьшить padding до 2px-4px
              }}
              aria-label="Previous photo"
            >
              {/* <ArrowBackIosNewIcon fontSize={isMobile ? 'small' : 'medium'} /> */}
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
                fontSize: isMobile ? '1rem' : '1rem',
                p: isMobile ? '2px' : '4px', // ← 🔽 уменьшить padding до 2px-4px

              }}
              aria-label="Next photo"
            >
              {/* <ArrowForwardIosIcon fontSize={isMobile ? 'small' : 'medium'} /> */}
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
                    backgroundColor: index === currentIndex ? '#1976d2' : '#90caf9',
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
          onClick={() => toggleFavorite(apartment._id)}
          sx={{
            marginTop: 0.5,
            marginRight: 0.5,
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
            zIndex: 20,
            p: isMobile ? '3px' : '6px',
          }}
          aria-label="Toggle favorite"
        >
          <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'grey', fontSize: isMobile ? 20 : 28 }} />
        </IconButton>
      </Box>

      <CardContent sx={{ px: isMobile ? 1.5 : 2 }}>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
    <strong>Категорія:</strong> {apartment.category || 'Не вказано'}
  </Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
    <strong>Місто:</strong> {apartment.city || 'Не вказано'}
  </Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
    <strong>Вулиця:</strong> {apartment.street || 'Не вказано'}
  </Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
  <strong>Номер будинку:</strong> {apartment.houseNumber || 'Не вказано'}
</Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
    <strong>Район:</strong> {apartment.district || 'Не вказано'}
  </Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
    <strong>Кімнат:</strong> {apartment.rooms || 'Не вказано'}
  </Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'}>
    <strong>Ліжок:</strong> {apartment.beds || 'Не вказано'}
  </Typography>
  <Typography variant={isMobile ? 'body2' : 'subtitle1'} color="primary">
    <strong>Ціна:</strong> {apartment.price ? `${apartment.price} грн` : 'Не вказано'}
  </Typography>
  
  {apartment.metro && (
    <Typography variant="caption" color="textSecondary">
      <strong>Метро:</strong> {apartment.metro}
    </Typography>
  )}

<Box mt={2}>
          <Link href={`/apartment/${apartment._id}`} passHref>
            <Button variant="contained" color="primary" fullWidth>
              Детальніше
            </Button>
          </Link>
        </Box>

</CardContent>

      
    </Card>
  );
};

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const { data: session } = useSession();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
        setApartments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке апартаментов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  const toggleFavorite = (id) => {
    if (!session) {
      setIsCreateUserOpen(true);
      return;
    }

    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Усі апартаменти
      </Typography>

      {apartments.length === 0 ? (
        <Typography variant="body1">Немає жодного апартаменту</Typography>
      ) : (
        <Grid container spacing={4}>
          {apartments.map((apartment) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <ApartmentCard
                apartment={apartment}
                isFavorite={!!favorites[apartment._id]}
                toggleFavorite={toggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={isCreateUserOpen}
        onClose={() => setIsCreateUserOpen(false)}
        fullWidth
        maxWidth="xs"
        PaperProps={{
          sx: {
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
            m: 0,
            p: 0,
            bgcolor: 'background.paper',
          },
        }}
      >
        <DialogContent>
          <CreateUser onClose={() => setIsCreateUserOpen(false)} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default Apartments;
