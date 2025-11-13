

'use client';

import React, { useEffect, useRef, useState, useCallback } from 'react';
import { Box, Typography, CircularProgress, Button } from '@mui/material';
import { useFavorites } from '@/app/hooks/FavoritesContext';
import { useGoogleMaps } from '../../GoogleMapsProvider';

// Цвета для разных категорий
const CATEGORY_COLORS = {
  'apart': '#e590ad',
  'hostel': '#34A853', 
  'glamping': '#FBBC05',
  'hotel': '#4285F4',
  'pet-hotel': '#9C27B0',
  'house': '#795548',
  'sauna': '#F44336',
  'pansionat': '#607D8B',
  'cottage': '#FF9800',
  'coworking': '#E91E63',
  'autocamping': '#4CAF50',
  'rest-base': '#00BCD4',
  'default': '#EA4335'
};

const MapComponent = ({ 
  apartments, 
  onApartmentSelect, 
  centerMode = false, 
  userLocation = null,
  compactMode = false,
  onShowAlert
}) => {
  const mapRef = useRef(null);
  const googleMapRef = useRef(null);
  const markersRef = useRef([]);
  const [mapLoading, setMapLoading] = useState(true);
  const [mapError, setMapError] = useState(false);
  
  const { isLoaded: isGoogleMapsLoaded, loadError: googleMapsError } = useGoogleMaps();

  // Используем контекст избранного
  const { isFavorite, toggleFavorite } = useFavorites();

  // Создаем рефы для актуальных данных
  const apartmentsRef = useRef(apartments);
  const onShowAlertRef = useRef(onShowAlert);

  // Обновляем рефы при изменении пропсов
  useEffect(() => {
    apartmentsRef.current = apartments;
    onShowAlertRef.current = onShowAlert;
  }, [apartments, onShowAlert]);

  // Функция для обработки добавления/удаления из избранного
  const handleToggleFavorite = async (apartmentId, currentFavoriteState) => {
    try {
      const userProfile = localStorage.getItem('user_profile');
      if (!userProfile) {
        if (onShowAlertRef.current) {
          onShowAlertRef.current('Увійдіть, щоб додати в обране', 'warning');
        }
        return;
      }

      // Оптимистичное обновление - сразу меняем состояние
      const newFavoriteState = !currentFavoriteState;
      
      // Показываем сообщение в зависимости от действия
      if (onShowAlertRef.current) {
        onShowAlertRef.current(newFavoriteState ? 'Додано в обране' : 'Видалено з обраного', 'success');
      }
      
      // Вызываем toggleFavorite и ждем завершения
      await toggleFavorite(apartmentId);
      
      // Обновляем маркеры после успешного изменения
      updateFavoriteMarkers();
      
    } catch (error) {
      console.error('Error toggling favorite:', error);
      let errorMessage = 'Помилка при оновленні обраного';
      if (error.message === 'USER_NOT_LOGGED_IN') {
        errorMessage = 'Увійдіть, щоб додати в обране';
      }
      
      if (onShowAlertRef.current) {
        onShowAlertRef.current(errorMessage, 'error');
      }
    }
  };

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
    if (categoryLower.includes('pet') || categoryLower.includes('тварин') || categoryLower.includes('animals')) 
      return CATEGORY_COLORS['pet-hotel'];
    if (categoryLower.includes('house') || categoryLower.includes('будинок') || categoryLower.includes('дом')) 
      return CATEGORY_COLORS.house;
    if (categoryLower.includes('sauna') || categoryLower.includes('саун') || categoryLower.includes('бан')) 
      return CATEGORY_COLORS.sauna;
    if (categoryLower.includes('pansionat') || categoryLower.includes('пансіонат') || categoryLower.includes('пансионат')) 
      return CATEGORY_COLORS.pansionat;
    if (categoryLower.includes('cottage') || categoryLower.includes('котедж') || categoryLower.includes('kotedzi')) 
      return CATEGORY_COLORS.cottage;
    if (categoryLower.includes('coworking') || categoryLower.includes('коворкінг') || categoryLower.includes('коворкинг') || categoryLower.includes('kavorking')) 
      return CATEGORY_COLORS.coworking;
    if (categoryLower.includes('autocamping') || categoryLower.includes('автокемпінг') || categoryLower.includes('автокемпинг') || categoryLower.includes('avtokemping')) 
      return CATEGORY_COLORS.autocamping;
    if (categoryLower.includes('rest-base') || categoryLower.includes('база відпочинку') || categoryLower.includes('база отдыха') || categoryLower.includes('recreationcenter')) 
      return CATEGORY_COLORS['rest-base'];
    
    return CATEGORY_COLORS.default;
  };

  // УЛУЧШЕННАЯ функция для получения URL иконки маркера с сердечком избранного
  const getMarkerIcon = (color, price, isFav) => {
    const markerWidth = 70;
    const markerHeight = 80;
    const priceRectWidth = 38;
    const priceRectHeight = 25;
    const priceFontSize = 14;
    const priceTextColor = '#D32F2F';
    const priceRectX = (markerWidth - priceRectWidth) / 2;
    const priceRectY = 12;
    const priceTextX = markerWidth / 2;
    const priceTextY = priceRectY + priceRectHeight / 2 + 5;
    
    // Форматируем цену для отображения
    const formatPrice = (price) => {
      if (!price) return '';
      if (typeof price === 'number') {
        return price.toString();
      }
      if (typeof price === 'string') {
        const numericPrice = price.replace(/[^\d]/g, '');
        if (numericPrice.length > 3) {
          return numericPrice.slice(0, -3) + 'K';
        }
        return numericPrice;
      }
      return '';
    };
    
    const formattedPrice = formatPrice(price);
    
    // SVG для сердечка избранного (пульсирующая анимация)
    const heartSvg = isFav ? `
      <g transform="translate(50, 8)">
        <path fill="#FF0000" d="M12,21.35L10.55,20.03C5.4,15.36 2,12.28 2,8.5C2,5.42 4.42,3 7.5,3C9.24,3 10.91,3.81 12,5.09C13.09,3.81 14.76,3 16.5,3C19.58,3 22,5.42 22,8.5C22,12.28 18.6,15.36 13.45,20.04L12,21.35Z"/>
        <animate attributeName="opacity" values="0.7;1;0.7" dur="1.5s" repeatCount="indefinite"/>
      </g>
    ` : '';

    return {
      url: `data:image/svg+xml;charset=UTF-8,${encodeURIComponent(`
        <svg width="${markerWidth}" height="${markerHeight}" viewBox="0 0 ${markerWidth} ${markerHeight}" xmlns="http://www.w3.org/2000/svg">
          <!-- Основной маркер -->
          <path fill="${color}" d="M${markerWidth/2} 0C${markerWidth/2 - 12.8} 0 10 11.2 10 ${markerHeight/3.2}c0 18 25 45 25 45s25-27 25-45C60 11.2 48.8 0 35 0z"/>
          
          <!-- Поле цены -->
          <rect x="${priceRectX}" y="${priceRectY}" width="${priceRectWidth}" 
          height="${priceRectHeight}" rx="4" fill="white" stroke="#ccc" stroke-width="1"/>
          <text x="${priceTextX}" y="${priceTextY}" text-anchor="middle" 
          fill="${priceTextColor}" font-size="${priceFontSize}"
           font-weight="bold" font-family="Arial, sans-serif">
            ${formattedPrice}
          </text>
          
          <!-- Сердечко избранного -->
          ${heartSvg}
        </svg>
      `)}`,
      scaledSize: new window.google.maps.Size(markerWidth, markerHeight),
      anchor: new window.google.maps.Point(markerWidth/2, markerHeight),
    };
  };

  // Функция для получения координат апартамента
  const getApartmentCoordinates = (apartment) => {
    if (apartment.latitude && apartment.longitude) {
      const lat = parseFloat(apartment.latitude);
      const lng = parseFloat(apartment.longitude);
      if (!isNaN(lat) && !isNaN(lng)) {
        return { lat, lng };
      }
    }

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

  // Функция для получения основного фото
  const getMainPhoto = (apartment) => {
    if (apartment.photos && apartment.photos.length > 0) {
      return apartment.photos[0];
    }
    return '/placeholder-apartment.jpg';
  };

  // Функция обновления маркеров при изменении избранного
  const updateFavoriteMarkers = useCallback(() => {
    if (!googleMapRef.current || !window.google) return;

    markersRef.current.forEach((marker) => {
      if (!marker.apartmentId) return;
      
      const apartment = apartmentsRef.current.find(apt => apt._id === marker.apartmentId);
      if (!apartment) return;

      const isApartmentFavorite = isFavorite(apartment._id);
      const categoryColor = getCategoryColor(apartment.category);
      
      // Обновляем иконку маркера с учетом статуса избранного
      const markerIcon = getMarkerIcon(
        categoryColor, 
        apartment.price, 
        isApartmentFavorite
      );

      if (marker && marker.setIcon) {
        marker.setIcon(markerIcon);
      }

      // ОБНОВЛЯЕМ ИНФОРМАЦИОННОЕ ОКНО, ЕСЛИ ОНО ОТКРЫТО
      if (marker.infoWindow) {
        const address = formatAddress(apartment);
        const mainPhoto = getMainPhoto(apartment);

        const photoHeight = compactMode ? '100px' : '140px';
        const windowWidth = compactMode ? '260px' : '300px';
        const fontSize = compactMode ? '12px' : '14px';

        const newContent = `
          <div style="padding: 0; max-width: ${windowWidth}; font-family: Arial, sans-serif; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="background: ${categoryColor}; color: white; padding: 6px 8px; text-align: center; font-weight: bold; font-size: ${fontSize}; margin: 0; display: flex; justify-content: space-between; align-items: center;">
              <span>${apartment.category || 'Жилье'}</span>
              <button id="favorite-btn-${apartment._id}" 
                      style="background: none; border: none; color: ${isApartmentFavorite ? '#FF0000' : 'white'}; font-size: 18px; cursor: pointer; padding: 0; margin: 0; transition: color 0.3s;"
                      onclick="window.handleMapFavoriteClick('${apartment._id}', ${isApartmentFavorite})">
                ${isApartmentFavorite ? '❤' : '🤍'}
              </button>
            </div>
            
            <img src="${mainPhoto}" 
                 alt="${apartment.objectName || 'Фото'}" 
                 style="width: 100%; height: ${photoHeight}; object-fit: cover; display: block; cursor: pointer;" 
                 onclick="window.handleMapApartmentSelect('${apartment._id}')" />
            
            <div style="padding: ${compactMode ? '8px' : '12px'};">
              <h3 style="margin: 0 0 6px 0; font-size: ${fontSize}; color: #1976d2; font-weight: bold; line-height: 1.3; cursor: pointer;" 
                  onclick="window.handleMapApartmentSelect('${apartment._id}')">
                ${apartment.objectName || 'Апартаменты'}
              </h3>
              
              <p style="margin: 0 0 6px 0; font-size: ${parseInt(fontSize) - 2}px; color: #333; display: flex; align-items: flex-start; line-height: 1.3;">
                <span style="color: #666; margin-right: 4px; flex-shrink: 0;">📍</span>
                <span>${address}</span>
              </p>
              
              ${apartment.district ? `<p style="margin: 0 0 3px 0; font-size: ${parseInt(fontSize) - 2}px; color: #666; line-height: 1.2;">Район: ${apartment.district}</p>` : ''}
              ${apartment.metro ? `<p style="margin: 0 0 6px 0; font-size: ${parseInt(fontSize) - 2}px; color: #666; line-height: 1.2;">Метро: ${apartment.metro}</p>` : ''}
              
              <p style="margin: 0 0 8px 0; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold; color: #2e7d32; line-height: 1.2;">
                ${apartment.price ? apartment.price + ' грн/ночь' : 'Цена не указана'}
              </p>
              
              <button onclick="window.handleMapRouteClick(${marker.getPosition().lat()}, ${marker.getPosition().lng()})"
                      style="background: #1976d2; color: white; border: none; padding: ${compactMode ? '6px 10px' : '8px 12px'}; border-radius: 4px; cursor: pointer; font-size: ${parseInt(fontSize) - 2}px; width: 100%; display: flex; align-items: center; justify-content: center; line-height: 1;">
                <span style="margin-right: 6px;">🚗</span>
                Проложить маршрут
              </button>
            </div>
          </div>
        `;

        marker.infoWindow.setContent(newContent);
      }
    });
  }, [isFavorite, compactMode]);

  const initializeMap = useCallback(async () => {
    if (!mapRef.current || !window.google || !isGoogleMapsLoaded) return;

    try {
      const defaultCenter = { lat: 50.4501, lng: 30.5234 };
      let center = defaultCenter;
      const coordinates = [];

      for (const apartment of apartmentsRef.current) {
        const coords = await getApartmentCoordinates(apartment);
        coordinates.push(coords);
      }

      if (apartmentsRef.current.length > 0) {
        if (centerMode && apartmentsRef.current[0]) {
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
        zoom: apartmentsRef.current.length === 1 ? 6 : (compactMode ? 8 : 4),
        mapTypeControl: !compactMode,
        streetViewControl: !compactMode,
        fullscreenControl: !compactMode,
        zoomControl: !compactMode,
        styles: [
          {
            featureType: "poi",
            elementType: "labels",
            stylers: [{ visibility: "on" }]
          }
        ]
      });

      googleMapRef.current = map;

      markersRef.current.forEach(marker => {
        if (marker && marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];

      // Глобальные функции для обработки кликов в информационном окне
      window.handleMapFavoriteClick = async (apartmentId, currentFavoriteState) => {
        await handleToggleFavorite(apartmentId, currentFavoriteState);
      };

      window.handleMapApartmentSelect = (apartmentId) => {
        const selectedApartment = apartmentsRef.current.find(apt => apt._id === apartmentId);
        if (selectedApartment && onApartmentSelect) {
          onApartmentSelect(selectedApartment);
        }
      };

      window.handleMapRouteClick = (lat, lng) => {
        window.open(`https://www.google.com/maps/dir/?api=1&destination=${lat},${lng}`, '_blank');
      };

      for (let i = 0; i < apartmentsRef.current.length; i++) {
        const apartment = apartmentsRef.current[i];
        const position = coordinates[i] || defaultCenter;

        if (!position || isNaN(position.lat) || isNaN(position.lng)) {
          continue;
        }

        // Проверяем статус избранного через контекст
        const isApartmentFavorite = isFavorite(apartment._id);
        const categoryColor = getCategoryColor(apartment.category);
        
        const markerIcon = getMarkerIcon(
          categoryColor, 
          apartment.price, 
          isApartmentFavorite
        );

        const marker = new window.google.maps.Marker({
          position: position,
          map: map,
          title: apartment.objectName || apartment.category || 'Апартаменты',
          icon: markerIcon,
          animation: window.google.maps.Animation.DROP
        });

        const address = formatAddress(apartment);
        const mainPhoto = getMainPhoto(apartment);

        const photoHeight = compactMode ? '100px' : '140px';
        const windowWidth = compactMode ? '260px' : '300px';
        const fontSize = compactMode ? '12px' : '14px';

        // Создаем HTML для информационного окна с кнопкой избранного
        const infoWindowContent = `
          <div style="padding: 0; max-width: ${windowWidth}; font-family: Arial, sans-serif; border-radius: 8px; overflow: hidden; box-shadow: 0 4px 12px rgba(0,0,0,0.15);">
            <div style="background: ${categoryColor}; color: white; padding: 6px 8px; text-align: center; font-weight: bold; font-size: ${fontSize}; margin: 0; display: flex; justify-content: space-between; align-items: center;">
              <span>${apartment.category || 'Жилье'}</span>
              <button id="favorite-btn-${apartment._id}" 
                      style="background: none; border: none; color: ${isApartmentFavorite ? '#FF0000' : 'white'}; font-size: 18px; cursor: pointer; padding: 0; margin: 0; transition: color 0.3s;"
                      onclick="window.handleMapFavoriteClick('${apartment._id}', ${isApartmentFavorite})">
                ${isApartmentFavorite ? '❤' : '🤍'}
              </button>
            </div>
            
            <img src="${mainPhoto}" 
                 alt="${apartment.objectName || 'Фото'}" 
                 style="width: 100%; height: ${photoHeight}; object-fit: cover; display: block; cursor: pointer;" 
                 onclick="window.handleMapApartmentSelect('${apartment._id}')" />
            
            <div style="padding: ${compactMode ? '8px' : '12px'};">
              <h3 style="margin: 0 0 6px 0; font-size: ${fontSize}; color: #1976d2; font-weight: bold; line-height: 1.3; cursor: pointer;" 
                  onclick="window.handleMapApartmentSelect('${apartment._id}')">
                ${apartment.objectName || 'Апартаменты'}
              </h3>
              
              <p style="margin: 0 0 6px 0; font-size: ${parseInt(fontSize) - 2}px; color: #333; display: flex; align-items: flex-start; line-height: 1.3;">
                <span style="color: #666; margin-right: 4px; flex-shrink: 0;">📍</span>
                <span>${address}</span>
              </p>
              
              ${apartment.district ? `<p style="margin: 0 0 3px 0; font-size: ${parseInt(fontSize) - 2}px; color: #666; line-height: 1.2;">Район: ${apartment.district}</p>` : ''}
              ${apartment.metro ? `<p style="margin: 0 0 6px 0; font-size: ${parseInt(fontSize) - 2}px; color: #666; line-height: 1.2;">Метро: ${apartment.metro}</p>` : ''}
              
              <p style="margin: 0 0 8px 0; font-size: ${parseInt(fontSize) + 2}px; font-weight: bold; color: #2e7d32; line-height: 1.2;">
                ${apartment.price ? apartment.price + ' грн/ночь' : 'Цена не указана'}
              </p>
              
              <button onclick="window.handleMapRouteClick(${position.lat}, ${position.lng})"
                      style="background: #1976d2; color: white; border: none; padding: ${compactMode ? '6px 10px' : '8px 12px'}; border-radius: 4px; cursor: pointer; font-size: ${parseInt(fontSize) - 2}px; width: 100%; display: flex; align-items: center; justify-content: center; line-height: 1;">
                <span style="margin-right: 6px;">🚗</span>
                Проложить маршрут
              </button>
            </div>
          </div>
        `;

        const infoWindow = new window.google.maps.InfoWindow({
          content: infoWindowContent
        });

        marker.addListener('click', () => {
          markersRef.current.forEach(m => {
            if (m.infoWindow) {
              m.infoWindow.close();
            }
          });
          
          infoWindow.open(map, marker);
          marker.infoWindow = infoWindow;
        });

        // Сохраняем ссылку на апартамент для обновления
        marker.apartmentId = apartment._id;
        marker.infoWindow = infoWindow;
        markersRef.current.push(marker);
      }

      if (markersRef.current.length > 0 && !centerMode) {
        const bounds = new window.google.maps.LatLngBounds();
        markersRef.current.forEach(marker => {
          bounds.extend(marker.getPosition());
        });
        
        map.fitBounds(bounds, { 
          padding: { top: 50, right: 50, bottom: 50, left: 50 }
        });
      }

      setMapLoading(false);
    } catch (error) {
      console.error('Map initialization error:', error);
      setMapError(true);
      setMapLoading(false);
    }
  }, [isGoogleMapsLoaded, apartments, centerMode, compactMode, isFavorite, onApartmentSelect]);

  // Обновляем маркеры при изменении избранного
  useEffect(() => {
    if (markersRef.current.length > 0 && isGoogleMapsLoaded) {
      updateFavoriteMarkers();
    }
  }, [updateFavoriteMarkers, isGoogleMapsLoaded]);

  // Инициализация карты когда Google Maps загружен
  useEffect(() => {
    if (isGoogleMapsLoaded && window.google) {
      initializeMap();
    }
  }, [isGoogleMapsLoaded, initializeMap]);

  // Очистка при размонтировании
  useEffect(() => {
    return () => {
      markersRef.current.forEach(marker => {
        if (marker.infoWindow) {
          marker.infoWindow.close();
        }
        if (marker.setMap) {
          marker.setMap(null);
        }
      });
      markersRef.current = [];
    };
  }, []);

  if (mapError || googleMapsError) {
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

