'use client';

import { useRouter } from 'next/router';
import { useEffect, useState } from 'react';
import {
  Box,
  Typography,
  CardMedia,
  Paper,
  Grid,
  Button,
  CircularProgress,
} from '@mui/material';

export default function UserApartmentsPage() {
  const router = useRouter();
  const { userId } = router.query;

  const [apartments, setApartments] = useState([]);
  const [loading, setLoading] = useState(true);

  useEffect(() => {
    if (userId) {
      const fetchUserApartments = async () => {
        try {
          const res = await fetch(`http://localhost:3000/api/v1/apartments/user/${userId}`);
          const data = await res.json();
          setApartments(data);
        } catch (error) {
          console.error('Ошибка при получении данных:', error);
        } finally {
          setLoading(false);
        }
      };

      fetchUserApartments();
    }
  }, [userId]);

  if (loading) {
    return (
      <Box display="flex" justifyContent="center" mt={10}>
        <CircularProgress />
      </Box>
    );
  }

  return (
    <Box maxWidth="1000px" mx="auto" mt={4} p={2}>
      <Typography variant="h4" gutterBottom>
        Всі оголошення користувача
      </Typography>

      {apartments.length === 0 ? (
        <Typography variant="body1">Оголошення не знайдено.</Typography>
      ) : (
        <Grid container spacing={3}>
          {apartments.map((apt) => (
            <Grid item xs={12} sm={6} md={4} key={apt._id}>
              <Paper
                elevation={3}
                sx={{ p: 2, cursor: 'pointer', height: '100%' }}
                onClick={() => router.push(`/apartment/${apt._id}`)}
              >
                <CardMedia
                  component="img"
                  image={apt.photos?.[0]}
                  height="160"
                  sx={{ borderRadius: 1, objectFit: 'cover', mb: 1 }}
                />
                <Typography variant="h6">{apt.name || 'Без назви'}</Typography>
                <Typography variant="body2" color="text.secondary">
                  {apt.city}, {apt.street}
                </Typography>
                <Typography variant="body2" color="text.secondary">
                  {apt.price ? `${apt.price} грн/доба` : ''}
                </Typography>
              </Paper>
            </Grid>
          ))}
        </Grid>
      )}

      <Box mt={4}>
        <Button variant="contained" onClick={() => router.back()}>
          Назад
        </Button>
      </Box>
    </Box>
  );
}
