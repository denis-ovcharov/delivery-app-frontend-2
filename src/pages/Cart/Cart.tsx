import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useCart } from '../../context';
import { ordersAPI, couponsAPI } from '../../services/api';
import styles from './Cart.module.css';

const Cart = () => {
  const { items, updateQuantity, removeItem, getTotal, clearCart } = useCart();
  const navigate = useNavigate();
  
  const [email, setEmail] = useState('');
  const [phone, setPhone] = useState('');
  const [address, setAddress] = useState('');
  const [couponCode, setCouponCode] = useState('');
  const [couponMsg, setCouponMsg] = useState('');
  const [couponSuccess, setCouponSuccess] = useState(false);
  const [appliedCoupon, setAppliedCoupon] = useState<any>(null);
  const [discount, setDiscount] = useState(0);
  const [error, setError] = useState('');
  const [loading, setLoading] = useState(false);
  const [success, setSuccess] = useState(false);

  const total = getTotal();

  const handleApplyCoupon = async () => {
    if (!couponCode.trim()) return;
    
    try {
      const response = await couponsAPI.validate(couponCode) as any;
      if (response.valid) {
        setAppliedCoupon(response.coupon);
        setCouponSuccess(true);
        setCouponMsg(`Coupon applied! ${response.coupon.discountType === 'percentage' ? `${response.coupon.discountValue}% off` : `$${response.coupon.discountValue} off`}`);
        
        if (response.coupon.discountType === 'percentage') {
          setDiscount((total * response.coupon.discountValue) / 100);
        } else {
          setDiscount(response.coupon.discountValue);
        }
      }
    } catch (err) {
      setCouponMsg((err as Error).message);
      setCouponSuccess(false);
      setAppliedCoupon(null);
      setDiscount(0);
    }
  };

  const finalAmount = Math.max(0, total - discount);

  const handleSubmit = async (e: React.FormEvent) => {
    e.preventDefault();
    setError('');
    setLoading(true);

    try {
      const orderItems = items.map(item => ({
        product: item.product._id,
        name: item.product.name,
        price: item.product.price,
        quantity: item.quantity
      }));

      await ordersAPI.create({
        items: orderItems,
        email,
        phone,
        address,
        couponCode: appliedCoupon?.code
      });

      clearCart();
      setSuccess(true);
      setTimeout(() => {
        navigate('/orders');
      }, 2000);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  if (success) {
    return (
      <div className={styles.container}>
        <div className={styles.success}>
          <h3>Order Placed Successfully!</h3>
          <p>Redirecting to your orders...</p>
        </div>
      </div>
    );
  }

  if (items.length === 0) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Shopping Cart</h1>
        <div className={styles.emptyCart}>
          <div className={styles.emptyIcon}>🛒</div>
          <p className={styles.emptyText}>Your cart is empty</p>
          <Link to="/shops" className={styles.shopBtn}>Browse Restaurants</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <Link to="/shops" className={styles.backBtn}>← Continue Shopping</Link>
      <h1 className={styles.title}>Shopping Cart</h1>

      <div className={styles.content}>
        <div className={styles.itemsList}>
          {items.map(item => (
            <div key={item.product._id} className={styles.item}>
              <img 
                src={item.product.image || 'https://via.placeholder.com/80'} 
                alt={item.product.name} 
                className={styles.itemImage}
              />
              <div className={styles.itemInfo}>
                <div className={styles.itemName}>{item.product.name}</div>
                <div className={styles.itemPrice}>${item.product.price.toFixed(2)}</div>
              </div>
              <div className={styles.itemControls}>
                <div className={styles.qtyControls}>
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity - 1)}
                    className={styles.qtyBtn}
                  >-</button>
                  <span className={styles.qtyValue}>{item.quantity}</span>
                  <button 
                    onClick={() => updateQuantity(item.product._id, item.quantity + 1)}
                    className={styles.qtyBtn}
                  >+</button>
                </div>
                <button 
                  onClick={() => removeItem(item.product._id)}
                  className={styles.removeBtn}
                >
                  Remove
                </button>
              </div>
            </div>
          ))}
        </div>

        <div className={styles.summary}>
          <h2 className={styles.summaryTitle}>Order Summary</h2>
          
          <div className={styles.summaryRow}>
            <span>Subtotal</span>
            <span>${total.toFixed(2)}</span>
          </div>
          
          {discount > 0 && (
            <div className={styles.summaryRow}>
              <span>Discount</span>
              <span style={{ color: '#28a745' }}>-${discount.toFixed(2)}</span>
            </div>
          )}
          
          <div className={`${styles.summaryRow} ${styles.summaryTotal}`}>
            <span>Total</span>
            <span>${finalAmount.toFixed(2)}</span>
          </div>

          <div className={styles.couponSection}>
            <label>Have a coupon?</label>
            <div className={styles.couponInput}>
              <input
                type="text"
                value={couponCode}
                onChange={(e) => setCouponCode(e.target.value.toUpperCase())}
                placeholder="Enter code"
                className={styles.couponField}
              />
              <button onClick={handleApplyCoupon} className={styles.couponBtn}>
                Apply
              </button>
            </div>
            {couponMsg && (
              <p className={`${styles.couponMsg} ${couponSuccess ? styles.couponSuccess : styles.couponError}`}>
                {couponMsg}
              </p>
            )}
          </div>

          <form onSubmit={handleSubmit} className={styles.form}>
            {error && <div className={styles.error}>{error}</div>}
            
            <div className={styles.formGroup}>
              <label className={styles.label}>Email</label>
              <input
                type="email"
                value={email}
                onChange={(e) => setEmail(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Phone</label>
              <input
                type="tel"
                value={phone}
                onChange={(e) => setPhone(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <div className={styles.formGroup}>
              <label className={styles.label}>Delivery Address</label>
              <input
                type="text"
                value={address}
                onChange={(e) => setAddress(e.target.value)}
                className={styles.input}
                required
              />
            </div>

            <button type="submit" disabled={loading} className={styles.submitBtn}>
              {loading ? 'Placing Order...' : `Place Order - $${finalAmount.toFixed(2)}`}
            </button>
          </form>
        </div>
      </div>
    </div>
  );
};

export default Cart;
