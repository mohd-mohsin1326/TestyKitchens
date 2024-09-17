import {
  FaPinterestSquare,
  FaInstagram,
  FaTwitter,
  FaFacebook,
} from 'react-icons/fa'
import './index.css'

export default function Footer() {
  return (
    <div className="footer-main-bg-container">
      <div className="footer-logo-card">
        <img
          src="https://res.cloudinary.com/dctk5xes4/image/upload/v1726380613/u5ga75xcbfkeceou3jyh.png"
          alt="website-footer-logo"
          className="footer-logo-style"
        />
        <h1 className="website-name-footer">Tasty Kitchens</h1>
      </div>
      <p>The only thing we are serious about is food.</p>
      <p className="contact-us-style">Contact us on</p>
      <div>
        <FaPinterestSquare
          className="contact-channel-style"
          data-testid="pintrest-social-icon"
        />
        <FaInstagram
          className="contact-channel-style"
          data-testid="instagram-social-icon"
        />
        <FaTwitter
          className="contact-channel-style"
          data-testid="twitter-social-icon"
        />
        <FaFacebook
          className="contact-channel-style"
          data-testid="facebook-social-icon"
        />
      </div>
    </div>
  )
}
