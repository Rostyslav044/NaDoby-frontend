


// 'use client';
// import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect, useState } from "react";
// import { Box, Typography, CircularProgress, Button, Snackbar, Alert } from "@mui/material";
// import axios from 'axios';
// import { useRouter } from 'next/navigation';

// const TRANSLATIONS = {
//   ua: {
//     title: "Обране",
//     notAuthorized: "Будь ласка, увійдіть, щоб побачити обране",
//     noFavorites: "У вас поки немає обраних оголошень",
//     errorLoading: "Помилка при завантаженні обраного",
//     removeSuccess: "Видалено з обраного",
//     retry: "Увійти/Зареєструватися",
//     unauthorized: "Користувач не авторизований",
//     userNotAuthorized: "Користувач не авторизований",
//     count: "кількість"
//   },
//   ru: {
//     title: "Избранное", 
//     notAuthorized: "Пожалуйста, войдите чтобы увидеть избранное",
//     noFavorites: "У вас пока нет избранных объявлений",
//     errorLoading: "Ошибка при загрузке избранного",
//     removeSuccess: "Удалено из избранного",
//     retry: "Войти/Зарегистрироваться",
//     unauthorized: "Пользователь не авторизован",
//     userNotAuthorized: "Пользователь не авторизован",
//     count: "количество"
//   }
// }

// function FavoritesContent() {
//   const { currentLanguage } = useLanguage();
//   const t = TRANSLATIONS[currentLanguage];
//   const router = useRouter();
  
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
//         // Устанавливаем только флаг ошибки, текст будем брать из переводов в рендере
//         setError('unauthorized');
//         setLoading(false);
//         return;
//       }

//       const profileData = JSON.parse(userProfile);
//       setProfile(profileData);
      
//       const response = await axios.get(
//         'http://localhost:3000/api/v1/apartments/favorites/user',
//         { 
//           headers: { 'user-id': profileData._id }
//         }
//       );
      
//       if (response.data.success) {
//         setFavoriteApartments(response.data.favorites || []);
//       } else {
//         setError('load_error');
//       }
//     } catch (error) {
//       console.error('Error loading favorites:', error);
//       setError('load_error');
//       showSnackbar(t.errorLoading, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const handleRemoveFavorite = (apartmentId) => {
//     setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
//     showSnackbar(t.removeSuccess, 'success');
//   };

//   const handleRetry = () => {
//     // Перенаправляем на компонент авторизации CreateUser
//     router.push('/create-user');
//   };

//   const handleCloseSnackbar = () => {
//     setSnackbar({ ...snackbar, open: false });
//   };

//   // Функция для получения правильного текста ошибки
//   const getErrorText = () => {
//     if (error === 'unauthorized') {
//       return t.userNotAuthorized;
//     } else if (error === 'load_error') {
//       return t.errorLoading;
//     }
//     return error;
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
//       <Box sx={{ p: 3, textAlign: 'center' }}>
//         <Typography variant="h5" color="error" gutterBottom>
//           {getErrorText()} {/* Используем функцию для получения переведенного текста */}
//         </Typography>
//         <Button variant="contained" onClick={handleRetry}>
//           {t.retry}
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ p: 3 }}>
//       <Typography variant="h4" gutterBottom>
//         {t.title} ({favoriteApartments.length})
//       </Typography>
      
//       {!profile ? (
//         <Typography variant="body1">
//           {t.notAuthorized}
//         </Typography>
//       ) : favoriteApartments.length === 0 ? (
//         <Typography variant="body1">
//           {t.noFavorites}
//         </Typography>
//       ) : (
//         <Apartments 
//           apartments={favoriteApartments}
//           favoriteIds={favoriteApartments.map(apt => apt._id)}
//           onFavoriteRemoved={handleRemoveFavorite}
//           showActions={false}
//           isFavoritesPage={true}
//         />
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2000}
//         onClose={handleCloseSnackbar}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           severity={snackbar.severity} 
//           onClose={handleCloseSnackbar}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>
//     </Box>
//   );
// }

// export default function Favorites() {
//   return (
//     <Provider store={store}>
//       <LanguageProvider>
//         <Header />
//         <FavoritesContent />
//       </LanguageProvider>
//     </Provider>
//   );
// }




'use client';
import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Apartments from "@/app/components/Apartments";
import CreateUser from "@/app/components/CreateUser";
import { useEffect, useState } from "react";
import { Box, Typography, CircularProgress, Button, Snackbar, Alert, Modal } from "@mui/material";
import axios from 'axios';

