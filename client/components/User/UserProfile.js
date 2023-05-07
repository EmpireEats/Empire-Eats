import React, { useEffect } from 'react';
import { useDispatch, useSelector } from 'react-redux';
import { useParams, Link } from 'react-router-dom';
import EditProfile from './EditProfile';

const UserProfile = () => {
    const dispatch = useDispatch();
    const { id } = useParams();
    const singleUser = useSelector();

    useEffect(() => {
        dispatch();   
    }, [dispatch, id]);



    return (
        <>
        <EditProfile/>
        </>
    )

}

export default UserProfile;