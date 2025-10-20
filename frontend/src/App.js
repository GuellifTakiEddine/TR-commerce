import Navbar from './components/Navbar';
import './App.css';
import{BrowserRouter,Routes,Route} from 'react-router-dom';



import Home from './pages/Home';
import Mens from './pages/Men';
import Womens from './pages/Women';
import Kids from './pages/Kids';
import Discover from './pages/Discover';
import Wishlist from './pages/Wishlist';
import Cart from './pages/Cart';
import Register from './pages/Register';

function App() {
  return (
    <div className="App">
      <BrowserRouter>
        <Navbar/>
          <Routes>
              <Route path='/' element={<Home/>}/>   
              <Route path='/men' element={<Mens/>}/> 
              <Route path='/women' element={<Womens/>}/> 
              <Route path='/kids' element={<Kids/>}/> 
              <Route path='/discover' element={<Discover/>}/> 
              <Route path='/wishlist' element={<Wishlist/>}/> 
              <Route path='/cart' element={<Cart/>}/> 
              <Route path="/create-account" element={<Register />} />

          </Routes>
     </BrowserRouter>
     
    </div>


  );
}

export default App;
