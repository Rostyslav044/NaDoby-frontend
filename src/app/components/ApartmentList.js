
// Этот React-компонент отображает список апартаментов. 




'use client';

import React from 'react';
import {
  Box,
  Typography,
  Grid,
  Container,
  Dialog,
  DialogContent,
} from '@mui/material';
import ApartmentCard from './ApartmentCard';
import CreateUser from './CreateUser';
import { useLanguage } from "@/app/LanguageContext";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import { LanguageProvider } from "@/app/LanguageContext";

const APARTMENT_LIST_CONTENT = {
  ua: {
    title: "Усі апартаменти",
    noApartments: "Немає жодного апартаменту",
    noFavorites: "Немає обраних апартаментів"
  },
  ru: {
    title: "Все апартаменты", 
    noApartments: "Нет ни одного апартамента",
    noFavorites: "Нет избранных апартаментов"
  }
};

const ApartmentListComponent = ({ 
  apartments = [], 
  isFavorite, 
  toggleFavorite, 
  isCreateUserOpen, 
  onCloseDialog,
  showCreateUserDialog,
  showTitle = true,
  isFavoritesPage = false
}) => {
  const { currentLanguage } = useLanguage();
  const t = APARTMENT_LIST_CONTENT[currentLanguage];

  const getIsFavoriteForApartment = (apartment) => {
    if (typeof isFavorite === 'function') {
      return isFavorite(apartment._id);
    }
    if (typeof isFavorite === 'boolean') {
      return isFavorite;
    }
    return false;
  };

  return (
    <Container sx={{ py: 4 }}>
      {showTitle && (
        <Typography variant="h4" component="h1" gutterBottom>
          {isFavoritesPage ? "Избранное" : t.title}
        </Typography>
      )}

      {apartments.length === 0 ? (
        <Typography variant="body1" sx={{ textAlign: 'center', mt: 4 }}>
          {isFavoritesPage ? t.noFavorites : t.noApartments}
        </Typography>
      ) : (
        <Grid container spacing={4}>
          {apartments.map((apartment) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <ApartmentCard
                apartment={apartment}
                isFavorite={getIsFavoriteForApartment(apartment)}
                toggleFavorite={() => toggleFavorite(apartment._id)}
                showCreateUserDialog={showCreateUserDialog}
                // showCreateUserDialog={onCloseDialog}
              />
            </Grid>
          ))}
        </Grid>
      )}

      <Dialog
        open={isCreateUserOpen}
        onClose={onCloseDialog}
        fullWidth
        maxWidth="xs"
      >
        <DialogContent>
          <CreateUser onClose={onCloseDialog} />
        </DialogContent>
      </Dialog>
    </Container>
  );
};

export default function ApartmentList({ 
  apartments, 
  isFavorite, 
  toggleFavorite, 
  isCreateUserOpen, 
  onCloseDialog,
  showTitle = true,
  isFavoritesPage = false
}) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <ApartmentListComponent 
          apartments={apartments}
          isFavorite={isFavorite}
          toggleFavorite={toggleFavorite}
          isCreateUserOpen={isCreateUserOpen}
          onCloseDialog={onCloseDialog}
          showTitle={showTitle}
          isFavoritesPage={isFavoritesPage}
        />
      </LanguageProvider>
    </Provider>
  );
}