


"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import NoAutorazeMenu from "@/app/components/NoAutorazeMenu";
import styles from "@/app/styles/Header.styles.module.scss";
import Menu from "./Menu";
import Link from "next/link";

const translations = {
  ua: {
    slogan: "Подобова оренда житла (Квартири, Готелі, Готелі для тварин, Хостели, Будинки, Сауни/Бані, Глемпінг, Пансіонат, Котедж для компній, Коворкінг, Автокемпінг, Бази відпочинку) по всій Україні без посередників.",
    sloganMobile: "Оренда житла по всій Україні без посередників !",
    // menu: "Меню"
  },
  ru: {
    slogan: "Посуточная аренда жилья (Квартиры, Гостиницы, Гостинница для животных, Хостелы, Дома, Сауны/Бани, Глемпинг, Пансионат, Котедж для компаний, Коворкинг, Автокемпінг, Базы отдыха) по всей Украине без посредников.",
    sloganMobile: "Аренда жилья по всей Украине без посредников !",
    // menu: "Меню"
  }
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();
console.log("header",currentLanguage);
  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      {/* Фиксированный хедер */}
      <header className={styles.headerContainer}>
        <h1 className={styles.homLogo}>
          <Link href="/">NaDoby.com.ua</Link>
        </h1>

        <div className={styles.headerDiv}>
          <div 
            className={styles.menuWrapper}
            onClick={toggleMenu}
          >
            <span className={styles.menuText}>{translations[currentLanguage].menu}</span>
            <Image
              src="/burger.svg"
              alt="Меню"
              className={styles.burgerIcon}
              width={24}
              height={24}
            />
          </div>
        </div>
      </header>

      {/* Фиксированный слоган */}
      <div className={styles.sloganFixed}>
        <p className={styles.homSlogan}>
          <span className={styles.desktopSlogan}>
            {translations[currentLanguage].slogan}
          </span>
          <span className={styles.mobileSlogan}>
            {translations[currentLanguage].sloganMobile}
          </span>
        </p>
      </div>

      {/* Отступ под фиксированный header и слоган */}
      <div style={{ height: "140px" }} />

      {isMenuOpen && <Menu />}
    </>
  );
}