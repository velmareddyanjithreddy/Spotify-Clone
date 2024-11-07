import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaArrowLeft} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import './index.css'

class AlbumDetails extends Component {
  state = {albumDetails: {}}

  componentDidMount() {
    this.getAlbumDetails()
  }

  getAlbumDetails = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis2.ccbp.in/spotify-clone/album-details/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const updatedData = {
        id: fetchedData.id,
        albumUrl: fetchedData.images[0].url,
        name: fetchedData.name,
        tracks: fetchedData.tracks.items,
      }
      this.setState({albumDetails: updatedData})
    }
  }

  renderAlbumDetails = () => {
    const {albumDetails} = this.state
    const {albumUrl, name, tracks} = albumDetails
    return (
      <div className="specific-playlist-bg-container">
        <div className="specific-playlist-container">
          <img src={albumUrl} className="specific-Playlist-image" />
          <div>
            <p className="playlist-name">{name}</p>
          </div>
        </div>
        <div>
          <div className="track-headers">
            <p>Track</p>
            <p>Time</p>
            <p>Artist</p>
          </div>
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="category-playlist-bg-container">
        <div className="back-button-container">
          <Link to="/">
            <button type="button" className="back-button">
              <FaArrowLeft className="left-arrow-icon" />
              Back
            </button>
          </Link>
        </div>
        {this.renderAlbumDetails()}
      </div>
    )
  }
}

export default AlbumDetails
