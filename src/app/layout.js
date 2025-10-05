

// 'use client'

// import React, { useEffect } from 'react';
// import { LanguageProvider } from '@/app/LanguageContext';
// import { Roboto, Lato } from 'next/font/google';
// import Providers from './providers'; // Подключаем новый компонент Providers
// import AuthLogic from './components/AuthLogic';
// import { SessionProvider } from "next-auth/react";
// import { store } from './store'; // Подключаем store


// import Apartments from './components/Apartments';
// import { Provider, useSelector } from 'react-redux';
// import Footer from './components/Footer';
// import Blog from '../../pages/blog';



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
//         <Provider store={store}> 
//          <LanguageProvider>
//               {/* <Providers> */}
//             <main>
//                <AuthLogic />
//             {children}
//               </main>
//                  <Apartments/>
//                  <Blog/>
//                  <Footer/>
//              {/* </Providers> */}
//           </LanguageProvider>
//            </Provider>
//         </SessionProvider>
//       </body>
//     </html>
//   );
// }



'use client'

import React, { useEffect } from 'react';
import { LanguageProvider } from '@/app/LanguageContext';
import { Roboto, Lato } from 'next/font/google';
import Providers from './providers';
import AuthLogic from './components/AuthLogic';
import { SessionProvider } from "next-auth/react";
import { store } from './store';
import Apartments from './components/Apartments';
import { Provider, useSelector } from 'react-redux';
import Footer from './components/Footer';
import Blog from '../../pages/blog';
import axios from "axios";
// Импортируем глобальную конфигурацию axios
import '@/app/utils/axiosConfig';

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
  useEffect(() => {
    const forgotPassword = async (email) => {
      try {
        const response = await axios.post("http://localhost:3000/api/v1/auth/forgotpassword", {
          email: email.toLowerCase(),
        });
        console.log(response.data);
      } catch (error) {
        if (error.response) {
          console.error("Error:", error.response.data);
        } else {
          console.error("Network error:", error.message);
        }
      }
    };
  
    // forgotPassword("0988560505r@gmail.com");
 const resetPassword =   async function resetPassword(token, newPassword) {
  try {
    const response = await axios.put(`http://localhost:3000/api/v1/auth/resetpassword/${token}`, {
      password: newPassword,
    });

    console.log("Password reset success:", response.data);
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data.error || "Password reset failed");
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error");
    }
  }
}
// resetPassword('b83a2743649f1f26d9961ea0bdf3e6c9254e8a61', "0988560506")
  }, []);

  return (
    <html lang="ua">
      <head />
      <body className={lato.className}>
        <SessionProvider>
          <Provider store={store}> 
            <LanguageProvider>
              <main>
                <AuthLogic />
                {children}
              </main>
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