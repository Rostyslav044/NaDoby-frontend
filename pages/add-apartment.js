

// Этот компонент отвечает за успешное создание объявления об аренде жилья. 
// После отправки формы он получает ответ от сервера с данными о добавленном
//  объявлении и выводит сообщение

// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import FileUploadSlider from '@/app/components/FileUploadSlider';
// import { LanguageProvider } from '@/app/LanguageContext';
// import MetroSelector from '@/app/components/MetroSelector';
// import InfoApartments from '@/app/components/InfoApartments';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
// import PreviewDialog from '@/app/components/PreviewDialog';
// import {
//   Container, Typography, TextField, Select, MenuItem, Button,
//   FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack
// } from '@mui/material';

// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// const AddApartment = () => {
//   // const [uploudImages, setUploudImages] = useState([]);
//   const [uploadImages, setUploadImages] = useState([]);

//   const [formData, setFormData] = useState({
//     city: '', street: '', district: '', metro: '', hasMetro: false,
//     description: '', price: '', uploudImages: [], houseNumber: '',
//     category: '', objectName: '', latitude: null, longitude: null
//   });

//   const infoRef = useRef();
//   const cityAutocompleteRef = useRef(null);
//   const streetAutocompleteRef = useRef(null);
//   const cityInputRef = useRef(null);
//   const streetInputRef = useRef(null);
//   const geocoderRef = useRef(null);

//   const [errors, setErrors] = useState({});
//   const [apartmentInfo, setApartmentInfo] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showManualStreetInput, setShowManualStreetInput] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
//   const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
  
//   const [photoError, setPhotoError] = useState(false);
//   const [showPhotoError, setShowPhotoError] = useState(false);
  
  
  


//   useEffect(() => {
//     if (uploadImages.length >= 3) setPhotoError(false);
//   }, [uploadImages]);
  

//   useEffect(() => {
//     const timer = setTimeout(() => {
//       updateLocation();
//     }, 500); // Дебаунс 500ms
//     return () => clearTimeout(timer);
//   }, [formData.street, formData.houseNumber, formData.city]);

//   useEffect(() => {
//     if (typeof window !== 'undefined' && window.google) {
//       initAutocomplete();
//       geocoderRef.current = new window.google.maps.Geocoder();
//     }
//   }, [isGoogleMapsLoaded]);

//   const initAutocomplete = () => {
//     if (cityInputRef.current && !cityAutocompleteRef.current) {
//       cityAutocompleteRef.current = new window.google.maps.places.Autocomplete(
//         cityInputRef.current, { types: ['(cities)'], componentRestrictions: { country: 'ua' } }
//       );
//       cityAutocompleteRef.current.addListener('place_changed', () => {
//         const place = cityAutocompleteRef.current.getPlace();
//         handleCitySelect(place);
//       });
//     }

//     if (streetInputRef.current && !streetAutocompleteRef.current && !showManualStreetInput) {
//       streetAutocompleteRef.current = new window.google.maps.places.Autocomplete(
//         streetInputRef.current, { types: ['address'], componentRestrictions: { country: 'ua' } }
//       );
//       streetAutocompleteRef.current.addListener('place_changed', () => {
//         const place = streetAutocompleteRef.current.getPlace();
//         handleStreetSelect(place);
//       });
//     }
//   };

//   const geocodeAddress = (address) => {
//     if (!geocoderRef.current) return;

//     geocoderRef.current.geocode({ address }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         const location = results[0].geometry.location;
//         const newLocation = {
//           lat: location.lat(),
//           lng: location.lng()
//         };
//         setSelectedLocation(newLocation);
//         setMapCenter(newLocation);
//         setFormData(prev => ({
//           ...prev,
//           latitude: newLocation.lat,
//           longitude: newLocation.lng
//         }));
//       }
//     });
//   };

//   const updateLocation = () => {
//     if (formData.city && formData.street && formData.houseNumber) {
//       const fullAddress = `${formData.street}, ${formData.houseNumber}, ${formData.city}`;
//       geocodeAddress(fullAddress);
//     }
//   };

//   useEffect(() => {
//     updateLocation();
//   }, [formData.street, formData.houseNumber, formData.city]);

//   const handleCitySelect = (place) => {
//     const cityComponent = place?.address_components?.find((comp) => comp.types.includes('locality'));
//     const city = cityComponent?.long_name || place?.name || '';
    
//     const hasMetro = CITIES_WITH_METRO.some(c => c.toLowerCase() === city.toLowerCase());
    
//     setFormData(prev => ({ 
//       ...prev, 
//       city,
//       metro: '',
//       hasMetro
//     }));
    
//     setErrors(prev => ({ ...prev, city: false }));
//     setErrors(prev => ({ ...prev, metro: false })); // Добавьте эту строку
//     if (place?.geometry?.location) {
//       const location = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       };
//       setSelectedLocation(location);
//       setMapCenter(location);
//       setFormData(prev => ({
//         ...prev,
//         latitude: location.lat,
//         longitude: location.lng
//       }));
//     }
//   };

//   const handleStreetSelect = (place) => {
//     let street = place?.formatted_address || '';
//     if (street.includes(',')) street = street.split(',')[0];
    
//     setFormData(prev => ({ 
//       ...prev, 
//       street
//     }));
    
//     setErrors(prev => ({ ...prev, street: false }));

//     if (formData.houseNumber && place?.geometry?.location) {
//       const location = {
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       };
//       setSelectedLocation(location);
//       setMapCenter(location);
//       setFormData(prev => ({
//         ...prev,
//         latitude: location.lat,
//         longitude: location.lng
//       }));
//     }
//   };

//   const handleHouseNumberChange = (e) => {
//     const houseNumber = e.target.value;
//     setFormData(prev => ({ ...prev, houseNumber }));
//     setErrors(prev => ({ ...prev, houseNumber: false }));
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: false }));
//   };

 

 

//   const handleMetroSelect = (metro) => {
//     setFormData(prev => ({ ...prev, metro }));
//     // Сбрасываем ошибку метро при выборе станции
//     setErrors(prev => ({ ...prev, metro: false }));
//   };


//   // const validateForm = () => {
//   //   const descriptionTooShort = formData.description.length < 85;
//   //   const forbiddenPattern = /[@]|https?:\/\/|www\./i;
    
//   //   // Проверяем, есть ли в выбранном городе метро (с учетом регистра)
//   //   const cityHasMetro = formData.city 
//   //     ? CITIES_WITH_METRO.some(c => 
//   //         c.toLowerCase() === formData.city.toLowerCase()
//   //       )
//   //     : false;
  
