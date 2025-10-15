




// 'use client';

// import React, { useEffect, useRef, useState } from 'react';
// import { Box, Typography, CircularProgress, Button } from '@mui/material';

// // Глобальная переменная для отслеживания загрузки API
// let googleMapsLoading = false;
// let googleMapsLoaded = false;
// let googleMapsLoadCallbacks = [];

// // Цвета для разных категорий
// const CATEGORY_COLORS = {
//   'apart': '#FF5252', // красный для квартир
//   'hostel': '#4CAF50', // зеленый для хостелов
//   'glamping': '#FF9800', // оранжевый для глемпинга
//   'hotel': '#2196F3', // синий для отелей
//   'pet-hotel': '#9C27B0', // фиолетовый для отелей для животных
//   'house': '#795548', // коричневый для домов
//   'sauna': '#F44336', // ярко-красный для саун
//   'pansionat': '#607D8B', // серо-голубой для пансионатов
//   'cottage': '#FFEB3B', // желтый для коттеджей
//   'coworking': '#E91E63', // розовый для коворкингов
//   'autocamping': '#8BC34A', // светло-зеленый для автокемпингов
//   'rest-base': '#00BCD4', // бирюзовый для баз отдыха
//   'default': '#1976d2' // синий по умолчанию
// };

// const MapComponent = ({ apartments, onApartmentSelect, centerMode = false, userLocation = null }) => {
//   const mapRef = useRef(null);
//   const googleMapRef = useRef(null);
//   const markersRef = useRef([]);
//   const [mapLoading, setMapLoading] = useState(true);
//   const [mapError, setMapError] = useState(false);

//   // Функция для получения цвета маркера по категории
//   const getCategoryColor = (category) => {
//     if (!category) return CATEGORY_COLORS.default;
    
//     const categoryLower = category.toLowerCase();
    
//     // Проверяем все возможные варианты категорий
//     if (categoryLower.includes('apart') || categoryLower.includes('квартир')) 
//       return CATEGORY_COLORS.apart;
//     if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) 
//       return CATEGORY_COLORS.hostel;
//     if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) 
//       return CATEGORY_COLORS.glamping;
//     if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) 
//       return CATEGORY_COLORS.hotel;
//     if (categoryLower.includes('pet') || categoryLower.includes('тварин')) 
//       return CATEGORY_COLORS['pet-hotel'];
//     if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
//       return CATEGORY_COLORS.house;
//     if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
//       return CATEGORY_COLORS.sauna;
//     if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
//       return CATEGORY_COLORS.pansionat;
//     if (categoryLower.includes('cottage') || categoryLower.includes('котедж')) 
//       return CATEGORY_COLORS.cottage;
//     if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг')) 
//       return CATEGORY_COLORS.coworking;
//     if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг')) 
//       return CATEGORY_COLORS.autocamping;
//     if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха')) 
//       return CATEGORY_COLORS['rest-base'];
    
//     return CATEGORY_COLORS.default;
//   };

//   // Функция для получения иконки по категории
//   const getCategoryIcon = (category) => {
//     if (!category) return '🏠';
    
//     const categoryLower = category.toLowerCase();
//     if (categoryLower.includes('apart') || categoryLower.includes('квартир')) return '🏠';
//     if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) return '🛏️';
//     if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) return '⛺';
//     if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) return '🏨';
//     if (categoryLower.includes('pet') || categoryLower.includes('тварин')) return '🐾';
//     if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) return '🏡';
//     if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) return '🧖';
//     if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) return '🏢';
//     if (categoryLower.includes('cottage') || categoryLower.includes('котедж')) return '🏘️';
//     if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг')) return '💼';
//     if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг')) return '🚗';
//     if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха')) return '🌲';
//     return '🏠';
//   };

//   // Функция для загрузки Google Maps API
//   const loadGoogleMaps = () => {
//     return new Promise((resolve, reject) => {
//       if (googleMapsLoaded) {
//         resolve();
//         return;
//       }

//       if (googleMapsLoading) {
//         googleMapsLoadCallbacks.push(resolve);
//         return;
//       }

//       googleMapsLoading = true;

//       if (window.google && window.google.maps) {
//         googleMapsLoaded = true;
//         googleMapsLoading = false;
//         resolve();
//         return;
//       }

