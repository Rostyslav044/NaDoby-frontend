

// "use client";

// import React, { useState } from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   Box,
//   TextField,
//   Checkbox,
//   FormControlLabel,
//   Typography,
//   Button,
//   Grid,
//   FormGroup,
// } from "@mui/material";

// const translations = {
//   ua: {
//     title: "Інформація про апартаменти",
//     phone: "Номер телефону",
//     addPhone: "Додати ще номер",
//     rooms: "Кількість кімнат",
//     beds: "Кількість спальних місць",
//     size: "Площа (м²)",
//     floor: "Поверх розташування",
//     totalFloors: "Кількість поверхів у будинку",
//     conveniences: "Зручності",
//     checkIn: "Час заїзду",
//     checkOut: "Час виїзду",
//     ageLimit: "Вікове обмеження",
//     fullDayCheckIn: "Цілодобове заселення",
//     smoking: "Паління в апартаментах",
//     parties: "Святкування дозволені",
//     pets: "Домашні тварини дозволені",
//     minRent: "Мінімальний термін оренди (днів)",
//     reportDocs: "Звітні документи надаються",
//     submit: "Надіслати",
//     required: "Це поле обов'язкове"
//   },
//   ru: {
//     title: "Информация об апартаментах",
//     phone: "Номер телефона",
//     addPhone: "Добавить ещё номер",
//     rooms: "Количество комнат",
//     beds: "Количество спальных мест",
//     size: "Площадь (м²)",
//     floor: "Этаж размещения",
//     totalFloors: "Количество этажей в доме",
//     conveniences: "Удобства",
//     checkIn: "Время заезда",
//     checkOut: "Время выезда",
//     ageLimit: "Возрастное ограничение",
//     fullDayCheckIn: "Круглосуточное заселение",
//     smoking: "Курение в апартаментах",
//     parties: "Разрешены вечеринки",
//     pets: "Разрешены домашние животные",
//     minRent: "Минимальный срок аренды (дней)",
//     reportDocs: "Предоставляются отчетные документы",
//     submit: "Отправить",
//     required: "Это поле обязательно"
//   }
// };

// const facilitiesList = [
//   "Супутникове ТБ", "Мікрохвильова піч", "Душова кабіна", "Холодильник", "Сейф",
//   "Електрочайник", "Домофон", "Фен", "Посуд та приладдя", "Парковка", "Столові прибори",
//   "Лоджія", "Блендер", "Духова піч", "Газовий водонагрівач", "Пральна машина",
//   "Посудомийна машина", "Вентилятор", "Ванна", "Туалетне приладдя (шампуні, мило)",
//   "Балкон", "Пральний порошок", "Інтернет", "Дитяче ліжечко",
//   "Дитячий стілець для годування", "Кабельне телебачення", "Кондиціонер",
//   "Сушилка для білизни", "Бойлер", "Змінна постільна білизна", "WiFi", "Запасні рушники",
//   "Ліфт", "Броньовані двері", "Електроплитка", "Кавоварка", "Камін", "Дворик",
//   "Басейн", "Мангал", "Персональний комп'ютер", "Лазня", "Альтанка", "Тераса",
//   "Домашній кінотеатр", "Сад", "Тостер", "Джакузі", "Сауна", "Більярд"
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
//     ageLimit: "",
//     fullDayCheckIn: false,
//     smoking: false,
//     parties: false,
//     pets: false,
//     minRent: "",
//     reportDocs: false,
//     conveniences: []
//   });

//   const handlePhoneChange = (index, value) => {
//     const newPhones = [...phones];
//     newPhones[index] = value;
//     setPhones(newPhones);
//     if (index === phones.length - 1 && phones.length < 4 && value.length >= 10) {
//       setPhones([...newPhones, ""]);
//     }
//   };

//   const handleChange = (e) => {
//     const { name, value, type, checked } = e.target;
//     setFormData((prev) => ({
//       ...prev,
//       [name]: type === "checkbox" ? checked : value,
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

