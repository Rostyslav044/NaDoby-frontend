




// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Box,
//   TextField,
//   Typography,
//   Grid,
//   MenuItem,
//   FormControlLabel,
//   Checkbox,
//   Link,
// } from "@mui/material";

// const translations = {
//   ua: {
//     title: "Інформація про апартаменти",
//     phone: "Номер телефону",
//     addPhone: "Додати телефон",
//     rooms: "Кількість кімнат",
//     beds: "Максимальна кількість гостей",
//     size: "Площа (м²)",
//     floor: "Поверх розташування",
//     totalFloors: "Кількість поверхів у будинку",
//     conveniences: "Зручності",
//     checkIn: "Час заїзду",
//     checkOut: "Час виїзду",
//     fullDayCheckIn: "Цілодобове заселення",
//     smoking: "Паління в апартаментах",
//     parties: "Святкування дозволені",
//     pets: "Домашні тварини дозволені",
//     minRent: "Мінімальний термін оренди (днів)",
//     reportDocs: "Звітні документи надаються",
//     required: "Це поле обов'язкове",
//     yes: "Так",
//     no: "Ні",
//   },
//   ru: {
//     title: "Информация об апартаментах",
//     phone: "Номер телефона",
//     addPhone: "Добавить телефон",
//     rooms: "Количество комнат",
//     beds: "Максимальное количество гостей",
//     size: "Площадь (м²)",
//     floor: "Этаж размещения",
//     totalFloors: "Количество этажей в доме",
//     conveniences: "Удобства",
//     checkIn: "Время заезда",
//     checkOut: "Время выезда",
//     fullDayCheckIn: "Круглосуточное заселение",
//     smoking: "Курение в апартаментах",
//     parties: "Разрешены вечеринки",
//     pets: "Разрешены домашние животные",
//     minRent: "Минимальный срок аренды (дней)",
//     reportDocs: "Предоставляются отчетные документы",
//     required: "Это поле обязательно",
//     yes: "Да",
//     no: "Нет",
//   },
// };

// const facilitiesList = [
//   "Супутникове ТБ",
//   "Мікрохвильова піч",
//   "Душова кабіна",
//   "Холодильник",
//   "Сейф",
//   "Електрочайник",
//   "Домофон",
//   "Фен",
//   "Посуд та приладдя",
//   "Парковка",
//   "Столові прибори",
//   "Лоджія",
//   "Блендер",
//   "Духова піч",
//   "Газовий водонагрівач",
//   "Пральна машина",
//   "Посудомийна машина",
//   "Вентилятор",
//   "Ванна",
//   "Туалетне приладдя (шампуні, мило)",
//   "Балкон",
//   "Пральний порошок",
//   "Інтернет",
//   "Дитяче ліжечко",
//   "Дитячий стілець для годування",
//   "Кабельне телебачення",
//   "Кондиціонер",
//   "Сушилка для білизни",
//   "Бойлер",
//   "Змінна постільна білизна",
//   "WiFi",
//   "Запасні рушники",
//   "Ліфт",
//   "Броньовані двері",
//   "Електроплитка",
//   "Кавоварка",
//   "Камін",
//   "Дворик",
//   "Басейн",
//   "Мангал",
//   "Персональний комп'ютер",
//   "Лазня",
//   "Альтанка",
//   "Тераса",
//   "Домашній кінотеатр",
//   "Сад",
//   "Тостер",
//   "Джакузі",
//   "Сауна",
//   "Більярд",
// ];

// export default function InfoApartments() {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   const [phones, setPhones] = useState([""]);

//   const [formData, setFormData] = useState({
//     rooms: "",
//     beds: "",
//     size: "",
//     floor: "",
//     totalFloors: "",
//     checkIn: "",
//     checkOut: "",
//     fullDayCheckIn: "", // "yes" | "no"
//     smoking: "",
//     parties: "",
//     pets: "",
//     minRent: "",
//     reportDocs: "",
//     conveniences: [],
//   });

