import {Component} from 'react'
import Cookies from 'js-cookie'

import CategoryItem from '../CategoryItem'

import Loader from '../Loader'

import './index.css'

const apiStatusConstants = {
  initial: 'INITIAL',
  success: 'SUCCESS',
  failure: 'FAILURE',
  inProgress: 'IN_PROGRESS',
}

class GenresAndMoods extends Component {
  state = {
    genresAndMoods: [],
    apiStatus: apiStatusConstants.initial,
  }

  componentDidMount() {
    this.getGenresAndMoods()
  }

  getGenresAndMoods = async () => {
    this.setState({apiStatus: apiStatusConstants.inProgress})
    const jwtToken = Cookies.get('jwt_token')

    const apiUrl = 'https://apis2.ccbp.in/spotify-clone/categories'
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()
      // console.log(fetchedData.categories.items)
      this.setState({genresAndMoods: fetchedData.categories.items})
      this.setState({apiStatus: apiStatusConstants.success})
    } else if (response.status === 400) {
      this.setState({apiStatus: apiStatusConstants.failure})
    }
  }

  renderGenresAndMoodsList = () => {
    const {genresAndMoods} = this.state
    return (
      <>
        <h1 className="category-title">Genres & Moods</h1>
        <ul className="category-list">
          {genresAndMoods.map(item => (
            <CategoryItem categoryDetails={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  onClickRetryButton = () => {
    this.getGenresAndMoods()
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
        return this.renderGenresAndMoodsList()
      case apiStatusConstants.failure:
        return this.renderFailureView()
      case apiStatusConstants.inProgress:
        return <Loader />
      default:
        return null
    }
  }
}

export default GenresAndMoods
