import { Product } from '../../types';
import { useCart } from '../../context';
import styles from './ProductCard.module.css';

interface ProductCardProps {
  product: Product;
}

const ProductCard = ({ product }: ProductCardProps) => {
  const { items, addItem, updateQuantity } = useCart();
  const cartItem = items.find(item => item.product._id === product._id);
  const quantity = cartItem?.quantity || 0;

  const handleAdd = () => {
    addItem(product);
  };

  const handleIncrement = () => {
    updateQuantity(product._id, quantity + 1);
  };

  const handleDecrement = () => {
    updateQuantity(product._id, quantity - 1);
  };

  return (
    <div className={styles.card}>
      <img src={product.image || 'https://via.placeholder.com/300'} alt={product.name} className={styles.image} />
      <div className={styles.content}>
        <h3 className={styles.name}>{product.name}</h3>
        <p className={styles.description}>{product.description}</p>
        <div className={styles.footer}>
          <span className={styles.price}>${product.price.toFixed(2)}</span>
          {quantity === 0 ? (
            <button onClick={handleAdd} className={styles.addBtn}>Add to Cart</button>
          ) : (
            <div className={styles.quantityControls}>
              <button onClick={handleDecrement} className={styles.qtyBtn}>-</button>
              <span className={styles.qtyValue}>{quantity}</span>
              <button onClick={handleIncrement} className={styles.qtyBtn}>+</button>
            </div>
          )}
        </div>
      </div>
    </div>
  );
};

export default ProductCard;
