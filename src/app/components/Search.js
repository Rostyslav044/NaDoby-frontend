






"use client";

import React, { useState, useRef, useEffect } from "react";
import Autocomplete from "react-google-autocomplete";
import { useLanguage } from "@/app/LanguageContext";
import {
  Container,
  Typography,
  TextField,
  Button,
  Box,
  Checkbox,
  ListItemText,
  Popover,
  List,
  ListItem,
  ListItemButton,
  ListItemIcon,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

const translations = {
  ua: {
    title: "Обирайте житло для своєї подорожі.",
    subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
    locationLabel: "Куди прямуєте?",
    locationPlaceholder: "Введіть місцезнаходження",
    nearby: "Шукати поруч зі мною",
    guestsLabel: "Кількість гостей",
    typeLabel: "Тип помешкання",
    selectButton: "Вибрати",
    options: {
      apart: "Квартири",
      hotel: "Готель",
      petHotel: "Готель для тварин",
      hostel: "Хостел",
      house: "Будинок",
      recreationCenter: "База відпочинку",
      sauna: "Сауна/Баня",
      glamping:"Глемпінг",
      pansionat:"Санаторій/Пансіонат",
      kotedzi: "Котедж для компній",
      kavorking:"Коворкінг",
      avtokemping: "Автокемпінг",
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
    title: "Выбирайте жилье для путешествия.",
    subtitle: "От отелей до частных домов – найдите то, что нужно.",
    locationLabel: "Куда направляетесь?",
    locationPlaceholder: "Введите местоположение",
    nearby: "Искать рядом со мной",
    guestsLabel: "Количество гостей",
    typeLabel: "Тип жилья",
    selectButton: "Выбрать",
    options: {
      apart: "Квартиры",
      hotel: "Гостиница",
      petHotel: "Готель для животных",
      hostel: "Хостел",
      house: "Дом",
      recreationCenter: "База отдыха",
      sauna: "Сауна/Баня",
      glamping:"Глемпинг",
      pansionat:"Санаторий/Пансионат",
      kotedzi: "Котедж для компаний",
      kavorking:"Коворкинг",
      avtokemping: "Автокемпинг",
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

const HeartSpinner = () => (
  <FavoriteIcon
    sx={{
      animation: "pulse 1s infinite",
      color: "#ff1744",
      fontSize: "22px",
      "@keyframes pulse": {
        "0%": { transform: "scale(1)" },
        "50%": { transform: "scale(1.3)" },
        "100%": { transform: "scale(1)" },
      },
    }}
  />
);

const Search = () => {
  const [location, setLocation] = useState("");
  const [guests, setGuests] = useState(1);
  const [types, setTypes] = useState([]);
  const [errors, setErrors] = useState({
    location: false,
    guests: false,
    type: false,
  });
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);
  const [anchorEl, setAnchorEl] = useState(null);
  
  const selectRef = useRef(null);
  const popoverRef = useRef(null);
  const autocompleteRef = useRef(null);

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handlePlaceSelected = (place) => {
    const cityComponent = place?.address_components?.find((comp) =>
      comp.types.includes("locality")
    );
    const fullAddress = cityComponent?.long_name || place?.formatted_address || "";
    setLocation(fullAddress);
    setErrors(prev => ({ ...prev, location: false }));
  };

  const handleLocationClear = () => {
    setLocation("");
    setErrors(prev => ({ ...prev, location: true }));
  };

  const handleNearbySearch = () => {
    if (!navigator.geolocation) {
      alert(
        currentLanguage === "ua"
          ? "Геолокація не підтримується вашим браузером."
          : "Геолокация не поддерживается вашим браузером."
      );
      return;
    }

    setLoadingGeo(true);

    navigator.geolocation.getCurrentPosition(
      async (position) => {
        const { latitude, longitude } = position.coords;
        try {
          const response = await fetch(
            `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}&language=${currentLanguage === "ua" ? "uk" : "ru"}`
          );
          const data = await response.json();
          if (data.status === "OK" && data.results.length > 0) {
            const fullAddress = data.results[0].formatted_address;
            setLocation(fullAddress);
            setErrors(prev => ({ ...prev, location: false }));
          } else {
            alert(currentLanguage === "ua"
              ? "Не вдалося визначити адресу."
              : "Не удалось определить адрес.");
          }
        } catch (err) {
          console.error("Помилка геолокації:", err);
        } finally {
          setLoadingGeo(false);
        }
      },
      () => {
        alert(
          currentLanguage === "ua"
            ? "Не вдалося отримати геолокацію."
            : "Не удалось получить геолокацию."
        );
        setLoadingGeo(false);
      }
    );
  };

  const handleSubmit = async (e) => {
    e.preventDefault();
    
    // Проверка всех полей
    const newErrors = {
      location: !location.trim(),
      guests: !guests || guests < 1,
      type: types.length === 0,
    };

    setErrors(newErrors);

    // Если есть ошибки - не выполняем поиск
    if (newErrors.location || newErrors.guests || newErrors.type) {
      return;
    }

    // Все поля заполнены - выполняем поиск
    setLoadingSearch(true);
    await new Promise((resolve) => setTimeout(resolve, 1000));
    alert(t.searchAlert);
    setLoadingSearch(false);
  };

  const handleTypeClick = (event) => {
    setAnchorEl(event.currentTarget);
  };

  const handleClose = () => {
    // При закрытии проверяем, есть ли выбранные типы
    setErrors(prev => ({ ...prev, type: types.length === 0 }));
    setAnchorEl(null);
  };

  const handleSelect = () => {
    handleClose();
  };

  // const handleCheckboxChange = (key) => (event) => {
  //   event.stopPropagation();
  //   setTypes((prev) =>
  //     prev.includes(key)
  //       ? prev.filter((item) => item !== key)
  //       : [...prev, key]
  //   );
  //   // Сразу убираем ошибку при выборе
  //   if (types.length === 0 || (types.length === 1 && types.includes(key))) {
  //     setErrors(prev => ({ ...prev, type: false }));
  //   }
  // };


  const handleCheckboxChange = (key) => (event) => {
    event.stopPropagation();
    setTypes((prev) =>
      prev.includes(key)
        ? prev.filter((item) => item !== key)
        : [...prev, key]
    );
    setErrors(prev => ({ ...prev, type: false }));
  };


  const handleGuestsChange = (e) => {
    const value = Math.max(1, Number(e.target.value));
    setGuests(value);
    setErrors(prev => ({ ...prev, guests: value < 1 }));
  };

  const handleClickOutside = (event) => {
    if (
      selectRef.current && 
      !selectRef.current.contains(event.target) &&
      popoverRef.current &&
      !popoverRef.current.contains(event.target)
    ) {
      // При клике вне меню проверяем выбранные типы
      setErrors(prev => ({ ...prev, type: types.length === 0 }));
      handleClose();
    }
  };

  useEffect(() => {
    document.addEventListener("mousedown", handleClickOutside);
    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [types]); // Добавляем types в зависимости

  useEffect(() => {
    // Добавляем обработчик изменения для Autocomplete
    if (autocompleteRef.current) {
      const input = autocompleteRef.current.querySelector('input');
      if (input) {
        input.addEventListener('input', (e) => {
          if (e.target.value === '') {
            handleLocationClear();
          }
        });
      }
    }
  }, []);

  const open = Boolean(anchorEl);
  const id = open ? "type-popover" : undefined;

  return (
    <Container
      maxWidth="sm"
      sx={{
        mt: 4,
        p: 3,
        bgcolor: "background.paper",
        borderRadius: 2,
        boxShadow: 3,
      }}
    >
      <Typography variant="h5" fontWeight={600} gutterBottom>
        {t.title}
      </Typography>
      <Typography variant="body1" color="text.secondary" gutterBottom>
        {t.subtitle}
      </Typography>

      <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
        <Button
          onClick={handleNearbySearch}
          variant="contained"
          startIcon={<LocationOnIcon />}
          disabled={loadingGeo}
          sx={{
            backgroundColor: "#1976d2",
            color: "#fff",
            textTransform: "none",
            fontWeight: "bold",
            "&:hover": { backgroundColor: "#115293" },
          }}
        >
          {loadingGeo ? <HeartSpinner /> : t.nearby}
        </Button>

        <Box ref={autocompleteRef}>
          <Autocomplete
            apiKey={googleMapsApiKey}
            onPlaceSelected={handlePlaceSelected}
            options={{
              types: ["(cities)"],
              componentRestrictions: { country: "ua" },
            }}
            placeholder={t.locationPlaceholder}
            language={currentLanguage === "ua" ? "uk" : "ru"}
            defaultValue={location}
            style={{
              width: "100%",
              height: "56px",
              fontSize: "16px",
              padding: "0 14px",
              border: errors.location
                ? "1px solid red"
                : "1px solid rgba(0, 0, 0, 0.23)",
              borderRadius: "4px",
              boxSizing: "border-box",
              display: "flex",
              alignItems: "center",
              // cursor: "pointer",
            }}
          />
          {errors.location && (
            <Typography variant="caption" color="error">
              {t.errorMessages.location}
            </Typography>
          )}
        </Box>

        <TextField
          type="number"
          label={t.guestsLabel}
          fullWidth
          value={guests > 0 ? guests : ""}
          onChange={handleGuestsChange}
          error={errors.guests}
          helperText={errors.guests ? t.errorMessages.guests : ""}
          inputProps={{ min: 1 }}
         
        />

        <Box ref={selectRef}>
          <Button
            fullWidth
            variant="outlined"
            onClick={handleTypeClick}
            sx={{
              justifyContent: "space-between",
              textTransform: "none",
              height: "56px",
              borderColor: errors.type ? "error.main" : "rgba(0, 0, 0, 0.23)",
              color: types.length === 0 ? "text.secondary" : "text.primary",
              textAlign: "left",
              // cursor: "pointer",
            }}
          >
            {types.length === 0
              ? t.typeLabel
              : types.map((val) => t.options[val]).join(", ")}
          </Button>
          {errors.type && (
            <Typography variant="caption" color="error">
              {t.errorMessages.type}
            </Typography>
          )}

          <Popover
            id={id}
            open={open}
            anchorEl={anchorEl}
            onClose={handleClose}
            anchorOrigin={{
              vertical: "bottom",
              horizontal: "left",
            }}
            transformOrigin={{
              vertical: "top",
              horizontal: "left",
            }}
            sx={{
              mt: 1,
            }}
          >
            <Box ref={popoverRef} sx={{ width: selectRef.current?.clientWidth }}>
              <List>
                {Object.entries(t.options).map(([key, label]) => (
                  <ListItem key={key} disablePadding>
                    <ListItemButton>
                 
                      <ListItemIcon>
                        <Checkbox
                          edge="start"
                          checked={types.includes(key)}
                          tabIndex={-1}
                          disableRipple
                          onChange={handleCheckboxChange(key)}
                        />
                      </ListItemIcon>
                      {/* <ListItemText primary={label} /> */}
                      <ListItemText 
              primary={label} 
              onClick={() => {
                setTypes(prev => 
                  prev.includes(key)
                    ? prev.filter(item => item !== key)
                    : [...prev, key]
                );
                setErrors(prev => ({ ...prev, type: false }));
              }}
            />

                    </ListItemButton>
                  </ListItem>
                ))}
              </List>
              <Box sx={{ p: 1 }}>
                <Button
                  fullWidth
                  variant="contained"
                  onClick={handleSelect}
                >
                  {t.selectButton}
                </Button>
              </Box>
            </Box>
          </Popover>
        </Box>

        <Button
          type="submit"
          variant="contained"
          color="primary"
          fullWidth
          disabled={loadingSearch}
        >
          {loadingSearch ? <HeartSpinner /> : t.searchButton}
        </Button>
      </Box>
    </Container>
  );
};

export default Search;