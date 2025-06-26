



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
// import FavoriteIcon from '@mui/icons-material/Favorite';

// const Apartments = () => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState({}); // { [id]: true/false }

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

//   const toggleFavorite = (id) => {
//     setFavorites((prev) => ({
//       ...prev,
//       [id]: !prev[id],
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
//           {apartments.map((apartment) => (
//             <Grid item xs={12} sm={6} md={4} key={apartment._id}>
//               <Card>
//                 <Box position="relative">
//                   {apartment.photos && apartment.photos.length > 0 && (
//                     <CardMedia
//                       component="img"
//                       height="200"
//                       image={apartment.photos[0]}
//                       alt="Фото апартаменту"
//                     />
//                   )}
//                   <IconButton
//                     onClick={() => toggleFavorite(apartment._id)}
//                     sx={{
//                       position: 'absolute',
//                       top: 8,
//                       right: 8,
//                       backgroundColor: 'rgba(255,255,255,0.8)',
//                       '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
//                     }}
//                   >
//                     <FavoriteIcon
//                       sx={{
//                         color: favorites[apartment._id] ? 'red' : 'grey',
//                       }}
//                     />
//                   </IconButton>
//                 </Box>
//                 <CardContent>
//                   <Typography variant="subtitle1"><strong>Город:</strong> {apartment.city || 'Не указано'}</Typography>
//                   <Typography variant="subtitle1"><strong>Район:</strong> {apartment.district || 'Не указано'}</Typography>
//                   <Typography variant="subtitle1" color="primary"><strong>Цена:</strong> {apartment.price ? `${apartment.price} грн` : 'Не указано'}</Typography>
//                   <Typography variant="body2" sx={{ mt: 1 }}>
//                     <strong>Описание:</strong> {apartment.description || 'Без опису'}
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
  Box,
  IconButton,
  CardMedia,
  CircularProgress,
} from '@mui/material';
import FavoriteIcon from '@mui/icons-material/Favorite';
import ArrowBackIosNewIcon from '@mui/icons-material/ArrowBackIosNew';
import ArrowForwardIosIcon from '@mui/icons-material/ArrowForwardIos';
import { useSwipeable } from 'react-swipeable';

const ApartmentCard = ({ apartment, isFavorite, toggleFavorite }) => {
  const photos = apartment.photos || [];
  const [currentIndex, setCurrentIndex] = useState(0);

  const handlePrevPhoto = () => {
    setCurrentIndex((prev) => (prev === 0 ? photos.length - 1 : prev - 1));
  };

  const handleNextPhoto = () => {
    setCurrentIndex((prev) => (prev === photos.length - 1 ? 0 : prev + 1));
  };

  const swipeHandlers = useSwipeable({
    onSwipedLeft: handleNextPhoto,
    onSwipedRight: handlePrevPhoto,
    preventDefaultTouchmoveEvent: true,
    trackMouse: true,
  });

  return (
    <Card>
      <Box
        position="relative"
        {...swipeHandlers}
        sx={{
          height: 200,
          overflow: 'hidden',
          borderRadius: 1,
          userSelect: 'none',
          touchAction: 'pan-y',
        }}
      >
        {photos.length > 0 ? (
          <>
            <CardMedia
              component="img"
              height="200"
              image={photos[currentIndex]}
              alt={`Фото апартаменту ${currentIndex + 1}`}
              draggable={false}
              sx={{ objectFit: 'cover' }}
            />

            <IconButton
              onClick={handlePrevPhoto}
              sx={{
                position: 'absolute',
                top: '50%',
                left: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                zIndex: 10,
              }}
              aria-label="Previous photo"
            >
              <ArrowBackIosNewIcon />
            </IconButton>

            <IconButton
              onClick={handleNextPhoto}
              sx={{
                position: 'absolute',
                top: '50%',
                right: 8,
                transform: 'translateY(-50%)',
                bgcolor: 'rgba(0,0,0,0.3)',
                color: 'white',
                '&:hover': { bgcolor: 'rgba(0,0,0,0.5)' },
                zIndex: 10,
              }}
              aria-label="Next photo"
            >
              <ArrowForwardIosIcon />
            </IconButton>

            <Box
              sx={{
                position: 'absolute',
                bottom: 8,
                left: '50%',
                transform: 'translateX(-50%)',
                bgcolor: 'rgba(0,0,0,0.5)',
                color: 'white',
                px: 1.5,
                py: 0.3,
                borderRadius: 1,
                fontSize: '0.75rem',
                userSelect: 'none',
                pointerEvents: 'none',
              }}
            >
              {currentIndex + 1} / {photos.length}
            </Box>
          </>
        ) : (
          <Box
            sx={{
              height: '100%',
              display: 'flex',
              justifyContent: 'center',
              alignItems: 'center',
              bgcolor: '#eee',
              color: '#777',
            }}
          >
            Нет фото
          </Box>
        )}

        <IconButton
          onClick={() => toggleFavorite(apartment._id)}
          sx={{
            position: 'absolute',
            top: 8,
            right: 8,
            backgroundColor: 'rgba(255,255,255,0.8)',
            '&:hover': { backgroundColor: 'rgba(255,255,255,1)' },
            zIndex: 20,
          }}
          aria-label="Toggle favorite"
        >
          <FavoriteIcon sx={{ color: isFavorite ? 'red' : 'grey' }} />
        </IconButton>
      </Box>

      <CardContent>
        <Typography variant="subtitle1">
          <strong>Город:</strong> {apartment.city || 'Не указано'}
        </Typography>
        <Typography variant="subtitle1">
          <strong>Район:</strong> {apartment.district || 'Не указано'}
        </Typography>
        <Typography variant="subtitle1" color="primary">
          <strong>Цена:</strong> {apartment.price ? `${apartment.price} грн` : 'Не указано'}
        </Typography>
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
  );
};

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({}); // { [id]: true/false }

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
        setApartments(response.data);
      } catch (error) {
        console.error('Ошибка при загрузке апартаментов:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  const toggleFavorite = (id) => {
    setFavorites((prev) => ({
      ...prev,
      [id]: !prev[id],
    }));
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container sx={{ py: 4 }}>
      <Typography variant="h4" component="h1" gutterBottom>
        Усі апартаменти
      </Typography>

      {apartments.length === 0 ? (
        <Typography variant="body1">Немає жодного апартаменту</Typography>
      ) : (
        <Grid container spacing={4}>
          {apartments.map((apartment) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <ApartmentCard
                apartment={apartment}
                isFavorite={!!favorites[apartment._id]}
                toggleFavorite={toggleFavorite}
              />
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Apartments;


