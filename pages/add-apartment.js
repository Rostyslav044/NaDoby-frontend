



// import React, { useState } from 'react';
// import axios from 'axios';
// import Autocomplete from 'react-google-autocomplete';
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import styles from '@/app/styles/Add-apartment.module.scss';

// const AddApartment = () => {
//   // Состояния
//   const [formData, setFormData] = useState({
//     city: '',
//     district: '',
//     street: '',
//     houseNumber: '',
//     description: '',
//     price: '',
//     category: '',
//     metro: '',
//   });
//   const [photos, setPhotos] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showMetro, setShowMetro] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [city, setCity] = useState('');
//   const [streetError, setStreetError] = useState('');
//   const [useManualStreetInput, setUseManualStreetInput] = useState(false); // Новое состояние для ручного ввода улицы

//   // Константы
//   const categories = ['Квартира', 'Апартаменты', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
//   const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w"; // Ваш ключ API

//   // Списки метро
//   const metroStations = {
//     kyiv: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская', 'Политехнический институт',
//       'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная', 'Днепр', 'Гидропарк', 'Левобережная',
//       'Дарница', 'Черниговская', 'Лесная'
//     ],
//     kharkiv: [
//       'Холодная Гора', 'Южный Вокзал', 'Центральный Рынок', 'Площадь Конституции', 'Проспект Гагарина', 'Спортивная',
//       'Завод имени Малышева', 'Московский проспект', 'Дворец Спорта', 'Армейская', 'Имени А.С. Масельского',
//       'Тракторный Завод', 'Индустриальная'
//     ],
//     dnipropetrovsk: [
//       'Вокзальна', 'Метростроителей', 'Центральна', 'Покровская', 'Проспект Свободы', 'Театральная ' // Добавлены станции для Днепра
//     ]
//   };

//   // Обработчики событий

//   // Выбор города
//   const handleCitySelect = (place) => {
//     const formattedAddress = place?.formatted_address || '';
//     setFormData((prevData) => ({
//       ...prevData,
//       city: formattedAddress,
//     }));
//     setCity(formattedAddress);

//     // Устанавливаем центр карты на выбранный город
//     if (place.geometry && place.geometry.location) {
//       setSelectedLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//     }

//     // Проверяем, является ли город Киевом, Харьковом или Днепром
//     const cityLower = formattedAddress.toLowerCase();
//     const isKyiv = ['киев', 'київ', 'kyiv'].some((name) => cityLower.includes(name));
//     const isKharkiv = ['харьков', 'харків', 'kharkiv'].some((name) => cityLower.includes(name));
//     const isDnipropetrovsk = ['днепр', 'дніпро', 'dnipropetrovsk'].some((name) => cityLower.includes(name));

//     console.log('Выбранный город:', formattedAddress);
//     console.log('Показывать метро?', isKyiv || isKharkiv || isDnipropetrovsk);

//     setShowMetro(isKyiv || isKharkiv || isDnipropetrovsk); // Показываем метро, если город Киев, Харьков или Днепр
//     if (!isKyiv && !isKharkiv && !isDnipropetrovsk) {
//       setFormData((prevData) => ({ ...prevData, metro: '' }));
//     }
//   };

//   // Выбор улицы через Google Autocomplete
//   const handleStreetSelect = (place) => {
//     const address = place?.formatted_address || '';
//     const street = address.split(',')[0]; // Извлекаем только улицу

//     // Проверяем, что улица находится в выбранном городе
//     if (city && !address.toLowerCase().includes(city.toLowerCase())) {
//       setStreetError('Улица не найдена в выбранном городе. Пожалуйста, выберите улицу из списка.');
//       return;
//     } else {
//       setStreetError(''); // Очищаем ошибку, если улица найдена
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       street: street,
//     }));

//     // Проверяем, что place и place.geometry существуют
//     if (place && place.geometry) {
//       setSelectedLocation(place.geometry.location); // Устанавливаем точку на карте
//     } else {
//       setSelectedLocation(null); // Если place не определён, сбрасываем selectedLocation
//     }
//   };

//   // Ручной ввод улицы
//   const handleManualStreetInput = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       street: e.target.value,
//     }));
//   };

//   // Переключение между автодополнением и ручным вводом
//   const toggleStreetInputMode = () => {
//     setUseManualStreetInput(!useManualStreetInput);
//     setFormData((prevData) => ({
//       ...prevData,
//       street: '', // Сбрасываем значение улицы при переключении
//     }));
//   };

//   // Загрузка фотографий
//   const handlePhotoChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 7) {
//       alert('Можно загрузить не более 7 фотографий.');
//       return;
//     }
//     setPhotos(Array.from(files));
//   };

//   // Перетаскивание маркера
//   const handleMarkerDragEnd = (event) => {
//     const newLocation = event.latLng;
//     setSelectedLocation(newLocation);
//     setFormData((prevData) => ({
//       ...prevData,
//       latitude: newLocation.lat(),
//       longitude: newLocation.lng(),
//     }));
//   };

//   // Загрузка карты
//   const onMapLoad = (map) => {
//     if (selectedLocation) {
//       map.panTo(selectedLocation);
//     }
//   };

//   // Выбор категории
//   const handleCategorySelect = (category) => {
//     setFormData((prevData) => ({ ...prevData, category }));
//     setShowCategories(false);
//   };

//   // Отправка формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     for (let i = 0; i < photos.length; i++) {
//       data.append('photos', photos[i]);
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/api/apartments/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert('Квартира успешно добавлена!');
//       console.log('Отправка события apartmentAdded:', response.data);
//       window.dispatchEvent(new CustomEvent('apartmentAdded', { detail: response.data }));
//     } catch (error) {
//       console.error('Ошибка при добавлении квартиры:', error);
//       alert('Произошла ошибка, попробуйте еще раз.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Определяем, какой список метро показывать
//   const getMetroStations = () => {
//     const cityLower = city.toLowerCase();
//     if (cityLower.includes('киев') || cityLower.includes('київ') || cityLower.includes('kyiv')) {
//       return metroStations.kyiv;
//     } else if (cityLower.includes('харьков') || cityLower.includes('харків') || cityLower.includes('kharkiv')) {
//       return metroStations.kharkiv;
//     } else if (cityLower.includes('днепр') || cityLower.includes('дніпро') || cityLower.includes('dnipropetrovsk')) {
//       return metroStations.dnipropetrovsk;
//     }
//     return [];
//   };

