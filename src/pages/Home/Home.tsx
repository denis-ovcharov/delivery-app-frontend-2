import { Link } from "react-router-dom";
import styles from "./Home.module.css";

const Home = () => {
  return (
    <div className={styles.container}>
      <div className={styles.hero}>
        <div className={styles.heroContent}>
          <h1 className={styles.title}>
            Food Delivery
            <span className={styles.titleHighlight}>Made Simple</span>
          </h1>
          <p className={styles.subtitle}>
            Discover the best restaurants in your area and enjoy delicious meals delivered to your door
          </p>
          <Link to="/shops" className={styles.cta}>
            <span className={styles.ctaIcon}>
              <svg width="24" height="24" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
                <path d="M5 12h14M12 5l7 7-7 7"/>
              </svg>
            </span>
            Browse Restaurants
          </Link>
        </div>
      </div>

      <div className={styles.features}>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M12 2L2 7l10 5 10-5-10-5zM2 17l10 5 10-5M2 12l10 5 10-5"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Wide Selection</h3>
          <p className={styles.featureDesc}>
            Choose from Burgers, Pizza, Sushi, Mexican, and more cuisines
          </p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <circle cx="12" cy="12" r="10"/>
              <path d="M12 6v6l4 2"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Lightning Fast</h3>
          <p className={styles.featureDesc}>
            Quick delivery so your food arrives hot and fresh
          </p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <rect x="1" y="4" width="22" height="16" rx="2"/>
              <path d="M1 10h22"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Easy Payment</h3>
          <p className={styles.featureDesc}>
            Secure and simple checkout process
          </p>
        </div>
        <div className={styles.feature}>
          <div className={styles.featureIcon}>
            <svg width="40" height="40" viewBox="0 0 24 24" fill="none" stroke="currentColor" strokeWidth="2">
              <path d="M20.84 4.61a5.5 5.5 0 0 0-7.78 0L12 5.67l-1.06-1.06a5.5 5.5 0 0 0-7.78 7.78l1.06 1.06L12 21.23l7.78-7.78 1.06-1.06a5.5 5.5 0 0 0 0-7.78z"/>
            </svg>
          </div>
          <h3 className={styles.featureTitle}>Great Deals</h3>
          <p className={styles.featureDesc}>
            Use coupons for amazing discounts on your orders
          </p>
        </div>
      </div>
    </div>
  );
};

export default Home;
