import {Component} from 'react'
import Cookies from 'js-cookie'

import NewAlbumItem from '../NewAlbumItem'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class NewReleases extends Component {
  state = {
    newReleasesList: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getNewReleases()
  }

  getNewReleases = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/new-releases'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData.albums.items)
      this.setState({
        newReleasesList: fetchedData.albums.items,
        apiStatus: apiStatusConstants.success,
      })
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderLoadingView = () => (
    <div data-testid="loader" className="loading-container">
      <img src="https://res.cloudinary.com/drbdvbv2c/image/upload/v1728359732/Group_195_l9xbmt.png" />
    </div>
  )

  renderNewReleasesList = () => {
    const {newReleasesList} = this.state
    return (
      <>
        <h1 className="category-title">New Releases</h1>
        <ul className="new-albums-list">
          {newReleasesList.map(item => (
            <NewAlbumItem itemDetails={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetryButton = () => {
    this.getNewReleases()
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
        return this.renderNewReleasesList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return this.renderLoadingView()
      default:
        return null
    }
  }
}

export default NewReleases
