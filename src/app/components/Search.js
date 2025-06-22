

import React, { useState } from "react";
import Autocomplete from "react-google-autocomplete";
import { useLanguage } from "@/app/LanguageContext";
import {
  Container,
  Typography,
  TextField,
  MenuItem,
  Button,
  Box,
} from "@mui/material";

const translations = {
  ua: {
    title: "Обирайте житло для своєї наступної подорожі",
    subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
    locationLabel: "Куди прямуєте?",
    locationPlaceholder: "Введіть місцезнаходження",
    guestsLabel: "Кількість гостей",
    typeLabel: "Тип помешкання",
    options: {
      apart: "Квартири",
      apartment: "Апартаменти",
      hotel: "Готель",
      hostel: "Хостел",
      house: "Будинок",
      recreationCenter: "База відпочинку",
      sauna: "Cауна/Баня",
    },
    searchButton: "Пошук",
    searchAlert: "Пошук виконано!",
    errorMessages: {
      location: "Будь ласка, виберіть місцезнаходження.",
      guests: "Будь ласка, вкажіть кількість гостей.",
      type: "Будь ласка, виберіть тип помешкання.",
    },
  },
  ru: {
    title: "Выбирайте жилье для следующего путешествия",
    subtitle: "От отелей до частных домов – найдите то, что нужно.",
    locationLabel: "Куда направляетесь?",
    locationPlaceholder: "Введите местоположение",
    guestsLabel: "Количество гостей",
    typeLabel: "Тип жилья",
    options: {
      apart: "Квартиры",
      apartment: "Апартаменты",
      hotel: "Гостиница",
      hostel: "Хостел",
      house: "Дом",
      recreationCenter: "База отдыха",
      sauna: "Сауна/Баня",
    },
    searchButton: "Поиск",
    searchAlert: "Поиск выполнен!",
    errorMessages: {
      location: "Пожалуйста, выберите местоположение.",
      guests: "Пожалуйста, укажите количество гостей.",
      type: "Пожалуйста, выберите тип жилья.",
    },
  },
};


const Search = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [type, setType] = useState("");
  const [errors, setErrors] = useState({});
  const { currentLanguage } = useLanguage();
  const translation = translations[currentLanguage];
  // const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w";
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handleSubmit = (e) => {
    e.preventDefault();
    const newErrors = {};
    if (!location.trim()) newErrors.location = translation.errorMessages.location;
    if (guests < 1) newErrors.guests = translation.errorMessages.guests;
    if (!type) newErrors.type = translation.errorMessages.type;
    if (Object.keys(newErrors).length > 0) {
      setErrors(newErrors);
      return;
    }
    alert(translation.searchAlert);
  };

  return (
    <Container maxWidth="sm" sx={{ mt: 4, p: 3, bgcolor: "background.paper", borderRadius: 2, boxShadow: 3 }}>
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {translation.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {translation.subtitle}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <TextField
          label={translation.locationLabel}
          placeholder={translation.locationPlaceholder}
          fullWidth
          error={!!errors.location}
          helperText={errors.location}
          InputProps={{ inputComponent: Autocomplete, inputProps: { apiKey: googleMapsApiKey, onPlaceSelected: (place) => setLocation(place?.formatted_address || "") } }}
        />

        <TextField
          type="number"
          label={translation.guestsLabel}
          fullWidth
          value={guests > 1 ? guests : ""}
          onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
          error={!!errors.guests}
          helperText={errors.guests}
          inputProps={{ min: 1 }}
        />

        <TextField
          select
          label={translation.typeLabel}
          fullWidth
          value={type}
          onChange={(e) => setType(e.target.value)}
          error={!!errors.type}
          helperText={errors.type}
        >
          <MenuItem value="">{translation.typeLabel}</MenuItem>
          {Object.entries(translation.options).map(([key, value]) => (
            <MenuItem key={key} value={key}>{value}</MenuItem>
          ))}
        </TextField>

        <Button type="submit" variant="contained" color="primary" fullWidth>
          {translation.searchButton}
        </Button>
      </Box>
    </Container>
  );
};

export default Search;

