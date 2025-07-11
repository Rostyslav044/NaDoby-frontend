




// "use client";

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';
// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           if (!response.ok) {
//             throw new Error('Не вдалося завантажити квартиру');
//           }
//           const data = await response.json();
//           setApartment(data);
//         } catch (error) {
//           console.error('Помилка завантаження:', error);
//         }
//       };

//       fetchApartment();
//     }
//   }, [id]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   return (
//     <Box maxWidth="900px" mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>
//         {apartment.name || 'Без назви'}
//       </Typography>

//       <Box position="relative" mb={2}>
//         <CardMedia
//           component="img"
//           image={apartment.photos?.[currentIndex]}
//           height="400"
//           sx={{ borderRadius: 2, objectFit: 'cover' }}
//         />

//         <IconButton
//           onClick={handlePrev}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: 16,
//             transform: 'translateY(-50%)',
//             bgcolor: 'rgba(0,0,0,0.4)',
//             color: 'white',
//             '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <IconButton
//           onClick={handleNext}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             right: 16,
//             transform: 'translateY(-50%)',
//             bgcolor: 'rgba(0,0,0,0.4)',
//             color: 'white',
//             '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>

//       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//         <Grid container spacing={2}>
//           {[
//             { label: 'Категорія', value: apartment.category },
//             { label: 'Опис', value: apartment.description },
//             { label: 'Місто', value: apartment.city },
//             { label: 'Вулиця', value: apartment.street },
//             { label: 'Номер будинку', value: apartment.houseNumber },
//             { label: 'Район', value: apartment.district },
//             { label: 'Метро', value: apartment.metro },
//             { label: 'Ціна', value: `${apartment.price} грн/доба` },
//             { label: 'Кімнат', value: apartment.rooms },
//             { label: 'Ліжок', value: apartment.beds },
//             { label: 'Площа', value: apartment.size ? `${apartment.size} м²` : '' },
//             { label: 'Поверх', value: `${apartment.floor} з ${apartment.totalFloors}` },
//             { label: 'Час заїзду', value: apartment.checkIn },
//             { label: 'Час виїзду', value: apartment.checkOut },
//             { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn },
//             { label: 'Куріння', value: apartment.smoking },
//             { label: 'Вечірки', value: apartment.parties },
//             { label: 'Тварини', value: apartment.pets },
//             { label: 'Мін. оренда', value: apartment.minRent },
//             { label: 'Документи', value: apartment.reportDocs },
//             { label: 'Застава', value: apartment.deposit },
//             { label: 'Вік орендаря', value: apartment.ageLimit },
//             { label: 'Діти з', value: apartment.childrenFrom },
//             { label: "Ім'я", value: apartment.name },
//             { label: 'Телефони', value: apartment.phones?.join(', ') },
//             { label: 'Зручності', value: apartment.conveniences?.join(', ') },
//           ].map((item, index) => (
//             item.value && (
//               <Grid item xs={12} sm={6} key={index}>
//                 <Typography variant="body1">
//                   <strong>{item.label}:</strong> {item.value}
//                 </Typography>
//               </Grid>
//             )
//           ))}
//         </Grid>
//       </Paper>

//       {apartment.latitude && apartment.longitude && (
//   <Box sx={{ height: 300, mt: 3 }}>
//     <Typography variant="h6" gutterBottom>Местоположение объекта</Typography>
//     <GoogleMap
//       mapContainerStyle={{ width: '100%', height: '100%' }}
//       center={{ lat: apartment.latitude, lng: apartment.longitude }}
//       zoom={15}
//     >
//       <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//     </GoogleMap>
//   </Box>
// )}


//       <Box mt={3}>
//         <Button variant="contained" onClick={() => router.back()}>
//           Назад
//         </Button>
//       </Box>
//     </Box>
//   );
// }







// "use client";

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';

// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           if (!response.ok) {
//             throw new Error('Не вдалося завантажити квартиру');
//           }
//           const data = await response.json();

//           console.log('Apartment data:', data); // <-- выводим данные для проверки

//           setApartment(data);
//         } catch (error) {
//           console.error('Помилка завантаження:', error);
//         }
//       };

//       fetchApartment();
//     }
//   }, [id]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   return (
//     <Box maxWidth="900px" mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>
//         {apartment.name || 'Без назви'}
//       </Typography>

//       <Box position="relative" mb={2}>
//         <CardMedia
//           component="img"
//           image={apartment.photos?.[currentIndex]}
//           height="400"
//           sx={{ borderRadius: 2, objectFit: 'cover' }}
//         />

//         <IconButton
//           onClick={handlePrev}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: 16,
//             transform: 'translateY(-50%)',
//             bgcolor: 'rgba(0,0,0,0.4)',
//             color: 'white',
//             '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <IconButton
//           onClick={handleNext}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             right: 16,
//             transform: 'translateY(-50%)',
//             bgcolor: 'rgba(0,0,0,0.4)',
//             color: 'white',
//             '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>

//       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//         <Grid container spacing={2}>
//           {[
//             { label: 'Категорія', value: apartment.category },
//             { label: 'Опис', value: apartment.description },
//             { label: 'Місто', value: apartment.city },
//             { label: 'Вулиця', value: apartment.street },
//             { label: 'Номер будинку', value: apartment.houseNumber },
//             { label: 'Район', value: apartment.district },
//             { label: 'Метро', value: apartment.metro },
//             { label: 'Ціна', value: `${apartment.price} грн/доба` },
//             { label: 'Кімнат', value: apartment.rooms },
//             { label: 'Ліжок', value: apartment.beds },
//             { label: 'Площа', value: apartment.size ? `${apartment.size} м²` : '' },
//             { label: 'Поверх', value: `${apartment.floor} з ${apartment.totalFloors}` },
//             { label: 'Час заїзду', value: apartment.checkIn },
//             { label: 'Час виїзду', value: apartment.checkOut },
//             { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn },
//             { label: 'Куріння', value: apartment.smoking },
//             { label: 'Вечірки', value: apartment.parties },
//             { label: 'Тварини', value: apartment.pets },
//             { label: 'Мін. оренда', value: apartment.minRent },
//             { label: 'Документи', value: apartment.reportDocs },
//             { label: 'Застава', value: apartment.deposit },
//             { label: 'Вік орендаря', value: apartment.ageLimit },
//             { label: 'Діти з', value: apartment.childrenFrom },
//             { label: "Ім'я", value: apartment.name },
//             { label: 'Телефони', value: apartment.phones?.join(', ') },
//             { label: 'Зручності', value: apartment.conveniences?.join(', ') },
//           ].map(
//             (item, index) =>
//               item.value && (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Typography variant="body1">
//                     <strong>{item.label}:</strong> {item.value}
//                   </Typography>
//                 </Grid>
//               )
//           )}
//         </Grid>
//       </Paper>