//       const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
//       if (existingScript) {
//         existingScript.onload = () => {
//           googleMapsLoaded = true;
//           googleMapsLoading = false;
//           resolve();
//           googleMapsLoadCallbacks.forEach(cb => cb());
//           googleMapsLoadCallbacks = [];
//         };
//         return;
//       }

//       const script = document.createElement('script');
//       script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
//       script.async = true;
//       script.defer = true;
      
//       script.onload = () => {
//         googleMapsLoaded = true;
//         googleMapsLoading = false;
//         resolve();
//         googleMapsLoadCallbacks.forEach(cb => cb());
//         googleMapsLoadCallbacks = [];
//       };

//       script.onerror = () => {
//         googleMapsLoading = false;
//         setMapError(true);
//         reject(new Error('Failed to load Google Maps'));
//       };

//       document.head.appendChild(script);
//     });
//   };

//   // Функция для получения координат апартамента
//   const getApartmentCoordinates = (apartment) => {
//     // Используем реальные координаты из базы данных
//     if (apartment.latitude && apartment.longitude) {
//       const lat = parseFloat(apartment.latitude);
//       const lng = parseFloat(apartment.longitude);
//       if (!isNaN(lat) && !isNaN(lng)) {
//         return { lat, lng };
//       }
//     }

//     // Геокодирование по адресу
//     if ((apartment.city || apartment.street) && window.google) {
//       return new Promise((resolve) => {
//         const address = `${apartment.street || ''} ${apartment.houseNumber || ''}, ${apartment.city || ''}`.trim();
//         if (address.length > 3) {
//           const geocoder = new window.google.maps.Geocoder();
//           geocoder.geocode({ address: address + ', Украина' }, (results, status) => {
//             if (status === 'OK' && results[0]) {
//               const location = results[0].geometry.location;
//               resolve({
//                 lat: location.lat(),
//                 lng: location.lng()
//               });
//             } else {
//               resolve(getCityCoordinates(apartment.city));
//             }
//           });
//         } else {
//           resolve(getCityCoordinates(apartment.city));
//         }
//       });
//     }

//     return getCityCoordinates(apartment.city);
//   };

//   // Функция для получения координат города
//   const getCityCoordinates = (city) => {
//     const cityCoordinates = {
//       'киев': { lat: 50.4501, lng: 30.5234 },
//       'львов': { lat: 49.8397, lng: 24.0297 },
//       'одесса': { lat: 46.4825, lng: 30.7233 },
//       'харьков': { lat: 49.9935, lng: 36.2304 },
//       'днепр': { lat: 48.4647, lng: 35.0462 },
//       'запорожье': { lat: 47.8388, lng: 35.1396 },
//       'ивано-франковск': { lat: 48.9226, lng: 24.7111 },
//       'тернополь': { lat: 49.5535, lng: 25.5948 },
//       'черновцы': { lat: 48.2917, lng: 25.9354 },
//       'ужгород': { lat: 48.6208, lng: 22.2879 },
//       'луцк': { lat: 50.7476, lng: 25.3252 },
//       'ровно': { lat: 50.6199, lng: 26.2516 },
//       'житомир': { lat: 50.2547, lng: 28.6587 },
//       'черкассы': { lat: 49.4444, lng: 32.0598 },
//       'кропивницкий': { lat: 48.5079, lng: 32.2623 },
//       'николаев': { lat: 46.9750, lng: 31.9946 },
//       'херсон': { lat: 46.6354, lng: 32.6169 },
//       'полтава': { lat: 49.5883, lng: 34.5514 },
//       'сумы': { lat: 50.9077, lng: 34.7981 },
//       'чернигов': { lat: 51.4982, lng: 31.2893 }
//     };

//     if (!city) return { lat: 50.4501, lng: 30.5234 };
    
//     const cityLower = city.toLowerCase().trim();
//     return cityCoordinates[cityLower] || { lat: 50.4501, lng: 30.5234 };
//   };

//   // Функция для построения маршрута
//   const buildRoute = (apartment) => {
//     getApartmentCoordinates(apartment).then(coords => {
//       let url = `https://www.google.com/maps/dir/`;
      
