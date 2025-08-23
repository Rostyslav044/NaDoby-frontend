





// 'use client';


// import React, { useState, forwardRef, useImperativeHandle, useCallback } from "react";
// import {
//   Box,
//   Grid,
//   TextField,
//   MenuItem,
//   IconButton,
//   InputAdornment,
//   Typography,
//   FormControlLabel,
//   Checkbox,
//   FormControl,
//   InputLabel,
//   Select
// } from "@mui/material";
// import AddIcon from "@mui/icons-material/Add";
// import { useLanguage } from "@/app/LanguageContext";

// const translations = {
//   ua: {
//     title: "Інформація про апартаменти",
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
//     deposit: "Залог (грн)",
//     yes: "Так",
//     no: "Ні",
//     ageLimit: "Вікове обмеження від",
//     conveniences: "Зручності",
//     name: "Ваше ім'я",
//     kidsAge: "Вік дитини від",
//   },
//   ru: {
//     title: "Информация об апартаментах",
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
//     deposit: "Залог (грн)",
//     yes: "Да",
//     no: "Нет",
//     ageLimit: "Возрастное ограничение от",
//     conveniences: "Удобства",
//     name: "Ваше имя",
//     kidsAge: "Возраст ребёнка от",
//   },
// };

// // const facilitiesList = [
// //   "Балкон",
// //   "Барбекю-зона",
// //   "Басейн",
// //   "Ігрова кімната",
// //   "Блендер",
// //   "Бойлер",
// //   "Ванна",
// //   "Вентилятор",
// //   "Генератор",
// //   "Громадська кухня",
// //   "Джакузі",
// //   "Дитяче ліжечко",
// //   "Дитячий стілець для годування",
// //   "Домашній кінотеатр",
// //   "Духова піч",
// //   "Душова кабіна",
// //   "Електрочайник",
// //   "Електроплита",
// //   "Зарядка для електромобілів",
// //   "Змінна постільна білизна",
// //   "Інтернет",
// //   "Кавоварка",
// //   "Камін",
// //   "Кабельне телебачення",
// //   "Кондиціонер",
// //   "Ліжко",
// //   "Лазня",
// //   "Мангал",
// //   "Мікрохвильова піч",
// //   "Охорона",
// //   "Парковка",
// //   "Персональний комп'ютер",
// //   "Пляжне обладнання",
// //   "Посуд та приладдя",
// //   "Посудомийна машина",
// //   "Пральна машина",
// //   "Пральний порошок",
// //   "Праска",
// //   "Рушники",
// //   "Сейф",
// //   "Спортзал / Фітнес-кімната",
// //   "Спортивний інвентар",
// //   "Столові прибори",
// //   "Сушилка для білизни",
// //   "Супутникове ТБ",
// //   "Тапочки",
// //   "Тераса",
// //   "Тостер",
// //   "Туалетне приладдя (шампуні, мило)",
// //   "Фен",
// //   "Холодильник",
// //   "WiFi",
// //   "Догляд за тваринами",
// //   "Кафе",
// //   "Конференц-зал",
// //   "Кімната для переговорів",
// //   "Лікувальні процедури",
// //   "Організація подій",
// //   "Трансфер",
// //   "Харчування",
// //   "Прокат обладнання (велосипедів, човнів, інше)",
// // ];

