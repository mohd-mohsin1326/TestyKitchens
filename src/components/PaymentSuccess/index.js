import {Link} from 'react-router-dom'
import Header from '../Header'
import './index.css'

const PaymentSuccess = () => (
  <>
    <Header />
    <div className="payment-success-main-container">
      <div className="payment-card">
        <img
          src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726568221/sufphiqfo4miuzojdpp7.png"
          alt="success"
          className="success-img-style"
        />
        <h1 className="payment-title">Payment Successful</h1>
        <p className="payment-description">
          Thank you for ordering <br /> Your payment is successfully completed.
        </p>
        <Link to="/">
          <button type="button" className="go-to-home-btn">
            Go To Home Page
          </button>
        </Link>
      </div>
    </div>
  </>
)

export default PaymentSuccess
