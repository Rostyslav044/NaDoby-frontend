



// "use client";

// import React, { useState } from "react";
// import Autocomplete from "react-google-autocomplete";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Container,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Box,
// } from "@mui/material";

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
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!location.trim()) newErrors.location = translation.errorMessages.location;
//     if (guests < 1) newErrors.guests = translation.errorMessages.guests;
//     if (!type) newErrors.type = translation.errorMessages.type;
//     if (Object.keys(newErrors).length > 0) {
//       setErrors(newErrors);
//       return;
//     }
//     alert(translation.searchAlert);
//   };

//   const handlePlaceSelected = (place) => {
//     const cityComponent = place?.address_components?.find(comp =>
//       comp.types.includes("locality")
//     );
//     const city = cityComponent?.long_name || place?.formatted_address || "";
//     setLocation(city);
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 3,
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h5" fontWeight={600} gutterBottom>
//         {translation.title}
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         {translation.subtitle}
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//       >
//         {/* Автозаполнение города только по Украине */}
//         <Box>
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={handlePlaceSelected}
//             options={{
//               types: ["(cities)"],
//               componentRestrictions: { country: "ua" },
//             }}
//             placeholder={translation.locationPlaceholder}
//             language={currentLanguage === "ua" ? "uk" : "ru"}
//             style={{
//               width: "100%",
//               height: "56px",
//               fontSize: "16px",
//               padding: "0 14px",
//               border: errors.location
//                 ? "1px solid red"
//                 : "1px solid rgba(0, 0, 0, 0.23)",
//               borderRadius: "4px",
//               boxSizing: "border-box",
//               display: "flex",
//               alignItems: "center",
//               marginBottom: errors.location ? "4px" : 0,
//             }}
//           />
//           {errors.location && (
//             <Typography variant="caption" color="error">
//               {errors.location}
//             </Typography>
//           )}
//         </Box>

//         <TextField
//           type="number"
//           label={translation.guestsLabel}
//           fullWidth
//           value={guests > 1 ? guests : ""}
//           onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
//           error={!!errors.guests}
//           helperText={errors.guests}
//           inputProps={{ min: 1 }}
//         />

//         <TextField
//           select
//           label={translation.typeLabel}
//           fullWidth
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           error={!!errors.type}
//           helperText={errors.type}
//         >
//           <MenuItem value="">{translation.typeLabel}</MenuItem>
//           {Object.entries(translation.options).map(([key, value]) => (
//             <MenuItem key={key} value={key}>
//               {value}
//             </MenuItem>
//           ))}
//         </TextField>

//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           {translation.searchButton}
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Search;





// "use client";

// import React, { useState } from "react";
// import Autocomplete from "react-google-autocomplete";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Container,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Box,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";

