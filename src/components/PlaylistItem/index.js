import {Link} from 'react-router-dom'

import './index.css'

const PlaylistItem = props => {
  const {playlistDetails} = props
  const {name, albumUrl, id} = playlistDetails

  return (
    <li className="playlist-item">
      <Link to={`/playlist/${id}`}>
        <img src={albumUrl} className="album-image" alt="featured playlist" />
      </Link>
      <p>{name}</p>
    </li>
  )
}
export default PlaylistItem
