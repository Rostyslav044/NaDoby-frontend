// 'use client';

// import { LanguageProvider } from "@/app/LanguageContext";

// import Header from "@/app/components/Header";
// import { store } from "@/app/store";
// import { Provider, useSelector } from "react-redux";
// import Apartments from "@/app/components/Apartments";
// import { useEffect ,useState} from "react";


// export default function 
// MyListings
// () {
//   const [profile,setProfile]=useState(null);
//   useEffect(()=>{
// setProfile(JSON.parse(localStorage.getItem('user_profile')));

//   },[])
// if(profile){
// console.log(profile
// )

// }
//     return (
//       <div>
//         <Provider store={store}>
//         <LanguageProvider>
//            <Header />
       
//          <h1>my-listings</h1>
       
       
//        {profile&&<Apartments userId={profile._id}/>}  
//          </LanguageProvider>
//          </Provider>
//       </div>
//     );
//   }


'use client';
import { LanguageProvider } from "@/app/LanguageContext";
import Header from "@/app/components/Header";
import { store } from "@/app/store";
import { Provider } from "react-redux";
import Apartments from "@/app/components/Apartments";
import { useEffect, useState } from "react";

export default function MyListings() {
  const [profile, setProfile] = useState(null);
  
  useEffect(() => {
    const userProfile = localStorage.getItem('user_profile');
    if (userProfile) {
      setProfile(JSON.parse(userProfile));
    }
  }, []);

  return (
    <div>
      <Provider store={store}>
        <LanguageProvider>
          <Header />
          <h1>Мои объявления</h1>
          {profile && (
            <Apartments 
              userId={profile._id} 
              showActions={true} // ← ВАЖНО: передаем showActions=true
            />
          )}  
        </LanguageProvider>
      </Provider>
    </div>
  );
}
 