//   console.log('Список метро:', getMetroStations());

//   return (
//     <div>
//       <h1>Создайте объявление</h1>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {/* Выбор категории */}
//         <label className={styles.label} onClick={() => setShowCategories(!showCategories)}>
//           Категория:
//           <div className={styles.inputWrapper}>
//             <input
//               className={styles.input}
//               type="text"
//               name="category"
//               value={formData.category}
//               readOnly
//               placeholder="Выберите категорию"
//             />
//             <img alt="стрелка" loading="lazy" width="14" height="14" src="/angle.svg" className={styles.arrow} />
//           </div>
//         </label>

//         {showCategories && (
//           <ul className={styles.categoryList}>
//             {categories.map((cat) => (
//               <li key={cat} onClick={() => handleCategorySelect(cat)} className={styles.categoryItem}>
//                 {cat}
//               </li>
//             ))}
//           </ul>
//         )}

//         {/* Заголовок объявления */}
//         <label className={styles.label}>
//           Заголовок объявления:
//           <input
//             className={styles.input}
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 title: e.target.value,
//               }))
//             }
//             placeholder="Например, Сдам 2 комнатную квартиру с евроремонтом"
//             required
//           />
//         </label>

//         {/* Описание */}
//         <label className={styles.label}>
//           Описание:
//           <textarea
//             className={styles.textarea}
//             name="description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 description: e.target.value,
//               }))
//             }
//             required
//           ></textarea>
//         </label>

//         {/* Фотографии */}
//         <label className={styles.label}>
//           Фотографии (максимум 7):
//           <input
//             className={styles.input}
//             type="file"
//             multiple
//             onChange={handlePhotoChange}
//             accept="image/*"
//             required
//           />
//           <span className={styles.photoHint}>Выбрано фотографий: {photos.length}/7</span>
//         </label>

//         {/* Цена */}
//         <label className={styles.label}>
//           Цена:
//           <input
//             className={styles.input}
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 price: e.target.value,
//               }))
//             }
//             required
//             min="0"
//             placeholder="Введите цену"
//           />
//         </label>

//         {/* Город */}
//         <label className={styles.label}>
//           Город:
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={handleCitySelect}
//             options={{
//               types: ['(cities)'],
//               componentRestrictions: { country: 'ua' },
//             }}
//             placeholder="Введите город"
//             className={styles.inputCity}
//           />
//         </label>

//         {/* Метро (для Киева, Харькова и Днепра) */}
//         {showMetro && (
//           <label className={styles.label}>
//             Метро:
//             <select
//               className={styles.input}
//               name="metro"
//               value={formData.metro}
//               onChange={(e) =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   metro: e.target.value,
//                 }))
//               }
//               required
//             >
//               <option value="">Выберите станцию метро</option>
//               {getMetroStations().map((station) => (
//                 <option key={station} value={station}>
//                   {station}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}

//         {/* Район */}
//         <label className={styles.label}>
//           Район:
//           <input
//             className={styles.input}
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 district: e.target.value,
//               }))
//             }
//             required
//           />
//         </label>

//         {/* Улица */}
//         <label className={styles.label}>
//           Улица:
//           {useManualStreetInput ? (
//             <input
//               className={styles.input}
//               type="text"
//               name="street"
//               value={formData.street}
//               onChange={handleManualStreetInput}
//               placeholder="Введите улицу вручную"
//               required
//             />
//           ) : (
//             <Autocomplete
//               apiKey={googleMapsApiKey}
//               onPlaceSelected={handleStreetSelect}
//               options={{
//                 types: ['geocode'],
//                 componentRestrictions: { country: 'ua' },
//                 fields: ['formatted_address', 'geometry'],
//               }}
//               placeholder="Выберите улицу"
//               className={styles.input}
//             />
//           )}
//           <button 
          
//             type="button"
//             onClick={toggleStreetInputMode}
//             className={styles.toggleButton}
//           >
//             {useManualStreetInput ? 'Выбрать улицу из списка' : 'Ввести улицу вручную'}
//           </button>
//           {streetError && <span className={styles.error}>{streetError}</span>}
//         </label>

//         {/* Карта с маркером */}
//         {selectedLocation && (
//           <GoogleMap
//             mapContainerStyle={{ width: '100%', height: '400px' }}
//             center={selectedLocation}
//             zoom={15}
//             onLoad={onMapLoad}
//           >
//             <Marker
//               position={selectedLocation}
//               draggable={true}
//               onDragEnd={handleMarkerDragEnd}
//             />
//           </GoogleMap>
//         )}

//         {/* Кнопка отправки формы */}
//         <button className={styles.button} type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Добавление...' : 'Добавить'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddApartment;


// import React, { useState } from 'react';
// import axios from 'axios';
// import Autocomplete from 'react-google-autocomplete';
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import styles from '@/app/styles/Add-apartment.module.scss';

// const AddApartment = () => {
//   // Состояния
//   const [formData, setFormData] = useState({
//     city: '',
//     district: '',
//     street: '',
//     houseNumber: '',
//     description: '',
//     price: '',
//     category: '',
//     metro: '',
//   });
//   const [photos, setPhotos] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showMetro, setShowMetro] = useState(false);
//   const [showCategories, setShowCategories] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [city, setCity] = useState('');
//   const [streetError, setStreetError] = useState('');
//   const [useManualStreetInput, setUseManualStreetInput] = useState(false);

//   // Константы
//   const categories = ['Квартира', 'Апартаменты', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
//   const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w"; // Ваш ключ API

//   // Списки метро
//   const metroStations = {
//     kyiv: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская', 'Политехнический институт',
//       'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная', 'Днепр', 'Гидропарк', 'Левобережная',
//       'Дарница', 'Черниговская', 'Лесная'
//     ],
//     kharkiv: [
//       'Холодная Гора', 'Южный Вокзал', 'Центральный Рынок', 'Площадь Конституции', 'Проспект Гагарина', 'Спортивная',
//       'Завод имени Малышева', 'Московский проспект', 'Дворец Спорта', 'Армейская', 'Имени А.С. Масельского',
//       'Тракторный Завод', 'Индустриальная'
//     ],
//     dnipropetrovsk: [
//       'Вокзальна', 'Метростроителей', 'Центральна', 'Покровская', 'Проспект Свободы', 'Театральная'
//     ]
//   };

