import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {
    userNameInput: '',
    passwordInput: '',
    errorMsg: '',
    showErrorMsg: false,
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props
    Cookies.set('jwt_token', jwtToken, {
      expires: 1,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({showErrorMsg: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()
    const {userNameInput, passwordInput} = this.state
    const url = 'https://apis.ccbp.in/login'
    const postObject = {username: userNameInput, password: passwordInput}
    const options = {
      method: 'POST',
      body: JSON.stringify(postObject),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  onChangePassword = event => {
    this.setState({passwordInput: event.target.value})
  }

  renderPasswordSection = () => {
    const {passwordInput} = this.state
    return (
      <div className="input-section-container">
        <label htmlFor="password" className="label">
          PASSWORD
        </label>
        <input
          className="input-field"
          type="password"
          id="password"
          placeholder="password"
          value={passwordInput}
          onChange={this.onChangePassword}
        />
      </div>
    )
  }

  onChangeUserName = event => {
    this.setState({userNameInput: event.target.value})
  }

  renderUsernameSection = () => {
    const {userNameInput} = this.state
    return (
      <div className="input-section-container">
        <label htmlFor="userName" className="label">
          USERNAME
        </label>
        <input
          className="input-field"
          id="userName"
          placeholder="Username"
          type="text"
          value={userNameInput}
          onChange={this.onChangeUserName}
        />
      </div>
    )
  }

  render() {
    const {showErrorMsg, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }

    return (
      <div className="app-container">
        <div className="responsiveContainer">
          <img
            src="https://assets.ccbp.in/frontend/react-js/logo-img.png"
            alt="website logo"
            className="website-logo"
          />
          <form onSubmit={this.onSubmitForm} className="form-container">
            {this.renderUsernameSection()}
            {this.renderPasswordSection()}
            <button className="button" type="submit">
              Login
            </button>
            {showErrorMsg ? <p className="error-message">*{errorMsg}</p> : null}
          </form>
        </div>
      </div>
    )
  }
}

export default Login