//   const handleSubmit = () => {
//     const requiredFields = ["rooms", "beds", "size", "floor", "totalFloors", "checkIn", "checkOut", "minRent"];
//     for (let field of requiredFields) {
//       if (!formData[field]) {
//         alert(t.required);
//         return;
//       }
//     }
//     alert("Форма отправлена успешно!");
//   };

//   return (
//     <Box sx={{ p: 2 }}>
//       <Typography variant="h5" gutterBottom>{t.title}</Typography>

//       {phones.map((phone, index) => (
//         <TextField
//           key={index}
//           label={`${t.phone} ${index + 1}`}
//           value={phone}
//           onChange={(e) => handlePhoneChange(index, e.target.value)}
//           fullWidth
//           margin="normal"
//           required={index === 0}
//         />
//       ))}

//       <Grid container spacing={2}>
//         <Grid item xs={12} sm={6}>
//           <TextField label={t.rooms} name="rooms" value={formData.rooms} onChange={handleChange} fullWidth required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label={t.beds} name="beds" value={formData.beds} onChange={handleChange} fullWidth required />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label={t.size} name="size" value={formData.size} onChange={handleChange} fullWidth required />
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <TextField label={t.floor} name="floor" value={formData.floor} onChange={handleChange} fullWidth required />
//         </Grid>
//         <Grid item xs={6} sm={3}>
//           <TextField label={t.totalFloors} name="totalFloors" value={formData.totalFloors} onChange={handleChange} fullWidth required />
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

//         <Grid item xs={12} sm={6}>
//           <TextField label={t.ageLimit} name="ageLimit" value={formData.ageLimit} onChange={handleChange} fullWidth />
//         </Grid>
//         <Grid item xs={12} sm={6}>
//           <TextField label={t.minRent} name="minRent" value={formData.minRent} onChange={handleChange} fullWidth required />
//         </Grid>
//       </Grid>

//       <FormGroup row sx={{ mt: 2 }}>
//         <FormControlLabel
//           control={<Checkbox checked={formData.fullDayCheckIn} onChange={handleChange} name="fullDayCheckIn" />}
//           label={t.fullDayCheckIn}
//         />
//         <FormControlLabel
//           control={<Checkbox checked={formData.smoking} onChange={handleChange} name="smoking" />}
//           label={t.smoking}
//         />
//         <FormControlLabel
//           control={<Checkbox checked={formData.parties} onChange={handleChange} name="parties" />}
//           label={t.parties}
//         />
//         <FormControlLabel
//           control={<Checkbox checked={formData.pets} onChange={handleChange} name="pets" />}
//           label={t.pets}
//         />
//         <FormControlLabel
//           control={<Checkbox checked={formData.reportDocs} onChange={handleChange} name="reportDocs" />}
//           label={t.reportDocs}
//         />
//       </FormGroup>

//       <Typography variant="h6" sx={{ mt: 2 }}>
//         {t.conveniences}
//       </Typography>
//       <FormGroup>
//         <Grid container spacing={1}>
//           {facilitiesList.map((item, i) => (
//             <Grid item xs={12} sm={6} md={4} key={i}>
//               <FormControlLabel
//                 control={
//                   <Checkbox
//                     checked={formData.conveniences.includes(item)}
//                     onChange={() => handleConvenienceToggle(item)}
//                   />
//                 }
//                 label={item}
//               />
//             </Grid>
//           ))}
//         </Grid>
//       </FormGroup>

//       <Button variant="contained" color="primary" sx={{ mt: 3 }} onClick={handleSubmit}>
//         {t.submit}
//       </Button>
//     </Box>
//   );
// }





"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import {
  Box,
  TextField,
  Typography,
  Button,
  Grid,
  MenuItem,
  FormControlLabel,
  Checkbox,
} from "@mui/material";

