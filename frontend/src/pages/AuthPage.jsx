import { useState } from 'react';
import axios from 'axios';
import { useNavigate } from 'react-router-dom';

// Create an Axios instance for your backend
const api = axios.create({
  baseURL: 'https://movie-reviews-wxai.onrender.com',
  withCredentials: true, // ✅ ensure cookies are sent
});

export default function AuthPage() {
  const [mode, setMode] = useState('login');
  const [username, setUsername] = useState('');
  const [password, setPassword] = useState('');
  const navigate = useNavigate();

  const handleSubmit = async (e) => {
    e.preventDefault();
    const url = `/auth/${mode}`; // Axios instance already has baseURL

    try {
      const response = await api.post(url, { username, password });
      console.log('Logged in user:', response.data.user); // session info
      navigate('/reviews'); // redirect after successful login/register
    } catch (err) {
      alert(err.response?.data?.message || 'Auth failed');
    }
  };

  return (
    <div className="flex items-center justify-center h-screen bg-gray-100">
      <form onSubmit={handleSubmit} className="bg-white p-8 rounded-xl shadow-md w-80">
        <h2 className="text-2xl font-bold mb-4 text-center capitalize">{mode}</h2>
        <input
          type="text"
          placeholder="Username"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <input
          type="password"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          className="w-full mb-4 p-2 border rounded"
        />
        <button type="submit" className="w-full bg-blue-500 text-white py-2 rounded">
          {mode === 'login' ? 'Login' : 'Register'}
        </button>
        <p className="mt-4 text-sm text-center">
          {mode === 'login' ? 'No account?' : 'Already registered?'}{' '}
          <button
            type="button"
            onClick={() => setMode(mode === 'login' ? 'register' : 'login')}
            className="text-blue-500 underline"
          >
            {mode === 'login' ? 'Register here' : 'Login here'}
          </button>
        </p>
      </form>
    </div>
  );
}
