










'use client';

import React, { useState } from 'react';
import Autocomplete from 'react-google-autocomplete';
import FileUploadSlider from '@/app/components/FileUploadSlider';
import { LanguageProvider } from '@/app/LanguageContext';
import MetroSelector from '@/app/components/MetroSelector';
import InfoApartments from '@/app/components/InfoApartments';
import { GoogleMap, Marker } from '@react-google-maps/api';
import PreviewDialog from '@/app/components/PreviewDialog';
import { useEffect } from 'react';

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
  Stack,
} from '@mui/material';
import { PhotoCamera } from '@mui/icons-material';

const AddApartment = () => {
  

  const [uploudImages, setUploudImages] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    district: '',
    metro: '',
    hasMetro: false,
    description: '',
    price: '',
    uploudImages,
    houseNumber: '',
    
  });
  

  const [errors, setErrors] = useState({
    metro: false,
    hasMetro: false,
    description: false,
    district: false,
    city: false,
    // street: false,
    price: false,
  });

  const [photos, setPhotos] = useState([]);
  const [apartmentInfo, setApartmentInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualStreetInput, setShowManualStreetInput] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 }); // Координаты Киева по умолчанию
  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      }));
    }
  }, [selectedLocation]);
  // Константы
  const categories = ['Квартира',  'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
  
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  // Валидация формы
  // const validateForm = () => {
  //   console.log(formData);
  //   const newErrors = {
     
  //     description: !formData.description,
  //     city: !formData.city,
  //     // street: !formData.street,
  //     price: !formData.price,
  //   };
  //   setErrors(newErrors);
  //   return !Object.values(newErrors).some(error => error);
  // };



  const validateForm = () => {
    const newErrors = {
      description: !formData.description,
      city: !formData.city,
      price: !formData.price,
      rooms: !(formData.rooms || apartmentInfo.rooms), // Проверяем в обоих состояниях
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
    const cityComponent = place?.address_components?.find(comp =>
      comp.types.includes('locality')
    );
  
    const city = cityComponent?.long_name || ''; // Название города: "Київ", "Дніпро", "Харків"
  
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
    
    // if (!validateForm()) {
    //   setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
    //   setSnackbarOpen(true);
    //   return;
    // }

    setIsSubmitting(true);

    try {
      // Здесь должна быть ваша логика отправки данных
      console.log('Данные для отправки:', formData);

      console.log('uploudImages', uploudImages);
      const res = await fetch('http://localhost:3000/api/v1/apartments/add', {
        method: 'POST',
        body:JSON.stringify ({...formData, ...apartmentInfo, photos:uploudImages}),
        headers: {
          'Content-Type': 'application/json'
        },
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
    <LanguageProvider>


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
            apiKey={GOOGLE_MAPS_API_KEY}
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


 
{/* Метро: новый компонент */}
<Box sx={{ mb: 2 }}>
  <MetroSelector
    city={formData.city}
    onMetroSelect={(metro) =>
      setFormData((prev) => ({ ...prev, metro }))
    }
  />
</Box>





        {/* Улица с автозаполнением Google */}
        <Box margin="normal">
          {!showManualStreetInput ? (
            <>
              <Autocomplete
                apiKey={GOOGLE_MAPS_API_KEY}
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


  

<Box
  sx={{
    display: 'flex',
    flexDirection: 'column',
    gap: 2, // расстояние между полями
    maxWidth: 200, // ограничим ширину общего блока
    mb: 2, // отступ снизу, чтобы отделить от следующего блока
  }}
>
  <TextField
    fullWidth
    margin="normal"
    name="houseNumber"
    label="Номер дома *"
    value={formData.houseNumber}
    onChange={handleInputChange}
    error={errors.houseNumber}
    helperText={errors.houseNumber ? "Это поле обязательно" : ""}
  />

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
  />
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


{/* Район */}
<TextField
  fullWidth
  margin="normal"
  name="district"
  label="Район"
  placeholder="Укажите район"
  value={formData.district}
  onChange={handleInputChange}
  error={errors.district}
  helperText={errors.district ? "Это поле обязательно" : ""}
  sx={{ maxWidth: 200 }}
/>



<FileUploadSlider setUploudImages = {setUploudImages}/>

<InfoApartments onDataChange={setApartmentInfo} />


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
<PreviewDialog 
  open={previewOpen} 
  onClose={handleClosePreview}
  formData={formData}
  photos={photos}
  uploudImages={uploudImages}
  apartmentInfo={apartmentInfo}
/>

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
    </LanguageProvider>


  );
};

export default AddApartment;



// 'use client';

// import React, { useState, useEffect } from 'react';
// import Autocomplete from 'react-google-autocomplete';
// import FileUploadSlider from '@/app/components/FileUploadSlider';
// import { useLanguage } from '@/app/LanguageContext';
// import MetroSelector from '@/app/components/MetroSelector';
// import InfoApartments from '@/app/components/InfoApartments';
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import PreviewDialog from '@/app/components/PreviewDialog';

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
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Stack,
// } from '@mui/material';

// const AddApartment = () => {
//   const { currentLanguage } = useLanguage();

//   const t = {
//     addTitle: { ru: "Добавить новое объявление", ua: "Додати нове оголошення" },
//     categoryLabel: { ru: "Категория *", ua: "Категорія *" },
//     objectName: { ru: "Название объекта *", ua: "Назва об'єкта *" },
//     objectHelper: { ru: "Например: Гостиница Уют", ua: "Наприклад: Готель Затишок" },
//     description: { ru: "Описание *", ua: "Опис *" },
//     cityPlaceholder: { ru: "Введите город", ua: "Введіть місто" },
//     streetPlaceholder: { ru: "Введите улицу", ua: "Введіть вулицю" },
//     notFoundStreet: { ru: "Не нашли улицу? Введите вручную", ua: "Не знайшли вулицю? Введіть вручну" },
//     houseNumber: { ru: "Номер дома *", ua: "Номер будинку *" },
//     price: { ru: "Цена *", ua: "Ціна *" },
//     district: { ru: "Район", ua: "Район" },
//     preview: { ru: "Предпросмотр", ua: "Попередній перегляд" },
//     addButton: { ru: "Добавить", ua: "Додати" },
//     requiredField: { ru: "Это поле обязательно", ua: "Це поле обов'язкове" },
//     successMessage: { ru: "Объявление успешно добавлено!", ua: "Оголошення успішно додано!" },
//     errorMessage: { ru: "Произошла ошибка при добавлении объявления", ua: "Сталася помилка під час додавання оголошення" },
//     previewError: { ru: "Пожалуйста, заполните все обязательные поля", ua: "Будь ласка, заповніть усі обов'язкові поля" },
//   };

//   const [uploudImages, setUploudImages] = useState([]);
//   const [formData, setFormData] = useState({
//     city: '',
//     district: '',
//     metro: '',
//     hasMetro: false,
//     description: '',
//     price: '',
//     uploudImages,
//     houseNumber: '',
//   });

//   const [errors, setErrors] = useState({});
//   const [photos, setPhotos] = useState([]);
//   const [apartmentInfo, setApartmentInfo] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showManualStreetInput, setShowManualStreetInput] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });

//   useEffect(() => {
//     if (selectedLocation) {
//       setFormData((prev) => ({
//         ...prev,
//         latitude: selectedLocation.lat,
//         longitude: selectedLocation.lng,
//       }));
//     }
//   }, [selectedLocation]);

//   const categories = ['Квартира', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const validateForm = () => {
//     const newErrors = {
//       description: !formData.description,
//       city: !formData.city,
//       price: !formData.price,
//       rooms: !(formData.rooms || apartmentInfo.rooms),
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: false }));
//   };

//   const handleCitySelect = (place) => {
//     const cityComponent = place?.address_components?.find(comp =>
//       comp.types.includes('locality')
//     );
//     const city = cityComponent?.long_name || '';
//     setFormData(prev => ({ ...prev, city }));
//     setErrors(prev => ({ ...prev, city: false }));

//     if (place?.geometry?.location) {
//       const location = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       };
//       setSelectedLocation(location);
//       setMapCenter(location);
//     }
//   };

//   const handleStreetSelect = (place) => {
//     const street = place?.formatted_address?.split(',')[0] || '';
//     setFormData(prev => ({ ...prev, street }));
//     setErrors(prev => ({ ...prev, street: false }));

//     if (place?.geometry?.location) {
//       const location = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       };
//       setSelectedLocation(location);
//       setMapCenter(location);
//     }
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);
//     try {
//       const res = await fetch('http://localhost:3000/api/v1/apartments/add', {
//         method: 'POST',
//         body: JSON.stringify({ ...formData, ...apartmentInfo, photos: uploudImages }),
//         headers: { 'Content-Type': 'application/json' },
//       });
//       setSnackbarMessage(t.successMessage[currentLanguage]);
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Ошибка:', error);
//       setSnackbarMessage(t.errorMessage[currentLanguage]);
//       setSnackbarOpen(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePreview = () => {
//     if (!validateForm()) {
//       setSnackbarMessage(t.previewError[currentLanguage]);
//       setSnackbarOpen(true);
//       return;
//     }
//     setPreviewOpen(true);
//   };

//   const handleClosePreview = (shouldEdit) => {
//     setPreviewOpen(false);
//     if (!shouldEdit) {
//       handleSubmit({ preventDefault: () => {} });
//     }
//   };

//   return (
    
//       <Container maxWidth="md" sx={{ py: 4 }}>
//         <Typography variant="h4" align="center" gutterBottom>
//           {t.addTitle[currentLanguage]}
//         </Typography>

//         <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//           <FormControl fullWidth margin="normal" error={errors.category}>
//             <InputLabel>{t.categoryLabel[currentLanguage]}</InputLabel>
//             <Select
//               name="category"
//               value={formData.category}
//               onChange={handleInputChange}
//               label={t.categoryLabel[currentLanguage]}
//             >
//               {categories.map((cat) => (
//                 <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//               ))}
//             </Select>
//             {errors.category && (
//               <Typography variant="caption" color="error">
//                 {t.requiredField[currentLanguage]}
//               </Typography>
//             )}
//           </FormControl>

//           <TextField
//             fullWidth
//             margin="normal"
//             name="objectName"
//             label={t.objectName[currentLanguage]}
//             value={formData.objectName}
//             onChange={handleInputChange}
//             error={errors.objectName}
//             helperText={
//               errors.objectName
//                 ? t.requiredField[currentLanguage]
//                 : t.objectHelper[currentLanguage]
//             }
//           />

//           <TextField
//             fullWidth
//             margin="normal"
//             name="description"
//             label={t.description[currentLanguage]}
//             multiline
//             rows={4}
//             value={formData.description}
//             onChange={handleInputChange}
//             error={errors.description}
//             helperText={errors.description ? t.requiredField[currentLanguage] : ""}
//           />

//           <Box margin="normal">
//             <Autocomplete
//               apiKey={GOOGLE_MAPS_API_KEY}
//               onPlaceSelected={handleCitySelect}
//               options={{
//                 types: ['(cities)'],
//                 componentRestrictions: { country: 'ua' },
//               }}
//               defaultValue={formData.city}
//               placeholder={t.cityPlaceholder[currentLanguage]}
//               style={{
//                 width: '100%',
//                 padding: '16.5px 14px',
//                 fontSize: '1rem',
//                 borderRadius: '4px',
//                 border: errors.city ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
//                 outline: 'none',
//                 fontFamily: 'inherit',
//                 marginBottom: '15px',
//                 marginTop: '10px',
//                 maxWidth: '100%',
//                 boxSizing: 'border-box',
//               }}
//             />
//             {errors.city && (
//               <Typography variant="caption" color="error" sx={{ mt: 1 }}>
//                 {t.requiredField[currentLanguage]}
//               </Typography>
//             )}
//           </Box>

//           <Box sx={{ mb: 2 }}>
//             <MetroSelector
//               city={formData.city}
//               onMetroSelect={(metro) => setFormData((prev) => ({ ...prev, metro }))}
//             />
//           </Box>

//           <Box margin="normal">
//             {!showManualStreetInput ? (
//               <>
//                 <Autocomplete
//                   apiKey={GOOGLE_MAPS_API_KEY}
//                   onPlaceSelected={handleStreetSelect}
//                   options={{
//                     types: ['address'],
//                     componentRestrictions: { country: 'ua' },
//                   }}
//                   defaultValue={formData.street}
//                   placeholder={t.streetPlaceholder[currentLanguage]}
//                   style={{
//                     width: '100%',
//                     padding: '16.5px 14px',
//                     fontSize: '1rem',
//                     borderRadius: '4px',
//                     border: errors.street ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
//                     outline: 'none',
//                     fontFamily: 'inherit',
//                     boxSizing: 'border-box',
//                   }}
//                 />
//                 <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
//                   <Button
//                     variant="text"
//                     size="small"
//                     sx={{
//                       textTransform: 'none',
//                       color: '#1976d2',
//                       '&:hover': {
//                         backgroundColor: 'transparent',
//                         textDecoration: 'underline',
//                       },
//                     }}
//                     onClick={() => setShowManualStreetInput(true)}
//                   >
//                     {t.notFoundStreet[currentLanguage]}
//                   </Button>
//                 </Box>
//               </>
//             ) : (
//               <TextField
//                 fullWidth
//                 label={t.streetPlaceholder[currentLanguage]}
//                 name="street"
//                 value={formData.street}
//                 onChange={handleInputChange}
//               />
//             )}
//           </Box>

//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
//             <TextField
//               fullWidth
//               margin="normal"
//               name="houseNumber"
//               label={t.houseNumber[currentLanguage]}
//               value={formData.houseNumber}
//               onChange={handleInputChange}
//               error={errors.houseNumber}
//               helperText={errors.houseNumber ? t.requiredField[currentLanguage] : ""}
//             />
//             <TextField
//               fullWidth
//               margin="normal"
//               name="price"
//               label={t.price[currentLanguage]}
//               type="number"
//               value={formData.price}
//               onChange={handleInputChange}
//               error={errors.price}
//               helperText={errors.price ? t.requiredField[currentLanguage] : ""}
//             />
//           </Box>

//           {selectedLocation && (
//             <Box margin="normal" sx={{ height: '300px', width: '100%', mt: 2 }}>
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={mapCenter}
//                 zoom={15}
//               >
//                 <Marker
//                   position={selectedLocation}
//                   draggable={true}
//                   onDragEnd={(e) => {
//                     const newLocation = {
//                       lat: e.latLng.lat(),
//                       lng: e.latLng.lng(),
//                     };
//                     setSelectedLocation(newLocation);
//                   }}
//                 />
//               </GoogleMap>
//             </Box>
//           )}

//           <TextField
//             fullWidth
//             margin="normal"
//             name="district"
//             label={t.district[currentLanguage]}
//             placeholder={t.district[currentLanguage]}
//             value={formData.district}
//             onChange={handleInputChange}
//           />

//           <FileUploadSlider setUploudImages={setUploudImages} />
//           <InfoApartments onDataChange={setApartmentInfo} />

//           <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
//             <Button variant="outlined" size="large" onClick={handlePreview}>
//               {t.preview[currentLanguage]}
//             </Button>
//             <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
//               {isSubmitting ? <CircularProgress size={24} /> : t.addButton[currentLanguage]}
//             </Button>
//           </Stack>
//         </Box>

//         <PreviewDialog
//           open={previewOpen}
//           onClose={handleClosePreview}
//           formData={formData}
//           photos={photos}
//           uploudImages={uploudImages}
//           apartmentInfo={apartmentInfo}
//         />

//         <Snackbar
//           open={snackbarOpen}
//           autoHideDuration={6000}
//           onClose={() => setSnackbarOpen(false)}
//         >
//           <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//             {snackbarMessage}
//           </Alert>
//         </Snackbar>
//       </Container>
    
//   );
// };

// export default AddApartment;
