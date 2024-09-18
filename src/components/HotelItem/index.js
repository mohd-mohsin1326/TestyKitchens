import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const HotelItem = props => {
  const {eachRestaurent} = props
  const {id, imageUrlRest, name, cuisine, rating, totalReviews} = eachRestaurent
  return (
    <li data-testid="restaurant-item" className="restaurant-list-item">
      <Link to={`/restaurant/${id}`}>
        <img
          src={imageUrlRest}
          alt="offer"
          className="restaurant-image-style"
        />
      </Link>
      <div>
        <h1 className="restaurant-name">{name}</h1>
        <p className="cuisine-style">{cuisine}</p>
        <div className="rating-card">
          <FaStar className="star-style" />
          <p className="rating-style">{rating}</p>
          <h1 className="rating-number-style">({totalReviews} ratings)</h1>
        </div>
      </div>
    </li>
  )
}

export default HotelItem
