


// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import { Container, Typography, Box, Paper, List, ListItem, ListItemIcon, Chip, Alert, useTheme, useMediaQuery } from "@mui/material";
// import { CheckCircle, ContactMail, Home, Payment, ThumbUp, VerifiedUser, Security } from "@mui/icons-material";

// export default function RentalTerms() {
//   const theme = useTheme();
//   const isMobile = useMediaQuery(theme.breakpoints.down('md'));
//   const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

//   return (
//     <div>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
          
//           <Container maxWidth="lg" sx={{ 
//             py: isMobile ? 4 : 6,
//             px: isSmallMobile ? 2 : 3
//           }}>
//             <Paper elevation={3} sx={{ 
//               p: isMobile ? 3 : 6, 
//               borderRadius: 4,
//               overflow: 'hidden'
//             }}>
//               <Typography variant="h2" component="h1" gutterBottom sx={{ 
//                 color: 'primary.main',
//                 fontWeight: 'bold',
//                 textAlign: 'center',
//                 mb: isMobile ? 4 : 6,
//                 fontSize: isMobile ? '2rem' : '2.5rem'
//               }}>
//                 Умови оренди
//               </Typography>

//               <Typography variant="h5" component="p" sx={{
//                 textAlign: 'center',
//                 mb: isMobile ? 4 : 6,
//                 fontSize: isMobile ? '1.2rem' : '1.4rem',
//                 lineHeight: 1.6
//               }}>
//                 Добова оренда житла по всій Україні без посередників
//               </Typography>

//               <Box sx={{ mb: isMobile ? 4 : 6 }}>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   fontSize: isMobile ? '1.5rem' : '1.8rem',
//                   flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
//                 }}>
//                   <ThumbUp color="primary" /> Як це працює?
//                 </Typography>
//                 <List sx={{ 
//                   '& .MuiTypography-root': { 
//                     fontSize: isMobile ? '1rem' : '1.2rem' 
//                   } 
//                 }}>
//                   <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
//                     </ListItemIcon>
//                     <Typography>
//                       Знайдіть об'єкт, який вам підходить, використовуючи наші зручні фільтри
//                     </Typography>
//                   </ListItem>
//                   <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
//                     </ListItemIcon>
//                     <Typography>
//                       Зв'яжіться безпосередньо з власником через контакти, вказані в оголошенні
//                     </Typography>
//                   </ListItem>
//                   <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
//                     </ListItemIcon>
//                     <Typography>
//                       Узгодьте деталі заїзду, оплати та інші умови
//                     </Typography>
//                   </ListItem>
//                   <ListItem sx={{ alignItems: 'flex-start', px: isSmallMobile ? 0 : 1 }}>
//                     <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                       <CheckCircle color="success" fontSize={isMobile ? "medium" : "large"} />
//                     </ListItemIcon>
//                     <Typography>
//                       Насолоджуйтесь проживанням без зайвих витрат
//                     </Typography>
//                   </ListItem>
//                 </List>
//               </Box>

//               <Box sx={{ mb: isMobile ? 4 : 6 }}>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   fontSize: isMobile ? '1.5rem' : '1.8rem',
//                   flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
//                 }}>
//                   <Payment color="primary" /> Важливо знати
//                 </Typography>
                
//                 <Typography variant="h6" paragraph sx={{ 
//                   fontSize: isMobile ? '1.1rem' : '1.3rem', 
//                   mb: isMobile ? 3 : 4 
//                 }}>
//                   <strong>NaDoby не бере жодних комісій за оренду!</strong> Всі платежі відбуваються 
//                   безпосередньо між орендарем та власником житла. Ми лише надаємо зручний сервіс 
//                   для пошуку та зв'язку.
//                 </Typography>

//                 <Alert severity="info" sx={{ 
//                   mb: isMobile ? 3 : 4, 
//                   fontSize: isMobile ? '1rem' : '1.2rem' 
//                 }} icon={<Security fontSize={isMobile ? "medium" : "large"} />}>
//                   <Typography variant="h6" component="div" sx={{ 
//                     fontWeight: 'bold', 
//                     mb: 2, 
//                     fontSize: isMobile ? '1.1rem' : '1.3rem' 
//                   }}>
//                     Безпека при оренді:
//                   </Typography>
                  
//                   <List dense sx={{ 
//                     '& .MuiTypography-root': { 
//                       fontSize: isMobile ? '1rem' : '1.2rem' 
//                     } 
//                   }}>
//                     <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
//                       <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                         <VerifiedUser color="info" fontSize={isMobile ? "medium" : "large"} />
//                       </ListItemIcon>
//                       <Typography>
//                         Деякі власники можуть просити завдаток (зазвичай 30-100% від вартості добової оренди)
//                       </Typography>
//                     </ListItem>
//                     <ListItem sx={{ alignItems: 'flex-start', px: 0 }}>
//                       <ListItemIcon sx={{ minWidth: 40, mt: '4px' }}>
//                         <VerifiedUser color="info" fontSize={isMobile ? "medium" : "large"} />
//                       </ListItemIcon>
//                       <Typography>
//                         Перед внесенням залогу обов'язково перевірте власника:
//                       </Typography>
//                     </ListItem>
//                   </List>
                  
