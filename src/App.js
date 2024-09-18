import {Route, Switch, Redirect} from 'react-router-dom'
import Login from './components/Login'
import Home from './components/Home'
import Restaurant from './components/Restaurant'
import Cart from './components/Cart'
import PaymentSuccess from './components/PaymentSuccess'
import PageNotFound from './components/PageNotFound'
import ProtectedRoute from './components/ProtectedRoute'
import './App.css'

const App = () => (
  <Switch>
    <Route exact path="/login" component={Login} />
    <ProtectedRoute exact path="/" component={Home} />
    <ProtectedRoute exact path="/restaurant/:id" component={Restaurant} />
    <ProtectedRoute exact path="/cart" component={Cart} />
    <ProtectedRoute exact path="/paymentsuccess" component={PaymentSuccess} />
    <Route path="/bad-path" component={PageNotFound} />
    <Redirect to="/not-found" />
  </Switch>
)

export default App
