import React, { useEffect, useState } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams } from 'react-router';
import { getLoggedInUserData } from '../../redux/actions/authActions';
import { fetchSingleUser, editUser } from '../../redux/actions/userActions';

const EditProfile = () => {
    const auth = useSelector((state) => state.auth);
    const user = auth.user;
    const dispatch = useDispatch();
    const { id } = useParams();

    useEffect(() => {
        dispatch(getLoggedInUserData());
    }, [dispatch, user.id]);

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch(editUser({ id, firstName, lastName, email, username, password }))
        .then(() => dispatch(fetchSingleUser(id)));
    };

    return (
        <div>
            <h5>Edit Profile:</h5>
            <form onSubmit={handleSubmit}>
                <div>
                    <label htmlFor='firstName'>First Name:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={firstName}
                        onChange={(event) => setFirstName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='firstName'>Last Name:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={lastName}
                        onChange={(event) => setLastName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='email'>Email:</label>
                    <input
                        type='text'
                        id='email'
                        name='email'
                        value={email}
                        onChange={(event) => setEmail(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='username'>User Name:</label>
                    <input
                        type='text'
                        id='name'
                        name='name'
                        value={username}
                        onChange={(event) => setUserName(event.target.value)}
                    />
                </div>
                <div>
                    <label htmlFor='password'>Password:</label>
                    <input
                        type='text'
                        id='password'
                        name='password'
                        value={password}
                        onChange={(event) => setPassword(event.target.value)}
                    />
                </div>
                <button type='submit'>Edit Profile</button>
            </form>
        </div>
    );
};

export default EditProfile;