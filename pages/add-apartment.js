

// Этот компонент отвечает за успешное создание объявления об аренде жилья. 
// После отправки формы он получает ответ от сервера с данными о добавленном
//  объявлении и выводит сообщение







'use client';

import React, { useState, useEffect, useRef } from 'react';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import FileUploadSlider from '@/app/components/FileUploadSlider';
import MetroSelector from '@/app/components/MetroSelector';
import InfoApartments from '@/app/components/InfoApartments';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import PreviewDialog from '@/app/components/PreviewDialog';
import {
  Container, Typography, TextField, Select, MenuItem, Button,
  FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack
} from '@mui/material';
import Header from '@/app/components/Header';
import { Provider, useSelector } from 'react-redux';
import { useSearchParams, useRouter  } from 'next/navigation';
import { store } from '@/app/store';

const translations = {
  ua: {
    addTitle: 'Додати нове оголошення',
    editTitle: 'Редагувати оголошення',
    categoryLabel: 'Категорія *',
    categories: [
      'Квартира', 'Готель', 'Готель для тварин',
      'Хостел', 'Будинок', 'База відпочинку', 'Сауна/Лазня', 'Глемпінг',
      'Санаторій/Пансіонат', 'Котедж для компаній', 'Коворкінг', 'Автокемпінг'
    ],
    objectNameLabel: 'Назва об\'єкта *',
    objectNameHelper: 'Наприклад: Готель Затишок (максимум 59 символів)',
    descriptionLabel: 'Опис *',
    descriptionHelper: 'Мінімум 85 символів.',
    cityLabel: 'Місто *',
    streetLabel: 'Вулиця *',
    manualStreetPrompt: 'Не знайшли вулицю? Введіть вручну',
    googleStreetPrompt: 'Повернутися до пошуку вулиці через Google',
    houseNumberLabel: 'Номер будинку *',
    priceLabel: 'Ціна *',
    districtLabel: 'Район *',
    moveMarkerText: 'Ви можете переміщати маркер на карті для точного вказання місця!',
    uploadPhotosText: 'Завантажте мінімум 3 фото',
    previewButton: 'Попередній перегляд',
    submitButton: 'Створити оголошення',
    saveButton: 'Зберегти зміни',
    successMessage: 'Оголошення успішно додано!',
    updateMessage: 'Оголошення успішно оновлено!',
    errorMessage: 'Будь ласка, заповніть всі обов\'язкові поля!',
    minPhotosError: 'Завантажте мінімум 3 фотографії!',
    serverError: 'Сталася помилка сервера',
    requiredField: 'Це поле обов\'язкове',
    maxCharsError: 'Максимум 59 символів'
  },
  ru: {
    addTitle: 'Добавить новое объявление',
    editTitle: 'Редактировать объявление',
    categoryLabel: 'Категория *',
    categories: [
      'Квартира', 'Гостиница', 'Отель для животных',
      'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня', 'Глэмпинг',
      'Санаторий/Пансионат', 'Коттедж для компаний', 'Коворкинг', 'Автокемпинг'
    ],
    objectNameLabel: 'Название объекта *',
    objectNameHelper: 'Например: Гостиница Уют (максимум 59 символов)',
    descriptionLabel: 'Описание *',
    descriptionHelper: 'Минимум 85 символов.',
    cityLabel: 'Город *',
    streetLabel: 'Улица *',
    manualStreetPrompt: 'Не нашли улицу? Введите вручную',
    googleStreetPrompt: 'Вернуться к поиску улицы с помощью Google',
    houseNumberLabel: 'Номер дома *',
    priceLabel: 'Цена *',
    districtLabel: 'Район *',
    moveMarkerText: 'Вы можете двигать маркер на карте для точного указания местоположения!',
    uploadPhotosText: 'Загрузите минимум 3 фото',
    previewButton: 'Предпросмотр',
    submitButton: 'Создать объявление',
    saveButton: 'Сохранить изменения',
    successMessage: 'Объявление успешно добавлено!',
    updateMessage: 'Объявление успешно обновлено!',
    errorMessage: 'Пожалуйста, заполните все обязательные поля!',
    minPhotosError: 'Загрузите минимум 3 фотографии!',
    serverError: 'Произошла ошибка сервера',
    requiredField: 'Это поле обязательно',
    maxCharsError: 'Максимум 59 символов'
  }
};

const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

