import { Shop } from '../../types';
import styles from './ShopCard.module.css';

interface ShopCardProps {
  shop: Shop;
  onClick: () => void;
}

const ShopCard = ({ shop, onClick }: ShopCardProps) => {
  return (
    <div className={styles.card} onClick={onClick}>
      <img src={shop.image || 'https://via.placeholder.com/300'} alt={shop.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{shop.name}</h3>
        <div className={styles.rating}>
          <span className={styles.star}>★</span>
          <span className={styles.ratingValue}>{shop.rating.toFixed(1)}</span>
        </div>
        <span className={styles.category}>{shop.category}</span>
      </div>
    </div>
  );
};

export default ShopCard;
