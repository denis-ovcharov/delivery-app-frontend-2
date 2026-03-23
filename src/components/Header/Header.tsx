import { Link } from 'react-router-dom';
import { useAuth, useCart } from '../../context';
import styles from './Header.module.css';

const Header = () => {
  const { user, logout, isAuthenticated } = useAuth();
  const { getItemCount } = useCart();
  const itemCount = getItemCount();

  return (
    <header className={styles.header}>
      <nav className={styles.nav}>
        <Link to="/" className={styles.logo}>Delivery App</Link>
        
        <div className={styles.links}>
          <Link to="/" className={styles.link}>Home</Link>
          <Link to="/shops" className={styles.link}>Shops</Link>
          
          {isAuthenticated && (
            <Link to="/orders" className={styles.link}>My Orders</Link>
          )}
          
          {isAuthenticated ? (
            <div className={styles.userInfo}>
              <span className={styles.userName}>Hello, {user?.name}</span>
              <button onClick={logout} className={styles.logoutBtn}>Logout</button>
            </div>
          ) : (
            <div className={styles.authLinks}>
              <Link to="/login" className={`${styles.authLink} ${styles.loginBtn}`}>Login</Link>
              <Link to="/register" className={`${styles.authLink} ${styles.registerBtn}`}>Register</Link>
            </div>
          )}
          
          <Link to="/cart" className={styles.cartLink}>
            <span>Cart</span>
            {itemCount > 0 && <span className={styles.cartBadge}>{itemCount}</span>}
          </Link>
        </div>
      </nav>
    </header>
  );
};

export default Header;
