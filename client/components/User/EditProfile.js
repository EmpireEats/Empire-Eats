import React, { useState } from 'react';
import { useDispatch } from 'react-redux';
import { useParams } from 'react-router';

const EditProfile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();

    const [firstName, setFirstName] = useState('');
    const [lastName, setLastName] = useState('');
    const [email, setEmail] = useState('');
    const [username, setUserName] = useState('');
    const [password, setPassword] = useState('');

    const handleSubmit = (event) => {
        event.preventDefault();
        dispatch()
        .then(() => dispatch());
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

            </form>
        </div>
    )
  

}

export default EditProfile;