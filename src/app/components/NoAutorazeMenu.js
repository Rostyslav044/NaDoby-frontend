
"use client";

import Link from 'next/link';
import React, { useState, useRef, useEffect } from "react";
import { useLanguage } from "@/app/LanguageContext";
import {
  List,
  ListItem,
  ListItemText,
  IconButton,
  Collapse,
  MenuItem,
  Typography,
  Box,
  Divider,
  Paper,
  Snackbar,
  Alert,
  Dialog,
  DialogContent
} from "@mui/material";
import { Close, ArrowDropDown } from "@mui/icons-material";
import CreateUser from "./CreateUser";
import Logo from "./Logo";

const translations = {
  ua: {
    sloganLine1: "Оренда житла по всій Україні",
    sloganLine2: "Без посередників !",
    login: "Увійти/Зареєструватися",
    language: "Мова",
    currency: "Валюта",
    listProperty: "Здати своє помешкання",
    search: "Пошук житла",
    conditions: "Умови оренди",
    blog: "Блог",
    contact: "Зв'язатися з підтримкою",
    registerMessage: "Для розміщення оголошення необхідно авторизуватися"
  },
  ru: {
    sloganLine1: "Аренда жилья по всей Украине",
    sloganLine2: "Без посредников !",
    login: "Войти/Зарегистрироваться",
    language: "Язык",
    currency: "Валюта",
    listProperty: "Сдать свое жилье",
    search: "Поиск жилья",
    conditions: "Условия аренды",
    blog: "Блог",
    contact: "Связаться с поддержкой",
    registerMessage: "Для размещения объявления необходимо авторизоваться"
  }
};