//       if (userLocation) {
//         url += `${userLocation.lat},${userLocation.lng}/`;
//       }
      
//       url += `${coords.lat},${coords.lng}`;
//       window.open(url, '_blank');
//     });
//   };

//   // Функция для форматирования адреса
//   const formatAddress = (apartment) => {
//     const parts = [];
//     if (apartment.city) parts.push(apartment.city);
//     if (apartment.street && apartment.houseNumber) {
//       parts.push(`${apartment.street} ${apartment.houseNumber}`);
//     }
//     return parts.join(', ');
//   };

//   const initializeMap = async () => {
//     if (!mapRef.current || !window.google) return;

//     try {
//       const defaultCenter = { lat: 50.4501, lng: 30.5234 };
//       let center = defaultCenter;
//       const coordinates = [];

//       // Получаем координаты для всех апартаментов
//       for (const apartment of apartments) {
//         const coords = await getApartmentCoordinates(apartment);
//         coordinates.push(coords);
//       }

//       if (apartments.length > 0) {
//         if (centerMode && apartments[0]) {
//           center = coordinates[0] || defaultCenter;
//         } else {
//           const validCoords = coordinates.filter(coord => coord && !isNaN(coord.lat) && !isNaN(coord.lng));
//           if (validCoords.length > 0) {
//             const avgLat = validCoords.reduce((sum, coord) => sum + coord.lat, 0) / validCoords.length;
//             const avgLng = validCoords.reduce((sum, coord) => sum + coord.lng, 0) / validCoords.length;
//             center = { lat: avgLat, lng: avgLng };
//           }
//         }
//       }

//       const map = new window.google.maps.Map(mapRef.current, {
//         center: center,
//         zoom: apartments.length === 1 ? 14 : 6,
//         mapTypeControl: true,
//         streetViewControl: true,
//         fullscreenControl: true,
//         styles: [
//           {
//             featureType: "poi",
//             elementType: "labels",
//             stylers: [{ visibility: "on" }]
//           }
//         ]
//       });

//       googleMapRef.current = map;

//       // Очищаем старые маркеры
//       markersRef.current.forEach(marker => marker.setMap(null));
//       markersRef.current = [];

//       // Добавляем маркеры для каждого апартамента
//       for (let i = 0; i < apartments.length; i++) {
//         const apartment = apartments[i];
//         const position = coordinates[i] || defaultCenter;

//         if (!position || isNaN(position.lat) || isNaN(position.lng)) {
//           continue;
//         }

//         const categoryColor = getCategoryColor(apartment.category);

//         // Создаем кастомную иконку маркера с цветом категории
//         const markerIcon = {
//           path: window.google.maps.SymbolPath.CIRCLE,
//           fillColor: categoryColor,
//           fillOpacity: 0.9,
//           strokeColor: '#ffffff',
//           strokeWeight: 2,
//           scale: 10
//         };

//         const marker = new window.google.maps.Marker({
//           position: position,
//           map: map,
//           title: apartment.objectName || apartment.category || 'Апартаменты',
//           icon: markerIcon,
//           animation: window.google.maps.Animation.DROP
//         });

//         const address = formatAddress(apartment);
//         const mainPhoto = apartment.photos && apartment.photos[0] 
//           ? apartment.photos[0] 
//           : '/placeholder-apartment.jpg';

//         const infoWindow = new window.google.maps.InfoWindow({
//           content: `
//             <div style="padding: 16px; max-width: 300px; font-family: Arial, sans-serif;">
//               <div style="display: flex; align-items: center; margin-bottom: 12px;">
//                 <span style="font-size: 24px; margin-right: 8px;">${getCategoryIcon(apartment.category)}</span>
//                 <div>
//                   <h3 style="margin: 0 0 4px 0; font-size: 16px; color: #1976d2; font-weight: bold;">
//                     ${apartment.objectName || apartment.category || 'Апартаменты'}
//                   </h3>
//                   <div style="background: ${categoryColor}; color: white; padding: 4px 8px; border-radius: 12px; font-size: 12px; display: inline-block;">
//                     ${apartment.category || 'Жилье'}
//                   </div>
//                 </div>
//               </div>
              
