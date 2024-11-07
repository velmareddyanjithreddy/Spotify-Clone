import {Component} from 'react'
import Cookies from 'js-cookie'

import PlaylistItem from '../PlaylistItem'

import Loader from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class FeaturedPlaylist extends Component {
  state = {
    featuredPlaylists: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getFeaturedPlaylists()
  }

  getFeaturedPlaylists = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/featured-playlists'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      const {
        playlists: {items},
      } = fetchedData
      const updatedFeaturedPlaylistsData = items.map(playlist => {
        const {name, images, id} = playlist
        const {url} = images[0]

        const updatedPlaylist = {
          id,
          albumUrl: url,
          name,
        }

        return updatedPlaylist
      })

      this.setState({
        featuredPlaylists: updatedFeaturedPlaylistsData,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderFeaturedPlaylistsList = () => {
    const {featuredPlaylists} = this.state
    return (
      <>
        <h1 className="category-title">Editors Picks</h1>
        <ul className="playlist-list">
          {featuredPlaylists.map(item => (
            <PlaylistItem playlistDetails={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetryButton = () => {
    this.getFeaturedPlaylists()
  }

  renderFailureView = () => (
    <div className="failure-view-container">
      <img
        src="https://res.cloudinary.com/drbdvbv2c/image/upload/v1728279414/alert-triangle_nkbmyi.png"
        alt="failure view"
      />
      <p className="error-description">
        Something went wrong. Please try again
      </p>
      <button
        type="button"
        className="try-again-button"
        onClick={this.onClickRetryButton}
      >
        Try again
      </button>
    </div>
  )

  render() {
    const {apiStatus} = this.state
    switch (apiStatus) {
      case apiStatusConstants.success:
        return this.renderFeaturedPlaylistsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return <Loader />
      default:
        return null
    }
  }
}

export default FeaturedPlaylist
