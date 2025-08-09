






// 'use client'

// import React, { useEffect } from 'react';
// import { Provider, useSelector } from 'react-redux';
// import { LanguageProvider } from '@/app/LanguageContext';
// import { Roboto, Lato } from 'next/font/google';
// import Providers from './providers'; // Подключаем новый компонент Providers
// import AuthLogic from './components/AuthLogic';
// import { SessionProvider } from "next-auth/react";
// import { store } from './store'; // Подключаем store


// import Apartments from './components/Apartments';




// // Применение шрифтов:
// const roboto = Roboto({
//   weight: ['400', '500', '700'],
//   subsets: ['latin'],
// });

// const lato = Lato({
//   weight: ['400', '700'],
//   subsets: ['latin'],
// });

// export default function Layout({ children }) {

  
//   return (
//     <html lang="ua">
//       <head />
//       <body className={lato.className}>
      
     
//         <SessionProvider>
        
//         <Providers>
//          <LanguageProvider>
              
//             <main>
//                <AuthLogic />
//             {children}
//               </main>
//                  <Apartments/>
             
//           </LanguageProvider>
//           </Providers>
          
//         </SessionProvider>
        
        
//       </body>
//     </html>
//   );
// }

'use client'

import React, { useEffect } from 'react';
import { LanguageProvider } from '@/app/LanguageContext';
import { Roboto, Lato } from 'next/font/google';
import Providers from './providers'; // Подключаем новый компонент Providers
import AuthLogic from './components/AuthLogic';
import { SessionProvider } from "next-auth/react";
import { store } from './store'; // Подключаем store


import Apartments from './components/Apartments';
import { Provider, useSelector } from 'react-redux';
import Footer from './components/Footer';



// Применение шрифтов:
const roboto = Roboto({
  weight: ['400', '500', '700'],
  subsets: ['latin'],
});

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Layout({ children }) {

  
  return (
    <html lang="ua">
      <head />
      <body className={lato.className}>

        <SessionProvider>
        <Provider store={store}> 
         <LanguageProvider>
              {/* <Providers> */}
            <main>
               <AuthLogic />
            {children}
              </main>
                 <Apartments/>
                 <Footer/>
             {/* </Providers> */}
          </LanguageProvider>
           </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}