const NoAutorazeMenu = () => {
  const menuRef = useRef(null);
  const modalRef = useRef(null);
  const [isMenuOpen, setIsMenuOpen] = useState(true);
  const [openLanguage, setOpenLanguage] = useState(false);
  const [openCurrency, setOpenCurrency] = useState(false);
  const [openAuthModal, setOpenAuthModal] = useState(false);
  const [showAlert, setShowAlert] = useState(false);

  const { currentLanguage, onLanguageToggle } = useLanguage();
  const t = translations[currentLanguage];

  const handleAuthClick = (e) => {
    e.stopPropagation();
    setOpenAuthModal(true);
  };

  const handleListPropertyClick = (e) => {
    e.stopPropagation();
    setOpenAuthModal(true);
    setShowAlert(true);
  };

  const closeMenu = () => {
    setIsMenuOpen(false);
    setOpenLanguage(false);
    setOpenCurrency(false);
  };

  const handleClickOutside = (e) => {
    if (
      menuRef.current && 
      !menuRef.current.contains(e.target) &&
      (!modalRef.current || !modalRef.current.contains(e.target))
    ) {
      closeMenu();
      setOpenAuthModal(false);
      setShowAlert(false);
    }
  };

  useEffect(() => {
    if (isMenuOpen || openAuthModal) {
      document.addEventListener('mousedown', handleClickOutside);
    }
    return () => document.removeEventListener('mousedown', handleClickOutside);
  }, [isMenuOpen, openAuthModal]);

  if (!isMenuOpen && !openAuthModal) return null;

  return (
    <>
      {(isMenuOpen || openAuthModal) && (
        <Box
          sx={{
            position: 'fixed',
            top: 0,
            left: 0,
            width: '100vw',
            height: '100vh',
            bgcolor: 'rgba(0,0,0,0.5)',
            zIndex: 1300,
            display: 'flex',
            justifyContent: 'flex-end'
          }}
        >
          {isMenuOpen && (
            <Paper
              ref={menuRef}
              sx={{
                width: 300,
                height: '100%',
                bgcolor: '#ffffff',
                borderRadius: 0,
                boxShadow: 'none'
              }}
              onClick={(e) => e.stopPropagation()}
            >
              <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
                <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
                 <Logo /> 
                  <IconButton onClick={closeMenu}>
                    <Close sx={{ 
                      color: '#718096',
                      // paddingLeft:'5px',
                      }} />
                  </IconButton>
                </Box>


               
                
  <Box sx={{ mt: 1 }}>
  <Typography sx={{
    color: '#1a365d', // Темно-синий
    fontSize: '0.98rem',
    fontWeight: 600,
    // lineHeight: 1.2
  }}>
    {t.sloganLine1}
  </Typography>
  <Typography sx={{
    color: '#e53e3e', // Ярко-красный
    fontSize: '0.90rem',
    fontWeight: 600,
    lineHeight: 1.3,
    mt: 0.5,
    fontStyle: 'italic'
  }}>
    {t.sloganLine2}
  </Typography>
</Box>






              </Box>

              <List sx={{ py: 0 }}>
                <ListItem 
                  component="div"
                  onClick={handleAuthClick}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.login} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <ListItem 
                  component={Link}
                  href="/search-apartment"
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    textDecoration: 'none',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.search} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <ListItem 
                  component="div"
                  onClick={handleListPropertyClick}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.listProperty} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                </ListItem>

                <Divider sx={{ my: 1 }} />

                <ListItem 
                  component="div"
                  onClick={() => setOpenLanguage(!openLanguage)}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.language} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <ArrowDropDown sx={{ color: '#0000FF' }} />
                </ListItem>

                <Collapse in={openLanguage}>
                  <Box sx={{ bgcolor: '#f8f9fa' }}>
                    <MenuItem 
                      onClick={() => onLanguageToggle('ua')}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        color: '#0000FF',
                        cursor: 'pointer'
                      }}
                    >
                      UA
                    </MenuItem>
                    <MenuItem 
                      onClick={() => onLanguageToggle('ru')}
                      sx={{ 
                        px: 4, 
                        py: 1.5, 
                        color: '#0000FF',
                        cursor: 'pointer'
                      }}
                    >
                      RU
                    </MenuItem>
                  </Box>
                </Collapse>

                <ListItem 
                  component="div"
                  onClick={() => setOpenCurrency(!openCurrency)}
                  sx={{ 
                    px: 3, 
                    py: 1.5,
                    color: '#0000FF',
                    cursor: 'pointer',
                    '&:hover': {
                      backgroundColor: '#f5f5f5'
                    }
                  }}
                >
                  <ListItemText 
                    primary={t.currency} 
                    primaryTypographyProps={{ fontWeight: 500 }}
                  />
                  <ArrowDropDown sx={{ color: '#0000FF' }} />
                </ListItem>

                <Collapse in={openCurrency}>
                  <Box sx={{ bgcolor: '#f8f9fa' }}>
                    <MenuItem sx={{ 
                      px: 4, 
                      py: 1.5, 
                      color: '#0000FF',
                      cursor: 'pointer'
                    }}>
                      USD
                    </MenuItem>
                    <MenuItem sx={{ 
                      px: 4, 
                      py: 1.5, 
                      color: '#0000FF',
                      cursor: 'pointer'
                    }}>
                      EUR
                    </MenuItem>
                    <MenuItem sx={{ 
                      px: 4, 
                      py: 1.5, 
                      color: '#0000FF',
                      cursor: 'pointer'
                    }}>
                      UAH
                    </MenuItem>
                  </Box>
                </Collapse>

                <Divider sx={{ my: 1 }} />

                {[
                  { text: t.conditions, path: "/rental-terms" },
                  { text: t.blog, path: "/blog" },
                  { text: t.contact, path: "/contact" }
                ].map((item) => (
                  <ListItem
                    component={Link}
                    href={item.path}
                    key={item.text}
                    sx={{ 
                      px: 3, 
                      py: 1.5,
                      color: '#0000FF',
                      cursor: 'pointer',
                      textDecoration: 'none',
                      '&:hover': {
                        backgroundColor: '#f5f5f5'
                      }
                    }}
                  >
                    <ListItemText 
                      primary={item.text} 
                      primaryTypographyProps={{ fontWeight: 500 }}
                    />
                  </ListItem>
                ))}
              </List>
            </Paper>
          )}
        </Box>
      )}

      <Dialog
        open={openAuthModal}
        onClose={() => {
          setOpenAuthModal(false);
          setShowAlert(false);
        }}
        fullWidth
        maxWidth="xs"
        ref={modalRef}
        onClick={(e) => e.stopPropagation()}
      >
        <DialogContent>
          <CreateUser 
            onClose={() => {
              setOpenAuthModal(false);
              setShowAlert(false);
            }} 
            
          />
        </DialogContent>
      </Dialog>

      <Snackbar
        open={showAlert}
        autoHideDuration={6000}
        onClose={() => setShowAlert(false)}
        anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
      >
        <Alert onClose={() => setShowAlert(false)} severity="info">
          {t.registerMessage}
        </Alert>
      </Snackbar>
    </>
  );
};

