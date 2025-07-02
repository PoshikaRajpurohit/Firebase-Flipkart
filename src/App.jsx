import { Routes, Route } from 'react-router-dom'; 
import Header from './Components/Header';
import AddProduct from './Components/AddProduct';
import Home from './Components/Home';
import EditProduct from './Components/EditProduct';
import Cart from './Components/Cart';
import ViewProduct from './Components/View';
import SearchResults from './Components/Search';
import SignIn from './Components/Sign-In';
import SignUP from './Components/Sign-Up';
import AuthListener from './Services/Auth';
import Checkout from './Components/Checkout';
import MyOrders from './Components/Order';

const App = () => {
  return (
    <>
      <Header />
      <AuthListener/>
      <Routes>
        <Route path='/' element={<Home />} />
        <Route path='/sign-in' element={<SignIn />} />
        <Route path='/sign-up' element={<SignUP />} />
        <Route path="/add" element={<AddProduct />} />
        <Route path="/search" element={<SearchResults/>} />
        <Route path='/cart' element={<Cart />} />
        <Route path="/view/:id" element={<ViewProduct />} />
        <Route path="/checkout" element={<Checkout />} />
        <Route path="/edit/:id" element={<EditProduct/>} />
        <Route path="/order" element={<MyOrders/>} />
        <Route path="*" element={<h1 className='text-center'>404 Not Found</h1>} />
      </Routes>
    </>
  );
};

export default App;