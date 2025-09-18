


// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, Chip, Alert } from "@mui/material";
// import { CheckCircle, ContactMail, Home, Payment, ThumbUp, VerifiedUser, Security } from "@mui/icons-material";

// export default function RentalTerms() {
//   return (
//     <div>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
          
//           <Container maxWidth="lg" sx={{ py: 6 }}>
//             <Paper elevation={3} sx={{ p: 6, borderRadius: 4 }}>
//               <Typography variant="h2" component="h1" gutterBottom sx={{ 
//                 color: 'primary.main',
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 mb: 6,
//                 fontSize: '2.5rem'
//               }}>
//                 Умови оренди
//               </Typography>

//               <Typography variant="h5" component="p" sx={{
//                 textAlign: 'center',
//                 mb: 6,
//                 fontSize: '1.4rem',
//                 lineHeight: 1.6
//               }}>
//                 Добова оренда житла по всій Україні без посередників
//               </Typography>

//               <Box sx={{ mb: 6 }}>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   fontSize: '1.8rem'
//                 }}>
//                   <ThumbUp color="primary" /> Як це працює?
//                 </Typography>
//                 <List sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}>
//                   <ListItem sx={{ alignItems: 'flex-start' }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize="large" />
//                     </ListItemIcon>
//                     <Typography>
//                       Знайдіть об'єкт, який вам підходить, використовуючи наші зручні фільтри
//                     </Typography>
//                   </ListItem>
//                   <ListItem sx={{ alignItems: 'flex-start' }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize="large" />
//                     </ListItemIcon>
//                     <Typography>
//                       Зв'яжіться безпосередньо з власником через контакти, вказані в оголошенні
//                     </Typography>
//                   </ListItem>
//                   <ListItem sx={{ alignItems: 'flex-start' }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize="large" />
//                     </ListItemIcon>
//                     <Typography>
//                       Узгодьте деталі заїзду, оплати та інші умови
//                     </Typography>
//                   </ListItem>
//                   <ListItem sx={{ alignItems: 'flex-start' }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize="large" />
//                     </ListItemIcon>
//                     <Typography>
//                       Насолоджуйтесь проживанням без зайвих витрат
//                     </Typography>
//                   </ListItem>
//                 </List>
//               </Box>

//               <Box sx={{ mb: 6 }}>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   fontSize: '1.8rem'
//                 }}>
//                   <Payment color="primary" /> Важливо знати
//                 </Typography>
                
//                 <Typography variant="h6" paragraph sx={{ fontSize: '1.3rem', mb: 4 }}>
//                   <strong>NaDoby не бере жодних комісій за оренду!</strong> Всі платежі відбуваються 
//                   безпосередньо між орендарем та власником житла. Ми лише надаємо зручний сервіс 
//                   для пошуку та зв'язку.
//                 </Typography>

//                 <Alert severity="info" sx={{ mb: 4, fontSize: '1.2rem' }} icon={<Security fontSize="large" />}>
//                   <Typography variant="h6" component="div" sx={{ fontWeight: 'bold', mb: 2, fontSize: '1.3rem' }}>
//                     Безпека при оренді:
//                   </Typography>
                  
//                   <List dense sx={{ '& .MuiTypography-root': { fontSize: '1.2rem' } }}>
//                     <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
//                       <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                         <VerifiedUser color="info" fontSize="large" />
//                       </ListItemIcon>
//                       <Typography>
//                         Деякі власники можуть просити завдаток (зазвичай 30-100% від вартості добової оренди)
//                       </Typography>
//                     </ListItem>
//                     <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
//                       <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                         <VerifiedUser color="info" fontSize="large" />
//                       </ListItemIcon>
//                       <Typography>
//                         Перед внесенням залогу обов'язково перевірте власника:
//                       </Typography>
//                     </ListItem>
//                   </List>
                  
//                   <Box sx={{ pl: 6, mt: 2 }}>
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                       <Chip label="GetContact" color="info" sx={{ mr: 2, fontSize: '1.1rem', padding: '6px 12px' }} />
//                       <Typography sx={{ fontSize: '1.2rem' }}>
//                         перевірте номер телефону через додаток GetContact
//                       </Typography>
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', alignItems: 'center', mb: 2 }}>
//                       <Chip label="Підтверджені теги" color="success" sx={{ mr: 2, fontSize: '1.1rem', padding: '6px 12px' }} />
//                       <Typography sx={{ fontSize: '1.2rem' }}>
//                         звертайте увагу на підтверджені теги профілю власника
//                       </Typography>
//                     </Box>
                    
