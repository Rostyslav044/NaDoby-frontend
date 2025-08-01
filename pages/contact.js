'use client';
import { LanguageProvider } from "@/app/LanguageContext";

import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";



export default function SupportContact() {
    return (
      <div>
        <Provider store={store}>
        <LanguageProvider>
           <Header />
       
         <h1>SupportContact</h1>
       
       
         
         </LanguageProvider>
         </Provider>
      </div>
    );
  }