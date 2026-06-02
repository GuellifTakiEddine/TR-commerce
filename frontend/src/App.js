import Navbar from './components/Navbar';
import './App.css';
import { BrowserRouter, Routes, Route } from 'react-router-dom';

import Home from './pages/Home';
import Mens from './pages/Men';
import Womens from './pages/Women';
import Kids from './pages/Kids';
import Discover from './pages/Discover';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Register from './pages/Register';
import SearchPage from './pages/SearchPage'; 
import Account from "./pages/account";
import Orders from "./pages/Orders"; 
import OrderTracking from './pages/OrderTracking';
import PrivacyPolicy from "./pages/PrivacyPolicy";
import Terms from "./pages/Terms";
import About from "./pages/About";
import Contact from "./pages/Contact";
function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar />

        <Routes>
          <Route path='/' element={<Home />} />   
          <Route path='/men' element={<Mens />} /> 
          <Route path='/women' element={<Womens />} /> 
          <Route path='/kids' element={<Kids />} /> 
          <Route path='/discover' element={<Discover />} /> 
          <Route path='/wishlist' element={<Wishlist />} /> 
          <Route path='/cart' element={<Cart />} /> 
          <Route path='/create-account' element={<Register />} />
          <Route path='/search' element={<SearchPage />} /> 
          <Route path="/account" element={<Account />} />
          <Route path="/orders" element={<Orders />} />
          <Route path="/privacy-policy" element={<PrivacyPolicy />} />
          <Route path="/terms" element={<Terms />} />
          <Route path="/about" element={<About />} />
          <Route path="/contact" element={<Contact />} />
<Route path="/track/:id" element={<OrderTracking />} />
        </Routes>
      </BrowserRouter>
    </div>
  );
}

export default App;