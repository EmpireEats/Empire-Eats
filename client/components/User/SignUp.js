import React, { useState } from 'react';
import Modal from 'react-modal';
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
  const [isModalOpen, setIsModalOpen] = useState(false);
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
            alert('An error occurred during signup. Please try again.')
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

      <div style={{ marginBottom: '10px', textAlign: 'left' }}>
        <h4 style={{ margin: 0 }}>Sign Up</h4>
      </div>

      <form onSubmit={handleSignUp}>
        <div>
          <label>First Name:  </label>
          <input
            type="text"
            value={firstName}
            onChange={(e) => setFirstName(e.target.value)}
            placeholder="First Name"
            required
          />
        </div>
        <div>
          <label>Last Name:  </label>
          <input
            type="text"
            value={lastName}
            onChange={(e) => setLastName(e.target.value)}
            placeholder="Last Name"
            required
          />
        </div>
        <div>
          <label>Email:  </label>
          <input
            type="email"
            value={email}
            onChange={(e) => setEmail(e.target.value)}
            placeholder="Email"
            required
          />
        </div>
        <div>
          <label>Username:  </label>
          <input
            type="text"
            value={username}
            onChange={(e) => setUsername(e.target.value)}
            placeholder="Username"
            required
          />
        </div>
        <div>
          <label>Password:  </label>
          <input
            type="password"
            value={password}
            onChange={(e) => setPassword(e.target.value)}
            placeholder="Password"
            required
          />
        </div>

        <div style={{ display: 'flex', alignItems: 'center' }}>
          <label style={{ marginRight: '10px' }}>
            Admin
            <input
              type="checkbox"
              checked={isAdmin}
              onChange={(e) => setIsAdmin(e.target.checked)}
            />
          </label>
          <label>
            Admin Passphrase  
            <input
              type="text"
              value={adminPassphrase}
              onChange={(e) => setAdminPassphrase(e.target.value)}
            />
          </label>
        </div>

        <button type="submit">Sign Up</button>
      </form>
      <div style={{ display: 'flex', justifyContent: 'center', paddingTop: '2px' }}>
     <button onClick={handleModalToggle} style={{ width: '30px' }}>i</button>
     </div>
    </div>
  );
};

export default SignUp;
