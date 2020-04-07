import React, { useEffect } from 'react';
import PropTypes from 'prop-types';
import { withRouter } from 'react-router-dom';
import IPhoneXImg from '../resources/images/iphoneX-logo.png';

//react router dom
import { Link } from 'react-router-dom';

//Redux
import { connect } from 'react-redux';

//Actions
import { logoutUser } from '../redux/actions/userActions';

function Navbar(props) {
  useEffect(() => {
    if (props.location.pathname !== '/admin') {
      if (props.location.pathname === '/' || props.location.pathname === '') {
        document.querySelector('.navbar').style.background = '';
      }

      if (props.location.pathname !== '/') {
        document.querySelector('.navbar').style.background =
          'linear-gradient(90deg, #14cca7, #212d9a)';
      }
    }
  }, [props.location.pathname]);
  const { user, authenticated } = props;

  if (props.location.pathname === '/admin') {
    return null;
  } else {
    return (
      <nav className="navbar">
        <div className="logo">
          <Link to="/">
            <img src={IPhoneXImg} alt="" />
          </Link>
        </div>

        <input type="checkbox" className="menu-btn" id="menu-btn" />
        <label htmlFor="menu-btn" className="menu-icon">
          <span className="line"></span>
        </label>

        <ul className="nav">
          <li className="nav-link">
            <Link to="/">Home</Link>
          </li>

          {authenticated === true &&
            user !== undefined &&
            user.role === 'Customer' && (
              <li className="nav-link">
                <Link to="/request">Create Request</Link>
              </li>
            )}
          {authenticated === true &&
            user !== undefined &&
            user.role === 'Customer' && (
              <li className="nav-link">
                <Link to="/requests">My Requests</Link>
              </li>
            )}
          {authenticated === true &&
            user !== undefined &&
            user.role === 'Owner' && (
              <li className="nav-link">
                <Link to="/admin">Admin</Link>
              </li>
            )}
          {authenticated === true &&
            user !== undefined &&
            user.role === 'Admin' && (
              <li className="nav-link">
                <Link to="/admin">Admin</Link>
              </li>
            )}
          {authenticated === true && (
            <li className="nav-link">
              <button
                className="nav-btn"
                onClick={() => {
                  props.logoutUser(props.history);
                }}
              >
                Logout
              </button>
            </li>
          )}
          {authenticated === false || authenticated === undefined ? (
            <li className="nav-link">
              <Link to="/login">Login</Link>
            </li>
          ) : (
            <div></div>
          )}
          {authenticated === false || authenticated === undefined ? (
            <li className="nav-link">
              <Link to="/signup">Sign Up</Link>
            </li>
          ) : (
            <div></div>
          )}
        </ul>
      </nav>
    );
  }
}

Navbar.propTypes = {
  user: PropTypes.object,
  authenticated: PropTypes.bool,
  logoutUser: PropTypes.func,
};

const mapStateToProps = (state) => ({
  user: state.user.user,
  authenticated: state.user.authenticated,
});

const mapDispatchToProps = {
  logoutUser,
};

export default connect(mapStateToProps, mapDispatchToProps)(withRouter(Navbar));