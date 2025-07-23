'use client';
import React, { useState, useEffect } from 'react';
import {
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Button,
  Typography,
  Box,
  IconButton,
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
  CircularProgress,
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
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
  LocationOn as LocationIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import FileUploadSlider from './FileUploadSlider';

const PreviewDialog = ({
  open,
  onClose,
  formData,
  uploudImages = [],
  apartmentInfo = {},
  photoError,
}) => {
  const [currentIndex, setCurrentIndex] = useState(0);
  const [userLocation, setUserLocation] = useState(null);
  
  useEffect(() => {
    if (open) {
      setCurrentIndex(0);
    }
  }, [open]);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  const allImages = uploudImages.map((img) => 
    typeof img === 'string' ? img : URL.createObjectURL(img)
  );

  const handleOpenRoute = () => {
    if (formData.latitude && formData.longitude) {
      if (userLocation) {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`);
      } else {
        window.open(`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`);
      }
    }
  };

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? allImages.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === allImages.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  useEffect(() => {
    if (navigator.geolocation && open) {
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
  }, [open]);

  const getCategoryIcon = () => {
    switch(formData.category) {
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
    return formData.category === 'Сауна/Баня' ? 'година' : 'доба';
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

  const getBooleanValue = (value) => {
    return value === 'yes' ? 'Да' : value === 'no' ? 'Нет' : 'Не указано';
  };

  const handlePhoneClick = (phone) => {
    window.open(`tel:${phone.replace(/\D/g, '')}`);
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

  if (!open) return null;

  return (
    <Dialog
      open={open}
      onClose={() => onClose(false)}
      maxWidth="lg"
      fullWidth
      scroll="paper"
      sx={{ 
        '& .MuiDialog-paper': { 
          maxHeight: '90vh',
          width: '100%',
          maxWidth: '1300px'
        } 
      }}
      key={JSON.stringify(formData)}
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getCategoryIcon()}
        Предпросмотр объявления
      </DialogTitle>
      
      <DialogContent dividers>
        <Box sx={{ 
          display: 'flex',
          flexDirection: 'column',
          maxWidth: '1200px',
          mx: 'auto',
          width: '100%'
        }}>

<Box mb={2} sx={{textAlign: 'center' }}>
            <Chip 
              label={formData.category} 
              color="primary" 
              icon={getCategoryIcon()}
              sx={{ fontSize: '15px', height: '30px', padding: '8px',}}
            />
          </Box>

          {/* Блок с названием и ценой */}
          <Box mb={2}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {formData.objectName || formData.name || 'Без названия'}
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
                formData.city,
                formData.street && `${formData.street} ${formData.houseNumber}`,
                formData.district && `район ${formData.district}`,
                formData.metro && `метро ${formData.metro}`
              ].filter(Boolean).join(', ')}
            </Typography>
          </Box>

          

          {/* Основной контент с фото и информацией */}
          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            width: '100%'
          }}>
            {/* Левая часть - фото и описание */}
            <Box sx={{ 
              flex: 1,
              minWidth: 0 // Чтобы предотвратить переполнение
            }}>
              {/* Галерея изображений */}
              <FileUploadSlider 
                photos={allImages}
                price={formData.price}
                // name={formData.name}
                // phones={formData.phones}
                name={
                  formData.name || 
                  apartmentInfo.name || 
                  formData.ownerName || 
                  'Имя не указано'
                }
                phones={
                  Array.isArray(formData.phones) ? formData.phones :
                  formData.phones ? [formData.phones] :
                  Array.isArray(apartmentInfo.phones) ? apartmentInfo.phones :
                  apartmentInfo.phones ? [apartmentInfo.phones] :
                  ['+380XXXXXXXXXX']
                }
                category={formData.category}
                address={[
                  formData.city,
                  formData.street && `${formData.street} ${formData.houseNumber}`,
                ].filter(Boolean).join(', ')}
                editable={false}
              />

              {/* Описание и характеристики */}
              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  Описание
                </Typography>
                <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {formData.description || 'Описание отсутствует'}
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
                          secondary={apartmentInfo.rooms || 'Не указано'} 
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
                          secondary={apartmentInfo.beds || 'Не указано'} 
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
                          secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : 'Не указано'} 
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
                            apartmentInfo.floor 
                              ? `${apartmentInfo.floor} из ${apartmentInfo.totalFloors}` 
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
                          secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} лет` : 'Не ограничено'} 
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
                          secondary={apartmentInfo.ageLimit ? `от ${apartmentInfo.ageLimit} лет` : 'Не ограничено'} 
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
                          secondary={getBooleanValue(apartmentInfo.parties)} 
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
                            apartmentInfo.checkIn || apartmentInfo.checkOut 
                              ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
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
                          secondary={getBooleanValue(apartmentInfo.fullDayCheckIn)} 
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
                          secondary={getBooleanValue(apartmentInfo.smoking)} 
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
                          secondary={getBooleanValue(apartmentInfo.pets)} 
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
                          secondary={getBooleanValue(apartmentInfo.reportDocs)} 
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
                          secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} дней` : 'Не указано'} 
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
                          secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : 'Не требуется'} 
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      Удобства
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {apartmentInfo.conveniences?.length > 0 ? (
                        apartmentInfo.conveniences.map((item, index) => (
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

              {/* Карта */}
              {formData.latitude && formData.longitude && (
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    Местоположение
                  </Typography>
                  
                  <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', mb: 2 }}>
                    {isLoaded ? (
                      <GoogleMap
                        mapContainerStyle={{ width: '100%', height: '100%' }}
                        center={{
                          lat: parseFloat(formData.latitude),
                          lng: parseFloat(formData.longitude),
                        }}
                        zoom={15}
                      >
                        <Marker
                          position={{
                            lat: parseFloat(formData.latitude),
                            lng: parseFloat(formData.longitude),
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
                        component="a"
                        href={`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        Проложить маршрут
                      </Button>
                    </Box>
                  )}
                </Paper>
              )}
            </Box>
          </Box>
        </Box>
      </DialogContent>
      
      <DialogActions sx={{ p: 2 }}>
        <Button 
          onClick={() => onClose(true)} 
          variant="outlined"
          color="secondary"
          sx={{ mr: 2 }}
        >
          Редактировать
        </Button>
        <Button 
          onClick={() => onClose(false)} 
          variant="contained"
          color="primary"
        >
          Опубликовать
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;