// const facilitiesList = {
//   ua: {
//     "Балкон": "Балкон",
//     "Барбекю-зона": "Барбекю-зона",
//     "Басейн": "Басейн",
//     "Ігрова кімната": "Ігрова кімната",
//     "Блендер": "Блендер",
//     "Бойлер": "Бойлер",
//     "Ванна": "Ванна",
//     "Вентилятор": "Вентилятор",
//     "Генератор": "Генератор",
//     "Громадська кухня": "Громадська кухня",
//     "Джакузі": "Джакузі",
//     "Дитяче ліжечко": "Дитяче ліжечко",
//     "Дитячий стілець для годування": "Дитячий стілець для годування",
//     "Домашній кінотеатр": "Домашній кінотеатр",
//     "Духова піч": "Духова піч",
//     "Душова кабіна": "Душова кабіна",
//     "Електрочайник": "Електрочайник",
//     "Електроплита": "Електроплита",
//     "Зарядка для електромобілів": "Зарядка для електромобілів",
//     "Змінна постільна білизна": "Змінна постільна білизна",
//     "Інтернет": "Інтернет",
//     "Кавоварка": "Кавоварка",
//     "Камін": "Камін",
//     "Кабельне телебачення": "Кабельне телебачення",
//     "Кондиціонер": "Кондиціонер",
//     "Ліжко": "Ліжко",
//     "Лазня": "Лазня",
//     "Мангал": "Мангал",
//     "Мікрохвильова піч": "Мікрохвильова піч",
//     "Охорона": "Охорона",
//     "Парковка": "Парковка",
//     "Персональний комп'ютер": "Персональний комп'ютер",
//     "Пляжне обладнання": "Пляжне обладнання",
//     "Посуд та приладдя": "Посуд та приладдя",
//     "Посудомийна машина": "Посудомийна машина",
//     "Пральна машина": "Пральна машина",
//     "Пральний порошок": "Пральний порошок",
//     "Праска": "Праска",
//     "Рушники": "Рушники",
//     "Сейф": "Сейф",
//     "Спортзал / Фітнес-кімната": "Спортзал / Фітнес-кімната",
//     "Спортивний інвентар": "Спортивний інвентар",
//     "Столові прибори": "Столові прибори",
//     "Сушилка для білизни": "Сушилка для білизни",
//     "Супутникове ТБ": "Супутникове ТБ",
//     "Тапочки": "Тапочки",
//     "Тераса": "Тераса",
//     "Тостер": "Тостер",
//     "Туалетне приладдя (шампуні, мило)": "Туалетне приладдя (шампуні, мило)",
//     "Фен": "Фен",
//     "Холодильник": "Холодильник",
//     "WiFi": "WiFi",
//     "Догляд за тваринами": "Догляд за тваринами",
//     "Кафе": "Кафе",
//     "Конференц-зал": "Конференц-зал",
//     "Кімната для переговорів": "Кімната для переговорів",
//     "Лікувальні процедури": "Лікувальні процедури",
//     "Організація подій": "Організація подій",
//     "Трансфер": "Трансфер",
//     "Харчування": "Харчування",
//     "Прокат обладнання (велосипедів, човнів, інше)": "Прокат обладнання (велосипедів, човнів, інше)"
//   },
//   ru: {
//     "Балкон": "Балкон",
//     "Барбекю-зона": "Зона барбекю",
//     "Басейн": "Бассейн",
//     "Ігрова кімната": "Игровая комната",
//     "Блендер": "Блендер",
//     "Бойлер": "Бойлер",
//     "Ванна": "Ванна",
//     "Вентилятор": "Вентилятор",
//     "Генератор": "Генератор",
//     "Громадська кухня": "Общая кухня",
//     "Джакузі": "Джакузи",
//     "Дитяче ліжечко": "Детская кроватка",
//     "Дитячий стілець для годування": "Детский стульчик для кормления",
//     "Домашній кінотеатр": "Домашний кинотеатр",
//     "Духова піч": "Духовка",
//     "Душова кабіна": "Душевая кабина",
//     "Електрочайник": "Электрочайник",
//     "Електроплита": "Электроплита",
//     "Зарядка для електромобілів": "Зарядка для электромобилей",
//     "Змінна постільна білизна": "Смена постельного белья",
//     "Інтернет": "Интернет",
//     "Кавоварка": "Кофеварка",
//     "Камін": "Камин",
//     "Кабельне телебачення": "Кабельное телевидение",
//     "Кондиціонер": "Кондиционер",
//     "Ліжко": "Кровать",
//     "Лазня": "Баня",
//     "Мангал": "Мангал",
//     "Мікрохвильова піч": "Микроволновая печь",
//     "Охорона": "Охрана",
//     "Парковка": "Парковка",
//     "Персональний комп'ютер": "Персональный компьютер",
//     "Пляжне обладнання": "Пляжное оборудование",
//     "Посуд та приладдя": "Посуда и приборы",
//     "Посудомийна машина": "Посудомоечная машина",
//     "Пральна машина": "Стиральная машина",
//     "Пральний порошок": "Стиральный порошок",
//     "Праска": "Утюг",
//     "Рушники": "Полотенца",
//     "Сейф": "Сейф",
//     "Спортзал / Фітнес-кімната": "Спортзал / Фитнес-комната",
//     "Спортивний інвентар": "Спортивный инвентарь",
//     "Столові прибори": "Столовые приборы",
//     "Сушилка для білизни": "Сушилка для белья",
//     "Супутникове ТБ": "Спутниковое ТВ",
//     "Тапочки": "Тапочки",
//     "Тераса": "Терасса",
//     "Тостер": "Тостер",
//     "Туалетне приладдя (шампуні, мило)": "Туалетные принадлежности (шампунь, мыло)",
//     "Фен": "Фен",
//     "Холодильник": "Холодильник",
//     "WiFi": "WiFi",
//     "Догляд за тваринами": "Уход за животными",
//     "Кафе": "Кафе",
//     "Конференц-зал": "Конференц-зал",
//     "Кімната для переговорів": "Комната для переговоров",
//     "Лікувальні процедури": "Лечебные процедуры",
//     "Організація подій": "Организация мероприятий",
//     "Трансфер": "Трансфер",
//     "Харчування": "Питание",
//     "Прокат обладнання (велосипедів, човнів, інше)": "Прокат оборудования (велосипедов, лодок и др.)"
//   }
// };

