










// 'use client';

// import React, { useState } from 'react';
// import Autocomplete from 'react-google-autocomplete';
// import FileUploadSlider from '@/app/components/FileUploadSlider';
// import { LanguageProvider } from '@/app/LanguageContext';
// import MetroSelector from '@/app/components/MetroSelector';
// import InfoApartments from '@/app/components/InfoApartments';
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import PreviewDialog from '@/app/components/PreviewDialog';
// import { useEffect } from 'react';

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
//   Stack,
// } from '@mui/material';
// import { PhotoCamera } from '@mui/icons-material';

// const AddApartment = () => {
  

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
  

//   const [errors, setErrors] = useState({
//     metro: false,
//     hasMetro: false,
//     description: false,
//     district: false,
//     city: false,
//     // street: false,
//     price: false,
//   });

//   const [photos, setPhotos] = useState([]);
//   const [apartmentInfo, setApartmentInfo] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showManualStreetInput, setShowManualStreetInput] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 }); // Координаты Киева по умолчанию
//   useEffect(() => {
//     if (selectedLocation) {
//       setFormData((prev) => ({
//         ...prev,
//         latitude: selectedLocation.lat,
//         longitude: selectedLocation.lng,
//       }));
//     }
//   }, [selectedLocation]);
//   // Константы
//   const categories = ['Квартира',  'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
  
//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   // Валидация формы
//   // const validateForm = () => {
//   //   console.log(formData);
//   //   const newErrors = {
     
//   //     description: !formData.description,
//   //     city: !formData.city,
//   //     // street: !formData.street,
//   //     price: !formData.price,
//   //   };
//   //   setErrors(newErrors);
//   //   return !Object.values(newErrors).some(error => error);
//   // };



//   const validateForm = () => {
//     const newErrors = {
//       description: !formData.description,
//       city: !formData.city,
//       price: !formData.price,
//       rooms: !(formData.rooms || apartmentInfo.rooms), // Проверяем в обоих состояниях
//     };
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(error => error);
//   };

//   // Обработчики событий
//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: false }));
//   };

//   const handleCitySelect = (place) => {
//     const cityComponent = place?.address_components?.find(comp =>
//       comp.types.includes('locality')
//     );
  
//     const city = cityComponent?.long_name || ''; // Название города: "Київ", "Дніпро", "Харків"
  
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

  

//   // Расширим handlePhotoChange, чтобы поддерживать добавление и обновление фотографий:
//   const handlePhotoChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newPhotos = [...photos, ...files].slice(0, 15); // максимум 15 фото
//     setPhotos(newPhotos);
//   };
//   // Добавим функцию удаления:
//   const handleRemovePhoto = (index) => {
//     const updatedPhotos = [...photos];
//     updatedPhotos.splice(index, 1);
//     setPhotos(updatedPhotos);
//   };
  

//   const handleSubmit = async (e) => {
//     e.preventDefault();
    
//     // if (!validateForm()) {
//     //   setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
//     //   setSnackbarOpen(true);
//     //   return;
//     // }

//     setIsSubmitting(true);

//     try {
//       // Здесь должна быть ваша логика отправки данных
//       console.log('Данные для отправки:', formData);

//       console.log('uploudImages', uploudImages);
//       const res = await fetch('http://localhost:3000/api/v1/apartments/add', {
//         method: 'POST',
//         body:JSON.stringify ({...formData, ...apartmentInfo, photos:uploudImages}),
//         headers: {
//           'Content-Type': 'application/json'
//         },
//       });

//       // const data = await res.json();
//       JSON.stringify (formData);
      
//       setSnackbarMessage('Объявление успешно добавлено!');
//       setSnackbarOpen(true);
//     } catch (error) {
//       console.error('Ошибка:', error);
//       setSnackbarMessage('Произошла ошибка при добавлении объявления');
//       setSnackbarOpen(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   const handlePreview = () => {
//     if (!validateForm()) {
//       setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
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
//     <LanguageProvider>