// const translations = {
//   ua: {
//     title: "Обирайте житло для своєї наступної подорожі",
//     subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
//     locationLabel: "Куди прямуєте?",
//     locationPlaceholder: "Введіть місцезнаходження",
//     nearby: "Поруч зі мною",
//     guestsLabel: "Кількість гостей",
//     typeLabel: "Тип помешкання",
//     options: {
//       apart: "Квартири",
//       hotel: "Готель",
//       hostel: "Хостел",
//       house: "Будинок",
//       recreationCenter: "База відпочинку",
//       sauna: "Сауна/Баня",
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
//     nearby: "Рядом со мной",
//     guestsLabel: "Количество гостей",
//     typeLabel: "Тип жилья",
//     options: {
//       apart: "Квартиры",
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
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const handlePlaceSelected = (place) => {
//     const cityComponent = place?.address_components?.find((comp) =>
//       comp.types.includes("locality")
//     );
//     const city = cityComponent?.long_name || place?.formatted_address || "";
//     setLocation(city);
//   };

//   const handleNearbySearch = () => {
//     if (!navigator.geolocation) {
//       alert(
//         currentLanguage === "ua"
//           ? "Геолокація не підтримується вашим браузером."
//           : "Геолокация не поддерживается вашим браузером."
//       );
//       return;
//     }

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const res = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}&language=${currentLanguage === "ua" ? "uk" : "ru"}`
//           );
//           const data = await res.json();
//           const cityComponent = data.results[0]?.address_components?.find((comp) =>
//             comp.types.includes("locality")
//           );
//           const city = cityComponent?.long_name || data.results[0]?.formatted_address;
//           if (city) {
//             setLocation(city);
//           }
//         } catch (error) {
//           console.error("Помилка геолокації:", error);
//         }
//       },
//       () => {
//         alert(
//           currentLanguage === "ua"
//             ? "Не вдалося отримати геолокацію."
//             : "Не удалось получить геолокацию."
//         );
//       }
//     );
//   };

//   const handleSubmit = (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!location.trim()) newErrors.location = translation.errorMessages.location;
//     if (!guests || guests < 1) newErrors.guests = translation.errorMessages.guests;
//     if (!type || type === "") newErrors.type = translation.errorMessages.type;
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       alert(translation.searchAlert);
//       // Действие после успешного поиска (фильтрация, редирект и т.д.)
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 3,
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h5" fontWeight={600} gutterBottom>
//         {translation.title}
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         {translation.subtitle}
//       </Typography>

//       <Box
//         component="form"
//         onSubmit={handleSubmit}
//         sx={{ display: "flex", flexDirection: "column", gap: 2 }}
//       >
//         {/* Кнопка "Рядом со мной" */}
//         <Button
//           onClick={handleNearbySearch}
//           variant="contained"
//           startIcon={<LocationOnIcon />}
//           sx={{
//             backgroundColor: "#1976d2",
//             color: "#fff",
//             textTransform: "none",
//             fontWeight: "bold",
//             "&:hover": {
//               backgroundColor: "#115293",
//             },
//           }}
//         >
//           {translation.nearby}
//         </Button>

//         {/* Автокомплит города */}
//         <Box>
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={handlePlaceSelected}
//             options={{
//               types: ["(cities)"],
//               componentRestrictions: { country: "ua" },
//             }}
//             placeholder={translation.locationPlaceholder}
//             language={currentLanguage === "ua" ? "uk" : "ru"}
//             style={{
//               width: "100%",
//               height: "56px",
//               fontSize: "16px",
//               padding: "0 14px",
//               border: errors.location
//                 ? "1px solid red"
//                 : "1px solid rgba(0, 0, 0, 0.23)",
//               borderRadius: "4px",
//               boxSizing: "border-box",
//               display: "flex",
//               alignItems: "center",
//             }}
//           />
//           {errors.location && (
//             <Typography variant="caption" color="error">
//               {errors.location}
//             </Typography>
//           )}
//         </Box>

//         {/* Кол-во гостей */}
//         <TextField
//           type="number"
//           label={translation.guestsLabel}
//           fullWidth
//           value={guests > 0 ? guests : ""}
//           onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
//           error={!!errors.guests}
//           helperText={errors.guests}
//           inputProps={{ min: 1 }}
//         />

//         {/* Тип жилья */}
//         <TextField
//           select
//           label={translation.typeLabel}
//           fullWidth
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           error={!!errors.type}
//           helperText={errors.type}
//         >
//           <MenuItem value="">{translation.typeLabel}</MenuItem>
//           {Object.entries(translation.options).map(([key, value]) => (
//             <MenuItem key={key} value={key}>
//               {value}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Кнопка поиска */}
//         <Button type="submit" variant="contained" color="primary" fullWidth>
//           {translation.searchButton}
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Search;



// "use client";

// import React, { useState } from "react";
// import Autocomplete from "react-google-autocomplete";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Container,
//   Typography,
//   TextField,
//   MenuItem,
//   Button,
//   Box,
// } from "@mui/material";
// import LocationOnIcon from "@mui/icons-material/LocationOn";
// import FavoriteIcon from "@mui/icons-material/Favorite";

// const translations = {
//   ua: {
//     title: "Обирайте житло для своєї наступної подорожі",
//     subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
//     locationLabel: "Куди прямуєте?",
//     locationPlaceholder: "Введіть місцезнаходження",
//     nearby: "Поруч зі мною",
//     guestsLabel: "Кількість гостей",
//     typeLabel: "Тип помешкання",
//     options: {
//       apart: "Квартири",
//       hotel: "Готель",
//       hostel: "Хостел",
//       house: "Будинок",
//       recreationCenter: "База відпочинку",
//       sauna: "Сауна/Баня",
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
//     nearby: "Рядом со мной",
//     guestsLabel: "Количество гостей",
//     typeLabel: "Тип жилья",
//     options: {
//       apart: "Квартиры",
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

// // ❤️ Анимированное сердечко
// const HeartSpinner = () => (
//   <FavoriteIcon
//     sx={{
//       animation: "pulse 1s infinite",
//       color: "#ff1744",
//       fontSize: "22px",
//       "@keyframes pulse": {
//         "0%": { transform: "scale(1)" },
//         "50%": { transform: "scale(1.3)" },
//         "100%": { transform: "scale(1)" },
//       },
//     }}
//   />
// );

// const Search = () => {
//   const [location, setLocation] = useState("");
//   const [guests, setGuests] = useState(1);
//   const [type, setType] = useState("");
//   const [errors, setErrors] = useState({});
//   const [loadingGeo, setLoadingGeo] = useState(false);
//   const [loadingSearch, setLoadingSearch] = useState(false);

//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];
//   const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

//   const handlePlaceSelected = (place) => {
//     const cityComponent = place?.address_components?.find((comp) =>
//       comp.types.includes("locality")
//     );
//     const fullAddress = cityComponent?.long_name || place?.formatted_address || "";
//     setLocation(fullAddress);
//   };

//   const handleNearbySearch = () => {
//     if (!navigator.geolocation) {
//       alert(
//         currentLanguage === "ua"
//           ? "Геолокація не підтримується вашим браузером."
//           : "Геолокация не поддерживается вашим браузером."
//       );
//       return;
//     }

//     setLoadingGeo(true);

//     navigator.geolocation.getCurrentPosition(
//       async (position) => {
//         const { latitude, longitude } = position.coords;
//         try {
//           const response = await fetch(
//             `https://maps.googleapis.com/maps/api/geocode/json?latlng=${latitude},${longitude}&key=${googleMapsApiKey}&language=${currentLanguage === "ua" ? "uk" : "ru"}`
//           );
//           const data = await response.json();
//           if (data.status === "OK" && data.results.length > 0) {
//             const fullAddress = data.results[0].formatted_address;
//             setLocation(fullAddress);
//           } else {
//             alert(currentLanguage === "ua"
//               ? "Не вдалося визначити адресу."
//               : "Не удалось определить адрес.");
//           }
//         } catch (err) {
//           console.error("Помилка геолокації:", err);
//         } finally {
//           setLoadingGeo(false);
//         }
//       },
//       () => {
//         alert(
//           currentLanguage === "ua"
//             ? "Не вдалося отримати геолокацію."
//             : "Не удалось получить геолокацию."
//         );
//         setLoadingGeo(false);
//       }
//     );
//   };

