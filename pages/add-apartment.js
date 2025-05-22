


// import React, { useState } from 'react';
// import axios from 'axios';
// import Autocomplete from 'react-google-autocomplete';
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import {
//   Container,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Box,
//   Chip,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   IconButton,
//   ToggleButtonGroup,
//   ToggleButton,
// } from '@mui/material';
// import { PhotoCamera, LocationOn, NavigateBefore, NavigateNext } from '@mui/icons-material';

// const AddApartment = () => {
//   // Состояния
//   const [formData, setFormData] = useState({
//     city: '',
//     district: '',
//     street: '',
//     houseNumber: '',
//     description: '',
//     price: '',
//     category: '',
//     metro: '',
//   });
//   const [photos, setPhotos] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showMetro, setShowMetro] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [city, setCity] = useState('');
//   const [streetError, setStreetError] = useState('');
//   const [streetInputMode, setStreetInputMode] = useState('google'); // 'google' или 'manual'
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [previewOpen, setPreviewOpen] = useState(false); // Для предпросмотра
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Для пролистывания фото

//   // Константы
//   const categories = ['Квартира', 'Апартаменты', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
//   const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w"; // Ваш ключ API

//   // Списки метро
//   const metroStations = {
//     kyiv: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская', 'Политехнический институт',
//       'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная', 'Днепр', 'Гидропарк', 'Левобережная',
//       'Дарница', 'Черниговская', 'Лесная'
//     ],
//     kharkiv: [
//       'Холодная Гора', 'Южный Вокзал', 'Центральный Рынок', 'Площадь Конституции', 'Проспект Гагарина', 'Спортивная',
//       'Завод имени Малышева', 'Московский проспект', 'Дворец Спорта', 'Армейская', 'Имени А.С. Масельского',
//       'Тракторный Завод', 'Индустриальная'
//     ],
//     dnipropetrovsk: [
//       'Вокзальна', 'Метростроителей', 'Центральна', 'Покровская', 'Проспект Свободы', 'Театральная'
//     ]
//   };

//   // Выбор списка метро в зависимости от города
//   const getMetroStationsForCity = () => {
//     const cityLower = city.toLowerCase();
//     if (cityLower.includes('киев') || cityLower.includes('київ') || cityLower.includes('kyiv')) {
//       return metroStations.kyiv;
//     } else if (cityLower.includes('харьков') || cityLower.includes('харків') || cityLower.includes('kharkiv')) {
//       return metroStations.kharkiv;
//     } else if (cityLower.includes('днепр') || cityLower.includes('дніпро') || cityLower.includes('dnipropetrovsk')) {
//       return metroStations.dnipropetrovsk;
//     }
//     return [];
//   };

//   // Обработчики событий

//   // Выбор города
//   const handleCitySelect = (place) => {
//     const formattedAddress = place?.formatted_address || '';
//     setFormData((prevData) => ({
//       ...prevData,
//       city: formattedAddress,
//     }));
//     setCity(formattedAddress);

//     if (place.geometry && place.geometry.location) {
//       setSelectedLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//     }

//     const cityLower = formattedAddress.toLowerCase();
//     const isKyiv = ['киев', 'київ', 'kyiv'].some((name) => cityLower.includes(name));
//     const isKharkiv = ['харьков', 'харків', 'kharkiv'].some((name) => cityLower.includes(name));
//     const isDnipropetrovsk = ['днепр', 'дніпро', 'dnipropetrovsk'].some((name) => cityLower.includes(name));

//     setShowMetro(isKyiv || isKharkiv || isDnipropetrovsk);
//     if (!isKyiv && !isKharkiv && !isDnipropetrovsk) {
//       setFormData((prevData) => ({ ...prevData, metro: '' }));
//     }
//   };

//   // Выбор улицы через Google Autocomplete
//   const handleStreetSelect = (place) => {
//     const address = place?.formatted_address || '';
//     const street = address.split(',')[0];

//     if (city && !address.toLowerCase().includes(city.toLowerCase())) {
//       setStreetError('Улица не найдена в выбранном городе. Пожалуйста, выберите улицу из списка.');
//       return;
//     } else {
//       setStreetError('');
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       street: street,
//     }));

//     if (place && place.geometry) {
//       setSelectedLocation(place.geometry.location);
//     } else {
//       setSelectedLocation(null);
//     }
//   };

//   // Ручной ввод улицы
//   const handleManualStreetInput = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       street: e.target.value,
//     }));
//   };

//   // Загрузка фотографий
//   const handlePhotoChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 9) {
//       setSnackbarMessage('Можно загрузить не более 9 фотографий.');
//       setSnackbarOpen(true);
//       return;
//     }
//     setPhotos(Array.from(files));
//   };

//   // Отправка формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     for (let i = 0; i < photos.length; i++) {
//       data.append('photos', photos[i]);
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/api/apartments/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSnackbarMessage('Квартира успешно добавлена!');
//       setSnackbarOpen(true);
//       console.log('Отправка события apartmentAdded:', response.data);
//       window.dispatchEvent(new CustomEvent('apartmentAdded', { detail: response.data }));
//     } catch (error) {
//       console.error('Ошибка при добавлении квартиры:', error);
//       setSnackbarMessage('Произошла ошибка, попробуйте еще раз.');
//       setSnackbarOpen(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Закрытие Snackbar
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Предпросмотр объявления
//   const handlePreview = () => {
//     setPreviewOpen(true);
//     setCurrentPhotoIndex(0); // Сброс индекса фото при открытии предпросмотра
//   };

//   // Закрытие предпросмотра
//   const handleClosePreview = () => {
//     setPreviewOpen(false);
//   };

//   // Пролистывание фотографий
//   const handleNextPhoto = () => {
//     setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
//   };

//   const handlePrevPhoto = () => {
//     setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Создайте объявление
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         {/* Категория */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Категория</InputLabel>
//           <Select
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             label="Категория"
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Описание */}
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Описание"
//           multiline
//           rows={4}
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           placeholder="Опишите ваш объект"
//           required
//         />

//         {/* Город */}
//         <Box margin="normal">
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={handleCitySelect}
//             options={{
//               types: ['(cities)'],
//               componentRestrictions: { country: 'ua' },
//             }}
//             placeholder="Введите город"
//             renderInput={(params) => (
//               <TextField 
//                 {...params}
//                 fullWidth
//                 margin="normal"
//                 label="Город"
//                 required
//                 sx={{ width: '100%', // Ширина поля
//                 '& .MuiInputBase-root': {
//                   height: '56px', // Высота поля
//                 }, }}
//               />
//             )}
//           />
//         </Box>

//         {/* Метро (если город Киев, Харьков или Днепр) */}
//         {showMetro && (
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Метро</InputLabel>
//             <Select
//               value={formData.metro}
//               onChange={(e) => setFormData({ ...formData, metro: e.target.value })}
//               label="Метро"
//             >
//               {getMetroStationsForCity().map((station) => (
//                 <MenuItem key={station} value={station}>
//                   {station}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}

//         {/* Улица */}
//         <Box margin="normal">
//           <ToggleButtonGroup
//             value={streetInputMode}
//             exclusive
//             onChange={(e, newMode) => setStreetInputMode(newMode)}
//             sx={{ mb: 2 }}
//           >
//             <ToggleButton value="google">Выбрать улицу из списка</ToggleButton>
//             <ToggleButton value="manual">Ввести улицу вручную</ToggleButton>
//           </ToggleButtonGroup>

//           {streetInputMode === 'google' ? (
//             <Autocomplete
//               apiKey={googleMapsApiKey}
//               onPlaceSelected={handleStreetSelect}
//               options={{
//                 types: ['geocode'],
//                 componentRestrictions: { country: 'ua' },
//                 fields: ['formatted_address', 'geometry'],
//               }}
//               placeholder="Выберите улицу"
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   margin="normal"
//                   label="Улица"
//                   required
//                   sx={{  width: '100%', // Ширина поля
//                   '& .MuiInputBase-root': {
//                     height: '56px', // Высота поля
//                   }, }}
//                 />
//               )}
//             />
//           ) : (
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Улица"
//               value={formData.street}
//               onChange={handleManualStreetInput}
//               required
//               sx={{  width: '100%', // Ширина поля
//               '& .MuiInputBase-root': {
//                 height: '56px', // Высота поля
//               }, }}
//             />
//           )}
//           {streetError && <Typography color="error">{streetError}</Typography>}
//         </Box>

//         {/* Цена */}
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Цена"
//           type="number"
//           value={formData.price}
//           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           required
//           sx={{ width: '20%' }} // Уменьшил ширину поля
//         />

//         {/* Фотографии */}
//         <Box margin="normal">
//           <input
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="photo-upload"
//             type="file"
//             multiple
//             onChange={handlePhotoChange}
//           />
//           <label htmlFor="photo-upload">
//             <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
//               Загрузить фотографии (максимум 9)
//             </Button>
//           </label>
//           {photos.length > 0 && (
//             <Box sx={{ mt: 2 }}>
//               {photos.map((photo, index) => (
//                 <Chip key={index} label={photo.name} onDelete={() => setPhotos(photos.filter((_, i) => i !== index))} />
//               ))}
//             </Box>
//           )}
//         </Box>

//         {/* Карта */}
//         {selectedLocation && (
//           <Box margin="normal" sx={{ height: '400px', width: '100%' }}>
//             <GoogleMap
//               mapContainerStyle={{ width: '100%', height: '100%' }}
//               center={selectedLocation}
//               zoom={12}
//             >
//               <Marker
//                 position={selectedLocation}
//                 draggable={true}
//                 onDragEnd={(e) => {
//                   const newLocation = e.latLng;
//                   setSelectedLocation(newLocation);
//                   setFormData((prevData) => ({
//                     ...prevData,
//                     latitude: newLocation.lat(),
//                     longitude: newLocation.lng(),
//                   }));
//                 }}
//               />
//             </GoogleMap>
//           </Box>
//         )}

//         {/* Кнопки */}
//         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//           <Button
//             variant="contained"
//             onClick={handlePreview}
//             disabled={!formData.city || !formData.street || !formData.description || !formData.price}
//           >
//             Предпросмотр
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
//           </Button>
//         </Box>
//       </Box>

//       {/* Диалог предпросмотра */}
//       <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
//         <DialogTitle>Предпросмотр объявления</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">{formData.category}</Typography>
//           <Typography>{formData.description}</Typography>
//           <Typography>Город: {formData.city}</Typography>
//           <Typography>Улица: {formData.street}</Typography>
//           <Typography>Цена: {formData.price} грн</Typography>
//           {photos.length > 0 && (
//             <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
//               <img
//                 src={URL.createObjectURL(photos[currentPhotoIndex])}
//                 alt={`Фото ${currentPhotoIndex + 1}`}
//                 style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
//               />
//               {photos.length > 1 && (
//                 <>
//                   <IconButton
//                     onClick={handlePrevPhoto}
//                     sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
//                   >
//                     <NavigateBefore />
//                   </IconButton>
//                   <IconButton
//                     onClick={handleNextPhoto}
//                     sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
//                   >
//                     <NavigateNext />
//                   </IconButton>
//                 </>
//               )}
//             </Box>
//           )}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePreview}>Закрыть</Button>
//           <Button onClick={handleSubmit} variant="contained">
//             Опубликовать
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar для уведомлений */}
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AddApartment;












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
    const newPhotos = [...photos, ...files].slice(0, 9); // максимум 9 фото
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
                  width: '90%',
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





