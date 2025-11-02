// Компонент загружает список апартаментов с сервера,
//  показывает загрузку во время ожидания, 
//  а затем отображает список квартир через ApartmentList.
//   Также он позволяет отмечать квартиры как избранные, если пользователь авторизован.





// 'use client';

// import React, { useState, useEffect } from 'react';
// import axios from 'axios';
// import { useSession, SessionProvider } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import {
//   Box,
//   CircularProgress,
//   IconButton,
//   Menu,
//   MenuItem,
//   Snackbar,
//   Alert,
// } from '@mui/material';
// import { MoreVert, Edit, Delete } from '@mui/icons-material';
// import ApartmentList from './ApartmentList';
// import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
// import { useFavorites } from '@/app/hooks/useFavorites';

// const APARTMENTS_TRANSLATIONS = {
//   ua: {
//     deleteConfirm: 'Ви впевнені, що хочете видалити це оголошення?',
//     loadError: 'Помилка при завантаженні апартаментів',
//     deleteSuccess: 'Оголошення успішно видалено!',
//     deleteError: 'Помилка при видаленні оголошення',
//     favoriteError: 'Помилка при оновленні обраного',
//     edit: 'Редагувати',
//     delete: 'Видалити',
//     loginRequired: 'Будь ласка, увійдіть щоб додати в обране',
//     favoriteAdded: 'Додано в обране',
//     favoriteRemoved: 'Видалено з обраного',
//   },
//   ru: {
//     deleteConfirm: 'Вы уверены, что хотите удалить это объявление?',
//     loadError: 'Ошибка при загрузке апартаментов',
//     deleteSuccess: 'Объявление успешно удалено!',
//     deleteError: 'Ошибка при удалении объявления',
//     favoriteError: 'Ошибка при обновлении избранного',
//     edit: 'Редактировать',
//     delete: 'Удалить',
//     loginRequired: 'Пожалуйста, войдите чтобы добавить в избранное',
//     favoriteAdded: 'Добавлено в избранное',
//     favoriteRemoved: 'Удалено из избранного',
//   },
// };

// const ApartmentsContent = ({ userId, showActions = false, favoriteIds, forceRefreshKey, onFavoriteRemoved }) => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

//   const { data: session } = useSession();
//   const router = useRouter();
//   const { currentLanguage } = useLanguage();
//   const t = APARTMENTS_TRANSLATIONS[currentLanguage] || APARTMENTS_TRANSLATIONS.ua;

//   // Используем хук избранного
//   const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

