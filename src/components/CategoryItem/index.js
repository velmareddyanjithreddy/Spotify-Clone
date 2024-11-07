import {Link} from 'react-router-dom'

import './index.css'

const CategoryItem = props => {
  const {categoryDetails} = props
  const {icons, name, id} = categoryDetails
  const {url} = icons[0]
  return (
    <li className="category-item">
      <Link to={`/category/${id}/playlists`}>
        <img src={url} alt="category" className="category-image" />
      </Link>
      <p className="category-name">{name}</p>
    </li>
  )
}
export default CategoryItem
