import { useState, useEffect } from 'react';
import { useNavigate } from 'react-router-dom';
import { shopsAPI } from '../../services/api';
import { Shop } from '../../types';
import { ShopCard } from '../../components';
import styles from './Shops.module.css';

const Shops = () => {
  const [shops, setShops] = useState<Shop[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');
  const [category, setCategory] = useState('');
  const [minRating, setMinRating] = useState('');
  
  const navigate = useNavigate();

  useEffect(() => {
    fetchShops();
  }, [category, minRating]);

  const fetchShops = async () => {
    setLoading(true);
    try {
      const params: any = {};
      if (category) params.category = category;
      if (minRating) params.minRating = Number(minRating);
      
      const response = await shopsAPI.getAll(params) as any;
      setShops(response.shops);
    } catch (err) {
      setError((err as Error).message);
    } finally {
      setLoading(false);
    }
  };

  const handleShopClick = (shop: Shop) => {
    navigate(`/shops/${shop._id}`);
  };

  return (
    <div className={styles.container}>
      <div className={styles.header}>
        <h1 className={styles.title}>Restaurants</h1>
        
        <div className={styles.filters}>
          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Category</label>
            <select 
              value={category} 
              onChange={(e) => setCategory(e.target.value)}
              className={styles.select}
            >
              <option value="">All Categories</option>
              <option value="Burgers">Burgers</option>
              <option value="Pizza">Pizza</option>
              <option value="Sushi">Sushi</option>
              <option value="Mexican">Mexican</option>
              <option value="Chicken">Chicken</option>
              <option value="Drinks">Drinks</option>
              <option value="Sandwiches">Sandwiches</option>
            </select>
          </div>

          <div className={styles.filterGroup}>
            <label className={styles.filterLabel}>Min Rating</label>
            <select 
              value={minRating} 
              onChange={(e) => setMinRating(e.target.value)}
              className={styles.select}
            >
              <option value="">Any Rating</option>
              <option value="4">4.0+</option>
              <option value="3">3.0+</option>
              <option value="2">2.0+</option>
            </select>
          </div>
        </div>
      </div>

      {loading ? (
        <div className={styles.loading}>Loading...</div>
      ) : error ? (
        <div className={styles.error}>{error}</div>
      ) : (
        <div className={styles.grid}>
          {shops.map(shop => (
            <ShopCard key={shop._id} shop={shop} onClick={() => handleShopClick(shop)} />
          ))}
        </div>
      )}
    </div>
  );
};

export default Shops;
