import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [isAdmin, setIsAdmin] = useState(false);
  const [adminPassphrase, setAdminPassphrase] = useState('');
  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    if (form.checkValidity()) {
      if (!firstName.trim() && !lastName.trim() && !email.trim() && !username.trim() && !password.trim()) {
      alert('Please fill in all the required fields.');
      return;
    }

    dispatch(
      signup({
        email,
        password,
        firstName,
        lastName,
        username,
        isAdmin,
        adminPassphrase,
      })).then ((result) => {
        if (result.meta.requestStatus === 'fulfilled')
        {
          setEmail('');
          setPassword('');
          setFirstName('');
          setLastName('');
          setUsername('');
          setPassword('');
          navigate('/leaderboard');
        } else if (result.meta.requestStatus === 'rejected') {
          const error = result.error;
          if (error?.message) {
            alert('An error occured during signup. Please try again.')
          }
        }
      });
    } else {
      form.reportValidity();
    }
  };

  return (
  <div className="signup-container">
    <form className="signup-form" onSubmit={handleSignUp}>
      <div className="form-group">
        <label htmlFor="firstName">First Name:</label>
        <input
          type="text"
          id="firstName"
          className="form-input"
          value={firstName}
          onChange={(e) => setFirstName(e.target.value)}
          placeholder="First Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="lastName">Last Name:</label>
        <input
          type="text"
          id="lastName"
          className="form-input"
          value={lastName}
          onChange={(e) => setLastName(e.target.value)}
          placeholder="Last Name"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="email">Email:</label>
        <input
          type="email"
          id="email"
          className="form-input"
          value={email}
          onChange={(e) => setEmail(e.target.value)}
          placeholder="Email"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="username">Username:</label>
        <input
          type="text"
          id="username"
          className="form-input"
          value={username}
          onChange={(e) => setUsername(e.target.value)}
          placeholder="Username"
          required
        />
      </div>
      <div className="form-group">
        <label htmlFor="password">Password:</label>
        <input
          type="password"
          id="password"
          className="form-input"
          value={password}
          onChange={(e) => setPassword(e.target.value)}
          placeholder="Password"
          required
        />
      </div>

      <div className="form-group-admin">
        <label>
          Admin
          <input
            type="checkbox"
            checked={isAdmin}
            onChange={(e) => setIsAdmin(e.target.checked)}
          />
        </label>
      </div>

      <div className="form-group">
        <label htmlFor="adminPassphrase">Admin Passphrase:</label>
        <input
          type="text"
          id="adminPassphrase"
          className="form-input"
          value={adminPassphrase}
          onChange={(e) => setAdminPassphrase(e.target.value)}
        />
      </div>

      <button type="submit" className="form-button">Sign Up</button>
    </form>
  </div>
);
}

export default SignUp;