const translations = {
  ua: {
    title: "Інформація про апартаменти",
    phone: "Номер телефону",
    rooms: "Кількість кімнат",
    beds: "Кількість спальних місць",
    size: "Площа (м²)",
    floor: "Поверх розташування",
    totalFloors: "Кількість поверхів у будинку",
    conveniences: "Зручності",
    checkIn: "Час заїзду",
    checkOut: "Час виїзду",
    ageLimit: "Вікове обмеження",
    fullDayCheckIn: "Цілодобове заселення",
    smoking: "Паління в апартаментах",
    parties: "Святкування дозволені",
    pets: "Домашні тварини дозволені",
    minRent: "Мінімальний термін оренди (днів)",
    reportDocs: "Звітні документи надаються",
    submit: "Надіслати",
    required: "Це поле обов'язкове",
    yes: "Так",
    no: "Ні",
  },
  ru: {
    title: "Информация об апартаментах",
    phone: "Номер телефона",
    rooms: "Количество комнат",
    beds: "Количество спальных мест",
    size: "Площадь (м²)",
    floor: "Этаж размещения",
    totalFloors: "Количество этажей в доме",
    conveniences: "Удобства",
    checkIn: "Время заезда",
    checkOut: "Время выезда",
    ageLimit: "Возрастное ограничение",
    fullDayCheckIn: "Круглосуточное заселение",
    smoking: "Курение в апартаментах",
    parties: "Разрешены вечеринки",
    pets: "Разрешены домашние животные",
    minRent: "Минимальный срок аренды (дней)",
    reportDocs: "Предоставляются отчетные документы",
    submit: "Отправить",
    required: "Это поле обязательно",
    yes: "Да",
    no: "Нет",
  },
};

const facilitiesList = [
  "Супутникове ТБ",
  "Мікрохвильова піч",
  "Душова кабіна",
  "Холодильник",
  "Сейф",
  "Електрочайник",
  "Домофон",
  "Фен",
  "Посуд та приладдя",
  "Парковка",
  "Столові прибори",
  "Лоджія",
  "Блендер",
  "Духова піч",
  "Газовий водонагрівач",
  "Пральна машина",
  "Посудомийна машина",
  "Вентилятор",
  "Ванна",
  "Туалетне приладдя (шампуні, мило)",
  "Балкон",
  "Пральний порошок",
  "Інтернет",
  "Дитяче ліжечко",
  "Дитячий стілець для годування",
  "Кабельне телебачення",
  "Кондиціонер",
  "Сушилка для білизни",
  "Бойлер",
  "Змінна постільна білизна",
  "WiFi",
  "Запасні рушники",
  "Ліфт",
  "Броньовані двері",
  "Електроплитка",
  "Кавоварка",
  "Камін",
  "Дворик",
  "Басейн",
  "Мангал",
  "Персональний комп'ютер",
  "Лазня",
  "Альтанка",
  "Тераса",
  "Домашній кінотеатр",
  "Сад",
  "Тостер",
  "Джакузі",
  "Сауна",
  "Більярд",
];

