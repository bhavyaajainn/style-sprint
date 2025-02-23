import HomePage from './pages/home/HomePage';
import { BrowserRouter as Router, Route, Routes } from 'react-router-dom';
import ProductDetail from './pages/product-detail/ProductDetail';
import Cart from './components/cart/Cart';



function App() {
  return (
    <div className="App">
      <Router>
      <Routes>
        <Route path="/" element={<HomePage />} />
        <Route path="/product/:id" element={<ProductDetail />} /> 
        <Route path="/cart" element={<Cart />} />
      </Routes>
    </Router>
    </div>
  );
}

export default App;
