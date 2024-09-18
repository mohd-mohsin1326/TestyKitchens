import {Component} from 'react'
import Cookies from 'js-cookie'
import {Redirect} from 'react-router-dom'
import './index.css'

class Login extends Component {
  state = {userName: '', userPassword: '', isError: false, errorMsg: ''}

  userNameUpdate = event => {
    this.setState({userName: event.target.value})
  }

  userPasswordUpdate = event => {
    this.setState({userPassword: event.target.value})
  }

  onSubmitSuccess = jwtToken => {
    const {history} = this.props

    Cookies.set('jwt_token', jwtToken, {
      expires: 30,
      path: '/',
    })
    history.replace('/')
  }

  onSubmitFailure = errorMsg => {
    this.setState({isError: true, errorMsg})
  }

  onSubmitForm = async event => {
    event.preventDefault()

    const {userName, userPassword} = this.state
    const userDetails = {username: userName, password: userPassword}
    const url = 'https://apis.ccbp.in/login'
    const options = {
      method: 'POST',
      body: JSON.stringify(userDetails),
    }
    const response = await fetch(url, options)
    const data = await response.json()
    if (response.ok === true) {
      this.onSubmitSuccess(data.jwt_token)
    } else {
      this.onSubmitFailure(data.error_msg)
    }
  }

  render() {
    const {userName, userPassword, isError, errorMsg} = this.state
    const jwtToken = Cookies.get('jwt_token')
    if (jwtToken !== undefined) {
      return <Redirect to="/" />
    }
    return (
      <>
        <div className="login-bg-container">
          <div className="login-left-card">
            <form className="form-card" onSubmit={this.onSubmitForm}>
              <img
                src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726212505/hiddmoudcfwivh9rapjb.png"
                alt="website logo"
              />
              <h1 className="website-name-style">Tasty Kitchens</h1>
              <h1 className="login-title-style">Login</h1>
              <div className="input-card">
                <label htmlFor="username" className="label-style">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-btn-style"
                  value={userName}
                  onChange={this.userNameUpdate}
                />
              </div>
              <div className="input-card">
                <label htmlFor="password" className="label-style">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-btn-style"
                  value={userPassword}
                  onChange={this.userPasswordUpdate}
                />
              </div>
              {isError && <p className="error-msg-style">{errorMsg}</p>}
              <button type="submit" className="login-btn-style">
                Login
              </button>
            </form>
          </div>
          <div className="login-right-card">
            <img
              src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726209857/bsvzddwsfqjlks5v07cy.png"
              alt="website login"
              className="banner-img-style"
            />
          </div>
        </div>
        <div className="mobile-view-main-bg-container">
          <img
            src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726209857/bsvzddwsfqjlks5v07cy.png"
            alt="banner"
            className="mobile-banner-img-style"
          />
          <div className="mobile-input-main-container">
            <h1 className="mobile-login-title-style">Login</h1>
            <form
              className="mobile-form-container"
              onSubmit={this.onSubmitForm}
            >
              <div className="input-card">
                <label htmlFor="username" className="label-style">
                  USERNAME
                </label>
                <input
                  type="text"
                  id="username"
                  className="input-btn-style"
                  value={userName}
                  onChange={this.userNameUpdate}
                />
              </div>
              <div className="input-card">
                <label htmlFor="password" className="label-style">
                  PASSWORD
                </label>
                <input
                  type="password"
                  id="password"
                  className="input-btn-style"
                  value={userPassword}
                  onChange={this.userPasswordUpdate}
                />
              </div>
              {isError && <p className="error-msg-style">{errorMsg}</p>}
              <button type="submit" className="login-btn-style">
                Login
              </button>
            </form>
          </div>
        </div>
      </>
    )
  }
}

export default Login
