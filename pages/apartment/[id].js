




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
} from '@mui/material';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { GoogleMap, Marker, useJsApiLoader } from '@react-google-maps/api';

export default function ApartmentDetailPage() {
  const router = useRouter();
  const { id } = router.query;

  const [currentIndex, setCurrentIndex] = useState(0);
  const [apartment, setApartment] = useState(null);
  const [userApartments, setUserApartments] = useState([]);

  const GOOGLE_MAPS_API_KEY = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const { isLoaded } = useJsApiLoader({
    googleMapsApiKey: GOOGLE_MAPS_API_KEY,
  });

  useEffect(() => {
    if (id) {
      const fetchApartment = async () => {
        try {
          const response = await fetch(`http://localhost:3000/api/v1/apartments/${id}`);
          const data = await response.json();
          console.log('Apartment data:', data);
          setApartment(data);

          if (data.userId) {
            fetchUserApartments(data.userId, data._id);
          }
        } catch (error) {
          console.error('Помилка завантаження квартири:', error);
        }
      };

      fetchApartment();
    }
  }, [id]);

  const fetchUserApartments = async (userId, currentApartmentId) => {
    try {
      const res = await fetch(`http://localhost:3000/api/v1/apartments/user/${userId}`);
      const data = await res.json();
      const filtered = data.filter((apt) => apt._id !== currentApartmentId);
      console.log('Other user apartments:', filtered);
      setUserApartments(filtered);
    } catch (error) {
      console.error('Помилка завантаження обʼяв користувача:', error);
    }
  };

  const handlePrev = () => {
    setCurrentIndex((prev) =>
      prev === 0 ? apartment.photos.length - 1 : prev - 1
    );
  };

  const handleNext = () => {
    setCurrentIndex((prev) =>
      prev === apartment.photos.length - 1 ? 0 : prev + 1
    );
  };

  const handleGetDirections = () => {
    if (navigator.geolocation) {
      navigator.geolocation.getCurrentPosition(
        (pos) => {
          const originLat = pos.coords.latitude;
          const originLng = pos.coords.longitude;
          const destLat = apartment.latitude;
          const destLng = apartment.longitude;
          const url = `https://www.google.com/maps/dir/?api=1&origin=${originLat},${originLng}&destination=${destLat},${destLng}`;
          window.open(url, '_blank');
        },
        () => {
          alert('Не вдалося отримати ваше місцезнаходження');
        }
      );
    } else {
      alert('Геолокація не підтримується в цьому браузері');
    }
  };

  if (!apartment) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  console.log('userId from apartment:', apartment.userId);

  return (
    <Box maxWidth="900px" mx="auto" mt={4} p={2}>
      <Typography variant="h4" gutterBottom>
        {apartment.name || 'Без назви'}
      </Typography>

      {/* Фото */}
      <Box position="relative" mb={2}>
        <CardMedia
          component="img"
          image={apartment.photos?.[currentIndex]}
          height="400"
          sx={{ borderRadius: 2, objectFit: 'cover' }}
        />
        <IconButton onClick={handlePrev} sx={arrowStyle('left')}>
          <ArrowBackIosNewIcon />
        </IconButton>
        <IconButton onClick={handleNext} sx={arrowStyle('right')}>
          <ArrowForwardIosIcon />
        </IconButton>
      </Box>

      {/* Информация */}
      <Paper elevation={3} sx={{ p: 2, borderRadius: 2 }}>
        <Grid container spacing={2}>
          {[
            { label: 'Категорія', value: apartment.category },
            { label: 'Опис', value: apartment.description },
            { label: 'Місто', value: apartment.city },
            { label: 'Вулиця', value: apartment.street },
            { label: 'Номер будинку', value: apartment.houseNumber },
            { label: 'Район', value: apartment.district },
            { label: 'Метро', value: apartment.metro },
            { label: 'Ціна', value: apartment.price ? `${apartment.price} грн/доба` : '' },
            { label: 'Кімнат', value: apartment.rooms },
            { label: 'Ліжок', value: apartment.beds },
            { label: 'Площа', value: apartment.size ? `${apartment.size} м²` : '' },
            {
              label: 'Поверх',
              value:
                apartment.floor && apartment.totalFloors
                  ? `${apartment.floor} з ${apartment.totalFloors}`
                  : '',
            },
            { label: 'Час заїзду', value: apartment.checkIn },
            { label: 'Час виїзду', value: apartment.checkOut },
            { label: 'Цілодобове поселення', value: apartment.fullDayCheckIn ? 'Так' : 'Ні' },
            { label: 'Куріння', value: apartment.smoking ? 'Дозволено' : 'Заборонено' },
            { label: 'Вечірки', value: apartment.parties ? 'Дозволені' : 'Заборонені' },
            { label: 'Тварини', value: apartment.pets ? 'Дозволені' : 'Заборонені' },
            { label: 'Мін. оренда', value: apartment.minRent },
            { label: 'Документи', value: apartment.reportDocs },
            { label: 'Застава', value: apartment.deposit },
            { label: 'Вік орендаря', value: apartment.ageLimit },
            { label: 'Діти з', value: apartment.childrenFrom },
            { label: "Ім'я", value: apartment.name },
            { label: 'Телефони', value: apartment.phones?.join(', ') },
            { label: 'Зручності', value: apartment.conveniences?.join(', ') },
          ].map(
            (item, index) =>
              item.value && (
                <Grid item xs={12} sm={6} key={index}>
                  <Typography variant="body1">
                    <strong>{item.label}:</strong> {item.value}
                  </Typography>
                </Grid>
              )
          )}
        </Grid>
      </Paper>

      {/* Карта */}
      {apartment.latitude && apartment.longitude && (
        <>
          <Typography variant="h6" mt={4} mb={1}>
            Місцезнаходження
          </Typography>

          <Box
            sx={{
              height: 400,
              mt: 1,
              borderRadius: 2,
              overflow: 'hidden',
              border: '1px solid #ccc',
            }}
          >
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

          <Box mt={2} textAlign="center">
            <Button variant="outlined" color="primary" onClick={handleGetDirections}>
              Прокласти маршрут
            </Button>
          </Box>
        </>
      )}

      {/* Інші оголошення користувача */}
      {apartment.userId && (
        <Box mt={6}>
          <Typography variant="h6" gutterBottom>
            Інші оголошення цього користувача
          </Typography>

          <Grid container spacing={2}>
            {userApartments.slice(0, 3).map((apt) => (
              <Grid item xs={12} sm={6} md={4} key={apt._id}>
                <Paper
                  elevation={2}
                  sx={{ p: 1, cursor: 'pointer' }}
                  onClick={() => router.push(`/apartment/${apt._id}`)}
                >
                  <CardMedia
                    component="img"
                    image={apt.photos?.[0]}
                    height="140"
                    sx={{ borderRadius: 1, objectFit: 'cover' }}
                  />
                  <Typography variant="subtitle1">{apt.name || 'Без назви'}</Typography>
                  <Typography variant="body2" color="text.secondary">
                    {apt.city}, {apt.street}
                  </Typography>
                </Paper>
              </Grid>
            ))}
          </Grid>

          {/* КНОПКА – всегда отображается если userId есть */}
          <Box mt={2} textAlign="center">
            <Button
              variant="contained"
              sx={{ backgroundColor: '#1976d2', color: 'white' }}
              onClick={() => router.push(`/user-apartments/${apartment.userId}`)}
>
              Показати всі оголошення користувача
            </Button>
          </Box>
        </Box>
      )}

      {/* Назад */}
      <Box mt={3}>
        <Button variant="contained" onClick={() => router.back()}>
          Назад
        </Button>
      </Box>
    </Box>
  );
}

const arrowStyle = (side) => ({
  position: 'absolute',
  top: '50%',
  [side]: 16,
  transform: 'translateY(-50%)',
  bgcolor: 'rgba(0,0,0,0.4)',
  color: 'white',
  '&:hover': { bgcolor: 'rgba(0,0,0,0.6)' },
});
