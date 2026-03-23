import { useState, useEffect } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { useAuth, useCart } from '../../context';
import { ordersAPI } from '../../services/api';
import { Order } from '../../types';
import styles from './OrderHistory.module.css';

const OrderHistory = () => {
  const { isAuthenticated } = useAuth();
  const { addItem } = useCart();
  const navigate = useNavigate();
  
  const [orders, setOrders] = useState<Order[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [searchEmail, setSearchEmail] = useState('');
  const [searchPhone, setSearchPhone] = useState('');
  const [reorderMsg, setReorderMsg] = useState('');

  useEffect(() => {
    if (isAuthenticated) {
      fetchOrders();
    } else {
      setLoading(false);
    }
  }, [isAuthenticated]);

  const fetchOrders = async (email?: string, phone?: string) => {
    setLoading(true);
    try {
      const params: any = {};
      if (email) params.email = email;
      if (phone) params.phone = phone;
      
      const response = await ordersAPI.getAll(params) as any;
      setOrders(response.orders);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleSearch = (e: React.FormEvent) => {
    e.preventDefault();
    fetchOrders(searchEmail, searchPhone);
  };

  const handleReorder = async (orderId: string) => {
    try {
      const response = await ordersAPI.reorder(orderId) as any;
      
      response.items.forEach((item: any) => {
        addItem(item as any);
      });
      
      setReorderMsg(`Added ${response.availableItemsCount} items to cart!`);
      setTimeout(() => {
        navigate('/cart');
      }, 1500);
    } catch (err) {
      setError((err as Error).message);
    }
  };

  const getStatusClass = (status: string) => {
    switch (status) {
      case 'pending': return styles.statusPending;
      case 'confirmed': return styles.statusConfirmed;
      case 'preparing': return styles.statusPreparing;
      case 'delivered': return styles.statusDelivered;
      case 'cancelled': return styles.statusCancelled;
      default: return '';
    }
  };

  const formatDate = (dateStr: string) => {
    return new Date(dateStr).toLocaleDateString('en-US', {
      year: 'numeric',
      month: 'short',
      day: 'numeric',
      hour: '2-digit',
      minute: '2-digit'
    });
  };

  if (!isAuthenticated) {
    return (
      <div className={styles.container}>
        <h1 className={styles.title}>Order History</h1>
        <div className={styles.loginPrompt}>
          <p>Please login to view your order history</p>
          <Link to="/login" className={styles.loginLink}>Login</Link>
        </div>
      </div>
    );
  }

  return (
    <div className={styles.container}>
      <h1 className={styles.title}>Order History</h1>

      <div className={styles.searchSection}>
        <form onSubmit={handleSearch} className={styles.searchForm}>
          <input
            type="email"
            value={searchEmail}
            onChange={(e) => setSearchEmail(e.target.value)}
            placeholder="Search by email"
            className={styles.searchInput}
          />
          <input
            type="tel"
            value={searchPhone}
            onChange={(e) => setSearchPhone(e.target.value)}
            placeholder="Search by phone"
            className={styles.searchInput}
          />
          <button type="submit" className={styles.searchBtn}>Search</button>
        </form>
      </div>

      {reorderMsg && <div className={styles.successMsg}>{reorderMsg}</div>}

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : orders.length === 0 ? (
        <div className={styles.empty}>No orders found</div>
      ) : (
        <div className={styles.orderList}>
          {orders.map(order => (
            <div key={order._id} className={styles.order}>
              <div className={styles.orderHeader}>
                <div>
                  <div className={styles.orderId}>Order #{order._id.slice(-8)}</div>
                  <div className={styles.orderDate}>{formatDate(order.createdAt)}</div>
                </div>
                <span className={`${styles.orderStatus} ${getStatusClass(order.status)}`}>
                  {order.status}
                </span>
              </div>

              <div className={styles.orderItems}>
                {order.items.map((item, idx) => (
                  <div key={idx} className={styles.orderItem}>
                    <span>{item.name} × {item.quantity}</span>
                    <span className={styles.itemQty}>${(item.price * item.quantity).toFixed(2)}</span>
                  </div>
                ))}
              </div>

              <div className={styles.orderTotal}>
                <span>Total</span>
                <span>
                  ${order.finalAmount.toFixed(2)}
                  {order.discount > 0 && (
                    <span className={styles.discount}> (-${order.discount.toFixed(2)})</span>
                  )}
                </span>
              </div>

              <div className={styles.orderFooter}>
                <span style={{ color: '#666', fontSize: '0.875rem' }}>
                  {order.email} • {order.address}
                </span>
                <button 
                  onClick={() => handleReorder(order._id)}
                  className={styles.reorderBtn}
                >
                  Reorder
                </button>
              </div>
            </div>
          ))}
        </div>
      )}
    </div>
  );
};

export default OrderHistory;
