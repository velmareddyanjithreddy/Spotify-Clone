import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaArrowLeft} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import './index.css'

class PlaylistsDetails extends Component {
  state = {specificPlaylist: {}, tracksList: []}

  componentDidMount() {
    this.getSpecificPlaylist()
  }

  getSpecificPlaylist = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis2.ccbp.in/spotify-clone/playlists-details/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      //console.log(fetchedData.tracks.items[0].track.duration_ms)

      // console.log(fetchedData.tracks.items[2].track)

      const tracksList = fetchedData.tracks.items.map(item => ({
        addedAt: item.added_at,
        trackName: item.track.name,
        albumName: item.track.album.name,
        trackTime: item.track.duration_ms,
        artistName: item.track.artists[0].name,
      }))

      console.log(tracksList)
      const updatedData = {
        id: fetchedData.id,
        albumUrl: fetchedData.images[0].url,
        name: fetchedData.name,
        tracks: fetchedData.tracks.items,
      }
      this.setState({
        specificPlaylist: updatedData,
        tracksList,
      })
    }
  }

  renderCategoryPlaylistsDetails = () => {
    const {specificPlaylist, tracksList} = this.state
    const {albumUrl, name} = specificPlaylist
    return (
      <div className="specific-playlist-bg-container">
        <div className="specific-playlist-container">
          <img src={albumUrl} className="specific-Playlist-image" alt={name} />
          <div>
            <p className="playlist-name">{name}</p>
          </div>
        </div>
        <div className="tracks-container">
          <div className="track-headers">
            <p>Track</p>
            <p>Album</p>
            <p>Time</p>
            <p>Artist</p>
            <p>Added</p>
          </div>
          {tracksList.map(item => (
            <div className="track-headers">
              <p>{item.trackName}</p>
              <p>{item.albumName}</p>
            </div>
          ))}
        </div>
      </div>
    )
  }

  render() {
    return (
      <div className="playlist-bg-container">
        <div className="back-button-container">
          <Link to="/">
            <button type="button" className="back-button">
              <FaArrowLeft className="left-arrow-icon" />
              Back
            </button>
          </Link>
        </div>
        {this.renderCategoryPlaylistsDetails()}
      </div>
    )
  }
}

export default PlaylistsDetails
