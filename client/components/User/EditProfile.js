import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import {
  getLoggedInUserData,
  fetchSingleUser,
  editUser,
} from '../../redux/actions/authActions';
import Avatar from '@mui/material/Avatar';
import Button from '@mui/material/Button';
import TextField from '@mui/material/TextField';
import Typography from '@mui/material/Typography';
import CircularProgress from '@mui/material/CircularProgress';
import Box from '@mui/material/Box';

const EditProfile = () => {
  const dispatch = useDispatch();
  const navigate = useNavigate();
  const auth = useSelector((state) => state.auth);
  const user = auth.user;
  const id = user ? user.id : null;
  const [formData, setFormData] = useState({
    firstName: '',
    lastName: '',
    username: '',
  });
  const [loading, setLoading] = useState(false);
  const [error, setError] = useState('');

  useEffect(() => {
    dispatch(getLoggedInUserData()).then(() => {
      const updatedUser = auth.user;
      if (updatedUser) {
        setFormData({
          firstName: updatedUser.firstName,
          lastName: updatedUser.lastName,
          username: updatedUser.username,
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

    dispatch(editUser({ id, ...formData }))
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
      [name]: value,
    }));
  };

  return (
    <Box
      sx={{
        display: 'flex',
        flexDirection: 'column',
        alignItems: 'center',
        backgroundColor: 'rgba(255, 255, 255, 0.6)',
        p: 3,
        borderRadius: '8%',
      }}>
      <Box
        sx={{
          display: 'flex',
          justifyContent: 'space-between',
          width: '100%',
        }}>
        <Button
          variant='contained'
          sx={{ backgroundColor: '#9C94B1' }}
          onClick={handleBackToProfile}>
          Back
        </Button>
        <Button
          variant='contained'
          sx={{ backgroundColor: '#9C94B1' }}
          onClick={handleEditProfile}
          disabled={loading}>
          {loading ? <CircularProgress size={24} /> : 'Save'}
        </Button>
      </Box>
      <Avatar src={user.image} sx={{ width: 100, height: 100, mt: 2 }} />
      <Typography variant='h6' sx={{ mt: 2 }}>
        {formData.firstName} {formData.lastName}
      </Typography>
      {error && <Typography color='error'>{error}</Typography>}
      <Box
        component='form'
        noValidate
        autoComplete='off'
        sx={{ mt: 2, alignItems: 'center' }}>
        <TextField
          name='firstName'
          label='First Name'
          value={formData.firstName}
          onChange={handleChange}
          variant='outlined'
          sx={{ mb: 2 }}
        />
        <TextField
          name='lastName'
          label='Last Name'
          value={formData.lastName}
          onChange={handleChange}
          variant='outlined'
          sx={{ mb: 2 }}
        />
        <TextField
          name='username'
          label='User Name'
          value={formData.username}
          onChange={handleChange}
          variant='outlined'
        />
      </Box>
    </Box>
  );
};

export default EditProfile;
