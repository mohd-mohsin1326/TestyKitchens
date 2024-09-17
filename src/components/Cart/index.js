import {Link} from 'react-router-dom'
import './index.css'
import Header from '../Header'
import Footer from '../Footer'
import Counter from '../Counter'

const Cart = () => {
  const getCartData = JSON.parse(localStorage.getItem('cartData') || '[]')
  const cartData = Array.isArray(getCartData) ? getCartData : [getCartData]
  let totalAmount = 0

  const calculateBill = amount => {
    totalAmount += amount
  }

  const completeOrder = () => {
    localStorage.removeItem('cartData')
  }

  return (
    <>
      <Header />
      <div className="cart-main-container">
        {cartData.length === 0 ? (
          <div className="no-order-container">
            <img
              src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726212455/dfr71hmfa3s19vlluxih.png"
              alt="no order"
              className="no-order-img-style"
            />
            <h1 className="no-order-title">No Orders Yet!</h1>
            <p className="no-order-description">
              Your cart is empty. Add something from the menu.
            </p>
            <Link to="/">
              <button type="button" className="order-now-btn">
                Order Now
              </button>
            </Link>
          </div>
        ) : (
          <ul className="place-order-list">
            <li className="place-order-list-Item">
              <div className="order-item-card">
                <p className="list-column-name-style">Item</p>
              </div>
              <div className="order-item-card">
                <p className="list-column-name-style">Quantity</p>
              </div>
              <div className="order-item-card">
                <p className="list-column-name-style">Price</p>
              </div>
            </li>
            {cartData.map(eachItem => (
              <>
                <li key={eachItem.itemId} className="place-order-list-Item">
                  <div className="order-item-card">
                    <img
                      src={eachItem.imageUrl}
                      alt="cart"
                      className="cart-item-img"
                    />
                    <p className="cart-item-name">{eachItem.name}</p>
                  </div>
                  <div className="order-item-card">
                    <Counter />
                  </div>
                  <div className="order-item-card">
                    <p className="cart-item-price">
                      ₹ {eachItem.cost} {calculateBill(eachItem.cost)}
                    </p>
                  </div>
                </li>
                {/* mobile view list item */}
                <li className="mobile-view-order-list-Item">
                  <img
                    src="https://assets.ccbp.in/frontend/react-js/tasty-kitchens/food-items-3/chicken-roast-31.jpg"
                    alt="cart"
                    className="mobile-view-order-item-img"
                  />
                  <div className="mobile-order-item-card">
                    <p className="mobile-view-cart-item-name">
                      {eachItem.name}
                    </p>
                    <Counter />
                    <p className="mobile-view-cart-item-price">
                      ₹ {eachItem.cost} {calculateBill(eachItem.cost)}
                    </p>
                  </div>
                </li>
              </>
            ))}
            <li className="total-amount-list-item">
              <div className="order-item-card">
                <p className="order-total-style">Order Total:</p>
              </div>
              <div className="place-order-card">
                <p className="total-amt-style">₹ {totalAmount}.00</p>
                <Link to="/paymentsuccess">
                  <button
                    type="button"
                    className="place-order-btn"
                    onClick={completeOrder}
                  >
                    Place Order
                  </button>
                </Link>
              </div>
            </li>
            <li className="mobile-total-amount-list-item">
              <p className="mobile-view-total-style">Order Total:</p>
              <div>
                <p className="mobile-total-amt-style">₹ {totalAmount}.00</p>
                <Link to="/paymentsuccess">
                  <button
                    type="button"
                    className="place-order-btn"
                    onClick={completeOrder}
                  >
                    Place Order
                  </button>
                </Link>
              </div>
            </li>
          </ul>
        )}
      </div>
      <Footer />
    </>
  )
}
export default Cart