export default NoAutorazeMenu;



// "use client";

// import Link from 'next/link';
// import React, { useState, useRef, useEffect } from "react";
// import { useLanguage } from "@/app/LanguageContext";
// import {
//   List,
//   ListItem,
//   ListItemText,
//   IconButton,
//   Collapse,
//   MenuItem,
//   Typography,
//   Box,
//   Divider,
//   Paper,
//   Snackbar,
//   Alert,
//   Dialog,
//   DialogContent
// } from "@mui/material";
// import { Close, ArrowDropDown } from "@mui/icons-material";
// import CreateUser from "./CreateUser";
// import Logo from "./Logo";

// const translations = {
//   ua: {
//     sloganLine1: "Оренда житла по всій Україні",
//     sloganLine2: "Без посередників !",
//     login: "Увійти/Зареєструватися",
//     language: "Мова",
//     currency: "Валюта",
//     listProperty: "Здати своє помешкання",
//     search: "Пошук житла",
//     conditions: "Умови оренди",
//     blog: "Блог",
//     contact: "Зв'язатися з підтримкою",
//     registerMessage: "Для розміщення оголошення необхідно авторизуватися"
//   },
//   ru: {
//     sloganLine1: "Аренда жилья по всей Украине",
//     sloganLine2: "Без посредников !",
//     login: "Войти/Зарегистрироваться",
//     language: "Язык",
//     currency: "Валюта",
//     listProperty: "Сдать свое жилье",
//     search: "Поиск жилья",
//     conditions: "Условия аренды",
//     blog: "Блог",
//     contact: "Связаться с поддержкой",
//     registerMessage: "Для размещения объявления необходимо авторизоваться"
//   }
// };

// const NoAutorazeMenu = () => {
//   const menuRef = useRef(null);
//   const modalRef = useRef(null);
//   const [isMenuOpen, setIsMenuOpen] = useState(true);
//   const [openLanguage, setOpenLanguage] = useState(false);
//   const [openCurrency, setOpenCurrency] = useState(false);
//   const [openAuthModal, setOpenAuthModal] = useState(false);
//   const [showAlert, setShowAlert] = useState(false);
//   const [authCompleted, setAuthCompleted] = useState(false);

//   const { currentLanguage, onLanguageToggle } = useLanguage();
//   const t = translations[currentLanguage];

//   const handleAuthClick = (e) => {
//     e.stopPropagation();
//     setOpenAuthModal(true);
//   };

//   const handleListPropertyClick = (e) => {
//     e.stopPropagation();
//     setOpenAuthModal(true);
//     setShowAlert(true);
//   };

//   const closeMenu = () => {
//     setIsMenuOpen(false);
//     setOpenLanguage(false);
//     setOpenCurrency(false);
//   };

//   const handleAuthSuccess = () => {
//     setAuthCompleted(true);
//     setOpenAuthModal(false);
//     setShowAlert(false);
//   };