//   //   // Создаем объект ошибок
//   //   const newErrors = {
//   //     category: !formData.category,
//   //     objectName: !formData.objectName || 
//   //                forbiddenPattern.test(formData.objectName) || 
//   //                formData.objectName.length > 59,
//   //     description: !formData.description || 
//   //                 forbiddenPattern.test(formData.description) || 
//   //                 descriptionTooShort,
//   //     city: !formData.city,
//   //     price: !formData.price,
//   //     street: !formData.street,
//   //     houseNumber: !formData.houseNumber,
//   //     district: !formData.district,
//   //     // Ошибка метро только для городов с метро и если поле пустое
//   //     metro: cityHasMetro ? !formData.metro : false,
//   //   };
  
//   //   // Устанавливаем ошибки
//   //   setErrors(newErrors);
    
//   //   // Возвращаем true если нет ошибок
//   //   return !Object.values(newErrors).some(Boolean);
//   // };

//   const validateForm = () => {
//     const descriptionTooShort = formData.description.length < 85;
//     const forbiddenPattern = /[@]|https?:\/\/|www\./i;
    
//     // Проверяем, есть ли в выбранном городе метро
//     const cityHasMetro = formData.city 
//       ? CITIES_WITH_METRO.some(c => 
//           c.toLowerCase() === formData.city.toLowerCase()
//         )
//       : false;
  
//     const newErrors = {
//       category: !formData.category,
//       objectName: !formData.objectName || 
//                  forbiddenPattern.test(formData.objectName) || 
//                  formData.objectName.length > 59,
//       description: !formData.description || 
//                   forbiddenPattern.test(formData.description) || 
//                   descriptionTooShort,
//       city: !formData.city,
//       price: !formData.price,
//       street: !formData.street,
//       houseNumber: !formData.houseNumber,
//       district: !formData.district,
//       metro: cityHasMetro && !formData.metro,
//     };
  
//     setErrors(newErrors);
//     return !Object.values(newErrors).some(Boolean);
//   };

//   // const handleSubmit = async (e) => {
//   //   e.preventDefault();

//   //   const isFormValid = validateForm();
//   //   const isInfoValid = infoRef.current?.validate();
//   //   // const hasEnoughPhotos = uploudImages.length >= 3;
//   //   const hasEnoughPhotos = uploadImages.length >= 3;

//   //   setPhotoError(!hasEnoughPhotos);

//   //   if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
//   //     setSnackbarMessage('Для подачи объявления нужно заполнить все поля!');
//   //     setSnackbarOpen(true);
//   //     return;
//   //   }

//   //   setIsSubmitting(true);
//   //   try {
//   //     await fetch('http://localhost:3000/api/v1/apartments/add', {
//   //       method: 'POST',
//   //       body: JSON.stringify({ ...formData, ...apartmentInfo, photos: uploadImages }),
//   //       headers: { 'Content-Type': 'application/json' },
//   //     });
//   //     setSnackbarMessage('Объявление успешно добавлено!');
//   //   } catch (error) {
//   //     console.error('Ошибка:', error);
//   //     setSnackbarMessage('Произошла ошибка при добавлении объявления');
//   //   } finally {
//   //     setIsSubmitting(false);
//   //     setSnackbarOpen(true);
//   //   }
//   // };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
  
//     // Проверка фото (ваша новая проверка)
//     if (uploadImages.length < 3) {
//       setPhotoError(true);
//       setShowPhotoError(true);
//       setSnackbarMessage('Загрузите минимум 3 фотографии!');
//       setSnackbarOpen(true);
//       return;
//     }
  
//     // Валидация формы (из вашего оригинального кода)
//     const isFormValid = validateForm();
//     const isInfoValid = infoRef.current?.validate();
  
//     if (!isFormValid || !isInfoValid) {
//       setSnackbarMessage('Заполните все обязательные поля!');
//       setSnackbarOpen(true);
//       return;
//     }
  
//     // Отправка данных
//     setIsSubmitting(true);
//     try {
//       const response = await fetch('http://localhost:3000/api/v1/apartments/add', {
//         method: 'POST',
//         body: JSON.stringify({ 
//           ...formData, 
//           ...apartmentInfo, 
//           photos: uploadImages 
//         }),
//         headers: { 'Content-Type': 'application/json' },
//       });
  
//       if (!response.ok) throw new Error('Ошибка сервера');
      
//       setSnackbarMessage('Объявление успешно добавлено!');
//       // Здесь можно добавить сброс формы, если нужно
//     } catch (error) {
//       console.error('Ошибка:', error);
//       setSnackbarMessage(error.message || 'Произошла ошибка при добавлении');
//     } finally {
//       setIsSubmitting(false);
//       setSnackbarOpen(true);
//     }
//   };




//   // const handlePreview = () => {
//   //   const isFormValid = validateForm();
//   //   const isInfoValid = infoRef.current?.validate();
//   //   const hasEnoughPhotos = uploadImages.length >= 3;

    
//   //   setPhotoError(!hasEnoughPhotos);
    
//   //   if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
//   //     setSnackbarMessage('Пожалуйста, заполните все обязательные поля!');
//   //     setSnackbarOpen(true);
//   //     return;
//   //   }
//   //   setPreviewOpen(true);
//   // };


//   const handlePreview = () => {
//     const isFormValid = validateForm();
//     const isInfoValid = infoRef.current?.validate();
//     const hasEnoughPhotos = uploadImages.length >= 3;
  
//     setPhotoError(!hasEnoughPhotos);
//     setShowPhotoError(!hasEnoughPhotos); // Добавьте эту строку
    
//     if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
//       setSnackbarMessage('Пожалуйста, заполните все обязательные поля!');
//       setSnackbarOpen(true);
//       return;
//     }
//     setPreviewOpen(true);
//   };

//   const handleClosePreview = (shouldEdit) => {
//     setPreviewOpen(false);
//     if (!shouldEdit) handleSubmit({ preventDefault: () => {} });
//   };
//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

//   return (
//     <LanguageProvider>
//       <LoadScript
//         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//         libraries={['places']}
//         onLoad={() => setIsGoogleMapsLoaded(true)}
//       >
//         {/* <Container maxWidth="md" sx={{ py: 4 }}> */}

