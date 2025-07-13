







'use client';

import React, { useState, useEffect, useRef } from 'react';
import FileUploadSlider from '@/app/components/FileUploadSlider';
import { LanguageProvider } from '@/app/LanguageContext';
import MetroSelector from '@/app/components/MetroSelector';
import InfoApartments from '@/app/components/InfoApartments';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import PreviewDialog from '@/app/components/PreviewDialog';
import {
  Container, Typography, TextField, Select, MenuItem, Button,
  FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack
} from '@mui/material';

const AddApartment = () => {
  const [uploudImages, setUploudImages] = useState([]);
  const [formData, setFormData] = useState({
    city: '', street: '', district: '', metro: '', hasMetro: false,
    description: '', price: '', uploudImages, houseNumber: '',
    category: '', objectName: ''
  });

  const infoRef = useRef();
  const cityAutocompleteRef = useRef(null);
  const streetAutocompleteRef = useRef(null);
  const cityInputRef = useRef(null);
  const streetInputRef = useRef(null);

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

  useEffect(() => {
    if (uploudImages.length >= 3) setPhotoError(false);
  }, [uploudImages]);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) initAutocomplete();
  }, [isGoogleMapsLoaded]);

  const initAutocomplete = () => {
    if (cityInputRef.current && !cityAutocompleteRef.current) {
      cityAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        cityInputRef.current, { types: ['(cities)'], componentRestrictions: { country: 'ua' } }
      );
      cityAutocompleteRef.current.addListener('place_changed', () => {
        const place = cityAutocompleteRef.current.getPlace();
        handleCitySelect(place);
      });
    }

    if (streetInputRef.current && !streetAutocompleteRef.current && !showManualStreetInput) {
      streetAutocompleteRef.current = new window.google.maps.places.Autocomplete(
        streetInputRef.current, { types: ['address'], componentRestrictions: { country: 'ua' } }
      );
      streetAutocompleteRef.current.addListener('place_changed', () => {
        const place = streetAutocompleteRef.current.getPlace();
        handleStreetSelect(place);
      });
    }
  };

  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({ ...prev, latitude: selectedLocation.lat, longitude: selectedLocation.lng }));
    }
  }, [selectedLocation]);

  const categories = ['Квартира', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const validateForm = () => {
    const descriptionTooShort = formData.description.length < 60;
    const forbiddenPattern = /[@]|https?:\/\/|www\./i;

    const newErrors = {
      category: !formData.category,
      objectName: !formData.objectName || forbiddenPattern.test(formData.objectName),
      description: !formData.description || forbiddenPattern.test(formData.description) || descriptionTooShort,
      city: !formData.city,
      price: !formData.price,
      street: !formData.street,
      houseNumber: !formData.houseNumber,
      district: !formData.district,
      metro: formData.hasMetro && !formData.metro,
    };

    setErrors(newErrors);
    return !Object.values(newErrors).some(Boolean);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleCitySelect = (place) => {
    const cityComponent = place?.address_components?.find((comp) => comp.types.includes('locality'));
    const city = cityComponent?.long_name || place?.name || '';
    setFormData((prev) => ({ ...prev, city }));
    setErrors((prev) => ({ ...prev, city: false }));

    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedLocation(location);
      setMapCenter(location);
    }
  };

  const handleStreetSelect = (place) => {
    let street = place?.formatted_address || '';
    if (street.includes(',')) street = street.split(',')[0];
    setFormData((prev) => ({ ...prev, street }));
    setErrors((prev) => ({ ...prev, street: false }));

    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedLocation(location);
      setMapCenter(location);
    }
  };

  const handleSubmit = async (e) => {
    e.preventDefault();

    const isFormValid = validateForm();
    const isInfoValid = infoRef.current?.validate();
    const hasEnoughPhotos = uploudImages.length >= 3;

    setPhotoError(!hasEnoughPhotos);

    if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
      setSnackbarMessage('Для подачи объявления нужно заполнить все поля!');
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    try {
      await fetch('http://localhost:3000/api/v1/apartments/add', {
        method: 'POST',
        body: JSON.stringify({ ...formData, ...apartmentInfo, photos: uploudImages }),
        headers: { 'Content-Type': 'application/json' },
      });
      setSnackbarMessage('Объявление успешно добавлено!');
    } catch (error) {
      console.error('Ошибка:', error);
      setSnackbarMessage('Произошла ошибка при добавлении объявления');
    } finally {
      setIsSubmitting(false);
      setSnackbarOpen(true);
    }
  };

  // const handlePreview = () => {
  //   const isFormValid = validateForm();
  //   const isInfoValid = infoRef.current?.validate();
  //   if (!isFormValid || !isInfoValid) {
  //     setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
  //     setSnackbarOpen(true);
  //     return;
  //   }
  //   setPreviewOpen(true);
  // };

  const handlePreview = () => {
    const isFormValid = validateForm();
    const isInfoValid = infoRef.current?.validate();
    const hasEnoughPhotos = uploudImages.length >= 3;
    
    setPhotoError(!hasEnoughPhotos);
    
    if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
      setSnackbarMessage('Пожалуйста, заполните все обязательные поля и загрузите минимум 3 фото');
      setSnackbarOpen(true);
      return;
    }
    setPreviewOpen(true);
  };

  const handleClosePreview = (shouldEdit) => {
    setPreviewOpen(false);
    if (!shouldEdit) handleSubmit({ preventDefault: () => {} });
  };

  return (
    <LanguageProvider>
      <LoadScript
        googleMapsApiKey={GOOGLE_MAPS_API_KEY}
        libraries={['places']}
        onLoad={() => setIsGoogleMapsLoaded(true)}
      >
        <Container maxWidth="md" sx={{ py: 4 }}>
          <Typography variant="h4" align="center" gutterBottom>
            Добавить новое объявление
          </Typography>
          <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
            {/* Категория */}
            <FormControl fullWidth margin="normal" error={!!errors.category}>
              <InputLabel>Категория *</InputLabel>
              <Select
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                label="Категория *"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>
                    {cat}
                  </MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth
              margin="normal"
              name="objectName"
              label="Название объекта *"
              value={formData.objectName || ''}
              onChange={handleInputChange}
              error={!!errors.objectName}
              helperText={
                errors.objectName ? 'Обязательное поле. Нельзя использовать @ или ссылки.' : 'Например: Гостиница Уют'
              }
            />

            <TextField
              fullWidth
              margin="normal"
              name="description"
              label="Описание *"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={
                errors.description ? 'Минимум 60 символов. Нельзя использовать @ или ссылки.' : ''
              }
            />

            {/* Город */}
            <Box margin="normal" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                inputRef={cityInputRef}
                label="Город *"
                value={formData.city}
                onChange={(e) => setFormData((prev) => ({ ...prev, city: e.target.value }))}
                error={errors.city}
                helperText={errors.city ? 'Это поле обязательно' : ''}
                placeholder="Введите город"
              />
            </Box>

            <MetroSelector
              city={formData.city}
              onMetroSelect={(metro) => setFormData((prev) => ({ ...prev, metro }))}
              error={!!errors.metro}
            />

            {/* Улица */}
            <Box margin="normal" sx={{ mt: 3 }}>
              {!showManualStreetInput ? (
                <>
                  <TextField
                    fullWidth
                    inputRef={streetInputRef}
                    label="Улица *"
                    value={formData.street}
                    onChange={(e) => setFormData((prev) => ({ ...prev, street: e.target.value }))}
                    error={errors.street}
                    helperText={errors.street ? 'Это поле обязательно' : ''}
                    placeholder="Введите улицу"
                  />
                  <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
                    <Button
                      variant="text"
                      size="small"
                      sx={{
                        textTransform: 'none',
                        color: '#1976d2',
                        '&:hover': {
                          backgroundColor: 'transparent',
                          textDecoration: 'underline',
                        },
                      }}
                      onClick={() => setShowManualStreetInput(true)}
                    >
                      Не нашли улицу? Введите вручную
                    </Button>
                  </Box>
                </>
              ) : (
                <TextField
                  fullWidth
                  label="Улица *"
                  name="street"
                  value={formData.street}
                  onChange={handleInputChange}
                  error={errors.street}
                  helperText={errors.street ? 'Это поле обязательно' : ''}
                />
              )}
            </Box>

            <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
              <TextField fullWidth name="houseNumber" label="Номер дома *" value={formData.houseNumber} onChange={handleInputChange} error={errors.houseNumber} helperText={errors.houseNumber ? "Это поле обязательно" : ""} />
              <TextField fullWidth name="price" label="Цена *" type="number" value={formData.price} onChange={handleInputChange} error={errors.price} helperText={errors.price ? "Это поле обязательно" : ""} />
            </Box>

            {selectedLocation && (
              <Box sx={{ height: '300px', width: '100%', mt: 2 }}>
                <GoogleMap
                  mapContainerStyle={{ width: '100%', height: '100%' }}
                  center={mapCenter}
                  zoom={15}
                >
                  <Marker
                    position={selectedLocation}
                    draggable
                    onDragEnd={(e) => setSelectedLocation({ lat: e.latLng.lat(), lng: e.latLng.lng() })}
                  />
                </GoogleMap>
              </Box>
            )}

            <TextField
              fullWidth
              margin="normal"
              name="district"
              label="Район *"
              placeholder="Укажите район"
              value={formData.district}
              onChange={handleInputChange}
              error={!!errors.district}
              helperText={errors.district ? 'Это поле обязательно' : ''}
              sx={{ maxWidth: 200 }}
            />

            <Box sx={{ mt: 3, border: photoError ? '1px solid red' : 'none', p: 2, borderRadius: 2 }}>
              <FileUploadSlider setUploudImages={setUploudImages} />
              {photoError && (
                <Typography color="error" variant="body2" sx={{ mt: 1 }}>
                  Загрузите минимум 3 фото
                </Typography>
              )}
            </Box>

            <InfoApartments ref={infoRef} onDataChange={setApartmentInfo} />

            <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
              <Button variant="outlined" size="large" onClick={handlePreview}>
                Предпросмотр
              </Button>
              <Button variant="contained" size="large" onClick={handleSubmit} disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : 'Создать объявление'}
              </Button>
            </Stack>
          </Box>

        

<PreviewDialog
  open={previewOpen}
  onClose={handleClosePreview}
  formData={formData}
  uploudImages={uploudImages}
  apartmentInfo={apartmentInfo}
  photoError={photoError}

  
/>

          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity="success">
              {snackbarMessage}
            </Alert>
          </Snackbar>
        </Container>
      </LoadScript>
    </LanguageProvider>
  );
};

export default AddApartment;




