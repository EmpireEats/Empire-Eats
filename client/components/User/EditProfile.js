import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { getLoggedInUserData, fetchSingleUser, editUser } from '../../redux/actions/authActions';

const EditProfile = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();
    const auth = useSelector((state) => state.auth);
    const user = auth.user;
    const id = user ? user.id: null;
    const [formData, setFormData] = useState({
      firstName: '',
      lastName: '',
      email: '',
      username: '',
      password: '',
    });
    const [loading, setLoading] = useState(false);
    const [error, setError] = useState('');
    
    useEffect(() => {
        dispatch(getLoggedInUserData())
        .then(() => {
          const updatedUser = auth.user;
          if (updatedUser) {
            setFormData({
              firstName: updatedUser.firstName,
              lastName: updatedUser.lastName,
              email: updatedUser.email,
              username: updatedUser.username,
              password: updatedUser.password,
            });
          }
        });
    }, [dispatch, id]);

    useEffect(() => {
        if (user) {
          setFormData((prevFormData) => ({
            ...prevFormData,
            firstName: user.firstName,
            lastName: user.lastName,
            email: user.email,
            username: user.username,
          }));
        }
    }, [user]);

    const handleBackToProfile = () => {
        if (id !== null) {
            navigate(`/users/${id}`);
        }
    };

    const handleEditProfile = (event) => {
        event.preventDefault();
        setLoading(true);
        setError('');

        dispatch(editUser ({ id, ...formData }))
          .then(() => {
            setLoading(false);
            dispatch(fetchSingleUser(id));
            alert('Updates have been saved successfully!');
          })
          .catch((error) => {
            setLoading(false);
            setError('Failed to save updates. Please try again.');
            console.error(error);
          });
    };

    const handleChange = (event) => {
      const { name, value } = event.target;
      setFormData((prevFormData) => ({
        ...prevFormData,
        [name]: value
      }));
    };

  return (
    <>
      <div style={{ display: 'flex', justifyContent: 'space-between' }}>
        <button type='button' onClick={handleBackToProfile}>
          Back to Profile
        </button>
        <div>
          <button type='submit' onClick={handleEditProfile} disabled={loading}>
            {loading ? 'Saving...' : 'Edit Profile'}
          </button>
        </div>
      </div>
      <div>
        <img
          src='https://ih1.redbubble.net/image.1046392278.3346/mp,840x830,matte,f8f8f8,t-pad,1000x1000,f8f8f8.jpg'
          width={100}
          alt='Profile'
        />
        <p>{formData.firstName} {formData.lastName}</p>
        {error && <p>{error}</p>}
        <form>
                <div>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                        type='text'
                        id='firstName'
                        name='firstName'
                        value={formData.firstName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='lastName'>Last Name:</label>
                    <input
                        type='text'
                        id='lastName'
                        name='lastName'
                        value={formData.lastName}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='email'
                        id='email'
                        name='email'
                        value={formData.email}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='username'>User Name:</label>
                    <input
                        type='text'
                        id='username'
                        name='username'
                        value={formData.username}
                        onChange={handleChange}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='password'
                        id='password'
                        name='password'
                        value={formData.password}
                        onChange={handleChange}
                    />
                </div>
        </form>
      </div>
    </>
  );
};

export default EditProfile;