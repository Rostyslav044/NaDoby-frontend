// // Этот компонент (ApartmentDetailPage) 
// // отображает детальную 1 страницу объявления об аренде



'use client';

import { useParams } from "next/navigation";
import { useEffect, useState, useRef, useCallback } from "react";
import dynamic from 'next/dynamic';
import Head from 'next/head';
import CelebrationIcon from "@mui/icons-material/Celebration";
import {
  Box,
  Typography,
  IconButton,
  Button,
  CircularProgress,
  Grid,
  Paper,
  Chip,
  Divider,
  Avatar,
  List,
  ListItem,
  ListItemAvatar,
  useMediaQuery,
  Snackbar,
  Alert,
  Dialog,
  DialogContent,
  Menu,
  MenuItem,
  ListItemIcon,
  ListItemText,
} from "@mui/material";
import Tooltip from "@mui/material/Tooltip";
import FavoriteBorderIcon from "@mui/icons-material/FavoriteBorder";
import FavoriteIcon from "@mui/icons-material/Favorite";
import ShareIcon from "@mui/icons-material/Share";
import {
  Home as HomeIcon,
  Hotel as HotelIcon,
  Bathtub as BathtubIcon,
  KingBed as KingBedIcon,
  Apartment as ApartmentIcon,
  DirectionsCar as DirectionsCarIcon,
  Wifi as WifiIcon,
  Tv as TvIcon,
  AcUnit as AcUnitIcon,
  LocalLaundryService as LaundryIcon,
  Person as PersonIcon,
  ChildCare as ChildCareIcon,
  SmokingRooms as SmokingIcon,
  Pets as PetsIcon,
  Description as DocsIcon,
  AccessTime as TimeIcon,
  Directions as DirectionsIcon,
  LocationOn as LocationIcon,
  ReportProblem as ReportIcon,
  Feedback as FeedbackIcon,
  Warning as WarningIcon,
  WhatsApp,
  Telegram,
  Email,
  ContentCopy,
} from "@mui/icons-material";

// Динамические импорты для тяжелых компонентов
const Header = dynamic(() => import("@/app/components/Header"), {
  loading: () => <div>Загрузка шапки...</div>
});

const Footer = dynamic(() => import("@/app/components/Footer"), {
  loading: () => <div>Загрузка футера...</div>
});

const FileUploadSlider = dynamic(() => import("@/app/components/FileUploadSlider"), {
  loading: () => <div>Загрузка фотографий...</div>
});

const ApartmentDetailMap = dynamic(() => import("@/app/components/apartment/ApartmentDetailMap"), {
  loading: () => <div>Загрузка карты...</div>,
  ssr: false
});

const CreateUser = dynamic(() => import("@/app/components/CreateUser"), {
  loading: () => <div>Загрузка формы...</div>
});

const AuthLogic = dynamic(() => import("@/app/components/AuthLogic"), {
  loading: () => <div>Загрузка...</div>
});

import { LanguageProvider, useLanguage } from "@/app/LanguageContext";
import { Provider } from "react-redux";
import { store } from "@/app/store";
import Link from "next/link";
import { useFavorites } from "@/app/hooks/useFavorites";
import { SessionProvider } from "next-auth/react";