//     <Container maxWidth="md" sx={{ py: 4 }}>
//       <Typography variant="h4" align="center" gutterBottom>
//         Добавить новое объявление
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         {/* Категория */}
//         <FormControl fullWidth margin="normal" error={errors.category}>
//           <InputLabel>Категория *</InputLabel>
//           <Select
//             name="category"
//             value={formData.category}
//             onChange={handleInputChange}
//             label="Категория *"
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//             ))}
//           </Select>
//           {errors.category && <Typography variant="caption" color="error">Это поле обязательно</Typography>}
//         </FormControl>

//         {/* Название объекта */}
//         <TextField
//           fullWidth
//           margin="normal"
//           name="objectName"
//           label="Название объекта *"
//           value={formData.objectName}
//           onChange={handleInputChange}
//           error={errors.objectName}
//           helperText={errors.objectName ? "Это поле обязательно" : "Например: Гостиница Уют"}
//         />

//         {/* Описание */}
//         <TextField
//           fullWidth
//           margin="normal"
//           name="description"
//           label="Описание *"
//           multiline
//           rows={4}
//           value={formData.description}
//           onChange={handleInputChange}
//           error={errors.description}
//           helperText={errors.description ? "Это поле обязательно" : ""}
//         />

//         {/* Город с автозаполнением Google */}
//         <Box margin="normal">
//           <Autocomplete
//             apiKey={GOOGLE_MAPS_API_KEY}
//             onPlaceSelected={handleCitySelect}
//             options={{
//               types: ['(cities)'],
//               componentRestrictions: { country: 'ua' },
//             }}
//             defaultValue={formData.city}
//             placeholder="Введите город"
//             style={{
//               width: '100%',
//               padding: '16.5px 14px',
//               fontSize: '1rem',
//               borderRadius: '4px',
//               border: errors.city ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
//               outline: 'none',
//               fontFamily: 'inherit',
//               marginBottom:'15px',
//               marginTop: '10px',
//               maxWidth: '100%',
//              boxSizing:'border-box',
//             }}
//           />
//           {errors.city && <Typography variant="caption" color="error" sx={{ mt: 1 }}>Это поле обязательно</Typography>}
//         </Box>


 
// {/* Метро: новый компонент */}
// <Box sx={{ mb: 2 }}>
//   <MetroSelector
//     city={formData.city}
//     onMetroSelect={(metro) =>
//       setFormData((prev) => ({ ...prev, metro }))
//     }
//   />
// </Box>





//         {/* Улица с автозаполнением Google */}
//         <Box margin="normal">
//           {!showManualStreetInput ? (
//             <>
//               <Autocomplete
//                 apiKey={GOOGLE_MAPS_API_KEY}
//                 onPlaceSelected={handleStreetSelect}
//                 options={{
//                   types: ['address'],
//                   componentRestrictions: { country: 'ua' },
//                 }}
//                 defaultValue={formData.street}
//                 placeholder="Введите улицу"
//                 style={{
//                   width: '100%',
//                   maxWidth: '100%',
//                   boxSizing:'border-box',
//                   padding: '16.5px 14px',
//                   fontSize: '1rem',
//                   borderRadius: '4px',
//                   border: errors.street ? '1px solid #d32f2f' : '1px solid rgba(0, 0, 0, 0.23)',
//                   outline: 'none',
//                   fontFamily: 'inherit',
//                 }}
//               />
//               <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
//                 <Button 
//                   variant="text" 
//                   size="small" 
//                   sx={{ 
//                     textTransform: 'none',
//                     color: '#1976d2',
//                     '&:hover': {
//                       backgroundColor: 'transparent',
//                       textDecoration: 'underline',
//                     }
//                   }}
//                   onClick={() => setShowManualStreetInput(true)}
//                 >
//                   Не нашли улицу? Введите вручную
//                 </Button>
//               </Box>
//               {errors.street && <Typography variant="caption" color="error" sx={{ mt: 1 }}>Это поле обязательно</Typography>}
//             </>
//           ) : (
//             <TextField
//               fullWidth
//               label="Улица *"
//               name="street"
//               value={formData.street}
//               onChange={handleInputChange}
//               error={errors.street}
//               helperText={errors.street ? "Это поле обязательно" : ""}
//             />
//           )}
//         </Box>


  

