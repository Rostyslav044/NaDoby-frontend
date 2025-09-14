


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
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemText,
  ListItemAvatar,
  CircularProgress,
} from '@mui/material';
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
  LocationOn as LocationIcon,
  Celebration as CelebrationIcon,
} from '@mui/icons-material';
import FileUploadSlider from './FileUploadSlider';
import { useLanguage } from '@/app/LanguageContext';

const translations = {
  ua: {
    previewTitle: 'Попередній перегляд оголошення',
    description: 'Опис',
    noDescription: 'Опис відсутній',
    mainFeatures: 'Основні характеристики',
    rooms: 'Кімнат',
    guests: 'Кількість гостей',
    area: 'Площа',
    floor: 'Поверх',
    totalFloors: 'Всього поверхів',
    kidsAge: 'Вік дітей від',
    ageLimit: 'Вікове обмеження',
    parties: 'Святкування',
    rentalTerms: 'Умови оренди',
    checkInOut: 'Час заїзду/виїзду',
    fullDayCheckIn: 'Цілодобове заселення',
    smoking: 'Куріння',
    pets: 'Тварини',
    reportDocs: 'Звітні документи',
    minRent: 'Мінімальний термін оренди',
    deposit: 'Залог',
    notRequired: 'Не потрібен',
    amenities: 'Зручності',
    noAmenities: 'Зручності не вказані',
    location: 'Розташування',
    buildRoute: 'Побудувати маршрут',
    edit: 'Редагувати',
    publish: 'Опублікувати',
    yes: 'Так',
    no: 'Ні',
    notSpecified: 'Не вказано',
    days: 'днів',
    years: 'років',
    from: 'від',
    unlimited: 'Не обмежено',
    of: 'з',
    district: 'район',
    metro: 'метро',
    noName: 'Без назви',
    categories: {
      'Квартира': 'Квартира',
      'Гостиница': 'Готель',
      'Хостел': 'Хостел',
      'Дом': 'Будинок',
      'База отдыха': 'База відпочинку',
      'Сауна/Баня': 'Сауна/Лазня',
      'Готель для тварин': 'Готель для тварин',
      'Глемпінг': 'Глемпінг',
      'Пансіонат': 'Пансіонат',
      'Котедж для компній': 'Котедж для компаній',
      'Коворкінг': 'Коворкінг',
      'Автокемпінг': 'Автокемпінг'
    },
    conveniences: {
      'WiFi': 'Wi-Fi',
      'Парковка': 'Парковка',
      'Кондиционер': 'Кондиціонер',
      'Телевизор': 'Телевізор',
      'Прачечная': 'Пральна машина',
      'Кухня': 'Кухня',
      'Балкон': 'Балкон',
      'Лифт': 'Ліфт',
      'Барбекю-зона': 'Барбекю-зона',
      'Басейн': 'Басейн',
      'Ігрова кімната': 'Ігрова кімната',
      'Блендер': 'Блендер',
      'Бойлер': 'Бойлер',
      'Ванна': 'Ванна',
      'Вентилятор': 'Вентилятор',
      'Генератор': 'Генератор',
      'Громадська кухня': 'Громадська кухня',
      'Джакузі': 'Джакузі',
      'Дитяче ліжечко': 'Дитяче ліжечко',
      'Дитячий стілець для годування': 'Дитячий стілець для годування',
      'Домашній кінотеатр': 'Домашній кінотеатр',
      'Духова піч': 'Духова піч',
      'Душова кабіна': 'Душова кабіна',
      'Електрочайник': 'Електрочайник',
      'Електроплита': 'Електроплита',
      'Зарядка для електромобілів': 'Зарядка для електромобілів',
      'Змінна постільна білизна': 'Змінна постільна білизна',
      'Інтернет': 'Інтернет',
      'Кавоварка': 'Кавоварка',
      'Камін': 'Камін',
      'Кабельне телебачення': 'Кабельне телебачення',
      'Ліжко': 'Ліжко',
      'Лазня': 'Лазня',
      'Мангал': 'Мангал',
      'Мікрохвильова піч': 'Мікрохвильова піч',
      'Охорона': 'Охорона',
      'Персональний комп\'ютер': 'Персональний комп\'ютер',
      'Пляжне обладнання': 'Пляжне обладнання',
      'Посуд та приладдя': 'Посуд та приладдя',
      'Посудомийна машина': 'Посудомийна машина',
      'Пральний порошок': 'Пральний порошок',
      'Праска': 'Праска',
      'Рушники': 'Рушники',
      'Сейф': 'Сейф',
      'Спортзал / Фітнес-кімната': 'Спортзал / Фітнес-кімната',
      'Спортивний інвентар': 'Спортивний інвентар',
      'Столові прибори': 'Столові прибори',
      'Сушилка для білизни': 'Сушилка для білизни',
      'Супутникове ТБ': 'Супутникове ТБ',
      'Тапочки': 'Тапочки',
      'Тераса': 'Тераса',
      'Тостер': 'Тостер',
      'Туалетне приладдя (шампуні, мило)': 'Туалетне приладдя (шампуні, мило)',
      'Фен': 'Фен',
      'Холодильник': 'Холодильник',
      'Догляд за тваринами': 'Догляд за тваринами',
      'Кафе': 'Кафе',
      'Конференц-зал': 'Конференц-зал',
      'Кімната для переговорів': 'Кімната для переговорів',
      'Лікувальні процедури': 'Лікувальні процедури',
      'Організація подій': 'Організація подій',
      'Трансфер': 'Трансфер',
      'Харчування': 'Харчування',
      'Прокат обладнання (велосипедів, човнів, інше)': 'Прокат обладнання (велосипедів, човнів, інше)'
    }
  },
  ru: {
    previewTitle: 'Предпросмотр объявления',
    description: 'Описание',
    noDescription: 'Описание отсутствует',
    mainFeatures: 'Основные характеристики',
    rooms: 'Комнат',
    guests: 'Количество гостей',
    area: 'Площадь',
    floor: 'Этаж',
    totalFloors: 'Всего этажей',
    kidsAge: 'Возраст детей от',
    ageLimit: 'Возрастное ограничение',
    parties: 'Празднование',
    rentalTerms: 'Условия аренды',
    checkInOut: 'Время заезда/выезда',
    fullDayCheckIn: 'Круглосуточное заселение',
    smoking: 'Курение',
    pets: 'Животные',
    reportDocs: 'Отчетные документы',
    minRent: 'Минимальный срок аренды',
    deposit: 'Залог',
    notRequired: 'Не требуется',
    amenities: 'Удобства',
    noAmenities: 'Удобства не указаны',
    location: 'Местоположение',
    buildRoute: 'Проложить маршрут',
    edit: 'Редактировать',
    publish: 'Опубликовать',
    yes: 'Да',
    no: 'Нет',
    notSpecified: 'Не указано',
    days: 'дней',
    years: 'лет',
    from: 'от',
    unlimited: 'Не ограничено',
    of: 'из',
    district: 'район',
    metro: 'метро',
    noName: 'Без названия',
    categories: {
      'Квартира': 'Квартира',
      'Гостиница': 'Гостиница',
      'Хостел': 'Хостел',
      'Дом': 'Дом',
      'База отдыха': 'База отдыха',
      'Сауна/Баня': 'Сауна/Баня',
      'Готель для тварин': 'Отель для животных',
      'Глемпінг': 'Глэмпинг',
      'Пансіонат': 'Пансионат',
      'Котедж для компній': 'Коттедж для компаний',
      'Коворкінг': 'Коворкинг',
      'Автокемпінг': 'Автокемпинг'
    },
    conveniences: {
      'WiFi': 'Wi-Fi',
      'Парковка': 'Парковка',
      'Кондиционер': 'Кондиционер',
      'Телевизор': 'Телевизор',
      'Прачечная': 'Стиральная машина',
      'Кухня': 'Кухня',
      'Балкон': 'Балкон',
      'Лифт': 'Лифт',
      'Барбекю-зона': 'Зона барбекю',
      'Басейн': 'Бассейн',
      'Ігрова кімната': 'Игровая комната',
      'Блендер': 'Блендер',
      'Бойлер': 'Бойлер',
      'Ванна': 'Ванна',
      'Вентилятор': 'Вентилятор',
      'Генератор': 'Генератор',
      'Громадська кухня': 'Общая кухня',
      'Джакузі': 'Джакузи',
      'Дитяче ліжечко': 'Детская кроватка',
      'Дитячий стілець для годування': 'Детский стульчик для кормления',
      'Домашній кінотеатр': 'Домашний кинотеатр',
      'Духова піч': 'Духовка',
      'Душова кабіна': 'Душевая кабина',
      'Електрочайник': 'Электрочайник',
      'Електроплита': 'Электроплита',
      'Зарядка для електромобілів': 'Зарядка для электромобилей',
      'Змінна постільна білизна': 'Смена постельного белья',
      'Інтернет': 'Интернет',
      'Кавоварка': 'Кофеварка',
      'Камін': 'Камин',
      'Кабельне телебачення': 'Кабельное телевидение',
      'Ліжко': 'Кровать',
      'Лазня': 'Баня',
      'Мангал': 'Мангал',
      'Мікрохвильова піч': 'Микроволновая печь',
      'Охорона': 'Охрана',
      'Персональний комп\'ютер': 'Персональный компьютер',
      'Пляжне обладнання': 'Пляжное оборудование',
      'Посуд та приладдя': 'Посуда и приборы',
      'Посудомийна машина': 'Посудомоечная машина',
      'Пральний порошок': 'Стиральный порошок',
      'Праска': 'Утюг',
      'Рушники': 'Полотенца',
      'Сейф': 'Сейф',
      'Спортзал / Фітнес-кімната': 'Спортзал / Фитнес-комната',
      'Спортивний інвентар': 'Спортивный инвентарь',
      'Столові прибори': 'Столовые приборы',
      'Сушилка для білизни': 'Сушилка для белья',
      'Супутникове ТБ': 'Спутниковое ТВ',
      'Тапочки': 'Тапочки',
      'Тераса': 'Терасса',
      'Тостер': 'Тостер',
      'Туалетне приладдя (шампуні, мило)': 'Туалетные принадлежности (шампунь, мыло)',
      'Фен': 'Фен',
      'Холодильник': 'Холодильник',
      'Догляд за тваринами': 'Уход за животными',
      'Кафе': 'Кафе',
      'Конференц-зал': 'Конференц-зал',
      'Кімната для переговорів': 'Комната для переговоров',
      'Лікувальні процедури': 'Лечебные процедуры',
      'Організація подій': 'Организация мероприятий',
      'Трансфер': 'Трансфер',
      'Харчування': 'Питание',
      'Прокат обладнання (велосипедів, човнів, інше)': 'Прокат оборудования (велосипедов, лодок и др.)'
    }
  }
};