//   // Обработчики событий

//   // Выбор города
//   const handleCitySelect = (place) => {
//     const formattedAddress = place?.formatted_address || '';
//     setFormData((prevData) => ({
//       ...prevData,
//       city: formattedAddress,
//     }));
//     setCity(formattedAddress);

//     if (place.geometry && place.geometry.location) {
//       setSelectedLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//     }

//     const cityLower = formattedAddress.toLowerCase();
//     const isKyiv = ['киев', 'київ', 'kyiv'].some((name) => cityLower.includes(name));
//     const isKharkiv = ['харьков', 'харків', 'kharkiv'].some((name) => cityLower.includes(name));
//     const isDnipropetrovsk = ['днепр', 'дніпро', 'dnipropetrovsk'].some((name) => cityLower.includes(name));

//     setShowMetro(isKyiv || isKharkiv || isDnipropetrovsk);
//     if (!isKyiv && !isKharkiv && !isDnipropetrovsk) {
//       setFormData((prevData) => ({ ...prevData, metro: '' }));
//     }
//   };

//   // Выбор улицы через Google Autocomplete
//   const handleStreetSelect = (place) => {
//     const address = place?.formatted_address || '';
//     const street = address.split(',')[0];

//     if (city && !address.toLowerCase().includes(city.toLowerCase())) {
//       setStreetError('Улица не найдена в выбранном городе. Пожалуйста, выберите улицу из списка.');
//       return;
//     } else {
//       setStreetError('');
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       street: street,
//     }));

//     if (place && place.geometry) {
//       setSelectedLocation(place.geometry.location);
//     } else {
//       setSelectedLocation(null);
//     }
//   };

//   // Ручной ввод улицы
//   const handleManualStreetInput = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       street: e.target.value,
//     }));
//   };

//   // Переключение между автодополнением и ручным вводом
//   const toggleStreetInputMode = () => {
//     setUseManualStreetInput(!useManualStreetInput);
//     setFormData((prevData) => ({
//       ...prevData,
//       street: '',
//     }));
//   };

//   // Загрузка фотографий
//   const handlePhotoChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 7) {
//       alert('Можно загрузить не более 7 фотографий.');
//       return;
//     }
//     setPhotos(Array.from(files));
//   };

//   // Перетаскивание маркера
//   const handleMarkerDragEnd = (event) => {
//     const newLocation = event.latLng;
//     setSelectedLocation(newLocation);
//     setFormData((prevData) => ({
//       ...prevData,
//       latitude: newLocation.lat(),
//       longitude: newLocation.lng(),
//     }));
//   };

//   // Загрузка карты
//   const onMapLoad = (map) => {
//     if (selectedLocation) {
//       map.panTo(selectedLocation);
//     }
//   };

//   // Выбор категории
//   const handleCategorySelect = (category) => {
//     setFormData((prevData) => ({ ...prevData, category }));
//     setShowCategories(false);
//   };

//   // Отправка формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     for (let i = 0; i < photos.length; i++) {
//       data.append('photos', photos[i]);
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/api/apartments/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       alert('Квартира успешно добавлена!');
//       console.log('Отправка события apartmentAdded:', response.data);
//       window.dispatchEvent(new CustomEvent('apartmentAdded', { detail: response.data }));
//     } catch (error) {
//       console.error('Ошибка при добавлении квартиры:', error);
//       alert('Произошла ошибка, попробуйте еще раз.');
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Определяем, какой список метро показывать
//   const getMetroStations = () => {
//     const cityLower = city.toLowerCase();
//     if (cityLower.includes('киев') || cityLower.includes('київ') || cityLower.includes('kyiv')) {
//       return metroStations.kyiv;
//     } else if (cityLower.includes('харьков') || cityLower.includes('харків') || cityLower.includes('kharkiv')) {
//       return metroStations.kharkiv;
//     } else if (cityLower.includes('днепр') || cityLower.includes('дніпро') || cityLower.includes('dnipropetrovsk')) {
//       return metroStations.dnipropetrovsk;
//     }
//     return [];
//   };

//   return (
//     <div>
//       <h1>Создайте объявление</h1>
//       <form className={styles.form} onSubmit={handleSubmit}>
//         {/* Выбор категории */}
//         <label className={styles.label}>
//           Категория:
//           <div className={styles.inputWrapper} onClick={() => setShowCategories(!showCategories)}>
//             <input
//               className={styles.input}
//               type="text"
//               name="category"
//               value={formData.category}
//               readOnly
//               placeholder="Выберите категорию"
//             />
//             <img alt="стрелка" loading="lazy" width="14" height="14" src="/angle.svg" className={styles.arrow} />
//           </div>
//         </label>

//         {showCategories && (
//           <div className={styles.dropdown}>
//             {categories.map((cat) => (
//               <div
//                 key={cat}
//                 className={styles.dropdownItem}
//                 onClick={() => handleCategorySelect(cat)}
//               >
//                 {cat}
//               </div>
//             ))}
//           </div>
//         )}

//         {/* Заголовок объявления */}
//         <label className={styles.label}>
//           Заголовок объявления:
//           <input
//             className={styles.input}
//             type="text"
//             name="title"
//             value={formData.title}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 title: e.target.value,
//               }))
//             }
//             placeholder="Например, Сдам 2 комнатную квартиру с евроремонтом"
//             required
//           />
//         </label>

//         {/* Описание */}
//         <label className={styles.label}>
//           Описание:
//           <textarea
//             className={styles.textarea}
//             name="description"
//             value={formData.description}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 description: e.target.value,
//               }))
//             }
//             required
//           ></textarea>
//         </label>

//         {/* Фотографии */}
//         <label className={styles.label}>
//           Фотографии (максимум 7):
//           <input
//             className={styles.input}
//             type="file"
//             multiple
//             onChange={handlePhotoChange}
//             accept="image/*"
//             required
//           />
//           <span className={styles.photoHint}>Выбрано фотографий: {photos.length}/7</span>
//         </label>

//         {/* Цена */}
//         <label className={styles.label}>
//           Цена:
//           <input
//             className={styles.input}
//             type="number"
//             name="price"
//             value={formData.price}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 price: e.target.value,
//               }))
//             }
//             required
//             min="0"
//             placeholder="Введите цену"
//           />
//         </label>

