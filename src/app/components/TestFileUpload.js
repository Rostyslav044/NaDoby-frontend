// import React, { useState } from 'react';

// export default function TestFileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Пожалуйста, выберите файл');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage(`Успех! Файл загружен.`);
//       } else {
//         setMessage(`Ошибка: ${data.message || 'Что-то пошло не так'}`);
//       }
//     } catch (error) {
//       setMessage('Ошибка при загрузке файла');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
//       <h2>Тест загрузки файла</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginTop: 10 }}>
//         Загрузить
//       </button>
//       {message && <p>{message}</p>}
//     </div>
//   );
// }




// 'use client';

// import React, { useState } from 'react';

// export default function TestFileUpload() {
//   const [file, setFile] = useState(null);
//   const [message, setMessage] = useState('');
//   const [url, setUrl] = useState('');

//   const handleFileChange = (e) => {
//     setFile(e.target.files[0]);
//   };

//   const handleUpload = async () => {
//     if (!file) {
//       setMessage('Пожалуйста, выберите файл');
//       return;
//     }

//     const formData = new FormData();
//     formData.append('file', file);

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Файл загружен!');
//         setUrl(data.url);
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Ошибка при загрузке');
//     }
//   };

//   return (
//     <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
//       <h2>Тест загрузки файла</h2>
//       <input type="file" onChange={handleFileChange} />
//       <button onClick={handleUpload} style={{ marginTop: 10 }}>
//         Загрузить
//       </button>
//       {/* {/* {message && <p>{message}</p>} */}
//       {url && ( */}
//         {/* // <>
//         //   <p>📸 Превью:</p>
//         //   <img src={url} alt="Загруженное фото" width="100%" />
//         // </> */}
//       {/* )} */}
//     </div>
//   );
// }




'use client';

import React, { useState } from 'react';

export default function TestFileUpload() {
  const [file, setFile] = useState(null);
  const [message, setMessage] = useState('');

  const handleFileChange = (e) => {
    setFile(e.target.files[0]);
  };

  const handleUpload = async () => {
    if (!file) {
      setMessage('Пожалуйста, выберите файл');
      return;
    }

    const formData = new FormData();
    formData.append('file', file);

    try {
      const res = await fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Файл загружен!');
      } else {
        setMessage(`❌ Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Ошибка при загрузке');
    }
  };

  return (
    <div style={{ maxWidth: 400, margin: 'auto', padding: 20 }}>
      <h2>Тест загрузки файла</h2>
      <input type="file" onChange={handleFileChange} />
      <button onClick={handleUpload} style={{ marginTop: 10 }}>
        Загрузить
      </button>
      {message && <p>{message}</p>}
    </div>
  );
}