// <Box
//   sx={{
//     display: 'flex',
//     flexDirection: 'column',
//     gap: 2, // расстояние между полями
//     maxWidth: 200, // ограничим ширину общего блока
//     mb: 2, // отступ снизу, чтобы отделить от следующего блока
//   }}
// >
//   <TextField
//     fullWidth
//     margin="normal"
//     name="houseNumber"
//     label="Номер дома *"
//     value={formData.houseNumber}
//     onChange={handleInputChange}
//     error={errors.houseNumber}
//     helperText={errors.houseNumber ? "Это поле обязательно" : ""}
//   />

//   <TextField
//     fullWidth
//     margin="normal"
//     name="price"
//     label="Цена *"
//     type="number"
//     value={formData.price}
//     onChange={handleInputChange}
//     error={errors.price}
//     helperText={errors.price ? "Это поле обязательно" : ""}
//   />
// </Box>




//         {/* Карта */}
//         {selectedLocation && (
//           <Box margin="normal" sx={{ height: '300px', width: '100%', mt: 2 }}>
//             <GoogleMap
//               mapContainerStyle={{ width: '100%', height: '100%' }}
//               center={mapCenter}
//               zoom={15}
//             >
//               <Marker
//                 position={selectedLocation}
//                 draggable={true}
//                 onDragEnd={(e) => {
//                   const newLocation = {
//                     lat: e.latLng.lat(),
//                     lng: e.latLng.lng(),
//                   };
//                   setSelectedLocation(newLocation);
//                 }}
//               />
//             </GoogleMap>
//           </Box>
//         )}


// {/* Район */}
// <TextField
//   fullWidth
//   margin="normal"
//   name="district"
//   label="Район"
//   placeholder="Укажите район"
//   value={formData.district}
//   onChange={handleInputChange}
//   error={errors.district}
//   helperText={errors.district ? "Это поле обязательно" : ""}
//   sx={{ maxWidth: 200 }}
// />



// <FileUploadSlider setUploudImages = {setUploudImages}/>

// <InfoApartments onDataChange={setApartmentInfo} />


//         {/* Кнопки */}
//         <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
//           <Button
//             variant="outlined"
//             size="large"
//             onClick={handlePreview}
//           >
//             Предпросмотр
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             size="large"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
//           </Button>
//         </Stack>
//       </Box>

      
//       {/* Диалог предпросмотра */}
// <PreviewDialog 
//   open={previewOpen} 
//   onClose={handleClosePreview}
//   formData={formData}
//   photos={photos}
//   uploudImages={uploudImages}
//   apartmentInfo={apartmentInfo}
// />

//       {/* Уведомление */}
//       <Snackbar
//         open={snackbarOpen}
//         autoHideDuration={6000}
//         onClose={() => setSnackbarOpen(false)}
//       >
//         <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
      
//     </Container>
//     </LanguageProvider>


//   );
// };

// export default AddApartment;



'use client';

import React, { useState, useEffect, useRef } from 'react';
import FileUploadSlider from '@/app/components/FileUploadSlider';
import { LanguageProvider } from '@/app/LanguageContext';
import MetroSelector from '@/app/components/MetroSelector';
import InfoApartments from '@/app/components/InfoApartments';
import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
import PreviewDialog from '@/app/components/PreviewDialog';
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
  CircularProgress,
  Snackbar,
  Alert,
  Stack,
} from '@mui/material';

