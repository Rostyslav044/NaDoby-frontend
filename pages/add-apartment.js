












import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import FileUploadSlider from '@/app/components/FileUploadSlider';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  Stack,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AddApartment = () => {
  // Состояния
  const [formData, setFormData] = useState({
    objectName: '',
    category: '',
    description: '',
    city: '',
    street: '',
    price: '',
  });

  const [errors, setErrors] = useState({
    objectName: false,
    category: false,
    description: false,
    city: false,
    street: false,
    price: false,
  });

  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualStreetInput, setShowManualStreetInput] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 }); // Координаты Киева по умолчанию

  // Константы
  const categories = ['Квартира', 'Апартаменты', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
  const GOOGLE_API_KEY = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w"; // Ваш ключ API

  // Валидация формы
  const validateForm = () => {
    const newErrors = {
      objectName: !formData.objectName,
      category: !formData.category,
      description: !formData.description,
      city: !formData.city,
      street: !formData.street,
      price: !formData.price,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some(error => error);
  };

  // Обработчики событий
  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleCitySelect = (place) => {
    const city = place?.formatted_address || '';
    setFormData(prev => ({ ...prev, city }));
    setErrors(prev => ({ ...prev, city: false }));

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
    const street = place?.formatted_address?.split(',')[0] || '';
    setFormData(prev => ({ ...prev, street }));
    setErrors(prev => ({ ...prev, street: false }));

    if (place?.geometry?.location) {
      const location = {
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      };
      setSelectedLocation(location);
      setMapCenter(location);
    }
  };

  // const handlePhotoChange = (e) => {
  //   const files = Array.from(e.target.files).slice(0, 9);
  //   setPhotos(files);
  // };

  // Расширим handlePhotoChange, чтобы поддерживать добавление и обновление фотографий:
  const handlePhotoChange = (e) => {
    const files = Array.from(e.target.files);
    const newPhotos = [...photos, ...files].slice(0, 15); // максимум 15 фото
    setPhotos(newPhotos);
  };
  // Добавим функцию удаления:
  const handleRemovePhoto = (index) => {
    const updatedPhotos = [...photos];
    updatedPhotos.splice(index, 1);
    setPhotos(updatedPhotos);
  };
  

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    if (!validateForm()) {
      setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);

    try {
      // Здесь должна быть ваша логика отправки данных
      console.log('Данные для отправки:', formData);

      const res = await fetch('http://localhost:3000/api/v1/apartments/add', {
        method: 'POST',
        body:JSON.stringify (formData),
      });

      // const data = await res.json();
      JSON.stringify (formData);
      
      setSnackbarMessage('Объявление успешно добавлено!');
      setSnackbarOpen(true);
    } catch (error) {
      console.error('Ошибка:', error);
      setSnackbarMessage('Произошла ошибка при добавлении объявления');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  const handlePreview = () => {
    if (!validateForm()) {
      setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
      setSnackbarOpen(true);
      return;
    }
    setPreviewOpen(true);
  };

  const handleClosePreview = (shouldEdit) => {
    setPreviewOpen(false);
    if (!shouldEdit) {
      handleSubmit({ preventDefault: () => {} });
    }
  };

  return (
    <Container maxWidth="md" sx={{ py: 4 }}>
      <Typography variant="h4" align="center" gutterBottom>
        Добавить новое объявление
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {/* Категория */}
        <FormControl fullWidth margin="normal" error={errors.category}>
          <InputLabel>Категория *</InputLabel>
          <Select
            name="category"
            value={formData.category}
            onChange={handleInputChange}
            label="Категория *"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>{cat}</MenuItem>
            ))}
          </Select>
          {errors.category && <Typography variant="caption" color="error">Это поле обязательно</Typography>}
        </FormControl>

        {/* Название объекта */}
        <TextField
          fullWidth
          margin="normal"
          name="objectName"
          label="Название объекта *"
          value={formData.objectName}
          onChange={handleInputChange}
          error={errors.objectName}
          helperText={errors.objectName ? "Это поле обязательно" : "Например: Гостиница Уют"}
        />

        {/* Описание */}
        <TextField
          fullWidth
          margin="normal"
          name="description"
          label="Описание *"
          multiline
          rows={4}
          value={formData.description}
          onChange={handleInputChange}
          error={errors.description}
          helperText={errors.description ? "Это поле обязательно" : ""}
        />

        {/* Город с автозаполнением Google */}
        <Box margin="normal">
          <Autocomplete
            apiKey={GOOGLE_API_KEY}
            onPlaceSelected={handleCitySelect}
            options={{
              types: ['(cities)'],
              componentRestrictions: { country: 'ua' },
            }}
            defaultValue={formData.city}
            placeholder="Введите город"
            style={{
              width: '100%',
              padding: '16.5px 14px',
              fontSize: '1rem',
              borderRadius: '4px',
              border: errors.city ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
              outline: 'none',
              fontFamily: 'inherit',
              marginBottom:'15px',
              marginTop: '10px',
              maxWidth: '100%',
             boxSizing:'border-box',
            }}
          />
          {errors.city && <Typography variant="caption" color="error" sx={{ mt: 1 }}>Это поле обязательно</Typography>}
        </Box>

        {/* Улица с автозаполнением Google */}
        <Box margin="normal">
          {!showManualStreetInput ? (
            <>
              <Autocomplete
                apiKey={GOOGLE_API_KEY}
                onPlaceSelected={handleStreetSelect}
                options={{
                  types: ['address'],
                  componentRestrictions: { country: 'ua' },
                }}
                defaultValue={formData.street}
                placeholder="Введите улицу"
                style={{
                  width: '100%',
                  maxWidth: '100%',
                  boxSizing:'border-box',
                  padding: '16.5px 14px',
                  fontSize: '1rem',
                  borderRadius: '4px',
                  border: errors.street ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
                  outline: 'none',
                  fontFamily: 'inherit',
                }}
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
                    }
                  }}
                  onClick={() => setShowManualStreetInput(true)}
                >
                  Не нашли улицу? Введите вручную
                </Button>
              </Box>
              {errors.street && <Typography variant="caption" color="error" sx={{ mt: 1 }}>Это поле обязательно</Typography>}
            </>
          ) : (
            <TextField
              fullWidth
              label="Улица *"
              name="street"
              value={formData.street}
              onChange={handleInputChange}
              error={errors.street}
              helperText={errors.street ? "Это поле обязательно" : ""}
            />
          )}
        </Box>

        {/* Карта */}
        {selectedLocation && (
          <Box margin="normal" sx={{ height: '300px', width: '100%', mt: 2 }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={mapCenter}
              zoom={15}
            >
              <Marker
                position={selectedLocation}
                draggable={true}
                onDragEnd={(e) => {
                  const newLocation = {
                    lat: e.latLng.lat(),
                    lng: e.latLng.lng(),
                  };
                  setSelectedLocation(newLocation);
                }}
              />
            </GoogleMap>
          </Box>
        )}

        {/* Цена */}
        <TextField
          fullWidth
          margin="normal"
          name="price"
          label="Цена *"
          type="number"
          
          value={formData.price}
          onChange={handleInputChange}
          error={errors.price}
          helperText={errors.price ? "Это поле обязательно" : ""}
          sx={{ maxWidth: 200 }}
          InputProps={{
            endAdornment: <Typography sx={{ ml: 1 }}>грн</Typography>,
          }}
        />

        {/* Фотографии */}
        {/* <Box margin="normal">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="photo-upload"
            type="file"
            multiple
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo-upload">
            <Button variant="contained" component="span" startIcon={<PhotoCamera /> }>
              Загрузить фотографии 
            </Button>
          </label>
          {photos.length > 0 && (
            <Box sx={{ mt: 2, display: 'flex', flexWrap: 'wrap', gap: 1 }}>
              {photos.map((photo, index) => (
                <Chip 
                  key={index} 
                  label={photo.name} 
                  onDelete={() => setPhotos(photos.filter((_, i) => i !== index))} 
                />
              ))}
            </Box>
          )}
        </Box> */}

<FileUploadSlider/>




        {/* Кнопки */}
        <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
          <Button
            variant="outlined"
            size="large"
            onClick={handlePreview}
          >
            Предпросмотр
          </Button>
          <Button
            type="submit"
            variant="contained"
            size="large"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
          </Button>
        </Stack>
      </Box>

      {/* Диалог предпросмотра */}
      <Dialog open={previewOpen} onClose={() => handleClosePreview(false)} maxWidth="md" fullWidth>
        <DialogTitle>Предпросмотр объявления</DialogTitle>
        <DialogContent>
          <Typography variant="h5" gutterBottom>{formData.objectName}</Typography>
          <Typography color="textSecondary" gutterBottom>{formData.category}</Typography>
          <Typography paragraph>{formData.description}</Typography>
          
          <Typography gutterBottom><strong>Местоположение:</strong> {formData.city}, {formData.street}</Typography>
          <Typography gutterBottom><strong>Цена:</strong> {formData.price} грн</Typography>

          {photos.length > 0 && (
            <Box sx={{ mt: 3, display: 'flex', flexWrap: 'wrap', gap: 2 }}>
              {photos.map((photo, index) => (
                <img
                  key={index}
                  src={URL.createObjectURL(photo)}
                  alt={`Фото ${index + 1}`}
                  style={{ maxHeight: '200px', maxWidth: '100%', objectFit: 'contain' }}
                />
              ))}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={() => handleClosePreview(true)}>Редактировать</Button>
          <Button onClick={() => handleClosePreview(false)} variant="contained">
            Опубликовать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Уведомление */}
      <Snackbar
        open={snackbarOpen}
        autoHideDuration={6000}
        onClose={() => setSnackbarOpen(false)}
      >
        <Alert onClose={() => setSnackbarOpen(false)} severity="success">
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddApartment;










