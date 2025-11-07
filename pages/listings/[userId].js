

// 'use client';
// import { useRouter } from 'next/router';
// import { LanguageProvider } from "@/app/LanguageContext";
// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect, useState } from "react";

// export default function MyListings() {
  
//     const router = useRouter();
//   const { userId } = router.query;

//   return (
//     <div>
//       <Provider store={store}>
//         <LanguageProvider>
//           <Header />
//           {/* <h1>Объявления юзера</h1> */}
//           {userId && (
//             <Apartments 
//               userId={userId} 
//               showActions={true} // ← ВАЖНО: передаем showActions=true
//             />
//           )}  
//         </LanguageProvider>
//       </Provider>
//     </div>
//   );
// }
 