const AddApartment = () => {
  const [uploudImages, setUploudImages] = useState([]);
  const [formData, setFormData] = useState({
    city: '',
    street: '',
    district: '',
    metro: '',
    hasMetro: false,
    description: '',
    price: '',
    uploudImages,
    houseNumber: '',
  });

  const cityAutocompleteRef = useRef(null);
  const streetAutocompleteRef = useRef(null);
  const cityInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const [errors, setErrors] = useState({});
  const [photos, setPhotos] = useState([]);
  const [apartmentInfo, setApartmentInfo] = useState({});
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showManualStreetInput, setShowManualStreetInput] = useState(false);
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
  const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);

  useEffect(() => {
    if (typeof window !== 'undefined' && window.google) {
      initAutocomplete();
    }
  }, [isGoogleMapsLoaded]);

  const initAutocomplete = () => {
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

    if (streetInputRef.current && !streetAutocompleteRef.current && !showManualStreetInput) {
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

  useEffect(() => {
    if (selectedLocation) {
      setFormData((prev) => ({
        ...prev,
        latitude: selectedLocation.lat,
        longitude: selectedLocation.lng,
      }));
    }
  }, [selectedLocation]);

  const categories = ['Квартира', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const validateForm = () => {
    const newErrors = {
      description: !formData.description,
      city: !formData.city,
      price: !formData.price,
      street: !formData.street,
      houseNumber: !formData.houseNumber,
    };
    setErrors(newErrors);
    return !Object.values(newErrors).some((error) => error);
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({ ...prev, [name]: value }));
    setErrors((prev) => ({ ...prev, [name]: false }));
  };

  const handleCitySelect = (place) => {
    const cityComponent = place?.address_components?.find((comp) =>
      comp.types.includes('locality')
    );
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
    if (street.includes(',')) {
      street = street.split(',')[0];
    }
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
    if (!validateForm()) {
      setSnackbarMessage('Пожалуйста, заполните все обязательные поля');
      setSnackbarOpen(true);
      return;
    }
    setIsSubmitting(true);
    try {
      const res = await fetch('http://localhost:3000/api/v1/apartments/add', {
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
            <FormControl fullWidth margin="normal" error={errors.category}>
              <InputLabel>Категория *</InputLabel>
              <Select
                name="category"
                value={formData.category || ''}
                onChange={handleInputChange}
                label="Категория *"
              >
                {categories.map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>

            <TextField
              fullWidth margin="normal" name="objectName"
              label="Название объекта *" value={formData.objectName || ''}
              onChange={handleInputChange} error={errors.objectName}
              helperText={errors.objectName ? "Это поле обязательно" : "Например: Гостиница Уют"}
            />

            <TextField
              fullWidth margin="normal" name="description"
              label="Описание *" multiline rows={4}
              value={formData.description} onChange={handleInputChange}
              error={errors.description} helperText={errors.description ? "Это поле обязательно" : ""}
            />

            {/* Город */}
            <Box margin="normal" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                inputRef={cityInputRef}
                label="Город *"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({...prev, city: e.target.value}))}
                error={errors.city}
                helperText={errors.city ? "Это поле обязательно" : ""}
                placeholder="Введите город"
              />
            </Box>

            <MetroSelector city={formData.city} onMetroSelect={(metro) => setFormData((prev) => ({ ...prev, metro }))} />

            {/* Улица */}
            <Box margin="normal" sx={{ mt: 3 }}>
              {!showManualStreetInput ? (
                <>
                  <TextField
                    fullWidth
                    inputRef={streetInputRef}
                    label="Улица *"
                    value={formData.street}
                    onChange={(e) => setFormData(prev => ({...prev, street: e.target.value}))}
                    error={errors.street}
                    helperText={errors.street ? "Это поле обязательно" : ""}
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
                          textDecoration: 'underline' 
                        } 
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
                  helperText={errors.street ? "Это поле обязательно" : ""} 
                />
              )}
            </Box>

            {/* Дом и Цена */}
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

            <TextField fullWidth margin="normal" name="district" label="Район" placeholder="Укажите район" value={formData.district} onChange={handleInputChange} error={errors.district} helperText={errors.district ? "Это поле обязательно" : ""} sx={{ maxWidth: 200 }} />

            <FileUploadSlider setUploudImages={setUploudImages} />
            <InfoApartments onDataChange={setApartmentInfo} />

            <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
              <Button variant="outlined" size="large" onClick={handlePreview}>Предпросмотр</Button>
              <Button type="submit" variant="contained" size="large" disabled={isSubmitting}>
                {isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
              </Button>
            </Stack>
          </Box>

          <PreviewDialog open={previewOpen} onClose={handleClosePreview} formData={formData} photos={photos} uploudImages={uploudImages} apartmentInfo={apartmentInfo} />

          <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
            <Alert onClose={() => setSnackbarOpen(false)} severity="success">{snackbarMessage}</Alert>
          </Snackbar>
        </Container>
      </LoadScript>
    </LanguageProvider>
  );
};

export default AddApartment;