export default function InfoApartments() {
  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  // Телефоны - только цифры, максимум 4 номера
  const [phones, setPhones] = useState([""]);

  const [formData, setFormData] = useState({
    rooms: "",
    beds: "",
    size: "",
    floor: "",
    totalFloors: "",
    checkIn: "",
    checkOut: "",
    ageLimit: "",
    fullDayCheckIn: "", // "yes" | "no"
    smoking: "",
    parties: "",
    pets: "",
    minRent: "",
    reportDocs: "",
    conveniences: [],
  });

  // Обработчик изменения телефона
  const handlePhoneChange = (index, value) => {
    const onlyNumbers = value.replace(/\D/g, "");
    const newPhones = [...phones];
    newPhones[index] = onlyNumbers;
    if (index === phones.length - 1 && phones.length < 4 && onlyNumbers.length >= 3) {
      newPhones.push("");
    }
    setPhones(newPhones);
  };

  const handleChange = (e) => {
    const { name, value } = e.target;
    setFormData((prev) => ({
      ...prev,
      [name]: value,
    }));
  };

  const handleConvenienceToggle = (item) => {
    setFormData((prev) => {
      const exists = prev.conveniences.includes(item);
      return {
        ...prev,
        conveniences: exists
          ? prev.conveniences.filter((i) => i !== item)
          : [...prev.conveniences, item],
      };
    });
  };

  const handleSubmit = () => {
    const requiredFields = [
      "rooms",
      "beds",
      "size",
      "floor",
      "totalFloors",
      "checkIn",
      "checkOut",
      "minRent",
    ];
    for (let field of requiredFields) {
      if (!formData[field]) {
        alert(t.required);
        return;
      }
    }
    if (!phones[0]) {
      alert(t.required);
      return;
    }
    alert("Форма отправлена успешно!");
  };

  return (
    <Box sx={{ p: 2 }}>
      <Typography variant="h5" gutterBottom>
        {t.title}
      </Typography>

      {/* Телефоны */}
      {phones.map((phone, index) => (
        <TextField
          key={index}
          label={`${t.phone} ${index + 1}`}
          value={phone}
          onChange={(e) => handlePhoneChange(index, e.target.value)}
          fullWidth
          margin="normal"
          required={index === 0}
          inputProps={{ inputMode: "numeric", pattern: "[0-9]*" }}
        />
      ))}

      <Grid container spacing={2}>
        <Grid item xs={12} sm={6}>
          <TextField
            label={t.rooms}
            name="rooms"
            value={formData.rooms}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t.beds}
            name="beds"
            value={formData.beds}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t.size}
            name="size"
            value={formData.size}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label={t.floor}
            name="floor"
            value={formData.floor}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={6} sm={3}>
          <TextField
            label={t.totalFloors}
            name="totalFloors"
            value={formData.totalFloors}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="time"
            label={t.checkIn}
            name="checkIn"
            value={formData.checkIn}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            type="time"
            label={t.checkOut}
            name="checkOut"
            value={formData.checkOut}
            onChange={handleChange}
            fullWidth
            required
            InputLabelProps={{ shrink: true }}
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t.ageLimit}
            name="ageLimit"
            value={formData.ageLimit}
            onChange={handleChange}
            fullWidth
          />
        </Grid>

        <Grid item xs={12} sm={6}>
          <TextField
            label={t.minRent}
            name="minRent"
            value={formData.minRent}
            onChange={handleChange}
            fullWidth
            required
          />
        </Grid>

        {/* Инпуты с выбором "Так"/"Ні" */}
        {[
          { label: t.fullDayCheckIn, name: "fullDayCheckIn" },
          { label: t.smoking, name: "smoking" },
          { label: t.parties, name: "parties" },
          { label: t.pets, name: "pets" },
          { label: t.reportDocs, name: "reportDocs" },
        ].map(({ label, name }) => (
          <Grid item xs={12} sm={6} key={name}>
            <TextField
              select
              label={label}
              name={name}
              value={formData[name]}
              onChange={handleChange}
              fullWidth
            >
              <MenuItem value="">{/* пустое */}</MenuItem>
              <MenuItem value="yes">{t.yes}</MenuItem>
              <MenuItem value="no">{t.no}</MenuItem>
            </TextField>
          </Grid>
        ))}
      </Grid>

      {/* Зручності - чекбоксы */}
      <Typography variant="h6" sx={{ mt: 3, mb: 1 }}>
        {t.conveniences}
      </Typography>
      <Grid container spacing={1}>
        {facilitiesList.map((item, idx) => (
          <Grid item xs={12} sm={6} md={4} key={idx}>
            <FormControlLabel
              control={
                <Checkbox
                  checked={formData.conveniences.includes(item)}
                  onChange={() => handleConvenienceToggle(item)}
                />
              }
              label={item}
            />
          </Grid>
        ))}
      </Grid>

      <Button
        variant="contained"
        color="primary"
        sx={{ mt: 3 }}
        onClick={handleSubmit}
      >
        {t.submit}
      </Button>
    </Box>
  );
}