//       {apartment.latitude && apartment.longitude && (
//         <Box sx={{ height: 400, width:500, mt: 3, borderRadius: 2, overflow: 'hidden', 
//         border: '1px solid #ccc' }}>

//           <Typography variant="h6" gutterBottom>
//             Местоположение объекта
//           </Typography>
//           <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//             <GoogleMap
//               mapContainerStyle={{ width: '100%', height: '100%' }}
//               center={{ lat: apartment.latitude, lng: apartment.longitude }}
//               zoom={15}
//             >
//               <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//             </GoogleMap>
//           </LoadScript>
//         </Box>
//       )}

//       <Box mt={3}>
//         <Button variant="contained" onClick={() => router.back()}>
//           Назад
//         </Button>
//       </Box>
//     </Box>
//   );
// }




// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { LoadScript, GoogleMap, Marker } from '@react-google-maps/api';

// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           if (!response.ok) {
//             throw new Error('Не вдалося завантажити квартиру');
//           }
//           const data = await response.json();
//           setApartment(data);
//         } catch (error) {
//           console.error('Помилка завантаження:', error);
//         }
//       };

//       fetchApartment();
//     }
//   }, [id]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
//   };

//   // Функция запускается при клике — запрашивает геолокацию и открывает Google Maps с маршрутом
//   const handleGetDirections = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const originLat = pos.coords.latitude;
//           const originLng = pos.coords.longitude;
//           const destLat = apartment.latitude;
//           const destLng = apartment.longitude;

//           const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}`;
//           window.open(url, '_blank');
//         },
//         (err) => {
//           console.error('Ошибка геолокации:', err);
//           alert('Не удалось получить ваше местоположение');
//         }
//       );
//     } else {
//       alert('Геолокация не поддерживается в этом браузере');
//     }
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box maxWidth="900px" mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>
//         {apartment.name || 'Без назви'}
//       </Typography>

//       <Box position="relative" mb={2}>
//         <CardMedia
//           component="img"
//           image={apartment.photos?.[currentIndex]}
//           height="400"
//           sx={{ borderRadius: 2, objectFit: 'cover' }}
//         />
//         <IconButton
//           onClick={handlePrev}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             left: 16,
//             transform: 'translateY(-50%)',
//             bgcolor: 'rgba(0,0,0,0.4)',
//             color: 'white',
//             '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <IconButton
//           onClick={handleNext}
//           sx={{
//             position: 'absolute',
//             top: '50%',
//             right: 16,
//             transform: 'translateY(-50%)',
//             bgcolor: 'rgba(0,0,0,0.4)',
//             color: 'white',
//             '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
//           }}
//         >
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>

//       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//         <Grid container spacing={2}>
//           {[
//             { label: 'Категорія', value: apartment.category },
//             { label: 'Опис', value: apartment.description },
//             { label: 'Місто', value: apartment.city },
//             { label: 'Вулиця', value: apartment.street },
//             { label: 'Номер будинку', value: apartment.houseNumber },
//             { label: 'Район', value: apartment.district },
//             { label: 'Метро', value: apartment.metro },
//             { label: 'Ціна', value: apartment.price ? `${apartment.price} грн/доба` : '' },
//             { label: 'Кімнат', value: apartment.rooms },
//             { label: 'Ліжок', value: apartment.beds },
//             { label: 'Площа', value: apartment.size ? `${apartment.size} м²` : '' },
//             { label: 'Поверх', value: apartment.floor && apartment.totalFloors ? `${apartment.floor} з ${apartment.totalFloors}` : '' },
//             { label: 'Час заїзду', value: apartment.checkIn },
//             { label: 'Час виїзду', value: apartment.checkOut },
//             { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn ? 'Так' : 'Ні' },
//             { label: 'Куріння', value: apartment.smoking ? 'Дозволено' : 'Заборонено' },
//             { label: 'Вечірки', value: apartment.parties ? 'Дозволені' : 'Заборонені' },
//             { label: 'Тварини', value: apartment.pets ? 'Дозволені' : 'Заборонені' },
//             { label: 'Мін. оренда', value: apartment.minRent },
//             { label: 'Документи', value: apartment.reportDocs },
//             { label: 'Застава', value: apartment.deposit },
//             { label: 'Вік орендаря', value: apartment.ageLimit },
//             { label: 'Діти з', value: apartment.childrenFrom },
//             { label: "Ім'я", value: apartment.name },
//             { label: 'Телефони', value: apartment.phones?.join(', ') },
//             { label: 'Зручності', value: apartment.conveniences?.join(', ') },
//           ].map(
//             (item, index) =>
//               item.value && (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Typography variant="body1">
//                     <strong>{item.label}:</strong> {item.value}
//                   </Typography>
//                 </Grid>
//               )
//           )}
//         </Grid>
//       </Paper>

//       {apartment.latitude && apartment.longitude && (
//         <>
//           <Box
//             sx={{
//               height: 400,
//               width: 400,
//               mt: 3,
//               borderRadius: 2,
//               overflow: 'hidden',
//               border: '1px solid #ccc',
//             }}
//           >
//             <Typography variant="h6" gutterBottom>
//               Местоположение объекта
//             </Typography>
//             <LoadScript googleMapsApiKey={GOOGLE_MAPS_API_KEY}>
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={{ lat: apartment.latitude, lng: apartment.longitude }}
//                 zoom={15}
//               >
//                 <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//               </GoogleMap>
//             </LoadScript>
//           </Box>

