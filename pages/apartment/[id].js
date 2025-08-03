// Этот компонент (ApartmentDetailPage) 
// отображает детальную 1 страницу объявления об аренде

'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import CelebrationIcon from '@mui/icons-material/Celebration'; 
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  Stack,
  useMediaQuery,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Bathtub as BathtubIcon,
  KingBed as KingBedIcon,
  Apartment as ApartmentIcon,
  DirectionsCar as DirectionsCarIcon,
  Wifi as WifiIcon,
  Tv as TvIcon,
  AcUnit as AcUnitIcon,
  LocalLaundryService as LaundryIcon,
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
  SmokingRooms as SmokingIcon,
  Pets as PetsIcon,
  Description as DocsIcon,
  AccessTime as TimeIcon,
  Train as MetroIcon,
  LocationOn as DistrictIcon,
  Phone as PhoneIcon,
  Directions as DirectionsIcon,
  LocationOn as LocationIcon,
} from '@mui/icons-material';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import { useSwipeable } from 'react-swipeable';
import Header from '@/app/components/Header';
import { LanguageProvider } from '@/app/LanguageContext';
import { Provider } from 'react-redux';
import { store } from '@/app/store';
import FileUploadSlider from '@/app/components/FileUploadSlider';
const ApartmentDetailPage = () => {
  const router = useRouter();
  const { id } = router.query;
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apartment, setApartment] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [userLocation, setUserLocation] = useState(null);
  const isMobile = useMediaQuery('(max-width:600px)');

  const handleOpenRoute = () => {
    if (apartment.latitude && apartment.longitude) {
      if (userLocation) {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`);
      } else {
        window.open(`https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`);
      }
    }
  };
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          
          const data = await response.json();
          setApartment(data);
        } catch (error) {
          console.error('Ошибка загрузки квартиры:', error);
        }
      };
      fetchApartment();
    }
  }, [id]);

  useEffect(() => {
    if (navigator.geolocation && apartment?.latitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error('Ошибка геолокации:', error);
        }
      );
    }
  }, [apartment]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.name || 'Аренда квартиры',
        text: `Посмотрите это объявление: ${apartment.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Ссылка скопирована');
    }
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
  };

  const getCategoryIcon = () => {
    switch(apartment?.category) {
      case 'Квартира': return <HomeIcon />;
      case 'Гостиница': return <HotelIcon />;
      case 'Хостел': return <KingBedIcon />;
      case 'Дом': return <HomeIcon />;
      case 'База отдыха': return <HomeIcon />;
      case 'Сауна/Баня': return <BathtubIcon />;
      default: return <ApartmentIcon />;
    }
  };

  const getPriceSuffix = () => {
    return apartment?.category === 'Сауна/Баня' ? 'година' : 'доба';
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const getBooleanValue = (value) => {
    return value === 'yes' ? 'Да' : value === 'no' ? 'Нет' : 'Не указано';
  };

  const getFacilityIcon = (facility) => {
    switch(facility) {
      case 'WiFi': return <WifiIcon />;
      case 'Парковка': return <DirectionsCarIcon />;
      case 'Кондиціонер': return <AcUnitIcon />;
      case 'Телевізор': return <TvIcon />;
      case 'Пральна машина': return <LaundryIcon />;
      default: return <HomeIcon />;
    }
  };

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="1200px" mx="auto" 
    // mt={isMobile ? 2 : 4} p={isMobile ? 1 : 3}
    >

<Provider store={store}>
        <LanguageProvider>
           <Header />
       
      <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
        <Button variant="outlined" onClick={() => router.back()} size="small">
          Назад
        </Button>
        {/* <Chip 
          label={apartment.category} 
          color="primary" 
          size="medium" 
          icon={getCategoryIcon()}
        /> */}

<Chip 
  label={apartment.category} 
  color="primary" 
  icon={getCategoryIcon()}
  sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
/>

        <Box>
          <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
            <FavoriteBorderIcon />
          </IconButton>
          <IconButton onClick={handleShare}>
            <ShareIcon />
          </IconButton>
        </Box>
      </Box>


   {/* Блок с названием и ценой */}
   <Box mb={2}>
  <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
    {apartment.objectName || apartment.name || 'Без названия'}
  </Typography>
</Box>


      {/* Блок с адресом */}
      <Box 
        sx={{ 
          display: 'flex', 
          alignItems: 'center', 
          gap: 1,
          mb: 3,
          cursor: 'pointer',
          '&:hover': {
            textDecoration: 'underline',
            color: 'primary.main'
          }
        }}
        onClick={handleOpenRoute}
      >
        <LocationIcon color="primary" />
        <Typography variant="body1">
          {[
            apartment.city,
            apartment.street && `${apartment.street} ${apartment.houseNumber}`,
            apartment.district && `район ${apartment.district}`,
            apartment.metro && `метро ${apartment.metro}`
          ].filter(Boolean).join(', ')}
        </Typography>
      </Box>

      {/* Галерея изображений */}
      
{/* <FileUploadSlider
 photos={apartment.photos || []} 
 onDelete={apartment.isOwner ? handleDeletePhoto : null} 
/> */}


<FileUploadSlider 
  photos={apartment.photos} 

  price={apartment.price}
  name={apartment.name}
  phones={apartment.phones}
  category={apartment.category} 
/>
  </LanguageProvider>
         </Provider>

      <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
    


      

        <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
          Описание
        </Typography>
        <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
          {apartment.description || 'Описание отсутствует'}
        </Typography>
        
        <Divider sx={{ my: 3 }} />

        <Grid container spacing={3}>
          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Основные характеристики
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Комнат" 
                  secondary={apartment.rooms || 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Кількість гостей" 
                  secondary={apartment.beds || 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Площадь" 
                  secondary={apartment.size ? `${apartment.size} м²` : 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Этаж" 
                  secondary={
                    apartment.floor 
                      ? `${apartment.floor} из ${apartment.totalFloors}` 
                      : 'Не указано'
                  } 
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <ChildCareIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Возраст детей от" 
                  secondary={apartment.kidsAge ? `${apartment.kidsAge} лет` : 'Не ограничено'} 
                />
              </ListItem>

              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PersonIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Возрастное ограничение" 
                  secondary={apartment.ageLimit ? `от ${apartment.ageLimit} лет` : 'Не ограничено'} 
                />
              </ListItem>

              <ListItem>
  <ListItemAvatar>
    <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
      <CelebrationIcon fontSize="small" />
    </Avatar>
  </ListItemAvatar>
  <ListItemText 
    primary="Святкування" 
    secondary={getBooleanValue(apartment.parties)} 
  />
</ListItem>
            </List>
          </Grid>

          <Grid item xs={12} md={6}>
            <Typography variant="h6" gutterBottom>
              Условия аренды
            </Typography>
            
            <List dense>
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <TimeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Время заезда/выезда" 
                  secondary={
                    apartment.checkIn || apartment.checkOut 
                      ? `${formatTime(apartment.checkIn)} / ${formatTime(apartment.checkOut)}` 
                      : 'Не указано'
                  } 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <TimeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Круглосуточное заселение" 
                  secondary={getBooleanValue(apartment.fullDayCheckIn)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <SmokingIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Курение" 
                  secondary={getBooleanValue(apartment.smoking)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <PetsIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Животные" 
                  secondary={getBooleanValue(apartment.pets)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <DocsIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Отчетные документы" 
                  secondary={getBooleanValue(apartment.reportDocs)} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Минимальный срок аренды" 
                  secondary={apartment.minRent ? `${apartment.minRent} дней` : 'Не указано'} 
                />
              </ListItem>
              
              <ListItem>
                <ListItemAvatar>
                  <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                    <HomeIcon fontSize="small" />
                  </Avatar>
                </ListItemAvatar>
                <ListItemText 
                  primary="Залог" 
                  secondary={apartment.deposit ? `${apartment.deposit} грн` : 'Не требуется'} 
                />
              </ListItem>
            </List>
          </Grid>

          <Grid item xs={12}>
            <Typography variant="h6" gutterBottom>
              Удобства
            </Typography>
            
            <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {apartment.conveniences?.length > 0 ? (
                apartment.conveniences.map((item, index) => (
                  <Chip 
                    key={index} 
                    label={item} 
                    variant="outlined"
                    avatar={
                      <Avatar>
                        {getFacilityIcon(item)}
                      </Avatar>
                    }
                  />
                ))
              ) : (
                <Typography variant="body2" color="text.secondary">
                  Удобства не указаны
                </Typography>
              )}
            </Box>
          </Grid>

     
        </Grid>
      </Paper>

      {apartment.latitude && apartment.longitude && (
        <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom>
            Местоположение
          </Typography>
          
          <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{
                  lat: parseFloat(apartment.latitude),
                  lng: parseFloat(apartment.longitude),
                }}
                zoom={15}
              >
                <Marker
                  position={{
                    lat: parseFloat(apartment.latitude),
                    lng: parseFloat(apartment.longitude),
                  }}
                />
              </GoogleMap>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            )}
          </Box>

          {userLocation && (
            <Box textAlign="center">
              <Button 
                variant="contained" 
                color="primary"
                startIcon={<DirectionsIcon />}
                component="a"
                href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`}
                target="_blank"
                rel="noopener noreferrer"
                fullWidth
              >
                Проложить маршрут
              </Button>
            </Box>
          )}
        </Paper>
      )}
    </Box>
  );
};

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 16,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.5)',
  color: '#fff',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.8)' },
  zIndex: 10,
});

export default ApartmentDetailPage;








