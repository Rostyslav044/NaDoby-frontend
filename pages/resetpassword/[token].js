// pages/change-password.js
import { useRouter } from 'next/router';
import { useState } from 'react';
import axios from 'axios';


export default function ResetPassword() {
  const [formData, setFormData] = useState({
    // currentPassword: '',
    newPassword: '',
    confirmPassword: ''
  });
  const router = useRouter();
  const { token } = router.query;

  const handleChange = (e) => {
    setFormData({
      ...formData,
      [e.target.name]: e.target.value
    });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    // Проверка совпадения паролей
    if (formData.newPassword !== formData.confirmPassword) {
      alert('Новые пароли не совпадают!');
      return;
    }
    const resetPassword =   async function resetPassword(token, newPassword) {
  try {
    const response = await axios.put(`http://localhost:3000/api/v1/auth/resetpassword/${token}`, {
      password: newPassword,
    });

    console.log("Password reset success:", response.data);
      router.push('/');
    return response.data;
  } catch (error) {
    if (error.response) {
      console.error("Error:", error.response.data);
      throw new Error(error.response.data.error || "Password reset failed");
    } else {
      console.error("Network error:", error.message);
      throw new Error("Network error");
    }
  }
}
    resetPassword(token, formData.newPassword)
    
    // Здесь обычно отправка данных на сервер
    console.log('Данные для смены пароля:', formData);
    alert('Пароль успешно изменен!');
  };

  return (
    <div style={{ maxWidth: '400px', margin: '50px auto', padding: '20px' }}>
      <h1>Смена пароля</h1>
      <form onSubmit={handleSubmit}>
        {/* <div style={{ marginBottom: '15px' }}>
          <label>Текущий пароль:</label>
          <input
            type="password"
            name="currentPassword"
            value={formData.currentPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div> */}

        <div style={{ marginBottom: '15px' }}>
          <label>Новый пароль:</label>
          <input
            type="password"
            name="newPassword"
            value={formData.newPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <div style={{ marginBottom: '15px' }}>
          <label>Подтвердите новый пароль:</label>
          <input
            type="password"
            name="confirmPassword"
            value={formData.confirmPassword}
            onChange={handleChange}
            required
            style={{ width: '100%', padding: '8px', marginTop: '5px' }}
          />
        </div>

        <button
          type="submit"
          style={{
            width: '100%',
            padding: '10px',
            backgroundColor: '#0070f3',
            color: 'white',
            border: 'none',
            borderRadius: '5px'
          }}
        >
          Сменить пароль
        </button>
      </form>
    </div>
  );
}