// const facilityKeys = Object.keys(facilitiesList.ua); // Получаем все ключи из украинских переводов

// const booleanOptions = [
//   { name: "smoking", labelKey: "smoking" },
//   { name: "parties", labelKey: "parties" },
//   { name: "pets", labelKey: "pets" },
//   { name: "fullDayCheckIn", labelKey: "fullDayCheckIn" },
//   { name: "reportDocs", labelKey: "reportDocs" },
// ];




// const InfoApartments = forwardRef(({ onDataChange }, ref) => {
//   const { currentLanguage } = useLanguage();
//   const t = translations[currentLanguage];

//   const [phones, setPhones] = useState(["+380"]);
//   const [formData, setFormData] = useState({
//     rooms: "", beds: "", size: "", floor: "", totalFloors: "",
//     checkIn: "", checkOut: "", minRent: "", fullDayCheckIn: "",
//     smoking: "",parties: "", pets: "", reportDocs: "", deposit: "",
//     ageLimit: "", name: "", kidsAge: "", conveniences: []
//   });

//   const [errors, setErrors] = useState({});

//   const updateParentData = (data) => {
//     if (onDataChange) {
//       onDataChange(data);
//     }
//   };
  

  


//   useImperativeHandle(ref, () => ({
//     validate: () => {
//       const newErrors = validateFields();
//       return !Object.values(newErrors).some(Boolean);
//     },
//     reset: () => {
//       setFormData({
//         rooms: "", beds: "", size: "", floor: "", totalFloors: "",
//         checkIn: "", checkOut: "", minRent: "", fullDayCheckIn: "",
//         smoking: "", parties: "", pets: "", reportDocs: "", deposit: "",
//         ageLimit: "", name: "", kidsAge: "", conveniences: []
//       });
//       setPhones(["+380"]);
//       setErrors({});
//       // Если нужно сбросить другие состояния, добавьте их здесь
//     }
//   }));

  


//   const validateFields = () => {
//     const newErrors = {
//       name: !formData.name || formData.name.length < 2,
//       phones: phones.length === 0 || phones.some(phone => !/^\+380\d{9}$/.test(phone)),
//       rooms: !formData.rooms,
//       beds: !formData.beds,
//       size: !formData.size,
//       floor: !formData.floor,
//       totalFloors: !formData.totalFloors,
//       checkIn: !formData.checkIn, // Добавлено
//       checkOut: !formData.checkOut, // Добавлено
//       minRent: !formData.minRent,
//       ageLimit: !formData.ageLimit,
//       kidsAge: !formData.kidsAge,
//       deposit: !formData.deposit,
//       conveniences: formData.conveniences.length < 5,
//     };
  
//     booleanOptions.forEach(({ name }) => {
//       newErrors[name] = !formData[name];
//     });
  
    
    

//     setErrors(newErrors);
//     return newErrors;
//   };

//   const updateParent = (data) => {
//     onDataChange?.(data);
//   };

  

//   const handlePhoneChange = (index, value) => {
//     let cleaned = value;
//     if (!cleaned.startsWith("+380")) cleaned = "+380";
//     cleaned = "+380" + cleaned.slice(4).replace(/\D/g, "");
//     const newPhones = [...phones];
//     newPhones[index] = cleaned;
//     setPhones(newPhones);
    
//     // Проверяем валидность номера после ввода
//     const isValid = /^\+380\d{9}$/.test(cleaned);
//     setErrors(prev => ({
//       ...prev,
//       phones: newPhones.some(p => !/^\+380\d{9}$/.test(p))
//     }));
    
//     updateParent({ ...formData, phones: newPhones });
//   };
//   const addPhone = () => {
//     if (phones.length < 4) {
//       setPhones([...phones, "+380"]);
//     }
//   };

  

  
//   const handleChange = (e) => {
//     const { name, value } = e.target;
//     let newValue = value;
  
//     if (name === "name") {
//       newValue = value
//         .replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, "")
//         .replace(/\s+/g, ' ')
//         .trimStart();
      
//       if (newValue.length > 0) {
//         newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
//       }
      
//       const isValid = newValue.length >= 2;
//       setErrors(prev => ({ ...prev, name: !isValid }));
//     }
//     // Для полей времени
//     else if (name === "checkIn" || name === "checkOut") {
//       const isValid = value !== "";
//       setErrors(prev => ({ ...prev, [name]: !isValid }));
//     }
//     // Для остальных полей
//     else {
//       setErrors(prev => ({ ...prev, [name]: false }));
//     }
  
//     const updated = { ...formData, [name]: newValue };
//     setFormData(updated);
//     updateParent({ ...updated, phones });
//   };