const formatAddress = (city, street, houseNumber, district, metro, t) => {
  const parts = [];
  if (city) parts.push(city);
  if (street && houseNumber) parts.push(`${street} ${houseNumber}`);
  if (district) parts.push(`${t.district} ${district}`);
  if (metro) parts.push(`${t.metro} ${metro}`);
  return parts.join(', ');
};

const PreviewDialog = ({
  open,
  onClose,
  formData,
  uploudImages = [],
  apartmentInfo = {},
  photoError,
  userPhones = [],
}) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const [userLocation, setUserLocation] = useState(null);
  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY,
  });

  const translateCategory = (category) => {
    // Если категория есть в словаре для текущего языка
    if (t.categories[category]) {
      return t.categories[category];
    }
    
    // Если нет, проверяем украинский вариант для русского языка
    if (currentLanguage === 'ru') {
      const uaCategory = Object.entries(translations.ua.categories).find(
        ([uaKey]) => uaKey === category
      );
      if (uaCategory) {
        return t.categories[uaCategory[1]] || category;
      }
    }
    
    return category;
  };

  const translateConvenience = (convenience) => {
    // Если удобство есть в словаре для текущего языка
    if (t.conveniences[convenience]) {
      return t.conveniences[convenience];
    }
    
    // Если нет, проверяем украинский вариант для русского языка
    if (currentLanguage === 'ru') {
      const uaConvenience = Object.entries(translations.ua.conveniences).find(
        ([uaKey]) => uaKey === convenience
      );
      if (uaConvenience) {
        return t.conveniences[uaConvenience[1]] || convenience;
      }
    }
    
    return convenience;
  };

  const getFacilityIcon = (facility) => {
    switch(facility) {
      case 'WiFi': return <WifiIcon />;
      case 'Парковка': return <DirectionsCarIcon />;
      case 'Кондиционер': return <AcUnitIcon />;
      case 'Телевизор': return <TvIcon />;
      case 'Прачечная': return <LaundryIcon />;
      case 'Кухня': return <HomeIcon />;
      case 'Балкон': return <HomeIcon />;
      case 'Лифт': return <HomeIcon />;
      default: return <HomeIcon />;
    }
  };

  const handleOpenRoute = () => {
    if (formData.latitude && formData.longitude) {
      if (userLocation) {
        window.open(`https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${formData.latitude},${formData.longitude}`);
      } else {
        window.open(`https://www.google.com/maps?q=${formData.latitude},${formData.longitude}`);
      }
    }
  };

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

  const getBooleanValue = (value) => {
    if (value === 'yes') return t.yes;
    if (value === 'no') return t.no;
    return t.notSpecified;
  };

  const formatTime = (time) => {
    if (!time) return '';
    const [hours, minutes] = time.split(':');
    return `${hours}:${minutes}`;
  };

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
    >
      <DialogTitle sx={{ display: 'flex', alignItems: 'center', gap: 1 }}>
        {getCategoryIcon()}
        {t.previewTitle}
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
              label={translateCategory(formData.category)}
              color="primary" 
              icon={getCategoryIcon()}
              sx={{ fontSize: '15px', height: '30px', padding: '8px' }}
            />
          </Box>

          <Box mb={2}>
            <Typography variant="h4" sx={{ fontWeight: 'bold' }}>
              {formData.objectName || formData.name || t.noName}
            </Typography>
          </Box>

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
              {formatAddress(
                formData.city, 
                formData.street, 
                formData.houseNumber, 
                formData.district, 
                formData.metro,
                t
              )}
            </Typography>
          </Box>

          <Box sx={{
            display: 'flex',
            flexDirection: { xs: 'column', md: 'row' },
            gap: 3,
            width: '100%'
          }}>
            <Box sx={{ flex: 1, minWidth: 0 }}>
              <FileUploadSlider 
                photos={uploudImages}
                price={formData.price}
                name={formData.name || apartmentInfo.name || formData.ownerName || t.noName}
                // phones={Array.isArray(formData.phones) ? formData.phones : [formData.phones || apartmentInfo.phones || '+380XXXXXXXXXX']}
                phones={
                  Array.isArray(formData.phones) ? formData.phones : 
                  formData.phones ? [formData.phones] :
                  Array.isArray(apartmentInfo.phones) ? apartmentInfo.phones :
                  apartmentInfo.phones ? [apartmentInfo.phones] :
                  Array.isArray(userPhones) ? userPhones : // Используем userPhones
                  userPhones ? [userPhones] : 
                  ['+380XXXXXXXXXX']
                }
                category={translateCategory(formData.category)}
                address={formatAddress(
                  formData.city,
                  formData.street,
                  formData.houseNumber,
                  formData.district,
                  formData.metro,
                  t,
                  
                )}
                editable={false}
              />

              <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
                <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
                  {t.description}
                </Typography>
                <Typography paragraph sx={{ whiteSpace: 'pre-line' }}>
                  {formData.description || t.noDescription}
                </Typography>
                
                <Divider sx={{ my: 3 }} />

                <Grid container spacing={3}>
                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      {t.mainFeatures}
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.rooms} 
                          secondary={apartmentInfo.rooms || t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.guests} 
                          secondary={apartmentInfo.beds || t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.area} 
                          secondary={apartmentInfo.size ? `${apartmentInfo.size} м²` : t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.floor} 
                          secondary={
                            apartmentInfo.floor 
                              ? `${apartmentInfo.floor} ${t.of} ${apartmentInfo.totalFloors}` 
                              : t.notSpecified
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
                          primary={t.kidsAge} 
                          secondary={apartmentInfo.kidsAge ? `${apartmentInfo.kidsAge} ${t.years}` : t.unlimited} 
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <PersonIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.ageLimit} 
                          secondary={apartmentInfo.ageLimit ? `${t.from} ${apartmentInfo.ageLimit} ${t.years}` : t.unlimited} 
                        />
                      </ListItem>

                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <CelebrationIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.parties} 
                          secondary={getBooleanValue(apartmentInfo.parties)} 
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12} md={6}>
                    <Typography variant="h6" gutterBottom>
                      {t.rentalTerms}
                    </Typography>
                    
                    <List dense>
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <TimeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.checkInOut} 
                          secondary={
                            apartmentInfo.checkIn || apartmentInfo.checkOut 
                              ? `${formatTime(apartmentInfo.checkIn)} / ${formatTime(apartmentInfo.checkOut)}` 
                              : t.notSpecified
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
                          primary={t.fullDayCheckIn} 
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
                          primary={t.smoking} 
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
                          primary={t.pets} 
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
                          primary={t.reportDocs} 
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
                          primary={t.minRent} 
                          secondary={apartmentInfo.minRent ? `${apartmentInfo.minRent} ${t.days}` : t.notSpecified} 
                        />
                      </ListItem>
                      
                      <ListItem>
                        <ListItemAvatar>
                          <Avatar sx={{ bgcolor: 'primary.main', width: 32, height: 32 }}>
                            <HomeIcon fontSize="small" />
                          </Avatar>
                        </ListItemAvatar>
                        <ListItemText 
                          primary={t.deposit} 
                          secondary={apartmentInfo.deposit ? `${apartmentInfo.deposit} грн` : t.notRequired} 
                        />
                      </ListItem>
                    </List>
                  </Grid>

                  <Grid item xs={12}>
                    <Typography variant="h6" gutterBottom>
                      {t.amenities}
                    </Typography>
                    
                    <Box sx={{ display: 'flex', flexWrap: 'wrap', gap: 1 }}>
                      {apartmentInfo.conveniences?.length > 0 ? (
                        apartmentInfo.conveniences.map((item, index) => (
                          <Chip 
                            key={index} 
                            label={translateConvenience(item)} 
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
                          {t.noAmenities}
                        </Typography>
                      )}
                    </Box>
                  </Grid>
                </Grid>
              </Paper>

              {formData.latitude && formData.longitude && (
                <Paper elevation={3} sx={{ p: 2, borderRadius: 2, mb: 3 }}>
                  <Typography variant="h6" gutterBottom>
                    {t.location}
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
                        {t.buildRoute}
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
          {t.edit}
        </Button>
        <Button 
          onClick={() => onClose(false)} 
          variant="contained"
          color="primary"
        >
          {t.publish}
        </Button>
      </DialogActions>
    </Dialog>
  );
};

export default PreviewDialog;