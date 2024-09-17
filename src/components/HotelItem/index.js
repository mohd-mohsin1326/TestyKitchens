import {FaStar} from 'react-icons/fa'
import {Link} from 'react-router-dom'
import './index.css'

const HotelItem = props => {
  const {eachRestaurent} = props
  const {id, imageUrlRest, name, cuisine, rating, totalReviews} = eachRestaurent
  return (
    <li className="restaurant-list-item" data-testid="restaurant-item">
      <Link to={`/restaurant/${id}`}>
        <img
          src={imageUrlRest}
          alt="offer"
          className="restaurant-image-style"
        />
      </Link>
      <div>
        <p className="restaurant-name">{name}</p>
        <p className="cuisine-style">{cuisine}</p>
        <div className="rating-card">
          <FaStar className="star-style" />
          <p className="rating-style">{rating}</p>
          <p className="rating-number-style">({totalReviews} ratings)</p>
        </div>
      </div>
    </li>
  )
}

export default HotelItem
