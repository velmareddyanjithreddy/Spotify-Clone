import {Component} from 'react'
import Cookies from 'js-cookie'

import {FaArrowLeft} from 'react-icons/fa'

import {Link} from 'react-router-dom'

import CategoryItemDetails from '../CategoryItemDetails'

import './index.css'

class CategoryPlaylistsDetails extends Component {
  state = {categoryPlaylistList: []}

  componentDidMount() {
    this.getCategoryPlaylistList()
  }

  getCategoryPlaylistList = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params

    const apiUrl = `https://apis2.ccbp.in/spotify-clone/category-playlists/${id}`
    const options = {
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
      method: 'GET',
    }
    const response = await fetch(apiUrl, options)
    if (response.ok) {
      const fetchedData = await response.json()

      const updatedFetchedData = fetchedData.playlists.items.map(item => ({
        id: item.id,
        imageUrl: item.images[0].url,
        total: item.tracks.total,
        name: item.name,
      }))
      this.setState({categoryPlaylistList: updatedFetchedData})
    }
  }

  renderCategoryPlaylistsDetails = () => {
    const {categoryPlaylistList} = this.state
    return (
      <>
        <ul className="category-list">
          {categoryPlaylistList.map(item => (
            <CategoryItemDetails itemDetails={item} key={item.id} />
          ))}
        </ul>
      </>
    )
  }

  render() {
    return (
      <div className="category-playlist-bg-container">
        <div className="back-button-container">
          <Link to="/">
            <button type="button" className="back-button">
              <FaArrowLeft className="left-arrow-icon" />
              <span>Back</span>
            </button>
          </Link>
        </div>
        {this.renderCategoryPlaylistsDetails()}
      </div>
    )
  }
}

export default CategoryPlaylistsDetails