const translations = {
  ua: {
    otherListings: " Об'єкти користувача",
    district: "район",
    metro: "метро",
    backButton: "Назад",
    description: "Опис",
    characteristics: "Основні характеристики",
    rentalConditions: "Умови оренди",
    amenities: "Зручності",
    location: "Розташування",
    buildRoute: "Побудувати маршрут",
    rooms: "Кімнат",
    guests: "Кількість гостей",
    area: "Площа",
    floor: "Поверх",
    kidsAge: "Вік дітей від",
    ageLimit: "Вікове обмеження",
    parties: "Святкування",
    checkInOut: "Час заїзду/виїзду",
    fullDayCheckIn: "Цілодобове заселення",
    smoking: "Куріння",
    pets: "Тварини",
    reportDocs: "Звітні документи",
    minRent: "Мінімальний термін оренди",
    deposit: "Залог",
    notSpecified: "Не вказано",
    noDescription: "Опис відсутній",
    noAmenities: "Зручності не вказані",
    required: "Потрібно",
    notRequired: "Не потрібно",
    yes: "Так",
    no: "Ні",
    hour: "година",
    day: "доба",
    days: "днів",
    m2: "м²",
    fromAge: "від",
    years: "років",
    noRestrictions: "Не обмежено",
    copyLink: "Посилання скопійовано",
    shareTitle: "Оренда квартиры",
    shareText: "Подивіться це оголошення:",
    call: "Зателефонувати",
    addToFavorites: "Додати в обране",
    removeFromFavorites: "Видалити з обраного",
    loginRequired: "Будь ласка, увійдіть щоб виконати цю дію",
    favoriteAdded: "Додано в обране",
    favoriteRemoved: "Видалено з обраного",
    reportOutdated: "Повідомити про неактуальну інформацію",
    leaveFeedback: "Залишити відгук про житло",
    reportProblem: "У мене виникли складнощі при проживанні",
    actionSuccess: "Дякуємо за ваше повідомлення!",
    shareButton: "Поділитися",
    shareViber: "Viber",
    shareTelegram: "Telegram", 
    shareWhatsApp: "WhatsApp",
    shareEmail: "Email",
    copyLink: "Копіювати посилання",
    linkCopied: "Посилання скопійовано!",
    categories: {
      Квартира: "Квартира",
      Гостиница: "Готель",
      Хостел: "Хостел",
      Дом: "Будинок",
      "База отдыха": "База відпочинку",
      "Сауна/Баня": "Сауна/Лазня",
      "Готель для тварин": "Готель для тварин",
      Глемпінг: "Глемпінг",
      Пансіонат: "Пансіонат",
      "Котедж для компній": "Котедж для компаній",
      Коворкінг: "Коворкінг",
      Автокемпінг: "Автокемпінг",
    },
    conveniences: {
      WiFi: "Wi-Fi",
      Парковка: "Парковка",
      Кондиционер: "Кондиціонер",
      Телевизор: "Телевізор",
      Прачечная: "Пральна машина",
      Кухня: "Кухня",
      Балкон: "Балкон",
      Лифт: "Ліфт",
      "Барбекю-зона": "Барбекю-зона",
      Басейн: "Басейн",
      "Ігрова кімната": "Ігрова кімната",
      Блендер: "Блендер",
      Бойлер: "Бойлер",
      Ванна: "Ванна",
      Вентилятор: "Вентилятор",
      Генератор: "Генератор",
      "Громадська кухня": "Громадська кухня",
      Джакузі: "Джакузі",
      "Дитяче ліжечко": "Дитяче ліжечко",
      "Дитячий стілець для годування": "Дитячий стілець для годування",
      "Домашній кінотеатр": "Домашній кінотеатр",
      "Духова піч": "Духова піч",
      "Душова кабіна": "Душова кабіна",
      Електрочайник: "Електрочайник",
      Електроплита: "Електроплита",
      "Зарядка для електромобілів": "Зарядка для електромобілів",
      "Змінна постільна білизна": "Змінна постільна білизна",
      Інтернет: "Інтернет",
      Кавоварка: "Кавоварка",
      Камін: "Камін",
      "Кабельне телебачення": "Кабельне телебачення",
      Ліжко: "Ліжко",
      Лазня: "Лазня",
      Мангал: "Мангал",
      "Мікрохвильова піч": "Мікрохвильова піч",
      Охорона: "Охорона",
      "Персональний комп'ютер": "Персональний комп'ютер",
      "Пляжне обладнання": "Пляжне обладнання",
      "Посуд та приладдя": "Посуд та приладдя",
      "Посудомийна машина": "Посудомийна машина",
      "Пральний порошок": "Пральний порошок",
      Праска: "Праска",
      Рушники: "Рушники",
      Сейф: "Сейф",
      "Спортзал / Фітнес-кімната": "Спортзал / Фітнес-кімната",
      "Спортивний інвентар": "Спортивний інвентар",
      "Столові прибори": "Столові прибори",
      "Сушилка для білизни": "Сушилка для білизни",
      "Супутникове ТБ": "Супутникове ТБ",
      Тапочки: "Тапочки",
      Тераса: "Тераса",
      Тостер: "Тостер",
      "Туалетне приладдя (шампуні, мило)": "Туалетне приладдя (шампуні, мило)",
      Фен: "Фен",
      Холодильник: "Холодильник",
      "Догляд за тваринами": "Догляд за тваринами",
      Кафе: "Кафе",
      "Конференц-зал": "Конференц-зал",
      "Кімната для переговорів": "Кімната для переговорів",
      "Лікувальні процедури": "Лікувальні процедури",
      "Організація подій": "Організація подій",
      Трансфер: "Трансфер",
      Харчування: "Харчування",
      "Прокат обладнання (велосипедів, човнів, інше)":
        "Прокат обладнання (велосипедів, човнів, інше)",
    },
  },
  ru: {
    otherListings: " Объекты пользователя",
    district: "район",
    metro: "метро",
    backButton: "Назад",
    description: "Описание",
    characteristics: "Основные характеристики",
    rentalConditions: "Условия аренды",
    amenities: "Удобства",
    location: "Расположение",
    buildRoute: "Проложить маршрут",
    rooms: "Комнат",
    guests: "Количество гостей",
    area: "Площадь",
    floor: "Этаж",
    kidsAge: "Возраст детей от",
    ageLimit: "Возрастное ограничение",
    parties: "Празднование",
    checkInOut: "Время заезда/выезда",
    fullDayCheckIn: "Круглосуточное заселение",
    smoking: "Курение",
    pets: "Животные",
    reportDocs: "Отчетные документы",
    minRent: "Минимальный срок аренды",
    deposit: "Залог",
    notSpecified: "Не указано",
    noDescription: "Описание отсутствует",
    noAmenities: "Удобства не указаны",
    required: "Требуется",
    notRequired: "Не требуется",
    yes: "Да",
    no: "Нет",
    hour: "час",
    day: "сутки",
    days: "дней",
    m2: "м²",
    fromAge: "от",
    years: " лет",
    noRestrictions: "Не ограничено",
    copyLink: "Ссылка скопирована",
    shareTitle: "Аренда квартиры",
    shareText: "Посмотрите это объявление:",
    call: "Позвонить",
    addToFavorites: "Добавить в избранное",
    removeFromFavorites: "Удалить из избранное",
    loginRequired: "Пожалуйста, войдите чтобы выполнить это действие",
    favoriteAdded: "Добавлено в избранное",
    favoriteRemoved: "Удалено из избранного",
    reportOutdated: "Сообщить о неактуальной информации",
    leaveFeedback: "Оставить отзыв о жилье",
    reportProblem: "У меня возникли сложности при проживании",
    actionSuccess: "Спасибо за ваше сообщение!",
    shareButton: "Поделиться",
    shareViber: "Viber",
    shareTelegram: "Telegram",
    shareWhatsApp: "WhatsApp", 
    shareEmail: "Email",
    copyLink: "Копировать ссылку",
    linkCopied: "Ссылка скопирована!",
    categories: {
      Квартира: "Квартира",
      Гостиница: "Гостиница",
      Хостел: "Хостел",
      Дом: "Дом",
      "База отдыха": "База отдыха",
      "Сауна/Баня": "Сауна/Баня",
      "Готель для тварин": "Отель для животных",
      Глемпінг: "Глэмпинг",
      Пансіонат: "Пансионат",
      "Котедж для компній": "Коттедж для компаний",
      Коворкінг: "Коворкинг",
      Автокемпінг: "Автокемпинг",
    },
    conveniences: {
      WiFi: "Wi-Fi",
      Парковка: "Парковка",
      Кондиционер: "Кондиционер",
      Телевизор: "Телевизор",
      Прачечная: "Стиральная машина",
      Кухня: "Кухня",
      Балкон: "Балкон",
      Лифт: "Лифт",
      "Барбекю-зона": "Зона барбекю",
      Басейн: "Бассейн",
      "Ігрова кімната": "Игровая комната",
      Блендер: "Блендер",
      Бойлер: "Бойлер",
      Ванна: "Ванна",
      Вентилятор: "Вентилятор",
      Генератор: "Генератор",
      "Громадська кухня": "Общая кухня",
      Джакузі: "Джакузи",
      "Дитяче ліжечко": "Детская кроватка",
      "Дитячий стілець для годування": "Детский стульчик для кормления",
      "Домашній кінотеатр": "Домашний кинотеатр",
      "Духова піч": "Духовка",
      "Душова кабіна": "Душевая кабина",
      Електрочайник: "Электрочайник",
      Електроплита: "Электроплита",
      "Зарядка для електромобілів": "Зарядка для электромобилей",
      "Змінна постільна білизна": "Смена постельного белья",
      Інтернет: "Интернет",
      Кавоварка: "Кофеварка",
      Камін: "Камин",
      "Кабельне телебачення": "Кабельное телевидение",
      Ліжко: "Кровать",
      Лазня: "Баня",
      Мангал: "Мангал",
      "Мікрохвильова піч": "Микроволновая печь",
      Охорона: "Охрана",
      "Персональний комп'ютер": "Персональный компьютер",
      "Пляжне обладнання": "Пляжное оборудование",
      "Посуд та приладдя": "Посуда и приборы",
      "Посудомийна машина": "Посудомоечная машина",
      "Пральний порошок": "Стиральный порошок",
      Праска: "Утюг",
      Рушники: "Полотенца",
      Сейф: "Сейф",
      "Спортзал / Фітнес-кімната": "Спортзал / Фитнес-комната",
      "Спортивний інвентар": "Спортивный инвентарь",
      "Столові прибои": "Столовые приборы",
      "Сушилка для білизни": "Сушилка для белья",
      "Супутникове ТБ": "Спутниковое ТВ",
      Тапочки: "Тапочки",
      Тераса: "Терасса",
      Тостер: "Тостер",
      "Туалетне приладдя (шампуні, мило)":
        "Туалетные принадлежности (шампунь, мыло)",
      Фен: "Фен",
      Холодильник: "Холодильник",
      "Догляд за тваринами": "Уход за животными",
      Кафе: "Кафе",
      "Конференц-зал": "Конференц-зал",
      "Кімната для переговорів": "Комната для переговоров",
      "Лікувальні процедури": "Лечебные процедуры",
      "Організація подій": "Организация мероприятий",
      Трансфер: "Трансфер",
      Харчування: "Питание",
      "Прокат обладнання (велосипедів, човнів, інше)":
        "Прокат оборудования (велосипедов, лодок и др.)",
    },
  },
};

