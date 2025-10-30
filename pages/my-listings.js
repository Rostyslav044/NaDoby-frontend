

// 'use client';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect, useState } from "react";

// export default function MyListings() {
//   const [profile, setProfile] = useState(null);
  
//   useEffect(() => {
//     const userProfile = localStorage.getItem('user_profile');
//     if (userProfile) {
//       setProfile(JSON.parse(userProfile));
//     }
//   }, []);

//   return (
//     <div>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//           {/* <h1>Мои объявления</h1> */}
//           {profile && (
//             <Apartments 
//               userId={profile._id} 
//               showActions={true} // ← ВАЖНО: передаем showActions=true
//             />
//           )}  
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
import Apartments from "@/app/components/Apartments";
import { useEffect, useState } from "react";
import Head from 'next/head';

export default function MyListings() {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
      setProfile(JSON.parse(userProfile));
    }
  }, []);

  return (
    <>
      <Head>
        <title>Мои объявления | NaDoby</title>
        <meta name="description" content="Управление вашими объявлениями об аренде жилья. Просмотр, редактирование и удаление ваших объектов недвижимости." />
        <meta name="viewport" content="width=device-width, initial-scale=1" />
      </Head>
      
      <div>
        <Provider store={store}>
          <LanguageProvider>
            <Header />
            {/* <h1>Мои объявления</h1> */}
            {profile && (
              <Apartments 
                userId={profile._id} 
                showActions={true} // ← ВАЖНО: передаем showActions=true
              />
            )}  
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