//   const handlePhoneChange = (index, value) => {
//     const onlyNumbers = value.replace(/\D/g, "");
//     const newPhones = [...phones];
//     newPhones[index] = onlyNumbers;
//     setPhones(newPhones);
//   };

//   const handleAddPhone = () => {
//     if (phones.length < 4) {
//       setPhones([...phones, ""]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: value,
//     }));
//   };

//   const handleConvenienceToggle = (item) => {
//     setFormData((prev) => {
//       const exists = prev.conveniences.includes(item);
//       return {
//         ...prev,
//         conveniences: exists
//           ? prev.conveniences.filter((i) => i !== item)
//           : [...prev.conveniences, item],
//       };
//     });
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>
//         {t.title}
//       </Typography>

//       {/* Телефоны */}
//       {phones.map((phone, index) => (
//         <TextField
//           key={index}
//           label={`${t.phone} ${index + 1}`}
//           value={phone}
//           onChange={(e) => handlePhoneChange(index, e.target.value)}
//           fullWidth
//           margin="normal"
//           inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
//           required={index === 0}
//         />
//       ))}

//       {/* Добавить телефон - ссылка под последним инпутом */}
//       {phones.length < 4 && (
//         <Typography
//           variant="body2"
//           color="primary"
//           sx={{ cursor: "pointer", mb: 2 }}
//           onClick={handleAddPhone}
//         >
//           {t.addPhone}
//         </Typography>
//       )}

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField
//             label={t.rooms}
//             name="rooms"
//             value={formData.rooms}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label={t.beds}
//             name="beds"
//             value={formData.beds}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label={t.size}
//             name="size"
//             value={formData.size}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={6} sm={3}>
//           <TextField
//             label={t.floor}
//             name="floor"
//             value={formData.floor}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={6} sm={3}>
//           <TextField
//             label={t.totalFloors}
//             name="totalFloors"
//             value={formData.totalFloors}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             type="time"
//             label={t.checkIn}
//             name="checkIn"
//             value={formData.checkIn}
//             onChange={handleChange}
//             fullWidth
//             required
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>

//         <Grid item xs={12} sm={6}>
//           <TextField
//             type="time"
//             label={t.checkOut}
//             name="checkOut"
//             value={formData.checkOut}
//             onChange={handleChange}
//             fullWidth
//             required
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>

//         {/* Убрано поле Вікове обмеження */}

//         <Grid item xs={12} sm={6}>
//           <TextField
//             label={t.minRent}
//             name="minRent"
//             value={formData.minRent}
//             onChange={handleChange}
//             fullWidth
//             required
//           />
//         </Grid>

//         {/* Инпуты с выбором "Так"/"Ні" */}
//         {[
//           { label: t.fullDayCheckIn, name: "fullDayCheckIn" },
//           { label: t.smoking, name: "smoking" },
//           { label: t.parties, name: "parties" },
//           { label: t.pets, name: "pets" },
//           { label: t.reportDocs, name: "reportDocs" },
//         ].map(({ label, name }) => (
//           <Grid item xs={12} sm={6} key={name}>
//             <TextField
//               select
//               label={label}
//               name={name}
//               value={formData[name]}
//               onChange={handleChange}
//               fullWidth
//             >
//               <MenuItem value="">{/* пустое */}</MenuItem>
//               <MenuItem value="yes">{t.yes}</MenuItem>
//               <MenuItem value="no">{t.no}</MenuItem>
//             </TextField>
//           </Grid>
//         ))}
//       </Grid>

//       {/* Зручності - чекбоксы */}
//       <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
//         {t.conveniences}
//       </Typography>
//       <Grid container spacing={1}>
//         {facilitiesList.map((item, idx) => (
//           <Grid item xs={12} sm={6} md={4} key={idx}>
//             <FormControlLabel
//               control={
//                 <Checkbox
//                   checked={formData.conveniences.includes(item)}
//                   onChange={() => handleConvenienceToggle(item)}
//                 />
//               }
//               label={item}
//             />
//           </Grid>
//         ))}
//       </Grid>
//     </Box>
//   );
// }






