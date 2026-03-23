import { BrowserRouter, Routes, Route } from 'react-router-dom';
import { AuthProvider, CartProvider } from './context';
import { Header } from './components';
import { Home, Login, Register, Shops, ShopProducts, Cart, OrderHistory } from './pages';
import styles from './App.module.css';

function App() {
  return (
    <BrowserRouter>
      <AuthProvider>
        <CartProvider>
          <Header />
          <div className={styles.container}>
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/login" element={<Login />} />
              <Route path="/register" element={<Register />} />
              <Route path="/shops" element={<Shops />} />
              <Route path="/shops/:shopId" element={<ShopProducts />} />
              <Route path="/cart" element={<Cart />} />
              <Route path="/orders" element={<OrderHistory />} />
            </Routes>
          </div>
        </CartProvider>
      </AuthProvider>
    </BrowserRouter>
  );
}

export default App;
