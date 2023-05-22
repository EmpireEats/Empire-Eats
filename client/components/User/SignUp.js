import React, { useState } from 'react';
import Modal from 'react-modal';
import { useDispatch } from 'react-redux';
import { signup } from '../../redux/actions/authActions';
import { useNavigate } from 'react-router';

const SignUp = () => {
  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [confirmPassword, setConfirmPassword] = useState('');
  const [firstName, setFirstName] = useState('');
  const [lastName, setLastName] = useState('');
  const [username, setUsername] = useState('');
  const [image, setImage] = useState(null);
  const [isModalOpen, setIsModalOpen] = useState(false);
  const [showPassword, setShowPassword] = useState(false); 

  Modal.setAppElement('#root');
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

    if (password !== confirmPassword) {
      alert('Passwords do not match. Please re-enter your password.');
      return;
    }

    const passwordRegex = /^(?=.*[!@#$%^&*])[\w!@#$%^&*]{8,}$/;
      if (!passwordRegex.test(password)) {
        alert('Password should be at least 8 characters long and contain at least one special character.');
        return; 
      }

    dispatch(
      signup({
        email,
        password,
        firstName,
        lastName,
        username,
        image,
      })).then ((result) => {
        if (result.meta.requestStatus === 'fulfilled')
        {
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

  const handleModalToggle = () => {
    setIsModalOpen(!isModalOpen);
  };

  const handlePasswordVisibility = () => {
    setShowPassword(!showPassword);
  };

  const handleImageChange = (e) => {
    setImage(e.target.files[0]);
  };

  return (
    <div style={{ display: 'flex', flexDirection: 'column' }}>
      <Modal 
        className='weOutside-modal'
        overlayClassName='weOutside-modal-overlay'
        isOpen={isModalOpen}
        onRequestClose={handleModalToggle}
        contentLabel='Sign Up Instructions'
        >
          <div
            style={{
              padding: '20px',
              borderRadius: '4px',
              maxWidth: '600px',
            }}
          >
            <h2>Welcome to Empire Eats🍴</h2>
            <p>
              Empire Eats is a unique culinary social platform that allows users to share and discover dishes from various eateries and meet fellow foodies. </p>
              <p> By signing up, you can unlock all the app features.
            </p>
            <p>Don't miss out on the opportunity to connect with like-minded food enthusiasts and satisfy your taste buds!</p>
            <button onClick={handleModalToggle}>Close</button>
          </div>
        </Modal>

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
        <div className='form-group'>
          <input
            type='text'
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder='Username'
            className='form-input'
            required
          />
        </div>
        <div className='form-group'>
          <label className='password-label' htmlFor='password'>Minimum 8 characters with 1 symbol (!@#$%^&*)</label>
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
            className='visibility-icon'
          >
            {showPassword ? <i className="fas fa-eye-slash"></i> : <i className="fas fa-eye"></i>}
          </button>
        </div>
       </div>
      </div>
      </div>
        <div className='form-image'>
          <label className='password-label' htmlFor='password'>Profile Picture:</label>
          <br/>
          <input 
          type="file" 
          accept="image/*"
          onChange={handleImageChange}
          required 
        />
        </div>
          <button type='submit' className='form-button'>Sign Up</button>
      </form>
      <div className='signup-link'>
     <button onClick={handleModalToggle}>i</button>
     </div>
    </div>
  </div>
  );
};


export default SignUp;