// 'use client';

// import React, { useState } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   MenuItem,
//   IconButton,
//   InputAdornment,
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useLanguage } from "@/app/LanguageContext";

// const translations = {
//   ua: {
//     phone: "Номер телефону",
//     addPhone: "Додати телефон",
//     rooms: "Кількість кімнат",
//     beds: "Максимальна кількість гостей",
//     size: "Площа (м²)",
//     floor: "Поверх",
//     totalFloors: "Всього поверхів",
//     checkIn: "Час заїзду",
//     checkOut: "Час виселення",
//     fullDayCheckIn: "Цілодобове заселення",
//     smoking: "Паління",
//     parties: "Святкування",
//     pets: "Тварини",
//     minRent: "Мін. оренда (днів)",
//     reportDocs: "Звітні документи",
//     deposit: "Залог",
//     depositNone: "Немає",
//     depositDailyPrice: "Ціна за добу",
//     yes: "Так",
//     no: "Ні",
//     ageLimit: "Вікове обмеження від",
//   },
//   ru: {
//     phone: "Номер телефона",
//     addPhone: "Добавить телефон",
//     rooms: "Количество комнат",
//     beds: "Макс. кол-во гостей",
//     size: "Площадь (м²)",
//     floor: "Этаж",
//     totalFloors: "Всего этажей",
//     checkIn: "Время заезда",
//     checkOut: "Время выезда",
//     fullDayCheckIn: "Круглосуточное заселение",
//     smoking: "Курение",
//     parties: "Вечеринки",
//     pets: "Животные",
//     minRent: "Мин. аренда (дней)",
//     reportDocs: "Отчетные документы",
//     deposit: "Залог",
//     depositNone: "Нет",
//     depositDailyPrice: "Цена за сутки",
//     yes: "Да",
//     no: "Нет",
//     ageLimit: "Возрастное ограничение от",
//   },
// };

// export default function InfoApartments() {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   const [phones, setPhones] = useState([""]);
//   const [formData, setFormData] = useState({
//     rooms: "", beds: "", size: "", floor: "", totalFloors: "",
//     checkIn: "", checkOut: "", minRent: "", fullDayCheckIn: "",
//     smoking: "", parties: "", pets: "", reportDocs: "", deposit: "",
//     ageLimit: "",
//   });

//   const numericFields = ["rooms", "beds", "size", "floor", "totalFloors", "minRent", "ageLimit"];

//   const handlePhoneChange = (index, value) => {
//     const cleaned = value.replace(/\D/g, "");
//     const newPhones = [...phones];
//     newPhones[index] = cleaned;
//     setPhones(newPhones);
//   };

//   const handleAddPhone = () => {
//     if (phones.length < 4) {
//       setPhones([...phones, ""]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     const newValue = numericFields.includes(name) ? value.replace(/\D/g, "") : value;
//     setFormData((prev) => ({ ...prev, [name]: newValue }));
//   };

//   const renderPhoneFields = () =>
//     phones.map((phone, index) => (
//       <Grid item xs={12} key={index}>
//         <TextField
//           fullWidth
//           label={`${t.phone} ${index + 1}`}
//           value={phone}
//           onChange={(e) => handlePhoneChange(index, e.target.value)}
//           inputProps={{ inputMode: "numeric", maxLength: 15 }}
//           InputProps={{
//             endAdornment:
//               index === phones.length - 1 && phones.length < 4 ? (
//                 <InputAdornment position="end">
//                   <IconButton onClick={handleAddPhone} edge="end" color="primary">
//                     <AddIcon />
//                   </IconButton>
//                 </InputAdornment>
//               ) : null,
//           }}
//         />
//       </Grid>
//     ));

//   return (
//     <Box sx={{ p: 2 }}>
//       <Grid container spacing={2}>
//         {/* Телефоны */}
//         <Grid item xs={12} md={6}>
//           {renderPhoneFields()}
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             name="ageLimit"
//             label={t.ageLimit}
//             value={formData.ageLimit}
//             onChange={handleChange}
//           />
//         </Grid>