const ViberIcon = () => (
  <img 
    src="/viber.png" 
    alt="Viber" 
    style={{ 
      width: 20, 
      height: 20,
      objectFit: "contain",
      display: "block",
      filter: "grayscale(100%)"
    }} 
  />
);

const ApartmentDetailContent = ({ apartmentData, userApartmentsCount }) => {
  const params = useParams();
  const id = params?.id;
  const [apartment, setApartment] = useState(apartmentData);
  const [userLocation, setUserLocation] = useState(null);
  const [myListingsCount, setMyListingsCount] = useState(userApartmentsCount);
  const [snackbar, setSnackbar] = useState({
    open: false,
    message: "",
    severity: "info",
  });
  const [loginModalOpen, setLoginModalOpen] = useState(false);
  const autoCloseTimer = useRef(null);
  const [shareAnchorEl, setShareAnchorEl] = useState(null);

  const { currentLanguage } = useLanguage();
  const t = translations[currentLanguage];

  // Используем хук избранного
  const {
    isFavorite,
    toggleFavorite,
    loading: favoriteLoading,
  } = useFavorites();

  // Очищаем таймер при размонтировании компонента
  useEffect(() => {
    return () => {
      if (autoCloseTimer.current) {
        clearTimeout(autoCloseTimer.current);
      }
    };
  }, []);

  const startAutoCloseTimer = useCallback(() => {
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }

    autoCloseTimer.current = setTimeout(() => {
      setLoginModalOpen(false);
      setSnackbar((prev) => ({ ...prev, open: false }));
    }, 5000);
  }, []);

  const showSnackbar = useCallback((message, severity = "info") => {
    setSnackbar({ open: true, message, severity });
  }, []);

  const handleCloseSnackbar = useCallback(() => {
    setSnackbar({ ...snackbar, open: false });
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  }, [snackbar]);

  const handleCloseModal = useCallback(() => {
    setLoginModalOpen(false);
    if (autoCloseTimer.current) {
      clearTimeout(autoCloseTimer.current);
    }
  }, []);

  const translateCategory = useCallback((category) => {
    if (!category) return "";

    if (t.categories && t.categories[category]) {
      return t.categories[category];
    }

    if (currentLanguage === "ru") {
      for (const [uaKey, ruValue] of Object.entries(
        translations.ru.categories
      )) {
        if (uaKey === category) {
          return ruValue;
        }
      }
    }

    return category;
  }, [t, currentLanguage]);

  const translateConvenience = useCallback((convenience) => {
    if (!convenience) return "";

    if (t.conveniences && t.conveniences[convenience]) {
      return t.conveniences[convenience];
    }

    if (currentLanguage === "ru") {
      for (const [uaKey, ruValue] of Object.entries(
        translations.ru.conveniences
      )) {
        if (uaKey === convenience) {
          return ruValue;
        }
      }
    }

    return convenience;
  }, [t, currentLanguage]);

  useEffect(() => {
    if (navigator.geolocation && apartment?.latitude) {
      navigator.geolocation.getCurrentPosition(
        (position) => {
          setUserLocation({
            lat: position.coords.latitude,
            lng: position.coords.longitude,
          });
        },
        (error) => {
          console.error("Geolocation error:", error);
        }
      );
    }
  }, [apartment]);

  const handleToggleFavorite = useCallback(async () => {
    const userProfile = localStorage.getItem("user_profile");
    if (!userProfile) {
      setLoginModalOpen(true);
      setSnackbar({
        open: true,
        message: t.loginRequired,
        severity: "info",
      });

      startAutoCloseTimer();
      return;
    }

    try {
      const newStatus = await toggleFavorite(id);
      showSnackbar(newStatus ? t.favoriteAdded : t.favoriteRemoved, "success");
    } catch (error) {
      if (error.message === "USER_NOT_LOGGED_IN") {
        setLoginModalOpen(true);
        setSnackbar({
          open: true,
          message: t.loginRequired,
          severity: "info",
        });
        startAutoCloseTimer();
      } else {
        showSnackbar("Ошибка при обновлении избранного", "error");
      }
    }
  }, [id, t, toggleFavorite, showSnackbar, startAutoCloseTimer]);

  const handleOpenRoute = useCallback(() => {
    if (apartment?.latitude && apartment?.longitude) {
      if (userLocation) {
        window.open(
          `https://www.google.com/maps/dir/?api=1&origin=${userLocation.lat},${userLocation.lng}&destination=${apartment.latitude},${apartment.longitude}`
        );
      } else {
        window.open(
          `https://www.google.com/maps?q=${apartment.latitude},${apartment.longitude}`  
        );
      }
    }
  }, [apartment, userLocation]);

  const getCategoryIcon = useCallback(() => {
    if (!apartment?.category) return <ApartmentIcon />;

    const category = apartment.category.toLowerCase();
    if (category.includes("квартира")) return <HomeIcon />;
    if (category.includes("гостиница") || category.includes("отель"))
      return <HotelIcon />;
    if (category.includes("хостел")) return <KingBedIcon />;
    if (category.includes("дом")) return <HomeIcon />;
    if (category.includes("база отдыха")) return <HomeIcon />;
    if (category.includes("сауна") || category.includes("баня"))
      return <BathtubIcon />;
    return <ApartmentIcon />;
  }, [apartment]);

  const getFacilityIcon = useCallback((facility) => {
    if (!facility) return <HomeIcon />;

    const lowerFacility = facility.toLowerCase();
    if (lowerFacility.includes("wifi")) return <WifiIcon />;
    if (lowerFacility.includes("парковк")) return <DirectionsCarIcon />;
    if (lowerFacility.includes("кондиционер")) return <AcUnitIcon />;
    if (lowerFacility.includes("телевизор")) return <TvIcon />;
    if (lowerFacility.includes("прач") || lowerFacility.includes("стиральн"))
      return <LaundryIcon />;
    return <HomeIcon />;
  }, []);

  const getBooleanValue = useCallback((value) => {
    return value === "yes" ? t.yes : value === "no" ? t.no : t.notSpecified;
  }, [t]);

  const formatTime = useCallback((time) => {
    if (!time) return "";
    const [hours, minutes] = time.split(":");
    return `${hours}:${minutes}`;
  }, []);

  const formatAddress = useCallback(() => {
    if (!apartment) return "";

    const parts = [];
    if (apartment.city) parts.push(apartment.city);
    if (apartment.street && apartment.houseNumber) {
      parts.push(`${apartment.street} ${apartment.houseNumber}`);
    }
    if (apartment.district) parts.push(`район ${apartment.district}`);
    if (apartment.metro) parts.push(`метро ${apartment.metro}`);
    return parts.join(", ");
  }, [apartment]);

  // Структурированные данные для SEO
  const structuredData = {
    '@context': 'https://schema.org',
    '@type': 'RentalProperty',
    name: apartment?.objectName || apartment?.name,
    description: apartment?.description,
    address: {
      '@type': 'PostalAddress',
      addressLocality: apartment?.city,
      streetAddress: `${apartment?.street} ${apartment?.houseNumber}`,
    },
    ...(apartment?.price && {
      offers: {
        '@type': 'Offer',
        price: apartment.price,
        priceCurrency: 'UAH',
      }
    })
  };

  if (!apartment) {
    return (
      <Box
        display="flex"
        justifyContent="center"
        alignItems="center"
        height="80vh"
      >
        <CircularProgress />
      </Box>
    );
  }

  return (
    <>
      <Head>
        <title>{apartment.objectName || apartment.name} | NaDoby</title>
        <meta name="description" content={apartment.description?.substring(0, 160) || "Аренда жилья"} />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(structuredData) }}
        />
      </Head>

      <Box maxWidth="1200px" mx="auto" marginTop={5}>
        <Box
          display="flex"
          justifyContent="space-between"
          alignItems="center"
          mb={3}
        >
          <Button variant="outlined" onClick={() => window.history.back()} size="small">
            {t.backButton}
          </Button>

          <Chip
            label={translateCategory(apartment.category)}
            color="primary"
            icon={getCategoryIcon()}
            sx={{ fontSize: "15px", height: "30px", padding: "8px" }}
          />

          <Box>
            <Tooltip
              title={isFavorite(id) ? t.removeFromFavorites : t.addToFavorites}
              arrow
            >
              <IconButton
                onClick={handleToggleFavorite}
                disabled={favoriteLoading}
                sx={{
                  color: isFavorite(id) ? "error.main" : "default",
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                  mr: 1,
                }}
              >
                {favoriteLoading ? (
                  <CircularProgress size={24} />
                ) : isFavorite(id) ? (
                  <FavoriteIcon color="error" />
                ) : (
                  <FavoriteBorderIcon />
                )}
              </IconButton>
            </Tooltip>

            <Tooltip title={t.shareButton} arrow>
              <IconButton
                onClick={(e) => setShareAnchorEl(e.currentTarget)}
                sx={{
                  bgcolor: "rgba(255,255,255,0.9)",
                  "&:hover": { bgcolor: "rgba(255,255,255,1)" },
                }}
              >
                <ShareIcon />
              </IconButton>
            </Tooltip>

            <Menu
              anchorEl={shareAnchorEl}
              open={Boolean(shareAnchorEl)}
              onClose={() => setShareAnchorEl(null)}
            >
              <MenuItem
                onClick={() => {
                  window.open(`viber://forward?text=${encodeURIComponent(t.shareText + ' ' + window.location.href)}`, '_blank');
                  setShareAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <ViberIcon />
                </ListItemIcon>
                <ListItemText>{t.shareViber}</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  window.open(`https://t.me/share/url?url=${encodeURIComponent(window.location.href)}&text=${encodeURIComponent(t.shareText)}`, '_blank');
                  setShareAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <Telegram />
                </ListItemIcon>
                <ListItemText>{t.shareTelegram}</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  window.open(`https://wa.me/?text=${encodeURIComponent(t.shareText + ' ' + window.location.href)}`, '_blank');
                  setShareAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <WhatsApp />
                </ListItemIcon>
                <ListItemText>{t.shareWhatsApp}</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  window.open(`mailto:?subject=${encodeURIComponent(t.shareTitle)}&body=${encodeURIComponent(t.shareText + ' ' + window.location.href)}`, '_blank');
                  setShareAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <Email />
                </ListItemIcon>
                <ListItemText>{t.shareEmail}</ListItemText>
              </MenuItem>

              <MenuItem
                onClick={() => {
                  navigator.clipboard.writeText(window.location.href);
                  showSnackbar(t.linkCopied, "success");
                  setShareAnchorEl(null);
                }}
              >
                <ListItemIcon>
                  <ContentCopy />
                </ListItemIcon>
                <ListItemText>{t.copyLink}</ListItemText>
              </MenuItem>
            </Menu>
          </Box>
        </Box>

        <Box mb={2}>
          <Typography variant="h4" sx={{ fontWeight: "bold" }}>
            {apartment.objectName || apartment.name || t.noName}
          </Typography>
        </Box>

        <Box
          sx={{
            display: "flex",
            alignItems: "center",
            gap: 1,
            mb: 3,
            cursor: "pointer",
            "&:hover": {
              textDecoration: "underline",
              color: "primary.main",
            },
          }}
          onClick={handleOpenRoute}
        >
          <LocationIcon color="primary" />
          <Typography variant="body1">{formatAddress()}</Typography>
        </Box>

        <FileUploadSlider
          photos={apartment.photos}
          price={apartment.price}
          name={apartment.name}
          phones={apartment.phones}
          category={translateCategory(apartment.category)}
        />

        <Paper elevation={3} sx={{ p: 3, borderRadius: 2, mb: 3 }}>
          <Typography variant="h6" gutterBottom sx={{ mt: 2 }}>
            {t.description}
          </Typography>
          <Typography paragraph sx={{ whiteSpace: "pre-line" }}>
            {apartment.description || t.noDescription}
          </Typography>

          <Divider sx={{ my: 3 }} />

          <Grid container spacing={3}>
            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {t.characteristics}
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <HomeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.rooms}
                    secondary={apartment.rooms || t.notSpecified}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.guests}
                    secondary={apartment.beds || t.notSpecified}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <HomeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.area}
                    secondary={
                      apartment.size
                        ? `${apartment.size} ${t.m2}`
                        : t.notSpecified
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <HomeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.floor}
                    secondary={
                      apartment.floor
                        ? `${apartment.floor} ${
                            currentLanguage === "ua" ? "з" : "из"
                          } ${apartment.totalFloors}`
                        : t.notSpecified
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <ChildCareIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.kidsAge}
                    secondary={
                      apartment.kidsAge
                        ? `${apartment.kidsAge} ${t.years}`
                        : t.noRestrictions
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <PersonIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.ageLimit}
                    secondary={
                      apartment.ageLimit
                        ? `${t.fromAge} ${apartment.ageLimit} ${t.years}`
                        : t.noRestrictions
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <CelebrationIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.parties}
                    secondary={getBooleanValue(apartment.parties)}
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12} md={6}>
              <Typography variant="h6" gutterBottom>
                {t.rentalConditions}
              </Typography>

              <List dense>
                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <TimeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.checkInOut}
                    secondary={
                      apartment.checkIn || apartment.checkOut
                        ? `${formatTime(apartment.checkIn)} / ${formatTime(
                            apartment.checkOut
                          )}`
                        : t.notSpecified
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <TimeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.fullDayCheckIn}
                    secondary={getBooleanValue(apartment.fullDayCheckIn)}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <SmokingIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.smoking}
                    secondary={getBooleanValue(apartment.smoking)}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <PetsIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.pets}
                    secondary={getBooleanValue(apartment.pets)}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <DocsIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.reportDocs}
                    secondary={getBooleanValue(apartment.reportDocs)}
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <HomeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.minRent}
                    secondary={
                      apartment.minRent
                        ? `${apartment.minRent} ${t.days}`
                        : t.notSpecified
                    }
                  />
                </ListItem>

                <ListItem>
                  <ListItemAvatar>
                    <Avatar
                      sx={{ bgcolor: "primary.main", width: 32, height: 32 }}
                    >
                      <HomeIcon fontSize="small" />
                    </Avatar>
                  </ListItemAvatar>
                  <ListItemText
                    primary={t.deposit}
                    secondary={
                      apartment.deposit
                        ? `${apartment.deposit} грн`
                        : t.notRequired
                    }
                  />
                </ListItem>
              </List>
            </Grid>

            <Grid item xs={12}>
              <Typography variant="h6" gutterBottom>
                {t.amenities}
              </Typography>

              <Box sx={{ display: "flex", flexWrap: "wrap", gap: 1 }}>
                {apartment.conveniences?.length > 0 ? (
                  apartment.conveniences.map((item, index) => (
                    <Chip
                      key={index}
                      label={translateConvenience(item)}
                      variant="outlined"
                      avatar={<Avatar>{getFacilityIcon(item)}</Avatar>}
                    />
                  ))
                ) : (
                  <Typography variant="body2" color="text.secondary">
                    {t.noAmenities}
                  </Typography>
                )}
              </Box>
            </Grid>
          </Grid>
        </Paper>

        {apartment.latitude && apartment.longitude && (
          <ApartmentDetailMap
            apartment={apartment}
            t={t}
            userLocation={userLocation}
          />
        )}

        {apartment && myListingsCount > 1 && (
          <Box sx={{ textAlign: "center", mb: 4, mt: 3 }}>
            <Link
              // href={`/listings/${apartment.user_id}`}
              href={`/listings/${apartment.user_id}`}
              style={{ textDecoration: "none" }}
            >
              <Button
                variant="contained"
                color="primary"
                size="large"
                sx={{
                  fontFamily: '"Roboto", "Helvetica", "Arial", sans-serif',
                  fontWeight: 700,
                  fontSize: "1.1rem",
                  py: 2,
                  px: 4,
                  borderRadius: 2,
                  textTransform: "uppercase",
                }}
              >
                {currentLanguage === "ua"
                  ? "ІНШІ ОБ'ЄКТИ КОРИСТУВАЧА"
                  : "ДРУГИЕ ОБЪЕКТЫ ПОЛЬЗОВАТЕЛЯ"}
              </Button>
            </Link>
          </Box>
        )}

        <Snackbar
          open={snackbar.open}
          autoHideDuration={5000}
          onClose={handleCloseSnackbar}
          anchorOrigin={{ vertical: "top", horizontal: "center" }}
        >
          <Alert severity={snackbar.severity} onClose={handleCloseSnackbar}>
            {snackbar.message}
          </Alert>
        </Snackbar>

        <Dialog
          open={loginModalOpen}
          onClose={handleCloseModal}
          fullWidth
          maxWidth="xs"
        >
          <DialogContent>
            <CreateUser onClose={handleCloseModal} />
          </DialogContent>
        </Dialog>
      </Box>
    </>
  );
};

export async function getServerSideProps(context) {
  const { id } = context.params;

  try {
    const baseUrl = process.env.NODE_ENV === 'production' 
      ? process.env.NEXT_PUBLIC_API_URL 
      : 'http://localhost:3000';
    
    const res = await fetch(`${baseUrl}/api/v1/apartments/${id}`);
    const data = await res.json();

    if (!data.apartment) {
      return { notFound: true };
    }

    return {
      props: {
        apartmentData: data.apartment,
        userApartmentsCount: data.userApartmentsCount || 0,
      },
    };
  } catch (error) {
    console.error("SSR fetch error:", error);
    return { notFound: true };
  }
}

export default function ApartmentDetailPage({
  apartmentData,
  userApartmentsCount,
}) {
  return (
    <Provider store={store}>
      <LanguageProvider>
        <SessionProvider>
          <AuthLogic />
          <Header />
          <ApartmentDetailContent
            apartmentData={apartmentData}
            userApartmentsCount={userApartmentsCount}
          />
          <Footer />
        </SessionProvider>
      </LanguageProvider>
    </Provider>
  );
}