//   useEffect(() => {
//     const loadData = async () => {
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         try {
//           const profileData = JSON.parse(userProfile);
//           setCurrentUser(profileData);
//         } catch (error) {
//           console.error('Error parsing user profile:', error);
//         }
//       }
//       await fetchApartments();
//     };
//     loadData();
//   }, [userId, favoriteIds, forceRefreshKey]);

//   const fetchApartments = async () => {
//     try {
//       let endpoint = 'get-all';
//       if (userId) endpoint = `user-apartment/${userId}`;
//       const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`);
//       let filtered = response.data;
//       if (favoriteIds && favoriteIds.length > 0) {
//         filtered = filtered.filter((apt) => favoriteIds.includes(apt._id));
//       }
//       setApartments(filtered);
//     } catch (error) {
//       console.error(error);
//       showSnackbar(t.loadError, 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isUserApartment = (apartment) => currentUser && apartment.user_id === currentUser._id;

//   const handleMenuOpen = (event, apartment) => {
//     event.stopPropagation();
//     if (showActions && isUserApartment(apartment)) {
//       setAnchorEl(event.currentTarget);
//       setSelectedApartment(apartment);
//     }
//   };
//   const handleMenuClose = () => {
//     setAnchorEl(null);
//     setSelectedApartment(null);
//   };

//   const handleEdit = () => {
//     if (selectedApartment) {
//       router.push(`/add-apartment?edit=${selectedApartment._id}`);
//       handleMenuClose();
//     }
//   };
//   const handleDelete = async () => {
//     if (!selectedApartment) return;
//     if (!window.confirm(t.deleteConfirm)) {
//       handleMenuClose();
//       return;
//     }
//     try {
//       await axios.delete(`http://localhost:3000/api/v1/apartments/${selectedApartment._id}`);
//       setApartments(apartments.filter((apt) => apt._id !== selectedApartment._id));
//       showSnackbar(t.deleteSuccess, 'success');
//     } catch (error) {
//       console.error(error);
//       showSnackbar(t.deleteError, 'error');
//     } finally {
//       handleMenuClose();
//     }
//   };

//   const handleToggleFavorite = async (id) => {
//     const userProfile = localStorage.getItem('user_profile');
//     if (!userProfile) {
//       setIsCreateUserOpen(true);
//       return;
//     }
//     try {
//       const newStatus = await toggleFavorite(id);
//       showSnackbar(newStatus ? t.favoriteAdded : t.favoriteRemoved, 'success');
//       if (!newStatus && onFavoriteRemoved) onFavoriteRemoved(id);
//     } catch (error) {
//       if (error.message === 'USER_NOT_LOGGED_IN') {
//         setIsCreateUserOpen(true);
//       } else {
//         showSnackbar(t.favoriteError, 'error');
//       }
//     }
//   };

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const showCreateUserDialog = () => {
//     setIsCreateUserOpen(true);
//   };

//   const onCloseDialog = () => {
//     setIsCreateUserOpen(false);
//   };

//   if (loading) {
//     return (
//       <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
//         <CircularProgress />
//       </Box>
//     );
//   }

//   return (
//     <Box>
//       {showActions && (
//         <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
//           <MenuItem onClick={handleEdit}>
//             <Edit sx={{ mr: 1 }} /> {t.edit}
//           </MenuItem>
//           <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
//             <Delete sx={{ mr: 1 }} /> {t.delete}
//           </MenuItem>
//         </Menu>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <ApartmentList
//         apartments={apartments.map((apartment) => ({
//           ...apartment,
//           actions:
//             showActions && isUserApartment(apartment) ? (
//               <IconButton
//                 onClick={(e) => handleMenuOpen(e, apartment)}
//                 size="small"
//                 sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' } }}
//               >
//                 <MoreVert />
//               </IconButton>
//             ) : null,
//         }))}
//         isFavorite={isFavorite}
//         toggleFavorite={handleToggleFavorite}
//         showTitle={!favoriteIds}
//         isFavoritesPage={!!favoriteIds}
//         isUserListings={!!userId}
//         isCreateUserOpen={isCreateUserOpen}
//         onCloseDialog={onCloseDialog}
//         showCreateUserDialog={showCreateUserDialog}
//       />
//     </Box>
//   );
// };

// // const Apartments = (props) => {
// //   return (
// //     <SessionProvider>
// //       <ApartmentsContent {...props} />
// //     </SessionProvider>
// //   );
// // };

// // export default Apartments;

// const Apartments = (props) => {
//   return (
//     <SessionProvider>
//       <LanguageProvider>
//         <ApartmentsContent {...props} />
//       </LanguageProvider>
//     </SessionProvider>
//   );
// };

// export default Apartments;


'use client';

import React, { useState, useEffect } from 'react';
import axios from 'axios';
import { useSession, SessionProvider } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  Box,
  CircularProgress,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert,
  Typography,
  Fade,
  Zoom,
} from '@mui/material';
import { MoreVert, Edit, Delete, Home, Search } from '@mui/icons-material';
import ApartmentList from './ApartmentList';
import { LanguageProvider, useLanguage } from '@/app/LanguageContext';
import { useFavorites } from '@/app/hooks/useFavorites';

const APARTMENTS_TRANSLATIONS = {
  ua: {
    deleteConfirm: 'Ви впевнені, що хочете видалити це оголошення?',
    loadError: 'Помилка при завантаженні апартаментів',
    deleteSuccess: 'Оголошення успішно видалено!',
    deleteError: 'Помилка при видаленні оголошення',
    favoriteError: 'Помилка при оновленні обраного',
    edit: 'Редагувати',
    delete: 'Видалити',
    loginRequired: 'Будь ласка, увійдіть щоб додати в обране',
    favoriteAdded: 'Додано в обране',
    favoriteRemoved: 'Видалено з обраного',
    noApartments: 'Немає жодного апартамента',
    noApartmentsDescription: 'Спробуйте змінити параметри пошуку або додати нове оголошення',
    loadingApartments: 'Завантаження апартаментів...',
  },
  ru: {
    deleteConfirm: 'Вы уверены, что хотите удалить это объявление?',
    loadError: 'Ошибка при загрузке апартаментов',
    deleteSuccess: 'Объявление успешно удалено!',
    deleteError: 'Ошибка при удалении объявления',
    favoriteError: 'Ошибка при обновлении избранного',
    edit: 'Редактировать',
    delete: 'Удалить',
    loginRequired: 'Пожалуйста, войдите чтобы добавить в избранное',
    favoriteAdded: 'Добавлено в избранное',
    favoriteRemoved: 'Удалено из избранного',
    noApartments: 'Нет ни одного апартамента',
    noApartmentsDescription: 'Попробуйте изменить параметры поиска или добавить новое объявление',
    loadingApartments: 'Загрузка апартаментов...',
  },
};

// Красивая анимация для пустого состояния
const EmptyStateAnimation = ({ message, description }) => {
  return (
    <Fade in={true} timeout={800}>
      <Box
        sx={{
          display: 'flex',
          flexDirection: 'column',
          alignItems: 'center',
          justifyContent: 'center',
          minHeight: '60vh',
          textAlign: 'center',
          p: 3,
        }}
      >
        <Zoom in={true} style={{ transitionDelay: '300ms' }}>
          <Box
            sx={{
              position: 'relative',
              width: 120,
              height: 120,
              mb: 3,
            }}
          >
            <Box
              sx={{
                position: 'absolute',
                top: 0,
                left: 0,
                width: '100%',
                height: '100%',
                borderRadius: '50%',
                backgroundColor: 'primary.light',
                opacity: 0.2,
                animation: 'pulse 2s infinite ease-in-out',
                '@keyframes pulse': {
                  '0%': {
                    transform: 'scale(1)',
                    opacity: 0.2,
                  },
                  '50%': {
                    transform: 'scale(1.1)',
                    opacity: 0.3,
                  },
                  '100%': {
                    transform: 'scale(1)',
                    opacity: 0.2,
                  },
                },
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                width: 80,
                height: 80,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                opacity: 0.1,
                animation: 'pulse 2s infinite ease-in-out',
                animationDelay: '0.5s',
              }}
            />
            <Box
              sx={{
                position: 'absolute',
                top: '50%',
                left: '50%',
                transform: 'translate(-50%, -50%)',
                display: 'flex',
                alignItems: 'center',
                justifyContent: 'center',
                width: 60,
                height: 60,
                borderRadius: '50%',
                backgroundColor: 'primary.main',
                color: 'white',
              }}
            >
              <Home sx={{ fontSize: 30 }} />
            </Box>
          </Box>
        </Zoom>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '600ms' }}>
          <Typography
            variant="h5"
            component="h2"
            sx={{
              mb: 2,
              color: 'text.secondary',
              fontWeight: 600,
            }}
          >
            {message}
          </Typography>
        </Fade>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '800ms' }}>
          <Typography
            variant="body1"
            sx={{
              color: 'text.secondary',
              maxWidth: 400,
              lineHeight: 1.6,
            }}
          >
            {description}
          </Typography>
        </Fade>

        <Fade in={true} timeout={1000} style={{ transitionDelay: '1000ms' }}>
          <Box
            sx={{
              mt: 3,
              display: 'flex',
              alignItems: 'center',
              color: 'primary.main',
            }}
          >
            <Search sx={{ mr: 1 }} />
            <Typography variant="body2">
              {message === 'Немає жодного апартамента' 
                ? 'Спробуйте інші критерії пошуку' 
                : 'Попробуйте другие критерии поиска'}
            </Typography>
          </Box>
        </Fade>
      </Box>
    </Fade>
  );
};

