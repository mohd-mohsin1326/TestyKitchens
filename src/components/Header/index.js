import {useState, useEffect} from 'react'
import {GiHamburgerMenu} from 'react-icons/gi'
import {IoCloseCircle} from 'react-icons/io5'
import {withRouter, Link, useLocation} from 'react-router-dom'
import Cookies from 'js-cookie'
import './index.css'

const Header = props => {
  const [isToggle, setIsToggle] = useState(false)
  const location = useLocation()
  const [selectedRoute, setSelectedRoute] = useState('/')

  useEffect(() => {
    setSelectedRoute(location.pathname)
  }, [location.pathname])

  const handleRouteChange = route => {
    setSelectedRoute(route)
    if (isToggle) {
      setIsToggle(false)
    }
  }

  const openToggle = () => {
    setIsToggle(true)
  }

  const closeToggle = () => {
    setIsToggle(false)
  }

  const onClickLogout = () => {
    Cookies.remove('jwt_token')
    const {history} = props
    history.replace('/login')
  }

  return (
    <>
      <nav className="navbar-tag-style">
        <Link to="/" className="link-style">
          <div className="header-logo-card">
            <img
              src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726212505/hiddmoudcfwivh9rapjb.png"
              alt="website logo"
              className="header-logo-style"
            />
            <h1 className="header-website-name-style">Tasty Kitchens</h1>
          </div>
        </Link>
        <ul className="header-item-list">
          <Link to="/" className="link-style">
            <li
              className="nav-list-item"
              style={{color: selectedRoute === '/' ? '#334155' : '#F7931E'}}
              onClick={() => handleRouteChange('/')}
            >
              Home
            </li>
          </Link>
          <Link to="/cart" className="link-style">
            <li
              className="nav-list-item"
              style={{color: selectedRoute === '/cart' ? '#334155' : '#F7931E'}}
              onClick={() => handleRouteChange('/cart')}
            >
              Cart
            </li>
          </Link>
          <button
            type="button"
            className="logout-btn-style"
            onClick={onClickLogout}
          >
            Logout
          </button>
        </ul>
        <GiHamburgerMenu className="toggle-icon-style" onClick={openToggle} />
      </nav>
      {isToggle && (
        <ul className="mobile-header-list-style">
          <Link to="/" className="link-style">
            <li
              className="nav-list-item"
              style={{color: selectedRoute === '/' ? '#334155' : '#F7931E'}}
              onClick={() => handleRouteChange('/')}
            >
              Home
            </li>
          </Link>
          <Link to="/cart" className="link-style">
            <li
              className="nav-list-item"
              style={{color: selectedRoute === '/cart' ? '#334155' : '#F7931E'}}
              onClick={() => handleRouteChange('/cart')}
            >
              Cart
            </li>
          </Link>
          <button
            type="button"
            className="logout-btn-style"
            onClick={onClickLogout}
          >
            Logout
          </button>
          <IoCloseCircle className="close-icon-style" onClick={closeToggle} />
        </ul>
      )}
    </>
  )
}

export default withRouter(Header)
