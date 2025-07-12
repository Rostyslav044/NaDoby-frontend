

// в етом компоненте показывается отдельная  страница где показывается
//карта одиночного обявления

'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  Tabs,
  Tab,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Header from '@/app/components/Header';
import { useSwipeable } from 'react-swipeable';
import { LanguageProvider } from '@/app/LanguageContext';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
  },
});

export default function ApartmentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apartment, setApartment] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true
  });

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          const data = await response.json();
          setApartment(data);
        } catch (error) {
          console.error('Помилка завантаження квартири:', error);
        }
      };
      fetchApartment();
    }
  }, [id]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${apartment.latitude},${apartment.longitude}`;
          window.open(url, '_blank');
        },
        () => alert('Не вдалося отримати ваше місцезнаходження')
      );
    } else {
      alert('Геолокація не підтримується в цьому браузері');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.name || 'Оренда квартири',
        text: `Перегляньте це оголошення: ${apartment.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Посилання скопійовано');
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const renderHighlights = () => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {[{ icon: <ApartmentIcon />, label: 'Кімнат', value: apartment.rooms },
        { icon: <BathtubIcon />, label: 'Спальних місць', value: apartment.beds },
        { icon: <LocationOnIcon />, label: 'Площа', value: `${apartment.size} м²` },
        { icon: <LocationOnIcon />, label: 'Поверх', value: apartment.floor && apartment.totalFloors ? `${apartment.floor} з ${apartment.totalFloors}` : null },
      ].map((item, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
            <Box sx={{ color: '#3f51b5' }}>{item.icon}</Box>
            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
            <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box maxWidth="1200px" mx="auto" mt={isMobile ? 1 : 4} p={isMobile ? 1 : 3}>
        <Provider store={store}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>
        </Provider>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Button variant="outlined" onClick={() => router.back()} size="small">Назад</Button>
          <Box>
            <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>

        <Box mb={2}>
          <Chip label={apartment.category || "Категорія"} color="primary" size="small" sx={{ mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {apartment.name || "Без назви"}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <LocationOnIcon color="primary" fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {[apartment.city, apartment.street, apartment.houseNumber, apartment.district].filter(Boolean).join(', ')}
          </Typography>
        </Box>

        <Box position="relative" mb={2} sx={{ borderRadius: 3, overflow: 'hidden' }} {...swipeHandlers}>
          <CardMedia
            component="img"
            image={apartment.photos?.[currentIndex]}
            height={isMobile ? 250 : 450}
            sx={{ objectFit: 'cover', userSelect: 'none', touchAction: 'pan-y' }}
          />
          <IconButton onClick={handlePrev} sx={arrowStyle('left')}><ArrowBackIosNewIcon /></IconButton>
          <IconButton onClick={handleNext} sx={arrowStyle('right')}><ArrowForwardIosIcon /></IconButton>
          <Box sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 1, borderRadius: 1 }}>
            {`${currentIndex + 1}/${apartment.photos?.length}`}
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{apartment.ownerName || "Ім'я не вказано"}</Typography>
            <Typography variant="body1">{apartment.phone || "Телефон не вказано"}</Typography>
          </Box>
          {apartment.phone && (
            <Button variant="contained" startIcon={<LocalPhoneIcon />} href={`tel:${apartment.phone}`} sx={{ px: 3, py: 1, borderRadius: 2 }}>
              Зателефонувати
            </Button>
          )}
        </Box>

        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {apartment.price} грн/доба
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Мінімальний термін оренди: {apartment.minRent || 3} дні
          </Typography>
        </Box>

        {renderHighlights()}
        <Divider sx={{ my: 3 }} />

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Опис</Typography>
          <Typography variant="body1" paragraph>{apartment.description || 'Опис відсутній.'}</Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Розташування</Typography>
          <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc', mb: 2 }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: apartment.latitude, lng: apartment.longitude }}
                zoom={15}
              >
                <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
              </GoogleMap>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            )}
          </Box>
          <Button variant="outlined" startIcon={<DirectionsIcon />} onClick={handleGetDirections} fullWidth>
            Прокласти маршрут
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 16,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.4)',
  color: 'white',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
});