//         {/* Пары инпутов */}
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             name="rooms"
//             label={t.rooms}
//             value={formData.rooms}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             name="beds"
//             label={t.beds}
//             value={formData.beds}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             name="floor"
//             label={t.floor}
//             value={formData.floor}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             name="totalFloors"
//             label={t.totalFloors}
//             value={formData.totalFloors}
//             onChange={handleChange}
//           />
//         </Grid>

//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             type="time"
//             name="checkIn"
//             label={t.checkIn}
//             value={formData.checkIn}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             type="time"
//             name="checkOut"
//             label={t.checkOut}
//             value={formData.checkOut}
//             onChange={handleChange}
//             InputLabelProps={{ shrink: true }}
//           />
//         </Grid>

//         {/* Остальные инпуты */}
//         <Grid item xs={12} md={6}>
//           <TextField
//             fullWidth
//             name="size"
//             label={t.size}
//             value={formData.size}
//             onChange={handleChange}
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             name="minRent"
//             label={t.minRent}
//             value={formData.minRent}
//             onChange={handleChange}
//             fullWidth
//           />
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             select
//             fullWidth
//             name="fullDayCheckIn"
//             label={t.fullDayCheckIn}
//             value={formData.fullDayCheckIn}
//             onChange={handleChange}
//           >
//             <MenuItem value="yes">{t.yes}</MenuItem>
//             <MenuItem value="no">{t.no}</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             select
//             fullWidth
//             name="smoking"
//             label={t.smoking}
//             value={formData.smoking}
//             onChange={handleChange}
//           >
//             <MenuItem value="yes">{t.yes}</MenuItem>
//             <MenuItem value="no">{t.no}</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             select
//             fullWidth
//             name="parties"
//             label={t.parties}
//             value={formData.parties}
//             onChange={handleChange}
//           >
//             <MenuItem value="yes">{t.yes}</MenuItem>
//             <MenuItem value="no">{t.no}</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             select
//             fullWidth
//             name="pets"
//             label={t.pets}
//             value={formData.pets}
//             onChange={handleChange}
//           >
//             <MenuItem value="yes">{t.yes}</MenuItem>
//             <MenuItem value="no">{t.no}</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             select
//             fullWidth
//             name="reportDocs"
//             label={t.reportDocs}
//             value={formData.reportDocs}
//             onChange={handleChange}
//           >
//             <MenuItem value="yes">{t.yes}</MenuItem>
//             <MenuItem value="no">{t.no}</MenuItem>
//           </TextField>
//         </Grid>
//         <Grid item xs={12} md={6}>
//           <TextField
//             select
//             fullWidth
//             name="deposit"
//             label={t.deposit}
//             value={formData.deposit}
//             onChange={handleChange}
//           >
//             <MenuItem value="none">{t.depositNone}</MenuItem>
//             <MenuItem value="daily">{t.depositDailyPrice}</MenuItem>
//           </TextField>
//         </Grid>
//       </Grid>
//     </Box>
//   );
// }








'use client';

import React, { useState } from "react";
import {
  Box,
  Grid,
  TextField,
  MenuItem,
  IconButton,
  InputAdornment,
  Typography,
  FormControlLabel,
  Checkbox,
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLanguage } from "@/app/LanguageContext";