//         <Container maxWidth="md" sx={{ 
//   py: isMobile ? 2 : 4,
//   '& .MuiTextField-root, & .MuiFormControl-root': {
//     fontSize: isMobile ? '14px' : 'inherit'
//   }
// }}>
//           {/* <Typography variant="h4" align="center" gutterBottom> */}
//           <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
//             Добавить новое объявление
//           </Typography>
//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             <FormControl fullWidth margin="normal" error={!!errors.category}>
//               <InputLabel>Категория *</InputLabel>
//               <Select
//                 name="category"
//                 value={formData.category || ''}
//                 onChange={handleInputChange}
//                 label="Категория *"
//               >
//                 {['Квартира', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'].map((cat) => (
//                   <MenuItem key={cat} value={cat}>
//                     {cat}
//                   </MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

          

// <TextField
//   fullWidth
//   margin="normal"
//   size={isMobile ? "small" : "medium"}
//   name="objectName"
//   label="Название объекта *"
//   value={formData.objectName || ''}
//   onChange={handleInputChange}
//   error={!!errors.objectName}
//   helperText={
//     errors.objectName 
//       ? formData.objectName?.length > 59 
//         ? 'Максимум 59 символов' 
//         : 'Обязательное поле. Нельзя использовать @ или ссылки.'
//       : 'Например: Гостиница Уют (максимум 59 символов)'
//   }
// />

//             <TextField
//               fullWidth
//               margin="normal"
//               size={isMobile ? "small" : "medium"}
//               name="description"
//               label="Описание *"
//               multiline
//               rows={4}
//               value={formData.description}
//               onChange={handleInputChange}
//               error={!!errors.description}
//               helperText={
//                 errors.description ? 'Минимум 85 символов. Нельзя использовать @ или ссылки.' : 
//                 ''
//               }
//             />

//             <Box margin="normal" sx={{ mt: 3 }}>
//               <TextField
//                 fullWidth
//                 size={isMobile ? "small" : "medium"}
//                 inputRef={cityInputRef}
//                 label="Город *"
//                 value={formData.city}
//                 onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
//                 error={errors.city}
//                 helperText={errors.city ? 'Это поле обязательно' : ''}
//                 placeholder="Введите город"
//               />
//             </Box>

          

// <MetroSelector
//   city={formData.city}
//   onMetroSelect={handleMetroSelect}  // Используем новый обработчик
//   error={!!errors.metro}
// />


//             <Box margin="normal" sx={{ mt: 3 }}>
//               {!showManualStreetInput ? (
//                 <>
//                   <TextField
//                     fullWidth
//                     size={isMobile ? "small" : "medium"}
//                     inputRef={streetInputRef}
//                     label="Улица *"
//                     value={formData.street}
//                     onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
//                     error={errors.street}
//                     helperText={errors.street ? 'Это поле обязательно' : ''}
//                     placeholder="Введите улицу"
//                   />
//                   <Box sx={{ display: 'flex', justifyContent: 'flex-start', mt: 1 }}>
//                     <Button
//                       variant="text"
//                       size={isMobile ? "small" : "medium"}
//                       // size="small"
//                       sx={{
//                         textTransform: 'none',
//                         color: '#1976d2',
//                         '&:hover': {
//                           backgroundColor: 'transparent',
//                           textDecoration: 'underline',
//                         },
//                       }}
//                       onClick={() => setShowManualStreetInput(true)}
//                     >
//                       Не нашли улицу? Введите вручную
//                     </Button>
//                   </Box>
//                 </>
//               ) : (
               
//                 <TextField
//                   fullWidth
//                   label="Улица *"
//                   size={isMobile ? "small" : "medium"}
//                   name="street"
//                   value={formData.street}
//                   onChange={handleInputChange}
//                   error={errors.street}
//                   helperText={errors.street ? 'Это поле обязательно' : ''}
//                 />
//               )}
              
//             </Box>
//             <Box sx={{ mt: 2 }}> {/* Добавленный отступ */}
//             <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
//               <TextField 
//                 fullWidth 
//                 name="houseNumber" 
//                 size={isMobile ? "small" : "medium"}
//                 label="Номер дома *" 
//                 value={formData.houseNumber} 
//                 onChange={handleHouseNumberChange} 
//                 error={errors.houseNumber} 
//                 helperText={errors.houseNumber ? "Это поле обязательно" : ""} 
//               />
//               <TextField fullWidth name="price" label="Цена *" type="number" 
//                size={isMobile ? "small" : "medium"}
//                value={formData.price} onChange={handleInputChange} error={errors.price} helperText={errors.price ? "Это поле обязательно" : ""} />
//             </Box>
//             </Box>
//             {selectedLocation && (
//               <Box sx={{ height: '300px', width: '100%', mt: 2 }}>
//                 <GoogleMap
//                   mapContainerStyle={{ width: '100%', height: '100%' }}
//                   center={mapCenter}
//                   zoom={17}
//                 >
//                   <Marker
//                     position={selectedLocation}
//                     draggable
//                     onDragEnd={(e) => {
//                       const newLocation = {
//                         lat: e.latLng.lat(),
//                         lng: e.latLng.lng()
//                       };
//                       setSelectedLocation(newLocation);
//                       setMapCenter(newLocation);
//                       setFormData(prev => ({
//                         ...prev,
//                         latitude: newLocation.lat,
//                         longitude: newLocation.lng
//                       }));
//                     }}
//                   />
//                 </GoogleMap>
//                 <Box sx={{ mt: 0.5, mb: 0.5, py: 0.5, textAlign: 'center' }}>
//   <Typography variant="body2" sx={{ color: '#ff5722',  }}>
//     Вы можете двигать маркер на карте для точного указания местоположения!
//   </Typography>
// </Box>

//               </Box>



//             )}

//             <TextField
//               fullWidth
//               margin="normal"
//               size={isMobile ? "small" : "medium"}
//               name="district"
//               label="Район *"
//               placeholder="Укажите район"
//               value={formData.district}
//               onChange={handleInputChange}
//               error={!!errors.district}
//               helperText={errors.district ? 'Это поле обязательно' : ''}
//               sx={{ maxWidth: 200 , mt: 5,}}
//             />

//             {/* <Box sx={{ mt: 3, border: photoError ? '1px solid red' : 'none', p: 2, borderRadius: 2 }}>
              
//               <FileUploadSlider setUploadImages={setUploadImages} />
//               {photoError && (
//                 <Typography color="error"  size={isMobile ? "small" : "medium"}
//                 variant="body2" sx={{ mt: 1 }}>
//                   Загрузите минимум 3 фото
//                 </Typography>
//               )}
//             </Box> */}


