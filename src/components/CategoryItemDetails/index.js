import './index.css'

const CategoryItemDetails = props => {
  const {itemDetails} = props
  const {imageUrl, name, total} = itemDetails

  return (
    <li className="track-item">
      <img src={imageUrl} className="category-image" />
      <div>
        <p className="track-name">{name}</p>
        <p className="tracks-count">{total} tracks</p>
      </div>
    </li>
  )
}

export default CategoryItemDetails