//           <Box mt={2} textAlign="center">
//             <Button variant="outlined" color="primary" onClick={handleGetDirections}>
//               Проложить маршрут
//             </Button>
//           </Box>
//         </>
//       )}

//       <Box mt={3}>
//         <Button variant="contained" onClick={() => router.back()}>
//           Назад
//         </Button>
//       </Box>
//     </Box>
//   );
// }




// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           if (!response.ok) throw new Error('Не вдалося завантажити квартиру');
//           const data = await response.json();
//           setApartment(data);
//         } catch (error) {
//           console.error('Помилка завантаження:', error);
//         }
//       };

//       fetchApartment();
//     }
//   }, [id]);

//   const handlePrev = () => {
//     setCurrentIndex((prev) => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
//   };

//   const handleGetDirections = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const originLat = pos.coords.latitude;
//           const originLng = pos.coords.longitude;
//           const destLat = apartment.latitude;
//           const destLng = apartment.longitude;

//           const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}`;
//           window.open(url, '_blank');
//         },
//         (err) => {
//           console.error('Ошибка геолокации:', err);
//           alert('Не удалось получить ваше местоположение');
//         }
//       );
//     } else {
//       alert('Геолокация не поддерживается в этом браузере');
//     }
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box maxWidth="900px" mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>
//         {apartment.name || 'Без назви'}
//       </Typography>

//       {/* Фото */}
//       <Box position="relative" mb={2}>
//         <CardMedia
//           component="img"
//           image={apartment.photos?.[currentIndex]}
//           height="400"
//           sx={{ borderRadius: 2, objectFit: 'cover' }}
//         />
//         <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <IconButton onClick={handleNext} sx={arrowStyle('right')}>
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>

//       {/* Информация */}
//       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//         <Grid container spacing={2}>
//           {[
//             { label: 'Категорія', value: apartment.category },
//             { label: 'Опис', value: apartment.description },
//             { label: 'Місто', value: apartment.city },
//             { label: 'Вулиця', value: apartment.street },
//             { label: 'Номер будинку', value: apartment.houseNumber },
//             { label: 'Район', value: apartment.district },
//             { label: 'Метро', value: apartment.metro },
//             { label: 'Ціна', value: apartment.price ? `${apartment.price} грн/доба` : '' },
//             { label: 'Кімнат', value: apartment.rooms },
//             { label: 'Ліжок', value: apartment.beds },
//             { label: 'Площа', value: apartment.size ? `${apartment.size} м²` : '' },
//             {
//               label: 'Поверх',
//               value:
//                 apartment.floor && apartment.totalFloors
//                   ? `${apartment.floor} з ${apartment.totalFloors}`
//                   : '',
//             },
//             { label: 'Час заїзду', value: apartment.checkIn },
//             { label: 'Час виїзду', value: apartment.checkOut },
//             { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn ? 'Так' : 'Ні' },
//             { label: 'Куріння', value: apartment.smoking ? 'Дозволено' : 'Заборонено' },
//             { label: 'Вечірки', value: apartment.parties ? 'Дозволені' : 'Заборонені' },
//             { label: 'Тварини', value: apartment.pets ? 'Дозволені' : 'Заборонені' },
//             { label: 'Мін. оренда', value: apartment.minRent },
//             { label: 'Документи', value: apartment.reportDocs },
//             { label: 'Застава', value: apartment.deposit },
//             { label: 'Вік орендаря', value: apartment.ageLimit },
//             { label: 'Діти з', value: apartment.childrenFrom },
//             { label: "Ім'я", value: apartment.name },
//             { label: 'Телефони', value: apartment.phones?.join(', ') },
//             { label: 'Зручності', value: apartment.conveniences?.join(', ') },
//           ].map(
//             (item, index) =>
//               item.value && (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Typography variant="body1">
//                     <strong>{item.label}:</strong> {item.value}
//                   </Typography>
//                 </Grid>
//               )
//           )}
//         </Grid>
//       </Paper>

//       {/* Карта */}
//       {apartment.latitude && apartment.longitude && (
//         <>
//           <Typography variant="h6" mt={4} mb={1}>
//             Местоположение объекта
//           </Typography>

//           <Box
//             sx={{
//               height: 400,
//               mt: 1,
//               borderRadius: 2,
//               overflow: 'hidden',
//               border: '1px solid #ccc',
//             }}
//           >
//             {isLoaded ? (
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={{ lat: apartment.latitude, lng: apartment.longitude }}
//                 zoom={15}
//               >
//                 <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//               </GoogleMap>
//             ) : (
//               <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                 <CircularProgress />
//               </Box>
//             )}
//           </Box>

//           <Box mt={2} textAlign="center">
//             <Button variant="outlined" color="primary" onClick={handleGetDirections}>
//               Проложить маршрут
//             </Button>
//           </Box>
//         </>
//       )}

//       <Box mt={3}>
//         <Button variant="contained" onClick={() => router.back()}>
//           Назад
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// const arrowStyle = (side) => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: 16,
//   transform: 'translateY(-50%)',
//   bgcolor: 'rgba(0,0,0,0.4)',
//   color: 'white',
//   '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
// });


// в етом компоненте показывается отдельная  страница где показывается
//карта одиночного обявления


// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;

//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);
//   const [userApartments, setUserApartments] = useState([]);

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           const data = await response.json();
//           console.log('Apartment data:', data);
//           setApartment(data);

//           if (data.userId) {
//             fetchUserApartments(data.userId, data._id);
//           }
//         } catch (error) {
//           console.error('Помилка завантаження квартири:', error);
//         }
//       };

//       fetchApartment();
//     }
//   }, [id]);

//   const fetchUserApartments = async (userId, currentApartmentId) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/v1/apartments/user/${userId}`);
//       const data = await res.json();
//       const filtered = data.filter((apt) => apt._id !== currentApartmentId);
//       console.log('Other user apartments:', filtered);
//       setUserApartments(filtered);
//     } catch (error) {
//       console.error('Помилка завантаження обʼяв користувача:', error);
//     }
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? apartment.photos.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === apartment.photos.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handleGetDirections = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const originLat = pos.coords.latitude;
//           const originLng = pos.coords.longitude;
//           const destLat = apartment.latitude;
//           const destLng = apartment.longitude;
//           const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}`;
//           window.open(url, '_blank');
//         },
//         () => {
//           alert('Не вдалося отримати ваше місцезнаходження');
//         }
//       );
//     } else {
//       alert('Геолокація не підтримується в цьому браузері');
//     }
//   };

