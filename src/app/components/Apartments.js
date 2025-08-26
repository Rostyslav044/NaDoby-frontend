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
//   MenuItem
// } from '@mui/material';
// import { MoreVert, Edit, Delete } from '@mui/icons-material';
// import ApartmentList from './ApartmentList';
// import { SessionProvider } from 'next-auth/react';

// // Создаем внутренний компонент, который будет использовать useSession
// const ApartmentsContent = ({ userId }) => {
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState({});
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

//   const { data: session } = useSession();
//   const router = useRouter();

//   useEffect(() => {
//     const userProfile = localStorage.getItem('user_profile');
//     if (userProfile) {
//       setCurrentUser(JSON.parse(userProfile));
//     }
//     fetchApartments();
//   }, [userId]);

//   const fetchApartments = async () => {
//     try {
//       const endpoint = userId ? `user-apartment/${userId}` : 'get-all';
//       const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`);
//       setApartments(response.data);
//     } catch (error) {
//       console.error('Ошибка при загрузке апартаментов:', error);
//     } finally {
//       setLoading(false);
//     }
//   };

//   // Проверяем, принадлежит ли объявление текущему пользователю
//   const isUserApartment = (apartment) => {
//     return currentUser && apartment.user_id === currentUser._id;
//   };

//   const handleMenuOpen = (event, apartment) => {
//     // Останавливаем всплытие события, чтобы не сработал клик по карточке
//     event.stopPropagation();
    
//     // Показываем меню только для своих объявлений
//     if (isUserApartment(apartment)) {
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
//       // Перенаправляем на страницу редактирования с ID объявления
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
//       alert('Объявление успешно удалено!');
//     } catch (error) {
//       console.error('Ошибка при удалении:', error);
//       alert('Ошибка при удалении объявления');
//     } finally {
//       handleMenuClose();
//     }
//   };

//   const toggleFavorite = (id) => {
//     if (!session) {
//       setIsCreateUserOpen(true);
//       return;
//     }
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
//     <Box>
//       {/* Меню действий */}
//       <Menu
//         anchorEl={anchorEl}
//         open={Boolean(anchorEl)}
//         onClose={handleMenuClose}
//       >
//         <MenuItem onClick={handleEdit}>
//           <Edit sx={{ mr: 1 }} /> Редактировать
//         </MenuItem>
//         <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
//           <Delete sx={{ mr: 1 }} /> Удалить
//         </MenuItem>
//       </Menu>

//       {/* Список объявлений с кнопкой меню только для своих объявлений */}
//       <ApartmentList
//         apartments={apartments.map(apartment => ({
//           ...apartment,
//           // Передаем actions только для объявлений текущего пользователя
//           actions: isUserApartment(apartment) ? (
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
//         favorites={favorites}
//         toggleFavorite={toggleFavorite}
//         isCreateUserOpen={isCreateUserOpen}
//         onCloseDialog={() => setIsCreateUserOpen(false)}
//       />
//     </Box>
//   );
// };

// // Основной компонент, который оборачивает контент в SessionProvider
// const Apartments = ({ userId }) => {
//   return (
//     <SessionProvider>
//       <ApartmentsContent userId={userId} />
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
  MenuItem
} from '@mui/material';
import { MoreVert, Edit, Delete } from '@mui/icons-material';
import ApartmentList from './ApartmentList';
import { SessionProvider } from 'next-auth/react';

// Добавляем новый пропс showActions для управления видимостью меню
const ApartmentsContent = ({ userId, showActions = false }) => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  const [selectedApartment, setSelectedApartment] = useState(null);
  const [currentUser, setCurrentUser] = useState(null);

  const { data: session } = useSession();
  const router = useRouter();

  useEffect(() => {
    const userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
      setCurrentUser(JSON.parse(userProfile));
    }
    fetchApartments();
  }, [userId]);

  const fetchApartments = async () => {
    try {
      const endpoint = userId ? `user-apartment/${userId}` : 'get-all';
      const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endpoint}`);
      setApartments(response.data);
    } catch (error) {
      console.error('Ошибка при загрузке апартаментов:', error);
    } finally {
      setLoading(false);
    }
  };

  const isUserApartment = (apartment) => {
    return currentUser && apartment.user_id === currentUser._id;
  };

  const handleMenuOpen = (event, apartment) => {
    event.stopPropagation();
    
    // Проверяем, нужно ли показывать меню (только если showActions=true)
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
    
    if (!confirm('Вы уверены, что хотите удалить это объявление?')) {
      handleMenuClose();
      return;
    }

    try {
      await axios.delete(`http://localhost:3000/api/v1/apartments/${selectedApartment._id}`);
      setApartments(apartments.filter(apt => apt._id !== selectedApartment._id));
      alert('Объявление успешно удалено!');
    } catch (error) {
      console.error('Ошибка при удалении:', error);
      alert('Ошибка при удалении объявления');
    } finally {
      handleMenuClose();
    }
  };

  const toggleFavorite = (id) => {
    if (!session) {
      setIsCreateUserOpen(true);
      return;
    }
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
    <Box>
      {/* Меню действий показываем только если showActions=true */}
      {showActions && (
        <Menu
          anchorEl={anchorEl}
          open={Boolean(anchorEl)}
          onClose={handleMenuClose}
        >
          <MenuItem onClick={handleEdit}>
            <Edit sx={{ mr: 1 }} /> Редактировать
          </MenuItem>
          <MenuItem onClick={handleDelete} sx={{ color: 'error.main' }}>
            <Delete sx={{ mr: 1 }} /> Удалить
          </MenuItem>
        </Menu>
      )}

      {/* Кнопку меню показываем только если showActions=true и это объявление пользователя */}
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
        favorites={favorites}
        toggleFavorite={toggleFavorite}
        isCreateUserOpen={isCreateUserOpen}
        onCloseDialog={() => setIsCreateUserOpen(false)}
      />
    </Box>
  );
};

// Основной компонент
const Apartments = ({ userId, showActions = false }) => {
  return (
    <SessionProvider>
      <ApartmentsContent userId={userId} showActions={showActions} />
    </SessionProvider>
  );
};

export default Apartments;