//                     <Box sx={{ display: 'flex', alignItems: 'center' }}>
//                       <Chip label="Соцмережі" color="secondary" sx={{ mr: 2, fontSize: '1.1rem', padding: '6px 12px' }} />
//                       <Typography sx={{ fontSize: '1.2rem' }}>
//                         перегляньте соціальні мережі власника 
//                       </Typography>
//                     </Box>
//                   </Box>
                  
//                   <Typography sx={{ mt: 3, fontStyle: 'italic', fontSize: '1.2rem' }}>
//                     Будьте обережні та уважні при здійсненні передоплат!
//                   </Typography>
//                 </Alert>

//                 <Typography variant="h6" paragraph sx={{ fontSize: '1.3rem' }}>
//                   Перед бронюванням рекомендуємо уважно ознайомитися з умовами оренди, 
//                   перевірити наявність всіх зручностей та уточнити всі деталі з власником.
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   fontSize: '1.8rem'
//                 }}>
//                   <ContactMail color="primary" /> Зв'язок з нами
//                 </Typography>
//                 <Typography variant="h6" sx={{ fontSize: '1.3rem' }}>
//                   Якщо у вас виникли питання або пропозиції щодо роботи платформи, 
//                   будь ласка, пишіть на <strong>support@nadoby.com.ua</strong>
//                 </Typography>
//               </Box>
//             </Paper>
//           </Container>
//         </LanguageProvider>
//       </Provider>
//     </div>
//   );
// }


'use client';
import { LanguageProvider } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, Chip, Alert, useTheme, useMediaQuery } from "@mui/material";
import { CheckCircle, ContactMail, Home, Payment, ThumbUp, VerifiedUser, Security } from "@mui/icons-material";

