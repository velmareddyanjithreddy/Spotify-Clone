import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'

import './index.css'

import Navbar from '../Navbar'

import FeaturedPlaylist from '../FeaturedPlaylist'

import GenresAndMoods from '../GenresAndMoods'

import NewReleases from '../NewReleases'

const Home = () => {
  const jwtToken = Cookies.get('jwt_token')
  if (jwtToken === undefined) {
    return <Redirect to="/login" />
  }
  return (
    <div className="home-container">
      <Navbar />
      <div className="home-background-container">
        <FeaturedPlaylist />
        <GenresAndMoods />
        <NewReleases />
      </div>
    </div>
  )
}

export default Home