// <Box sx={{ 
//   mt: 3, 
//   p: 2, 
//   borderRadius: 2,
//   border: photoError ? '1px solid red' : 'none'
// }}>
//   <FileUploadSlider 
//     photos={uploadImages}
//     setUploadImages={setUploadImages}
//     editable={true}
//     onPhotosChange={(newPhotos) => {
//       const hasEnough = newPhotos.length >= 3;
//       setPhotoError(!hasEnough);
//       setShowPhotoError(!hasEnough);
//     }}
//   />
//   {photoError && (
//     <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//       Загрузите минимум 3 фото
//     </Typography>
//   )}
// </Box>

//             <InfoApartments ref={infoRef} onDataChange={setApartmentInfo} />

//             <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
//               <Button variant="outlined" size="large" onClick={handlePreview}>
//                 Предпросмотр
//               </Button>
//               <Button variant="contained" size="large" type="submit" disabled={isSubmitting}>
//                 {isSubmitting ? <CircularProgress size={24} /> : 'Создать объявление'}
//               </Button>
//             </Stack>
//           </Box>

//           <PreviewDialog
//             open={previewOpen}
//             onClose={handleClosePreview}
//             formData={formData}
//             uploudImages={uploadImages}

//             apartmentInfo={apartmentInfo}
//             photoError={photoError}
//             key={`${previewOpen}-${JSON.stringify(formData)}`}
//           />

//           <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={() => setSnackbarOpen(false)}>
//             <Alert onClose={() => setSnackbarOpen(false)} severity="success">
//               {snackbarMessage}
//             </Alert>
//           </Snackbar>
//         </Container>
//       </LoadScript>
//     </LanguageProvider>
//   );
// };

// export default AddApartment;



// 'use client';

// import React, { useState, useEffect, useRef } from 'react';
// import FileUploadSlider from '@/app/components/FileUploadSlider';
// import { LanguageProvider } from '@/app/LanguageContext';
// import MetroSelector from '@/app/components/MetroSelector';
// import InfoApartments from '@/app/components/InfoApartments';
// import { GoogleMap, Marker, LoadScript } from '@react-google-maps/api';
// import PreviewDialog from '@/app/components/PreviewDialog';
// import {
//   Container, Typography, TextField, Select, MenuItem, Button,
//   FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack
// } from '@mui/material';

// const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

// const AddApartment = () => {
//   // Состояния
//   const [uploadImages, setUploadImages] = useState([]);
//   // const [formData, setFormData] = useState({
//   //   city: '', street: '', district: '', metro: '', hasMetro: false,
//   //   description: '', price: '', houseNumber: '',
//   //   category: '', objectName: '', latitude: null, longitude: null,
//   //   originalCity: '',  
//   //   region: '',
//   // });

//   const [formData, setFormData] = useState({
//     city: "Дніпро, Дніпропетровська область",
//     street: "Червоний Камінь",
//     district: "район",
//     metro: "",
//     hasMetro: true,
//     description: "описание т filesToAddfilesToAddfilesToAddfilesToAddfilesToAddfilesToAddfilesToAddмммfilesToAddfilesToAddfilesToAdd",
//     price: "5000",
//     houseNumber: "3",
//     category: "Хостел",
//     objectName: "название обнктао",
//     latitude: 48.48701003500085,
//     longitude: 34.93966902621155,
//     originalCity: "Дніпро",
//     region: "Дніпропетровська область",
//   });
  

//   const [errors, setErrors] = useState({});
//   const [apartmentInfo, setApartmentInfo] = useState({});
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showManualStreetInput, setShowManualStreetInput] = useState(false);
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [previewOpen, setPreviewOpen] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [mapCenter, setMapCenter] = useState({ lat: 50.4501, lng: 30.5234 });
//   const [isGoogleMapsLoaded, setIsGoogleMapsLoaded] = useState(false);
//   const [photoError, setPhotoError] = useState(false);

//   // Рефы
//   const infoRef = useRef();
//   const cityAutocompleteRef = useRef(null);
//   const streetAutocompleteRef = useRef(null);
//   const cityInputRef = useRef(null);
//   const streetInputRef = useRef(null);
//   const geocoderRef = useRef(null);

//   const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

//   // Эффекты
//   useEffect(() => {
//     if (uploadImages.length >= 3) setPhotoError(false);
//   }, [uploadImages]);

//   useEffect(() => {
//     const timer = setTimeout(updateLocation, 500);
//     return () => clearTimeout(timer);
//   }, [formData.street, formData.houseNumber, formData.city]);

//   useEffect(() => {
//     if (isGoogleMapsLoaded && window.google?.maps?.Geocoder) {
//       initAutocomplete();
//       geocoderRef.current = new window.google.maps.Geocoder();
//     }
//   }, [isGoogleMapsLoaded, showManualStreetInput]);

//   // Функции
//   const initAutocomplete = () => {
//     if (!window.google) return;

//     // Инициализация автодополнения для города
//     if (cityInputRef.current && !cityAutocompleteRef.current) {
//       cityAutocompleteRef.current = new window.google.maps.places.Autocomplete(
//         cityInputRef.current, 
//         { types: ['(cities)'], componentRestrictions: { country: 'ua' } }
//       );
//       cityAutocompleteRef.current.addListener('place_changed', () => {
//         const place = cityAutocompleteRef.current.getPlace();
//         handleCitySelect(place);
//       });
//     }

//     // Инициализация автодополнения для улицы (только если не в ручном режиме)
//     if (!showManualStreetInput && streetInputRef.current && !streetAutocompleteRef.current) {
//       streetAutocompleteRef.current = new window.google.maps.places.Autocomplete(
//         streetInputRef.current, 
//         { types: ['address'], componentRestrictions: { country: 'ua' } }
//       );
//       streetAutocompleteRef.current.addListener('place_changed', () => {
//         const place = streetAutocompleteRef.current.getPlace();
//         handleStreetSelect(place);
//       });
//     }
//   };

//   // const handleCitySelect = (place) => {
//   //   const cityComponent = place?.address_components?.find(c => c.types.includes('locality'));
//   //   const city = cityComponent?.long_name || place?.name || '';
//   //   const hasMetro = CITIES_WITH_METRO.some(c => c.toLowerCase() === city.toLowerCase());
    
//   //   setFormData(prev => ({ 
//   //     ...prev, 
//   //     city,
//   //     metro: '',
//   //     hasMetro
//   //   }));
    
//   //   setErrors(prev => ({ ...prev, city: false, metro: false }));

//   //   if (place?.geometry?.location) {
//   //     updateMapLocation({
//   //       lat: place.geometry.location.lat(),
//   //       lng: place.geometry.location.lng()
//   //     });
//   //   }
//   // };

