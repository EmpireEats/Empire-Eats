import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';
import Button from '@mui/material/Button';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [showPassword, setShowPassword] = useState(false);
  const [selectedFile, setSelectedFile] = useState(null);

  const dispatch = useDispatch();
  const navigate = useNavigate();

  const handleSignUp = (e) => {
    e.preventDefault();

    const form = e.target;
    if (form.checkValidity()) {
      if (
        !firstName.trim() &&
        !lastName.trim() &&
        !email.trim() &&
        !username.trim() &&
        !password.trim()
      ) {
        alert('Please fill in all the required fields.');
        return;
      }

      if (password !== confirmPassword) {
        alert('Passwords do not match. Please re-enter your password.');
        return;
      }

      const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert(
          'Password should be at least 8 characters long and contain at least one special character.'
        );
        return;
      }

      // if (username.length > 10) {
      //   alert('Username should not exceed 10 characters.');
      //   return;
      // }

      dispatch(
        signup({
          email,
          password,
          firstName,
          lastName,
          username,
          image,
        })
      ).then((result) => {
        if (result.meta.requestStatus === 'fulfilled') {
          setEmail('');
          setPassword('');
          setConfirmPassword('');
          setFirstName('');
          setLastName('');
          setUsername('');
          setImage(null);
          navigate('/leaderboard');
        } else if (result.meta.requestStatus === 'rejected') {
          const error = result.error;
          if (error?.message) {
            alert('An error occurred during signup. Please try again.');
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

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
    setSelectedFile(e.target.files[0].name);
  };

  return (
    <div>
      <div className='login-container'>
        <div className='login-heading'>
          <h4>Sign Up</h4>
        </div>

        <form className='login-form' onSubmit={handleSignUp}>
          <div className='form-group'>
            <input
              type='text'
              value={firstName}
              onChange={(e) => setFirstName(e.target.value)}
              placeholder='First Name'
              className='form-input'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='text'
              value={lastName}
              onChange={(e) => setLastName(e.target.value)}
              placeholder='Last Name'
              className='form-input'
              required
            />
          </div>
          <div className='form-group'>
            <input
              type='email'
              value={email}
              onChange={(e) => setEmail(e.target.value)}
              placeholder='Email'
              className='form-input'
              required
            />
          </div>
          <label className='password-label' htmlFor='password'>
            4 - 10 characters
          </label>
          <div className='form-group'>
            <input
              type='text'
              value={username}
              onChange={(e) => setUsername(e.target.value)}
              placeholder='Username'
              className='form-input'
              maxLength={10}
              required
            />
          </div>
          <div className='form-group'>
            <label className='password-label' htmlFor='password'>
            Minimum 8 characters<br/>with 1 symbol (!@#$%^&*)
            </label>
            <div className='inside-group'>
              <input
                type={showPassword ? 'text' : 'password'}
                value={password}
                minLength='8'
                onChange={(e) => setPassword(e.target.value)}
                placeholder='Password'
                className='form-input'
                required
              />
              <div className='form-group'>
                <div className='inside-group'>
                  <input
                    type={showPassword ? 'text' : 'password'}
                    value={confirmPassword}
                    onChange={(e) => setConfirmPassword(e.target.value)}
                    placeholder='Confirm Password'
                    className='form-input'
                    required
                  />
                  <button
                    type='button'
                    onClick={handlePasswordVisibility}
                    className='visibility-icon'>
                    {showPassword ? (
                      <i className='fas fa-eye-slash'></i>
                    ) : (
                      <i className='fas fa-eye'></i>
                    )}
                  </button>
                </div>
              </div>
            </div>
          </div>
          <div className='form-image'>
            <label className='password-label' htmlFor='password'>
              Profile Picture:
            </label>
            <br />
            <input
              id='image'
              type='file'
              accept='image/*'
              onChange={handleImageChange}
              required
              style={{ display: 'none' }}
            />
            <label htmlFor='image'>
              <Button
                variant='outlined'
                component='span'
                sx={{
                  color: '#9C94B1',
                  borderColor: '#9C94B1',
                  '&:hover': {
                    backgroundColor: '#9C94B1',
                    color: '#fff',
                    borderColor: 'white',
                  },
                }}>
                Upload Image
              </Button>
            </label>
            {selectedFile && <p>Selected file: {selectedFile}</p>}
          </div>
          <button type='submit' className='form-button'>
            Sign Up
          </button>
        </form>
        <div className='signup-link'></div>
      </div>
    </div>
  );
};

export default SignUp;