const translations = {
  ua: {
    phone: "Номер телефону",
    addPhone: "Додати телефон",
    rooms: "Кількість кімнат",
    beds: "Максимальна кількість гостей",
    size: "Площа (м²)",
    floor: "Поверх",
    totalFloors: "Всього поверхів",
    checkIn: "Час заїзду",
    checkOut: "Час виселення",
    fullDayCheckIn: "Цілодобове заселення",
    smoking: "Паління ",
    parties: "Святкування",
    pets: "Перебування с тваринами",
    minRent: "Мінімальний термін оренди ",
    reportDocs: "Звітні документи",
    deposit: "Застава",
    depositNone: "Немає",
    depositDailyPrice: "Ціна за добу",
    yes: "Так",
    no: "Ні",
    ageLimit: "Вікове обмеження від",
    conveniences: "Зручності",
    facilities: {
      satelliteTV: "Супутникове ТБ",
      microwave: "Мікрохвильова піч",
      shower: "Душова кабіна",
      fridge: "Холодильник",
      safe: "Сейф",
      kettle: "Електрочайник",
      intercom: "Домофон",
      hairDryer: "Фен",
      utensils: "Посуд та приладдя",
      parking: "Парковка",
      cutlery: "Столові прибори",
      loggia: "Лоджія",
      blender: "Блендер",
      oven: "Духова піч",
      waterHeater: "Газовий водонагрівач",
      washingMachine: "Пральна машина",
      dishwasher: "Посудомийна машина",
      fan: "Вентилятор",
      bath: "Ванна",
      toiletries: "Туалетне приладдя (шампуні, мило)",
      balcony: "Балкон",
      detergent: "Пральний порошок",
      internet: "Інтернет",
      crib: "Дитяче ліжечко",
      highchair: "Дитячий стілець для годування",
      cableTV: "Кабельне телебачення",
      airConditioning: "Кондиціонер",
      clothesDryer: "Сушилка для білизни",
      boiler: "Бойлер",
      linens: "Змінна постільна білизна",
      wifi: "WiFi",
      extraTowels: "Запасні рушники",
      elevator: "Ліфт",
      securityDoors: "Броньовані двері",
      hotplate: "Електроплитка",
      coffeeMaker: "Кавоварка",
      fireplace: "Камін",
      courtyard: "Дворик",
      pool: "Басейн",
      barbecue: "Мангал",
      pc: "Персональний комп'ютер",
      sauna: "Лазня",
      gazebo: "Альтанка",
      terrace: "Тераса",
      homeTheater: "Домашній кінотеатр",
      garden: "Сад",
      toaster: "Тостер",
      jacuzzi: "Джакузі",
      steamRoom: "Сауна",
      billiards: "Більярд",
      clothesDrier: "Сушилка для речей",
    }
  },
  ru: {
    phone: "Номер телефона",
    addPhone: "Добавить телефон",
    rooms: "Количество комнат",
    beds: "Макс. кол-во гостей",
    size: "Площадь (м²)",
    floor: "Этаж",
    totalFloors: "Всего этажей",
    checkIn: "Время заезда",
    checkOut: "Время выезда",
    fullDayCheckIn: "Круглосуточное заселение",
    smoking: "Курение",
    parties: "Вечеринки",
    pets: " Перебывание с животными",
    minRent: "Минимальный срок аренды",
    reportDocs: "Отчетные документы",
    deposit: "Залог",
    depositNone: "Нет",
    depositDailyPrice: "Цена за сутки",
    yes: "Да",
    no: "Нет",
    ageLimit: "Возрастное ограничение от",
    conveniences: "Удобства",
    facilities: {
      satelliteTV: "Спутниковое ТВ",
      microwave: "Микроволновая печь",
      shower: "Душевая кабина",
      fridge: "Холодильник",
      safe: "Сейф",
      kettle: "Электрочайник",
      intercom: "Домофон",
      hairDryer: "Фен",
      utensils: "Посуда и принадлежности",
      parking: "Парковка",
      cutlery: "Столовые приборы",
      loggia: "Лоджия",
      blender: "Блендер",
      oven: "Духовка",
      waterHeater: "Газовый водонагреватель",
      washingMachine: "Стиральная машина",
      dishwasher: "Посудомоечная машина",
      fan: "Вентилятор",
      bath: "Ванна",
      toiletries: "Туалетные принадлежности (шампунь, мыло)",
      balcony: "Балкон",
      detergent: "Стиральный порошок",
      internet: "Интернет",
      crib: "Детская кроватка",
      highchair: "Детский стульчик для кормления",
      cableTV: "Кабельное телевидение",
      airConditioning: "Кондиционер",
      clothesDryer: "Сушилка для белья",
      boiler: "Бойлер",
      linens: "Смена постельного белья",
      wifi: "WiFi",
      extraTowels: "Запасные полотенца",
      elevator: "Лифт",
      securityDoors: "Бронированные двери",
      hotplate: "Электроплитка",
      coffeeMaker: "Кофеварка",
      fireplace: "Камин",
      courtyard: "Дворик",
      pool: "Бассейн",
      barbecue: "Мангал",
      pc: "Персональный компьютер",
      sauna: "Сауна",
      gazebo: "Беседка",
      terrace: "Терраса",
      homeTheater: "Домашний кинотеатр",
      garden: "Сад",
      toaster: "Тостер",
      jacuzzi: "Джакузи",
      steamRoom: "Парная",
      billiards: "Бильярд",
      clothesDrier: "Сушилка для вещей",
    }
  },
};

