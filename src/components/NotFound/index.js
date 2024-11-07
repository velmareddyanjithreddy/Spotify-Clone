import {FaArrowLeft} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import './index.css'

import Navbar from '../Navbar'

const NotFound = () => (
  <div className="not-found-container">
    <div className="navbar-container">
      <Navbar />
    </div>
    <div className="page-not-found-bg-container">
      <img
        src="https://res.cloudinary.com/drbdvbv2c/image/upload/v1728276961/Frame_153_b1b9ar.png"
        alt="page not found"
      />
      <h1 className="page-not-found-title">PAGE NOT FOUND</h1>
      <Link to="/">
        <button className="home-page-button" type="button">
          Home Page
        </button>
      </Link>
    </div>
  </div>
)

export default NotFound
