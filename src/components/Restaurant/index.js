import {Component} from 'react'
import Loader from 'react-loader-spinner'
import {FaStar} from 'react-icons/fa'
import Cookies from 'js-cookie'
import Header from '../Header'
import Footer from '../Footer'
import RestaurantItem from '../RestaurantItem'
import './index.css'

class Restaurant extends Component {
  state = {specificRestaurentList: '', foodItemsList: [], isLoading: true}

  componentDidMount = () => {
    this.getSpecificRestaurentDetail()
  }

  getSpecificRestaurentDetail = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const {match} = this.props
    const {params} = match
    const {id} = params
    const apiUrl = `https://apis.ccbp.in/restaurants-list/${id}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    const specificRestData = await response.json()
    const updatedSpecificRestData = {
      id: specificRestData.id,
      costForTwo: specificRestData.cost_for_two,
      cuisine: specificRestData.cuisine,
      imageUrl: specificRestData.image_url,
      itemsCount: specificRestData.items_count,
      location: specificRestData.location,
      name: specificRestData.name,
      opensAt: specificRestData.opens_at,
      rating: specificRestData.rating,
      reviewsCount: specificRestData.reviews_count,
    }
    const dataFoodItems = specificRestData.food_items.map(eachFoodItem => ({
      itemId: eachFoodItem.id,
      cost: eachFoodItem.cost,
      type: eachFoodItem.food_type,
      imageUrl: eachFoodItem.image_url,
      name: eachFoodItem.name,
      rating: eachFoodItem.rating,
      isAdded: false,
    }))

    this.setState({
      specificRestaurentList: updatedSpecificRestData,
      foodItemsList: dataFoodItems,
      isLoading: false,
    })
  }

  selectedItem = restaurant => {
    this.setState(prevState => ({
      foodItemsList: prevState.foodItemsList.map(eachItem =>
        eachItem.itemId === restaurant.itemId
          ? {...eachItem, isAdded: true}
          : eachItem,
      ),
    }))

    // Retrieve the existing cart list from localStorage and ensure it's an array
    let existingCartData = JSON.parse(localStorage.getItem('cartData')) || []

    // Ensure existingCartList is always an array
    if (!Array.isArray(existingCartData)) {
      existingCartData = []
    }

    const restaurantExists = existingCartData.some(
      eachItem => eachItem.itemId === restaurant.itemId,
    )

    if (!restaurantExists) {
      // Add the new restaurant to the list
      const updatedCartData = [...existingCartData, restaurant]

      // Store the updated list back in localStorage
      localStorage.setItem('cartData', JSON.stringify(updatedCartData))
    }
  }

  // specific hotel details card

  hotelDetailsTopCard = () => {
    const {specificRestaurentList} = this.state
    return (
      <div className="add-food-banner-card">
        <img
          src={specificRestaurentList.imageUrl}
          alt="restaurant"
          className="add-food-banner-img-style"
        />
        <div className="food-banner-detail-card">
          <p className="food-banner-restaurant-name">
            {specificRestaurentList.name}
          </p>
          <p className="mobile-view-style">{specificRestaurentList.cuisine}</p>
          <p className="mobile-view-style">{specificRestaurentList.location}</p>
          <div className="food-rating-detail-card">
            <div className="rating-card-vertical-card">
              <div className="rating-price-card">
                <FaStar className="food-star" />
                <p>{specificRestaurentList.rating}</p>
              </div>
              <p className="rating-description">
                {specificRestaurentList.reviewsCount}+ Ratings
              </p>
            </div>
            <div>
              <p className="mobile-view-style">
                ₹ {specificRestaurentList.costForTwo}
              </p>
              <p className="rating-description">Cost for two</p>
            </div>
          </div>
        </div>
      </div>
    )
  }

  // specific hotel item details

  restaurantItemsList = () => {
    const {foodItemsList} = this.state
    return (
      <ul className="add-food-list">
        {foodItemsList.map(eachFood => (
          <RestaurantItem
            key={eachFood.id}
            eachFood={eachFood}
            selectedItem={this.selectedItem}
          />
        ))}
      </ul>
    )
  }

  // loading view container
  renderLoadingView = () => (
    <div
      testid="restaurant-details-loader"
      className="restaurant-loader-container"
    >
      <Loader type="Oval" color="#f7931e" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <div className="add-food-main-bg-container">
        <Header />
        {isLoading ? (
          this.renderLoadingView()
        ) : (
          <>
            {this.hotelDetailsTopCard()}
            {this.restaurantItemsList()}
          </>
        )}
        <Footer />
      </div>
    )
  }
}
export default Restaurant
