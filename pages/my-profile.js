// 'use client';

// import { LanguageProvider } from "@/app/LanguageContext";

// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";


// export default function MyProfile() {
//     return (
//       <div>
//         <Provider store={store}>
//         <LanguageProvider>
//            <Header />
         
//         <h1>my-profile</h1>
//         </LanguageProvider>
//          </Provider>
//       </div>
//     );
//   }





'use client';

import { LanguageProvider } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { Container, Typography, Avatar, Box, Paper, Grid, Button, TextField, Divider, IconButton, InputAdornment } from "@mui/material";
import { useState, useEffect } from "react";
import { Edit, Save, Phone, Email, Lock, Person, LocationOn, Visibility, VisibilityOff } from "@mui/icons-material";

export default function LandlordProfile() {
  // Состояние данных пользователя
  const [userData, setUserData] = useState({
    name: "",
    city: "",
    phones: ["", "", ""],
    about: "",
    email: "",
    password: "",
    avatar: "/default-avatar.jpg"
  });

  const [editMode, setEditMode] = useState(false);
  const [initialData, setInitialData] = useState({});
  const [showPassword, setShowPassword] = useState(false);

  // Загрузка данных пользователя при монтировании
  useEffect(() => {
    const savedData = JSON.parse(localStorage.getItem('landlordProfile')) || {
      name: "Иван Иванов",
      city: "Киев",
      phones: ["+380991234567", "", ""],
      about: "Сдаю уютные апартаменты в центре города",
      email: "landlord@example.com",
      password: "secret123", // Теперь храним реальный пароль для демонстрации
      avatar: "/default-avatar.jpg"
    };
    
    setUserData(savedData);
    setInitialData(savedData);
  }, []);

  const handleInputChange = (e) => {
    const { name, value } = e.target;
    setUserData(prev => ({ ...prev, [name]: value }));
  };

  const handlePhoneChange = (index, value) => {
    const newPhones = [...userData.phones];
    newPhones[index] = value;
    setUserData(prev => ({ ...prev, phones: newPhones }));
  };

  const handleSave = () => {
    localStorage.setItem('landlordProfile', JSON.stringify(userData));
    setInitialData(userData);
    setEditMode(false);
  };

  const handleCancel = () => {
    setUserData(initialData);
    setEditMode(false);
  };

  const toggleShowPassword = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
          
          <Container maxWidth="md" sx={{ mt: 4, mb: 6 }}>
            <Paper elevation={3} sx={{ p: 4, borderRadius: 2 }}>
              {/* Заголовок и аватар */}
              <Box sx={{ display: 'flex', alignItems: 'center', mb: 4 }}>
                <Avatar 
                  src={userData.avatar} 
                  sx={{ width: 100, height: 100, mr: 3 }} 
                />
                <Box sx={{ flexGrow: 1 }}>
                  <Typography variant="h4" component="h1" gutterBottom>
                    {userData.name || "Профиль арендодателя"}
                  </Typography>
                  <Typography variant="body1" color="text.secondary">
                    <LocationOn fontSize="small" sx={{ verticalAlign: 'middle', mr: 0.5 }} />
                    {userData.city || "Город не указан"}
                  </Typography>
                </Box>
                {!editMode ? (
                  <Button 
                    variant="outlined" 
                    startIcon={<Edit />}
                    onClick={() => setEditMode(true)}
                  >
                    Редактировать
                  </Button>
                ) : (
                  <Button 
                    variant="contained" 
                    startIcon={<Save />}
                    onClick={handleSave}
                    color="primary"
                  >
                    Сохранить
                  </Button>
                )}
              </Box>

              <Divider sx={{ my: 3 }} />

              {/* Основная информация */}
              <Grid container spacing={4}>
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Person sx={{ mr: 1 }} /> Личная информация
                  </Typography>
                  
                  {editMode ? (
                    <>
                      <TextField
                        fullWidth
                        label="Имя"
                        name="name"
                        value={userData.name}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="Город"
                        name="city"
                        value={userData.city}
                        onChange={handleInputChange}
                        sx={{ mb: 2 }}
                      />
                      <TextField
                        fullWidth
                        label="О себе"
                        name="about"
                        value={userData.about}
                        onChange={handleInputChange}
                        multiline
                        rows={3}
                        sx={{ mb: 2 }}
                      />
                    </>
                  ) : (
                    <>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Имя:</strong> {userData.name || "Не указано"}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>Город:</strong> {userData.city || "Не указан"}
                      </Typography>
                      <Typography variant="body1" sx={{ mb: 2 }}>
                        <strong>О себе:</strong> {userData.about || "Не указано"}
                      </Typography>
                    </>
                  )}
                </Grid>
                
                <Grid item xs={12} md={6}>
                  <Typography variant="h6" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Phone sx={{ mr: 1 }} /> Контакты
                  </Typography>
                  
                  {editMode ? (
                    <>
                      {userData.phones.map((phone, index) => (
                        <TextField
                          key={index}
                          fullWidth
                          label={`Телефон ${index + 1}`}
                          value={phone}
                          onChange={(e) => handlePhoneChange(index, e.target.value)}
                          sx={{ mb: 2 }}
                          InputProps={{
                            startAdornment: <Phone sx={{ mr: 1, color: 'action.active' }} />,
                          }}
                        />
                      ))}
                    </>
                  ) : (
                    <>
                      {userData.phones.filter(phone => phone).map((phone, index) => (
                        <Typography key={index} variant="body1" sx={{ mb: 2 }}>
                          <strong>Телефон {index + 1}:</strong> {phone}
                        </Typography>
                      ))}
                      {userData.phones.filter(phone => phone).length === 0 && (
                        <Typography variant="body1" color="text.secondary">
                          Телефоны не указаны
                        </Typography>
                      )}
                    </>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Email sx={{ mr: 1 }} /> Электронная почта
                  </Typography>
                  
                  {editMode ? (
                    <TextField
                      fullWidth
                      label="Email"
                      name="email"
                      type="email"
                      value={userData.email}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: <Email sx={{ mr: 1, color: 'action.active' }} />,
                      }}
                    />
                  ) : (
                    <Typography variant="body1" sx={{ mb: 2 }}>
                      <strong>Email:</strong> {userData.email || "Не указан"}
                    </Typography>
                  )}

                  <Divider sx={{ my: 3 }} />

                  <Typography variant="h6" gutterBottom sx={{ mb: 2, display: 'flex', alignItems: 'center' }}>
                    <Lock sx={{ mr: 1 }} /> Пароль
                  </Typography>
                  
                  {editMode ? (
                    <TextField
                      fullWidth
                      label="Новый пароль"
                      name="password"
                      type={showPassword ? "text" : "password"}
                      value={userData.password}
                      onChange={handleInputChange}
                      sx={{ mb: 2 }}
                      InputProps={{
                        startAdornment: <Lock sx={{ mr: 1, color: 'action.active' }} />,
                        endAdornment: (
                          <InputAdornment position="end">
                            <IconButton
                              onClick={toggleShowPassword}
                              edge="end"
                            >
                              {showPassword ? <VisibilityOff /> : <Visibility />}
                            </IconButton>
                          </InputAdornment>
                        ),
                      }}
                    />
                  ) : (
                    <Box sx={{ display: 'flex', alignItems: 'center' }}>
                      <Typography variant="body1" sx={{ mb: 2, mr: 2 }}>
                        <strong>Пароль:</strong> {showPassword ? userData.password : "••••••••"}
                      </Typography>
                      <IconButton
                        size="small"
                        onClick={toggleShowPassword}
                        sx={{ ml: 1 }}
                      >
                        {showPassword ? <VisibilityOff fontSize="small" /> : <Visibility fontSize="small" />}
                      </IconButton>
                    </Box>
                  )}
                </Grid>
              </Grid>

              {editMode && (
                <Box sx={{ mt: 3, display: 'flex', justifyContent: 'flex-end', gap: 2 }}>
                  <Button 
                    variant="outlined" 
                    onClick={handleCancel}
                  >
                    Отменить
                  </Button>
                  <Button 
                    variant="contained" 
                    onClick={handleSave}
                    color="primary"
                  >
                    Сохранить изменения
                  </Button>
                </Box>
              )}
            </Paper>
          </Container>
        </LanguageProvider>
      </Provider>
    </div>
  );
}