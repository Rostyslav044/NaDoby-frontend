

// "use client";

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Box
// } from '@mui/material';

// const Apartments = () => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);

//   useEffect(() => {
//     const fetchApartments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
//         setApartments(response.data);
//       } catch (error) {
//         console.error('Помилка при завантаженні апартаментів:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApartments();
//   }, []);

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Усі апартаменти
//       </Typography>

//       {apartments.length === 0 ? (
//         <Typography variant="body1">Немає жодного апартаменту</Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {apartments.map((apartment) => (
//             <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//               <Card>
//                 {apartment.photos && apartment.photos.length > 0 && (
//                   <CardMedia
//                     component="img"
//                     height="200"
//                     image={apartment.photos[0]}
//                     alt="Фото апартаменту"
//                   />
//                 )}
//                 <CardContent>
//                   <Typography variant="h6">
//                     {apartment.city} — {apartment.district || 'Без району'}
//                   </Typography>
//                   <Typography variant="body2" color="textSecondary">
//                     {apartment.description || 'Без опису'}
//                   </Typography>
//                   <Typography variant="subtitle1" color="primary">
//                     Ціна: {apartment.price} грн
//                   </Typography>
//                   {apartment.metro && (
//                     <Typography variant="caption" color="textSecondary">
//                       Метро: {apartment.metro}
//                     </Typography>
//                   )}
//                 </CardContent>
//               </Card>
//             </Grid>
//           ))}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default Apartments;



