



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