// Красивая анимация загрузки
const LoadingAnimation = () => {
  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        justifyContent: 'center',
        minHeight: '60vh',
        textAlign: 'center',
      }}
    >
      <Box
        sx={{
          position: 'relative',
          width: 80,
          height: 80,
          mb: 3,
        }}
      >
        <CircularProgress
          size={80}
          thickness={2}
          sx={{
            color: 'primary.main',
            animation: 'rotate 2s linear infinite',
          }}
        />
        <Box
          sx={{
            position: 'absolute',
            top: '50%',
            left: '50%',
            transform: 'translate(-50%, -50%)',
          }}
        >
          <Home 
            sx={{ 
              fontSize: 30, 
              color: 'primary.main',
              animation: 'bounce 1s infinite alternate',
              '@keyframes bounce': {
                '0%': { transform: 'translateY(0px)' },
                '100%': { transform: 'translateY(-5px)' },
              }
            }} 
          />
        </Box>
      </Box>
      
      <Fade in={true} timeout={1000}>
        <Typography
          variant="h6"
          sx={{
            color: 'text.secondary',
            fontWeight: 500,
          }}
        >
          {APARTMENTS_TRANSLATIONS.ua.loadingApartments}
        </Typography>
      </Fade>
    </Box>
  );
};

// Функция для получения данных на сервере
export async function getApartmentsData(userId = null, favoriteIds = []) {
  try {
    let endpoint = 'get-all';
    if (userId) endpoint = `user-apartment/${userId}`;
    
    const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`);
    let apartments = response.data;
    
    if (favoriteIds && favoriteIds.length > 0) {
      apartments = apartments.filter((apt) => favoriteIds.includes(apt._id));
    }
    
    return {
      apartments,
      timestamp: new Date().toISOString(),
      error: null
    };
  } catch (error) {
    console.error('Error fetching apartments:', error);
    return {
      apartments: [],
      timestamp: new Date().toISOString(),
      error: 'Failed to load apartments'
    };
  }
}

// Функция для статической генерации
export async function getStaticProps(context) {
  const { userId = null, favoriteIds = [] } = context.params || {};
  
  const apartmentsData = await getApartmentsData(userId, favoriteIds);
  
  return {
    props: {
      initialApartments: apartmentsData.apartments,
      initialLoading: false,
      serverTimestamp: apartmentsData.timestamp,
      userId: userId || null,
      favoriteIds: favoriteIds || [],
    },
    // Регенерация каждые 30 минут
    revalidate: 1800,
  };
}

// Функция для получения статических путей
export async function getStaticPaths() {
  return {
    paths: [
      { params: { userId: null, favoriteIds: [] } },
    ],
    fallback: 'blocking',
  };
}

const ApartmentsContent = ({ 
  userId, 
  showActions = false, 
  favoriteIds, 
  forceRefreshKey, 
  onFavoriteRemoved,
  initialApartments = [],
  initialLoading = false,
  serverTimestamp 
}) => {
  const [apartments, setApartments] = useState(initialApartments);
  const [loading, setLoading] = useState(initialLoading);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);

  const { data: session } = useSession();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  console.log('Apartment',currentLanguage);
  const t = APARTMENTS_TRANSLATIONS[currentLanguage] || APARTMENTS_TRANSLATIONS.ua;

  // Используем хук избранного
  const { isFavorite, toggleFavorite, loading: favoriteLoading } = useFavorites();

  useEffect(() => {
    const loadData = async () => {
      const userProfile = localStorage.getItem('user_profile');
      if (userProfile) {
        try {
          const profileData = JSON.parse(userProfile);
          setCurrentUser(profileData);
        } catch (error) {
          console.error('Error parsing user profile:', error);
        }
      }
      
      // Если начальные данные уже загружены, не загружаем повторно
      if (initialApartments.length === 0 || forceRefreshKey) {
        await fetchApartments();
      }
    };
    loadData();
  }, [userId, favoriteIds, forceRefreshKey, initialApartments.length]);

  const fetchApartments = async () => {
    try {
      setLoading(true);
      let endpoint = 'get-all';
      if (userId) endpoint = `user-apartment/${userId}`;
      const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`);
      let filtered = response.data;
      if (favoriteIds && favoriteIds.length > 0) {
        filtered = filtered.filter((apt) => favoriteIds.includes(apt._id));
      }
      setApartments(filtered);
    } catch (error) {
      console.error(error);
      showSnackbar(t.loadError, 'error');
    } finally {
      setLoading(false);
    }
  };

  const isUserApartment = (apartment) => currentUser && apartment.user_id === currentUser._id;

  const handleMenuOpen = (event, apartment) => {
    event.stopPropagation();
    if (showActions && isUserApartment(apartment)) {
      setAnchorEl(event.currentTarget);
      setSelectedApartment(apartment);
    }
  };
  const handleMenuClose = () => {
    setAnchorEl(null);
    setSelectedApartment(null);
  };

  const handleEdit = () => {
    if (selectedApartment) {
      router.push(`/add-apartment?edit=${selectedApartment._id}`);
      handleMenuClose();
    }
  };
  const handleDelete = async () => {
    if (!selectedApartment) return;
    if (!window.confirm(t.deleteConfirm)) {
      handleMenuClose();
      return;
    }
    try {
      await axios.delete(`http://localhost:3000/api/v1/apartments/${selectedApartment._id}`);
      setApartments(apartments.filter((apt) => apt._id !== selectedApartment._id));
      showSnackbar(t.deleteSuccess, 'success');
    } catch (error) {
      console.error(error);
      showSnackbar(t.deleteError, 'error');
    } finally {
      handleMenuClose();
    }
  };

  const handleToggleFavorite = async (id) => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setIsCreateUserOpen(true);
      return;
    }
    try {
      const newStatus = await toggleFavorite(id);
      showSnackbar(newStatus ? t.favoriteAdded : t.favoriteRemoved, 'success');
      if (!newStatus && onFavoriteRemoved) onFavoriteRemoved(id);
    } catch (error) {
      if (error.message === 'USER_NOT_LOGGED_IN') {
        setIsCreateUserOpen(true);
      } else {
        showSnackbar(t.favoriteError, 'error');
      }
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const showCreateUserDialog = () => {
    setIsCreateUserOpen(true);
  };

  const onCloseDialog = () => {
    setIsCreateUserOpen(false);
  };

  // Показываем анимацию загрузки
  if (loading && apartments.length === 0) {
    return <LoadingAnimation />;
  }

  // Показываем анимацию пустого состояния
  if (!loading && apartments.length === 0) {
    return (
      <EmptyStateAnimation 
        message={t.noApartments}
        description={t.noApartmentsDescription}
      />
    );
  }

  return (
    <Box>
      {showActions && (
        <Menu anchorEl={anchorEl} open={Boolean(anchorEl)} onClose={handleMenuClose}>
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1 }} /> {t.edit}
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} /> {t.delete}
          </MenuItem>
        </Menu>
      )}

      <Snackbar
        open={snackbar.open}
        autoHideDuration={2000}
        onClose={() => setSnackbar({ ...snackbar, open: false })}
        anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
      >
        <Alert severity={snackbar.severity} onClose={() => setSnackbar({ ...snackbar, open: false })}>
          {snackbar.message}
        </Alert>
      </Snackbar>

      <ApartmentList
        apartments={apartments.map((apartment) => ({
          ...apartment,
          actions:
            showActions && isUserApartment(apartment) ? (
              <IconButton
                onClick={(e) => handleMenuOpen(e, apartment)}
                size="small"
                sx={{ bgcolor: 'rgba(255,255,255,0.9)', '&:hover': { bgcolor: 'rgba(255,255,255,1)' } }}
              >
                <MoreVert />
              </IconButton>
            ) : null,
        }))}
        isFavorite={isFavorite}
        toggleFavorite={handleToggleFavorite}
        showTitle={!favoriteIds}
        isFavoritesPage={!!favoriteIds}
        isUserListings={!!userId}
        isCreateUserOpen={isCreateUserOpen}
        onCloseDialog={onCloseDialog}
        showCreateUserDialog={showCreateUserDialog}
      />
    </Box>
  );
};

const Apartments = (props) => {
  return (<>

        <ApartmentsContent {...props} />

    </>
  );
};

export default Apartments;