//   const handleCitySelect = (place) => {
//     const addressComponents = place?.address_components || [];
//     const cityComponent = addressComponents.find(c => c.types.includes('locality'));
//     const regionComponent = addressComponents.find(c => c.types.includes('administrative_area_level_1'));
    
//     const city = cityComponent?.long_name || place?.name || '';
//     const region = regionComponent?.long_name || '';
//     const fullCityName = region ? `${city}, ${region}` : city;
    
//     const hasMetro = CITIES_WITH_METRO.some(c => c.toLowerCase() === city.toLowerCase());
    
//     setFormData(prev => ({ 
//       ...prev, 
//       city: fullCityName,
//       originalCity: city,
//       region,
//       metro: '',
//       hasMetro
//     }));
    
//     setErrors(prev => ({ ...prev, city: false, metro: false }));
  
//     if (place?.geometry?.location) {
//       updateMapLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng()
//       });
//     }
//   };

//   const handleStreetSelect = (place) => {
//     let street = place?.formatted_address?.split(',')[0] || '';
//     setFormData(prev => ({ ...prev, street }));
//     setErrors(prev => ({ ...prev, street: false }));

//     if (formData.houseNumber && place?.geometry?.location) {
//       updateMapLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng()
//       });
//     }
//   };

//   const updateMapLocation = (location) => {
//     setSelectedLocation(location);
//     setMapCenter(location);
//     setFormData(prev => ({
//       ...prev,
//       latitude: location.lat,
//       longitude: location.lng
//     }));
//   };

//   const geocodeAddress = (address) => {
//     if (!geocoderRef.current) return;

//     geocoderRef.current.geocode({ address }, (results, status) => {
//       if (status === 'OK' && results[0]) {
//         updateMapLocation({
//           lat: results[0].geometry.location.lat(),
//           lng: results[0].geometry.location.lng()
//         });
//       }
//     });
//   };

//   const updateLocation = () => {
//     if (formData.city && formData.street && formData.houseNumber) {
//       geocodeAddress(`${formData.street}, ${formData.houseNumber}, ${formData.city}`);
//     }
//   };

//   const toggleStreetInputMode = () => {
//     if (showManualStreetInput) {
//       // Возврат к автодополнению
//       setShowManualStreetInput(false);
//       // Нужно подождать следующего рендера для повторной инициализации
//       setTimeout(() => {
//         if (streetInputRef.current && !streetAutocompleteRef.current) {
//           initAutocomplete();
//         }
//       }, 0);
//     } else {
//       // Переход в ручной режим
//       if (streetAutocompleteRef.current) {
//         window.google.maps.event.clearInstanceListeners(streetInputRef.current);
//         streetAutocompleteRef.current = null;
//       }
//       setShowManualStreetInput(true);
//     }
//   };

//   const handleInputChange = (e) => {
//     const { name, value } = e.target;
//     setFormData(prev => ({ ...prev, [name]: value }));
//     setErrors(prev => ({ ...prev, [name]: false }));
//   };

//   const handleHouseNumberChange = (e) => {
//     const houseNumber = e.target.value;
//     setFormData(prev => ({ ...prev, houseNumber }));
//     setErrors(prev => ({ ...prev, houseNumber: false }));
//   };

//   const handleMetroSelect = (metro) => {
//     setFormData(prev => ({ ...prev, metro }));
//     setErrors(prev => ({ ...prev, metro: false }));
//   };

//   const validateForm = () => {
//     const descriptionTooShort = formData.description.length < 85;
//     const forbiddenPattern = /[@]|https?:\/\/|www\./i;
//     const cityHasMetro = CITIES_WITH_METRO.some(c => 
//       c.toLowerCase() === formData.city.toLowerCase()
//     );

//     const newErrors = {
//       category: !formData.category,
//       objectName: !formData.objectName || 
//                  forbiddenPattern.test(formData.objectName) || 
//                  formData.objectName.length > 59,
//       description: !formData.description || 
//                   forbiddenPattern.test(formData.description) || 
//                   descriptionTooShort,
//       city: !formData.city,
//       price: !formData.price,
//       street: !formData.street,
//       houseNumber: !formData.houseNumber,
//       district: !formData.district,
//       metro: cityHasMetro && !formData.metro,
//     };

//     setErrors(newErrors);
//     return !Object.values(newErrors).some(Boolean);
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();

//     if (uploadImages.length < 3) {
//       setPhotoError(true);
//       setSnackbarMessage('Загрузите минимум 3 фотографии!');
//       setSnackbarOpen(true);
//       return;
//     }

//     const isFormValid = validateForm();
//     const isInfoValid = infoRef.current?.validate();

//     if (!isFormValid || !isInfoValid) {
//       setSnackbarMessage('Заполните все обязательные поля!');
//       setSnackbarOpen(true);
//       return;
//     }

//     setIsSubmitting(true);
//     try { console.log(uploadImages);
//       const response = await fetch('http://localhost:3000/api/v1/apartments/add', {
//         method: 'POST',
//         body: JSON.stringify({ 
//           ...formData, 
//           ...apartmentInfo, 
//           photos: uploadImages 
//         }),
//         headers: { 'Content-Type': 'application/json' },
//       });

//       if (!response.ok) throw new Error('Ошибка сервера');
//       setSnackbarMessage('Объявление успешно добавлено!');
//     } catch (error) {
//       console.error('Ошибка:', error);
//       setSnackbarMessage(error.message || 'Произошла ошибка при добавлении');
//     } finally {
//       setIsSubmitting(false);
//       setSnackbarOpen(true);
//     }
//   };


  
//   const handlePreview = () => {
//     const isFormValid = validateForm();
//     const isInfoValid = infoRef.current?.validate();
//     const hasEnoughPhotos = uploadImages.length >= 3;

//     setPhotoError(!hasEnoughPhotos);
    
//     if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
//       setSnackbarMessage('Пожалуйста, заполните все обязательные поля!');
//       setSnackbarOpen(true);
//       return;
//     }
//     setPreviewOpen(true);
//   };

//   const handleClosePreview = (shouldEdit) => {
//     setPreviewOpen(false);
//     if (!shouldEdit) handleSubmit({ preventDefault: () => {} });
//   };

//   return (
//     <LanguageProvider>
//       <LoadScript
//         googleMapsApiKey={process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}
//         libraries={['places']}
//         onLoad={() => setIsGoogleMapsLoaded(true)}
//         onError={(error) => console.error('Error loading Google Maps API:', error)}
//       >
//         <Container maxWidth="md" sx={{ 
//           py: isMobile ? 2 : 4,
//           '& .MuiTextField-root, & .MuiFormControl-root': {
//             fontSize: isMobile ? '14px' : 'inherit'
//           }
//         }}>
//           <Typography variant={isMobile ? "h5" : "h4"} align="center" gutterBottom>
//             Добавить новое объявление
//           </Typography>