//   const handleNumeric = (e) => {
//     const { name, value } = e.target;
//     const updated = { ...formData, [name]: value.replace(/\D/g, "") };
//     setFormData(updated);
//     setErrors(prev => ({ ...prev, [name]: false }));
//     updateParent({ ...updated, phones });
//   };

//   const handleBooleanChange = (name, value) => {
//     console.log(name);
//     const updated = { ...formData, [name]: value };
//     setFormData(updated);
//     setErrors(prev => ({ ...prev, [name]: false }));
//     updateParent({ ...updated, phones });
//   };


  

//   const handleConvenienceToggle = (item) => {
//     const list = formData.conveniences.includes(item)
//       ? formData.conveniences.filter((i) => i !== item)
//       : [...formData.conveniences, item];
//     const updated = { ...formData, conveniences: list };
//     setFormData(updated);
//     setErrors(prev => ({ ...prev, conveniences: list.length < 5 }));
//     updateParent({ ...updated, phones });
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" sx={{ mb: 4 }}>{t.title}</Typography>
//       <Grid container spacing={2}>
//         <Grid item xs={12} md={6}>
          



// <TextField
//   fullWidth
//   name="name"
//   label={t.name}
//   value={formData.name}
//   onChange={handleChange}
//   error={!!errors.name}
//   helperText={errors.name ? "Введите корректное имя (минимум 2 буквы)" : ""}
//   onBlur={(e) => {
//     if (e.target.value.length < 2) {
//       setErrors(prev => ({ ...prev, name: true }));
//     }
//   }}
//   sx={{ mb: 2 }} 
// />

//         </Grid>

//         <Grid item xs={12} md={6}>
//           {phones.map((p, i) => (
//             <Box key={i} sx={{ mb: i < phones.length - 1 ? 2 : 0 }}> {/* Добавлены отступы между телефонами */}
//             <TextField key={i} fullWidth value={p} onChange={(e) => handlePhoneChange(i, e.target.value)}
//               label={`${t.phone} ${i + 1}`} inputProps={{ maxLength: 13 }}
//               error={!!errors.phones} helperText={errors.phones && 'Номер должен быть +380XXXXXXXXX'}
//               InputProps={{
//                 endAdornment: i === phones.length - 1 && phones.length < 4 && (
//                   <InputAdornment position="end">
//                     <IconButton onClick={addPhone}><AddIcon /></IconButton>
//                   </InputAdornment>
//                 )
//               }}
//             />
//             </Box>
//           ))}
//         </Grid>

//         {[
//           ['ageLimit', t.ageLimit], ['rooms', t.rooms], ['beds', t.beds],
//           ['floor', t.floor], ['totalFloors', t.totalFloors], ['size', t.size],
//           ['minRent', t.minRent], ['kidsAge', t.kidsAge], ['deposit', t.deposit]
//         ].map(([name, label]) => (
//           <Grid item xs={12} md={6} key={name}>
//             <TextField fullWidth name={name} label={label} value={formData[name]}
//               onChange={handleNumeric} error={!!errors[name]}
//               helperText={errors[name] && 'Обязательное поле'}
//               inputProps={{ inputMode: 'numeric' }}
//             />
//           </Grid>
//         ))}






// {['checkIn', 'checkOut'].map((name) => (
//   <Grid item xs={12} md={6} key={name}>
//     <TextField
//       fullWidth
//       name={name}
//       type="time"
//       label={t[name]}
//       value={formData[name]}
//       onChange={handleChange}
//       InputLabelProps={{ shrink: true }}
//       error={!!errors[name]}
//       helperText={errors[name] ? 'Обязательное поле' : ''}
//     />
//   </Grid>
// ))}
//         {booleanOptions.map(({ name, labelKey }) => (
//           <Grid item xs={12} md={6} key={name}>
//             <FormControl fullWidth error={!!errors[name]}>
//               <InputLabel>{t[labelKey]}</InputLabel>
//               <Select
//                 value={formData[name] || ''} label={t[labelKey]}
//                 onChange={(e) => handleBooleanChange(name, e.target.value)}
//               >
//                 <MenuItem value="yes">{t.yes}</MenuItem>
//                 <MenuItem value="no">{t.no}</MenuItem>
//               </Select>
//               {errors[name] && <Typography color="error" variant="caption">Обязательное поле</Typography>}
//             </FormControl>
//           </Grid>
//         ))}




// {/* 
//         <Grid item xs={12}>
//           <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>{t.conveniences}</Typography>
//           <Grid container spacing={1}>
//             {facilitiesList.map((item, idx) => (
//               <Grid item xs={12} sm={6} md={4} key={idx}>
//                 <FormControlLabel
//                   control={
//                     <Checkbox
//                       checked={formData.conveniences.includes(item)}
//                       onChange={() => handleConvenienceToggle(item)}
//                     />
//                   }
//                   label={item}
//                 />
//               </Grid>
//             ))}
//           </Grid>
//           {errors.conveniences && (
//             <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//               Выберите минимум 5 удобств
//             </Typography>
//           )}
//         </Grid> */}