//                   <Box sx={{ 
//                     pl: isSmallMobile ? 2 : 6, 
//                     mt: 2 
//                   }}>
//                     <Box sx={{ 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       mb: 2,
//                       flexDirection: isSmallMobile ? 'column' : 'row',
//                       alignItems: isSmallMobile ? 'flex-start' : 'center'
//                     }}>
//                       <Chip label="GetContact" color="info" sx={{ 
//                         mr: isSmallMobile ? 0 : 2, 
//                         mb: isSmallMobile ? 1 : 0,
//                         fontSize: '1rem', 
//                         padding: '6px 12px' 
//                       }} />
//                       <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
//                         перевірте номер телефону через додаток GetContact
//                       </Typography>
//                     </Box>
                    
//                     <Box sx={{ 
//                       display: 'flex', 
//                       alignItems: 'center', 
//                       mb: 2,
//                       flexDirection: isSmallMobile ? 'column' : 'row',
//                       alignItems: isSmallMobile ? 'flex-start' : 'center'
//                     }}>
//                       <Chip label="Підтверджені теги" color="success" sx={{ 
//                         mr: isSmallMobile ? 0 : 2, 
//                         mb: isSmallMobile ? 1 : 0,
//                         fontSize: '1rem', 
//                         padding: '6px 12px' 
//                       }} />
//                       <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
//                         звертайте увагу на підтверджені теги профілю власника
//                       </Typography>
//                     </Box>
                    
//                     <Box sx={{ 
//                       display: 'flex', 
//                       alignItems: 'center',
//                       flexDirection: isSmallMobile ? 'column' : 'row',
//                       alignItems: isSmallMobile ? 'flex-start' : 'center'
//                     }}>
//                       <Chip label="Соцмережі" color="secondary" sx={{ 
//                         mr: isSmallMobile ? 0 : 2, 
//                         mb: isSmallMobile ? 1 : 0,
//                         fontSize: '1rem', 
//                         padding: '6px 12px' 
//                       }} />
//                       <Typography sx={{ fontSize: isMobile ? '1rem' : '1.2rem' }}>
//                         перегляньте соціальні мережі власника 
//                       </Typography>
//                     </Box>
//                   </Box>
                  
//                   <Typography sx={{ 
//                     mt: 3, 
//                     fontStyle: 'italic', 
//                     fontSize: isMobile ? '1rem' : '1.2rem' 
//                   }}>
//                     Будьте обережні та уважні при здійсненні передоплат!
//                   </Typography>
//                 </Alert>

//                 <Typography variant="h6" paragraph sx={{ 
//                   fontSize: isMobile ? '1.1rem' : '1.3rem' 
//                 }}>
//                   Перед бронюванням рекомендуємо уважно ознайомитися з умовами оренди, 
//                   перевірити наявність всіх зручностей та уточнити всі деталі з власником.
//                 </Typography>
//               </Box>

//               <Box>
//                 <Typography variant="h4" component="h2" gutterBottom sx={{
//                   display: 'flex',
//                   alignItems: 'center',
//                   gap: 2,
//                   fontSize: isMobile ? '1.5rem' : '1.8rem',
//                   flexWrap: isSmallMobile ? 'wrap' : 'nowrap'
//                 }}>
//                   <ContactMail color="primary" /> Зв'язок з нами
//                 </Typography>
//                 <Typography variant="h6" sx={{ 
//                   fontSize: isMobile ? '1.1rem' : '1.3rem' 
//                 }}>
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
import Head from 'next/head';

export default function RentalTerms() {
  const theme = useTheme();
  const isMobile = useMediaQuery(theme.breakpoints.down('md'));
  const isSmallMobile = useMediaQuery(theme.breakpoints.down('sm'));

  return (
    <>
      <Head>
        <title>Умови оренди житла | NaDoby</title>
        <meta name="description" content="Правила та умови оренди житла на NaDoby. Без комісій, безпосередньо з власниками. Безпека при оренді, поради та рекомендації." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
        <meta name="keywords" content="умови оренди, правила оренди, безпечна оренда, NaDoby, оренда житла" />
      </Head>
      
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
    </>
  );
}

// Функция для статической генерации - выполняется на сервере во время сборки
export async function getStaticProps() {
  return {
    props: {
      generatedAt: new Date().toISOString(),
    },
    // Регенерация страницы каждые 24 часа (опционально)
    revalidate: 86400, // 24 часа в секундах
  }
}