//           <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//             {/* Категория */}
//             <FormControl fullWidth margin="normal" error={!!errors.category}>
//               <InputLabel>Категория *</InputLabel>
//               <Select
//                 name="category"
//                 value={formData.category || ''}
//                 onChange={handleInputChange}
//                 label="Категория *"
//               >
//                 {['Квартира', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'].map((cat) => (
//                   <MenuItem key={cat} value={cat}>{cat}</MenuItem>
//                 ))}
//               </Select>
//             </FormControl>

//             {/* Название объекта */}
//             <TextField
//               fullWidth
//               margin="normal"
//               size={isMobile ? "small" : "medium"}
//               name="objectName"
//               label="Название объекта *"
//               value={formData.objectName || ''}
//               onChange={handleInputChange}
//               error={!!errors.objectName}
//               helperText={
//                 errors.objectName 
//                   ? formData.objectName?.length > 59 
//                     ? 'Максимум 59 символов' 
//                     : 'Обязательное поле. Нельзя использовать @ или ссылки.'
//                   : 'Например: Гостиница Уют (максимум 59 символов)'
//               }
//             />

//             {/* Описание */}
//             <TextField
//               fullWidth
//               margin="normal"
//               size={isMobile ? "small" : "medium"}
//               name="description"
//               label="Описание *"
//               multiline
//               rows={4}
//               value={formData.description}
//               onChange={handleInputChange}
//               error={!!errors.description}
//               helperText={
//                 errors.description 
//                   ? 'Минимум 85 символов. Нельзя использовать @ или ссылки.' 
//                   : ''
//               }
//             />

//             {/* Город */}
//             <Box margin="normal" sx={{ mt: 3 }}>
//               <TextField
//                 fullWidth
//                 size={isMobile ? "small" : "medium"}
//                 inputRef={cityInputRef}
//                 label="Город *"
//                 value={formData.city}
//                 onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
//                 error={errors.city}
//                 helperText={errors.city ? 'Это поле обязательно' : ''}
//                 placeholder="Введите город"
//               />
//             </Box>

//             {/* Метро */}
//             <MetroSelector
//               city={formData.city}
//               onMetroSelect={handleMetroSelect}
//               error={!!errors.metro}
//             />

//             {/* Улица */}
//             <Box margin="normal" sx={{ mt: 3 }}>
//               {!showManualStreetInput ? (
//                 <>
//                   <TextField
//                     fullWidth
//                     size={isMobile ? "small" : "medium"}
//                     inputRef={streetInputRef}
//                     label="Улица *"
//                     value={formData.street}
//                     onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
//                     error={errors.street}
//                     helperText={errors.street ? 'Это поле обязательно' : ''}
//                     placeholder="Начните вводить название улицы"
//                   />
//                   <Button
//                     variant="text"
//                     size={isMobile ? "small" : "medium"}
//                     sx={{
//                       textTransform: 'none',
//                       color: '#1976d2',
//                       mt: 1,
//                       '&:hover': {
//                         backgroundColor: 'transparent',
//                         textDecoration: 'underline',
//                       },
//                     }}
//                     onClick={toggleStreetInputMode}
//                   >
//                     Не нашли улицу? Введите вручную
//                   </Button>
//                 </>
//               ) : (
//                 <>
//                   <TextField
//                     fullWidth
//                     label="Улица *"
//                     size={isMobile ? "small" : "medium"}
//                     name="street"
//                     value={formData.street}
//                     onChange={handleInputChange}
//                     error={errors.street}
//                     helperText={errors.street ? 'Это поле обязательно' : ''}
//                     placeholder="Введите название улицы вручную"
//                   />
//                   <Button
//                     variant="text"
//                     size={isMobile ? "small" : "medium"}
//                     sx={{
//                       textTransform: 'none',
//                       color: '#1976d2',
//                       mt: 1,
//                       '&:hover': {
//                         backgroundColor: 'transparent',
//                         textDecoration: 'underline',
//                       },
//                     }}
//                     onClick={toggleStreetInputMode}
//                   >
//                     Вернуться к поиску улицы с помощью Google
//                   </Button>
//                 </>
//               )}
//             </Box>

//             {/* Номер дома и цена */}
//             <Box sx={{ mt: 2 }}>
//               <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
//                 <TextField 
//                   fullWidth 
//                   name="houseNumber" 
//                   size={isMobile ? "small" : "medium"}
//                   label="Номер дома *" 
//                   value={formData.houseNumber} 
//                   onChange={handleHouseNumberChange} 
//                   error={errors.houseNumber} 
//                   helperText={errors.houseNumber ? "Это поле обязательно" : ""} 
//                 />
//                 <TextField 
//                   fullWidth 
//                   name="price" 
//                   label="Цена *" 
//                   type="number" 
//                   size={isMobile ? "small" : "medium"}
//                   value={formData.price} 
//                   onChange={handleInputChange} 
//                   error={errors.price} 
//                   helperText={errors.price ? "Это поле обязательно" : ""} 
//                 />
//               </Box>
//             </Box>

//             {/* Карта */}
//             {selectedLocation && (
//               <Box sx={{ height: '300px', width: '100%', mt: 2 }}>
//                 <GoogleMap
//                   mapContainerStyle={{ width: '100%', height: '100%' }}
//                   center={mapCenter}
//                   zoom={17}
//                 >
//                   <Marker
//                     position={selectedLocation}
//                     draggable
//                     onDragEnd={(e) => {
//                       updateMapLocation({
//                         lat: e.latLng.lat(),
//                         lng: e.latLng.lng()
//                       });
//                     }}
//                   />
//                 </GoogleMap>
//                 <Box sx={{ mt: 1.5, mb: 0.5, py: 0.5, textAlign: 'center' }}>
//                   <Typography variant="body2" sx={{ color: '#ff5722' }}>
//                     Вы можете двигать маркер на карте для точного указания местоположения!
//                   </Typography>
//                 </Box>
//               </Box>
//             )}

//             {/* Район */}
//             <TextField
//               fullWidth
//               margin="normal"
//               size={isMobile ? "small" : "medium"}
//               name="district"
//               label="Район *"
//               placeholder="Укажите район"
//               value={formData.district}
//               onChange={handleInputChange}
//               error={!!errors.district}
//               helperText={errors.district ? 'Это поле обязательно' : ''}
//               sx={{ maxWidth: 200, mt: 8 }}
//             />