// <Grid item xs={12}>
//   <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>{t.conveniences}</Typography>
//   <Grid container spacing={1}>
//     {facilityKeys.map((itemKey, idx) => (
//       <Grid item xs={12} sm={6} md={4} key={idx}>
//         <FormControlLabel
//           control={
//             <Checkbox
//               checked={formData.conveniences.includes(itemKey)}
//               onChange={() => handleConvenienceToggle(itemKey)}
//             />
//           }
//           label={facilitiesList[currentLanguage][itemKey]}
//         />
//       </Grid>
//     ))}
//   </Grid>
//   {errors.conveniences && (
//     <Typography color="error" variant="body2" sx={{ mt: 1 }}>
//       {currentLanguage === 'ua' ? 'Виберіть мінімум 5 зручностей' : 'Выберите минимум 5 удобств'}
//     </Typography>
//   )}
// </Grid>

//       </Grid>
//     </Box>
//   );
// });

// export default InfoApartments;



'use client';

import React, { useState, forwardRef, useImperativeHandle, useCallback, useEffect } from "react";
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
  FormControl,
  InputLabel,
  Select
} from "@mui/material";
import AddIcon from "@mui/icons-material/Add";
import { useLanguage } from "@/app/LanguageContext";

const translations = {
  ua: {
    title: "Інформація про апартаменти",
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
    smoking: "Паління",
    parties: "Святкування",
    pets: "Тварини",
    minRent: "Мін. оренда (днів)",
    reportDocs: "Звітні документи",
    deposit: "Залог (грн)",
    yes: "Так",
    no: "Ні",
    ageLimit: "Вікове обмеження від",
    conveniences: "Зручності",
    name: "Ваше ім'я",
    kidsAge: "Вік дитини від",
  },
  ru: {
    title: "Информация об апартаментах",
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
    pets: "Животные",
    minRent: "Мин. аренда (дней)",
    reportDocs: "Отчетные документы",
    deposit: "Залог (грн)",
    yes: "Да",
    no: "Нет",
    ageLimit: "Возрастное ограничение от",
    conveniences: "Удобства",
    name: "Ваше имя",
    kidsAge: "Возраст ребёнка от",
  },
};