'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box
} from '@mui/material';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
        setApartments(response.data);
      } catch (error) {
        console.error('Помилка при завантаженні апартаментів:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Усі апартаменти
      </Typography>

      {apartments.length === 0 ? (
        <Typography variant="body1">Немає жодного апартаменту</Typography>
      ) : (
        <Grid container spacing={4}>
          {apartments.map((apartment) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <Card>
                {apartment.photos && apartment.photos.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={apartment.photos[0]}
                    alt="Фото апартаменту"
                  />
                )}
                <CardContent>
                  <Typography variant="subtitle1"><strong>Город:</strong> {apartment.city || 'Не указано'}</Typography>
                  <Typography variant="subtitle1"><strong>Район:</strong> {apartment.district || 'Не указано'}</Typography>
                  <Typography variant="subtitle1" color="primary"><strong>Цена:</strong> {apartment.price ? `${apartment.price} грн` : 'Не указано'}</Typography>
                  <Typography variant="body2" sx={{ mt: 1 }}>
                    <strong>Описание:</strong> {apartment.description || 'Без опису'}
                  </Typography>
                  {apartment.metro && (
                    <Typography variant="caption" color="textSecondary">
                      Метро: {apartment.metro}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Apartments;





// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Box,
//   IconButton
// } from '@mui/material';
// import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// const Apartments = () => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState({});

//   useEffect(() => {
//     const fetchApartments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
//         setApartments(response.data);
//       } catch (error) {
//         console.error('Помилка при завантаженні апартаментів:', error);
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApartments();
//   }, []);

//   const handlePrevPhoto = (apartmentId, totalPhotos) => {
//     setCurrentPhotoIndex((prev) => ({
//       ...prev,
//       [apartmentId]: (prev[apartmentId] || 0) === 0 ? totalPhotos - 1 : (prev[apartmentId] || 0) - 1
//     }));
//   };

//   const handleNextPhoto = (apartmentId, totalPhotos) => {
//     setCurrentPhotoIndex((prev) => ({
//       ...prev,
//       [apartmentId]: (prev[apartmentId] || 0) === totalPhotos - 1 ? 0 : (prev[apartmentId] || 0) + 1
//     }));
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Container>
//       <Typography variant="h4" component="h1" gutterBottom>
//         Усі апартаменти
//       </Typography>

//       {apartments.length === 0 ? (
//         <Typography variant="body1">Немає жодного апартаменту</Typography>
//       ) : (
//         <Grid container spacing={4}>
//           {apartments.map((apartment) => {
//             const photos = apartment.photos || [];
//             const photoIndex = currentPhotoIndex[apartment._id] || 0;

//             return (
//               <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//                 <Card sx={{ position: 'relative' }}>
//                   {photos.length > 0 && (
//                     <Box sx={{ position: 'relative' }}>
//                       <CardMedia
//                         component="img"
//                         height="200"
//                         image={photos[photoIndex]}
//                         alt="Фото апартаменту"
//                       />
//                       {photos.length > 1 && (
//                         <>
//                           <IconButton
//                             sx={{
//                               position: 'absolute',
//                               top: '50%',
//                               left: 10,
//                               transform: 'translateY(-50%)',
//                               backgroundColor: 'rgba(255,255,255,0.7)',
//                               '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
//                             }}
//                             onClick={() => handlePrevPhoto(apartment._id, photos.length)}
//                           >
//                             <ArrowBackIos />
//                           </IconButton>
//                           <IconButton
//                             sx={{
//                               position: 'absolute',
//                               top: '50%',
//                               right: 10,
//                               transform: 'translateY(-50%)',
//                               backgroundColor: 'rgba(255,255,255,0.7)',
//                               '&:hover': { backgroundColor: 'rgba(255,255,255,0.9)' }
//                             }}
//                             onClick={() => handleNextPhoto(apartment._id, photos.length)}
//                           >
//                             <ArrowForwardIos />
//                           </IconButton>
//                         </>
//                       )}
//                     </Box>
//                   )}

//                   <CardContent>
//                     {/* Новая секция: количество комнат, мест, этаж */}
//                     <Typography variant="body2" sx={{ mb: 1 }}>
//                       <strong>Кімнат:</strong> {apartment.rooms || 'Невідомо'} &nbsp;&nbsp;
//                       <strong>Місць:</strong> {apartment.beds  || 'Невідомо'} &nbsp;&nbsp;
//                       <strong>Поверх:</strong> {apartment.floor || 'Невідомо'}
//                     </Typography>

//                     <Typography variant="subtitle1">
//                       <strong>Город:</strong> {apartment.city || 'Не указано'}
//                     </Typography>
//                     <Typography variant="subtitle1">
//                       <strong>Район:</strong> {apartment.district || 'Не указано'}
//                     </Typography>
//                     <Typography variant="subtitle1" color="primary">
//                       <strong>Ціна:</strong> {apartment.price ? `${apartment.price} грн` : 'Не указано'}
//                     </Typography>
//                     <Typography variant="body2" sx={{ mt: 1 }}>
//                       <strong>Опис:</strong> {apartment.description || 'Без опису'}
//                     </Typography>
//                     {apartment.metro && (
//                       <Typography variant="caption" color="textSecondary">
//                         Метро: {apartment.metro}
//                       </Typography>
//                     )}
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default Apartments;



// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import {
//   Container,
//   Typography,
//   Grid,
//   Card,
//   CardContent,
//   CardMedia,
//   CircularProgress,
//   Box,
//   IconButton,
//   Alert
// } from '@mui/material';
// import { ArrowBackIos, ArrowForwardIos } from '@mui/icons-material';

// const Apartments = () => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [currentPhotoIndex, setCurrentPhotoIndex] = useState({});

//   useEffect(() => {
//     const fetchApartments = async () => {
//       try {
//         const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
        
//         if (!response.data || !Array.isArray(response.data)) {
//           throw new Error('Invalid data format from server');
//         }

//         // Добавляем проверку наличия обязательных полей
//         const validatedApartments = response.data.map(apt => ({
//           ...apt,
//           rooms: apt.rooms || 0,
//           beds: apt.beds || 0,
//           floor: apt.floor || 0,
//           city: apt.city || 'Unknown',
//           district: apt.district || 'Unknown',
//           price: apt.price || 'Price not specified',
//           description: apt.description || 'No description',
//           photos: apt.photos || []
//         }));

//         setApartments(validatedApartments);
//       } catch (err) {
//         console.error('Error fetching apartments:', err);
//         setError(err.response?.data?.message || err.message || 'Failed to load apartments');
//       } finally {
//         setLoading(false);
//       }
//     };

//     fetchApartments();
//   }, []);

//   const handlePrevPhoto = (apartmentId, totalPhotos) => {
//     setCurrentPhotoIndex(prev => ({
//       ...prev,
//       [apartmentId]: (prev[apartmentId] || 0) === 0 ? totalPhotos - 1 : (prev[apartmentId] || 0) - 1
//     }));
//   };

//   const handleNextPhoto = (apartmentId, totalPhotos) => {
//     setCurrentPhotoIndex(prev => ({
//       ...prev,
//       [apartmentId]: (prev[apartmentId] || 0) === totalPhotos - 1 ? 0 : (prev[apartmentId] || 0) + 1
//     }));
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress size={80} />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Container maxWidth="md" sx={{ mt: 4 }}>
//         <Alert severity="error" sx={{ mb: 3 }}>
//           {error}
//         </Alert>
//       </Container>
//     );
//   }

//   return (
//     <Container maxWidth="lg" sx={{ py: 4 }}>
//       <Typography variant="h4" component="h1" gutterBottom sx={{ mb: 4, fontWeight: 'bold' }}>
//         All Apartments
//       </Typography>

//       {apartments.length === 0 ? (
//         <Box textAlign="center" sx={{ mt: 4 }}>
//           <Typography variant="h6">No apartments available</Typography>
//         </Box>
//       ) : (
//         <Grid container spacing={4}>
//           {apartments.map((apartment) => {
//             const photos = apartment.photos || [];
//             const currentIndex = currentPhotoIndex[apartment._id] || 0;

//             return (
//               <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//                 <Card sx={{ height: '100%', display: 'flex', flexDirection: 'column' }}>
//                   {photos.length > 0 && (
//                     <Box sx={{ position: 'relative', height: 200 }}>
//                       <CardMedia
//                         component="img"
//                         height="200"
//                         image={photos[currentIndex]}
//                         alt={`Apartment ${apartment._id}`}
//                         sx={{ objectFit: 'cover' }}
//                       />
//                       {photos.length > 1 && (
//                         <>
//                           <IconButton
//                             sx={{
//                               position: 'absolute',
//                               left: 8,
//                               top: '50%',
//                               transform: 'translateY(-50%)',
//                               bgcolor: 'rgba(255,255,255,0.8)',
//                               '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//                             }}
//                             onClick={() => handlePrevPhoto(apartment._id, photos.length)}
//                           >
//                             <ArrowBackIos />
//                           </IconButton>
//                           <IconButton
//                             sx={{
//                               position: 'absolute',
//                               right: 8,
//                               top: '50%',
//                               transform: 'translateY(-50%)',
//                               bgcolor: 'rgba(255,255,255,0.8)',
//                               '&:hover': { bgcolor: 'rgba(255,255,255,0.9)' }
//                             }}
//                             onClick={() => handleNextPhoto(apartment._id, photos.length)}
//                           >
//                             <ArrowForwardIos />
//                           </IconButton>
//                         </>
//                       )}
//                     </Box>
//                   )}

//                   <CardContent sx={{ flexGrow: 1 }}>
//                     <Box sx={{ mb: 2 }}>
//                       <Typography variant="body1" sx={{ fontWeight: 'bold' }}>
//                         {apartment.city}, {apartment.district}
//                       </Typography>
//                       <Typography variant="body2" color="text.secondary">
//                         {apartment.description}
//                       </Typography>
//                     </Box>

//                     <Grid container spacing={1} sx={{ mb: 2 }}>
//                       <Grid item xs={4}>
//                         <Typography variant="body2">
//                           <strong>Rooms:</strong> {apartment.rooms}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={4}>
//                         <Typography variant="body2">
//                           <strong>Beds:</strong> {apartment.beds}
//                         </Typography>
//                       </Grid>
//                       <Grid item xs={4}>
//                         <Typography variant="body2">
//                           <strong>Floor:</strong> {apartment.floor}
//                         </Typography>
//                       </Grid>
//                     </Grid>

//                     <Typography variant="h6" color="primary" sx={{ fontWeight: 'bold' }}>
//                       {apartment.price} грн
//                     </Typography>
//                   </CardContent>
//                 </Card>
//               </Grid>
//             );
//           })}
//         </Grid>
//       )}
//     </Container>
//   );
// };

// export default Apartments;