function AddApartmentForm() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const router = useRouter();
  const [uploadImages, setUploadImages] = useState([]);
  const [formData, setFormData] = useState({
    city: '', street: '', district: '', metro: '', hasMetro: false,
    description: '', price: '', houseNumber: '',
    category: '', objectName: '', latitude: null, longitude: null,
    originalCity: '', region: '',
  });
  const [errors, setErrors] = useState({});
  const [apartmentInfo, setApartmentInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualStreetInput, setShowManualStreetInput] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  const [photoError, setPhotoError] = useState(false);
  const [isEditMode, setIsEditMode] = useState(false);
  const [apartmentId, setApartmentId] = useState(null);

  const infoRef = useRef();
  const cityAutocompleteRef = useRef(null);
  const streetAutocompleteRef = useRef(null);
  const cityInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const geocoderRef = useRef(null);
  const profile = useSelector(state => state.auth.profile);
  const searchParams = useSearchParams();

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  useEffect(() => {
    if (uploadImages.length >= 3) setPhotoError(false);
  }, [uploadImages]);

  useEffect(() => {
    const timer = setTimeout(updateLocation, 500);
    return () => clearTimeout(timer);
  }, [formData.street, formData.houseNumber, formData.city]);

  useEffect(() => {
    if (isGoogleMapsLoaded && window.google?.maps?.Geocoder) {
      initAutocomplete();
      geocoderRef.current = new window.google.maps.Geocoder();
    }
  }, [isGoogleMapsLoaded, showManualStreetInput]);

  useEffect(() => {
    const editId = searchParams.get('edit');
    if (editId) {
      setIsEditMode(true);
      setApartmentId(editId);
      fetchApartmentData(editId);

    }
  }, [searchParams]);

  const initAutocomplete = () => {
    if (!window.google) return;

    if (cityInputRef.current && !cityAutocompleteRef.current) {
      cityAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        cityInputRef.current, 
        { types: ['(cities)'], componentRestrictions: { country: 'ua' } }
      );
      cityAutocompleteRef.current.addListener('place_changed', () => {
        const place = cityAutocompleteRef.current.getPlace();
        handleCitySelect(place);
      });
    }

    if (!showManualStreetInput && streetInputRef.current && !streetAutocompleteRef.current) {
      streetAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        streetInputRef.current, 
        { types: ['address'], componentRestrictions: { country: 'ua' } }
      );
      streetAutocompleteRef.current.addListener('place_changed', () => {
        const place = streetAutocompleteRef.current.getPlace();
        handleStreetSelect(place);
      });
    }
  };

  const fetchApartmentData = async (id) => {
    try {
      const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
      if (!response.ok) throw new Error('Ошибка загрузки данных');
      
      const apartmentData = await response.json();
      
      setFormData({
        city: apartmentData.city || '',
        street: apartmentData.street || '',
        district: apartmentData.district || '',
        metro: apartmentData.metro || '',
        hasMetro: apartmentData.hasMetro || false,
        description: apartmentData.description || '',
        price: apartmentData.price || '',
        houseNumber: apartmentData.houseNumber || '',
        category: apartmentData.category || '',
        objectName: apartmentData.objectName || '',
        latitude: apartmentData.latitude || null,
        longitude: apartmentData.longitude || null,
        originalCity: apartmentData.originalCity || '',
        region: apartmentData.region || '',
      });

      setUploadImages(apartmentData.photos || []);
      
      if (apartmentData.latitude && apartmentData.longitude) {
        setSelectedLocation({
          lat: apartmentData.latitude,
          lng: apartmentData.longitude
        });
        setMapCenter({
          lat: apartmentData.latitude,
          lng: apartmentData.longitude
        });
      }

      if (infoRef.current && apartmentData) {
        infoRef.current.setData(apartmentData);
      }

    } catch (error) {
      console.error('Ошибка загрузки данных объявления:', error);
      alert('Не удалось загрузить данные для редактирования');
    }
  };

  const handleCitySelect = (place) => {
    const addressComponents = place?.address_components || [];
    const cityComponent = addressComponents.find(c => c.types.includes('locality'));
    const regionComponent = addressComponents.find(c => c.types.includes('administrative_area_level_1'));
    
    const city = cityComponent?.long_name || place?.name || '';
    const region = regionComponent?.long_name || '';
    const fullCityName = region ? `${city}, ${region}` : city;
    
    const cleanedCity = city.trim().toLowerCase();
    const hasMetro = CITIES_WITH_METRO.some(
      c => c.trim().toLowerCase() === cleanedCity
    );
    
    setFormData(prev => ({ 
      ...prev, 
      city: fullCityName,
      originalCity: city,
      region,
      metro: '',
      hasMetro
    }));
    
    setErrors(prev => ({ ...prev, city: false, metro: false }));

    if (place?.geometry?.location) {
      updateMapLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  const handleStreetSelect = (place) => {
    let street = place?.formatted_address?.split(',')[0] || '';
    setFormData(prev => ({ ...prev, street }));
    setErrors(prev => ({ ...prev, street: false }));

    if (formData.houseNumber && place?.geometry?.location) {
      updateMapLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng()
      });
    }
  };

  const handleMetroSelect = (metro) => {
    setFormData(prev => ({ ...prev, metro }));
    setErrors(prev => ({ ...prev, metro: false }));
  };

  const updateMapLocation = (location) => {
    setSelectedLocation(location);
    setMapCenter(location);
    setFormData(prev => ({
      ...prev,
      latitude: location.lat,
      longitude: location.lng
    }));
  };

  const geocodeAddress = (address) => {
    if (!geocoderRef.current) return;

    geocoderRef.current.geocode({ address }, (results, status) => {
      if (status === 'OK' && results[0]) {
        updateMapLocation({
          lat: results[0].geometry.location.lat(),
          lng: results[0].geometry.location.lng()
        });
      }
    });
  };

  const updateLocation = () => {
    if (formData.city && formData.street && formData.houseNumber) {
      geocodeAddress(`${formData.street}, ${formData.houseNumber}, ${formData.city}`);
    }
  };

  const toggleStreetInputMode = () => {
    if (showManualStreetInput) {
      setShowManualStreetInput(false);
      setTimeout(() => {
        if (streetInputRef.current && !streetAutocompleteRef.current) {
          initAutocomplete();
        }
      }, 0);
    } else {
      if (streetAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(streetInputRef.current);
        streetAutocompleteRef.current = null;
      }
      setShowManualStreetInput(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    console.log(name);
     console.log(value);
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleHouseNumberChange = (e) => {
    const houseNumber = e.target.value;
    setFormData(prev => ({ ...prev, houseNumber }));
    setErrors(prev => ({ ...prev, houseNumber: false }));
  };

  const validateForm = () => {
    const descriptionTooShort = formData.description.length < 85;
    const cityHasMetro = CITIES_WITH_METRO.some(
      city => city.toLowerCase() === formData.originalCity?.toLowerCase()
    );
  console.log(formData.category);
    const newErrors = {
      category: !formData.category,
      objectName: !formData.objectName || formData.objectName.length > 59,
      description: !formData.description || descriptionTooShort,
      city: !formData.city,
      price: !formData.price,
      street: !formData.street,
      houseNumber: !formData.houseNumber,
      district: !formData.district,
      metro: cityHasMetro && !formData.metro,
    };
  
    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };






const handleSubmit = async (e) => {
  e.preventDefault();

  if (uploadImages.length < 3) {
    setPhotoError(true);
    setSnackbarMessage(t.minPhotosError);
    setSnackbarOpen(true);
    return;
  }

  const isFormValid = validateForm();
  const isInfoValid = infoRef.current?.validate();

  if (!isFormValid || !isInfoValid) {
    setSnackbarMessage(t.errorMessage);
    setSnackbarOpen(true);
    return;
  }

  setIsSubmitting(true);
  try {
    const url = isEditMode 
      ? `http://localhost:3000/api/v1/apartments/update/${apartmentId}`
      : 'http://localhost:3000/api/v1/apartments/add';

    const method = isEditMode ? 'PUT' : 'POST';

    console.log('Отправляемые данные:', {
      ...apartmentInfo, 
      ...formData, 
      photos: uploadImages,
      user_id: profile._id,
    });

    const response = await fetch(url, {
      method,
      body: JSON.stringify({ 
        ...apartmentInfo, 
        ...formData, 
        photos: uploadImages,
        user_id: profile._id,
      }),
      headers: { 'Content-Type': 'application/json' },
    });

    const responseText = await response.text();
    console.log('Ответ сервера:', responseText);

    let responseData;
    try {
      responseData = JSON.parse(responseText);
    } catch (e) {
      console.error('Ошибка парсинга JSON:', e);
      throw new Error('Неверный формат ответа от сервера: ' + responseText);
    }

    if (!response.ok) {
      throw new Error(responseData.message || t.serverError);
    }
    
    // ПОСЛЕ УСПЕШНОГО СОХРАНЕНИЯ ПЕРЕНАПРАВЛЯЕМ
    setSnackbarMessage(isEditMode ? t.updateMessage : t.successMessage);
    setSnackbarOpen(true);
    
    // Ждем 2 секунды чтобы показать сообщение об успехе, затем перенаправляем
    setTimeout(() => {
      router.push('/my-listings');
    }, 2000);
    
    if (!isEditMode) {
      // Только для создания нового сбрасываем форму
      setFormData({
        city: '', street: '', district: '', metro: '', hasMetro: false,
        description: '', price: '', houseNumber: '',
        category: '', objectName: '', latitude: null, longitude: null,
        originalCity: '', region: '',
      });
      setUploadImages([]);
      setApartmentInfo({});
      setSelectedLocation(null);
      setMapCenter({ lat: 50.4501, lng: 30.5234 });
      
      if (infoRef.current?.reset) {
        infoRef.current.reset();
      }
    }
    
  } catch (error) {
    console.error('Error:', error);
    setSnackbarMessage(error.message || t.serverError);
    setSnackbarOpen(true);
  } finally {
    setIsSubmitting(false);
  }
};

  const handlePreview = () => {
    const isFormValid = validateForm();
    const isInfoValid = infoRef.current?.validate();
    const hasEnoughPhotos = uploadImages.length >= 3;

    setPhotoError(!hasEnoughPhotos);
    
    if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
      setSnackbarMessage(t.errorMessage);
      setSnackbarOpen(true);
      return;
    }
    setPreviewOpen(true);
  };

  // const handleClosePreview = (shouldEdit) => {
  //   setPreviewOpen(false);
  //   if (!shouldEdit) handleSubmit({ preventDefault: () => {} });
  // };

  const handleClosePreview = (shouldEdit) => {
    setPreviewOpen(false);
    if (!shouldEdit) {
      // Если нажали "Опубликовать" в предпросмотре, отправляем форму
      handleSubmit({ preventDefault: () => {} });
    }
  };

  return (
    <LoadScript
      googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
      libraries={['places']}
      onLoad={() => setIsGoogleMapsLoaded(true)}
      onError={(error) => console.error('Error loading Google Maps API:', error)}
    >
      <Container maxWidth="md" sx={{ 
        py: isMobile ? 2 : 4,
        '& .MuiTextField-root, & .MuiFormControl-root': {
          fontSize: isMobile ? '14px' : 'inherit'
        }
      }}>
        <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
          {isEditMode ? t.editTitle : t.addTitle}
        </Typography>

        <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
          <FormControl fullWidth margin="normal" error={!!errors.category}>
            <InputLabel>{t.categoryLabel}</InputLabel>
            <Select
              name="category"
              value={formData.category || ''}
              onChange={handleInputChange}
              label={t.categoryLabel}
              inputProps={{ name: 'category' }} 

            >
              {t.categories.map((cat) => (
                <MenuItem key={cat} value={cat}>{cat}</MenuItem>
              ))}
            </Select>
          </FormControl>

          <TextField
            fullWidth
            margin="normal"
            size={isMobile ? "small" : "medium"}
            name="objectName"
            label={t.objectNameLabel}
            value={formData.objectName || ''}
            onChange={handleInputChange}
            error={!!errors.objectName}
            helperText={
              errors.objectName 
                ? formData.objectName?.length > 59 
                  ? t.maxCharsError 
                  : t.requiredField
                : t.objectNameHelper
            }
          />

          <TextField
            fullWidth
            margin="normal"
            size={isMobile ? "small" : "medium"}
            name="description"
            label={t.descriptionLabel}
            multiline
            rows={4}
            value={formData.description}
            onChange={handleInputChange}
            error={!!errors.description}
            helperText={errors.description ? t.descriptionHelper : ''}
          />

          <Box margin="normal" sx={{ mt: 3 }}>
            <TextField
              fullWidth
              size={isMobile ? "small" : "medium"}
              inputRef={cityInputRef}
              label={t.cityLabel}
              value={formData.city}
              onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
              error={errors.city}
              helperText={errors.city ? t.requiredField : ''}
              placeholder={t.cityLabel}
            />
          </Box>

          <MetroSelector
            city={formData.originalCity}
            onMetroSelect={handleMetroSelect}
            error={!!errors.metro}
            show={formData.hasMetro}
            value={formData.metro} // ДОБАВЬТЕ ЭТУ СТРОЧКУ - передаем текущее значение

          />

          <Box margin="normal" sx={{ mt: 3 }}>
            {!showManualStreetInput ? (
              <>
                <TextField
                  fullWidth
                  size={isMobile ? "small" : "medium"}
                  inputRef={streetInputRef}
                  label={t.streetLabel}
                  value={formData.street}
                  onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                  error={errors.street}
                  helperText={errors.street ? t.requiredField : ''}
                  placeholder={t.streetLabel}
                />
                <Button
                  variant="text"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: 'none',
                    color: '#1976d2',
                    mt: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={toggleStreetInputMode}
                >
                  {t.manualStreetPrompt}
                </Button>
              </>
            ) : (
              <>
                <TextField
                  fullWidth
                  label={t.streetLabel}
                  size={isMobile ? "small" : "medium"}
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  error={errors.street}
                  helperText={errors.street ? t.requiredField : ''}
                  placeholder={t.streetLabel}
                />
                <Button
                  variant="text"
                  size={isMobile ? "small" : "medium"}
                  sx={{
                    textTransform: 'none',
                    color: '#1976d2',
                    mt: 1,
                    '&:hover': {
                      backgroundColor: 'transparent',
                      textDecoration: 'underline',
                    },
                  }}
                  onClick={toggleStreetInputMode}
                >
                  {t.googleStreetPrompt}
                </Button>
              </>
            )}
          </Box>

          <Box sx={{ mt: 2 }}>
            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
              <TextField 
                fullWidth 
                name="houseNumber" 
                size={isMobile ? "small" : "medium"}
                label={t.houseNumberLabel} 
                value={formData.houseNumber} 
                onChange={handleHouseNumberChange} 
                error={errors.houseNumber} 
                helperText={errors.houseNumber ? t.requiredField : ""} 
              />
              <TextField 
                fullWidth 
                name="price" 
                label={t.priceLabel} 
                type="number" 
                size={isMobile ? "small" : "medium"}
                value={formData.price} 
                onChange={handleInputChange} 
                error={errors.price} 
                helperText={errors.price ? t.requiredField : ""} 
              />
            </Box>
          </Box>

          {selectedLocation && (
            <Box sx={{ height: '300px', width: '100%', mt: 2 }}>
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={mapCenter}
                zoom={17}
              >
                <Marker
                  position={selectedLocation}
                  draggable
                  onDragEnd={(e) => {
                    updateMapLocation({
                      lat: e.latLng.lat(),
                      lng: e.latLng.lng()
                    });
                  }}
                />
              </GoogleMap>
              <Box sx={{ mt: 1.5, mb: 0.5, py: 0.5, textAlign: 'center' }}>
                <Typography variant="body2" sx={{ color: '#ff5722' }}>
                  {t.moveMarkerText}
                </Typography>
              </Box>
            </Box>
          )}

          <TextField
            fullWidth
            margin="normal"
            size={isMobile ? "small" : "medium"}
            name="district"
            label={t.districtLabel}
            placeholder={t.districtLabel}
            value={formData.district}
            onChange={handleInputChange}
            error={!!errors.district}
            helperText={errors.district ? t.requiredField : ''}
            sx={{ maxWidth: 200, mt: 8 }}
          />

          <Box sx={{ 
            mt: 3, 
            borderRadius: 2,
            border: photoError ? '1px solid red' : 'none'
          }}>
            <FileUploadSlider 
              photos={uploadImages}
              setUploadImages={setUploadImages}
              editable={true}
              onPhotosChange={(newPhotos) => {
                setPhotoError(newPhotos.length < 3);
              }}
            />
            {photoError && (
              <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                {t.uploadPhotosText}
              </Typography>
            )}
          </Box>

          <InfoApartments ref={infoRef} onDataChange={setApartmentInfo} />

          <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
            <Button variant="outlined" size="large" onClick={handlePreview}>
              {t.previewButton}
            </Button>
            <Button 
              variant="contained" 
              size="large" 
              type="submit" 
              disabled={isSubmitting}
            >
              {isSubmitting ? <CircularProgress size={24} /> : 
                (isEditMode ? t.saveButton : t.submitButton)}
            </Button>
          </Stack>
        </Box>

        <PreviewDialog
          open={previewOpen}
          onClose={handleClosePreview}
          formData={formData}
          uploudImages={uploadImages}
          apartmentInfo={apartmentInfo}
          photoError={photoError}
        />

        <Snackbar 
          open={snackbarOpen} 
          autoHideDuration={6000} 
          onClose={() => setSnackbarOpen(false)}
        >
          <Alert 
            onClose={() => setSnackbarOpen(false)} 
            severity="success"
            sx={{ width: '100%' }}
          >
            {snackbarMessage}
          </Alert>
        </Snackbar>
      </Container>
    </LoadScript>
  );
}

export default function AddApartment() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header/>
        <AddApartmentForm />
      </LanguageProvider>
    </Provider>
  );
}