const facilitiesList = {
  ua: {
    "Балкон": "Балкон",
    "Барбекю-зона": "Барбекю-зона",
    "Басейн": "Басейн",
    "Ігрова кімната": "Ігрова кімната",
    "Блендер": "Блендер",
    "Бойлер": "Бойлер",
    "Ванна": "Ванна",
    "Вентилятор": "Вентилятор",
    "Генератор": "Генератор",
    "Громадська кухня": "Громадська кухня",
    "Джакузі": "Джакузі",
    "Дитяче ліжечко": "Дитяче ліжечко",
    "Дитячий стілець для годування": "Дитячий стілець для годування",
    "Домашній кінотеатр": "Домашній кінотеатр",
    "Духова піч": "Духова піч",
    "Душова кабіна": "Душова кабіна",
    "Електрочайник": "Електрочайник",
    "Електроплита": "Електроплита",
    "Зарядка для електромобілів": "Зарядка для електромобілів",
    "Змінна постільна білизна": "Змінна постільна білизна",
    "Інтернет": "Інтернет",
    "Кавоварка": "Кавоварка",
    "Камін": "Камін",
    "Кабельне телебачення": "Кабельне телебачення",
    "Кондиціонер": "Кондиціонер",
    "Ліжко": "Ліжко",
    "Лазня": "Лазня",
    "Мангал": "Мангал",
    "Мікрохвильова піч": "Мікрохвильова піч",
    "Охорона": "Охорона",
    "Парковка": "Парковка",
    "Персональний комп'ютер": "Персональний комп'ютер",
    "Пляжне обладнання": "Пляжне обладнання",
    "Посуд та приладдя": "Посуд та приладдя",
    "Посудомийна машина": "Посудомийна машина",
    "Пральна машина": "Стиральная машина",
    "Пральний порошок": "Стиральный порошок",
    "Праска": "Утюг",
    "Рушники": "Полотенца",
    "Сейф": "Сейф",
    "Спортзал / Фітнес-кімната": "Спортзал / Фитнес-комната",
    "Спортивний інвентар": "Спортивный инвентарь",
    "Столові прибори": "Столовые приборы",
    "Сушилка для білизни": "Сушилка для белья",
    "Супутникове ТБ": "Спутниковое ТВ",
    "Тапочки": "Тапочки",
    "Тераса": "Терасса",
    "Тостер": "Тостер",
    "Туалетне приладдя (шампуні, мило)": "Туалетные принадлежности (шампунь, мыло)",
    "Фен": "Фен",
    "Холодильник": "Холодильник",
    "WiFi": "WiFi",
    "Догляд за тваринами": "Уход за животными",
    "Кафе": "Кафе",
    "Конференц-зал": "Конференц-зал",
    "Кімната для переговорів": "Комната для переговоров",
    "Лікувальні процедури": "Лечебные процедуры",
    "Організація подій": "Организация мероприятий",
    "Трансфер": "Трансфер",
    "Харчування": "Питание",
    "Прокат обладнання (велосипедів, човнів, інше)": "Прокат оборудования (велосипедов, лодок и др.)"
  },
  ru: {
    "Балкон": "Балкон",
    "Барбекю-зона": "Зона барбекю",
    "Басейн": "Бассейн",
    "Ігрова кімната": "Игровая комната",
    "Блендер": "Блендер",
    "Бойлер": "Бойлер",
    "Ванна": "Ванна",
    "Вентилятор": "Вентилятор",
    "Генератор": "Генератор",
    "Громадська кухня": "Общая кухня",
    "Джакузі": "Джакузи",
    "Дитяче ліжечко": "Детская кроватка",
    "Дитячий стілець для годування": "Детский стульчик для кормления",
    "Домашній кінотеатр": "Домашний кинотеатр",
    "Духова піч": "Духовка",
    "Душова кабіна": "Душевая кабина",
    "Електрочайник": "Электрочайник",
    "Електроплита": "Электроплита",
    "Зарядка для електромобілів": "Зарядка для электромобилей",
    "Змінна постільна білизна": "Смена постельного белья",
    "Інтернет": "Интернет",
    "Кавоварка": "Кофеварка",
    "Камін": "Камин",
    "Кабельне телебачення": "Кабельное телевидение",
    "Кондиціонер": "Кондиционер",
    "Ліжко": "Кровать",
    "Лазня": "Баня",
    "Мангал": "Мангал",
    "Мікрохвильова піч": "Микроволновая печь",
    "Охорона": "Охрана",
    "Парковка": "Парковка",
    "Персональний комп'ютер": "Персональный компьютер",
    "Пляжне обладнання": "Пляжное оборудование",
    "Посуд та приладдя": "Посуда и приборы",
    "Посудомийна машина": "Посудомоечная машина",
    "Пральна машина": "Стиральная машина",
    "Пральний порошок": "Стиральный порошок",
    "Праска": "Утюг",
    "Рушники": "Полотенца",
    "Сейф": "Сейф",
    "Спортзал / Фітнес-кімната": "Спортзал / Фитнес-комната",
    "Спортивний інвентар": "Спортивный инвентарь",
    "Столові прибори": "Столовые приборы",
    "Сушилка для білизни": "Сушилка для белья",
    "Супутникове ТБ": "Спутниковое ТВ",
    "Тапочки": "Тапочки",
    "Тераса": "Терасса",
    "Тостер": "Тостер",
    "Туалетне приладдя (шампуні, мило)": "Туалетные принадлежности (шампунь, мыло)",
    "Фен": "Фен",
    "Холодильник": "Холодильник",
    "WiFi": "WiFi",
    "Догляд за тваринами": "Уход за животными",
    "Кафе": "Кафе",
    "Конференц-зал": "Конференц-зал",
    "Кімната для переговорів": "Комната для переговоров",
    "Лікувальні процедури": "Лечебные процедуры",
    "Організація подій": "Организация мероприятий",
    "Трансфер": "Трансфер",
    "Харчування": "Питание",
    "Прокат обладнання (велосипедів, човнів, інше)": "Прокат оборудования (велосипедов, лодок и др.)"
  }
};

const facilityKeys = Object.keys(facilitiesList.ua);

const booleanOptions = [
  { name: "smoking", labelKey: "smoking" },
  { name: "parties", labelKey: "parties" },
  { name: "pets", labelKey: "pets" },
  { name: "fullDayCheckIn", labelKey: "fullDayCheckIn" },
  { name: "reportDocs", labelKey: "reportDocs" },
];

