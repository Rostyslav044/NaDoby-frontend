// 'use client';

// import React, { useState } from 'react';

// export default function FileUploadSlider() {
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages([...images, ...newImages]);
//   };

//   const handleUpload = async () => {
//     if (images.length === 0) {
//       setMessage('Пожалуйста, выберите файл(ы)');
//       return;
//     }

//     const formData = new FormData();
//     images.forEach((imgObj) => {
//       formData.append('files', imgObj.file); // может быть 'file' в зависимости от бэка
//     });

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Файлы загружены!');
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Ошибка при загрузке');
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(updatedImages.length - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 500, margin: 'auto', padding: 20, textAlign: 'center' }}>
//       <h2>Загрузка файлов</h2>

//       <input type="file" multiple accept="image/*" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload} style={{ marginTop: 10 }}>
//         Загрузить
//       </button>

//       {images.length > 0 && (
//         <div style={{ marginTop: 20 }}>
//           <div style={{ position: 'relative', height: 300 }}>
//             <img
//               src={images[currentIndex].preview}
//               alt={`preview-${currentIndex}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'contain',
//                 borderRadius: '10px',
//                 boxShadow: '0 4px 12px rgba(0, 0, 0, 0.2)',
//               }}
//             />
//             <button
//               onClick={() => handleDelete(currentIndex)}
//               style={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 backgroundColor: 'red',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '50%',
//                 width: 30,
//                 height: 30,
//                 cursor: 'pointer',
//               }}
//             >
//               ✕
//             </button>
//           </div>

//           <div style={{ marginTop: 10 }}>
//             <button onClick={handlePrev} disabled={currentIndex === 0}>
//               ◀
//             </button>
//             <span style={{ margin: '0 10px' }}>
//               {currentIndex + 1} / {images.length}
//             </span>
//             <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
//               ▶
//             </button>
//           </div>
//         </div>
//       )}

//       {message && <p style={{ marginTop: 20 }}>{message}</p>}
//     </div>
//   );
// }




// 'use client';

// import React, { useState } from 'react';
// import Logo from './Logo'; // ✅ Импорт логотипа

// export default function FileUploadSlider() {
//   const [images, setImages] = useState([]);
//   const [message, setMessage] = useState('');
//   const [currentIndex, setCurrentIndex] = useState(0);

//   const handleFileChange = (e) => {
//     const files = Array.from(e.target.files);
//     const newImages = files.map((file) => ({
//       file,
//       preview: URL.createObjectURL(file),
//     }));
//     setImages([...newImages, ...images]);
//     setCurrentIndex(0);
//   };

//   const handleUpload = async () => {
//     if (images.length === 0) {
//       setMessage('Пожалуйста, выберите файл(ы)');
//       return;
//     }

//     const formData = new FormData();
//     images.forEach((imgObj) => {
//       formData.append('files', imgObj.file);
//     });

//     try {
//       const res = await fetch('http://localhost:3000/api/v1/upload', {
//         method: 'POST',
//         body: formData,
//       });

//       const data = await res.json();

//       if (res.ok) {
//         setMessage('✅ Файлы загружены!');
//       } else {
//         setMessage(`❌ Ошибка: ${data.error}`);
//       }
//     } catch (err) {
//       console.error(err);
//       setMessage('❌ Ошибка при загрузке');
//     }
//   };

//   const handleDelete = (index) => {
//     const updatedImages = [...images];
//     updatedImages.splice(index, 1);
//     setImages(updatedImages);
//     if (currentIndex >= updatedImages.length) {
//       setCurrentIndex(updatedImages.length - 1);
//     }
//   };

//   const handleNext = () => {
//     if (currentIndex < images.length - 1) {
//       setCurrentIndex(currentIndex + 1);
//     }
//   };

//   const handlePrev = () => {
//     if (currentIndex > 0) {
//       setCurrentIndex(currentIndex - 1);
//     }
//   };

//   return (
//     <div style={{ maxWidth: 700, margin: 'auto', padding: 20, textAlign: 'center' }}>
//       <h2>Загрузка файлов</h2>

//       <input type="file" multiple accept="image/*" onChange={handleFileChange} />
//       <br />
//       <button onClick={handleUpload} style={{ marginTop: 10 }}>
//         Загрузить
//       </button>

//       {images.length > 0 && (
//         <div style={{ marginTop: 30 }}>
//           <div style={{ position: 'relative', height: 600 }}>
//             {/* Логотип поверх изображения */}
//             <div style={{ position: 'absolute', top: 10, left: 10, zIndex: 2 }}>
//               <Logo />
//             </div>

//             <img
//               src={images[currentIndex].preview}
//               alt={`preview-${currentIndex}`}
//               style={{
//                 width: '100%',
//                 height: '100%',
//                 objectFit: 'contain',
//                 borderRadius: '12px',
//                 boxShadow: '0 8px 24px rgba(0, 0, 0, 0.2)',
//               }}
//             />