//   const handleAlertClose = () => {
//     setShowAlert(false);
//     if (!authCompleted) {
//       setIsMenuOpen(false);
//     }
//   };

//   const handleClickOutside = (e) => {
//     if (
//       menuRef.current && 
//       !menuRef.current.contains(e.target) &&
//       (!modalRef.current || !modalRef.current.contains(e.target))
//     ) {
//       closeMenu();
//       setOpenAuthModal(false);
//       setShowAlert(false);
//     }
//   };

//   useEffect(() => {
//     if (isMenuOpen || openAuthModal) {
//       document.addEventListener('mousedown', handleClickOutside);
//     }
//     return () => document.removeEventListener('mousedown', handleClickOutside);
//   }, [isMenuOpen, openAuthModal]);

//   useEffect(() => {
//     if (authCompleted) {
//       setAuthCompleted(false);
//     }
//   }, [authCompleted]);

//   if (!isMenuOpen && !openAuthModal) return null;

//   return (
//     <>
//       {(isMenuOpen || openAuthModal) && (
//         <Box
//           sx={{
//             position: 'fixed',
//             top: 0,
//             left: 0,
//             width: '100vw',
//             height: '100vh',
//             bgcolor: 'rgba(0,0,0,0.5)',
//             zIndex: 1300,
//             display: 'flex',
//             justifyContent: 'flex-end'
//           }}
//         >
//           {isMenuOpen && (
//             <Paper
//               ref={menuRef}
//               sx={{
//                 width: 300,
//                 height: '100%',
//                 bgcolor: '#ffffff',
//                 borderRadius: 0,
//                 boxShadow: 'none'
//               }}
//               onClick={(e) => e.stopPropagation()}
//             >
//               <Box sx={{ p: 3, borderBottom: '1px solid #f0f0f0' }}>
//                 <Box sx={{ display: 'flex', justifyContent: 'space-between', alignItems: 'center' }}>
//                   <Logo /> 
//                   <IconButton onClick={closeMenu}>
//                     <Close sx={{ color: '#718096' }} />
//                   </IconButton>
//                 </Box>

//                 <Box sx={{ mt: 1 }}>
//                   <Typography sx={{ 
//                     color: '#1a365d', fontSize: '0.98rem', fontWeight: 600 ,
//                     paddingTop:'15px',
//                     }}>
//                     {t.sloganLine1}
//                   </Typography>
//                   <Typography sx={{ 
//                     color: '#e53e3e', 
//                     fontSize: '0.90rem',
//                     fontWeight: 600,
//                     lineHeight: 1.3,
//                     mt: 0.5,
//                     fontStyle: 'italic'
//                   }}>
//                     {t.sloganLine2}
//                   </Typography>
//                 </Box>
//               </Box>

//               <List sx={{ py: 0 }}>
//                 <ListItem 
//                   component="div"
//                   onClick={handleAuthClick}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     '&:hover': { backgroundColor: '#f5f5f5' }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.login} 
//                     primaryTypographyProps={{ fontWeight: 500 }}
//                   />
//                 </ListItem>

//                 <ListItem 
//                   component={Link}
//                   href="/search-apartment"
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     textDecoration: 'none',
//                     '&:hover': { backgroundColor: '#f5f5f5' }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.search} 
//                     primaryTypographyProps={{ fontWeight: 500 }}
//                   />
//                 </ListItem>

//                 <ListItem 
//                   component="div"
//                   onClick={handleListPropertyClick}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     '&:hover': { backgroundColor: '#f5f5f5' }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.listProperty} 
//                     primaryTypographyProps={{ fontWeight: 500 }}
//                   />
//                 </ListItem>

//                 <Divider sx={{ my: 1 }} />

