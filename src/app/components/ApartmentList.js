
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

const ApartmentList = ({ apartments = [], favorites = {}, toggleFavorite, isCreateUserOpen, onCloseDialog }) => {
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

export default ApartmentList;