const InfoApartments = forwardRef(({ onDataChange }, ref) => {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  const [phones, setPhones] = useState(["+380"]);
  const [formData, setFormData] = useState({
    rooms: "", beds: "", size: "", floor: "", totalFloors: "",
    checkIn: "", checkOut: "", minRent: "", fullDayCheckIn: "",
    smoking: "", parties: "", pets: "", reportDocs: "", deposit: "",
    ageLimit: "", name: "", kidsAge: "", conveniences: []
  });

  const [errors, setErrors] = useState({});

  // Обновляем родительский компонент при изменении данных
  const updateParentData = useCallback((data) => {
    if (onDataChange) {
      onDataChange(data);
    }
  }, [onDataChange]);

  // Методы для работы с ref
  useImperativeHandle(ref, () => ({
    validate: () => {
      const newErrors = validateFields();
      return !Object.values(newErrors).some(Boolean);
    },
    reset: () => {
      setFormData({
        rooms: "", beds: "", size: "", floor: "", totalFloors: "",
        checkIn: "", checkOut: "", minRent: "", fullDayCheckIn: "",
        smoking: "", parties: "", pets: "", reportDocs: "", deposit: "",
        ageLimit: "", name: "", kidsAge: "", conveniences: []
      });
      setPhones(["+380"]);
      setErrors({});
    },
    setData: (apartmentData) => {
      // Заполняем форму данными из базы
      if (apartmentData) {
        setFormData({
          rooms: apartmentData.rooms || "",
          beds: apartmentData.beds || "",
          size: apartmentData.size || "",
          floor: apartmentData.floor || "",
          totalFloors: apartmentData.totalFloors || "",
          checkIn: apartmentData.checkIn || "",
          checkOut: apartmentData.checkOut || "",
          minRent: apartmentData.minRent || "",
          fullDayCheckIn: apartmentData.fullDayCheckIn || "",
          smoking: apartmentData.smoking || "",
          parties: apartmentData.parties || "",
          pets: apartmentData.pets || "",
          reportDocs: apartmentData.reportDocs || "",
          deposit: apartmentData.deposit || "",
          ageLimit: apartmentData.ageLimit || "",
          name: apartmentData.name || "",
          kidsAge: apartmentData.kidsAge || "",
          conveniences: apartmentData.conveniences || []
        });

        // Устанавливаем телефоны
        if (apartmentData.phones && Array.isArray(apartmentData.phones)) {
          setPhones(apartmentData.phones);
        } else {
          setPhones(["+380"]);
        }

        // Обновляем родительский компонент
        updateParentData({
          ...apartmentData,
          phones: apartmentData.phones || ["+380"]
        });
      }
    }
  }));

  // Валидация полей
  const validateFields = () => {
    const newErrors = {
      name: !formData.name || formData.name.length < 2,
      phones: phones.length === 0 || phones.some(phone => !/^\+380\d{9}$/.test(phone)),
      rooms: !formData.rooms,
      beds: !formData.beds,
      size: !formData.size,
      floor: !formData.floor,
      totalFloors: !formData.totalFloors,
      checkIn: !formData.checkIn,
      checkOut: !formData.checkOut,
      minRent: !formData.minRent,
      ageLimit: !formData.ageLimit,
      kidsAge: !formData.kidsAge,
      deposit: !formData.deposit,
      conveniences: formData.conveniences.length < 5,
    };

    booleanOptions.forEach(({ name }) => {
      newErrors[name] = !formData[name];
    });

    setErrors(newErrors);
    return newErrors;
  };

  // Обработчики изменений
  const handlePhoneChange = (index, value) => {
    let cleaned = value;
    if (!cleaned.startsWith("+380")) cleaned = "+380";
    cleaned = "+380" + cleaned.slice(4).replace(/\D/g, "");
    const newPhones = [...phones];
    newPhones[index] = cleaned;
    setPhones(newPhones);
    
    const isValid = /^\+380\d{9}$/.test(cleaned);
    setErrors(prev => ({
      ...prev,
      phones: newPhones.some(p => !/^\+380\d{9}$/.test(p))
    }));
    
    updateParentData({ ...formData, phones: newPhones });
  };

  const addPhone = () => {
    if (phones.length < 4) {
      const newPhones = [...phones, "+380"];
      setPhones(newPhones);
      updateParentData({ ...formData, phones: newPhones });
    }
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    let newValue = value;
  
    if (name === "name") {
      newValue = value
        .replace(/[^а-яА-ЯёЁa-zA-Z\s]/g, "")
        .replace(/\s+/g, ' ')
        .trimStart();
      
      if (newValue.length > 0) {
        newValue = newValue.charAt(0).toUpperCase() + newValue.slice(1);
      }
      
      const isValid = newValue.length >= 2;
      setErrors(prev => ({ ...prev, name: !isValid }));
    } else if (name === "checkIn" || name === "checkOut") {
      const isValid = value !== "";
      setErrors(prev => ({ ...prev, [name]: !isValid }));
    } else {
      setErrors(prev => ({ ...prev, [name]: false }));
    }
  
    const updated = { ...formData, [name]: newValue };
    setFormData(updated);
    updateParentData({ ...updated, phones });
  };

  const handleNumeric = (e) => {
    const { name, value } = e.target;
    const updated = { ...formData, [name]: value.replace(/\D/g, "") };
    setFormData(updated);
    setErrors(prev => ({ ...prev, [name]: false }));
    updateParentData({ ...updated, phones });
  };

  const handleBooleanChange = (name, value) => {
    const updated = { ...formData, [name]: value };
    setFormData(updated);
    setErrors(prev => ({ ...prev, [name]: false }));
    updateParentData({ ...updated, phones });
  };

  const handleConvenienceToggle = (item) => {
    const list = formData.conveniences.includes(item)
      ? formData.conveniences.filter((i) => i !== item)
      : [...formData.conveniences, item];
    const updated = { ...formData, conveniences: list };
    setFormData(updated);
    setErrors(prev => ({ ...prev, conveniences: list.length < 5 }));
    updateParentData({ ...updated, phones });
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" sx={{ mb: 4 }}>{t.title}</Typography>
      <Grid container spacing={2}>
        <Grid item xs={12} md={6}>
          <TextField
            fullWidth
            name="name"
            label={t.name}
            value={formData.name}
            onChange={handleChange}
            error={!!errors.name}
            helperText={errors.name ? "Введите корректное имя (минимум 2 буквы)" : ""}
            onBlur={(e) => {
              if (e.target.value.length < 2) {
                setErrors(prev => ({ ...prev, name: true }));
              }
            }}
            sx={{ mb: 2 }} 
          />
        </Grid>

        <Grid item xs={12} md={6}>
          {phones.map((p, i) => (
            <Box key={i} sx={{ mb: i < phones.length - 1 ? 2 : 0 }}>
              <TextField 
                fullWidth 
                value={p} 
                onChange={(e) => handlePhoneChange(i, e.target.value)}
                label={`${t.phone} ${i + 1}`} 
                inputProps={{ maxLength: 13 }}
                error={!!errors.phones} 
                helperText={errors.phones && 'Номер должен быть +380XXXXXXXXX'}
                InputProps={{
                  endAdornment: i === phones.length - 1 && phones.length < 4 && (
                    <InputAdornment position="end">
                      <IconButton onClick={addPhone}><AddIcon /></IconButton>
                    </InputAdornment>
                  )
                }}
              />
            </Box>
          ))}
        </Grid>

        {[
          ['ageLimit', t.ageLimit], ['rooms', t.rooms], ['beds', t.beds],
          ['floor', t.floor], ['totalFloors', t.totalFloors], ['size', t.size],
          ['minRent', t.minRent], ['kidsAge', t.kidsAge], ['deposit', t.deposit]
        ].map(([name, label]) => (
          <Grid item xs={12} md={6} key={name}>
            <TextField 
              fullWidth 
              name={name} 
              label={label} 
              value={formData[name]}
              onChange={handleNumeric} 
              error={!!errors[name]}
              helperText={errors[name] && 'Обязательное поле'}
              inputProps={{ inputMode: 'numeric' }}
            />
          </Grid>
        ))}

        {['checkIn', 'checkOut'].map((name) => (
          <Grid item xs={12} md={6} key={name}>
            <TextField
              fullWidth
              name={name}
              type="time"
              label={t[name]}
              value={formData[name]}
              onChange={handleChange}
              InputLabelProps={{ shrink: true }}
              error={!!errors[name]}
              helperText={errors[name] ? 'Обязательное поле' : ''}
            />
          </Grid>
        ))}

        {booleanOptions.map(({ name, labelKey }) => (
          <Grid item xs={12} md={6} key={name}>
            <FormControl fullWidth error={!!errors[name]}>
              <InputLabel>{t[labelKey]}</InputLabel>
              <Select
                value={formData[name] || ''} 
                label={t[labelKey]}
                onChange={(e) => handleBooleanChange(name, e.target.value)}
              >
                <MenuItem value="yes">{t.yes}</MenuItem>
                <MenuItem value="no">{t.no}</MenuItem>
              </Select>
              {errors[name] && <Typography color="error" variant="caption">Обязательное поле</Typography>}
            </FormControl>
          </Grid>
        ))}

        <Grid item xs={12}>
          <Typography variant="h6" sx={{ mt: 2, mb: 2 }}>{t.conveniences}</Typography>
          <Grid container spacing={1}>
            {facilityKeys.map((itemKey, idx) => (
              <Grid item xs={12} sm={6} md={4} key={idx}>
                <FormControlLabel
                  control={
                    <Checkbox
                      checked={formData.conveniences.includes(itemKey)}
                      onChange={() => handleConvenienceToggle(itemKey)}
                    />
                  }
                  label={facilitiesList[currentLanguage][itemKey]}
                />
              </Grid>
            ))}
          </Grid>
          {errors.conveniences && (
            <Typography color="error" variant="body2" sx={{ mt: 1 }}>
              {currentLanguage === 'ua' ? 'Виберіть мінімум 5 зручностей' : 'Выберите минимум 5 удобств'}
            </Typography>
          )}
        </Grid>
      </Grid>
    </Box>
  );
});

InfoApartments.displayName = 'InfoApartments';

export default InfoApartments;