//               <img src="${mainPhoto}" 
//                    alt="${apartment.objectName || 'Фото'}" 
//                    style="width: 100%; height: 150px; object-fit: cover; border-radius: 8px; margin-bottom: 12px;" />
              
//               <p style="margin: 0 0 8px 0; font-size: 14px; color: #333; display: flex; align-items: center;">
//                 <span style="color: #666; margin-right: 4px;">📍</span>
//                 ${address}
//               </p>
              
//               ${apartment.district ? `<p style="margin: 0 0 4px 0; font-size: 12px; color: #666;">Район: ${apartment.district}</p>` : ''}
//               ${apartment.metro ? `<p style="margin: 0 0 8px 0; font-size: 12px; color: #666;">Метро: ${apartment.metro}</p>` : ''}
              
//               <p style="margin: 0 0 12px 0; font-size: 18px; font-weight: bold; color: #2e7d32;">
//                 ${apartment.price ? apartment.price + ' грн/ночь' : 'Цена не указана'}
//               </p>
              
//               <button onclick="window.open('https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}', '_blank')"
//                       style="background: #1976d2; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; width: 100%; display: flex; align-items: center; justify-content: center;">
//                 <span style="margin-right: 8px;">🚗</span>
//                 Проложить маршрут
//               </button>
//             </div>
//           `
//         });

//         marker.addListener('click', () => {
//           markersRef.current.forEach(m => {
//             if (m.infoWindow) m.infoWindow.close();
//           });
          
//           infoWindow.open(map, marker);
//           marker.infoWindow = infoWindow;
          
//           if (onApartmentSelect) {
//             onApartmentSelect(apartment);
//           }
//         });

//         marker.infoWindow = infoWindow;
//         markersRef.current.push(marker);
//       }

//       // Подгоняем карту под маркеры
//       if (markersRef.current.length > 0 && !centerMode) {
//         const bounds = new window.google.maps.LatLngBounds();
//         markersRef.current.forEach(marker => {
//           bounds.extend(marker.getPosition());
//         });
        
//         map.fitBounds(bounds, { 
//           padding: { top: 50, right: 50, bottom: 50, left: 50 }
//         });

//         const zoom = map.getZoom();
//         if (zoom > 16) {
//           map.setZoom(16);
//         }
//       }

//       setMapLoading(false);
//     } catch (error) {
//       console.error('Map initialization error:', error);
//       setMapError(true);
//       setMapLoading(false);
//     }
//   };

//   useEffect(() => {
//     const initMap = async () => {
//       try {
//         setMapLoading(true);
//         setMapError(false);
        
//         await loadGoogleMaps();
        
//         if (window.google && window.google.maps) {
//           await initializeMap();
//         } else {
//           throw new Error('Google Maps API not loaded');
//         }
//       } catch (error) {
//         console.error('Map loading error:', error);
//         setMapError(true);
//         setMapLoading(false);
//       }
//     };

//     initMap();

//     return () => {
//       markersRef.current.forEach(marker => {
//         if (marker.infoWindow) {
//           marker.infoWindow.close();
//         }
//         marker.setMap(null);
//       });
//       markersRef.current = [];
//     };
//   }, [apartments, centerMode, userLocation]);

//   if (mapError) {
//     return (
//       <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
//         <Typography color="error" sx={{ mb: 2 }}>
//           Не удалось загрузить карту
//         </Typography>
//         <Button 
//           variant="contained" 
//           onClick={() => {
//             setMapError(false);
//             setMapLoading(true);
//             setTimeout(() => {
//               const initMap = async () => {
//                 try {
//                   await loadGoogleMaps();
//                   if (window.google && window.google.maps) {
//                     await initializeMap();
//                   }
//                 } catch (error) {
//                   setMapError(true);
//                   setMapLoading(false);
//                 }
//               };
//               initMap();
//             }, 100);
//           }}
//         >
//           Попробовать снова
//         </Button>
//       </Box>
//     );
//   }

