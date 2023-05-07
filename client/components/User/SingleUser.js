import React, { useEffect } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate, useParams } from 'react-router';
import { Link, UseNavigate } from 'react-router-dom';

const SingleUser = () => {
    const dispatch = useDispatch();
    const navigate = useNavigate();

    const id = useSelector((state) => state.id);


    return (
        <div>
            
        </div>
    )

}

export default SingleUser;