//         {/* Город */}
//         <label className={styles.label}>
//           Город:
//           <Autocomplete
//             apiKey={googleMapsApiKey}
//             onPlaceSelected={handleCitySelect}
//             options={{
//               types: ['(cities)'],
//               componentRestrictions: { country: 'ua' },
//             }}
//             placeholder="Введите город"
//             className={styles.inputCity}
//           />
//         </label>

//         {/* Метро (для Киева, Харькова и Днепра) */}
//         {showMetro && (
//           <label className={styles.label}>
//             Метро:
//             <select
//               className={styles.input}
//               name="metro"
//               value={formData.metro}
//               onChange={(e) =>
//                 setFormData((prevData) => ({
//                   ...prevData,
//                   metro: e.target.value,
//                 }))
//               }
//               required
//             >
//               <option value="">Выберите станцию метро</option>
//               {getMetroStations().map((station) => (
//                 <option key={station} value={station}>
//                   {station}
//                 </option>
//               ))}
//             </select>
//           </label>
//         )}

//         {/* Район */}
//         <label className={styles.label}>
//           Район:
//           <input
//             className={styles.input}
//             type="text"
//             name="district"
//             value={formData.district}
//             onChange={(e) =>
//               setFormData((prevData) => ({
//                 ...prevData,
//                 district: e.target.value,
//               }))
//             }
//             required
//           />
//         </label>

//         {/* Улица */}
//         <label className={styles.label}>
//           Улица:
//           {useManualStreetInput ? (
//             <input
//               className={styles.input}
//               type="text"
//               name="street"
//               value={formData.street}
//               onChange={handleManualStreetInput}
//               placeholder="Введите улицу вручную"
//               required
//             />
//           ) : (
//             <Autocomplete
//               apiKey={googleMapsApiKey}
//               onPlaceSelected={handleStreetSelect}
//               options={{
//                 types: ['geocode'],
//                 componentRestrictions: { country: 'ua' },
//                 fields: ['formatted_address', 'geometry'],
//               }}
//               placeholder="Выберите улицу"
//               className={styles.input}
//             />
//           )}
//           <button
//             type="button"
//             onClick={toggleStreetInputMode}
//             className={styles.toggleButton}
//           >
//             {useManualStreetInput ? 'Выбрать улицу из списка' : 'Ввести улицу вручную'}
//           </button>
//           {streetError && <span className={styles.error}>{streetError}</span>}
//         </label>

//         {/* Карта с маркером */}
//         {selectedLocation && (
//           <GoogleMap
//             mapContainerStyle={{ width: '100%', height: '400px' }}
//             center={selectedLocation}
//             zoom={15}
//             onLoad={onMapLoad}
//           >
//             <Marker
//               position={selectedLocation}
//               draggable={true}
//               onDragEnd={handleMarkerDragEnd}
//             />
//           </GoogleMap>
//         )}

//         {/* Кнопка отправки формы */}
//         <button className={styles.button} type="submit" disabled={isSubmitting}>
//           {isSubmitting ? 'Добавление...' : 'Добавить'}
//         </button>
//       </form>
//     </div>
//   );
// };

// export default AddApartment;





// import React, { useState } from 'react';
// import axios from 'axios';
// import Autocomplete from 'react-google-autocomplete';
// import { GoogleMap, Marker } from '@react-google-maps/api';
// import {
//   Container,
//   Typography,
//   TextField,
//   Select,
//   MenuItem,
//   Button,
//   FormControl,
//   InputLabel,
//   Box,
//   Chip,
//   CircularProgress,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogTitle,
//   DialogContent,
//   DialogActions,
//   ToggleButtonGroup,
//   ToggleButton,
// } from '@mui/material';
// import { PhotoCamera, LocationOn } from '@mui/icons-material';

// const AddApartment = () => {
//   // Состояния
//   const [formData, setFormData] = useState({
//     city: '',
//     district: '',
//     street: '',
//     houseNumber: '',
//     description: '',
//     price: '',
//     category: '',
//     metro: '',
//   });
//   const [photos, setPhotos] = useState([]);
//   const [isSubmitting, setIsSubmitting] = useState(false);
//   const [showMetro, setShowMetro] = useState(false);
//   const [selectedLocation, setSelectedLocation] = useState(null);
//   const [city, setCity] = useState('');
//   const [streetError, setStreetError] = useState('');
//   const [streetInputMode, setStreetInputMode] = useState('google'); // 'google' или 'manual'
//   const [snackbarOpen, setSnackbarOpen] = useState(false);
//   const [snackbarMessage, setSnackbarMessage] = useState('');
//   const [previewOpen, setPreviewOpen] = useState(false); // Для предпросмотра

//   // Константы
//   const categories = ['Квартира', 'Апартаменты', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
//   const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w"; // Ваш ключ API

//   // Списки метро
//   const metroStations = {
//     kyiv: [
//       'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская', 'Политехнический институт',
//       'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная', 'Днепр', 'Гидропарк', 'Левобережная',
//       'Дарница', 'Черниговская', 'Лесная'
//     ],
//     kharkiv: [
//       'Холодная Гора', 'Южный Вокзал', 'Центральный Рынок', 'Площадь Конституции', 'Проспект Гагарина', 'Спортивная',
//       'Завод имени Малышева', 'Московский проспект', 'Дворец Спорта', 'Армейская', 'Имени А.С. Масельского',
//       'Тракторный Завод', 'Индустриальная'
//     ],
//     dnipropetrovsk: [
//       'Вокзальна', 'Метростроителей', 'Центральна', 'Покровская', 'Проспект Свободы', 'Театральная'
//     ]
//   };

//   // Выбор списка метро в зависимости от города
//   const getMetroStationsForCity = () => {
//     const cityLower = city.toLowerCase();
//     if (cityLower.includes('киев') || cityLower.includes('київ') || cityLower.includes('kyiv')) {
//       return metroStations.kyiv;
//     } else if (cityLower.includes('харьков') || cityLower.includes('харків') || cityLower.includes('kharkiv')) {
//       return metroStations.kharkiv;
//     } else if (cityLower.includes('днепр') || cityLower.includes('дніпро') || cityLower.includes('dnipropetrovsk')) {
//       return metroStations.dnipropetrovsk;
//     }
//     return [];
//   };

//   // Обработчики событий

