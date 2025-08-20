// Компонент загружает список апартаментов с сервера,
//  показывает загрузку во время ожидания, 
//  а затем отображает список квартир через ApartmentList.
//   Также он позволяет отмечать квартиры как избранные, если пользователь авторизован.


'use client';

import React, { useEffect, useState } from 'react';
import axios from 'axios';
import { useSession } from 'next-auth/react';
import { CircularProgress, Box } from '@mui/material';
import ApartmentList from './ApartmentList';

const Apartments = ({userId}) => { 
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);
  const [favorites, setFavorites] = useState({});
  const [isCreateUserOpen, setIsCreateUserOpen] = useState(false);
  // const { data: session } = useSession();

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const endEndpoint = userId?`user-apartment/${userId}`:'get-all';
        const response = await axios.get(`http://localhost:3000/api/v1/apartments/${endEndpoint}`);
        setApartments(response.data);
      } catch (error) {
        console.error('Помилка при завантаженні апартаментів:', error);
      } finally {
        setLoading(false);
      }
    };
  
    fetchApartments();
  }, []);
  



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
    <ApartmentList
      apartments={apartments}
      favorites={favorites}
      toggleFavorite={toggleFavorite}
      isCreateUserOpen={isCreateUserOpen}
      onCloseDialog={() => setIsCreateUserOpen(false)}
    />
  );
};

export default Apartments;


