import React, { useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { login } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';
import { Link } from 'react-router-dom';

const Login = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
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

  return (
    <div className="login-container">
      <div className="login-heading">
        <h4>Log In</h4>
      </div>
      <form className="login-form" onSubmit={handleLogin}>
        <input
          type="email"
          name="email"
          className="form-input"
          placeholder="Email"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
        />
        <input
          type="password"
          name="password"
          className="form-input"
          placeholder="Password"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
        />
        <button type="submit" className="form-button">Sign in</button>
      </form>
      <div className="signup-link">
        <Link to="/signup" style={{ textDecoration: 'none' }}>Sign Up</Link>
      </div>
    </div>
  );
  
  }
export default Login;