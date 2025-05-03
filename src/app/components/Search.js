


// import React, { useState } from "react";
// import Autocomplete from "react-google-autocomplete";
// import styles from "@/app/styles/Search.module.scss";
// import { useLanguage } from "@/app/LanguageContext";

// const translations = {
//   ua: {
//     title: "Обирайте житло для своєї наступної подорожі",
//     subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
//     locationLabel: "Куди прямуєте?",
//     locationPlaceholder: "Введіть місцезнаходження",
//     guestsLabel: "Кількість гостей",
//     typeLabel: "Тип помешкання",
//     options: {
//       apart: "Квартири",
//       apartment: "Апартаменти",
//       hotel: "Готель",
//       hostel: "Хостел",
//       house: "Будинок",
//       recreationCenter: "База відпочинку",
//       sauna: "Cауна/Баня",
//     },
//     searchButton: "Пошук",
//     searchAlert: "Пошук виконано!",
//     errorMessages: {
//       location: "Будь ласка, виберіть місцезнаходження.",
//       guests: "Будь ласка, вкажіть кількість гостей.",
//       type: "Будь ласка, виберіть тип помешкання.",
//     },
//   },
//   ru: {
//     title: "Выбирайте жилье для следующего путешествия",
//     subtitle: "От отелей до частных домов – найдите то, что нужно.",
//     locationLabel: "Куда направляетесь?",
//     locationPlaceholder: "Введите местоположение",
//     guestsLabel: "Количество гостей",
//     typeLabel: "Тип жилья",
//     options: {
//       apart: "Квартиры",
//       apartment: "Апартаменты",
//       hotel: "Гостиница",
//       hostel: "Хостел",
//       house: "Дом",
//       recreationCenter: "База отдыха",
//       sauna: "Сауна/Баня",
//     },
//     searchButton: "Поиск",
//     searchAlert: "Поиск выполнен!",
//     errorMessages: {
//       location: "Пожалуйста, выберите местоположение.",
//       guests: "Пожалуйста, укажите количество гостей.",
//       type: "Пожалуйста, выберите тип жилья.",
//     },
//   },
// };

// const Search = () => {
//   const [location, setLocation] = useState("");
//   const [guests, setGuests] = useState(1);
//   const [type, setType] = useState("");
//   const [errors, setErrors] = useState({});
//   const { currentLanguage } = useLanguage();
//   const translation = translations[currentLanguage];
//   const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w";

//   const handleSubmit = (e) => {
//     e.preventDefault();

//     const newErrors = {};
//     if (!location || location.trim() === "") {
//       newErrors.location = translation.errorMessages.location;
//     }
//     if (guests < 1) {
//       newErrors.guests = translation.errorMessages.guests;
//     }
//     if (!type) {
//       newErrors.type = translation.errorMessages.type;
//     }

//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }

//     alert(translation.searchAlert);
//   };

//   return (
//     <section className={styles.searchSection}>
//       <h1 className={styles.title}>{translation.title}</h1>
//       <p className={styles.subtitle}>{translation.subtitle}</p>

//       <form className={styles.form} onSubmit={handleSubmit}>
//         <div className={styles.formGroup}>
//           <label htmlFor="location">{translation.locationLabel}</label>
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={(place) => {
//               const formattedAddress = place?.formatted_address || "";
//               setLocation(formattedAddress);
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 location: formattedAddress ? undefined : translation.errorMessages.location,
//               }));
//             }}
//             onChange={(e) => {
//               const value = e.target.value;
//               setLocation(value);
//               setErrors((prevErrors) => ({
//                 ...prevErrors,
//                 location: value.trim() ? undefined : translation.errorMessages.location,
//               }));
//             }}
//             onBlur={() => {
//               if (!location.trim()) {
//                 setErrors((prevErrors) => ({
//                   ...prevErrors,
//                   location: translation.errorMessages.location,
//                 }));
//               }
//             }}
//             options={{
//               types: ["(cities)"],
//               componentRestrictions: { country: "ua" },
//             }}
//             placeholder={translation.locationPlaceholder}
//             value={location}
//           />
//           {errors.location && <span className={styles.error}>{errors.location}</span>}
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="guests">{translation.guestsLabel}</label>
//           <input
//             type="number"
//             id="guests"
//             placeholder="1"
//             value={guests > 1 ? guests : ""}
//             onChange={(e) => {
//               const value = Number(e.target.value);
//               setGuests(value >= 1 ? value : 1);
//               setErrors((prevErrors) => ({ ...prevErrors, guests: undefined }));
//             }}
//             onBlur={(e) => {
//               if (!e.target.value) setGuests(1);
//             }}
//             min="1"
//           />
//           {errors.guests && <span className={styles.error}>{errors.guests}</span>}
//         </div>

//         <div className={styles.formGroup}>
//           <label htmlFor="type">{translation.typeLabel}</label>
//           <select
//             id="type"
//             className={styles.selectGroup}
//             value={type}
//             onChange={(e) => {
//               setType(e.target.value);
//               setErrors((prevErrors) => ({ ...prevErrors, type: undefined }));
//             }}
//           >
//             <option value="">{translation.typeLabel}</option>
//             <option value="apart">{translation.options.apart}</option>
//             <option value="apartment">{translation.options.apartment}</option>
//             <option value="hotel">{translation.options.hotel}</option>
//             <option value="hostel">{translation.options.hostel}</option>
//             <option value="house">{translation.options.house}</option>
//             <option value="recreationCenter">{translation.options.recreationCenter}</option>
//             <option value="sauna">{translation.options.sauna}</option>
           
//           </select>
        
//           {errors.type && <span className={styles.error}>{errors.type}</span>}
//         </div>

//         <button type="submit" className={styles.searchButton}>
//           {translation.searchButton}
//         </button>
//       </form>
//     </section>
//   );
// };

// export default Search;

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
  const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w";

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

