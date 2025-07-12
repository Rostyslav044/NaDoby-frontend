

// import Image from "next/image";
// import burgerMenu from '../../public/burger.svg';
// import styles from '@/app/styles/header.styles.module.scss';
// export default function Home() {
// return (
//   <>
//   <header >
//     <div className={styles.headerContainer}>
//     <p className={styles.homLogo}>
//       NaDoby.com.ua
//     </p>
//     <Image
//     src={burgerMenu}
//     />
//     </div>
//     <p className={styles.homSlogan}>
// Подобова аренда в Україні від власників.
//     </p>
    
//   </header>
//   </>
// )
// }


// "use client";
// import React, { useState } from "react";
// import Image from "next/image";
// import burgerMenu from "../../public/burger.svg";
// import NoAutorazeMenu from '@/app/components/NoAutorazeMenu';
// import styles from "@/app/styles/header.styles.module.scss";

// export default function Home() {
//   const [isMenuOpen, setIsMenuOpen] = useState(false);

//   const toggleMenu = () => {
//     setIsMenuOpen((prev) => !prev);
//   };

//   return (
//     <>
//       <header>
//         <div className={styles.headerContainer}>
//           <p className={styles.homLogo}>NaDoby.com.ua</p>
//           <Image
//             src={burgerMenu}
//             alt="Меню"
//             className={styles.burgerIcon}
//             onClick={toggleMenu}
//           />
//         </div>
//         <p className={styles.homSlogan}>
//           Подобова аренда в Україні від власників.
//         </p>
//       </header>
//       {isMenuOpen && <NoAutorazeMenu />} {/* Используем компонент NoAutorazeMenu */}
//     </>
//   );
// }


"use client";

import React, { useEffect } from "react";
import Header from "@/app/components/Header"; 
import Search from "./components/Search";
import NewRealty from "./components/NewRealty";
import { useSelector } from "react-redux";


export default function Home() {
  const isAuthenticated = useSelector((state)=> state.isAuthenticated )
  useEffect(()=>{if (isAuthenticated) {
    const token = localStorage.getItem('auth_token')
    (async () => {
      try {
        const response = await fetch('http://localhost:3000/api/v1/auth/me', {
          method: 'POST',
          headers: {
            'Content-Type': 'application/json',
            'Authorization': `${token}`,
            'X-Custom-Header': 'custom-value',
          },
         
        });
    
        if (!response.ok) {
          throw new Error(`HTTP error! Status: ${response.status}`);
        }
    
        const data = await response.json();
        console.log('Отримано:', data);
      } catch (error) {
        console.error('Fetch error:', error);
      }
    })();
  }},[isAuthenticated]
  );
  return (
    <>
      <Header /> 
      {/* <CreateUser/> */}
      <Search/>
      {/* <NewRealty/> */}
    </>
  );
}