//             <button
//               onClick={() => handleDelete(currentIndex)}
//               style={{
//                 position: 'absolute',
//                 top: 10,
//                 right: 10,
//                 backgroundColor: '#d32f2f',
//                 color: '#fff',
//                 border: 'none',
//                 borderRadius: '50%',
//                 width: 32,
//                 height: 32,
//                 fontWeight: 'bold',
//                 fontSize: 16,
//                 cursor: 'pointer',
//                 zIndex: 2,
//               }}
//             >
//               ×
//             </button>
//           </div>

//           <div style={{ marginTop: 15 }}>
//             <button onClick={handlePrev} disabled={currentIndex === 0}>
//               ◀
//             </button>
//             <span style={{ margin: '0 12px' }}>
//               {currentIndex + 1} / {images.length}
//             </span>
//             <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
//               ▶
//             </button>
//           </div>
//         </div>
//       )}

//       {message && <p style={{ marginTop: 20 }}>{message}</p>}
//     </div>
//   );
// }




'use client';

import React, { useState } from 'react';
import Logo from './Logo'; // ✅ Импорт логотипа

export default function FileUploadSlider() {
  const [images, setImages] = useState([]);
  const [message, setMessage] = useState('');
  const [currentIndex, setCurrentIndex] = useState(0);

  const handleFileChange = (e) => {
    const files = Array.from(e.target.files);
    const newImages = files.map((file) => ({
      file,
      preview: URL.createObjectURL(file),
    }));
    setImages([...newImages, ...images]); // Новые фото сверху
    setCurrentIndex(0);
  };

  const handleUpload = async () => {
    if (images.length === 0) {
      setMessage('Пожалуйста, выберите файл(ы)');
      return;
    }

    const formData = new FormData();
    images.forEach((imgObj) => {
      formData.append('files', imgObj.file);
    });

    try {
      const res = await fetch('http://localhost:3000/api/v1/upload', {
        method: 'POST',
        body: formData,
      });

      const data = await res.json();

      if (res.ok) {
        setMessage('✅ Файлы загружены!');
      } else {
        setMessage(`❌ Ошибка: ${data.error}`);
      }
    } catch (err) {
      console.error(err);
      setMessage('❌ Ошибка при загрузке');
    }
  };

  const handleDelete = (index) => {
    const updatedImages = [...images];
    updatedImages.splice(index, 1);
    setImages(updatedImages);
    if (currentIndex >= updatedImages.length) {
      setCurrentIndex(updatedImages.length - 1);
    }
  };

  const handleNext = () => {
    if (currentIndex < images.length - 1) {
      setCurrentIndex(currentIndex + 1);
    }
  };

  const handlePrev = () => {
    if (currentIndex > 0) {
      setCurrentIndex(currentIndex - 1);
    }
  };

  return (
    <div style={{ maxWidth: 800, margin: 'auto', padding: 20, textAlign: 'center' }}>
      <h2>Загрузка файлов</h2>

      <input type="file" multiple accept="image/*" onChange={handleFileChange} />
      <br />
      <button onClick={handleUpload} style={{ marginTop: 10 }}>
        Загрузить
      </button>

      {images.length > 0 && (
        <div style={{ marginTop: 30 }}>
          <div style={{ position: 'relative', height: 600 }}>
            {/* Отображение изображения */}
            <img
              src={images[currentIndex].preview}
              alt={`preview-${currentIndex}`}
              style={{
                width: '100%',
                height: '100%',
                objectFit: 'cover',
                borderRadius: '12px',
                boxShadow: '0 8px 24px rgba(0, 0, 0, 0.3)',
              }}
            />

            {/* Кнопка удаления */}
            <button
              onClick={() => handleDelete(currentIndex)}
              style={{
                position: 'absolute',
                top: 10,
                right: 10,
                backgroundColor: '#d32f2f',
                color: '#fff',
                border: 'none',
                borderRadius: '50%',
                width: 32,
                height: 32,
                fontWeight: 'bold',
                fontSize: 16,
                cursor: 'pointer',
                zIndex: 2,
              }}
            >
              ×
            </button>

            {/* Логотип как водяной знак */}
            <div
              style={{
                position: 'absolute',
                bottom: 10,
                // right: 10,
                zIndex: 2,
                // opacity: 0.4,
                width: 120,
                height: 'auto',
              }}
            >
              <Logo />
            </div>
          </div>

          {/* Кнопки переключения */}
          <div style={{ marginTop: 15 }}>
            <button onClick={handlePrev} disabled={currentIndex === 0}>
              ◀
            </button>
            <span style={{ margin: '0 12px' }}>
              {currentIndex + 1} / {images.length}
            </span>
            <button onClick={handleNext} disabled={currentIndex === images.length - 1}>
              ▶
            </button>
          </div>
        </div>
      )}

      {message && <p style={{ marginTop: 20 }}>{message}</p>}
    </div>
  );
}
