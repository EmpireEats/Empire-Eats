import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { login, logout } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router'; // 1st change

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate(); // 2nd change

  const handleLogin = async (e) => {
    e.preventDefault();
    dispatch(login({ email, password }));
    navigate('/yerrr'); // 3rd change
  };

  const handleLogout = (e) => {
    e.preventDefault();
    dispatch(logout());
  };

  return (
    <form>
      <input
        type='email'
        value={email}
        onChange={(e) => setEmail(e.target.value)}
      />
      <input
        type='password'
        value={password}
        onChange={(e) => setPassword(e.target.value)}
      />
      <button onClick={handleLogin}>Login</button>
      <button onClick={handleLogout}>Logout</button>
    </form>
  );
};

export default Login;
