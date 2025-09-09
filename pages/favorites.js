

// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
// import axios from 'axios';

// export default function Favorites() {
//   const [profile, setProfile] = useState(null);
//   const [favoriteApartments, setFavoriteApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const loadFavorites = async () => {
//     try {
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
//         setProfile(profileData);
        
//         const response = await axios.get(
//           'http://localhost:3000/api/v1/apartments/favorites/user',
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (response.data.success) {
//           setFavoriteApartments(response.data.favorites);
//         } else {
//           setError('Ошибка при загрузке избранного');
//         }
//       } else {
//         setError('Пользователь не авторизован');
//       }
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//       setError('Ошибка при загрузке избранного');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFavoriteToggle = async (apartmentId) => {
//     try {
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         const profileData = JSON.parse(userProfile);
        
//         const response = await axios.post(
//           'http://localhost:3000/api/v1/apartments/favorites/toggle', 
//           { apartmentId },
//           { headers: { 'user-id': profileData._id } }
//         );
        
//         if (response.data.success) {
//           // ОБНОВЛЯЕМ ЛОКАЛЬНОЕ СОСТОЯНИЕ - УДАЛЯЕМ КАРТОЧКУ
//           setFavoriteApartments(prevApartments => 
//             prevApartments.filter(apartment => apartment._id !== apartmentId)
//           );
          
//           // Обновляем localStorage
//           const currentFavorites = JSON.parse(localStorage.getItem('apartment_favorites') || '{}');
//           const updatedFavorites = { ...currentFavorites };
//           delete updatedFavorites[apartmentId];
//           localStorage.setItem('apartment_favorites', JSON.stringify(updatedFavorites));
          
//           showSnackbar(response.data.message, 'success');
//         }
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
//       showSnackbar('Ошибка при обновлении избранного', 'error');
//     }
//   };

//   const handleRetry = () => {
//     setError(null);
//     setLoading(true);
//     loadFavorites();
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//           <Box sx={{ p: 3, textAlign: 'center' }}>
//             <Typography variant="h5" color="error" gutterBottom>
//               {error}
//             </Typography>
//             <Button variant="contained" onClick={handleRetry}>
//               Попробовать снова
//             </Button>
//           </Box>
//         </LanguageProvider>
//       </Provider>
//     );
//   }

//   return (
//     <div>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h4" gutterBottom>
//               Избранное ({favoriteApartments.length})
//             </Typography>
            
//             {!profile ? (
//               <Typography variant="body1">
//                 Пожалуйста, войдите чтобы увидеть избранное
//               </Typography>
//             ) : favoriteApartments.length === 0 ? (
//               <Typography variant="body1">
//                 У вас пока нет избранных объявлений
//               </Typography>
//             ) : (
//              // В Favorites.js изменим передачу пропсов:
// <Apartments 
//   favoriteIds={favoriteApartments.map(apt => apt._id)}
//   onFavoriteToggle={handleFavoriteToggle}
//   onFavoriteRemoved={(apartmentId) => {
//     // Немедленно удаляем из локального состояния
//     setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
//   }}
//   showActions={false}
// />
//             )}
//           </Box>

//           <Snackbar
//             open={snackbar.open}
//             autoHideDuration={2000}
//             onClose={() => setSnackbar({ ...snackbar, open: false })}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//           >
//             <Alert 
//               severity={snackbar.severity} 
//               onClose={() => setSnackbar({ ...snackbar, open: false })}
//             >
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         </LanguageProvider>
//       </Provider>
//     </div>
//   );
// }



// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect, useState, useCallback } from "react";
// import { Box, Typography, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
// import axios from 'axios';

// // Добавляем задержку между запросами
// const API_DELAY = 500;
// let lastRequestTime = 0;

// const delayedRequest = async (requestFn) => {
//   const now = Date.now();
//   const timeSinceLastRequest = now - lastRequestTime;
  
//   if (timeSinceLastRequest < API_DELAY) {
//     await new Promise(resolve => setTimeout(resolve, API_DELAY - timeSinceLastRequest));
//   }
  
//   lastRequestTime = Date.now();
//   return requestFn();
// };

// export default function Favorites() {
//   const [profile, setProfile] = useState(null);
//   const [favoriteApartments, setFavoriteApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [error, setError] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//   useEffect(() => {
//     loadFavorites();
//   }, []);

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const loadFavorites = async () => {
//     try {
//       setLoading(true);
//       const userProfile = localStorage.getItem('user_profile');
      
//       if (!userProfile) {
//         setError('Пользователь не авторизован');
//         setLoading(false);
//         return;
//       }

//       const profileData = JSON.parse(userProfile);
//       setProfile(profileData);
      
//       const response = await delayedRequest(() => 
//         axios.get(
//           'http://localhost:3000/api/v1/apartments/favorites/user',
//           { 
//             headers: { 'user-id': profileData._id },
//             params: { t: Date.now() }
//           }
//         )
//       );
      
//       if (response.data.success) {
//         setFavoriteApartments(response.data.favorites || []);
//       } else {
//         setError('Ошибка при загрузке избранного');
//       }
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//       if (error.response?.status === 429) {
//         setError('Слишком много запросов. Подождите немного.');
//       } else {
//         setError('Ошибка при загрузке избранного');
//       }
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleFavoriteToggle = async (apartmentId) => {
//     try {
//       const userProfile = localStorage.getItem('user_profile');
//       if (!userProfile) {
//         showSnackbar('Пожалуйста, войдите в систему', 'error');
//         return;
//       }

//       const profileData = JSON.parse(userProfile);
      
//       // Сразу обновляем UI - удаляем из локального состояния
//       setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
      
//       const response = await delayedRequest(() => 
//         axios.post(
//           'http://localhost:3000/api/v1/apartments/favorites/toggle', 
//           { apartmentId },
//           { 
//             headers: { 
//               'user-id': profileData._id,
//               'Content-Type': 'application/json'
//             }
//           }
//         )
//       );
      
//       if (response.data.success) {
//         // Обновляем localStorage
//         const currentFavorites = JSON.parse(localStorage.getItem('apartment_favorites') || '{}');
//         const updatedFavorites = { ...currentFavorites };
        
//         // ВАЖНО: Используем данные из response, а не предполагаем состояние
//         if (response.data.isFavorite) {
//           updatedFavorites[apartmentId] = true;
//           // Если сервер вернул что это избранное, возвращаем обратно в список
//           setFavoriteApartments(prev => [...prev, ...response.data.favorites || []]);
//         } else {
//           delete updatedFavorites[apartmentId];
//           // Уже удалили из состояния выше, ничего не делаем
//         }
        
//         localStorage.setItem('apartment_favorites', JSON.stringify(updatedFavorites));
        
//         showSnackbar(response.data.message, 'success');
        
//         // Перезагружаем данные для полной синхронизации
//         setTimeout(() => loadFavorites(), 100);
//       }
//     } catch (error) {
//       console.error('Error toggling favorite:', error);
      
//       // В случае ошибки возвращаем объявление обратно
//       setTimeout(() => loadFavorites(), 100);
      
//       if (error.response?.status === 429) {
//         showSnackbar('Слишком много запросов. Подождите немного.', 'warning');
//       } else {
//         showSnackbar('Ошибка при обновлении избранного', 'error');
//       }
//     }
//   };

//   const handleFavoriteRemoved = useCallback((apartmentId) => {
//     // Немедленно удаляем из локального состояния
//     setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
    
//     // Обновляем localStorage
//     const currentFavorites = JSON.parse(localStorage.getItem('apartment_favorites') || '{}');
//     const updatedFavorites = { ...currentFavorites };
//     delete updatedFavorites[apartmentId];
//     localStorage.setItem('apartment_favorites', JSON.stringify(updatedFavorites));
//   }, []);

//   const handleRetry = () => {
//     setError(null);
//     setLoading(true);
//     loadFavorites();
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   if (error) {
//     return (
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//           <Box sx={{ p: 3, textAlign: 'center' }}>
//             <Typography variant="h5" color="error" gutterBottom>
//               {error}
//             </Typography>
//             <Button variant="contained" onClick={handleRetry}>
//               Попробовать снова
//             </Button>
//           </Box>
//         </LanguageProvider>
//       </Provider>
//     );
//   }

//   return (
//     <div>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//           <Box sx={{ p: 3 }}>
//             <Typography variant="h4" gutterBottom>
//               Избранное ({favoriteApartments.length})
//             </Typography>
            
//             {!profile ? (
//               <Typography variant="body1">
//                 Пожалуйста, войдите чтобы увидеть избранное
//               </Typography>
//             ) : favoriteApartments.length === 0 ? (
//               <Typography variant="body1">
//                 У вас пока нет избранных объявлений
//               </Typography>
//             ) : (
//               <Apartments 
//                 apartments={favoriteApartments} // ПЕРЕДАЕМ МАССИВ ОБЪЯВЛЕНИЙ, а не только ID!
//                 favoriteIds={favoriteApartments.map(apt => apt._id)}
//                 onFavoriteToggle={handleFavoriteToggle}
//                 onFavoriteRemoved={handleFavoriteRemoved}
//                 showActions={false}
//                 isFavoritesPage={true}
//               />
//             )}
//           </Box>

//           <Snackbar
//             open={snackbar.open}
//             autoHideDuration={2000}
//             onClose={handleCloseSnackbar}
//             anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//           >
//             <Alert 
//               severity={snackbar.severity} 
//               onClose={handleCloseSnackbar}
//             >
//               {snackbar.message}
//             </Alert>
//           </Snackbar>
//         </LanguageProvider>
//       </Provider>
//     </div>
//   );
// }

'use client';
import { LanguageProvider } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Apartments from "@/app/components/Apartments";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
import axios from 'axios';

export default function Favorites() {
  const [profile, setProfile] = useState(null);
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  useEffect(() => {
    loadFavorites();
  }, []);

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const loadFavorites = async () => {
    try {
      setLoading(true);
      const userProfile = localStorage.getItem('user_profile');
      
      if (!userProfile) {
        setError('Пользователь не авторизован');
        setLoading(false);
        return;
      }

      const profileData = JSON.parse(userProfile);
      setProfile(profileData);
      
      // Загружаем избранное с сервера
      const response = await axios.get(
        'http://localhost:3000/api/v1/apartments/favorites/user',
        { 
          headers: { 'user-id': profileData._id }
        }
      );
      
      if (response.data.success) {
        setFavoriteApartments(response.data.favorites || []);
      } else {
        setError('Ошибка при загрузке избранного');
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError('Ошибка при загрузке избранного');
      showSnackbar('Ошибка при загрузке избранного', 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (apartmentId) => {
    // ТОЛЬКО удаляем из локального состояния
    // Запрос на сервер будет отправлен через компонент Apartments
    setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
    showSnackbar('Удалено из избранного', 'success');
  };

  const handleRetry = () => {
    setError(null);
    setLoading(true);
    loadFavorites();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  if (error) {
    return (
      <Provider store={store}>
        <LanguageProvider>
          <Header />
          <Box sx={{ p: 3, textAlign: 'center' }}>
            <Typography variant="h5" color="error" gutterBottom>
              {error}
            </Typography>
            <Button variant="contained" onClick={handleRetry}>
              Попробовать снова
            </Button>
          </Box>
        </LanguageProvider>
      </Provider>
    );
  }

  return (
    <div>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
          <Box sx={{ p: 3 }}>
            <Typography variant="h4" gutterBottom>
              Избранное ({favoriteApartments.length})
            </Typography>
            
            {!profile ? (
              <Typography variant="body1">
                Пожалуйста, войдите чтобы увидеть избранное
              </Typography>
            ) : favoriteApartments.length === 0 ? (
              <Typography variant="body1">
                У вас пока нет избранных объявлений
              </Typography>
            ) : (
              <Apartments 
                apartments={favoriteApartments}
                favoriteIds={favoriteApartments.map(apt => apt._id)}
                onFavoriteRemoved={handleRemoveFavorite}
                showActions={false}
                isFavoritesPage={true}
              />
            )}
          </Box>

          <Snackbar
            open={snackbar.open}
            autoHideDuration={2000}
            onClose={handleCloseSnackbar}
            anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
          >
            <Alert 
              severity={snackbar.severity} 
              onClose={handleCloseSnackbar}
            >
              {snackbar.message}
            </Alert>
          </Snackbar>
        </LanguageProvider>
      </Provider>
    </div>
  );
}