const TRANSLATIONS = {
  ua: {
    title: "Обране",
    notAuthorized: "Будь ласка, увійдіть, щоб побачити обране",
    noFavorites: "У вас поки немає обраних оголошень",
    errorLoading: "Помилка при завантаженні обраного",
    removeSuccess: "Видалено з обраного",
    retry: "Увійти/Зареєструватися", // Исправлен регистр
    unauthorized: "Користувач не авторизований",
    userNotAuthorized: "Користувач не авторизований",
    count: "кількість"
  },
  ru: {
    title: "Избранное", 
    notAuthorized: "Пожалуйста, войдите чтобы увидеть избранное",
    noFavorites: "У вас пока нет избранных объявлений",
    errorLoading: "Ошибка при загрузке избранного",
    removeSuccess: "Удалено из избранного",
    retry: "Войти/Зарегистрироваться", // Исправлен регистр
    unauthorized: "Пользователь не авторизован",
    userNotAuthorized: "Пользователь не авторизован",
    count: "количество"
  }
}

function FavoritesContent() {
  const { currentLanguage } = useLanguage();
  const t = TRANSLATIONS[currentLanguage];
  
  const [profile, setProfile] = useState(null);
  const [favoriteApartments, setFavoriteApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [authModalOpen, setAuthModalOpen] = useState(false);

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
        setError('unauthorized');
        setLoading(false);
        return;
      }

      const profileData = JSON.parse(userProfile);
      setProfile(profileData);
      
      const response = await axios.get(
        'http://localhost:3000/api/v1/apartments/favorites/user',
        { 
          headers: { 'user-id': profileData._id }
        }
      );
      
      if (response.data.success) {
        setFavoriteApartments(response.data.favorites || []);
      } else {
        setError('load_error');
      }
    } catch (error) {
      console.error('Error loading favorites:', error);
      setError('load_error');
      showSnackbar(t.errorLoading, 'error');
    } finally {
      setLoading(false);
    }
  };

  const handleRemoveFavorite = (apartmentId) => {
    setFavoriteApartments(prev => prev.filter(apt => apt._id !== apartmentId));
    showSnackbar(t.removeSuccess, 'success');
  };

  const handleRetry = () => {
    setAuthModalOpen(true);
  };

  const handleCloseAuthModal = () => {
    setAuthModalOpen(false);
    loadFavorites();
  };

  const handleCloseSnackbar = () => {
    setSnackbar({ ...snackbar, open: false });
  };

  const getErrorText = () => {
    if (error === 'unauthorized') {
      return t.userNotAuthorized;
    } else if (error === 'load_error') {
      return t.errorLoading;
    }
    return error;
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
      <Box sx={{ p: 3, textAlign: 'center' }}>
        <Typography variant="h5" color="error" gutterBottom>
          {getErrorText()}
        </Typography>
        <Button 
          variant="contained" 
          onClick={handleRetry}
          sx={{ textTransform: 'none' }} // Убираем автоматическое преобразование в верхний регистр
        >
          {t.retry}
        </Button>
        
        <Modal
          open={authModalOpen}
          onClose={handleCloseAuthModal}
          aria-labelledby="auth-modal-title"
          aria-describedby="auth-modal-description"
          sx={{
            display: 'flex',
            alignItems: 'center',
            justifyContent: 'center',
          }}
        >
          <Box sx={{
            width: '90%',
            maxWidth: 500,
            bgcolor: 'background.paper',
            borderRadius: 2,
            boxShadow: 24,
            p: 0,
            maxHeight: '90vh',
            overflow: 'auto'
          }}>
            <CreateUser onClose={handleCloseAuthModal} />
          </Box>
        </Modal>
      </Box>
    );
  }

  return (
    <Box sx={{ p: 3 }}>
      <Typography variant="h4" gutterBottom>
        {t.title} ({favoriteApartments.length})
      </Typography>
      
      {!profile ? (
        <Box sx={{ textAlign: 'center' }}>
          <Typography variant="body1" sx={{ mb: 2 }}>
            {t.notAuthorized}
          </Typography>
          <Button 
            variant="contained" 
            onClick={handleRetry}
            sx={{ textTransform: 'none' }} // Убираем автоматическое преобразование в верхний регистр
          >
            {t.retry}
          </Button>
        </Box>
      ) : favoriteApartments.length === 0 ? (
        <Typography variant="body1">
          {t.noFavorites}
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

      <Modal
        open={authModalOpen}
        onClose={handleCloseAuthModal}
        aria-labelledby="auth-modal-title"
        aria-describedby="auth-modal-description"
        sx={{
          display: 'flex',
          alignItems: 'center',
          justifyContent: 'center',
        }}
      >
        <Box sx={{
          width: '90%',
          maxWidth: 500,
          bgcolor: 'background.paper',
          borderRadius: 2,
          boxShadow: 24,
          p: 0,
          maxHeight: '90vh',
          overflow: 'auto'
        }}>
          <CreateUser onClose={handleCloseAuthModal} />
        </Box>
      </Modal>

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
    </Box>
  );
}

export default function Favorites() {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <Header />
        <FavoritesContent />
      </LanguageProvider>
    </Provider>
  );
}