//   // Выбор города
//   const handleCitySelect = (place) => {
//     const formattedAddress = place?.formatted_address || '';
//     setFormData((prevData) => ({
//       ...prevData,
//       city: formattedAddress,
//     }));
//     setCity(formattedAddress);

//     if (place.geometry && place.geometry.location) {
//       setSelectedLocation({
//         lat: place.geometry.location.lat(),
//         lng: place.geometry.location.lng(),
//       });
//     }

//     const cityLower = formattedAddress.toLowerCase();
//     const isKyiv = ['киев', 'київ', 'kyiv'].some((name) => cityLower.includes(name));
//     const isKharkiv = ['харьков', 'харків', 'kharkiv'].some((name) => cityLower.includes(name));
//     const isDnipropetrovsk = ['днепр', 'дніпро', 'dnipropetrovsk'].some((name) => cityLower.includes(name));

//     setShowMetro(isKyiv || isKharkiv || isDnipropetrovsk);
//     if (!isKyiv && !isKharkiv && !isDnipropetrovsk) {
//       setFormData((prevData) => ({ ...prevData, metro: '' }));
//     }
//   };

//   // Выбор улицы через Google Autocomplete
//   const handleStreetSelect = (place) => {
//     const address = place?.formatted_address || '';
//     const street = address.split(',')[0];

//     if (city && !address.toLowerCase().includes(city.toLowerCase())) {
//       setStreetError('Улица не найдена в выбранном городе. Пожалуйста, выберите улицу из списка.');
//       return;
//     } else {
//       setStreetError('');
//     }

//     setFormData((prevData) => ({
//       ...prevData,
//       street: street,
//     }));

//     if (place && place.geometry) {
//       setSelectedLocation(place.geometry.location);
//     } else {
//       setSelectedLocation(null);
//     }
//   };

//   // Ручной ввод улицы
//   const handleManualStreetInput = (e) => {
//     setFormData((prevData) => ({
//       ...prevData,
//       street: e.target.value,
//     }));
//   };

//   // Загрузка фотографий
//   const handlePhotoChange = (e) => {
//     const files = e.target.files;
//     if (files.length > 9) {
//       setSnackbarMessage('Можно загрузить не более 9 фотографий.');
//       setSnackbarOpen(true);
//       return;
//     }
//     setPhotos(Array.from(files));
//   };

//   // Отправка формы
//   const handleSubmit = async (e) => {
//     e.preventDefault();
//     setIsSubmitting(true);

//     const data = new FormData();
//     Object.keys(formData).forEach((key) => {
//       data.append(key, formData[key]);
//     });

//     for (let i = 0; i < photos.length; i++) {
//       data.append('photos', photos[i]);
//     }

//     try {
//       const response = await axios.post('http://localhost:3001/api/apartments/add', data, {
//         headers: {
//           'Content-Type': 'multipart/form-data',
//         },
//       });

//       setSnackbarMessage('Квартира успешно добавлена!');
//       setSnackbarOpen(true);
//       console.log('Отправка события apartmentAdded:', response.data);
//       window.dispatchEvent(new CustomEvent('apartmentAdded', { detail: response.data }));
//     } catch (error) {
//       console.error('Ошибка при добавлении квартиры:', error);
//       setSnackbarMessage('Произошла ошибка, попробуйте еще раз.');
//       setSnackbarOpen(true);
//     } finally {
//       setIsSubmitting(false);
//     }
//   };

//   // Закрытие Snackbar
//   const handleSnackbarClose = () => {
//     setSnackbarOpen(false);
//   };

//   // Предпросмотр объявления
//   const handlePreview = () => {
//     setPreviewOpen(true);
//   };

//   // Закрытие предпросмотра
//   const handleClosePreview = () => {
//     setPreviewOpen(false);
//   };

//   return (
//     <Container maxWidth="md">
//       <Typography variant="h4" align="center" gutterBottom>
//         Создайте объявление
//       </Typography>
//       <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
//         {/* Категория */}
//         <FormControl fullWidth margin="normal">
//           <InputLabel>Категория</InputLabel>
//           <Select
//             value={formData.category}
//             onChange={(e) => setFormData({ ...formData, category: e.target.value })}
//             label="Категория"
//           >
//             {categories.map((cat) => (
//               <MenuItem key={cat} value={cat}>
//                 {cat}
//               </MenuItem>
//             ))}
//           </Select>
//         </FormControl>

//         {/* Описание */}
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Описание"
//           multiline
//           rows={4}
//           value={formData.description}
//           onChange={(e) => setFormData({ ...formData, description: e.target.value })}
//           placeholder="Опишите ваш объект"
//           required
//         />

//         {/* Город */}
//         <Autocomplete
//           apiKey={googleMapsApiKey}
//           onPlaceSelected={handleCitySelect}
//           options={{
//             types: ['(cities)'],
//             componentRestrictions: { country: 'ua' },
//           }}
//           placeholder="Введите город"
//           renderInput={(params) => (
//             <TextField
//               {...params}
//               fullWidth
//               margin="normal"
//               label="Город"
//               required
//               sx={{ width: '100%' }}
//             />
//           )}
//         />

//         {/* Метро (если город Киев, Харьков или Днепр) */}
//         {showMetro && (
//           <FormControl fullWidth margin="normal">
//             <InputLabel>Метро</InputLabel>
//             <Select
//               value={formData.metro}
//               onChange={(e) => setFormData({ ...formData, metro: e.target.value })}
//               label="Метро"
//             >
//               {getMetroStationsForCity().map((station) => (
//                 <MenuItem key={station} value={station}>
//                   {station}
//                 </MenuItem>
//               ))}
//             </Select>
//           </FormControl>
//         )}

//         {/* Улица */}
//         <Box margin="normal">
//           <ToggleButtonGroup
//             value={streetInputMode}
//             exclusive
//             onChange={(e, newMode) => setStreetInputMode(newMode)}
//             sx={{ mb: 2 }}
//           >
//             <ToggleButton value="google">Выбрать улицу из списка</ToggleButton>
//             <ToggleButton value="manual">Ввести улицу вручную</ToggleButton>
//           </ToggleButtonGroup>

