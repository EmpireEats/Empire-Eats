import React, { useState } from 'react';
import { useSelector, useDispatch } from 'react-redux';
import { useNavigate } from 'react-router-dom';
import { Link } from 'react-router-dom';
import { logout } from '../redux/actions/authActions';
// import Modal from 'react-modal';
// import { getGeolocation } from '../redux/actions/restaurantActions';
// import '../../public/styles/weOutside.css'

// Modal.setAppElement('#root');

const NavBar = () => {
  const auth = useSelector((state) => state.auth);
  const dispatch = useDispatch();
  const [showDropdown, setShowDropdown] = useState(false);
  const navigate = useNavigate();
  // const [modalMessage, setModalMessage] = useState('');
  // const [showModal, setShowModal] = useState(false);

  // const nycBounds = {
  //   north: 40.917577,
  //   south: 40.477399,
  //   east: -73.700272,
  //   west: -74.259090,
  // };

  // const checkIfWithinNYC = (coords) => {
  //   return (
  //     coords.latitude >= nycBounds.south &&
  //     coords.latitude <= nycBounds.north &&
  //     coords.longitude >= nycBounds.west &&
  //     coords.longitude <= nycBounds.east
  //   );
  // };

  // // USE THIS FUNCTION AFTER DEMO DAY & REMOVE THE CURRENT ONE (THIS WILL PREVENT OUT OF BOUNDS & UNFOUND USERS FROM VISITING THE LINK)
  // const handleWeOutsideClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const coords = await getGeolocation();
  //     const isWithinNYC = checkIfWithinNYC(coords);
  //     if (!isWithinNYC) {
  //       setModalMessage('You need to be in NYC if you want to be outside.');
  //       setShowModal(true);
  //     } else {
  //       navigate('/restaurants');
  //     }
  //   } catch (error) {
  //     setModalMessage('Your location could not be found. Please try turning on location services.');
  //     setShowModal(true);
  //   }
  // };  
  

  // using this function for demo day so people can turn off location & have access to the link
  // const handleWeOutsideClick = async (event) => {
  //   event.preventDefault();
  //   try {
  //     const coords = await getGeolocation();
  //     const isWithinNYC = checkIfWithinNYC(coords);
  //     if (!isWithinNYC) {
  //       setModalMessage('You need to be in NYC if you want to be outside.');
  //       setShowModal(true);
  //     } else {
  //       navigate('/restaurants');
  //     }
  //   } catch (error) {
  //     navigate('/restaurants');
  //   }
  // }; 

  const closeModal = () => {
    setShowModal(false);
  };

  const handleLogout = (event) => {
    event.preventDefault();
    dispatch(logout());
    navigate('/login');
  };

  const handleDropdownClick = () => {
    setShowDropdown(!showDropdown);
  };

  return (
    <div className='nav-container'>
      <Link to='/leaderboard'>Home </Link>
      <Link to='/restaurants' 
        // onClick={handleWeOutsideClick}
      >
        We Outside
      </Link>
      <Link to='/yerrr/now'>YERRR </Link>
      
      {auth.user ? (
        <div className='dropdown-container' onClick={handleDropdownClick}>
          <div className='dropdown-icon'>
            👤 <span className='dropdown-caret'></span>
          </div>
          {showDropdown && (
            <div className='dropdown-menu'>
              {auth.user && <Link to={`/users/profile/${auth.user.username}`}>My Profile</Link>}
              <Link to='/' onClick={handleLogout}>Logout</Link>
            </div>
          )}
        </div>
      ) : (
        <Link to='/login'>Login</Link>
      )}
      {/* <Modal
        isOpen={showModal}
        onRequestClose={closeModal}
        className="weOutside-modal"
        overlayClassName="weOutside-modal-overlay"
      >
        <h2>BING BONG</h2>
        <p>{modalMessage}</p>
      </Modal> */}
    </div>
  );
};

export default NavBar;