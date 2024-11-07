import Cookies from 'js-cookie'

import {withRouter} from 'react-router-dom'

import {FaBars} from 'react-icons/fa'
import {IoMdLogOut} from 'react-icons/io'

import './index.css'

const Navbar = props => {
  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }
  return (
    <nav className="nav-header-container">
      <div className="nav-content-container">
        <img
          src="https://res.cloudinary.com/drbdvbv2c/image/upload/v1729056074/music_naxzqc.png"
          alt="website logo"
          className="website-logo-image"
        />
        <FaBars className="three-bars-icon" />
        <button className="logout-button" type="button" onClick={onClickLogout}>
          Logout
        </button>
        <ul className="nav-menu-mobile">
          <button type="button" onClick={onClickLogout}>
            Logout
          </button>
        </ul>
      </div>
    </nav>
  )
}

export default withRouter(Navbar)
