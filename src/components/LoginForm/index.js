import {Redirect} from 'react-router-dom'

import {Component} from 'react'

import Cookies from 'js-cookie'

import './index.css'

class LoginForm extends Component {
  state = {
    username: '',
    password: '',
    showSubmitError: false,
    errorMsg: '',
  }

  onChangeUsername = event => {
    this.setState({username: event.target.value})
  }

  onChangePassword = event => {
    this.setState({password: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    Cookies.set('jwt_token', jwtToken, {expires: 30})
    const {history} = this.props
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showSubmitError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {username, password} = this.state
    const userDetails = {username, password}

    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()

    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  renderUserNameField = () => {
    const {username} = this.state
    return (
      <>
        <label htmlFor="username" className="input-label">
          USERNAME
        </label>
        <input
          id="username"
          type="text"
          className="user-input"
          onChange={this.onChangeUsername}
          value={username}
        />
      </>
    )
  }

  renderPassWordField = () => {
    const {password} = this.state
    return (
      <>
        <label htmlFor="Password" className="input-label">
          PASSWORD
        </label>
        <input
          type="password"
          id="Password"
          className="user-input"
          onChange={this.onChangePassword}
          value={password}
        />
      </>
    )
  }

  render() {
    const jwtToken = Cookies.get('jwt_token')
    const {errorMsg, showSubmitError} = this.state
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <div className="login-background-container">
        <div className="login-card-container">
          <img
            src="https://res.cloudinary.com/drbdvbv2c/image/upload/v1728293038/music_cothc2.svg"
            alt="login website logo"
            className="login-website-logo"
          />
          <h1 className="spotify-remix-title">Spotify Remix</h1>
          <form className="form-container" onSubmit={this.onSubmitForm}>
            <div className="input-container">{this.renderUserNameField()}</div>
            <div className="input-container">{this.renderPassWordField()}</div>
            <button type="submit" className="login-button">
              LOGIN
            </button>
            {showSubmitError && <p className="error-message">*{errorMsg}</p>}
          </form>
        </div>
      </div>
    )
  }
}
export default LoginForm