//   if (!apartment) {
//     return (
//       <Box display="flex" justifyContent="center" mt={10}>
//         <CircularProgress />
//       </Box>
//     );
//   }

//   console.log('userId from apartment:', apartment.userId);

//   return (
//     <Box maxWidth="900px" mx="auto" mt={4} p={2}>
//       <Typography variant="h4" gutterBottom>
//         {apartment.name || 'Без назви'}
//       </Typography>

//       {/* Фото */}
//       <Box position="relative" mb={2}>
//         <CardMedia
//           component="img"
//           image={apartment.photos?.[currentIndex]}
//           height="400"
//           sx={{ borderRadius: 2, objectFit: 'cover' }}
//         />
//         <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
//           <ArrowBackIosNewIcon />
//         </IconButton>
//         <IconButton onClick={handleNext} sx={arrowStyle('right')}>
//           <ArrowForwardIosIcon />
//         </IconButton>
//       </Box>

//       {/* Информация */}
//       <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
//         <Grid container spacing={2}>
//           {[
//             { label: 'Категорія', value: apartment.category },
//             { label: 'Опис', value: apartment.description },
//             { label: 'Місто', value: apartment.city },
//             { label: 'Вулиця', value: apartment.street },
//             { label: 'Номер будинку', value: apartment.houseNumber },
//             { label: 'Район', value: apartment.district },
//             { label: 'Метро', value: apartment.metro },
//             { label: 'Ціна', value: apartment.price ? `${apartment.price} грн/доба` : '' },
//             { label: 'Кімнат', value: apartment.rooms },
//             { label: 'Ліжок', value: apartment.beds },
//             { label: 'Площа', value: apartment.size ? `${apartment.size} м²` : '' },
//             {
//               label: 'Поверх',
//               value:
//                 apartment.floor && apartment.totalFloors
//                   ? `${apartment.floor} з ${apartment.totalFloors}`
//                   : '',
//             },
//             { label: 'Час заїзду', value: apartment.checkIn },
//             { label: 'Час виїзду', value: apartment.checkOut },
//             { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn ? 'Так' : 'Ні' },
//             { label: 'Куріння', value: apartment.smoking ? 'Дозволено' : 'Заборонено' },
//             { label: 'Вечірки', value: apartment.parties ? 'Дозволені' : 'Заборонені' },
//             { label: 'Тварини', value: apartment.pets ? 'Дозволені' : 'Заборонені' },
//             { label: 'Мін. оренда', value: apartment.minRent },
//             { label: 'Документи', value: apartment.reportDocs },
//             { label: 'Застава', value: apartment.deposit },
//             { label: 'Вік орендаря', value: apartment.ageLimit },
//             { label: 'Діти з', value: apartment.childrenFrom },
//             { label: "Ім'я", value: apartment.name },
//             { label: 'Телефони', value: apartment.phones?.join(', ') },
//             { label: 'Зручності', value: apartment.conveniences?.join(', ') },
//           ].map(
//             (item, index) =>
//               item.value && (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Typography variant="body1">
//                     <strong>{item.label}:</strong> {item.value}
//                   </Typography>
//                 </Grid>
//               )
//           )}
//         </Grid>
//       </Paper>

//       {/* Карта */}
//       {apartment.latitude && apartment.longitude && (
//         <>
//           <Typography variant="h6" mt={4} mb={1}>
//             Місцезнаходження
//           </Typography>

//           <Box
//             sx={{
//               height: 400,
//               mt: 1,
//               borderRadius: 2,
//               overflow: 'hidden',
//               border: '1px solid #ccc',
//             }}
//           >
//             {isLoaded ? (
//               <GoogleMap
//                 mapContainerStyle={{ width: '100%', height: '100%' }}
//                 center={{ lat: apartment.latitude, lng: apartment.longitude }}
//                 zoom={15}
//               >
//                 <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//               </GoogleMap>
//             ) : (
//               <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                 <CircularProgress />
//               </Box>
//             )}
//           </Box>

//           <Box mt={2} textAlign="center">
//             <Button variant="outlined" color="primary" onClick={handleGetDirections}>
//               Прокласти маршрут
//             </Button>
//           </Box>
//         </>
//       )}

//       {/* Інші оголошення користувача */}
//       {apartment.userId && (
//         <Box mt={6}>
//           <Typography variant="h6" gutterBottom>
//             Інші оголошення цього користувача
//           </Typography>

//           <Grid container spacing={2}>
//             {userApartments.slice(0, 3).map((apt) => (
//               <Grid item xs={12} sm={6} md={4} key={apt._id}>
//                 <Paper
//                   elevation={2}
//                   sx={{ p: 1, cursor: 'pointer' }}
//                   onClick={() => router.push(`/apartment/${apt._id}`)}
//                 >
//                   <CardMedia
//                     component="img"
//                     image={apt.photos?.[0]}
//                     height="140"
//                     sx={{ borderRadius: 1, objectFit: 'cover' }}
//                   />
//                   <Typography variant="subtitle1">{apt.name || 'Без назви'}</Typography>
//                   <Typography variant="body2" color="text.secondary">
//                     {apt.city}, {apt.street}
//                   </Typography>
//                 </Paper>
//               </Grid>
//             ))}
//           </Grid>

//           {/* КНОПКА – всегда отображается если userId есть */}
//           <Box mt={2} textAlign="center">
//             <Button
//               variant="contained"
//               sx={{ backgroundColor: '#1976d2', color: 'white' }}
//               onClick={() => router.push(`/user-apartments/${apartment.userId}`)}
// >
//               Показати всі оголошення користувача
//             </Button>
//           </Box>
//         </Box>
//       )}