//   return (
//     <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
//       {mapLoading && (
//         <Box sx={{ 
//           position: 'absolute', 
//           top: 0, 
//           left: 0, 
//           right: 0, 
//           bottom: 0, 
//           display: 'flex', 
//           alignItems: 'center', 
//           justifyContent: 'center',
//           backgroundColor: 'rgba(255,255,255,0.8)',
//           zIndex: 1000
//         }}>
//           <CircularProgress />
//           <Typography sx={{ ml: 2 }}>Загрузка карты...</Typography>
//         </Box>
//       )}
//       <div 
//         ref={mapRef} 
//         style={{ 
//           width: '100%', 
//           height: '100%',
//           borderRadius: '8px'
//         }} 
//       />
//     </Box>
//   );
// };

// export default MapComponent;



'use client';

import React, { useEffect, useRef, useState } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';

// Глобальная переменная для отслеживания загрузки API
let googleMapsLoading = false;
let googleMapsLoaded = false;
let googleMapsLoadCallbacks = [];

// Цвета для разных категорий (стандартные маркеры Google Maps)
const CATEGORY_COLORS = {
  'apart': '#EA4335', // красный для квартир
  'hostel': '#34A853', // зеленый для хостелов
  'glamping': '#FBBC05', // желтый для глемпинга
  'hotel': '#4285F4', // синий для отелей
  'pet-hotel': '#9C27B0', // фиолетовый для отелей для животных
  'house': '#795548', // коричневый для домов
  'sauna': '#F44336', // ярко-красный для саун
  'pansionat': '#607D8B', // серо-голубой для пансионатов
  'cottage': '#FF9800', // оранжевый для коттеджей
  'coworking': '#E91E63', // розовый для коворкингов
  'autocamping': '#4CAF50', // зеленый для автокемпингов
  'rest-base': '#00BCD4', // бирюзовый для баз отдыха
  'default': '#EA4335' // красный по умолчанию
};

