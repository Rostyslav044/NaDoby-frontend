import React, { useEffect, useState } from 'react';
import axios from 'axios';
import {
  Container,
  Typography,
  Grid,
  Card,
  CardContent,
  CardMedia,
  CircularProgress,
  Box
} from '@mui/material';

const Apartments = () => {
  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    const fetchApartments = async () => {
      try {
        const response = await axios.get('http://localhost:3000/api/v1/apartments/get-all');
        setApartments(response.data);
      } catch (error) {
        console.error('Помилка при завантаженні апартаментів:', error);
      } finally {
        setLoading(false);
      }
    };

    fetchApartments();
  }, []);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" alignItems="center" height="100vh">
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Container>
      <Typography variant="h4" component="h1" gutterBottom>
        Усі апартаменти
      </Typography>

      {apartments.length === 0 ? (
        <Typography variant="body1">Немає жодного апартаменту</Typography>
      ) : (
        <Grid container spacing={4}>
          {apartments.map((apartment) => (
            <Grid item xs={12} sm={6} md={4} key={apartment._id}>
              <Card>
                {apartment.photos && apartment.photos.length > 0 && (
                  <CardMedia
                    component="img"
                    height="200"
                    image={apartment.photos[0]}
                    alt="Фото апартаменту"
                  />
                )}
                <CardContent>
                  <Typography variant="h6">
                    {apartment.city} — {apartment.district || 'Без району'}
                  </Typography>
                  <Typography variant="body2" color="textSecondary">
                    {apartment.description || 'Без опису'}
                  </Typography>
                  <Typography variant="subtitle1" color="primary">
                    Ціна: {apartment.price} грн
                  </Typography>
                  {apartment.metro && (
                    <Typography variant="caption" color="textSecondary">
                      Метро: {apartment.metro}
                    </Typography>
                  )}
                </CardContent>
              </Card>
            </Grid>
          ))}
        </Grid>
      )}
    </Container>
  );
};

export default Apartments;