//                 <ListItem 
//                   component="div"
//                   onClick={() => setOpenLanguage(!openLanguage)}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     '&:hover': { backgroundColor: '#f5f5f5' }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.language} 
//                     primaryTypographyProps={{ fontWeight: 500 }}
//                   />
//                   <ArrowDropDown sx={{ color: '#0000FF' }} />
//                 </ListItem>

//                 <Collapse in={openLanguage}>
//                   <Box sx={{ bgcolor: '#f8f9fa' }}>
//                     <MenuItem 
//                       onClick={() => onLanguageToggle('ua')}
//                       sx={{ px: 4, py: 1.5, color: '#0000FF', cursor: 'pointer' }}
//                     >
//                       UA
//                     </MenuItem>
//                     <MenuItem 
//                       onClick={() => onLanguageToggle('ru')}
//                       sx={{ px: 4, py: 1.5, color: '#0000FF', cursor: 'pointer' }}
//                     >
//                       RU
//                     </MenuItem>
//                   </Box>
//                 </Collapse>

//                 <ListItem 
//                   component="div"
//                   onClick={() => setOpenCurrency(!openCurrency)}
//                   sx={{ 
//                     px: 3, 
//                     py: 1.5,
//                     color: '#0000FF',
//                     cursor: 'pointer',
//                     '&:hover': { backgroundColor: '#f5f5f5' }
//                   }}
//                 >
//                   <ListItemText 
//                     primary={t.currency} 
//                     primaryTypographyProps={{ fontWeight: 500 }}
//                   />
//                   <ArrowDropDown sx={{ color: '#0000FF' }} />
//                 </ListItem>

//                 <Collapse in={openCurrency}>
//                   <Box sx={{ bgcolor: '#f8f9fa' }}>
//                     <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF', cursor: 'pointer' }}>
//                       USD
//                     </MenuItem>
//                     <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF', cursor: 'pointer' }}>
//                       EUR
//                     </MenuItem>
//                     <MenuItem sx={{ px: 4, py: 1.5, color: '#0000FF', cursor: 'pointer' }}>
//                       UAH
//                     </MenuItem>
//                   </Box>
//                 </Collapse>

//                 <Divider sx={{ my: 1 }} />

//                 {[
//                   { text: t.conditions, path: "/rental-terms" },
//                   { text: t.blog, path: "/blog" },
//                   { text: t.contact, path: "/contact" }
//                 ].map((item) => (
//                   <ListItem
//                     component={Link}
//                     href={item.path}
//                     key={item.text}
//                     sx={{ 
//                       px: 3, 
//                       py: 1.5,
//                       color: '#0000FF',
//                       cursor: 'pointer',
//                       textDecoration: 'none',
//                       '&:hover': { backgroundColor: '#f5f5f5' }
//                     }}
//                   >
//                     <ListItemText 
//                       primary={item.text} 
//                       primaryTypographyProps={{ fontWeight: 500 }}
//                     />
//                   </ListItem>
//                 ))}
//               </List>
//             </Paper>
//           )}
//         </Box>
//       )}

//       <Dialog
//         open={openAuthModal}
//         onClose={() => {
//           setOpenAuthModal(false);
//           setShowAlert(false);
//         }}
//         fullWidth
//         maxWidth="xs"
//         ref={modalRef}
//         onClick={(e) => e.stopPropagation()}
//       >
//         <DialogContent>
//           <CreateUser 
//             onClose={() => {
//               setOpenAuthModal(false);
//               setShowAlert(false);
//             }}
//             onAuthSuccess={handleAuthSuccess}
//           />
//         </DialogContent>
//       </Dialog>

//       <Snackbar
//         open={showAlert}
//         autoHideDuration={6000}
//         onClose={handleAlertClose}
//         anchorOrigin={{ vertical: 'top', horizontal: 'center' }}
//       >
//         <Alert onClose={handleAlertClose} severity="info">
//           {t.registerMessage}
//         </Alert>
//       </Snackbar>
//     </>
//   );
// };

// export default NoAutorazeMenu;