//           {streetInputMode === 'google' ? (
//             <Autocomplete
//               apiKey={googleMapsApiKey}
//               onPlaceSelected={handleStreetSelect}
//               options={{
//                 types: ['geocode'],
//                 componentRestrictions: { country: 'ua' },
//                 fields: ['formatted_address', 'geometry'],
//               }}
//               placeholder="Выберите улицу"
//               renderInput={(params) => (
//                 <TextField
//                   {...params}
//                   fullWidth
//                   margin="normal"
//                   label="Улица"
//                   required
//                   sx={{ width: '100%' }}
//                 />
//               )}
//             />
//           ) : (
//             <TextField
//               fullWidth
//               margin="normal"
//               label="Улица"
//               value={formData.street}
//               onChange={handleManualStreetInput}
//               required
//               sx={{ width: '100%' }}
//             />
//           )}
//           {streetError && <Typography color="error">{streetError}</Typography>}
//         </Box>

//         {/* Цена */}
//         <TextField
//           fullWidth
//           margin="normal"
//           label="Цена"
//           type="number"
//           value={formData.price}
//           onChange={(e) => setFormData({ ...formData, price: e.target.value })}
//           required
//           sx={{ width: '50%' }} // Уменьшил ширину поля
//         />

//         {/* Фотографии */}
//         <Box margin="normal">
//           <input
//             accept="image/*"
//             style={{ display: 'none' }}
//             id="photo-upload"
//             type="file"
//             multiple
//             onChange={handlePhotoChange}
//           />
//           <label htmlFor="photo-upload">
//             <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
//               Загрузить фотографии (максимум 9)
//             </Button>
//           </label>
//           {photos.length > 0 && (
//             <Box sx={{ mt: 2 }}>
//               {photos.map((photo, index) => (
//                 <Chip key={index} label={photo.name} onDelete={() => setPhotos(photos.filter((_, i) => i !== index))} />
//               ))}
//             </Box>
//           )}
//         </Box>

//         {/* Карта */}
//         {selectedLocation && (
//           <Box margin="normal" sx={{ height: '400px', width: '100%' }}>
//             <GoogleMap
//               mapContainerStyle={{ width: '100%', height: '100%' }}
//               center={selectedLocation}
//               zoom={12}
//             >
//               <Marker
//                 position={selectedLocation}
//                 draggable={true}
//                 onDragEnd={(e) => {
//                   const newLocation = e.latLng;
//                   setSelectedLocation(newLocation);
//                   setFormData((prevData) => ({
//                     ...prevData,
//                     latitude: newLocation.lat(),
//                     longitude: newLocation.lng(),
//                   }));
//                 }}
//               />
//             </GoogleMap>
//           </Box>
//         )}

//         {/* Кнопки */}
//         <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
//           <Button
//             variant="contained"
//             onClick={handlePreview}
//             disabled={!formData.city || !formData.street || !formData.description || !formData.price}
//           >
//             Предпросмотр
//           </Button>
//           <Button
//             type="submit"
//             variant="contained"
//             disabled={isSubmitting}
//           >
//             {isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
//           </Button>
//         </Box>
//       </Box>

//       {/* Диалог предпросмотра */}
//       <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
//         <DialogTitle>Предпросмотр объявления</DialogTitle>
//         <DialogContent>
//           <Typography variant="h6">{formData.category}</Typography>
//           <Typography>{formData.description}</Typography>
//           <Typography>Город: {formData.city}</Typography>
//           <Typography>Улица: {formData.street}</Typography>
//           <Typography>Цена: {formData.price} грн</Typography>
//           {photos.map((photo, index) => (
//             <img
//               key={index}
//               src={URL.createObjectURL(photo)}
//               alt={`Фото ${index + 1}`}
//               style={{ width: '100%', marginTop: '10px' }}
//             />
//           ))}
//         </DialogContent>
//         <DialogActions>
//           <Button onClick={handleClosePreview}>Закрыть</Button>
//           <Button onClick={handleSubmit} variant="contained">
//             Опубликовать
//           </Button>
//         </DialogActions>
//       </Dialog>

//       {/* Snackbar для уведомлений */}
//       <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
//         <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
//           {snackbarMessage}
//         </Alert>
//       </Snackbar>
//     </Container>
//   );
// };

// export default AddApartment;


import React, { useState } from 'react';
import axios from 'axios';
import Autocomplete from 'react-google-autocomplete';
import { GoogleMap, Marker } from '@react-google-maps/api';
import {
  Container,
  Typography,
  TextField,
  Select,
  MenuItem,
  Button,
  FormControl,
  InputLabel,
  Box,
  Chip,
  CircularProgress,
  Snackbar,
  Alert,
  Dialog,
  DialogTitle,
  DialogContent,
  DialogActions,
  IconButton,
  ToggleButtonGroup,
  ToggleButton,
} from '@mui/material';
import { PhotoCamera, LocationOn, NavigateBefore, NavigateNext } from '@mui/icons-material';

