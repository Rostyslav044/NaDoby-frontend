// Компонент загружает список апартаментов с сервера,
//  показывает загрузку во время ожидания, 
//  а затем отображает список квартир через ApartmentList.
//   Также он позволяет отмечать квартиры как избранные, если пользователь авторизован.








// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { useRouter } from 'next/navigation';
// import {
//   CircularProgress,
//   Box,
//   IconButton,
//   Menu,
//   MenuItem,
//   Snackbar,
//   Alert
// } from '@mui/material';
// import { MoreVert, Edit, Delete } from '@mui/icons-material';
// import ApartmentList from './ApartmentList';
// import { SessionProvider } from 'next-auth/react';

// const ApartmentsContent = ({
//    userId,
//    showActions = false,
//     favoriteIds, 
    
//     forceRefreshKey,
//     onFavoriteRemoved
//    }) => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState({});
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);
//   const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

//   const { data: session } = useSession();
//   const router = useRouter();


//   useEffect(() => {
//     const loadData = async () => {
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         try {
//           const profileData = JSON.parse(userProfile);
//           setCurrentUser(profileData);
          
//           // Загружаем избранное с сервера при каждом изменении forceRefreshKey
//           await loadFavoritesFromServer(profileData._id);
//         } catch (error) {
//           console.error('Error parsing user profile:', error);
//         }
//       }
      
//       await fetchApartments();
//     };
    
//     loadData();
//   }, [userId, favoriteIds, forceRefreshKey]); // Добавляем forceRefreshKey в зависимости

//   useEffect(() => {
//     const loadData = async () => {
//       const userProfile = localStorage.getItem('user_profile');
//       if (userProfile) {
//         try {
//           const profileData = JSON.parse(userProfile);
//           setCurrentUser(profileData);
          
//           // Загружаем избранное с сервера
//           await loadFavoritesFromServer(profileData._id);
//         } catch (error) {
//           console.error('Error parsing user profile:', error);
//         }
//       }
      
//       await fetchApartments();
//     };
    
//     loadData();
//   }, [userId, favoriteIds]);

//   const loadFavoritesFromServer = async (userId) => {
//     try {
//       const response = await axios.get(
//         'http://localhost:3000/api/v1/apartments/favorites/user',
//         { headers: { 'user-id': userId } }
//       );
      
//       if (response.data.success) {
//         const serverFavorites = response.data.favorites.reduce((acc, apt) => {
//           acc[apt._id] = true;
//           return acc;
//         }, {});
        
//         setFavorites(serverFavorites);
//         localStorage.setItem('apartment_favorites', JSON.stringify(serverFavorites));
//       }
//     } catch (error) {
//       console.error('Error loading favorites from server:', error);
//     }
//   };

//   const showSnackbar = (message, severity = 'info') => {
//     setSnackbar({ open: true, message, severity });
//   };

//   const fetchApartments = async () => {
//     try {
//       let endpoint = 'get-all';
//       let params = {};
      
//       if (userId) {
//         endpoint = `user-apartment/${userId}`;
//       }
      
//       const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`, { params });
      
//       let filteredApartments = response.data;
      
//       if (favoriteIds && favoriteIds.length > 0) {
//         filteredApartments = response.data.filter(apartment => 
//           favoriteIds.includes(apartment._id)
//         );
//       }
      
//       setApartments(filteredApartments);
//     } catch (error) {
//       console.error('Ошибка при загрузке апартаментов:', error);
//       showSnackbar('Ошибка при загрузке апартаментов', 'error');
//     } finally {
//       setLoading(false);
//     }
//   };

//   const isUserApartment = (apartment) => {
//     return currentUser && apartment.user_id === currentUser._id;
//   };

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
    
//     if (!confirm('Вы уверены, что хотите удалить это объявление?')) {
//       handleMenuClose();
//       return;
//     }

//     try {
//       await axios.delete(`http://localhost:3000/api/v1/apartments/${selectedApartment._id}`);
//       setApartments(apartments.filter(apt => apt._id !== selectedApartment._id));
//       showSnackbar('Объявление успешно удалено!', 'success');
//     } catch (error) {
//       console.error('Ошибка при удалении:', error);
//       showSnackbar('Ошибка при удалении объявления', 'error');
//     } finally {
//       handleMenuClose();
//     }
//   };

//   const checkIsFavorite = (apartmentId) => {
//     return favorites[apartmentId] === true;
//   };

//  // В Apartments.js в функции toggleFavorite:
//  const toggleFavorite = async (id) => {
//   const userProfile = localStorage.getItem('user_profile');
//   if (!userProfile) {
//     setIsCreateUserOpen(true);
//     return;
//   }

//   try {
//     const profileData = JSON.parse(userProfile);
    
//     console.log('Toggling favorite for:', id);
//     console.log('Current favorites state:', favorites[id]);
    
//     const response = await axios.post(
//       'http://localhost:3000/api/v1/apartments/favorites/toggle', 
//       { apartmentId: id },
//       { 
//         headers: { 
//           'user-id': profileData._id,
//           'Content-Type': 'application/json'
//         }
//       }
//     );
    
//     console.log('Server response:', response.data);
    
//     if (response.data.success) {
//       const updatedFavorites = {
//         ...favorites,
//         [id]: response.data.isFavorite
//       };
      
//       setFavorites(updatedFavorites);
//       localStorage.setItem('apartment_favorites', JSON.stringify(updatedFavorites));
      
//       // Используем сообщение от сервера
//       showSnackbar(response.data.message, 'success');
      
      
      
//       // Если это удаление из избранного и мы на странице избранного
//       if (!response.data.isFavorite && typeof onFavoriteRemoved === 'function') {
//         onFavoriteRemoved(id);
//       }
//     }
//   } catch (error) {
//     console.error('Error toggling favorite:', error);
//     showSnackbar('Ошибка при обновлении избранного', 'error');
//   }
// };

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
//         <Menu
//           anchorEl={anchorEl}
//           open={Boolean(anchorEl)}
//           onClose={handleMenuClose}
//         >
//           <MenuItem onClick={handleEdit}>
//             <Edit sx={{ mr: 1 }} /> Редактировать
//           </MenuItem>
//           <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
//             <Delete sx={{ mr: 1 }} /> Удалить
//           </MenuItem>
//         </Menu>
//       )}

//       <Snackbar
//         open={snackbar.open}
//         autoHideDuration={2000}
//         onClose={() => setSnackbar({ ...snackbar, open: false })}
//         anchorOrigin={{ vertical: 'bottom', horizontal: 'center' }}
//       >
//         <Alert 
//           severity={snackbar.severity} 
//           onClose={() => setSnackbar({ ...snackbar, open: false })}
//         >
//           {snackbar.message}
//         </Alert>
//       </Snackbar>

//       <ApartmentList
//         apartments={apartments.map(apartment => ({
//           ...apartment,
//           actions: showActions && isUserApartment(apartment) ? (
//             <IconButton
//               onClick={(e) => handleMenuOpen(e, apartment)}
//               size="small"
//               sx={{
//                 bgcolor: 'rgba(255,255,255,0.9)',
//                 '&:hover': {
//                   bgcolor: 'rgba(255,255,255,1)'
//                 }
//               }}
//             >
//               <MoreVert />
//             </IconButton>
//           ) : null
//         }))}
//         isFavorite={checkIsFavorite}
//         toggleFavorite={toggleFavorite}
//         isCreateUserOpen={isCreateUserOpen}
//         onCloseDialog={() => setIsCreateUserOpen(false)}
//         showTitle={!favoriteIds}
//         isFavoritesPage={!!favoriteIds}
//       />
//     </Box>
//   );
// };

// const Apartments = ({ 
//   userId, 
//   showActions = false,
//    favoriteIds, 
//   //  onFavoriteToggle,
//    onFavoriteRemoved
//    }) => {
//   return (
//     <SessionProvider>
//       <ApartmentsContent 
//         userId={userId} 
//         showActions={showActions}
//         favoriteIds={favoriteIds}
       
//         onFavoriteRemoved={onFavoriteRemoved} 
//       />
//     </SessionProvider>
//   );
// };

// export default Apartments;





'use client';
import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { useRouter } from 'next/navigation';
import {
  CircularProgress,
  Box,
  IconButton,
  Menu,
  MenuItem,
  Snackbar,
  Alert
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import ApartmentList from './ApartmentList';
import { SessionProvider } from 'next-auth/react';
import { useLanguage } from '@/app/LanguageContext';

const APARTMENTS_CONTENT = {
  ua: {
    deleteConfirm: 'Ви впевнені, що хочете видалити це оголошення?',
    loadError: 'Помилка при завантаженні апартаментів',
    deleteSuccess: 'Оголошення успішно видалено!',
    deleteError: 'Помилка при видаленні оголошення',
    favoriteError: 'Помилка при оновленні обраного',
    edit: 'Редагувати',
    delete: 'Видалити'
  },
  ru: {
    deleteConfirm: 'Вы уверены, что хотите удалить это объявление?',
    loadError: 'Ошибка при загрузке апартаментов',
    deleteSuccess: 'Объявление успешно удалено!',
    deleteError: 'Ошибка при удалении объявления',
    favoriteError: 'Ошибка при обновлении избранного',
    edit: 'Редактировать',
    delete: 'Удалить'
  }
};

const ApartmentsContent = ({
   userId,
   showActions = false,
    favoriteIds, 
    forceRefreshKey,
    onFavoriteRemoved
   }) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);
  const [snackbar, setSnackbar] = useState({ open: false, message: '', severity: 'info' });

  const { data: session } = useSession();
  const router = useRouter();
  const { currentLanguage } = useLanguage();
  const t = APARTMENTS_CONTENT[currentLanguage];

  useEffect(() => {
//     (async () => {
//   try {

//     const response = await axios.get(
//       'http://localhost:3000/api/v1/auth/me',
//   {
//     headers: {
//       Authorization: `Bearer eyJhbGciOiJIUzI1NiIsInR5cCI6IkpXVCJ9.eyJpZCI6IjY4YmQxYzQzNDc2MGI4NTBjYTRiNzQ5YSIsImlhdCI6MTc1Nzc4ODI2OCwiZXhwIjoxNzYwMzgwMjY4fQ.h4Y0JoUU8V9qYQm1_U60umfrw-4l7EE6xlgHlB-ar7g`, 
//       'Content-Type': 'application/json'
//     }
//   }
//     );
//     console.log(response.data);
//   } catch (error) {
//     console.error('Request failed:', error.message);
//   }
// })();
    const loadData = async () => {
        
      const userProfile = localStorage.getItem('user_profile');
      if (userProfile) {
        try {
          const profileData = JSON.parse(userProfile);
          setCurrentUser(profileData);
          
          await loadFavoritesFromServer(profileData._id);
        } catch (error) {
          console.error('Error parsing user profile:', error);
        }
      }
      
      await fetchApartments();
    };
    
    loadData();
  }, [userId, favoriteIds, forceRefreshKey]);

  useEffect(() => {
    const loadData = async () => {
      const userProfile = localStorage.getItem('user_profile');
      if (userProfile) {
        try {
          const profileData = JSON.parse(userProfile);
          setCurrentUser(profileData);
          
          await loadFavoritesFromServer(profileData._id);
        } catch (error) {
          console.error('Error parsing user profile:', error);
        }
      }
      
      await fetchApartments();
    };
    
    loadData();
  }, [userId, favoriteIds]);

  const loadFavoritesFromServer = async (userId) => {
    try {
      const response = await axios.get(
        'http://localhost:3000/api/v1/apartments/favorites/user',
        { headers: { 'user-id': userId } }
      );
      
      if (response.data.success) {
        const serverFavorites = response.data.favorites.reduce((acc, apt) => {
          acc[apt._id] = true;
          return acc;
        }, {});
        
        setFavorites(serverFavorites);
        localStorage.setItem('apartment_favorites', JSON.stringify(serverFavorites));
      }
    } catch (error) {
      console.error('Error loading favorites from server:', error);
    }
  };

  const showSnackbar = (message, severity = 'info') => {
    setSnackbar({ open: true, message, severity });
  };

  const fetchApartments = async () => {
    try {
      let endpoint = 'get-all';
      let params = {};
      
      if (userId) {
        endpoint = `user-apartment/${userId}`;
      }
      
      const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`, { params });
      
      let filteredApartments = response.data;
      
      if (favoriteIds && favoriteIds.length > 0) {
        filteredApartments = response.data.filter(apartment => 
          favoriteIds.includes(apartment._id)
        );
      }
      
      setApartments(filteredApartments);
    } catch (error) {
      console.error('Ошибка при загрузке апартаментов:', error);
      showSnackbar(t.loadError, 'error');
    } finally {
      setLoading(false);
    }
  };

  const isUserApartment = (apartment) => {
    return currentUser && apartment.user_id === currentUser._id;
  };

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
    
    if (!confirm(t.deleteConfirm)) {
      handleMenuClose();
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/v1/apartments/${selectedApartment._id}`);
      setApartments(apartments.filter(apt => apt._id !== selectedApartment._id));
      showSnackbar(t.deleteSuccess, 'success');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      showSnackbar(t.deleteError, 'error');
    } finally {
      handleMenuClose();
    }
  };

  const checkIsFavorite = (apartmentId) => {
    return favorites[apartmentId] === true;
  };

  const toggleFavorite = async (id) => {
    const userProfile = localStorage.getItem('user_profile');
    if (!userProfile) {
      setIsCreateUserOpen(true);
      return;
    }

    try {
      const profileData = JSON.parse(userProfile);
      
      const response = await axios.post(
        'http://localhost:3000/api/v1/apartments/favorites/toggle', 
        { apartmentId: id },
        { 
          headers: { 
            'user-id': profileData._id,
            'Content-Type': 'application/json'
          }
        }
      );
      
      if (response.data.success) {
        const updatedFavorites = {
          ...favorites,
          [id]: response.data.isFavorite
        };
        
        setFavorites(updatedFavorites);
        localStorage.setItem('apartment_favorites', JSON.stringify(updatedFavorites));
        
        showSnackbar(response.data.message, 'success');
        
        if (!response.data.isFavorite && typeof onFavoriteRemoved === 'function') {
          onFavoriteRemoved(id);
        }
      }
    } catch (error) {
      console.error('Error toggling favorite:', error);
      showSnackbar(t.favoriteError, 'error');
    }
  };

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box>
      {showActions && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
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
        <Alert 
          severity={snackbar.severity} 
          onClose={() => setSnackbar({ ...snackbar, open: false })}
        >
          {snackbar.message}
        </Alert>
      </Snackbar>

      <ApartmentList
        apartments={apartments.map(apartment => ({
          ...apartment,
          actions: showActions && isUserApartment(apartment) ? (
            <IconButton
              onClick={(e) => handleMenuOpen(e, apartment)}
              size="small"
              sx={{
                bgcolor: 'rgba(255,255,255,0.9)',
                '&:hover': {
                  bgcolor: 'rgba(255,255,255,1)'
                }
              }}
            >
              <MoreVert />
            </IconButton>
          ) : null
        }))}
        isFavorite={checkIsFavorite}
        toggleFavorite={toggleFavorite}
        isCreateUserOpen={isCreateUserOpen}
        onCloseDialog={() => setIsCreateUserOpen(false)}
        showTitle={!favoriteIds}
        isFavoritesPage={!!favoriteIds}
      />
    </Box>
  );
};

const Apartments = ({ 
  userId, 
  showActions = false,
   favoriteIds, 
   onFavoriteRemoved
   }) => {
  return (
    <SessionProvider>
      <ApartmentsContent 
        userId={userId} 
        showActions={showActions}
        favoriteIds={favoriteIds}
        onFavoriteRemoved={onFavoriteRemoved} 
      />
    </SessionProvider>
  );
};

export default Apartments;