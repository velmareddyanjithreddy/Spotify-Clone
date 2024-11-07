import {Link} from 'react-router-dom'

import './index.css'

const NewAlbumItem = props => {
  const {itemDetails} = props
  const {name, images, id} = itemDetails
  const {url} = images[0]

  return (
    <li className="album-item">
      <Link to={`/album/${id}`}>
        <img src={url} className="album-image" alt="new release album" />
      </Link>
      <h1 className="album-name">{name}</h1>
    </li>
  )
}
export default NewAlbumItem