//             {/* Загрузка фото */}
//             <Box sx={{ 
//               mt: 3, 
//               // p: 2, 
//               borderRadius: 2,
//               border: photoError ? '1px solid red' : 'none'
//             }}>
//               <FileUploadSlider 
//                 photos={uploadImages}
//                 setUploadImages={setUploadImages}
//                 editable={true}
//                 onPhotosChange={(newPhotos) => {
//                   setPhotoError(newPhotos.length < 3);
//                 }}
//               />
//               {photoError && (
//                 <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//                   Загрузите минимум 3 фото
//                 </Typography>
//               )}
//             </Box>

//             {/* Дополнительная информация */}
//             <InfoApartments ref={infoRef} onDataChange={setApartmentInfo} />

//             {/* Кнопки */}
//             <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
//               <Button variant="outlined" size="large" onClick={handlePreview}>
//                 Предпросмотр
//               </Button>
//               <Button 
//                 variant="contained" 
//                 size="large" 
//                 type="submit" 
//                 disabled={isSubmitting}
//               >
//                 {isSubmitting ? <CircularProgress size={24} /> : 'Создать объявление'}
//               </Button>
//             </Stack>
//           </Box>

//           {/* Диалог предпросмотра */}
//           <PreviewDialog
//             open={previewOpen}
//             onClose={handleClosePreview}
//             formData={formData}
//             uploudImages={uploadImages}
//             apartmentInfo={apartmentInfo}
//             photoError={photoError}
//           />

//           {/* Уведомления */}
//           <Snackbar 
//             open={snackbarOpen} 
//             autoHideDuration={6000} 
//             onClose={() => setSnackbarOpen(false)}
//           >
//             <Alert 
//               onClose={() => setSnackbarOpen(false)} 
//               severity="success"
//               sx={{ width: '100%' }}
//             >
//               {snackbarMessage}
//             </Alert>
//           </Snackbar>
//         </Container>
//       </LoadScript>
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
  Container, Typography, TextField, Select, MenuItem, Button,
  FormControl, InputLabel, Box, CircularProgress, Snackbar, Alert, Stack
} from '@mui/material';

const CITIES_WITH_METRO = ['Київ', 'Харків', 'Дніпро', 'Киев', 'Харьков', 'Днепр'];