export default function InfoApartments() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const [phones, setPhones] = useState([""]);
  const [formData, setFormData] = useState({
    rooms: "", beds: "", size: "", floor: "", totalFloors: "",
    checkIn: "", checkOut: "", minRent: "", fullDayCheckIn: "",
    smoking: "", parties: "", pets: "", reportDocs: "", deposit: "",
    ageLimit: "",
    conveniences: [],
  });

  const numericFields = ["rooms", "beds", "size", "floor", "totalFloors", "minRent", "ageLimit"];

  const handlePhoneChange = (index, value) => {
    const cleaned = value.replace(/\D/g, "");
    const newPhones = [...phones];
    newPhones[index] = cleaned;
    setPhones(newPhones);
  };

  const handleAddPhone = () => {
    if (phones.length < 4) {
      setPhones([...phones, ""]);
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    const newValue = numericFields.includes(name) ? value.replace(/\D/g, "") : value;
    setFormData((prev) => ({ ...prev, [name]: newValue }));
  };

  const handleConvenienceToggle = (convenience) => {
    setFormData(prev => {
      const newConveniences = prev.conveniences.includes(convenience)
        ? prev.conveniences.filter(c => c !== convenience)
        : [...prev.conveniences, convenience];
      return { ...prev, conveniences: newConveniences };
    });
  };

  // const renderPhoneFields = () =>
  //   phones.map((phone, index) => (
  //     <Grid item xs={12} key={index}>
  //       <TextField
  //         fullWidth
  //         label={`${t.phone} ${index + 1}`}
  //         value={phone}
  //         onChange={(e) => handlePhoneChange(index, e.target.value)}
  //         inputProps={{ inputMode: "numeric", maxLength: 15 }}
  //         InputProps={{
  //           endAdornment:
  //             index === phones.length - 1 && phones.length < 4 ? (
  //               <InputAdornment position="end">
  //                 <IconButton onClick={handleAddPhone} edge="end" color="primary">
  //                   <AddIcon />
  //                 </IconButton>
  //               </InputAdornment>
  //             ) : null,
  //         }}
  //       />
  //     </Grid>
  //   ));

  const renderPhoneFields = () =>
  phones.map((phone, index) => (
    <Grid item xs={12} key={index} sx={{ mb: 2 }}>
      <TextField
        fullWidth
        label={`${t.phone} ${index + 1}`}
        value={phone}
        onChange={(e) => handlePhoneChange(index, e.target.value)}
        inputProps={{ inputMode: "numeric", maxLength: 15 }}
        sx={{ mb: 1 }} // Добавлен отступ внутри TextField
        InputProps={{
          endAdornment:
            index === phones.length - 1 && phones.length < 4 ? (
              <InputAdornment position="end">
                <IconButton 
                  onClick={handleAddPhone} 
                  edge="end" 
                  color="primary"
                  sx={{ ml: 1 }} // Добавлен отступ слева от иконки
                >
                  <AddIcon />
                </IconButton>
              </InputAdornment>
            ) : null,
        }}
      />
    </Grid>
  ));



  const renderFacilities = () => {
    const facilityKeys = Object.keys(t.facilities);
    return facilityKeys.map((key) => (
      <Grid item xs={12} sm={6} md={4} key={key}>
        <FormControlLabel
          control={
            <Checkbox
              checked={formData.conveniences.includes(key)}
              onChange={() => handleConvenienceToggle(key)}
            />
          }
          label={t.facilities[key]}
        />
      </Grid>
    ));
  };

  return (
    <Box sx={{ p: 2 }}>
      <Grid container spacing={2}>
        {/* Телефоны */}
        <Grid item xs={12} md={6}>
          {renderPhoneFields()}
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="ageLimit"
            label={t.ageLimit}
            value={formData.ageLimit}
            onChange={handleChange}
          />
        </Grid>

        {/* Пары инпутов */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="rooms"
            label={t.rooms}
            value={formData.rooms}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="beds"
            label={t.beds}
            value={formData.beds}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="floor"
            label={t.floor}
            value={formData.floor}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="totalFloors"
            label={t.totalFloors}
            value={formData.totalFloors}
            onChange={handleChange}
          />
        </Grid>

        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="time"
            name="checkIn"
            label={t.checkIn}
            value={formData.checkIn}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            type="time"
            name="checkOut"
            label={t.checkOut}
            value={formData.checkOut}
            onChange={handleChange}
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        {/* Остальные инпуты */}
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="size"
            label={t.size}
            value={formData.size}
            onChange={handleChange}
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            name="minRent"
            label={t.minRent}
            value={formData.minRent}
            onChange={handleChange}
            fullWidth
          />
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="fullDayCheckIn"
            label={t.fullDayCheckIn}
            value={formData.fullDayCheckIn}
            onChange={handleChange}
          >
            <MenuItem value="yes">{t.yes}</MenuItem>
            <MenuItem value="no">{t.no}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="smoking"
            label={t.smoking}
            value={formData.smoking}
            onChange={handleChange}
          >
            <MenuItem value="yes">{t.yes}</MenuItem>
            <MenuItem value="no">{t.no}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="parties"
            label={t.parties}
            value={formData.parties}
            onChange={handleChange}
          >
            <MenuItem value="yes">{t.yes}</MenuItem>
            <MenuItem value="no">{t.no}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="pets"
            label={t.pets}
            value={formData.pets}
            onChange={handleChange}
          >
            <MenuItem value="yes">{t.yes}</MenuItem>
            <MenuItem value="no">{t.no}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="reportDocs"
            label={t.reportDocs}
            value={formData.reportDocs}
            onChange={handleChange}
          >
            <MenuItem value="yes">{t.yes}</MenuItem>
            <MenuItem value="no">{t.no}</MenuItem>
          </TextField>
        </Grid>
        <Grid item xs={12} md={6}>
          <TextField
            select
            fullWidth
            name="deposit"
            label={t.deposit}
            value={formData.deposit}
            onChange={handleChange}
          >
            <MenuItem value="none">{t.depositNone}</MenuItem>
            <MenuItem value="daily">{t.depositDailyPrice}</MenuItem>
          </TextField>
        </Grid>
      </Grid>

      {/* Удобства */}
      {/* <Typography variant="h6" sx={{ mt: 4, mb: 2 }}>
        {t.conveniences}
      </Typography>
      <Grid container spacing={2}>
        {renderFacilities()}
      </Grid> */}

{/* Удобства с новыми стилями */}
<Box sx={{ 
  width: '100%',
  display: 'flex',
  flexDirection: 'column',
  alignItems: 'center',
  mt: 4
}}>
  <Typography 
    variant="h5" 
    sx={{ 
      mb: 3,
      fontSize: '2.3rem',
      // fontWeight: 600,
      textAlign: 'center',
      width: '100%'
    }}
  >
    {t.conveniences}
  </Typography>
  
  <Grid 
    container 
    spacing={2} 
    sx={{ 
      maxWidth: '1200px',
      justifyContent: 'center'
    }}
  >
    {renderFacilities()}
  </Grid>
</Box>

    </Box>
  );
}