//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     const newErrors = {};
//     if (!location.trim()) newErrors.location = t.errorMessages.location;
//     if (!guests || guests < 1) newErrors.guests = t.errorMessages.guests;
//     if (!type) newErrors.type = t.errorMessages.type;
//     setErrors(newErrors);

//     if (Object.keys(newErrors).length === 0) {
//       setLoadingSearch(true);
//       await new Promise((resolve) => setTimeout(resolve, 1000));
//       alert(t.searchAlert);
//       setLoadingSearch(false);
//     }
//   };

//   return (
//     <Container
//       maxWidth="sm"
//       sx={{
//         mt: 4,
//         p: 3,
//         bgcolor: "background.paper",
//         borderRadius: 2,
//         boxShadow: 3,
//       }}
//     >
//       <Typography variant="h5" fontWeight={600} gutterBottom>
//         {t.title}
//       </Typography>
//       <Typography variant="body1" color="text.secondary" gutterBottom>
//         {t.subtitle}
//       </Typography>

//       <Box component="form" onSubmit={handleSubmit} sx={{ display: "flex", flexDirection: "column", gap: 2 }}>
//         {/* Кнопка: Поруч зі мною */}
//         <Button
//           onClick={handleNearbySearch}
//           variant="contained"
//           startIcon={<LocationOnIcon />}
//           disabled={loadingGeo}
//           sx={{
//             backgroundColor: "#1976d2",
//             color: "#fff",
//             textTransform: "none",
//             fontWeight: "bold",
//             "&:hover": { backgroundColor: "#115293" },
//           }}
//         >
//           {loadingGeo ? <HeartSpinner /> : t.nearby}
//         </Button>

//         {/* Поле местоположения */}
//         <Box>
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={handlePlaceSelected}
//             options={{
//               types: ["(cities)"],
//               componentRestrictions: { country: "ua" },
//             }}
//             placeholder={t.locationPlaceholder}
//             language={currentLanguage === "ua" ? "uk" : "ru"}
//             defaultValue={location}
//             style={{
//               width: "100%",
//               height: "56px",
//               fontSize: "16px",
//               padding: "0 14px",
//               border: errors.location
//                 ? "1px solid red"
//                 : "1px solid rgba(0, 0, 0, 0.23)",
//               borderRadius: "4px",
//               boxSizing: "border-box",
//               display: "flex",
//               alignItems: "center",
//             }}
//           />
//           {errors.location && (
//             <Typography variant="caption" color="error">
//               {errors.location}
//             </Typography>
//           )}
//         </Box>