//       {/* Назад */}
//       <Box mt={3}>
//         <Button variant="contained" onClick={() => router.back()}>
//           Назад
//         </Button>
//       </Box>
//     </Box>
//   );
// }

// const arrowStyle = (side) => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: 16,
//   transform: 'translateY(-50%)',
//   bgcolor: 'rgba(0,0,0,0.4)',
//   color: 'white',
//   '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
// });





// 'use client';

// import { useRouter } from 'next/router';
// import { useEffect, useState } from 'react';
// import {
//   Box,
//   Typography,
//   CardMedia,
//   IconButton,
//   Button,
//   CircularProgress,
//   Grid,
//   Paper,
//   Chip,
//   Divider,
//   Stack,
//   Rating,
//   Avatar,
//   Tabs,
//   Tab,
//   useMediaQuery,
//   ThemeProvider,
//   createTheme
// } from '@mui/material';
// import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
// import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
// import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
// import ShareIcon from '@mui/icons-material/Share';
// import LocationOnIcon from '@mui/icons-material/LocationOn';
// import DirectionsIcon from '@mui/icons-material/Directions';
// import ApartmentIcon from '@mui/icons-material/Apartment';
// import HotelIcon from '@mui/icons-material/Hotel';
// import BathtubIcon from '@mui/icons-material/Bathtub';
// import WifiIcon from '@mui/icons-material/Wifi';
// import LocalParkingIcon from '@mui/icons-material/LocalParking';
// import PetsIcon from '@mui/icons-material/Pets';
// import SmokingRoomsIcon from '@mui/icons-material/SmokingRooms';
// import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
// import Header from '@/app/components/Header';
// import { LanguageProvider } from '@/app/LanguageContext';

// const theme = createTheme({
//   palette: {
//     primary: {
//       main: '#3f51b5',
//     },
//     secondary: {
//       main: '#f50057',
//     },
//   },
// });

// export default function ApartmentDetailPage() {
//   const router = useRouter();
//   const { id } = router.query;
//   const isMobile = useMediaQuery('(max-width:600px)');
//   const [currentIndex, setCurrentIndex] = useState(0);
//   const [apartment, setApartment] = useState(null);
//   const [userApartments, setUserApartments] = useState([]);
//   const [activeTab, setActiveTab] = useState(0);
//   const [isFavorite, setIsFavorite] = useState(false);

//   const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const { isLoaded } = useJsApiLoader({
//     googleMapsApiKey: GOOGLE_MAPS_API_KEY,
//   });

//   useEffect(() => {
//     if (id) {
//       const fetchApartment = async () => {
//         try {
//           const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
//           const data = await response.json();
//           setApartment(data);

//           if (data.userId) {
//             fetchUserApartments(data.userId, data._id);
//           }
//         } catch (error) {
//           console.error('Помилка завантаження квартири:', error);
//         }
//       };

//       fetchApartment();
//     }
//   }, [id]);

//   const fetchUserApartments = async (userId, currentApartmentId) => {
//     try {
//       const res = await fetch(`http://localhost:3000/api/v1/apartments/user/${userId}`);
//       const data = await res.json();
//       const filtered = data.filter((apt) => apt._id !== currentApartmentId);
//       setUserApartments(filtered);
//     } catch (error) {
//       console.error('Помилка завантаження обʼяв користувача:', error);
//     }
//   };

//   const handlePrev = () => {
//     setCurrentIndex((prev) =>
//       prev === 0 ? apartment.photos.length - 1 : prev - 1
//     );
//   };

//   const handleNext = () => {
//     setCurrentIndex((prev) =>
//       prev === apartment.photos.length - 1 ? 0 : prev + 1
//     );
//   };

//   const handleGetDirections = () => {
//     if (navigator.geolocation) {
//       navigator.geolocation.getCurrentPosition(
//         (pos) => {
//           const originLat = pos.coords.latitude;
//           const originLng = pos.coords.longitude;
//           const destLat = apartment.latitude;
//           const destLng = apartment.longitude;
//           const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}`;
//           window.open(url, '_blank');
//         },
//         () => {
//           alert('Не вдалося отримати ваше місцезнаходження');
//         }
//       );
//     } else {
//       alert('Геолокація не підтримується в цьому браузері');
//     }
//   };

//   const handleShare = () => {
//     if (navigator.share) {
//       navigator.share({
//         title: apartment.name || 'Оренда квартири',
//         text: `Перегляньте це оголошення про оренду: ${apartment.name}`,
//         url: window.location.href,
//       }).catch(console.error);
//     } else {
//       navigator.clipboard.writeText(window.location.href);
//       alert('Посилання скопійовано в буфер обміну');
//     }
//   };

//   const handleTabChange = (event, newValue) => {
//     setActiveTab(newValue);
//   };

//   const toggleFavorite = () => {
//     setIsFavorite(!isFavorite);
//     // Здесь можно добавить вызов API для сохранения в избранное
//   };