const AddApartment = () => {
  // Состояния
  const [formData, setFormData] = useState({
    city: '',
    district: '',
    street: '',
    houseNumber: '',
    description: '',
    price: '',
    category: '',
    metro: '',
  });
  const [photos, setPhotos] = useState([]);
  const [isSubmitting, setIsSubmitting] = useState(false);
  const [showMetro, setShowMetro] = useState(false);
  const [selectedLocation, setSelectedLocation] = useState(null);
  const [city, setCity] = useState('');
  const [streetError, setStreetError] = useState('');
  const [streetInputMode, setStreetInputMode] = useState('google'); // 'google' или 'manual'
  const [snackbarOpen, setSnackbarOpen] = useState(false);
  const [snackbarMessage, setSnackbarMessage] = useState('');
  const [previewOpen, setPreviewOpen] = useState(false); // Для предпросмотра
  const [currentPhotoIndex, setCurrentPhotoIndex] = useState(0); // Для пролистывания фото

  // Константы
  const categories = ['Квартира', 'Апартаменты', 'Гостиница', 'Хостел', 'Дом', 'База отдыха', 'Сауна/Баня'];
  const googleMapsApiKey = "AIzaSyBBFJdnxDmbAko4mbzBzJ-yozBBx_gpY3w"; // Ваш ключ API

  // Списки метро
  const metroStations = {
    kyiv: [
      'Академгородок', 'Житомирская', 'Святошин', 'Нивки', 'Берестейская', 'Шулявская', 'Политехнический институт',
      'Вокзальная', 'Университет', 'Театральная', 'Крещатик', 'Арсенальная', 'Днепр', 'Гидропарк', 'Левобережная',
      'Дарница', 'Черниговская', 'Лесная'
    ],
    kharkiv: [
      'Холодная Гора', 'Южный Вокзал', 'Центральный Рынок', 'Площадь Конституции', 'Проспект Гагарина', 'Спортивная',
      'Завод имени Малышева', 'Московский проспект', 'Дворец Спорта', 'Армейская', 'Имени А.С. Масельского',
      'Тракторный Завод', 'Индустриальная'
    ],
    dnipropetrovsk: [
      'Вокзальна', 'Метростроителей', 'Центральна', 'Покровская', 'Проспект Свободы', 'Театральная'
    ]
  };

  // Выбор списка метро в зависимости от города
  const getMetroStationsForCity = () => {
    const cityLower = city.toLowerCase();
    if (cityLower.includes('киев') || cityLower.includes('київ') || cityLower.includes('kyiv')) {
      return metroStations.kyiv;
    } else if (cityLower.includes('харьков') || cityLower.includes('харків') || cityLower.includes('kharkiv')) {
      return metroStations.kharkiv;
    } else if (cityLower.includes('днепр') || cityLower.includes('дніпро') || cityLower.includes('dnipropetrovsk')) {
      return metroStations.dnipropetrovsk;
    }
    return [];
  };

  // Обработчики событий

  // Выбор города
  const handleCitySelect = (place) => {
    const formattedAddress = place?.formatted_address || '';
    setFormData((prevData) => ({
      ...prevData,
      city: formattedAddress,
    }));
    setCity(formattedAddress);

    if (place.geometry && place.geometry.location) {
      setSelectedLocation({
        lat: place.geometry.location.lat(),
        lng: place.geometry.location.lng(),
      });
    }

    const cityLower = formattedAddress.toLowerCase();
    const isKyiv = ['киев', 'київ', 'kyiv'].some((name) => cityLower.includes(name));
    const isKharkiv = ['харьков', 'харків', 'kharkiv'].some((name) => cityLower.includes(name));
    const isDnipropetrovsk = ['днепр', 'дніпро', 'dnipropetrovsk'].some((name) => cityLower.includes(name));

    setShowMetro(isKyiv || isKharkiv || isDnipropetrovsk);
    if (!isKyiv && !isKharkiv && !isDnipropetrovsk) {
      setFormData((prevData) => ({ ...prevData, metro: '' }));
    }
  };

  // Выбор улицы через Google Autocomplete
  const handleStreetSelect = (place) => {
    const address = place?.formatted_address || '';
    const street = address.split(',')[0];

    if (city && !address.toLowerCase().includes(city.toLowerCase())) {
      setStreetError('Улица не найдена в выбранном городе. Пожалуйста, выберите улицу из списка.');
      return;
    } else {
      setStreetError('');
    }

    setFormData((prevData) => ({
      ...prevData,
      street: street,
    }));

    if (place && place.geometry) {
      setSelectedLocation(place.geometry.location);
    } else {
      setSelectedLocation(null);
    }
  };

  // Ручной ввод улицы
  const handleManualStreetInput = (e) => {
    setFormData((prevData) => ({
      ...prevData,
      street: e.target.value,
    }));
  };

  // Загрузка фотографий
  const handlePhotoChange = (e) => {
    const files = e.target.files;
    if (files.length > 9) {
      setSnackbarMessage('Можно загрузить не более 9 фотографий.');
      setSnackbarOpen(true);
      return;
    }
    setPhotos(Array.from(files));
  };

  // Отправка формы
  const handleSubmit = async (e) => {
    e.preventDefault();
    setIsSubmitting(true);

    const data = new FormData();
    Object.keys(formData).forEach((key) => {
      data.append(key, formData[key]);
    });

    for (let i = 0; i < photos.length; i++) {
      data.append('photos', photos[i]);
    }

    try {
      const response = await axios.post('http://localhost:3001/api/apartments/add', data, {
        headers: {
          'Content-Type': 'multipart/form-data',
        },
      });

      setSnackbarMessage('Квартира успешно добавлена!');
      setSnackbarOpen(true);
      console.log('Отправка события apartmentAdded:', response.data);
      window.dispatchEvent(new CustomEvent('apartmentAdded', { detail: response.data }));
    } catch (error) {
      console.error('Ошибка при добавлении квартиры:', error);
      setSnackbarMessage('Произошла ошибка, попробуйте еще раз.');
      setSnackbarOpen(true);
    } finally {
      setIsSubmitting(false);
    }
  };

  // Закрытие Snackbar
  const handleSnackbarClose = () => {
    setSnackbarOpen(false);
  };

  // Предпросмотр объявления
  const handlePreview = () => {
    setPreviewOpen(true);
    setCurrentPhotoIndex(0); // Сброс индекса фото при открытии предпросмотра
  };

  // Закрытие предпросмотра
  const handleClosePreview = () => {
    setPreviewOpen(false);
  };

  // Пролистывание фотографий
  const handleNextPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex + 1) % photos.length);
  };

  const handlePrevPhoto = () => {
    setCurrentPhotoIndex((prevIndex) => (prevIndex - 1 + photos.length) % photos.length);
  };

  return (
    <Container maxWidth="md">
      <Typography variant="h4" align="center" gutterBottom>
        Создайте объявление
      </Typography>
      <Box component="form" onSubmit={handleSubmit} sx={{ mt: 3 }}>
        {/* Категория */}
        <FormControl fullWidth margin="normal">
          <InputLabel>Категория</InputLabel>
          <Select
            value={formData.category}
            onChange={(e) => setFormData({ ...formData, category: e.target.value })}
            label="Категория"
          >
            {categories.map((cat) => (
              <MenuItem key={cat} value={cat}>
                {cat}
              </MenuItem>
            ))}
          </Select>
        </FormControl>

        {/* Описание */}
        <TextField
          fullWidth
          margin="normal"
          label="Описание"
          multiline
          rows={4}
          value={formData.description}
          onChange={(e) => setFormData({ ...formData, description: e.target.value })}
          placeholder="Опишите ваш объект"
          required
        />

        {/* Город */}
        <Box margin="normal">
          <Autocomplete
            apiKey={googleMapsApiKey}
            onPlaceSelected={handleCitySelect}
            options={{
              types: ['(cities)'],
              componentRestrictions: { country: 'ua' },
            }}
            placeholder="Введите город"
            renderInput={(params) => (
              <TextField 
                {...params}
                fullWidth
                margin="normal"
                label="Город"
                required
                sx={{ width: '100%', // Ширина поля
                '& .MuiInputBase-root': {
                  height: '56px', // Высота поля
                }, }}
              />
            )}
          />
        </Box>

        {/* Метро (если город Киев, Харьков или Днепр) */}
        {showMetro && (
          <FormControl fullWidth margin="normal">
            <InputLabel>Метро</InputLabel>
            <Select
              value={formData.metro}
              onChange={(e) => setFormData({ ...formData, metro: e.target.value })}
              label="Метро"
            >
              {getMetroStationsForCity().map((station) => (
                <MenuItem key={station} value={station}>
                  {station}
                </MenuItem>
              ))}
            </Select>
          </FormControl>
        )}

        {/* Улица */}
        <Box margin="normal">
          <ToggleButtonGroup
            value={streetInputMode}
            exclusive
            onChange={(e, newMode) => setStreetInputMode(newMode)}
            sx={{ mb: 2 }}
          >
            <ToggleButton value="google">Выбрать улицу из списка</ToggleButton>
            <ToggleButton value="manual">Ввести улицу вручную</ToggleButton>
          </ToggleButtonGroup>

          {streetInputMode === 'google' ? (
            <Autocomplete
              apiKey={googleMapsApiKey}
              onPlaceSelected={handleStreetSelect}
              options={{
                types: ['geocode'],
                componentRestrictions: { country: 'ua' },
                fields: ['formatted_address', 'geometry'],
              }}
              placeholder="Выберите улицу"
              renderInput={(params) => (
                <TextField
                  {...params}
                  fullWidth
                  margin="normal"
                  label="Улица"
                  required
                  sx={{  width: '100%', // Ширина поля
                  '& .MuiInputBase-root': {
                    height: '56px', // Высота поля
                  }, }}
                />
              )}
            />
          ) : (
            <TextField
              fullWidth
              margin="normal"
              label="Улица"
              value={formData.street}
              onChange={handleManualStreetInput}
              required
              sx={{  width: '100%', // Ширина поля
              '& .MuiInputBase-root': {
                height: '56px', // Высота поля
              }, }}
            />
          )}
          {streetError && <Typography color="error">{streetError}</Typography>}
        </Box>

        {/* Цена */}
        <TextField
          fullWidth
          margin="normal"
          label="Цена"
          type="number"
          value={formData.price}
          onChange={(e) => setFormData({ ...formData, price: e.target.value })}
          required
          sx={{ width: '20%' }} // Уменьшил ширину поля
        />

        {/* Фотографии */}
        <Box margin="normal">
          <input
            accept="image/*"
            style={{ display: 'none' }}
            id="photo-upload"
            type="file"
            multiple
            onChange={handlePhotoChange}
          />
          <label htmlFor="photo-upload">
            <Button variant="contained" component="span" startIcon={<PhotoCamera />}>
              Загрузить фотографии (максимум 9)
            </Button>
          </label>
          {photos.length > 0 && (
            <Box sx={{ mt: 2 }}>
              {photos.map((photo, index) => (
                <Chip key={index} label={photo.name} onDelete={() => setPhotos(photos.filter((_, i) => i !== index))} />
              ))}
            </Box>
          )}
        </Box>

        {/* Карта */}
        {selectedLocation && (
          <Box margin="normal" sx={{ height: '400px', width: '100%' }}>
            <GoogleMap
              mapContainerStyle={{ width: '100%', height: '100%' }}
              center={selectedLocation}
              zoom={12}
            >
              <Marker
                position={selectedLocation}
                draggable={true}
                onDragEnd={(e) => {
                  const newLocation = e.latLng;
                  setSelectedLocation(newLocation);
                  setFormData((prevData) => ({
                    ...prevData,
                    latitude: newLocation.lat(),
                    longitude: newLocation.lng(),
                  }));
                }}
              />
            </GoogleMap>
          </Box>
        )}

        {/* Кнопки */}
        <Box sx={{ display: 'flex', gap: 2, mt: 3 }}>
          <Button
            variant="contained"
            onClick={handlePreview}
            disabled={!formData.city || !formData.street || !formData.description || !formData.price}
          >
            Предпросмотр
          </Button>
          <Button
            type="submit"
            variant="contained"
            disabled={isSubmitting}
          >
            {isSubmitting ? <CircularProgress size={24} /> : 'Добавить'}
          </Button>
        </Box>
      </Box>

      {/* Диалог предпросмотра */}
      <Dialog open={previewOpen} onClose={handleClosePreview} maxWidth="md" fullWidth>
        <DialogTitle>Предпросмотр объявления</DialogTitle>
        <DialogContent>
          <Typography variant="h6">{formData.category}</Typography>
          <Typography>{formData.description}</Typography>
          <Typography>Город: {formData.city}</Typography>
          <Typography>Улица: {formData.street}</Typography>
          <Typography>Цена: {formData.price} грн</Typography>
          {photos.length > 0 && (
            <Box sx={{ position: 'relative', width: '100%', textAlign: 'center' }}>
              <img
                src={URL.createObjectURL(photos[currentPhotoIndex])}
                alt={`Фото ${currentPhotoIndex + 1}`}
                style={{ width: '100%', maxHeight: '400px', objectFit: 'contain' }}
              />
              {photos.length > 1 && (
                <>
                  <IconButton
                    onClick={handlePrevPhoto}
                    sx={{ position: 'absolute', left: 0, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                  >
                    <NavigateBefore />
                  </IconButton>
                  <IconButton
                    onClick={handleNextPhoto}
                    sx={{ position: 'absolute', right: 0, top: '50%', transform: 'translateY(-50%)', color: 'white' }}
                  >
                    <NavigateNext />
                  </IconButton>
                </>
              )}
            </Box>
          )}
        </DialogContent>
        <DialogActions>
          <Button onClick={handleClosePreview}>Закрыть</Button>
          <Button onClick={handleSubmit} variant="contained">
            Опубликовать
          </Button>
        </DialogActions>
      </Dialog>

      {/* Snackbar для уведомлений */}
      <Snackbar open={snackbarOpen} autoHideDuration={6000} onClose={handleSnackbarClose}>
        <Alert onClose={handleSnackbarClose} severity="success" sx={{ width: '100%' }}>
          {snackbarMessage}
        </Alert>
      </Snackbar>
    </Container>
  );
};

export default AddApartment;