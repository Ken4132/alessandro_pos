import { useState } from 'react';
import api from '../services/api';
import { useNavigate } from 'react-router-dom';

function LoginPage() {
    
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleLogin = async (e) => {
    e.preventDefault();

    try {

      const response = await api.post('/auth/login', {
        email,
        password
      });

      localStorage.setItem(
        'token',
        response.data.token
      );

      navigate('/dashboard');

    } catch (error) {

      console.error(error);

      alert('Error en login');
    }
  };

  return (
    <div style={{
      display: 'flex',
      justifyContent: 'center',
      alignItems: 'center',
      height: '100vh'
    }}>
      <form onSubmit={handleLogin}>

        <h1>TRIVIUM POS</h1>

        <input
          type="email"
          placeholder="Correo"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />

        <br /><br />

        <input
          type="password"
          placeholder="Contraseña"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />

        <br /><br />

        <button type="submit">
          Iniciar sesión
        </button>

      </form>
    </div>
  );
}

export default LoginPage;