export default function RentalTerms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <div>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
          
          <Container maxWidth="lg" sx={{ 
            py: isMobile ? 4 : 6,
            px: isSmallMobile ? 2 : 3
          }}>
            <Paper elevation={3} sx={{ 
              p: isMobile ? 3 : 6, 
              borderRadius: 4,
              overflow: 'hidden'
            }}>
              <Typography variant="h2" component="h1" gutterBottom sx={{ 
                color: 'primary.main',
                fontWeight: 'bold',
                textAlign: 'center',
                mb: isMobile ? 4 : 6,
                fontSize: isMobile ? '2rem' : '2.5rem'
              }}>
                Умови оренди
              </Typography>

              <Typography variant="h5" component="p" sx={{
                textAlign: 'center',
                mb: isMobile ? 4 : 6,
                fontSize: isMobile ? '1.2rem' : '1.4rem',
                lineHeight: 1.6
              }}>
                Добова оренда житла по всій Україні без посередників
              </Typography>

              <Box sx={{ mb: isMobile ? 4 : 6 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: isMobile ? '1.5rem' : '1.8rem',
                  flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
                }}>
                  <ThumbUp color="primary" /> Як це працює?
                </Typography>
                <List sx={{ 
                  '& .MuiTypography-root': { 
                    fontSize: isMobile ? '1rem' : '1.2rem' 
                  } 
                }}>
                  <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                    </ListItemIcon>
                    <Typography>
                      Знайдіть об'єкт, який вам підходить, використовуючи наші зручні фільтри
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                    </ListItemIcon>
                    <Typography>
                      Зв'яжіться безпосередньо з власником через контакти, вказані в оголошенні
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                    </ListItemIcon>
                    <Typography>
                      Узгодьте деталі заїзду, оплати та інші умови
                    </Typography>
                  </ListItem>
                  <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
                    <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                      <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
                    </ListItemIcon>
                    <Typography>
                      Насолоджуйтесь проживанням без зайвих витрат
                    </Typography>
                  </ListItem>
                </List>
              </Box>

              <Box sx={{ mb: isMobile ? 4 : 6 }}>
                <Typography variant="h4" component="h2" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: isMobile ? '1.5rem' : '1.8rem',
                  flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
                }}>
                  <Payment color="primary" /> Важливо знати
                </Typography>
                
                <Typography variant="h6" paragraph sx={{ 
                  fontSize: isMobile ? '1.1rem' : '1.3rem', 
                  mb: isMobile ? 3 : 4 
                }}>
                  <strong>NaDoby не бере жодних комісій за оренду!</strong> Всі платежі відбуваються 
                  безпосередньо між орендарем та власником житла. Ми лише надаємо зручний сервіс 
                  для пошуку та зв'язку.
                </Typography>

                <Alert severity="info" sx={{ 
                  mb: isMobile ? 3 : 4, 
                  fontSize: isMobile ? '1rem' : '1.2rem' 
                }} icon={<Security fontSize={isMobile ? "medium" : "large"} />}>
                  <Typography variant="h6" component="div" sx={{ 
                    fontWeight: 'bold', 
                    mb: 2, 
                    fontSize: isMobile ? '1.1rem' : '1.3rem' 
                  }}>
                    Безпека при оренді:
                  </Typography>
                  
                  <List dense sx={{ 
                    '& .MuiTypography-root': { 
                      fontSize: isMobile ? '1rem' : '1.2rem' 
                    } 
                  }}>
                    <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                        <VerifiedUser color="info" fontSize={isMobile ? "medium" : "large"} />
                      </ListItemIcon>
                      <Typography>
                        Деякі власники можуть просити завдаток (зазвичай 30-100% від вартості добової оренди)
                      </Typography>
                    </ListItem>
                    <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
                      <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
                        <VerifiedUser color="info" fontSize={isMobile ? "medium" : "large"} />
                      </ListItemIcon>
                      <Typography>
                        Перед внесенням залогу обов'язково перевірте власника:
                      </Typography>
                    </ListItem>
                  </List>
                  
                  <Box sx={{ 
                    pl: isSmallMobile ? 2 : 6, 
                    mt: 2 
                  }}>
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      flexDirection: isSmallMobile ? 'column' : 'row',
                      alignItems: isSmallMobile ? 'flex-start' : 'center'
                    }}>
                      <Chip label="GetContact" color="info" sx={{ 
                        mr: isSmallMobile ? 0 : 2, 
                        mb: isSmallMobile ? 1 : 0,
                        fontSize: '1rem', 
                        padding: '6px 12px' 
                      }} />
                      <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
                        перевірте номер телефону через додаток GetContact
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center', 
                      mb: 2,
                      flexDirection: isSmallMobile ? 'column' : 'row',
                      alignItems: isSmallMobile ? 'flex-start' : 'center'
                    }}>
                      <Chip label="Підтверджені теги" color="success" sx={{ 
                        mr: isSmallMobile ? 0 : 2, 
                        mb: isSmallMobile ? 1 : 0,
                        fontSize: '1rem', 
                        padding: '6px 12px' 
                      }} />
                      <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
                        звертайте увагу на підтверджені теги профілю власника
                      </Typography>
                    </Box>
                    
                    <Box sx={{ 
                      display: 'flex', 
                      alignItems: 'center',
                      flexDirection: isSmallMobile ? 'column' : 'row',
                      alignItems: isSmallMobile ? 'flex-start' : 'center'
                    }}>
                      <Chip label="Соцмережі" color="secondary" sx={{ 
                        mr: isSmallMobile ? 0 : 2, 
                        mb: isSmallMobile ? 1 : 0,
                        fontSize: '1rem', 
                        padding: '6px 12px' 
                      }} />
                      <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
                        перегляньте соціальні мережі власника 
                      </Typography>
                    </Box>
                  </Box>
                  
                  <Typography sx={{ 
                    mt: 3, 
                    fontStyle: 'italic', 
                    fontSize: isMobile ? '1rem' : '1.2rem' 
                  }}>
                    Будьте обережні та уважні при здійсненні передоплат!
                  </Typography>
                </Alert>

                <Typography variant="h6" paragraph sx={{ 
                  fontSize: isMobile ? '1.1rem' : '1.3rem' 
                }}>
                  Перед бронюванням рекомендуємо уважно ознайомитися з умовами оренди, 
                  перевірити наявність всіх зручностей та уточнити всі деталі з власником.
                </Typography>
              </Box>

              <Box>
                <Typography variant="h4" component="h2" gutterBottom sx={{
                  display: 'flex',
                  alignItems: 'center',
                  gap: 2,
                  fontSize: isMobile ? '1.5rem' : '1.8rem',
                  flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
                }}>
                  <ContactMail color="primary" /> Зв'язок з нами
                </Typography>
                <Typography variant="h6" sx={{ 
                  fontSize: isMobile ? '1.1rem' : '1.3rem' 
                }}>
                  Якщо у вас виникли питання або пропозиції щодо роботи платформи, 
                  будь ласка, пишіть на <strong>support@nadoby.com.ua</strong>
                </Typography>
              </Box>
            </Paper>
          </Container>
        </LanguageProvider>
      </Provider>
    </div>
  );
}