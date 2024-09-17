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
          type="button"
          onClick={this.onDecrement}
          data-testid="decrement-count"
          className="counter-btn-style"
        >
          -
        </button>
        <div>{quantity}</div>
        <button
          type="button"
          onClick={this.onIncrement}
          data-testid="increment-count"
          className="counter-btn-style"
        >
          +
        </button>
      </div>
    )
  }
}

export default Counter
