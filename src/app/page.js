

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

import React from "react";
import Header from "@/app/components/Header"; 
import Search from "./components/Search";
import NewRealty from "./components/NewRealty";
// import CreateUser from "./components/CreateUser";

export default function Home() {
  return (
    <>
      <Header /> 
      {/* <CreateUser/> */}
      <Search/>
      {/* <NewRealty/> */}
    </>
  );
}