const AddApartment = () => {
  // Состояния
  const [uploadImages, setUploadImages] = useState([]);
  const [formData, setFormData] = useState({
    city: '', street: '', district: '', metro: '', hasMetro: false,
    description: '', price: '', houseNumber: '',
    category: '', objectName: '', latitude: null, longitude: null,
    originalCity: '',  
    region: '',
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

  // Рефы
  const infoRef = useRef();
  const cityAutocompleteRef = useRef(null);
  const streetAutocompleteRef = useRef(null);
  const cityInputRef = useRef(null);
  const streetInputRef = useRef(null);
  const geocoderRef = useRef(null);

  const isMobile = typeof window !== 'undefined' && window.innerWidth < 600;

  // Эффекты
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

  // Функции
  const initAutocomplete = () => {
    if (!window.google) return;

    // Инициализация автодополнения для города
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

    // Инициализация автодополнения для улицы (только если не в ручном режиме)
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

  // const handleCitySelect = (place) => {
  //   const cityComponent = place?.address_components?.find(c => c.types.includes('locality'));
  //   const city = cityComponent?.long_name || place?.name || '';
  //   const hasMetro = CITIES_WITH_METRO.some(c => c.toLowerCase() === city.toLowerCase());
    
  //   setFormData(prev => ({ 
  //     ...prev, 
  //     city,
  //     metro: '',
  //     hasMetro
  //   }));
    
  //   setErrors(prev => ({ ...prev, city: false, metro: false }));

  //   if (place?.geometry?.location) {
  //     updateMapLocation({
  //       lat: place.geometry.location.lat(),
  //       lng: place.geometry.location.lng()
  //     });
  //   }
  // };

  const handleCitySelect = (place) => {
    const addressComponents = place?.address_components || [];
    const cityComponent = addressComponents.find(c => c.types.includes('locality'));
    const regionComponent = addressComponents.find(c => c.types.includes('administrative_area_level_1'));
    
    const city = cityComponent?.long_name || place?.name || '';
    const region = regionComponent?.long_name || '';
    const fullCityName = region ? `${city}, ${region}` : city;
    
    const hasMetro = CITIES_WITH_METRO.some(c => c.toLowerCase() === city.toLowerCase());
    
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
      // Возврат к автодополнению
      setShowManualStreetInput(false);
      // Нужно подождать следующего рендера для повторной инициализации
      setTimeout(() => {
        if (streetInputRef.current && !streetAutocompleteRef.current) {
          initAutocomplete();
        }
      }, 0);
    } else {
      // Переход в ручной режим
      if (streetAutocompleteRef.current) {
        window.google.maps.event.clearInstanceListeners(streetInputRef.current);
        streetAutocompleteRef.current = null;
      }
      setShowManualStreetInput(true);
    }
  };

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setFormData(prev => ({ ...prev, [name]: value }));
    setErrors(prev => ({ ...prev, [name]: false }));
  };

  const handleHouseNumberChange = (e) => {
    const houseNumber = e.target.value;
    setFormData(prev => ({ ...prev, houseNumber }));
    setErrors(prev => ({ ...prev, houseNumber: false }));
  };

  const handleMetroSelect = (metro) => {
    setFormData(prev => ({ ...prev, metro }));
    setErrors(prev => ({ ...prev, metro: false }));
  };

  const validateForm = () => {
    const descriptionTooShort = formData.description.length < 85;
    const forbiddenPattern = /[@]|https?:\/\/|www\./i;
    const cityHasMetro = CITIES_WITH_METRO.some(c => 
      c.toLowerCase() === formData.city.toLowerCase()
    );

    const newErrors = {
      category: !formData.category,
      objectName: !formData.objectName || 
                 forbiddenPattern.test(formData.objectName) || 
                 formData.objectName.length > 59,
      description: !formData.description || 
                  forbiddenPattern.test(formData.description) || 
                  descriptionTooShort,
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
      setSnackbarMessage('Загрузите минимум 3 фотографии!');
      setSnackbarOpen(true);
      return;
    }

    const isFormValid = validateForm();
    const isInfoValid = infoRef.current?.validate();

    if (!isFormValid || !isInfoValid) {
      setSnackbarMessage('Заполните все обязательные поля!');
      setSnackbarOpen(true);
      return;
    }

    setIsSubmitting(true);
    try { console.log(uploadImages);
      const response = await fetch('http://localhost:3000/api/v1/apartments/add', {
        method: 'POST',
        body: JSON.stringify({ 
          ...formData, 
          ...apartmentInfo, 
          photos: uploadImages 
        }),
        headers: { 'Content-Type': 'application/json' },
      });

      if (!response.ok) throw new Error('Ошибка сервера');
      setSnackbarMessage('Объявление успешно добавлено!');
    } catch (error) {
      console.error('Ошибка:', error);
      setSnackbarMessage(error.message || 'Произошла ошибка при добавлении');
    } finally {
      setIsSubmitting(false);
      setSnackbarOpen(true);
    }
  };


  
  const handlePreview = () => {
    const isFormValid = validateForm();
    const isInfoValid = infoRef.current?.validate();
    const hasEnoughPhotos = uploadImages.length >= 3;

    setPhotoError(!hasEnoughPhotos);
    
    if (!isFormValid || !isInfoValid || !hasEnoughPhotos) {
      setSnackbarMessage('Пожалуйста, заполните все обязательные поля!');
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
                {['Квартира', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'].map((cat) => (
                  <MenuItem key={cat} value={cat}>{cat}</MenuItem>
                ))}
              </Select>
            </FormControl>

            {/* Название объекта */}
            <TextField
              fullWidth
              margin="normal"
              size={isMobile ? "small" : "medium"}
              name="objectName"
              label="Название объекта *"
              value={formData.objectName || ''}
              onChange={handleInputChange}
              error={!!errors.objectName}
              helperText={
                errors.objectName 
                  ? formData.objectName?.length > 59 
                    ? 'Максимум 59 символов' 
                    : 'Обязательное поле. Нельзя использовать @ или ссылки.'
                  : 'Например: Гостиница Уют (максимум 59 символов)'
              }
            />

            {/* Описание */}
            <TextField
              fullWidth
              margin="normal"
              size={isMobile ? "small" : "medium"}
              name="description"
              label="Описание *"
              multiline
              rows={4}
              value={formData.description}
              onChange={handleInputChange}
              error={!!errors.description}
              helperText={
                errors.description 
                  ? 'Минимум 85 символов. Нельзя использовать @ или ссылки.' 
                  : ''
              }
            />

            {/* Город */}
            <Box margin="normal" sx={{ mt: 3 }}>
              <TextField
                fullWidth
                size={isMobile ? "small" : "medium"}
                inputRef={cityInputRef}
                label="Город *"
                value={formData.city}
                onChange={(e) => setFormData(prev => ({ ...prev, city: e.target.value }))}
                error={errors.city}
                helperText={errors.city ? 'Это поле обязательно' : ''}
                placeholder="Введите город"
              />
            </Box>

            {/* Метро */}
            <MetroSelector
              city={formData.city}
              onMetroSelect={handleMetroSelect}
              error={!!errors.metro}
            />

            {/* Улица */}
            <Box margin="normal" sx={{ mt: 3 }}>
              {!showManualStreetInput ? (
                <>
                  <TextField
                    fullWidth
                    size={isMobile ? "small" : "medium"}
                    inputRef={streetInputRef}
                    label="Улица *"
                    value={formData.street}
                    onChange={(e) => setFormData(prev => ({ ...prev, street: e.target.value }))}
                    error={errors.street}
                    helperText={errors.street ? 'Это поле обязательно' : ''}
                    placeholder="Начните вводить название улицы"
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
                    Не нашли улицу? Введите вручную
                  </Button>
                </>
              ) : (
                <>
                  <TextField
                    fullWidth
                    label="Улица *"
                    size={isMobile ? "small" : "medium"}
                    name="street"
                    value={formData.street}
                    onChange={handleInputChange}
                    error={errors.street}
                    helperText={errors.street ? 'Это поле обязательно' : ''}
                    placeholder="Введите название улицы вручную"
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
                    Вернуться к поиску улицы с помощью Google
                  </Button>
                </>
              )}
            </Box>

            {/* Номер дома и цена */}
            <Box sx={{ mt: 2 }}>
              <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, maxWidth: 200, mb: 2 }}>
                <TextField 
                  fullWidth 
                  name="houseNumber" 
                  size={isMobile ? "small" : "medium"}
                  label="Номер дома *" 
                  value={formData.houseNumber} 
                  onChange={handleHouseNumberChange} 
                  error={errors.houseNumber} 
                  helperText={errors.houseNumber ? "Это поле обязательно" : ""} 
                />
                <TextField 
                  fullWidth 
                  name="price" 
                  label="Цена *" 
                  type="number" 
                  size={isMobile ? "small" : "medium"}
                  value={formData.price} 
                  onChange={handleInputChange} 
                  error={errors.price} 
                  helperText={errors.price ? "Это поле обязательно" : ""} 
                />
              </Box>
            </Box>

            {/* Карта */}
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
                    Вы можете двигать маркер на карте для точного указания местоположения!
                  </Typography>
                </Box>
              </Box>
            )}

            {/* Район */}
            <TextField
              fullWidth
              margin="normal"
              size={isMobile ? "small" : "medium"}
              name="district"
              label="Район *"
              placeholder="Укажите район"
              value={formData.district}
              onChange={handleInputChange}
              error={!!errors.district}
              helperText={errors.district ? 'Это поле обязательно' : ''}
              sx={{ maxWidth: 200, mt: 8 }}
            />

            {/* Загрузка фото */}
            <Box sx={{ 
              mt: 3, 
              // p: 2, 
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
                  Загрузите минимум 3 фото
                </Typography>
              )}
            </Box>

            {/* Дополнительная информация */}
            <InfoApartments ref={infoRef} onDataChange={setApartmentInfo} />

            {/* Кнопки */}
            <Stack direction="column" spacing={2} sx={{ mt: 4 }}>
              <Button variant="outlined" size="large" onClick={handlePreview}>
                Предпросмотр
              </Button>
              <Button 
                variant="contained" 
                size="large" 
                type="submit" 
                disabled={isSubmitting}
              >
                {isSubmitting ? <CircularProgress size={24} /> : 'Создать объявление'}
              </Button>
            </Stack>
          </Box>

          {/* Диалог предпросмотра */}
          <PreviewDialog
            open={previewOpen}
            onClose={handleClosePreview}
            formData={formData}
            uploudImages={uploadImages}
            apartmentInfo={apartmentInfo}
            photoError={photoError}
          />

          {/* Уведомления */}
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
    </LanguageProvider>
  );
};

export default AddApartment;


