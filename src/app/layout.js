


// 'use client'

// import React, { useEffect } from 'react';
// import { LanguageProvider } from '@/app/LanguageContext';
// import { Roboto, Lato } from 'next/font/google';
// // import Providers from './providers';
// import AuthLogic from './components/AuthLogic';
// import { SessionProvider } from "next-auth/react";
// import { store } from './store';
// import Apartments from './components/Apartments';
// import { Provider, useSelector } from 'react-redux';
// import Footer from './components/Footer';
// import Blog from '../../pages/blog';
// import axios from "axios";
// // Импортируем глобальную конфигурацию axios
// import '@/app/utils/axiosConfig';
// // import Search from './components/Search';

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
//   useEffect(() => {
   
 
//   }, []);

//   return (
//     <html lang="ua">
//       <head />
//       <body className={lato.className}>
//         <SessionProvider>
//           <Provider store={store}> 
//             <LanguageProvider>
//               <main>
//                 <AuthLogic />
//                 {children}
//               </main>
//               {/* <Search/> */}
//               <Apartments/>
//               <Blog/>
//               <Footer/>
//             </LanguageProvider>
//           </Provider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }




'use client'

import React, { useEffect } from 'react';
import { LanguageProvider } from '@/app/LanguageContext';
import { Roboto, Lato } from 'next/font/google';
import AuthLogic from './components/AuthLogic';
import { SessionProvider } from "next-auth/react";
import { store } from './store';
import Apartments from './components/Apartments';
import { Provider } from 'react-redux';
import Footer from './components/Footer';
import Blog from '../../pages/blog';
import '@/app/utils/axiosConfig';

const lato = Lato({
  weight: ['400', '700'],
  subsets: ['latin'],
});

export default function Layout({ children }) {
  useEffect(() => {
    // ваш код
  }, []);

  return (
    <html lang="ua">
      <head />
      <body className={lato.className}>
        <SessionProvider>
          <Provider store={store}> 
            <LanguageProvider> {/* ← LanguageProvider ДОЛЖЕН ОБОРАЧИВАТЬ ВСЕ */}
              <AuthLogic />
              {children} {/* ← Теперь Search будет внутри LanguageProvider */}
              <Apartments/>
              <Blog/>
              <Footer/>
            </LanguageProvider>
          </Provider>
        </SessionProvider>
      </body>
    </html>
  );
}