//         {/* Кол-во гостей */}
//         <TextField
//           type="number"
//           label={t.guestsLabel}
//           fullWidth
//           value={guests > 0 ? guests : ""}
//           onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
//           error={!!errors.guests}
//           helperText={errors.guests}
//           inputProps={{ min: 1 }}
//         />

//         {/* Тип жилья */}
//         <TextField
//           select
//           label={t.typeLabel}
//           fullWidth
//           value={type}
//           onChange={(e) => setType(e.target.value)}
//           error={!!errors.type}
//           helperText={errors.type}
//         >
//           <MenuItem value="">{t.typeLabel}</MenuItem>
//           {Object.entries(t.options).map(([key, label]) => (
//             <MenuItem key={key} value={key}>
//               {label}
//             </MenuItem>
//           ))}
//         </TextField>

//         {/* Кнопка Поиск */}
//         <Button
//           type="submit"
//           variant="contained"
//           color="primary"
//           fullWidth
//           disabled={loadingSearch}
//         >
//           {loadingSearch ? <HeartSpinner /> : t.searchButton}
//         </Button>
//       </Box>
//     </Container>
//   );
// };

// export default Search;





"use client";

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
  Select,
  Checkbox,
  ListItemText,
} from "@mui/material";
import LocationOnIcon from "@mui/icons-material/LocationOn";
import FavoriteIcon from "@mui/icons-material/Favorite";

const translations = {
  ua: {
    title: "Обирайте житло для своєї наступної подорожі",
    subtitle: "Від готелів до приватних помешкань – знайдіть те, що потрібно.",
    locationLabel: "Куди прямуєте?",
    locationPlaceholder: "Введіть місцезнаходження",
    nearby: "Поруч зі мною",
    guestsLabel: "Кількість гостей",
    typeLabel: "Тип помешкання",
    options: {
      apart: "Квартири",
      hotel: "Готель",
      hostel: "Хостел",
      house: "Будинок",
      recreationCenter: "База відпочинку",
      sauna: "Сауна/Баня",
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
    nearby: "Рядом со мной",
    guestsLabel: "Количество гостей",
    typeLabel: "Тип жилья",
    options: {
      apart: "Квартиры",
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

// ❤️ Анимированное сердечко
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
  const [errors, setErrors] = useState({});
  const [loadingGeo, setLoadingGeo] = useState(false);
  const [loadingSearch, setLoadingSearch] = useState(false);

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];
  const googleMapsApiKey = process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY;

  const handlePlaceSelected = (place) => {
    const cityComponent = place?.address_components?.find((comp) =>
      comp.types.includes("locality")
    );
    const fullAddress = cityComponent?.long_name || place?.formatted_address || "";
    setLocation(fullAddress);
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
    const newErrors = {};
    if (!location.trim()) newErrors.location = t.errorMessages.location;
    if (!guests || guests < 1) newErrors.guests = t.errorMessages.guests;
    if (types.length === 0) newErrors.type = t.errorMessages.type;
    setErrors(newErrors);

    if (Object.keys(newErrors).length === 0) {
      setLoadingSearch(true);
      await new Promise((resolve) => setTimeout(resolve, 1000));
      alert(t.searchAlert);
      setLoadingSearch(false);
    }
  };

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
        {/* Кнопка: Поруч зі мною */}
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

        {/* Поле местоположения */}
        <Box>
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
            }}
          />
          {errors.location && (
            <Typography variant="caption" color="error">
              {errors.location}
            </Typography>
          )}
        </Box>

        {/* Кол-во гостей */}
        <TextField
          type="number"
          label={t.guestsLabel}
          fullWidth
          value={guests > 0 ? guests : ""}
          onChange={(e) => setGuests(Math.max(1, Number(e.target.value)))}
          error={!!errors.guests}
          helperText={errors.guests}
          inputProps={{ min: 1 }}
        />

        {/* Тип жилья (множественный выбор) */}
        <Box>
          <Select
            multiple
            fullWidth
            displayEmpty
            value={types}
            onChange={(e) => setTypes(e.target.value)}
            renderValue={(selected) =>
              selected.length === 0
                ? t.typeLabel
                : selected.map((val) => t.options[val]).join(", ")
            }
            error={!!errors.type}
          >
            {Object.entries(t.options).map(([key, label]) => (
              <MenuItem key={key} value={key}>
                <Checkbox checked={types.indexOf(key) > -1} />
                <ListItemText primary={label} />
              </MenuItem>
            ))}
          </Select>
          {errors.type && (
            <Typography variant="caption" color="error">
              {errors.type}
            </Typography>
          )}
        </Box>

        {/* Кнопка Поиск */}
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