const MapComponent = ({ apartments, onApartmentSelect, centerMode = false, userLocation = null }) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);

  // Функция для получения цвета маркера по категории
  const getCategoryColor = (category) => {
    if (!category) return CATEGORY_COLORS.default;
    
    const categoryLower = category.toLowerCase();
    
    if (categoryLower.includes('apart') || categoryLower.includes('квартир')) 
      return CATEGORY_COLORS.apart;
    if (categoryLower.includes('hostel') || categoryLower.includes('хостел')) 
      return CATEGORY_COLORS.hostel;
    if (categoryLower.includes('glamping') || categoryLower.includes('глемпінг') || categoryLower.includes('глэмпинг')) 
      return CATEGORY_COLORS.glamping;
    if (categoryLower.includes('hotel') || categoryLower.includes('готел') || categoryLower.includes('гостиниц')) 
      return CATEGORY_COLORS.hotel;
    if (categoryLower.includes('pet') || categoryLower.includes('тварин')) 
      return CATEGORY_COLORS['pet-hotel'];
    if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
      return CATEGORY_COLORS.house;
    if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
      return CATEGORY_COLORS.sauna;
    if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
      return CATEGORY_COLORS.pansionat;
    if (categoryLower.includes('cottage') || categoryLower.includes('котедж')) 
      return CATEGORY_COLORS.cottage;
    if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг')) 
      return CATEGORY_COLORS.coworking;
    if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг')) 
      return CATEGORY_COLORS.autocamping;
    if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха')) 
      return CATEGORY_COLORS['rest-base'];
    
    return CATEGORY_COLORS.default;
  };

  // Функция для получения URL иконки маркера
  const getMarkerIcon = (color) => {
    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="40" height="40" viewBox="0 0 40 40" xmlns="http://www.w3.org/2000/svg">
          <path fill="${color}" d="M20 0C12.3 0 6 6.3 6 14c0 10.5 14 26 14 26s14-15.5 14-26C34 6.3 27.7 0 20 0z"/>
          <circle fill="white" cx="20" cy="14" r="6"/>
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(40, 40),
      anchor: new window.google.maps.Point(20, 40),
    };
  };

  // Функция для загрузки Google Maps API
  const loadGoogleMaps = () => {
    return new Promise((resolve, reject) => {
      if (googleMapsLoaded) {
        resolve();
        return;
      }

      if (googleMapsLoading) {
        googleMapsLoadCallbacks.push(resolve);
        return;
      }

      googleMapsLoading = true;

      if (window.google && window.google.maps) {
        googleMapsLoaded = true;
        googleMapsLoading = false;
        resolve();
        return;
      }

      const existingScript = document.querySelector('script[src*="maps.googleapis.com"]');
      if (existingScript) {
        existingScript.onload = () => {
          googleMapsLoaded = true;
          googleMapsLoading = false;
          resolve();
          googleMapsLoadCallbacks.forEach(cb => cb());
          googleMapsLoadCallbacks = [];
        };
        return;
      }

      const script = document.createElement('script');
      script.src = `https://maps.googleapis.com/maps/api/js?key=${process.env.NEXT_PUBLIC_GOOGLE_MAPS_API_KEY}&libraries=places`;
      script.async = true;
      script.defer = true;
      
      script.onload = () => {
        googleMapsLoaded = true;
        googleMapsLoading = false;
        resolve();
        googleMapsLoadCallbacks.forEach(cb => cb());
        googleMapsLoadCallbacks = [];
      };

      script.onerror = () => {
        googleMapsLoading = false;
        setMapError(true);
        reject(new Error('Failed to load Google Maps'));
      };

      document.head.appendChild(script);
    });
  };

  // Функция для получения координат апартамента
  const getApartmentCoordinates = (apartment) => {
    // Используем реальные координаты из базы данных
    if (apartment.latitude && apartment.longitude) {
      const lat = parseFloat(apartment.latitude);
      const lng = parseFloat(apartment.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

    // Геокодирование по адресу
    if ((apartment.city || apartment.street) && window.google) {
      return new Promise((resolve) => {
        const address = `${apartment.street || ''} ${apartment.houseNumber || ''}, ${apartment.city || ''}`.trim();
        if (address.length > 3) {
          const geocoder = new window.google.maps.Geocoder();
          geocoder.geocode({ address: address + ', Украина' }, (results, status) => {
            if (status === 'OK' && results[0]) {
              const location = results[0].geometry.location;
              resolve({
                lat: location.lat(),
                lng: location.lng()
              });
            } else {
              resolve(getCityCoordinates(apartment.city));
            }
          });
        } else {
          resolve(getCityCoordinates(apartment.city));
        }
      });
    }

    return getCityCoordinates(apartment.city);
  };

  // Функция для получения координат города
  const getCityCoordinates = (city) => {
    const cityCoordinates = {
      'киев': { lat: 50.4501, lng: 30.5234 },
      'львов': { lat: 49.8397, lng: 24.0297 },
      'одесса': { lat: 46.4825, lng: 30.7233 },
      'харьков': { lat: 49.9935, lng: 36.2304 },
      'днепр': { lat: 48.4647, lng: 35.0462 },
      'запорожье': { lat: 47.8388, lng: 35.1396 },
      'ивано-франковск': { lat: 48.9226, lng: 24.7111 },
      'тернополь': { lat: 49.5535, lng: 25.5948 },
      'черновцы': { lat: 48.2917, lng: 25.9354 },
      'ужгород': { lat: 48.6208, lng: 22.2879 },
      'луцк': { lat: 50.7476, lng: 25.3252 },
      'ровно': { lat: 50.6199, lng: 26.2516 },
      'житомир': { lat: 50.2547, lng: 28.6587 },
      'черкассы': { lat: 49.4444, lng: 32.0598 },
      'кропивницкий': { lat: 48.5079, lng: 32.2623 },
      'николаев': { lat: 46.9750, lng: 31.9946 },
      'херсон': { lat: 46.6354, lng: 32.6169 },
      'полтава': { lat: 49.5883, lng: 34.5514 },
      'сумы': { lat: 50.9077, lng: 34.7981 },
      'чернигов': { lat: 51.4982, lng: 31.2893 }
    };

    if (!city) return { lat: 50.4501, lng: 30.5234 };
    
    const cityLower = city.toLowerCase().trim();
    return cityCoordinates[cityLower] || { lat: 50.4501, lng: 30.5234 };
  };

  // Функция для форматирования адреса
  const formatAddress = (apartment) => {
    const parts = [];
    if (apartment.city) parts.push(apartment.city);
    if (apartment.street && apartment.houseNumber) {
      parts.push(`${apartment.street} ${apartment.houseNumber}`);
    }
    return parts.join(', ');
  };

  const initializeMap = async () => {
    if (!mapRef.current || !window.google) return;

    try {
      const defaultCenter = { lat: 50.4501, lng: 30.5234 };
      let center = defaultCenter;
      const coordinates = [];

      // Получаем координаты для всех апартаментов
      for (const apartment of apartments) {
        const coords = await getApartmentCoordinates(apartment);
        coordinates.push(coords);
      }

      if (apartments.length > 0) {
        if (centerMode && apartments[0]) {
          center = coordinates[0] || defaultCenter;
        } else {
          const validCoords = coordinates.filter(coord => coord && !isNaN(coord.lat) && !isNaN(coord.lng));
          if (validCoords.length > 0) {
            const avgLat = validCoords.reduce((sum, coord) => sum + coord.lat, 0) / validCoords.length;
            const avgLng = validCoords.reduce((sum, coord) => sum + coord.lng, 0) / validCoords.length;
            center = { lat: avgLat, lng: avgLng };
          }
        }
      }

      const map = new window.google.maps.Map(mapRef.current, {
        center: center,
        zoom: apartments.length === 1 ? 14 : 6,
        mapTypeControl: true,
        streetViewControl: true,
        fullscreenControl: true,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      });

      googleMapRef.current = map;

      // Очищаем старые маркеры
      markersRef.current.forEach(marker => marker.setMap(null));
      markersRef.current = [];

      // Добавляем маркеры для каждого апартамента
      for (let i = 0; i < apartments.length; i++) {
        const apartment = apartments[i];
        const position = coordinates[i] || defaultCenter;

        if (!position || isNaN(position.lat) || isNaN(position.lng)) {
          continue;
        }

        const categoryColor = getCategoryColor(apartment.category);
        const markerIcon = getMarkerIcon(categoryColor);

        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          title: apartment.objectName || apartment.category || 'Апартаменты',
          icon: markerIcon,
          animation: window.google.maps.Animation.DROP
        });

        const address = formatAddress(apartment);
        const mainPhoto = apartment.photos && apartment.photos[0] 
          ? apartment.photos[0] 
          : '/placeholder-apartment.jpg';

        const infoWindow = new window.google.maps.InfoWindow({
          content: `
            <div style="padding: 0; max-width: 280px; font-family: Arial, sans-serif; cursor: pointer; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
              <!-- КАТЕГОРИЯ В ВЕРХУ БЕЗ ОТСТУПОВ -->
              <div style="background: ${categoryColor}; color: white; padding: 8px 12px; text-align: center; font-weight: bold; font-size: 14px;">
                ${apartment.category || 'Жилье'}
              </div>
              
              <!-- ФОТО -->
              <img src="${mainPhoto}" 
                   alt="${apartment.objectName || 'Фото'}" 
                   style="width: 100%; height: 160px; object-fit: cover; display: block;" />
              
              <!-- СОДЕРЖИМОЕ -->
              <div style="padding: 12px;">
                <!-- ЗАГОЛОВОК -->
                <h3 style="margin: 0 0 8px 0; font-size: 16px; color: #1976d2; font-weight: bold; line-height: 1.3;">
                  ${apartment.objectName || 'Апартаменты'}
                </h3>
                
                <!-- АДРЕС -->
                <p style="margin: 0 0 8px 0; font-size: 14px; color: #333; display: flex; align-items: flex-start; line-height: 1.4;">
                  <span style="color: #666; margin-right: 6px; flex-shrink: 0;">📍</span>
                  <span>${address}</span>
                </p>
                
                <!-- ДОПОЛНИТЕЛЬНАЯ ИНФОРМАЦИЯ -->
                ${apartment.district ? `<p style="margin: 0 0 4px 0; font-size: 13px; color: #666; line-height: 1.3;">Район: ${apartment.district}</p>` : ''}
                ${apartment.metro ? `<p style="margin: 0 0 8px 0; font-size: 13px; color: #666; line-height: 1.3;">Метро: ${apartment.metro}</p>` : ''}
                
                <!-- ЦЕНА -->
                <p style="margin: 0 0 12px 0; font-size: 18px; font-weight: bold; color: #2e7d32; line-height: 1.2;">
                  ${apartment.price ? apartment.price + ' грн/ночь' : 'Цена не указана'}
                </p>
                
                <!-- КНОПКА ПРОЛОЖИТЬ МАРШРУТ -->
                <button onclick="event.stopPropagation(); window.open('https://www.google.com/maps/dir/?api=1&destination=${position.lat},${position.lng}', '_blank')"
                        style="background: #1976d2; color: white; border: none; padding: 10px 16px; border-radius: 6px; cursor: pointer; font-size: 14px; width: 100%; display: flex; align-items: center; justify-content: center;">
                  <span style="margin-right: 8px;">🚗</span>
                  Проложить маршрут
                </button>
              </div>
            </div>
          `
        });

        // Обработчик клика на маркер
        marker.addListener('click', () => {
          // Закрываем все открытые infoWindow
          markersRef.current.forEach(m => {
            if (m.infoWindow) m.infoWindow.close();
          });
          
          infoWindow.open(map, marker);
          marker.infoWindow = infoWindow;
        });

        // Обработчик клика на информационное окно (переход к детальному описанию)
        const handleInfoWindowClick = () => {
          if (onApartmentSelect) {
            onApartmentSelect(apartment);
          }
        };

        // Добавляем обработчик после открытия infoWindow
        marker.addListener('click', () => {
          setTimeout(() => {
            const infoWindowElement = document.querySelector('.gm-style-iw');
            if (infoWindowElement) {
              infoWindowElement.addEventListener('click', handleInfoWindowClick);
            }
          }, 100);
        });

        marker.infoWindow = infoWindow;
        markersRef.current.push(marker);
      }

      // Подгоняем карту под маркеры
      if (markersRef.current.length > 0 && !centerMode) {
        const bounds = new window.google.maps.LatLngBounds();
        markersRef.current.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        
        map.fitBounds(bounds, { 
          padding: { top: 50, right: 50, bottom: 50, left: 50 }
        });

        const zoom = map.getZoom();
        if (zoom > 16) {
          map.setZoom(16);
        }
      }

      setMapLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(true);
      setMapLoading(false);
    }
  };

  useEffect(() => {
    const initMap = async () => {
      try {
        setMapLoading(true);
        setMapError(false);
        
        await loadGoogleMaps();
        
        if (window.google && window.google.maps) {
          await initializeMap();
        } else {
          throw new Error('Google Maps API not loaded');
        }
      } catch (error) {
        console.error('Map loading error:', error);
        setMapError(true);
        setMapLoading(false);
      }
    };

    initMap();

    return () => {
      markersRef.current.forEach(marker => {
        if (marker.infoWindow) {
          marker.infoWindow.close();
        }
        marker.setMap(null);
      });
      markersRef.current = [];
    };
  }, [apartments, centerMode, userLocation]);

  if (mapError) {
    return (
      <Box sx={{ width: '100%', height: '100%', display: 'flex', alignItems: 'center', justifyContent: 'center', flexDirection: 'column' }}>
        <Typography color="error" sx={{ mb: 2 }}>
          Не удалось загрузить карту
        </Typography>
        <Button 
          variant="contained" 
          onClick={() => {
            setMapError(false);
            setMapLoading(true);
            setTimeout(() => {
              const initMap = async () => {
                try {
                  await loadGoogleMaps();
                  if (window.google && window.google.maps) {
                    await initializeMap();
                  }
                } catch (error) {
                  setMapError(true);
                  setMapLoading(false);
                }
              };
              initMap();
            }, 100);
          }}
        >
          Попробовать снова
        </Button>
      </Box>
    );
  }

  return (
    <Box sx={{ width: '100%', height: '100%', position: 'relative' }}>
      {mapLoading && (
        <Box sx={{ 
          position: 'absolute', 
          top: 0, 
          left: 0, 
          right: 0, 
          bottom: 0, 
          display: 'flex', 
          alignItems: 'center', 
          justifyContent: 'center',
          backgroundColor: 'rgba(255,255,255,0.8)',
          zIndex: 1000
        }}>
          <CircularProgress />
          <Typography sx={{ ml: 2 }}>Загрузка карты...</Typography>
        </Box>
      )}
      <div 
        ref={mapRef} 
        style={{ 
          width: '100%', 
          height: '100%',
          borderRadius: '8px'
        }} 
      />
    </Box>
  );
};

export default MapComponent;