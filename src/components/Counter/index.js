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
      <div className="add-sub-item-card" testid="active-count">
        <button
          testid="decrement-count"
          type="button"
          onClick={this.onDecrement}
          className="counter-btn-style"
        >
          -
        </button>
        <div testid="active-count">{quantity}</div>
        <button
          testid="increment-count"
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
