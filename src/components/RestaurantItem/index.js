import './index.css'
import {FaStar} from 'react-icons/fa'
import Counter from '../Counter'

const RestaurantItem = props => {
  const {eachFood, selectedItem} = props
  const {imageUrl, name, cost, rating, isAdded} = eachFood

  const addToCart = () => {
    selectedItem(eachFood)
  }
  return (
    <li data-testid="foodItem" className="food-list-item">
      <img src={imageUrl} alt="restaurant" className="food-img-style" />
      <div className="restaurant-detail-container">
        <h1 className="food-restaurant-name">{name}</h1>
        <p className="cost-style">{`₹ ${cost}`}</p>
        <div className="rating-price-card">
          <FaStar className="yellow-star-style" />
          <p className="rating-num-style">{rating}</p>
        </div>
        {isAdded ? (
          <Counter />
        ) : (
          <button
            data-testid="active-count"
            type="button"
            className="add-btn-style"
            onClick={addToCart}
          >
            Add
          </button>
        )}
      </div>
    </li>
  )
}
export default RestaurantItem
