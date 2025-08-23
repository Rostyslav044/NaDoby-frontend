// Компонент загружает список апартаментов с сервера,
//  показывает загрузку во время ожидания, 
//  а затем отображает список квартир через ApartmentList.
//   Также он позволяет отмечать квартиры как избранные, если пользователь авторизован.


// 'use client';

// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { CircularProgress, Box } from '@mui/material';
// import ApartmentList from './ApartmentList';

// const Apartments = ({userId}) => { 
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState({});
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   // const { data: session } = useSession();

//   useEffect(() => {
//     const fetchApartments = async () => {
//       try {
//         const endEndpoint = userId?`user-apartment/${userId}`:'get-all';
//         const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endEndpoint}`);
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
//     <ApartmentList
//       apartments={apartments}
//       favorites={favorites}
//       toggleFavorite={toggleFavorite}
//       isCreateUserOpen={isCreateUserOpen}
//       onCloseDialog={() => setIsCreateUserOpen(false)}
//     />
//   );
// };

// export default Apartments;



// 'use client';
// import React, { useEffect, useState } from 'react';
// import axios from 'axios';
// import { useSession } from 'next-auth/react';
// import { 
//   CircularProgress, 
//   Box, 
//   Button,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   TextField,
//   IconButton,
//   Menu,
//   MenuItem
// } from '@mui/material';
// import { MoreVert, Edit, Delete } from '@mui/icons-material';
// import ApartmentList from './ApartmentList';

// const Apartments = ({ userId }) => { 
//   const [apartments, setApartments] = useState([]);
//   const [loading, setLoading] = useState(true);
//   const [favorites, setFavorites] = useState({});
//   const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
//   const [editingApartment, setEditingApartment] = useState(null);
//   const [editFormData, setEditFormData] = useState({});
//   const [anchorEl, setAnchorEl] = useState(null);
//   const [selectedApartment, setSelectedApartment] = useState(null);
//   const [currentUser, setCurrentUser] = useState(null);

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
//       setEditingApartment(selectedApartment._id);
//       setEditFormData(selectedApartment);
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

//   const handleEditChange = (e) => {
//     const { name, value } = e.target;
//     setEditFormData(prev => ({
//       ...prev,
//       [name]: value
//     }));
//   };

//   const handleSaveEdit = async () => {
//     try {
//       const response = await axios.put(
//         `http://localhost:3000/api/v1/apartments/${editingApartment}`,
//         editFormData
//       );
      
//       setApartments(apartments.map(apt => 
//         apt._id === editingApartment ? response.data : apt
//       ));
      
//       setEditingApartment(null);
//       setEditFormData({});
//       alert('Объявление успешно обновлено!');
//     } catch (error) {
//       console.error('Ошибка при обновлении:', error);
//       alert('Ошибка при обновлении объявления');
//     }
//   };

//   const handleCancelEdit = () => {
//     setEditingApartment(null);
//     setEditFormData({});
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
//       {/* Диалог редактирования */}
//       <Dialog open={!!editingApartment} onClose={handleCancelEdit} maxWidth="md" fullWidth>
//         <DialogTitle>Редактировать объявление</DialogTitle>
//         <DialogContent>
//           <Box sx={{ display: 'flex', flexDirection: 'column', gap: 2, mt: 2 }}>
//             <TextField
//               label="Название объекта"
//               name="objectName"
//               value={editFormData.objectName || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Категория"
//               name="category"
//               value={editFormData.category || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Описание"
//               name="description"
//               value={editFormData.description || ''}
//               onChange={handleEditChange}
//               multiline
//               rows={4}
//               fullWidth
//             />
//             <TextField
//               label="Город"
//               name="city"
//               value={editFormData.city || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Улица"
//               name="street"
//               value={editFormData.street || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Номер дома"
//               name="houseNumber"
//               value={editFormData.houseNumber || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Цена"
//               name="price"
//               type="number"
//               value={editFormData.price || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Количество комнат"
//               name="rooms"
//               type="number"
//               value={editFormData.rooms || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//             <TextField
//               label="Количество спальных мест"
//               name="beds"
//               type="number"
//               value={editFormData.beds || ''}
//               onChange={handleEditChange}
//               fullWidth
//             />
//           </Box>
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleCancelEdit}>Отмена</Button>
//           <Button onClick={handleSaveEdit} variant="contained">Сохранить</Button>
//         </DialogActions>
//       </Dialog>

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

// Создаем внутренний компонент, который будет использовать useSession
const ApartmentsContent = ({ userId }) => {
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

  // Проверяем, принадлежит ли объявление текущему пользователю
  const isUserApartment = (apartment) => {
    return currentUser && apartment.user_id === currentUser._id;
  };

  const handleMenuOpen = (event, apartment) => {
    // Останавливаем всплытие события, чтобы не сработал клик по карточке
    event.stopPropagation();
    
    // Показываем меню только для своих объявлений
    if (isUserApartment(apartment)) {
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
      // Перенаправляем на страницу редактирования с ID объявления
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
      {/* Меню действий */}
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

      {/* Список объявлений с кнопкой меню только для своих объявлений */}
      <ApartmentList
        apartments={apartments.map(apartment => ({
          ...apartment,
          // Передаем actions только для объявлений текущего пользователя
          actions: isUserApartment(apartment) ? (
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

// Основной компонент, который оборачивает контент в SessionProvider
const Apartments = ({ userId }) => {
  return (
    <SessionProvider>
      <ApartmentsContent userId={userId} />
    </SessionProvider>
  );
};

export default Apartments;