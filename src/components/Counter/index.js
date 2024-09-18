import {Component} from 'react'
import './index.css'

class Counter extends Component {
  state = {quantity: 1}

  onIncrement = () => {
    this.setState(prevState => ({quantity: prevState.quantity + 1}))
  }

  onDecrement = () => {
    const {quantity} = this.state
    if (quantity > 1) {
      this.setState(prevState => ({quantity: prevState.quantity - 1}))
    }
  }

  render() {
    const {quantity} = this.state
    return (
      <div className="add-sub-item-card" data-testid="active-count">
        <button
          data-testid="decrement-count"
          type="button"
          onClick={this.onDecrement}
          className="counter-btn-style"
        >
          -
        </button>
        <div data-testid="active-count">{quantity}</div>
        <button
          data-testid="increment-count"
          type="button"
          onClick={this.onIncrement}
          className="counter-btn-style"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