//   if (!apartment) {
   
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   const renderAmenities = () => {
//     const amenities = [
//       { icon: <WifiIcon />, label: 'Wi-Fi', value: apartment.conveniences?.includes('WiFi') },
//       { icon: <LocalParkingIcon />, label: 'Парковка', value: apartment.conveniences?.includes('Парковка') },
//       { icon: <PetsIcon />, label: 'Тварини', value: apartment.pets },
//       { icon: <SmokingRoomsIcon />, label: 'Куріння', value: apartment.smoking },
//     ];

//     return (
//       <Stack direction="row" spacing={1} sx={{ flexWrap: 'wrap', gap: 1 }}>
//         {amenities.map((item, index) => (
//           item.value && (
//             <Chip
//               key={index}
//               icon={item.icon}
//               label={item.label}
//               variant="outlined"
//               size="small"
//               sx={{ borderColor: '#3f51b5', color: '#3f51b5' }}
//             />
//           )
//         ))}
//       </Stack>
//     );
//   };

//   const renderHighlights = () => {
//     const highlights = [
//       { icon: <ApartmentIcon />, label: 'Кімнат', value: apartment.rooms },
//       { icon: <HotelIcon />, label: 'Ліжок', value: apartment.beds },
//       { icon: <BathtubIcon />, label: 'Площа', value: apartment.size ? `${apartment.size} м²` : null },
//       { 
//         icon: <LocationOnIcon />, 
//         label: 'Поверх', 
//         value: apartment.floor && apartment.totalFloors 
//           ? `${apartment.floor} з ${apartment.totalFloors}` 
//           : null 
//       },
//     ];

//     return (
//       <Grid container spacing={2} sx={{ mt: 1 }}>
//         {highlights.map((item, index) => (
//           item.value && (
//             <Grid item xs={6} sm={3} key={index}>
//               <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
//                 <Box sx={{ color: '#3f51b5' }}>{item.icon}</Box>
//                 <Typography variant="body2" color="text.secondary">
//                   {item.label}
//                 </Typography>
//                 <Typography variant="h6" fontWeight="bold">
//                   {item.value}
//                 </Typography>
//               </Paper>
//             </Grid>
//           )
//         ))}
//       </Grid>
//     );
//   };

//   return (
//     <ThemeProvider theme={theme}>
     
//       <Box maxWidth="1200px" mx="auto" mt={isMobile ? 1 : 4} p={isMobile ? 1 : 3}>
//       <LanguageProvider defaultLanguage="uk">
//       <Header/>
//       </LanguageProvider>
//         {/* Заголовок и кнопки действий */}
//         <Box display="flex" justifyContent="space-between" alignItems="center" mb={2}>
//           <Button variant="outlined" onClick={() => router.back()} size="small">
//             Назад
//           </Button>
//           <Box>
//             <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
//               <FavoriteBorderIcon />
//             </IconButton>
//             <IconButton onClick={handleShare}>
//               <ShareIcon />
//             </IconButton>
//           </Box>
//         </Box>

//         {/* Фото */}
//         <Box position="relative" mb={3} sx={{ borderRadius: 3, overflow: 'hidden' }}>
//           <CardMedia
//             component="img"
//             image={apartment.photos?.[currentIndex]}
//             height={isMobile ? 250 : 450}
//             sx={{ objectFit: 'cover' }}
//           />
//           <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
//             <ArrowBackIosNewIcon />
//           </IconButton>
//           <IconButton onClick={handleNext} sx={arrowStyle('right')}>
//             <ArrowForwardIosIcon />
//           </IconButton>
//           <Box sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 1, borderRadius: 1 }}>
//             {`${currentIndex + 1}/${apartment.photos?.length}`}
//           </Box>
//         </Box>

//         {/* Основная информация */}
//         <Box mb={3}>
//           <Typography variant="h4" fontWeight="bold" gutterBottom>
//             {apartment.name || 'Без назви'}
//           </Typography>
          
//           <Box display="flex" alignItems="center" mb={1}>
//             <Rating value={4.5} precision={0.5} readOnly size="small" />
//             <Typography variant="body2" color="text.secondary" ml={1}>
//               (12 відгуків)
//             </Typography>
//           </Box>

//           <Typography variant="subtitle1" gutterBottom>
//             <LocationOnIcon color="primary" fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
//             {[apartment.city, apartment.street, apartment.houseNumber].filter(Boolean).join(', ')}
//           </Typography>

//           {renderAmenities()}
//         </Box>

//         {/* Цена и кнопка бронирования */}
//         <Paper elevation={2} sx={{ p: 2, mb: 3, borderRadius: 2 }}>
//           <Box display="flex" justifyContent="space-between" alignItems="center">
//             <Box>
//               <Typography variant="h5" fontWeight="bold" color="primary">
//                 {apartment.price} грн/доба
//               </Typography>
//               <Typography variant="body2" color="text.secondary">
//                 Мінімальний термін оренди: {apartment.minRent || 1} днів
//               </Typography>
//             </Box>
//             <Button variant="contained" size="large" sx={{ px: 4 }}>
//               Забронювати
//             </Button>
//           </Box>
//         </Paper>

//         {/* Основные характеристики */}
//         {renderHighlights()}

//         {/* Табы с информацией */}
//         <Box sx={{ borderBottom: 1, borderColor: 'divider', mt: 4 }}>
//           <Tabs value={activeTab} onChange={handleTabChange} variant="scrollable">
//             <Tab label="Опис" />
//             <Tab label="Зручності" />
//             <Tab label="Правила" />
//             <Tab label="Розташування" />
//           </Tabs>
//         </Box>

//         <Box sx={{ p: 2 }}>
//           {activeTab === 0 && (
//             <Typography variant="body1" paragraph>
//               {apartment.description || 'Опис відсутній.'}
//             </Typography>
//           )}

//           {activeTab === 1 && (
//             <Grid container spacing={2}>
//               {apartment.conveniences?.map((item, index) => (
//                 <Grid item xs={6} sm={4} md={3} key={index}>
//                   <Box display="flex" alignItems="center">
//                     <Box sx={{ width: 24, height: 24, mr: 1, color: '#3f51b5' }}></Box>
//                     <Typography variant="body2">{item}</Typography>
//                   </Box>
//                 </Grid>
//               ))}
//             </Grid>
//           )}

//           {activeTab === 2 && (
//             <Grid container spacing={2}>
//               {[
//                 { label: 'Час заїзду', value: apartment.checkIn || '14:00' },
//                 { label: 'Час виїзду', value: apartment.checkOut || '12:00' },
//                 { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn ? 'Так' : 'Ні' },
//                 { label: 'Куріння', value: apartment.smoking ? 'Дозволено' : 'Заборонено' },
//                 { label: 'Вечірки', value: apartment.parties ? 'Дозволені' : 'Заборонені' },
//                 { label: 'Тварини', value: apartment.pets ? 'Дозволені' : 'Заборонені' },
//                 { label: 'Документи', value: apartment.reportDocs || 'Потрібен паспорт' },
//                 { label: 'Застава', value: apartment.deposit || 'Не потрібна' },
//                 { label: 'Вік орендаря', value: apartment.ageLimit ? `від ${apartment.ageLimit} років` : 'Немає обмежень' },
//               ].map((item, index) => (
//                 <Grid item xs={12} sm={6} key={index}>
//                   <Typography variant="body1">
//                     <strong>{item.label}:</strong> {item.value}
//                   </Typography>
//                 </Grid>
//               ))}
//             </Grid>
//           )}

//           {activeTab === 3 && apartment.latitude && apartment.longitude && (
//             <Box>
//               <Box
//                 sx={{
//                   height: 400,
//                   mt: 1,
//                   borderRadius: 2,
//                   overflow: 'hidden',
//                   border: '1px solid #ccc',
//                 }}
//               >
//                 {isLoaded ? (
//                   <GoogleMap
//                     mapContainerStyle={{ width: '100%', height: '100%' }}
//                     center={{ lat: apartment.latitude, lng: apartment.longitude }}
//                     zoom={15}
//                   >
//                     <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
//                   </GoogleMap>
//                 ) : (
//                   <Box display="flex" justifyContent="center" alignItems="center" height="100%">
//                     <CircularProgress />
//                   </Box>
//                 )}
//               </Box>

//               <Box mt={2} textAlign="center">
//                 <Button 
//                   variant="outlined" 
//                   startIcon={<DirectionsIcon />}
//                   onClick={handleGetDirections}
//                   sx={{ color: '#3f51b5', borderColor: '#3f51b5' }}
//                 >
//                   Прокласти маршрут
//                 </Button>
//               </Box>

//               <Box mt={3}>
//                 <Typography variant="h6" gutterBottom>
//                   Розташування
//                 </Typography>
//                 <Typography variant="body1" paragraph>
//                   {[apartment.city, apartment.district, apartment.street, apartment.houseNumber].filter(Boolean).join(', ')}
//                 </Typography>
//                 {apartment.metro && (
//                   <Typography variant="body1">
//                     <strong>Метро:</strong> {apartment.metro}
//                   </Typography>
//                 )}
//               </Box>
//             </Box>
//           )}
//         </Box>

//         {/* Інші оголошення користувача */}
//         {userApartments.length > 0 && (
//           <Box mt={6}>
//             <Typography variant="h5" gutterBottom>
//               Інші пропозиції від власника
//             </Typography>

//             <Grid container spacing={3}>
//               {userApartments.slice(0, isMobile ? 2 : 3).map((apt) => (
//                 <Grid item xs={12} sm={6} md={4} key={apt._id}>
//                   <Paper
//                     elevation={3}
//                     sx={{ p: 2, borderRadius: 3, cursor: 'pointer', height: '100%' }}
//                     onClick={() => router.push(`/apartment/${apt._id}`)}
//                   >
//                     <CardMedia
//                       component="img"
//                       image={apt.photos?.[0]}
//                       height="180"
//                       sx={{ borderRadius: 2, objectFit: 'cover', mb: 2 }}
//                     />
//                     <Typography variant="subtitle1" fontWeight="bold" gutterBottom>
//                       {apt.name || 'Без назви'}
//                     </Typography>
//                     <Typography variant="body2" color="text.secondary" gutterBottom>
//                       {apt.city}, {apt.street}
//                     </Typography>
//                     <Typography variant="h6" color="primary" fontWeight="bold">
//                       {apt.price} грн/доба
//                     </Typography>
//                   </Paper>
//                 </Grid>
//               ))}
//             </Grid>

//             {userApartments.length > 3 && (
//               <Box mt={3} textAlign="center">
//                 <Button
//                   variant="outlined"
//                   color="primary"
//                   onClick={() => router.push(`/user-apartments/${apartment.userId}`)}
//                 >
//                   Показати всі ({userApartments.length})
//                 </Button>
//               </Box>
//             )}
//           </Box>
//         )}
//       </Box>
//     </ThemeProvider>
//   );
// }

// const arrowStyle = (side) => ({
//   position: 'absolute',
//   top: '50%',
//   [side]: 16,
//   transform: 'translateY(-50%)',
//   bgcolor: 'rgba(0,0,0,0.4)',
//   color: 'white',
//   '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
// });



'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  Tabs,
  Tab,
  useMediaQuery,
  ThemeProvider,
  createTheme
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import FavoriteBorderIcon from '@mui/icons-material/FavoriteBorder';
import ShareIcon from '@mui/icons-material/Share';
import LocationOnIcon from '@mui/icons-material/LocationOn';
import DirectionsIcon from '@mui/icons-material/Directions';
import ApartmentIcon from '@mui/icons-material/Apartment';
import BathtubIcon from '@mui/icons-material/Bathtub';
import LocalPhoneIcon from '@mui/icons-material/LocalPhone';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';
import Header from '@/app/components/Header';
import { useSwipeable } from 'react-swipeable';
import { LanguageProvider } from '@/app/LanguageContext';

const theme = createTheme({
  palette: {
    primary: { main: '#3f51b5' },
    secondary: { main: '#f50057' },
  },
});

export default function ApartmentDetailPage() {
  const router = useRouter();
  const { id } = router.query;
  const isMobile = useMediaQuery('(max-width:600px)');
  const [currentIndex, setCurrentIndex] = useState(0);
  const [apartment, setApartment] = useState(null);
  const [isFavorite, setIsFavorite] = useState(false);
  const [activeTab, setActiveTab] = useState(0);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;
  const { isLoaded } = useJsApiLoader({ googleMapsApiKey: GOOGLE_MAPS_API_KEY });

  const swipeHandlers = useSwipeable({
    onSwipedLeft: () => handleNext(),
    onSwipedRight: () => handlePrev(),
    trackMouse: true,
    preventDefaultTouchmoveEvent: true
  });

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          const data = await response.json();
          setApartment(data);
        } catch (error) {
          console.error('Помилка завантаження квартири:', error);
        }
      };
      fetchApartment();
    }
  }, [id]);

  const handlePrev = () => {
    setCurrentIndex(prev => (prev === 0 ? apartment.photos.length - 1 : prev - 1));
  };

  const handleNext = () => {
    setCurrentIndex(prev => (prev === apartment.photos.length - 1 ? 0 : prev + 1));
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const url = `https://www.google.com/maps/dir/?api=1&origin=${pos.coords.latitude},${pos.coords.longitude}&destination=${apartment.latitude},${apartment.longitude}`;
          window.open(url, '_blank');
        },
        () => alert('Не вдалося отримати ваше місцезнаходження')
      );
    } else {
      alert('Геолокація не підтримується в цьому браузері');
    }
  };

  const handleShare = () => {
    if (navigator.share) {
      navigator.share({
        title: apartment.name || 'Оренда квартири',
        text: `Перегляньте це оголошення: ${apartment.name}`,
        url: window.location.href,
      }).catch(console.error);
    } else {
      navigator.clipboard.writeText(window.location.href);
      alert('Посилання скопійовано');
    }
  };

  const toggleFavorite = () => setIsFavorite(!isFavorite);

  const handleTabChange = (event, newValue) => setActiveTab(newValue);

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="80vh">
        <CircularProgress />
      </Box>
    );
  }

  const renderHighlights = () => (
    <Grid container spacing={2} sx={{ mt: 2 }}>
      {[{ icon: <ApartmentIcon />, label: 'Кімнат', value: apartment.rooms },
        { icon: <BathtubIcon />, label: 'Спальних місць', value: apartment.beds },
        { icon: <LocationOnIcon />, label: 'Площа', value: `${apartment.size} м²` },
        { icon: <LocationOnIcon />, label: 'Поверх', value: apartment.floor && apartment.totalFloors ? `${apartment.floor} з ${apartment.totalFloors}` : null },
      ].map((item, index) => (
        <Grid item xs={6} sm={3} key={index}>
          <Paper elevation={0} sx={{ p: 2, textAlign: 'center', borderRadius: 2 }}>
            <Box sx={{ color: '#3f51b5' }}>{item.icon}</Box>
            <Typography variant="body2" color="text.secondary">{item.label}</Typography>
            <Typography variant="h6" fontWeight="bold">{item.value}</Typography>
          </Paper>
        </Grid>
      ))}
    </Grid>
  );

  return (
    <ThemeProvider theme={theme}>
      <Box maxWidth="1200px" mx="auto" mt={isMobile ? 1 : 4} p={isMobile ? 1 : 3}>
        <LanguageProvider>
          <Header />
        </LanguageProvider>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3}>
          <Button variant="outlined" onClick={() => router.back()} size="small">Назад</Button>
          <Box>
            <IconButton onClick={toggleFavorite} color={isFavorite ? "secondary" : "default"}>
              <FavoriteBorderIcon />
            </IconButton>
            <IconButton onClick={handleShare}>
              <ShareIcon />
            </IconButton>
          </Box>
        </Box>

        <Box mb={2}>
          <Chip label={apartment.category || "Категорія"} color="primary" size="small" sx={{ mb: 1 }} />
          <Typography variant="h5" fontWeight="bold" gutterBottom>
            {apartment.name || "Без назви"}
          </Typography>
          <Typography variant="subtitle1" gutterBottom>
            <LocationOnIcon color="primary" fontSize="small" sx={{ verticalAlign: 'middle', mr: 1 }} />
            {[apartment.city, apartment.street, apartment.houseNumber, apartment.district].filter(Boolean).join(', ')}
          </Typography>
        </Box>

        <Box position="relative" mb={2} sx={{ borderRadius: 3, overflow: 'hidden' }} {...swipeHandlers}>
          <CardMedia
            component="img"
            image={apartment.photos?.[currentIndex]}
            height={isMobile ? 250 : 450}
            sx={{ objectFit: 'cover', userSelect: 'none', touchAction: 'pan-y' }}
          />
          <IconButton onClick={handlePrev} sx={arrowStyle('left')}><ArrowBackIosNewIcon /></IconButton>
          <IconButton onClick={handleNext} sx={arrowStyle('right')}><ArrowForwardIosIcon /></IconButton>
          <Box sx={{ position: 'absolute', bottom: 16, right: 16, bgcolor: 'rgba(0,0,0,0.6)', color: 'white', px: 1, borderRadius: 1 }}>
            {`${currentIndex + 1}/${apartment.photos?.length}`}
          </Box>
        </Box>

        <Box display="flex" justifyContent="space-between" alignItems="center" mb={3} flexWrap="wrap" gap={2}>
          <Box>
            <Typography variant="subtitle1" fontWeight="bold">{apartment.ownerName || "Ім'я не вказано"}</Typography>
            <Typography variant="body1">{apartment.phone || "Телефон не вказано"}</Typography>
          </Box>
          {apartment.phone && (
            <Button variant="contained" startIcon={<LocalPhoneIcon />} href={`tel:${apartment.phone}`} sx={{ px: 3, py: 1, borderRadius: 2 }}>
              Зателефонувати
            </Button>
          )}
        </Box>

        <Box mb={3}>
          <Typography variant="h5" fontWeight="bold" color="primary">
            {apartment.price} грн/доба
          </Typography>
          <Typography variant="body2" color="text.secondary">
            Мінімальний термін оренди: {apartment.minRent || 3} дні
          </Typography>
        </Box>

        {renderHighlights()}
        <Divider sx={{ my: 3 }} />

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Опис</Typography>
          <Typography variant="body1" paragraph>{apartment.description || 'Опис відсутній.'}</Typography>
        </Box>

        <Box mb={3}>
          <Typography variant="h6" gutterBottom>Розташування</Typography>
          <Box sx={{ height: 300, borderRadius: 2, overflow: 'hidden', border: '1px solid #ccc', mb: 2 }}>
            {isLoaded ? (
              <GoogleMap
                mapContainerStyle={{ width: '100%', height: '100%' }}
                center={{ lat: apartment.latitude, lng: apartment.longitude }}
                zoom={15}
              >
                <Marker position={{ lat: apartment.latitude, lng: apartment.longitude }} />
              </GoogleMap>
            ) : (
              <Box display="flex" justifyContent="center" alignItems="center" height="100%">
                <CircularProgress />
              </Box>
            )}
          </Box>
          <Button variant="outlined" startIcon={<DirectionsIcon />} onClick={handleGetDirections} fullWidth>
            Прокласти маршрут
          </Button>
        </Box>
      </Box>
    </ThemeProvider>
  );
}

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 16,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.4)',
  color: 'white',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.7)' },
});
