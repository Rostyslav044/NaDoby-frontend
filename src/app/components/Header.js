




"use client";

import React, { useState } from "react";
import { useLanguage } from "@/app/LanguageContext";
import Image from "next/image";
import NoAutorazeMenu from "@/app/components/NoAutorazeMenu";
import styles from "@/app/styles/Header.styles.module.scss";
import Menu from "./Menu";
import Link from "next/link";

const translations = {
  ua: "Подобова оренда житла (Квартири, Готелі, Готелі для тварин, Хостели, Будинки, Сауни/Бані, Глемпінг, Пансіонат, Котедж для компній, Коворкінг, Автокемпінг, Бази відпочинку) по всій Україні без посередників.",
  ru: "Посуточная аренда жилья (Квартиры, Гостиницы, Гостинница для животных, Хостелы, Дома, Сауны/Бани, Глемпинг, Пансионат, Котедж для компаний, Коворкинг, Автокемпинг, Базы отдыха) по всей Украине без посредников.",
};

export default function Header() {
  const [isMenuOpen, setIsMenuOpen] = useState(false);
  const { currentLanguage } = useLanguage();

  const toggleMenu = () => setIsMenuOpen(prev => !prev);

  return (
    <>
      {/* Фиксированный хедер */}
      <header className={styles.headerContainer}>
        <h1 className={styles.homLogo}>
          <Link href="/">NaDoby.com.ua</Link>
        </h1>

        <div className={styles.headerDiv}>
          <Image
            src="/burger.svg"
            alt="Меню"
            className={styles.burgerIcon}
            onClick={toggleMenu}
            width={24}
            height={24}
            style={{ cursor: "pointer" }}
          />
        </div>
      </header>

      {/* Фиксированный слоган */}
      <div className={styles.sloganFixed}>
        <p className={styles.homSlogan}>{translations[currentLanguage]}</p>
      </div>

      {/* Отступ под фиксированный header и слоган */}
      <div style={{ height: "140px" }} />

      {isMenuOpen && <Menu />}
    </>
  );
}

