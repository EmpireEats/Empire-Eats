import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);

  const handleLogin = (e) => {
    e.preventDefault();

    const form = e.target;
    if (form.checkValidity()) {
      if (!email.trim() && !password.trim()) {
        alert('Please enter both email and password.');
        return;
      }

      if (!email.trim()) {
        alert('Please enter a valid email.');
        return;
      }

      if (!password.trim()) {
        alert('Please enter a password.');
        return;
      }

      dispatch(login({ email, password })).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setEmail('');
          setPassword('');
          navigate('/leaderboard');
        } else if (result.meta.requestStatus === 'rejected') {
          const error = result.error;
          if (error?.message) {
            alert('Invalid email or password. Please check your credentials and try again.');
          }
        }
      });
    } else {
      form.reportValidity();
    }
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <div style={{ marginBottom: '10px', textAlign: 'left' }}>
        <h4 style={{ margin: 0 }}>Log In</h4>
      </div>
      <form onSubmit={handleLogin} style={{ display: 'flex' }}>
        <input
          type="email"
          name="email"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <div style={{ position: 'relative', marginRight: '3px' }}>
          <input
            type={showPassword ? 'text' : 'password'}
            name="password"
            placeholder="Password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
          />
          <button
            type="button"
            onClick={handlePasswordVisibility}
            style={{
              position: 'absolute',
              top: '50%',
              right: '2px',
              transform: 'translateY(-50%)',
              background: 'none',
              border: 'none',
              cursor: 'pointer',
              outline: 'none',
            }}
          >
            {showPassword ? (
              <i className="fas fa-eye-slash"></i>
            ) : (
              <i className="fas fa-eye"></i>
            )}
          </button>
        </div>
        <button type="submit">Sign in</button>
      </form>
      <div style={{ marginTop: '10px', textAlign: 'right' }}>
        <Link to="/signup" style={{ textDecoration: 'none' }}>
          Sign Up
        </Link>
      </div>
    </div>
  );
};

export default Login;