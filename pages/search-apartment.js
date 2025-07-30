'use client';
import { LanguageProvider } from "@/app/LanguageContext";

import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";

import Search from "@/app/components/Search";


export default function 
SearchApartment
() {
    return (
      <div>
        <Provider store={store}>
        <LanguageProvider>
           <Header />
          <h1>search-apartment</h1>
         <Search/>
         </LanguageProvider>
         </Provider>
      </div>
    );
  }

 