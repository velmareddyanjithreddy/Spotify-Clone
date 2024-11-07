import {Route, Switch, Redirect} from 'react-router-dom'

import './App.css'

import LoginForm from './components/LoginForm'

import NotFound from './components/NotFound'

import Home from './components/Home'

import ProtectedRoute from './components/ProtectedRoute'

import AlbumDetails from './components/AlbumDetails'

import PlaylistsDetails from './components/PlaylistsDetails'

import CategoryPlaylistsDetails from './components/CategoryPlaylistsDetails'

const App = () => (
  <Switch>
    <Route exact path="/login" component={LoginForm} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/playlist/:id" component={PlaylistsDetails} />
    <ProtectedRoute exact path="/album/:id" component={AlbumDetails} />
    <ProtectedRoute
      exact
      path="/category/:id/playlists"
      component={CategoryPlaylistsDetails}
    />
    <Route component={NotFound} />
    <Redirect to="not-found" />
  </Switch>
)

export default App
