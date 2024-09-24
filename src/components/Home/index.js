import {Component} from 'react'
import Loader from 'react-loader-spinner'
import Cookies from 'js-cookie'
import Slider from 'react-slick'
import {MdSort} from 'react-icons/md'
import {GrFormNext, GrFormPrevious} from 'react-icons/gr'
import Header from '../Header'
import Footer from '../Footer'
import HotelItem from '../HotelItem'
import './index.css'
import 'slick-carousel/slick/slick.css'
import 'slick-carousel/slick/slick-theme.css'

const sortByOptions = [
  {
    id: 0,
    displayText: 'Lowest',
    value: 'Lowest',
  },
  {
    id: 1,
    displayText: 'Highest',
    value: 'Highest',
  },
]

class Home extends Component {
  state = {
    crouselImageList: [],
    listOfRestaurent: [],
    activePage: 1,
    limit: 9,
    lastPage: 1,
    appliedFilter: sortByOptions[0].value,
    isLoading: true,
  }

  componentDidMount = () => {
    this.getCrouselsImages()
    this.getRestaurentsDetails()
  }

  // API call for carousels
  getCrouselsImages = async () => {
    const jwtToken = Cookies.get('jwt_token')
    const apiUrl = 'https://apis.ccbp.in/restaurants-list/offers'
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrl, options)
    if (response.ok === true) {
      const data = await response.json()
      const updatedOfferList = data.offers.map(eachOffer => ({
        id: eachOffer.id,
        imageUrl: eachOffer.image_url,
      }))
      this.setState({
        crouselImageList: updatedOfferList,
        isLoading: false,
      })
    }
  }

  // API call for restaurants
  getRestaurentsDetails = async () => {
    const {activePage, limit, appliedFilter} = this.state
    const offset = (activePage - 1) * limit
    const jwtToken = Cookies.get('jwt_token')
    const apiUrlRest = `https://apis.ccbp.in/restaurants-list?offset=${offset}&limit=${limit}`
    const options = {
      method: 'GET',
      headers: {
        Authorization: `Bearer ${jwtToken}`,
      },
    }
    const response = await fetch(apiUrlRest, options)
    if (response.ok === true) {
      const data = await response.json()
      const totalPage = data.total
      const updatedRestaurentsData = data.restaurants.map(eachRestaurent => ({
        id: eachRestaurent.id,
        hasOnlineDelivery: eachRestaurent.has_online_delivery,
        name: eachRestaurent.name,
        hasTableBooking: eachRestaurent.has_table_booking,
        isDeliveringNow: eachRestaurent.is_delivering_now,
        constForTwo: eachRestaurent.cost_for_two,
        cuisine: eachRestaurent.cuisine,
        imageUrlRest: eachRestaurent.image_url,
        menuType: eachRestaurent.menu_type,
        location: eachRestaurent.location,
        opensAt: eachRestaurent.opens_at,
        groupByTime: eachRestaurent.group_by_time,
        ratingText: eachRestaurent.user_rating.rating_text,
        ratingColor: eachRestaurent.user_rating.rating_color,
        totalReviews: eachRestaurent.user_rating.total_reviews,
        rating: eachRestaurent.user_rating.rating,
      }))

      // Sort restaurants by the current filter (initially 'Lowest')
      const sortedRestaurants = this.sortRestaurants(
        updatedRestaurentsData,
        appliedFilter,
      )
      this.setState({
        listOfRestaurent: sortedRestaurants,
        lastPage: Math.ceil(totalPage / limit),
        isLoading: false,
      })
    }
  }

  // Method to sort restaurants based on the applied filter
  sortRestaurants = (restaurants, filter) => {
    if (filter === 'Lowest') {
      return restaurants.sort((a, b) => a.rating - b.rating)
    }
    return restaurants.sort((a, b) => b.rating - a.rating)
  }

  // Handling page change
  handlePageChange = newPage => {
    const {lastPage} = this.state
    if (newPage >= 1 && newPage <= lastPage) {
      this.setState({activePage: newPage}, this.getRestaurentsDetails)
    }
  }

  // Handling filter change
  updateFilters = event => {
    const {listOfRestaurent} = this.state
    const appliedFilter = event.target.value

    // Sort the restaurants based on the selected filter
    const sortedRestaurants = this.sortRestaurants(
      listOfRestaurent,
      appliedFilter,
    )

    this.setState({appliedFilter, listOfRestaurent: sortedRestaurants})
  }

  // offers images crousels
  offersListCrousels = () => {
    const {crouselImageList} = this.state
    const settings = {
      infinite: true,
      speed: 500,
      autoplay: true,
      slidesToShow: 1,
      slidesToScroll: 1,
    }
    return (
      <ul className="offers-list">
        <Slider {...settings}>
          {crouselImageList.map(eachOfferImg => (
            <li key={eachOfferImg.id} className="offer-list-style">
              <img
                src={eachOfferImg.imageUrl}
                alt="offer"
                className="offer-image-style"
              />
            </li>
          ))}
        </Slider>
      </ul>
    )
  }

  // popular restaurent and filter card

  renderFilterCard = () => {
    const {appliedFilter} = this.state
    return (
      <>
        <h1 className="restaurants-title-style">Popular Restaurants</h1>
        <div className="filter-description-card">
          <p className="restaurants-description-style">
            Select Your favourite restaurant special dish and make your day
            happy...
          </p>
          <div className="drop-down-filter-card">
            <MdSort className="filter-icon-style" />
            <p>Sort By</p>
            <select
              className="filter-drop-down-style"
              onChange={this.updateFilters}
              value={appliedFilter}
            >
              {sortByOptions.map(eachFilter => (
                <option key={eachFilter.id} value={eachFilter.value}>
                  {eachFilter.displayText}
                </option>
              ))}
            </select>
          </div>
        </div>
      </>
    )
  }

  // handle next previous pages container

  nextPreviousCard = () => {
    const {activePage, lastPage} = this.state
    return (
      <div className="next-previous-main-container">
        <div>
          <button
            testid="pagination-left-button"
            type="button"
            disabled={activePage === 1}
            onClick={() => this.handlePageChange(activePage - 1)}
            className="next-previous-btn-style"
          >
            <GrFormPrevious />
          </button>
          <span testid="active-page-number" className="page-number-style">
            {activePage} of {lastPage}
          </span>
          <button
            testid="pagination-right-button"
            type="button"
            onClick={() => this.handlePageChange(activePage + 1)}
            className="next-previous-btn-style"
          >
            <GrFormNext />
          </button>
        </div>
      </div>
    )
  }

  // handling hotel items list
  rednerHotelList = () => {
    const {listOfRestaurent} = this.state
    return (
      <ul className="all-restaurant-list">
        {listOfRestaurent.map(eachRestaurent => (
          <HotelItem key={eachRestaurent.id} eachRestaurent={eachRestaurent} />
        ))}
      </ul>
    )
  }

  // loading view container
  renderLoadingView = () => (
    <div
      testid="restaurants-list-loader"
      className="restaurant-loader-container"
    >
      <Loader type="Oval" color="#f7931e" height={50} width={50} />
    </div>
  )

  renderOffersLoadingView = () => (
    <div testid="restaurants-offers-loader" className="offers-loader-container">
      <Loader type="Oval" color="#f7931e" height={50} width={50} />
    </div>
  )

  render() {
    const {isLoading} = this.state
    return (
      <>
        <Header />
        <div className="home-main-bg-container">
          {isLoading
            ? this.renderOffersLoadingView()
            : this.offersListCrousels()}
          {isLoading ? (
            this.renderLoadingView()
          ) : (
            <>
              {this.renderFilterCard()}
              {this.rednerHotelList()}
              {this.nextPreviousCard()}
            </>
          )}
        </div>
        <Footer />
      </>
    )
  }
}

export default Home
