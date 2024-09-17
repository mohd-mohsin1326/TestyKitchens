import {Link} from 'react-router-dom'
import './index.css'

const PageNotFound = () => (
  <div className="not-found-main-container">
    <img
      src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726570721/ersogkbk4p8riguxtv2c.png"
      alt="not found"
      className="not-found-image-style"
    />
    <h1 className="not-found-title">Page Not Found</h1>
    <p className="not-found-description">
      We are sorry, the page you requested could not be found.
      <br />
      Please go back to the homepage
    </p>
    <Link to="/">
      <button type="button" className="not-found-btn">
        Home Page
      </button>
    </Link>
  </div>
)
export default PageNotFound
