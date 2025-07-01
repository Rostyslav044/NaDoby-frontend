

// 'use client'
// // app/layout.js
// import React from 'react';
// import {LanguageProvider} from '@/app/LanguageContext';
// import { Roboto, Lato } from 'next/font/google';
// import Providers from './providers';
// import Profile from './components/testAvtoriz';
// import { SessionProvider } from "next-auth/react"
// import { store } from './store';

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
//       <SessionProvider>
       
//         <LanguageProvider>
//         <Providers>
//           <main >
//          <Profile></Profile>
         
//             {children}
           
//             </main>

//             </Providers>
//         </LanguageProvider>
//         </SessionProvider>
//         </body>
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
          <LanguageProvider>
            {/* Оборачиваем все в Providers для Redux */}
            
            <Providers>
            
              <main>
              
            <AuthLogic />
           
                {children}
              </main>
              
             <Apartments/>
            </Providers>



            
          </LanguageProvider>
        </SessionProvider>
      </body>
    </html>
  );
}
